<template>
	<div class="right-container">
        <!--装备设置中间内容-->
        <div class="center-container text-center">
            <div class="center-content" style="margin-left:0;">
                <p class="equip-center-tit" style='text-indent:4em;'>装备栏添加</p>
                <div>
                    <el-button type="success" @click="addColumn">添加</el-button>
                    <!-- <el-button type="danger" @click="delColumn">删除</el-button> -->
                    <!-- <span class="add-btn" @click="addColumn">添加</span> -->
                    <!-- <span class="del-btn" @click="delColumn">删除</span> -->
                </div>
            </div>
        </div>
        <!--右侧内容   装备栏设置-->
        <div class="equip-set">
            <div class="equip-set-inner">
                <div class="equip-column-content optiscroll" id="equipColumn">
                    <ul class="equip-column-list clearfix">
                      <li v-for="item in columnList">
                        <i class="el-icon-circle-cross delIcon" v-if="item.isDelete!=1002" @click="delColumn(item.id)"></i>
                        <p>{{item.typeName}}</p>
                        <p class="delete-text" v-if="item.isDelete==1002">已删除<br/><span class="recoverBtn" @click="recover(item.id)">点此</span>可恢复</p>
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
      return {
        columnList:[]
      }
    },
    created () {
        this.showList();
    },
    mounted() {
        new Optiscroll(document.getElementById('equipColumn'));
    },
    methods: {
      //装备栏列表的展示
      showList () {
          this.axios.get('/equipType/findEquipTypeAll').then( res => {
              // let self = this ;
              if( res.code==1 ){
                    this.columnList = res.result;
                    // self.columnList=[];
                    // res.result.forEach(function(val,index){
                    //     if(val.isDelete != 1002){
                    //         self.columnList.push(val);
                    //     }
                    // })
              }
          })
      },
      //添加装备栏
      addColumn(){
          this.$prompt('请输入装备栏名称', '提示', {
              confirmButtonText: '添加',
              cancelButtonText: '取消',
              inputValidator(value){
                  if(!value){
                      return "装备栏名称不能为空！";
                  }else if(value.length>10){
                      return '字数不能超过10位！';
                  }
              }
          }).then( ({value}) => {
              this.axios.post('/equipType/addEquipType',{'typeName' : value}).then( res => {
                  if(res.code ==1 ){
                      this.$message({
                          message: '添加成功',
                          type: 'success',
                          showClose: true
                      })
                      this.showList();
                  }
              })
          }).catch( () => {})  
          
      },
      //删除装备栏
      delColumn( id ){
          this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
              type: 'warning'
          }).then( () => {
              this.axios.post('/equipType/deleteEquipType',{
                 'id' : id,
                 'state' : 1002
              }).then( res => {
                  if( res.code == 1){
                      this.showList();
                  }
              })
          }).catch( () => {})       
      },
      //恢复装备栏
      recover( id ){
          this.$confirm('确认恢复此装备栏吗？', '提示', {
              type: 'warning'
          }).then( () => {
              this.axios.post('/equipType/deleteEquipType',{
                 'id' : id,
                 'state' : 1001
              }).then( res => {
                  if( res.code == 1){
                      this.showList();
                  }
              })
          }).catch( () => {})       
      }
    }
  }
</script>
<style>
  .el-message-box__input .el-input__inner{
        color: #48576a;
    }
</style>
<style scoped>
    .equip-column-list li{
      position:relative;
    }
    .equip-column-list .delete-text{
      position:absolute;
      bottom:8px;
      left:50%;
      transform:translateX(-50%);
      font-size:12px;
      line-height:20px;
    }
    .recoverBtn{
      color:#13ce66;
      padding:0 3px;
      cursor:pointer;
    }
    .delIcon{
        position:absolute;
        right:15px;
        top:-8px;
        font-size:24px;
        cursor:pointer;
    }
    .delIcon:before{
        position:absolute;
        left:0;
        top:0;
        color:#D3DCE6;
        /*background-color:rgba(255,255,255,.8);*/
    }
</style>