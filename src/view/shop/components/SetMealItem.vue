<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-31 14:24:21
 * @LastEditTime: 2021-06-09 11:48:25
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-row
    class="px-24 py-12 theme-left-after relative shadow rounded-xl bg-set-meal bg-center bg-cover"
    :gutter="[10, 10]"
  >
    <a-col :span="24">
      <span class="mr-10 text-base">{{ item?.name }}</span>
      <a-tag class="rounded-full px-14" color="#F77C55" v-if="item.is_tryout == 1">试用套餐</a-tag>
    </a-col>
    <a-col class="text-xs" :span="15"> 售卖价格 &nbsp; {{ specInfo.price || '暂无' }} </a-col>
    <a-col class="text-xs" :span="9">
      员工数量 &nbsp; {{ item.limit_assistant || '不限制' }}
    </a-col>
    <a-col class="text-xs" :span="15"> 使用时限 &nbsp; {{ specInfo.nums || '暂无' }} </a-col>
    <a-col class="text-xs" :span="9"> 商品数量 &nbsp; {{ item.limit_goods || '不限制' }} </a-col>
    <a-col class="text-xs" :span="15">
      存储容量 &nbsp; {{ item.limit_capacity || '不限制' }}
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue-demi'
  import { Row as ARow } from 'ant-design-vue'
  import { Col as ACol } from 'ant-design-vue'
  import { Tag as ATag } from 'ant-design-vue'
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  const specInfo = computed(() => {
    const sale_spec = props.item.sale_spec as Record<string, any>[]
    const specAssign = sale_spec.reduce(
      (previous, current) => {
        const strategy: Record<string, string> = {
          1: `${current['nums']}日`,
          2: `${current['nums']}月`,
          3: `${current['nums']}年`,
          4: '永久有效'
        }
        previous['price'].push(`￥${current['price']}`)
        previous['nums'].push(strategy[current['type']])
        return previous
      },
      { price: [], nums: [] } as Record<string, string[]>
    )
    specAssign.price = specAssign.price.join('/')
    specAssign.nums = specAssign.nums.join('/')
    return specAssign as { price: string; nums: string }
  })
</script>
<style lang="scss" scoped></style>
