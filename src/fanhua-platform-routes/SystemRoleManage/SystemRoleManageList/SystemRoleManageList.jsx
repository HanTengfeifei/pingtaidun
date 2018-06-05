import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import SystemRoleManageTable from './SystemRoleManageTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class SystemRoleManageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail:false,
      showtable:true
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
            <Card hoverable  title="系统权限管理" type="card" className={'no-content-card'}>
             <SystemRoleManageTable ></SystemRoleManageTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default SystemRoleManageList;
