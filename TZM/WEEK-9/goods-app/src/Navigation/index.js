import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Navigation extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    current: '1',
    sales:0,
    stock:0,
    recycle:0
  };

  handleClick = e => {
    this.props.type(e.key)
    this.setState({
      current: e.key,
    });
    
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      sales:nextProps.header[0].count,
      stock:nextProps.header[1].count,
      recycle:nextProps.header[2].count,
    })

  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="1">
          
          出售中商品 ({this.state.sales})
        </Menu.Item>
        <Menu.Item key="2">
          
          仓库中商品 ({this.state.stock})
        </Menu.Item>
        <Menu.Item key="5">
         
          商品回收站 ({this.state.recycle})
        </Menu.Item>
     
      </Menu>
    );
  }
}


export default Navigation;
