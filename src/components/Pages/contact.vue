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
					<el-row class="common-content-wrap">
						<p>移动、三连号、优选号码、靓号、回收抵押，（接短信群发业务）</p>
        				<p>地址：温州市</p>
						<p>电话：18357777655</p>
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
				
			}
		},
		computed:{
			curpath(){
				return this.$route.name
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
	.common-content-wrap{
		p{
			font-size:16px;
		}
	}
</style>