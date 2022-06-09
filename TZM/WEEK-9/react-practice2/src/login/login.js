import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { getCode } from '../api';
import styles from './login.less';
import 'antd/dist/antd.css';




class NormalLoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      code:'',
      key:'',
    }

  }

  componentDidMount(){
    getCode().then((res)=>{
      this.setState({code:res.data.data.code})

    })
    
   

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item className='verification'>
        
        <span id='codeText'>验证码: </span><img src={this.state.code} ></img><span><Icon type="redo" /></span>
        </Form.Item>
        <Form.Item>
         
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default WrappedNormalLoginForm;