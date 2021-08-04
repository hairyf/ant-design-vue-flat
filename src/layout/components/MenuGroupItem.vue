<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-21 22:26:37
 * @LastEditTime: 2021-07-06 16:51:36
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <template v-for="(item, index) in routes" :key="index">
    <template v-if="!item.meta?.hidden">
      <cal-menu-group
        header-class="rounded-full mb-16"
        default-class="text-primary-hollow"
        :height="38"
        :index="item.meta?.completePath"
        v-if="item.children?.length"
      >
        <template #icon>
          <i class="text-xl" :class="[item.meta?.icon]" />
        </template>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
        <!-- bg-primary-light-9 text-primary-light-1 -->
        <menu-group-item
          :isThree="true"
          :routes="item.children"
          active-class="bg-primary-light-8 text-primary"
        />
      </cal-menu-group>
      <cal-menu-item
        :secondLevelThree="isThree"
        :secondLevel="true"
        class="rounded-full mb-16"
        :index="item.meta?.completePath"
        active-class="bg-primary text-white"
        default-class="text-primary-hollow"
        :indicator="false"
        :height="38"
        v-else
      >
        <template #icon>
          <i class="text-xl" :class="[item.meta?.icon]" />
        </template>
        <span class="ml-20">{{ item.meta?.title }}</span>
      </cal-menu-item>
    </template>
  </template>
</template>
<script lang="ts" setup>
  import CalMenuItem from '~/CustomAntds/CalMenuItem/index.vue'
  import CalMenuGroup from '~/CustomAntds/CalMenuGroup/index.vue'
  import { defineProps, provide } from 'vue-demi'
  import * as t from 'vue-router'
  defineProps({
    routes: Array as () => t.RouteRecordRaw[],
    activeClass: String,
    // 判断是否三级
    isThree: {
      type: Boolean,
      default: false
    }
  })
  provide('collapse', false)
</script>
