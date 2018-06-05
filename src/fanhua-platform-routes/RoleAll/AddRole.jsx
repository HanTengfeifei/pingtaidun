import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,message} from 'antd';
import {RequireUtils} from 'utils';
import './AddRole.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Opangtion;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      driver:[],
      children:[],
    };
    this. handleConfirmBlur=this.handleSubmit.bind(this);
    this.reset=this.reset.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount(){
    this.props.onRef(this);
    RequireUtils.baseRequire('role/auth-select',{},function (data) {
      if(data.code==1) {
        console.log(data);
        this.setState({
          children:data.data.list,
        })

      }
      else{
        alert(data.msg);
      }
    }.bind(this));
  }

  handleSubmit() {
    // e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.form.resetFields();
          console.log('Received values of form: ', values);
          const params={};
          params.role_name=values.role_name;
          params.role_desc=values.role_desc;
          params.auth_ids=JSON.stringify(values.auth_ids);
          // params.company_id=localStorage.getItem("company_id");
          RequireUtils.baseRequire('role/add-role',params,function (data) {
            if(data.code==1) {
              message.success(data.msg);
              this.props.go();
              this.props.form.resetFields();
            }
            else{
              console.log(values);
              this.props.form.resetFields();
             message.error(data.msg);
            }
            this.props.form.resetFields();
          }.bind(this));
        }
        else{
          message.error("格式错误!");
        }
      });
  }
  reset(){
    this.props.form.resetFields();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
   handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult ,options,children} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (

      <Form onSubmit={this.handleSubmit}>
        <FormItem
              {...formItemLayout}
              label="角色名称"
            >
              {getFieldDecorator('role_name', {
                rules: [ {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="校色描述"
            >
              {getFieldDecorator('role_desc', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>
        <FormItem
              {...formItemLayout}
              label="角色权限分配"
            >
              {getFieldDecorator("auth_ids", {
                rules: [{
                  required: true, message: 'Please select your auth', type: 'array'
                },],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChange}

                >
                  {children.map((item)=>{
                    return  <option value={item.id}>{item.name}</option>
                  })}
                </Select>
              )}
            </FormItem>
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default  WrappedRegistrationForm ;
