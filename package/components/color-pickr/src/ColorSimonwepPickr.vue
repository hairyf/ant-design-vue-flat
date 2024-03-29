<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-26 11:17:43
 * @LastEditTime: 2021-07-15 10:03:39
 * @Description: 颜色选择器
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="color-puckr-container"
    ref="colorPickContainer"
    :style="{ width: width, height: height }"
  >
    <div ref="colorPickrEl"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalColorSimonwepPickr' })
</script>
<script lang="ts" setup>
  import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'
  // 引入颜色选择器
  import Pickr from '@simonwep/pickr'
  // 引入颜色选择主题
  import '@simonwep/pickr/dist/themes/classic.min.css' // 'classic' theme
  import '@simonwep/pickr/dist/themes/monolith.min.css' // 'monolith' theme
  import '@simonwep/pickr/dist/themes/nano.min.css' // 'nano' theme
  const props = defineProps({
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    },
    modelValue: String,
    // 是否动态更改值
    dynamic: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits([
    'change',
    'update:modelValue',
    'cancel',
    'clear',
    'hide',
    'show',
    'save'
  ])
  const colorPickrEl = ref<HTMLElement>()
  const colorPickContainer = ref<HTMLElement>()
  onMounted(() => {
    if (!colorPickrEl.value) return false
    const pickr = Pickr.create({
      el: colorPickrEl.value,
      // 主题配置
      theme: 'monolith', // or 'monolith', or 'nano'
      swatches: [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107'
      ],
      default: '#ffffff',
      // 是否锁定透明度
      // lockOpacity: true,
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: { hex: true, input: true, save: true }
      },
      defaultRepresentation: 'RGBA'
    })
    // 绑定对应事件
    pickr.on('init', () => {
      const pickrButton = colorPickContainer.value?.querySelector('button')
      if (!pickrButton) return false
      pickrButton.style.transition = 'none'
      pickr.setColor(props.modelValue || '#ffffff')
      pickrButton.style.transition = 'all .3s'
    })
    pickr.on('change', () => {
      emit('change', pickr.getColor())
      if (props.dynamic) {
        emit('update:modelValue', pickr.getColor().toHEXA().toString())
      }
    })
    pickr.on('cancel', () => emit('cancel', pickr.getColor()))
    pickr.on('clear', () => emit('clear', pickr.getColor()))
    pickr.on('hide', () => emit('hide'))
    pickr.on('show', () => emit('show'))
    pickr.on('save', () => {
      if (pickr.getColor().toHEXA().toString() == props.modelValue) return
      emit('save', pickr.getColor())
      emit('update:modelValue', pickr.getColor().toHEXA().toString().toLocaleLowerCase())
    })
    watch(
      () => props.modelValue,
      (value) => {
        value && pickr.setColor(value)
      }
    )
  })
</script>
<style lang="scss">
  .color-puckr-container {
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid grey;
    padding: 2px;
    border-radius: 6px;
    .pickr {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .pcr-button {
      position: absolute;
      padding: 0 !important;
      width: 100%;
      height: 100%;
    }
  }
</style>
