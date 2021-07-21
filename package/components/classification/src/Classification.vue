<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-21 11:14:29
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <div class="cal-class__container">
    <div class="cal-class__item flex items-center">
      <div class="cal-class__label w-64 mr-10 text-center select-none">
        {{ label || options?.[fieldNames['label']] }}
      </div>
      <div class="cal-class__options">
        <div
          class="
            mx-12
            px-24
            py-6
            rounded-3xl
            inline-block
            cursor-pointer
            transition-colors
            duration-300
          "
          v-for="(item, index) in options?.[fieldNames['children']]"
          :key="index"
          @click="onClickItem(item)"
          :class="[
            selects[nestedIndex] === item?.[fieldNames['value']]
              ? 'text-classification-selected-text-color bg-classification-selected-body-color'
              : 'bg-classification-not-selected-body-color text-classification-not-selected-text-color'
          ]"
        >
          {{ item[fieldNames['label']] }}
        </div>
      </div>
    </div>
    <cal-classification
      v-if="current?.[fieldNames['children']]?.length"
      :nested-index="nestedIndex + 1"
      :option="current"
      :loadData="loadData"
      :fieldNames="fieldNames"
      @change="emit('change', $event)"
    />
  </div>
</template>
<script lang="ts">
  /**
   * 分类选择
   * @template
   * <cal-classification label="一级分类" :option="[{label: '一级分类选择-1', value: '1'}, {label: '一级分类选择-2', value: '2'}]" />
   */
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalClassification' })
</script>
<script lang="ts" setup>
  import { defineProps, inject, ref } from 'vue'
  import { defineEmits, provide } from 'vue'
  import { cloneDeep } from 'lodash'
  import CalButton from '../../button/src/Button.vue'
  import type { Ref } from 'vue'
  import { useVModel } from '@vueuse/core'
  /** 列表项配置 */
  interface Option {
    select?: boolean
    label?: string
    value?: Key
    children?: Option[]
    [key: string]: any
  }
  const emit = defineEmits(['change'])
  const props = defineProps({
    // 当前递归层级
    nestedIndex: {
      type: Number,
      default: 0
    },
    // 手动标签名称
    label: String,
    // 当前配置
    option: {
      type: Object as () => Option | Option[]
    },
    // 列表别名
    fieldNames: {
      type: Object as () => { label: string; value: string; children: string },
      default: { label: 'label', value: 'value', children: 'children' }
    },
    // 加载数据方法
    loadData: {
      type: Object as () => (loadOption: {
        option: Option
        nestedIndex: number
      }) => Option | Promise<Option>,
      default: () => {
        return ({ option }: any) => ({ ...option, label: '子分类' })
      }
    },
    modelValue: {
      type: Array as () => Key[],
      default: []
    }
  })
  const options = computed(() => {
    if (Array.isArray(props.option)) {
      return { [props.fieldNames['children']]: props.option } as Option
    }
    return props.option as Option
  })
  /** 选中列表 */
  const selects = inject<Ref<Key[]>>('selects') || useVModel(props, 'modelValue')
  if (props.nestedIndex === 0) provide('selects', selects)
  /** 点击当前项 */
  const onClickItem = async (optionItem: Option) => {
    // 当前选择状态
    const select = selects.value[props.nestedIndex] === optionItem[props.fieldNames['value']]
    // 清空选择逻辑
    options.value?.[props.fieldNames['children']]?.forEach((v: any) => delete v.select)
    // 每次选择, 将子项选择重置
    if (select) {
      current.value = undefined
      selects.value = selects.value.slice(0, props.nestedIndex - 1)
    } else {
      const data = await props.loadData?.({ option: optionItem, nestedIndex: props.nestedIndex })
      current.value = data || cloneDeep(optionItem)
      const value = selects.value.slice(0, props.nestedIndex)
      value.push(optionItem[props.fieldNames['value']])
      selects.value = value
    }
    emit('change', selects.value)
  }
  /** 当前子元素 */
  const current = ref<Option>()
</script>
<style lang="scss" scoped>
  .item-select-none {
    color: rgba(160, 174, 192) !important;
    border-color: var(--common-primary-color-opacity-8) !important;
    background-color: var(--common-primary-color-opacity-8) !important;
  }
  .cal-class__item + .cal-class__container {
    margin-top: 20px;
  }
</style>
