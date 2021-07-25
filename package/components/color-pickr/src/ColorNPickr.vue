<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-24 16:36:38
 * @LastEditTime: 2021-07-24 18:41:45
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-color-picker v-bind="props" v-model:value="color" v-model:show="show">
    <template #action v-if="$slots['action'] || control">
      <slot name="action" />
      <template v-if="control">
        <cal-tag class="cursor-pointer px-10" color="" @click="color = oldColor">重置</cal-tag>
        <cal-tag class="cursor-pointer px-10 mr-0" @click="onConfirm">确认</cal-tag>
      </template>
    </template>
  </n-color-picker>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  export default defineComponent({ name: 'CalColorNPickr' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { NColorPicker } from 'naive-ui'
  import { inheritProps } from '../../../utils'
  import { useVModel } from '@vueuse/core'
  import CalTag from '../../tag/src/Tag.vue'
  const props = defineProps({
    ...inheritProps(NColorPicker),
    control: Boolean,
    modelValue: String
  })
  const oldColor = ref('')
  const color = useVModel(props, 'modelValue', undefined, { passive: true })
  const show = useVModel(props, 'show', undefined, { passive: true })

  watch(
    () => show.value,
    (value) => {
      if (props.control && value) oldColor.value = color.value || ''
      if (props.control && !value) color.value = oldColor.value
      console.log(oldColor.value)
    }
  )

  const onConfirm = () => {
    oldColor.value = color.value || ''
    show.value = false
  }
</script>

<style lang="scss" scoped></style>
