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
					<el-row class="common-content-goods" v-loading="isviewgoods">
						<ul class="goods-info-wrap">
							<li>
								<div>
									<span class="row-name">号码：</span>
									<span style="color:red;font-size: 18px;">{{numberinfo.number}}</span>
								</div>
								<div>详情咨询客服</div>
								<div><span class="row-name">联系商家：</span>温州号码网</div>
							</li>
							<li>
								<div>
									<span class="row-name">价格：</span>
									<span style="color:blue;font-size: 18px;">¥{{numberinfo.price}}元</span>
								</div>
								<div>
									<span class="row-name">话费：</span>
									免费送 
									<span style="color:#009C42;font-size: 18px;">¥{{numberinfo.calls}}</span> 元
								</div>
								<div><span class="row-name">联系电话：</span>157-5777-6888</div>
							</li>
							<li>
								<div>
									<span class="row-name">保底：</span>
									<span style="color:#009C42;font-size: 18px;">¥{{numberinfo.dozen}}元</span>
								</div>
								<div>
									<span class="row-name">年限：</span>
									<span style="color:#009C42;font-size: 18px;">{{numberinfo.term_id}}年</span>
								</div>
								<div><span class="row-name">联系电话：</span>151-67890-222</div>
							</li>
							<li>
								<div><span class="row-name">归属：</span>{{numberinfo.area_id}}</div>
								<div>
									<span class="row-name">运营商：</span>
									<img src="@/assets/chinamobile.png" style="width:20px;height:20px;"></img>{{numberinfo.operator_id}}
								</div>
								<div>
									<span class="row-name">微信客服：</span> 
									<el-popover
									    placement="top-start"
									    trigger="hover">
									    <img src="@/assets/person.jpg" style="width:276px;height:382px;" />
										<div slot="reference" style="width: auto;"><img src="@/assets/wechat.png" style="width:36px;height:36px;margin-right:5px"></img>
										扫描二维码
										</div>
									</el-popover>
								</div>
							</li>
							<li>
								<span><span class="row-name">申明：</span>本站号码一律身份证实名上户，人证一致！</span>
								<div><span class="row-name">联系QQ：</span>1053816891</div>
							</li>
							<li>
								<span style="text-align:left;display:flex">
									<span class="row-name">提示：</span>
									<span style="display:block;flex:1;color:blue">根据国家工信部（电话用户真实身份证信息登记规定），购买手机号码需要当面交易（或者协商交易方式）提供本人身份证原件营业厅办理。所有的号码必需实名登记激活方可使用!</span>
								</span>
							</li>
							<li>
								<span style="text-align:left;display:flex">
									<span class="row-name">备选：</span>
									<span style="display:block;flex:1;color:red">（由于线下很多店面同步销售，不确保号码一定存在。请多备选几个！喜欢就免费提交预订单,客服会与亲联系！）!
									</span>
								</span>
							</li>
						</ul>
					</el-row>
				</el-row>
				<el-row>
					<img src="http://www.wzsf0577.com/images/yd.png">
				</el-row>
				<el-row class="num-cen-wrap">
					<el-row class="num-cen-header">
						如果亲喜欢：
						<span style="color:#009C42;font-size: 18px;">18858838383</span>这个号码，免费提交以下预订资料-》客服稍后会回电！
					</el-row>
					<el-row>
						<el-form 
							:inline="true" 
							:model="buyForm"
							:rules="rules"
							ref="buyForm"
							label-position="left"
							label-width="130px"
							class="buy-form-inline">
						  <el-form-item label="收货人姓名：" prop="username">
						    <el-input v-model="buyForm.username" placeholder="姓名"></el-input>
						  </el-form-item>
						  <el-form-item label="联系电话：" prop="usertel">
						  	<el-input v-model="buyForm.usertel" placeholder="电话"></el-input>
						  </el-form-item>
						  <el-form-item label="收货地址：" prop="place">
						    <el-input v-model="buyForm.place" placeholder="收货地址"></el-input>
						  </el-form-item>
						  <el-form-item label="QQ/微信：" prop="contact">
						  	<el-input v-model="buyForm.contact" placeholder="联系QQ或微信号"></el-input>
						  </el-form-item>
						  <el-form-item label="套餐及留言：" style="width:100%;" prop="marks">
						  	<el-input type="textarea" v-model="buyForm.marks"></el-input>
						  </el-form-item>
						  <el-form-item label="验证码：" style="width:100%;" prop="code">
						  <el-popover
						    ref="popover"
						    placement="right"
						    trigger="focus">
						    <div class="unselectable code-wrap" @click="createCode">
						    	<span class="num-code" @click="createCode">{{code}}</span>
						    	<span @click="createCode">看不清楚？</span>
						    </div>
						  </el-popover>
						  	<el-input v-model="buyForm.code" placeholder="验证码" v-popover:popover></el-input>
						  </el-form-item>
						  <el-form-item label="立即预订：" size="large">
						    <el-button type="primary" :loading="isbuynumber" @click="onSubmit('buyForm')">免费提交预订</el-button>
						  </el-form-item>
						</el-form>
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
				numberinfo:{},
				code:"",
				buyForm:{
					username:"",
					usertel:"",
					place:"",
					contact:"",
					marks:"",
					code:"",
				},
				rules:{
					username: [
			            { required: true, message: '请输入姓名', trigger: 'blur' },
			            { max: 10, message: '长度不符合', trigger: 'blur' }
			        ],
			        usertel: [
			            { required: true, message: '请输入联系电话', trigger: 'blur' },
			            { min: 11, max: 11, message: '请输入正确的联系电话', trigger: 'blur' }
			        ],
			        place: [
			            { required: true, message: '请输入收货地址', trigger: 'blur' },
			            { min: 1, max: 255, message: '长度不符合', trigger: 'blur' }
			        ],
			        contact: [
			            { max: 255, message: '长度在255字以内', trigger: 'blur' }
			        ],
			        marks: [
			            { max: 255, message: '长度在255字以内', trigger: 'blur' }
			        ],
			        code: [
			            { required: true, message: '请输入验证码', trigger: 'blur' },
			            { validator: validateCode, trigger: 'blur' }
			        ],
				},
				isviewgoods:false,
				isbuynumber:false,
				isrepeat:false,
			}
		},
		computed:{
			curpath(){
				return this.$route.name
			}
		},
		created(){
			this.getNumInfo();
			this.createCode();
		},
		watch: {
	    	'$route': 'getNumInfo'
	    },
		methods:{
			getNumInfo(){
				this.isrepeat=false;
				this.isviewgoods=true;
				let id=this.$route.params.id;
				this.$axios.post(this.$api.getNumInfo,this.$qs.stringify({id:id})).then(res=>{
					this.isviewgoods=false;
					this.numberinfo=res.data;
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
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	if (!this.isrepeat) {
		          		this.isbuynumber=true;
		            /*if (storage.getItem("username")) {*/
		            	let postparams=Object.assign({}, this.buyForm,{number:this.numberinfo.number},{phone_id:this.$route.params.id});
		            	delete postparams.code;
		            	this.$axios.post(this.$api.addNumber,this.$qs.stringify(postparams)).then(res=>{
		            		this.isbuynumber=false;
		            		if (res.data) {
		            			this.isrepeat=true;
		            			this.$message({
									type:"success",
									message:"添加成功！"
								});
		            		}
		            	})
		           /* }*/
		            }else{
		            	this.$message({
							type:"warning",
							message:"已经提交了哦！"
						});
		            }
		          } else {
		            return false;
		          }
		        });
			},
			resetForm() {
		        this.$refs['buyForm'].resetFields();
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
	.common-content-goods{
		p{
			font-size:12px;
		}
	}
	.goods-info-wrap{
		list-style:none;
		display:flex;
		flex-wrap:wrap;
		padding:0;
		margin:0;
		li{
			width:100%;
			padding:10px;
			display:flex;
			justify-content:space-between;
			border-bottom:1px solid #ddd;
			div{
				width:33%;
				text-align:left;
				display:flex;
				justify-content: flex-start;
				align-items:center;
			}
		}
	}
	.row-name{
		font-size: 14px;
		font-weight: bold;
		margin-right:20px;
		display:inline-block;
	}
	.buy-form-inline{
		margin-top:10px;
		text-align:left;
		padding:0 40px 0 20px;
		display:flex;
		justify-content:space-between;
		flex-wrap:wrap;
		.el-textarea{
			width: 450px;
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