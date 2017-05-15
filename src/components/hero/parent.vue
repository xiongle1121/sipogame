<template>
	<div class="role-condition-content">
		<div class="center-container">
            <div class="player-msg">
                <p class="player-name" v-text="user.hero"></p>
                <p class="player-grade">
                    <span class="player-grade-name" v-text="user.levelGrade"></span>
                    <span class="player-level">LV:<em v-text="user.level"></em></span>
                </p>
            </div>
            <el-menu :default-active="onRoutes" class="player-select" router>
                <el-menu-item index="equip">
                    <i>装备</i>
                </el-menu-item>
                <el-menu-item index="bag">
                    <i>背包</i>
                </el-menu-item>
                <el-menu-item index="hero">
                    <i>英雄</i>
                </el-menu-item>
                <el-menu-item index="progress">
                    <i>副本进度</i>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="role-content">
        	<transition mode="out-in">
	        	<router-view></router-view>
	        </transition>
        </div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				user : {
					hero: '暴走萝莉' ,
					levelGrade: '高级玩家' ,
					level: '888'
				}
			}
		},
		computed: {
			onRoutes(){
				return this.$route.path.replace('/','');
			}
		}
	}
</script>
<style scoped>
  /*透明背景色*/
  .role-content{
  	  height:100%;
  	  box-sizing:border-box;
  	  padding:20px 78px 25px 0;
  	  margin-left:260px;
  }
  .role-content-inner{
	  height:100%;
	  box-sizing:border-box;
	  position:relative;
	  color:#fff;
	  background-color:rgba(255,255,255,.1);
	  border-radius:10px;
    overflow-y: hidden; 
  }
  .role-condition-content{
  	 height:100%;
  }
  .center-container {
  	float: left;
  	width: 260px;
  }
  .center-container .player-msg {
    padding:10px 0 10px 60px;
    color: #fff; 
  }
  .center-container .player-msg .player-name {
  	font-weight: bold;
  	font-size: 30px;
  	letter-spacing: 3px; 
  }
  .center-container .player-msg .player-grade {
  	height: 44px;
  	line-height: 44px;
  	font-size: 18px;
  	letter-spacing: 1px; 
  }
  .center-container .player-msg .player-grade .player-grade-name {
  	color: #fff83c;
  	font-weight: bold;
  	display: inline-block;
  	margin-right: 10px; 
  }
  .center-container .player-select{
  	background-color:transparent;
  }
  .center-container .player-select .el-menu-item {
    width: 142px;
    height: 142px;
    line-height: 142px;
    margin: 0 auto;
    text-align: center; 
    padding:0 !important;
  }
  .center-container .player-select .el-menu-item:hover{
  	background-color:transparent;
  }
    .center-container .player-select .el-menu-item i {
      display: inline-block;
      width: 142px;
      height: 142px;
      background: url(../../../static/img/white-circle.png) no-repeat center center;
      color: #fff;
      font-size: 18px;
      font-weight: bold; 
  }
    .center-container .player-select .el-menu-item.is-active i {
      background-image: url(../../../static/img/yellow-circle.png);
      color: #fce236;
      font-size: 24px; 
  }
</style>
