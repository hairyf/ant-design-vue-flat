<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:56:47
 * @LastEditTime: 2021-07-30 10:22:00
 * @Description: 切换栏
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-switch
    class="cal-switch"
    v-bind="props"
    v-model:checked="switchValue"
    @change="emit('change', $event ? activeValue : closeValue)"
  ></a-switch>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSwitch' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps, defineEmits, computed } from 'vue'
  import ASwitch from 'ant-design-vue/es/switch'
  const props = defineProps({
    modelValue: [String, Number, Boolean],
    activeValue: {
      type: [String, Number, Boolean],
      default: 1
    },
    closeValue: {
      type: [String, Number, Boolean],
      default: 0
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const switchValue = computed({
    get: () => {
      return props.modelValue == props.activeValue
    },
    set: (value) => {
      if (value) {
        emit('update:modelValue', props.activeValue)
      } else {
        emit('update:modelValue', props.closeValue)
      }
    }
  })
  useTheme('Common')
</script>

<style lang="scss">
  .cal-switch {
    &.ant-switch-checked {
      background-color: var(--common-primary-color) !important;
    }
    &.ant-switch {
      background-color: #eaeaea;
    }
    &.ant-switch:focus {
      box-shadow: none !important;
    }
    &[ant-click-animating-without-extra-node='true']::after,
    .ant-click-animating-node {
      box-shadow: none !important;
    }
  }
</style>
