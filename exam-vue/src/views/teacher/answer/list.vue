<template>
 <div>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="班级：" prop="gradeId" >
        <el-select v-model="queryParam.gradeId" placeholder="班级" clearable>
          <el-option v-for="item in gradeType" :key="item.id" :value="item.id" :label="item.name"></el-option>
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
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column label="Id" width="50">
            <template scope="scope">
              {{
                (queryParam.pageIndex - 1) * queryParam.pageSize +
                (scope.$index + 1)
              }}
            </template>
          </el-table-column>
      <el-table-column prop="examGradeId" v-if="false"  label="id" />
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="name" label="班级" width="180"/>
      <el-table-column prop="courseName" label="课程"  width="180"/>
      <el-table-column prop="correctingNumber" label="待批改数" align="center" width="130px"/>
      <el-table-column prop="finishedNumber" label="完成人数" align="center"  width="130px"/>
      <el-table-column prop="classNumber" label="考试人数" align="center"  width="130px" />
      <el-table-column prop="examTime" label="考试时间" width="160px"/>
      <el-table-column  label="操作" align="center"  width="160px">
      <template slot-scope="{row}">
          <el-button size="mini" @click="$router.push({path:'/answer/edit',query:{examGradeId:row.examGradeId,gradeId:row.gradeId}})" >详情</el-button>
      </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :qeryParam="queryParam" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
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
    api.getCourseList().then((resp) => (this.courseType = resp.response))
    api.getMyCourseClassList().then(resp => this.gradeType = resp.response)
    this.search()
  },
  methods: {
    search () {
      api.selectReleaseExamPaper(this.queryParam).then(resp => {
        const re = resp.data
        this.tableData = re
        this.total = re.length
      })
    },
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },

    gradeFormatter(row) {
      return this.courseTypeQ(this.gradeType, row.gradeId)
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
  },
}
</script>
