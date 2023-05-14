"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[1427,2050],{2050:function(e,r,s){s.r(r),s.d(r,{default:function(){return u}});var t=function(){var e=this,r=e._self._c;return r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"#","http-request":e.uploadHttpRequest,multiple:"","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[""!==e.url?r("el-avatar",{attrs:{size:100,src:e.url}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)},a=[],o=s(7877),l={props:["currentUser"],data(){return{url:""===this.currentUser.avatar?null:"http://localhost:8088/image/userAvatar/"+this.currentUser.avatar,file:null}},methods:{handleAvatarSuccess(e,r){this.imageUrl=URL.createObjectURL(r.raw)},beforeAvatarUpload(e){const r="image/jpeg"===e.type,s=e.size/1024/1024<2;return r||this.$message.error("上传头像图片只能是 JPG 格式!"),s||this.$message.error("上传头像图片大小不能超过 2MB!"),this.file=e,r&&s},uploadHttpRequest(){const e=new FormData;e.append("file",this.file),o.Z.avatorEdit(e).then((e=>{this.file=null,this.$store.commit("SET_USERINFO",e.data.data)}))}}},i=l,m=s(1001),n=(0,m.Z)(i,t,a,!1,null,"5b269788",null),u=n.exports},1427:function(e,r,s){s.r(r),s.d(r,{default:function(){return d}});var t=function(){var e=this,r=e._self._c;return r("div",[r("el-row",[r("el-col",{staticStyle:{padding:"0 10px"},attrs:{lg:7,xs:8,sm:8,md:8}},[r("el-card",{staticStyle:{"margin-bottom":"20px"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",{staticStyle:{"font-size":"16px"}},[e._v("关于我")])]),r("div",[r("div",{staticClass:"box-center"},[r("avator",{attrs:{currentUser:e.form}})],1),r("div",{staticClass:"user-role text-center text-muted"},[e._v(" "+e._s(e.form.realName)+" ")])]),r("div",{staticClass:"user-bio"},[r("div",{staticClass:"user-bio-section"},[r("div",{staticClass:"user-bio-section-header"},[r("span",[e._v("个人简介")])]),r("div",[r("div",{staticClass:"text-muted"},[e._v("注册时间："+e._s(e.dateFormat(e.form.createTime)))])])])])])],1),r("el-col",{staticStyle:{padding:"0 10px"},attrs:{lg:17,xs:14,sm:14,md:14}},[r("el-card",[r("el-tabs",{model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"资料修改",name:"first"}},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",rules:e.rules}},[r("el-form-item",{attrs:{label:"用户名：",prop:"userName",required:""}},[r("el-input",{attrs:{disabled:""},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"真实姓名：",prop:"realName",required:""}},[r("el-input",{model:{value:e.form.realName,callback:function(r){e.$set(e.form,"realName",r)},expression:"form.realName"}})],1),r("el-form-item",{attrs:{label:"手机号：",prop:"phoneNumber",required:""}},[r("el-input",{model:{value:e.form.phoneNumber,callback:function(r){e.$set(e.form,"phoneNumber",r)},expression:"form.phoneNumber"}})],1),r("el-form-item",{attrs:{label:"邮箱：",prop:"email",required:""}},[r("el-input",{model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),r("el-form-item",{attrs:{label:"性别：",required:""}},[r("el-select",{attrs:{placeholder:"性别",clearable:""},model:{value:e.form.sex,callback:function(r){e.$set(e.form,"sex",r)},expression:"form.sex"}},e._l(e.sexEnum,(function(e){return r("el-option",{key:e.key,attrs:{value:e.value,label:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"出生日期：",required:""}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.birthDay,callback:function(r){e.$set(e.form,"birthDay",r)},expression:"form.birthDay"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("更新")])],1)],1)],1),r("el-tab-pane",{attrs:{label:"密码修改",name:"second"}},[r("el-form",{ref:"form",attrs:{model:e.passwordForm,"label-width":"100px",rules:e.rules}},[r("el-form-item",{attrs:{label:"旧密码：",prop:"password",required:""}},[r("el-input",{model:{value:e.passwordForm.password,callback:function(r){e.$set(e.passwordForm,"password",r)},expression:"passwordForm.password"}})],1),r("el-form-item",{attrs:{label:"新密码：",prop:"newPassword",required:""}},[r("el-input",{model:{value:e.passwordForm.newPassword,callback:function(r){e.$set(e.passwordForm,"newPassword",r)},expression:"passwordForm.newPassword"}})],1),r("el-form-item",{attrs:{label:"确认密码：",prop:"confirmPassword",required:""}},[r("el-input",{model:{value:e.passwordForm.confirmPassword,callback:function(r){e.$set(e.passwordForm,"confirmPassword",r)},expression:"passwordForm.confirmPassword"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.modifyPasswordForm}},[e._v("更新")])],1)],1)],1)],1)],1)],1)],1)],1)},a=[],o=(s(7658),s(7877)),l=s(2050),i={components:{avator:l["default"]},data(){return{form:{},sexEnum:[{key:!0,value:"男"},{key:!1,value:"女"}],rules:{realName:[{required:!0,message:"请输入真实姓名",trigger:"blur"}],realName:[{required:!0,message:"请输入真实姓名",trigger:"change"}],newPassword:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"密码长度不小于6个字符",trigger:"blur"}],confirmPassword:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"密码长度不小于6个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},passwordForm:{},activeName:"first"}},created(){this.getUser()},methods:{getUser(){this.form=this.$store.state.userInfo},submitForm(){o.Z.userInfoEdit(this.form).then((e=>{200===e.code?(this.$message.success("修改成功"),this.$store.commit("SET_USERINFO",e.data),this.getUser()):this.$message.error(e.message)}))},modifyPasswordForm(){this.$refs.form.validate((e=>{e&&(this.passwordForm.newPassword!==this.passwordForm.confirmPassword?this.$message.error("两次密码不同,请确认"):o.Z.passwordEdit(this.passwordForm).then((e=>{200===e.code?(this.$store.commit("REMOVE_INFO"),this.$router.push("/login"),this.$message.success("修改成功,请重新登录")):this.$message.error(e.message)})))}))},dateFormat(e){if(console.log(e),e>0){var r=new Date(Number(e)),s=r.getFullYear()+"-",t=(r.getMonth()+1<10?"0"+(r.getMonth()+1):r.getMonth()+1)+"-",a=r.getDate()+" ",o=r.getHours()+":",l=r.getMinutes()+":",i=r.getSeconds()<10?"0"+r.getSeconds():r.getSeconds();return s+t+a+o+l+i}return e}}},m=i,n=s(1001),u=(0,n.Z)(m,t,a,!1,null,"3979f084",null),d=u.exports}}]);
//# sourceMappingURL=1427.8bbfa253.js.map