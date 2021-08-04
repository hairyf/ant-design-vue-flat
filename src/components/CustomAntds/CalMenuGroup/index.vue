<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-06-17 17:35:55
 * @Description: 菜单栏分组
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <ul class="cal-menu-group">
    <li
      class="
        cal-menu-group__header
        flex
        px-20
        items-center
        cursor-pointer
        transition-all
        duration-500
      "
      :class="[active ? activeClass : defaultClass, headerClass]"
      :style="[style]"
      @click="onShowMenuItems"
    >
      <slot name="icon" />
      <span class="cal-munu-item__content whitespace-nowrap">
        <slot name="title" />
      </span>
      <i
        class="cal-arrow nr-solid-top-arrow text-xl transform duration-500"
        :class="[showMenuItems ? 'rotate-0' : '-rotate-180']"
      />
    </li>
    <cal-collapse-transition>
      <ul class="cal-menu-group__contents" v-show="showMenuItems">
        <slot></slot>
      </ul>
    </cal-collapse-transition>
  </ul>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import * as vt from 'vue'
  import { computed, defineProps, inject, ref } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import CalCollapseTransition from '~/CustomAntds/CalCollapseTransition/index.vue'
  const props = defineProps({
    height: {
      type: [String, Number],
      default: 52
    },
    // 当前标识
    index: {
      type: [String],
      default: ''
    },
    // 高亮 class
    activeClass: {
      type: String,
      default: 'bg-primary text-white'
    },
    // 未高亮 class (默认)
    defaultClass: {
      type: String,
      default: 'text-primary-light-8'
    },
    headerClass: {
      type: String,
      default: ''
    }
  })
  // 当前高亮項
  const defaultActive = inject('defaultActive') as vt.Ref<string[]>
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.index)
  })
  // 当前是否收起
  const showMenuItems = ref(false)
  setTimeout(() => (showMenuItems.value = active.value))
  // 当前组件样式
  const style = computed(() => ({
    height: analyUnit(props.height)
  }))
  // 处理展开收起
  const onShowMenuItems = () => {
    showMenuItems.value = !showMenuItems.value
  }
</script>
<style lnag="scss" scoped>
  .cal-menu-group__header {
    position: relative;
    width: 100%;
  }
  .cal-arrow {
    position: absolute;
    top: 5px;
    right: 10px;
  }
</style>
