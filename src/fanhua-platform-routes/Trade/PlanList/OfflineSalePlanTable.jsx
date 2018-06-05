import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import {RequireUtils} from 'utils';
import SalerUpdate from './SalerUpdate' ;

import  MySalerAddForm from './MySalerAddForm' ;
import { Modal } from 'antd';
import mystyle from './tabstyle.less' ;
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

class PlanListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select:{},
      update:false,
      buyeradd:false,
      saleadd:false,
      data: [],
      pagination: {pageSize:10},
      loading: false,
      confirmLoading: false,
      companyoption:[],
      productoption:[]
    };
    this.callback = this.callback.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    var obj = Object.assign(params,{plan_kind:2}) ;
    getTableData.bind(this)('plan/plan-list',obj)
  }

  componentDidMount() {
    this.fetch();
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

  handleOk = (e) => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      /* console.log(this.refs["form"]) ;
       this.refs["form"].handleSubmit(e);*/
    }, 2000);
  } ;
  handleCancel = () => {
    this.refs['SalerUpdate'].resetFields();
    this.setState({
      update:false,
    });
  } ;

  handleSaleCancel = () =>{
    this.refs['MySalerAddForm'].resetFields() ;
    this.setState({
      saleadd:false,
    });
  } ;
  myShowModal(id) {
    var _this = this ;
    RequireUtils.baseRequire("plan/plan-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info ;
        _this.setState({
          update:true,
          updateData:list
        });
      }else{
        this.setState({update:true,updateData:{}})
      }
    }.bind(this))
  }

  /**
   * 点击确定提交
   * @param e
   */

  render() {
    const {data,update,confirmLoading,updateData,productoption,companyoption,buyeradd,saleadd}=this.state;
    const columns = [{
      title: '归属合同',
      dataIndex: 'contract_name',
      key: 'contract_name',
    },{
      title: '销售方',
      dataIndex: 'saler_name',
      key: 'saler_name',
    },{
      title: '采购方',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
    },{
      title: '截止时间',
      dataIndex: 'end_date',
      key: 'end_date',
    },{
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
    },{
      title: '接受场地',
      dataIndex: 'addr_name',
      key: 'addr_name',
    },{
      title: '关联订单',
      dataIndex: 'order',
      key: 'order',
      render:(text, record)=>(
        "查看"
      )
    },{
      title: '当前状态',
      dataIndex: 'plan_status',
      key: 'plan_status',
      render: (text, record) => {
        if(text==0){ //表示正常
          return "正常" ;
        }else {
          return <span style={{color:"#de8c43"}}>终止</span>
        }
      }
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {

          return <span>
                  <a href="javaScript:void(0)" onClick={()=>this.myShowModal(record.id)}><Icon type="edit" />查看</a>
                </span>
        },
      }];
    return (
      <div className={'my-table-title-center'}>

        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />

        <Modal title="查看"
               visible={update}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               footer={null}
               width={'60%'}
        >
          <SalerUpdate ref={'SalerUpdate'} updateData={updateData} companyoption={companyoption} productoption={productoption}  handleCancel={this.handleCancel} go={()=>this.fetch(this.state.pagination)}></SalerUpdate>
        </Modal>
      </div >
    )
  }
}
export default PlanListTable;

