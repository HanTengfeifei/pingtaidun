import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyCustomTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tt:{
        key: '2',
        code:'9272653782755380',
        order: '927265328342342342',
        time:'2017-09-09',
        name: "黄冈气",
        purchase: '利华',
        sale:"凡华",
        allnum:'140吨',
        inplace:'湖北黄冈',
        inpeople:'陈先生',
        intel:'156283775767',
        place:"湖北黄冈",
        linkpeople:"黄波",
        telephone:'15678907655',
        money:'￥1,800,000,00',
        status:'待出车'
      }
    };
    this.callback = this.callback.bind(this);
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

  render() {
    const {item}=this.props;

    return (
      <div>
            <div>
                      <Row className={'table-first-line'}>
                        <div >
                            < Col span={21}>
                              <div>
                                <span style={{marginRight:'5px'}}>运输单号</span>
                                <span style={{marginRight:'20px'}}>{item.code}</span>
                                <span style={{marginRight:'5px'}}>结算单编号</span>
                                <span style={{marginRight:'10px'}}>{item.border}</span>
                              </div>
                            </Col>
                            < Col span={3}>
                              <div style={{textAlign:'right'}}>
                                <span>{item.time}</span>
                              </div>
                            </Col>
                          </div>
                       </Row>
                       <Row className={'table-other-line'} type="flex" align="middle">
                         <Col span={3}>
                            <div>买方 {item.purchase}</div>
                            <div>卖方 {item.sale}</div>
                            <div>{item.allnum}</div>
                          </Col>
                         <Col span={4}>
                           <div>装车地 {item.inplace}</div>
                           <div><span>{item.inpeople}</span><span>{item.inte}</span></div>
                         </Col>
                         <Col span={4}>
                           <div>卸车地 {item.place}</div>
                           <div><span>{item.linkpeople}</span> <span>{item.intel}</span></div>
                         </Col>
                         <Col span={4}>
                           <div>结算金额{item.money}</div>
                         </Col>
                         <Col span={3}>{item.status}</Col>
                         <Col span={3}><Button type="primary">确认结算</Button></Col>
                       </Row>
                    </div>
      </div >
    )
  }
}
export default MyCustomTd;
