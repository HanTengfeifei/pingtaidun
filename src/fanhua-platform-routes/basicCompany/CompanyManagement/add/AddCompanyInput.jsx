import React from 'react';
import { Row, Col, Tabs, Select,Input,Form,Divider,Icon,Upload,Radio,Cascader,Button } from 'antd';
import {RequireUtils} from 'utils';
import tabstyle from '../tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
function noop() {
  return false;
}

class CompanyMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileList:[],
      companytypes:[],
      companyflows:[],
      fileList:[],
      options:[{
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
      }],
      form:{
        company_province:"",
        company_city:"",
        company_county:""
      }
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  loadData = (selectedOptions) => {
    let targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (targetOption.district_level<=2) {
      RequireUtils.baseRequire('/common/get-district', {parent_code: targetOption.district_code}, function (data) {
        if (data.code == 1) {
          const list = data.data.list.map(function (item) {
            const obj = {
              label: item.district_name,
              value: item.district_name,
              isLeaf: false,
              id: item.id,
              district_code: item.district_code,
              parent_code: item.parent_code,
              district_level: item.district_level
            };
            return obj;
          });
          setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = list;
            this.setState({
              options: [...this.state.options],
            });
          }, 1000);
        }
        else {
          alert(data.msg);
        }
      }.bind(this));

      // load options lazily
    }
    else{
      targetOption.loading = false;
      targetOption.isLeaf=true;
      this.setState({
        options: [...this.state.options,targetOption],
      });
      return;
    }
  };

  oncasecadeChange = (value, selectedOptions) => {
    var {form} = this.state ;
    var provice = "";
    var city = "" ;
    var county = "" ;
    for(var i = 0;i< selectedOptions.length;i++){
      var selectoption = selectedOptions[i] ;

      if(selectoption.district_level==1){
        provice = selectoption.value ;
        form['company_province'] = provice ;
      }
      if(selectoption.district_level==2){
        city = selectoption.value ;
        form['company_city'] = city ;
      }
      if(selectoption.district_level==3){
        county = selectoption.value ;
        form['company_county'] = county ;
      }
    }

    this.setState({
      form:form
    });
  };

  componentDidMount (){
    var _this = this ;
    RequireUtils.baseRequire('company/type-select',{},function (data) {
      var list = data.data.list ;
      if (data.code==1){
          _this.setState({
            companytypes:list.type,
            companyflows:list.flow
          })
        }else{
        _this.setState({
          companytypes:[],
          companyflows:[]
        })
        }
    }.bind(this));

    RequireUtils.baseRequire('/common/get-district',{parent_code :""},function (data) {
      if(data.code==1) {
        const list=data.data.list.map(function(item){
          const obj={
            label:item.district_name,
            value:item.district_name,
            isLeaf:false,
            id:item.id,
            district_code:item.district_code,
            parent_code:item.parent_code,
            district_level:item.district_level
          };
          return obj;
        });
        this.setState({
          options:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }

  handleChange = (info) => {
    var _this = this ;
    var reader = new FileReader();
    if(info.file.status=="removed"){
      var showFileList = this.state.showFileList ;
      const index = showFileList.indexOf(info.file);
      const newFileList = showFileList.slice();
      newFileList.splice(index, 1);
      _this.setState({
        showFileList:[...newFileList]
      }) ;
      return ;
    }
    reader.readAsDataURL(info.file);
    reader.onload = function (e) {
      var  showFileList = _this.state.showFileList ;
      var ss = {
        uid: new Date().getTime(),
        name: 'xxx.png',
        status: 'done',
        url: this.result,
      } ;
      _this.setState({
        showFileList:[...showFileList,ss],
      });
    }
  };

  onCancel(){
    this.props.handleAddCancel() ;
    this.props.form.resetFields();
    this.setState({
      showFileList:[],
      fileList:[]
    })
  }

  handleSubmit (e) {
  }
  /**
   * 新增或者删除
   * @param type
   */
  submit(e) {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('CompanyForm[license]', file);
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err) ;
      if (err) {
      }else{
          this.setState({
              loading:true
          }) ;
        var form = this.state.form ;
        var address = values['pp'] ;

        formData.append('company_name',values['company_name']) ;
        formData.append('company_abbr',values['company_abbr']) ;
        formData.append('license_num',values['license_num']) ;
        formData.append('company_owner',values['company_owner']) ;
        formData.append('owner_phone',values['owner_phone']) ;
        formData.append('company_contact',values['company_contact']) ;
        formData.append('contact_phone',values['contact_phone']) ;
        formData.append('company_mail',values['company_mail']) ;
        formData.append('prop_id',values['prop_id']) ;
        formData.append('type_id',values['type_id']) ;
        formData.append('company_status',values['company_status']) ;
        // formData.append('company_province',form['company_province']) ;
        // formData.append('company_city',form['company_city']) ;
        // formData.append('company_county',form['company_county']) ;
        // formData.append('company_addr',values['company_addr']) ; //
        formData.append('register_addr',values['register_addr']) ; //
        formData.append('company_desc',values['company_desc']) ;
        RequireUtils.fileBaseRequire('company/add-company',formData,function (data) {
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

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType:"picture-card",
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    var {showFileList,companytypes,options,companyflows}=this.state;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const formItemLayout1 = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const formItemLayout2 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 }
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding my-platformcompanycustom-padding'}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={18} >
              <Row>
                <Col span={15}>
                  <FormItem
                    style={{width:'100%'}}
                    {...formItemLayout1}
                    label="公司名称">
                    {getFieldDecorator('company_name', {
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
              <Divider></Divider>
              <Row>
                <Col span={15}>
                  <FormItem
                    style={{width:'100%'}}
                    {...formItemLayout1}
                    label="公司简称">
                    {getFieldDecorator('company_abbr', {
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
              <Divider></Divider>
              <Row>
                <Col span={15}>
                  <FormItem
                    style={{width:'100%'}}
                    {...formItemLayout1}
                    label="营业执照号码">
                    {getFieldDecorator('license_num', {
                      initialValue:'',
                      rules: [{}],
                    })(
                      <Input
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        autoComplete="off"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={6} className={'my-custom-upload-center'}>
              <Upload
                {...props}
                fileList={showFileList}
                onChange={this.handleChange}
              >
                {showFileList.length >= 1 ? null : uploadButton}
              </Upload>
              <p style={{textAlign:'center'}}>营业执照</p>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={6} >
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout1}
                label="法人姓名">
                {getFieldDecorator('company_owner', {
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
                style={{width:'100%'}}
                {...formItemLayout1}
                label="联系方式">
                {getFieldDecorator('owner_phone', {
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
          <Divider></Divider>
          <Row>
            <Col span={11}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout1}
                label="联系人姓名">
                {getFieldDecorator('company_contact', {
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
                style={{width:'100%'}}
                {...formItemLayout1}
                label="联系方式">
                {getFieldDecorator('contact_phone', {
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
          <Divider></Divider>
          <Row>
            <Col span={11}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout1}
                label="邮箱">
                {getFieldDecorator('company_mail', {
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
                style={{width:'100%'}}
                {...formItemLayout1}
                label="公司性质">
                {getFieldDecorator('prop_id', {
                  initialValue:'',
                  rules: [{ required: true, message: '该选项为必填项' }],
                })(
                  <Select>
                    {
                      companyflows.map(function (item,index) {
                        return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Divider></Divider>
          {/*<Row>*/}
            {/*<Col span={11}>*/}
              {/*<FormItem*/}
                {/*{...formItemLayout1}*/}
                {/*style={{width:'100%'}}*/}
                {/*label="注册地址">*/}
                {/*{getFieldDecorator('pp', {*/}
                  {/*initialValue: ['zhejiang', 'hangzhou', 'xihu'],*/}
                  {/*rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],*/}
                {/*})(*/}
                  {/*<Cascader options={options}*/}
                            {/*loadData={this.loadData}*/}
                            {/*onChange={this.oncasecadeChange}*/}
                            {/*changeOnSelect />*/}
                {/*)}*/}
              {/*</FormItem>*/}
            {/*</Col>*/}
            {/*<Col span={2}></Col>*/}
            {/*<Col span={11}>*/}
              {/*<FormItem*/}
                {/*{...formItemLayout1}*/}
                {/*style={{width:'100%',marginRight:'3px'}}*/}
                {/*label="详细地址">*/}
                {/*{getFieldDecorator('company_addr', {*/}
                  {/*initialValue: '',*/}
                  {/*rules: [],*/}
                {/*})(*/}
                  {/*<Input*/}
                    {/*onContextMenu={noop} placeholder="详细地址" onPaste={noop} onCopy={noop} onCut={noop}*/}
                    {/*autoComplete="off"*/}
                  {/*/>*/}
                {/*)}*/}
              {/*</FormItem>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          {/*<Divider></Divider>*/}
          <Row>
            <Col span={11}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout1}
                label="公司简介">
                {getFieldDecorator('company_desc', {
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
                  {...formItemLayout1}
                  style={{width:'100%',marginRight:'3px'}}
                  label="注册地址">
                  {getFieldDecorator('register_addr', {
                    initialValue: '',
                    rules: [],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={11}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout1}
                label="上线状态">
                {getFieldDecorator('company_status', {
                  initialValue:'',
                  rules: [{ required: true, message: '该选项为必填项' }],
                })(
                  <Select>
                    <Option value="0">下线</Option>
                    <Option value="1">上线</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={24}>
              <FormItem
                style={{width:'100%'}}
                {...formItemLayout2}
                label="公司类型">
                {getFieldDecorator('type_id', {
                  initialValue:'',
                  rules: [{ required: true, message: '该选项为必填项' }],
                })(
                  <RadioGroup>
                    {
                      companytypes.map(function (item,index) {
                        return <Radio value={item.meta_code} key={index}>{item.meta_name}</Radio>
                      })
                    }
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row style={{marginTop:'10px'}}>
            <Col style={{textAlign:'right'}}>
              <Button onClick={this.onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
              <Button type="primary" loading={this.state.loading} onClick={(e)=>this.submit.bind(this)(e)}>确定</Button>
            </Col>
          </Row>
        </Form>
      </div >
    )
  }
}
CompanyMessage = Form.create()(CompanyMessage);
export default CompanyMessage;
