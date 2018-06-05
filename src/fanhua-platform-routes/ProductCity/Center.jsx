import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import './Center.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{}
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){

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
  render() {
    return (
      <div className={"text"}>
        <Row gutter={8} style={{ marginTop: '10px'}}>
          <Col span={8}>
            <Card style={{ width: "100%" ,height: "100px",paddingTop:"1.5rem" }}>
              <div  className={"log"}>
                <img src="" alt=""/> 今日成交量{this.props.sumWeight} <span style={{fontWeight:'bold'}}>吨</span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ width: "100%" ,height: "100px", paddingTop:"1.5rem"}}>
              <div  className={"log"}>
                <img src="" alt=""/> 今日出车量{this.props.sumCar} <span style={{fontWeight:'bold'}}>辆</span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ width: "100%" ,height: "100px",paddingTop:"1.5rem" }}>
              <div  className={"log"}>
                <img src="" alt=""/> 今日成交均价{this.props.sumPrice} <span style={{fontWeight:'bold'}}>元</span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Center;
