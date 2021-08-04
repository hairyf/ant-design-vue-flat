<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-22 15:05:36
 * @LastEditTime: 2021-06-23 09:31:25
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-image-item rounded-lg overflow-hidden" :style="style">
    <cal-image :src="src" v-if="src" />
    <add-item
      v-else-if="!disabled"
      @click="onSelectImage"
      class="w-full h-full cursor-pointer rounded-lg"
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
    modelValue: String,
    width: {
      type: [String, Number],
      default: 50
    },
    height: {
      type: [String, Number],
      default: 50
    },
    disabled: Boolean
  })
  const src = useModelRef(props, 'modelValue')
  const style = computed(() => ({
    width: analyUnit(props.width),
    height: analyUnit(props.height)
  }))
  const onSelectImage = async () => {
    const [image] = await CalImageSelect({ multiple: false })
    src.value = image.path.url
  }
</script>
<style></style>
