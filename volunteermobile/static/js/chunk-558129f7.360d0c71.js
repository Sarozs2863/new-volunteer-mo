(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-558129f7"],{5759:function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"d",(function(){return n})),a.d(e,"b",(function(){return c})),a.d(e,"a",(function(){return l}));var i=a("0c6d");function r(t){return Object(i["a"])({url:"/recruit/list",method:"GET",hideloading:!0,params:t})}function n(t){return Object(i["a"])({url:"/recruit/add",method:"GET",hideloading:!0,params:{activityId:t}})}function c(){return Object(i["a"])({url:"/recruit/participated",method:"GET",hideloading:!0})}function l(t){return Object(i["a"])({url:"/recruit/deleteActivity",method:"GET",hideloading:!0,params:{activityId:t}})}},7651:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",[e("van-nav-bar",{style:{display:"mp"===t.$store.state.platform?"none":""},attrs:{title:"活动招募详情","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)}}}),e("van-cell-group",[e("van-cell",{attrs:{center:"",size:"large",title:"活动名称：",value:t.actDetails.activityName}}),e("van-cell",{attrs:{center:"",size:"large",title:"主办组织：",value:t.actDetails.organization}}),e("van-cell",{attrs:{center:"",size:"large",title:"工时数量：",value:t.actDetails.activityTime}}),e("van-cell",{attrs:{center:"",size:"large",title:"活动时间：",value:t.actDetails.activityEndTime}}),e("van-cell",{attrs:{center:"",size:"large",title:"活动地点：",value:t.actDetails.activityPlace}}),e("van-cell",{attrs:{center:"",size:"large",title:"活动简介：",value:t.actDetails.introductory}})],1),e("img",{attrs:{src:t.actDetails.qrCode,alt:"Error"}}),e("div",{staticStyle:{margin:"18px"}},[e("van-button",{attrs:{round:"",block:"",type:"danger"},on:{click:t.exitTheAct}},[t._v("退出活动")])],1)],1)},r=[],n=a("758a"),c=(a("c63a"),a("f2a7")),l=a("2aab"),s=(a("2ad0"),a("36fc")),u=a("5759"),o={data:function(){return{actDetails:{}}},mounted:function(){this.actDetails=this.$route.params.actDetail},methods:{exitTheAct:function(){var t=this;s["a"].confirm({title:"注意事项",message:"您是否确认要退出该活动？"}).then(Object(l["a"])(Object(n["a"])().mark((function e(){var a;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["a"])(t.actDetails.id);case 2:a=e.sent,0===a.code?(c["a"].success("退出成功！"),setTimeout((function(){t.$emit("refreshthelist"),t.$router.go(-1)}),1500)):c["a"].fail(a.msg);case 4:case"end":return e.stop()}}),e)})))).catch((function(){}))}}},d=o,f=(a("9aa9"),a("0b56")),v=Object(f["a"])(d,i,r,!1,null,"6efb3a42",null);e["default"]=v.exports},"9aa9":function(t,e,a){"use strict";a("bf08")},bf08:function(t,e,a){}}]);