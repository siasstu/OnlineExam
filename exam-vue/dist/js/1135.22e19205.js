"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[1135,9648,4003,8162,8943],{8441:function(e,t,a){a.d(t,{Z:function(){return u}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[t("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,layout:e.layout,"page-sizes":e.pageSizes,total:e.total,"page-size":e.pageSize},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t}}},"el-pagination",e.$attrs,!1))],1)},n=[],r={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default(){return[5,10,20,30,50]}},queryParam:{},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get(){return this.page},set(e){this.$emit("update:page",e)}},pageSize:{get(){return this.limit},set(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange(e){this.queryParam.pageSize=e,this.$emit("pagination",this.queryParam)},handleCurrentChange(e){this.queryParam.pageIndex=e,this.$emit("pagination",this.queryParam)}}},i=r,s=a(1001),o=(0,s.Z)(i,l,n,!1,null,"fcd24848",null),u=o.exports},9648:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var l=function(){var e=this,t=e._self._c;return t("div",[t("el-dialog",{attrs:{top:"10vh",title:e.dialogTitle,center:"",visible:e.showClassDialog,"before-close":e.handleConfirm,width:"30%"},on:{"update:visible":function(t){e.showClassDialog=t}},scopedSlots:e._u([{key:"footer",fn:function(){return[t("span",{staticClass:"dialog-footer"},[t("el-button",{on:{click:e.handleConfirm}},[e._v("确认")]),t("el-button",{on:{click:e.handleDialogClose}},[e._v("取消")])],1)]},proxy:!0}])},[t("el-form",{attrs:{model:e.form,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"班级名称",prop:"className"}},[t("el-input",{model:{value:e.form.className,callback:function(t){e.$set(e.form,"className",t)},expression:"form.className"}})],1),t("el-form-item",{attrs:{label:"备注",prop:"remark"}},[t("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),null!=e.form.createTime?t("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[t("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:e.form.createTime,callback:function(t){e.$set(e.form,"createTime",t)},expression:"form.createTime"}})],1):e._e()],1)],1)],1)},n=[],r=a(4325),i={data(){return{form:{}}},props:["id","showClassDialog","dialogTitle"],watch:{id:{handler(e,t){-1!=e&&e?this.search(e):this.form={}}}},methods:{search(e){r.Z.getClassInfo(e).then((e=>{this.form=e.data}))},knowsEdit(e){},handleConfirm(){this.$emit("close")},handleDialogClose(){this.$emit("close")}}},s=i,o=a(1001),u=(0,o.Z)(s,l,n,!1,null,null,null),d=u.exports},4003:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var l=function(){var e=this,t=e._self._c;return t("el-row",[t("el-form",{ref:"queryForm",attrs:{model:e.queryParam,inline:!0}},[t("el-form-item",{attrs:{label:"班级名称："}},[t("el-input",{attrs:{placeholder:"课程名称",size:"medium",clearable:""},model:{value:e.queryParam.name,callback:function(t){e.$set(e.queryParam,"name",t)},expression:"queryParam.name"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.handleSelect}},[e._v("查询")]),t("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleDialogValue(null)}}},[e._v("新增")]),t("el-popconfirm",{attrs:{title:"您确定批量删除这些记录吗？"},on:{confirm:e.handleDelete},scopedSlots:e._u([{key:"reference",fn:function(){return[t("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger",size:"medium"}},[e._v("批量删除")])]},proxy:!0}])})],1)],1)],1)},n=[],r={data(){return{queryParam:{pageIndex:1,pageSize:10}}},methods:{handleDialogValue(e){this.$emit("handleEdit",e)},handleDelete(){this.$emit("handleDelete",null)},handleSelect(){this.$emit("initList",this.queryParam)}}},i=r,s=a(1001),o=(0,s.Z)(i,l,n,!1,null,null,null),u=o.exports},8162:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var l=function(){var e=this,t=e._self._c;return t("div",[t("el-dialog",{attrs:{top:"10vh",title:"班级学生详情",center:"",visible:e.showStuDialog,"before-close":e.handleDialogClose},on:{"update:visible":function(t){e.showStuDialog=t}}},[t("el-form",{ref:"queryForm",attrs:{model:e.queryParam,inline:!0}},[t("el-form-item",{attrs:{label:"姓名："}},[t("el-input",{attrs:{placeholder:"姓名",clearable:""},model:{value:e.queryParam.realName,callback:function(t){e.$set(e.queryParam,"realName",t)},expression:"queryParam.realName"}})],1),t("el-form-item",{attrs:{label:"学号："}},[t("el-input",{attrs:{placeholder:"学号",clearable:""},model:{value:e.queryParam.username,callback:function(t){e.$set(e.queryParam,"username",t)},expression:"queryParam.username"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.search(null)}}},[e._v("查询")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addStudentForm}},[e._v("添加学生")])],1)],1),t("el-scrollbar",{staticStyle:{height:"calc(100vh - 405px)"}},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{label:"Id",width:"40"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.queryParam.pageIndex-1)*e.queryParam.pageSize+(t.$index+1))+" ")]}}])}),t("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center",width:"140"}}),t("el-table-column",{attrs:{prop:"realName",label:"真实姓名",align:"center",width:"130"}}),t("el-table-column",{attrs:{prop:"phoneNumber",label:"手机号",align:"center",width:"120"}}),t("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"160px"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-button",{staticClass:"link-left",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.removeStudent(a.username)}}},[e._v("移出")])]}}])})],1),t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,queryParam:e.queryParam,page:e.queryParam.pageIndex,limit:e.queryParam.pageSize},on:{"update:page":function(t){return e.$set(e.queryParam,"pageIndex",t)},"update:limit":function(t){return e.$set(e.queryParam,"pageSize",t)},pagination:e.search}})],1)],1),t("el-dialog",{attrs:{visible:e.studentPage.showDialog,title:"添加学生",top:"3vh",width:"60%"},on:{"update:visible":function(t){return e.$set(e.studentPage,"showDialog",t)}}},[t("el-form",{attrs:{model:e.studentPage.queryParam,inline:!0}},[t("el-form-item",{attrs:{label:"学号："}},[t("el-input",{model:{value:e.studentPage.queryParam.username,callback:function(t){e.$set(e.studentPage.queryParam,"username",t)},expression:"studentPage.queryParam.username"}})],1),t("el-form-item",{attrs:{label:"姓名："}},[t("el-input",{model:{value:e.studentPage.queryParam.realName,callback:function(t){e.$set(e.studentPage.queryParam,"realName",t)},expression:"studentPage.queryParam.realName"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.studentSearch(null)}}},[e._v("查询")])],1)],1),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.studentPage.tableData,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{label:"Id",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.studentPage.queryParam.pageIndex-1)*e.studentPage.queryParam.pageSize+(t.$index+1))+" ")]}}])}),t("el-table-column",{attrs:{prop:"username",label:"学号",width:"130"}}),t("el-table-column",{attrs:{prop:"realName",label:"真实姓名",width:"130"}}),t("el-table-column",{attrs:{prop:"phoneNumber",label:"手机号",width:"130"}}),t("el-table-column",{attrs:{prop:"phoneNumber",label:"邮箱",width:"130"}}),t("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"160px"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-button",{staticClass:"link-left",attrs:{size:"mini",type:"success"},on:{click:function(t){return e.addStudents(a.username)}}},[e._v("添加")])]}}])})],1),t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.studentPage.total>0,expression:"studentPage.total > 0"}],attrs:{total:e.studentPage.total,queryParam:e.studentPage.queryParam,page:e.studentPage.queryParam.pageIndex,limit:e.studentPage.queryParam.pageSize},on:{"update:page":function(t){return e.$set(e.studentPage.queryParam,"pageIndex",t)},"update:limit":function(t){return e.$set(e.studentPage.queryParam,"pageSize",t)},pagination:e.studentSearch}}),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.studentPage.showDialog=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.studentPage.showDialog=!1}}},[e._v("确定")])],1)],1)],1)},n=[],r=a(4325),i=a(8441),s={components:{Pagination:i.Z},data(){return{queryParam:{pageIndex:1,pageSize:10},tableData:[],total:0,studentPage:{tableData:[],queryParam:{roleId:22,pageIndex:1,pageSize:10},total:0,showDialog:!1}}},props:["id","showStuDialog"],watch:{id:{handler(e,t){this.search()}}},methods:{search(e){null!=e&&(this.queryParam=e),this.queryParam.classId=this.id,r.Z.getClassStudents(this.queryParam).then((e=>{this.tableData=e.data.list,this.total=e.data.total}))},removeStudent(e){r.Z.removeStudentFromClass(e,this.id).then((e=>{this.search(),this.$message.success("操作成功")}))},addStudents(e){r.Z.addStudentToClass(e,this.id).then((e=>{this.search(),this.$message.success("操作成功")}))},handleDialogClose(){this.$emit("close")},handleConfirm(){},addStudentForm(){this.studentSearch(),this.studentPage.showDialog=!0},studentSearch(e){null!=e&&(this.studentPage.queryParam=e),r.Z.getStudentsByRole(this.studentPage.queryParam).then((e=>{this.studentPage.tableData=e.data.list,this.studentPage.total=e.data.total}))}}},o=s,u=a(1001),d=(0,u.Z)(o,l,n,!1,null,null,null),c=d.exports},1135:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var l=function(){var e=this,t=e._self._c;return t("div",[t("handle-button",{on:{handleEdit:e.handleDialogOpen}}),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-key":"id",stripe:""},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{staticStyle:{"text-align":"center"},attrs:{"reserve-selection":"",type:"selection",align:"center",width:"60",selectable:e.checkSelectable}}),t("el-table-column",{attrs:{prop:"className",label:"班级名称",width:"170"}}),t("el-table-column",{attrs:{prop:"count",align:"center",label:"班级人数",width:"180"}}),t("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"180"}}),t("el-table-column",{attrs:{prop:"remark",label:"简介"}}),t("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"330"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"success",size:"mini",icon:"el-icon-s-tools",plain:""},on:{click:function(t){return e.handleStuDialogOpen(a.row.id)}}},[e._v("查看班级")]),t("el-button",{staticStyle:{"margin-left":"5px"},attrs:{type:"success",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.handleDialogOpen(a.row.id)}}}),t("el-popconfirm",{attrs:{title:"您确定要删除这条记录吗？"},on:{confirm:function(t){return e.handleDelete(a.row.id)}},scopedSlots:e._u([{key:"reference",fn:function(){return[t("el-button",{staticStyle:{"margin-left":"5px"},attrs:{size:"mini",type:"danger",icon:"el-icon-delete-solid"}})]},proxy:!0}],null,!0)})]}}])})],1),t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,queryParam:e.queryParam,page:e.queryParam.pageIndex,limit:e.queryParam.pageSize},on:{"update:page":function(t){return e.$set(e.queryParam,"pageIndex",t)},"update:limit":function(t){return e.$set(e.queryParam,"pageSize",t)},pagination:e.search}}),t("class-dialog",{attrs:{id:e.id,dialogTitle:e.dialogTitle,showClassDialog:e.showClassDialog},on:{close:e.handleDialogClose}}),t("stu-dialog",{attrs:{showStuDialog:e.showStuDialog,id:e.id},on:{close:e.handleStuDialogClose}})],1)},n=[],r=(a(7658),a(8441)),i=a(4325),s=a(4003),o=a(9648),u=a(8162),d={components:{Pagination:r.Z,HandleButton:s["default"],ClassDialog:o["default"],stuDialog:u["default"]},data(){return{tableData:[],queryParam:{pageIndex:1,pageSize:10},ids:[],total:0,showClassDialog:!1,dialogTitle:"",showStuDialog:!1,id:null}},created(){this.search()},methods:{search(e){null!=e&&(this.queryParam=e),i.Z.classPage(this.queryParam).then((e=>{200===e.code&&(this.tableData=e.data.list,this.total=e.data.total)}))},handleDelete(e){if(null!=e&&-1==this.ids.findIndex((t=>t===e))&&this.ids.push(e),0===this.ids.length)return this.$message.error("请先选择删除班级信息！！"),!1;i.Z.removeSubjectByIds(this.ids).then((e=>{200==e.code?(this.$message.success("删除成功"),this.search(),this.ids=[]):this.$message.error(e.message)}))},handleStuDialogOpen(e){this.id=e,this.showStuDialog=!0},handleDialogOpen(e){e?(this.id=e,this.dialogTitle="修改课程班级信息"):(this.id=-1,this.dialogTitle="添加课程班级"),this.showClassDialog=!0},handleDialogClose(){this.id=null,this.showClassDialog=!1},handleStuDialogClose(){this.search(null),this.showStuDialog=!1},handleSelectionChange(e){this.ids=e.map((e=>e.id))},checkSelectable(){return!0}}},c=d,m=a(1001),p=(0,m.Z)(c,l,n,!1,null,null,null),h=p.exports},4325:function(e,t,a){var l=a(4471);t["Z"]={sectionKnowsList:e=>(0,l.v_)("/api/admin/section/knows/"+e),subjectPage:e=>(0,l.v_)("/api/admin/subject/page",e),getSubjectByid:e=>(0,l.v_)("/api/admin/subject/select/"+e),subjectEdit:e=>(0,l.v_)("/api/admin/subject/edit",e),deleteSubjectById:e=>(0,l.v_)("/api/admin/subject/delete/"+e),removeSubjectByIds:e=>(0,l.v_)("/api/admin/subject/delete",e),removeKnows:e=>(0,l.v_)("/api/admin/section/knows/delete/"+e),fileUpload:e=>(0,l.Wi)("/api/admin/model/upload",e),exportUser:e=>(0,l.GR)("/api/admin/model/download",e),semesterList:()=>(0,l.v_)("/api/admin/subject/semester/list"),classPage:e=>(0,l.v_)("/api/class/page",e),loginLog:e=>(0,l.v_)("/sys/logs/login/log/page",e),operationLog:e=>(0,l.v_)("/sys/logs/operation/log/page",e),removeUserLoginLogByIds:e=>(0,l.v_)("/sys/logs/login/log/delete",e),removeUserOperationLogByIds:e=>(0,l.v_)("/sys/logs/operation/log/delete",e),getClassStudents:e=>(0,l.v_)("/api/class/stu/page",e),getStudentsByRole:e=>(0,l.v_)("/api/class/stuPage",e),getClassInfo:e=>(0,l.v_)("/api/class/"+e),removeStudentFromClass:(e,t)=>(0,l.v_)("/api/class/remove/stu/"+e+"/"+t),addStudentToClass:(e,t)=>(0,l.v_)("/api/class/add/stu/"+e+"/"+t)}}}]);
//# sourceMappingURL=1135.22e19205.js.map