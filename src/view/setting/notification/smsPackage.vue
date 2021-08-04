<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-15 10:20:55
 * @LastEditTime: 2021-07-08 09:40:59
 * @Description: 短信套餐
 * @LastEditors: Mr.wang
-->
<template>
  <cal-card class="w-804 mx-auto">
    <div style="width: fit-content" class="mx-auto mt-36">
      <a-form ref="smsPackageRef" :model="formState" :rules="rules">
        <a-form-item name="set_meal" class="specifications">
          <cal-card
            v-for="(item, index) in formState.set_meal"
            :key="index"
            class="mb-24 w-477"
            style="border-radius: 10px !important"
          >
            <div style="width: fit-content" class="mx-auto relative">
              <div class="absolute -top-8 -right-72">
                <cal-button type="link" @click="deleteSaleSpec(index)" v-if="index != 0"
                  >删除套餐</cal-button
                >
              </div>
              <a-form-item
                label="套餐名称"
                :name="['set_meal', index, 'title']"
                :rules="{
                  required: true,
                  message: '请输入套餐名称',
                  trigger: 'change'
                }"
              >
                <cal-input
                  v-model:value="item.title"
                  placeholder="请输入套餐名称"
                  class="w-208"
                ></cal-input>
              </a-form-item>
              <a-form-item
                label="售卖短信条数"
                :name="['set_meal', index, 'num']"
                :rules="{
                  required: true,
                  message: '请输入售卖短信条数',
                  trigger: 'change'
                }"
              >
                <cal-input
                  v-model:value="item.num"
                  @input="item.num = $filterInteger(item.num)"
                  placeholder="请输入售卖短信条数"
                  class="w-208"
                ></cal-input>
                条
              </a-form-item>
              <a-form-item
                label="售卖金额"
                :name="['set_meal', index, 'money']"
                :rules="{
                  required: true,
                  message: '请输入售卖金额',
                  trigger: 'change'
                }"
              >
                <cal-input
                  v-model:value="item.money"
                  @input="item.money = $filterPrice(item.money)"
                  placeholder="请输入售卖金额"
                  class="w-208"
                ></cal-input>
                元
              </a-form-item>
            </div>
          </cal-card>
          <div>
            <cal-button
              v-if="formState.set_meal.length < 3"
              type="primary"
              class="w-144"
              @click="addSaleSpec"
              :disabled="formState.set_meal.length < 3 ? false : true"
            >
              新增规格 {{ formState.set_meal.length }}/3
            </cal-button>
          </div>
        </a-form-item>
        <a-form-item label="购买方式" name="buy_type">
          <a-checkbox-group v-model:value="formState.buy_type">
            <cal-checkbox value="1">在线支付</cal-checkbox>
            <!-- <cal-checkbox value="2">联系客服</cal-checkbox> -->
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </div>
  </cal-card>
  <div class="flex justify-center" style="margin-top: 60px">
    <cal-button style="width: 186px" type="primary" size="large" @click="submitForm">
      保 存
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import { reqConfigGetSmsSetMeal, reqConfigSetSmsSetMeal } from '@/api/setting'
  import { message } from 'ant-design-vue'
  const formState = ref({
    buy_type: [],
    set_meal: [
      {
        id: String || Number,
        title: '',
        num: '',
        money: ''
      }
    ] as any[]
  })

  const smsPackageRef = ref()
  const { rules, validate } = useAntdForm(smsPackageRef, {
    buy_type: [{ required: true, message: '请选择购买方式', trigger: 'blur', type: 'array' }]
  })

  // 获取套餐配置
  reqConfigGetSmsSetMeal().then((res) => {
    console.log('获取的配置', res)
    formState.value = res.data.data.config
  })

  // 删除套餐规格
  const deleteSaleSpec = async (itemIndex: number) => {
    await CalMessageDialog.warning({
      title: '删除模板套餐',
      content: '您确定要删除该模板套餐么？'
    })
    formState.value.set_meal.splice(itemIndex, 1)
  }
  // 添加套餐规格
  const addSaleSpec = () => {
    formState.value.set_meal.push({
      id: formState.value.set_meal.length + 1,
      title: '',
      num: '',
      money: ''
    })
  }

  // 提交表单
  const submitForm = async () => {
    console.log('提交表单', formState.value)
    await validate()
    console.log('成功了')
    const obj = { value: formState.value }
    await reqConfigSetSmsSetMeal(obj)
    message.success('保存成功')
  }
</script>
<style lang="scss" scoped>
  .specifications {
    :deep(.ant-form-item-label) {
      width: 100px;
    }
    :deep(.ant-form-item-label > label) {
      text-align: right;
    }
  }
</style>
