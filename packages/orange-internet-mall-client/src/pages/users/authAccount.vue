<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-29 22:10:17
 * @LastEditTime: 2021-05-14 12:20:35
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="auth-account">
    <div class="form-container">
      <u-field
        v-model="form.account"
        label-width="0"
        placeholder="输入已有账号"
        maxlength="12"
      />
      <u-field
        v-model="form.password"
        label-width="0"
        password
        placeholder="输入账号密码"
        maxlength="12"
      />
    </div>
    <div class="foot-container">
      <u-button
        class="login-button"
        type="primary"
        shape="circle"
        :custom-style="{
          boxShadow: '0px 4px 20px rgba(254, 155, 42, 0.2)',
        }"
        @click="onDetermineBind"
      >
        确认绑定
      </u-button>
      <div style="height: 40rpx" />
      <u-button
        class="login-button"
        shape="circle"
        @click="
          $navigateTo('/pages/users/authRegister', {
            hideBackLogin: true,
          })
        "
      >
        绑定新账号，去注册
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { fromValidate } from '@/plugins/form-strategy';
import store from '@/store';
import { reLaunch } from '@/utils';
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  setup: () => {
    const form = reactive({
      account: '',
      password: '',
    });

    const onDetermineBind = async () => {
      const verification = fromValidate.validateAll(
        ['empty', form.account, '账号'],
        ['userName', form.account, '账号'],
        ['empty', form.password, '密码'],
        ['password', form.password, '密码']
      );
      if (!verification.validate) return false;
      await store.dispatch('authAccountBindWeChat', form);
      reLaunch('/pages/empty');
    };
    return { form, onDetermineBind };
  },
});
</script>

<style lang="scss">
.foot-container {
  margin: 0 48rpx;
  margin-top: 120rpx;
}
</style>
