<template>
	<div class="right-container">
        <!--装备设置 中间内容-->
        <div class="center-container">
            <div class="center-content">
                <el-form :model="suitForm" :rules="addRule" ref="suitForm">
                    <el-form-item label="套装名称" prop="suitName" class="equip-input">
                        <el-input v-model="suitForm.suitName" placeholder="请输入套装名称"></el-input>
                    </el-form-item>
                    <el-form-item label="套装类型" prop="suitType">
                        <el-select v-model="suitForm.suitType" placeholder="请选择套装类型">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addSuit('suitForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--右侧内容   套装-->
        <div class="equip-set">
            <div class="equip-set-inner optiscroll" id="equipSuit">
                <div class="suit-content">
                    <div class="suit-tit">
                        <span class="suit-name">套装名称</span>
                        <span class="suit-type">套装类型</span>
                        <span class="suit-operate">操作</span>
                    </div>
                    <ul class="suit-list">
                        <li v-for="item in suitList">
                            <span class="suit-name">
                                <input v-model="item.suitName"/>
                            </span>
                            <span class="suit-type">
                                <el-select v-model="item.suitType" @visible-change="visibleChange">
                                    <el-option label="普通装备" value="1001"></el-option>
                                    <el-option label="特殊装备" value="1002"></el-option>
                                </el-select>
                            </span>
                            <!-- <input class="suit-type" v-model="item.suitType"/> -->
                            <span class="suit-operate">
                                <em @click="fixSuit(item)">修改</em>
                                <em @click="delSuit(item.id)">删除</em>
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
		data(){
			return {
				options:[
					{
						value: '1001',
                        label: '普通装备'
					},
					{
						value: '1002',
                        label: '特殊装备'
					}
				],
                suitForm: {
                    suitName: '',
                    suitType: ''
                },
                addRule: { 
                    suitName:[
                        { required: true , message:'请输入套装名称' ,trigger: 'blur'}
                    ],
                    suitType:[
                        { required: true , message:'请选择套装类型' , trigger: 'change'}
                    ]
                },
                suitList:[]
			}	
		},
        mounted () {
            this.showList();
            new Optiscroll(document.getElementById('equipSuit'));
        },
        methods: {
            // 套装列表展示
            showList(){
                this.axios.get('/equipSuit/findEquipSuitAll',{ 'isDelete' : 1001}).then( res => {
                    this.suitList = res.result;
                })
            },
            visibleChange(val){  //能否改变当前下拉选框的样式？？？？
                if(val){
                    
                }else{
                    
                }
            },
            // 添加套装
            addSuit(suitForm){
                this.$refs[suitForm].validate( (valid) => {
                    if(valid){
                        this.axios.postJson('/equipSuit/addEquipSuit',this.suitForm).then( res => {
                            if(res.code==1){
                                this.suitList.push(res.result);
                                this.suitForm.suitName='';
                                // this.suitForm.suitType='';
                            }
                        })
                    }else{
                        return false;
                    }
                })
            },
            // 修改套装 (id suitName suitType)
            fixSuit(item){
                this.$confirm('确认修改该套装信息吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.postJson('/equipSuit/updateEquipSuit',item).then( res => {
                        if(res.code ==1 ){
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose: true
                            })
                        }
                    })
                }).catch( () => {
                    this.showList();
                })   
            },
            // 删除套装
            delSuit(id){
                this.$confirm('此操作将永久删除该记录，是否继续', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.axios.post('/equipSuit/deleteEquipSuit',{
                        'id': id ,
                        'state': 1002
                    }).then( res => {
                        if(res.code ==1 ){
                            this.showList();
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                showClose:true
                            })
                        }
                    })
                }).catch( () => {}) 
            }
        }
	}
</script>
<style scoped>
    .suit-list .suit-operate{
        position:relative;
        left:17px;
    }
    .suit-list .suit-operate em{
        margin-left:12px;
        cursor:pointer;
    }
    .suit-tit .suit-operate{
        position:relative;
        left:-8px;
    }

    .suit-list>span{
        float:left;
        width:33.33%;
    }

    .suit-list input{
        width:100px;
        text-align:center;
        height:40px;
        vertical-align: middle;
        position:relative;
        left:-22px;
    }
    .suit-list .el-select{
        width:120px;
        vertical-align: middle;
    }
</style>
<style>
    .suit-list .el-input__inner{
        height:40px;
        color:#000;
        padding:0;
        color:#222;
        text-align:center;
        border:none;
    }
    .suit-list .el-input__icon{
        display:none;
    }
    /* 切换下拉选择框显示与隐藏时input的边框效果
    .suit-list .on .el-input__inner{
        border:1px solid #000;
    }
    .suit-list .off .el-input__inner{
        border:none;
    } */
</style>