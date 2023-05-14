"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[1399,8943],{8441:function(e,t,a){a.d(t,{Z:function(){return o}});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[t("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,layout:e.layout,"page-sizes":e.pageSizes,total:e.total,"page-size":e.pageSize},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t}}},"el-pagination",e.$attrs,!1))],1)},i=[],s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default(){return[5,10,20,30,50]}},queryParam:{},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get(){return this.page},set(e){this.$emit("update:page",e)}},pageSize:{get(){return this.limit},set(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange(e){this.queryParam.pageSize=e,this.$emit("pagination",this.queryParam)},handleCurrentChange(e){this.queryParam.pageIndex=e,this.$emit("pagination",this.queryParam)}}},u=s,n=a(1001),l=(0,n.Z)(u,r,i,!1,null,"fcd24848",null),o=l.exports},1399:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});a(7658);var r=function(){var e=this,t=e._self._c;return t("div",[t("el-form",{ref:"queryForm",attrs:{model:e.queryParam,inline:!0}},[t("el-form-item",{attrs:{label:"题干："}},[t("el-input",{attrs:{size:"medium",clearable:""},model:{value:e.queryParam.id,callback:function(t){e.$set(e.queryParam,"id",t)},expression:"queryParam.id"}})],1),t("el-form-item",{attrs:{label:"课程："}},[t("el-select",{attrs:{size:"medium",clearable:""},model:{value:e.queryParam.courseId,callback:function(t){e.$set(e.queryParam,"courseId",t)},expression:"queryParam.courseId"}},e._l(e.courseType,(function(e){return t("el-option",{key:e.id,attrs:{value:e.id,label:e.name}})})),1)],1),t("el-form-item",{attrs:{label:"题型："}},[t("el-select",{attrs:{size:"medium",clearable:""},model:{value:e.queryParam.questionType,callback:function(t){e.$set(e.queryParam,"questionType",t)},expression:"queryParam.questionType"}},e._l(e.questionType,(function(e){return t("el-option",{key:e.id,attrs:{value:e.id,label:e.value}})})),1)],1),t("el-form-item",[t("el-button",{staticStyle:{"margin-right":"15px"},attrs:{type:"primary",size:"medium"},on:{click:e.submitForm}},[e._v("查询")]),t("el-popover",{attrs:{placement:"bottom",trigger:"click"}},[e._l(e.editUrlEnum,(function(a){return t("el-button",{key:a.key,attrs:{type:"warning",size:"mini"},on:{click:function(t){return e.$router.push({path:a.value})}}},[e._v(e._s(a.name)+" ")])})),t("el-button",{staticClass:"link-left",attrs:{slot:"reference",type:"primary",size:"medium"},slot:"reference"},[e._v("添加")])],2)],1)],1),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{prop:"id",label:"Id",width:"70px"}}),t("el-table-column",{attrs:{prop:"courseId",label:"课程名称",width:"120px",formatter:e.courseTypeFormatter}}),t("el-table-column",{attrs:{prop:"questionType",label:"题型",formatter:e.questionTypeFormatter,width:"70px"}}),t("el-table-column",{attrs:{prop:"shortTitle",label:"题干","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"createUser",label:"创建人",width:"160px"}}),t("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"160px"}}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"220px"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.editQuestion(a)}}},[e._v("编辑")]),t("el-button",{staticClass:"link-left",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteQuestion(a)}}},[e._v("删除")])]}}])})],1),t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,queryParam:e.queryParam,page:e.queryParam.pageIndex,limit:e.queryParam.pageSize},on:{"update:page":function(t){return e.$set(e.queryParam,"pageIndex",t)},"update:limit":function(t){return e.$set(e.queryParam,"pageSize",t)},pagination:e.search}})],1)},i=[],s=a(8441),u=a(7421),n={components:{pagination:s.Z},data(){return{tableData:[],queryParam:{id:null,questionType:null,courseId:null,pageIndex:1,pageSize:10},courseType:[],total:0,questionType:[{id:1,value:"单选题"},{id:2,value:"多选题"},{id:3,value:"判断题"},{id:4,value:"填空题"},{id:5,value:"简答题"}],editUrlEnum:[{key:1,value:"/question/edit/singleChoice",name:"单选题"},{key:2,value:"/question/edit/multipleChoice",name:"多选题"},{key:3,value:"/question/edit/trueFalse",name:"判断题"},{key:4,value:"/question/edit/gapFilling",name:"填空题"},{key:5,value:"/question/edit/shortAnswer",name:"简答题"}]}},created(){u.Z.getCourseList().then((e=>{this.courseType=e.data})),this.search()},methods:{submitForm(){this.queryParam.pageIndex=1,this.search()},search(){u.Z.questionPage(this.queryParam).then((e=>{const t=e.data;this.tableData=t.list,this.total=t.total,this.queryParam.pageIndex=t.pageNum}))},editQuestion(e){let t=this.getUrl(this.editUrlEnum,e.questionType);this.$router.push({path:t,query:{id:e.id}})},deleteQuestion(e){u.Z.delQuestionById(e.id).then((e=>{this.$message.success("删除成功"),this.search()}))},questionTypeFormatter(e){return this.questionTypeQ(this.questionType,e.questionType)},courseTypeFormatter(e){return this.courseTypeQ(this.courseType,e.courseId)},questionTypeQ(e,t){for(let a of e)if(a.id===t)return a.value},courseTypeQ(e,t){for(let a of e)if(a.id===t)return a.name},getUrl(e,t){for(let a of e)if(a.key===t)return a.value}}},l=n,o=a(1001),p=(0,o.Z)(l,r,i,!1,null,"73e02932",null),c=p.exports},7421:function(e,t,a){var r=a(4471);t["Z"]={getMyTeachCourseClass:e=>(0,r.v_)("/api/teacher/course/class/page",e),getMyTeachCourse:e=>(0,r.v_)("/api/admin/subject/page",e),getMyTeachCourseList:()=>(0,r.v_)("/api/teacher/subject/list"),getCourseList:()=>(0,r.v_)("/api/subject/list"),getMyTeachCourseClassStudents:e=>(0,r.v_)("/api/teacher/course/stu/page",e),removeStudentFromClass:(e,t)=>(0,r.v_)("/api/teacher/remove/stu/"+e+"/"+t),addStudentToClass:(e,t)=>(0,r.v_)("/api/teacher/add/stu/"+e+"/"+t),addMyTeachCourseClass:e=>(0,r.v_)("/api/teacher/course/class/edit",e),getClassInfo:e=>(0,r.v_)("/api/teacher/course/class/"+e),addStudentWithClass:(e,t)=>(0,r.v_)("/api/teacher/add/stu/"+t,e),getClassList:()=>(0,r.v_)("/api/class/list"),getMyCourseClassList:()=>(0,r.v_)("/api/teacher/course/class/list"),questionEdit:e=>(0,r.v_)("/api/question/edit",e),questionPage:e=>(0,r.v_)("/api/question/page",e),getQuestionById:e=>(0,r.v_)("/api/question/select/"+e),delQuestionById:e=>(0,r.v_)("/api/question/delete/"+e),paperEdit:e=>(0,r.v_)("/api/exam/paper/edit",e),paperPage:e=>(0,r.v_)("/api/exam/paper/page",e),getPaperById:e=>(0,r.v_)("/api/exam/paper/select/"+e),delPaperById:e=>(0,r.v_)("/api/exam/paper/delete/"+e),selectStudentPaperAnswers:e=>(0,r.v_)("/api/admin/examPaperAnswer/answer/"+e),releaseExamPage:e=>(0,r.v_)("/api/exam/release/page",e),releaseExamEdit:e=>(0,r.v_)("/api/exam/release/edit",e),getReleaseExamById:e=>(0,r.v_)("/api/exam/release/select/"+e),selectStudentPageAnswers:e=>(0,r.v_)("/api/admin/examPaperAnswer/page",e),selectReleaseExamPaper:e=>(0,r.v_)("/api/exam/release/paper/page",e),correctPaper:e=>(0,r.v_)("/api/admin/examPaperAnswer/answer/correct",e),autoCreatePaper:e=>(0,r.v_)("/api/exam/paper/autoCreatePaper",e)}}}]);
//# sourceMappingURL=1399.fd380462.js.map