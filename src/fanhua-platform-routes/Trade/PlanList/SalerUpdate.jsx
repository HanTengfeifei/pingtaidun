import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment';
import mystyle from './tabstyle.less' ;
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PlanListUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      updateData:{},
      contractoption:[],
      $addroption:[],
      companyoption:[],
      productoption:[],
      form:{
        plan_status:"",
        id:"",
        deliver_id:"",//配送方式
        buyer_id:"", //采购方
        contract_id:"", //合同
        recv_id:"",
        plan_weight:"",
        bill_name:"",
        start_date:"",
        end_date:"",
        plan_interval:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    const {updateData} = this.props ;
    this.setState({
      form:updateData
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {contractoption,$addroption,form,loading} = this.state ;
    const {updateData,companyoption,productoption} = this.props ;
    const {
      plan_status,
      goods_name,
      id,
      deliver_id,
      buyer_name,
      addr_name,
      contract_name,
      plan_weight,
      bill_name,
      goods_id,
      start_date,
      end_date,
      plan_interval} = updateData;
    /**
     * 获取原来的值
     * @type {{plan_status, id: *, deliver_id: *, buyer_id: *, contract_id: *, recv_id: *, plan_weight: *, bill_name: *, start_date: *, end_date: *, plan_interval: *}}
     */
    const _this = this ;
    const formItemLayout = {
      labelCol: { span: 6},
      wrapperCol: { span: 18 },
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
              label="采购方">
              {getFieldDecorator('buyer_name', {
              })(
                <span>
                  {buyer_name}
                </span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="接收场站">
              {getFieldDecorator('addr_name', {
              })(
                <span>
                  {addr_name}
                </span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="状态">

              {getFieldDecorator('plan_status', {
              })(
                <span>
                  {plan_status==0?'正常':'终止'}
                </span>
              )}

            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="运输方式">
              {getFieldDecorator('deliver_id', {
              })(
                <span>
                  {deliver_id==0?'配送':'自提'}
                </span>
              )}

            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="单次执行量">
              {getFieldDecorator('plan_weight', {
              })(
                <span>
                  {plan_weight}
                </span>
              )}

            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="执行周期">
              {getFieldDecorator('plan_interval', {
                initialValue:plan_interval,
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <span>
                  {plan_interval}
                </span>
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="计划商品">
              {getFieldDecorator('goods_id', {
                initialValue:goods_id+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <span>
                  {goods_name}
                </span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="归属合同">
              {getFieldDecorator('contract_id', {
              })(
                <span>
                  {contract_name}
                </span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={3}>
            持续时间
          </Col>
          <Col span={21}>
            {start_date}至{end_date}
          </Col>
          <Col span={2}></Col>
        </Row>
        </Form>
        </main>
      </div >
    )
  }
}
PlanListUpdate = createForm()(PlanListUpdate);
export default PlanListUpdate;
