import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch, } from 'antd';
import mystyle from './tabstyle.less' ;
import { Link } from 'dva/router';
import './MerchandiseControlTd.less';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControlTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:true,
    };
    this.callback = this.callback.bind(this);
    this.onChange= this.onChange.bind(this);
    this.skit= this.skit.bind(this);
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
  skit(){
    createHistory().push({
      // pathname: '/EditMerchandiseControl/?id='+this.props.item.id,
      pathname: '/ProductCityOrder/?id='+this.props.item.goodsId,
    })
  }
onChange(){
this.setState({
  status:!this.state.status,
})
}
  render() {
    const {item,text}=this.props;
    return (
      <div style={{fontSize:10}}>

          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={10}   style={{fontSize:8}}>
              <p>{item.companyName}{item.addrName}</p>
              <p>{item.weight}</p>
              <p>{item.addrName}</p>
            </Col>
            <Col span={10} style={{fontSize:20,color:"red"}}>
              <p>{item.price} <span style={{fontWeight:'bold'}}>元</span></p>
            </Col>
            <Col span={4}>
              <div className={'my-customer-table-title'} onClick={this.skit}>
                <Button type="primary"  size="small" ghost>下单</Button>
              </div>
            </Col>
          </Row>
      </div >
    )
  }
}
export default MerchandiseControlTd;
