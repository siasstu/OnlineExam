"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[6964,8943],{8441:function(t,e,a){a.d(e,{Z:function(){return p}});var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[e("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,layout:t.layout,"page-sizes":t.pageSizes,total:t.total,"page-size":t.pageSize},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e}}},"el-pagination",t.$attrs,!1))],1)},l=[],s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default(){return[5,10,20,30,50]}},queryParam:{},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get(){return this.page},set(t){this.$emit("update:page",t)}},pageSize:{get(){return this.limit},set(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange(t){this.queryParam.pageSize=t,this.$emit("pagination",this.queryParam)},handleCurrentChange(t){this.queryParam.pageIndex=t,this.$emit("pagination",this.queryParam)}}},n=s,i=a(1001),u=(0,i.Z)(n,r,l,!1,null,"fcd24848",null),p=u.exports},6964:function(t,e,a){a.r(e),a.d(e,{default:function(){return c}});var r=function(){var t=this,e=t._self._c;return e("div",[e("el-row",{attrs:{gutter:50}},[e("el-col",{attrs:{span:18}},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,fit:"","highlight-current-row":""},on:{"row-click":t.itemSelect}},[e("el-table-column",{attrs:{prop:"id",label:"序号",width:"90px"}}),e("el-table-column",{attrs:{prop:"paperName",label:"名称"}}),e("el-table-column",{attrs:{prop:"courseName",label:"课程",width:"120"}}),e("el-table-column",{attrs:{label:"状态",prop:"status",align:"center",width:"100px"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return["2"===a.status?e("el-tag",{attrs:{type:"success"}},[t._v(" 完成 ")]):t._e(),"1"===a.status?e("el-tag",{attrs:{type:"warning"}},[t._v(" 待批改 ")]):t._e()]}}])}),e("el-table-column",{attrs:{prop:"createTime",label:"提交时间",width:"170"}}),e("el-table-column",{attrs:{width:"70"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return["1"===a.status?e("el-button",{attrs:{type:"text",size:"small"}},[t._v("待批改")]):t._e(),"2"===a.status?e("router-link",{attrs:{target:"_blank",to:{path:"/answer/correct",query:{id:a.id}}}},[e("el-button",{attrs:{type:"text",size:"small"}},[t._v("查看试卷")])],1):t._e()]}}])})],1),e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total}})],1),e("el-col",{attrs:{span:6}},[e("el-card",[null==t.selectItem?e("el-empty",{attrs:{description:"暂无数据"}}):e("el-form",{attrs:{"label-width":"50%"}},[e("el-form-item",{attrs:{label:"最终得分："}},[e("span",[t._v(t._s(t.selectItem.userScore))])]),e("el-form-item",{attrs:{label:"试卷总分："}},[e("span",[t._v(t._s(t.selectItem.paperScore))])]),e("el-form-item",{attrs:{label:"正确题数："}},[e("span",[t._v(t._s(t.selectItem.questionCorrect))])]),e("el-form-item",{attrs:{label:"总题数："}},[e("span",[t._v(t._s(t.selectItem.questionCount))])]),e("el-form-item",{attrs:{label:"用时："}},[e("span",[t._v(t._s(t.selectItem.doTime))])])],1)],1)],1)],1)],1)},l=[],s=a(8441),n=a(9457),i={components:{Pagination:s.Z},data(){return{queryParam:{pageIndex:1,pageSize:10},tableData:[],total:0,selectItem:{}}},created(){this.search()},methods:{search(){n.Z.myScore(this.queryParam).then((t=>{this.tableData=t.data.list,this.total=t.data.total,this.queryParam.pageIndex=t.data.pageNum,t.data.total>0?this.selectItem=t.data.list[0]:this.selectItem=null}))},itemSelect(t,e,a){this.selectItem=t}}},u=i,p=a(1001),o=(0,p.Z)(u,r,l,!1,null,"4bd3df02",null),c=o.exports},9457:function(t,e,a){var r=a(4471);e["Z"]={myExams:()=>(0,r.v_)("/api/student/exam/paper/page"),handleExam:t=>(0,r.v_)("/api/student/exam/paper/answerSubmit",t),myScore:t=>(0,r.v_)("/api/student/score/page",t),getErrorQuestion:t=>(0,r.v_)("/api/student/question/error/page",t),getTestPage:t=>(0,r.v_)("/api/student/test/page",t),getTestPaperById:t=>(0,r.v_)("/api/student/test/select/"+t),getTest:t=>(0,r.v_)("/api/student/test/create",t)}}}]);
//# sourceMappingURL=6964.fbac1683.js.map