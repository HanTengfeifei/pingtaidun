import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import CarHeader from './Tabs/CarHeader';
import CarHang from './Tabs/CarHang';
import CarDriver from './Tabs/CarDriver';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PropertyManagement extends React.Component {
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
      <div>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="资产管理" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="车头" key="1">
                  <CarHeader></CarHeader>
                </TabPane>
                <TabPane tab="车挂" key="2">
                  <CarHang></CarHang>
                </TabPane>
                <TabPane tab="司机" key="3">
                  <CarDriver></CarDriver>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default PropertyManagement;
