import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import ScantlingManagementTable from './ScantlingManagementTable' ;
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ScantlingManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="标品" type="card" className={'no-content-card'}>
              <ScantlingManagementTable></ScantlingManagementTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default ScantlingManagement;
