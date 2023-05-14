<template>
  <el-row>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="姓名：">
        <el-input
          v-model="queryParam.realName"
          placeholder="姓名"
          size="medium"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="学号：">
        <el-input
          v-model="queryParam.username"
          placeholder="学号"
          size="medium"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSelect">查询</el-button>
        <el-button type="primary" @click="handleDialogValue(null)" size="medium"
          >新增</el-button
        >
        <el-button type="success" size="medium" @click="downloadTemplate"
          >下载模板</el-button
        >
        <el-upload
          style="display: inline-block"
          class="upload-demo"
          action="#"
          :http-request="uploadHttpRequest"
          multiple
          :limit="1"
          accept=".xlsx,.xls"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :before-upload="beforeUpload"
        >
          <el-button type="primary" size="medium" style="margin-left: 10px"
            >批量导入</el-button
          >
        </el-upload>
        <el-button
          type="primary"
          size="medium"
          @click="handleExport"
          style="margin-left: 10px"
          >批量导出</el-button
        >
        <el-popconfirm
          title="您确定批量删除这些记录吗？"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" style="margin-left: 10px" size="medium"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import api from '@/api/admin'

export default {
  props: ['ids'],
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      file: null,
      fileList: [],
    }
  },
  methods: {
    handleSelect() {
      this.$emit('initUserList',this.queryParam)
    },
    handleDialogValue(val) {
      this.$emit('handleEdit', val)
    },
    handleDelete() {
      this.$emit('handleDelete', null)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeUpload(file) {
      this.file = file
    },
    uploadHttpRequest() {
      const formData = new FormData()
      formData.append('file', this.file)
      api.fileUpload(formData).then((resp) => {
        this.fileList = []
        this.file = null
        this.$message.success('导入成功')
        this.$emit('initUserList')
      })
    },
    downloadTemplate() {
      api.exportUser(this.ids).then((response) => {
        let blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        let elink = document.createElement('a')
        elink.download = '导入模板.xlsx'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
        window.URL.revokeObjectURL(elink)
        this.$message.success('下载完成')
      })
    },
    handleExport() {
      if (this.ids.length === 0) {
        this.$message.error('请先选择导出用户！！')
        return false
      }
      api.exportUser(this.ids).then((response) => {
        let blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        let elink = document.createElement('a')
        elink.download = '用户信息.xlsx'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
        window.URL.revokeObjectURL(elink)
        this.$message.success('导出成功')
        this.$emit('clearSelection')
      })
    }
  }
}
</script>