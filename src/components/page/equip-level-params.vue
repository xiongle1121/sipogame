<template>
	<div class="right-container">
            <!--装备设置 中间内容-->
            <div class="center-container equip-level-center">
                <div class="equip-level-center-inner">
                    <p class="equip-level-tit">装备等级 :</p>
                    <ul class="level-num clearfix" v-model='levelNum'>
                        <li v-for="(item,index) in levelNum" v-bind:class="{on: iscur==index}" @click="changeLevel(index)">{{item}}</li>
                    </ul>
                </div>
                <div class="group-btn">
                    <el-button type="success" @click="addLevel">添加</el-button>
                    <el-button type="danger" disabled>删除</el-button>
                    <!-- <span class="add-btn" id="addEquipBtn">添加</span> -->
                    <!-- <span class="del-btn" id="delEquipBtn">删除</span> -->
                </div>
            </div>
            <!--右侧内容   装备名称设置-->
            <div class="equip-set equip-level-left">
                <div class="equip-set-inner">
                    <div class="equip-name-content">
                        <el-form>
                            <p class="equip-level-tit">是否产生新的属性</p>
                            <el-select v-model="qualityList.newProperty">
                                <el-option label="是" value="1002"></el-option>
                                <el-option label="否" value="1001"></el-option>
                            </el-select>
                            <p class="equip-level-tit">装备品质参数设置</p>
                            <div class="row">
                                <el-form-item v-for="item in qualityList.qualities" :key="item.id" :label="item.qualityName" class="equip-input">
                                    <el-input type="text" v-model="item.experience"/>
                                </el-form-item>
                            </div>
                        </el-form>    
                    </div>
                </div>
                <div class="btn-container">
                    <el-button type="success" @click="fixLevelParams">修改</el-button>
                    <!-- <button type="button" class="add-btn">修改</button> -->
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        data () {
            return {
                levelNum:[],
                iscur: 0,
                levelParamsList:[], //返回的等级参数列表 包含 grade、newProperty、qualities字段
                qualityList:[],
                firstGrade:''
            }
        },
        mounted () {
            this.levelShow();
        },
        methods: {
            //等级展示
            levelShow(){
                this.axios.get('/equipGradeParams/findEquipGradeParamsAll').then( res => {
                    if(res.code==1){
                        let self = this;
                        this.levelParamsList = res.result;
                        this.levelParamsList.forEach(function(val,index){
                            if(val.grade !== 'null'){
                                self.levelNum.push(val.grade);
                            }
                        })
                        this.changeLevel(0);
                    }
                })
            },
            // li点击切换class
            changeLevel(index) {
                this.iscur=index;
                let self = this;
                this.levelParamsList.forEach(function(val,i){
                    if(val.grade == index) {
                        self.qualityList = val;
                    }
                })
            },
            // 修改参数等级
            fixLevelParams(){
                this.$confirm('确认修改等级参数吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    var self = this;
                    this.qualityList.qualities.forEach(function(val,index){
                        delete val.qualityName;
                        val.newProperty = self.qualityList.newProperty;
                    });
                    this.axios.postJson('/equipGradeParams/updateEquipGradeParams',this.qualityList.qualities).then( res => {
                        if( res.code ==1 ){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                        }
                    })
                }).catch( () => {})
                
            },
            // 添加装备等级
            addLevel(){
                let grade = this.levelNum[this.levelNum.length-1];
                this.axios.post('/equipGradeParams/addEquipGradeParams',{
                    'grade' : grade
                }).then( res => {})
            }
        }
    }
</script>
    
<style scoped>    
    .btn-container button{
        float:right;
        margin-top:15px;
    }
    .el-select{
        margin-bottom:20px;
    }
</style>
