<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-13 10:01:30
 * @LastEditTime: 2021-07-13 10:19:10
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <template v-for="(item, index) in routes" :key="index">
    <template v-if="!item.meta?.hidden">
      <cal-menu-group v-if="item.children?.length" :index="item.meta?.completePath">
        <template #title> {{ item.meta?.title }} </template>
        <menu-group-item :routes="item.children" />
      </cal-menu-group>
      <cal-menu-item v-else :index="item.meta?.completePath">
        <template #default> {{ item.meta?.title }} </template>
      </cal-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import type { RouteRecordRaw } from 'vue-router'
  defineProps({
    routes: Array as () => RouteRecordRaw[]
  })
</script>

<style lang="scss" scoped></style>
