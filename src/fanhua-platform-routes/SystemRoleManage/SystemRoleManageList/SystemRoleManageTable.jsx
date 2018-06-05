import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal,Divider } from 'antd';
import mystyle from './tabstyle.less' ;

import createHistory from 'history/createHashHistory';


import AddSystemRoleManage from './AddSystemRoleManage' ;
/*import UpdateFieldStationList from './UpdateFieldStationList' ;*/
import {RequireUtils} from 'utils';
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

      var iosOptions = keyList[0] ;
      var andOptions= keyList[1] ;
      const pagination = this.state.pagination;
      pagination.limit = pagination.pageSize ;
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        iosOptions:iosOptions,
        andOptions:andOptions,
        pagination
      });
    }else{
      this.setState({data:[]})
    }
  }.bind(this))
}



class SystemRoleManageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addapp:false,
      staionupdate:false,
      pagination: {pageSize:10},
      loading: false,
      iosOptions:{},
      andOptions:{}
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
    getTableData.bind(this)('app-manage/app-manage',params)
  }

  componentDidMount() {
    this.fetch();
  }

  handleAddCancel(){
     this.refs['AddSystemRoleManage'].resetFields() ;
    this.setState({
      addapp:false,
    });
  }

  addSystemRoleManageList = () => {
   /* this.refs['AddSystemRoleManage'].resetFields() ;*/
    this.setState({
      addapp:true,
    });
  } ;
  handleUpateCancel = () => {
    this.refs['UpdateFieldStationList'].resetFields() ;
    this.setState({
      staionupdate:false,
    });
  } ;

  deleteStaion(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该用户账号吗？',
      content: '删除后，该用户及其子账户将被清除',
      onOk() {
        RequireUtils.baseRequire('addr/del-addr',{
          id: id,
        },function (data) {
          alert(data.msg);
          this.fetch(this.state.pagination) ;
        }.bind(context));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  updateStaion(id){
    var _this = this ;
    RequireUtils.baseRequire("addr/addr-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info;
        _this.setState({
          staionupdate:true,
          updateData: list,
          firstEnter:true
        });
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }

  render() {
    const {addapp,staionupdate,data,iosOptions,andOptions}=this.state;
    const columns = [{
      title: '最新版本',
      dataIndex: 'app_version',
      key: 'app_version',
    },{
      title: '系统类型',
      dataIndex: 'os_type',
      key: 'os_type',
      render:(text,record)=>(
        <span>{text==1?"安卓":"IOS"}</span>
      )
    },{
      title: '强制更新最低版本号',
      dataIndex: 'min_version',
      key: 'min_version',
    },{
      title: '是否强制升级',
      dataIndex: 'app_update',
      key: 'app_update',
      render:(text,record)=>(
        <span>{text==1?"是":"否"}</span>
      )
    },{
      title: '更细地址',
      dataIndex: 'app_url',
      key: 'app_url',
      render: (text, record) => (
        <a href={text}>地址</a>
      )
    }
    ];

    return (
      <div className={'my-table-title-center my-custom-padding'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div style={{marginBottom:'10px',textAlign:'right'}}>
                    {/*<span style={{marginRight:'15px'}}>*/}
                      {/*<Icon type="environment-o" style={{marginRight:'8px'}} />*/}
                      {/*地图查找*/}
                    {/*</span>*/}
                    <span onClick={this.addSystemRoleManageList.bind(this)}>
                       <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                        新增
                    </span>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          loading={this.state.loading}
          pagination={{position:'none'}}
          onRow={(record) => {
            return {
              onClick: (e) => this.myRowClick(e,record),       // 点击行
            };
          }}
          onChange={this.handleTableChange.bind(this)} />

        <div style={{marginTop:'20px'}}></div>
        <Row>
          <Col span={6}><div style={{textAlign:'center'}}>IOS版本更新提示</div></Col>
          <Col span={12}><div>{iosOptions.tip}</div></Col>
        </Row>
        <Row>
          <Col span={6}><div style={{textAlign:'center'}}>IOS版本功能介绍</div></Col>
          <Col span={12}>
            {
              (iosOptions.intro?iosOptions.intro:[]).map(function (item,myindex) {
                return <div key={myindex}>
                  <div style={{fontSize:'16px'}}>{item.title}</div>
                  <div>
                    {
                      (item.text?item.text:[]).map(function (item_child,index) {
                        return <div key={index} style={{textIndent:'8px'}}>
                          {(index+1)}、{item_child}
                        </div>
                      })
                    }
                  </div>
                </div>
              })
          }
          </Col>
        </Row>
        <Divider></Divider>
        <Row>
          <Col span={6}><div style={{textAlign:'center'}}>安卓版本更新提示</div></Col>
          <Col span={12}><div>{andOptions.tip}</div></Col>
        </Row>
        <Row>
          <Col span={6}><div style={{textAlign:'center'}}>安卓版本功能介绍</div></Col>
          <Col span={12}>
            {
              (andOptions.intro?andOptions.intro:[]).map(function (item,myindex) {
                return <div key={myindex}>
                  <div style={{fontSize:'16px'}}>{item.title}</div>
                  <div>
                    {
                      (item.text?item.text:[]).map(function (item_child,index) {
                        return <div key={index} style={{textIndent:'8px'}}>
                          {(index+1)}、{item_child}
                        </div>
                      })
                    }
                  </div>
                </div>
              })
            }
          </Col>
        </Row>
        <Modal title="app版本新增"
               visible={addapp}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel.bind(this)}
               width={'60%'}
               footer={null}>

          <AddSystemRoleManage ref={'AddSystemRoleManage'} handleAddCancel={this.handleAddCancel.bind(this)} go={()=>this.fetch(this.state.pagination)}></AddSystemRoleManage>

        </Modal>
        {/*   <Modal title="场站编辑"
               visible={staionupdate}
               onOk={this.handleOk}
               onCancel={this.handleUpateCancel}
               footer={null}>

          <UpdateFieldStationList firstEnter={firstEnter} reactp = {this} ref={'UpdateFieldStationList'} handleUpateCancel={this.handleUpateCancel} updateData={updateData}  go={()=>this.fetch(this.state.pagination)}></UpdateFieldStationList>
        </Modal>*/}
      </div >
    )
  }
}
export default SystemRoleManageTable;
