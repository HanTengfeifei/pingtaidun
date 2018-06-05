import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import WuliuWayBillDetailTable from './WuliuWayBillDetailTable' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WuliuWayBillDetailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      cars:[],
      id:""
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  fetch(){
    var _this = this ;
    var search = this.props.location.search ;
    var params = search.split("&") ;
    var id = params[0].split("=")[1] ;
    RequireUtils.baseRequire("order-deliver/deliver-details",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.deliver ;
        var cars = data.data.cars ;
        var nlist = list.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        var ncars = cars.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        _this.setState({
          data:nlist,
          cars:ncars
        }) ;
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }
  componentDidMount(){
    this.fetch() ;
  }

  render() {
    const {data,cars} = this.state ;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="运单详情" type="card">
              <WuliuWayBillDetailTable datas={data} cars={cars} go={this.fetch} _pthis = {this}></WuliuWayBillDetailTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default WuliuWayBillDetailList;
