<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 17:47:34
 * @LastEditTime: 2021-06-10 16:06:20
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog
    v-bind="props"
    @ok="onConfirm"
    @cancel="onClone"
    :title="result ? '支付成功' : '支付失败'"
  >
    <div>
      <div class="flex items-center">
        <i v-if="result" class="nr-after text-red text-4xl mr-20" />
        <i v-else class="nr-warning text-red text-4xl mr-20" />
        <div v-if="result">
          <div>支付成功</div>
        </div>
        <div v-else>
          <div>支付失败</div>
          <div>付款结果异常，请截图联系客服进行处理</div>
        </div>
      </div>
      <div>
        <a-form>
          <a-from-item label="实付金额">¥1300.00 </a-from-item>
          <a-from-item label="订单编号">PL21030800008a00000119500611 </a-from-item>
          <a-from-item label="支付方式">微信扫码</a-from-item>
          <a-from-item label="套餐名称">短信套餐 </a-from-item>
          <a-from-item label="套餐条数">3453条 </a-from-item>
        </a-form>
      </div>
    </div>
    <template v-if="!result" #footer>
      <cal-button class="px-40">联系客服</cal-button>
    </template>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineEmit, defineProps, ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import { Form as AForm } from 'ant-design-vue'
  const AFormItem = AForm.Item

  const text = ref('')

  const emit = defineEmit()
  const props = defineProps({
    result: Boolean,
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
