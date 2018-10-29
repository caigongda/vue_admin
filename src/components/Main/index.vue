<template>
	<div class="index-content-wrap">
		<div class="carousel-wrap">
			<el-carousel>
			    <el-carousel-item v-for="(item, index) in indexImg" :key="index" class="img-car">
			      <img :src="item.bannerimage">
			    </el-carousel-item>
			</el-carousel>
			<div class="index-login-wrap" v-if="!userinfo">
				<div class="login-title">会员登录</div>
				<el-form :model="loginform" status-icon :rules="loginrules" ref="loginForm" class="login-ruleForm">
					<el-form-item prop="username">
						<el-input
							type="text"
						    placeholder="用户名"
						    prefix-icon="icon icon-user"
						    v-model="loginform.username">
						</el-input>
				  	</el-form-item>
				  	<el-form-item prop="password">
				  		<el-input
							type="password"
						    placeholder="密码"
						    prefix-icon="icon icon-pass"
						    v-model="loginform.password">
						</el-input>
				  	</el-form-item>
					</el-form>
					<div class="regist-wrap">
						<el-button type="text" class="regist-text" @click="gotoregist">注册新用户</el-button>
						<el-button type="text" @click="forgetPass">忘记密码？</el-button>
					</div>
					<div class="btn-wrap">
					  <el-button size="medium" class="login-btn" :loading="islogin" @click="login('loginForm')">登录</el-button>
					  <el-button size="medium" class="reset-btn" @click="resetform('loginForm')">重填</el-button>
					</div>
			</div>
		</div>
		<el-container class="bottom-content-wrap">
			<el-row class="w100" :gutter="20">
				<el-col :span="6">
					<Pubtab/>
					<Specilnum/>
					<el-row class="card-common">
						<el-row class="card-header-common">友情链接</el-row>
						<el-row class="card-con-common">
					  	</el-row>
					</el-row>
				</el-col>
  				<el-col :span="18">
  					<el-row>
	  					<div class="hot-num-header">
	  						<div>热门推荐</div>
	  						<div class="content-more" @click="morenumber">更多&gt;&gt;</div>
	  					</div>
	  					<el-row class="hot-num-wrap" :gutter="12" v-loading="isnumber">
	  						<el-col :span="8" v-for="(item,index) in hotnumber" :key="index">
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
	  					</el-row>
  					</el-row>
  					<el-row class="new-num-wrap">
  						<div class="hot-num-header">
	  						<div>最新号码</div>
	  						<div class="content-more" @click="morenumber">更多&gt;&gt;</div>
	  					</div>
	  					<el-table
						    :data="newnumber"
						    border
						    v-loading="isnumber"
						    style="width: 100%;text-align:left;min-height:100px">
						    <el-table-column
						      label="号码">
						      <template slot-scope="scope">
						        <span style="width: 100%;display: inline-block;cursor:pointer;color:#F32613"
						       		@click="buyNumber(scope.row.id)">{{ scope.row.number }}
						       	</span>
						      </template>
						    </el-table-column>
						    <el-table-column
						      label="价格">
						       <template slot-scope="scope">
						        {{ scope.row.price }}
						      	</template>
						    </el-table-column>
						    <el-table-column
						      label="话费">
						       <template slot-scope="scope">
						        {{ scope.row.calls }}
						      	</template>
						    </el-table-column>
						    <el-table-column
						      label="保底">
						       <template slot-scope="scope">
						        {{ scope.row.dozen }}
						      	</template>
						    </el-table-column>
						    <el-table-column
						      label="年限">
						       <template slot-scope="scope">
						        {{ scope.row.term_id }}
						      	</template>
						    </el-table-column>
						    <el-table-column
						      label="地区">
						       <template slot-scope="scope">
						        {{ scope.row.area_id }}
						      	</template>
						    </el-table-column>
						  </el-table>
  					</el-row>
  				</el-col>
			</el-row>
		</el-container>
	</div>
