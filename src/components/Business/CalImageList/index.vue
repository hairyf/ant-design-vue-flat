<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-22 15:04:05
 * @LastEditTime: 2021-06-23 09:31:57
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-image-list">
    <div
      class="mr-10 rounded-lg overflow-hidden"
      v-for="(item, index) in srcs"
      :key="index"
      :style="style"
    >
      <cal-image :src="item" />
    </div>
    <add-item
      class="cursor-pointer rounded-lg"
      :style="style"
      v-if="srcs && srcs?.length <= maxLength && !disabled"
      @click="onSelectImage"
      :show-slot="!!$slots['default']"
    >
      <slot />
    </add-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { analyUnit } from '@/utils'
  import { computed, defineProps } from 'vue-demi'
  import { CalImageSelect } from '../CalImageSelect'
  const props = defineProps({
    modelValue: Array as () => string[],
    width: {
      type: [String, Number],
      default: 50
    },
    height: {
      type: [String, Number],
      default: 50
    },
    maxLength: {
      type: Number,
      default: Infinity
    },
    disabled: Boolean
  })
  const srcs = useModelRef(props, 'modelValue')
  const style = computed(() => ({
    width: analyUnit(props.width),
    height: analyUnit(props.height)
  }))
  const onSelectImage = async () => {
    const [image] = await CalImageSelect({ multiple: false })
    srcs.value?.push(image.path.url)
  }
</script>
