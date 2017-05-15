<template>
	<div class="right-container">
        <!--装备设置 中间内容-->
        <div class="center-container">
            <div class="center-content equip-name-center">
                <el-form :model="equipNameForm" :rules="rules" ref="equipNameForm">
                    <el-form-item label="装备名称" prop="equipName" class="equip-input">
                        <el-input v-model="equipNameForm.equipName" placeholder="请输入套装名称"></el-input>
                    </el-form-item>
                    <el-form-item label="初始最小属性值" prop="beginPropertyValue" class="equip-input">
                        <el-input v-model.number="equipNameForm.beginPropertyValue" placeholder="请输入初始最小属性值"></el-input>
                    </el-form-item>
                    <el-form-item label="初始最大属性值" prop="endPropertyValue" class="equip-input">
                        <el-input v-model.number="equipNameForm.endPropertyValue" placeholder="请输入初始最大属性值"></el-input>
                    </el-form-item>
                    <el-form-item label="套装类型" prop="suitTypeName">
                        <el-select v-model="equipNameForm.suitTypeName" placeholder="请选择套装类型">
                          <el-option v-for="item in suitTypeList" :label="item.suitName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="装备品质" prop="equipQualityName">
                        <span class="selectedRect" :style="{backgroundColor:'#'+equipNameForm.equipQualityName}"></span>
                        <el-select v-model="equipNameForm.equipQualityName" placeholder="请选择装备品质" class="selectColor" @change="getVal">
                          <el-option v-for="item in colorRect" :key="item.colorVal" :value="item.colorVal" :label="item.colorText">
                              <span class="colorRectangle" v-bind:style="{backgroundColor:'#'+item.colorVal}"></span>
                              <span>{{item.colorText}}</span>
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="装备栏" prop="equipTypeName">
                        <el-select v-model="equipNameForm.equipTypeName" placeholder="请选择装备栏">
                          <el-option v-for="item in equipColumnList" :label="item.typeName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="submitForm('equipNameForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--右侧内容   装备名称设置-->
        <div class="equip-set">
            <div class="equip-set-inner optiscroll" id="equipName">
                <div class="equip-set-content">
                    <div class="equip-set-tit">
                        <span class="equip-name">装备名称</span>
                        <span class="beginProperty">初始最小属性值</span>
                        <span class="endProperty">初始最大属性值</span>
                        <span class="equip-column">装备栏</span>
                        <span class="equip-type">套装</span>
                        <span class="equip-quality">品质</span>
                        <span class="equip-operate">操作</span>
                    </div>
                    <ul class="equip-set-list">
                        <li v-for="item in equipList">
                            <span class="equip-name">
                                <input v-model="item.equipName" />
                            </span>
                            <span class="beginProperty">
                                <input v-model="item.beginPropertyValue" type="text">
                            </span>
                            <span class="endProperty">
                                <input v-model="item.endPropertyValue" type="text">
                            </span>
                            <span class="equip-column">
                                <el-select v-model="item.equipTypeName"> 
                                    <el-option v-for="item in equipColumnList" :label="item.typeName" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </span> 
                            <span class="equip-type">
                                <el-select v-model="item.suitTypeName">
                                    <el-option v-for="item in suitTypeList" :label="item.suitName" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </span>
                            <span class="equip-quality">
                                <el-select v-model="item.equipQualityName" :style="{color:'#'+item.qualityColor}">
                                    <el-option v-for="item in colorRect" :value="item.colorVal" :label="item.colorText" :style="{color:'#'+item.colorVal}" :key="item.colorVal"></el-option>
                                </el-select>
                            </span>
                            <span class="equip-operate">
                                <em class="modify" @click="fixEquip(item)">修改</em>
                                <em class="del" @click="delEquip(item.id)">删除</em>
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
        data () {
            var checkMinVal = (rule, value, callback) => {
                if(value===''){
                    callback(new Error('请输入初始最小属性值'));
                }else{
                    if(this.equipNameForm.endPropertyValue && value > this.equipNameForm.endPropertyValue){
                        callback(new Error('输入值应小于初始最大属性值'));
                    }else{
                        callback();
                    }
                }
            };
            var checkMaxVal = (rule, value, callback) => {
                if(value===''){
                    callback(new Error('请输入初始最大属性值'));
                }else{
                    if(this.equipNameForm.beginPropertyValue && value < this.equipNameForm.beginPropertyValue){
                        callback(new Error('输入值应大于初始最小属性值'));
                    }else{
                        callback();
                    }
                }
            };
            return {
                equipNameForm : {
                    equipName: '',
                    beginPropertyValue: '',
                    endPropertyValue: '',
                    equipTypeName: '',
                    suitTypeName: '',
                    equipQualityName: '',
                },
                rules:{
                    equipName: [
                        { required:true , message: '请输入装备名称' , trigger: 'blur'}
                    ],
                    beginPropertyValue: [
                        { validator:checkMinVal, trigger:'blur' }
                    ],
                    endPropertyValue: [
                        { validator:checkMaxVal, trigger:'blur' }
                    ],
                    suitTypeName: [
                        { required:true , message: '请选择套装类型' , trigger: 'change'} 
                    ],
                    equipQualityName: [
                        { required:true , message: '请选择装备品质颜色' , trigger: 'change'} 
                    ],
                    equipTypeName: [
                        { required: true, message: '请选择装备栏', trigger: 'change'}
                    ]
                },
                colorRect: [
                    { colorVal : 'ffffff' , colorText : '白色'},
                    { colorVal : '7ac4ea' , colorText : '蓝色'},
                    { colorVal : 'eae67a' , colorText : '黄色'},
                    { colorVal : 'ea977a' , colorText : '橙色'},
                    { colorVal : '7aea8a' , colorText : '绿色'}
                ],
                suitTypeList:[],
                equipColumnList:[],
                equipList:[]
            }
        },
        mounted () {
            this.showList();
            new Optiscroll(document.getElementById('equipName'));
            // 查询有装备栏
            this.axios.get('/equipType/findEquipTypeAll',{'isDelete':1001}).then( res => {
                this.equipColumnList = res.result; 
            });
            // 查询套装
            this.axios.get('/equipSuit/findEquipSuitAll',{ 'isDelete' : 1001}).then( res => {
                this.suitTypeList = res.result;
            });
        },
        methods:{
            getVal(value){
                this.equipNameForm.equipQualityName = value;
            },
            // 查询装备列表
            showList(){
                this.axios.get('/equip/equipList',{'isDelete':1001}).then( res => {
                    this.equipList=res.result;
                })
            },
            // 添加装备
            submitForm(equipNameForm){
                this.$refs[equipNameForm].validate( (valid) => {
                    if(valid){
                        this.axios.postJson('/equip/addEquip',this.equipNameForm).then( res => {
                            console.log(res)
                        })
                    }else{
                        return false;
                    }
                })
            },
            // 修改装备
            fixEquip(item){
                this.$confirm('确认修改该装备信息吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.postJson('/equip/updateEquip',item).then( res => {
                        if(res.code==1){
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose:true
                            })
                        }
                    })
                }).catch( ()=> {
                    this.showList();
                })  
            },
            // 删除装备
            delEquip(id){
                this.$confirm('此操作将永久删除该记录，是否继续?','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then( () => {
                        this.axios.post('/equip/deleteEquip',{
                            'id' : id,
                            'state' : 1002
                        }).then( res => {
                            if( res.code ==1 ){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            }
                        })
                    }).catch( () => {})    
            }
        }
    }
</script>

<style scoped>
    .equip-name-list li .equip-name{
      position:relative;
      left:-20px;
    }
    .equip-set-content{
        padding:20px 15px 0;
    }
    .equip-set-tit{
        margin-bottom:20px;
        overflow:hidden;
    }
    .equip-set-list li{
        height:60px;
        line-height: 60px;
        margin-bottom:12px;
        background-color:#fff;
        border-radius:10px;
        color:#222;
    }
    .equip-set-tit>span,.equip-set-list span{
      float:left;
      display:block;
      width:15%;
      height:100%;
      text-align:center;
    }
    .equip-set-tit>span.equip-quality,.equip-set-list span.equip-quality{
      width:10%;
    }
    .equip-set-list input{
      height:40px;  
      width:60%;
      margin-top:9px;
      text-align:center;
    }
    .equip-set-list .equip-operate em{
        margin-right:5px;
        cursor:pointer;
    }
    .equip-set-list .el-select{
        width:80%;
        vertical-align: middle;
    }    
</style>
<style>
    .equip-set-list .el-input__inner{
        height:40px;
        color:#000;
        padding:0;
        color:#222;
        text-align:center;
        border:none;
    }
    .equip-set-list .el-input__icon{
        display:none;
    }
</style>