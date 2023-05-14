<template>
  <div>
    <el-row :gutter="40" >
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-kaoshishijuan"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c; font-size: 20px;font-weight: 560;">
              <p >试卷总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.papersCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-timu"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c; font-size: 20px;font-weight: 560;">
              <p>题目总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.questionsCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-dajuanbaogao"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c; font-size: 20px;font-weight: 560;">
              <p>答卷总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.answersCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-banjiguanli-"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c; font-size: 20px;font-weight: 560;">
              <p>班级总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.gradesCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top: 10px">
      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-xueshengguanli-"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c; font-size: 20px;font-weight: 560;">
              <p>学生总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.studentCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <div style="display: flex">
            <div>
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-kecheng"></use>
              </svg>
            </div>
            <div style="flex: 1"></div>
            <div style="line-height: 45px; height: 45px;color: #8c8c8c;  font-size: 20px;font-weight: 560;">
              <p>课程总数</p>
              <count-to
                :start-val="0"
                :end-val="tableData.coursesCount"
                :duration="2600"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row class="echarts-line">
      <div id="echarts-line" style="width: 100%;height:calc(100vh - 420px); background-color: #fff; margin-top: 30px;padding-top: 28px;" />
    </el-row> -->
  </div>
</template>

<script>
import * as echarts from 'echarts'
import CountTo from 'vue-count-to'

export default {
  components: { CountTo },
  data() {
    return {
      tableData: [],
      // myChart:null
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      // index().then((resp) => {
      //   this.tableData = resp.response
        // this.myChart.setOption(this.option(['1','2','3','4','5'],['2','3','4','5','5']))
      // })
    },
    // option(label,value) {
    //   return{
    //   title: {
    //     text: '日考试数量折线图',
    //     x:'center',
    //     y:'top',
    //     textAlign:'center'
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data:label
    //   },
    //   yAxis: {
    //     data:['0','2','4','6','8','10']
    //   },
    //   series: [
    //     {
    //       name: '考试数量',
    //       type: 'line',
    //       data: value
    //     }
    //   ]
    // }
    // }
  },
  mounted() {
    // this.myChart = echarts.init(document.getElementById('echarts-line'))
  }
}
</script>



<style scoped>
</style>