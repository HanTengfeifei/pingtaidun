import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete } from 'antd';
import {RequireUtils} from 'utils';
import'./EditCarHang.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      companyoptions:[],
      driver:[],
    };
    this. handleConfirmBlur=this.handleSubmit.bind(this);
    this.reset=this.reset.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.onRefS(this);
    RequireUtils.baseRequire('/driver/company-select',{},function (data) {
      if(data.code==1) {
        this.setState({
          companyoptions:data.data.list,
        });
      }
      else{
        alert("信息失败！");
      }
    }.bind(this));
  }
  handleSubmit(e){
    e.preventDefault(e);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params=values;
        params.id=this.props.record.id;
        RequireUtils.baseRequire('/driver/modify-driver',params,function (data) {
          if(data.code==1) {
            alert(data.msg);
            this.props.go();
          }
          else{
            alert(data.msg);
          }
          this.props.form.resetFields();
        }.bind(this));
      }
    });
  }
  reset(){
    this.props.form.resetFields();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout1 = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    return (
      <div className={'my-custom-ant-padding'}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout1}
            label="司机姓名"
          >
            {getFieldDecorator('driver_name', {
              rules: [ {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="司机身份证号"
          >
            {getFieldDecorator('driver_card', {
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
            {...formItemLayout1}
            label="司机手机号"
          >
            {getFieldDecorator('driver_mobile', {
              rules: [{
                required: false, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="所属公司"
            hasFeedback
          >
            {getFieldDecorator('company_id', {
              rules: [
                { required: false, message: 'Please select your country!' },
              ],
            })(
              <Select placeholder="Please select a country">
                {this.state.companyoptions.map((item,index)=>{
                  return <Option value={item.id} key={index}>{item.company_name}</Option>
                })
                }
              </Select>
            )}
          </FormItem>
        </Form>
      </div>

    );
  }
}
const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
    return {
      driver_name: Form.createFormField({
        ...props.record.driver_name,
        value: props.record.driver_name,
      }),
      driver_mobile: Form.createFormField({
        ...props.record.driver_mobile,
        value: props.record.driver_mobile,
      }),
      driver_card: Form.createFormField({
        ...props.record.driver_card,
        value: props.record.driver_card,
      }),
      company_id: Form.createFormField({
        ...props.record.company_id,
        value: props.record.company_id,
      })
    };
  },})(RegistrationForm);
export default  WrappedRegistrationForm ;
