import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Radio,message } from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import moment from 'moment';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
function noop() {
  return false;
}

/**
 * input值发生更改时值也及时发生改变
 * @param name
 * @param value
 */
function valueChange(name,value) {
  var {form} = this.state ;
  form[name] = value ;
  this.setState({
    form:form
  })
}
/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleCancel() ;
  this.props.form.resetFields();
}
/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  this.setState({
    loading:true
  }) ;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (err) {
      message.error(err);
      return;
    }
    else{
      RequireUtils.baseRequire('user/add-user',values,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleCancel() ;
          this.props.form.resetFields();
        }else{
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
    }
  });
}

class PlanListUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_all:[],
      loading:false,
      form:{
        company_id:"",
        user_name:"",
        user_mobile:"",//配送方式
        user_status:"" //采购方
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount() {
    RequireUtils.baseRequire("user/company-select",{},function (data) {
      if(data.code==1) {
        this.setState({
          company_all:data.data.list
        });
      }else{
        this.setState({
          company_all:[],
        })
      }
    }.bind(this))
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <main>
        <Form >
        <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="公司名称">
              {getFieldDecorator('company_id', {
                initialValue:"",
                rules: [{ required: true, message: '该选项为必选项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('company_id',value)}
                >
                  {
                    this.state.company_all.map((item)=>{
                      return   <Option value={item.id} key={item.id}>{item.company_name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row> <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="用户姓名">
              {getFieldDecorator('user_name', {
                initialValue:"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('user_name', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} >
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="登录手机号">
                {getFieldDecorator('user_mobile', {
                  initialValue:"",
                  rules: [{ required: true, message: '该选项为必填项' }]
                })(
                  <Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    onChange={(e) => valueChange.bind(this)('user_mobile', e.target.value)}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="状态">
              {getFieldDecorator('user_status', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }],
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('user_status',value)}
                >
                  <Option value="" key={'0'}>--请选择--</Option>
                  <Option value="0" key={'1'}>终止</Option>
                  <Option value="1" key={'2'}>正常</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        {/*<Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="角色分配"
            >
              {getFieldDecorator('radio-group',{
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }],
              })(
                <RadioGroup>
                  <Radio value="a">管理</Radio>
                  <Radio value="b">业务</Radio>
                  <Radio value="c">财务</Radio>
                  <Radio value="d">司机</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>*/}
        <Row style={{marginTop:'10px'}}>
          <Col style={{textAlign:'right'}}>
            <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
            <Button type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e)}>确定</Button>
          </Col>
        </Row>
        </Form>
        </main>
      </div >
    )
  }
}
PlanListUpdate = createForm()(PlanListUpdate);
export default PlanListUpdate;
