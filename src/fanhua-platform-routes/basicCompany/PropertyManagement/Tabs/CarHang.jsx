import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form, Divider,Modal } from 'antd';
import {RequireUtils} from 'utils';
import './CarHang.less' ;
import  Form2 from './EditCarHang';
import AddCarHang from './AddCarHang';
class CarHang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record:{},
      data: [],
      pagination:{},
      loading:false,
      visible:false,
      visible2:false,
      ModalText:"车挂添加",
      confirmLoading:false,
    };
    this.onRefS=this.onRefS.bind(this);
    this.findCarHangAll=this.findCarHangAll.bind(this);
  }
  onRef = (ref) => {
    this.child = ref;
  };
  onRefS(ref){
    this.childS = ref;
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.child.handleSubmit();
    }, 2000);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.child.reset();
  };
  handleOk2 = (e) => {
    this.childS.handleSubmit(e);
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
  handleCancel2 = (e) => {
    this.setState({
      visible2: false,
    });
    this.childS.reset();
  };

  fetch = (params ) => {
    this.setState({ loading: true });
    RequireUtils.baseRequire('car/car-list',params,function (data) {
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        var list = data.data.list ;
        var nlist = list.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        this.setState({
          loading: false,
          data: nlist,
          pagination,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  } ;

  componentDidMount() {
    const obj={};
    var company_id = localStorage.getItem("company_id") ;
    if(company_id&&company_id!="undefined"){
      obj.company_id = company_id
    }
    obj.page=1;
    obj.limit=10;
    obj.car_type=1;
    console.log(obj);
    this.fetch(obj);
  }
  findCarHangAll(){
    const obj={};
    var company_id = localStorage.getItem("company_id") ;
    if(company_id&&company_id!="undefined"){
      obj.company_id = company_id
    }
    obj.page=1;
    obj.limit=10;
    obj.car_type=1;
    console.log(obj);
    this.fetch(obj);
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    var obj = {} ;
    var company_id = localStorage.getItem("company_id") ;
    if(company_id&&company_id!="undefined"){
      obj.company_id = company_id
    }
    obj.limit =   pagination.pageSize;
    obj.page = pagination.current ;
    this.fetch(obj);
  } ;
  render() {
    const {data,visible, ModalText, confirmLoading , pagination,loading}=this.state;
    const columns = [{
      title: '车挂号',
      dataIndex: 'car_num',
      key: 'car_num'
    }, {
      title: '核载货总质量',
      dataIndex: 'car_load',
      key: 'car_load',
    },{
        title: '联系人',
        dataIndex: 'user_name',
        key: 'user_name',
      },{
      title: '联系电话',
      dataIndex: 'user_phone',
      key: 'user_phone',
    },{
      title: '所属公司',
      dataIndex: 'company_name',
      key: 'company_name',
    },
      {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" style={{marginRight:'10px'}}><Icon type="edit" /><span  onClick={(e) => {
            e.preventDefault();
            // e.stopPropagation();
            this.setState({
              visible2: true,
              record:record,
            });
          }}>编辑</span></a>
          <a href="#"><Icon type="delete" /><span onClick= {(e) => {
            e.preventDefault();
            e.stopPropagation();
            var context = this;
            Modal.confirm({
              title: '您确定要删除该车头信息吗？',
              content: '删除后，该车头信息将无法恢复',
              onOk() {
                RequireUtils.baseRequire('car/del-car',{
                  id: record.id,
                },function (data) {
                  if(data.code==1){
                    alert(data.msg);
                    this.findCarHangAll();
                  }
                  else{
                    alert(data.msg);
                  }
                }.bind(context));
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}>删除</span></a>
        </span>
      ),
    }];
    return (
      <div>
        <Modal
          title="编辑车挂信息"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          // key={role.role_id+this.state.keyAdd}
        >
          <Form2   record={this.state.record} onRefS={this.onRefS}  go={this.findCarHangAll} />
        </Modal>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={24} >
              <div style={{marginBottom:'10px',textAlign:'right'}}>
                <span style={{marginRight:'15px'}}>
                  <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                  批量导入
                </span>
                <span  onClick={this.showModal}>
                   <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                    新增
                </span>
              </div>
              <Modal title={ModalText}
                     visible={visible}
                     onOk={this.handleOk}
                     confirmLoading={confirmLoading}
                     onCancel={this.handleCancel}
                // afterClose={this.close}
              >
                <AddCarHang  onRef={this.onRef} go={this.findCarHangAll} />
              </Modal>
            </Col>
          </Row>
            <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange}/>
      </div >
    )
  }
}
export default  CarHang;
