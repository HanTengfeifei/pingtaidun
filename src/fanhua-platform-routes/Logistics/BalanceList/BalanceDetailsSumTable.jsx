import React from 'react';
import { Tabs, Select,Table,Tooltip,Input,Button } from 'antd';
import mystyle from './tablestyle.less' ;
import {RequireUtils} from 'utils';

import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function myHandleTableChange(pagination, filters, sorter) {
  const pager = this.state.pagination;
  pager.current = pagination.current;
  pager.limit = pagination.pageSize ;
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
    currentPage: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
}

function getTableData(url,params) {
  RequireUtils.baseRequire(url,params,function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      var keyList = list.map(function (item,index) {
        item.key = index ;
        return item ;
      }) ;
      const pagination = this.state.pagination;
      pagination.limit = pagination.pageSize ;
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        pagination
      });
    }else{
      this.setState({data:[]})
    }
  }.bind(this))
}

function onInputChange(value, key, column){
  var {pthis,mykey} = this.props ;
  var _this = pthis ;
  const newData = [..._this.state.finish];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    target[column] = value;
    target.summary_fee = Number(target.goods_num)*Number(target.goods_price) + Number(target.deliver_fee) + Number(target.extra_fee) ;
    this.setState({ finish: newData });
  }
}
class BalanceDetailsSumTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [],
      loading: false,
      myflag:false
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

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    /*getTableData.bind(this)('relation/supp-list',params)*/
  }
  componentDidMount() {
    this.fetch();
  }

  getStatusButton(item) {
    const {pthis,go} = this.props ;
    var car_status=Number(item.status);
    var saler_or_buyer = item.saler_or_buyer ;
    var str = '' ;

    const confirmUpdate =  <div>
      <div className={'my-custom-center'} style={{marginBottom:'3px'}} onClick={()=>this.updatesubmit.bind(this)()} >
        <Button type="primary">确认修改</Button>
      </div>
    </div>;

    const confirmAccout =  <div>
      <div className={'my-custom-center'} style={{marginBottom:'3px'}} onClick={()=>this.comfirmAccount.bind(this)(item.order_id)} >
        <Button type="primary">确认结算</Button>
      </div>
    </div>;
    const updateAccount =  <div>
      <div className={'my-custom-center' } style={{marginBottom:'3px'}}   onClick={()=>this.updateyundan.bind(this)()}>
        <Button type="primary">修改结算</Button>
      </div>
    </div>;
    if(saler_or_buyer=="saler"){
      switch(car_status)
      {
        case 4:
        case 54:
        case 74:
          if(this.state.myflag){
            str = <span>
                  {confirmUpdate}
                  {confirmAccout}
                </span>
          }else{
            str = <span>
                  {updateAccount}
                  {confirmAccout}
                </span>
          }

          break;
        case 64:
        case 84:
          if(this.state.myflag){
            str = <span>
              {confirmUpdate}
              </span>
          }else {
            str = <span>
              {updateAccount}
              </span>
          }

          break;
        default:
          break ;
      }
    }else{
      switch(car_status)
      {
        case 4:
        case 84:
          if(this.state.myflag){
            str = <span>
              {confirmUpdate}
              {confirmAccout}
            </span>
          }else{
            str = <span>
              {updateAccount}
              {confirmAccout}
            </span>
          }
          break;
        case 54:
        case 64:
        case 74:
          if(this.state.myflag){
            str = <span>
              {confirmUpdate}
              </span>
          }else{
            str = <span>
              {updateAccount}
              </span>
          }
          break;
        default:
          break ;
      }
    }
    return str ;
  }



  comfirmAccount(order_id){
    const {pthis,go} = this.props ;
    RequireUtils.baseRequire("/order-finish/confirm-finish",{order_id:order_id},function (data) {
      if (data.code)
      {
        alert(data.msg);
        go.bind(pthis)() ;
        this.setState({
          loading:false,
          myflag:false
        }) ;
        go.bind(pthis)() ;
      }else{
        alert(data.msg);
        this.setState({
          loading:false
        }) ;
      }
    }.bind(this));
  }

  updatesubmit(){
      const {pthis,go} = this.props ;
      const {yundan,currentkey,finish,memo} = pthis.state ;
      var allcars = [] ;
      for(var i=0;i<yundan.length;i++){
        var mycars = yundan[i].cars ;
        var mysubmitcars = mycars.filter(function (item,index) {
          return item.car_status == 7;
        });
        var ncars = mysubmitcars.map(function (item) {
          var obj = {} ;
          obj.id = item.id ;
          obj.send_num = item.send_num;
          obj.recv_num = item.recv_num ;
          obj.final_num = item.final_num ;
          return obj ;
        }) ;
        allcars = allcars.concat(ncars) ;
      }

      var myfinish = finish[0] ;
      var form ={} ;
      form["modify_delivers"] = JSON.stringify(allcars) ;
      form["order_id"] = myfinish.order_id ;
      form["memo"] = memo ;
      form["deliver_fee"] = myfinish.deliver_fee ;
      form["extra_fee"] = myfinish.extra_fee ;
      form["goods_price"] = myfinish.goods_price ;


    RequireUtils.baseRequire("order-finish/submit-modify",form,function (data) {
      if (data.code)
      {
        alert(data.msg);
        go.bind(pthis)() ;
        this.setState({
          loading:false,
          myflag:false
        }) ;
      }else{
        alert(data.msg);
        this.setState({
          loading:false
        }) ;
      }
    }.bind(this));
  }

  updateyundan(){
    var {pthis,mykey} = this.props ;
    const yundan = pthis.state.yundan ;
    var finish = pthis.state.finish ;
    var nyundan = yundan.map(function (item,index) {
      var cars = item.cars ;
      var ncar = cars.map(function (myitem,index) {
        myitem.editable = true ;
        return myitem
      }) ;
      item.cars = ncar ;
      return item ;
    }) ;
    var nfinish = finish.map(function (item,index) {
      item.editable = true ;
      return item ;
    }) ;
    this.setState({
      myflag:true
    })
    pthis.setState({
      yundan:nyundan,
      finish:nfinish,
      currentkey:mykey,
    })
  }



  render() {
    const {finish,go}=this.props;

    const columns = [{
      title: '结算量',
      dataIndex: 'goods_num',
      key: 'goods_num',
      render: (text, record) => (
        <span>
          {text} 吨
        </span>
      )
    }, {
      title: '结算单价',
      dataIndex: 'goods_price',
      key: 'goods_price',
      render: (text, record) => (
        <span>
          {record.editable
            ? <Input style={{ margin: '-5px 0',width:'60px'}} value={text} onChange={e => onInputChange.bind(this)(e.target.value,record.key,'goods_price')} />
            :text
          }元
        </span>
      )
    },{
      title: '运费',
      dataIndex: 'deliver_fee',
      key: 'deliver_fee',
      render: (text, record) => (
        <span>
          {record.editable
            ? <Input style={{ margin: '-5px 0',width:'60px'}} value={text} onChange={e => onInputChange.bind(this)(e.target.value,record.key,'deliver_fee')} />
            :text
          }元
        </span>

      )
    },{
      title: '额外费用',
      dataIndex: 'extra_fee',
      key: 'extra_fee',
      render: (text, record) => (
        <span>
          {record.editable
            ? <Input style={{ margin: '-5px 0',width:'60px'}} value={text} onChange={e => onInputChange.bind(this)(e.target.value,record.key,'extra_fee')} />
            : <span style={{color:'red'}}>
                <Tooltip placement="top" title={record.memo}>
                  {text} 元
                </Tooltip>
              </span>
          }
        </span>
      )
    },{
      title: '结算金额',
      dataIndex: 'summary_fee',
      key: 'summary_fee',
      render: (text, record) => (
        <span>
          {text} 元
        </span>
      )
    }];

    return (
      <div className={'my-table-title-center-balancelistdetail'}>
          <Table
            columns={columns}
            dataSource={finish}
            pagination={{ position: 'none' }}
            loading={this.state.loading}
          />
      </div >
    )
  }
}
export default BalanceDetailsSumTable;
