<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-18 09:30:25
 * @LastEditTime: 2021-07-19 17:11:58
 * @Description: 多嵌套表格组件
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :class="[nestedIndex ? `nested-sort-table-${nestedIndex}` : 'nested-sort-table']">
    <slot v-if="showHeader" name="header" />
    <div class="table-list" ref="sortableContainer">
      <div class="table-item" v-for="(item, index) in tableItems" :key="item.CACHE_TABLE_ITEM_KEY">
        <slot
          name="item"
          :nested-index="nestedIndex"
          :items="tableItems"
          :item="item"
          :index="index"
        />
        <!-- <div class="strip"></div> -->
        <!--  递归传递多层列表, 将 children 传入-->
        <cal-nested-sort-table
          v-if="item?.children?.length"
          v-show="!item.hideChildren"
          v-model="item.children"
          :nested-index="nestedIndex + 1"
          :isDrag="isDrag"
        >
          <template #item="{ nestedIndex, items, item, index }">
            <slot
              name="item"
              :nested-index="nestedIndex"
              :items="items"
              :item="item"
              :index="index"
            />
          </template>
        </cal-nested-sort-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalNestedSortTable' })
</script>
<script lang="ts" setup>
  import { computed, defineEmits, defineProps, onMounted, ref, useSlots, watch } from 'vue'
  import { nanoid } from 'nanoid'
  import Sortable from 'sortablejs'
  import CalCard from '../../card/src/Card.vue'
  const props = defineProps({
    // 当前队列
    modelValue: {
      type: Array as () => any[],
      required: true
    },
    // 当前递归层级
    nestedIndex: {
      type: Number,
      default: 0
    },
    // 是否开启拖拽
    isDrag: {
      type: Boolean,
      default: true
    },
    // 处理元素
    handle: String
  })
  const slots = useSlots()
  // 判断是否展示头部
  const showHeader = !!slots.header
  const emit = defineEmits(['update:modelValue'])
  // 多层model传递
  const tableItems = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  const resetTableItem = (array: any[]) => {
    array.forEach((item) => {
      if (Array.isArray(item.children)) {
        resetTableItem(item.children)
      }
      if (!item['CACHE_TABLE_ITEM_KEY']) {
        item['CACHE_TABLE_ITEM_KEY'] = nanoid(10)
      }
    })
  }
  watch(
    () => tableItems.value.length,
    () => resetTableItem(tableItems.value)
  )

  // 当前列实现拖拽
  const sortableContainer = ref<HTMLElement>()
  onMounted(() => {
    if (!sortableContainer.value || !props.isDrag) return false
    const debounce = false
    Sortable.create(sortableContainer.value, {
      animation: 500,
      handle: props.handle,
      onMove: () => {
        if (debounce) return false
      },
      onEnd: (event) => {
        setTimeout(() => {
          if (typeof event.oldIndex === 'undefined') return
          if (typeof event.newIndex === 'undefined') return
          const oldViewItem = tableItems.value[event.oldIndex]
          const newViewItem = tableItems.value[event.newIndex]
          if (!(oldViewItem?.preventMove || newViewItem?.preventMove)) {
            const temp = tableItems.value.splice(event.oldIndex, 1)[0]
            tableItems.value.splice(event.newIndex, 0, temp)
          }
        }, 400)
      }
    })
  })
</script>
<style lang="scss" scoped></style>
