<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-03-02 09:00:31
 * @LastEditTime: 2021-07-09 15:59:26
 * @Description: 视图内容
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-layout-content class="ml-24 pr-24 flex flex-col overflow-auto">
    <div
      class="text-2xl mb-28 mt-20 font-medium"
      style="color: #001426"
      v-if="!route.meta.hiddenTitle"
    >
      {{ route.query?.title || route.meta.title }}
    </div>
    <div class="flex-1 min-w-1000">
      <suspense v-if="suspenseSwitch">
        <template #default>
          <keep-alive>
            <router-view />
          </keep-alive>
        </template>
        <template #fallback>
          <loading :error="error" />
        </template>
      </suspense>
    </div>
    <agreement />
  </a-layout-content>
</template>
<script lang="ts" setup>
  import { onErrorCaptured, ref } from 'vue-demi'
  import Agreement from './Agreement.vue'
  import type { AxiosError } from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import Loading from './Loading.vue'
  const route = useRoute()
  const router = useRouter()

  const suspenseSwitch = ref(true)
  const error = ref<AxiosError>()

  // 监视路由进出, 销毁异步组件渲染
  router.afterEach(() => (suspenseSwitch.value = true))
  router.beforeEach((to, form, next) => {
    suspenseSwitch.value = false
    error.value = undefined
    next()
  })
  onErrorCaptured((event) => {
    console.log({ event })
    error.value = event as AxiosError
  })
</script>
<style scoped>
  :deep(.ant-spin-text) {
    @apply mt-20;
  }
</style>
