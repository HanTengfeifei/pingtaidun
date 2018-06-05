import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal,Tooltip } from 'antd';
import {RequireUtils} from 'utils';
import ZdbdList from './ZdbdList' ;
import XcbdList from './XcbdList' ;
import ExceptionClose from './ExceptionClose' ;
import UpdateZdbdList from './UpdateZdbdList' ;
import UpdateXcbdList from './UpdateXcbdList' ;
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function firstComfirm(title,content,callback) {
  Modal.confirm({
    title:title,
    content: content,
    onOk() {
      callback() ;
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


function acceptListOp(e,id,go){
  e.stopPropagation();
  e.preventDefault();
  var context = this;
  function callback(){
    RequireUtils.baseRequire('/order-deliver/accept',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要接单？','',callback)
}

function setoutListOp(e,id,go){
  e.stopPropagation();
  e.preventDefault();
  var context = this;
  function callback(){
    RequireUtils.baseRequire('/order-deliver/set-out',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要出单？','',callback)
}

function refuseListOp(e,id,go) {
  e.stopPropagation();
  e.preventDefault();
  var context = this;
  function callback(){
    RequireUtils.baseRequire('/order-deliver/except-close',{id:id,free_flag:1,car_memo:'司机拒绝'},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要拒绝出单？','',callback)
}

function excrptionCloseOp(e,id,go) {
  this.setState({
    myexception:true
  })
}

function zcbdListOp(e,id,go) {
  this.setState({
    zcbd:true
  })
}

function xcbdListOp(e,id,go) {
  this.setState({
    xcbd:true
  })
}

function getBadButton(item,go) {
  var type = Number(item.order_source );
  var car_status = Number(item.car_status);
  var str = '';
  const statusone = <div>
                        <div className={'my-custom-center'} style={{marginTop:'3px'}} onClick={(e)=>excrptionCloseOp.bind(this)(e,item.id,go)}>
                          <Button>异常关闭</Button>
                        </div>
                      </div>;
  if (type == 0) {
    switch (car_status) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        str = <span>{statusone}</span>
        break;
      default:
        break;
    }
  } else {
    switch (car_status) {
      case 0:
      case 1:
      case 2:
      case 3:
        str = <span>{statusone}</span>
        break;
      default:
        break;
    }
  }
  return str;
}


function updatezOp(e,item,go) {
  this.setState({
    updatezcbd:true
  })
}
function updatexOp() {
  this.setState({
    updatexcbd:true
  })
}

function getStatusButton(item,go) {
  var car_status=Number(item.car_status);
  var str = '' ;
  const statusone =  <div>
                          <div className={'my-custom-center'} style={{marginBottom:'3px'}} onClick={(e)=>acceptListOp(e,item.id,go)}>
                            <Button type="primary">接单</Button>
                          </div>
                          <div className={'my-custom-center'} onClick={(e)=>refuseListOp(e,item.id,go)}>
                            <Button>拒绝</Button>
                          </div>
                      </div>;
  const statussecond =  <div>
                          <div className={'my-custom-center' } onClick={(e)=>setoutListOp(e,item.id,go)}>
                            <Button type="primary">出发</Button>
                          </div>
                        </div>;
  const statusthree =  <div>
                          <div className={'my-custom-center'} >
                            <Button type="primary" onClick={(e)=>zcbdListOp.bind(this)(e,item.id,go)}>装车磅单</Button>
                          </div>
                        </div>;
  const statusfour = <div>
                        <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
                          <Button type="primary" onClick={(e)=>xcbdListOp.bind(this)(e,item.id,go)}>卸车磅单</Button>
                        </div>
                      </div>;
  const updatez = <div>
                    <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
                      <Button type="primary" onClick={(e)=>updatezOp.bind(this)(e,item,go)}>修改装车磅单</Button>
                    </div>
                  </div>;
  const updatex = <div>
                    <div className={'my-custom-center'}>
                      <Button type="primary" onClick={(e)=>updatexOp.bind(this)(e,item,go)}>修改卸车磅单</Button>
                    </div>
                  </div>;

    switch(car_status)
    {
      case 0:
          str = <span>
              {statusone}
          </span>
        break;
      case 1:
        str = <span>
              {statussecond}
          </span>
        break;
      case 2:
      case 3:
        str = <span>
              {statusthree}
          </span>
        break;
      case 4:
      case 5:
      case 6:
        str = <span>
              {statusfour}
              {updatez}
          </span>
        break;
      case 7:
        str = <span>
          {updatez}
          {updatex}
                <div className={'my-custom-center'}>
                    <span style={{color:'green'}}>已完结</span>
                </div>
            </span>
        break;
      case 8:
        str = <span style={{color:'red'}}>
                <div className={'my-custom-center'}>
                   <Tooltip placement="topLeft" title={item.car_memo}>
                      异常关闭
                  </Tooltip>
                </div>
              </span>
        break;
      default:
        break ;
    }
  return str ;
}

class ExitMyStatusButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zcbd:false,
      xcbd:false,
      myexception:false,
      updatezcbd:false,
      updatexcbd:false,
      imgsFiles:[]
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  handleZcbdCancel(){
   /* this.refs['UpdateCar'].resetFields() ;*/
    this.setState({
      zcbd:false
    });
  }
  handleXcCancel(){
    /* this.refs['UpdateCar'].resetFields() ;*/
    this.setState({
      xcbd:false
    });
  }
  handleExCancel(){
    this.setState({
      myexception:false
    });
  }

  handleUpdateZdbdCancel(){
    this.setState({
      updatezcbd:false
    });
  }
  handleUpdateXcbdCancel(){
    this.setState({
      updatexcbd:false
    });
  }

  render() {
    const {item,go} = this.props ;
    const {zcbd,xcbd,myexception,updatezcbd,updatexcbd} = this.state ;
    const mybuttons =  getStatusButton.bind(this)(item,go)   ;
    const exception = getBadButton.bind(this)(item,go) ;


    var imgFiles = [{
      uid: new Date(),
      name: item.send_bill,
      status: 'done',
      url: RequireUtils.ip+"resource/image/bill/"+item.send_bill
    }] ;
    var rimgFile=[{
      uid: "recv"+new Date(),
      name: item.send_bill,
      status: 'done',
      url: RequireUtils.ip+"resource/image/bill/"+item.recv_bill
    }]
   /* const imgFiles = */
    return (
      <div>
        {mybuttons}
        {exception}
        <Modal title="装车磅单"
               visible={zcbd}
               onOk={this.handleOk}
               onCancel={this.handleZcbdCancel}
               footer={null}>
          <ZdbdList item={item} handleZcbdCancel={this.handleZcbdCancel.bind(this)} go={go}></ZdbdList>
        </Modal>
        <Modal title="卸车磅单"
               visible={xcbd}
               onOk={this.handleOk}
               onCancel={this.handleXcCancel.bind(this)}
               footer={null}>

          <XcbdList item={item} handleXcCancel={this.handleXcCancel.bind(this)} go={go}></XcbdList>
        </Modal>
        <Modal title="卸车磅单"
                        visible={xcbd}
                        onOk={this.handleOk}
                        onCancel={this.handleXcCancel.bind(this)}
                        footer={null}>

        <XcbdList item={item} handleXcCancel={this.handleXcCancel.bind(this)} go={go}></XcbdList>
      </Modal>
        <Modal title="异常关闭"
               visible={myexception}
               onOk={this.handleOk}
               onCancel={this.handleExCancel.bind(this)}
               footer={null}>
          <ExceptionClose item={item} handleExCancel={this.handleExCancel.bind(this)} go={go}></ExceptionClose>
        </Modal>
        <Modal title="修改装车磅单"
               visible={updatezcbd}
               onOk={this.handleOk}
               onCancel={this.handleUpdateZdbdCancel.bind(this)}
               footer={null}>
          <UpdateZdbdList item={item} imgFiles={imgFiles} handleUpdateZdbdCancel={this.handleUpdateZdbdCancel.bind(this)} go={go}></UpdateZdbdList>
        </Modal>
        <Modal title="修改卸车磅单"
               visible={updatexcbd}
               onOk={this.handleOk}
               onCancel={this.handleUpdateXcbdCancel.bind(this)}
               footer={null}>
          <UpdateXcbdList item={item} rimgFile={rimgFile} handleUpdateXcbdCancel={this.handleUpdateXcbdCancel.bind(this)} go={go}></UpdateXcbdList>
        </Modal>
      </div>
    )
  }
}
export default ExitMyStatusButton;
