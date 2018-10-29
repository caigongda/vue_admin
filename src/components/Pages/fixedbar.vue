<template>
	<div class="fixed-btn-wrap">
		<div>
			<el-popover
			    placement="left"
			    title="靓号"
			    trigger="hover">
			    <img src="@/assets/person.jpg" style="width:276px;height:382px;" />
				<el-button slot="reference" type="primary" circle>靓</el-button>
			</el-popover>
		</div>
		<div>
			<el-popover
			    placement="left"
			    title="靓号"
			    trigger="hover">
			    <img src="@/assets/person.jpg" style="width:276px;height:382px;" />
				<el-button slot="reference" type="primary" circle>靓</el-button>
			</el-popover>
		</div>
		<div>
			<el-popover
			    placement="left"
			    title="靓号"
			    trigger="hover">
			    <img src="@/assets/person.jpg" style="width:276px;height:382px;" />
				<el-button slot="reference" type="primary" circle>靓</el-button>
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