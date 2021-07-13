<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-13 11:13:46
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
    @click="!notUpdate && onUpdate?.(index)"
  >
    <span class="cal-menu-item__prefix">
      <slot name="prefix" />
    </span>
    <transition
      enter-active-class="animate__bounceIn"
      leave-active-class="animate__bounceOut"
      :duration="{ enter: 400, leave: 100 }"
    >
      <span class="cal-menu-item__content" v-if="!collapse">
        <slot />
      </span>
    </transition>
    <slot name="suffix" />
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
    vertical: Boolean,
    // 阻止调用更新
    notUpdate: Boolean
  })
  useTheme('Menu')
  // 当前是否收起
  const collapse = inject('collapse') as Ref<boolean>
  // 当前高亮項
  const defaultActive = inject('defaultActive') as Ref<string[]>
  // 当前样式类型('default', 'button')
  const styleType = inject<string>('styleType')
  // 当前组件类型为 children
  const isChildren = inject<boolean>('isChildren')
  // 调起更新
  const onUpdate = inject<(key?: string) => void>('onUpdate')
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.index)
  })
  // 当前项样式类名
  const itemCalss = computed(() => {
    const buttonClass = ['cal-munu-item__button']
    const buttonActiveClass = [
      'cal-munu-item__button__default',
      'cal-munu-item__button-active',
      { 'cal-munu-item__indicator': props.indicator }
    ]
    const childrenClass = ['cal-munu-item__children']
    const childrenAcitveClass = [
      'cal-munu-item__children-active',
      { 'cal-munu-item__indicator': props.indicator }
    ]
    const defaultClass = ['cal-munu-item__default']
    const defaultActiveClass = [
      'cal-munu-item__default-active',
      { 'cal-munu-item__indicator': props.indicator }
    ]
    let currentActiveClass = []
    let currentClass = []
    if (isChildren) {
      styleType === 'button' && childrenClass.push('cal-munu-item__button__default')
      styleType === 'button' && childrenAcitveClass.push('cal-munu-item__button__default')
      currentClass = childrenClass
      currentActiveClass = childrenAcitveClass
    } else if (styleType === 'button') {
      currentClass = buttonClass
      currentActiveClass = buttonActiveClass
    } else {
      currentClass = defaultClass
      currentActiveClass = defaultActiveClass
    }

    return active.value ? currentActiveClass : currentClass
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
  .cal-munu-item__button__default {
    @apply rounded-full mb-20 py-10;
  }
  .cal-munu-item__button {
    @extend .cal-munu-item__button__default;
    @apply bg-menu-item-btn-body-color text-menu-item-btn-text-color;
    &:hover {
      @apply bg-menu-item-btn-body-hover-color text-menu-item-btn-text-hover-color;
    }
  }
  .cal-munu-item__button-active {
    @apply bg-menu-item-btn-body-active-color text-menu-item-btn-text-active-color;
  }
  .cal-munu-item__children {
    @apply bg-menu-item-child-body-color text-menu-item-child-text-color;
    &:hover {
      @apply bg-menu-item-child-body-hover-color text-menu-item-child-text-hover-color;
    }
  }
  .cal-munu-item__children-active {
    @apply bg-menu-item-child-body-active-color text-menu-item-child-text-active-color;
  }
</style>
