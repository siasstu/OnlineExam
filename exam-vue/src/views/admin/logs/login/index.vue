<template>
  <div>
    <handleButton @initList="search" @handleDelete="handleDelete"/>
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      row-key="id"
      stripe
      style="width: 100%"
    >
      <el-table-column
        reserve-selection
        type="selection"
        align="center"
        width="60"
        style="text-align: center"
        :selectable="checkSelectable"
      />
      <el-table-column prop="id" label="编号" width="60"/>
      <el-table-column prop="username" label="学号/工号" width="130"/>
      <el-table-column prop="ip" label="IP地址" width="120"/> 
      <el-table-column prop="location" label="登录地址" width="100"/>
      <el-table-column prop="browser" label="浏览器"  width="100"/>
      <el-table-column prop="os" label="操作系统"  width="280"/> 
      <el-table-column prop="status" label="状态" align="center" width="65"> 
        <template slot-scope="{ row }">
          <el-tag
            size="small"
            :type="row.status===1?'danger':'success'"
            >{{ row.status===1?'失败':'成功' }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="登录时间" width="160"/> 
      <el-table-column prop="info" label="登录详情" width="200" />
      <el-table-column fixed="right" label="操作" align="center" width="330">
        <template slot-scope="scope">
          <el-popconfirm
            title="您确定要删除这条记录吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                style="margin-left: 5px"
                type="danger"
                icon="el-icon-delete-solid"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :queryParam="queryParam"
      :pageIndex.sync="queryParam.pageIndex"
      :pageSize.sync="queryParam.pageSize"
      @pagination="search"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import handleButton from '../components/handleButton.vue'
import api from '@/api/admin'
export default {
  components:{Pagination,handleButton},
  data() {
    return {
      tableData: [],
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      ids: []
    }
  },
  created() {
    this.search()
  },
  methods: {
    search(query) {
      if (query != null) {
        this.queryParam = query
      }
      api.loginLog(this.queryParam).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.data.list
          this.total = resp.data.total
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    checkSelectable() {
      return true
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
    },
    handleDelete(id) {
      if (id != null) {
        if (this.ids.findIndex((item) => item === id) == -1) {
          this.ids.push(id)
        }
      }
      if (this.ids.length === 0) {
        this.$message.error('请先选择删除登录记录！！')
        return false
      }
      api.removeUserLoginLogByIds(this.ids).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('删除成功')
          this.search()
          this.clearSelection()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.ids = []
    },
  }
}
</script>

<style scoped>
</style>