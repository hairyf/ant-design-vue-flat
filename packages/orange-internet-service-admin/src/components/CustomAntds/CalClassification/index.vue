<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-07 16:17:33
 * @LastEditTime: 2021-06-09 10:37:20
 * @Description: 分类递归筛选
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-class__container">
    <div class="cal-class__item flex items-center mb-20">
      <div class="cal-class__label w-64 mr-10 text-center select-none">
        {{ option?.[fieldNames['label']] }}
      </div>
      <div class="cal-class__options">
        <cal-button
          type="primary"
          class="mx-12"
          v-for="(item, index) in option?.[fieldNames['children']]"
          :key="index"
          @click="onClickItem(item)"
          :class="[!item.state && 'text-gray-darkmin border-none bg-white-darkmin']"
        >
          {{ item[fieldNames['label']] }}
        </cal-button>
      </div>
    </div>
    <index
      v-if="currentChildren?.[fieldNames['children']]?.length"
      :nested-index="nestedIndex + 1"
      :option="currentChildren"
      :loadData="loadData"
      :fieldNames="fieldNames"
      @change="emit('change', $event)"
    />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, inject, ref } from 'vue-demi'
  import { defineEmit, provide } from 'vue'
  import type { Ref } from 'vue'
  import { cloneDeep } from 'lodash'
  /** 列表项配置 */
  interface Option {
    state?: boolean
    label?: string
    value?: Key
    children?: Option[]
    [key: string]: any
  }
  const emit = defineEmit(['change'])
  const props = defineProps({
    // 当前递归层级
    nestedIndex: {
      type: Number,
      default: 0
    },
    // 当前配置
    option: {
      type: Object as () => Option
    },
    // 列表别名
    fieldNames: {
      type: Object as () => { label: string; value: string; children: string },
      default: { label: 'label', value: 'value', children: 'children' }
    },
    // 加载数据方法
    loadData: {
      type: Object as () => (loadOption: { option: Option; nestedIndex: number }) => any
    }
  })
  /** 选中列表 */
  const selectList = inject<Ref<Key[]>>('selectList') || ref<Key[]>([])
  if (props.nestedIndex === 0) provide('selectList', selectList)
  /** 点击当前项 */
  const onClickItem = async (optionItem: Option) => {
    // 单选逻辑
    const currentState = !optionItem.state
    props.option?.children?.forEach((v) => delete v.state)
    optionItem.state = currentState
    // 每次选择, 将子项选择重置
    selectList.value = selectList.value.slice(0, props.nestedIndex)
    if (!currentState) {
      currentChildren.value = undefined
      delete selectList.value[props.nestedIndex]
    } else {
      const data = await props.loadData?.({ option: optionItem, nestedIndex: props.nestedIndex })
      const option: Option = data || cloneDeep(optionItem)
      selectList.value[props.nestedIndex] = option[props.fieldNames['value']]
      currentChildren.value = option
    }
    emit('change', selectList.value)
  }
  /** 当前子元素 */
  const currentChildren = ref<Option>()
</script>
<style lang="scss" scoped></style>
