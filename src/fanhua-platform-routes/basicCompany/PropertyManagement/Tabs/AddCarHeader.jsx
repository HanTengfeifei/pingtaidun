import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete } from 'antd';
import {RequireUtils} from 'utils';
import'./AddCarHeader.less' ;
import mystyle from './tabstyle.less' ;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

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
  }
  componentDidMount(){
    this.props.onRef(this);

    RequireUtils.baseRequire('/car/company-select',{},function (data) {
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
  handleSubmit(){
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.last_check = values.last_check.format("YYYY-MM-DD") ;
        const params=values;
        params.scenario='add_t_car';
        params.car_type=0;

        RequireUtils.baseRequire('/car/add-car',params,function (data) {
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
  } ;

  companySelect(value){
    var _this =this ;
     RequireUtils.baseRequire('/car/user-select',{company_id:value},function (data) {
         if(data.code==1) {
           _this.setState({
             driver:data.data.list,
           });
         }
         else{
           _this.setState({
             driver:[],
           });
         }
       }.bind(this));
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  } ;

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout1 = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };


    return (
      <div className={'my-custom-ant-padding'}>
        <Form onSubmit={this.handleSubmit} >
          <Row>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="车牌号"
              >
                {getFieldDecorator('car_num', {
                  rules: [ {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="准牵引总质量"
              >
                {getFieldDecorator('car_load', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
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
                  <Select placeholder="Please select a country" onSelect={this.companySelect.bind(this)}>
                    {this.state.companyoptions.map((item,index)=>{
                      return <Option value={item.id} key={index}>{item.company_name}</Option>
                    })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="联系人"
                hasFeedback
              >
                {getFieldDecorator('car_owner', {
                  rules: [
                    { required: false, message: 'Please select your country!' },
                  ],
                })(
                  <Select placeholder="Please select a country">
                    {this.state.driver.map((item,index)=>{
                      return <Option value={item.id} key={index}>{item.user_name}</Option>
                    })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="车架号"
              >
                {getFieldDecorator('car_vin', {
                  rules: [{
                    required: false, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="燃料类型"
              >
                {getFieldDecorator('car_fuel', {
                  rules: [{
                    required: false, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="发动机号"
              >
                {getFieldDecorator('car_motor', {
                  rules: [{
                    required: false, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="车辆型号"
              >
                {getFieldDecorator('car_model', {
                  rules: [{
                    required: false, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="上次车审"
              >
                {getFieldDecorator('last_check', {
                  rules: [{ required: true, message: '该选项为必填项' }],
                })(
                  <DatePicker
                    placeholder=""
                    style={{width:'100%'}} />

                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="车审周期"
              >
                {getFieldDecorator('check_interval', {
                  rules: [{
                    required: false, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default  WrappedRegistrationForm ;
