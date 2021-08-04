<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-15 16:20:18
 * @LastEditTime: 2021-06-28 14:49:39
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card
    class="mb-24"
    style="width: 465px; border-radius: 10px !important"
    v-for="(item, i) in saleSpec"
    :key="i"
  >
    <div>
      <div class="flex justify-between mb-20">
        <div class="text-base">套餐{{ toChineseStrategy[i + 1] }}</div>
        <div @click="saleSpec.splice(i, 1)" class="cursor-pointer text-primary"> 删除套餐 </div>
      </div>
      <hr class="mb-20" />
      <!-- <a-form-item class="mb-8" required label="使用期限" :labelCol="{ span: 5 }">
        <cal-radio-group v-model="item.type">
          <cal-radio :value="4">永久</cal-radio>
          <cal-radio :value="3">年</cal-radio>
          <cal-radio :value="2">月</cal-radio>
          <cal-radio :value="1">日</cal-radio>
        </cal-radio-group>
        <a-form-item
          v-if="item.type !== 4"
          :name="['spec', i, 'nums']"
          :rules="{
            required: true,
            message: '期限为必填项',
            type: 'number'
          }"
        >
          <cal-input-number class="w-100" placeholder="请输入" v-model="item.nums" />
          <span>{{ timeNodeTran[item.type] }}</span>
        </a-form-item>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 5 }"
        class="mb-8"
        required
        label="售卖金额"
        :name="['spec', i, 'price']"
        :rules="{
          required: true,
          message: '金额为必填项',
          type: 'any'
        }"
      >
        <cal-input-number placeholder="请输入金额" class="w-208" v-model="item.price" />
        <span>元</span>
      </a-form-item> -->
      <div class="flex">
        <a-form-item
          :labelCol="{ span: 11 }"
          class="mb-8"
          required
          label="维护续费价格"
          :name="['spec', i, 'price']"
          :rules="{
            required: true,
            message: '金额为必填项',
            type: 'any'
          }"
        >
          <cal-input-number
            :precision="2"
            placeholder="请输入金额"
            class="w-100"
            v-model="item.price"
          />
          <span>元</span>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 11 }"
          class="mb-8"
          required
          label=""
          :name="['spec', i, 'nums']"
          :rules="{
            required: true,
            message: '请输入时限',
            type: 'any'
          }"
        >
          <cal-input-number
            :precision="2"
            placeholder="请输入金额"
            class="w-100"
            v-model="item.nums"
          />
          <span>年</span>
        </a-form-item>
      </div>
    </div>
  </cal-card>
  <cal-button type="primary" size="samll" @click="addSaleSetMeal" :disabled="saleSpec.length > 2">
    新增规格 {{ saleSpec.length }}/3
  </cal-button>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  /* 永久-年-月-日的转换 */
  enum timeNodeTrans {
    '日' = 1,
    '月',
    '年',
    '永久'
  }
  const timeNodeTran = timeNodeTrans
  const toChineseStrategy = ['零', '一', '二', '三', '四', '五']
  const props = defineProps({
    saleSpec: {
      type: Array as () => any[],
      required: true
    }
  })
  /* 处理新增删除套餐规格 */
  const addSaleSetMeal = () => {
    const { length } = props.saleSpec
    if (length > 2) return
    props.saleSpec.push({
      // *使用期限
      // type: 4,
      // 自定义时间
      nums: '',
      // *售卖金额
      price: ''
    })
  }
</script>
