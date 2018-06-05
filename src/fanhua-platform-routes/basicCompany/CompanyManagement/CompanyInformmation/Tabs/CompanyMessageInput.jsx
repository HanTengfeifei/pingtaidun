import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,Form,Divider,Upload,message } from 'antd';
import CompanyMessageAvatar from './CompanyMessageAvatar.jsx' ;
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
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
class CompanyMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        company_name: {
          valid: false,
          value: '',
          error: ''
        },
        company_abbr: {
          valid: false,
          value: '',
          error: ''
        },
        register_addr: {
          valid: false,
          value: '',
          error: ''
        },
        company_contact: {
          valid: false,
          value: '',
          error: ''
        },
        contact_phone: {
          valid: false,
          value: '',
          error: ''
        },
        company_type: {
          valid: false,
          value: '',
          error: ''
        },
        company_prop: {
          valid: false,
          value: '',
          error: ''
        },
        company_mail: {
          valid: false,
          value: '',
          error: ''
        },
        company_desc: {
          valid: false,
          value: '',
          error: ''
        },
        license_num: {
          valid: false,
          value: '',
          error: ''
        },
        company_owner: {
          valid: false,
          value: '',
          error: ''
        },
        owner_phone: {
          valid: false,
          value: '',
          error: ''
        },
      },
    }
    this.callback = this.callback.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleValueChange=this.handleValueChange.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentWillMount(){

  }
  componentDidMount (){
    const info =this.props.info;
    this.props.onRef(this);
    this.setState({
      form: {
        company_name: {
          valid: true,
          value: info.company_name,
          error: ''
        },
        company_abbr: {
          valid: true,
          value: info.company_abbr,
          error: ''
        },
        company_type: {
          valid: true,
          value: info.company_type,
          error: ''
        },
        company_contact: {
          valid: true,
          value: info.company_contact,
          error: ''
        },
        contact_phone: {
          valid: true,
          value: info.contact_phone,
          error: ''
        },
        register_addr: {
          valid: true,
          value: info.register_addr,
          error: ''
        },
        company_desc: {
          valid: true,
          value: info.company_desc,
          error: ''
        },
        company_prop: {
          valid: true,
          value: info.company_prop,
          error: ''
        },
        license_num: {
          valid: true,
          value: info.license_num,
          error: ''
        },
        company_owner: {
          valid: true,
          value: info.company_owner,
          error: ''
        },

        owner_phone: {
          valid: true,
          value: info.owner_phone,
          error: ''
        },
        company_mail: {
          valid: true,
          value: info.company_mail,
          error: ''
        },
      }
    });
  }
  componentWillReceiveProps (){
    const info =this.props.info;
    console.log(info);
    console.log(9999999);
    this.setState({
      form: {
        company_name: {
          valid: true,
          value: info.company_name,
          error: ''
        },
        company_abbr: {
          valid: true,
          value: info.company_abbr,
          error: ''
        },
        company_type: {
          valid: true,
          value: info.company_type,
          error: ''
        },
        company_contact: {
          valid: true,
          value: info.company_contact,
          error: ''
        },
        contact_phone: {
          valid: true,
          value: info.contact_phone,
          error: ''
        },
        register_addr: {
          valid: true,
          value: info.register_addr,
          error: ''
        },
        company_desc: {
          valid: true,
          value: info.company_desc,
          error: ''
        },
        company_prop: {
          valid: true,
          value: info.company_prop,
          error: ''
        },
        license_num: {
          valid: true,
          value: info.license_num,
          error: ''
        },
        company_owner: {
          valid: true,
          value: info.company_owner,
          error: ''
        },

        owner_phone: {
          valid: true,
          value: info.owner_phone,
          error: ''
        },
        company_mail: {
          valid: true,
          value: info.company_mail,
          error: ''
        },
      }
    });
  }
