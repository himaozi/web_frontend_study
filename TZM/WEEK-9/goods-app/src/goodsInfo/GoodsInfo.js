import React from "react";
import { getProduct, getType, isShow, unShow, recycle, restore } from "../api";
import Sider from "../SiderDemo/SiderDemo.js"
import Navigation from "../Navigation";
import './goodsInfo.css';
import { Icon, Table, Switch } from "antd";


export default class GoodsInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            page: {

                current: 1,
                pageSize: 5,
                total: 0,

            },
            nav: [{ count: 0 }, { count: 0 }, { count: 0 }],
        }
        this.product = {
            cateId: '', keywords: '', limit: 5, page: 1, type: 1
        }

    }

    // 请求表格数据并刷新
    getNewTable = () => {
        getProduct(this.product).then(res => {
            const list = res.data.data.list
            this.setState({
                data: list,
                page: {
                    ...this.state.page,
                    total: res.data.data.total
                }
            })
        })

    }

    // 请求表头数据并刷新
    getNewHeader = () => {
        getType().then(res => {
            this.setState({
                // 请求回的表头数据中剔除没有用的分类
                nav: res.data.data.filter((item) => { return item.type != 3 & item.type != 4 })
            })

        })

    }

    // 分页函数
    changePage = (currPageNO, currPageSize) => {
        this.setState({
            page: {
                ...this.state.page,
                current: currPageNO,
                pageSize: currPageSize
            }
        })

        this.product = { ...this.product, page: currPageNO, limit: currPageSize }
        this.getNewTable()
    }

    // dom挂载完成后进行异步请求获取数据(不知道为什么每次初始化页面时都会调取两次接口)
    componentDidMount() {
        this.getNewHeader()
        this.getNewTable()


    }


    // 时间戳转换函数
    time = (str) => {
        return new Date(parseInt(str) * 1000).toLocaleString()
    }

    // 修改表格请求数据的商品类型
    changeType = (type) => {

        this.product = {
            ...this.product, type: type
        }
        this.getNewTable()
    }

    // 上下架回调函数
    handleChange = (checked, e) => {
        // 获取当前商品的id（异常艰难是否有优化的办法）
        const id = e.target.parentNode.parentNode.getAttribute("data-row-key")
        console.log(id)
        if (checked) {
            // 发送上下架异步操作
            isShow(id).then(res => {
                if (res.data.code === 200) {
                    // 请求表头数据并给NAV组件传数据
                    this.getNewHeader()
                    this.getNewTable()
                }
            })
        }
        else {
            unShow(id).then(res => {
                if (res.data.code === 200) {
                    // 同上架
                    this.getNewHeader()
                    this.getNewTable()
                }
            })
        }
    }


    // 加入回收站
    handleRecycle = (e) => {
        const id = e.target.id
        recycle(id).then(res => {
            if (res.data.code === 200) {
                this.getNewHeader()
                this.getNewTable()
            }
        })
    }

    // 移出回收站
    handleRestore = (e) => {
        const id = e.target.id
        restore(id).then(res => {
            if (res.data.code === 200) {
                this.getNewHeader()
                this.getNewTable()
            }
        })


    }

    render() {

        const columns = [
            { title: 'Id', dataIndex: 'id', key: 'id', width: 100 },
            { title: '商品名称', dataIndex: 'storeName', key: 'storeName', width: 200 },
            { title: '价格', dataIndex: 'price', key: 'price', width: 100 },
            { title: '销量', dataIndex: 'sales', key: 'sales', width: 100 },
            { title: '库存', dataIndex: 'stock', key: 'stock', width: 100 },
            {
                title: '添加时间', dataIndex: 'addTime', key: 'addTime', width: 150, render: (text, record) => {


                    return (

                        this.time(record.addTime)
                    )
                }
            },
            { title: '状态', dataIndex: 'isShow', key: 'isShow', render: (text, record) => <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked={record.isShow} onChange={this.handleChange} /> },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {

                    // 返回数据中找不到isRecycle这个属性，但接口说明里有
                    if (this.product.type == 1 || this.product.type == 2) {

                        return (
                            <div><a>详情</a> <a onClick={this.handleRecycle} id={record.id}>加入回收站</a></div>)

                    }
                    else {
                        return (
                            <div><a>详情</a> <a onClick={this.handleRestore} id={record.id}>恢复商品</a></div>

                        )
                    }

                }
            },
        ];

        const page = {
            ...this.state.page,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${this.state.page.total}条 `,
            pageSizeOptions: ['5', '10', '15', '20'],
            onChange: (newPage, newPageSize) => this.changePage(newPage, newPageSize),
            onShowSizeChange: (newPage, newPageSize) => this.changePage(newPage, newPageSize),
        }
        // 表格隐藏部分
        const expandedRowRender = (record) => {
            return <ul className="expandedList">
                <li key='cateValues'>商品分类:{record.cateValues}</li>
                <li key='otPrice'>市场价:{record.otPrice}</li>
                <li key='cost'>成本价:{record.cost}</li>
                <li key='collectCount'>收藏:{record.collectCount}</li>
                <li key='ficti'>虚拟销量{record.ficti}</li>
            </ul>

        }


        return (
            <div className="container">
                <Sider className="sider" />
                <div className="info">
                    <header>
                        <span className="location"><a>主页/</a><a>商品管理/</a><a>商品详情</a></span>
                        <span className="search"><Icon type="search" /></span>
                    </header>
                    <div className="product">
                        <Navigation className="nav" header={this.state.nav} type={this.changeType}></Navigation>
                        <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={this.state.data} rowKey={obj => obj.id} pagination={page}></Table>
                    </div>



                </div>
            </div>



        )
    }
}



