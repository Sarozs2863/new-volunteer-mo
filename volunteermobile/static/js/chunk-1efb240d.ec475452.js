(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1efb240d"],{"3b08":function(t,e,n){"use strict";n("7601")},7601:function(t,e,n){},8053:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"copyright"},[n("van-row",[t._v("领航工作室出品")]),n("van-row",[t._v("微信公众号：武科大助手")])],1)},s=[],r={name:"Copyright",data:function(){return{testCookie:""}},mounted:function(){this.getCookie()},methods:{getCookie:function(){this.testCookie=this.$cookies.get("cookie")}}},a=r,i=(n("3b08"),n("2877")),c=Object(i["a"])(a,o,s,!1,null,null,null);e["a"]=c.exports},"9f14f":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-nav-bar",{style:{display:"mp"===t.$store.state.platform?"none":""},attrs:{title:"违规举报","left-text":"返回",fixed:"",placeholder:"","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)},"click-right":t.onClickRight},scopedSlots:t._u([{key:"right",fn:function(){return[n("van-button",{staticClass:"fs-xxxxs",attrs:{plain:"",type:"info",size:"mini"}},[t._v("下一步")])]},proxy:!0}])}),n("van-notice-bar",{attrs:{color:"#1989fa",background:"#ecf9ff",scrollable:"","left-icon":"info-o"}},[t._v(" 此次举报将全程保护您的个人信息，请实事求是、放心填写！ ")]),n("van-row",{staticClass:"text-center m-1 fs-xxs",staticStyle:{"font-family":"华文行楷"}},[t._v(" 请选择举报原因 ")]),n("div",[n("van-radio-group",{on:{change:t.showOtherReasonArea},model:{value:t.reasons.reason,callback:function(e){t.$set(t.reasons,"reason",e)},expression:"reasons.reason"}},[n("van-cell-group",[n("van-cell",{attrs:{title:"1. 参与志愿服务活动时迟到或早退。",clickable:""},on:{click:function(e){t.reasons.reason="1"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"1"}})]},proxy:!0}])}),n("van-cell",{attrs:{title:"2. 参与志愿活动旷到。",clickable:""},on:{click:function(e){t.reasons.reason="2"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"2"}})]},proxy:!0}])}),n("van-cell",{attrs:{title:"3. 从事与工作无关或影响志愿活动开展的个人活动",clickable:""},on:{click:function(e){t.reasons.reason="3"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"3"}})]},proxy:!0}])}),n("van-cell",{attrs:{title:"4. 其他理由",clickable:""},on:{click:function(e){t.reasons.reason="4"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"4"}})]},proxy:!0}])}),n("van-cell",{scopedSlots:t._u([{key:"right-icon",fn:function(){return[t.showOtherReason?n("van-field",{attrs:{rows:"4",autosize:"",type:"textarea",placeholder:t.palceholder},model:{value:t.reasons.reasonOther,callback:function(e){t.$set(t.reasons,"reasonOther",e)},expression:"reasons.reasonOther"}}):t._e()]},proxy:!0}])})],1)],1)],1),n("Copyright")],1)},s=[],r=n("8053"),a={components:{Copyright:r["a"]},data:function(){return{palceholder:"请输入具体原因",showOtherReason:!1,reasons:{reason:"",reasonOther:""}}},methods:{onClickRight:function(){""===this.reasons.reason?this.$toast("您还未选择任何举报原因！请先选择。"):"4"===this.reasons.reason&&""===this.reasons.reasonOther?this.$toast("请填写具体其他原因"):("4"===this.reasons.reason||(this.reasons.reasonOther="无其他原因"),this.$router.push({name:"Details",params:{reasons:this.reasons}}))},showOtherReasonArea:function(){this.showOtherReason="4"===this.reasons.reason}}},i=a,c=n("2877"),l=Object(c["a"])(i,o,s,!1,null,null,null);e["default"]=l.exports}}]);