//改变menu值
  handleValueChange (field, value, type = 'string') {
    if (type === 'number') {
      value = +value;
    }
    const {form} = this.state;
    const newFieldObj = {value:value, valid: true, error: ''};
    switch (field) {
      case 'company_name': {
        if (value.length >= 16) {
          newFieldObj.error = '公司名称最多15个字符';
          newFieldObj.valid = false;
        } else if (value.length === 0) {
          newFieldObj.error = '请输入公司名称';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'company_abbr': {
        if (value.length >= 6) {
          newFieldObj.error = '公司简称最多5个字符';
          newFieldObj.valid = false;
        } else if (value.length === 0) {
          newFieldObj.error = '请输入公司简称';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'company_type': {
      if (value.length >= 16) {
        newFieldObj.error = '公司类型最多15个字符';
        newFieldObj.valid = false;
      } else if (value.length === 0) {
        newFieldObj.error = '请输入公司类型';
        newFieldObj.valid = false;
      }
      break;
    }
    case 'company_contact': {
      if (value.length >= 11) {
        newFieldObj.error = '公司联系人姓名不得超过10个字符';
        newFieldObj.valid = false;
      } else if (value.length === 0) {
        newFieldObj.error = '请输入公司联系人姓名';
        newFieldObj.valid = false;
      }
      break;
    }
    case 'contact_phone': {
      if (value.length > 11) {
        newFieldObj.error = '公司联系人手机号不得超过11位';
        newFieldObj.valid = false;
      } else if (value.length === 0) {
        newFieldObj.error = '请输入公司联系人手机号码';
        newFieldObj.valid = false;
      }
      else if (value.length>0&&value.length<11) {
        newFieldObj.error = '手机号不得少于11位';
        newFieldObj.valid = false;
      }
      break;
    }
      case 'company_desc': {
        if (value.length < 10 ) {
          newFieldObj.error = '请输入最低10个字符';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'register_addr': {
        if (value.length !==11) {
          newFieldObj.error = '请输入11个数字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'company_prop': {
        if (value.length>15) {
          newFieldObj.error = '请输入少于15个字符';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'license_num': {
        if (value.length !==11) {
          newFieldObj.error = '请输入有效的营业执好吗';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'company_owner': {
        if (value.length >10) {
          newFieldObj.error = '公司法人不得超过10个字符';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'owner_phone': {
        if (value.length !=11) {
          newFieldObj.error = '请输入有效的手机号码';
          newFieldObj.valid = false;
        }
        break;
      }
    case 'company_mail': {
      let re=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!re.test(value)) {
          newFieldObj.error = '邮箱的格式有误，请输入有效的邮箱';
          newFieldObj.valid = false;
        }
        else{
          newFieldObj.error = '正确';
          newFieldObj.valid = true;
        }
        break;
      }
    }
    this.setState({
      form: {
        ...form,
        [field]: newFieldObj
      }
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    const info=this.props.info;
    const url=this.props.url;
    console.log(url);
    console.log(66666);
    // const{register_phone,bank_code}=info;
    // const { imgUrl, form: {company_name,company_contact,contact_phone,company_type,company_prop,owner_phone,company_abbr,register_addr,company_desc,company_owner,license_num,company_mail}} = this.state;
    // // if (!company_name.valid || !register_phone.valid||!register_bank.valid||!register_addr.valid||!bank_code.valid||!license_num.valid ) {
    // //   alert('请填写正确的信息后重试!');
    // //   return;
    // // }
    // RequireUtils.baseRequire('company/modify-company',{id: info.id,
    //   company_name:company_name.value,
    //   register_phone:register_phone,
    //   register_bank:register_addr.value,
    //   bank_code:bank_code,
    //   license_num:license_num.value,
    //   register_addr:register_addr.value,
    //   company_owner:company_owner.value,
    //   owner_phone:owner_phone.value,
    //   company_contact:company_contact.value,
    //   contact_phone:contact_phone.value,
    //   company_abbr:company_abbr.value,
    //   company_prop:company_prop.value,
    //   company_mail:company_mail.value,
    //   company_type:company_type.value,
    //   company_desc: company_desc.value,
    // },function (data) {
    //   if (data.code==1)
    //   {
    //     alert(data.msg);
    //     this.props.sent();
    //   }
    //   else{
    //     alert("提交失败!");
    //   }
    // }.bind(this));
  }
  render() {
    var { imgUrl, form: {company_name,company_contact,contact_phone,company_type,company_prop,owner_phone,company_abbr,register_addr,company_desc,company_owner,license_num,company_mail}}=this.state;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
                 公司名称: <Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                     value={company_name.value}
                    onChange={(e) => this.handleValueChange('company_name', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
              营业执照号码:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={license_num.value}
                    onChange={(e) => this.handleValueChange('license_num', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
                  公司简称:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_abbr.value}
                    onChange={(e) => this.handleValueChange('company_abbr', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
              公司类型:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_type.value}
                    onChange={(e) => this.handleValueChange('company_type', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
              联系人姓名:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_contact.value}
                    onChange={(e) => this.handleValueChange('company_contact', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
               公司简介:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_desc.value}
                    onChange={(e) => this.handleValueChange('company_desc', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
               联系方式:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={contact_phone.value}
                    onChange={(e) => this.handleValueChange('contact_phone', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
                注册地址:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={register_addr.value}
                    onChange={(e) => this.handleValueChange('register_addr', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
                  法人姓名:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_owner.value}
                    onChange={(e) => this.handleValueChange('company_owner', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
                 邮箱:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_mail.value}
                    onChange={(e) => this.handleValueChange('company_mail', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={10} >
                 联系人方式: <Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={owner_phone.value}
                    onChange={(e) => this.handleValueChange('owner_phone', e.target.value)}
                  />
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
                 公司性质:<Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    value={company_prop.value}
                    onChange={(e) => this.handleValueChange('company_prop', e.target.value)}
                  />
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={6} >
              {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="管理员账号">*/}
                {/*{getFieldDecorator('bill_name', {*/}
                  {/*initialValue:'',*/}
                {/*})(*/}
                  {/*<Input*/}
                    {/*onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}*/}
                    {/*autoComplete="off"*/}
                    {/*onChange={(e) => valueChange.bind(this)('bill_name', e.target.value)}*/}
                    {/*addonAfter="更换"*/}
                  {/*/>*/}
                {/*)}*/}
              {/*</FormItem>*/}
            </Col>
          </Row>
        </Form>
      </div >
    )
  }
}
CompanyMessage = Form.create()(CompanyMessage);
export default CompanyMessage;
