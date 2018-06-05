import React from 'react';
import { Card, Row, Col, Tabs, Icon,Badge,Link } from 'antd';

import MyExitListTable from './Tabs/MyExitListTable';

const TabPane = Tabs.TabPane;

class CompanyInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc_status:""
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  showTableByType(type){
    this.setState({
      cc_status:type
    })
  }

  render() {
    const {cc_status} = this.state ;
    return (
      <div>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="出车单列表" type="card" className={'no-content-card'}>
          </Card>
            <Row gutter={8} style={{ marginTop: '10px',marginBottom:'10px' }} type="flex" justify='space-between' className={'my-wl-yd-customer-car'}>
              <Col span={5} >
                <Card bordered={false} onClick={()=>this.showTableByType('')}>
                  <div className="custom-image" >
                    <Badge count={5}>
                      <Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>全部</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} >
                <Card bordered={false} onClick={()=>this.showTableByType('1')}>
                  <div className="custom-image">
                    <Badge count={1}>
                      <Icon type="clock-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待接单</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} >
                <Card bordered={false} onClick={()=>this.showTableByType('2')}>
                  <div className="custom-image">
                    <Icon type="alipay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>待出发</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} >
                <Card bordered={false} onClick={()=>this.showTableByType('3')}>
                  <div className="custom-image">
                    <Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>运输中</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} >
                <Card bordered={false}  onClick={()=>this.showTableByType('4')}>
                  <div className="custom-image">
                    <Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>
                    <p style={{textAlign:'center',margin:'0'}}>完结</p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card hoverable type="card">
              <div>
                <MyExitListTable cc_status={cc_status}></MyExitListTable>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

