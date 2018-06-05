import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from '../tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyExitListCustomTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tt:{
        key: '2',
        code:'9272653782755380',
        porder: '927265328342342342',
        exitorder:"92726342358349573",
        time:'2017-09-09',
        name: "黄冈气",
        allnum:'140吨',
        expople:'黄先生',
        extelephone:'15678989876',
        inplace:'湖北黄冈',
        inpople:"陈先生",
        intel:"15689077658",
        place:"湖北黄冈",
        linkpeople:"黄波",
        telephone:'15678907655',
        status:'运输中'
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
                      <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                      <span style={{marginRight:'5px'}}>所属订单</span>
                      <span style={{marginRight:'20px'}}>{item.order_code}</span>
                      <span style={{marginRight:'5px'}}>出车单号</span>
                      <span style={{marginRight:'10px'}}>{item.car_code}</span>
                    </div>
                  </Col>
                  < Col span={3}>
                    <div style={{textAlign:'right'}}>
                      <div style={{textAlign:'right'}}><span>{item.deliver_date}</span></div>
                    </div>
                  </Col>
                </div>
             </Row>
             <Row className={'table-other-line'} type="flex" align="middle">
               <Col span={2} style={{textAlign:'center'}}>{item.goods_name}</Col>
               <Col span={2} style={{textAlign:'center'}}>{item.load_num}</Col>
               <Col span={6}>
                 <div style={{textAlign:'center'}}>派单联系人</div>
                 <div style={{textAlign:'center'}}><span style={{marginRight:'10px'}}>{item.singles}</span><span>{item.singles_mobile}</span></div>
               </Col>
               <Col span={6}>
                 <div style={{textAlign:'center'}}>装车地 {item.fh_addr_name  }</div>
                 <div style={{textAlign:'center'}}>
                   <span style={{marginRight:'10px'}}>{item.fh_addr_contact}</span>
                   <span>{item.jh_addr_contact_mobile}</span>
                 </div>
               </Col>
               <Col span={6}>
                 <div style={{textAlign:'center'}}>卸车地 {item.jh_addr_name}</div>
                 <div style={{textAlign:'center'}}>
                   <span style={{marginRight:'10px'}}>{item.jh_addr_contact}</span>
                   <span>{item.jh_addr_contact_mobile}</span>
                 </div>
               </Col>
               <Col span={2} style={{textAlign:'center'}}>{item.car_status_name}</Col>
             </Row>
          </div>
      </div >
    )
  }
}
export default MyExitListCustomTd;
