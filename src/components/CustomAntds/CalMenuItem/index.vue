<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-06 17:05:11
 * @Description: 菜单项
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <li
    class="cal-menu-item cursor-pointer transition-all duration-500 w-full"
    :class="[
      active ? [activeClass, { 'cal-munu-item__indicator': indicator }] : defaultClass,
      secondLevel ? '' : 'text-center',
      collapse ? 'py-10' : 'py-4',
      secondLevelThree ? (active ? 'bg-primary-light-opacity-7 text-primary' : '') : ''
    ]"
    :style="[style]"
    @click="onRouterToIndex"
  >
    <slot name="icon" />
    <transition
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      :duration="{ enter: 400, leave: 100 }"
    >
      <div
        class="cal-munu-item__content whitespace-nowrap"
        v-if="!collapse"
        :class="[secondLevel ? 'leading-8 ' : '']"
      >
        <slot />
      </div>
    </transition>
    <a-popover
      placement="right"
      overlayClassName="cal-nenu-item-popover"
      width="asdas"
      trigger="hover"
      v-if="collapse && popover"
    >
      <div class="w-full h-full absolute left-0 top-0" />
      <template #content>
        <slot name="popoverCotent" />
      </template>
    </a-popover>
  </li>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import * as vt from 'vue'
  import { computed, defineProps, inject } from 'vue-demi'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const props = defineProps({
    height: {
      type: [String, Number],
      default: 'auto'
    },
    // 指示器
    indicator: {
      type: Boolean,
      default: true
    },
    // 当前标识
    index: {
      type: [String],
      default: ''
    },
    // 高亮 class
    activeClass: {
      type: String,
      default: 'bg-primary-light-2 text-white'
    },
    // 未高亮 class (默认)
    defaultClass: {
      type: String,
      default: 'text-primary-light-8'
    },
    // 展开时进入动画类名
    enterActiveClass: String,
    // 展开时离开动画类名
    leaveActiveClass: String,
    // 是否展示气泡
    popover: {
      type: Boolean,
      default: false
    },
    // 是否为二级菜单
    secondLevel: {
      type: Boolean,
      default: false
    },
    // 是否为三级菜单
    secondLevelThree: {
      type: Boolean,
      default: false
    }
  })
  // 当前是否收起
  const collapse = inject('collapse') as vt.Ref<boolean>
  // 当前高亮項
  const defaultActive = inject('defaultActive') as vt.Ref<string[]>
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.index)
  })

  // 当前组件样式
  const style = computed(() => ({
    height: analyUnit(props.height)
  }))

  // 处理跳转
  const onRouterToIndex = () => {
    router.push(props.index)
  }
</script>
<style lang="scss">
  .cal-menu-item {
    position: relative;
    width: 100%;
    overflow: hidden;
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
  .cal-nenu-item-popover {
    .ant-popover-inner {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 20px;
    }
    .ant-popover-inner-content {
      min-height: 150px;
      padding-bottom: 1px;
    }
  }
</style>
