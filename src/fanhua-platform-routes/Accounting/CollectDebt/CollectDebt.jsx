import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import CustomerPrePayment from './Tabs/CustomerPrePayment';
import CustomerPayment from './Tabs/CustomerPayment'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class CollectDebt extends React.Component {
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
            <Card hoverable title="收账登记" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="在线支付" key="1">
                  暂无页面
                </TabPane>
                <TabPane tab="客户预付款登记" key="2">
                  <CustomerPrePayment></CustomerPrePayment>
                </TabPane>
                <TabPane tab="供应商付款登记" key="3">
                  <CustomerPayment></CustomerPayment>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default CollectDebt;
