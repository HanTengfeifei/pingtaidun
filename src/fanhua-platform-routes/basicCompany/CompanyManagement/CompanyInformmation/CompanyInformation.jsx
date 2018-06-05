import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select ,Modal,message} from 'antd';
import {RequireUtils} from 'utils';
import CompanyMessageInput from './Tabs/CompanyMessageInput';
import AddressMessage from './Tabs/AddressMessage';
import OpenTicketInput from './Tabs/OpenTicketInput';
import AptitudeMessage from './ziZhiManagement/ContractManagement';
import CompanyMessageAvatar from './Tabs/CompanyMessageAvatar';
import ChangeCountMadel from './Tabs/ChangCountMadel';
import './CompanyInformation.less';
const TabPane = Tabs.TabPane;

class CompanyInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      info:{}
    };
    this.callback = this.callback.bind(this);
    this.findRoleAll=this.findRoleAll.bind(this);
    this.onRef=this.onRef.bind(this);
    // this.onRefS=this.onRefS.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  onRef(ref){
    this.child=ref;
  }
  // onRefS(refS){
  //   this.childS=refS;
  // }

  callback(key) {
    console.log(key);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  componentDidMount(){
    this.findRoleAll();
  }
  componentWillMount(){
    this.findRoleAll();
  }
  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('/company/company-info',{id:this.props.location.search.split("=")[1]},function (data) {
      if(data.code==1) {
        const info=data.data.info;
        this.setState({
          info:info,
        });
        localStorage.setItem("id",info.id);
        localStorage.setItem("id",info.id);
        localStorage.setItem("company_owner",data.data.info.company_owner);
        localStorage.setItem("owner_phone",data.data.info.owner_phone);
        localStorage.setItem("company_contact",data.data.info.company_contact);
        localStorage.setItem("contact_phone",data.data.info.contact_phone);
        localStorage.setItem("company_abbr",data.data.info.company_abbr);
        localStorage.setItem("company_mail",data.data.info.company_mail);
        localStorage.setItem("prop_id",data.data.info.prop_id );
        localStorage.setItem("company_prop",data.data.info.company_prop);
        localStorage.setItem("type_id",data.data.info.type_id);
        localStorage.setItem("company_type",data.data.info.company_type);
        localStorage.setItem("company_desc",data.data.info.company_desc);
        this.child.setState({
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
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  handleSubmit (e) {
    e.preventDefault();
    const info=this.state.info;
    var context=this;
    console.log(this.refs["child"].state.imageUrl);
    console.log(this.child.state);
    const{register_phone,bank_code}=info;
    const { form: {company_name,company_contact,contact_phone,company_type,company_prop,owner_phone,company_abbr,register_addr,company_desc,company_owner,license_num,company_mail}} = this.child.state;
    // if (!company_name.valid || !register_phone.valid||!register_bank.valid||!register_addr.valid||!bank_code.valid||!license_num.valid ) {
    //   alert('请填写正确的信息后重试!');
    //   return;
    // }
    RequireUtils.baseRequire('company/modify-company',{
      id: info.id,
      company_name:company_name.value,
      register_phone:register_phone,
      register_bank:register_addr.value,
      bank_code:bank_code,
      license_num:license_num.value,
      register_addr:register_addr.value,
      company_owner:company_owner.value,
      owner_phone:owner_phone.value,
      company_contact:company_contact.value,
      contact_phone:contact_phone.value,
      company_abbr:company_abbr.value,
      company_prop:company_prop.value,
      company_mail:company_mail.value,
      company_type:company_type.value,
      company_desc: company_desc.value,
      license_url:this.refs["child"].state.imageUrl,
    },function (data) {
      if (data.code==1)
      {
        message.success(data.msg);
        context.findRoleAll();
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  render() {
    const { visible, confirmLoading, ModalText ,info} = this.state;
    return (
      <div>
        <Modal title={ModalText}
               visible={visible}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               width={520}
        >
          <ChangeCountMadel/>
        </Modal>
        <Row>
        </Row>

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="公司管理" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="公司信息" key="1">
                  <CompanyMessageAvatar  imgUrl={info} ref="child" />
                  <CompanyMessageInput  info={info}   sent={this.findRoleAll}  onRef={this.onRef} />
                  <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={4} offset={1}>
                      <Button  type="primary" onClick={this.handleSubmit}>上传资料</Button>
                    </Col>
                    <Col span={11} offset={5}>
                      <Button  type="primary" onClick={this.showModal}  >更改管理员账号</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="开票信息" key="3">
                  <OpenTicketInput   info={this.state.info} sent={this.findRoleAll}></OpenTicketInput>
                </TabPane>
                <TabPane tab="资质信息" key="4">
                  <AptitudeMessage></AptitudeMessage>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

