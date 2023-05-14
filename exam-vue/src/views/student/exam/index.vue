<template>
  <div style="
  display: flex;
  flex-wrap: wrap;
  justify-content: center;">
    <el-empty v-if="tableData.length === 0" description="暂无考试"></el-empty>
    <div v-for="item in tableData" :key="item.id">
      <el-card class="card">
        <template>
          <el-col v-show="false">编号 {{ item.id }}</el-col>
          <el-col>课程名称：{{ item.courseName }}</el-col>
          <el-col>考试名称：{{ item.title }}</el-col>
          <el-col>考试时间：{{ item.time }} 分钟</el-col>
          <el-col>开始时间：{{ item.startTime }} </el-col>
          <el-col>结束时间：{{ item.endTime }} </el-col>
          <el-button
            type="success"
            style="width: 100%; padding-top: 10px; margin-top: 10px"
            v-if="
              judgment(item.startTime) < 0 &&
              judgment(item.endTime) > 0 &&
              item.status === 0
            "
            @click="
              $router.push({
                path: '/exam/paper',
                query: { id: item.paperId, time: item.time, examId: item.id }
              })
            "
            >进入考试
          </el-button>
          <router-link
            target="_blank"
            :to="{ path: '/answer/correct', query: { id: item.id } }"
          >
            <el-button
              type="info"
              style="width: 100%; padding-top: 10px; margin-top: 10px"
              v-if="item.status === 2"
              >查看详情
            </el-button>
          </router-link>

          <el-button
            type="success"
            style="width: 100%; padding-top: 10px; margin-top: 10px"
            v-if="item.status === 1"
            >考试完成
          </el-button>
          <el-button
            type="info"
            style="width: 100%; padding-top: 10px; margin-top: 10px"
            v-if="judgment(item.startTime) > 0"
            @click="$alert('考试尚未开始')"
            >未开始</el-button
          >
          <el-button
            type="info"
            style="width: 100%; padding-top: 10px; margin-top: 10px"
            v-if="judgment(item.endTime) < 0 && item.status === 0"
            >以超时</el-button
          >
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import api from '@/api/student'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      api.myExams().then((resp) => {
        this.tableData = resp.data
      })
    },
    judgment(time) {
      var timestamp1 = new Date(time).getTime()
      var timestamp2 = new Date().getTime()
      var d = timestamp1 - timestamp2
      return d
    },
  },

}
</script>

<style scoped>
.container {
  padding: 0 20px;
  margin: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  width: 360px;
  height: 315px;
  margin: 20px 10px;
  background-color: #fff;
}
.el-col {
  font-size: 17px;
  padding: 10px 0;
}
</style>