import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form } from 'antd';
import { Divider } from 'antd';
class PurchaseBusinessStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '1',
        num:'123456',
        customername: '某某企业1',
        linkpeople: "张大伟",
        linktype: '1234567891',
        balance:'10000.00',
        allnum:"100000吨",
        money:"360000万"
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
      title: '编号',
      dataIndex: 'num',
      key: 'num'
    }, {
      title: '客户企业名称',
      dataIndex: 'customername',
      key: 'customername',
      render: (text, record) => (
        <span>
            <a href="javaScript:void(0)" style={{color:"#1890ff"}}>{text}</a>
        </span>
      ),
    },{
      title: '联系人',
      dataIndex: 'linkpeople',
      key: 'linkpeople',
    },{
      title: '联系方式',
      dataIndex: 'linktype',
      key: 'linktype',
    },{
      title: '客户余额',
      dataIndex: 'balance',
      key: 'balance',
    }
      ,{
        title: '买入合计',
        dataIndex: 'allnum',
        key: 'allnum',
      }
      ,{
        title: '累计交易额',
        dataIndex: 'money',
        key: 'money',
      }
    ];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div >
    )
  }
}


export default  PurchaseBusinessStatistics;
