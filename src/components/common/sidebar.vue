<template>
	<div class="sidebar">
		<el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
		  <el-submenu index="1">
		  	<template slot="title">装备</template>
		  	<el-menu-item index="equip" :class="{'is-active':computedClass}">
  				<i class="icon role-condition"></i>角色状况
  			</el-menu-item>
  			<el-menu-item index="equip-name-set">
  				<i class="icon equipment-name"></i>装备名称设置
  			</el-menu-item>
  			<el-menu-item index="equip-column-set">
  				<i class="icon equipment-column"></i>装备栏设置
  			</el-menu-item>
  			<el-menu-item index="equip-quality-set">
  				<i class="icon equipment-quality"></i>装备品质设置
  			</el-menu-item>
  			<el-menu-item index="equip-attr-set">
  				<i class="icon equipment-attr"></i>装备属性设置
  			</el-menu-item>
  			<el-menu-item index="equip-grow">
  				<i class="icon equipment-grow"></i>装备成长参数
  			</el-menu-item>
  			<el-menu-item index="equip-level">
  				<i class="icon equipment-level"></i>装备等级参数
  			</el-menu-item>
  			<el-menu-item index="suit">
  				<i class="icon suit"></i>套装
  			</el-menu-item>
  			<el-menu-item index="suit-upgrade">
  				<i class="icon suit-upgrade"></i>装备升级经验参数配置
  			</el-menu-item>
  		</el-submenu>
		  <el-submenu index="2">
		  	<template slot="title">语音</template>
		  	<el-menu-item index="voice-rank">
  				<i class="icon voice-rank"></i>语音排行榜
  			</el-menu-item>
  			<el-menu-item index="voice-check">
  				<i class="icon voice-check"></i>语音审核
  			</el-menu-item>
		  </el-submenu>	
		</el-menu>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				roleClass: false
			}
		},
		computed: {
			onRoutes(){
				return this.$route.path.replace('/','');
			},
      computedClass() {
        if(this.$route.path.indexOf('bag')!==-1){
          return true;
        }else if(this.$route.path.indexOf('hero')!==-1){
          return true;
        }else if(this.$route.path.indexOf('progress')!==-1){
          return true;
        }else{
          return false;
        }
      }
		}
	}
</script>
<style scoped>
    .sidebar{
		position:absolute;
		background-color:#fff;
		left:0;
		top:50px;
		bottom: 0;
		white-space: nowrap;
		overflow: hidden;
		width: 202px;
		overflow-y: hidden;
		/*padding-right: 2px;*/
    }
    .sidebar > ul {
        height:100%;
        background:#fff url('../../../static/img/logo.png') no-repeat center bottom;
    }
    .sidebar li.el-menu-item{
    	height:52px;
    	line-height: 52px;
    	color:#666;
    	font-size:12px;
    }
    .sidebar li.el-menu-item.is-active{
    	background:url('../../../static/img/select.png') no-repeat 0 0;
    	background-size:contain;
    	color:#fff;
    }
    .sidebar li .icon{
    	display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
        background: url('../../../static/img/role.png') no-repeat center center;
        margin-right: 5px;
    }
	.sidebar .icon.role-condition {
		background-image: url('../../../static/img/role.png');
	}
	.sidebar .el-menu-item.is-active .icon.role-condition {
		background-image: url('../../../static/img/role1.png');
	}
    .sidebar .icon.equipment-name {
		background-image: url('../../../static/img/equipment-name.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-name {
		background-image: url('../../../static/img/equipment-name1.png');
    }
    .sidebar .icon.equipment-column {
		background-image: url('../../../static/img/equipment-column.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-column {
		background-image: url('../../../static/img/equipment-column1.png');
    }
    .sidebar .icon.equipment-quality {
		background-image: url('../../../static/img/equipment-character.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-quality {
		background-image: url('../../../static/img/equipment-character1.png');
    }
    .sidebar .icon.equipment-attr {
		background-image: url('../../../static/img/equipment-attribute.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-attr {
		background-image: url('../../../static/img/equipment-attribute1.png');
    }
    .sidebar .icon.equipment-grow {
		background-image: url('../../../static/img/growth-parameters.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-grow {
		background-image: url('../../../static/img/growth-parameters1.png');
    }
    .sidebar .icon.equipment-level {
		background-image: url('../../../static/img/level-parameter.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-level {
		background-image: url('../../../static/img/level-parameter1.png');
    }
    .sidebar .icon.equipment-grade {
		background-image: url('../../../static/img/level-parameter.png');
    }
    .sidebar .el-menu-item.is-active .icon.equipment-grade {
		background-image: url('../../../static/img/level-parameter1.png');
    }
    .sidebar .icon.suit {
		background-image: url('../../../static/img/suit.png');
    }
    .sidebar .el-menu-item.is-active .icon.suit {
		background-image: url('../../../static/img/suit1.png');
    }
    .sidebar .icon.suit-upgrade {
		background-image: url('../../../static/img/allocation.png');
    }
    .sidebar .el-menu-item.is-active .icon.suit-upgrade {
		background-image: url('../../../static/img/allocation1.png');
    }
    .sidebar .icon.voice-rank {
    	background-image: url('../../../static/img/voice-rank.png');
    }
    .sidebar .el-menu-item.is-active .icon.voice-rank {
    	background-image: url('../../../static/img/voice-rank1.png');
    }
    .sidebar .icon.voice-check {
    	background-image: url('../../../static/img/voice-check.png');
    }
    .sidebar .el-menu-item.is-active .icon.voice-check {
    	background-image: url('../../../static/img/voice-check1.png');
    }
</style>