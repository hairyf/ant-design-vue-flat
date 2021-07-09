<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-09 11:50:43
 * @LastEditTime: 2021-07-09 11:53:49
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <layout-content v-bond="props">
    <template v-for="(i, k) in $slots" :key="k">
      <slot :name="k" />
    </template>
  </layout-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalLayoutContent' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { Layout } from 'ant-design-vue'
  const LayoutContent = Layout.Content
  const props = defineProps(Layout.props)
</script>

<style lang="scss" scoped></style>
