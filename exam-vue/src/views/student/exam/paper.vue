<template>
  <div
    class="app-container"
    style="overflow: hidden; padding: 10px; height: 100vh"
  >
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          距离考试结束还有：
          <exam-timer :time="time" @timeout="doHandler()" />

          <el-button
            style="float: right; margin-top: -10px"
            type="primary"
            icon="el-icon-plus"
            @click="handHandExam()"
          >
            {{ handleText }}
          </el-button>
        </el-card>
      </el-col>

      <el-col :span="4" :md="5" :xs="24" style="margin-bottom: 15px">
        <el-card class="content-h">
          <p class="card-title">答题卡</p>
          <el-row :gutter="24" class="card-line" style="padding-left: 10px">
            <el-tag type="info">未作答</el-tag>
            <el-tag type="success">已作答</el-tag>
          </el-row>

          <div v-if="aQuestions !== undefined && aQuestions.length > 0">
            <p class="card-title">单选题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in aQuestions"
                :key="index"
                :type="cardItemClass(item.id)"
                @click="handSave(index)"
              >
                {{ index + 1 }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="bQuestions !== undefined && bQuestions.length > 0">
            <p class="card-title">多选题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in bQuestions"
                :key="index"
                :type="cardItemClass(item.id)"
                @click="handSave(index + a)"
              >
                {{ index + 1 + a }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="cQuestions !== undefined && cQuestions.length > 0">
            <p class="card-title">判断题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in cQuestions"
                :key="index"
                :type="cardItemClass(item.id)"
                @click="handSave(index + a + b)"
              >
                {{ index + 1 + a + b }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="dQuestions !== undefined && dQuestions.length > 0">
            <p class="card-title">填空题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in dQuestions"
                :key="index"
                :type="cardItemClass(item.id)"
                @click="handSave(index + a + b + c)"
              >
                {{ index + 1 + a + b + c }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="eQuestions !== undefined && eQuestions.length > 0">
            <p class="card-title">简答题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in eQuestions"
                :key="index"
                :type="cardItemClass(item.id)"
                @click="handSave(index + a + b + c + d)"
              >
                {{ index + 1 + a + b + c + d }}</el-tag
              >
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="20" :md="19" :xs="24">
        <el-card
          class="qu-content content-h"
          v-for="(question, index) in tableData"
          :key="index"
          v-show="index === i"
        >
          <p style="font-size: 20px; margin: 10px 0" v-if="question.title">
            {{ index + 1 }}.{{ question.title }}
          </p>
          <div
            v-if="question.questionType === 1 || question.questionType === 3"
          >
            <el-radio-group v-model="radioValue" @change="updateAswerList">
              <el-radio
                v-for="(item, index) in question.items"
                :key="index"
                :label="item.prefix"
                >{{ item.prefix }}.{{ item.content }}
              </el-radio>
            </el-radio-group>
          </div>

          <div v-if="question.questionType === 2">
            <el-checkbox-group v-model="multiValue" @change="updateAswerList">
              <el-checkbox
                v-for="(item, index) in question.items"
                :key="index"
                :label="item.prefix"
                >{{ item.prefix }}.{{ item.content }}
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="question.questionType === 4">
            <el-input v-model="shortAnswerValue" @change="updateAswerList" />
          </div>
          <div v-if="question.questionType === 5">
            <el-input v-model="shortAnswerValue" @change="updateAswerList" />
          </div>
          <div style="margin-top: 20px">
            <el-button
              v-if="showPrevious"
              type="primary"
              icon="el-icon-back"
              @click="handPrevious()"
            >
              上一题
            </el-button>

            <el-button
              v-if="showNext"
              type="warning"
              icon="el-icon-right"
              @click="handNext()"
            >
              下一题
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import teachApi from '@/api/teacher'
import api from '@/api/student'
import ExamTimer from '@/views/student/exam/components'

export default {
  name: 'ExamProcess',
  components: { ExamTimer },
  data() {
    return {
      showPrevious: false,
      showNext: true,
      handleText: '交卷',
      radioValue: '',
      multiValue: [],
      time: 0,
      shortAnswerValue: '',
      answeredIds: [],
      form: {
        id: null,
        answerList: [],
        doTime: 0,
        examGradeId:null
      },
      i: 0,
      tableData: [],
      titleItems: [],
      aQuestions: [],
      bQuestions: [],
      cQuestions: [],
      dQuestions: [],
      eQuestions: [],
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      total: 0,
      paperInfo: [],
      startTime: 0,
    }
  },
  created() {
    let id = this.$route.query.id
    this.form.id = this.$route.query.id
    this.form.examGradeId = this.$route.query.examId
    this.time = this.$route.query.time
    if (id && parseInt(id) !== 0 && this.time!==undefined) {
      teachApi.getPaperById(id).then((resp) => {
        this.paperInfo = resp.data
        this.titleItems = resp.data.titleItems
        for (let questionType of this.titleItems) {
          if (questionType.name == '单选题') {
            this.aQuestions = questionType.questionItems
            this.aQuestions.score = questionType.score
          } else if (questionType.name == '多选题') {
            this.bQuestions = questionType.questionItems
          } else if (questionType.name == '判断题') {
            this.cQuestions = questionType.questionItems
          } else if (questionType.name == '填空题') {
            this.dQuestions = questionType.questionItems
          } else {
            this.eQuestions = questionType.questionItems
          }
        }
        this.a = this.aQuestions.length
        this.b = this.bQuestions.length
        this.c = this.cQuestions.length
        this.d = this.dQuestions.length
        this.e = this.eQuestions.length
        this.total = this.a + this.b + this.c + this.d + this.e
        this.tableData = this.tableData
          .concat(this.aQuestions)
          .concat(this.bQuestions)
          .concat(this.cQuestions)
          .concat(this.dQuestions)
          .concat(this.eQuestions)
        this.startTime = new Date()
      })
    } else {
      api.getTestPaperById(id).then((resp) => {
        this.paperInfo = resp.data
        this.titleItems = resp.data.titleItems
        for (let questionType of this.titleItems) {
          if (questionType.name == '单选题') {
            this.aQuestions = questionType.questionItems
            this.aQuestions.score = questionType.score
          } else if (questionType.name == '多选题') {
            this.bQuestions = questionType.questionItems
          } else if (questionType.name == '判断题') {
            this.cQuestions = questionType.questionItems
          } else if (questionType.name == '填空题') {
            this.dQuestions = questionType.questionItems
          } else {
            this.eQuestions = questionType.questionItems
          }
        }
        this.a = this.aQuestions.length
        this.b = this.bQuestions.length
        this.c = this.cQuestions.length
        this.d = this.dQuestions.length
        this.e = this.eQuestions.length
        this.total = this.a + this.b + this.c + this.d + this.e
        this.tableData = this.tableData
          .concat(this.aQuestions)
          .concat(this.bQuestions)
          .concat(this.cQuestions)
          .concat(this.dQuestions)
          .concat(this.eQuestions)
        this.startTime = new Date()
      })
    }
  },

  methods: {
    cardItemClass(questionId) {
      if (questionId === this.tableData[this.i].id) {
        return 'warning'
      }

      if (this.form.answerList.find((item) => item.questionId === questionId)) {
        return 'success'
      } else {
        return 'info'
      }
    },

    handSave(id) {
      this.i = id
      this.currentQ()
    },

    currentQ() {
      this.show(this.i)
      if (this.form.answerList.find((item) => item.id === this.i+1)) {
        this.answered = this.form.answerList.find((item) => item.id === this.i+1)
        if (
          this.answered.questionType === 1 ||
          this.answered.questionType === 3
        ) {
          this.radioValue = this.answered.answer
        }
        if (
          this.answered.questionType === 4 ||
          this.answered.questionType === 5
        ) {
          this.shortAnswerValue = this.answered.answer
        }
        if (this.answered.questionType === 2) {
          this.multiValue = this.answered.answer
        }
      } else {
        this.radioValue = ''
        this.multiValue = []
        this.shortAnswerValue = ''
      }
    },

    countNotAnswered() {
      let notAnswered = this.tableData.length - this.form.answerList.length
      return notAnswered
    },

    handNext() {
      this.i = this.i + 1
      this.show(this.i)
      this.currentQ()
    },

    updateAswerList(val) {
      if (this.form.answerList.find((item) => item.id === this.i+1)) {
        let index = this.form.answerList.findIndex((item) => item.id === this.i)
        if (this.i + 1 > this.a && this.i + 1 <= this.a + this.b) {
          this.form.answerList.splice(index, 1, {
            id: this.i+1,
            answer: this.multiValue.sort().join(','),
            questionId: this.tableData[this.i].id,
            itemOrder: this.tableData[this.i].itemOrder,
            questionType: this.tableData[this.i].questionType
          })
        } else if(this.i+1>this.a+this.b+this.c ) {
          this.form.answerList.splice(index, 1, {
            id: this.i+1,
            answer: this.shortAnswerValue,
            questionId: this.tableData[this.i].id,
            itemOrder: this.tableData[this.i].itemOrder,
            questionType: this.tableData[this.i].questionType
          })
        } else {
          this.form.answerList.splice(index, 1, {
            id: this.i+1,
            answer: this.radioValue,
            questionId: this.tableData[this.i].id,
            itemOrder: this.tableData[this.i].itemOrder,
            questionType: this.tableData[this.i].questionType
          })
        }
      } else {
        if (this.i + 1 > this.a && this.i + 1 <= this.a + this.b) {
          this.form.answerList.push({
            id: this.i+1,
            answer: this.multiValue.sort().join(','),
            questionId: this.tableData[this.i].id,
            itemOrder: this.tableData[this.i].itemOrder,
            questionType: this.tableData[this.i].questionType
          })
        } else {
          this.form.answerList.push({
            id: this.i+1,
            answer: val,
            questionId: this.tableData[this.i].id,
            itemOrder: this.tableData[this.i].itemOrder,
            questionType: this.tableData[this.i].questionType
          })
        }
      }
    },

    handPrevious() {
      this.i = this.i - 1
      this.show(this.i)
      this.currentQ()
    },

    show(i) {
      if (i == 0) {
        this.showPrevious = false
      } else {
        this.showPrevious = true
      }
      if (i == this.tableData.length - 1) {
        this.showNext = false
      } else {
        this.showNext = true
      }
    },

    doHandler() {
      this.handleText = '正在交卷，请等待...'
      if (this.time !== undefined) {
        this.form.doTime = new Date() - this.startTime
        api.handleExam(this.form).then(() => {
          this.$router.push('/student/exam')
          this.$message.success('试卷提交成功！')
        })
      } else {
        this.$router.push('/student/smartTest')
        this.$message.success('试卷提交成功！')
      }
    },

    handHandExam() {
      const that = this
      // 交卷保存答案
      const notAnswered = that.countNotAnswered()
      let msg = '确认要交卷吗？'
      if (notAnswered > 0) {
        msg = '您还有' + notAnswered + '题未作答，确认要交卷吗?'
      }
      that
        .$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.doHandler()
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '交卷已取消，您可以继续作答！'
          })
        })
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', e=> {
      let state = document.visibilityState
      if (state == 'hidden') {
        console.log(document.visibilityState, '用户离开了')
      }
      if (state == 'visible') {
        console.log(document.visibilityState, '回来了')
      }
    })
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
  height: calc(100vh - 100px);
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

