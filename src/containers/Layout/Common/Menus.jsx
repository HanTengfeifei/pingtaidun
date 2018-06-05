/** 菜单 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;

function getMenuSelectedKey(location) {
  if (!location) return '';
  const { pathname } = location;
  if (!pathname) return '';
  return pathname.replace('/', '');
}

const BearMenus = ({ lightThem, menuMode, siderOpenKeys, topHeaders, onMenuOpenChange, onSwitchTheme, onSwitchMenuMode, location }) => {

  const comProps = {
    theme: lightThem ? "light" : "dark",
    mode: menuMode === 'left' ? 'inline' : 'horizontal',
    onClick: onSwitchMenuMode
  }

  // 左侧菜单模式，能操作openKeys
  let menuProps = menuMode === 'left' ? Object.assign(comProps, {
    onOpenChange: onMenuOpenChange,
    openKeys: siderOpenKeys
  }) : Object.assign(comProps, { style: { lineHeight: '64px' } });

  const menukey = getMenuSelectedKey(location);

  return (
    <Menu {...menuProps} selectedKeys={Array.of(menukey)}>
    <SubMenu key="home" title={<span><Icon type="home" /><span>首页</span></span>}>
        <Menu.Item key="homepage"><Link to="/homepage">个人中心</Link></Menu.Item>
    </SubMenu>
    <SubMenu key="basic" title={<span><Icon type="mail" /><span>基础资料管理</span></span>}>
        <Menu.Item key="company">
          <Link to="/company"><span>公司管理</span></Link>
        </Menu.Item>
        <Menu.Item key="RollAll">
            <Link to="/roleAll"><span>角色管理</span></Link>
        </Menu.Item>
        <Menu.Item key="property">
            <Link to="/property"><span>资产管理</span></Link>
        </Menu.Item>
        <Menu.Item key="fieldstation">
            <Link to="/fieldstation"><span>场站列表</span></Link>
        </Menu.Item>
        <Menu.Item key="Scantling">
            <Link to="/Scantling"><span>标品管理</span></Link>
        </Menu.Item>
        <Menu.Item key="accountManagement">
            <Link to="/accountManagement"><span>平台账户管理</span></Link>
        </Menu.Item>
        <Menu.Item key="employee">
            <Link to="/employee"><span>企业员工管理</span></Link>
        </Menu.Item>
    </SubMenu>

    <SubMenu key="myfield" title={<span><Icon type="mail" /><span>业务资料管理</span></span>}>
        <Menu.Item key="orderlist">
            <Link to="/orderlist"><span>订单管理</span></Link>
        </Menu.Item>
        {/*商品管理*/}
        {/*<Menu.Item key="merchandisemontrol"><Link to="/merchandisemontrol">商品管理</Link></Menu.Item>*/}
        <Menu.Item key="contractmanagement"><Link to="/contractmanagement">合同管理</Link></Menu.Item>
        <Menu.Item key="planlist"><Link to="/planlist">计划列表</Link></Menu.Item>
    </SubMenu>

    <SubMenu key="waybill" title={<span><Icon type="mail" /><span>物流管理</span></span>}>
      <Menu.Item key="waybilllist">
          <Link to="/waybilllist"><span>运单管理</span></Link>
      </Menu.Item>
      <Menu.Item key="exitlist">
          <Link to="/exitlist"><span>出车单管理</span></Link>
      </Menu.Item>
      <Menu.Item key="balancelist">
          <Link to="/balancelist"><span>结算管理</span></Link>
      </Menu.Item>
    </SubMenu>

    <SubMenu key="account" title={<span><Icon type="mail" /><span>我的账务</span></span>}>
        <Menu.Item key="RollAll1">
            <Link to="/AccountingList"><span>账务管理</span></Link>
        </Menu.Item>
      {/*<Menu.Item key="accountinglist">*/}
          {/*<Link to="/accountinglist"><span>账单详情</span></Link>*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="businessstatistics"><Link to="/businessstatistics">业务统计</Link></Menu.Item>
    </SubMenu>

    <SubMenu key="systemrole" title={<span><Icon type="mail" /><span>系统权限管理</span></span>}>
        <Menu.Item key="systemrolemanage">
            <Link to="/systemrolemanage"><span>app管理</span></Link>
        </Menu.Item>
    </SubMenu>




      {topHeaders && topHeaders.length > 0 && topHeaders.map(v => v)}
    </Menu>
  )
}

BearMenus.propTypes = {
  onMenuOpenChange: PropTypes.func,
  handleSwitchMenuMode: PropTypes.func,
  onSwitchTheme: PropTypes.func,
  lightThem: PropTypes.bool,
  menuMode: PropTypes.string,
  siderOpenKeys: PropTypes.array
}

export default BearMenus;
