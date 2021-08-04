<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 10:01:13
 * @LastEditTime: 2021-06-29 17:13:40
 * @Description: 内容块
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <breadcrumb class="mb-36 -translate-y-44" />
    <!-- <suspense v-if="suspenseSwitch">
      <template #default>
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>
      <template #fallback>
        <loading />
      </template>
    </suspense> -->
    <router-view />
  </div>
</template>
<script setup lang="ts">
  import Breadcrumb from './Breadcrumb.vue'
  import Loading from './Loading.vue' //加载页面
  import { useRouter } from 'vue-router'
  import { ref } from '@vue/reactivity'
  const router = useRouter()
  //储存一个用于刷新的布尔值
  const suspenseSwitch = ref(true)

  // 监视路由进出, 销毁异步组件渲染
  router.afterEach(() => (suspenseSwitch.value = true))
  router.beforeEach((to, form, next) => {
    suspenseSwitch.value = false
    next()
  })
</script>
<style lang="scss" scoped></style>
