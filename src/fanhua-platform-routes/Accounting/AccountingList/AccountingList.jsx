import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import SaleAccounting from './Tabs/SaleAccounting' ;
import PurchaseAccounting from './Tabs/PurchaseAccounting' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class AccountingList extends React.Component {
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
            <Card hoverable title="账单列表" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="销售账单" key="1">
                 <SaleAccounting></SaleAccounting>
                </TabPane>
                <TabPane tab="采购账单" key="2">
                  <PurchaseAccounting></PurchaseAccounting>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default AccountingList;
