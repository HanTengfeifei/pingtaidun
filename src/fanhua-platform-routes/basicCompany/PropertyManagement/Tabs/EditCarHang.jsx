import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment';
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
    RequireUtils.baseRequire('/car/company-select',{},function (data) {
      if(data.code==1) {
        this.setState({
          companyoptions:data.data.list,
        });
      }
      else{
        this.setState({
          companyoptions:[]
        });
      }
    }.bind(this));
    var {company_id} = this.props.record ;
    this.companySelect.bind(this)(company_id) ;
  }

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

  handleSubmit(e){
    e.preventDefault(e);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values['last_check'] =values['last_check'].format('YYYY-MM-DD') ;
        const params=values;
        params.scenario='modify_g_car';
        params.car_type=1;
        params.id=this.props.record.id;
        RequireUtils.baseRequire('/car/modify-car',params,function (data) {
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
    const {last_check} = this.props.record ;
    const dateFormat = 'YYYY-MM-DD';
    const formItemLayout1 = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    return (
      <div className={'my-custom-ant-padding'}>
        <Form onSubmit={this.handleSubmit}>
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
            <Col span={2}>

            </Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="核载货总质量"
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
                  <Select placeholder="Please select a country"  onSelect={this.companySelect.bind(this)}>
                    {this.state.companyoptions.map(function (item,index) {
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
                label="生产厂商"
              >
                {getFieldDecorator('prod_firm', {
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
                label="货物类型"
              >
                {getFieldDecorator('cargo_type', {
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
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout1}
                label="上次车审"
              >
                {getFieldDecorator('last_check', {
                  rules: [{ required: true, message: '该选项为必填项' }],
                  initialValue: moment(last_check, dateFormat),
                })(
                  <DatePicker
                    placeholder=""
                    format={dateFormat}
                    style={{width:'100%'}} />

                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>

    );
  }
}
const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
    return {
      car_num: Form.createFormField({
        ...props.record.car_num,
        value: props.record.car_num,
      }),
      company_id: Form.createFormField({
        ...props.record.company_id,
        value: props.record.company_id,
      }),
      car_load: Form.createFormField({
        ...props.record.car_load,
        value: props.record.car_load,
      }),
      car_owner: Form.createFormField({
        ...props.record.car_owner,
        value: props.record.car_owner,
      }),
      prod_firm: Form.createFormField({
        ...props.record.prod_firm,
        value: props.record.prod_firm,
      }),
      check_interval: Form.createFormField({
        ...props.record.check_interval,
        value: props.record.check_interval,
      }),
      cargo_type: Form.createFormField({
      ...props.record.cargo_type,
      value: props.record.cargo_type,
    })
    };
  },})(RegistrationForm);
export default  WrappedRegistrationForm ;
