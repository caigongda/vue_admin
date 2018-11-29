<template>
<el-row>
	<el-tabs type="border-card" stretch>
	  <el-tab-pane label="新闻资讯">
	  	<ul class="tab-con-ul">
	  		<li class="text-hide"
				v-for="(item,index) in rightNews"
				:key="index"
	  			@click="newsView(item.id)">
	  			<i class="el-icon-arrow-right"></i>{{item.title}}
	  		</li>
	  	</ul>
	  </el-tab-pane>
	  <el-tab-pane label="网站公告">
	  	<ul class="tab-con-ul" v-loading="isnews">
	  		<li class="text-hide"
				v-for="(item,index) in leftNews"
				:key="index"
	  			@click="newsView(item.id)">
	  			<i class="el-icon-arrow-right"></i>{{item.title}}
	  		</li>
	  	</ul>
	  </el-tab-pane>
	</el-tabs>
</el-row>
</template>
<script>
	export default{
		data(){
			return{
				isnews:false,
				leftNews:[],
				rightNews:[]
			}
		},
		mounted(){
			this.getNews();
		},
		methods:{
			newsView(id){
				this.$router.push({path:"/newsCenter/"+id})
			},
			getNews(){
				this.isnews=true;
				this.$axios.post(this.$api.getNews).then(res=>{
					this.isnews=false;
					this.leftNews=res.data.newsleftnumber;
					this.rightNews=res.data.newsrightnumber;
				})
			}
		}
	}
</script>
<style lang="scss">
	.tab-con-ul{
		list-style:none;
		margin:0;
		padding:0;
		font-size: 12px;
	    color: #000;
	    min-height:100px;
	    li{
	    	width:calc(100% - 20px);
	    	text-align:left;
	    	line-height: 40px;
		    border-bottom: #ddd 1px dashed;
		    cursor:pointer;
		    &:hover{
		    	color:#C00;
		    }
		    i{
		    	margin-right:5px;
		    }
	    }
	}
</style>