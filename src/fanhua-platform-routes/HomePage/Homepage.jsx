import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import Header from './Common/header';
import Mation from './personalcenter';
import './Homepage.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TagsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           info:{}
        }
        this.callback = this.callback.bind(this);
        this.findRoleAll=this.findRoleAll.bind(this);
    }
    callback(key) {
        console.log(key);
    }
  componentDidMount(){
      this.findRoleAll();
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
    const info=this.state.info;
        return (
            <div>
          <Row>
            <Header  />

          </Row>
           <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={24}>
                        <Card hoverable title="基本" type="card">
                            <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                                <TabPane tab="个人信息" key="1">
                                <Mation info={info}  fresh={this.findRoleAll}/>
                              </TabPane>
                            </Tabs>
                        </Card>
                    </Col>

                </Row>
            </div >
        )
    }
}




export default TagsDemo;
