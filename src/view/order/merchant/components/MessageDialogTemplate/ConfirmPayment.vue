<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-15 17:19:32
 * @LastEditTime: 2021-06-23 10:46:00
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog v-model="showModal" @ok="onConfirm" @cancel="onClone" title="确认付款">
    <div>
      <div class="flex items-center mb-28">
        <i class="nr-warning text-red text-5xl mr-20" />
        <div>您已确定该店铺已付款了么？</div>
      </div>
      <a-form :model="form">
        <a-form-item required label="确认原因">
          <cal-textarea
            class="w-384 h-128 rounded-2xl"
            placeholder="输入确认原因"
            :maxlength="50"
            show-count
            v-model="form.text"
          />
        </a-form-item>
        <a-form-item label="系统登录密码">
          <cal-input placeholder="输入系统登录密码" v-model="form.password" type="password" />
        </a-form-item>
      </a-form>
    </div>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineEmit, defineProps, ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import CalTextarea from '~/CustomAntds/CalTextarea/index.vue'
  import CalInput from '~/CustomAntds/CalInput/index.vue'
  import { Form as AForm } from 'ant-design-vue'
  const AFormItem = AForm.Item

  const form = ref({
    text: '',
    password: ''
  })

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
    props.onResolve?.(form.value)
    emit('ok', true)
    showModal.value = false
  }
</script>
<style lang="scss"></style>
