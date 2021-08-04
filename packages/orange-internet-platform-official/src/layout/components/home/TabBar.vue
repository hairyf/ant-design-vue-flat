<!--
 * @Author: Zhilong
 * @Date: 2021-06-17 16:39:50
 * @LastEditTime: 2021-06-29 14:43:23
 * @Description: 导航栏目
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="h-80 flex justify-center items-center bg-blue-lightest">
    <div
      class="xl:container flex justify-between flex-1 items-center w-1200"
      style="min-width: 1200px"
    >
      <div class="flex">
        <img
          class="w-128 h-28 object-cover cursor-pointer mr-28"
          src="@/assets/img/index/index-logo.png"
          alt="首页"
          @click="router.push('/')"
        />
        <side-bar />
      </div>
      <!-- 登录前 -->
      <div v-if="isLogin" class="flex items-center">
        <a class="mx-20"> 体验中心 </a>
        <router-link class="mx-20" to="/auth/login"> 登录 </router-link>
        <a-button
          class="mx-20 rounded-full bg-blue text-white"
          @click="$router.push('/auth/register')"
        >
          免费注册
        </a-button>
      </div>
      <div v-else class="flex items-center">
        <a class="mx-20"> 体验中心 </a>
        <a class="mx-20"> 购物车 </a>
        <router-link to="/console" class="mx-20"> 控制台 </router-link>
        <img
          class="block w-32 h-32 bg-blue rounded-full"
          :src="userInfo?.avatar || defaultAvatar"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from '@vue/runtime-core'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import defaultAvatar from '@/assets/img/common/avatar.png'
  import SideBar from './SideBar.vue'
  const store = useStore()
  const userInfo = computed(() => store.state.user.info)
  const isLogin = computed((): boolean => !store.getters.isLogin)
  const router = useRouter()
</script>
