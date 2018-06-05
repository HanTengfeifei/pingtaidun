import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment';
import mystyle from './tabstyle.less' ;
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function noop() {
  return false;
}


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
        start_date:"",
        end_date:"",
        plan_interval:"",
        price:"",
        prod_id:""
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
    const {updateData} = this.props ;
    const {
      plan_status,
      id,
      deliver_id,
      saler_name,
      contract_id,
      addr_name,
      plan_weight,
      start_date,
      end_date,
      price,
      prod_name,
      contract_name,
      plan_interval} = updateData;
    /**
     * 获取原来的值
     * @type {{plan_status, id: *, deliver_id: *, buyer_id: *, contract_id: *, recv_id: *, plan_weight: *, bill_name: *, start_date: *, end_date: *, plan_interval: *}}
     */
    const formItemLayout = {
      labelCol: { span: 6 },
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
              label="卖方">
              {getFieldDecorator('saler_name', {
              })(
               <span>{saler_name}</span>
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
                <span>{addr_name}</span>
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
                initialValue:plan_status+"",
                rules: [{ required: true, message: '该选项为必填项' }]
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
              })(
                  <span>{plan_interval}</span>
              )}

            </FormItem>
          </Col>

        </Row>
          <Row gutter={8} style={{marginTop:'10px'}}>
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="计划标品">
                {getFieldDecorator('prod_name', {
                })(
                 <span>
                   {prod_name}
                 </span>
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="归属合同">
                {getFieldDecorator('contract_name', {

                })(
                  <span>{contract_name}</span>
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
        </Row>
        </Form>
        </main>
      </div >
    )
  }
}
PlanListUpdate = createForm()(PlanListUpdate);
export default PlanListUpdate;
