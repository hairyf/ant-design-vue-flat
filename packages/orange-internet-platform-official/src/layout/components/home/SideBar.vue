<!--
 * @Author: Zhilong
 * @Date: 2021-06-18 09:27:18
 * @LastEditTime: 2021-06-18 16:30:57
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <!-- <a-menu v-model:selectedKeys="current" mode="horizontal"> -->
  <router-link
    class="mx-16"
    v-for="item in mainRoutes"
    :key="item.path"
    :to="item.path"
    v-slot="{ isActive }"
  >
    <div class="text-sm px-12 py-4 rounded-md" :class="{ active: isActive }">
      {{ item.meta?.title }}
    </div>
  </router-link>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  /** 当前一级路由 */
  const mainRoutes = computed(() => {
    const consoleRoute =
      router.options.routes.filter((r) => {
        return r.path === '/home'
      })[0].children || []
    return consoleRoute.filter((r) => !r?.meta?.hidden)
  })
</script>
<style lang="scss" scoped>
  .active {
    @apply bg-blue;
    color: #fff;
  }
</style>
