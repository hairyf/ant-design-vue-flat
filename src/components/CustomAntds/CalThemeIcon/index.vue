<!--
 * @Author: Zhilong
 * @Date: 2021-05-25 15:47:16
 * @LastEditTime: 2021-06-02 09:25:03
 * @Description: 主题图标
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <component :is="component">
    <slot />
  </component>
</template>
<script lang="ts" setup>
  import { computed, defineAsyncComponent, defineProps } from 'vue-demi'
  type TThemeIcon = 'coupon' | 'offers' | 'sortArrow' | 'numberTag' | 'selectStateBox' | 'addItem'
  const props = defineProps({
    type: {
      type: String as () => TThemeIcon,
      required: true,
      defalut: 'coupon'
    }
  })

  const typeStrategy = {
    coupon: defineAsyncComponent(() => import('./Coupon.vue')),
    offers: defineAsyncComponent(() => import('./Offers.vue')),
    sortArrow: defineAsyncComponent(() => import('./SortArrow.vue')),
    numberTag: defineAsyncComponent(() => import('./NumberTag.vue')),
    selectStateBox: defineAsyncComponent(() => import('./SelectStateBox.vue')),
    addItem: defineAsyncComponent(() => import('./AddItem.vue'))
  } as any

  const component = computed(() => typeStrategy[props.type])
</script>
