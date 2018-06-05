import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Badge } from 'antd';
import MyTable from './MyTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WayBillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yd_status:""
    };
    this.callback = this.callback.bind(this);
  }
  showTableByType(type){
    this.setState({
      yd_status:type
    })
  }

  callback(key) {
    console.log(key);
  }
  render() {
    const {yd_status} = this.state ;
    return (
      <div >
        <Card hoverable title="运单管理" type="card" className={'no-content-card'}>
        </Card>
        <Row gutter={8} style={{ marginTop: '10px',marginBottom:'10px' }} type="flex" justify='space-between' className={'my-wl-yd-customer-car'}>
          <Col span={6} >
            <Card bordered={false} onClick={()=>this.showTableByType('')}>
              <div className="custom-image" >
                <Badge count={5}>
                  <Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>全部</p>
              </div>
            </Card>
          </Col>
          <Col span={6} >
            <Card bordered={false} onClick={()=>this.showTableByType('0')}>
              <div className="custom-image">
                <Badge count={1}>
                  <Icon type="clock-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>待调度</p>
              </div>
            </Card>
          </Col>
          <Col span={6} >
            <Card bordered={false} onClick={()=>this.showTableByType('1')}>
              <div className="custom-image">
                <Icon type="alipay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                <p style={{textAlign:'center',margin:'0'}}>运输中</p>
              </div>
            </Card>
          </Col>
          <Col span={6} >
            <Card bordered={false} onClick={()=>this.showTableByType('2')}>
              <div className="custom-image">
                <Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>
                <p style={{textAlign:'center',margin:'0'}}>完结</p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="" type="card">
              <MyTable yd_status={yd_status}></MyTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default WayBillList;
