<template>
  <div class="Finance-table">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        width="150px"
        label="车牌号"
        align="center">
        <template slot-scope="scope">
          <span :class="{noTime:scope.row.registerstatus == 'no'}">{{ scope.row.carNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="150px"
        label="使用人"
        align="center">
      </el-table-column>
      <el-table-column
        prop="frameNum"
        width="170px"
        label="车架号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="registerDate"
        label="注册日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="issueDate"
        label="年审日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="carState"
        label="车辆状态"
        align="center">
      </el-table-column>
      <el-table-column
        width="250px"
        align="center">
        <template slot-scope="scope">
          <div class="button">
            <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="确定这个车辆已年审？"
              v-show="scope.row.registerstatus == 'no'"
              @onConfirm="isRegisterstatus(scope.row)">
              <el-button type="danger" size="mini" slot="reference" style="margin-right:15px">确认年审</el-button>
            </el-popconfirm>
            <el-button type="primary" size="mini" @click="tableUpdate(scope.row)" style="margin-right:15px">修改</el-button>
            <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="你确定要删除这个车辆信息？"
              @onConfirm="tableDel(scope.row.id)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
  data(){
    return {
    }
  },
  methods:{
    tableUpdate(val){
      this.$emit('tableUpdate',val)
    },
    tableDel(val){
      this.$emit('tableDel',val)
    },
    isRegisterstatus(val){
      this.$emit('isRegisterstatus',val)
    }
  }
}
</script>
<style scoped lang="scss">
.noTime{
  color: red;
}
.button{
  text-align: right;
}
</style>