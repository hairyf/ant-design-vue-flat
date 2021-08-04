<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:47:02
 * @LastEditTime: 2021-07-19 10:36:38
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-layout-sider class="rounded-3xl" :collapsed="collapsed" :collapsed-width="64" :width="100">
    <div class="text-center mx-auto">
      <cal-icon
        class="cursor-pointer transform my-28"
        @click="collapsed = !collapsed"
        :class="[collapsed ? 'rotate-0' : '-rotate-180']"
        type="collapsed"
        color="#ffffff"
        :svg-size="true"
      />
    </div>
    <cal-menu
      :collapse="collapsed"
      :default-active="$route.meta.pathMaps"
      @update="$router.push($event)"
    >
      <cal-menu-item
        v-for="(item, index) in mainRoutes"
        :key="index"
        :index="item.meta?.completePath"
        indicator
      >
        <template #prefix> Icon </template>
        <template #default> {{ item.meta?.title }} </template>
      </cal-menu-item>
    </cal-menu>
  </cal-layout-sider>
  <cal-layout-sider
    class="cal-card rounded-3xl"
    :collapsed="collapsed"
    :collapsed-width="0"
    :width="180"
    :class="[collapsed ? 'cal-card--collapsed' : '']"
    :style="{ backgroundColor: theme.baseColor }"
  >
    <cal-menu
      :collapse="collapsed"
      :default-active="$route.meta.pathMaps"
      @update="$router.push($event)"
      style-type="button"
      class="p-24"
    >
      <cal-menu-group-item :routes="routeChildrens" />
    </cal-menu>
  </cal-layout-sider>
</template>
<script lang="ts" setup>
  import { baseRoutes } from '@/router/routes'
  import { computed, ref } from 'vue-demi'
  import { useRoute, useRouter } from 'vue-router'
  import { useTheme } from '~/utils/theme'
  import CalMenuGroupItem from './MenuGroupItem.vue'
  const route = useRoute()
  const router = useRouter()

  const collapsed = ref(false)
  /** 当前路径信息 */
  const currentPaths = computed(() => {
    return route.matched.map((r) => r.path)
  })
  /** 当前一级路由 */
  const mainRoutes = computed(() => {
    return router.options.routes.filter((uRoute) =>
      baseRoutes.some((bRoute) => bRoute.path !== uRoute.path)
    )
  })
  // 当前二级路由
  const routeChildrens = computed(() => {
    return route.matched[0].children
  })
  const theme = useTheme('Common')
</script>
<style lang="scss" scoped></style>
