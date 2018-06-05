import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import {RequireUtils} from 'utils';
import AddContractManagement from  './AddContractManagement' ;
import UpdateContractManagement from  './UpdateContractManagement' ;
import mystyle from './tabstyle.less'
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

class ContractManagementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      staionadd:false,
      staionupdate:false,
      imageFiles:[],
      pagination: {pageSize:10},
      updateData:[],
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
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('contract/contract-list',params)
  }
  componentDidMount() {
    this.fetch();

  }
  handleAddCancel = () => {
    this.refs['AddContractManagement'].resetFields() ;
    this.setState({
      staionadd:false,
    });
  } ;
  handleUpateCancel = () => {
    this.refs['UpdateContractManagement'].resetFields() ;
    this.setState({
      staionupdate:false,
    });
  } ;

  addFieldStationList(){
    this.setState({
      staionadd:true
    })
  }

  updateStaion(id){
    var _this = this ;
    RequireUtils.baseRequire("contract/contract-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.contract;
        var imgs = data.data.images;
        var newimg = imgs.map(function (item,index) {
          var myobj = {
            uid: index,
            name: item.contract_url,
            status: 'done',
            url: RequireUtils.ip+item.url
          }  ;
          return myobj ;
        }) ;

        console.log(newimg) ;
        _this.setState({
          staionupdate:true,
          updateData: list,
          imageFiles:newimg
        });
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }
  deleteStaion(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该用户账号吗？',
      content: '删除后，该用户及其子账户将被清除',
      onOk() {
        RequireUtils.baseRequire('contract/del-contract',{
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
  render() {
    const {data,staionadd,staionupdate,updateData,imageFiles}=this.state;
    const columns = [{
      title: '合同编号',
      dataIndex: 'contract_code',
      key: 'contract_code'
    }, {
      title: '合同名称',
      dataIndex: 'contract_name',
      key: 'contract_name',
    },{
      title: '合同甲方',
      dataIndex: 'seler_name',
      key: 'seler_name',
    },{
      title: '合同乙方',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
    },{
      title: '合同截止时间',
      dataIndex: 'end_date',
      key: 'end_date',
    } ,{
        title: '合同状态',
        dataIndex: 'status_name',
        key: 'status_name',
      } ,{
        title: '关联订单',
        dataIndex: 'related_order',
        key: 'related_order',
      render: (text, record) => (
        <span>
            <a href="javaScript:void(0)">订单</a>
        </span>
      ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javaScript:void(0)" onClick={()=>this.updateStaion.bind(this)(record.id)} style={{marginRight:'10px'}}><Icon type="edit" style={{marginRight:'5px'}}/>编辑</a>
            <a href="javaScript:void(0)" onClick={(e)=>this.deleteStaion.bind(this)(e,record.id)}><Icon type="delete"/>删除</a>
        </span>
        ),
      }];

    return (
      <div className={'my-table-title-center'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div onClick={this.addFieldStationList.bind(this)} style={{marginBottom:'10px',textAlign:'right'}}>
              <Icon type="plus-circle-o" style={{marginRight:'10px'}} />
              新增
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />

        <Modal title="合同新增"
               visible={staionadd}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <AddContractManagement ref={'AddContractManagement'} handleAddCancel={this.handleAddCancel} go={()=>this.fetch(this.state.pagination)}></AddContractManagement>
        </Modal>
        <Modal title="合同编辑"
               visible={staionupdate}
               onOk={this.handleOk}
               onCancel={this.handleUpateCancel}
               footer={null}>

          <UpdateContractManagement ref={'UpdateContractManagement'} handleUpateCancel={this.handleUpateCancel} imageFiles={imageFiles} reactp = {this}  updateData={updateData}  go={()=>this.fetch(this.state.pagination)}></UpdateContractManagement>
        </Modal>

      </div >
    )
  }
}
export default ContractManagementTable;