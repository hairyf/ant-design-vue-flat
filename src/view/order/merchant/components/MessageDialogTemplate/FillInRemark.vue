<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 17:47:34
 * @LastEditTime: 2021-06-10 16:06:08
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog v-model="showModal" @ok="onConfirm" @cancel="onClone" title="填写备注">
    <cal-textarea
      class="w-477 h-320 rounded-2xl"
      placeholder="输入备注内容"
      :maxlength="255"
      show-count
      v-model="text"
    />
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineEmit, defineProps, ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import CalTextarea from '~/CustomAntds/CalTextarea/index.vue'

  const text = ref('')

  const emit = defineEmit()
  const props = defineProps({
    // 是否展示组件
    modelValue: {
      type: Boolean,
      default: undefined
    },
    // 组件消失时(实例方法 > 移除实例)
    onVanish: Function,
    // 组件调用成功事件
    onResolve: Function,
    // 组件调用失败事件
    onReject: Function
  })
  // 双向数据绑定, 假如该值不存在, 则创建值
  const showModal = useModelRef(props, 'modelValue')
  // 隐藏时, 触发 props 中的组件移除
  watch(showModal, (value) => {
    if (value) return false
    setTimeout(() => props.onVanish?.(), 300)
  })
  // 关闭事件
  const onClone = () => {
    props.onReject?.()
    emit('cancel', false)
    showModal.value = false
  }
  // 确定事件
  const onConfirm = () => {
    props.onResolve?.({ text })
    emit('ok', true)
    showModal.value = false
  }
</script>
<style lang="scss"></style>
