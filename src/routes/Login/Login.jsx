import React from 'react';
import { hashHistory } from 'dva/router';
// import PropTypes from 'prop-types';
import { Button, Row, Input } from 'antd';
import { Tabs, Icon,Form } from 'antd';
import { config } from 'utils';
import {RequireUtils} from 'utils';
import './Login.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {

        RequireUtils.baseRequire('site/account-login',values,function (data) {
          console.log(data);
          if(data.code==1) {
            window.location.href = "#/homepage";
            return ;
          }
          else{
            alert("账号或密码错误！");
          }
        }.bind(this));


      };
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('user_mobile') && getFieldError('user_mobile');
    const passwordError = isFieldTouched('user_pass') && getFieldError('user_pass');
    return (
          <div>
          {/*<div className="background"></div>*/}
              <div className="card">
                <div className="logo">
                  <img alt={'logo'} src={config.whiteLogoSrc}/>
                  <span>{config.name}</span>
                </div>
              <Form  onSubmit={this.handleSubmit}>
                <Row style={{textAlign: 'center'}}>
                  <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                  >
                    
                    {getFieldDecorator('user_mobile', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </FormItem>
                </Row>
                <Row style={{textAlign: 'center'}}>
                  <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                  >
                    {getFieldDecorator('user_pass', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon   type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </FormItem>
                </Row>
                <Row style={{textAlign: 'center'}}>
                  <Button type="primary" size="large"  htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}>登录</Button>
                </Row>
              </Form>
            </div>
          </div>

    )
  }
}
const LoginQ= Form.create()(Login);
export default LoginQ;

