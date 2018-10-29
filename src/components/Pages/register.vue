<template>
	<div class="login-wrap">
		<div class="login-wrap-left">
			<div class="login-header">
				<div>用户注册</div>
				<div>已有帐号？<span class="toregist" @click="gotologin">去登录</span></div>
			</div>
			<div class="login-main">
				<el-form 
					:model="registerForm"
					label-position="left"
					status-icon 
					:rules="registerrules"
					label-width="220px"
					ref="register" 
					class="register-ruleForm">
				  <el-form-item label="用户名称：" prop="username" class="username-wrap">
				    <el-input v-model="registerForm.username" placeholder="用户名称"></el-input>(0-9,a-z,A-Z,-_任意组合的4-16个字符)
				  </el-form-item>
				  <el-form-item label="真实姓名：" prop="realname" class="w220">
				    <el-input v-model="registerForm.realname" placeholder="真实姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="用户密码：" prop="userpass" class="w220">
				    <el-input type="password" v-model="registerForm.userpass" placeholder="用户密码"></el-input>
				  </el-form-item>
				  <el-form-item label="重复用户密码：" prop="repass" class="w220">
				    <el-input type="password" v-model="registerForm.repass" placeholder="重复用户密码"></el-input>
				  </el-form-item>
				  <el-form-item label="密码保护问题：" prop="passquestion" class="w350">
				    <el-input v-model="registerForm.passquestion" placeholder="密码保护问题"></el-input>
				  </el-form-item>
				  <el-form-item label="密码保护答案：" prop="passanswer" class="w350">
				    <el-input v-model="registerForm.passanswer" placeholder="密码保护答案"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号码：" prop="userphone" class="w220">
				    <el-input v-model="registerForm.userphone" placeholder="手机号码"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码：" prop="code" class="w150">
				   	<el-popover
					    ref="popover"
					    placement="right"
					    trigger="focus">
					    <div class="unselectable code-wrap" @click="createCode">
					    	<span class="num-code" @click="createCode">{{code}}</span>
					    	<span @click="createCode">看不清楚？</span>
					    </div>
					</el-popover>
				    <el-input v-popover:popover v-model="registerForm.code"></el-input>
				  </el-form-item>
				  <el-form-item class="register-btn-wrap">
				    <el-button type="primary" :loading="isregister" @click="onSubmit('register')">立即注册会员，获取最新资讯</el-button>
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
			var checkname = (rule, value, callback) => {
				var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
		        if (!uPattern.test(value)) {
		          callback(new Error('用户名不符合规则哦！'));
		        } else {
				this.$axios.post(this.$api.isrepeatname,this.$qs.stringify({nickname:value})).then(res=>{
					console.log(res);
					if (res.data.status==200) {
						callback(new Error('用户名已存在！'));
					}else{
						callback();
					}
				});
		        }
		     };
		     var checkPass = (rule, value, callback) => {
		        if (value !== this.registerForm.userpass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
		      var checkPhone = (rule, value, callback) => {
		      	var uPattern = /^1(3|4|5|7|8)\d{9}$/;
		        if (!uPattern.test(value)) {
		          callback(new Error('请输入正确的手机号!'));
		        } else {
		          callback();
		        }
		      };
		      var validateCode = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入验证码'));
		        } else if(value.toUpperCase()!=this.code.toUpperCase()){
		          callback(new Error('验证码输入有误'));
		        }else{
		          callback();
		        }
		      };
			return{
				code:"",
				isregister:false,
				registerForm:{
					username:"",
					realname:"",
					userpass:"",
					repass:"",
					passquestion:"",
					passanswer:"",
					userphone:"",
					code:"",
					email:"",
				},
				registerrules:{
					username:[
						{ required: true, message: '此项不能为空'},
						{ validator: checkname, trigger: 'blur' }
		          	],
					realname:[
						{ required: true, message: '此项不能为空'}
					],
					userpass:[
						{ required: true, message: '此项不能为空'}
		          	],
					repass:[
						{ required: true, message: '此项不能为空'},
						{ validator: checkPass, trigger: 'blur' }
					],
					passquestion:[
						{ required: true, message: '此项不能为空'}
		          	],
					passanswer:[
						{ required: true, message: '此项不能为空'}
					],
					userphone:[
						{ required: true, message: '此项不能为空'},
						{ validator: checkPhone, trigger: 'blur' }
		          	],
		          	code:[
						{ required: true, message: '此项不能为空'},
						{ validator: validateCode, trigger: 'blur' }
		          	]
				},
			}
		},
		mounted(){
			this.createCode();
		},
		methods:{
			gotologin(){
				this.$router.push({path:"/login"})
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
          				let params={
          					nickname:this.registerForm.username,
          					username:this.registerForm.realname,
          					password:this.registerForm.userpass,
          					email:this.registerForm.email,
          					mobile:this.registerForm.userphone,
          					problem:this.registerForm.passquestion,
          					answer:this.registerForm.passanswer,
          				};
          				this.isregister=true;
          				this.$axios.post(this.$api.addMember,this.$qs.stringify(params)).then(res=>{
          					this.isregister=false;
          					if (res.data) {
          						this.$message({
						          message: '注册成功',
						          type: 'success'
						        });
          					}
          				})
          			}else {
			           /* this.$message({
				          message: '恭喜你，这是一条成功消息',
				          type: 'success'
				        });*/
			            return false;
			        }
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
			resetForm(formName){
				this.$refs[formName].resetFields();
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
				margin-top:30px
			}
		}
		.login-wrap-right{
			width:360px;
		}
		.register-ruleForm{
			width:100%;
			.el-form-item{
				padding-top:22px;
				border-top:1px solid #ddd;
			}
			.username-wrap{
				text-align:left;
				.el-input{
					width:220px;
					margin-right:15px
				}
			}
			.w220{
				.el-form-item__content{
					width:220px;
				}
			}
			.w350{
				.el-form-item__content{
					width:350px;
				}
			}
			.w150{
				.el-form-item__content{
					width:150px;
				}
			}
			.register-btn-wrap{
				text-align:left;
				.el-button{
					background-color: #F32613;
    				border-color: #F32613;
				}
			}
		}
	}
	.code-wrap{
		display:flex;
		align-items:center;
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
</style>