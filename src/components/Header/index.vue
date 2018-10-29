<template>
	  <el-header height="125px" class="app-header-wrap">
	  	<el-container class="header-top">
	  		<div class="w1200">
	  			<span><i class="el-icon-star-off"></i>您好，欢迎来到温州号码网！</span>
	  			<span>
	  				<span v-if="userinfo">您好：
	  					<span style="color:#F32613">{{userinfo.nickname}}</span>
	  					<span @click="membercenter">会员中心</span>
	  				</span>
	  				<span class="member-login" v-if="!userinfo" @click="gotologin">[会员登录]</span>
	  				<span class="member-regist" v-if="!userinfo" @click="gotoregist">|[免费注册]|</span>
	  				<span class="loginout" v-else @click="loginout">退出登录</span>
	  				<span class="contactus" @click="contactus">联系我们</span>
	  			</span>
	  		</div>
	  	</el-container>
	  	<el-container class="header-logo-wrap">
	  		<div class="w1200">
	  			<div class="logo-img">
	  				<img src="https://job.10086.cn/images/logo.jpg">
	  			</div>
	  			<div>
	  				<el-input placeholder="输入你想要的号码" v-model="number">
					    <el-button slot="append" @click="searchnum">搜索</el-button>
					</el-input>
	  			</div>
	  		</div>
	  	</el-container>
	  </el-header>
</template>
<script>
	export default{
		data(){
			return{
				number:""
			}
		},
		computed:{
			userinfo(){
				return this.getuserinfo();
			}
		},
		methods:{
			contactus(){
				this.$router.push({path:"/contact"})
			},
			gotologin(){
				this.$router.push({path:"/login"})
			},
			gotoregist(){
				this.$router.push({path:"/register"})
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
			loginout(){
				window.localStorage.clear();
				window.location.reload();
			},
			membercenter(){
				this.$router.push({path:"/membercenter"})
			}
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
.app-header-wrap{
	width:100%;
	min-width:1280px;
	.header-top{
		height:30px;
		background:#f5f5f5
	}
	.header-logo-wrap{
		height:calc(100% - 30px)
	}
	.w1200{
		width:1200px;
		margin:0 auto;
		display:flex;
		align-items:center;
		justify-content:space-between;
		font-size:14px;
	}
	.el-icon-star-off{
		color:#F8B600;
	}
	.contactus,.member-login,.member-regist{
		cursor:pointer;
		margin-right:5px;
	}
	.member-login{
		color:$bg;
	}
	.logo-img{
		width: 220px;
    	height: 70px;
    	background:#ddd;
    	img{
    		width:100%;
    		height:100%;
    	}
	}
	.el-input{
		width: 300px;
		border:1px solid $bg;
		.el-input__inner{
			border:1px solid $bg;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.el-button{
			background:$bg !important;
			border:1px solid $bg !important;
			border-radius: 0;
			color:#fff !important;
			margin: -10px -21px;
		}
	}
	.loginout{
		cursor:pointer;
		color:blue;
	}
}
</style>