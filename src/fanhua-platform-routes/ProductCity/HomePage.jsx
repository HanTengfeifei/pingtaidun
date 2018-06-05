import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select ,message,BackTop} from 'antd';
import Header from './Header';
import Brand from './Brand';
import Info from './Center';
import Item from './Items';
import  Menud from './Menu';
import './HomePage.less';
import {RequireUtils} from 'utils';
import Items from "./Items";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
      ],
      goods:[],
      sumCar:null,
      sumPrice:null,
      sumWeight:null,
    }
    this.callback = this.callback.bind(this);
    this.findRoleAll=this.findRoleAll.bind(this);
    };

  callback(key) {
    console.log(key);
  }
  componentWillMount(){
    RequireUtils.baseRequire('mall/home-page',{},function (data){
      if(data.code==1) {
        this.setState({
          banner:data.data.datalist.banner,
          goods:data.data.datalist.goods,
          sumCar:data.data.datalist.sumCar,
          sumPrice:data.data.datalist.sumPrice,
          sumWeight:data.data.datalist.sumWeight,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  componentDidMount(){
  }
  findRoleAll(){

  }
  render() {
    const {banner,goods, sumCar,sumPrice,sumWeight}=this.state;
    return (
      <div className={"my-custom-htf"}>
        <BackTop/>
        <Menud />
        <Row>
          <Header />
        </Row>
        <Row>
   <Brand  banner={banner} />
        </Row>
        <Row>
   <Info  sumCar={sumCar} sumPrice={sumPrice} sumWeight={sumWeight}/>
        </Row>
        <Row>
   <Item   goods={goods} />
        </Row>
      </div >
    )
  }
}
export default HomePage;
