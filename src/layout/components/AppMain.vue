<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-03-02 09:00:31
 * @LastEditTime: 2021-07-14 20:25:49
 * @Description: 视图内容
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-layout-content class="mx-16 flex flex-col overflow-auto">
    <div class="text-2xl mb-28 mt-20" v-if="!route.meta.hiddenTitle">
      {{ route.query?.title || route.meta.title }}
    </div>
    <div class="flex-1 min-w-1000">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </cal-layout-content>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>
<style scoped></style>
