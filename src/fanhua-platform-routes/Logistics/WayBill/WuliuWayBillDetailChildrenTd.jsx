import React from 'react';
import { Row, Col, Tabs, Icon,Select,Modal,Button } from 'antd';
import {RequireUtils} from 'utils';
import MyStatusButton from './MyStatusButton' ;
import mystyle from './tablestyle.less' ;
import UpdateCar from './UpdateCar' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WuliuWayBillDetailChildrenTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatecar:false,
      updateData:{},
      companyoption:{},
      headcaroptions:[],
      bodycaroptions:[],
      driveroptions:[]
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

  updateCar(id){
    var _this = this ;
    RequireUtils.baseRequire('order-deliver/car-info',{id:id},function (data) {
      if(data.code==1) {
        var mydriver = data.data.car_deliver ;
        var companyoption = data.data.company ;
        RequireUtils.baseRequire("order-deliver/car-select",{chengyun_id:companyoption.id},function (data) {
          if(data.code==1) {
            var list = data.data.list ;
            _this.setState({
              headcaroptions:list.head,
              bodycaroptions:list.body,
              driveroptions:list.driver,
              updateData:mydriver,
              companyoption:companyoption,
              updatecar:true
            });
          }else{
            _this.setState({
              headcaroptions:[],
              bodycaroptions:[],
              driveroptions:[],
              updateData:[],
              companyoption:{},
              updatecar:true
            });
          }
        }.bind(this))
      }else{
        alert(data.msg);
        _this.setState({
          headcaroptions:[],
          bodycaroptions:[],
          driveroptions:[],
          updateData:[],
          companyoption:{},
          updatecar:true
        });
      }
    }.bind(this));
  }
  handleAddCancel = () => {
    this.refs['UpdateCar'].resetFields() ;
    this.setState({
      updatecar:false
    });
  } ;
  render() {
    const {item,go,_pthis}=this.props;
    const {
      updatecar,
      updateData,
      companyoption,
      headcaroptions,
      bodycaroptions,
      driveroptions} = this.state ;
    return (
      <div>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'}>
                出车单编号
              </div>
              <div className={'my-custom-center'}>
                {item.car_code}
              </div>
              <div className={'my-custom-center'}>
                <span>运载量</span>
                <span>{item.load_num}吨</span>
              </div>
            </Col>
            <Col span={5}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>车头</span>
                <span>{item.head_card}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>车挂</span>
                <span>{item.body_card}</span>
              </div>
            </Col>
            <Col span={5}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>{item.head_contact}</span>
                <span>{item.head_phone}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>{item.body_contact}</span>
                <span>{item.body_phone}</span>
              </div>
            </Col>

            <Col span={5}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>装车时间</span>
                <span>{item.start_date}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>卸车时间</span>
                <span>{item.end_date}</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <Icon type="environment-o"/>地图
              </div>
            </Col>
          </Row>
        </div>

        <Modal title="编辑车辆"
               visible={updatecar}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <UpdateCar
            ref="UpdateCar"
            companyoption={companyoption}
            updateData={updateData}
            headcaroptions={headcaroptions}
            bodycaroptions={bodycaroptions}
            driveroptions={driveroptions}
            go={go.bind(_pthis)}
            handleAddCancel={this.handleAddCancel} ></UpdateCar>
        </Modal>
      </div >
    )
  }
}
export default WuliuWayBillDetailChildrenTd;
