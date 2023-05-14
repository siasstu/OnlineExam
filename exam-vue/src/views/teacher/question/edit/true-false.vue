<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="课程：" prop="courseId">
        <el-select v-model="form.courseId" placeholder="课程">
          <el-option
            v-for="item in courseType"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题干：" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="选项：">
        <el-form-item
          :label="item.prefix"
          :key="item.prefix"
          v-for="item in form.items"
          label-width="50px"
        >
          <el-input v-model="item.content" style="width: fit-content" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="正确答案：" prop="correct">
        <el-radio-group v-model="form.correct">
          <el-radio
            v-for="item in form.items"
            :key="item.prefix"
            :label="item.prefix"
            >{{ item.prefix }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="$router.push('/teacher/question')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/teacher'
export default {
  data() {
    return {
      form: {
        id: null,
        questionType: 3,
        courseId: null,
        title: '',
        items: [
          { id: null, prefix: 'A', content: '是' },
          { id: null, prefix: 'B', content: '否' }
        ],
        correct: '',
        score: ''
      },
      courseType: [],
      rules: {
        courseId: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        title: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        correct: [{ required: true, message: '请选择答案', trigger: 'blur' }]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    api.getMyTeachCourseList().then(resp => {
      this.courseType = resp.data
    })
    if (id && parseInt(id) !== 0) {
      api.getQuestionById(id).then((resp) => {
        this.form = resp.data
      })
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.questionEdit(this.form).then((resp) => {
            this.$router.push('/teacher/question')
            this.$message.success('操作成功')
          })
        }
      })
    }
  }
}
</script>
