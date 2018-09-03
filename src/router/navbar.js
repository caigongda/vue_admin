const Index = () => import('@/components/Index/index')
const navrouter=[
	{
		path: '/a',
      	name: '导航一',
      	icon:'el-icon-tickets',
      	component: Index,
      	children:[
      		{
      			path:"/a/a",
      			name:"子导航一",
      			icon:'el-icon-tickets',
      			component:Index,
      			children:[
		      		{
		      			path:"/a",
		      			name:"子子导航一",
		      			icon:'el-icon-tickets',
		      			component:Index,
		      		}
      			]
      		}
      	]
	}
]
export default navrouter