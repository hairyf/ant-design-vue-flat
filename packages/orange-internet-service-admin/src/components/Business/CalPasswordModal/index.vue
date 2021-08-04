<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-17 10:59:08
 * @LastEditTime: 2021-06-24 18:26:36
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog
    v-model="show"
    :title="title || '密码'"
    width="532px"
    dialog-class="cal-password-modal cal-message-diolog"
    @ok="onConfirm"
    @cancel="onClone"
  >
    <a-form :rules="rules" :model="formState" ref="formRef">
      <div class="flex items-center">
        <i class="nr-warning text-red text-4xl mr-20" />
        <div class="flex-1">
          <div v-if="content" v-html="content"></div>
        </div>
      </div>
      <div class="ml-56" v-if="remark">
        <a-form-item required label="备注" name="remark">
          <cal-textarea
            placeholder="简短描述需备注信息"
            class="w-353 rounded-xl h-80"
            v-model:value="formState.remark"
          />
        </a-form-item>
      </div>
      <div class="mt-28 mb-10">
        <a-form-item required label="管理员操作密码" name="password">
          <cal-input-password
            placeholder="输入管理员操作密码"
            class="w-208"
            v-model:value="formState.password"
          />
        </a-form-item>
        <a-form-item label=" " name="check" v-if="check">
          <div class="ml-112">
            <cal-switch :active-value="true" :close-value="false" v-model="formState.check" />
            <span class="ml-12">已知晓删除风险，确定删除</span>
          </div>
        </a-form-item>
      </div>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts">
  import { defineComponent, computed, isRef, nextTick, watch, ref } from 'vue'
  import { props } from './props'
  import { Form } from 'ant-design-vue'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import CalInputPassword from '~/CustomAntds/CalInputPassword/index.vue'
  import CalSwitch from '~/CustomAntds/CalSwitch/index.vue'

  export default defineComponent({
    props,
    components: { AForm: Form, AFormItem: Form.Item, CalInputPassword, CalSwitch },
    setup: (props, { emit }) => {
      // 组件显示的数据双向代理
      const modelValue = computed({
        get: () => props.modelValue as boolean,
        set: () => emit('update:modelValue')
      })
      // Modal 方法调用传入 props 无法通过 emit 修改
      // 所以假如传入直接是一个 ref 则直接使用
      const show = isRef(props.modelValue) ? props.modelValue : modelValue

      // 假如初始化为 true , 切换状态让动画正常显示
      if (show.value) {
        show.value = false
        nextTick(() => (show.value = true))
      }

      // 关闭事件, 调用 reject, 为了兼容模板上直接使用组件, 还要在调用一次 clone 事件
      const onClone = () => {
        props.reject?.()
        emit('clone')
        show.value = false
      }

      // 确定事件, 调用 resolve, 为了兼容模板上直接使用组件, 还要在调用一次 confirm 事件
      const onConfirm = async () => {
        await validate()
        props.resolve?.(formState)
        emit('confirm', formState)
        show.value = false
      }

      const formRef = ref()
      const formState = ref({
        remark: '',
        password: '',
        check: false
      })
      const { rules, validate } = useAntdForm(formRef, {
        remark: { required: true, message: '请输入备注' },
        password: { required: true, message: '请输入密码' },
        check: { required: true, message: '请勾选知晓发现', type: 'boolean' }
      })
      if (!props.check) delete rules.value.check
      if (!props.remark) delete rules.value.remark

      return { show, onConfirm, onClone, props, formRef, rules, formState }
    }
  })
</script>
<style lang="scss">
  .cal-password-modal {
    .cal-message-diolog__content {
      padding-bottom: 1px !important;
    }
  }
</style>
