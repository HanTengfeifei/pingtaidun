import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './containers/App';
import Login from './routes/Login/Login';
import NotFound from './routes/NotFound/NotFound';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="globalSpin" />;
});

const Routers = function ({ history, app }) {

  const routes = [
    {
      path: '/homepage',
      component: () => import('./fanhua-platform-routes/HomePage/Homepage'),
    },
    {
      path: '/AccountingList',
      component: () => import('./fanhua-platform-routes/Accounting/AccountingList/AccountingList'),
    },
    {
      path: '/Scantling',
      component: () => import('./fanhua-platform-routes/Scantling/ScantlingManagement/ScantlingManagement'),
    },
    {
      path: '/employee',
      component: () => import('./fanhua-platform-routes/CompanyManagement/EmployeeManagement/MyEmployeeManagement'),
    },{
      path: '/accountManagement',
      component: () => import('./fanhua-platform-routes/CompanyAccountManagement/EmployeeManagement/MyEmployeeManagement'),
    }, {
      path: '/roleAll',
      component: () => import('./fanhua-platform-routes/RoleAll/RoleAll'),
    },
    {
      path: '/company',
      component: () => import('./fanhua-platform-routes/basicCompany/CompanyManagement/CompanyList'),
    },
    {
      path: '/CompanyInformation',
      component: () => import('./fanhua-platform-routes/basicCompany/CompanyManagement/CompanyInformmation/CompanyInformation'),
    },
    {
      path: '/planlist',
      component: () => import('./fanhua-platform-routes/Trade/PlanList/PlanListTabs')
    },
    {
      path: '/property',
      component: () => import('./fanhua-platform-routes/basicCompany/PropertyManagement/PropertyManagement'),
    },
    {
      path: '/fieldstation',
      component: () => import('./fanhua-platform-routes/FieldStation/FieldStationList/FieldStationList'),
    },
    {
      path: '/wlwaybilldetaillist',
      component: () => import('./fanhua-platform-routes/Logistics/WayBill/WuliuWayBillDetailList')
    },
    {
      path: '/orderlist',
      component: () => import('./fanhua-platform-routes/Trade/OrderList/OrderList'),
    },
    {
      path: '/orderlistdetail',
      component: () => import('./fanhua-platform-routes/Trade/OrderList/OrderListDetails')
    },
    {
      path:'/accountinglist',
      component: () => import('./fanhua-platform-routes/Accounting/AccountingList/AccountingList'),
    },
    {
      path:'/businessstatistics',
      component: () => import('./fanhua-platform-routes/Accounting/BusinessStatistics/BusinessStatistics'),
    },
    {
      path:'/contractmanagement',
      component: () => import('./fanhua-platform-routes/Contract/ContractManagement/ContractManagement'),
    },
    {
      path: '/exitlist',
      component: () => import('./fanhua-platform-routes/Logistics/ExitList/ExitList')
    },
    {
      path: '/exitwaybilldetaillist',
      component: () => import('./fanhua-platform-routes/Logistics/ExitList/Tabs/ExitWayBillDetailList')
    },
    {
      path:'/balacedetaillist',
      component: () => import('./fanhua-platform-routes/Logistics/BalanceList/BalaceDetailList')
    },
    {
      path: '/waybilllist',
      component: () => import('./fanhua-platform-routes/Logistics/WayBill/WayBillList')
    },
    {
      path:'/balancelist',
      component: () => import('./fanhua-platform-routes/Logistics/BalanceList/BalanceList')
    },
    {
      path: '/dashboard1',
      component: () => import('./routes/Dashboard/Dashboard1'),
    },
    {
      path: '/dashboard2',
      component: () => import('./routes/Dashboard/Dashboard2'),
    },
    {
      path: '/mail',
      component: () => import('./routes/Mail/Mail'),
    },
    {
      path: '/profile',
      component: () => import('./routes/Pages/Profile'),
    },
    {
      path: '/blank',
      component: () => import('./routes/Pages/Blank'),
    },
    {
      path: '/banner',
      component: () => import('./fanhua-platform-routes/Banners/Banner'),
    },
    {
      path: '/systemrolemanage',
      component: () => import('./fanhua-platform-routes/SystemRoleManage/SystemRoleManageList/SystemRoleManageList'),
    },
    {
      path: '/signup',
      component: () => import('./routes/Pages/Signup'),
    },
    {
      path: '/lock',
      component: () => import('./routes/Pages/Lock'),
    },
    {
      path: '/todo',
      component: () => import('./routes/Pages/Todo'),
    },
    {
      path: '/affix',
      component: () => import('./routes/Navigation/Affix')
    },
    {
      path: '/pagination',
      component: () => import('./routes/Navigation/Pagination')
    },
    {
      path: '/breadcrumb',
      component: () => import('./routes/Navigation/Breadcrumb')
    },
    {
      path: '/steps',
      component: () => import('./routes/Navigation/Steps')
    },
    {
      path: '/avatar',
      component: () => import('./routes/UI/Avatar')
    },
    {
      path: '/button',
      component: () => import('./routes/UI/Button')
    },
    {
      path: '/icon',
      component: () => import('./routes/UI/Icon')
    },
    {
      path: '/tag',
      component: () => import('./routes/UI/Tag')
    },
    {
      path: '/switch',
      component: () => import('./routes/UI/Switch')
    },
    {
      path: '/calendar',
      component: () => import('./routes/UI/Calendar')
    },
    {
      path: '/checkbox',
      component: () => import('./routes/UI/Checkbox')
    },
    {
      path: '/radio',
      component: () => import('./routes/UI/Radio')
    },
    {
      path: '/input',
      component: () => import('./routes/UI/Input')
    },
    {
      path: '/timeline',
      component: () => import('./routes/UI/Timeline')
    },
    {
      path: '/badge',
      component: () => import('./routes/UI/Badge')
    },
    {
      path: '/slider',
      component: () => import('./routes/UI/Slider')
    },
    {
      path: '/popconfirm',
      component: () => import('./routes/Display/Popconfirm')
    },
    {
      path: '/popover',
      component: () => import('./routes/Display/Popover')
    },
    {
      path: '/notification',
      component: () => import('./routes/Display/Notification')
    },
    {
      path: '/message',
      component: () => import('./routes/Display/Message')
    },
    {
      path: '/alert',
      component: () => import('./routes/Display/Alert')
    },
    {
      path: '/tooltip',
      component: () => import('./routes/Display/Tooltip')
    },
    {
      path: '/collapse',
      component: () => import('./routes/Display/Collapse')
    },
    {
      path: '/tree',
      component: () => import('./routes/Display/Tree')
    },
    {
      path: '/treeselect',
      component: () => import('./routes/Display/TreeSelect')
    },
    {
      path: '/modal',
      component: () => import('./routes/Display/Modal')
    },
    {
      path: '/tabs',
      component: () => import('./routes/Display/Tabs')
    },
    {
      path: '/carousel',
      component: () => import('./routes/Display/Carousel')
    },
    {
      path: '/progress',
      component: () => import('./routes/Display/Progress')
    },
    {
      path: '/mention',
      component: () => import('./routes/Entry/Mention')
    },
    {
      path: '/rate',
      component: () => import('./routes/Entry/Rate')
    },
    {
      path: '/select',
      component: () => import('./routes/Entry/Select')
    },
    {
      path: '/transfer',
      component: () => import('./routes/Entry/Transfer')
    },
    {
      path: '/dropdown',
      component: () => import('./routes/Entry/Dropdown')
    },
    {
      path: '/autocomplete',
      component: () => import('./routes/Entry/AutoComplete')
    },
    {
      path: '/cascader',
      component: () => import('./routes/Entry/Cascader')
    },
    {
      path: '/datepicker',
      component: () => import('./routes/Entry/DatePicker')
    },
    {
      path: '/timepicker',
      component: () => import('./routes/Entry/TimePicker')
    },
    {
      path: '/baseform',
      component: () => import('./routes/Form/BaseForm')
    },
    {
      path: '/advancedform',
      component: () => import('./routes/Form/AdvancedForm')
    },
    {
      path: '/advancedsearch',
      component: () => import('./routes/Form/AdvancedSearch')
    },
    {
      path: '/basetable',
      component: () => import('./routes/Table/BaseTable')
    },
    {
      path: '/advanced',
      component: () => import('./routes/Table/Advanced')
    },
    {
      path: '/playground',
      component: () => import('./routes/Table/Playground')
    },
    {
      path: '/custable',
      component: () => import('./routes/Table/CusTable')
    },
    {
      path: '/grid',
      component: () => import('./routes/Layout/Grid')
    },
    {
      path: '/gridplayground',
      component: () => import('./routes/Layout/GridPlayground')
    },
    {
      path: '/layout',
      component: () => import('./routes/Layout/Layout')
    },
    {
      path: '/card',
      component: () => import('./routes/Layout/Card')
    },
    {
      path: '/menu',
      component: () => import('./routes/Layout/Menu')
    },
    {
      path: '/logogather',
      component: () => import('./routes/AntMotion/LogoGather')
    },
    {
      path: '/tableanim',
      component: () => import('./routes/AntMotion/TableAnim')
    },
    {
      path: '/listanim',
      component: () => import('./routes/AntMotion/ListAnim')
    },
    {
      path: '/detailswitch',
      component: () => import('./routes/AntMotion/DetailSwitch')
    },
    {
      path: '/listsort',
      component: () => import('./routes/AntMotion/ListSort')
    },
    {
      path: '/picanim',
      component: () => import('./routes/AntMotion/PicAnim')
    },
    {
      path: '/banneranim',
      component: () => import('./routes/AntMotion/BannerAnim')
    },
    {
      path: '/about',
      component: () => import('./routes/About/About')
    }
  ]

  const Notfound = dynamic({
    app,
    component: () => NotFound,
  })

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
        <App>
          <Switch>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route
                  key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={Notfound} />
          </Switch>
        </App>
        </Switch>
      </Router>
    </LocaleProvider>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
