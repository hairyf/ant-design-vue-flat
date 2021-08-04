<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 17:47:34
 * @LastEditTime: 2021-06-10 10:23:35
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog
    v-bind="props"
    @ok="onConfirm"
    @cancel="onClone"
    title="支付订单"
    customBackground="#F2F6FA"
    class="w-804"
  >
    <cal-tabs v-model:activeKey="activeKey">
      <cal-tab-pane :key="0" tab="微信支付">
        <div class="w-full h-288"> 微信支付 </div>
      </cal-tab-pane>
      <cal-tab-pane :key="1" tab="支付宝支付">
        <div class="w-full h-288"> 支付宝支付 </div>
      </cal-tab-pane>
    </cal-tabs>
    <template class="bg-white-darkmin" #footer>
      <div class="bg-white-darkmin -mx-20 -my-10 w-screen h-20" />
    </template>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineEmit, defineProps, ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import CalTabs from '~/CustomAntds/CalTabs/index.vue'
  import CalTabPane from '~/CustomAntds/CalTabPane/index.vue'

  const text = ref('')
  const activeKey = ref(0)

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
