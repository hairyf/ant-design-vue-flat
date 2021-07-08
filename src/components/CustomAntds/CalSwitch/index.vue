<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-28 17:49:39
 * @LastEditTime: 2021-06-26 10:45:21
 * @Description: 切换栏
 * @LastEditors: Mr.wang
-->s
<template>
  <a-switch
    v-bind="props"
    v-model:checked="switchValue"
    @change="emit('change', $event ? activeValue : closeValue)"
  ></a-switch>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmit, computed } from 'vue-demi'
  import { Switch as ASwitch } from 'ant-design-vue'

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

  const emit = defineEmit(['update:modelValue', 'change'])

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
</script>

<style lang="scss">
  .ant-switch-checked {
    background-color: var(--color-primary);
  }
  .ant-switch:focus {
    box-shadow: none !important;
  }
  [ant-click-animating-without-extra-node='true']::after,
  .ant-click-animating-node {
    box-shadow: none !important;
  }
</style>
