<template>
	<div class="numbercenter-con-wrap">
		<el-row class="w100" :gutter="20">
			<el-col :span="6">
				<Pubtab/>
				<Specilnum/>
			</el-col>
			<el-col :span="18">
				<el-row class="num-cen-wrap">
					<el-row class="num-cen-header">
						您的位置：首页 > {{curpath}}
					</el-row>
					<el-row class="common-content-wrap" v-loading="isviewnews">
						<el-row class="news-title">
							<h4>{{newsinfo.title}}</h4>
							<div>发布时间:<span class="new-time">{{newsinfo.newstime | parsetime}}</span></div>
						</el-row>
						<el-row class="news-detail" v-html="newsinfo.content">
							
						</el-row>
						<el-row class="page-wrap">
							<el-row>上一条：
								<span 
									v-if="prevnews" 
									@click="viewnews(prevnews.id)">
									{{prevnews.title}}
								</span>
								<span v-else>没有更多了</span>
							</el-row>
							<el-row>下一条：
								<span 
									v-if="nextnews" 
									@click="viewnews(nextnews.id)">
									{{nextnews.title}}
								</span>
								<span v-else>没有更多了</span>
							</el-row>
						</el-row>
					</el-row>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import Pubtab from "@/components/pubcomponents/pubtab";
	import Specilnum from "@/components/pubcomponents/specilnum";
	export default{
		components:{Pubtab,Specilnum},
		data(){
			return{
				isviewnews:false,
				newsinfo:{title:"",newstime:"",content:""},
				prevnews:null,
				nextnews:null,
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			}
		},
		created(){
				this.getNewsInfo(this.$route.params.id)
				//console.log(this.$route);
		},
		filters:{
			parsetime(time){
				if (time.indexOf("-")<0) {
					function change(t) {
					    if (t < 10) {
					        return "0" + t;
					    } else {
					        return t;
					    }
					};
					let date,Y,M,D,h,m,s;
					if (time.toString().length==10) {
						date = new Date(time*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					}else{
						date = new Date(time);
					}
				    Y = date.getFullYear() + '-';
				    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				    D = change(date.getDate()) + ' ';
				    h = change(date.getHours()) + ':';
				    m = change(date.getMinutes()) + ':';
				    s = change(date.getSeconds());
				    return Y + M + D + h + m + s;
			    }else{
			    	return time;
			    }
			},
		},
		watch: {
	    	'$route': 'getNewsInfo'
	    },
		methods:{
			getNewsInfo(){
				let id=this.$route.params.id;
				this.isviewnews=true;
				this.$axios.post(this.$api.viewNews,this.$qs.stringify({id:id})).then(res=>{
					this.isviewnews=false;
					this.newsinfo=res.data.curnews;
					this.prevnews=res.data.prevnews;
					this.nextnews=res.data.nextnews;
					console.log(res);
				})
			},
			viewnews(id){
				this.$router.push({path:"/newsCenter/"+id})
			}
		}
	}
</script>
<style lang="scss">
	.numbercenter-con-wrap{
		width:1200px;
		margin:0 auto;
		margin-top:10px;
	}
	.w100{
		width:100%;
	}
	.num-cen-wrap{
		border:1px solid #e5e5e5;
		.num-cen-header{
			border-top:3px #f9a021 solid;
			line-height: 40px;
		    background: #f6f6f6;
		    font-size: 14px;
		    padding-left: 20px;
		    text-align:left;
		}
	}
	.common-content-wrap{
		padding:20px;
		li{
			font-size:12px;
		}
	}
	.page-wrap{
		margin-top:20px;
		text-align:left;
		cursor: pointer;
		font-size: 12px;
    	color: #000;
    	.el-row{
    		margin-bottom:5px;
    	}
	}
	.news-title{
		padding-bottom:10px;
		border-bottom:1px solid #ddd;
		h4{
			padding:0;
			margin:0;
		}
		div{
			font-size:14px;
			color:#000;
			padding:10px 0 0 0;
		}
		.new-time{
			color:#666666;
		}
	}
	.news-detail{
		margin-top:10px;
	}
</style>