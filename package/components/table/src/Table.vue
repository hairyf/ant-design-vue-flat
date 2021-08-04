<!--
 * @Author: Zhilong
 * @Date: 2021-05-25 18:04:11
 * @LastEditTime: 2021-08-04 18:26:15
 * @Description: 表格
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="table-container">
    <template v-for="(item, index) in fictitiousList" :key="item.CACHE_ID_TABLE">
      <div
        class="table-view"
        :style="{ marginBottom: analyUnit(marginBottom) }"
        @click="emit('itemClick', item)"
      >
        <!-- 头部内容 -->
        <div class="py-24 mx-24 border-b flex" style="border-color: #f5f5f5" v-if="slots['header']">
          <div class="px-20 flex items-center" v-if="select && selectPosition === 'top'">
            <cal-checkbox
              @change="onCheckboxChange(item, $event)"
              v-model:checked="item.CACHE_SELECT_TABLE"
            />
          </div>
          <!-- 头内容 -->
          <div class="flex-1">
            <slot name="header" :item="item" :index="index" />
          </div>
        </div>
        <div class="flex py-24 overflow-auto">
          <div class="w-4" />
          <div class="px-20 flex items-center" v-if="select && selectPosition === 'center'">
            <cal-checkbox
              @change="onCheckboxChange(item, $event)"
              v-model:checked="item.CACHE_SELECT_TABLE"
            />
          </div>
          <div class="flex flex-1" :style="{ minWidth: minWidth }">
            <table-provide :item="item.CACHE_OLD_ITEM_TABLE" :index="index">
              <slot name="default" />
            </table-provide>
          </div>
        </div>
      </div>
    </template>

    <cal-empty class="mt-160" v-if="!fictitiousList.length" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTable' })
</script>
<script lang="ts" setup>
  import { defineEmits, defineProps, provide, watch, ref, useSlots } from 'vue'
  import TableProvide from './TableProvide.vue'
  import { nanoid } from 'nanoid'
  import { orderBy, debounce } from 'lodash-es'
  import { analyUnit } from '@tuimao/utils'
  import { useTheme } from '../../../utils/theme'
  import { useVModel } from '@vueuse/core'
  import CalCheckbox from '../../checkbox/src/Checkbox.vue'
  const slots = useSlots()
  const emit = defineEmits(['checkboxChange', 'itemClick', 'update:selectAll'])
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
    /** 勾选位置 */
    selectPosition: {
      type: String as () => 'top' | 'center',
      default: 'center'
    },
    /** 全选 */
    selectAll: {
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

  const indeterminate = ref(false)

  /** 全选 和 多选操作 */
  const selectList: Record<string, any> = {}
  const selectAll = useVModel(props, 'selectAll')
  watch(selectAll, (value) => {
    if (value) {
      fictitiousList.value.forEach((item) => {
        item.CACHE_SELECT_TABLE = value
      })
    } else {
      const currentAllSelect = !fictitiousList.value.some((item) => !item.CACHE_SELECT_TABLE)
      if (currentAllSelect) {
        fictitiousList.value.forEach((item) => {
          item.CACHE_SELECT_TABLE = value
        })
      }
    }
    checkboxChange()
  })

  const onCheckboxChange = (item: typeof fictitiousList.value[0], { target: { checked } }: any) => {
    item.CACHE_SELECT_TABLE = checked
    emit('update:selectAll', !fictitiousList.value.some((item) => !item.CACHE_SELECT_TABLE))
    checkboxChange()
  }

  const checkboxChange = debounce(() => {
    emit(
      'checkboxChange',
      fictitiousList.value.filter((item) => item.CACHE_SELECT_TABLE)
    )
  }, 50)

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
        @apply top-0 left-0 bottom-0 w-4 rounded m-auto absolute;
      }
    }
  }
</style>
