"use strict";(self["webpackChunkapp"]=self["webpackChunkapp"]||[]).push([[2038],{2038:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var s=function(){var t=this,e=t._self._c;return e("span",{staticStyle:{color:"#ff0000","font-weight":"700"}},[t._v(t._s(t.min)+"分钟"+t._s(t.sec)+"秒")])},i=[],o={name:"ExamTimer",props:["time"],data(){return{leftSeconds:0,min:"00",sec:"00"}},created(){this.leftSeconds=60*this.time,this.countdown()},methods:{countdown(){if(this.leftSeconds<0)return void this.$emit("timeout");const t=parseInt(this.leftSeconds/60),e=parseInt(this.leftSeconds%60);this.min=t>9?t:"0"+t,this.sec=e>9?e:"0"+e,this.leftSeconds-=1;const n=this;setTimeout((function(){n.countdown()}),1e3)}}},c=o,u=n(1001),r=(0,u.Z)(c,s,i,!1,null,null,null),f=r.exports}}]);
//# sourceMappingURL=2038.4d161db7.js.map