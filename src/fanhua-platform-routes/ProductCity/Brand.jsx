import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Carousel } from 'antd';
import './Header.less';
import './Brand.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentWillMount(){
  }
  componentDidMount(){
    console.log(5555555);
    console.log(this.props.banner);
  }
  componentWillReceiveProps(){
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
    console.log(11111111) ;
   /* const urls=this.props.banner;*/
   /* console.log(urls[0].banner_url);*/
    return (
      <div>
        <Row gutter={8} >
            <Card style={{ width: "100%" ,height: "160px" }}>
              <div  className={"brand"}>
                <Carousel autoplay  style={{ width: "100%" ,height: "200px" }}>
                  <div   style={{ width: "100%" ,height: "160px" }}><img  style={{ width: "100%" ,height: "200px" }} src={this.props.banner[0].banner_url} alt="加载错误"/></div>
                  <div   style={{ width: "100%" ,height: "160px" }}><img  style={{ width: "100%" ,height: "160px" }} src={this.props.banner[1].banner_url} alt="加载错误"/></div>
                  <div   style={{ width: "100%" ,height: "160px" }}><img  style={{ width: "100%" ,height: "160px" }} src={this.props.banner[2].banner_url} alt="加载错误"/></div>

                </Carousel>
              </div>
            </Card>
        </Row>
      </div>
    )
  }
}
export default Brand;
