import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal } from 'antd';
import mystyle from '../tablestyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitWayBillDetailTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yundanid:""
    };
    this.callback = this.callback.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  callback(key) {
    console.log(key);
  }
  render() {
    const {item,go,_pthis}=this.props;
    const {addcar,yundanid,freeselectData} = this.state ;
    return (
      <div>
        <div >
          <Row className={'table-first-line'}>
            <div >
              < Col span={18}>
                <div style={{textAlign:'left'}}>
                  <span style={{marginRight:'5px'}}>运单编号</span>
                  <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                  <span style={{marginRight:'5px'}}>所属订单</span>
                  <span style={{marginRight:'20px'}}>{item.order_code}</span>
                </div>
              </Col>
              < Col span={6}>
                <div style={{textAlign:'right'}}>
                  <span style={{marginRight:'5px'}}>配送时间</span>
                  <span style={{marginRight:'10px'}}>{item.dispatch_date}</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.goods_name}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.recv_num}吨
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>已运输&nbsp;{item.load_num}吨</div>
              <div className={'my-custom-center'}>待分配&nbsp;{item.recv_num-item.load_num}吨</div>
            </Col>
            <Col span={4} >
              <div className={'my-custom-center'}>卸载地&nbsp;{item.addr_province}{item.addr_city}{item.addr_county}</div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                {item.car_num}张&nbsp;出车单
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.status_name}
              </div>
            </Col>
            <Col span={3}>
              <div >
                <Icon type="environment-o" />地图
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default ExitWayBillDetailTd;
