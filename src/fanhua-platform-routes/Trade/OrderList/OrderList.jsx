import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Badge,Modal  } from 'antd';
import {RequireUtils} from 'utils';
import OrderListTable from './OrderListTable' ;
import ChooseOrderType from './ChooseOrderType' ;
import { Link } from 'dva/router';
import PlanListCard from './PlanListCard' ;
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_status:"",
      addOrderModal:false
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  addOrderModal(){
    this.setState({
      addOrderModal:true
    })
  }

  cancelOrderMark(){
    this.setState({
      addOrderModal:false
    })
  }

  showTableByType(type){
    this.setState({
      order_status:type
    })
  }
  render() {
    const {order_status,addOrderModal} = this.state ;
    return (
      <div >
         <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="订单列表" type="card" className={'no-content-card'}>
            </Card>
            <Row gutter={8} style={{ marginTop: '10px',marginBottom:'10px' }} type="flex" justify='space-between' className={'my-customer-car'}>
              <Col span={3} >
                <Card bordered={false} onClick={()=>this.showTableByType('1')}>
                  <div className="custom-image" >
                       <Badge count={5}>
                          <Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>
                       </Badge>
                       <p style={{textAlign:'center',margin:'0'}}>全部</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false} onClick={()=>this.showTableByType('2')}>
                  <div className="custom-image">
                    <Badge count={1}>
                      <Icon type="clock-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待确认</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false}>
                  <div className="custom-image">
                    <Icon type="alipay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>待付款</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false}>
                  <div className="custom-image">
                    <Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>待调度</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false}>
                  <div className="custom-image">
                    <Icon type="menu-fold" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>待收货</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false}>
                  <div className="custom-image">
                    <Icon type="pay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>待结算</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} >
                <Card bordered={false}>
                  <div className="custom-image">
                    <Icon type="check-circle-o" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>完结</p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card hoverable type="card">
              <OrderListTable  order_status={order_status}></OrderListTable>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default OrderList;
