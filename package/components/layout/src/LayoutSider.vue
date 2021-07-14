<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-09 16:50:37
 * @Description: 按钮
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <layout-sider class="cal-layout-sider bg-layout-sider-color" v-bind="props">
    <slot></slot>
  </layout-sider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalLayoutSider' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  const LayoutSider = Layout.Sider
  const props = defineProps({
    ...(Layout.props as {}),
    iconClass: String
  })
  useTheme('Layout')
</script>
<style lang="scss" scoped></style>
