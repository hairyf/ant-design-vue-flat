<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-06-01 16:44:57
 * @Description: 编辑服务商通知
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="w-804 mx-auto">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-form-item label="短信签名" name="name">
        <cal-input-select
          placeholder="请选择短信签名"
          v-model="formState.name"
          class="w-208"
          allowClear
        >
          <a-select-option value="1">桔子互联</a-select-option>
          <a-select-option value="2">阿里巴巴</a-select-option>
          <a-select-option value="3">腾讯</a-select-option>
        </cal-input-select>
        <div class="text-xs">
          短信签名必须通过审核才能生效，如您还没有合适的短信签名，去
          <cal-button type="link" class="text-xs px-0">腾讯云</cal-button> 申请一个
        </div>
      </a-form-item>
      <a-form-item label="模板ID" name="name">
        <cal-input
          v-model="formState.name"
          placeholder="请输入短信模板ID"
          class="w-208"
          allowClear
        ></cal-input>
        <div class="leading-loose text-xs">
          如您未申请短信模板ID，请先前往
          <cal-button class="px-0 text-xs" type="link">腾讯云</cal-button> 进行申请 <br />
          目录
          <span class="text-red">【腾讯云短信服务控制台】 >【 国内消息】 > 【正文模板管理】</span>
        </div>
      </a-form-item>
      <a-form-item label="模板名称" name="name">
        <cal-input
          v-model="formState.name"
          placeholder="请输入"
          class="w-208"
          allowClear
        ></cal-input>
      </a-form-item>
      <a-form-item label="模板变量" name="name">
        <cal-button class="mr-14 text-xs h-28">商户名</cal-button>
        <cal-button class="mr-14 text-xs h-28">店铺名</cal-button>
        <cal-button class="mr-14 text-xs h-28">到期时间</cal-button>
      </a-form-item>
      <a-form-item label="模板内容" name="name">
        <cal-textarea
          v-model="formState.name"
          placeholder="商户{商户名}已成功开店，店铺名称{店铺名}，店铺套餐到期时间{到期时间}"
          :rows="5"
        ></cal-textarea>
      </a-form-item>
      <a-form-item label="接收人">
        <cal-button class="mr-28 text-xs h-28">重新选择</cal-button>
        <span>共选择6人</span>
        <cal-button type="link" class="pl-10">查看详情</cal-button>
      </a-form-item>
      <a-form-item label="测试接收" name="name">
        <cal-input
          v-model="formState.name"
          placeholder="请输入"
          class="w-208"
          allowClear
        ></cal-input>
        <cal-button type="link">测试</cal-button>
      </a-form-item>
    </a-form>
  </cal-card>
  <div class="flex justify-center mt-64">
    <cal-button class="w-176 mx-24" size="large" type="primary">保存并生效</cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  import { reqAddonsRead, reqAddonsEdit } from '@/api/application'
  const route = useRoute()
  const formState = ref({
    name: '',
    calssId: '',
    is_icon: 0,
    duration: 0,
    remark: '',
    is_sale: 1,
    buy_type: 1,
    sale_spec: [
      {
        price: '100', //金额：单位 元
        type: '1', //类型:1按天 2按月 3 按年 4永久
        nums: '80' //时间值（数字）
      }
    ] as any[]
  })
  // 验证规则
  const rules = {
    name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    // calssId: [{ required: true, message: '请选择应用分类', trigger: 'blur' }],
    is_icon: [{ required: true, message: '请选择应用图标', trigger: 'blur', type: 'number' }],
    buy_type: [{ required: true, message: '请选择购买方式', trigger: 'blur', type: 'number' }],
    sale_spec: [{ required: true, message: '请填写售卖规格', trigger: 'blur', type: 'array' }]
  }
  const activeKey = ref(1)

  reqAddonsRead({ id: route.query.id }).then((res) => {
    console.log('数据详情', res)
    formState.value = res.data.data
  })

  // 删除套餐规格
  const deleteSaleSpec = (itemIndex: number) => {
    formState.value.sale_spec.splice(itemIndex, 1)
  }
  // 添加套餐规格
  const addSaleSpec = () => {
    formState.value.sale_spec.push({
      price: '',
      type: '4',
      nums: ''
    })
  }

  const formRef = ref()
  // 提交表单
  const submitForm = () => {
    console.log('提交表单', formState.value)
    formRef.value
      .validate()
      .then(() => {
        console.log('成功了!!!')
      })
      .catch((error: any) => {
        console.log('失败了~', error)
      })
  }
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
