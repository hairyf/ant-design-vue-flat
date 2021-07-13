<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-12 20:01:20
 * @Description: 菜单项
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <li
    class="
      cal-menu-item
      cursor-pointer
      transition-all
      duration-500
      text-center
      flex
      justify-center
      items-center
    "
    :class="[itemCalss, vertical ? 'flex-col' : '', collapse ? 'cal-menu-item--collapse' : '']"
    @click="onUpdate?.(index)"
  >
    <span class="cal-munu-item__icon">
      <slot name="icon" />
    </span>
    <transition
      enter-active-class="animate__bounceIn"
      leave-active-class="animate__bounceOut"
      :duration="{ enter: 400, leave: 100 }"
    >
      <span class="cal-munu-item__content" v-if="!collapse">
        <slot />
      </span>
    </transition>
  </li>
</template>
<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  export default defineComponent({ name: 'CalMenuItem' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import type { Ref } from 'vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({
    // 唯一标识
    index: String,
    // 指示器
    indicator: {
      type: Boolean
    },
    // 是否垂直排序
    vertical: Boolean
  })
  useTheme('Menu')
  // 当前是否收起
  const collapse = inject('collapse') as Ref<boolean>
  // 当前高亮項
  const defaultActive = inject('defaultActive') as Ref<string[]>
  // 当前类型
  const styleType = inject<string>('styleType')
  // 调起更新
  const onUpdate = inject<(key?: string) => void>('onUpdate')
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.index)
  })
  // 当前项样式类名
  const itemCalss = computed(() => {
    if (styleType === 'button') {
      return active.value
        ? [
            'cal-munu-item__button',
            ' cal-munu-item__button-active',
            { 'cal-munu-item__indicator': props.indicator }
          ]
        : ['cal-munu-item__button']
    }
    return active.value
      ? ['cal-munu-item__default-active', { 'cal-munu-item__indicator': props.indicator }]
      : ['cal-munu-item__default']
  })
</script>

<style lang="scss" scoped>
  .cal-menu-item {
    position: relative;
    overflow: hidden;
    padding: 8px 0;
    line-height: 20px;
  }
  .cal-menu-item--collapse {
    padding: 10px 0;
  }
  .cal-munu-item__indicator::after {
    content: '';
    position: absolute;
    left: 97%;
    right: -3%;
    top: 26.92%;
    bottom: 26.92%;
    background: #ffffff;
    border-radius: 0px 10px 10px 0px;
    z-index: 15;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  .cal-munu-item__default {
    @apply bg-menu-item-body-color text-menu-item-text-color;
    &:hover {
      @apply bg-menu-item-body-hover-color text-menu-item-text-hover-color;
    }
  }
  .cal-munu-item__default-active {
    @apply bg-menu-item-body-active-color text-menu-item-text-active-color;
  }
  .cal-munu-item__button {
    @apply rounded-full mb-20 py-10;
    @apply bg-menu-item-btn-body-color text-menu-item-btn-text-color;
    &:hover {
      @apply bg-menu-item-btn-body-hover-color text-menu-item-btn-text-hover-color;
    }
  }
  .cal-munu-item__button-active {
    @apply bg-menu-item-btn-body-active-color text-menu-item-btn-text-active-color;
  }
</style>
