<template>
	<div>
		<div class="logIn_header">
      <span class="logWithCode">绑定手机号</span>
    </div>
    <div class="wx_title">
    	<p class="t_state">微信登录成功</p>
    	<p class="t_info">请绑定您在牙医abc的登录手机号</p>
    </div>
    <div class="wx_form">
    	<mt-field label="手机号*" class="first-field" placeholder="请输入手机号" v-model="w_data.phone"></mt-field>
      <mt-field label="验证码*" v-model="w_data.rg_code" placeholder="请输入验证码" class="code-box">
        <span class="code_btn" v-text="rg_Yzm" v-if="rg_hYzm" @click="rg_hasYzm(w_data.phone)"></span>
        <span class="code_btn" v-text="rg_Yzm1" v-else></span>
			</mt-field>
    </div>
    <div class="wx_info">
    	<p>若您输入的手机号未注册，系统将自动为您创建账号。</p>
    	<p>注册即视为同意<a href="javascript:;" @click="gotoYYMP">牙医abc注册协议</a></p>
    </div>
    <div class="submit_wrap" @click="nextHandler">
      <mu-raised-button label="下一步" primary/>
    </div>
	</div>
</template>
<script>
	import { Toast, Field } from 'mint-ui'
	import { GET_LOGIN_CAPTCHA, WX_BIND_USER } from '@vuex/types'
	import { tokenMethods } from '../../../vuex/util'
	export default{
    name: 'wxlogIn',
		data(){
			return {
				w_data: {
					phone: '',
					rg_code: ''
				},
				openid: '',
				rg_hYzm: true,
        rg_Yzm1: '',
        rg_Yzm: '获取验证码',
			}
		},
    computed: {
      wxUserInfo() {
        return this.$store.state.wx.wxUserInfo
      }
    },
		created(){
      //获取到openid值
      this.openid = this.$route.query.openid
		},
		methods: {
			nextHandler() {
				this.$store.dispatch(WX_BIND_USER, {
          phone: this.w_data.phone,
          verifyCode: this.w_data.rg_code,
          type: '1'
        }).then((res) => {let saleInfo = this.wxUserInfo
          // console.log(res)
          if(saleInfo.codeError === 'error'){
            Toast({message: '请输入正确的验证码', duration: 1000});
            console.log('验证码错误');
            return false
          }
          if(saleInfo.codeError === 'timeOver'){
            Toast({message: '该验证码已失效，请重新获取', duration: 1000});
            console.log('验证码失效');
            return false
          }
            this.$destroy(true)
            this.$router.push({
              path: '/wxBind',
              query: {
                verifyCode: this.w_data.rg_code,
                phone: this.w_data.phone,
                openid: this.openid
              }
            })
          })
          .catch(err => {
          })
			},
      gotoYYMP(){
        this.$router.push('/yyMP');
        window.scroll(0,0)
      },
			rg_hasYzm(rg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.w_data.phone === '' || !mb.test(that.w_data.phone)) {
          Toast('请输入正确的手机号');
        } else {
          var params = { phone: that.w_data.phone, type: 2}
          this.$store.dispatch('GET_LOGIN_CAPTCHA', params).then(res => {
            if (res.callStatus === 'SUCCEED') {
              for(let i=0; i<=60; i++) {
                window.setTimeout(function(){
                  if (sec != 0) {
                    that.rg_hYzm = false;
                    that.rg_Yzm1 = sec + "秒后重发" ;
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.rg_hYzm = true;
                    that.rg_Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            }
          })
        }
      }
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../../common/sass/factory";
	.wx_title{
		width: 100%;
		text-align: center;
		.t_state{
			font-size: px2vw(32);
			padding-top: px2vw(32);
		}
		.t_info{
			font-size: px2vw(24);
			margin-top: px2vw(32);
			color: #7a7a7a;
		}
	}
	.wx_form{
		margin-top: px2vw(80);
		padding: 0 px2vw(20);
		font-size: px2vw(28);
		.code_btn{
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
			color: #3676B5;
			font-size: px2vw(28);
		}
	}
	.wx_info{
		padding: px2vw(10) px2vw(38);
		font-size: px2vw(26);
		color: #7a7a7a;
		p{
			height: px2vw(50);
			line-height: px2vw(50);
		}
		a{
			color: #3676B5;
		}
	}
	.submit_wrap{
		width: 90%;
		margin: px2vw(30) auto;
		.mu-raised-button{
      width: 100%;
      height: px2vw(88);
      background-color: $themeColor;
    }
	}
</style>
