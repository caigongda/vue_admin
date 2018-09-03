<template>
	<el-container>
	  <el-progress v-if="percent>0" :percentage="100" :show-text="false" :stroke-width="3" :style="{right:100-percent+'%'}" class="PageLoading"></el-progress>
	  <el-header class="app-header-wrap">{{percent}}</el-header>
	  <el-container>
	    <el-aside width="200px">
	    	<NavBar></NavBar>
	    </el-aside>
	    <el-container>
	      <el-main>
	      	<router-view></router-view>
	      </el-main>
	      <el-footer>Footer</el-footer>
	    </el-container>
	  </el-container>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar';
	export default{
		name:"Index",
		components:{NavBar},
		computed:{
			percent(){
				return this.$store.getters.GetPercent
			}
		},
		data(){
			return{

			}
		}
	}
</script>

<style>
	.app-header-wrap{
    	line-height: 60px;
    	background: #dddddd;
	}
	.PageLoading{
		position: fixed;
		top: 0;
	    left: 0;
	    right: 0;
	    transition: 0.3s;
	}
</style>