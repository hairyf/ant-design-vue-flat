<!--
 * @Author: Zhilong
 * @Date: 2021-05-18 15:41:43
 * @LastEditTime: 2021-07-23 16:58:37
 * @Description: 登录布局
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="w-full h-full bg-auth-login bg-no-repeat bg-cover overflow-hidden bg-center relative">
    <div
      class="
        cal-auto-view
        bg-auth-login-1 bg-no-repeat bg-cover
        overflow-hidden
        flex
        bg-center
        items-center
      "
      style="z-index: 10"
    >
      <a-row style="min-height: 600px; height: 55%" class="w-full">
        <a-col :xs="0" :sm="3" :md="4" :lg="11" :xl="13" :xxl="14" />
        <a-col :xs="24" :sm="18" :md="16" :lg="12" :xl="9" :xxl="8">
          <router-view />
        </a-col>
        <a-col :xs="0" :sm="3" :md="4" :lg="1" :xl="2" :xxl="2" />
      </a-row>
    </div>

    <div
      class="brand absolute h-40"
      style="

        top: 18px;
        left: 50px;
        z-index: 0;
        display: flex;
        justify-content: space-around;
      "
    >
      <div class="logo">
        <cal-image
          :src="serviceCopy?.logo || '/src/assets/img/user/auth-logo.png'"
          class="h-40 w-40"
        />
      </div>
      <div class="brand_title">
        <div class="top" style="font-size: 17px; color: whitesmoke; font-weight: bold">{{
          serviceCopy?.brand || 'weitshop'
        }}</div>
        <div class="bottom" style="font-size: 2px; color: whitesmoke; font-weight: bold">{{
          serviceCopy?.brand_title || '服务为本用户至上'
        }}</div>
      </div>
    </div>

    <div
      v-if="serviceCopy?.copyright == 0"
      class="brand absolute h-40"
      style="bottom: 13px; left: 50px; z-index: 0"
    >
      <div class="ri-copyright-line">
        <div class="top" style="font-size: 17px; color: #ffffff70"
          >Copyright @{{ year }} {{ serviceCopy?.content || '微匠工' }}. All Rights Reserved.
          {{ serviceCopy?.info || '微匠工 粤ICP备18089646号-6' }}</div
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useStore } from 'vuex'
  const store = useStore()
  const serviceCopy = store.state.copy.info
  const year = ref(0)
  year.value = new Date().getFullYear()
</script>
<style>
  .cal-auto-view {
    position: absolute;
    margin: 6vh 4.5vw;
    height: 88vh;
    width: 91vw;
    border-radius: 44px;
  }
</style>
