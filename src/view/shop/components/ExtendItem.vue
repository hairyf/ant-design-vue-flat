<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-01 16:59:16
 * @LastEditTime: 2021-06-21 11:12:43
 * @Description: 扩展列表项
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card class="h-320 relative" v-if="currentType == 'channel' && item.channel">
    <div class="flex mb-32">
      <img
        class="h-64 w-64 mr-28"
        :src="item.channel.is_icon == 1 ? item.channel.image : item.channel.logo"
        alt=""
      />
      <div class="flex-1 flex flex-col">
        <div class="mb-10">{{ item.channel.name }}</div>
        <!-- <div class="bg-gray-dark bg-opacity-20 rounded-full inline-block w-96 text-center">
          <span class="text-gray-darkmin text-xs">版本 V2.0.0</span>
        </div> -->
      </div>
    </div>
    <a-descriptions :column="1">
      <a-descriptions-item label="使用状态">
        <span class="text-primary" v-if="item.status == 4">已购买</span>
        <span class="text-red" v-if="item.status == 3">即将过期</span>
        <span class="text-gray-darkmin" v-if="item.status == 2">已过期</span>
        <span class="text-red" v-if="item.status == 1">已禁用</span>
      </a-descriptions-item>
      <a-descriptions-item label="到期时间">
        {{ item.deadline == 0 ? '永久' : $formatUnix(item.deadline) }}
      </a-descriptions-item>
      <a-descriptions-item label="渠道简介">
        <div class="text-gray-darkmin">{{ item.channel.remark }}</div>
      </a-descriptions-item>
    </a-descriptions>
    <span
      class="text-primary absolute bottom-16 right-24 cursor-pointer"
      @click="$emit('edit', item)"
    >
      编辑
    </span>
  </cal-card>
  <cal-card class="h-320 relative" v-if="currentType == 'template' && item.template">
    <div class="flex mb-32">
      <img class="h-64 w-64 mr-28" :src="item.template.logo" alt="" />
      <div class="flex-1 flex flex-col">
        <div class="mb-10">{{ item.template.name }}</div>
        <div class="bg-gray-dark bg-opacity-20 rounded-full inline-block w-96 text-center">
          <span class="text-gray-darkmin text-xs">{{ item.template.class_one_name }}</span>
        </div>
      </div>
    </div>
    <a-descriptions :column="1">
      <a-descriptions-item label="使用状态">
        <span class="text-primary" v-if="item.status == 4">已购买</span>
        <span class="text-red" v-if="item.status == 3">即将过期</span>
        <span class="text-gray-darkmin" v-if="item.status == 2">已过期</span>
        <span class="text-red" v-if="item.status == 1">已禁用</span>
      </a-descriptions-item>
      <a-descriptions-item label="到期时间">
        {{ item.deadline == 0 ? '永久' : $formatUnix(item.deadline) }}
      </a-descriptions-item>
      <a-descriptions-item label="渠道简介">
        <div class="text-gray-darkmin">{{ item.template.remark }}</div>
      </a-descriptions-item>
    </a-descriptions>
    <span
      class="text-primary absolute bottom-16 right-24 cursor-pointer"
      @click="$emit('edit', item)"
    >
      编辑
    </span>
  </cal-card>
  <cal-card class="h-320 relative" v-if="currentType == 'application' && item.addon">
    <div class="flex mb-32">
      <img
        class="h-64 w-64 mr-28"
        :src="item.addon.is_icon == 1 ? item.addon.image : item.addon.logo"
        alt=""
      />
      <div class="flex-1 flex flex-col">
        <div class="mb-10">{{ item.addon.name }}</div>
        <div class="bg-gray-dark bg-opacity-20 rounded-full inline-block w-96 text-center">
          <span class="text-gray-darkmin text-xs">{{ item.addon.class_one_name }}</span>
        </div>
      </div>
    </div>
    <a-descriptions :column="1">
      <a-descriptions-item label="使用状态">
        <span class="text-primary" v-if="item.status == 4">已购买</span>
        <span class="text-red" v-if="item.status == 3">即将过期</span>
        <span class="text-gray-darkmin" v-if="item.status == 2">已过期</span>
        <span class="text-red" v-if="item.status == 1">已禁用</span>
      </a-descriptions-item>
      <a-descriptions-item label="到期时间">
        {{ item.deadline == 0 ? '永久' : $formatUnix(item.deadline) }}
      </a-descriptions-item>
      <a-descriptions-item label="渠道简介"> {{ item.addon.remark }} </a-descriptions-item>
    </a-descriptions>
    <span
      class="text-primary absolute bottom-16 right-24 cursor-pointer"
      @click="$emit('edit', item)"
    >
      编辑
    </span>
  </cal-card>
  <cal-card class="h-320 relative" v-if="currentType == 'theme' && item.ui">
    <div class="flex mb-32 items-center">
      <!-- <img class="h-64 w-64 mr-28" :src="item.channel" alt="" /> -->
      <theme-item
        class="h-64 w-64 mr-28"
        :color="item.ui.content.linearGradientColor || item.ui.content.color"
        :linear-gradient="!item.ui.content.linearGradientColor"
        :hover="false"
      />
      <div class="flex-1">
        {{ item.ui.name }}
      </div>
    </div>
    <a-descriptions :column="1">
      <a-descriptions-item label="使用状态">
        <span class="text-primary" v-if="item.status == 4">已购买</span>
        <span class="text-red" v-if="item.status == 3">即将过期</span>
        <span class="text-gray-darkmin" v-if="item.status == 2">已过期</span>
        <span class="text-red" v-if="item.status == 1">已禁用</span>
      </a-descriptions-item>
      <a-descriptions-item label="到期时间">
        {{ item.deadline == 0 ? '永久' : $formatUnix(item.deadline) }}
      </a-descriptions-item>
      <a-descriptions-item label="渠道简介">{{ item.ui.remark }}</a-descriptions-item>
    </a-descriptions>
    <span
      class="text-primary absolute bottom-16 right-24 cursor-pointer"
      @click="$emit('edit', item)"
    >
      编辑
    </span>
  </cal-card>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue-demi'
  import ThemeItem from '@/layout/components/ThemeItem.vue'
  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    currentType: {
      required: true,
      type: String
    }
  })
</script>
<style lang="scss" scoped>
  :deep(.ant-descriptions-item) {
    display: flex;
  }
</style>
