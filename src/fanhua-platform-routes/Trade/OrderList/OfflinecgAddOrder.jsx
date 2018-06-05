import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Form,Input,DatePicker,Button  } from 'antd';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
import OfflineAddChooseTable from './OfflinecgAddChooseTable' ;
import OrderListYundanTable from './OrderListcgYundanTable' ;
import OfflineJieSuanTable from './OfflinecgJieSuanTable' ;
import mystyle from './tabstyle.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class OfflineAddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         buyer_id:"",
         saler_id:"",
         contract_id:"",
         goods_id:"",
         saler_name:"",
         addr_name:"", //场站名称
         addr_id:"",
        prod_id:'',
         info:{},
          memo:"",
          prod_price:"",
          prod_name:"",
          prodoptions:[],
          deliver_date:'',
         buyeroptions:[],
         contractoption:[],
         goodstables:[],
         goodeseletoptions:[],//被选中的table
         yundans:[],
         addroptions:[],//配送地址
        tableExpand:false,
        jiesuanoptions:[{key:"0",goods_num:"0",price:"",deliver_fee:"",extra_fee:"",money:""}]
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  addSelect(value,record){
    var text = record.props.children ;
      const {yundans,goodeseletoptions} = this.state ;
      this.setState({
        addr_name:text,
        addr_id:value
      }) ;
  }

  fetch(){
    RequireUtils.baseRequire("order/company-info",{},function (data) {
      if(data.code==1) {
        var info = data.data.info ;
        RequireUtils.baseRequire("special-order/product-select",{},function (data) {
          if(data.code==1) {
            var prodoptions = data.data.list ;
            this.setState({
              info:info,
              buyer_id:info.id,
              prodoptions:prodoptions
            })
          }else{
            this.setState({
              info:{},
              buyer_id:"",
              prodoptions:[]
            })
          }
        }.bind(this))
      }else{
        this.setState({
          info:{},
          buyer_id:"",
          prodoptions:[]
        })
      }
    }.bind(this)) ;
    RequireUtils.baseRequire("special-order/company-select",{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          buyeroptions:list
        }) ;
      }else{
        this.setState({
          buyeroptions:[]
        }) ;
      }
    }.bind(this));
  }
  componentDidMount() {
    this.fetch() ;
  }

  dateonChange(date,dateString){
    this.setState({
      deliver_date:dateString
    })
  }
  addyunMessage(){
    const {goodeseletoptions,yundans,addr_name,addr_id,prod_name} = this.state ;
    var len = yundans.length ;
    if(!prod_name){
      alert("请先选择标品") ;
      return ;
    }

    var goodeseletoption = goodeseletoptions[0] ;
    var obj = {
      key:new Date().getTime(),
      addr_id:addr_id,
      goods_name:prod_name,
      total:"0",
      recv_place:addr_name,
      yundannum:'0',
      cars:[]
    } ;
    this.setState({
      yundans:[...yundans,obj]
    }) ;

  }

  getYunDan(){
    const pthis = this ;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 15 }
    };
    const {addroptions} = this.state ;
    const { getFieldDecorator } = this.props.form;
    var str =<div>
              <div style={{marginBottom:'20px'}}>
                <span style={{fontSize:'18px',fontWeight:'bold'}}>配送信息</span>
              </div>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="配送方式">
                    {getFieldDecorator('saler_name', {
                      initialValue:"自提",
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <Input placeholder="" disabled={true}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="配送时间">
                    {getFieldDecorator('date_picker', {
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <DatePicker style={{width:'100%'}} placeholder="" onChange={this.dateonChange.bind(this)}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{marginBottom:'10px'}}>
                  <FormItem
                    {...formItemLayout}
                    label="配送地址">
                    {getFieldDecorator('addr_place', {
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <Select style={{width:'100%'}} onSelect={this.addSelect.bind(this)}>
                        {
                          addroptions.map(function (item,index) {
                            return <Option value={item.id} key={index}>{item.addr_name}</Option>
                          })
                        }
                      </Select>
                    )}
                    <Icon type="plus-circle-o" onClick={this.addyunMessage.bind(this)}
                          style={{position:'absolute',top:'0px',marginLeft:'5px',fontSize:'22px',color:'#1890ff'}}/>
                  </FormItem>
                </Col>
              </Row>
            </div>;
    var yundans = this.state.yundans ;
    if(yundans.length>0){
      str = <div>
              <div style={{marginBottom:'20px'}}>
                <span style={{fontSize:'18px',fontWeight:'bold'}}>配送信息</span>
              </div>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="配送方式">
                    {getFieldDecorator('saler_name', {
                      initialValue:"自提",
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <Input placeholder="" disabled={true}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="配送时间">
                    {getFieldDecorator('date_picker', {
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <DatePicker style={{width:'100%'}} placeholder="" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{marginBottom:'10px'}}>
                  <FormItem
                    {...formItemLayout}
                    label="配送地址">
                    {getFieldDecorator('addr_place', {
                      rules: [{ required: true, message: '该选项为必填项' }]
                    })(
                      <Select style={{width:'100%'}} onSelect={this.addSelect.bind(this)}>
                        {
                          addroptions.map(function (item,index) {
                            return <Option value={item.id} key={index}>{item.addr_name}</Option>
                          })
                        }
                      </Select>
                    )}
                    <Icon type="plus-circle-o" onClick={this.addyunMessage.bind(this)}
                          style={{position:'absolute',top:'0px',marginLeft:'5px',fontSize:'22px',color:'#1890ff'}}/>
                  </FormItem>
                </Col>
              </Row>
              <div>
                {
                  yundans.map(function (item,index) {
                    return <OrderListYundanTable yundan={item} key={index} mykey={index} pthis={pthis}></OrderListYundanTable>
                  })
                }
              </div>
      </div>
    }
    return str ;
  }

  momochange(e){
    var value = e.target.value ;
    this.setState({
      memo:value
    })
  }

  prodSelect(value,options){
    this.setState({
      prod_id:value,
      prod_name:options.props.children
    })
  }
  prodChange(e){
    var value = e.target.value ;
    const {jiesuanoptions} = this.state ;
    const joption = jiesuanoptions[0] ;
    joption.price = value ;
    var goodsnum = Number(joption.goods_num)?Number(joption.goods_num):0 ;
    var price = Number(joption.price)?Number(joption.price):0 ;
    var dfee = Number(joption.deliver_fee)? Number(joption.deliver_fee):0 ;
    var efee = Number(joption.extra_fee)?Number(joption.extra_fee):0;
    var money =Number(price) *Number(goodsnum) + Number(dfee) +　Number(efee) ;
    joption.money = money ;
    this.setState({
      jiesuanoptions:jiesuanoptions
    })
  }

  //线下销售特殊订单
  submitspecialorder(){
      const {yundans,jiesuanoptions} = this.state;
      alert(this.state.deliver_date) ;
      var form = { } ;
      form.saler_id = this.state.saler_id ;
      form.buyer_id = this.state.buyer_id ;
      form.contract_id = this.state.contract_id ;
      form.prod_id = this.state.prod_id ;
      form.deliver_date = this.state.deliver_date ;
      form.order_source = 0 ;
      form.order_kind = 1 ;
      var optionarry = [] ;
      for(var i = 0;i<yundans.length;i++){
        var option = yundans[i] ;
        var obj = {} ;
        obj.addr_id = option.addr_id ;
        obj.cars = [] ;
        var mycars = option.cars ;
        for(var j = 0;j<mycars.length ;j++){
          var singcar = mycars[j] ;
          var myobj = {} ;
          myobj.head_card = singcar.head_card ;
          myobj.body_card = singcar.body_card ;
          myobj.send_bill = singcar.bill_name ;
          myobj.recv_bill = singcar.recv_name ;
          myobj.final_num = singcar.final_num ;
          obj.cars.push(myobj) ;
        }
        optionarry.push(obj) ;
      }
      form.order_options = JSON.stringify(optionarry) ;
      form.scenario = "add_cg_order" ;
      form.price = jiesuanoptions[0].price ;
      form.deliver_fee = jiesuanoptions[0].deliver_fee ;
      form.extra_fee = jiesuanoptions[0].extra_fee ;
      form.memo = this.state.memo ;
    RequireUtils.baseRequire("special-order/add-order",form,function (data) {
      if(data.code==1) {
        alert(data.msg) ;
        this.setState({
          load:false
        }) ;
      }else{
        alert(data.msg) ;
        this.setState({
          load:false
        }) ;
      }
    }.bind(this))
  }


  relatedContract(value){
    this.setState({
      contract_id:value
    })
  }

  buyerSelect(value){
    RequireUtils.baseRequire("special-order/contract-select",{company_id:value},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        RequireUtils.baseRequire("special-order/addr-select",{company_id:value},function (data) {
          if(data.code==1) {
            var addrlist = data.data.list ;
            this.setState({
              contractoption:list,
              saler_id:value,
              addroptions:addrlist
            }) ;
          }else{
            this.setState({
              contractoption:[],
              saler_id:value,
              addroptions:[]
            }) ;
          }
        }.bind(this))
      }else{
        this.setState({
          contractoption:[],
          saler_id:value,
          addroptions:[]
        }) ;
      }
    }.bind(this))
  }

  render() {
    var pthis =this ;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 15 }
    };
   const  {
      buyer_id,
      saler_id,
      contract_id,
      saler_name,
      prod_id, //
      prod_price,
      prodoptions,
      yundans,
      buyeroptions,
      contractoption,
     jiesuanoptions,
      info
    } =  this.state  ;

   const myyundans = this.getYunDan.bind(this)(yundans) ;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
         <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="订单列表"  type="card">
                <Row style={{marginBottom:'5px'}}>
                  <Col span={12}><span style={{fontSize:'16px',fontWeight:'500'}}>填写核对买方信息</span></Col>
                  <Col span={12}><span style={{fontSize:'16px',fontWeight:'500'}}>填写核对卖方信息</span></Col>
                </Row>
                <Row>
                <Col span={12}>
                    <span>
                       <FormItem
                         {...formItemLayout}
                         label="购买方">
                          {getFieldDecorator('buyer_name', {
                            initialValue:info.company_name,
                            rules: [{ required: true, message: '该选项为必填项' }]
                          })(
                            <Input placeholder="" disabled={true}/>
                          )}
                        </FormItem>
                  </span>
                </Col>
                <Col span={12}>
                  <span>
                       <FormItem
                         {...formItemLayout}
                         label="销售方">
                          {getFieldDecorator('saler_id', {
                            rules: [{ required: true, message: '该选项为必填项' }]
                          })(
                            <Select style={{width:'100%'}} onSelect={this.buyerSelect.bind(this)}>
                              {buyeroptions.map(function (item,index) {
                                return <Option value={item.id} key={index}>{item.company_name}</Option>
                              })}
                            </Select>
                          )}
                        </FormItem>
                  </span>
                </Col>
                <Col span={12}>
                  <span>
                       <FormItem
                         {...formItemLayout}
                         label="关联合同">
                          {getFieldDecorator('contract_id', {
                            rules: [{ required: true, message: '该选项为必填项' }]
                          })(
                            <Select style={{width:'100%'}} onSelect={this.relatedContract.bind(this)}>
                                {contractoption.map(function (item,index) {
                                  return <Option value={item.id} key={index}>{item.contract_name}</Option>
                                })}
                            </Select>
                          )}
                        </FormItem>
                  </span>
                </Col>
              </Row>
              <div style={{marginTop:'15px'}}>
                <Row>
                  <Col span={12}>
                    <span>
                       <FormItem
                         {...formItemLayout}
                         label="标品">
                          {getFieldDecorator('prod_id', {
                            rules: [{ required: true, message: '该选项为必填项' }]
                          })(
                            <Select style={{width:'100%'}} onSelect={this.prodSelect.bind(this)}>
                              {prodoptions.map(function (item,index) {
                                return <Option value={item.id} key={index}>{item.prod_name}</Option>
                              })}
                            </Select>
                          )}
                        </FormItem>
                  </span>
                  </Col>
                  <Col span={12}>
                    <span>
                       <FormItem
                         {...formItemLayout}
                         label="标品价格">
                          {getFieldDecorator('prod_price1', {
                            rules: [{ required: true, message: '该选项为必填项' }]
                          })(
                            <Input onChange={(e)=>this.prodChange.bind(this)(e)}/>
                          )}
                        </FormItem>
                  </span>
                  </Col>
                </Row>
              </div>
              <div style={{marginTop:'10px'}}>
                {myyundans}
              </div>
              <div style={{marginTop:'10px'}}>
                  <div >
                    <span style={{fontSize:'18px',fontWeight:'500'}}>结算信息</span>
                  </div>
                  <OfflineJieSuanTable  pthis={pthis}></OfflineJieSuanTable>
                <TextArea  autosize={{ minRows: 2, maxRows: 6 }} onChange={(e)=>this.momochange.bind(this)(e)}/>
              </div>
              <Row style={{padding:'10px 0 5px 0'}}>
                <Col span={24}>
                  <div  style={{textAlign:'center'}}>
                    <Button type='primary' onClick={this.submitspecialorder.bind(this)}>确定</Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

      </div >
    )
  }
}
OfflineAddOrder = createForm()(OfflineAddOrder);
export default OfflineAddOrder;
