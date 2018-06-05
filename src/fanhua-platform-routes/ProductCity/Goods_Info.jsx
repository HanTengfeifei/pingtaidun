import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Divider,Modal  } from 'antd';
import { Link } from 'dva/router';
import Report from './Report';
import './Header.less';
import './Goods_Info.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Goods_Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      addrName:"",
      goodsName:"",
      goodsId:"",
      address:"",
      addr_detail:"",
      deliver_type:"",
      price:"",
      temp_name:"",
      gas_value:"",
      hot_value:"",
      type_name:"",
      weight:"",
      area_name:"",
      percent:"",
      companyName:"",
      prod_id:"",
      ok:false,

    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){
  }

  componentWillMount(){
    console.log("will");
    console.log(this.props.id);
    const id=this.props.id;
    RequireUtils.baseRequire('mall/order-page',{id:id},function (data){
      if(data.code==1) {
        this.setState({
          goodsName:data.data.info.goods.goodsName,
          goodsId:data.data.info.goods.goodsId,
          address:data.data.info.goods.address,
          addr_detail:data.data.info.goods.addr_detail,
          deliver_type:data.data.info.goods.deliver_type,
          price:data.data.info.goods.price,
          temp_name:data.data.info.goods.temp_name,
          gas_value:data.data.info.goods.gas_value,
          hot_value:data.data.info.goods.hot_value,
          type_name:data.data.info.goods.type_name,
          weight:data.data.info.goods.weight,
          addrName:data.data.info.goods.addrName,
          area_name:data.data.info.goods.area_name,
          percent:data.data.info.goods.percent,
          companyName:data.data.info.goods.companyName,
          prod_id:data.data.info.goods. prod_id,
          ok:true,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
    // this.setState({
    //
    // })
  }
  componentWillReceiveProps(){
    console.log("receive");
    console.log(this.props.id);
  }
  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('person/person-info',{},function (data) {
      if(data.code==1) {
        this.setState({
          info:data.data.info
        });
        localStorage.setItem('company_id', data.data.info.company_id);
        console.log(this.state.info);
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  render() {
    const { ok, prod_id, goodsName, goodsId, address, addr_detail, deliver_type, price, temp_name, gas_value, hot_value, type_name,weight,addrName,area_name,percent,companyName}=this.state;
    return (
      <div>
        { ok ?
          <div>
          <Row gutter={8} style={{marginTop: '10px'}}>
            <Col span={4}>
              <span>{goodsName ? goodsName : "我是谁"}</span>
            </Col>
            <Col span={14}>

            </Col>
            <Col span={6}>
              <p style={{wordWrap: "break-word"}}>商品编号:{goodsId ? goodsId : "未知编号"}</p>
            </Col>
          </Row>
          < Divider />
          <Row gutter={8} style={{marginTop: '10px'}}>
          <Col span={10}>
          <p>库存量:{weight ? weight : "0"}</p>
          <p>{addrName ? addrName : "我在哪"}</p>
          <p>{addr_detail ? addr_detail : "我到底在哪"}</p>
          </Col>
          <Col span={9}>

          </Col>
          <Col span={5}>
          <p >单价: <span style={{color: "red", fontSize: 20}}> {price ? price : "我值多少钱"}</span>  /吨</p>
          </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{marginTop: '10px'}}>
          <Col span={10}>
          <p>{goodsName ? goodsName : "我是谁"}<Divider type="vertical" />{type_name ? type_name : "气类型"}<Divider type="vertical" />{area_name ? area_name : "原产地"}</p>
          <p>{temp_name ? temp_name : "原产地"} <Divider type="vertical" /> <span> 气化率: {percent ? percent : "原产地"}</span> <Divider type="vertical" /><span> 热值: {hot_value ? hot_value : "未知"}</span></p>
          <p>{addr_detail ? addr_detail : "我到底在哪"}</p>
          </Col>
          <Col span={9}>

          </Col>
          <Col span={5} >
          <Modal
          title="气质报告"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
          <Report   prod_id={prod_id}/>
          </Modal>
          <p >供应商: <span>{companyName ? companyName : "谁是卖家"}</span></p>
          <div  className="report" onClick={this.showModal}>
          <span>气质报告:<Icon type="profile" /></span>
          </div>
          </Col>
          </Row>
          </div>
              :<div></div>
            }
      </div>
    )
  }
}
export default Goods_Info;
