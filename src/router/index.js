import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './routers'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
})
