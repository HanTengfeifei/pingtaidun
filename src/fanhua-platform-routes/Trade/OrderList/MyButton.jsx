import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function assetOp(e,id) {
  createHistory().push({
    pathname: '/orderlistdetail/?orderid='+id
  })
}

function getSaleButton(record,go) {
  const lookYunbill =  <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
                          <Button type="primary" onClick={(e)=>assetOp.bind(this)(e,record.id)}>查看运单</Button>
                        </div> ;
  var str = <span>
                {lookYunbill}
            </span> ;
  return str ;
}

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    const {record,go} = this.props ;
    const mybuttons =  getSaleButton.bind(this)(record,go) ;
    return (
      mybuttons
    )
  }
}
export default MyButton;
