<template>
  <div>
    <el-form :model="queryParam" :inline="true">
      <el-form-item label="试卷ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="课程：">
        <el-select v-model="queryParam.courseId" clearable>
          <el-option
            v-for="item in courseType"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="margin-right: 15px"
          >查询</el-button
        >
        <el-popover placement="bottom" trigger="click">
          <el-button
            type="warning"
            size="mini"
            @click="$router.push({ path: '/paper/edit' })"
            >手动组卷
          </el-button>
          <el-button type="warning" size="mini" @click="showDialog = true"
            >自动组卷
          </el-button>
          <el-button slot="reference" type="primary" class="link-left"
            >添加试卷</el-button
          >
        </el-popover>
        <!-- <router-link :to="{ path: '/paper/edit' }" class="link-left">
          <el-button type="primary">添加试卷</el-button>
        </router-link> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="Id" width="90px" />
      <el-table-column
        prop="subjectId"
        label="课程"
        :formatter="courseFormatter"
        width="140px"
      />
      <el-table-column prop="name" label="试卷名称" />
      <el-table-column prop="questionCount" label="题目数量" width="80px" />
      <el-table-column prop="score" label="总分" width="80px" />
      <el-table-column
        prop="suggestTime"
        :formatter="timeFormatter"
        label="建议时间"
        width="130px"
      />
      <el-table-column prop="createUser" label="创建人" width="160px" />
      <el-table-column prop="createTime" label="创建时间" width="160px" />
      <el-table-column label="操作" align="center" width="160px">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            @click="
              $router.push({ path: '/paper/edit', query: { id: row.id } })
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deletePaper(row)"
            class="link-left"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :queryParam="queryParam"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="search"
    />
    <el-dialog :visible.sync="showDialog" title="自动组卷" width="33%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="课程：" prop="courseId" label-width="90px">
          <el-select v-model="form.courseId" clearable>
            <el-option
              v-for="item in courseType"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷名称：" prop="courseId" label-width="90px">
          <el-input v-model="form.paperName"></el-input>
        </el-form-item>
        <el-form-item label="单选题：" label-width="90px">
          <div style="display: flex">
            <div style="width: 250px">
              <el-slider
                v-model="form.singleChoice"
                :step="1"
                :max="20"
                show-stops
              >
              </el-slider>
            </div>
            <div>
              <el-form-item label="每题分数">
                <el-input
                  v-model="form.singleChoiceScore"
                  size="mini"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="多选题：" label-width="90px">
          <div style="display: flex">
            <div style="width: 250px">
              <el-slider
                v-model="form.multipleChoice"
                :step="1"
                :max="20"
                show-stops
              >
              </el-slider>
            </div>
            <div>
              <el-form-item label="每题分数">
                <el-input
                  v-model="form.multipleChoiceScore"
                  size="mini"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="判断题：" label-width="90px">
          <div style="display: flex">
            <div style="width: 250px">
              <el-slider
                v-model="form.trueFalse"
                :step="1"
                :max="20"
                show-stops
              >
              </el-slider>
            </div>
            <div>
              <el-form-item label="每题分数">
                <el-input v-model="form.trueFalseScore" size="mini"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="填空题：" label-width="90px">
          <div style="display: flex">
            <div style="width: 250px">
              <el-slider
                v-model="form.gapFilling"
                :step="1"
                :max="20"
                show-stops
              >
              </el-slider>
            </div>
            <div>
              <el-form-item label="每题分数">
                <el-input v-model="form.gapFillingScore" size="mini"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="简答题：" label-width="90px">
          <div style="display: flex">
            <div style="width: 250px">
              <el-slider
                v-model="form.shortAnswer"
                :step="1"
                :max="20"
                show-stops
              >
              </el-slider>
            </div>
            <div>
              <el-form-item label="每题分数">
                <el-input
                  v-model="form.shortAnswerScore"
                  size="mini"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="建议时长：" prop="courseId" label-width="90px">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import api from '@/api/teacher/index'
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        id: null,
        level: null,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10
      },
      courseType: [],
      total: 0,
      tableData: [],
      showDialog: false,
      form: {}
    }
  },
  created() {
    api.getCourseList().then((resp) => {
      this.courseType = resp.data
      this.search()
    })
  },
  methods: {
    submitForm() {
      this.queryParam.pageIndex = 1
      this.search()
    },
    search() {
      api.paperPage(this.queryParam).then((resp) => {
        this.tableData = resp.data.list
        this.total = resp.data.total
      })
    },
    deletePaper(row) {
      deletePaperById(row.id).then((resp) => {
        this.$message.success('删除成功')
        this.search()
      })
    },
    courseFormatter(row) {
      return this.courseTypeQ(this.courseType, row.courseId)
    },
    courseTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    },
    timeFormatter(row) {
      return this.objectToSting(row.suggestTime, '(分钟)')
    },
    objectToSting(id, sting) {
      return id + sting
    },
    handleClose() {
      this.showDialog = false
    },
    handleConfirm() {
      api.autoCreatePaper(this.form).then((resp) => {
          if (resp.code==200) {
            this.search()
        this.form={}
        this.showDialog = false
        this.$message.success("生成成功")
          } else {
            this.$message.error(resp.message)
          }
      })
    }
  }
}
</script>
