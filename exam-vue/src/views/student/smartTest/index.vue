<template>
  <div style=" display: flex; ">
    <div style="width: 400px; height: 420px; border: solid 1px #ddd">
      <el-form
        :model="paramData"
        ref="paramData"
        :inline="true"
        size="small"
        style="margin: 22px 0 0 20px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item
          label="课程："
          prop="courseId"
          label-width="80px"
        >
          <el-select v-model="paramData.courseId" clearable>
            <el-option
              v-for="item in courseType"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单选题：" label-width="80px">
          <div style="width: 250px">
            <el-slider
              v-model="paramData.singleChoice"
              :step="1"
              :max="20"
              show-stops
            >
            </el-slider>
          </div>
        </el-form-item>
        <el-form-item label="多选题：" label-width="80px">
          <div style="width: 250px">
            <el-slider
              v-model="paramData.multipleChoice"
              :step="1"
              :max="20"
              show-stops
            >
            </el-slider>
          </div>
        </el-form-item>
        <el-form-item label="判断题：" label-width="80px">
          <div style="width: 250px">
            <el-slider
              v-model="paramData.trueFalse"
              :step="1"
              :max="20"
              show-stops
            >
            </el-slider>
          </div>
        </el-form-item>
        <el-form-item label="填空题：" label-width="80px">
          <div style="width: 250px">
            <el-slider
              v-model="paramData.gapFilling"
              :step="1"
              :max="20"
              show-stops
            >
            </el-slider>
          </div>
        </el-form-item>
        <el-form-item label="简答题：" label-width="80px">
          <div style="width: 250px">
            <el-slider
              v-model="paramData.shortAnswer"
              :step="1"
              :max="20"
              show-stops
            >
            </el-slider>
          </div>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submitForm">生成试卷</el-button>
      </div>
    </div>
    <div
      style="margin-left: 20px; flex: 1; height: 710px; border: solid 1px #ddd"
    >
      <div
        style="
          height: 50px;
          line-height: 50px;
          border-bottom: solid 1px #ddd;
          padding-left: 20px;
        "
      >
        智能训练记录
      </div>
      <el-empty v-if="tableData.length === 0" description="暂无数据">
      </el-empty>
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column
          prop="courseId"
          :formatter="courseFormatter"
          label="学科"
          width="120"
        >
        </el-table-column>
        <el-table-column width="100">
          <template slot-scope="{ row }">
            <router-link
              target="_blank"
              :to="{ path: '/exam/paper', query: { id: row.id } }"
            >
              <el-button type="text" size="small">开始测试</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import teachApi from '@/api/teacher'
import api from '@/api/student'
export default {
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      paramData: {},
      courseType: [],
      tableData: [],
      rules: {
        courseId: [{ required: true, message: '请选择课程', trigger: 'blur' }]
      },
      total: 0
    }
  },
  created() {
    teachApi.getCourseList().then((resp) => (this.courseType = resp.data))
    this.search()
  },
  methods: {
    search() {
      api.getTestPage(this.queryParam).then((resp) => {
        this.tableData = resp.data.list
        this.total = resp.data.total
      })
    },
    submitForm() {
      this.$refs.paramData.validate((valid) => {
        if (valid) {
          if (
            this.paramData.singleChoice +
              this.paramData.shortAnswer +
              this.paramData.gapFilling +
              this.paramData.multipleChoice +
              this.paramData.trueFalse ===
            0
          ) {
            this.$message.error('请至少选择一题')
          } else {
            api.getTest(this.paramData).then((resp) => {
              if (resp.code !== 200) {
                this.$message.error(resp.message)
              } else {
                this.$message.success('试卷生成成功')
                this.search()
                this.paramData={}
              }
            })
          }
        }
      })
    },
    courseTypeTo(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    },
    courseFormatter(row) {
      return this.courseTypeTo(this.courseType, row.courseId)
    }
  }
}
</script>

<style scoped>
</style>