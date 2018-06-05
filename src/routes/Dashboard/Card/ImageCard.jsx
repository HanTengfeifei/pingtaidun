import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import './Card.less';

class ImageCard extends React.Component {

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
                      <img src={v.url} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" />
                    </div>
                    <div className={'card-content'}>
                      <h4>{v.name}</h4>
                      <p>我看着挺好看的</p>
                    </div>
                    <div className={'card-footer'}>
                      <h4>没有啊</h4>
                      <div className='position'>
                        <Icon type="environment" />{' '}来自人人网
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
