import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyReconditioningListTable from './ReconditioningTable' ;
// import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class ReconditioningList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
            <Card hoverable title="客户列表" type="card" className={'no-content-card'}>
              <MyReconditioningListTable></MyReconditioningListTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}


export default ReconditioningList;
