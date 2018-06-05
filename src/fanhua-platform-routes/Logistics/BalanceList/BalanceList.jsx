import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyBalaceTable from './MyBalaceTable' ;
import SumTable from './SumTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BalanceList extends React.Component {
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
            <Card hoverable title="结算单" type="card">
              <SumTable></SumTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BalanceList;
