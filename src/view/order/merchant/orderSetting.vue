<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:57:12
 * @LastEditTime: 2021-06-24 14:30:52
 * @Description: 订单设置
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div v-if="loading"> 加载中... </div>
  <div v-else class="flex flex-col justify-center items-center">
    <cal-card class="w-804 pl-128">
      <a-form :model="form" ref="formRef" :rules="rules">
        <a-form-item label="待付款订单">
          <cal-radio-group v-model="form.value.type">
            <cal-radio value="0">不取消订单</cal-radio>
            <cal-radio value="1">自定义取消订单时间</cal-radio>
          </cal-radio-group>
          <template v-if="form.value.type === '1'">
            <div>
              <span>商户提交订单后</span>
              <a-form-item
                class="mx-14 inline-block"
                required
                :name="['value', 'time']"
                :rules="{ required: true, message: '取消时间必填', type: 'number' }"
              >
                <cal-input-number
                  :min="10"
                  :max="1440"
                  class="w-96"
                  placeholder="请输入"
                  v-model="form.value.time"
                />
              </a-form-item>
              <span>分钟未付款，将自动取消订单</span>
              <div class="text-xs text-gray-darkmin">自动取消订单时间必须在10-1440分钟之间</div>
            </div>
          </template>
        </a-form-item>
      </a-form>
    </cal-card>
    <cal-button size="large" type="primary" class="w-192 mt-64" @click="save">保存</cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { reqOrderSetting, reqSetOrder } from '@/api/order'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue-demi'
  /* 表单对象 */
  const formRef = ref(null)

  /* 表单数据列表 */
  const form = ref({
    status: 1,
    value: {
      type: '0',
      time: ''
    }
  })

  /** 加载中 */
  const loading = ref(true)
  const { rules, validate } = useAntdForm(formRef, {})

  /** 保存 */
  const save = async () => {
    await validate()
    await reqSetOrder(form.value)
    message.success('保存成功', 1.5)
  }

  onMounted(async () => {
    /* 获取设置配置 */
    const { data } = await reqOrderSetting()
    loading.value = false
    form.value.value = data.data.config
  })
</script>
