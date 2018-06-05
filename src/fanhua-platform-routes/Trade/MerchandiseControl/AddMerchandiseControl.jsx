import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import mystyle from './tabstyle.less' ;
import createHistory from 'history/createHashHistory';
import MerchandiseDetailBasic from  './MerchandiseDetailBasic' ;
import SaleMerchandiseMessage from  './SaleMerchandiseMessage' ;
import MerchandiseCalendar from  './MerchandiseCalendar' ;
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class AddMerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child:{},
      all:{},

    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  callback(key) {
    this.setState({
      child:this.child.state.productDetail,
    })
  }
  onRef(ref){
    this.child=ref;
  }
  onRef2(ref){
    this.childS=ref;
  }

  componentDidMount(){
    // RequireUtils.baseRequire('car/car-list',params,function (data){
    //   if(data.code==1) {
    //     const pagination = { ...this.state.pagination };
    //     console.log(data);
    //     //Read total count from server
    //     // pagination.total = data.totalCount;
    //     pagination.total = data.count;
    //     this.setState({
    //       loading: false,
    //       data: data.data.list,
    //       pagination,
    //     });
    //   }
    //   else{
    //     alert("获取用户信息失败！");
    //   }
    // }.bind(this));
  }
  handleSubmit (e){
    e.preventDefault();
    const obj={};
    obj.prod_id=this.child.state.prod_id;
    obj.goods_stock=this.child.state.goods_stock;
    obj.deliver_type=this.child.state.deliver_type;
    obj.contact_id=this.child.state.contact_id;
    obj.stock_type=this.child.state.stock_type;
    obj.pay_type=this.child.state.pay_type;
    obj.status=this.child.state.status;
  obj.price_options=JSON.stringify(this.childS.state.all);
  console.log(obj);
RequireUtils.baseRequire('goods/add-goods',obj,function (data){
      if(data.code==1) {
        message.success(data.msg);
        //Read total count from server
        // pagination.total = data.totalCount;
        createHistory().push({
          pathname: '/merchandisemontrol/'
        })
        // window.location.href = "#/merchandisemontrol";
      }
      else{
        alert(data.msg);
      }
    }.bind(this));
  }
  render() {
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="商品添加" type="card">
              <MerchandiseDetailBasic  info={this.state.child}></MerchandiseDetailBasic>
              <Divider></Divider>
              <SaleMerchandiseMessage  sentParents={this.callback} onRef={this.onRef}  ></SaleMerchandiseMessage>
              <Divider></Divider>
              <MerchandiseCalendar onRef2={this.onRef2}  ></MerchandiseCalendar>
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
export default AddMerchandiseControl;
