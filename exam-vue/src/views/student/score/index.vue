<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="18">
        <el-table
          :data="tableData"
          fit
          highlight-current-row
          style="width: 100%"
          @row-click="itemSelect"
        >
          <el-table-column prop="id" label="序号" width="90px" />
          <el-table-column prop="paperName" label="名称" />
          <el-table-column prop="courseName" label="课程" width="120" />
          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="100px"
          >
            <template slot-scope="{ row }">
              <el-tag v-if="row.status === '2'" type="success"> 完成 </el-tag>
              <el-tag v-if="row.status === '1'" type="warning"> 待批改 </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="提交时间" width="170" />
          <el-table-column width="70">
            <template slot-scope="{ row }">
              <el-button v-if="row.status === '1'" type="text" size="small"
                >待批改</el-button
              >
              <router-link
                target="_blank"
                :to="{ path: '/answer/correct', query: { id: row.id } }"
                v-if="row.status === '2'"
              >
                <el-button type="text" size="small">查看试卷</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="6">
        <el-card >
          <el-empty
            v-if="selectItem == null"
            description="暂无数据"
          ></el-empty>
          <el-form label-width="50%" v-else>
            <el-form-item label="最终得分：">
              <span>{{ selectItem.userScore }}</span>
            </el-form-item>
            <el-form-item label="试卷总分：">
              <span>{{ selectItem.paperScore }}</span>
            </el-form-item>
            <el-form-item label="正确题数：">
              <span>{{ selectItem.questionCorrect }}</span>
            </el-form-item>
            <el-form-item label="总题数：">
              <span>{{ selectItem.questionCount }}</span>
            </el-form-item>
            <el-form-item label="用时：">
              <span>{{ selectItem.doTime }}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import api from '@/api/student'
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      selectItem: {
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      api.myScore(this.queryParam).then((resp) => {
        this.tableData = resp.data.list
        this.total = resp.data.total
        this.queryParam.pageIndex = resp.data.pageNum
        if (resp.data.total>0) {
          this.selectItem = resp.data.list[0]
        } else {
          this.selectItem = null
        }
      })
    },
    itemSelect(row, column, event) {
      this.selectItem = row
    }
  }
}
</script>

<style scoped>
</style>
