import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import SaleBusinessStatistics from './Tabs/SaleBusinessStatistics' ;
import PurchaseBusinessStatistics from './Tabs/PurchaseBusinessStatistics' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BusinessStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="业务统计" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="销售业务统计" key="1">
                 <SaleBusinessStatistics></SaleBusinessStatistics>
                </TabPane>
                <TabPane tab="采购业务统计" key="2">
                  <PurchaseBusinessStatistics></PurchaseBusinessStatistics>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BusinessStatistics;
