import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,Form,Divider,Upload,message } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'||'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片内容不得超过 2MB!');
  }
  return isJPG && isLt2M;
}
class CompanyMessageAvatar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl:false,
    }

  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl:imageUrl
      }));
    }
  };
  // componentWillMount(){
  //   const url= this.props.imgUrl;
  //   console.log(url);
  //   console.log(88888888);
  // }
  componentDidMount(){
    // this.props.onRef(this);
  }
  componentWillReceiveProps(){
    const url=this.props.imgUrl.license_url;
    if (url) {
      this.setState({
        imageUrl: url,
      });
    }
    else {
      this.setState({
        imgUrl:false,
      })
    }
  }
  render() {

    const imageUrl = this.state.imageUrl;
    const {imgUrl} = this.props ;
    console.log("999990000") ;
    console.log(imgUrl) ;
    const url = RequireUtils.ip + "company/modify-license"; //
    const props={
      className:"avatar-uploader",
      name:"CompanyForm[license]",
      showUploadList:false,
      action:url,
      beforeUpload:beforeUpload,
      onChange:this.handleChange,
    data:{
        id:imgUrl.id
      }
  }
    return (
      <div>
        <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
      <Upload {...props}
      >
        {
          imageUrl ?
            <img src={imageUrl} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
          <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>仅支持JPG、PNG格式，文件小于1M(方形图)</small>
        </Row>
      </div>
    );
  }
}
export default CompanyMessageAvatar;
