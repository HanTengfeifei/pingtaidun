import React from 'react';
import reqwest from  'reqwest';
import './Form.less';
import {Input ,  Row, Col   } from 'antd';
import {RequireUtils} from 'utils';
class UserEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      form: {
        user_name: {
          valid: false,
          value: '',
          error: ''
        },
        user_wechat: {
          valid: false,
          value: '',
          error: ''
        },
        user_phone: {
          valid: false,
          value: '',
          error: ''
        },
        user_mobile: {
          valid: false,
          value: '',
          error: ''
        },
      },

    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleValueChange=this.handleValueChange.bind(this);
  }
  componentDidMount (){
    const info =this.props.info;
    const {form} = this.state;
    this.setState({
      form: {
        user_name: {
          valid: true,
          value: info.user_name,
          error: ''
        },
        user_wechat: {
          valid: true,
          value: info.user_wechat,
          error: ''
        },
        user_phone: {
          valid: true,
          value: info.user_phone,
          error: ''
        },
        user_mobile: {
          valid: true,
          value: info.user_mobile,
          error: ''
        },
      },

    });
    }
  componentWillReceiveProps (){
    const info =this.props.info;
    const {form} = this.state;
    this.setState({
      form: {
        user_name: {
          valid: true,
          value: info.user_name,
          error: ''
        },
        user_wechat: {
          valid: true,
          value: info.user_wechat,
          error: ''
        },
        user_phone: {
          valid: true,
          value: info.user_phone,
          error: ''
        },
        user_mobile: {
          valid: true,
          value: info.user_mobile,
          error: ''
        },
      },

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
      case 'user_name': {
        if (value.length >= 11) {
          newFieldObj.error = '用户名最多10个字符';
          newFieldObj.valid = false;
        } else if (value.length === 0) {
          newFieldObj.error = '请输入角色名';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_wechat': {
        if (value.length > 20 || value <= 0) {
          newFieldObj.error = '请输入1~20个字符';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_phone': {
        if (value.length !==11) {
          newFieldObj.error = '请输入11个数字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_mobile': {
        if (value.length !==11) {
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
    const {form: {user_name,user_wechat,user_phone,user_mobile}} = this.state;
    if (!user_wechat.valid || !user_name.valid||!user_phone.valid||!user_mobile.valid ) {
      alert('请填写正确的信息后重试!');
      return;
    }
    RequireUtils.baseRequire('person/modify-info',{id: info.id,
      user_name:user_name.value,
      user_wechat:user_wechat.value,
     user_phone:user_phone.value,
      user_mobile:user_mobile.value,
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

  render () {
    const {form: {user_name,user_wechat,user_phone,user_mobile}} = this.state;
    return (
      <div>
        <main>
          <form>
            <Row gutter={4}>
              <Col span={4}>

                <label className="dec">真实姓名：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_name.value}
                  onChange={(e) => this.handleValueChange('user_name', e.target.value)}
                />
              </Col>
              <Col span={4}>
                {!user_name.valid && <span>{user_name.error}</span>}
              </Col>
            </Row>
            <br/>
            <Row gutter={4}>
              <Col span={4}>
                <label className="dec">绑定微信：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_wechat.value || ''}
                  onChange={(e) => this.handleValueChange('user_wechat', e.target.value, 'string')}
                />
              </Col>
              <Col span={4}>
                {!user_wechat.valid && <span>{user_wechat.error}</span>}
              </Col>
            </Row>
            <br/>
            <Row gutter={4}>
              <Col span={4}>
                <label className="dec">办公电话：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_phone.value || ''}
                  onChange={(e) => this.handleValueChange('user_phone', e.target.value, 'string')}
              />
            </Col>
              <Col span={4}>
                {!user_phone.valid && <span>{user_phone.error}</span>}
              </Col>
            </Row>
            <br/>
            <Row gutter={4}>
              <Col span={4}>
                <label className="dec">登录手机：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_mobile.value || ''}
                  onChange={(e) => this.handleValueChange('user_mobile', e.target.value, 'string')}
              />
            </Col>
              <Col span={4}>
                {!user_mobile.valid && <span>{user_mobile.error}</span>}
              </Col>
            </Row>
            <br/>
          </form>
        </main>
      </div>
    );
  }
}

export default UserEdit;
