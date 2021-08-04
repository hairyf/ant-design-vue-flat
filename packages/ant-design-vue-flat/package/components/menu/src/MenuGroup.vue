<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-13 09:10:07
 * @LastEditTime: 2021-07-22 15:23:11
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <ul class="cal-menu-group">
    <cal-menu-item :index="index" @click="onShowMenuItems" not-update>
      <template #prefix> <slot name="prefix" /> </template>
      <template #suffix>
        <div
          class="cal-menu-group__icon transform duration-200 absolute"
          :class="[showMenuItems ? 'rotate-0' : '-rotate-180']"
        >
          <cal-icon size="20" type="up-arrow" />
        </div>
      </template>
      <slot name="title" />
    </cal-menu-item>
    <cal-provide id="isChildren" :value="true">
      <cal-collapse-transition>
        <ul class="cal-menu-group__contents" v-show="showMenuItems">
          <slot></slot>
        </ul>
      </cal-collapse-transition>
    </cal-provide>
  </ul>
</template>
<script lang="ts">
  import { defineComponent, provide } from 'vue'
  import type { Ref } from 'vue'
  export default defineComponent({ name: 'CalMenuGroup' })
</script>
<script lang="ts" setup>
  import CalMenuItem from './MenuItem.vue'
  import CalIcon from '../../icon/src/Icon.vue'
  import * as vt from 'vue'
  import { computed, defineProps, inject, ref } from 'vue'
  import CalCollapseTransition from '../../transition/src/CollapseTransition.vue'
  import CalProvide from '../../_internal/src/Provide.vue'
  const props = defineProps({
    // 当前标识
    index: {
      type: [String],
      default: ''
    }
  })
  // 上级所有索引
  const upindexs = inject<Ref<string[]>>('upindexs')
  // 注入索引
  provide(
    'upindexs',
    computed(() => [...(upindexs?.value || []), props.index])
  )
  // 当前高亮項
  const defaultActive = inject('defaultActive') as vt.Ref<string[]>
  // 当前是否高亮
  const active = computed(() => {
    return defaultActive.value.some((v) => v === props.index)
  })
  // 当前是否收起
  const showMenuItems = ref(false)
  setTimeout(() => (showMenuItems.value = active.value))
  // 处理展开收起
  const onShowMenuItems = () => {
    showMenuItems.value = !showMenuItems.value
  }
</script>

<style lang="scss" scoped>
  .cal-menu-group__icon {
    right: 8px;
    line-height: 10px;
  }
</style>
