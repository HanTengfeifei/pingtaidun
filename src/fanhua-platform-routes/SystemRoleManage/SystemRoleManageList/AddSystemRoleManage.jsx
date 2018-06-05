import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,Icon } from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import moment from 'moment';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const { TextArea } = Input;

function noop() {
  return false;
}

/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleAddCancel() ;
  this.props.form.resetFields();
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  this.setState({
    loading:true
  }) ;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = {} ;
      form.os_type = values['os_type'] ;
      form.app_version = values['app_version'] ;
      form.min_version = values['min_version'] ;
      form.app_update = values['app_update'] ;
      form.app_url = values['app_url'] ;
      form.tip = values['tip'] ;
      var titles = values.titles ;
      var texts = values.texts ;
      var myinproce = [] ;
      for(var i = 0;i<titles.length;i++){
        var obj = {} ;
        obj.title = titles[i] ;
        var mytexts = texts[i].split("\n") ;
        obj.text = mytexts ;
        myinproce.push(obj) ;
      }
      form.intro = JSON.stringify(myinproce) ;
      RequireUtils.baseRequire('app-manage/add-app',form,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleAddCancel() ;
          this.props.form.resetFields();
        }else{
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
    }
  });
}

class AddSystemRoleManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      versionOptions:[],
      introduceOptions:[],
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  osType(value){
    RequireUtils.baseRequire('app-manage/sel-app',{os_type:value},function (data) {
      if (data.code)
      {
        var list = data.data ;
        this.setState({
          loading:false,
          versionOptions:list
        }) ;
      }else{
        alert(data.msg);
        this.setState({
          loading:false,
          versionOptions:[]
        }) ;
      }
    }.bind(this));
  }

  onChange = (value, selectedOptions) => {
    var {form} = this.state ;
    var provice = "";
    var city = "" ;
    var county = "" ;
    for(var i = 0;i< selectedOptions.length;i++){
      var selectoption = selectedOptions[i] ;

      if(selectoption.district_level==1){
        provice = selectoption.value ;
        form['addr_province'] = provice ;
      }
      if(selectoption.district_level==2){
        city = selectoption.value ;
        form['addr_city'] = city ;
      }
      if(selectoption.district_level==3){
        county = selectoption.value ;
        form['addr_county'] = county ;
      }
    }

    this.setState({
      form:form
    });
  };

  addFunIntroduce(){
    const introduceOptions = this.state.introduceOptions ;
    this.setState({
      introduceOptions:[...introduceOptions,{}]
    })
  }


  introduceRemove = (k) => {
    var {introduceOptions} = this.state ;
    var ntarget = introduceOptions.filter(function (item,index) {
        if(index!=k){
          return item
        }
    }) ;
    this.setState({
      introduceOptions:ntarget
    })
  };

  componentDidMount() {

  }

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    var _this = this ;
    const {options,versionOptions,introduceOptions} = this.state ;

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="系统类型">
                  {getFieldDecorator('os_type', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }} onSelect={this.osType.bind(this)}>
                      <Option value="0" key={'0'}>ios</Option>
                      <Option value="1" key={'1'}>安卓</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="最新版本">
                  {getFieldDecorator('app_version', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="强制更新最低版本号">
                  {getFieldDecorator('min_version', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}>
                      {
                        versionOptions.map(function(item,index){
                          return <Option value={item.id} key={index}>{item.app_version}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="是否强制升级">
                  {getFieldDecorator('app_update', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                      <Select style={{ width: '100%' }}>
                        <Option value="0" key={'1'}>是</Option>
                        <Option value="1" key={'0'}>否</Option>
                      </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="地址">
                  {getFieldDecorator('app_url', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="版本更新提示">
                  {getFieldDecorator('tip', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <div>
              {
                introduceOptions.map(function(item,index){
                  return <Row gutter={8}  style={{marginTop:'10px'}} key={index}>
                    <Col span={11}>
                      {getFieldDecorator(`titles[${index}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <TextArea  autosize={{ minRows: 2, maxRows: 6 }} />
                      )}
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                      {getFieldDecorator(`texts[${index}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <TextArea  autosize={{ minRows: 2, maxRows: 6 }} />
                      )}
                    </Col>
                    <Col span={1}>
                      <div style={{textAlign:'center'}}>
                        <Icon
                          className="dynamic-delete-button"
                          type="minus-circle-o"
                          onClick={() => _this.introduceRemove.bind(this)(index)}
                        />
                      </div>
                    </Col>
                  </Row>
                })
              }
            </div>
            <Row gutter={8}  style={{marginTop:'10px'}}>
              <div>
                <Button type="dashed" onClick={this.addFunIntroduce.bind(this)} style={{ width: '100%' }}>
                  <Icon type="plus" /> 添加版本功能介绍
                </Button>
              </div>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Col style={{textAlign:'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
                <Button type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e)}>确定</Button>
              </Col>
            </Row>
          </Form>
        </main>
      </div >
    )
  }
}
AddSystemRoleManage = createForm()(AddSystemRoleManage);
export default AddSystemRoleManage;
