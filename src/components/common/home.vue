<template>
	<div class="wrapper">
		<v-header></v-header>
		<v-sidebar></v-sidebar>
		<div class="content">
			<transition name="move" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>
<script>
	import vHeader from './header.vue'
	import vSidebar from './sidebar.vue'

	import optiscroll from '../../plugins/optiscroll.min.js'  //自定义滚动条插件

	export default {
		components:{
			vHeader, vSidebar
		}
	}
</script>
<style>
	@import '../../plugins/optiscroll.css';
	@import '../../../static/css/main.css';
	@import '../../../static/css/equip.css';
	body{
		overflow-y:hidden;
		font-family: 'Microsoft Yahei', simsun, Arial;
	}
	.wrapper{
		position:absolute;
		left:0;
		right: 0;
		top: 0;
		bottom: 0;
		background: url('../../../static/img/bg.png') no-repeat center center;
		background-size: cover;
		font-size: 12px;
		color: #666;
		min-width:1200px;
		/*min-height:700px;*/
	}
	.content{
		position:absolute;
		left:202px;
		right:0;
		top:50px;
		bottom:0;
		color:#fff;
	}
	.el-form-item__content{
		width:220px;
	}
	.el-form-item__label:before{
		display:none;
	}
	.el-form-item__label{
		color:#fff;
	}
</style>