<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 10:00:47
 * @LastEditTime: 2021-06-30 11:36:30
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex items-center justify-between px-14 py-16 bg-white">
    <div class="flex items-center">
      <img src="@/assets/img/title.png" @click="toOfficial" class="w-128 h-28" alt="" />
    </div>

    <a-popover overlayClassName="popover-operation" trigger="click" placement="bottomRight">
      <div class="flex items-center">
        <img :src="userInfo?.avatar || defaultAvatar" alt="" class="w-40 h-40 rounded-full" />
        <div class="ml-14 text-sm">{{ userInfo?.username }}</div>
      </div>
      <template #content>
        <div class="flex justify-between">
          <div class="flex items-center">
            <img :src="userInfo?.avatar || defaultAvatar" alt="" class="w-40 h-40 rounded-full" />
            <div class="ml-14 text-sm">{{ userInfo?.username }}</div>
          </div>
          <div class="p-14">
            <span class="cursor-pointer" @click="onOutLogin">
              <i class="nr-switch-control text-2xl align-middle" />
              <span class="ml-16 text-sm align-middle cursor-pointer">退出登录</span>
            </span>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import defaultAvatar from '@/assets/img/common/avatar.png'
  const store = useStore()
  const userInfo = computed(() => store.state.user.info)
  const router = useRouter()
  // 退出登录
  const onOutLogin = () => {
    store.dispatch('signOutUserInfo')
    router.replace('/auth')
  }
  const toOfficial = () => {
    location.href = 'http://www.weitshop.com/'
  }
</script>
<style lang="scss">
  .popover-operation {
    .ant-popover-inner {
      border-radius: 10px;
      min-width: 440px;
    }
    .ant-popover-inner-content {
      padding: 20px 44px !important;
    }
  }
</style>
