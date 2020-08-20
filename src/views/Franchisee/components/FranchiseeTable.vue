<template>
  <el-table
    :data="tableData"
    style="width: 1280px"
    v-loading="loading"
    >
    <el-table-column
      prop="name"
      label="姓名"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      min-width="20%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="场地位置"
      min-width="30%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="number"
      label="分点号"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      width="160px"
      align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="tableUpdate(scope.row)" style="margin-right:15px">修改</el-button>
        <el-popconfirm
          confirmButtonText='确定'
          cancelButtonText='不用了'
          icon="el-icon-info"
          iconColor="red"
          title="你确定要删除这个加盟商信息？"
          @onConfirm="tableDel(scope.row.id)">
          <el-button type="danger" size="mini" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: '',
  components:{},
  props:{
    tableData:{
      type:Array
    },
    loading:{
      type:Boolean
    }
  },
  methods:{
    tableUpdate(val){
      this.$emit('table-update',val)
    },
    tableDel(val){
      this.$emit('tableDel',val)
    }
  }
}
</script>
<style scoped>
</style>