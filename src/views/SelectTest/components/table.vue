<template>
  <div class="select-table">
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 1560px"
      id="selectTable"
      >
      <el-table-column
        prop="student"
        label="名字"
        min-width="8%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="bianhao"
        label="学习驾驶证编号"
        min-width="12%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cardid"
        label="身份证"
        min-width="12%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="kskm"
        label="考试科目"
        min-width="8%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="kscx"
        label="考试车型"
        min-width="9%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="examdate"
        label="考试日期"
        min-width="20%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ksdd"
        label="考试场地"
        min-width="15%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="agent"
        label="加盟点"
        min-width="10%"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    tableData:{
      type:Array
    },
    loading:{
      type:Boolean
    }
  },
  data(){
    return {
    }
  },
}
</script>
<style scoped lang="scss">
  .el-table{
    max-width: none;
    .el-table__body-wrapper{
      overflow-x: hidden;
    }
  }
  #excelTable{
    margin: 0 auto;
  }
</style>