<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 10:02:59
 * @LastEditTime: 2021-06-21 17:22:51
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-cascader
    v-model:value="value"
    :options="options"
    :load-data="onLoadData"
    change-on-select
    v-bind="props"
    placeholder="请选择地址"
    :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
  />
</template>
<script lang="ts" setup>
  import { reqCityList } from '@/api/common'
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineProps, ref } from 'vue-demi'
  const props = defineProps({
    modelValue: Array
  })
  const value = useModelRef(props, 'modelValue')
  // 列表项配置
  interface Option {
    code_id: number
    id: number
    letter: string
    level: number
    location: string
    name: string
    parent_id: number
    sort: string
    isLeaf?: boolean
    loading?: boolean
    children?: Option[]
  }
  // 城市列表数据
  const options = ref<Option[]>([])

  // 设置展开列表
  const setLeafList = (list: Option[]) => {
    return list.map((v) => {
      v.isLeaf = false
      return v
    })
  }
  reqCityList({ level: 1 }).then(({ data }) => {
    options.value = setLeafList(data.data)
  })
  // 请求子项数据
  const onLoadData = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const { data } = await reqCityList({
      parent_id: targetOption.id,
      level: targetOption.level + 1
    })
    targetOption.loading = false
    targetOption.children = targetOption.level == 2 ? data.data : setLeafList(data.data)
    options.value = [...options.value]
  }
</script>
<style lang="scss" scoped></style>
