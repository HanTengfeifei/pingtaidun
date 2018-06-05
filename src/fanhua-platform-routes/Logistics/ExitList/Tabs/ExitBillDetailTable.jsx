import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import ExitWayBillDetailTd from './ExitWayBillDetailTd' ;
import ExitWayBillDetailChildrenTd from './ExitWayBillDetailChildrenTd' ;

import tablestyle from '../tablestyle.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitBillDetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.callback = this.callback.bind(this);
  }

  componentDidMount(){
    var _this = this ;
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  callback(key) {
    console.log(key);
  }


  render() {
    const {datas,cars,go,_pthis}=this.props;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <ExitWayBillDetailTd item = {record} go={go} _pthis = {_pthis}></ExitWayBillDetailTd>
      )
    }];

    return (
      <div>
        <Table
          className={'no-padding'}
          showHeader={false}
          columns={columns}
          dataSource={datas}
          pagination={{ position: 'none' }}
          bordered={false}
        />
        <div>
          {cars.map(function (item,index) {
            return <ExitWayBillDetailChildrenTd item={item}  go={go} _pthis = {_pthis} key={index} style={{ margin: 0 }}></ExitWayBillDetailChildrenTd>
          })}
        </div>
      </div>
    )
  }
}
export default ExitBillDetailTable;
