<template>
	<div class="fixed-btn-wrap">
		<div>
			<el-popover
			    placement="left"
			    trigger="hover">
			    <div>
			    	<h2 class="fixed-title" style="color: red;">靓号回收</h2>
			    	<p style="padding: 0;text-align: center;">请扫下方二维码</p>
			    	<img src="@/assets/person.jpg" style="width:276px;height:276px;" />
			    </div>
				<el-button slot="reference" type="primary" circle>收</el-button>
			</el-popover>
		</div>
		<div>
			<el-popover
			    placement="left"
			    trigger="hover">
			    <div>
			    	<h2 class="fixed-title" style="color: red;">靓号抵押</h2>
			    	<p style="padding: 0;text-align: center;">请扫下方二维码</p>
			    	<img src="@/assets/person.jpg" style="width:276px;height:276px;" />
			    </div>
				<el-button slot="reference" type="primary" circle>押</el-button>
			</el-popover>
		</div>
		<div>
			<el-popover
			    placement="left"
			    trigger="hover">
			    <div>
			    	<h2 class="fixed-title" style="color: red;">靓号出租</h2>
			    	<p style="padding: 0;text-align: center;">请扫下方二维码</p>
			    	<img src="@/assets/person.jpg" style="width:276px;height:276px;" />
			    </div>
				<el-button slot="reference" type="primary" circle>租</el-button>
			</el-popover>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
	.fixed-btn-wrap{
		position: fixed;
		bottom: 50px;
		right: 20px;
		z-index:999;
		div{
			margin-bottom:10px;
		}
	}
</style>