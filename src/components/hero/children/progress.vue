<template>
	<div class="role-content-inner">
		<div class="level-content">
		    <ul class="level-list clearfix">
		    	<li v-for="item in cardList">
		    		<p class="level-title">{{item.cardName}}</p>
                    <div class="level-img">
                        <img :src="baseUrl+(item.cardImg ? item.cardImg : 'card-unopen.png')"/>
                    </div>
                    <div class="level-progress-bar" :style="item.play==0 && {backgroundColor : 'transparent'}">
                        <div class="completed-bar" :style="{width:item.play+'%'}"></div>
                    </div>
		    	</li>
		    </ul>
		</div>
		<!--左右切换按钮-->
        <div class="group-btn">
            <a class="prev-btn"></a>
            <a class="next-btn"></a>
        </div>
        <!--注释-->
        <div class="explain-book">
            <ul class="explain-list clearfix">
                <li>
                    <span class="rect completed"></span>
                    已完成
                </li>
                <li>
                    <span class="rect going"></span>
                    正在进行
                </li>
                <li>
                    <span class="rect"></span>
                    还未开始
                </li>
            </ul>
            <div class="level-total">
                该玩家已完成&nbsp;:&nbsp;&nbsp;<span class="completed-text">{{completedCard}}</span>/<span>{{cardTotal}}</span>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				cardTotal: 100,
				completedCard: 7,
				baseUrl: '../../../../static/img/',
				cardList:[
					{'cardName': '关卡一', 'cardImg': 'progress-hero.png','play': '100'},
					{'cardName': '关卡二', 'cardImg': 'progress-hero.png','play': '100'},
					{'cardName': '关卡三', 'cardImg': 'progress-hero.png','play': '100'},
					{'cardName': '关卡四', 'cardImg': 'progress-hero.png','play': '100'},
					{'cardName': '关卡五', 'cardImg': 'progress-hero.png','play': '100'},
					{'cardName': '关卡六', 'cardImg': 'progress-hero.png','play': '60'},
					{'cardName': '关卡七', 'play': '0'},
					{'cardName': '关卡八', 'play': '0'},
					{'cardName': '关卡九', 'play': '0'},
					{'cardName': '关卡十', 'play': '0'}
				]
			}
		}
	}
</script>
<style scoped>
	.completed {
		background-color: #7edd7e;
	}
	.completed-text {
  		color: #7edd7e; 
	}
	.going {
	   background-color: #eae67a; 
	}
    .level-content{
   	   overflow: hidden; 
    }
    .level-list {
      width: 96%;
      margin: 0 auto; 
  	}
    .level-list li {
	    float: left;
	    width: 10%;
	    margin: 10px 1.25%;
	    text-align: center; 
	}
    .level-list li .level-title {
      font-size: 14px;
      margin-bottom: 10px;
      letter-spacing: 2px; 
  	}
    .level-list li .level-img {
      overflow: hidden;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.4);
      margin-bottom: 10px;
  	}
    .level-list li .level-img img {
        width: 100%;
        height: auto; 
    }
    .level-list li .level-progress-bar {
      width: 82%;
      height: 11px;
      margin: 0 auto;
      background-color: #eae67a;
      position: relative;
  	}
    .level-list li .level-progress-bar .completed-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 11px;
        background-color: #7edd7e; 
    }
    .level-list li.unstart .level-progress-bar {
      background-color: transparent; 
  	}

  	.group-btn {
	    position: absolute;
	    bottom: 25px;
	    right: 65px;
	    height: 38px; 
	}
    .group-btn .prev-btn, .group-btn .next-btn {
      display: inline-block;
      width: 38px;
      height: 38px;
      cursor: pointer;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.3) url(../../../../static/img/white-arrow-next.png) no-repeat center center; 
  	}
    .group-btn .prev-btn:hover, .group-btn .next-btn:hover {
        background-color: rgba(255, 255, 255, 0.5); 
    }
    .group-btn .prev-btn {
     	margin-right: 25px;
        background-image: url(../../../../static/img/white-arrow-prev.png); 
  	}
 	.explain-book {
	    position: absolute;
	    bottom: 18px;
	    left: 45px;
	}
    .explain-book .explain-list {
      margin-bottom: 20px; 
  	}
    .explain-book .explain-list li {
        float: left;
        margin-right: 20px; 
    }
    .explain-book .explain-list li .rect {
      display: inline-block;
      width: 15px;
      height: 11px;
      vertical-align: middle;
      margin-right: 10px; 
    }
    .explain-book .level-total {
      font-size: 14px;
      font-weight: 600;
    }
</style>