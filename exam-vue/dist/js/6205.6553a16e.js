(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[6205],{6205:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return h}});var a=function(){var t=this,e=t._self._c;return e("div",[e("el-row",{attrs:{gutter:40}},[e("el-col",{attrs:{xs:12,sm:12,lg:6}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-kaoshishijuan"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("试卷总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.papersCount,duration:2600}})],1)])])],1),e("el-col",{attrs:{xs:12,sm:12,lg:6}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-timu"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("题目总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.questionsCount,duration:2600}})],1)])])],1),e("el-col",{attrs:{xs:12,sm:12,lg:6}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-dajuanbaogao"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("答卷总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.answersCount,duration:2600}})],1)])])],1),e("el-col",{attrs:{xs:12,sm:12,lg:6}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-banjiguanli-"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("班级总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.gradesCount,duration:2600}})],1)])])],1)],1),e("el-row",{staticStyle:{"margin-top":"10px"},attrs:{gutter:40}},[e("el-col",{attrs:{xs:12,sm:12,lg:12}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-xueshengguanli-"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("学生总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.studentCount,duration:2600}})],1)])])],1),e("el-col",{attrs:{xs:12,sm:12,lg:12}},[e("el-card",[e("div",{staticStyle:{display:"flex"}},[e("div",[e("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-kecheng"}})])]),e("div",{staticStyle:{flex:"1"}}),e("div",{staticStyle:{"line-height":"45px",height:"45px",color:"#8c8c8c","font-size":"20px","font-weight":"560"}},[e("p",[t._v("课程总数")]),e("count-to",{attrs:{"start-val":0,"end-val":t.tableData.coursesCount,duration:2600}})],1)])])],1)],1),e("el-row",{staticClass:"echarts-line"},[e("div",{staticStyle:{width:"100%",height:"calc(100vh - 420px)","background-color":"#fff","margin-top":"30px","padding-top":"28px"},attrs:{id:"echarts-line"}})])],1)},n=[],s=i(8194),r=i(7221),l=i.n(r),o={components:{CountTo:l()},data(){return{tableData:[],myChart:null}},created(){this.search()},methods:{search(){this.myChart.setOption(this.option(["1","2","3","4","5"],["2","3","4","5","5"]))},option(t,e){return{title:{text:"日考试数量折线图",x:"center",y:"top",textAlign:"center"},tooltip:{},xAxis:{data:t},yAxis:{data:["0","2","4","6","8","10"]},series:[{name:"考试数量",type:"line",data:e}]}}},mounted(){this.myChart=s.S1(document.getElementById("echarts-line"))}},u=o,c=i(1001),d=(0,c.Z)(u,a,n,!1,null,"ff40665c",null),h=d.exports},7221:function(t){!function(e,i){t.exports=i()}(0,(function(){return function(t){function e(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,i){var a=i(4)(i(1),i(5),null,null);t.exports=a.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,i,a){return i*(1-Math.pow(2,-10*t/a))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,a.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,a.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,a.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,a.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,a.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var e=t.split("."),i=e[0],a=e.length>1?this.decimal+e[1]:"",n=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;n.test(i);)i=i.replace(n,"$1"+this.separator+"$2");return this.prefix+i+a+this.suffix}},destroyed:function(){(0,a.cancelAnimationFrame)(this.rAF)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(0),n=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=n.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",n.default)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=0,n="webkit moz ms o".split(" "),s=void 0,r=void 0;if("undefined"==typeof window)e.requestAnimationFrame=s=function(){},e.cancelAnimationFrame=r=function(){};else{e.requestAnimationFrame=s=window.requestAnimationFrame,e.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var l=void 0,o=0;o<n.length&&(!s||!r);o++)l=n[o],e.requestAnimationFrame=s=s||window[l+"RequestAnimationFrame"],e.cancelAnimationFrame=r=r||window[l+"CancelAnimationFrame"]||window[l+"CancelRequestAnimationFrame"];s&&r||(e.requestAnimationFrame=s=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-a)),n=window.setTimeout((function(){t(e+i)}),i);return a=e+i,n},e.cancelAnimationFrame=r=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=s,e.cancelAnimationFrame=r},function(t,e){t.exports=function(t,e,i,a){var n,s=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(n=t,s=t.default);var l="function"==typeof s?s.options:s;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),i&&(l._scopeId=i),a){var o=Object.create(l.computed||null);Object.keys(a).forEach((function(t){var e=a[t];o[t]=function(){return e}})),l.computed=o}return{esModule:n,exports:s,options:l}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])}))}}]);
//# sourceMappingURL=6205.6553a16e.js.map