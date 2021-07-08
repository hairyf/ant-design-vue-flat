<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-08 10:47:36
 * @LastEditTime: 2021-06-10 17:08:44
 * @Description: 二维码组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="qrcode-container"
    :style="{ backgroundColor: props.colorLight, padding: `${props.margin}px` }"
  >
    <div ref="qrCodeRef"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import { defineProps, onMounted, watch } from '@vue/runtime-core'
  import QRCode from 'qrcodejs2-fix'
  const qrCodeRef = ref<HTMLElement>()
  const props = defineProps({
    text: { type: String, required: true },
    size: { type: Number, required: true },
    colorDark: { type: String, default: '#000000' },
    colorLight: { type: String, default: '#ffffff' },
    margin: { type: Number, default: 6 }
  })
  let qrcode: any
  const resetQrCode = () => {
    if (!qrCodeRef.value) return
    qrcode = new QRCode(qrCodeRef.value, {
      ...props,
      width: props.size - props.margin,
      height: props.size - props.margin
    })
  }
  onMounted(resetQrCode)
  watch(
    () => props.text,
    (value) => qrcode.makeCode(value)
  )
  const watchList = [() => props.size, () => props.colorDark, () => props.colorLight]
  watch(watchList, resetQrCode)
</script>

<style lang="scss" scoped></style>
