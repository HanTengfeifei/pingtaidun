import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import mystyle from './tabstyle.less' ;
import AddCompanyInput from './add/AddCompanyInput' ;
import UpdateCompanyInput from './add/UpdateCompanyInput' ;

import createHistory from 'history/createHashHistory';

import {RequireUtils} from 'utils';
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

class CompanyListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addcompany:false,
      pagination: {pageSize:10},
      updateData:{},
      firstEnter:false,
      updatecompany:false,
      imgFiles:[]
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

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }

  fetch(params = {}) {
    getTableData.bind(this)('company/company-list',params)
  }

  componentDidMount() {
    this.fetch();
  }


  addCompanyList(){
    this.setState({
      addcompany:true
    })
  }

  handleAddCancel = () => {
    this.refs['AddCompanyInput'].resetFields() ;
    this.setState({
      addcompany:false,
    });
  } ;
  handleUpateCancel = () => {
    this.refs['UpdateCompanyInput'].resetFields() ;
    this.setState({
      updatecompany:false,
    });
  } ;

  deleteStaion(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该用户账号吗？',
      content: '删除后，该用户及其子账户将被清除',
      onOk() {
        RequireUtils.baseRequire('addr/del-addr',{
          id: id,
        },function (data) {
          alert(data.msg);
          this.fetch(this.state.pagination) ;
        }.bind(context));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  updateCompany(id){
    var _this = this ;
    RequireUtils.baseRequire("company/company-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info;
          var myobj = {
            uid: new Date().getTime(),
            name: list.license_url,
            status: 'done',
            url: list.license_url
          }  ;

        _this.setState({
          updatecompany:true,
          updateData: list,
          firstEnter:true,
          imgFiles:[myobj]
        });
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }

  updateStaion(id){
    var _this = this ;
    RequireUtils.baseRequire("addr/addr-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info;
        _this.setState({
          staionupdate:true,
          updateData: list,
          firstEnter:true
        });
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }
  myRowClick(e,record){
    if(e.target.tagName=="A"){
      return false ;
    }
    createHistory().push({
      pathname: '/CompanyInformation/?id='+record.id,
    })
  }
  render() {
    const {data,addcompany,updatecompany,updateData,firstEnter,imgFiles}=this.state;
    const columns = [{
      title: '公司名称',
      dataIndex: 'company_name',
      key: 'company_name',
    },{
      title: '公司简称',
      dataIndex: 'company_abbr',
      key: 'company_abbr',
    },{
      title: '公司人员',
      dataIndex: 'emp_count',
      key: 'emp_count',
    },{
      title: '地址',
      dataIndex: 'register_addr',
      key: 'register_addr'
    },{
      title: '上线情况',
      dataIndex: 'company_status',
      key: 'company_status',
      render:(text,record)=>(
        <span>{text==0?'下线':'上线'}</span>
      )
    }
    // ,{
    //   title: '余额明细',
    //   dataIndex: 'detail',
    //   key: 'detail',
    //
      // }
      ,{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}}  onClick={()=>this.updateCompany.bind(this)(record.id)}><Icon type="edit" style={{marginRight:'5px'}}/>编辑</a>
            {/*<a href="javaScript:void(0)" onClick={(e)=>this.deleteStaion.bind(this)(e,record.id)}><Icon type="delete" style={{marginRight:'5px'}}/>删除</a>*/}
        </span>
        ),
      }];

    return (
      <div className={'my-table-platformcompany-title-center my-custom-padding'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div style={{marginBottom:'10px',textAlign:'right'}}>
                    <span onClick={this.addCompanyList.bind(this)}>
                       <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                        新增
                    </span>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onRow={(record) => {
            return {
              onClick: (e) => this.myRowClick(e,record),       // 点击行
            };
          }}
          onChange={this.handleTableChange.bind(this)} />

        <Modal title="新增公司"
               visible={addcompany}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               width={'60%'}
               footer={null}>
          <AddCompanyInput ref={'AddCompanyInput'} handleAddCancel={this.handleAddCancel} go={()=>this.fetch(this.state.pagination)}></AddCompanyInput>
        </Modal>
        <Modal title="编辑公司"
               visible={updatecompany}
               onOk={this.handleOk}
               onCancel={this.handleUpateCancel}
               width={'60%'}
               footer={null}>
          <UpdateCompanyInput reactp={this}  imgFiles={imgFiles} updateData={updateData}  firstEnter={firstEnter} ref={'UpdateCompanyInput'} handleUpateCancel={this.handleUpateCancel} go={()=>this.fetch(this.state.pagination)}></UpdateCompanyInput>
        </Modal>
      </div >
    )
  }
}
export default CompanyListTable;
