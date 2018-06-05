import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyCustomTd from './MyCustomTd' ;
import tablestyle from './tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyBalaceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '2',
        code:'9272653782755380',
        order: '927265328342342342',
        time:'2017-09-09',
        name: "黄冈气",
        purchase: '利华',
        sale:"凡华",
        allnum:'140吨',
        inplace:'湖北黄冈',
        inpeople:'陈先生',
        intel:'156283775767',
        place:"湖北黄冈",
        linkpeople:"黄波",
        telephone:'15678907655',
        money:'￥1,800,000,00',
        status:'待出车'
      },
        {
          key: '2',
          code:'9272653782755380',
          order: '927265328342342342',
          time:'2017-09-09',
          name: "黄冈气",
          purchase: '利华',
          sale:"凡华",
          allnum:'140吨',
          inplace:'湖北黄冈',
          inpeople:'陈先生',
          intel:'156283775767',
          place:"湖北黄冈",
          linkpeople:"黄波",
          telephone:'15678907655',
          money:'￥1,800,000,00',
          status:'待出车'
        }]
    };
    this.callback = this.callback.bind(this);
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
    const {data}=this.state;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <MyCustomTd item = {record}></MyCustomTd>
      )
    }];

    return (
      <div>
        <Table className={'no-padding'} showHeader={false} columns={columns} dataSource={data} bordered={'false'}/>
      </div >
    )
  }
}
export default MyBalaceTable;
