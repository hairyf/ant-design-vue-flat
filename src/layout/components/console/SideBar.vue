<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 10:00:54
 * @LastEditTime: 2021-06-21 18:37:38
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="text-2xl ml-24 mb-24">控制台</div>
  <a-menu
    v-model:selectedKeys="route.meta.pathMaps"
    style="width: 256px"
    mode="vertical"
    @click="router.push($event.key)"
  >
    <a-menu-item
      :key="item.meta?.completePath"
      v-for="item in mainRoutes"
      class="h-48 mt-0"
      style="line-height: 48px"
    >
      <div class="flex items-center">
        <i :class="[item.meta?.icon]" class="text-lg mx-10"></i> {{ item.meta?.title }}
      </div>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  /** 当前一级路由 */
  const mainRoutes = computed(() => {
    const consoleRoute =
      router.options.routes.filter((aRoute) => {
        return aRoute.path === '/console'
      })[0].children || []
    return consoleRoute
  })
  console.log(route)
</script>
<style lang="scss" scoped>
  .ant-menu {
    background-color: #f5f5f5;
    border: none;
  }
  :deep(.ant-menu-item-selected) {
    color: #e89026;
    background-color: #dedede !important;
  }
  :deep(.ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline)
      .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover) {
    color: #e89026;
  }
  :deep(.ant-menu-item:active, .ant-menu-submenu-title:active) {
    background-color: transparent;
  }
</style>
