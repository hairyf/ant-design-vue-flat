<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-01 17:02:49
 * @LastEditTime: 2021-06-15 17:22:31
 * @Description: 模态框信息块
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-descriptions :column="2" v-if="currentType == 'channel' && item.channel">
    <a-descriptions-item label="渠道名称"> {{ item.channel.name }} </a-descriptions-item>
    <a-descriptions-item label="使用状态">
      <span v-if="item.status == 4">已购买</span>
      <span v-if="item.status == 3">即将过期</span>
      <span v-if="item.status == 2">已过期</span>
      <span v-if="item.status == 1">已禁用</span>
    </a-descriptions-item>
    <a-descriptions-item label="渠道简介">
      {{ item.channel.remark }}
    </a-descriptions-item>
    <!-- <a-descriptions-item label="售卖规格"> ￥0/7日 </a-descriptions-item> -->
    <!-- <a-descriptions-item label="渠道版本"> V1.0.0 </a-descriptions-item> -->
  </a-descriptions>
  <a-descriptions :column="2" v-if="currentType == 'template' && item.template">
    <a-descriptions-item label="模板名称"> {{ item.template.name }} </a-descriptions-item>
    <a-descriptions-item label="使用状态">
      <span v-if="item.status == 4">已购买</span>
      <span v-if="item.status == 3">即将过期</span>
      <span v-if="item.status == 2">已过期</span>
      <span v-if="item.status == 1">已禁用</span>
    </a-descriptions-item>
    <a-descriptions-item label="模板简介">
      {{ item.template.remark }}
    </a-descriptions-item>
    <!-- <a-descriptions-item label="售卖规格"> ￥0/7日 </a-descriptions-item> -->
    <a-descriptions-item label="模板分类"> {{ item.template.class_one_name }} </a-descriptions-item>
  </a-descriptions>
  <a-descriptions :column="2" v-if="currentType == 'application' && item.addon">
    <a-descriptions-item label="应用名称"> {{ item.addon.name }} </a-descriptions-item>
    <a-descriptions-item label="使用状态">
      <span v-if="item.status == 4">已购买</span>
      <span v-if="item.status == 3">即将过期</span>
      <span v-if="item.status == 2">已过期</span>
      <span v-if="item.status == 1">已禁用</span>
    </a-descriptions-item>
    <a-descriptions-item label="应用简介">
      {{ item.addon.remark }}
    </a-descriptions-item>
    <!-- <a-descriptions-item label="售卖规格"> ￥0/7日 </a-descriptions-item> -->
    <a-descriptions-item label="应用分类"> {{ item.addon.class_one_name }} </a-descriptions-item>
  </a-descriptions>
  <a-descriptions :column="2" v-if="currentType == 'theme' && item.ui">
    <a-descriptions-item label="主题名称"> {{ item.ui.name }} </a-descriptions-item>
    <a-descriptions-item label="使用状态">
      <span v-if="item.status == 4">已购买</span>
      <span v-if="item.status == 3">即将过期</span>
      <span v-if="item.status == 2">已过期</span>
      <span v-if="item.status == 1">已禁用</span>
    </a-descriptions-item>
    <a-descriptions-item label="主题简介">
      {{ item.ui.remark }}
    </a-descriptions-item>
    <!-- <a-descriptions-item label="售卖规格"> ￥0/7日 </a-descriptions-item> -->
  </a-descriptions>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
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
