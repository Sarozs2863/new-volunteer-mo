(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76499c8b"],{"139e":function(t,e,a){},"16c0":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"blue-area"},[s("van-notice-bar",{attrs:{"left-icon":"volume-o",text:t.notice}}),s("van-row",{staticClass:"d-flex jc-end"},[s("van-icon",{staticClass:"m-10 ",attrs:{name:"question-o",size:"23px",color:"#fff"},on:{click:function(e){t.guideDialogShow=!0}}})],1),s("van-dialog",{attrs:{title:"用户反馈","confirm-button-color":"#006eff"},model:{value:t.guideDialogShow,callback:function(e){t.guideDialogShow=e},expression:"guideDialogShow"}},[s("div",{staticClass:"feedback"},[t._v(" "+t._s(t.notice)+" ")])]),s("UserInfo",{staticClass:"user-info"})],1),s("ValidCodeCard",{staticClass:"card main-card d-flex jc-center mt-2"}),s("FuncArea",{staticClass:"func-area",staticStyle:{"margin-top":"15px"}}),s("ActList"),s("copyright"),s("van-dialog",{attrs:{title:"用户登录","show-cancel-button":"",confirmButtonColor:"#1989FA"},on:{confirm:t.webLogin},model:{value:t.loginDialogShow,callback:function(e){t.loginDialogShow=e},expression:"loginDialogShow"}},[s("div",{staticStyle:{"margin-top":"20px"}},[s("van-field",{attrs:{label:"学号",placeholder:"请输入学号"},model:{value:t.stuNo,callback:function(e){t.stuNo=e},expression:"stuNo"}}),s("van-field",{attrs:{label:"密码",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)]),s("van-dialog",{attrs:{confirmButtonColor:"#1989FA"},model:{value:t.showQRCode,callback:function(e){t.showQRCode=e},expression:"showQRCode"}},[s("div",{staticClass:"QR_code"},[s("div",{staticClass:"tips_intro"},[s("div",{staticStyle:{"text-align":"center"}},[s("img",{attrs:{width:"100",height:"100",src:a("a2e2")}})]),s("div",{staticClass:"intro_text"},[t._v("        武汉科技大学青年志愿者服务总队欢迎各位同学加入我校志愿者行列,我校志愿者一直秉持着奉献、友爱、互助、进步的志愿精神!期待和你的志愿之旅! “志”同道合,“愿”你同行。获取更多志愿资讯,欢迎扫码关注下列总队官方账号！ ")]),s("div",{staticClass:"tips_save"},[t._v(" 长按图片可保存 ")])]),s("div",{staticClass:"tips_codes"},[s("div",{staticClass:"code_items"},[s("img",{attrs:{width:"120",height:"120",src:a("61cc")}}),s("div",{staticStyle:{"margin-top":"-10px"}},[s("span",{staticClass:"code_type"},[t._v("微信")])])]),s("div",{staticClass:"code_items"},[s("img",{attrs:{width:"110",height:"110",src:a("bc72")}}),s("div",[s("span",{staticClass:"code_type"},[t._v("QQ")])])])])])])],1)},o=[],n=a("1da1"),i=a("5530"),r=(a("96cf"),a("ac1f"),a("5319"),a("2f62")),c=a("c24f"),A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"act_list_card"},[a("van-row",{staticClass:"nav",attrs:{type:"flex",justify:"space-between"}},[a("van-col",{staticClass:"left"},[a("van-col",[a("van-icon",{staticClass:"icon_list",attrs:{name:"todo-list-o"}})],1),a("van-col",{staticClass:"title"},[t._v("近期活动")])],1),a("van-col",{staticClass:"right",on:{click:t.toAllActList}},[a("van-col",{staticClass:"title"},[t._v("查看全部活动")]),a("van-col",[a("van-icon",{staticClass:"icon_arrow",attrs:{name:"arrow"}})],1)],1)],1),a("van-skeleton",{staticClass:"skeleton2",attrs:{row:3,loading:!1,animate:!1}},[t.$store.state.recentActs.length>0?a("ActCard",{attrs:{actList:t.$store.state.recentActs}}):a("van-empty",{staticClass:"null_list",attrs:{description:"你好像还没有参加过志愿活动哦！"}})],1)],1)},l=[],u=a("bee1"),d={name:"ActList",components:{ActCard:u["a"]},data:function(){return{loading:!0}},methods:{toAllActList:function(){this.$router.push("/actList")}}},f=d,g=(a("6a8f"),a("2877")),C=Object(g["a"])(f,A,l,!1,null,"56106694",null),m=C.exports,v=a("8053"),E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-row",{staticClass:"mt-2"},[a("van-password-input",{attrs:{info:"在上方输入正确的认证码，即可提交工时",value:t.verifyCode,mask:!1,gutter:10,length:6,focused:t.showKeyboard},on:{focus:function(e){t.showKeyboard=!0}}}),a("div",{staticClass:"d-flex jc-center mt-1"},[a("van-button",{staticClass:"mt-1 submit-btn ",attrs:{type:"info",block:"",disabled:t.verifyCode.length<6},on:{click:function(e){return t.commitVerifyCode()}}},[t._v("提交工时")])],1),a("van-number-keyboard",{attrs:{maxlength:6,show:t.showKeyboard},on:{blur:function(e){t.showKeyboard=!1}},model:{value:t.verifyCode,callback:function(e){t.verifyCode=e},expression:"verifyCode"}})],1)],1)},h=[],k=a("0c6d");function Q(t){return Object(k["a"])({url:"/volunteer/public/timetableInfo/",method:"GET",params:{randomString:t}})}var p={data:function(){return{verifyCode:"",showKeyboard:!1}},methods:{commitVerifyCode:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,s,o,n,i,r,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Q(t.verifyCode);case 2:if(a=e.sent,null!==a.data){e.next=6;break}return t.$toast({message:"六位随机码无效！随机码错误或者过期"}),e.abrupt("return");case 6:s=a.data.activityId,o=a.data.volunteerCheckId,n=a.data.activityDate,i=a.data.activityName,r=a.data.volunteerTimes,c=a.data.crater,t.$router.push({name:"ApproveAct",params:{activityId:s,sheetId:o,activityDate:n,randomString:t.verifyCode,volunteerTimes:r,crater:c,activityName:i}});case 13:case"end":return e.stop()}}),e)})))()}}},B=p,w=(a("4a4f"),Object(g["a"])(B,E,h,!1,null,null,null)),J=w.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-row",{staticClass:"d-flex jc-center "},[a("van-image",{attrs:{round:"",width:"2.5rem",height:"2.5rem",src:t.$store.state.gender},on:{click:t.jumpToUserInfo}})],1),a("van-row",{staticStyle:{"margin-top":"5px"},attrs:{type:"flex",justify:"center"}},[a("span",{staticClass:" fs-xxs text-background"},[t._v(t._s(t.$store.state.userInfo.studentName))]),a("div",{staticClass:"user-statu"},[a("van-tag",{attrs:{type:t.$store.state.creditTag,size:"large "}},[t._v(t._s(t.$store.state.creditLevel))])],1)]),a("van-row",{staticClass:"fs-xxxs d-flex jc-center",staticStyle:{"line-height":"20px"},attrs:{gutter:"20"}},[a("van-col",{staticClass:"stu_college text-background"},[t._v(t._s(t.$store.state.userInfo.collegeName))]),a("van-col",{staticClass:"stu_num text-background"},[t._v(t._s(t.$store.state.userInfo.studentNum))])],1)],1)},S=[],b={data:function(){return{}},mounted:function(){},methods:{jumpToUserInfo:function(){this.$store.state.volunteerToken?this.$router.push("/user"):this.$toast("未检测到用户信息！")}}},y=b,x=(a("a370"),Object(g["a"])(y,I,S,!1,null,null,null)),T=x.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"z-index":"-1"}},[a("van-grid",{attrs:{"column-num":3,clickable:"",border:!1}},[a("van-grid-item",{key:1,attrs:{to:"/actrecruit",icon:"todo-list-o",text:"活动招募"}}),a("van-grid-item",{key:2,attrs:{to:"/creditlevel",icon:"smile-o",text:"信用等级"}}),a("van-grid-item",{key:3,attrs:{to:"/mytimes",icon:"notes-o",text:"工时概览"}}),a("van-grid-item",{key:4,attrs:{to:"/report",icon:"warn-o",text:"违规举报"}}),a("van-grid-item",{key:5,attrs:{to:"/reportlist",icon:"eye-o",text:"举报记录"}}),a("van-grid-item",{key:6,attrs:{to:"",icon:"edit",text:"活动策划"},on:{click:t.checkIt}})],1)],1)},N=[],O={data:function(){return{}},methods:{checkIt:function(){this.$toast("该功能暂未开放!\n如有需要请前往管理端使用！")}}},q=O,D=Object(g["a"])(q,R,N,!1,null,null,null),j=D.exports,P={name:"HomePage",components:{ValidCodeCard:J,UserInfo:T,FuncArea:j,ActList:m,copyright:v["a"]},data:function(){return{guideDialogShow:!1,notice:"用户反馈qq群：926518229。若工时信息与志愿者证不对应，请联系该活动的活动负责人或向院青队咨询",loginDialogShow:!1,stuNo:"",password:"",userData:{},showQRCode:!1}},activated:function(){this.verifyCode="",this.showPopover=!1,this.userData=this.$store.state.userInfo},methods:Object(i["a"])({testPlatform:function(){return this.$cookies.get("cookie")?"android":this.$route.query.platform?"mp"===this.$route.query.platform?"mp":"ios"===this.$route.query.platform&&"ios":void 0},getPlatformToken:function(){var t=this.testPlatform();if(!t)return!1;switch(this.$store.commit("setPlatform",t),t){case"android":this.$store.commit("setPlatformToken",this.$cookies.get("cookie"));break;case"mp":this.$route.query.token?this.$store.commit("setPlatformToken",this.$route.query.token):this.$router.replace("/404");break;case"ios":this.$route.query.token?this.$store.commit("setPlatformToken",this.$route.query.token):this.$router.replace("/404");break}},init:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=t.getPlatformToken()){e.next=4;break}t.loginDialogShow=!0,e.next=15;break;case 4:return e.next=6,t.setVolunteerToken();case 6:return e.next=8,t.setUserInfo();case 8:return t.$store.state.userInfo.phone||(t.showQRCode=!0),e.next=11,t.setHourView();case 11:return e.next=13,t.setRecentActs();case 13:return e.next=15,t.setCreditLevel();case 15:case"end":return e.stop()}}),e)})))()},webLogin:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={stuNum:t.stuNo,jwcPwd:t.password},e.next=3,Object(c["i"])(a);case 3:s=e.sent,1e4==s.code?document.cookie="cookie="+s.data:t.$toast(s.msg),t.init();case 6:case"end":return e.stop()}}),e)})))()}},Object(r["b"])(["setVolunteerToken","setUserInfo","setHourView","setRecentActs","setCreditLevel"])),mounted:function(){this.init()}},V=P,_=(a("6bf0"),Object(g["a"])(V,s,o,!1,null,"4188c18a",null));e["default"]=_.exports},"30b5a":function(t,e,a){},"3b08":function(t,e,a){"use strict";a("7601")},"46c9":function(t,e,a){},"4a4f":function(t,e,a){"use strict";a("46c9")},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("b64b"),a("a4d3"),a("4de4"),a("d3b7"),a("e439"),a("159b"),a("dbb4");var s=a("ade3");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function n(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"61cc":function(t,e,a){t.exports=a.p+"static/img/zdwx.24429aba.png"},"6a8f":function(t,e,a){"use strict";a("f4f9")},"6bf0":function(t,e,a){"use strict";a("30b5a")},7601:function(t,e,a){},8053:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"copyright"},[a("van-row",[t._v("领航工作室出品")]),a("van-row",[t._v("微信公众号：武科大助手")])],1)},o=[],n={name:"Copyright",data:function(){return{testCookie:""}},mounted:function(){this.getCookie()},methods:{getCookie:function(){this.testCookie=this.$cookies.get("cookie")}}},i=n,r=(a("3b08"),a("2877")),c=Object(r["a"])(i,s,o,!1,null,null,null);e["a"]=c.exports},"98fa":function(t,e,a){"use strict";a("c5e5")},a2e2:function(t,e,a){t.exports=a.p+"static/img/groupflag.d58cdbe6.png"},a370:function(t,e,a){"use strict";a("139e")},ade3:function(t,e,a){"use strict";function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a.d(e,"a",(function(){return s}))},bc72:function(t,e){t.exports="data:image/png;base64,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"},bee1:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.actList,(function(e,s){return a("van-row",{key:s,staticClass:"act_card",attrs:{type:"flex",justify:"space-around"}},[a("van-col",{staticClass:"left",attrs:{span:"13"}},[a("van-row",{staticClass:"act_name"},[t._v(t._s(e.activityName))]),a("div",{staticClass:"date_crater"},[a("div",{staticClass:"date"},[t._v(t._s(e.activityDate))]),a("div",{staticClass:"crater"},[t._v(t._s(e.crater))])]),a("van-row",{staticClass:"organization"},[t._v(t._s(e.organizationName))])],1),a("van-col",{staticClass:"right"},[a("van-row",{staticClass:"hour"},[t._v(t._s(parseFloat(e.volunteerTime).toFixed(1))+"h")]),a("van-row",[5==e.volunteerStatus?a("van-tag",{attrs:{type:"primary ",size:"large"}},[t._v("已认证")]):a("van-tag",{attrs:{type:"warning",size:"large"}},[t._v("未认证")])],1)],1)],1)})),1)},o=[],n={name:"ActCard",props:["actList"],computed:{},methods:{},created:function(){}},i=n,r=(a("98fa"),a("2877")),c=Object(r["a"])(i,s,o,!1,null,"628db017",null);e["a"]=c.exports},c5e5:function(t,e,a){},f4f9:function(t,e,a){}}]);