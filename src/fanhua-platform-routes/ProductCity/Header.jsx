import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import { Link } from 'dva/router';
import './Header.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Header extends React.Component {
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
      <div  className={"header"}>
        <Row gutter={8} style={{ marginTop: '10px'}}>
          <Col span={24}>
            <Card  className="en" style={{ width: "100%" ,height: "50px" }}>
              <div  className={"log"}>
                <img src="" alt=""/> 销售联盟
              </div>
              <div className={"frontend"}> <span>
                      <Link to="/"><span>
                        <Icon type="smile-o"  style={{marginRight:'8px'}}/>
                      业务后台
                    </span></Link>
              </span></div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Header;
