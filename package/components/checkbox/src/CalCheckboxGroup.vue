<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-19 18:28:12
 * @LastEditTime: 2021-07-19 18:30:02
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-checkbox-group v-bind="props">
    <slot />
  </a-checkbox-group>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCheckboxGroup' })
</script>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import { CheckboxGroup as ACheckboxGroup } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps()
  // useTheme('Common')
</script>
