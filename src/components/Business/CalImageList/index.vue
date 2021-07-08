<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-22 15:04:05
 * @LastEditTime: 2021-06-23 14:48:44
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-image-list">
    <div
      class="cal-image-box mr-10 rounded-lg overflow-hidden inline-block relative"
      v-for="(item, index) in srcs"
      :key="index"
      :style="style"
    >
      <cal-image :src="item" :preview="true" />
      <div class="cal-hover-box" @click="srcs?.splice(index, 1)"> 删除 </div>
    </div>
    <add-item
      class="cursor-pointer rounded-lg inline-block"
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
<style lang="scss" scoped>
  .cal-hover-box {
    @apply h-32 w-full bg-black bg-opacity-40 absolute bottom-0 flex items-center justify-center text-white text-xs select-none cursor-pointer;
    display: none;
  }
  .cal-image-box:hover {
    .cal-hover-box {
      display: flex;
    }
  }
</style>
