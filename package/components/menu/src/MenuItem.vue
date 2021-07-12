<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-12 16:43:49
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
      text-center text-menu-item-text-color
    "
    :class="[active ? [{ 'cal-munu-item__indicator': indicator }] : '']"
  >
    <slot />
  </li>
</template>
<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  export default defineComponent({ name: 'CalMenuItem' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import type { Ref } from 'vue'
  import { useTheme } from '~/utils/theme'
  const props = defineProps({
    // 唯一标识
    key: String,
    // 指示器
    indicator: {
      type: Boolean,
      default: true
    }
  })
  useTheme('Menu')
  // 当前是否收起
  const collapse = inject('collapse') as Ref<boolean>
  // 当前高亮項
  const defaultActive = inject('defaultActive') as Ref<string[]>
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.key)
  })
</script>

<style lang="scss" scoped>
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
</style>
