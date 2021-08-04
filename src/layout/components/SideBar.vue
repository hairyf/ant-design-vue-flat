<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:47:02
 * @LastEditTime: 2021-07-15 14:30:57
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 一级菜单 -->
  <a-layout-sider
    class="mt-24 z-10 rounded-3xl overflow-hidden transition-all duration-200 bg-primary-tab-bar"
    :width="!collapse ? 100 : 66"
  >
    <div class="h-full flex flex-col">
      <div class="text-center pt-24 pb-48 text-white text-2xl">
        <i class="nr-navi-show-arrow cursor-pointer" v-if="!collapse" @click="collapse = true" />
        <i class="nr-navi-hide-arrow cursor-pointer" v-else @click="collapse = false" />
      </div>
      <perfect-scrollbar class="flex-1 perfect-scrollbar">
        <cal-menu :collapse="collapse" :default-active="currentPaths">
          <cal-menu-item
            v-for="(item, index) in mainRoutes"
            :key="index"
            :index="item.meta?.completePath"
            enter-active-class="animate__bounceIn"
            leave-active-class="animate__bounceOut"
            :popover="true"
          >
            <template #icon>
              <i class="text-xl" :class="[item.meta?.icon]" />
            </template>
            <template #popoverCotent>
              <div class="w-208">
                <menu-group-item :routes="item.children" />
              </div>
            </template>
            <span class="">{{ item.meta?.title }}</span>
          </cal-menu-item>
        </cal-menu>
      </perfect-scrollbar>
      <!-- <theme-popover>
        <div class="text-center mb-16 cursor-pointer">
          <i class="nr-drawing-board text-white text-2xl" />
        </div>
      </theme-popover> -->
    </div>
  </a-layout-sider>
  <!-- 二级以上菜单 -->
  <a-layout-sider
    class="mt-24 rounded-r-xl -ml-20 pl-20 duration-500 overflow-hidden bg-background"
    :width="showAsideTwoLevel ? 176 : 0"
    :style="{
      transform: `translateX(${!showAsideTwoLevel ? '-20px' : 0})`
    }"
  >
    <perfect-scrollbar class="h-full perfect-scrollbar">
      <cal-menu
        :collapse="collapse"
        class="mt-20 mx-16"
        :width="122"
        :default-active="currentPaths"
      >
        <transition
          leave-active-class="animate__animated animate__bounceOut"
          :duration="{ enter: 750, leave: 80 }"
        >
          <div v-show="!collapse">
            <menu-group-item :routes="routeChildrens" />
          </div>
        </transition>
      </cal-menu>
    </perfect-scrollbar>
  </a-layout-sider>
</template>
<script lang="ts" setup>
  import { baseRoutes } from '@/router'
  import { computed, ref } from 'vue-demi'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import CalMenu from '~/CustomAntds/CalMenu/index.vue'
  import CalMenuItem from '~/CustomAntds/CalMenuItem/index.vue'
  import MenuGroupItem from './MenuGroupItem.vue'
  import ThemePopover from './ThemePopover.vue'
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const theme = computed(() => store.state.theme)
  /** 是否隐藏菜单 */
  const collapse = ref(false)
  /** 当前一级路由 */
  const mainRoutes = computed(() => {
    // return router.options.routes.filter((uRoute) =>
    //   baseRoutes.some((bRoute) => bRoute.path !== uRoute.path)
    // )
    return store.state.permission.userRoutes.filter((uRoute) =>
      baseRoutes.some((bRoute) => bRoute.path !== uRoute.path)
    )
  })
  /** 当前路径信息 */
  const currentPaths = computed(() => {
    return route.matched.map((r) => r.path)
  })
  // 当前二级路由
  const routeChildrens = computed(() => {
    return route.matched[0].children
  })
  // 是否展示二级路由
  const showAsideTwoLevel = computed(() => {
    return routeChildrens.value.length > 1 && !collapse.value
  })
</script>
<style lang="scss" scoped>
  .perfect-scrollbar {
    // display: none;
    // :deep(.ps__rail-y) {
    //   z-index: 18;
    //   &:hover {
    //     background: none;
    //   }
    // }
  }
</style>
