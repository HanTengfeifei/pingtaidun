import React from 'react';
import { Row, Col, Tabs, Icon,Select,Modal,Button,Tooltip,Input } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
function getResult(item) {
  var str = "" ;
  var status = Number(item.car_status) ;
  if(status==7){
      str = <span style={{color:'green'}}>
              已完结
            </span>
  }else {
    str = <span>
                <Tooltip  title={item.car_memo}>
                    <span  style={{color:'red'}}>异常关闭</span>
                </Tooltip>
            </span>
  }
  return str ;
}

class BalanceDetailChildrenTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatezcbd:false,
      updatexcbd:false
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
    const {item,go,pthis}=this.props;
    const showstatus = getResult.bind(this)(item) ;
    return (
      <div>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'}>
                <span>出车单编号</span>
                <span>{item.car_code}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight: '5px'}}>送达时间</span>
                <span>{item.end_date}</span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>车头</span>
                <span>{item.head_card}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>车挂</span>
                <span>{item.body_card}</span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                {item.head_contact}
              </div>
              <div className={'my-custom-center'}>
                {item.body_contact}
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'} style={{marginBottom:'5px'}}>
                <span style={{marginRight:'5px'}}>装车量</span>
                <span>
                  {item.send_num}吨
                </span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>卸车量</span>
                <span>
                   {item.recv_num}吨
                </span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>结算量</span>
                <span>
                   {item.final_num}吨
                </span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {showstatus}
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default BalanceDetailChildrenTd;
