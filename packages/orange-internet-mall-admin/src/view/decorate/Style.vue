<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-23 20:24:46
 * @LastEditTime: 2021-05-06 17:26:01
 * @Description: 颜色风格
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <decorate-main>
    <template #content>
      <div class="view-containers oe-flex oe-row-center">
        <mobile-emulator class="view-container">
          <img class="color-img" src="/custom-assets/images/decorate/main-color-1.png" alt="" />
          <div
            class="color-rect"
            style="width: 200px; height: 50px; bottom: 5px; right: 0"
            :style="{ backgroundColor: decorateInfo.content.style }"
          />
        </mobile-emulator>
        <!-- <mobile-emulator class="view-container">
          <img src="/custom-assets/images/decorate/main-color-1.png" alt="" />
        </mobile-emulator> -->
      </div>
    </template>
    <template #edit>
      <edit-card-form :show-margin-top="false" title="颜色选择">
        <div
          class="color-item oe-flex"
          :class="{ on: decorateInfo.content.style == item.color }"
          v-for="(item, index) in colors"
          :key="index"
          @click="decorateInfo.content.style = item.color"
        >
          <div class="color-block" :style="{ background: item.color }" />
          <div class="tips">{{ item.text }}</div>
        </div>
      </edit-card-form>
    </template>
  </decorate-main>
</template>
<script lang="ts" setup>
  import DecorateMain from '@/view/decorate/layout/DecorateMain.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import { ref } from '@vue/reactivity'
  import { defineProps } from '@vue/runtime-core'
  import { defaultContentOption } from './config'
  const props = defineProps({
    decorateInfo: {
      type: Object as () => DecorateInfo<typeof defaultContentOption>,
      required: true
    }
  })
  const colors = ref([
    { color: '#1D7AF6', text: '深海蓝' },
    { color: '#FF7323', text: '炫酷橙' },
    { color: '#EF1770', text: '丁香粉' },
    { color: '#DDAF73', text: '电镀金' },
    { color: '#FF2F3C', text: '蔷薇红' },
    { color: '#09BB72', text: '翡翠绿' },
    { color: '#AF01B3', text: '神秘紫' }
  ])
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .view-containers {
    margin-top: 20px;
    margin-bottom: 20px;
    .view-container {
      position: relative;
      @include not-last-child(margin-right, 50px);
      margin: 0;
    }
  }
  .color-img {
    position: relative;
    z-index: 5;
  }
  .color-rect {
    position: absolute;
  }
  .color-item {
    @include not-last-child(margin-bottom, 20px);
    padding: 20px;
    border: 1px solid #d9d9d9;
    &.on {
      box-shadow: 0px 0px 5px var(--color-primary-light-opacity-6);
    }
  }
  .color-block {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
</style>
