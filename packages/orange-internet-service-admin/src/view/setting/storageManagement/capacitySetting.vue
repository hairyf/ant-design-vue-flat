<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 11:30:28
 * @LastEditTime: 2021-07-14 17:23:32
 * @Description: 容量设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    class="bg-background pt-56 pb-44 w-804 mx-auto rounded-2xl shadow"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-item label="容量限制" name="limit">
      <cal-switch v-model:checked="formState.limit"> </cal-switch>
      <div class="login-tips"
        >开启后，店铺套餐、试用设置和店铺可设置基础存储容量，并且存储容量可单独出售 关闭后，<br />
        所有套餐和店铺存储容量限制将调整为无限制，请谨慎操作</div
      >
    </a-form-item>
    <template v-if="formState.limit">
      <!-- <a-form-item label="套餐名称" name="name">
        <cal-input v-model:value="formState.name" placeholder="请输入" class="w-208"></cal-input>
      </a-form-item> -->
      <a-form-item label="扩展套餐">
        <!-- <div class="flex items-center" v-for="(item, index) in formState.setMealList" :key="index">
          <cal-input
            v-model:value="item.gb"
            @input="item.gb = $filterPrice(item.gb)"
            placeholder="请输入"
            class="w-100"
          ></cal-input>
          <div style="color: #001426" class="ml-14 mr-24">G</div>
          <cal-input
            v-model:value="item.price"
            @input="item.price = $filterPrice(item.price)"
            placeholder="请输入"
            class="w-100"
          ></cal-input>
          <div style="color: #001426" class="ml-14">元</div>
          <i
            class="nr-delete text-primary text-lg ml-28"
            style="cursor: pointer"
            v-if="index != 0"
            @click="delMeal(index)"
          ></i>
        </div>
        <div class="flex items-center">
          <cal-button type="link" class="pl-0" @click="addSetMeal"> 添加 </cal-button>
          <div class="login-tips leading-8">最多添加3条</div>
        </div> -->
        <cal-card
          v-for="(item, index) in formState.setMealList"
          :key="index"
          class="w-477 mt-10"
          :class="index != 0 ? 'mt-24' : ''"
          style="border-radius: 10px !important"
        >
          <div class="pb-16 border-b text-base border-gray-300 mb-16">套餐</div>
          <div class="relative">
            <div class="absolute -top-8 right-10 cursor-pointer z-10" @click="delMeal(index)">
              <cal-button type="link" v-if="index != 0">删除套餐</cal-button>
            </div>
            <a-form-item
              :label-col="{ span: 5 }"
              label="套餐名称"
              :name="['setMealList', index, 'name']"
              :rules="{
                required: true,
                message: '请输入套餐名称',
                trigger: 'change'
              }"
            >
              <cal-input
                v-model:value="item.name"
                placeholder="请输入套餐名称"
                class="w-208"
              ></cal-input>
            </a-form-item>
            <a-form-item
              :label-col="{ span: 5 }"
              label="容量"
              :name="['setMealList', index, 'gb']"
              :rules="{
                required: true,
                message: '请输入容量大小',
                trigger: 'change'
              }"
            >
              <cal-input
                v-model:value="item.gb"
                @input="item.gb = $filterPrice(item.gb)"
                placeholder="请输入容量大小"
                class="w-208"
              ></cal-input>
              G
            </a-form-item>
            <a-form-item
              :label-col="{ span: 5 }"
              label="售卖价格"
              :name="['setMealList', index, 'price']"
              :rules="{
                required: true,
                message: '请输入售卖价格',
                trigger: 'change'
              }"
            >
              <cal-input
                v-model:value="item.price"
                @input="item.price = $filterPrice(item.price)"
                placeholder="请输入金额"
                class="w-208"
              ></cal-input>
              元
            </a-form-item>
          </div>
        </cal-card>
        <div class="mt-24" v-if="formState.setMealList.length < 3">
          <cal-button
            type="primary"
            class="w-144"
            @click="addSetMeal"
            :disabled="formState.setMealList.length < 3 ? false : true"
          >
            新增规格 {{ formState.setMealList.length }}/3
          </cal-button>
        </div>
      </a-form-item>
      <a-form-item label="购买方式" name="modeList">
        <a-checkbox-group v-model:value="formState.modeList">
          <cal-checkbox value="1"> 在线支付 </cal-checkbox>
          <!-- <cal-checkbox value="2"> 联系客服 </cal-checkbox> -->
        </a-checkbox-group>
      </a-form-item>
    </template>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-176 mx-24 h-48" type="primary" size="large" @click="submitForm">
      保存并生效
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import { message } from 'ant-design-vue'
  import { reqCapacitySettings, reqSetCapacity } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  const formRef = ref()
  const formState = ref({
    limit: false,
    name: '',
    modeList: [],
    setMealList: [
      {
        gb: '',
        price: '',
        name: ''
      }
    ]
  })
  // const setMealRule = async (rule: any, value: Array<any>) => {
  //   const adoptList = [] as any[]
  //   let adopt = false
  //   value.forEach((item) => {
  //     adoptList.push(item.gb != '' && item.price != '')
  //   })
  //   adopt = adoptList.some((item: any) => {
  //     return item == false
  //   })
  //   if (adopt) {
  //     return Promise.reject('请填写完整的套餐售价')
  //   }
  //   return Promise.resolve()
  // }
  const { rules, validate } = useAntdForm(formRef, {
    name: [{ required: true, message: '请填写套餐名称', trigger: 'blur' }],
    modeList: [
      { type: 'array', required: true, message: '请至少选择一种购买方式', trigger: 'blur' }
    ],
    limit: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }]
  })
  // 删除套餐售价
  const delMeal = (index: number) => {
    formState.value.setMealList.splice(index, 1)
  }
  // 新增套餐售价
  const addSetMeal = () => {
    if (formState.value.setMealList.length > 2) return false
    formState.value.setMealList.push({
      gb: '',
      price: '',
      name: ''
    })
  }
  // 设置容量
  const setCapacity = async () => {
    formState.value.setMealList.forEach((item: any, index: number) => {
      item.id = index + 1
    })
    const value = {
      size_limit: formState.value.limit ? 1 : 0,
      name: formState.value.name,
      selling_price: formState.value.setMealList,
      buy_type: formState.value.modeList
    }
    await reqSetCapacity({
      status: 1,
      value
    })
    message.success('操作成功！')
    getCapacitySetting()
  }
  // 提交表单
  const submitForm = async () => {
    await validate()
    setCapacity()
  }
  // 获取容量设置数据
  const getCapacitySetting = async () => {
    const { data } = await reqCapacitySettings()
    // console.log(data)
    formState.value.limit = data.data.config.size_limit == 1
    formState.value.name = data.data.config.name
    formState.value.modeList = data.data.config.buy_type
    formState.value.setMealList =
      data.data.config.selling_price.length == 0
        ? [
            {
              gb: '',
              price: '',
              name: ''
            }
          ]
        : data.data.config.selling_price
  }
  onMounted(() => getCapacitySetting())
</script>
<style lang="scss" scoped>
  .text-tips {
    color: #000;
  }
  .login-tips {
    line-height: 22px;
    font-size: 12px;
    color: #8c8c8c;
  }
  :deep(.ant-form-item) {
    margin-bottom: 20px;
  }
</style>
