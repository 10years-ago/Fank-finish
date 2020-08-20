<template>
  <div class="charts">
    <!-- <div class=""> -->
      <el-select v-model="nowYearChange">
        <el-option
        v-for="(item,index) in years"
        :key="index"
        :label="item"
        :value="item"
        @click.native="chartChange(item)"
        >
        </el-option>
      </el-select>
    <!-- </div> -->
    <ve-line 
      :data="chartData" 
      :settings="chartSettings" 
      :extend="extend"
      >
    </ve-line>
  </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line'
export default {
  name: '',
  // components:{VeLine},
  props:{
    dateList:{
      type:Array,
      default:() => []
    },
    years:{
      type:Array,
      default:() => []
    },
    nowYear:{
      type:Number,
      default:''
    }
  },
  computed:{
    nowYearChange:{
      set(){
        return this.nowYear
      },
      get(){
        return this.nowYear
      }
    }
  },
  watch:{
    dateList(){
      this.chartData.rows = [
          { '日期': '一月', '报名人数': this.dateList[0].number},
          { '日期': '二月', '报名人数': this.dateList[1].number},
          { '日期': '三月', '报名人数': this.dateList[2].number},
          { '日期': '四月', '报名人数': this.dateList[3].number},
          { '日期': '五月', '报名人数': this.dateList[4].number},
          { '日期': '六月', '报名人数': this.dateList[5].number},
          { '日期': '七月', '报名人数': this.dateList[6].number},
          { '日期': '八月', '报名人数': this.dateList[7].number},
          { '日期': '九月', '报名人数': this.dateList[8].number},
          { '日期': '十月', '报名人数': this.dateList[9].number},
          { '日期': '十一月', '报名人数': this.dateList[10].number},
          { '日期': '十二月', '报名人数': this.dateList[11].number},
        ]
    }
  },
  data(){
    return {
      chartData: {
        columns: ['日期', '报名人数'],
        rows: [
          { '日期': '一月', '报名人数': this.dateList[0].number},
          { '日期': '二月', '报名人数': this.dateList[1].number},
          { '日期': '三月', '报名人数': this.dateList[2].number},
          { '日期': '四月', '报名人数': this.dateList[3].number},
          { '日期': '五月', '报名人数': this.dateList[4].number},
          { '日期': '六月', '报名人数': this.dateList[5].number},
          { '日期': '七月', '报名人数': this.dateList[6].number},
          { '日期': '八月', '报名人数': this.dateList[7].number},
          { '日期': '九月', '报名人数': this.dateList[8].number},
          { '日期': '十月', '报名人数': this.dateList[9].number},
          { '日期': '十一月', '报名人数': this.dateList[10].number},
          { '日期': '十二月', '报名人数': this.dateList[11].number},
        ]
      },
      chartSettings: {
        // area: true,背景色
        //坐标的刻度是否最大程度准确
        scale:[true,true]
      },

      //是否显示参数
      extend: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      }
    }
  },
  methods:{
    chartChange(value){
      this.$emit('chartChange',value)
    }
  },
  created(){
  }
}
</script>
<style scoped lang="scss">
.charts{
  text-align: center;
}
</style>