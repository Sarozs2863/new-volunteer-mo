(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b8c96a7"],{"16c0":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"blue-area"},[e("van-notice-bar",{attrs:{"left-icon":"volume-o",text:t.notice}}),e("van-row",{staticClass:"d-flex jc-end"},[e("van-icon",{staticClass:"m-10",attrs:{name:"question-o",size:"23px",color:"#fff"},on:{click:function(e){t.guideDialogShow=!0}}})],1),e("van-dialog",{attrs:{title:"用户反馈","confirm-button-color":"#006eff"},model:{value:t.guideDialogShow,callback:function(e){t.guideDialogShow=e},expression:"guideDialogShow"}},[e("div",{staticClass:"feedback"},[t._v(" "+t._s(t.notice)+" ")])]),e("UserInfo",{staticClass:"user-info"})],1),e("ValidCodeCard",{staticClass:"card main-card d-flex jc-center mt-2"}),e("FuncArea",{staticClass:"func-area",staticStyle:{"margin-top":"15px"}}),e("ActList"),e("copyright"),e("van-dialog",{attrs:{title:"用户登录","show-cancel-button":"",confirmButtonColor:"#1989FA"},on:{confirm:t.webLogin},model:{value:t.loginDialogShow,callback:function(e){t.loginDialogShow=e},expression:"loginDialogShow"}},[e("div",{staticStyle:{"margin-top":"20px"}},[e("van-field",{attrs:{label:"学号",placeholder:"请输入学号"},model:{value:t.stuNo,callback:function(e){t.stuNo=e},expression:"stuNo"}}),e("van-field",{attrs:{type:"password",label:"密码",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)]),e("van-dialog",{attrs:{confirmButtonColor:"#1989FA"},model:{value:t.showQRCode,callback:function(e){t.showQRCode=e},expression:"showQRCode"}},[e("div",{staticClass:"QR_code"},[e("div",{staticClass:"tips_intro"},[e("div",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{width:"100",height:"100",src:s("a2e2")}})]),e("div",{staticClass:"intro_text"},[t._v("        武汉科技大学青年志愿者服务总队欢迎各位同学的加入，我校志愿者一直秉持着奉献、友爱、互助、进步的志愿精神！“志”同道合，“愿”你同行。欢迎扫码关注下列总队官方账号，期待和你的志愿之旅！ ")]),e("div",{staticClass:"tips_save"},[t._v("截图至对应APP扫描")])]),e("div",{staticClass:"tips_codes"},[e("div",{staticClass:"code_items"},[e("img",{attrs:{width:"120",height:"120",src:s("3736")}}),e("div",{staticStyle:{"margin-top":"-10px"}},[e("span",{staticClass:"code_type"},[t._v("微信")])])]),e("div",{staticClass:"code_items"},[e("img",{attrs:{width:"110",height:"110",src:s("91d4")}}),e("div",[e("span",{staticClass:"code_type"},[t._v("QQ")])])])])])])],1)},n=[],o=s("758a"),c=s("2aab"),i=s("94ad"),r=(s("aa48"),s("3446"),s("7736")),l=s("c24f"),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"act_list_card"},[e("van-row",{staticClass:"nav",attrs:{type:"flex",justify:"space-between"}},[e("van-col",{staticClass:"left"},[e("van-col",[e("van-icon",{staticClass:"icon_list",attrs:{name:"todo-list-o"}})],1),e("van-col",{staticClass:"title"},[t._v("近期活动")])],1),e("van-col",{staticClass:"right",on:{click:t.toAllActList}},[e("van-col",{staticClass:"title"},[t._v("查看全部活动")]),e("van-col",[e("van-icon",{staticClass:"icon_arrow",attrs:{name:"arrow"}})],1)],1)],1),e("van-skeleton",{staticClass:"skeleton2",attrs:{row:3,loading:!1,animate:!1}},[t.$store.state.recentActs.length>0?e("ActCard",{attrs:{actList:t.$store.state.recentActs}}):e("van-empty",{staticClass:"null_list",attrs:{description:"你好像还没有参加过志愿活动哦！"}})],1)],1)},u=[],f=(s("4e3f"),s("bee1")),b={name:"ActList",components:{ActCard:f["a"]},data:function(){return{loading:!0}},methods:{toAllActList:function(){this.$router.push("/actList")}}},j=b,m=(s("c498"),s("0b56")),v=Object(m["a"])(j,d,u,!1,null,"56106694",null),h=v.exports,p=s("8053"),g=function(){var t=this,e=t._self._c;return e("div",[e("van-row",{staticClass:"mt-2"},[e("van-password-input",{attrs:{info:"在上方输入正确的认证码，即可提交工时",value:t.verifyCode,mask:!1,gutter:10,length:6,focused:t.showKeyboard},on:{focus:function(e){t.showKeyboard=!0}}}),e("div",{staticClass:"d-flex jc-center mt-1"},[e("van-button",{staticClass:"mt-1 submit-btn",attrs:{type:"info",block:"",disabled:t.verifyCode.length<6},on:{click:function(e){return t.commitVerifyCode()}}},[t._v("提交工时")])],1),e("van-number-keyboard",{attrs:{maxlength:6,show:t.showKeyboard},on:{blur:function(e){t.showKeyboard=!1}},model:{value:t.verifyCode,callback:function(e){t.verifyCode=e},expression:"verifyCode"}})],1)],1)},k=[],w=s("0c6d");function y(t){return Object(w["a"])({url:"/volunteer/public/timetableInfo/",method:"GET",params:{randomString:t}})}var C={data:function(){return{verifyCode:"",showKeyboard:!1}},methods:{commitVerifyCode:function(){var t=this;return Object(c["a"])(Object(o["a"])().mark((function e(){var s,a,n,c,i,r,l;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,y(t.verifyCode);case 2:if(s=e.sent,null!==s.data){e.next=6;break}return t.$toast({message:"六位随机码无效！随机码错误或者过期"}),e.abrupt("return");case 6:a=s.data.activityId,n=s.data.volunteerCheckId,c=s.data.participateDate,i=s.data.activityName,r=s.data.volunteerTimes,l=s.data.crater,t.$router.push({name:"ApproveAct",params:{activityId:a,sheetId:n,participateDate:c,randomString:t.verifyCode,volunteerTimes:r,crater:l,activityName:i}});case 13:case"end":return e.stop()}}),e)})))()}}},x=C,_=(s("d85a"),Object(m["a"])(x,g,k,!1,null,null,null)),$=_.exports,z=function(){var t=this,e=t._self._c;return e("div",[e("van-row",{staticClass:"d-flex jc-center"},[e("van-image",{attrs:{round:"",width:"2.5rem",height:"2.5rem",src:t.$store.state.gender},on:{click:t.jumpToUserInfo}})],1),e("van-row",{staticStyle:{"margin-top":"5px"},attrs:{type:"flex",justify:"center"}},[e("span",{staticClass:"fs-xxs text-background"},[t._v(t._s(t.$store.state.userInfo.studentName))]),e("div",{staticClass:"user-statu"},[e("van-tag",{attrs:{type:t.$store.state.creditTag,size:"large "}},[t._v(t._s(t.$store.state.creditLevel))])],1)]),e("van-row",{staticClass:"fs-xxxs d-flex jc-center",staticStyle:{"line-height":"20px"},attrs:{gutter:"20"}},[e("van-col",{staticClass:"stu_college text-background"},[t._v(t._s(t.$store.state.userInfo.collegeName))]),e("van-col",{staticClass:"stu_num text-background"},[t._v(t._s(t.$store.state.userInfo.studentNum))])],1)],1)},O=[],A={data:function(){return{}},mounted:function(){},methods:{jumpToUserInfo:function(){this.$store.state.volunteerToken?this.$router.push("/user"):this.$toast("未检测到用户信息！")}}},D=A,S=(s("e693"),Object(m["a"])(D,z,O,!1,null,null,null)),I=S.exports,T=function(){var t=this,e=t._self._c;return e("div",{staticStyle:{"z-index":"-1"}},[e("van-grid",{attrs:{"column-num":3,clickable:"",border:!1}},[e("van-grid-item",{key:1,attrs:{to:"/actrecruit",icon:"todo-list-o",text:"活动招募"}}),e("van-grid-item",{key:2,attrs:{to:"/creditlevel",icon:"smile-o",text:"信用等级"}}),e("van-grid-item",{key:3,attrs:{to:"/mytimes",icon:"notes-o",text:"工时概览"}}),e("van-grid-item",{key:4,attrs:{to:"/report",icon:"warn-o",text:"违规举报"}}),e("van-grid-item",{key:5,attrs:{to:"/reportlist",icon:"eye-o",text:"举报记录"}}),e("van-grid-item",{key:6,attrs:{to:"",icon:"edit",text:"活动策划"},on:{click:t.checkIt}})],1)],1)},L=[],N={data:function(){return{}},methods:{checkIt:function(){this.$toast("该功能暂未开放!\n如有需要请前往管理端使用！")}}},q=N,P=Object(m["a"])(q,T,L,!1,null,null,null),Q=P.exports,R={name:"HomePage",components:{ValidCodeCard:$,UserInfo:I,FuncArea:Q,ActList:h,copyright:p["a"]},data:function(){return{guideDialogShow:!1,notice:"用户反馈QQ群：926518229。若工时信息与志愿者证不对应，请联系该活动的活动负责人或向院青队咨询",loginDialogShow:!1,stuNo:"",password:"",userData:{},showQRCode:!1}},activated:function(){this.verifyCode="",this.userData=this.$store.state.userInfo},methods:Object(i["a"])({testPlatform:function(){return this.$cookies.get("cookie")?"android":this.$route.query.platform?"mp"===this.$route.query.platform?"mp":"ios"===this.$route.query.platform&&"ios":void 0},getPlatformToken:function(){var t=this.testPlatform();if(!t)return!1;switch(this.$store.commit("setPlatform",t),t){case"android":this.$store.commit("setPlatformToken",this.$cookies.get("cookie"));break;case"mp":this.$route.query.token?this.$store.commit("setPlatformToken",this.$route.query.token):this.$router.replace("/404");break;case"ios":this.$route.query.token?this.$store.commit("setPlatformToken",this.$route.query.token):this.$router.replace("/404");break}},init:function(){var t=this;return Object(c["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=t.getPlatformToken()){e.next=4;break}t.loginDialogShow=!0,e.next=15;break;case 4:return e.next=6,t.setVolunteerToken();case 6:return e.next=8,t.setUserInfo();case 8:return t.$store.state.userInfo.phone||(t.showQRCode=!0),e.next=11,t.setHourView();case 11:return e.next=13,t.setRecentActs();case 13:return e.next=15,t.setCreditLevel();case 15:case"end":return e.stop()}}),e)})))()},webLogin:function(){var t=this;return Object(c["a"])(Object(o["a"])().mark((function e(){var s,a;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s={stuNum:t.stuNo,jwcPwd:t.password},e.next=3,Object(l["i"])(s);case 3:a=e.sent,1e4==a.code?document.cookie="cookie="+a.data:t.$toast(a.msg),t.init();case 6:case"end":return e.stop()}}),e)})))()}},Object(r["b"])(["setVolunteerToken","setUserInfo","setHourView","setRecentActs","setCreditLevel"])),mounted:function(){this.init(),this.showQRCode=!1}},U=R,V=(s("c829"),Object(m["a"])(U,a,n,!1,null,"336af843",null));e["default"]=V.exports},"1f35":function(t,e,s){"use strict";s("b7be")},"323f":function(t,e,s){},3736:function(t,e,s){t.exports=s.p+"static/img/zdwx.17f74802.jpg"},"44c8":function(t,e,s){},"4f9c":function(t,e,s){},"4ff0":function(t,e,s){},8053:function(t,e,s){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"copyright"},[e("van-row",[t._v("领航工作室出品")]),e("van-row",[t._v("微信公众号：武科大助手")])],1)},n=[],o={name:"Copyright",data:function(){return{testCookie:""}},mounted:function(){this.getCookie()},methods:{getCookie:function(){this.testCookie=this.$cookies.get("cookie")}}},c=o,i=(s("df0b"),s("0b56")),r=Object(i["a"])(c,a,n,!1,null,null,null);e["a"]=r.exports},"91d4":function(t,e,s){t.exports=s.p+"static/img/zdqq.7c02c4fe.jpg"},a2e2:function(t,e,s){t.exports=s.p+"static/img/groupflag.d58cdbe6.png"},b72a:function(t,e,s){},b7be:function(t,e,s){},bee1:function(t,e,s){"use strict";s("1376");var a=function(){var t=this,e=t._self._c;return e("div",t._l(t.actList,(function(s,a){return e("van-row",{key:a,staticClass:"act_card",attrs:{type:"flex",justify:"space-around"}},[e("van-col",{staticClass:"left",attrs:{span:"13"}},[e("van-row",{staticClass:"act_name"},[t._v(t._s(s.activityName))]),e("div",{staticClass:"date_crater"},[e("div",{staticClass:"date"},[t._v(t._s(t.formatDate(s.participateDate)))]),e("div",{staticClass:"crater"},[t._v(t._s(s.crater))])]),e("van-row",{staticClass:"organization"},[t._v(t._s(s.organizationName))])],1),e("van-col",{staticClass:"right"},[e("van-row",{staticClass:"hour"},[t._v(t._s(parseFloat(s.volunteerTime).toFixed(1))+"h")]),e("van-row",[5==s.volunteerStatus?e("van-tag",{attrs:{type:"primary ",size:"large"}},[t._v("已认证")]):e("van-tag",{attrs:{type:"warning",size:"large"}},[t._v("未认证")])],1)],1)],1)})),1)},n=[],o=s("2f42"),c=s.n(o),i={name:"ActCard",props:["actList"],computed:{},methods:{formatDate:function(t){return c()(t).format("YYYY-MM-DD")}},created:function(){}},r=i,l=(s("1f35"),s("0b56")),d=Object(l["a"])(r,a,n,!1,null,"6c8f087d",null);e["a"]=d.exports},c498:function(t,e,s){"use strict";s("b72a")},c829:function(t,e,s){"use strict";s("44c8")},d85a:function(t,e,s){"use strict";s("4ff0")},df0b:function(t,e,s){"use strict";s("4f9c")},e693:function(t,e,s){"use strict";s("323f")},f9ce1:function(t,e,s){var a={"./af":"6e3b","./af.js":"6e3b","./ar":"8888","./ar-dz":"6128","./ar-dz.js":"6128","./ar-kw":"a309","./ar-kw.js":"a309","./ar-ly":"7a31","./ar-ly.js":"7a31","./ar-ma":"02c0","./ar-ma.js":"02c0","./ar-sa":"4558","./ar-sa.js":"4558","./ar-tn":"f9ce","./ar-tn.js":"f9ce","./ar.js":"8888","./az":"7721","./az.js":"7721","./be":"e25c","./be.js":"e25c","./bg":"1f0b","./bg.js":"1f0b","./bm":"92cd","./bm.js":"92cd","./bn":"184e","./bn-bd":"7422","./bn-bd.js":"7422","./bn.js":"184e","./bo":"4acd","./bo.js":"4acd","./br":"03e8","./br.js":"03e8","./bs":"61a3","./bs.js":"61a3","./ca":"f855","./ca.js":"f855","./cs":"d4e6","./cs.js":"d4e6","./cv":"51ed","./cv.js":"51ed","./cy":"d892","./cy.js":"d892","./da":"21e4","./da.js":"21e4","./de":"1b69","./de-at":"7d15","./de-at.js":"7d15","./de-ch":"c033","./de-ch.js":"c033","./de.js":"1b69","./dv":"0581","./dv.js":"0581","./el":"7860","./el.js":"7860","./en-au":"b9cd","./en-au.js":"b9cd","./en-ca":"c889","./en-ca.js":"c889","./en-gb":"994c","./en-gb.js":"994c","./en-ie":"38b0","./en-ie.js":"38b0","./en-il":"863c","./en-il.js":"863c","./en-in":"160b","./en-in.js":"160b","./en-nz":"648a","./en-nz.js":"648a","./en-sg":"5c66","./en-sg.js":"5c66","./eo":"0e1f","./eo.js":"0e1f","./es":"7c4a","./es-do":"58da","./es-do.js":"58da","./es-mx":"4fcd","./es-mx.js":"4fcd","./es-us":"382c","./es-us.js":"382c","./es.js":"7c4a","./et":"63cd","./et.js":"63cd","./eu":"01ad","./eu.js":"01ad","./fa":"8280","./fa.js":"8280","./fi":"9f3c","./fi.js":"9f3c","./fil":"375c","./fil.js":"375c","./fo":"f731","./fo.js":"f731","./fr":"ff55","./fr-ca":"713c","./fr-ca.js":"713c","./fr-ch":"16be","./fr-ch.js":"16be","./fr.js":"ff55","./fy":"e89a","./fy.js":"e89a","./ga":"d532","./ga.js":"d532","./gd":"3ca6","./gd.js":"3ca6","./gl":"3ecb","./gl.js":"3ecb","./gom-deva":"d4cf","./gom-deva.js":"d4cf","./gom-latn":"9843","./gom-latn.js":"9843","./gu":"6ba0","./gu.js":"6ba0","./he":"fe0f","./he.js":"fe0f","./hi":"06e7","./hi.js":"06e7","./hr":"c472","./hr.js":"c472","./hu":"7877","./hu.js":"7877","./hy-am":"7bac","./hy-am.js":"7bac","./id":"0ec9","./id.js":"0ec9","./is":"bb0e","./is.js":"bb0e","./it":"6277","./it-ch":"6e33","./it-ch.js":"6e33","./it.js":"6277","./ja":"32ac","./ja.js":"32ac","./jv":"1bc3","./jv.js":"1bc3","./ka":"b80f","./ka.js":"b80f","./kk":"f3e3","./kk.js":"f3e3","./km":"f5b7","./km.js":"f5b7","./kn":"fd71","./kn.js":"fd71","./ko":"19ea","./ko.js":"19ea","./ku":"ea9d","./ku.js":"ea9d","./ky":"38ef","./ky.js":"38ef","./lb":"7887","./lb.js":"7887","./lo":"3973","./lo.js":"3973","./lt":"0853","./lt.js":"0853","./lv":"8f6f","./lv.js":"8f6f","./me":"20fe","./me.js":"20fe","./mi":"0dd4","./mi.js":"0dd4","./mk":"1e98","./mk.js":"1e98","./ml":"70a7","./ml.js":"70a7","./mn":"bb40","./mn.js":"bb40","./mr":"3ff9","./mr.js":"3ff9","./ms":"7625","./ms-my":"12c6","./ms-my.js":"12c6","./ms.js":"7625","./mt":"b082d","./mt.js":"b082d","./my":"5a95","./my.js":"5a95","./nb":"66aa","./nb.js":"66aa","./ne":"fa04","./ne.js":"fa04","./nl":"474b","./nl-be":"4802","./nl-be.js":"4802","./nl.js":"474b","./nn":"2875","./nn.js":"2875","./oc-lnc":"71ba","./oc-lnc.js":"71ba","./pa-in":"d879","./pa-in.js":"d879","./pl":"ad76","./pl.js":"ad76","./pt":"e15c","./pt-br":"7d70","./pt-br.js":"7d70","./pt.js":"e15c","./ro":"a02a","./ro.js":"a02a","./ru":"5fc8","./ru.js":"5fc8","./sd":"661e","./sd.js":"661e","./se":"eb7c","./se.js":"eb7c","./si":"e4f1","./si.js":"e4f1","./sk":"9de7","./sk.js":"9de7","./sl":"e05e","./sl.js":"e05e","./sq":"0f2a","./sq.js":"0f2a","./sr":"5be6","./sr-cyrl":"ebd0","./sr-cyrl.js":"ebd0","./sr.js":"5be6","./ss":"f9c9","./ss.js":"f9c9","./sv":"dd25","./sv.js":"dd25","./sw":"f63b","./sw.js":"f63b","./ta":"a9b5","./ta.js":"a9b5","./te":"652d","./te.js":"652d","./tet":"200a","./tet.js":"200a","./tg":"5d85","./tg.js":"5d85","./th":"6b54","./th.js":"6b54","./tk":"a28b","./tk.js":"a28b","./tl-ph":"a972","./tl-ph.js":"a972","./tlh":"efd1","./tlh.js":"efd1","./tr":"49ea","./tr.js":"49ea","./tzl":"5ebb","./tzl.js":"5ebb","./tzm":"d8d6","./tzm-latn":"b247","./tzm-latn.js":"b247","./tzm.js":"d8d6","./ug-cn":"0d0f","./ug-cn.js":"0d0f","./uk":"075f0","./uk.js":"075f0","./ur":"d52d","./ur.js":"d52d","./uz":"2b62","./uz-latn":"da6d","./uz-latn.js":"da6d","./uz.js":"2b62","./vi":"37de","./vi.js":"37de","./x-pseudo":"c818","./x-pseudo.js":"c818","./yo":"da39","./yo.js":"da39","./zh-cn":"baff","./zh-cn.js":"baff","./zh-hk":"be79","./zh-hk.js":"be79","./zh-mo":"b3c4","./zh-mo.js":"b3c4","./zh-tw":"f064","./zh-tw.js":"f064"};function n(t){var e=o(t);return s(e)}function o(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}n.keys=function(){return Object.keys(a)},n.resolve=o,t.exports=n,n.id="f9ce1"}}]);