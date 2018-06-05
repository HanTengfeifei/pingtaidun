import React from 'react';
import {Card, Row, Col, Tabs, Icon, Radio, Select, Button, Form, Input,message,Divider ,Modal} from 'antd';
import './Banner.less';
import Picture from './Pictures';
import {RequireUtils} from 'utils';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerOptions:[],
      loading: false,
      visible: false,
      images:[],
      index:null,
      src:"",
    };
    this.addBannerOptions=this.addBannerOptions.bind(this);
    this.bannerOptionsRemove=this.bannerOptionsRemove.bind(this);
    this.showModal=this.showModal.bind(this);
  }
  showModal(e){
    console.log(e.target.getAttribute("data-index"));
    console.log(e.target);
    const index=e.target.getAttribute("data-index");
    this.setState({
      visible: true,
      index:index,
    });
  }
  sentUrl(e){
    const _this=this;
    console.log(e.target.getAttribute("src"));
    const src=e.target.getAttribute("src");
    _this.setState({
      src:src,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      const newBannerOptions=this.state.bannerOptions;
      console.log(newBannerOptions[this.state.index]);
      newBannerOptions[this.state.index].banner_img=this.state.src;
      this.setState(
        {
          loading: false,
          visible: false ,
          bannerOptions:newBannerOptions,
        }

        );
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  componentWillMount(){
    RequireUtils.baseRequire('img/get-phones', {}, function (data) {
      if (data.code) {
        console.log(data);
this.setState({
  images:data.list,
})
      } else {
        message.error(data.msg);
      }
    }.bind(this));
  }
  componentDidMount(){
    RequireUtils.baseRequire('img/show-ad', {}, function (data) {
      if (data.code) {
       this.setState({
         bannerOptions:data.list.mallBanner
       })
        console.log(data);
        console.log("jjjjkjjkjjjjjjjhhh");


      } else {
        message.error(data.msg);
      }
    }.bind(this));
  }
  addBannerOptions(){
    console.log(222222);
    const bannerOptions = this.state.bannerOptions ;
    this.setState({
      bannerOptions:[...bannerOptions,{}]
    })
  }
  bannerOptionsRemove(k){
    console.log(k);
    var {bannerOptions} = this.state ;
     var newBannerOptions=bannerOptions.filter(function (item,index) {
      if(index!=k){
        console.log(index);
        console.log("__________") ;
        console.log(item) ;
        return item
      }
    }) ;
    this.setState({
      bannerOptions:newBannerOptions
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    var _this = this ;
    const {bannerOptions,visible, loading,images}=this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    //   },
    // };
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    //   },
    // };
    // getFieldDecorator('keys', { initialValue: [] });
    // const keys = getFieldValue('keys');
    // const formItems = keys.map((k, index) => {
    //   return (
    //     <Row gutter={8}  style={{marginTop:'10px'}} key={index}>
    //     <FormItem
    //       {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
    //       label={index === 0 ? 'banner' : ''}
    //       required={false}
    //       key={k}
    //     >
    //       {getFieldDecorator(`names[${k}]`, {
    //         validateTrigger: ['onChange', 'onBlur'],
    //         rules: [{
    //           required: true,
    //           whitespace: true,
    //           message: "Please input passenger's name or delete this field.",
    //         }],
    //       })(
    //         <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
    //       )}
    //       {keys.length > 1 ? (
    //         <Icon
    //           className="dynamic-delete-button"
    //           type="minus-circle-o"
    //           disabled={keys.length === 1}
    //           onClick={() => this.remove(k)}
    //         />
    //       ) : null}
    //     </FormItem>
    //     </Row>
    //   );
    // });
    return (
      <div   clssName="banner">
        <Modal
          visible={visible}
          title="图库"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Picture  sentUrl={this.sentUrl.bind(this)} imagecard={images} />
        </Modal>
        <Row gutter={8} style={{marginTop: '10px'}}>

          <Form onSubmit={this.handleSubmit}>
            {/*{formItems}*/}
            <div>
              {
                bannerOptions.map(function(item,index){
                  var imageUrl=item.banner_img;
                  return <Row gutter={8}  style={{marginTop:'10px'}} key={index} >
                    <Col span={5}>
                      <FormItem
                        label="名称"
                        key={index}
                      >
                      {getFieldDecorator(`names[${index}]`, {
                        initialValue:item.banner_title,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                      )}
                      </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                      <FormItem
                        label="描述"
                        key={index}
                      >
                      {getFieldDecorator(`desc[${index}]`, {
                        initialValue:item.banner_desc,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                      )}
                      </FormItem>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={5}  >
                      <FormItem
                        label="图片地址"
                        key={index}
                      >
                      {getFieldDecorator(`url[${index}]`, {
                        initialValue:item.banner_url,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                      )}
                      </FormItem>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={5}>
                      <FormItem
                        label="图片"
                        key={index}
                      >
                        {/*{*/}
                          {/*imageUrl ?*/}
                            {/*<img style={{height:"30px"}} src={imageUrl} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" /> :*/}
                            {/*<Icon type="plus" className="avatar-uploader-trigger" />*/}
                        {/*}*/}
                      {getFieldDecorator(`img[${index}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                            <img style={{height:"30px"}}  data-index={index} onClick={_this.showModal}  data-value={imageUrl} data-src={imageUrl} src={imageUrl} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" />
                      )}
                      </FormItem>
                    </Col>
                    <Col span={1}>
                      <div style={{textAlign:'center'}}>
                        <Icon
                          className="dynamic-delete-button"
                          type="minus-circle-o"
                          onClick={()=>_this.bannerOptionsRemove.bind(this)(index)}
                        />
                      </div>
                    </Col>
                  </Row>
                })
              }
            </div>

            <FormItem
            >
              <Button type="dashed" onClick={this.addBannerOptions} style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
              </Button>
            </FormItem>
            <Divider/>
            <Row gutter={8}  style={{marginTop:'10px'}}  >
              <Col span={5}>
                <FormItem
                  label="名称"
                >
                  {getFieldDecorator(`mallMiddle_name`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <FormItem
                  label="描述"
                >
                  {getFieldDecorator(`mallMiddle_desc`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}  >
                <FormItem
                  label="图片地址"
                >
                  {getFieldDecorator(`mallMiddle_url`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}>
                <FormItem
                  label="图片"
                >
                  <img style={{height:"30px"}}  src={""} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" />

                </FormItem>
              </Col>
              <Col span={1}>

              </Col>
            </Row>
            <Divider/>
            <Row gutter={8}  style={{marginTop:'10px'}}  >
              <Col span={5}>
                <FormItem
                  label="名称"
                >
                  {getFieldDecorator(`mallParter_name`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <FormItem
                  label="描述"
                >
                  {getFieldDecorator(`mallParter_desc`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}  >
                <FormItem
                  label="图片地址"
                >
                  {getFieldDecorator(`mallParter_url`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input   />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}>
                <FormItem
                  label="图片"
                >

                  <img style={{height:"30px"}} src={""} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" />
                  <Icon type="plus" className="avatar-uploader-trigger" />
                </FormItem>
              </Col>
              <Col span={1}>

              </Col>
            </Row>
            <Divider/>
            <Row gutter={8}  style={{marginTop:'10px'}}  >
              <Col span={5}>
                <FormItem
                  label="名称"
                >
                  {getFieldDecorator(`mallBottom_name`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <FormItem
                  label="描述"
                >
                  {getFieldDecorator(`mallBottom_desc`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}  >
                <FormItem
                  label="图片地址"
                >
                  {getFieldDecorator(`mallBottom_url`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    }],
                  })(
                    <Input  autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
              <Col span={1}>
              </Col>
              <Col span={5}>
                <FormItem
                  label="图片"
                >

                  <img style={{height:"30px"}} src={""} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" />
                  <Icon type="plus" className="avatar-uploader-trigger" />
                </FormItem>
              </Col>
              <Col span={1}>

              </Col>
            </Row>
            <FormItem >
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
          </Form>
        </Row>
      </div>
    )
  }
}
const DynamicBanner = Form.create()(Banner);
export default DynamicBanner;
