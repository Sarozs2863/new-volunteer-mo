(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ccc77ef"],{"131f":function(t,s,e){},b3b4:function(t,s,e){"use strict";e("131f")},f7da:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t._self._c;return s("div",[s("van-nav-bar",{style:{display:"mp"===t.$store.state.platform?"none":""},attrs:{title:"信用等级","left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":function(s){return t.$router.go(-1)}}}),s("div",{staticClass:"creditCard"},[s("van-row",{staticClass:"creditItems"},[s("van-col",{staticClass:"items-font"},[t._v("您的信用等级：")]),s("van-col",[s("van-rate",{attrs:{readonly:"",count:"3",size:25,color:"#1989fa","void-icon":"star","void-color":"#eee"},model:{value:t.currentCreditLevel,callback:function(s){t.currentCreditLevel=s},expression:"currentCreditLevel"}})],1)],1),s("van-row",{staticClass:"creditItems"},[s("van-col",{staticClass:"items-font"},[t._v("累计0星次数："+t._s(t.timesZero)+"次")])],1)],1),s("div",{staticClass:"creditTips"},[s("van-row",{staticClass:"title"},[t._v("信用等级规则")]),s("van-row",{staticClass:"details"},[s("van-row",{staticClass:"tips-items"},[t._v("1.信用等级划分为1至3星，初始每位志愿者都是3星")]),s("van-row",{staticClass:"tips-items"},[t._v("2.参与志愿服务活动，被举报且被核实为迟到（早退），一次降1星")]),s("van-row",{staticClass:"tips-items"},[t._v("3.被举报且被核实为旷到，一次降2星")]),s("van-row",{staticClass:"tips-items"},[t._v("4.被举报且被核实为从事与工作无关或影响志愿服务活动开展的个人活动，一次降1星")]),s("van-row",{staticClass:"tips-items"},[t._v("5.其他情况，酌情降星")]),s("br"),s("van-row",{staticClass:"tips-items"},[t._v("• 第一次等级降级为0星，在60天内禁止参与志愿服务活动 ")]),s("van-row",{staticClass:"tips-items"},[t._v("• 第二次等级降为0星，在该学期禁止参与志愿服务活动，且该学期所做志愿活动获得的工时清0")]),s("van-row",{staticClass:"tips-items"},[t._v("• 第三次等级降为0星，在该学年禁止参与志愿服务活动，且该学年所做志愿活动获得的工时清0")]),s("van-row",{staticClass:"tips-items"},[t._v("• 第四次等级降为0星，将被禁止参与志愿服务活动")])],1)],1)],1)},a=[],r={data:function(){return{currentCreditLevel:3,timesZero:0}},mounted:function(){this.currentCreditLevel=this.$store.state.creditLevelCount,this.timesZero=this.$store.state.punishedTimes}},n=r,c=(e("b3b4"),e("2877")),o=Object(c["a"])(n,i,a,!1,null,null,null);s["default"]=o.exports}}]);