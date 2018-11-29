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
					<el-row class="num-search-condition">
						<el-row class="search-common" v-loading="istype">
							<span class="search-name">号码：</span>
							<ul>
								<li :class="{searchSeled:curthree==''}"
								 @click="curthree='';query.three_id='';getresult();">全部</li>
								<li 
									v-for="(item,index) in numberthree" 
									:key="index"
									:class="{searchSeled:curthree==item.id}"
									@click="selthree(item.id)">
									{{item.name}}
								</li>
							</ul>
						</el-row>
						<el-row class="search-common" v-loading="istype">
							<span class="search-name">运营商：</span>
							<ul>
								<li :class="{searchSeled:curoperator==''}"
								 @click="curoperator='';query.operator_id='';getresult();">全部</li>
								<li
									v-for="(item,index) in operatorarr" 
									:key="index"
									:class="{searchSeled:curoperator==item.id}"
									@click="seloperator(item.id)">
									{{item.name}}
								</li>
							</ul>
						</el-row>
						<el-row class="search-common" v-loading="istype">
							<span class="search-name">号码类型：</span>
							<ul>
								<li :class="{searchSeled:curtype==''}"
								 @click="curtype='';query.phonetype_id='';getresult();">全部</li>
								<li
									v-for="(item,index) in numbertype" 
									:key="index"
									:class="{searchSeled:curtype==item.id}"
									@click="seltype(item.id)">
									{{item.name}}
								</li>
							</ul>
						</el-row>
						<el-row class="search-common">
							<span class="search-name">价格范围：</span>
							<ul>
								<li :class="{searchSeled:currange==''}"
								 @click="currange='';query.price='';getresult();">全部</li>
								<li 
									v-for="(item,index) in pricerange" 
									:key="index"
									:class="{searchSeled:currange==item.id}"
									@click="selrange(item.id)">
									{{item.name}}
								</li>
							</ul>
						</el-row>
						<el-row class="search-common">
							<span class="search-name" style="align-self:center;">搜索号码：</span>
							<el-input placeholder="输入你想要的号码" v-model.trim="number" maxlength="11">
							    <el-button slot="append" @click="searchnum">搜索</el-button>
							</el-input>
						</el-row>
					</el-row>
				</el-row>
				<el-row class="w100 search-result-wrap" v-loading="isresult">
					<el-row :gutter="12">
						<el-col 
							:span="8"
							v-for="(item,index) in selresult"
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
				numberthree:[],
				numbertype:[],
				operatorarr:[],
				pricerange:[
					{id:"0,100",name:"100元以下"},
					{id:"100,500",name:"100-500元"},
					{id:"500,1000",name:"500-1000元"},
					{id:"1000,2000",name:"1000-2000元"},
					{id:"2000,5000",name:"2000-5000元"},
					{id:"5000,10000",name:"5000-10000元"},
					{id:"10000,999999999",name:"10000元以上"},
				],
				query:{
					three_id:"",
					phonetype_id:"",
					operator_id:"",
					price:"",
					page:1,
					pagecount:15,
				},
				isresult:false,
				istype:false,
				selresult:[],
				curthree:"",
				curtype:"",
				currange:"",
				curoperator:"",
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			}
		},
		mounted(){
			this.getType();
			this.getresult();
		},
		methods:{
			getType(){
				this.istype=true;
				this.$axios.post(this.$api.getType).then(res=>{
					this.istype=false;
					this.numberthree=res.data.threearr;
					this.numbertype=res.data.phonetypearr;
					this.operatorarr=res.data.operatorarr;
				})
			},
			getresult(){
				this.isresult=true;
				this.$axios.post(this.$api.selnumber,this.$qs.stringify(this.query)).then(res=>{
					this.isresult=false;
					this.selresult=res.data.info;
					this.total=res.data.count;
				})
			},
			handleSizeChange(val){//每页容量切换
				this.query.pagecount=val;
				this.getresult();
			},
			handleCurrentChange(val){//页面切换
				this.query.page=val;
				this.getresult();
			},
			selthree(id){
				this.query.page=1;
				this.query.pagecount=15;
				this.query.three_id=id;
				this.curthree=id;
				this.getresult();
			},
			seltype(id){
				this.query.page=1;
				this.query.pagecount=15;
				this.query.phonetype_id=id;
				this.curtype=id;
				this.getresult();
			},
			selrange(id){
				this.query.page=1;
				this.query.pagecount=15;
				this.query.price=id;
				this.currange=id;
				this.getresult();
			},
			seloperator(id){
				this.query.page=1;
				this.query.pagecount=15;
				this.query.operator_id=id;
				this.curoperator=id;
				this.getresult();
			},
			isNumber(){
				let phoneReg = /^[0-9]+$/;
				let phone = this.number;
				if (phoneReg.test(phone)) {
					return true;
				}else{
					return false;
				}
			},
			searchnum(){
				if (this.number==""||!this.isNumber()) {
					this.$message({
			          message: '请输入数字！',
			          type: 'warning'
			        });
				}else{
					this.$router.push({path:"/searchnumber/"+this.number})
				}
			},
			buyNumber(id){
				this.$router.push({path:"/goodsView/"+id});
			},
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
		.searchSeled{
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
.search-result-wrap{
	padding: 20px;
	border: #e5e5e5 1px solid;
    border-top: 3px $bg solid;
    margin-top: 20px;
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
	padding:20px;
}
</style>