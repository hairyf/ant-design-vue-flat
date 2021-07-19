<!--
 * @Author: Zhilong
 * @Date: 2021-05-25 18:04:11
 * @LastEditTime: 2021-07-19 16:12:49
 * @Description: 表格
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="table-container">
    <div
      class="table-view flex py-24 overflow-auto"
      v-for="(item, index) in fictitiousList"
      :style="{ marginBottom: analyUnit(marginBottom) }"
      :key="item.CACHE_ID_TABLE"
      @click="emit('itemClick', item)"
    >
      <div class="w-4" />
      <div class="px-20 flex items-center" v-if="select">
        <cal-checkbox @change="onCheckboxChange(item, $event)" />
      </div>
      <div class="flex flex-1" :style="{ minWidth: minWidth }">
        <table-provide :item="item.CACHE_OLD_ITEM_TABLE" :index="index">
          <slot />
        </table-provide>
      </div>
    </div>
    <cal-empty class="mt-160" v-if="!fictitiousList.length" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTable' })
</script>
<script lang="ts" setup>
  import { defineEmits, defineProps, provide, watch, ref } from 'vue'
  import TableProvide from './TableProvide.vue'
  import { nanoid } from 'nanoid'
  import { orderBy } from 'lodash'
  import { analyUnit } from '@tuimao/utils'
  import { useTheme } from '../../../utils/theme'
  const emit = defineEmits(['checkboxChange', 'itemClick'])
  const selectList: Record<string, any> = {}
  const onCheckboxChange = (item: typeof fictitiousList.value[0], { target: { checked } }: any) => {
    item.CACHE_SELECT_TABLE = checked
    if (checked) {
      selectList[item?.CACHE_ID_TABLE] = item.CACHE_OLD_ITEM_TABLE
    } else {
      delete selectList[item?.CACHE_ID_TABLE]
    }
    emit('checkboxChange', Object.values(selectList))
  }

  const props = defineProps({
    /** 块边距 */
    marginBottom: {
      type: [Number, String],
      default: 10
    },
    /** 最大宽度 */
    minWidth: {
      type: [String, Number],
      default: 'none'
    },
    /** 数据列表 */
    list: {
      type: Array as () => any[],
      default: [{}]
    },
    /** 文本对齐方式 */
    textAlign: {
      type: String as () => 'left' | 'center',
      default: 'left'
    },
    /** 内容对齐方式 */
    contentAlign: {
      type: String as () => 'left' | 'center',
      default: 'left'
    },
    /** 开启勾选选择 */
    select: {
      type: Boolean,
      default: false
    },
    /** 行内间距 */
    space: {
      type: [Number, String],
      default: 24
    },
    /** 自动计算间距 */
    syncSpace: Boolean
  })
  // 获取数据更新后的值
  const updateList = () => {
    return props.list.map((item: { CACHE_ID_TABLE?: string; select?: boolean }) => {
      return {
        ...item,
        CACHE_ID_TABLE: item.CACHE_ID_TABLE ? item.CACHE_ID_TABLE : nanoid(5),
        CACHE_SELECT_TABLE: !!item.select,
        CACHE_OLD_ITEM_TABLE: item
      }
    })
  }
  // 获取数据排序后的值
  const listOrder = () => {
    if (controller.value.order.sort !== 0) {
      return orderBy(
        fictitiousList.value,
        [controller.value.order.index],
        [controller.value.order.sort === 1 ? 'asc' : 'desc']
      )
    }
    return fictitiousShowList.value
  }
  // 虚拟数据列表(原数据缓存)
  const fictitiousList = ref(updateList())
  // 虚拟数据列表(显示的数据)
  const fictitiousShowList = ref(updateList())
  // 控制器
  const controller = ref({ order: { index: '', sort: 0 }, renderList: false })
  // 原数据修改
  watch(
    () => props.list,
    () => {
      fictitiousShowList.value = fictitiousList.value = updateList()
      fictitiousList.value = listOrder()
    },
    {
      deep: true
    }
  )
  // 排序修改
  watch(
    () => controller.value.order.sort,
    () => (fictitiousList.value = listOrder())
  )
  // 下发控制器
  provide('controller', controller)
  //下发配置
  provide('option', props)

  // 使用主题色
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .table-container {
    .table-view {
      background: var(--common-base-color);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 10px;
      position: relative;
      &::after {
        content: '';
        height: calc(100% - 48px);
        transform: matrix(-1, 0, 0, 1, 0, 0);
        background: var(--common-primary-color);
        @apply top-0 left-0 bottom-0 w-4 rounded-full m-auto absolute;
      }
    }
  }
</style>
