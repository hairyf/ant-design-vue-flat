<!--
 * @Author: Zhilong
 * @Date: 2021-06-18 14:11:27
 * @LastEditTime: 2021-06-18 17:56:49
 * @Description: 布局
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="flex h-full">
    <div class="flex flex-1 items-center bg-blue-light px-20">
      <img src="@/assets/img/index/index-logo.png" class="absolute left-56 top-48" />
      <img
        class="w-full h-auto"
        v-if="query.type === 'register'"
        src="@/assets/img/index/auth-register.png"
        alt=""
      />
      <img
        class="w-full h-auto"
        v-else-if="query.type === 'login'"
        src="@/assets/img/index/auth-login.png"
        alt=""
      />
      <img class="w-full h-auto" v-else src="@/assets/img/index/auth-retrieve.png" alt="" />
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const { query } = useRoute()
</script>
