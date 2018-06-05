import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import {RequireUtils} from 'utils';
import AddScantlingManagement from './AddScantlingManagement' ;
import UpdateContractManagement from './UpdateScantlingManagement' ;
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

class ScantlingManagementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      staionadd:false,
      staionupdate:false,
      imageFiles:[],
      pagination: {pageSize:10},
      updateData:null,
      loading: false
    };
this.fetch=this.fetch.bind(this);
this.isNull=this.isNull.bind(this);
this.checkNull=this.checkNull.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('product/product-list',params)
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
  isNull(data){
    return (  data == undefined || data == null) ? "" : data;
  }
  checkNull(obj){
    const _this=this;
    const newObj=obj;
    Object.keys(obj).forEach(function(item){

    newObj[item]=_this.isNull(obj[item]);

    });
    return newObj;
  }

  updateStaion(id){
    var _this = this ;
    RequireUtils.baseRequire("product/product-info",{id:id},function (data) {
      if(data.code==1){
        var list = _this.checkNull(data.data.info);
        var imgs = data.data.report;
        if(imgs.length!=0) {
          var newimg = imgs.map(function (item, index) {
            var myobj = {
              uid: index,
              name: item,
              status: 'done',
              url: item
            };
            return myobj;
          });
        }else{
          var newimg=[];
        }
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
        RequireUtils.baseRequire('product/del-product',{
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
      title: '标品名称',
      dataIndex: 'prod_name',
      key: 'prod_name'
    }, {
      title: '起源类型',
      dataIndex: 'type_name',
      key: 'type_name',
    },{
      title: '气源产地',
      dataIndex: 'place_name',
      key: 'place_id',
    },{
      title: '气源地区',
      dataIndex: 'area_name',
      key: 'area_id',
    },{
      title: '热值',
      dataIndex: 'hot_value',
      key: 'hot_value',
    } ,{
        title: '气化率',
        dataIndex: 'gas_value',
        key: 'gas_value',
      } ,{
        title: '液温',
        dataIndex: 'temp_name',
        key: 'temp_id',
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
              新增标品
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

        <Modal title="新增标品"
               visible={staionadd}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <AddScantlingManagement ref={'AddContractManagement'} handleAddCancel={this.handleAddCancel} go={()=>this.fetch(this.state.pagination)}></AddScantlingManagement>
        </Modal>
        <Modal title="标品编辑"
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
export default ScantlingManagementTable;
