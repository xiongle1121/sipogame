<template>
    <div class="right-container">
        <!--装备设置中间内容-->
        <div class="center-container optiscroll" id="equipAttrForm">
            <div class="center-content equip-name-center">
                <el-form :model="propertyForm" :rules="propertyRules" ref="propertyForm">
                    <el-form-item label="装备属性名称" prop="propertyName" class="equip-input">
                        <el-input v-model="propertyForm.propertyName" placeholder="请输入装备属性名称"></el-input>
                    </el-form-item>
                    <el-form-item label="产生概率" prop="probability" class="equip-input">
                        <el-input v-model.number="propertyForm.probability" placeholder="请输入产生概率"></el-input>
                    </el-form-item>
                    <el-form-item label="升级概率" prop="upgradeProbability" class="equip-input">
                        <el-input v-model.number="propertyForm.upgradeProbability" placeholder="请输入升级概率"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addProperty('propertyForm')">添加</el-button>
                    </el-form-item>
                </el-form>
                <el-form :model="rateForm" :rules="rateRules" ref="rateForm">
                    <p class="vice-tit">
                        产生副属性&nbsp;VS&nbsp;副属性升级<br/>
                        概率&nbsp;5&nbsp;:&nbsp;1
                    </p>
                    <el-form-item prop="generate" class="equip-input">
                        <el-input v-model.number="rateForm.generate" placeholder="副属性概率"></el-input>
                    </el-form-item>
                    <el-form-item prop="upgrade" class="equip-input">
                        <el-input v-model.number="rateForm.upgrade" placeholder="副属性升级"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="fixRate('rateForm')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--右侧内容   装备属性设置-->
        <div class="equip-set">
            <div class="equip-set-inner optiscroll" id="equipAttr">
                <div class="equip-name-content">
                    <div class="equip-name-tit">
                        <span class="equip-name">装备属性名称</span>
                        <span class="equip-type">产生概率</span>
                        <span class="equip-quality">升级概率</span>
                        <span class="equip-operate">操作</span>
                    </div>
                    <ul class="equip-name-list" v-model="propertyList">
                       <li v-for="item in propertyList">
                            <span class="equip-name">
                                <input v-model="item.propertyName"/>
                            </span>
                            <span class="equip-type">
                                <input v-model="item.probability"/>
                            </span>
                            <span class="equip-quality">
                                <input v-model="item.upgradeProbability"/>
                            </span>
                            <span class="equip-operate">
                                <em class="modify" @click="changeProperty(item)">修改</em>
                                <em class="del" @click="delProperty(item.id)">删除</em>
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
            var checkProbability = (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('概率值不能为空'));
                }
              if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
              } else {
                callback();
              }
              };
            return {
                propertyForm: {
                    propertyName: '',
                    probability: '',
                    upgradeProbability: ''
                },
                propertyRules: {
                    propertyName: [
                        { required:true , message: '请输入装备属性名称' , trigger: 'blur'}
                    ],
                    probability: [
                        { validator: checkProbability , trigger: 'blur'}
                    ],
                    upgradeProbability: [
                        { validator: checkProbability , trigger: 'blur'}
                    ]
                },
                rateForm: {
                    id: '',
                    generate: '',
                    upgrade: ''
                },
                rateRules: {
                    generate: [
                        { validator: checkProbability , trigger: 'blur'}
                    ],
                    upgrade: [
                        { validator: checkProbability , trigger: 'blur'}
                    ],
                },
                propertyList:''
            }
        },
        created() {
            // 产生副属性、副属性升级的展示 (作为input的value展示)
            this.axios.get('/vicePropertyProbability/queryViceOrUpdate').then( res => {
                this.rateForm = res.result;
            });
            this.showList();
        },
        mounted() {
            new Optiscroll(document.getElementById('equipAttr'));
            new Optiscroll(document.getElementById('equipAttrForm'));
        },
        methods: {
            //展示属性列表
            showList () {
                this.axios.get('/vicePropertyProbability/findVicePropertyProbabilityAll').then( res =>{
                    if(res.code==1){
                        this.propertyList = res.result;
                    }
                })
            },
            // 添加属性表单
            addProperty(propertyForm){
                this.$refs[propertyForm].validate( (valid) => {
                    if(valid){
                        this.axios.post('/vicePropertyProbability/addOrUpdateEquipProperty',this.propertyForm).then( res => {
                                if(res.code==1){
                                    this.propertyList.push(res.result);
                                }
                        });
                        setTimeout( () => {
                            this.propertyForm.propertyName='';
                            this.propertyForm.probability='';
                            this.propertyForm.upgradeProbability='';
                        },200);
                    }else{
                        return false;
                    }
                })
            },
            // 产生副属性、副属性升级表单的修改
            fixRate(rateForm){
                this.$refs[rateForm].validate( (valid) => {
                    if(valid){
                        this.axios.postJson('/vicePropertyProbability/updateViceOrUpdate',this.rateForm).then(res=>{
                            if(res.code ==1 ){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true
                                })
                                // this.rateForm.generate='';
                                // this.rateForm.upgrade='';
                            }
                        })
                    }else{
                        return false;
                    }
                })
            },
            //修改副属性概率
            changeProperty(item){
                this.$confirm('确认修改该装备属性概率吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.post('/vicePropertyProbability/addOrUpdateEquipProperty',item).then( res => {
                        if(res.code ==1 ){
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose: true
                            })
                        }
                    })
                }).catch( () => {
                    //取消 数据回滚到初始状态(重新刷新页面)
                    this.showList();
                })
            },
            // 删除副属性
            delProperty (id) {
                this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.post('/vicePropertyProbability/deleteVicePropertyProbability',{
                        'id' : id,
                        'state' : 1002
                    }).then( res => {
                        if(res.code == 1) {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                showClose: true
                            })
                            this.showList();
                        }
                    })
                }).catch( () => {})    
            }
        }
    }
</script>

<style scoped>    
    .vice-tit{
        text-align:center;
        margin:0 0 15px -30px;
        line-height: 1.8;
    }
    .equip-name-list .equip-name input{
        display:block;
        width:100px;
        height:40px;
        line-height: 40px;
        margin-top:10px;
        text-align:center;
        position:relative;
        left:-5px;
    }
</style>