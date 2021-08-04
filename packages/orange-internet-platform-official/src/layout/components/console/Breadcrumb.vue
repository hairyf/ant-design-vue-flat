<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 14:46:12
 * @LastEditTime: 2021-06-21 18:33:07
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex items-center">
    <div class="circular"></div>
    <a-breadcrumb>
      <template v-for="(item, index) in matcheds" :key="index">
        <a-breadcrumb-item>
          <router-link :to="item.path" v-if="index !== matcheds.length - 1">
            {{ item.meta.title }}
          </router-link>
          <span v-else>{{ item.meta.title }}</span>
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

  // 面包屑列表
  const matcheds = computed(() => {
    // 如果第一项不是首页
    const currentMatched = route.matched.filter((v) => v.meta.title)
    if (route.matched[0]?.meta?.title !== '首页') {
      const homeRoute = { path: '/', meta: { title: '首页', icon: 'home', activeMenu: '/' } }
      return [homeRoute, ...currentMatched]
    }
    return currentMatched
  })
</script>
<style lang="scss">
  .circular {
    width: 4px;
    height: 16px;
    background: #e89026;
    border-radius: 40px;
    margin-right: 5px;
  }
  .ant-breadcrumb > span:last-child {
    color: #e89026 !important;
  }
  .ant-breadcrumb a:hover {
    color: #e89026 !important;
  }
</style>
