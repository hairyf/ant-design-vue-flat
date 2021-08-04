<!--
 * @Author: Mr.wang
 * @Date: 2021-06-25 11:22:42
 * @LastEditTime: 2021-07-09 18:46:18
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="短信接收" :key="1">
        <a-form-item label="联系电话" name="phone">
          <cal-input
            v-model:value="formState.phone"
            placeholder="请输入联系电话"
            class="w-208"
            @input="formState.phone = $filterInteger(formState.phone)"
          ></cal-input>
          <div class="text-gray-darkmin text-xs">用于接收短信通知</div>
        </a-form-item>
      </cal-tab-pane>
      <cal-tab-pane tab="客服配置" :key="2" showCount :maxlength="50">
        <a-form-item label="联系电话" name="customerPhone">
          <cal-input
            v-model:value="formState.customerPhone"
            placeholder="请输入联系电话"
            @input="formState.customerPhone = $filterInteger(formState.customerPhone)"
            class="w-208"
          ></cal-input>
          <div class="text-gray-darkmin text-xs">用于设置客服联系方式</div>
        </a-form-item>
        <a-form-item label="微信二维码" name="qrCode">
          <cal-image
            src="@/assets/img/setting/qr-code.png"
            class="w-100 h-100 rounded-xl"
            alt=""
            v-if="!formState.qrCode"
          />
          <img
            :src="formState.qrCode"
            class="w-100 h-100 rounded-xl"
            alt=""
            v-if="formState.qrCode"
          />
          <cal-button type="link" @click="selectPicture"> 选择图片 </cal-button>
          <div class="text-gray-darkmin text-xs">上传客服微信二维码</div>
        </a-form-item>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-64">
    <cal-button class="w-176 mx-24" size="large" @click="getContactWay()">取消</cal-button>
    <cal-button class="w-176 mx-24" size="large" type="primary" @click="submitForm"
      >保存</cal-button
    >
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { computed, onMounted, ref } from 'vue-demi'
  import { message } from 'ant-design-vue'
  import { CalImageSelect } from '@/components/Business/CalImageSelect'
  import { reqContactWay, reqSetContact } from '@/api/setting'
  const activeKey = ref(1)
  const formRef = ref()
  const formState = ref({
    // 短信接收
    phone: '',
    // 客服配置
    customerPhone: '',
    qrCode: ''
  })
  const { validate, rules } = useAntdForm(formRef, {
    phone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    customerPhone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    qrCode: [{ required: true, message: '请上传客服微信二维码', trigger: 'blur' }]
  })
  const selectPicture = async () => {
    const res = await CalImageSelect({ multiple: false })
    formState.value.qrCode = res[0].path.url
  }
  const submitForm = async () => {
    await validate()
    await reqSetContact({
      status: 1,
      value: {
        service: {
          phone: formState.value.phone
        },
        customer_ervice: {
          phone: formState.value.customerPhone,
          wx: formState.value.qrCode
        }
      }
    })
    message.success('操作成功！')
    getContactWay()
  }

  const getContactWay = async () => {
    const { data } = await reqContactWay()
    formState.value.phone = data.data.config.service.phone
    formState.value.customerPhone = data.data.config.customer_ervice.phone
    formState.value.qrCode = data.data.config.customer_ervice.wx
  }
  onMounted(() => {
    getContactWay()
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
