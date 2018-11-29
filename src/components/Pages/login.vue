<template>
	<div class="login-wrap">
		<div class="login-wrap-left">
			<div class="login-header">
				<div>用户登录</div>
				<div>还没帐号？<span class="toregist" @click="gotoregist">去注册</span></div>
			</div>
			<div class="login-main">
				<el-form :model="loginForm" status-icon :rules="loginrules" ref="ruleForm2" class="demo-ruleForm">
				  <el-form-item prop="username">
					  <el-input
					    placeholder="用户名"
					    type="text"
					    v-model="loginForm.username">
					    <i slot="prefix" class="icon icon-user"></i>
					  </el-input>
				  </el-form-item>
				  <el-form-item prop="password">
				  	  <el-input
					    placeholder="密码"
					    type="password"
					    v-model="loginForm.password">
					    <i slot="prefix" class="icon icon-pass"></i>
					  </el-input>
				  </el-form-item>
				  <div class="forgetPass"><span @click="forgetpass">忘记密码？</span></div>
				  <el-form-item>
				    <el-button class="loginbtn" size="medium" :loading="islogin" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
				    <el-button size="medium" type="success" @click="resetForm('ruleForm2')">重填</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
		<div class="login-wrap-right">
			<img src="@/assets/pic.jpg"/>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				islogin:false,
				loginForm:{
					username:"",
					password:""
				},
				loginrules:{
					username:[
						{ required: true, message: '用户名不能为空'}
		          	],
					password:[
						{ required: true, message: '密码不能为空'}
					]
				},
			}
		},
		methods:{
			gotoregist(){
				this.$router.push({path:"/register"})
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {          				this.islogin=true;

          				this.$axios.post(this.$api.login,this.$qs.stringify(this.loginForm)).then(res=>{
							if (res.data.status==200) {
								this.islogin=false;
								window.localStorage.setItem("userinfo",JSON.stringify(res.data.userinfo));
								this.$message({
									type:"success",
									message:"登录成功"
								});
								this.resetForm('ruleForm2');
								window.location.reload();
								this.$router.push({path:"/index"});
							}else{
								this.islogin=false;
								this.$message({
									type:"warning",
									message:res.data.message
								})
							}
						})
          			}else {
			            /*this.$message({
				          message: '恭喜你，这是一条成功消息',
				          type: 'success'
				        });*/
			            return false;
			        }
          		})
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
			},
			forgetpass(){
				this.$router.push({path:"/forgetpass"});
			}
		}
	}
</script>
<style lang="scss">
	.login-wrap{
		width:1200px;
		margin:0 auto;
		border:1px solid #ddd;
		padding:25px;
		box-sizing:border-box;
		margin-top:10px;
		display:flex;
		.login-wrap-left{
			width:780px;
			.login-header{
				display:flex;
				justify-content:space-between;
				border-bottom: #ddd 1px solid;
    			line-height: 50px;
    			font-size: 16px;
    			.toregist{
    				cursor:pointer;
    				color: #ff8400;
    				font-size: 14px;
    			}
			}
			.login-main{
				display:flex;
				justify-content:center;
			}
		}
		.login-wrap-right{
			width:360px;
		}
		.demo-ruleForm{
			width:300px;
			margin:60px 0 30px 0;
			.loginbtn{
				background-color: #F32613;
    			border-color: #F32613;
			}
			.forgetPass{
				width:100%;
				text-align:right;
				color:#0088cc;
				margin-bottom:22px;
				font-size: 12px;
				span{
					cursor:pointer;
				}
			}
			.el-button--medium{
				padding:10px 40px;
			}
			.el-form-item__content{
				display: flex;
    			justify-content: space-between;
    			&:before{
					display:none;
    			}
    			&:after{
					display:none;
    			}
			}
		}
	}
</style>