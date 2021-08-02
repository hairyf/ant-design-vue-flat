<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-30 16:39:28
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-upload></cal-upload>
  <cal-input-range-picker></cal-input-range-picker>
  <cal-steps :current="current" labelPlacement="vertical">
    <cal-step title="会员等级信息" description="2021-5-28 19:20:54" />
    <cal-step title="会员权益" />
  </cal-steps>
  <div @click="current++"> 点击我 </div>
  <div @click="current--"> 取消我 </div>
  <cal-tag> 45123 </cal-tag>
  <cal-tag> 45123 </cal-tag>
  <cal-input-time-picker
    format="HH:mm"
    v-model="formState.businessHours"
    start-placeholder="营业开始时间"
    end-placeholder="营业结束时间"
    clearable
  >
  </cal-input-time-picker>
</template>
<script lang="ts" setup>
  const formState = ref({
    businessHours: []
  })
  const form = ref({
    norms_type: 0
  })
  const treeValue = ref<any[]>([])
  const list = ref([
    {
      children: [
        { children: [] },
        { children: [{}, {}, {}] },
        { children: [] },
        { children: [] },
        {},
        {}
      ]
    },
    { children: [] },
    { children: [] },
    { children: [] },
    { children: [{}, {}, {}] },
    { children: [] },
    { children: [] },
    { children: [{}, {}, {}] }
  ])
  const option = ref([
    {
      name: '一级分类选择-1',
      value: '1',
      children: [
        { name: '二级分类选择-1-1', value: '1-1' },
        { name: '二级分类选择-1-2', value: '1-2' }
      ]
    },
    {
      name: '一级分类选择-2',
      value: '2',
      children: [
        { name: '二级分类选择-2-1', value: '2-1' },
        { name: '二级分类选择-2-2', value: '2-2' }
      ]
    }
  ])
  const num = ref(0)
  watch(num, () => console.log(num.value))
  const treeData = ref([
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0'
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
          disabled: true
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1'
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2'
        }
      ]
    }
  ])
  const select = ref([])
  import { ref, watch, watchEffect } from 'vue'
  import { CalModel } from '~/components'
  const menuvalue = ref('')
  const value = ref('二级')
  const time = ref([])
  const props = defineProps({})
  const show = ref(true)
  const current = ref(-1)
  // CalModel({ title: 'adnioasd', content: 'wdnwaodnoiwa' })
  const onSearch = () => {
    console.log(61223)
  }

  const tableData = ref([
    {
      a: [
        { c: 'c', d: 'd' },
        { c: 'c1', d: 'd1' }
      ],
      b: 2
    },
    { a: [{ c: 'c', d: 'd' }], b: '起来了' }
  ])

  const selectAll = ref(false)

  const groupValue = ref([])
  const orderGhlOpts = ref({
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    color: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16'],
    xAxis: {
      boundaryGap: false,
      data: ['2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日']
    },
    // yAxis: {
    //   type: 'value'
    // },
    legend: {
      data: ['已成交', '待发货', '待收货'],
      left: 'left',
      padding: [12, 0]
    },
    series: [
      { name: '已成交', data: [120, 132, 101, 134, 90, 230, 210], type: 'line', showSymbol: false },
      {
        name: '待发货',
        data: [150, 232, 201, 154, 190, 330, 410],
        type: 'line',
        showSymbol: false
      },
      { name: '待收货', data: [320, 332, 301, 334, 390, 330, 320], type: 'line', showSymbol: false }
    ]
  })
</script>

<style lang="scss" scoped></style>
