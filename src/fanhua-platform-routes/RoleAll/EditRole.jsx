import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,message } from 'antd';
import {RequireUtils} from 'utils';
// import'./EditCarHang.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      driver:[],
      children:[],
      auth_ids:[],
    };
    this. handleConfirmBlur=this.handleSubmit.bind(this);
    this.reset=this.reset.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    // this.getInfo=this.getInfo.bind(this);
  }
  componentDidMount(){
    this.props.onRefS(this);
    RequireUtils.baseRequire('role/auth-select',{},function (data) {
      if(data.code==1) {
        console.log(data);
        this.setState({
          children:data.data.list,
        })
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  handleSubmit(e){
    e.preventDefault(e);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of formllll: ', values);
        const params={};
        params.id=this.props.record.id;
        params.role_name=values.role_name;
        params.role_desc=values.role_desc;
        const auth_ids=values.auth_ids.map((item)=>{
          return item.key;
        })
        params.auth_ids=JSON.stringify(auth_ids);
        console.log(params);
        RequireUtils.baseRequire('/role/modify-role',params,function (data) {
          if(data.code==1) {
            this.props.go();
            message.success(data.msg);
          }
          else{
            message.error(data.msg);
          }
          this.props.form.resetFields();
        }.bind(this));
      }
    });
  }
  // getInfo(){
  //   RequireUtils.baseRequire('role/role-info',{id:this.props.record.id},function (data) {
  //     if(data.code==1) {
  //       console.log(data);
  //       this.setState({
  //         auth_ids :data.data.role.auth_ids,
  //       })
  //
  //     }
  //     else{
  //       alert(data.msg);
  //     }
  //   }.bind(this));
  // }
  reset(){
    console.log("333333333");
    console.log(this.props.record);
    this.props.form.resetFields();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const {children}=this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult ,options} = this.state;
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
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '86',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //     <Option value="87">+87</Option>
    //   </Select>
    // );
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
          label="角色描述"
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
          label="权限分配"
        >
          {getFieldDecorator('auth_ids', {
            rules: [{
              required: true, message: 'Please select your auth!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Select  mode="multiple"
                     labelInValue
                     style={{ width: '100%' }}
                     // defaultValue={[{ key: 'lucy'},{ key: 'xtw'}]}
                    onChange={this.handleChange}>
              {/*<Option value="jack">Jack (100)</Option>*/}
              {/*<Option value="xtw">xtw(100)</Option>*/}
              {/*<Option value="lucy">Lucy (101)</Option>*/}
              {children.map((item)=>{
                return  <Option value={item.id} >{item.name}</Option>
              })}
            </Select>
          )}
        </FormItem>
        {/*<FormItem*/}
          {/*{...formItemLayout}*/}
          {/*label=""*/}
        {/*>*/}
        {/*<Select  mode="multiple" labelInValue defaultValue={[{ key: 'lucy'},{ key: 'xtw'}]} style={{ width: 120 }} onChange={this.handleChange}>*/}
          {/*<Option value="jack">Jack (100)</Option>*/}
          {/*<Option value="xtw">xtw(100)</Option>*/}
          {/*<Option value="lucy">Lucy (101)</Option>*/}
        {/*</Select>*/}
        {/*</FormItem>*/}
        {/*<Select*/}
          {/*mode="multiple"*/}
          {/*style={{ width: '100%' }}*/}
          {/*placeholder="Please select"*/}
          {/*// defaultValue={["4690868395182330","4690868395182330"]}*/}
          {/*onChange={this.handleChange}*/}
        {/*>*/}
          {/*{children.map((item)=>{*/}
            {/*return  <Option value={item.id} key={item.id}>{item.name}</Option>*/}
          {/*})}*/}
        {/*</Select>*/}

      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
    return {
      role_name: Form.createFormField({
        ...props.record.role_name,
        value: props.record.role_name,
      }),
      role_desc: Form.createFormField({
        ...props.record.role_desc,
        value: props.record.role_desc,
      }),
      auth_ids: Form.createFormField({
        ...props.ids,
        value: props.ids,
      }),
    };
  },})(RegistrationForm);
export default  WrappedRegistrationForm ;
