import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import CompanyListTable from './CompanyListTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    } ;
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
            <Card hoverable  title="公司列表" type="card" className={'no-content-card'}>
                <CompanyListTable ></CompanyListTable>
            </Card>
          </Col>
        </Row>

      </div >
    )
  }
}
export default CompanyList;
