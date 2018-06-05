import React from 'react';
import './header.less';
import reqwest from 'reqwest';

import style from './header.less';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"韩腾飞",
          job:"web前端",
          company:"凡华科技有限公司"
        };
    }
   callback(){

   }

    render() {
const {name,job, company}=this.state;
        return (
            <div className="container">
               <div href="" className="left">
               <img src="http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg" alt=""/>
               </div>
               <div className="right">
               <p>{name }</p>
               <p>{job}</p>
               <p>{company}</p>
               </div>
            </div>
        );
    }
}
export default Header;
