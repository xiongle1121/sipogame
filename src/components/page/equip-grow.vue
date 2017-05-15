<template>
	<div class="right-container equip-grow-content">
        <div class="right-content-inner">
            <div class="equip-grow-table">
                <div class="row">
                    <div class="equip-main-attr">装备主属性</div>
                    <div class="equip-assistant-attr">装备副属性</div>
                </div>
                <div class="grow-table-head">
                    <div class="grow-quality">装备品质</div>
                    <div class="equip-main-attr">
                        <span>最大级别</span>
                        <span>默认属性点</span>
                        <span>升级成长点</span>
                    </div>
                    <div class="equip-assistant-attr">
                        <span>最大级别</span>
                        <span>默认属性点</span>
                        <span>升级成长点</span>
                    </div>
                    <div class="grow-operate">
                        <span>操作</span>
                    </div>
                </div>
                <ul class="grow-table-body" v-model="growParamsList">
                    <li v-for="(item,index) in growParamsList">
                        <div class="grow-quality">
                            <span v-bind:style="{backgroundColor:colorChange(item.color)}">{{item.qualityName}}</span>
                        </div>
                        <div class="equip-main-attr">
                            <input v-model="item.maxGrade" />
                            <input v-model="item.defaultPoint" />
                            <input v-model="item.growPoint" />
                        </div>
                        <div class="equip-assistant-attr">
                            <input v-model="item.viceMaxGrade" />
                            <input v-model="item.viceDefaultPoint" />
                            <input v-model="item.viceGrowPoint" />
                        </div>
                        <div class="grow-operate">
                            <span @click="editorProperty(index,item)">编辑</span>
                            <span class="disabledBtn">删除</span>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="equip-grow-option" v-model="growPropertyOptions">
                <li v-for="(item,index) in growPropertyOptions" v-bind:class="{on:iscur==index}" @click="changeProperty(item.id,index)">
                    <span>{{item.propertyName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
      data () {
        return {
            growParamsList:[],
            growPropertyOptions:[],
            iscur:0
        }
      },
      mounted (){
          // 查询装备属性
          this.axios.get('/equipProperty/findEquipPropertyAll',{'isDelete':1001}).then( res => {
             this.growPropertyOptions = res.result;
             this.showList( res.result[0].id );
          })
      },
      methods:{
          //成长参数列表的展示
          showList ( propertyId) {
              this.axios.post('/equipGrowParams/findEquipGrowParamsAll',{
                  'propertyId' : propertyId
              }).then( res => {
                  if( res.code ==1 ) {
                      this.growParamsList = res.result;
                  }
              })
          },
          // li点击事件
          changeProperty(propertyId,index){
              this.iscur = index ;
              this.showList( propertyId );
          },
          // 编辑装备主属性、副属性
          editorProperty(index,item){
              this.$confirm('确认修改装备属性吗？', '提示', {
                  type: 'warning'
              }).then( () => {
                  this.axios.postJson('/equipGrowParams/updateEquipGrowParams',{
                      'defaultPoint' : item.defaultPoint,
                      'growPoint' : item.growPoint,
                      'maxGrade' : item.maxGrade,
                      'viceDefaultPoint' : item.viceDefaultPoint,
                      'viceGrowPoint' : item.viceGrowPoint,
                      'viceMaxGrade' : item.viceMaxGrade,
                      'id' : item.id,
                      'propertyId' : item.propertyId,
                      'quality' : item.quality
                  }).then( res => {
                      if( res.code ==1 ){
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              showClose: true
                          })
                      }
                  })
              }).catch( () => {
                  //取消 input数据回滚
                  this.showList(item.propertyId);
              })
          },
          // 背景色变成rgba格式
          colorChange (color) {
              let sColor = color.toLowerCase();
              //处理333这种情况
              if(sColor.length === 3){
                  let sColorNew = "";
                  for(let i=0; i<3; i+=1){
                      sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                  }
                  sColor = sColorNew;
              }
              //十六进制转rgb格式�
              let sColorChange = [];
              for(let i=0; i<6; i+=2){
                  sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
              }
              return "rgba("+sColorChange.join(',')+",.2)";
          }
      }
    }
</script>
<style scoped>
    .grow-table-body input{
      display:block;
      height:40px;
      vertical-align:middle;
      width:;
      text-align:center;
      color:#fff;
    }
    .equip-grow-table .grow-table-body .grow-operate .disabledBtn{
      opacity:.5;
      cursor:not-allowed;
    }
</style>