</template>
<script>
import Pubtab from "@/components/pubcomponents/pubtab";
import Specilnum from "@/components/pubcomponents/specilnum";
	export default{
		components:{Pubtab,Specilnum},
		data(){
			return{
				loginform:{
					username:"",
					password:"",
				},
				loginrules:{
					username:[
					 	{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				hotnumber:[],
				newnumber: [],
		        indexImg:[],
		        islogin:false,
		        isnumber:false,
			}
		},
		created(){
			this.getBanner();
		},
		mounted(){
			console.log(this.getuserinfo());
			this.getnumber();
		},
		computed:{
			userinfo(){
				return this.getuserinfo();
			}
		},
		methods:{
			getBanner(){
				this.$axios.post(this.$api.getBanner).then(res=>{
					this.indexImg=res.data;
				})
			},
			resetform(forname){
				const set=this.$refs;
				set[forname].resetFields();
			},
			morenumber(){
				this.$router.push({path:"/numberSel"});
			},
			buyNumber(id){
				this.$router.push({path:"/goodsView/"+id});
			},
			login(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
          				this.islogin=true;
          				this.$axios.post(this.$api.login,this.$qs.stringify(this.loginform)).then(res=>{
							if (res.data.status==200) {
								this.islogin=false;
								window.localStorage.setItem("userinfo",JSON.stringify(res.data.userinfo));
								this.$message({
									type:"success",
									message:"登录成功"
								});
								window.location.reload();
							}else{
								this.islogin=false;
								this.$message({
									type:"warning",
									message:res.data.message
								})
							}
						})
          			}
          		})
			},
			getnumber(){
				this.isnumber=true;
				this.$axios.post(this.$api.numberkind).then(res=>{
					this.isnumber=false;
					this.hotnumber=res.data.hotnumber;
					this.newnumber=res.data.newnumber;
				})
			},
			gotoregist(){
				this.$router.push({path:"/register"})
			},
			forgetPass(){
				this.$router.push({path:"/forgetpass"})
			},
			fetchData(){
				this.isloaddata=true;
				this.$axios.get(this.$api.selAll,{params:Object.assign({ID:"1"},this.query)}).then(res=>{
					this.tableData=res.data.data;
					this.total=res.data.total;
					this.isloaddata=false;
				})
			},
			addData(){
				this.iscreate=0;
				this.$axios.post(this.$api.addOne,this.$qs.stringify(this.form)).then(res=>{
					if (res.data) {
						this.$message({
							type:"success",
							message:"添加成功！"
						});
							this.dialogFormVisible=false;
							this.fetchData();
					}else{
						this.$message({
							type:"warning",
							message:"网络错误！"
						})
					}
					this.resetform('mainform')
				})
			},
			delOne(id){
				this.$axios.post(this.$api.delOne,this.$qs.stringify({id:id})).then(res=>{
					if (res.data) {
						this.$message({
							type:"success",
							message:"删除成功！"
						});
						this.fetchData();
					}
				})
			},
			editOne(id){
				this.iscreate=1;
				this.curId=id;
				this.$axios.post(this.$api.editOne,this.$qs.stringify({id:this.curId})).then(res=>{
					this.form.name=res.data.name;
					this.form.content=res.data.content;
				}).then(()=>{
					this.dialogFormVisible=true;
				})
			},
			saveData(){
				this.$axios.post(this.$api.addOne,this.$qs.stringify({...{id:this.curId},...this.form})).then(res=>{
					if (res.data==true) {
						this.$message({
							type:"success",
							message:"修改成功！"
						});
					};
					this.dialogFormVisible=false;
					this.resetform('mainform');
					this.fetchData();
				})
			},
			pageChange(val){
				this.query.page=val;
				this.fetchData();
			}
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
$activebg:#D02629;
.index-content-wrap{
	width:100%;
	min-width:1280px;
	margin-top:10px;
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.carousel-wrap{
	position:relative;
}
.index-login-wrap{
	width: 248px;
    height: 255px;
    border: 1px solid #ddd;
    padding: 10px 15px;
    position:absolute;
    top:50%;
    left:calc(calc(100% - 1200px)/2);
    transform:translateY(-50%);
    background:#fff;
    z-index:2;
}
.login-title{
	width: 100%;
    font-size: 16px;
    font-weight: normal;
    margin-top: 10px;
    text-align:left;
}
.el-form-item{
	margin-top:15px;
	margin-bottom:0;
}
.regist-wrap{
	height:50px;
	width:100%;
	display:flex;
	align-items:center;
	justify-content:space-between;
	.regist-text{
		color:#000;
		&:hover{
			color:#C00;
		}
	}
}
.btn-wrap{
	height:30px;
	width:100%;
	display:flex;
	align-items:center;
	justify-content:space-between;
	.el-button{
		width: 110px;
		color:#fff;
	}
	.login-btn{
		background:$bg;
	}
	.reset-btn{
		background:#35aa47;
	}
}
.w100{
	width:100%;
}
.bottom-content-wrap{
	width:1200px;
	margin:0 auto;
	margin-top:10px;
}
.card-common{
	margin-top:10px;
	background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	.card-header-common{
		background: $bg;
	    line-height: 40px;
	    color: #fff;
	    font-size: 14px;    
	    text-align: left;
    	padding-left: 30px;
	}
    .card-con-common{
		padding:15px;
    }
}
.flex-common{
	display:flex;
	justify-content:space-between;
    font-size: 16px;
}
.tel-price{
	color: $bg;
}
.specil-num{
	min-height:290px;
}
.hot-num-header{
	display:flex;
	justify-content:space-between;
	line-height: 40px;
    background: $bg;
    padding:0 20px;
    font-size: 14px;
    color: #fff;
}
.content-more{
	cursor:pointer;
}
.hot-num-wrap{
	padding:10px 0;
	min-height:100px
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
.new-num-wrap{
	margin-top:10px;
}
.img-car{
	img{
		width:100%;
		height:100%;
	}
}
}
</style>