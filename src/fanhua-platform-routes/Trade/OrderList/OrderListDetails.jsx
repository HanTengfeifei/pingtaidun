import React from 'react';
import { Card, Row, Col, Tabs, Select,Rate,Input,Button  } from 'antd';
import {RequireUtils} from 'utils';
import { Divider } from 'antd';
import BasicMessage from './BasicMessage' ;
import OrderListDetailsAddrTable from './OrderListDetailsAddrTable' ;
import OrderListDetailsYunTable from './OrderListDetailsYunTable' ;
import OrderListDetailsSumTable from './OrderListDetailsSumTable' ;
import MyAssetMessage from './MyAssetMessage' ;
import mystyle from './tabstyle.less'

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function getAddress(address){
  var addstr = "" ;
  if(address.length>0){
    addstr =  <div>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>地址信息</Col>
                </Row>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col><OrderListDetailsAddrTable address = {address} ref={"order_address"} _pmyself={this}></OrderListDetailsAddrTable></Col>
                </Row>
             </div>
  }
  return addstr ;
}

function getYunDan(yundan,order)  {
  var addstr = "" ;
  if(yundan.length>0){
    addstr =  <div>
      <Row gutter={8} style={{ marginTop: '10px' }}>
        <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>运单信息</Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '10px' }}>
        <Col><OrderListDetailsYunTable yundan={yundan} order={order}></OrderListDetailsYunTable></Col>
      </Row>
    </div>
  }
  return addstr ;
}

function getFinish(finish) {
    var addstr = "" ;
    if(finish.length>0){
      addstr =  <div>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>结算信息</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col><OrderListDetailsSumTable finish={finish}></OrderListDetailsSumTable></Col>
        </Row>
      </div>
    }
    return addstr ;
}

/**
 * 更改评价信息
 * @param value
 */
function messageChange(value) {
  this.setState({
    assetMessage:value
  })
}



/**
 * 评价按钮
 */
function assetOp(id) {
  var obj = {order_id:id} ;
  var rateStar = this.state.rateValue ;
  var assetMessage = this.state.assetMessage ;
  obj["comment_rank"] = rateStar ;
  obj["comment_text"] = assetMessage ;
  var currentDate = new Date() ;
  var month = currentDate.getMonth()<10?"0"+currentDate.getMonth():currentDate.getMonth() ;
  var mydate =  currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate() ;
  var ndate = currentDate.getFullYear() + "-" + month +"-"+mydate ;
  obj['comment_date'] = ndate ;
  RequireUtils.baseRequire('order-finish/add-comment',obj,function (data) {
    if (data.code)
    {
      alert(data.msg);
      this.setState({
        loading:false,
        rateValue:0,
        assetMessage:""
      }) ;
      window.location.reload() ;
    }else{
      alert(data.msg);
      this.setState({
        loading:false
      }) ;
    }
  }.bind(this));
}

function getRateStar(order) {
  var addstr = "" ;
  var rateValue = this.state.rateValue ;
  var mycomment = this.state.comment ;
  return addstr ;
}

class OrderListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order:{},
      address:[],
      deleteaddress:[],
      myoldnum:[],
      yundan:[],
      finish:[],
      comment:[],
      rateValue:0,
      assetMessage:""
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

   fetch(){
    var _this = this ;
    var search = this.props.location.search ;
    var id = search.split("=")[1] ;
    RequireUtils.baseRequire("order/order-details",{id:id},function (data) {
      if(data.code==1) {
        var data = data.data ;
        var address = data.address ;
        var oldaddress = address ;
        const naddress = address.map(function (item,index) {
          item.key= index ;
          item.editable = false ;
          return item ;
        }) ;
        const mynaddress = oldaddress.map(function (item,index) {
          var obj = {} ;
          obj.myindex = index ;
          obj.recv_sum = item.recv_sum ;
          return obj ;
        }) ;
        var nyundan = data.yundan.map(function (item,index) {
          item.key= index ;
          return item ;
        }) ;
        var nfinish = data.finish.map(function (item,index) {
          item.key= index ;
          return item ;
        }) ;
        _this.setState({
          order:data.order,
          address:naddress,
          myoldnum:mynaddress,
          yundan:nyundan,
          finish:nfinish,
          comment:data.comment
        })
      }else{
        _this.setState({
          order:{},
          address:[],
          myoldnum:[],
          yundan:[],
          finish:[]
        })
      }
    }.bind(this))
  }

  componentDidMount() {
    this.fetch() ;
  }
  rateHandleChange= (value) => {
    this.setState({rateValue:value  });
  } ;
  render() {
    const {  order,
            address,
            finish,
            yundan
    } = this.state ;
    const myaddress = getAddress.bind(this)(address) ;
    const myyundan = getYunDan.bind(this)(yundan,order) ;
    const myfinish = getFinish.bind(this)(finish) ;
    return (
      <div >
        <Card hoverable title="查看订单详情" type="card">
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>企业基本信息</Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col>
              <BasicMessage order={order} _pmyself={this} go={this.fetch}></BasicMessage>
            </Col>
          </Row>
          <Divider></Divider>
          {myaddress}
          {myyundan}
          {myfinish}
        </Card>
      </div >
    )
  }
}
export default OrderListDetails;
