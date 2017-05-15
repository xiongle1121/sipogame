<template>
	<div class="right-container">
        <div class="right-content-inner">
            <div class="center-content upgrade-content">
                <el-form>
                    <div class="row">
                        <el-form-item label="三级以上提供经验比例" class="equip-input">
                            <el-input type="text" placeholder="三级以上提供经验比例"/>
                        </el-form-item>
                        <el-form-item label="三级以下提供经验比例" class="equip-input">
                            <el-input type="text" placeholder="三级以下提供经验比例"/>
                        </el-form-item> <br/>
                    </div>
                    <div class="row">
                        <el-form-item label="白色基本经验值" class="equip-input">
                            <el-input type="text" placeholder="白色基本经验值"/>
                        </el-form-item>
                        <el-form-item label="蓝色基本经验值" class="equip-input">
                            <el-input type="text" placeholder="蓝色基本经验值"/>
                        </el-form-item>
                        <el-form-item label="黄色基本经验值" class="equip-input">
                            <el-input type="text" placeholder="黄色基本经验值"/>
                        </el-form-item>
                        <el-form-item label="橙色基本经验值" class="equip-input">
                            <el-input type="text" placeholder="橙色基本经验值"/>
                        </el-form-item>
                        <el-form-item label="绿色基本经验值" class="equip-input">
                            <el-input type="text" placeholder="绿色基本经验值"/>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="success" @click="fixExperience(item)">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return{
                experienceList : []
            }
        },
        mounted () {
            this.axios.post('/experienceParams/findExperienceParamsAll').then( res => {
                if(res.code ==1 ){
                    this.expericeList = res.result;
                }
            })
        },
        methods: {
            // 修改升级经验参数
            fixExperience(item){
                this.$confirm('确认修改参数配置吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.postJson('/experienceParams/addExperienceParams',item).then( res => {})
                }).catch( () => {})
                
            }
        }
    }
</script>
<style>
    
</style>