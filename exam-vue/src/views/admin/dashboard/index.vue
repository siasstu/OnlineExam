<template>
  <div>
    <el-row style="display: flex">
      <el-card style="width: 450px; height: 400px">
        <el-calendar v-model="value" class="test"> </el-calendar>
      </el-card>
      <el-card style="width: 75%; height: 400px; margin-left: 30px">
        <div
          id="echarts-pie"
          style="width: 100%; height: 350px; position: relative"
        ></div>
      </el-card>
    </el-row>
    <el-row style="display: flex; margin-top: 10px">
      <el-card style="width: 100%; height: 405px">
        <div style="display: flex">
          <div>
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-xueshengguanli-"></use>
            </svg>
          </div>
          <div style="flex: 1"></div>
          <div
            style="
              line-height: 45px;
              height: 45px;
              color: #8c8c8c;
              font-size: 20px;
              font-weight: 560;
            "
          >
            <p>学生总数</p>
            <count-to :start-val="0" :end-val="50" :duration="2600" />
          </div>

          <div>
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-xueshengguanli-"></use>
            </svg>
          </div>
          <div style="flex: 1"></div>
          <div
            style="
              line-height: 45px;
              height: 45px;
              color: #8c8c8c;
              font-size: 20px;
              font-weight: 560;
            "
          >
            <p>学生总数</p>
            <count-to :start-val="0" :end-val="50" :duration="2600" />
          </div>

          <div>
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-xueshengguanli-"></use>
            </svg>
          </div>
          <div style="flex: 1"></div>
          <div
            style="
              line-height: 45px;
              height: 45px;
              color: #8c8c8c;
              font-size: 20px;
              font-weight: 560;
            "
          >
            <p>学生总数</p>
            <count-to :start-val="0" :end-val="50" :duration="2600" />
          </div>



        </div>
      </el-card>
    </el-row>
  </div>
</template>


<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      value: new Date(),
      myChart: null
    }
  },
  // created() {
  //   this.$nextTick(this.search())
  // },
  methods: {
    search() {
      this.myChart.setOption(this.option())
    },
    option() {
      return {
        title: {
          text: '访问人数折线图',
          x: 'center',
          y: 'top',
          textAlign: 'center'
        },
        grid: {
          x: 22,
          y: 0,
          x2: 20,
          y2: 20
        },
        tooltip: {},
        xAxis: {
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
          ]
        },
        yAxis: {
          data: ['0', '2', '4', '6', '8', '10']
        },
        series: [
          {
            name: '今日访问人数',
            type: 'line',
            data: [3, 4, 5, 0, 5, 2, 5, 2, 5, 5]
          }
        ]
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('echarts-pie'))
    this.search()
  }
}
</script>
<style scoped>
.test /deep/ .el-calendar-table .el-calendar-day {
  width: 50px;
  height: 40px;
}
</style>