import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Page4 from './views/nav2/Page4.vue'
import pole from "./views/nav3/pole";
import echarts from './views/charts/echarts.vue'
import circle from "./views/nav3/circle";
import other from "./views/nav3/other";
import curtain from "./views/nav3/curtain";
import valance from "./views/nav3/valance";
import yarn from "./views/nav3/yarn";
import address from "./views/nav3/address";
import show_order from "./views/show_order";
import belt from "./views/nav3/belt";
import new_order from "./views/new_order";
import input from "./views/charts/input";
import output from "./views/charts/ouput"
import fahuo from "./views/charts/fahuo"


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/show_order',
        component: show_order,
        name: 'show_order',
        hidden: true
    },
    {
        path: '/new_order',
        component: new_order,
        name: 'new_order',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-grape',//图标样式class
        children: [
            { path: '/main', component: Main,iconCls:'el-icon-lollipop', name: '主页', hidden: true },
            {
                path: '/new_order',
                component: new_order,
                name: '新建订单'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单',
        iconCls: 'fa fa-id-card-o',
        children: [
            {
                path: '/new_order',
                component: new_order,
                name: '新建订单'
            },
            { path: '/page4', component: Page4, name: '全部订单' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '窗帘仓库',
        iconCls: 'el-icon-lock',
        children: [
            { path: '/curtain', component: curtain, name: '窗帘' },
            { path: '/other', component: other, name: '其他' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '其他物件',
        iconCls: 'el-icon-orange',
        children: [
            { path: '/pole', component: pole, name: '杆子' },
            { path: '/circle', component: circle, name: '圈' },
            { path: '/valance', component: valance, name: '帘头' },
            { path: '/belt', component: belt, name: '带' },
            { path: '/yarn', component: yarn, name: '纱' },
            { path: '/address', component: address, name: '地址管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' },
            { path: '/input', component: input, name: '收入' },
            { path: '/output', component: output, name: '支出' },
            { path: '/fahuo', component: fahuo, name: '发货' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/' }
    }
];

export default routes;