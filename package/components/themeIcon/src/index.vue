<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:05
 * @LastEditTime: 2021-07-13 11:09:48
 * @Description: 主题图标
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <component :is="component">
    <slot />
  </component>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalThemelcon' })
</script>
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
