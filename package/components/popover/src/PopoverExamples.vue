<!--
 * @Author: Zhilong
 * @Date: 2021-07-22 16:46:57
 * @LastEditTime: 2021-07-30 10:49:14
 * @Description: 示例
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <a-popover v-bind="props" :title="null" overlayClassName="cal-popover-container-in-examples">
    <template #content>
      <Image :size="size" :src="src" />
    </template>
    <span
      class="cal-popover-examples-container text-common-primary-color flex items-center"
      style="width: max-content"
    >
      <Icon type="examples" size="18" class="mr-10" />
      <span v-if="slots['default']">
        <slot />
      </span>
      <span v-else>{{ title }}</span>
    </span>
  </a-popover>
</template>
<script lang="ts">
  import type { AnalySizeOption } from '@tuimao/utils'
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalPopoverExamples' })
</script>
<script lang="ts" setup>
  import { useSlots } from 'vue'
  import Icon from '../../icon/src/Icon.vue'
  import Image from '../../image/src/Image.vue'
  import type { PropType } from 'vue'

  const slots = useSlots()
  const props = defineProps({
    title: {
      type: String,
      default: '示例'
    },
    size: {
      type: [Number, String, Array, Object] as PropType<AnalySizeOption>
    },
    src: String
  })
</script>
<style lang="scss">
  .cal-popover-container-in-examples {
    .ant-popover-inner {
      border-radius: 5px;
    }
  }
</style>
