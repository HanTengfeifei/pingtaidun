import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less';
import { Link } from 'dva/router';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function myHandleTableChange(pagination, filters, sorter) {
  const pager = this.state.pagination;
  pager.current = pagination.current;
  pager.limit = pagination.pageSize ;
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
    currentPage: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
}

function getTableData(url,params) {
  RequireUtils.baseRequire(url,params,function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      var keyList = list.map(function (item,index) {
        item.key = index ;
        return item ;
      }) ;
      const pagination = this.state.pagination;
      pagination.limit = pagination.pageSize ;
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        pagination
      });
    }else{
      this.setState({data:[]})
    }
  }.bind(this))
}
function showbill(id) {
  createHistory().push({
    pathname: '/customerbilllistdetail/?customerid='+id,
  })
}

class CustomerListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [],
      loading: false
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
  myRowClick(e,record){
    if(e.target.tagName=="A"){
      return false ;
    }
    createHistory().push({
      pathname: '/customerlistdetail/?customerid='+record.customer_id+"&myid="+record.id,
    })
  }

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('relation/cust-list',params)
  }
  componentDidMount() {
    this.fetch();
  }

  render() {
    const {data}=this.state;
    const columns = [{
      title: '供应商名称',
      dataIndex: 'company_name',
      key: 'company_name'
    }, {
      title: '企业类型',
      dataIndex: 'company_type',
      key: 'company_type',
    },{
      title: '联系人',
      dataIndex: 'company_contact',
      key: 'company_contact',
    },{
      title: '联系方式',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
    },{
      title: '联系地址',
      dataIndex: 'register_addr',
      key: 'register_addr',
    },{
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (text, record) => (
        <span>
          {text}  元
        </span>
      )
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}}  onClick={()=>showbill.bind(this)(record.id)}><Icon type="file" style={{marginRight:'5px'}}/>账单</a>
          </span>
        ),
      }];

    return (
      <div className={'my-table-title-center'}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
          onRow={(record) => {
            return {
              onClick: (e) => this.myRowClick(e,record),       // 点击行
            };
          }}
        />
      </div >
    )
  }
}
export default CustomerListTable;
