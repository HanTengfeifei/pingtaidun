import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message} from 'antd';
import createHistory from 'history/createHashHistory';
import AddOrderInput from  './AddOrderInput';
import AddOrderTable from  './AddOrderTable';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class AddOrderAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saler_id_productions:[],
      child:"",
      all:{},
      contact_name:"",
      price:null,
      countAll:0,
      company_all:{},
      goods_id:"",
      goods_name:"",
    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.callbackS=this.callbackS.bind(this);
    this.receiveValue=this.receiveValue.bind(this);
    this.countAll=this.countAll.bind(this);
    this.saveTow=this.saveTow.bind(this);
  }
  receiveValue(value){
    console.log(value);
    console.log(8866);
  }
  countAll(value){
    this.setState({
      countAll:value,
    })
  }
  callback(value) {
    console.log(value);
    RequireUtils.baseRequire('order/goods-list',{saler_id:value},function (data){
      if(data.code==1) {
        this.setState({
          saler_id_productions: data.data.list,
        });
      }
      else{
        alert("获取业务联系人失败!");
      }
    }.bind(this));

  }
  saveTow(number){
    var value=Math.round(parseFloat(number)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
      value=value.toString()+".00";
      return value;
    }
    if(xsd.length>1){
      if(xsd[1].length<2){
        value=value.toString()+"0";
      }
      return value;
    }

  }
  callbackS(value,value1,value2,value3){
    this.setState({
      contact_name:value,
      price:value1,
      goods_id:value2,
      goods_name:value3,
    })
  }
  onRef(ref){
    this.child=ref;
  }
  onRef2(refS){
    this.childS=refS;
  }
  componentDidMount(){
    RequireUtils.baseRequire('order/company-info',{},function (data){
      if(data.code==1) {
        console.log(data);
        this.setState({
          company_all:data.data.info,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  handleSubmit (e){
    e.preventDefault();
    const obj={};
    obj.goods_id=this.state.goods_id;
    obj.order_kind=0;
    obj.order_source=this.child.state.order_source;
    obj.saler_id=this.child.state.saler_id;
    obj.buyer_id=this.child.state.buyer_id;
    obj.contract_id=this.child.state.contract_id;
    obj.deliver_date=this.child.state.deliver_date;
    obj.buyer_person=this.child.state.buyer_person;
    obj.recv_addrs=JSON.stringify(this.child.state.station_all);
    console.log(obj);
    RequireUtils.baseRequire('order/add-order',obj,function (data){
      if(data.code==1) {
        message.success(data.msg);
        //Read total count from server
        // pagination.total = data.totalCount;
        createHistory().push({
          pathname: '/orderlist/'
        })
        // window.location.href = "#/merchandisemontrol";
      }
      else{
        alert(data.msg);
      }
    }.bind(this));
  }
  render() {
    const element=<div><Row gutter={8} style={{ marginTop: '10px' }}>
      <Col span={4} >
     商品名称
      </Col>
      <Col span={5} >
        商品总量
      </Col>
      <Col span={5} >
        商品总价
      </Col>
      <Col span={5} >
        预计运费
      </Col>
      <Col span={5}  style={{textAlign:"right"}}>
        预计扣除金额
      </Col>
    </Row></div>;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable   style={{margin:0}} title="订单添加" type="card">
              <AddOrderInput   company_all={this.state.company_all}  numberAll={this.state.countAll} countAll={this.countAll}  contact_name={this.state.contact_name} sent={this.receiveValue} sentParents={this.callback}  onRef={this.onRef}/>
              <Divider></Divider>
              <AddOrderTable  sentParents={this.callbackS}   saler_id_productions={this.state.saler_id_productions}   ref="table" onRef2={this.onRef2} info={this.state.child}/>
              <Divider></Divider>
              <Card title={element} bordered={false} style={{ width: "100%" }}>
                <div><Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col span={4} >
                    {this.state.goods_name}
                  </Col>
                  <Col span={5} >
                    {this.saveTow(this.state.countAll)}
                  </Col>
                  <Col span={5} >
                    {this.saveTow(this.state.countAll*this.state.price)}
                  </Col>
                  <Col span={5} >
                    <Icon type="pay-circle-o" />{this.saveTow(this.state.countAll*this.state.price*0.075)}
                  </Col>
                  <Col span={5}  style={{textAlign:"right", color:"red"}}>
                    <Icon  type="pay-circle-o" />{this.saveTow(this.state.countAll*this.state.price*(1+0.075))}
                  </Col>
                </Row></div>
              </Card>
              <Divider></Divider>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={6} >
                  <Button  type="primary"  onClick={this.handleSubmit}>提交</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default AddOrderAll;
