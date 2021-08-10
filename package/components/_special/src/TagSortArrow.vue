<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:36
 * @LastEditTime: 2021-08-10 16:18:18
 * @Description: 排序箭头
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <span class="relative cursor-pointer flex h-max items-center" @click="onClick">
    <slot />
    <cal-icon
      class="ml-4"
      :class="[status === 1 && 'text-common-primary-color']"
      type="up-arrow-2"
      :size="size"
    />
    <div class="transform -rotate-180 flex items-center">
      <cal-icon
        class="relative"
        type="up-arrow-2"
        :size="size"
        :class="[status === 2 && 'text-common-primary-color']"
        :style="{ left: '30%' }"
      />
    </div>
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTagSortArrow' })
</script>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import { defineProps } from 'vue'
  import type { PropType } from 'vue'
  import type { AnalySizeOption } from '@tuimao/utils'
  import { useTheme } from '../../../utils/theme'
  import CalIcon from '../../icon/src/Icon.vue'
  const props = defineProps({
    modelValue: {
      type: Number as () => 0 | 1 | 2,
      default: 0
    },
    size: {
      type: Number,
      default: 12
    },
    text: String
  })
  const status = useVModel(props, 'modelValue')
  const onClick = () => {
    let index = status.value
    ++index > 2 ? (status.value = 0) : ++status.value
  }
  useTheme('Common')
</script>
