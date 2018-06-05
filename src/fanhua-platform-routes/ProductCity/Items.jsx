import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,Modal} from 'antd';
import MerchandiseControlTable from './MerchandiseControlTable' ;
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
// import MerchandiseDetail from './MerchandiseDetail' ;
// import MyTradeAdd from './TradeAdd' ;
// import mystyle from './tabstyle.less'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      ModalText:"商品添加",
      confirmLoading:false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    // const params=[
    //   {goods_price:12, goods_date:"2018-4-13", status:0,},
    //   {goods_price:12, goods_date:"2018-4-20", status:0,},
    //   {goods_price:12, goods_date:"2018-4-20", status:0,}
    //   ];
    const params={};
    RequireUtils.baseRequire('car/car-list',params,function (data){
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        console.log(data);
        //Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        this.setState({
          loading: false,
          data: data.data.list,
          pagination,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // this.child.handleSubmit();
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    // this.child.reset();
  }
  render() {
    const {visible, ModalText, confirmLoading }=this.state;
    return (
      <div style={{width:"50%" , marginLeft:"25%",textAlign:"center"}}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="商品列表" type="card" >
              <div >
              <MerchandiseControlTable goods={this.props.goods}   ></MerchandiseControlTable>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default Items;
