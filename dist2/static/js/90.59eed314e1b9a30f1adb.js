webpackJsonp([90],{246:function(t,e,n){function o(t){n(719)}var a=n(62)(n(638),n(784),o,"data-v-f526a15e",null);t.exports=a.exports},638:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),a=(n.n(o),n(111));e.default={name:"logInMsg",data:function(){return{mobilePhone:"",identifyCode:"",mPhone_alert:!1,mIdenti_alert:!1,hYzm:!0,Yzm:"获取验证码",Yzm1:""}},created:function(){},watch:{mobilePhone:function(){var t=this,e=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;""!==t.mobilePhone&&e.test(t.mobilePhone)&&(t.mPhone_alert=!1)},identifyCode:function(){var t=this;""!==t.identifyCode&&t.identifyCode.length>=4&&(t.mIdenti_alert=!1)}},methods:{logIn:function(){var t=this;if(!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(t.mobilePhone)||""==t.mobilePhone)return t.mPhone_alert=!0,!1;if(""==t.identifyCode||t.identifyCode.length<4)return t.mIdenti_alert=!0,!1;var e={phone:t.mobilePhone,code:t.identifyCode};t.$store.dispatch("GET_LOGIN_MSG",e).then(function(e){"SUCCEED"===e.data.callStatus&&(a.a.setWapToken(e.data.token),a.a.setWapUser(e.data.data),n.i(o.Toast)({message:"登录成功",duration:1500}),console.log(e),t.mobilePhone="",t.identifyCode="",t.$router.push({path:"/"}))})},hasYzm:function(){var t=this,e=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,a=60;if(""==t.mobilePhone||!e.test(t.mobilePhone))return t.mPhone_alert=!0,!1;var i={phone:t.mobilePhone,type:2};t.$store.dispatch("GET_IDENTICODE",i).then(function(e){if("SUCCEED"===e.data.callStatus)for(var i=0;i<=60;i++)window.setTimeout(function(){0!=a?(t.hYzm=!1,t.Yzm1=a+"秒后重发验证",a--):(a=60,t.hYzm=!0,t.Yzm="获取验证码")},1e3*i);else n.i(o.Toast)({message:"手机号还未注册，请先注册",duration:1500})})},logInCode:function(){this.$router.push({path:"/logIn"})},back:function(){this.$router.go(-1)},register:function(){this.$router.push({path:"/register"})}}}},662:function(t,e,n){e=t.exports=n(242)(!0),e.push([t.i,".logIn_header[data-v-f526a15e]{width:100vw;height:9.73333vw;line-height:9.73333vw;position:relative;padding-bottom:10vw;border-bottom:.13333vw solid #e9e9e9;margin-bottom:10.66667vw}.header_back[data-v-f526a15e]{width:2.4vw;height:3.86667vw;margin-left:2vw;margin-top:3vw}.logWithCode[data-v-f526a15e]{position:absolute;top:0;bottom:0;left:0;right:0;margin:0 auto;width:26.66667vw;height:9.73333vw;line-height:9.73333vw;display:inline-block;text-align:center;font-size:4.8vw;color:#333}.logWithMsg[data-v-f526a15e]{float:right;font-size:4.26667vw;color:#999;margin-right:2vw}.mobilePhone[data-v-f526a15e]{width:77.33333vw}.mobilePhone[data-v-f526a15e],.pwd[data-v-f526a15e]{height:12vw;border:1px solid #e9e9e9;padding-left:5.33333vw;color:#333}.pwd[data-v-f526a15e]{width:49.33333vw}.getCode[data-v-f526a15e]{display:inline-block;width:25.33333vw;height:12vw;line-height:12vw;background-color:#3676b5;color:#fff;text-align:center;font-size:3.06667vw;-webkit-transform:translateY(-2%);transform:translateY(-2%);margin-left:1.33333vw}.mobilePhone[data-v-f526a15e]:focus,.pwd[data-v-f526a15e]:focus{border:1px solid #3676b5!important}.mobilePhone_box[data-v-f526a15e]{text-align:center;margin-top:9.2vw}.pwd_box[data-v-f526a15e]{width:77.33333vw;height:12vw;margin:auto;text-align:center;margin-top:9.2vw;margin-bottom:13vw}.logIn_btn[data-v-f526a15e]{font-size:4.53333vw;background-color:#3676b5;color:#fff;box-shadow:0 0 7px #3676b5;display:block}.logIn_btn[data-v-f526a15e],.rg_btn[data-v-f526a15e]{width:77.33333vw;height:12vw;line-height:12vw;margin:auto;text-align:center}.rg_btn[data-v-f526a15e]{font-size:3.73333vw;margin-bottom:17.33333vw}.error[data-v-f526a15e]{position:absolute;left:12vw;font-size:3.46667vw;color:#cb1700}","",{version:3,sources:["D:/yayiApp/src/components/Wap/logIn/logInMsg.vue"],names:[],mappings:"AACA,+BACE,YAAa,AACb,iBAAkB,AAClB,sBAAuB,AACvB,kBAAmB,AACnB,oBAAqB,AACrB,qCAAuC,AACvC,wBAA0B,CAC3B,AACD,8BACE,YAAa,AACb,iBAAkB,AAClB,gBAAiB,AACjB,cAAgB,CACjB,AACD,8BACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,OAAQ,AACR,QAAS,AACT,cAAe,AACf,iBAAkB,AAClB,iBAAkB,AAClB,sBAAuB,AACvB,qBAAsB,AACtB,kBAAmB,AACnB,gBAAiB,AACjB,UAAY,CACb,AACD,6BACE,YAAa,AACb,oBAAqB,AACrB,WAAe,AACf,gBAAkB,CACnB,AACD,8BACE,gBAAkB,CAKnB,AACD,oDALE,YAAa,AACb,yBAA0B,AAC1B,uBAAwB,AACxB,UAAe,CAQhB,AAND,sBACE,gBAAkB,CAKnB,AACD,0BACE,qBAAsB,AACtB,iBAAkB,AAClB,YAAa,AACb,iBAAkB,AAClB,yBAA0B,AAC1B,WAAY,AACZ,kBAAmB,AACnB,oBAAqB,AACrB,kCAAmC,AAC3B,0BAA2B,AACnC,qBAAuB,CACxB,AACD,gEACE,kCAAqC,CACtC,AACD,kCACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,0BACE,iBAAkB,AAClB,YAAa,AACb,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,kBAAoB,CACrB,AACD,4BAIE,oBAAqB,AACrB,yBAA0B,AAC1B,WAAY,AAGZ,2BAA4B,AAC5B,aAAe,CAChB,AACD,qDAXE,iBAAkB,AAClB,YAAa,AACb,iBAAkB,AAIlB,YAAa,AACb,iBAAmB,CAYpB,AARD,yBAIE,oBAAqB,AAGrB,wBAA0B,CAC3B,AACD,wBACE,kBAAmB,AACnB,UAAW,AACX,oBAAqB,AACrB,aAAe,CAChB",file:"logInMsg.vue",sourcesContent:["\n.logIn_header[data-v-f526a15e] {\n  width: 100vw;\n  height: 9.73333vw;\n  line-height: 9.73333vw;\n  position: relative;\n  padding-bottom: 10vw;\n  border-bottom: 0.13333vw solid #e9e9e9;\n  margin-bottom: 10.66667vw;\n}\n.header_back[data-v-f526a15e] {\n  width: 2.4vw;\n  height: 3.86667vw;\n  margin-left: 2vw;\n  margin-top: 3vw;\n}\n.logWithCode[data-v-f526a15e] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  width: 26.66667vw;\n  height: 9.73333vw;\n  line-height: 9.73333vw;\n  display: inline-block;\n  text-align: center;\n  font-size: 4.8vw;\n  color: #333;\n}\n.logWithMsg[data-v-f526a15e] {\n  float: right;\n  font-size: 4.26667vw;\n  color: #999999;\n  margin-right: 2vw;\n}\n.mobilePhone[data-v-f526a15e] {\n  width: 77.33333vw;\n  height: 12vw;\n  border: 1px solid #e9e9e9;\n  padding-left: 5.33333vw;\n  color: #333333;\n}\n.pwd[data-v-f526a15e] {\n  width: 49.33333vw;\n  height: 12vw;\n  border: 1px solid #e9e9e9;\n  padding-left: 5.33333vw;\n  color: #333333;\n}\n.getCode[data-v-f526a15e] {\n  display: inline-block;\n  width: 25.33333vw;\n  height: 12vw;\n  line-height: 12vw;\n  background-color: #3676B5;\n  color: #fff;\n  text-align: center;\n  font-size: 3.06667vw;\n  -webkit-transform: translateY(-2%);\n          transform: translateY(-2%);\n  margin-left: 1.33333vw;\n}\n.mobilePhone[data-v-f526a15e]:focus, .pwd[data-v-f526a15e]:focus {\n  border: 1px solid #3676B5 !important;\n}\n.mobilePhone_box[data-v-f526a15e] {\n  text-align: center;\n  margin-top: 9.2vw;\n}\n.pwd_box[data-v-f526a15e] {\n  width: 77.33333vw;\n  height: 12vw;\n  margin: auto;\n  text-align: center;\n  margin-top: 9.2vw;\n  margin-bottom: 13vw;\n}\n.logIn_btn[data-v-f526a15e] {\n  width: 77.33333vw;\n  height: 12vw;\n  line-height: 12vw;\n  font-size: 4.53333vw;\n  background-color: #3676B5;\n  color: #fff;\n  margin: auto;\n  text-align: center;\n  box-shadow: 0 0 7px #3676B5;\n  display: block;\n}\n.rg_btn[data-v-f526a15e] {\n  width: 77.33333vw;\n  height: 12vw;\n  line-height: 12vw;\n  font-size: 3.73333vw;\n  margin: auto;\n  text-align: center;\n  margin-bottom: 17.33333vw;\n}\n.error[data-v-f526a15e] {\n  position: absolute;\n  left: 12vw;\n  font-size: 3.46667vw;\n  color: #cb1700;\n}\n"],sourceRoot:""}])},719:function(t,e,n){var o=n(662);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(243)("bc90805c",o,!0)},784:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logInMsg"},[n("div",{staticClass:"mobilePhone_box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.mobilePhone,expression:"mobilePhone"}],staticClass:"mobilePhone",attrs:{type:"text",placeholder:"手机号"},domProps:{value:t.mobilePhone},on:{input:function(e){e.target.composing||(t.mobilePhone=e.target.value)}}}),t._v(" "),n("transition",{attrs:{name:"shake"}},[n("p",{directives:[{name:"show",rawName:"v-show",value:t.mPhone_alert,expression:"mPhone_alert"}],staticClass:"error"},[t._v("请输入正确的手机号!")])])],1),t._v(" "),n("div",{staticClass:"pwd_box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.identifyCode,expression:"identifyCode"}],staticClass:"pwd",attrs:{type:"text",placeholder:"验证码"},domProps:{value:t.identifyCode},on:{input:function(e){e.target.composing||(t.identifyCode=e.target.value)}}}),t._v(" "),t.hYzm?n("mu-raised-button",{staticClass:"getCode",attrs:{label:t.Yzm},on:{click:function(e){t.hasYzm()}}}):n("button",{staticClass:"getCode",staticStyle:{"background-color":"#C8C8C8"},attrs:{disabled:""}},[t._v(t._s(t.Yzm1))]),t._v(" "),n("transition",{attrs:{name:"shake"}},[n("p",{directives:[{name:"show",rawName:"v-show",value:t.mIdenti_alert,expression:"mIdenti_alert"}],staticClass:"error"},[t._v("请输入正确的验证码!")])])],1),t._v(" "),n("mu-raised-button",{staticClass:"logIn_btn",attrs:{label:"登录"},on:{click:t.logIn}}),t._v(" "),n("div",{staticClass:"rg_btn"},[n("span",{on:{click:t.register}},[t._v("注册")])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=90.59eed314e1b9a30f1adb.js.map