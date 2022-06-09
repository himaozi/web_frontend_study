import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { getCode ,getProduct,userLogin} from '../api';
import {createBrowserHistory} from "history";
import styles from './login.css';
import 'antd/dist/antd.css';





class NormalLoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      codeText:'',
      key:'',
    }

  }
  getNewCode = ()=>{
    getCode().then((res)=>{
      this.setState({
        codeText:res.data.data.code,
        key:res.data.data.key
      })

    })
  }
  // 组件挂载阶段，请求验证码，初始化页面
  componentDidMount(){
    this.getNewCode()
    }

    // 表单提交函数
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const user={...values}
        user.key=this.state.key
        userLogin(user).then(res=>{
          // 登录成功存储token
          if(res.data.message==="login success"){
            document.cookie="token="+res.data.data.token
            // 跳转到商品管理页面
            let history = createBrowserHistory()
            history.push({
              pathname: "/goodsInfo",
              state: {}
              });
                 history.go();
           
          }
          // 登录失败返回继续登录
          else{
           alert(res.data.message);
           this.getNewCode();

          }

        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item className='verification'>
        
        {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入验证码!' }],
          })(
            <Input
              
              placeholder="验证码" className='codeText' autoComplete='off'
            />,
          )}<img src={this.state.codeText} ></img><span onClick={()=>this.getNewCode()}><Icon type="redo" /></span>
        </Form.Item>
        <Form.Item >
         
          
          <Button type="primary" htmlType="submit" className="login-form-button" id='login-submit-button'>
            登录
          </Button>
          
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);



export default WrappedNormalLoginForm;