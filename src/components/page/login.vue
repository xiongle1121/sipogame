<template>
    <div class="login-wrap">
        <div class="ms-title">思珀游戏后台管理系统</div>
        <div class="ms-login">
            <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('/login',this.ruleForm).then( res => {
                            console.log(res);
                        })
                        localStorage.setItem('ms_username',self.ruleForm.username);
                        self.$router.push('/equip');
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>
    .login-wrap{
        position: absolute;
        width:100%;
        height:100%;
        background:url('../../../static/img/bg.png');
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -210px;
        text-align: center;
        font-size:28px;
        color: #fff;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-140px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .ms-login .el-form-item__content{
        width:100% !important;
        margin-left:0 !important;
    }
    .ms-login .el-input__inner{
        color:#000 !important;
    }
    .login-btn{
        text-align: center;
        margin-top:35px;
    }
    .login-btn button{
        width:100%;
        height:40px;
    }
</style>