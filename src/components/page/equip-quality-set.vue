<template>
	 <div class="right-container">
        <!--装备设置 中间内容-->
        <div class="center-container">
            <div class="center-content">
                <el-form :model="qualityForm" :rules="rules" ref="qualityForm">
                    <el-form-item label="装备品质名称" prop="qualityName" class="equip-input">
                      <el-input v-model="qualityForm.qualityName" placeholder="请输入装备品质名称"></el-input>
                    </el-form-item>
                    <el-form-item label="装备品质颜色" prop="color">
                      <span class="selectedRect" :style="{backgroundColor:'#'+qualityForm.color}"></span>
                      <el-select v-model="qualityForm.color" placeholder="请选择装备品质颜色" class="selectColor" @change="getVal">
                        <el-option v-for="item in colorRect" :key="item.colorVal" :value="item.colorVal" :label="item.colorText">
                              <span class="colorRectangle" :style="{backgroundColor:'#'+item.colorVal}"></span>
                              <span>{{item.colorText}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="submitForm('qualityForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--右侧内容   装备品质-->
        <div class="equip-set">
            <div class="equip-set-inner optiscroll" id="equipQuality">
                <div class="suit-content equip-quality">
                    <div class="suit-tit">
                        <span class="suit-name">排序</span>
                        <span class="suit-type">装备品质名称</span>
                        <span class="suit-operate">操作</span>
                    </div>
                    <ul class="suit-list">
                        <li v-for="(item , index) in qualityList" v-if="item.isDelete!=1002" v-bind:style="{backgroundColor:'#'+item.color}">
                            <span class="suit-name">{{index+1}}</span>
                            <span class="suit-type">{{item.qualityName}}</span>
                            <span class="suit-operate">
                                <em class="move-up" :class="index==0 && 'disabled'" @click="sort('up' , index )"></em>
                                <em class="move-down" :class="index==(suitLength-1) && 'disabled'" @click="sort('down' , index)"></em>
                                <em class="del" @click="delQuality(item.id)">删除</em>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		data (){
			return {
        suitLength:0,
        qualityForm:{
          qualityName:'',
          color:''
        },
        rules:{
          qualityName:[
            { required: true , message:'请输入装备品质名称' ,trigger: 'blur'}
          ],
          color:[
            { required: true , message:'请选择装备品质颜色' , trigger: 'change'}
          ]
        },
        colorRect: [
            { colorVal : 'ffffff' , colorText : '白色'},
            { colorVal : '7ac4ea' , colorText : '蓝色'},
            { colorVal : 'eae67a' , colorText : '黄色'},
            { colorVal : 'ea977a' , colorText : '橙色'},
            { colorVal : '7aea8a' , colorText : '绿色'}
        ],
        qualityList:''
			}
		},
    mounted () {
         this.showList();
         new Optiscroll(document.getElementById('equipQuality'));
    },
    methods: {
      //select的选中值
      getVal(value){
        this.qualityForm.color = value;
      },
      //展示装备品质列表
      showList(){
          this.axios.get('/equipQuality/findEquipQualityAll',{'isDelete':1001}).then( res => {
              this.qualityList=res.result;
              this.suitLength=res.result.length;
          })
      },
      // 添加装备品质  
      submitForm(qualityForm) {
        console.log(this.$refs[qualityForm]);
        this.$refs[qualityForm].validate((valid) => {
          if(valid){
            this.axios.post('/equipQuality/addEquipQuality',this.qualityForm).then( res => {
                if (res.code ==1 ){
                    this.suitLength +=1;
                    this.qualityList.push(res.result);
                    this.qualityForm.qualityName='';
                    // this.qualityForm.color='';  清空会触发change事件，做表单验证
                }
            })
          }else{
            return false;
          }
        })
      },
      // 删除属性
      delQuality(id){
        this.$confirm('此操作将永久删除该记录，是否继续', '提示', {
            type: 'warning'
        }).then( () => {
            this.axios.post('/equipQuality/deleteEquipQuality',{
              'id' : id,
              'state' : 1002
            }).then( res => {
                if( res.code ==1 ){
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        showClose: true
                    })
                    this.showList();
                }
            })
        }).catch( () => {})
        
      },
      //修改装备品质顺序
      sort ( direct , index ) {
        let idList = [];
        this.qualityList.forEach(function(val,index){
            if(val.isDelete !=1002){
                idList.push(val.id);
            }
        })
        let isChange = false ;
        if( direct == 'up'){
            if(index > 0){
                let temp = idList[index];
                idList[index] = idList[index-1];
                idList[index-1] = temp;
                isChange = true;
            }else{
              isChange = false;
            }
        }else{
            if(index < idList.length-1) {
                let temp = idList[index];
                idList[index] = idList[index+1];
                idList[index+1] = temp;
                isChange = true;
            }else{
              isChange = false;
            }
        }
        if(isChange){
          this.$confirm('确定要修改该装备品质顺序吗？', '提示' ,{
            type: 'warning'
          }).then( () => {
              this.axios.post('/equipQuality/updateEquipQuality/sort',{
                  'sort' : idList.join(',')
              }).then( res => {
                  if( res.code == 1){
                      this.$message({
                        message: '操作成功',
                        type: 'success',
                        showClose: true
                      });
                      this.showList();
                  }
              })
          }).catch( () => {})  
        }
      }
    }
	}
</script>
<style scoped>    
    .suit-operate em.disabled{
        opacity:.5;
        cursor:not-allowed;
    }
</style>