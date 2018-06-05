import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import MerchandiseControlTd from './MerchandiseControlTd' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pagination:{},
      data: [{
        key: '2',
        company: '晋煤天庆',
        gas:'焦炉气',
        temp:'低温液',
        report:'气质报告',
        time:'2018-12-02',
        type:'自提',
        way:'款到发货',
        place:'山东德州临邑县',
        station:'东外环加气站',
        numway:'定量',
        allnum:'100吨',
        money:'465000',
        status:'在售'
      },
        {
          key: '3',
          company: '晋煤天庆',
          gas:'焦炉气',
          temp:'低温液',
          report:'气质报告',
          time:'2018-12-02',
          type:'自提',
          way:'款到发货',
          place:'山东德州临邑县',
          station:'东外环加气站',
          numway:'定量',
          allnum:'100吨',
          money:'465000',
          status:'在售'
        }]
    };
this.FindProductionAll=this.FindProductionAll.bind(this);
this.handleTableChange=this.handleTableChange.bind(this);
  }
  fetch = (params ) => {
    console.log('params:', params);
    this.setState({ loading: true });
    RequireUtils.baseRequire('goods/goods-list',params,function (data){
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        console.log(data);
        console.log(5555);
        //Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        this.setState({
          loading: false,
          data: data.data.list,
          pagination,
        });
      }
      else{
       message.error("获取用户信息失败");
      }
    }.bind(this));
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }
  componentDidMount() {
    // console.log("我又执行了一次");
    // const obj={};
    // obj.page=1;
    // obj.limit=10;
    // console.log(obj);
    // this.fetch(obj);
  }
  FindProductionAll(){
    const obj={};
    obj.page=1;
    obj.limit=10;
    console.log(obj);
    this.fetch(obj);
  }
  render() {
    const {data}=this.state;
    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <MerchandiseControlTd  text={text} item={record}></MerchandiseControlTd>
      )
    }];
    return (
      <div>
        <Divider></Divider>
        <Table showHeader={false} className={'no-padding'} columns={columns} dataSource={this.props.goods} pagination={this.state.pagination} loading={this.state.loading} onChange={this.handleTableChange}/>
      </div >
    )
  }
}
export default MerchandiseControl;
