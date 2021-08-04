<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 09:19:56
 * @LastEditTime: 2021-05-14 12:20:16
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
        <div class="grey btns" @click="$navigateBack()">返回登录</div>
        <div
          class="title u-text-center"
          :style="{ color: $hexColor['--color-primary'] }"
        >
          忘记密码
        </div>
        <div class="auth-form">
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
              class="get-code"
              :class="[seconds ? 'grey' : 'primary']"
              slot="right"
              @click="getPhoneCode"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              {{ seconds ? `${seconds}秒后获取验证码` : '获取验证码' }}
            </div>
          </u-field>
          <!-- 密码 -->
          <u-field
            v-model="form.password"
            label-width="0"
            placeholder="请输入新密码"
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
            @click="onSubmitLogin"
          >
            重置密码
          </u-button>
          <div class="u-flex u-row-center u-m-t-28 u-text-center tips">
            <span class="grey">手机没有用了？</span>
            <link-controller :data="{ type: 'serve' }" class="u-flex">
              <span class="primary">联系客服进行修改</span>
            </link-controller>
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
import { reqSendCode } from '@/api';
import store from '@/store';
import { navigateBack, showToast } from '@/utils';
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
      const v = fromValidate.validateAll(
        ['empty', form.phone, '手机号'],
        ['phone', form.phone],
        ['empty', form.code, '验证码'],
        ['empty', form.password, '新密码'],
        ['password', form.password]
      );
      return v.validate;
    };
    // 获取验证码倒计时逻辑钩子
    const { seconds, getPhoneCode } = useMobileSeconds({
      phone: toRef(form, 'phone'),
      getPhoneCodeHook: async () => await reqSendCode(form.phone, 'reset'),
    });
    // 进行提交信息并登录
    const onSubmitLogin = async () => {
      if (!getPhoneLoginValidate()) return false;
      await store.dispatch('resetPassword', [
        form.phone,
        form.code,
        form.password,
      ]);
      await showToast({ title: '重置成功!' });
      navigateBack();
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
    return {
      $rgbaColor,
      $hexColor,
      tabs,
      currentTab,
      form,
      onSubmitLogin,
      showPassword,
      getVisionIcon,
      getPhoneCode,
      seconds,
      logo,
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
.auth-card-body {
  position: relative;
  padding-bottom: 50rpx;
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
  z-index: 5;
  overflow: hidden !important;
  border: solid 10rpx #ffffff;
}
.title {
  font-size: 40rpx !important;
  font-weight: bold;
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
