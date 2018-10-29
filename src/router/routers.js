import navrouter from './navbar';
const Index = () => import('@/components/Index/index');
const Main = ()=>import('@/components/Main/index');
const GoodsView = () => import('@/components/Pages/goodsView');
const Viewnews = () => import('@/components/Pages/viewnews');
const Login = () => import('@/components/Pages/login');
const Register = () => import('@/components/Pages/register');
const Forgetpass = () => import('@/components/Pages/forgetpass');
const searchNumber = () => import('@/components/Pages/searchNumber');
const otherrouters=[
      {
        path: '/goodsView/:id',
        name: '商品详情',
        component: GoodsView,
      },
      {
        path: '/newsCenter/:id',
        name: '新闻中心',
        component: Viewnews,
        curIndex:"/newsCenter"
      },
      {
        path: '/login',
        name: '登录',
        component: Login,
        curIndex:"/login"
      },
      {
        path: '/register',
        name: '注册',
        component: Register,
        curIndex:"/register"
      },
      {
        path: '/forgetpass',
        name: '注册',
        component: Forgetpass,
        curIndex:"/forgetpass"
      },
      {
        path: '/searchnumber/:number',
        name: '搜索结果',
        component: searchNumber,
        curIndex:"/searchnumber"
      }
];
export const routers=[
	{
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/index',
      children:navrouter.concat(otherrouters)
    }
];
