<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :http-request="uploadHttpRequest"
    multiple
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <el-avatar v-if="url!==''" :size="100" :src="url" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import api from '@/api'
export default {
  props: ['currentUser'],
  data() {
    return {
      url:
        this.currentUser.avatar === ''
          ? null
          : 'http://localhost:8088/image/userAvatar/' + this.currentUser.avatar,
       file:null   
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.file = file
      return isJPG && isLt2M
    },
    uploadHttpRequest() {
      const formData = new FormData()
      formData.append('file', this.file)
      api.avatorEdit(formData).then((resp) => {
        this.file = null
        this.$store.commit('SET_USERINFO',resp.data.data)
      })
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>