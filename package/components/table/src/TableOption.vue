<!--
 * @Author: Zhilong
 * @Date: 2021-05-26 10:05:03
 * @LastEditTime: 2021-08-11 17:05:19
 * @Description: 表格配置
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    v-if="type !== 'list'"
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
      class="w-full text-gray-450 cursor-pointer select-none mb-24"
      :class="[option.textAlign === 'left' ? 'text-left' : 'text-center']"
    >
      <span v-if="!sort">{{ title }}</span>
      <CalTagSortArrow v-else type="sortArrow" :size="13" v-model="sortState">
        <span>
          {{ title }}
        </span>
      </CalTagSortArrow>
    </div>
    <div
      class="flex flex-1 flex-col w-full justify-center list-border"
      ::class='[option.contentAlign === "left" ? "":"items-center"]'
    >
      <template v-if="listObject">
        <div class="item-border" v-for="(item, i) in listObject" :key="i.toString()">
          <slot
            v-if="slots['default']"
            :content="item[props.index || props.title || '']"
            :item="item"
            :index="i"
            :list="listObject"
          />
          <template v-else>
            {{ item[props.index || props.title || ''] }}
          </template>
        </div>
      </template>
      <slot
        v-else-if="slots['default']"
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
  <div
    v-else-if="slots['default']"
    class="flex border-style-release"
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
    <slot :content="showContent" :item="item" :index="index" :list="option.list" />
  </div>
  <template v-else>
    {{ showContent }}
  </template>
</template>
<script lang="ts">
  import { defineComponent, useCssVars } from 'vue'
  export default defineComponent({ name: 'CalTableOption' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { get } from 'lodash-es'
  import { computed, defineProps, inject, useSlots, provide } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import CalIcon from '../../icon/src/Icon.vue'
  import CalTagSortArrow from '../../_special/src/TagSortArrow.vue'
  const slots = useSlots()
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
    borderRight: Boolean,
    /** 类型 */
    type: {
      type: String as () => 'data' | 'list',
      default: 'data'
    }
  })

  // 列表数据
  const { item, index } = inject<any>('itemObject')
  // 小列表数据
  const listObject = inject<any>('listObject')
  // 配置
  const option = inject<any>('option')
  // 控制器配置
  const controller = inject<any>('controller')
  // 显示内容
  const showContent = computed(() => get(item, props.index || props.title || ''))
  // 类型list继续向下 增加内容
  if (props.type === 'list') provide('listObject', showContent.value)
  /* 是否是当前索引值 */
  const isCurrentIndex = () => {
    const isIndex = controller?.value?.order?.index === props.index
    const isTitle = controller?.value?.order?.index === props.title
    return isIndex || isTitle
  }
  const sortState = computed<0>({
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
  useTheme('Table')
  useCssVars(() => ({ 'table-within-space': analyUnit(option.space) }))
</script>
<style lang="scss" scoped>
  .table-option-container {
    padding: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .border-style-release {
    > *:first-child {
      --border-width: calc(100% + var(--table-within-space));
      --border-left: 0;
    }
    > *:not(:first-child) {
      &:not(:last-child) {
        --border-width: calc(100% + var(--table-within-space) * 2);
        --border-left: calc(var(--table-within-space) * -1);
      }
    }
    > *:last-child {
      --border-width: calc(100% + var(--table-within-space));
      --border-left: calc(var(--table-within-space) * -1);
    }
  }
  .list-border {
    .item-border {
      padding: 24px 0;
    }
    .item-border:not(:last-child) {
      position: relative;
      padding: 0 0 24px 0;
    }
    .item-border:not(:first-child) {
      position: relative;
      padding: 24px 0;
      &::after {
        content: '';
        position: absolute;
        top: -0.5px;
        width: var(--border-width);
        left: var(--border-left);
        height: 1px;
        background-color: var(--table-border-color);
      }
    }
  }
</style>
