<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 18:11:01
 * @LastEditTime: 2021-07-09 17:40:28
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex items-center">
    <div v-if="showBackCrumb" class="m-10 ml-4 mr-28" @click="router.back()">
      <cal-button icon-class="nr-return-Icon" class="w-72 h-32 px-0 text-center">返回</cal-button>
    </div>
    <a-breadcrumb>
      <template v-for="(item, index) in matcheds" :key="index">
        <a-breadcrumb-item>
          <router-link :to="item.path" v-if="index !== matcheds.length - 1">
            {{ item.meta.title }}
          </router-link>
          <span v-else>{{ route.query?.title ? route.query?.title : item.meta.title }}</span>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  // 是否显示面包屑导航
  // const showBreadCrumb = computed(() => {
  //   return route.meta.title !== '概览'
  // })
  // 是否显示返回键
  const showBackCrumb = computed(() => route.meta.hidden)
  // 面包屑列表
  const matcheds = computed(() => {
    // 如果第一项不是首页
    const currentMatched = route.matched.filter((v) => v.meta.title)
    if (route.matched[0]?.meta?.title !== '概览') {
      const homeRoute = { path: '/', meta: { title: '概览', icon: 'home', activeMenu: '/' } }
      return [homeRoute, ...currentMatched]
    }
    return currentMatched
  })
</script>
<style lang="scss">
  .ant-breadcrumb > span:last-child {
    color: var(--color-primary) !important;
  }
  .ant-breadcrumb a:hover {
    color: var(--color-primary) !important;
  }
  .ant-breadcrumb-separator {
    color: #8c8c8c !important;
  }
  button {
    .nr-return-Icon {
      margin-right: 0 !important;
    }
  }
</style>
