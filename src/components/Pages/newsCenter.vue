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
					<el-row class="common-content-wrap" v-loading="isallnews">
						<ul class="news-con-ul">
					  		<li class="text-hide flex-common" v-for="(item,index) in newList">
					  			<div class="news-title" @click="viewnews(item.id)">
					  				<i class="el-icon-arrow-right"></i>{{item.title}}
					  			</div>
					  			<div class="tel-price">{{item.newstime | parsetime}}</div>
					  		</li>
					  	</ul>
						<el-row class="page-wrap">
							<el-pagination
						      @size-change="handleSizeChange"
						      @current-change="handleCurrentChange"
						      :current-page="query.page"
						      :page-sizes="[15, 30, 45, 60]"
						      :page-size="15"
						      layout="total, sizes, prev, pager, next, jumper"
						      :total="total">
						    </el-pagination>
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
				total:0,
				isallnews:false,
				newList:[],
				query:{
					page:1,
					pagecount:15,
				}
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			}
		},
		mounted(){
			this.getallnews();
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
		methods:{
			getallnews(){
				this.isallnews=true;
				this.$axios.post(this.$api.getallNews,this.$qs.stringify(this.query)).then(res=>{
					this.isallnews=false;
					this.newList=res.data.news;
					this.total=res.data.total;
				})
			},
			handleSizeChange(val){//每页容量切换
				this.query.pagecount=val;
				this.getallnews();
			},
			handleCurrentChange(val){//页码切换
				this.query.page=val;

			},
			viewnews(id){
				this.$router.push({path:"/newsCenter/"+id})
			},
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
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
			border-top:3px $bg solid;
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
	}
	.news-con-ul{
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
		    .news-title{
		    	cursor:pointer;
			    &:hover{
			    	color:#C00;
			    }
		    }
		    i{
		    	margin-right:5px;
		    }
	    }
	}
</style>