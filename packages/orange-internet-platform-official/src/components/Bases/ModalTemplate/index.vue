<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-17 10:59:08
 * @LastEditTime: 2021-06-22 16:16:13
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-modal v-model="show" v-bind="props">

  </a-modal>
</template>
<script lang="ts">
import { defineComponent, computed, isRef, nextTick, watch } from 'vue'
import { props } from './props'

export default defineComponent({
  props,
  setup: (props, { emit }) => {
    // 组件显示的数据双向代理
    const modelValue = computed({
      get: () => <boolean>props.modelValue,
      set: () => emit('update:modelValue')
    })
    // Modal 方法调用传入 props 无法通过 emit 修改
    // 所以假如传入直接是一个 ref 则直接使用
    const show = isRef(props.modelValue) ? props.modelValue : modelValue

    // 假如初始化为 true , 切换状态让动画正常显示
    if (show.value) {
      show.value = false
      nextTick(() => show.value = true)
    }

    // 关闭事件, 调用 reject, 为了兼容模板上直接使用组件, 还要在调用一次 clone 事件
    const onClone = () => {
      props.reject?.()
      emit('clone')
      show.value = false
    }

    // 确定事件, 调用 resolve, 为了兼容模板上直接使用组件, 还要在调用一次 confirm 事件
    const onConfirm = () => {
      props.resolve?.()
      emit('confirm')
      show.value = false
    }

    return { show, onConfirm, onClone, props }
  }
})
</script>
<style lang="scss" scoped>
.base-model__mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.base-model__content {
  position: absolute;
  border-radius: 20px;
  width: 600px;
  height: 300px;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.base-model__control {
  position: absolute;
  right: 0;
  bottom: 20px;
  span {
    margin-right: 20px;
  }
}
/* 组件动画 start */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-top,
.fade-leave-from {
  opacity: 1;
}
/* 组件动画 end */
</style>
