<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 09:19:56
 * @LastEditTime: 2021-05-14 12:21:05
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
        <div
          class="btns"
          @click="$navigateTo('/pages/users/authRegister')"
          :style="{ color: $hexColor['--color-primary'] }"
        >
          立即注册
        </div>
        <u-tabs
          :list="tabs"
          :is-scroll="false"
          :current="currentTab"
          @change="currentTab = $event"
          class="background"
          :active-color="$hexColor['--color-primary']"
          inactive-color="#9C9C9C"
          bar-width="136"
          bar-height="8"
          font-size="34rpx"
        />
        <div class="auth-form">
          <template v-if="currentTab == 0">
            <u-field
              v-model="form.phone"
              label-width="0"
              placeholder="请输入手机号"
              maxlength="11"
            />
            <u-field
              v-model="form.code"
              label-width="0"
              placeholder="请输入验证码"
              maxlength="8"
              :clearable="false"
            >
              <div
                :style="{
                  color: seconds ? '#9c9c9c' : $hexColor['--color-primary'],
                }"
                class="get-code"
                @click="getPhoneCode"
                slot="right"
              >
                {{ seconds ? `${seconds}秒后获取验证码` : '获取验证码' }}
              </div>
            </u-field>
          </template>
          <template v-else>
            <u-field
              v-model="form.account"
              label-width="0"
              placeholder="请输入账号"
              maxlength="12"
            />
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
            <div class="u-text-right u-m-t-20">
              <div
                @click="$navigateTo('/pages/users/authForget')"
                :style="{ color: $hexColor['--color-primary'] }"
              >
                忘记密码
              </div>
            </div>
          </template>
        </div>
        <div class="auth-foot">
          <u-button
            type="primary"
            shape="circle"
            ripple
            :custom-style="{
              boxShadow: `0px 4px 20px ${$rgbaColor['--color-primary-light-opacity-8']}`,
              background: $hexColor['--color-primary'],
            }"
            @click="onSubmitLogin"
          >
            登录
          </u-button>
          <div class="u-m-t-28 u-text-center tips" v-if="agreement">
            <span class="grey">登录代表您已同意</span>
            <span class="blue" @click="seeAgreement">《用户使用协议》</span>
          </div>
          <!-- 暂未实现 -->
          <div
            class="u-m-t-30 grey u-flex u-row-center"
            @click="onAuthWeChatLogin"
            v-if="PLATFORM === 'h5'"
          >
            <view-icon
              class="u-m-r-15"
              name="cl-wechat-logo-line"
              color="#07C160"
              size="40"
            />
            <span>微信登录</span>
          </div>
        </div>
      </div>
    </u-card>
    <common-copyright :isFixed="true" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRef,
} from '@vue/composition-api';
import { onReady } from 'uni-composition-api';
import { useMobileSeconds } from '@/hooks/use-mobile-seconds';
import store from '@/store';
import { navigateTo, PLATFORM, reLaunch } from '@/utils';
import { reqSendCode } from '@/api';
import { fromValidate } from '@/plugins/form-strategy';

export default defineComponent({
  setup() {
    // 页面切换时, 隐藏回到首页按钮
    onReady(() => uni.hideHomeButton?.());
    // 当前页面信息
    const tabs = ref([{ name: '手机登录' }, { name: '密码登录' }]);
    const currentTab = ref(0);
    // 表单信息
    const form = reactive({
      phone: '',
      code: '',
      account: '',
      password: '',
    });
    // 获取视觉展示 icon
    const getVisionIcon = (bool: boolean) => {
      return bool ? 'oe-vision-show' : 'oe-vision-hide';
    };
    // 是否展示密码
    const showPassword = ref(false);
    // 获取当前类型表单验证
    const getPhoneLoginValidate = () => {
      const phoneValidates: any[] = [
        ['empty', form.phone, '手机号'],
        ['phone', form.phone],
        ['empty', form.code, '验证码'],
      ];
      const passwordValidates: any[] = [
        ['userName', form.account],
        ['password', form.password],
      ];
      const isPhone = currentTab.value === 0;
      const validateArr = isPhone ? phoneValidates : passwordValidates;
      const v = fromValidate.validateAll(...validateArr);
      return v.validate;
    };
    // 获取验证码倒计时逻辑钩子
    const { seconds, getPhoneCode } = useMobileSeconds({
      phone: toRef(form, 'phone'),
      getPhoneCodeHook: async () => {
        await reqSendCode(form.phone, 'mobileLogin');
      },
    });
    // 进行提交信息并登录
    const onSubmitLogin = async () => {
      if (!getPhoneLoginValidate()) return false;
      if (currentTab.value == 0) {
        await store.dispatch('phoneLoginUserInfo', [form.phone, form.code]);
      } else {
        await store.dispatch('passwordLoginUserInfo', [
          form.account,
          form.password,
        ]);
      }
      reLaunch('/pages/baseTabBars/homePage');
    };
    // 微信授权登录
    const onAuthWeChatLogin = () => {
      navigateTo('/pages/users/weChatLoginTips');
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
      onAuthWeChatLogin,
      tabs,
      currentTab,
      form,
      onSubmitLogin,
      showPassword,
      getVisionIcon,
      getPhoneCode,
      seconds,
      PLATFORM,
      seeAgreement,
      logo,
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
  background-repeat: no-repeat;
  background-size: 100%;
  font-size: 28rpx;
}
.auth-container-image {
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/auth-bg.png);
}
.u-card {
  overflow: inherit !important;
}
.auth-card-body {
  position: relative;
  height: 800rpx;
}
.auth-form {
  margin-top: 60rpx;
  height: 300rpx;
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
  overflow: hidden !important;
  z-index: 5;
  border: solid 10rpx #ffffff;
}
.blue {
  color: #3f8cff;
}
.grey {
  color: #9c9c9c;
}
.tips {
  font-size: 24rpx;
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
