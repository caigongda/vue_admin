<template>
	<el-container>
	  <el-progress v-if="percent>0" :percentage="100" :show-text="false" :stroke-width="3" :style="{right:100-percent+'%'}" class="PageLoading"></el-progress>
	  	<Header/>
	    <NavBar></NavBar>
	    <el-container style="width:100%;min-width:1280px;">
	    	<keep-alive exclude="membercenter">
	      		<router-view></router-view>
	      	</keep-alive>
	    </el-container>
	    <el-footer class="app-footer">
	    	<p>大量靓号转让、求购信息，尽在温州号码网！可查看手机靓号等交易信息！
	    		<span v-if="geturl.length>0">友情链接：
	    			<span class="purl-wrap" v-for="(item,index) in geturl" @click="gotourl(item.url)">{{item.name}}
	    			</span>
	    		</span>
	    	</p>
	    	<p>Copyright © 2018 浙ICP备18037328号-2 All Rights Reserved </p>
	    </el-footer>
	    <Fixedbar/>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar';
	import Header from '@/components/Header';
	import Fixedbar from '@/components/Pages/fixedbar';
	export default{
		name:"Index",
		components:{NavBar,Header,Fixedbar},
		computed:{
			percent(){
				return this.$store.getters.GetPercent
			},
			geturl(){
				return this.$store.getters.GetUrl
			}
		},
		data(){
			return{

			}
		},
		methods:{
			gotourl(url){
				window.open(url);
			}
		}
	}
</script>

<style lang="less">
	.PageLoading{
		position: fixed;
		top: 0;
	    left: 0;
	    right: 0;
	    transition: 0.3s;
	}
	.app-footer{
		width:100%;
		min-width:1280px;
		line-height: 24px;
	    padding: 10px 0;
	    text-align: center;
	    background: #eaeaea;
    	border-top: #dadada 1px solid;
    	margin-top:10px;
    	p{
    		margin:0;
    		padding:0;
    		font-size: 12px;
    		color:#000;
    	}
	}
	.purl-wrap{
		color:blue;
		cursor: pointer;
		margin-right:5px;
	}
</style>