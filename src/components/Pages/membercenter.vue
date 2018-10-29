<template>
	<div class="numbercenter-con-wrap">
		<el-row class="w100" :gutter="20">
			<el-col :span="6">
				<ul class="member-left">
					<li class="member-title">会员中心</li>
					<li @click="editinfo(1)">修改资料</li>
					<li @click="mypost(2)">我的订单</li>
					<li @click="loginout">退出登录</li>
				</ul>
			</el-col>
			<el-col :span="18">
				<el-row class="num-cen-wrap">
					<el-row class="num-cen-header">
						您的位置：首页 > {{curaction}}
					</el-row>
					<el-row class="common-content-wrap" v-loading="isallnews" v-if="curindex==1">
						<ul class="user-info-wrap">
							<li><span>用户名称：</span><span>{{userinfo.nickname}}</span></li>
							<li><span>真实姓名：</span><span>
								<input type="text" name="" v-model="username" /></span></li>
							<li><span>用户密码：</span><span>
								<input type="password" name="" v-model="password" /></span></li>
							<li><span>重复用户密码：</span><span>
								<input type="password" name="" v-model="repass" /></span></li>
							<li><span>密码保护问题：</span><span>{{userinfo.problem}}</span></li>
							<li><span>密码保护答案：</span><span>已隐藏(不可修改)</span></li>
							<li><span>手机号码：</span><span>
								<input type="text" name="" v-model="mobile" /></span></li>
							<li><span>注册时间：</span><span>{{userinfo.createtime}}</span></li>
							<li><span>最后登录时间：</span><span>{{userinfo.logintime}}</span></li>
							<li><span>最后登录IP：</span><span>{{userinfo.loginip}}</span></li>
							<li><span>验证码：</span><span>
								<input v-model="usercode"></input>
								<span class="num-code unselectable" @click="createCode">{{code}}</span>
								<span @click="createCode">看不清楚？</span></span></li>
							<li><span></span><span><el-button type="primary" :loading="isedit" @click="editmember">修改会员资料</el-button></span></li>
						</ul>
					</el-row>
					<el-row v-if="curindex==2" class="post-wrap" v-loading="isorder">
						<el-row v-if="orderlist.length!=0" v-for="(item,index) in orderlist" :key="index">
							<h3 class="post-header">
							<span style="color:#F32613">{{item.number}}</span> 订购时间：
							<span>{{item.createtime}}</span>
							</h3>
							<div class="post-info">
								<p>联 系 人：{{item.name}}</p>
								<p>联系地址：{{item.address}}</p>
								<p>联系电话：{{item.contact}}</p>
								<p>QQ/微信：{{item.qq}}</p>
							</div>
						</el-row>
						<el-row v-else>
							<p>暂无数据</p>
						</el-row>
						<el-row class="post-footer">
							共<span style="color:#F32613">1</span>条记录
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
				code:"",
				isallnews:false,
				newList:[],
				query:{
					page:1,
					pagecount:15,
				},
				curaction:"会员中心",
				username:this.getuserinfo().username,
				password:"",
				repass:"",
				mobile:this.getuserinfo().mobile,
				usercode:"",
				isedit:false,
				curindex:1,
				orderlist:[],
				isorder:false,
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			},
			userinfo(){
				return this.getuserinfo();
			}
		},
		mounted(){
			this.createCode();
			console.log(this.userinfo)
			//this.getallnews();
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
			editinfo(index){
				this.curaction='修改资料';
				this.curindex=index;
			},
			mypost(index){
				this.curaction='我的订单';
				this.curindex=index;
				this.isorder=true;
				this.$axios.post(this.$api.getOrders,this.$qs.stringify({id:this.userinfo.id})).then(res=>{
					this.isorder=false;
					this.orderlist=res.data;
				})
			},
			checkinfo(){
				if (this.password!=this.repass) {
					this.$message({
			          message: '两次输入密码不一致',
			          type: 'warning'
			        });
			        return false;
				}else if (this.usercode.toUpperCase()!=this.code.toUpperCase()) {
					this.$message({
			          message: '验证码输入有误',
			          type: 'warning'
			        });
			        return false;
				}else if (this.username=="") {
					this.$message({
			          message: '真实姓名不能为空',
			          type: 'warning'
			        });
			        return false;
				}else{
					return true;
				}
			},
			editmember(){
				let info={
					username:this.username,
					password:this.password,
					mobile:this.mobile,
					id:this.userinfo.id
				};
				if (this.checkinfo()) {
					this.isedit=true;
					this.$axios.post(this.$api.freshMember,this.$qs.stringify(info)).then(res=>{
						this.isedit=false;
						this.usercode="";
						if (res.data.status) {
							this.$message({
					          message: '修改成功！',
					          type: 'success'
					        });
					        window.localStorage.clear();
					        window.localStorage.setItem("userinfo",JSON.stringify(res.data.userinfo));
						}
					})
				}
			},
			getallnews(){
				this.isallnews=true;
				this.$axios.post(this.$api.getallNews,this.$qs.stringify(this.query)).then(res=>{
					this.isallnews=false;
					this.newList=res.data.news;
					this.total=res.data.total;
				})
			},
			createCode(){
		        let code = '';
		        let codeLength = 4;
		        let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
		        for(let i = 0; i < codeLength; i++){
		             let index = Math.floor(Math.random()*36);
		             code += random[index]; 
		        }
		        this.code = code;
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
			loginout(){
				window.localStorage.clear();
				this.$router.push({path:"/index"})
			}
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
	.member-left{
		list-style:none;
		padding:0;
		margin:0;
		text-align:left;
		.member-title{
			background:$bg;
			color:#fff;
		}
		li{
			padding:10px 20px;
			color:#000;
			background:#ddd;
			cursor:pointer;
			&:not(.member-title):hover{
				background:#666666;
				color:#fff;
			}
		}
	}
	.user-info-wrap{
		list-style:none;
		padding:0;
		margin:0;
		text-align:left;
		font-size:16px;
		padding:25px;
		li{
			padding:10px 0;
			border-top:1px solid #ddd;
		}
		li>span:first-child{
			display:inline-block;
			width:30%;
		}
		input{
			height:20px;
		}
	}
	.num-code{
		display:inline-block;
		cursor:pointer;
		width:70px;
		height:30px;
		letter-spacing:6px;
		font-family:Arial;
		margin-right:10px;
		text-align:center;
		line-height:30px;
		 font-style:italic;
		 color:blue;
		 background:#ddd;
		 &:hover{
		 	background:#ddd;
		 	color:blue;
		 }
	}
	.post-wrap{
		padding:10px 40px;
		text-align:left;
	}
	.post-header{
		border-top:1px solid #ddd;
		border-bottom:1px solid #ddd;
		padding:10px 0;
	}
	.post-footer{
		margin-top:20px;
		border-top:1px solid #ddd;
		padding:10px 0;
	}
	.post-info p{
		margin:10px 0;
	}
</style>