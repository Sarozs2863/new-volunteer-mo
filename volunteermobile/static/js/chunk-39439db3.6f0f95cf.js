(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39439db3"],{5530:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n("b64b"),n("a4d3"),n("4de4"),n("d3b7"),n("e439"),n("159b"),n("dbb4");var i=n("ade3");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},"8cb6":function(e,t,n){},ade3:function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return i}))},e382:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"wrap"},[n("div",{staticClass:"top_bar"},[n("van-nav-bar",{style:{display:"android"==e.platform?"":"none"},attrs:{"left-text":"返回","left-arrow":"",title:"用户信息",fixed:"",placeholder:""},on:{"click-left":function(t){return e.$router.go(-1)}}})],1),n("div",{staticClass:"user_form"},[n("van-field",{attrs:{label:"姓名：",disabled:""},model:{value:e.userInfo.studentName,callback:function(t){e.$set(e.userInfo,"studentName",t)},expression:"userInfo.studentName"}}),n("van-field",{attrs:{label:"学号：",disabled:""},model:{value:e.userInfo.studentNum,callback:function(t){e.$set(e.userInfo,"studentNum",t)},expression:"userInfo.studentNum"}}),n("van-field",{attrs:{label:"届别：",disabled:""},model:{value:e.userInfo.level,callback:function(t){e.$set(e.userInfo,"level",t)},expression:"userInfo.level"}}),n("van-field",{attrs:{label:"学院：",disabled:""},model:{value:e.userInfo.collegeName,callback:function(t){e.$set(e.userInfo,"collegeName",t)},expression:"userInfo.collegeName"}}),n("van-field",{attrs:{label:"班级：",disabled:""},model:{value:e.userInfo.className,callback:function(t){e.$set(e.userInfo,"className",t)},expression:"userInfo.className"}}),n("van-field",{attrs:{label:"身份证号："},model:{value:e.userInfo.idCardNumber,callback:function(t){e.$set(e.userInfo,"idCardNumber",t)},expression:"userInfo.idCardNumber"}}),n("van-field",{attrs:{label:"联系电话："},model:{value:e.userInfo.phone,callback:function(t){e.$set(e.userInfo,"phone",t)},expression:"userInfo.phone"}}),n("van-field",{attrs:{label:"qq号："},model:{value:e.userInfo.qqNum,callback:function(t){e.$set(e.userInfo,"qqNum",t)},expression:"userInfo.qqNum"}}),n("div",{staticClass:"native_place_picker"},[n("van-field",{attrs:{label:"籍贯："},on:{click:function(t){e.nativePlacePicker=!0},focus:e.noBomBox},model:{value:e.userInfo.native,callback:function(t){e.$set(e.userInfo,"native",t)},expression:"userInfo.native"}}),n("van-popup",{attrs:{position:"bottom"},model:{value:e.nativePlacePicker,callback:function(t){e.nativePlacePicker=t},expression:"nativePlacePicker"}},[n("van-picker",{attrs:{columns:e.nativePlaceList,"show-toolbar":""},on:{confirm:e.nativePlaceConfirm,cancel:function(t){e.nativePlacePicker=!1},change:e.getCityList}})],1)],1),n("div",{staticClass:"nation_picker"},[n("van-field",{attrs:{label:"民族："},on:{click:function(t){e.nationPicker=!0},focus:e.noBomBox},model:{value:e.userInfo.nationName,callback:function(t){e.$set(e.userInfo,"nationName",t)},expression:"userInfo.nationName"}}),n("van-popup",{attrs:{position:"bottom"},model:{value:e.nationPicker,callback:function(t){e.nationPicker=t},expression:"nationPicker"}},[n("van-picker",{attrs:{columns:Object.values(e.nationDict),"show-toolbar":""},on:{confirm:e.nationConfirm,cancel:function(t){e.nationPicker=!1}}})],1)],1),n("div",{staticClass:"politic_picker"},[n("van-field",{attrs:{label:"政治面貌："},on:{click:function(t){e.politicPicker=!0},focus:e.noBomBox},model:{value:e.userInfo.politicalOutlookName,callback:function(t){e.$set(e.userInfo,"politicalOutlookName",t)},expression:"userInfo.politicalOutlookName"}}),n("van-popup",{attrs:{position:"bottom"},model:{value:e.politicPicker,callback:function(t){e.politicPicker=t},expression:"politicPicker"}},[n("van-picker",{attrs:{columns:Object.values(e.politicalOutlookDict),"show-toolbar":""},on:{confirm:e.politicConfirm,cancel:function(t){e.politicPicker=!1}}})],1)],1),n("div",{staticClass:"dorm_picker"},[n("van-field",{attrs:{label:"校区及寝室：",placeholder:"校区-栋-楼层"},on:{click:function(t){e.dormPicker=!0},focus:e.noBomBox},model:{value:e.userInfo.dormName,callback:function(t){e.$set(e.userInfo,"dormName",t)},expression:"userInfo.dormName"}}),n("van-popup",{attrs:{position:"bottom"},model:{value:e.dormPicker,callback:function(t){e.dormPicker=t},expression:"dormPicker"}},[n("van-picker",{attrs:{columns:e.dormList,"show-toolbar":""},on:{confirm:e.dormConfirm,cancel:function(t){e.dormPicker=!1}}})],1)],1),n("van-field",{attrs:{label:"寝室门牌号：",type:"digit"},model:{value:e.userInfo.dormitoryHouseNum,callback:function(t){e.$set(e.userInfo,"dormitoryHouseNum",t)},expression:"userInfo.dormitoryHouseNum"}}),n("div",{staticClass:"timeToVolunteer"},[n("van-field",{attrs:{label:"空闲时间：",readonly:""}}),n("div",{staticClass:"spare_time_table"},[n("table",[e._m(0),n("tr",[n("th",[e._v("上午")]),e._l(e.morning,(function(t,i){return n("th",{key:i},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.timeList,expression:"timeList"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.timeList)?e._i(e.timeList,t)>-1:e.timeList},on:{change:function(n){var i=e.timeList,r=n.target,o=!!r.checked;if(Array.isArray(i)){var a=t,s=e._i(i,a);r.checked?s<0&&(e.timeList=i.concat([a])):s>-1&&(e.timeList=i.slice(0,s).concat(i.slice(s+1)))}else e.timeList=o}}})])}))],2),n("tr",[n("th",[e._v("下午")]),e._l(e.afternoon,(function(t,i){return n("th",{key:i},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.timeList,expression:"timeList"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.timeList)?e._i(e.timeList,t)>-1:e.timeList},on:{change:function(n){var i=e.timeList,r=n.target,o=!!r.checked;if(Array.isArray(i)){var a=t,s=e._i(i,a);r.checked?s<0&&(e.timeList=i.concat([a])):s>-1&&(e.timeList=i.slice(0,s).concat(i.slice(s+1)))}else e.timeList=o}}})])}))],2),n("tr",[n("th",[e._v("晚上")]),e._l(e.evening,(function(t,i){return n("th",{key:i},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.timeList,expression:"timeList"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.timeList)?e._i(e.timeList,t)>-1:e.timeList},on:{change:function(n){var i=e.timeList,r=n.target,o=!!r.checked;if(Array.isArray(i)){var a=t,s=e._i(i,a);r.checked?s<0&&(e.timeList=i.concat([a])):s>-1&&(e.timeList=i.slice(0,s).concat(i.slice(s+1)))}else e.timeList=o}}})])}))],2)])])],1),n("div",{staticClass:"intention"},[n("van-field",{attrs:{label:"服务意向："}}),n("van-checkbox-group",{attrs:{direction:"horizontal"},model:{value:e.userInfo.serverIntention,callback:function(t){e.$set(e.userInfo,"serverIntention",t)},expression:"userInfo.serverIntention"}},[e._l(e.intentionList,(function(t,i){return n("div",{key:i},[n("van-checkbox",{attrs:{name:t.id,shape:"square"}},[e._v(e._s(t.serverName))])],1)})),n("van-checkbox",{attrs:{disabled:"",shape:"square"}},[e._v("海外服务")])],2)],1),n("van-field",{attrs:{label:"专业特长：",type:"textarea",autosize:""},model:{value:e.userInfo.professionalExpertise,callback:function(t){e.$set(e.userInfo,"professionalExpertise",t)},expression:"userInfo.professionalExpertise"}}),n("van-field",{attrs:{label:"爱好及技能：",type:"textarea",autosize:""},model:{value:e.userInfo.hobbiesAndSkills,callback:function(t){e.$set(e.userInfo,"hobbiesAndSkills",t)},expression:"userInfo.hobbiesAndSkills"}}),n("div",{staticClass:"btn"},[n("van-button",{staticStyle:{width:"9rem","margin-top":"0.2rem"},attrs:{type:"info",round:""},on:{click:function(t){return e.doModUserInfo()}}},[e._v("确认修改")])],1)],1)])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",[n("th",[e._v("时段\\星期")]),n("th",[e._v("一")]),n("th",[e._v("二")]),n("th",[e._v("三")]),n("th",[e._v("四")]),n("th",[e._v("五")]),n("th",[e._v("六")]),n("th",[e._v("日")])])}],o=n("1da1"),a=n("5530"),s=(n("96cf"),n("d3b7"),n("ddb0"),n("d81d"),n("159b"),n("99af"),n("caad"),n("2f62"));n("ac1f"),n("00b4"),n("498a");function c(e){var t=/^[1-9][0-9]{4,10}$/;return t.test(e)}function u(e){var t=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;return t.test(e)}function l(e){var t=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;return t.test(e)}var f=n("c24f"),d={data:function(){return{userInfo:{},nativePlacePicker:!1,nationPicker:!1,politicPicker:!1,dormPicker:!1,levelList:[],collegeDict:{},provinceDict:{},cityDict:{},nationDict:{},politicalOutlookDict:{},buildingDict:{},nativePlaceList:[{values:[]},{values:[]}],morning:[1,2,3,4,5,6,7],afternoon:[8,9,10,11,12,13,14],evening:[15,16,17,18,19,20,21],intentionList:[],dormList:[{text:"黄家湖",children:[]},{text:"青山",children:[]}],timeList:[]}},computed:Object(a["a"])({},Object(s["c"])(["platform"])),mounted:function(){this.initList()},methods:{initList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,i,r,o,a,s,c,u,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(f["m"])().then((function(t){e.nativePlaceList[0].values=t.data.map((function(e){return e.provinceName})),t.data.forEach((function(t){e.provinceDict[t.provinceName]=t.id}))}));case 2:return t.next=4,Object(f["l"])().then((function(t){t.data.forEach((function(t){e.politicalOutlookDict[t.id]=t.politicalOutlookName}))}));case 4:return t.next=6,Object(f["k"])().then((function(t){t.data.forEach((function(t){e.nationDict[t.id]=t.nationName}))}));case 6:return t.next=8,Object(f["b"])({campus:1});case 8:return n=t.sent,i=n.data,t.next=12,Object(f["b"])({campus:2});case 12:for(r=t.sent,o=r.data,a=i.concat(o),a.forEach((function(t){e.buildingDict[t.id]=t.buildingName})),s=0;s<a.length;s++)1===a[s].campus?e.dormList[0].children.push({text:i[s].buildingName,children:[]}):2===a[s].campus&&e.dormList[1].children.push({text:a[s].buildingName,children:[]});for(c=0;c<e.dormList.length;c++)for(u=0;u<e.dormList[c].children.length;u++)for(l=1;l<=7;l++)e.dormList[c].children[u].children.push({text:l});return t.next=20,Object(f["h"])().then((function(t){e.intentionList=t.data,e.intentionList.pop()}));case 20:return t.next=22,Object(f["f"])().then((function(t){e.userInfo=t.data,e.userInfo.nationName=e.nationDict[t.data.nationId],null!=t.data.provinceName&&(e.userInfo.native=t.data.provinceName+(t.data.provinceId>4?t.data.cityName:"")),null!=t.data.campus&&(e.userInfo.dormName=(1===e.userInfo.campus?"黄家湖校区-":"青山校区-")+e.buildingDict[t.data.dormitoryBuilding]+"-"+e.userInfo.dormitoryLayer+"层"),null!=e.userInfo.timeToVolunteerList&&(e.timeList=e.userInfo.timeToVolunteerList)}));case 22:case"end":return t.stop()}}),t)})))()},getCityList:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var i,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(f["a"])({provinceId:n.provinceDict[t[0]]});case 2:i=e.sent,r=i.data,n.nativePlaceList[1].values=r.map((function(e){return e.cityName})),r.forEach((function(e){n.cityDict[e.cityName]=e.id}));case 6:case"end":return e.stop()}}),e)})))()},doModUserInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n={phone:e.userInfo.phone,qqNum:e.userInfo.qqNum,idCardNumber:e.userInfo.idCardNumber,politicalOutlook:e.userInfo.politicalOutlook,provinceId:e.userInfo.provinceId,cityId:e.userInfo.cityId,nationId:e.userInfo.nationId,campus:e.userInfo.campus,dormitoryBuilding:e.userInfo.dormitoryBuilding,dormitoryLayer:e.userInfo.dormitoryLayer,dormitoryHouseNum:e.userInfo.dormitoryHouseNum,timeToVolunteer:e.timeList,professionalExpertise:e.userInfo.professionalExpertise,hobbiesAndSkills:e.userInfo.hobbiesAndSkills,serverIntention:e.userInfo.serverIntention},""!=n.cityId&&void 0!=n.cityId||delete n.cityId,t.t0=regeneratorRuntime.keys(n);case 3:if((t.t1=t.t0()).done){t.next=10;break}if(i=t.t1.value,n[i]){t.next=8;break}return e.$toast("请填写完整！"),t.abrupt("return");case 8:t.next=3;break;case 10:if(0!=n.timeToVolunteer.length){t.next=15;break}return e.$toast("请选择空闲时间！"),t.abrupt("return");case 15:if(0!=n.serverIntention.length){t.next=18;break}return e.$toast("请选择服务意向！"),t.abrupt("return");case 18:if(u(n.idCardNumber)){t.next=23;break}return e.$toast("身份证输入格式错误!"),t.abrupt("return");case 23:if(l(n.phone)){t.next=28;break}return e.$toast("手机号输入格式错误！"),t.abrupt("return");case 28:if(c(n.qqNum)){t.next=31;break}return e.$toast("qq号输入格式错误"),t.abrupt("return");case 31:return t.next=33,Object(f["j"])(n).then((function(t){0==t.code?(e.$toast.success("修改成功！"),setTimeout((function(){e.$router.back(-1)}),2e3)):e.$toast(t.msg)}));case 33:case"end":return t.stop()}}),t)})))()},noBomBox:function(e){document.activeElement.blur()},nativePlaceConfirm:function(e){var t=["北京市","天津市","重庆市","上海市"];this.userInfo.native=e[0]+(void 0===e[1]?"":e[1]),t.includes(e[0])?(this.userInfo.provinceName=e[0],this.userInfo.provinceId=this.provinceDict[this.userInfo.provinceName],this.userInfo.cityId=""):(this.userInfo.provinceName=e[0],this.userInfo.cityName=e[1],this.userInfo.provinceId=this.provinceDict[this.userInfo.provinceName],this.userInfo.cityId=this.cityDict[this.userInfo.cityName]),this.nativePlacePicker=!1},politicConfirm:function(e){for(var t in this.userInfo.politicalOutlookName=e,this.politicalOutlookDict)this.userInfo.politicalOutlookName==this.politicalOutlookDict[t]&&(this.userInfo.politicalOutlook=t);this.politicPicker=!1},nationConfirm:function(e){for(var t in this.userInfo.nationName=e,this.nationDict)this.nationDict[t]==e&&(this.userInfo.nationId=t);this.nationPicker=!1},dormConfirm:function(e){switch(this.userInfo.dormName=e[0]+"校区-"+e[1]+"-"+e[2]+"层",e[0]){case"黄家湖":this.userInfo.campus=1;break;case"青山":this.userInfo.campus=2;break}for(var t in this.buildingDict)e[1]==this.buildingDict[t]&&(this.userInfo.dormitoryBuilding=t);this.userInfo.dormitoryLayer=e[2],this.dormPicker=!1}}},m=d,p=(n("e9e2"),n("2877")),v=Object(p["a"])(m,i,r,!1,null,"2b60ab2d",null);t["default"]=v.exports},e9e2:function(e,t,n){"use strict";n("8cb6")}}]);