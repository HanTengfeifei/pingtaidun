import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import PlanListTable from './PlanListTable';
import OfflineSalePlanTable from './OfflineSalePlanTable' ;
import OfflinePurchasePlanTable from  './OfflinePurchasePlanTable' ;
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
            <Card hoverable title="计划列表" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="在线销售" key="1">
                  <PlanListTable></PlanListTable>
                </TabPane>
                <TabPane tab="线下销售计划" key="2">
                  <OfflineSalePlanTable></OfflineSalePlanTable>
                </TabPane>
                <TabPane tab="线下采购计划" key="3">
                  <OfflinePurchasePlanTable></OfflinePurchasePlanTable>
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
