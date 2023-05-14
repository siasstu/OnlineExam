<template>
  <div
    class="app-container"
    style="overflow: hidden; padding: 10px; height: 100vh"
  >
    <el-row :gutter="24">
      <el-col :span="4" :xs="24" style="margin-bottom: 15px">
        <el-card class="content-h">
          <p class="card-title">答题卡</p>
          <el-row :gutter="24" class="card-line" style="padding-left: 10px">
            <el-tag type="danger">错误</el-tag>
            <el-tag type="success">正确</el-tag>
            <el-tag type="info">未批改</el-tag>
          </el-row>
          <div v-if="tabaleData !== undefined && tabaleData.length > 0">
            <!-- <p class="card-title">单选题</p> -->
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in tabaleData"
                :key="index"
                :type="cardItemClass(item.questionId)"
              >
                {{ index + 1 }}</el-tag
              >
            </el-row>
          </div>
        <el-button v-if="status =='待批改'" @click="submit()" type="success">提交</el-button>
        </el-card>
      </el-col>

      <el-col
        :span="20"
        :xs="24"
        style=" padding: 0 20px 20px 20px;box-shadow: 0 1px 4px rgb(0 21 41 / 8%);"
      >
        <el-scrollbar style="height: calc(100vh)">
          <div
            v-for="(question, index) in tabaleData"
            :key="index"
            style="border-bottom: solid 1px #ccc; padding-bottom: 20px"
          >
            <p
              style="font-size: 20px; margin: 10px 0"
              v-if="question.questionVM.titleContent"
            >
              {{ index + 1 }}.{{ question.questionVM.titleContent }}
            </p>
            <div
              v-if="question.questionType === 1 || question.questionType === 3"
              style="display: flex"
              disabled
            >
              <el-radio-group v-model="question.answer" style="width: 500px;padding-left: 12px;">
                <el-radio
                  v-for="(item, index) in question.questionVM
                    .questionEditItemVMS"
                  :key="index"
                  :label="item.prefix"
                  disabled
                  >{{ item.prefix }}.{{ item.content }}
                </el-radio>
              </el-radio-group>
              <div  style=" padding-left: 50px;">
                <p>正确答案：{{ question.correct }}</p>
                <p>
                  结果：<el-button
                    v-if="question.doRight === 1"
                    type="success"
                    size="mini"
                    >正确</el-button
                  >
                  <el-button
                    v-if="question.doRight === 0"
                    type="danger"
                    size="mini"
                    >错误</el-button
                  >
                </p>
                <p>得分：{{ question.score }}</p>
                <p>题分：{{ question.questionScore }}</p>
              </div>
            </div>
            <div v-if="question.questionType === 2" style="display: flex">
              <el-checkbox-group v-model="question.answerList" style="width: 500px;padding-left: 12px;">
                <el-checkbox
                  v-for="(item, index) in question.questionVM
                    .questionEditItemVMS"
                  :key="index"
                  disabled
                  :label="item.prefix"
                  >{{ item.prefix }}.{{ item.content }}
                </el-checkbox>
              </el-checkbox-group>
              <div style=" padding-left: 50px;">
                <p>正确答案：{{ question.correct }}</p>
                <p>
                  结果：<el-button
                    v-if="question.doRight === 1"
                    type="success"
                    size="mini"
                    >正确</el-button
                  >
                  <el-button
                    v-if="question.doRight === 0"
                    type="danger"
                    size="mini"
                    >错误</el-button
                  >
                </p>
                <p>得分：{{ question.score }}</p>
                <p>题分：{{ question.questionScore }}</p>
              </div>
            </div>
            <div
              v-if="question.questionType === 4 || question.questionType === 5"
            >
              <el-input
                style="width: 500px ;padding-left: 12px;"
                type="textarea"
                autosize
                disabled
                v-model="question.answer"
              />
              <div style=" padding-left: 14px;">
                <p>
                  正确答案：<span style=" font-size: 30px; color: green;">{{
                    question.correct
                  }}</span>
                </p>
                <p>
                  结果：<el-button
                    v-if="question.doRight === 1"
                    type="success"
                    size="mini"
                    >正确</el-button
                  >
                  <el-button
                    v-if="question.doRight === 0"
                    type="danger"
                    size="mini"
                    >错误</el-button
                  ><el-button v-if="question.doRight === 2" type="info" size="mini">待批改</el-button>
                </p>
                <p>得分：
                  <el-select v-model="question.score" @change="changeSorce(index)" placeholder="1456" size="mini" clearable>
                      <el-option  v-for="index in question.questionScore+1" :key="index" :value="index-1" :label="index-1"></el-option>
                </el-select></p>
                <p>题分：{{ question.questionScore }}</p>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/teacher'

export default {
  data() {
    return {
      tabaleData: [],
      form: {
        id: null,
        examPaperResponseItemVMS:[]
      },
      examGradeId: null,
      gradeId: null,
      status:null
    }
  },
  created() {
    let id = this.$route.query.id
    this.form.id = id
    this.gradeId = this.$route.query.gradeId
    this.examGradeId = this.$route.query.examGradeId
    this.status = this.$route.query.status
    console.log(this.form.id);
    this.search(id)
  },
  methods: {
    cardItemClass(questionId) {
      if (
        this.tabaleData.find((item) => item.questionId === questionId)
          .doRight === 1
      ) {
        return 'success'
      } else if (
        this.tabaleData.find((item) => item.questionId === questionId)
          .doRight === 0
      ) {
        return 'danger'
      } else {
        return 'info'
      }
    },
    handSave() {},
    async search(id) {
      await api.selectStudentPaperAnswers(id).then((resp) => {
        this.tabaleData = resp.data
      })
    },
    changeSorce(index) {
      if (this.tabaleData[index].score > 0) {
        this.tabaleData[index].doRight = 1
      } else {
        this.tabaleData[index].doRight = 0
      }
    },
    submit() {
      this.form.examPaperResponseItemVMS = this.tabaleData
      console.log(this.form.examPaperResponseItemVMS);
      console.log(this.form);
      api.correctPaper(this.form).then(resp => {
        this.$router.push({path:'/answer/edit',query:{gradeId:this.gradeId,examGradeId:this.examGradeId}})
        this.$message.success("批改完成")
      })
    }
  }
}
</script>

<style scoped>
.qu-content div {
  line-height: 30px;
  width: 100%;
}

.el-checkbox-group label,
.el-radio-group label {
  width: 100%;
}

.content-h {
  height: calc(100vh - 23px);
  overflow-y: auto;
}

.card-title {
  background: #eee;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}
.card-line {
  padding-left: 10px;
}
.card-line span {
  cursor: pointer;
  margin: 2px;
}

::v-deep .el-radio,
.el-checkbox {
  padding: 9px 20px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-bottom: 10px;
  width: 100%;
}

.is-checked {
  border: #409eff 1px solid;
}

.el-radio img,
.el-checkbox img {
  max-width: 200px;
  max-height: 200px;
  border: #dcdfe6 1px dotted;
}

::v-deep .el-checkbox__inner {
  display: none;
}

::v-deep .el-radio__inner {
  display: none;
}

::v-deep .el-checkbox__label {
  line-height: 30px;
}

::v-deep .el-radio__label {
  line-height: 30px;
}
</style>

