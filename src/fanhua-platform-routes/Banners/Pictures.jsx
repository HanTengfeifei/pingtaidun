import React from 'react';
import { Row, Col, Card, Icon,message } from 'antd';
import './Picture.less';
import {RequireUtils} from 'utils';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
componentDidMount(){
  // RequireUtils.baseRequire('img/show-ad', {}, function (data) {
  //   if (data.code) {
  //     this.setState({
  //       bannerOptions:data.list.mallBanner
  //     })
  //     console.log(data);
  //
  //
  //   } else {
  //     message.error(data.msg);
  //   }
  // }.bind(this));
}
  render() {

    const { imagecard } = this.props;

    return (
      <div>
        <Row gutter={32} className='showcase-2'>
          {
            imagecard && imagecard.map((v, k) => {
              return (
                <Col xs={12} sm={12} md={12} lg={8} xl={8} key={k}>
                  <Card
                    bordered={false}
                    hoverable>
                    <div className={'card-header'}>
                      <img src={v.url}      onDoubleClick={this.props.sentUrl} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" />
                    </div>
                    <div className={'card-content'}>
                      <h4>{v.name}</h4>
                      <p>我感觉还挺好看的</p>
                    </div>
                    <div className={'card-footer'}>
                      <h4>不知道什么title</h4>
                      <div className='position'>
                        <Icon type="environment" />{' '}图片来自人人网
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }
}

ImageCard.propTypes = {};

export default ImageCard;
