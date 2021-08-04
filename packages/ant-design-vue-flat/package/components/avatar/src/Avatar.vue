<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 15:58:53
 * @LastEditTime: 2021-07-16 15:43:42
 * @Description: 头像
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <img class="cal-avatar" :style="[style]" :src="src" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalAvatar' })
</script>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue-demi'
  import { analyUnit } from '@tuimao/utils'
  const props = defineProps({
    size: [Number, String],
    src: String,
    fit: String
  })
  const style = computed(() => ({
    width: analyUnit(props.size || ''),
    height: analyUnit(props.size || ''),
    fit: props.fit
  }))
  const defaultSrc =
    'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/avatar.png'
  const src = computed(() => props.src || defaultSrc || '')
</script>
