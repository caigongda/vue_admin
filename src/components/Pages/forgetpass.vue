<template>
	<div class="forget-wrap">
		<div class="forget-wrap-left">
			<div class="forget-header">
				<div>用户登录</div>
				<div>还没帐号？<span class="toregist" @click="gotoregist">去注册</span></div>
			</div>
			<div class="forget-main">
				<el-steps :active="curstep" finish-status="success" simple style="margin-top: 20px">
				  <el-step title="步骤 1" ></el-step>
				  <el-step title="步骤 2" ></el-step>
				  <el-step title="步骤 3" ></el-step>
				</el-steps>
				<el-form 
					:model="forgetform" 
					:rules="forgetrules"
					label-position="left"
					ref="forgetform" 
					label-width="220px" 
					v-show="curstep==1"
					class="forgetform-wrap">
				  <el-form-item
				    label="会员名"
				    prop="username"
				  >
				    <el-input type="text" v-model="forgetform.username" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
						<el-button style="margin-top: 12px;" @click="stepone('forgetform')">下一步</el-button>
				  </el-form-item>
				</el-form>
				<div class="step-wrap step-two" v-show="curstep==2">
					<div class="forget-question">
						<label>密码保护问题：</label>{{question}}</div>
					<div class="forget-answer">
						<label>密码保护答案：</label>
						<el-input type="text" v-model="answer" autocomplete="off"></el-input>
					</div>
					<div class="btn-wrap">
						<el-button style="margin-top: 12px;" @click="steptwo">下一步</el-button>
					</div>
				</div>
				<div class="step-wrap step-two" v-show="curstep==3">
					<div class="forget-question">
						<label>新密码：</label>
						<el-input type="text" v-model="newpass" autocomplete="off"></el-input>
					</div>
					<div class="forget-answer">
						<label>确认密码：</label>
						<el-input type="text" v-model="renewpass" autocomplete="off"></el-input>
					</div>
					<div class="btn-wrap">
						<el-button style="margin-top: 12px;" @click="surepass">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="forget-wrap-right">
			<img src="@/assets/pic.jpg"/>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				curstep:1,
				forgetform:{
					username:"",
					password:""
				},
				forgetrules:{
					username:[
						{ required: true, message: '用户名不能为空'}
		          	],
					password:[
						{ required: true, message: '密码不能为空'}
					]
				},
				question:"密保问题",
				answer:"",
				newpass:"",
				renewpass:"",
			}
		},
		methods:{
			gotoregist(){
				this.$router.push({path:"/register"})
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
			},
			stepone(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
          				this.curstep=2;
          			}else {
			            this.$message({
				          message: '恭喜你，这是一条成功消息',
				          type: 'success'
				        });
			            return false;
			        }
          		})
			},
			steptwo(){
				if (this.answer=="") {
					this.$message({
			          message: '请输入答案!',
			          type: 'warning'
			        });
			        return;
				}else{
					this.curstep=3;
				}
			},
			surepass(){
				if (this.newpass=="") {
					this.$message({
			          message: '请输入密码!',
			          type: 'warning'
			        });
			        return;
				}else if (this.newpass!=this.renewpass){
					this.$message({
			          message: '两次输入密码不一致!',
			          type: 'warning'
			        });
			        return;
				}else{

				}
			}
		}
	}
</script>
<style lang="scss">
	.forget-wrap{
		width:1200px;
		margin:0 auto;
		border:1px solid #ddd;
		padding:25px;
		box-sizing:border-box;
		margin-top:10px;
		display:flex;
		.forget-wrap-left{
			width:780px;
			.forget-header{
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
			.forget-main{
				width:100%;
			}
		}
		.forget-wrap-right{
			width:360px;
		}
		.forgetform-wrap{
			text-align:left;
			margin-top:15px;
			.el-input{
				width:280px;
			}
		}
		.step-wrap{
			margin-top:15px;
		}
		.forget-question{
			display:flex;
			line-height:50px;
			.el-input{
				width:260px;
			}
			label{
				width:220px;
				text-align:left;
			}
		}
		.forget-answer{
			display:flex;
			align-items:center;
			.el-input{
				width:260px;
			}
			label{
				width:220px;
				text-align:left;
			}
		}
		.btn-wrap{
			width:100%;
			padding-left:220px;
			box-sizing:border-box;
			text-align:left;
		}
	}
</style>