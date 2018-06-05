import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,Icon,Upload,Modal } from 'antd';
import MyAvatar from './MyAvatar' ;
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import moment from 'moment';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;

function noop() {
  return false;
}

/**
 * input值发生更改时值也及时发生改变
 * @param name
 * @param value
 */
function valueChange(name,value) {
  var {form} = this.state ;
  form[name] = value ;
  this.setState({
    form:form
  })
}
/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleUpateCancel() ;
  this.props.form.resetFields();
}
/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  var _this = this ;
  this.setState({
    loading:true
  }) ;
  const { fileList ,showFileList} = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('ProductForm[report_files][]', file);
  });
  var remainFiles = showFileList.filter(function (item){
    return !item.my_custom
  });
  if(remainFiles.length==0||!remainFiles){
    formData.append('report_images[]',[]);
  }else{
    remainFiles.forEach((file) => {
      formData.append('report_images[]', file.name);
    });
  }
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = this.state.form;
      var id = this.props.updateData.id;
      formData.append('prod_name',values.prod_name);
      formData.append('place_id',values.place_id);
      formData.append('type_id',values.type_id) ;
      formData.append('area_id',values.area_id) ;
      formData.append('temp_id',values.temp_id) ;
      formData.append(' hot_value',values.hot_value) ;
      formData.append('gas_value',values.gas_value);
      formData.append('country_id',values.country_id);
      formData.append('produce_code',values.produce_code);
      formData.append('addr_id',values.addr_id);
      formData.append('produce_company',values.produce_company);
      formData.append('id',id) ;
      RequireUtils.fileBaseRequire('product/modify-product',formData,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false,
            fileList:[],
            showFileList:[]
          }) ;
          this.props.go();
          this.props.handleUpateCancel();
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
class AddContractManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      previewVisible: false,
      previewImage: '',
      updateData:{},
      imageFiles:[],
      remainFiles:[],
      newFiles:[],
      companyoptions:[],
      contracttypeoptions:[],
      fileList: [],
      showFileList:[],
      uploading: false,
      temp_id_options:[],
      addr_id_options:[],
      place_id_options:[],
      country_id_options:[],
      type_id_options:[],
      area_id_options:[],
      form:{
        prod_name:"",
        place_id:"",
        type_id:"",
        area_id:"",
        temp_id:"",
        hot_value:"",
        gas_value:"",
        country_id:"",
        produce_code:"",
        produce_company:"",
        addr_id:"",
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/product/select',{},function (data) {
      if(data.code==1) {
        console.log(data);
        var list = data.list ;
        this.setState({
          temp_id_options:list.yewen,
          addr_id_options:list.addr,
          place_id_options:list.chandi,
          country_id_options:list.guojia,
          type_id_options:list.qiyuanleixing,
          area_id_options:list.diquleixing,
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  handleCancel = () => this.setState({ previewVisible: false }) ;
  /* handleChange = ({ fileList }) => this.setState({ fileList }) ;*/
  handleChange = (info) => {
    var _this = this ;
    var {reactp} = _this.props;
    var reader = new FileReader();
    if(info.file.status=="removed"){
      var showFileList = this.state.showFileList;
      const index = showFileList.indexOf(info.file);
      const newFileList = showFileList.slice();
      newFileList.splice(index, 1);
      reactp.setState({
        imageFiles:[...newFileList]
      }) ;
      _this.setState({
        remainFiles:[...newFileList]
      }) ;
      return ;
    }
    reader.readAsDataURL(info.file);
    reader.onload = function (e) {
      var  showFileList = _this.state.showFileList ;
      var newFiles = _this.state.newFiles ;
      var ss = {
        uid:new Date().getTime(),
        name: 'xxx.png',
        status: 'done',
        url: this.result,
        my_custom:true
      } ;
      reactp.setState({
        imageFiles:[...showFileList,ss]
      }) ;
      _this.setState({
        newFiles:[...newFiles,ss]
      });
    }
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const _this = this ;
    const {
      prod_name,
      place_id,
      type_id,
      area_id,
      temp_id,
      hot_valu,
      gas_value,
      country_id,
      produce_code,
      produce_company,
      addr_id,
    } = this.props.updateData ;
    const {imageFiles} = this.props;
    const {place_id_options,temp_id_options,addr_id_options,country_id_options,type_id_options,area_id_options, previewVisible, previewImage, fileList,companyoptions,showFileList,contracttypeoptions } = this.state;
    this.state.showFileList = imageFiles;
    this.state.remainFiles = imageFiles;

    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const dateFormat = 'YYYY-MM-DD';
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
          fileList: [...fileList, file]
        }));
        return false;
      }
    };
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="标品名称">
                  {getFieldDecorator('prod_name', {
                    initialValue:"",
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('prod_name', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="生产批次">
                  {getFieldDecorator('produce_code', {
                    initialValue:{produce_code},
                    rules: [{ required:false, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('produce_code', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="气源产地">
                  {getFieldDecorator('place_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项'}],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('place_id',value)}
                    >
                      {
                        place_id_options.map(function (item,index){
                          return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="生产企业">
                  {getFieldDecorator('produce_company', {
                    initialValue:'',
                    rules: [{ required: false, message: '该选项为必填项' }],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('produce_company', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>   <Row gutter={8} >
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="生产国家">
                {getFieldDecorator('country_id', {
                  initialValue:'',
                  rules: [{ required: false, message: '该选项为必填项' }],
                })(
                  <Select style={{ width: '100%' }}
                          onChange={(value)=>valueChange.bind(this)('country_id',value)}
                  >
                    {
                      country_id_options.map(function (item,index){
                        return <Option value={item.id} key={index}>{item.country_name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={2}>
            </Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="热值">
                {getFieldDecorator('hot_value', {
                  initialValue:'',
                  rules: [{ required: true, message: '该选项为必填项' }],
                  type:"number"
                })(
                  <Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    onChange={(e) => valueChange.bind(this)('hot_value', e.target.value)}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="气源类型">
                  {getFieldDecorator('type_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('type_id',value)}
                    >
                      {
                        type_id_options.map(function (item,index){
                          return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="气化率">
                  {getFieldDecorator('gas_value', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('gas_value', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="气源地区">
                  {getFieldDecorator('area_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(

                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('area_id',value)}
                    >
                      {
                        area_id_options.map(function (item,index) {
                          return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="液温">
                  {getFieldDecorator('temp_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('temp_id',value)}
                    >
                      {
                        temp_id_options.map(function (item,index) {
                          return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="场站">
                  {getFieldDecorator('addr_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('addr_id',value)}
                    >
                      {
                        addr_id_options.map(function (item,index){
                          return <Option value={item.id} key={index}>{item.addr_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>

              </Col>
            </Row>
            <Row gutter={8}>
              <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
                <Upload
                  {...props}
                  fileList={showFileList}
                  onChange={this.handleChange}
                >
                  {showFileList.length >= 1000 ? null : uploadButton}
                </Upload>
                <small style={{verticalAlign:'bottom',marginLeft:'10px',display:'inline-block'}}>仅支持JPG、PNG格式，文件小于1M(方形图)</small>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Row>
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
AddContractManagement = createForm({mapPropsToFields(props) {
      return {
        prod_name: Form.createFormField({
          ...props.updateData.prod_name,
          value: props.updateData.prod_name,
        }),
        type_id: Form.createFormField({
          ...props.updateData.type_id.toString(),
          value: props.updateData.type_id.toString(),
        }),
        area_id: Form.createFormField({
           ...props.updateData.area_id.toString(),
          value: props.updateData.area_id.toString(),
        }),
        temp_id: Form.createFormField({
          ...props.updateData.temp_id.toString(),
          value: props.updateData.temp_id.toString(),
        }),
        hot_value: Form.createFormField({
          ...props.updateData.hot_value.toString(),
          value: props.updateData.hot_value.toString(),
        }),
        gas_value: Form.createFormField({
          ...props.updateData.gas_value,
          value: props.updateData.gas_value,
        }),
        country_id: Form.createFormField({
            ...props.updateData.country_id.toString(),
          value: props.updateData.country_id.toString(),
        }),
        produce_code: Form.createFormField({
          ...props.updateData.produce_code,
          value: props.updateData.produce_code,
        }),
        place_id: Form.createFormField({
          ...props.updateData.place_id+'',
          value: props.updateData.place_id+'',
        }),
      /*  produce_company: Form.createFormField({
          ...props.updateData.produce_company,
          value: props.updateData.produce_company,
        }),*/
        addr_id: Form.createFormField({
          ...props.updateData.addr_id.toString(),
          value: props.updateData.addr_id.toString(),
        }),
        produce_company: Form.createFormField({
          ...props.updateData.produce_company ,
          value: props.updateData.produce_company ,
        }),
      };
    },}
)(AddContractManagement);
export default AddContractManagement;
