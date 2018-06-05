import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input } from 'antd';
import { Divider } from 'antd';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class OpenTicketInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        company_name: {
          valid: false,
          value: '',
          error: ''
        },
        register_phone: {
          valid: false,
          value: '',
          error: ''
        },
        register_addr: {
          valid: false,
          value: '',
          error: ''
        },
        register_bank: {
          valid: false,
          value: '',
          error: ''
        },
        license_num: {
          valid: false,
          value: '',
          error: ''
        },
        bank_code: {
          valid: false,
          value: '',
          error: ''
        },
      },
    },
      this.handleSubmit=this.handleSubmit.bind(this);
    this.handleValueChange=this.handleValueChange.bind(this);
  }
  componentDidMount (){
    const info =this.props.info;
    console.log("55555");
    this.setState({
      form: {
        company_name: {
          valid: true,
          value: info.company_name,
          error: ''
        },
        register_phone: {
          valid: true,
          value: info.register_phone,
          error: ''
        },
        register_addr: {
          valid: true,
          value: info.register_addr,
          error: ''
        },
        register_bank: {
          valid: true,
          value: info.register_bank,
          error: ''
        },
        license_num: {
          valid: true,
          value: info.license_num,
          error: ''
        },

        bank_code: {
          valid: true,
          value: info.bank_code,
          error: ''
        },
      }
    });
  }
  componentWillReceiveProps (props){
    const info =props.info;
    this.setState({
      form: {
        company_name: {
          valid: true,
          value: info.company_name,
          error: ''
        },
        register_phone: {
          valid: true,
          value: info.register_phone,
          error: ''
        },
        register_addr: {
          valid: true,
          value: info.register_addr,
          error: ''
        },
        register_bank: {
          valid: true,
          value: info.register_bank,
          error: ''
        },
        license_num: {
          valid: true,
          value: info.license_num,
          error: ''
        },

        bank_code: {
          valid: true,
          value: info.bank_code,
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

    const newFieldObj = {value, valid: true, error: ''};

    switch (field) {
      case 'company_name': {
        if (value.length >= 11) {
          newFieldObj.error = '用户名最多10个字符';
          newFieldObj.valid = false;
        } else if (value.length === 0) {
          newFieldObj.error = '请输入角色名';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'register_phone': {
        if (value.length > 20 || value <= 0) {
          newFieldObj.error = '请输入1~20个字符';
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
      case 'register_bank': {
        if (value.length !==11) {
          newFieldObj.error = '请输入11个数字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'license_num': {
        if (value.length !==11) {
          newFieldObj.error = '请输入11个数字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'bank_code': {
        if (value.length !== 11) {
          newFieldObj.error = '请输入11个数字';
          newFieldObj.valid = false;
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
    const  info=this.props.info;
    const {form: {company_name,register_phone,register_bank,register_addr,bank_code,license_num}} = this.state;
    // if (!company_name.valid || !register_phone.valid||!register_bank.valid||!register_addr.valid||!bank_code.valid||!license_num.valid ) {
    //   alert('请填写正确的信息后重试!');
    //   return;
    // }
    RequireUtils.baseRequire('company/modify-company',{id: info.id,
      company_name:company_name.value,
      register_phone:register_phone.value,
      register_bank:register_addr.value,
      bank_code:bank_code.value,
      license_num:license_num.value,
      register_addr:register_addr.value,
        company_owner:localStorage.getItem("company_owner"),
        owner_phone:localStorage.getItem("owner_phone" ),
        company_contact:localStorage.getItem("company_contact"),
        contact_phone:localStorage.getItem("contact_phone"),
        company_abbr:localStorage.getItem("company_abbr"),
        company_mail:localStorage.getItem("company_mail"),
        prop_id:localStorage.getItem("prop_id"),
        company_prop:localStorage.getItem("company_prop"),
        type_id:localStorage.getItem("type_id"),
        company_type:localStorage.getItem("company_type"),
      company_desc:localStorage.getItem("company_desc"),
    },function (data) {
      if (data.code==1)
      {
        alert(data.msg);
        this.props.sent();
      }
      else{
        alert("提交失败!");
      }

    }.bind(this));
  }
  render() {
    const {form: {company_name,register_phone,register_bank,register_addr,bank_code,license_num}} = this.state;
    return (
      <div>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            公司名称<Input
            value={company_name.value}
            onChange={(e) => this.handleValueChange('company_name', e.target.value)}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            注册电话<Input
            onChange={(e) => this.handleValueChange('register_phone', e.target.value)}
            value={register_phone.value}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            营业执照号码<Input
            onChange={(e) => this.handleValueChange('license_num', e.target.value)}
            value={license_num.value}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            注册地址<Input
            value={register_addr.value}
            onChange={(e) => this.handleValueChange('register_addr', e.target.value)}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            开户银行<Input
            onChange={(e) => this.handleValueChange('register_bank', e.target.value)}
            value={register_bank.value}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={13} >
            开户账号<Input
            onChange={(e) => this.handleValueChange('bank_code', e.target.value)}
            value={bank_code.value}
            placeholder="Enter your username" />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={6} >
            <Button  type="primary" onClick={this.handleSubmit} >上传资料</Button>
          </Col>
        </Row>
      </div >
    )
  }
}
export default OpenTicketInput;
