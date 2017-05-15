<template>
	<div class="role-content-inner">
	    <!--套装图片 6块拼接-->
	    <div class="pic-joint">
	    	<div v-for="(item,index) in imgList" class="pic" v-bind:class="'pic'+(index+1)">
	    		<img :src="baseUrl+item.imgSrc" />
	    	</div>
	    </div>
	    <!--echart模仿的弹窗-->
	    <div class="echarts">
          <IEcharts :option="pie"></IEcharts>
      </div>
      <!--总属性-->
      <div class="total-property">
          <p class="property-tit">总属性</p>
          <ul class="property-list">
              <li v-for="item in totalPropertyList">
                  <span class="property-name">{{item.propertyName}}</span>
                  <div class="property-bar">
                      <div class="property-inner-bar" v-bind:style="{width:item.curVal/item.totalVal*100+'%'}"></div>
                  </div>
                  <em class="property-value">{{item.curVal}}</em>
              </li>
          </ul>
      </div>
	</div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3';

	export default {
    components:{
      IEcharts
    },
		data(){
      return {
        pie: {
            tooltip : {
                trigger: 'item',
                formatter: function(obj){
                    return obj.name;
                },
                backgroundColor: 'rgba(0,0,0,.5)',
                padding: [20,20,10,20],
                textStyle: {
                    color: '#ecf8aa',
                    fontSize:14
                }
            },
            series : [
                {
                    name: '玩家装备展示',
                    type: 'pie',
                    radius : '170px',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                          show: false
                        },
                        emphasis: {
                          show: false
                        }
                    },
                    labelLine: {
                        normal: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        }
                    },
                    data : [],
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'transparent',
                            color: 'transparent'
                        }
                    }
                }
            ]
        },

				baseUrl: '../../../../static/img/',
				totalPropertyList:[
					{'propertyName': '伤害' , 'totalVal': 150 ,'curVal': 23},
					{'propertyName': '护盾偏斜' , 'totalVal': 150 ,'curVal': 34},
					{'propertyName': '力场盾' , 'totalVal': 150 ,'curVal': 145},
					{'propertyName': '效果命中' , 'totalVal': 150 ,'curVal': 56},
					{'propertyName': '攻速' , 'totalVal': 150 ,'curVal': 65},
					{'propertyName': '暴击率' , 'totalVal': 150 ,'curVal': 71}
				],
				hexagonCard:[
					{imgSrc: '1.png', suitType: '套装A', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
					},
          {imgSrc: 'blue2.png', suitType: '套装AB', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
          },
          {imgSrc: 'blue3.png', suitType: '套装B', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
          },
          {imgSrc: '4.png', suitType: '套装C', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
          },
          {imgSrc: '5.png', suitType: '套装D', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
          },
          {imgSrc: '6.png', suitType: '套装B', columnType: '装备栏2', quality: '蓝色', level: '等级', exprience: '678', lichang: '78', vice: '35', hudun: '30', shanghai: '78', mingzhong: '20'
          }
				],
				imgList: [],
        popHtml: []
			}
		},
    mounted(){
      let self=this;
      this.hexagonCard.forEach(function(val,index){
        self.imgList.push( {'imgSrc':val.imgSrc} );
      });

      let obj = '';
      for(let i=0; i<this.hexagonCard.length; i++){
        obj = '<div class="equip-pop"><div class="equip-pop-tit"><img src="'+this.baseUrl+this.hexagonCard[i].imgSrc+'"/><div class="equip-pop-name"><p class="equip-pop-tit">'+this.hexagonCard[i].suitType+'</p><p>'+this.hexagonCard[i].columnType+'</p></div></div><ul class="equip-pop-list"><li>装备品质 : '+this.hexagonCard[i].quality+'</li><li>装备等级 : '+this.hexagonCard[i].level+'</li><li>装备经验 : '+this.hexagonCard[i].exprience+'</li><li>力场盾 : '+this.hexagonCard[i].lichang+'</li><li>副属性 : '+this.hexagonCard[i].vice+'</li><li>护盾偏斜 : '+this.hexagonCard[i].hudun+'</li><li>伤害 : '+this.hexagonCard[i].shanghai+'</li><li>效果命中 : '+this.hexagonCard[i].mingzhong+'</li></ul></div>';
        this.popHtml.push(obj);
      }

      this.pie.series[0].data = [
        {value: 1 , name: this.popHtml[0]},
        {value: 2 , name: this.popHtml[1]},
        {value: 2 , name: this.popHtml[2]},
        {value: 2 , name: this.popHtml[3]},
        {value: 2 , name: this.popHtml[4]},
        {value: 2 , name: this.popHtml[5]},
        {value: 1 , name: this.popHtml[0]}
      ]
    }
	}
</script>

<style>
.echarts,.pic-joint {
  position: absolute;
  left: 19%;
  top: 50%;
  margin-top: -175px;
  z-index: 1099;
  width: 400px;
  height: 351px;
}
.pic {
   position:absolute;
  width:200px;
  height:178px;
  background-repeat:no-repeat;
  background-position:0 0;
  background-size:contain;
}
.pic img{
  width:100%;
  height:auto;
}

.pic1 {
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
}

.pic2 {
  top: 0;
  right: 0;

  display: block;
}

.pic3 {
  right: 0;
  bottom: 0;
}

.pic4 {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}

.pic5 {
  left: 0;
  bottom: 0;
}

.pic6 {
  left: 0;
  top: 0;
}

.equip-pop {
  width: 240px;
}
.equip-pop-tit {
  position: relative;
  margin-bottom: 20px;
}
.equip-pop img{
  width: 106px;
  height: auto;
}
.equip-pop-name {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  text-align: right;
  letter-spacing: 2px;
  font-weight: 600;
}
.equip-pop-type {
  font-size: 16px;
  margin-bottom: 10px;
}
.equip-pop-list li {
  margin-bottom: 6px;
}

.total-property {
  width: 420px;
  color: #fff;
  position: absolute;
  z-index: 1099;
  top: 50%;
  right: 90px;
  margin-top: -145px;
}
.total-property .property-tit {
	font-size: 24px;
	font-weight: 600;
	text-align: center;
	margin-bottom: 40px;
}
.total-property .property-list li {
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 15px;
}
.total-property .property-list .property-name {
    float: left;
    width: 135px;
    font-size: 24px;
}
.total-property .property-list .property-bar {
    position: relative;
    float: left;
    width: 205px;
    height: 15px;
    margin-top: 5px;
    border-radius: 5px;
    background-color: #fff;
}
.total-property .property-list .property-bar .property-inner-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #6f7586;
  width: 40%;
}
.total-property .property-list .property-value {
	float: left;
	width: 80px;
	text-align: right;
	font-size: 24px; 
}
</style>