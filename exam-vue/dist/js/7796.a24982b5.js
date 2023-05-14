"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[7796,8943],{8441:function(e,a,t){t.d(a,{Z:function(){return n}});var r=function(){var e=this,a=e._self._c;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,layout:e.layout,"page-sizes":e.pageSizes,total:e.total,"page-size":e.pageSize},on:{"update:currentPage":function(a){e.currentPage=a},"update:current-page":function(a){e.currentPage=a},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:pageSize":function(a){e.pageSize=a},"update:page-size":function(a){e.pageSize=a}}},"el-pagination",e.$attrs,!1))],1)},i=[],l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default(){return[5,10,20,30,50]}},queryParam:{},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get(){return this.page},set(e){this.$emit("update:page",e)}},pageSize:{get(){return this.limit},set(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange(e){this.queryParam.pageSize=e,this.$emit("pagination",this.queryParam)},handleCurrentChange(e){this.queryParam.pageIndex=e,this.$emit("pagination",this.queryParam)}}},s=l,p=t(1001),o=(0,p.Z)(s,r,i,!1,null,"fcd24848",null),n=o.exports},7796:function(e,a,t){t.r(a),t.d(a,{default:function(){return m}});t(7658);var r=function(){var e=this,a=e._self._c;return a("div",[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"班级：",prop:"gradeId"}},[a("el-select",{attrs:{placeholder:"班级",clearable:""},model:{value:e.form.gradeId,callback:function(a){e.$set(e.form,"gradeId",a)},expression:"form.gradeId"}},e._l(e.gradeType,(function(e){return a("el-option",{key:e.id,attrs:{value:e.id,label:e.className}})})),1)],1),a("el-form-item",{attrs:{label:"标题：",prop:"title"}},[a("el-input",{model:{value:e.form.title,callback:function(a){e.$set(e.form,"title",a)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"考试时长：",prop:"time"}},[a("el-input",{attrs:{placeholder:"分钟"},model:{value:e.form.time,callback:function(a){e.$set(e.form,"time",a)},expression:"form.time"}})],1),a("el-form-item",{attrs:{label:"时段限制：",prop:"limitDateTime"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.limitDateTime,callback:function(a){e.$set(e.form,"limitDateTime",a)},expression:"form.limitDateTime"}})],1),a("el-form-item",{attrs:{label:"试卷：",prop:"paperId"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.paperItems,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"courseId",label:"课程",formatter:e.courseFormatter,width:"120px"}}),a("el-table-column",{attrs:{prop:"name",label:"试卷名称"}}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"160px"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"160px"},scopedSlots:e._u([{key:"default",fn:function({row:t}){return[a("el-button",{staticClass:"link-left",attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.removePaper(t)}}},[e._v("删除")])]}}])})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("提交")]),a("el-button",{attrs:{type:"success"},on:{click:e.addPaper}},[e._v("添加试卷")]),a("el-button",{on:{click:function(a){return e.$router.push("/teacher/exam/list")}}},[e._v("取 消")])],1)],1),a("el-dialog",{attrs:{visible:e.paperPage.showDialog,width:"70%"},on:{"update:visible":function(a){return e.$set(e.paperPage,"showDialog",a)}}},[a("el-form",{attrs:{model:e.paperPage.queryParam,inline:!0}},[a("el-form-item",{attrs:{label:"课程："}},[a("el-select",{attrs:{clearable:""},model:{value:e.paperPage.queryParam.courseId,callback:function(a){e.$set(e.paperPage.queryParam,"courseId",a)},expression:"paperPage.queryParam.courseId"}},e._l(e.courseType,(function(e){return a("el-option",{key:e.id,attrs:{value:e.id,label:e.name}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.examPaperSubmitForm}},[e._v("查询")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.paperPage.tableData,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"35"}}),a("el-table-column",{attrs:{prop:"id",label:"Id",width:"90px"}}),a("el-table-column",{attrs:{prop:"courseId",label:"课程",formatter:e.courseFormatter,width:"120px"}}),a("el-table-column",{attrs:{prop:"name",label:"名称"}}),a("el-table-column",{attrs:{prop:"questionCount",label:"题目数量",width:"120px"}}),a("el-table-column",{attrs:{prop:"score",label:"总分",width:"120px"}}),a("el-table-column",{attrs:{prop:"suggestTime",label:"建议时长",width:"120px"}}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"160px"}})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.paperPage.total>0,expression:"paperPage.total > 0"}],attrs:{total:e.paperPage.total,page:e.paperPage.queryParam.pageIndex,limit:e.paperPage.queryParam.pageSize},on:{"update:page":function(a){return e.$set(e.paperPage.queryParam,"pageIndex",a)},"update:limit":function(a){return e.$set(e.paperPage.queryParam,"pageSize",a)},pagination:e.search}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(a){e.paperPage.showDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmPaperSelect}},[e._v("确定")])],1)],1)],1)},i=[],l=t(8441),s=t(7421),p={components:{Pagination:l.Z},data(){return{form:{id:null,gradeId:null,title:"",paperId:null,limitDateTime:[],time:null},paperItems:[],courseType:[],gradeType:[],paperPage:{multipleSelection:{},showDialog:!1,queryParam:{courseId:null,pageIndex:1,pageSize:5},tableData:[],total:0},rules:{gradeId:[{required:!0,message:"请选择班级",trigger:"change"}],title:[{required:!0,message:"请输入考试名",trigger:"blur"}],courseId:[{required:!0,message:"请选择课程",trigger:"change"}],time:[{required:!0,message:"请输入考试时长",trigger:"blur"}],limitDateTime:[{required:!0,message:"请考试时间",trigger:"blur"}],paperId:[{required:!0,message:"请选择试卷",trigger:"change"}]}}},created(){let e=this.$route.query.id;s.Z.getMyTeachCourseList().then((e=>this.courseType=e.data)),s.Z.getMyCourseClassList().then((e=>this.gradeType=e.data)),e&&0!==parseInt(e)&&s.Z.getReleaseExamById(e).then((e=>{this.form=e.data,this.getPaperById(this.form.paperId)}))},methods:{addPaper(){this.paperPage.showDialog=!0,this.search()},confirmPaperSelect(){this.paperItems=this.paperPage.multipleSelection,this.form.paperId=this.paperPage.multipleSelection[0].id,this.paperPage.showDialog=!1},search(){this.paperPage.showDialog=!0,s.Z.paperPage(this.paperPage.queryParam).then((e=>{const a=e.data;console.log(a),this.paperPage.tableData=a.list,this.paperPage.total=a.total,this.paperPage.queryParam.pageIndex=a.pageNum}))},getPaperById(e){s.Z.getPaperById(e).then((e=>{this.paperItems.push(e.data)}))},handleSelectionChange(e){this.paperPage.multipleSelection=e},examPaperSubmitForm(){this.paperPage.queryParam.pageIndex=1,this.search()},removePaper(e){this.paperItems=[]},submitForm(){this.$refs.form.validate((e=>{e&&s.Z.releaseExamEdit(this.form).then((e=>{this.$message.success("发布成功"),this.$router.push("/admin/exam/list")}))}))},courseFormatter(e){return this.courseTypeQ(this.courseType,e.courseId)},gradeFormatter(e){return this.courseTypeQ(this.gradeType,e.gradeType)},courseTypeQ(e,a){for(let t of e)if(t.id===a)return t.name}}},o=p,n=t(1001),u=(0,n.Z)(o,r,i,!1,null,null,null),m=u.exports},7421:function(e,a,t){var r=t(4471);a["Z"]={getMyTeachCourseClass:e=>(0,r.v_)("/api/teacher/course/class/page",e),getMyTeachCourse:e=>(0,r.v_)("/api/admin/subject/page",e),getMyTeachCourseList:()=>(0,r.v_)("/api/teacher/subject/list"),getCourseList:()=>(0,r.v_)("/api/subject/list"),getMyTeachCourseClassStudents:e=>(0,r.v_)("/api/teacher/course/stu/page",e),removeStudentFromClass:(e,a)=>(0,r.v_)("/api/teacher/remove/stu/"+e+"/"+a),addStudentToClass:(e,a)=>(0,r.v_)("/api/teacher/add/stu/"+e+"/"+a),addMyTeachCourseClass:e=>(0,r.v_)("/api/teacher/course/class/edit",e),getClassInfo:e=>(0,r.v_)("/api/teacher/course/class/"+e),addStudentWithClass:(e,a)=>(0,r.v_)("/api/teacher/add/stu/"+a,e),getClassList:()=>(0,r.v_)("/api/class/list"),getMyCourseClassList:()=>(0,r.v_)("/api/teacher/course/class/list"),questionEdit:e=>(0,r.v_)("/api/question/edit",e),questionPage:e=>(0,r.v_)("/api/question/page",e),getQuestionById:e=>(0,r.v_)("/api/question/select/"+e),delQuestionById:e=>(0,r.v_)("/api/question/delete/"+e),paperEdit:e=>(0,r.v_)("/api/exam/paper/edit",e),paperPage:e=>(0,r.v_)("/api/exam/paper/page",e),getPaperById:e=>(0,r.v_)("/api/exam/paper/select/"+e),delPaperById:e=>(0,r.v_)("/api/exam/paper/delete/"+e),selectStudentPaperAnswers:e=>(0,r.v_)("/api/admin/examPaperAnswer/answer/"+e),releaseExamPage:e=>(0,r.v_)("/api/exam/release/page",e),releaseExamEdit:e=>(0,r.v_)("/api/exam/release/edit",e),getReleaseExamById:e=>(0,r.v_)("/api/exam/release/select/"+e),selectStudentPageAnswers:e=>(0,r.v_)("/api/admin/examPaperAnswer/page",e),selectReleaseExamPaper:e=>(0,r.v_)("/api/exam/release/paper/page",e),correctPaper:e=>(0,r.v_)("/api/admin/examPaperAnswer/answer/correct",e),autoCreatePaper:e=>(0,r.v_)("/api/exam/paper/autoCreatePaper",e)}}}]);
//# sourceMappingURL=7796.a24982b5.js.map