<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-07-06 10:03:24
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-config-provider :locale="locale">
    <router-view />
    <cal-button
      class="absolute top-28 right-208"
      v-if="development"
      @click="outputRoutes(mainRoutes)"
    >
      下载路由权限表
    </cal-button>
  </a-config-provider>
</template>
<script lang="ts" setup>
  import locale from 'ant-design-vue/es/locale/zh_CN'
  import { outputRoutes } from '@/utils/vue-utils'
  import { mainRoutes } from '@/router'
  const development = import.meta.env.MODE === 'development'
</script>
