(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad663aee"],{"1c65":function(t,e,a){"use strict";a("eb5a")},2909:function(t,e,a){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function r(t){if(Array.isArray(t))return n(t)}a.d(e,"a",(function(){return s}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function c(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}a("fb6a"),a("b0c0"),a("ac1f"),a("00b4");function o(t,e){if(t){if("string"===typeof t)return n(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(t,e):void 0}}a("d9e2");function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return r(t)||c(t)||o(t)||i()}},"3b08":function(t,e,a){"use strict";a("7601")},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));a("b64b"),a("a4d3"),a("4de4"),a("d3b7"),a("e439"),a("159b"),a("dbb4");var n=a("ade3");function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},7601:function(t,e,a){},8053:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"copyright"},[a("van-row",[t._v("领航工作室出品")]),a("van-row",[t._v("微信公众号：武科大助手")])],1)},r=[],c={name:"Copyright",data:function(){return{testCookie:""}},mounted:function(){this.getCookie()},methods:{getCookie:function(){this.testCookie=this.$cookies.get("cookie")}}},o=c,i=(a("3b08"),a("2877")),s=Object(i["a"])(o,n,r,!1,null,null,null);e["a"]=s.exports},"98fa":function(t,e,a){"use strict";a("c5e5")},ade3:function(t,e,a){"use strict";function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a.d(e,"a",(function(){return n}))},bee1:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.actList,(function(e,n){return a("van-row",{key:n,staticClass:"act_card",attrs:{type:"flex",justify:"space-around"}},[a("van-col",{staticClass:"left",attrs:{span:"13"}},[a("van-row",{staticClass:"act_name"},[t._v(t._s(e.activityName))]),a("div",{staticClass:"date_crater"},[a("div",{staticClass:"date"},[t._v(t._s(e.activityDate))]),a("div",{staticClass:"crater"},[t._v(t._s(e.crater))])]),a("van-row",{staticClass:"organization"},[t._v(t._s(e.organizationName))])],1),a("van-col",{staticClass:"right"},[a("van-row",{staticClass:"hour"},[t._v(t._s(parseFloat(e.volunteerTime).toFixed(1))+"h")]),a("van-row",[5==e.volunteerStatus?a("van-tag",{attrs:{type:"primary ",size:"large"}},[t._v("已认证")]):a("van-tag",{attrs:{type:"warning",size:"large"}},[t._v("未认证")])],1)],1)],1)})),1)},r=[],c={name:"ActCard",props:["actList"],computed:{},methods:{},created:function(){}},o=c,i=(a("98fa"),a("2877")),s=Object(i["a"])(o,n,r,!1,null,"628db017",null);e["a"]=s.exports},c5e5:function(t,e,a){},db63:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap"},[t.flag_scroll?a("div",{staticClass:"back_to_top"},[a("van-icon",{staticClass:"back_btn",attrs:{name:"arrow-up"},on:{click:t.backTop}})],1):t._e(),a("van-nav-bar",{style:{display:"mp"===t.$store.state.platform?"none":""},attrs:{title:"活动列表","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":function(e){return t.$router.go(-1)}}}),a("div",{staticClass:"content"},[0==t.actList.length?a("van-empty",{attrs:{description:"你还没有参与过志愿活动哦！"}}):a("van-list",{attrs:{finished:t.finished,"finished-text":"快去参加更多的志愿活动吧！"},on:{load:t.getActList},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[t.actList.length>0?a("ActCard",{attrs:{actList:t.actList}}):t._e()],1)],1),a("Copyright")],1)},r=[],c=a("2909"),o=a("1da1"),i=a("5530"),s=(a("96cf"),a("99af"),a("bee1")),l=a("8053"),u=a("2f62"),f=a("c24f"),d={name:"AllActList",data:function(){return{actList:[],finished:!1,pageNum:1,loading:!1,flag_scroll:!1}},computed:Object(i["a"])({},Object(u["c"])(["getActsList","platform"])),components:{ActCard:s["a"],Copyright:l["a"]},mounted:function(){window.addEventListener("scroll",this.handleScroll,!0),this.getActList()},methods:{selectApproved:function(){},getActList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={currPage:t.pageNum},e.next=3,Object(f["c"])(a).then((function(e){t.loading=!1;var a=e.data.list;t.pageNum>1?t.actList=[].concat(Object(c["a"])(t.actList),Object(c["a"])(a)):t.actList=a,e.data.currPage===e.data.totalPage&&(t.finished=!0),e.data.totalPage>e.data.currPage&&t.pageNum++}));case 3:case"end":return e.stop()}}),e)})))()},backTop:function(){var t=document.getElementsByClassName("wrap")[0].scrollTop,e=setInterval((function(){document.getElementsByClassName("wrap")[0].scrollTop=t-=50,t<=0&&clearInterval(e)}),20)},handleScroll:function(){var t=document.getElementsByClassName("wrap")[0].scrollTop;this.flag_scroll=t>200}}},p=d,b=(a("1c65"),a("2877")),v=Object(b["a"])(p,n,r,!1,null,"0c0a27b8",null);e["default"]=v.exports},eb5a:function(t,e,a){}}]);