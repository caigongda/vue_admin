<template>
	<el-container class="app-nav-wrap">
		<div 
			class="app-nav-item" 
			v-for="(item,index) in navrouter" 
			:key="index"
			:class="{activenav:defaultActive==item.name}"
			@click="changeNav(index,item.path)">
			{{item.name}}
		</div>
	</el-container>
</template>
<script>
import navrouter from "@/router/navbar"
	export default{
		data(){
			return{
				navrouter:navrouter,
			}
		},
		computed:{
			defaultActive(){
				return this.$route.name
			}
		},
		mounted(){
			console.log(this.$route.path)
		},
		methods: {
	      changeNav(index,path){
	      	if (path=="/membercenter") {
	      		if (this.getuserinfo()) {
	      			this.$router.push({path:path})
	      		}else{
	      			this.$message({
						type:"warning",
						message:"您还没有登录！"
					});
					//this.$router.push({path:'/index'});
					return;
	      		}
	      	}
	      	this.$router.push({path:path})
	      }
	    }
	}
</script>
<style lang="scss">
$bg:#F32613;
$activebg:#D02629;
.app-nav-wrap{
	height:40px;
	width:100%;
	min-width:1280px !important;
	background:$bg;
	justify-content: center;
	box-shadow: 0 4px 8px #999;
}
.app-nav-item{
	width:200px;
	height:100%;
	display:flex;
	justify-content:center;
	align-items:center;
	color:#fff;
	cursor:pointer;
}
.app-nav-item:hover,.activenav{
	background:$activebg;
}
</style>