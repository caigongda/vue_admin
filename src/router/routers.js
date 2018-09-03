import navrouter from './navbar';
const Index = () => import('@/components/Index/index')
const Main = ()=>import('@/components/Main/index')
const Content = () => import('@/components/Content/index')
export const routers=[
	{
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/main',
      children:[
          {
                path: '/main',
                name: '概览',
                icon:'el-icon-tickets',
                component: Main
          },
          {
                path: '/content',
                name: '内容',
                icon:'el-icon-tickets',
                component: Content
          }
      ]
    }
].concat(navrouter);
