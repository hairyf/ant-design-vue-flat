<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-21 20:12:24
 * @LastEditTime: 2021-07-21 20:46:15
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="file-drag"
    @dragenter="isOver = true"
    @dragleave="isOver = false"
    @dragover.prevent
    @drop="onInterceptFile"
  >
    <slot :isOver="isOver" :selectFiles="selectFiles" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({ name: 'CalDragFile' })
</script>
<script lang="ts" setup>
  import { selectFiles as source } from '@tuimao/utils'
  const emit = defineEmits<(event: 'change', files: File[]) => void>()
  const isOver = ref(false)
  const onInterceptFile = (event: DragEvent) => {
    const files = Object.values(event.dataTransfer!.files)
    isOver.value = false
    emit('change', files)
    event.preventDefault()
  }
  const selectFiles = async (option?: { multiple?: boolean; accept?: string }) => {
    const files = await source(option)
    emit('change', files)
  }
</script>

<style lang="scss" scoped></style>
