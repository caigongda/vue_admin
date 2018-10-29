<template>
	<div class="numbersel-con-wrap">
		<el-row class="w100" :gutter="20">
			<el-col :span="6">
				<Pubtab/>
				<Specilnum/>
			</el-col>
			<el-col :span="18">
				<el-row class="num-sel-wrap">
					<el-row class="num-sel-header">
						您的位置：首页 > {{curpath}}
					</el-row>
				</el-row>
				<el-row class="w100 search-number-wrap">
					<el-row :gutter="12" v-loading="isresult">
						<el-col 
							:span="8"
							v-for="(item,index) in searchresult"
							:key="index">
						    <el-card shadow="hover" class="card-num-wrap">
						    	<div>
						      		<h3 class="num-main">{{item.number}}</h3>
						      		<h3 class="price-main">¥{{item.price}}</h3>
						        </div>
						        <div>
						      		<el-button class="buy-button" @click="buyNumber(item.id)">购买</el-button>
						        </div>
						    </el-card>
						</el-col>
						<el-col :span="8" v-if="total==0">
							<el-card shadow="hover" class="card-num-wrap nodata-wrap">
							暂无数据
							</el-card>
						</el-col>
					</el-row>
					<el-row class="page-wrap" v-if="total!=0">
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
				number:"",
				total:0,
				query:{
					number:"",
					page:1,
					pagecount:15,
				},
				isresult:false,
				searchresult:[],
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			}
		},
		created(){
			this.getsearch();
		},
		watch: {
	    	'$route': 'getsearch'
	    },
		methods:{
			getsearch(){
				this.query.number=this.$route.params.number;
				this.isresult=true;
				this.$axios.post(this.$api.searchnumber,this.$qs.stringify(this.query)).then(res=>{
					this.isresult=false;
					this.searchresult=res.data;
					this.total=res.data.length;
				})
			},
			handleSizeChange(val){//每页容量切换
				this.query.pagecount=val;
				this.getsearch();
			},
			handleCurrentChange(val){//页面切换
				this.query.page=val;
				this.getsearch();
			},
			buyNumber(id){
				this.$router.push({path:"/goodsView/"+id});
			}
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
$activebg:#D02629;
.numbersel-con-wrap{
	width:1200px;
	margin:0 auto;
	margin-top:10px;
}
.w100{
	width:100%;
}
.num-sel-wrap{
	border:1px solid #e5e5e5;
	.num-sel-header{
		border-top:3px $bg solid;
		line-height: 40px;
	    background: #f6f6f6;
	    font-size: 14px;
	    padding-left: 20px;
	    text-align:left;
	}
	.num-search-condition{
		padding:20px;
	}
	.search-common{
		display:flex;
		align-items:center;
		padding:5px 0;
		border-bottom:#eee 1px dashed;
		ul{
			display:flex;
			flex:1;
			list-style:none;
			padding:0;
			margin:0;
			font-size:12px;
			flex-wrap:wrap;
		}
		.search-name{
			width: 90px;
		    text-align: right;
		    color: #666;
		    font-size:12px;
		    align-self: start;
		    padding:4px 0;
		}
		li{
			padding:4px 10px;
			cursor:pointer;
			box-sizing:border-box;
			margin-left:5px;
			display:flex;
			align-items:center;
			justify-content:center;
			margin-bottom:10px;
			&:hover{
				background:$bg;
				color:#fff;
			}
		}
		.search-seled{
			background:$bg;
			color:#fff;
		}
		.el-input{
			width:50%;
			border:1px solid $bg;
			.el-input__inner{
				border:1px solid $bg;
				border-top-left-radius: 0;
    			border-bottom-left-radius: 0;
			}
			.el-button{
				background:$bg;
				border:1px solid $bg;
				border-radius: 0;
				color:#fff;
				margin: -10px -21px;
			}
		}
	}
}
.search-number-wrap{
	padding: 20px;
	border: #e5e5e5 1px solid;
	border-top:none;
}
.card-num-wrap{
	padding: 10px;
	margin-bottom:10px;
	.el-card__body{
		padding:0;
		text-align:left;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.num-main{
		color: #007CC3;
		font-size: 18px;
		padding:2px 0;
		margin:0;
	}
	.price-main{
		color: $bg;
		font-size: 18px;
		padding:2px 0;
		margin:0;
	}
	.buy-button{
		padding: 7px 30px;
		border-radius: 3px;
	    color: #fff;
	    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
	    background-color: $bg;
	    background-image: linear-gradient(to bottom,$bg,$activebg);
	    background-repeat: repeat-x;
	    border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
	    &:hover{
	    	color:#fff;
	    }
	}
}
.page-wrap{
	margin-top:20px;
}
.nodata-wrap{
	padding:10px;
}
</style>