<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-19 18:28:12
 * @LastEditTime: 2021-07-30 10:00:58
 * @Description: 
 * @LastEditors: Mr.Mao
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
  import ACheckboxGroup from 'ant-design-vue/es/checkbox/Group'
  const props = defineProps()
</script>
