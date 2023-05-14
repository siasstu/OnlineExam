"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[1841,2038],{2038:function(t,e,s){s.r(e),s.d(e,{default:function(){return h}});var i=function(){var t=this,e=t._self._c;return e("span",{staticStyle:{color:"#ff0000","font-weight":"700"}},[t._v(t._s(t.min)+"分钟"+t._s(t.sec)+"秒")])},a=[],n={name:"ExamTimer",props:["time"],data(){return{leftSeconds:0,min:"00",sec:"00"}},created(){this.leftSeconds=60*this.time,this.countdown()},methods:{countdown(){if(this.leftSeconds<0)return void this.$emit("timeout");const t=parseInt(this.leftSeconds/60),e=parseInt(this.leftSeconds%60);this.min=t>9?t:"0"+t,this.sec=e>9?e:"0"+e,this.leftSeconds-=1;const s=this;setTimeout((function(){s.countdown()}),1e3)}}},r=n,o=s(1001),u=(0,o.Z)(r,i,a,!1,null,null,null),h=u.exports},1841:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"app-container",staticStyle:{overflow:"hidden",padding:"10px",height:"100vh"}},[e("el-row",{attrs:{gutter:24}},[e("el-col",{attrs:{span:24}},[e("el-card",{staticStyle:{"margin-bottom":"10px"}},[t._v(" 距离考试结束还有： "),e("exam-timer",{attrs:{time:t.time},on:{timeout:function(e){return t.doHandler()}}}),e("el-button",{staticStyle:{float:"right","margin-top":"-10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(e){return t.handHandExam()}}},[t._v(" "+t._s(t.handleText)+" ")])],1)],1),e("el-col",{staticStyle:{"margin-bottom":"15px"},attrs:{span:4,md:7,xs:24}},[e("el-card",{staticClass:"content-h"},[e("p",{staticClass:"card-title"},[t._v("答题卡")]),e("el-row",{staticClass:"card-line",staticStyle:{"padding-left":"10px"},attrs:{gutter:24}},[e("el-tag",{attrs:{type:"info"}},[t._v("未作答")]),e("el-tag",{attrs:{type:"success"}},[t._v("已作答")])],1),void 0!==t.aQuestions&&t.aQuestions.length>0?e("div",[e("p",{staticClass:"card-title"},[t._v("单选题")]),e("el-row",{staticClass:"card-line",attrs:{gutter:24}},t._l(t.aQuestions,(function(s,i){return e("el-tag",{key:i,attrs:{type:t.cardItemClass(s.id)},on:{click:function(e){return t.handSave(i)}}},[t._v(" "+t._s(i+1))])})),1)],1):t._e(),void 0!==t.bQuestions&&t.bQuestions.length>0?e("div",[e("p",{staticClass:"card-title"},[t._v("多选题")]),e("el-row",{staticClass:"card-line",attrs:{gutter:24}},t._l(t.bQuestions,(function(s,i){return e("el-tag",{key:i,attrs:{type:t.cardItemClass(s.id)},on:{click:function(e){return t.handSave(i+t.a)}}},[t._v(" "+t._s(i+1+t.a))])})),1)],1):t._e(),void 0!==t.cQuestions&&t.cQuestions.length>0?e("div",[e("p",{staticClass:"card-title"},[t._v("判断题")]),e("el-row",{staticClass:"card-line",attrs:{gutter:24}},t._l(t.cQuestions,(function(s,i){return e("el-tag",{key:i,attrs:{type:t.cardItemClass(s.id)},on:{click:function(e){return t.handSave(i+t.a+t.b)}}},[t._v(" "+t._s(i+1+t.a+t.b))])})),1)],1):t._e(),void 0!==t.dQuestions&&t.dQuestions.length>0?e("div",[e("p",{staticClass:"card-title"},[t._v("填空题")]),e("el-row",{staticClass:"card-line",attrs:{gutter:24}},t._l(t.dQuestions,(function(s,i){return e("el-tag",{key:i,attrs:{type:t.cardItemClass(s.id)},on:{click:function(e){return t.handSave(i+t.a+t.b+t.c)}}},[t._v(" "+t._s(i+1+t.a+t.b+t.c))])})),1)],1):t._e(),void 0!==t.eQuestions&&t.eQuestions.length>0?e("div",[e("p",{staticClass:"card-title"},[t._v("简答题")]),e("el-row",{staticClass:"card-line",attrs:{gutter:24}},t._l(t.eQuestions,(function(s,i){return e("el-tag",{key:i,attrs:{type:t.cardItemClass(s.id)},on:{click:function(e){return t.handSave(i+t.a+t.b+t.c+t.d)}}},[t._v(" "+t._s(i+1+t.a+t.b+t.c+t.d))])})),1)],1):t._e()],1)],1),e("el-col",{attrs:{span:20,md:17,xs:24}},t._l(t.tableData,(function(s,i){return e("el-card",{directives:[{name:"show",rawName:"v-show",value:i===t.i,expression:"index === i"}],key:i,staticClass:"qu-content content-h"},[s.title?e("p",{staticStyle:{"font-size":"20px",margin:"10px 0"}},[t._v(" "+t._s(i+1)+"."+t._s(s.title)+" ")]):t._e(),1===s.questionType||3===s.questionType?e("div",[e("el-radio-group",{on:{change:t.updateAswerList},model:{value:t.radioValue,callback:function(e){t.radioValue=e},expression:"radioValue"}},t._l(s.items,(function(s,i){return e("el-radio",{key:i,attrs:{label:s.prefix}},[t._v(t._s(s.prefix)+"."+t._s(s.content)+" ")])})),1)],1):t._e(),2===s.questionType?e("div",[e("el-checkbox-group",{on:{change:t.updateAswerList},model:{value:t.multiValue,callback:function(e){t.multiValue=e},expression:"multiValue"}},t._l(s.items,(function(s,i){return e("el-checkbox",{key:i,attrs:{label:s.prefix}},[t._v(t._s(s.prefix)+"."+t._s(s.content)+" ")])})),1)],1):t._e(),4===s.questionType?e("div",[e("el-input",{on:{change:t.updateAswerList},model:{value:t.shortAnswerValue,callback:function(e){t.shortAnswerValue=e},expression:"shortAnswerValue"}})],1):t._e(),5===s.questionType?e("div",[e("el-input",{on:{change:t.updateAswerList},model:{value:t.shortAnswerValue,callback:function(e){t.shortAnswerValue=e},expression:"shortAnswerValue"}})],1):t._e(),e("div",{staticStyle:{"margin-top":"20px"}},[t.showPrevious?e("el-button",{attrs:{type:"primary",icon:"el-icon-back"},on:{click:function(e){return t.handPrevious()}}},[t._v(" 上一题 ")]):t._e(),t.showNext?e("el-button",{attrs:{type:"warning",icon:"el-icon-right"},on:{click:function(e){return t.handNext()}}},[t._v(" 下一题 ")]):t._e()],1)])})),1)],1)],1)},a=[],n=(s(7658),s(7421)),r=s(9457),o=s(2038),u={name:"ExamProcess",components:{ExamTimer:o["default"]},data(){return{showPrevious:!1,showNext:!0,handleText:"交卷",radioValue:"",multiValue:[],time:0,shortAnswerValue:"",answeredIds:[],form:{id:null,answerList:[],doTime:0,examGradeId:null},i:0,tableData:[],titleItems:[],aQuestions:[],bQuestions:[],cQuestions:[],dQuestions:[],eQuestions:[],a:0,b:0,c:0,d:0,e:0,total:0,paperInfo:[],startTime:0}},created(){let t=this.$route.query.id;this.form.id=this.$route.query.id,this.form.examGradeId=this.$route.query.examId,this.time=this.$route.query.time,t&&0!==parseInt(t)&&void 0!==this.time?n.Z.getPaperById(t).then((t=>{this.paperInfo=t.data,this.titleItems=t.data.titleItems;for(let e of this.titleItems)"单选题"==e.name?(this.aQuestions=e.questionItems,this.aQuestions.score=e.score):"多选题"==e.name?this.bQuestions=e.questionItems:"判断题"==e.name?this.cQuestions=e.questionItems:"填空题"==e.name?this.dQuestions=e.questionItems:this.eQuestions=e.questionItems;this.a=this.aQuestions.length,this.b=this.bQuestions.length,this.c=this.cQuestions.length,this.d=this.dQuestions.length,this.e=this.eQuestions.length,this.total=this.a+this.b+this.c+this.d+this.e,this.tableData=this.tableData.concat(this.aQuestions).concat(this.bQuestions).concat(this.cQuestions).concat(this.dQuestions).concat(this.eQuestions),this.startTime=new Date})):r.Z.getTestPaperById(t).then((t=>{this.paperInfo=t.data,this.titleItems=t.data.titleItems;for(let e of this.titleItems)"单选题"==e.name?(this.aQuestions=e.questionItems,this.aQuestions.score=e.score):"多选题"==e.name?this.bQuestions=e.questionItems:"判断题"==e.name?this.cQuestions=e.questionItems:"填空题"==e.name?this.dQuestions=e.questionItems:this.eQuestions=e.questionItems;this.a=this.aQuestions.length,this.b=this.bQuestions.length,this.c=this.cQuestions.length,this.d=this.dQuestions.length,this.e=this.eQuestions.length,this.total=this.a+this.b+this.c+this.d+this.e,this.tableData=this.tableData.concat(this.aQuestions).concat(this.bQuestions).concat(this.cQuestions).concat(this.dQuestions).concat(this.eQuestions),this.startTime=new Date}))},methods:{cardItemClass(t){return t===this.tableData[this.i].id?"warning":this.form.answerList.find((e=>e.questionId===t))?"success":"info"},handSave(t){this.i=t,this.currentQ()},currentQ(){this.show(this.i),this.form.answerList.find((t=>t.id===this.i+1))?(this.answered=this.form.answerList.find((t=>t.id===this.i+1)),1!==this.answered.questionType&&3!==this.answered.questionType||(this.radioValue=this.answered.answer),4!==this.answered.questionType&&5!==this.answered.questionType||(this.shortAnswerValue=this.answered.answer),2===this.answered.questionType&&(this.multiValue=this.answered.answer)):(this.radioValue="",this.multiValue=[],this.shortAnswerValue="")},countNotAnswered(){let t=this.tableData.length-this.form.answerList.length;return t},handNext(){this.i=this.i+1,this.show(this.i),this.currentQ()},updateAswerList(t){if(this.form.answerList.find((t=>t.id===this.i+1))){let t=this.form.answerList.findIndex((t=>t.id===this.i));this.i+1>this.a&&this.i+1<=this.a+this.b?this.form.answerList.splice(t,1,{id:this.i+1,answer:this.multiValue.sort().join(","),questionId:this.tableData[this.i].id,itemOrder:this.tableData[this.i].itemOrder,questionType:this.tableData[this.i].questionType}):this.i+1>this.a+this.b+this.c?this.form.answerList.splice(t,1,{id:this.i+1,answer:this.shortAnswerValue,questionId:this.tableData[this.i].id,itemOrder:this.tableData[this.i].itemOrder,questionType:this.tableData[this.i].questionType}):this.form.answerList.splice(t,1,{id:this.i+1,answer:this.radioValue,questionId:this.tableData[this.i].id,itemOrder:this.tableData[this.i].itemOrder,questionType:this.tableData[this.i].questionType})}else this.i+1>this.a&&this.i+1<=this.a+this.b?this.form.answerList.push({id:this.i+1,answer:this.multiValue.sort().join(","),questionId:this.tableData[this.i].id,itemOrder:this.tableData[this.i].itemOrder,questionType:this.tableData[this.i].questionType}):this.form.answerList.push({id:this.i+1,answer:t,questionId:this.tableData[this.i].id,itemOrder:this.tableData[this.i].itemOrder,questionType:this.tableData[this.i].questionType})},handPrevious(){this.i=this.i-1,this.show(this.i),this.currentQ()},show(t){this.showPrevious=0!=t,t==this.tableData.length-1?this.showNext=!1:this.showNext=!0},doHandler(){this.handleText="正在交卷，请等待...",this.form.doTime=new Date-this.startTime,r.Z.handleExam(this.form).then((()=>{this.$router.push("/student/exam"),this.$message.success("试卷提交成功！")}))},handHandExam(){const t=this,e=t.countNotAnswered();let s="确认要交卷吗？";e>0&&(s="您还有"+e+"题未作答，确认要交卷吗?"),t.$confirm(s,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{t.doHandler()})).catch((()=>{t.$message({type:"info",message:"交卷已取消，您可以继续作答！"})}))}},mounted(){document.addEventListener("visibilitychange",(t=>{let e=document.visibilityState;"hidden"==e&&console.log(document.visibilityState,"用户离开了"),"visible"==e&&console.log(document.visibilityState,"回来了")}))}},h=u,l=s(1001),c=(0,l.Z)(h,i,a,!1,null,"2cab936a",null),d=c.exports},9457:function(t,e,s){var i=s(4471);e["Z"]={myExams:()=>(0,i.v_)("/api/student/exam/paper/page"),handleExam:t=>(0,i.v_)("/api/student/exam/paper/answerSubmit",t),myScore:t=>(0,i.v_)("/api/student/score/page",t),getErrorQuestion:t=>(0,i.v_)("/api/student/question/error/page",t),getTestPage:t=>(0,i.v_)("/api/student/test/page",t),getTestPaperById:t=>(0,i.v_)("/api/student/test/select/"+t),getTest:t=>(0,i.v_)("/api/student/test/create",t)}},7421:function(t,e,s){var i=s(4471);e["Z"]={getMyTeachCourseClass:t=>(0,i.v_)("/api/teacher/course/class/page",t),getMyTeachCourse:t=>(0,i.v_)("/api/admin/subject/page",t),getMyTeachCourseList:()=>(0,i.v_)("/api/teacher/subject/list"),getCourseList:()=>(0,i.v_)("/api/subject/list"),getMyTeachCourseClassStudents:t=>(0,i.v_)("/api/teacher/course/stu/page",t),removeStudentFromClass:(t,e)=>(0,i.v_)("/api/teacher/remove/stu/"+t+"/"+e),addStudentToClass:(t,e)=>(0,i.v_)("/api/teacher/add/stu/"+t+"/"+e),addMyTeachCourseClass:t=>(0,i.v_)("/api/teacher/course/class/edit",t),getClassInfo:t=>(0,i.v_)("/api/teacher/course/class/"+t),addStudentWithClass:(t,e)=>(0,i.v_)("/api/teacher/add/stu/"+e,t),getClassList:()=>(0,i.v_)("/api/class/list"),getMyCourseClassList:()=>(0,i.v_)("/api/teacher/course/class/list"),questionEdit:t=>(0,i.v_)("/api/question/edit",t),questionPage:t=>(0,i.v_)("/api/question/page",t),getQuestionById:t=>(0,i.v_)("/api/question/select/"+t),delQuestionById:t=>(0,i.v_)("/api/question/delete/"+t),paperEdit:t=>(0,i.v_)("/api/exam/paper/edit",t),paperPage:t=>(0,i.v_)("/api/exam/paper/page",t),getPaperById:t=>(0,i.v_)("/api/exam/paper/select/"+t),delPaperById:t=>(0,i.v_)("/api/exam/paper/delete/"+t),selectStudentPaperAnswers:t=>(0,i.v_)("/api/admin/examPaperAnswer/answer/"+t),releaseExamPage:t=>(0,i.v_)("/api/exam/release/page",t),releaseExamEdit:t=>(0,i.v_)("/api/exam/release/edit",t),getReleaseExamById:t=>(0,i.v_)("/api/exam/release/select/"+t),selectStudentPageAnswers:t=>(0,i.v_)("/api/admin/examPaperAnswer/page",t),selectReleaseExamPaper:t=>(0,i.v_)("/api/exam/release/paper/page",t),correctPaper:t=>(0,i.v_)("/api/admin/examPaperAnswer/answer/correct",t),autoCreatePaper:t=>(0,i.v_)("/api/exam/paper/autoCreatePaper",t)}}}]);
//# sourceMappingURL=1841.2deeb285.js.map