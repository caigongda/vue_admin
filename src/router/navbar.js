const Index = () => import('@/components/Main/index');
const NumberSel = () => import('@/components/pages/numberSel');
const NewsCenter = () => import('@/components/pages/newsCenter');
const Contact = () => import('@/components/pages/contact');
const membercenter = () => import('@/components/Pages/membercenter');
const navrouter=[
	{
		path: '/index',
      	name: '首页',
      	component: Index,
            curIndex:"/index"
	},
      {
            path: '/numberSel',
            name: '选号大厅',
            component: NumberSel,
            curIndex:"/numberSel"
      },
      {
            path: '/netStore',
            name: '网络商城',
            redirect: '/index',
            component: Index,
            curIndex:"/netStore"
      },
      {
            path: '/newsCenter',
            name: '新闻中心',
            component: NewsCenter,
            curIndex:"/newsCenter"
      },
      {
            path: '/contact',
            name: '联系我们',
            component: Contact,
            curIndex:"/contact"
      },
      {
            path: '/membercenter',
            name: '会员中心',
            component: membercenter,
            curIndex:"/membercenter"
      }
]
export default navrouter