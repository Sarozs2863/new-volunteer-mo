(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09d944b8"],{a368:function(t,s,e){"use strict";e("ac61")},ac61:function(t,s,e){},f7da:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("van-nav-bar",{style:{display:"mp"===t.$store.state.platform?"none":""},attrs:{title:"信用等级","left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":function(s){return t.$router.go(-1)}}}),e("div",{staticClass:"creditCard"},[e("van-row",{staticClass:"creditItems"},[e("van-col",{staticClass:"items-font"},[t._v("您的信用等级：")]),e("van-col",[e("van-rate",{attrs:{readonly:"",count:"3",size:25,color:"#1989fa","void-icon":"star","void-color":"#eee"},model:{value:t.creditlevel,callback:function(s){t.creditlevel=s},expression:"creditlevel"}})],1)],1),e("van-row",{staticClass:"creditItems"},[e("van-col",{staticClass:"items-font"},[t._v("累计0星次数："+t._s(t.zeroTimes)+"次")])],1)],1),e("div",{staticClass:"creditTips"},[e("van-row",{staticClass:"title"},[t._v("信用等级规则")]),e("van-row",{staticClass:"details"},[e("van-row",{staticClass:"tips-items"},[t._v("1.信用等级划分为1至3星，初始每位志愿者都是3星")]),e("van-row",{staticClass:"tips-items"},[t._v("2.参与志愿服务活动，被举报且被核实为迟到（早退），一次降1星")]),e("van-row",{staticClass:"tips-items"},[t._v("3.被举报且被核实为旷到，一次降2星")]),e("van-row",{staticClass:"tips-items"},[t._v("4.被举报且被核实为从事与工作无关或影响志愿服务活动开展的个人活动，一次降1星")]),e("van-row",{staticClass:"tips-items"},[t._v("5.其他情况，酌情降星")]),e("br"),e("van-row",{staticClass:"tips-items"},[t._v("• 第一次等级降级为0星，在60天内禁止参与志愿服务活动 ")]),e("van-row",{staticClass:"tips-items"},[t._v("• 第二次等级降为0星，在该学期禁止参与志愿服务活动，且该学期所做志愿活动获得的工时清0")]),e("van-row",{staticClass:"tips-items"},[t._v("• 第三次等级降为0星，在该学年禁止参与志愿服务活动，且该学年所做志愿活动获得的工时清0")]),e("van-row",{staticClass:"tips-items"},[t._v("• 第四次等级降为0星，将被禁止参与志愿服务活动")])],1)],1)],1)},i=[],l={data:function(){return{creditlevel:2,zeroTimes:0}},mounted:function(){this.creditlevel=this.$store.state.creditLevelCount,this.zeroTimes=this.$store.state.punishedTimes}},n=l,r=(e("a368"),e("2877")),c=Object(r["a"])(n,a,i,!1,null,null,null);s["default"]=c.exports}}]);