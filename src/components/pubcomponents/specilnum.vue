<template>
	<el-row class="card-common">
		<el-row class="card-header-common">特殊号码</el-row>
		<el-row class="card-con-common specil-num" v-loading="isspecil">
		<ul class="tab-con-ul">
	  		<li class="text-hide flex-common" 
		  		v-for="(item,index) in specilnumber" 
		  		:key="index" 
		  		@click="viewnumber(item.id)">
	  			<div>
	  				<i class="el-icon-arrow-right"></i>{{item.number}}
	  			</div>
	  			<div class="tel-price">¥{{item.price}}</div>
	  		</li>
	  	</ul>
	  	</el-row>
	</el-row>
</template>
<script>
	export default{
		data(){
			return{
				isspecil:false,
				specilnumber:[],
			}
		},
		mounted(){
			this.getnumber();
		},
		methods:{
			getnumber(){
				this.isspecil=true;
				this.$axios.post(this.$api.specilnumber).then(res=>{
					this.isspecil=false;
					this.specilnumber=res.data;
				})
			},
			viewnumber(id){
				this.$router.push({path:"/goodsView/"+id});
			}
		},
		watch:{
		}
	}
</script>
<style lang="scss">
$bg:#F32613;
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
</style>