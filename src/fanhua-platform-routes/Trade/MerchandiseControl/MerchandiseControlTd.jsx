import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch, } from 'antd';
import mystyle from '../OrderList/tabstyle.less' ;
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
      pathname: '/EditMerchandiseControl/?id='+this.props.item.id,
    })
  }
onChange(){
this.setState({
  status:!this.state.status,
})
}
  render() {
    const {item,text}=this.props;
    console.log(1111111111111);
    return (
      <div style={{fontSize:10}}>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={3}>
              <div className={'my-customer-table-title'}>{item.goods_name}</div>
            </Col>
            <Col span={3}   style={{fontSize:8}}>
              <p>起源类型:{item.type_name}</p>
              <p>气化率:{item.gas_value}</p>
              <p>温度:{item.temp_name}</p>
              <p>低位热值:{item.hot_value}</p>
              <p>气质报告更新时间:{item.report_date}</p>
            </Col>
            <Col span={0.8}>
            </Col>
            <Col span={3} style={{fontSize:10}}>
              <p>地点:{item.addr_province+item.addr_city+item.addr_county}</p>
              <p>{item.addr_detail}</p>
              <p>提货方式:{item.deliver_type? "配送":"自提"}</p>
            </Col>
            <Col span={1}>
            </Col>
            <Col span={3}>
              {item.goods_stock}
            </Col>
            <Col span={3}>
              <div>{item.price}</div>
            </Col>
            <Col span={3}>
              <div className={'my-customer-table-title'}>{item.status}</div>
            </Col>
            <Col span={3}>
              <div style={{marginBottom:'3px'}} className={'my-customer-table-title'}>
                {this.state.status ? <span  onClick={this.onChange}><Icon type="down-circle-o" style={{marginRight:'5px'}}/>上架</span>
                :<span onClick={this.onChange}><Icon type="down-circle-o" style={{marginRight:'5px'}}/>下架</span>}
              </div>
              <div className={'my-customer-table-title'} onClick={this.skit}>
                <span><Icon type="edit" style={{marginRight:'5px'}}/>编辑</span>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default MerchandiseControlTd;
