<template>
  <div>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="班级：" prop="gradeId" >
        <el-select v-model="queryParam.gradeId" placeholder="班级" clearable>
          <el-option v-for="item in gradeType" :key="item.id" :value="item.id" :label="item.className"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程：" prop="courseId">
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
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button type="primary" @click="$router.push('/release/exam/edit')">添加考试</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id"  width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="gradeId" label="班级"  width="180" :formatter="gradeFormatter"/>
      <el-table-column prop="courseId" label="课程" width="180" :formatter="courseFormatter"/>
      <el-table-column prop="startTime" label="开始时间" width="160"/>
      <el-table-column prop="endTime" label="结束时间" width="160"/>
      <el-table-column prop="time" label="限制时间" :formatter="timeFormatter" width="100"/>
      <el-table-column prop="createTime" label="发布时间" width="160px"/>
      <el-table-column  label="操作" align="center"  width="160px">
        <template slot-scope="{row}">
          <el-button size="mini" @click="$router.push({path:'/release/exam/edit',query:{id:row.id}})" >编辑</el-button>
          <el-button size="mini"  type="danger" @click="deleteExam(row)" class="link-left">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                @pagination="search"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import api from '@/api/teacher'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        gradeId: null,
        courseId:null,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      courseType: [],
      gradeType: [],
    }
  },
  created() {
    api.getMyTeachCourseList().then((resp) => (this.courseType = resp.data))
    api.getMyCourseClassList().then(resp => this.gradeType = resp.data)
    this.search()
  },
  methods: {
    search () {
      api.releaseExamPage(this.queryParam).then(resp => {
        const re = resp.data
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
      })
    },
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },
    deleteExam (row) {
      deleteReleaseExam(row.id).then(resp => {
          this.search()
          this.$message.success("操作成功")
      })
    },
    courseFormatter(row) {
      return this.courseTypeQ(this.courseType, row.courseId)
    },
    gradeFormatter(row) {
      return this.courseClassType(this.gradeType, row.gradeId)
    },
    timeFormatter(row) {
      return this.objectToSting(row.time,"(分钟)")
    },
    objectToSting(id, sting) {
      return id+sting
    },
    courseTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    },
    courseClassType(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.className
        }
      }
    },
  },
}
</script>
