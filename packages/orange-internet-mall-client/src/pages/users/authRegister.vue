<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 09:19:56
 * @LastEditTime: 2021-05-14 12:21:37
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="auth-container"
    :style="{
      backgroundImage: `url(${$spliceStaticUrl(
        'auth-bg.png'
      )}), linear-gradient(${$hexColor['--color-primary-light-3']}, ${
        $hexColor['--color-primary']
      })`,
    }"
  >
    <div style="padding-top: 1rpx" />
    <u-card
      class="auth-card"
      :show-head="false"
      :show-foot="false"
      margin="10vh 60rpx 0 60rpx"
    >
      <div slot="body" class="auth-card-body">
        <image class="logo-image" mode="aspectFill" :src="logo" />
        <div class="grey btns" @click="$navigateBack()" v-if="!hideBackLogin">
          返回登录
        </div>
        <div
          class="title u-text-center"
          :style="{ color: $hexColor['--color-primary'] }"
        >
          注册账号
        </div>
        <div class="auth-form">
          <!-- 账号 -->
          <u-field
            v-model="form.account"
            label-width="0"
            placeholder="请输入账号"
            maxlength="12"
          />
          <!-- 密码 -->
          <u-field
            v-model="form.password"
            label-width="0"
            placeholder="请输入密码"
            :password="!showPassword"
            maxlength="12"
          >
            <view-icon
              slot="right"
              color="#CFCFCF"
              size="40"
              @click="showPassword = !showPassword"
              :name="getVisionIcon(showPassword)"
            />
          </u-field>
          <div class="tips grey u-m-l-38 u-m-t-15">
            密码长度最低不少于6位，包含字母加数字
          </div>
          <!-- 确认密码 -->
          <u-field
            v-model="form.repassword"
            label-width="0"
            placeholder="确认密码"
            :password="!showRepassword"
            maxlength="12"
          >
            <view-icon
              slot="right"
              color="#CFCFCF"
              size="40"
              @click="showRepassword = !showRepassword"
              :name="getVisionIcon(showRepassword)"
            />
          </u-field>
          <!-- 手机号 -->
          <u-field
            v-if="bindingPhone"
            v-model="form.mobile"
            label-width="0"
            placeholder="请输入手机号"
            maxlength="11"
          />
          <!-- 动态验证码(短信) -->
          <u-field
            :clearable="false"
            v-if="bindingPhone"
            v-model="form.verifyCode"
            label-width="0"
            placeholder="请输入验证码"
            maxlength="8"
          >
            <div
              @click="getPhoneCode"
              class="get-code"
              slot="right"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              {{ seconds ? `${seconds}秒后获取验证码` : '获取验证码' }}
            </div>
          </u-field>
          <!-- 动态验证码(图像) -->
          <u-field
            v-else
            v-model="form.captcha"
            label-width="0"
            placeholder="请输入验证码"
            maxlength="8"
            :clearable="false"
          >
            <image
              :src="graphicalCode"
              @click="getGraphicalCode"
              slot="right"
              class="graphical-code"
            />
          </u-field>
          <div class="u-m-t-28 u-m-l-38 tips" v-if="agreement">
            <u-checkbox
              size="28"
              v-model="form.agreeaFreement"
              :active-color="$hexColor['--color-primary']"
            >
              勾选同意
            </u-checkbox>
            <span class="blue" @click="seeAgreement">《用户使用协议》</span>
          </div>
        </div>
        <div class="auth-foot">
          <u-button
            type="primary"
            shape="circle"
            :custom-style="{
              boxShadow: `0px 4px 20px ${$rgbaColor['--color-primary-light-opacity-8']}`,
              background: $hexColor['--color-primary'],
            }"
            ripple
            @click="onSubmitRegister"
          >
            注册
          </u-button>
        </div>
      </div>
    </u-card>
    <common-copyright :isFixed="true" />
  </div>
</template>

