import React from 'react';
import { Menu, Icon, Switch } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    
    current: '1',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>
     
        <Menu
          theme='light'
          onClick={this.handleClick}
          style={{ width: 256,height:1000}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="shopping" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="1">商品管理</Menu.Item>
            <Menu.Item key="2">商品分类</Menu.Item>
            <Menu.Item key="3">商品规格</Menu.Item>
            <Menu.Item key="4">商品评论</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>订单</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>设置</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Sider;