<template>
  <div>
    <el-date-picker v-model="value1" type="daterange" placeholder="选择日期"></el-date-picker>
    <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围"></el-date-picker>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        value1: '',
        value6: ''
      }
      
    }
  }
</script>