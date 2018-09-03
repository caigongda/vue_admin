<template>
	<el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :router="true"
      :default-active="defaultActive"
      @close="handleClose">
      <el-menu-item index="/main">
        <i class="el-icon-document"></i>
        <span slot="title">概览</span>
      </el-menu-item>
      <el-menu-item index="/content">
        <i class="el-icon-setting"></i>
        <span slot="title">内容</span>
      </el-menu-item>
      <template v-for="(item,index) in navrouter">
	      <el-submenu :index="item.path" v-if="item.children" :key="index">
	        <template slot="title">
	          <i :class="item.icon"></i>
	          <span>{{item.name}}</span>
	        </template>
	        <template v-for="(child,index) in item.children">
	        <el-submenu :index="child.path" v-if="child.children" :key="index">
	          <template slot="title">
	          	<i :class="child.icon"></i>
	          	<span>{{child.name}}</span>
	      	  </template>
	        	<template v-for="(childchild,index) in child.children">
		        	<el-menu-item :index="childchild.path" :key="index" style="padding-left: 70px">
			          <i :class="childchild.icon"></i>
			          <span>{{childchild.name}}</span>
			        </el-menu-item>
	        	</template>
	        </el-submenu>
	        <el-menu-item v-else :index="child.path" style="padding-left: 70px">
	        	<template slot="title">
		          <i :class="child.icon"></i>
		          <span>{{child.name}}</span>
		        </template>
	        </el-menu-item>
	        </template>
	      </el-submenu>
      </template>
    </el-menu>
</template>
<script>
import navrouter from "@/router/navbar"
	export default{
		data(){
			return{
				navrouter:navrouter,
				//defaultActive:"/main"
			}
		},
		computed:{
			defaultActive(){
				return this.$route.path
			}
		},
		mounted(){
			
		},
		methods: {
	      handleOpen(key, keyPath) {
	      },
	      handleClose(key, keyPath) {
	      }
	    }
	}
</script>