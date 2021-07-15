<!--
 * @Author: Zhilong
 * @Date: 2021-05-26 10:05:03
 * @LastEditTime: 2021-07-15 09:40:43
 * @Description: 表格配置
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="table-option-container"
    :style="{
      maxWidth: option?.syncSpace
        ? `calc(${analyUnit(maxWidth || '')} + (${analyUnit(option.space)} * 2))`
        : analyUnit(maxWidth || ''),
      minWidth: option?.syncSpace
        ? `calc(${analyUnit(minWidth || '')} + (${analyUnit(option.space)} * 2))`
        : analyUnit(minWidth || ''),
      flex: 1,
      paddingLeft: analyUnit(option.space),
      paddingRight: analyUnit(option.space),
      borderLeft: props.borderLeft ? 'solid 1px #F5F5F5' : 'none',
      borderRight: props.borderRight ? 'solid 1px #F5F5F5' : 'none'
    }"
  >
    <div
      class="w-full text-grey-darkmin cursor-pointer select-none mb-20"
      :class="[option.textAlign === 'left' ? 'text-left' : 'text-center']"
    >
      <span v-if="!sort">{{ title }}</span>
      <cal-theme-icon v-else type="sortArrow" v-model="sortState">
        <span>
          {{ title }}
        </span>
      </cal-theme-icon>
    </div>
    <div
      class="flex flex-1 flex-col w-full justify-center"
      ::class='[option.contentAlign === "left" ? "":"items-center"]'
    >
      <slot
        v-if="slots['default']"
        :content="showContent"
        :item="item"
        :index="index"
        :list="option.list"
      />
      <template v-else>
        {{ showContent }}
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { get } from 'lodash'
  import { computed, defineProps, inject, useContext } from 'vue-demi'
  const { slots } = useContext()
  const props = defineProps({
    /** 最小宽度 */
    minWidth: {
      type: [String, Number],
      default: 80
    },
    /** 最大宽度 */
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    /** 表头文字 */
    title: String,
    /** 是否开启 排序 */
    sort: Boolean,
    /** 数据索引值 不填默认使用title的值 */
    index: String,
    /** 开启左侧边框 */
    borderLeft: Boolean,
    /** 开启右侧边框 */
    borderRight: Boolean
  })

  const { item, index } = inject<any>('itemObject')
  const showContent = computed(() => get(item, props.index || props.title || ''))
  const option = inject<any>('option')
  const controller = inject<any>('controller')
  /* 是否是当前索引值 */
  const isCurrentIndex = () => {
    const isIndex = controller?.value?.order?.index === props.index
    const isTitle = controller?.value?.order?.index === props.title
    return isIndex || isTitle
  }
  const sortState = computed({
    get() {
      return isCurrentIndex() ? controller.value.order.sort : 0
    },
    set(sort) {
      if (isCurrentIndex()) {
        controller.value.order.sort = sort
      } else {
        controller.value.order.index = props.index || props.title
        controller.value.order.sort = 1
      }
    }
  })
</script>
<style lang="scss" scoped>
  .table-option-container {
    padding: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
