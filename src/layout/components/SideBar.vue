<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-02 08:57:40
 * @LastEditTime: 2021-05-08 16:03:14
 * @Description: 侧边导航
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-aside class="aside-one-level" :class="{ active: !showAsideTwoLevel }">
    <el-menu
      :default-active="activeMenus.activeMenu"
      class="el-menu-vertical-demo"
      text-color="#ffffff"
      :collapse="showAsideTwoLevel"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in mainRouters"
        :key="index"
        :index="item.path"
        @click="asideTwoLwoSwitch = false"
      >
        <i :class="['menu-icon', `ad-${item.meta?.icon}`]"></i>
        <template #title>{{ item.meta?.title }} </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-aside class="aside-two-level" :class="{ active: showAsideTwoLevel }">
    <!-- Here removing v-if="showAsideTwoLevel" can produce effect -->
    <el-menu
      v-if="showAsideTwoLevel && asideTwoLwoSwitch"
      :default-active="activeMenus.apiActiveMenu"
      :router="true"
      :collapse="false"
      class="el-menu-vertical-demo"
      text-color="#000"
    >
      <template v-for="(item, index) in currentChildren" :key="index">
        <el-submenu
          :index="index.toString()"
          v-if="
            item.children?.length &&
            !item.meta?.hidden &&
            !item.meta?.hideChildren &&
            !item.meta?.open
          "
        >
          <template #title>
            {{ item.meta?.title }}
          </template>
          <template v-for="(citem, cindex) in item.children" :key="cindex">
            <el-menu-item v-if="!citem.meta?.hidden" :index="citem.meta?.apiActiveMenu">
              <i :class="['menu-icon', `ad-${citem.meta?.icon}`]"></i>
              <template #title>{{ citem.meta?.title }} </template>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          v-else-if="!item.meta?.hidden"
          :index="item.meta?.apiActiveMenu"
          @click="item.meta?.open && (asideTwoLwoSwitch = false)"
        >
          <i v-if="item.meta?.icon" :class="['menu-icon', `ad-${item.meta?.icon}`]"></i>
          <template #title>{{ item.meta?.title }} </template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
  import { computed, ref, onUpdated, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { baseRouter } from '@/router'
  import { useStore } from 'vuex'
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  // 解决页面切换时二级路由刷新状态不更新
  const asideTwoLwoSwitch = ref(true)
  router.afterEach(() => (asideTwoLwoSwitch.value = true))
  // 当前一级路由
  const mainRouters = computed(() => {
    // 上线时要改
    /* router.options.routes */
    /* store.state.permission.userRoutes */
    return store.state.permission.userRoutes.filter((item) => {
      return !baseRouter.find((route) => item.path === route.path)
    })
  })
  // 当前二级路由
  const currentChildren = computed(() => {
    // 如果当前是布局(三级, 自动获取第一项的 children)
    // if (route.matched[0].meta.layout) {
    //   return route.matched[0].children[0].children as any[]
    // }
    // 当前路由存在展开信息, 菜单栏则直接展示子路由 children
    if (route.matched.some((item) => item.meta.open)) {
      return route.matched[1].children
    }
    return route.matched[0].children
  })
  // 是否展开第二项, 如果当前项子路由大于1, 则展开, 不然则收起
  const showAsideTwoLevel = computed(() => {
    return currentChildren.value.length > 1
  })
  // 当前高亮项
  const activeMenus = computed(() => {
    return {
      activeMenu: route.meta?.activeMenu as string,
      apiActiveMenu: route.meta?.apiActiveMenu as string
    }
  })
  // 改变icon样式
  onMounted(() => {
    const iconArrowEl = document.querySelectorAll('i.el-submenu__icon-arrow.el-icon-arrow-down')
    if (iconArrowEl.length > 0) {
      iconArrowEl.forEach((item: any) => {
        item.classList.remove('el-icon-arrow-down')
        item.classList.add('ad-side-fold')
      })
    }
  })
  onUpdated(() => {
    const iconArrowEl = document.querySelectorAll('i.el-submenu__icon-arrow.el-icon-arrow-down')
    if (iconArrowEl.length > 0) {
      iconArrowEl.forEach((item: any) => {
        item.classList.remove('el-icon-arrow-down')
        item.classList.add('ad-side-fold')
      })
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  // :deep(.el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow) {
  //   &::before {
  //     content: 'oe-icon-common-put-it-away';
  //   }
  //   color: red;
  // }
  :deep(.el-submenu__icon-arrow) {
    font-size: 20px;
    line-height: 21px;
    margin-top: -10px;
  }
  .el-aside {
    padding-top: 28px;
    overflow-y: auto !important;
    &::-webkit-scrollbar {
      // 滚动条整体部分
      display: none;
      width: 0;
    }
  }
  .menu-icon {
    margin-right: 10px;
    font-size: 22px;
  }
  .aside-one-level {
    padding: 5px;
    background: #180d00;
    width: 72px !important;
    transition: width 0.5s;
    &.active {
      width: 115px !important;
    }
    .el-menu {
      background-color: #180d00;
      border: none;
    }
    .el-menu-item {
      border: 1px solid #180d00;
      &.is-active {
        @include menu-active-instruct;
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        background: var(--color-primary-light-opacity-8);
        i {
          color: var(--color-primary) !important;
        }
      }
      &:hover {
        color: var(--color-primary) !important;
        background: var(--color-primary-light-opacity-8);
        i {
          color: var(--color-primary) !important;
        }
      }
      i {
        color: #fff;
      }
    }
  }
  .aside-two-level {
    width: 0px !important;
    transition: width 0.5s;
    background: #fff;
    overflow: hidden;
    &.active {
      width: 160px !important;
    }
    .el-menu {
      border: none;
      // margin: 0 20px;
    }
    .el-menu-item {
      &.is-active {
        box-sizing: border-box;
        background: var(--color-primary-light-8);
        color: var(--color-primary) !important;
      }
      &:hover {
        color: var(--color-primary) !important;
        background: var(--color-primary-light-9);
      }
    }
  }
</style>
