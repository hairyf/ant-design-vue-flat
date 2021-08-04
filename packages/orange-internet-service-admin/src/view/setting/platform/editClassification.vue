<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:52:46
 * @LastEditTime: 2021-06-16 15:31:51
 * @Description: 编辑分类
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="w-3/4 mx-auto">
    <!-- table固定内容 -->
    <cal-tab-pane alone :min-height="500">
      <div class="flex justify-between mb-28">
        <div class="flex items-center">
          <cal-button
            class="w-144 h-36"
            icon-class="nr-increase"
            type="primary"
            @click="
              tableList.push({
                name: '',
                status: 1,
                children: [
                  {
                    name: '',
                    status: 1
                  }
                ]
              })
            "
          >
            新增一级标签
          </cal-button>
        </div>
      </div>
      <nested-sort-table style="width: 100%" v-model="tableList">
        <template #item="{ nestedIndex, item, index, items }">
          <div class="table-slot-item flex">
            <div style="flex: 2%; height: 100%">
              <div class="w-4 h-full bg-primary"></div>
            </div>
            <div style="flex: 13%" class="flex justify-between">
              <i class="nr-classification-header-icon icon text-xl ml-32" />
              <i
                v-if="nestedIndex < 2 && item.children?.length"
                @click="item.hideChildren = !item.hideChildren"
                class="hide-icon mr-14 text-xl"
                :class="[item.hideChildren ? 'nr-classification-open' : 'nr-classification-away']"
              />
            </div>
            <div style="flex: 55%; position: relative">
              <!-- 树形指标 -->
              <div
                v-if="!nestedIndex"
                class="text-gray-darkmin"
                style="position: absolute; top: -40px; left: 0"
              >
                分类名称
              </div>
              <div>
                <i
                  v-if="nestedIndex"
                  class="ad-Frame1 oe-m-r-14"
                  :style="{ marginLeft: nestedIndex * 24 + 'px' }"
                />
                <!-- 类型名称 -->
                <cal-input placeholder="请输入分类名称" v-model="item.name" class="w-192 h-24" />
                <cal-button type="link" @click="addClass(item)" v-if="nestedIndex < 1">
                  新增二级标签
                </cal-button>
              </div>
            </div>
            <div style="flex: 30%; position: relative">
              <div
                v-if="!nestedIndex"
                class="text-gray-darkmin"
                style="position: absolute; top: -40px; left: 0"
              >
                显示
              </div>
              <cal-switch v-model="item.status" />
            </div>
            <div
              style="flex: 10%; border-left: 1px solid #f5f5f5; height: 100%; position: relative"
              class="flex items-center pl-24"
            >
              <div
                v-if="!nestedIndex"
                class="text-gray-darkmin"
                style="position: absolute; top: -18px; left: 24px"
              >
                操作
              </div>
              <div class="edit flex items-center">
                <cal-button class="px-28 h-28 text-xs" @click="deleteClass(items, index, item)">
                  删除
                </cal-button>
              </div>
            </div>
          </div>
        </template>
      </nested-sort-table>
      <el-empty class="oe-m-t-30" v-if="!tableList.length" description="暂无商品分类" />
    </cal-tab-pane>
    <div class="flex justify-center mt-64">
      <cal-button
        size="large"
        class="text-base w-176 mx-24"
        @click="$router.push('/setting/platform/classification')"
      >
        取消
      </cal-button>
      <cal-button
        size="large"
        type="primary"
        class="text-base w-176 mx-24"
        @click="editPreservation"
      >
        保存
      </cal-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import NestedSortTable from '~/Bases/NestedSortTable/index.vue'
  import {
    reqIndustryClassIndex,
    reqAddonsClassIndex,
    reqTemplateClassIndex,
    reqIndustryClassEdit,
    reqAddonsClassEdit,
    reqTemplateClassEdit,
    reqIndustryClassDel,
    reqAddonsClassDel,
    reqTemplateClassDel
  } from '@/api/setting'
  import { useRoute, useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  const route = useRoute()
  const router = useRouter()
  // 当前数据类型
  const currentType = route.query.type as any

  // 行业分类数据请求
  const tableList = ref<any[]>([])

  // 请求行业数据
  const getIndustryList = async () => {
    const result = await reqIndustryClassIndex()
    tableList.value = result.data.data
  }

  // 请求应用数据
  const getApplicationList = async () => {
    const result = await reqAddonsClassIndex()
    tableList.value = result.data.data
  }

  // 请求模板数据
  const getTemplateList = async () => {
    const result = await reqTemplateClassIndex()
    tableList.value = result.data.data
  }

  switch (currentType) {
    case '0':
      getIndustryList()
      break
    case '1':
      getApplicationList()
      break
    case '2':
      getTemplateList()
      break
  }
  //  新增分类子元素
  const addClass = (item: any) => {
    console.log('item', item)
    if (!item.children) {
      item.children = []
      item.children.push({
        name: '',
        status: ''
      })
    } else {
      item.children.push({
        name: '',
        status: ''
      })
    }
  }
  // 删除分类
  const deleteList: any[] = []
  const deleteClass = (items: any, index: number, item: any) => {
    if (items.length > 1) {
      items.splice(index, 1)
      deleteList.push(item.id)
    } else {
      message.warning('至少保留一个分类')
    }
  }

  // 编辑保存分类
  const editPreservation = async () => {
    switch (currentType) {
      case '0':
        await reqIndustryClassEdit({ dataAll: tableList.value })
        if (deleteList.length > 0) {
          await reqIndustryClassDel({ ids: deleteList })
        }
        break
      case '1':
        await reqAddonsClassEdit({ dataAll: tableList.value })
        if (deleteList.length > 0) {
          await reqAddonsClassDel({ ids: deleteList })
        }
        break
      case '2':
        await reqTemplateClassEdit({ dataAll: tableList.value })
        if (deleteList.length > 0) {
          await reqTemplateClassDel({ ids: deleteList })
        }
        break
    }
    router.push('/setting/platform/classification')
  }
</script>
<style lang="scss" scoped>
  .rotate {
    animation: rotation 1.25s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  .table-slot-item {
    height: 70px;
    align-items: center;
    font-size: 14px;
    .el-input {
      width: auto;
    }
    .icon {
      color: var(--color-primary);
    }
    .hide-icon {
      cursor: pointer;
      font-size: 20px;
      color: var(--color-primary);
      transition: 0.3s;
      transform: rotate(0);
      &.hide {
        transform: rotate(-90deg);
      }
    }
  }
  .edit {
    :deep(.el-button) {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 2px 8px;
      min-height: 24px;
      border-radius: 2px;
      margin-left: 14px;
      i {
        padding-right: 3px;
      }
    }
  }
</style>