<script lang="ts">
import { reqGraphicalCode, reqSendCode } from '@/api';
import { useMobileSeconds } from '@/hooks/use-mobile-seconds';
import { fromValidate } from '@/plugins/form-strategy';
import store from '@/store';
import { navigateTo, reLaunch } from '@/utils';
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRef,
} from '@vue/composition-api';
import { onLoad, onReady } from 'uni-composition-api';
export default defineComponent({
  setup() {
    // 页面切换时, 隐藏回到首页按钮
    onReady(() => uni.hideHomeButton?.());
    // 表单信息
    const form = reactive({
      // 手机号|账号
      mobile: '',
      account: '',
      // 密码信息
      password: '',
      repassword: '',
      // 动态验证码(短信)
      verifyCode: '',
      // 动态验证码(图像)
      captcha: '',
      captchakey: '',
      // 绑定注册
      openid: '',
      // 是否同意规则
      agreeaFreement: true,
    });
    // 图像验证码和密匙
    const graphicalCode = ref('');
    // 获取视觉展示 icon
    const getVisionIcon = (bool: boolean) => {
      return bool ? 'oe-vision-show' : 'oe-vision-hide';
    };
    // 是否展示密码
    const showPassword = ref(false);
    const showRepassword = ref(false);

    // 是否隐藏回到登录
    const hideBackLogin = ref(false);
    onLoad((option) => {
      hideBackLogin.value = !!option?.hideBackLogin;
    });

    // 是否需要绑定手机号
    const bindingPhone = computed((): boolean => store.getters.forceAuthPhone);
    // 获取当前类型表单验证
    const getRegisterValidate = () => {
      if (!form.agreeaFreement) {
        uni.$u.toast('请同意《用户使用协议》');
        return false;
      }
      const passwordValidates: any[] = [
        ['userName', form.account],
        ['password', form.password],
        ['password', form.repassword, '重复密码'],
        ['empty', form.captcha, '验证码'],
      ];
      const phoneValidates: any[] = [
        ['userName', form.account],
        ['password', form.password],
        ['password', form.repassword, '重复密码'],
        ['empty', form.mobile, '手机号'],
        ['phone', form.mobile],
        ['empty', form.verifyCode, '验证码'],
      ];
      // 进行验证
      const validateArr = bindingPhone.value
        ? phoneValidates
        : passwordValidates;
      const v = fromValidate.validateAll(...validateArr);
      // 再次判断密码是否相同
      if (v.validate && form.password !== form.repassword) {
        v.validate = false;
        v.error = '输入密码与确认密码不相同';
        uni.$u.toast(v.error);
      }
      return v.validate;
    };
    // 获取验证码倒计时逻辑钩子
    const { seconds, getPhoneCode } = useMobileSeconds({
      phone: toRef(form, 'mobile'),
      getPhoneCodeHook: async () => {
        await reqSendCode(form.mobile, 'registerByMobile');
      },
    });
    // 获取图像验证码
    const getGraphicalCode = async () => {
      const { data } = await reqGraphicalCode();
      form.captchakey = data.data.verify_key;
      graphicalCode.value = data.data.verify_src;
    };
    getGraphicalCode();
    // 进行提交信息并注册
    const onSubmitRegister = async () => {
      if (!getRegisterValidate()) return false;
      try {
        if (bindingPhone.value) {
          await store.dispatch('bindPhoneRegisterUserInfo', form);
        } else {
          await store.dispatch('phoneRegisterUserInfo', form);
        }
        reLaunch('/pages/empty');
      } catch (error) {
        getGraphicalCode();
      }
    };
    // 查看协议
    const seeAgreement = () => {
      navigateTo('/pages/commons/richText', {
        title: '注册协议',
        html: store.state.common.shopset.registerSet.content,
      });
    };
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const $rgbaColor = computed(
      (): CssLightOpacityType => store.getters.rgbaColor
    );
    const logo = computed(() => {
      return store.state.common.shopset.shopSet.logo;
    });
    const agreement = computed(() => {
      return store.state.common.shopset.registerSet.agreement == '1';
    });
    return {
      $rgbaColor,
      $hexColor,
      form,
      onSubmitRegister,
      showPassword,
      getVisionIcon,
      showRepassword,
      seconds,
      getPhoneCode,
      bindingPhone,
      graphicalCode,
      getGraphicalCode,
      logo,
      hideBackLogin,
      seeAgreement,
      agreement,
    };
  },
});
</script>

<style lang="scss">
page {
  height: 100%;
}
.auth-container {
  position: relative;
  height: 100%;
  background-color: #ffb25a;
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/auth-bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  font-size: 28rpx;
}
.u-card {
  overflow: inherit !important;
}
::v-deep .u-checkbox__label {
  font-size: 24rpx !important;
  margin-right: 10rpx !important;
}
.auth-card-body {
  position: relative;
  padding-bottom: 50rpx;
}
.auth-form {
  margin-top: 60rpx;
  margin-bottom: 60rpx;
}
.logo-image {
  position: relative;
  display: block;
  width: 176rpx;
  height: 176rpx;
  margin: 0 auto;
  transform: translateY(-50%);
  margin-bottom: -88rpx;
  border-radius: 50%;
  z-index: 5;
  overflow: hidden !important;
  border: solid 10rpx #ffffff;
}
.graphical-code {
  height: 40rpx;
  width: 120rpx;
  vertical-align: middle;
}
.blue {
  color: #3f8cff;
}
.grey {
  color: #9c9c9c;
}
.tips {
  font-size: 24rpx !important;
}
.title {
  font-size: 40rpx !important;
  font-weight: bold;
}
.btns {
  position: absolute;
  right: 0;
  top: 0;
}
.get-code {
  padding-left: 30rpx;
  border-left: 1rpx solid #f4f6f8;
}
</style>
