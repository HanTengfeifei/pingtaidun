import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import { Divider } from 'antd';
import { Modal } from 'antd';
import Form from './UpdatePersonForm';
import './personalcenter.less';


const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Mation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ModalText: 'Content of the modal',
          visible: false,
          confirmLoading: false,
        }
        this.callback = this.callback.bind(this);
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.refs["form"].handleSubmit(e);
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
    callback(key) {
        console.log(key);
    }
    componentDidMount() {
    }
    render() {
      const { visible, confirmLoading, ModalText } = this.state;
      const {name,mobile}=this.props.info;
        return (
            <div>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={4} >
                 真实姓名:
                </Col>
                 <Col span={20}>
                {name}
                </Col>
              </Row>
              <Divider></Divider>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={4} >
                登录手机:
                </Col>
                 <Col span={20}>
                {mobile}
                </Col>
                  </Row>
              <Divider></Divider>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col    span={24} >
                  <Button  className={"button1"} type="primary" onClick={this.showModal}>编辑</Button>
                  <Modal title="Title"
                         visible={visible}
                         onOk={this.handleOk}
                         confirmLoading={confirmLoading}
                         onCancel={this.handleCancel}
                  >
                    <Form ref="form"  info={this.props.info} sent={this.props.fresh}  />
                  </Modal>
                </Col>

              </Row>
              <Divider></Divider>
            </div >
        )
    }
}

export default Mation;
