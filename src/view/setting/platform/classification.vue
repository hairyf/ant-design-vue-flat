<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:52:46
 * @LastEditTime: 2021-07-15 18:22:02
 * @Description: 分类设置
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="w-3/4 mx-auto">
    <cal-tabs v-model:activeKey="activeKey" @change="changeTabs">
      <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
        <template #tab>
          <span>{{ item.title }}</span>
        </template>
      </cal-tab-pane>
    </cal-tabs>
    <!-- table固定内容 -->
    <cal-tab-pane alone :min-height="500">
      <div class="flex justify-between mb-28">
        <div class="flex items-center">
          <cal-button
            class="w-144 h-36"
            icon-class="nr-increase"
            type="primary"
            @click="
              $router.push({
                path: '/setting/platform/editClassification',
                query: { type: activeKey }
              })
            "
          >
            新增分类
          </cal-button>
          <!-- <div class="ml-28">已有商品分类总条数：{{ tableList.length }}</div>
          <div class="flex items-center" @click="refreshBtn">
            <cal-button type="link" class="px-4">刷新</cal-button>
            <i
              class="text-sm nr-refresh2 text-primary"
              style="cursor: pointer"
              :class="isRotate ? 'rotate' : ''"
            ></i>
          </div> -->
        </div>
      </div>
      <nested-sort-table style="width: 100%" v-model="tableList">
        <template #item="{ nestedIndex, item, items }">
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
            <div style="flex: 65%; position: relative">
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
                <span
                  style="line-height: 24px"
                  @click="item.isNameShow = !item.isNameShow"
                  v-if="item.isNameShow"
                >
                  {{ item.name }}
                </span>
                <cal-input
                  v-else
                  @blur="item.isNameShow = !item.isNameShow"
                  v-model:value="item.name"
                  class="w-192 h-24"
                />
              </div>
            </div>
            <div style="flex: 20%; position: relative">
              <div
                v-if="!nestedIndex"
                class="text-gray-darkmin"
                style="position: absolute; top: -40px; left: 0"
              >
                显示
              </div>
              <cal-switch v-model="item.status" @change="changeCalssStatus(item.id, item.status)" />
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
                <!-- <cal-button class="px-28 mr-14 h-28 text-xs">编辑</cal-button> -->
                <cal-button class="px-28 h-28 text-xs" @click="deleteClass(item.id, items)">
                  删除
                </cal-button>
              </div>
            </div>
          </div>
        </template>
      </nested-sort-table>
      <el-empty class="oe-m-t-30" v-if="!tableList.length" description="暂无商品分类" />
    </cal-tab-pane>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import NestedSortTable from '~/Bases/NestedSortTable/index.vue'
  import {
    reqIndustryClassIndex,
    reqAddonsClassIndex,
    reqTemplateClassIndex,
    reqIndustryClassDel,
    reqAddonsClassDel,
    reqTemplateClassDel,
    reqIndustryClassEditStatus,
    reqAddonsClassEditStatus,
    reqTemplateClassEditStatus
  } from '@/api/setting'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import { message } from 'ant-design-vue'
  const activeKey = ref(0)

  // 递归增加数据
  function addAttribute(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        item.isNameShow = true
        addAttribute(item.children)
      } else {
        item.isNameShow = true
      }
    })
    return
  }

  // 是否刷新按钮旋转请求数据
  const isRotate = ref(false)
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(() => {
      switch (activeKey.value) {
        case 0:
          getIndustryList()
          message.success('刷新成功')
          isRotate.value = false
          break
        case 1:
          getApplicationList()
          message.success('刷新成功')
          isRotate.value = false
          break
        case 2:
          getTemplateList()
          message.success('刷新成功')
          isRotate.value = false
          break
      }
    }, 500)
  }

  // 行业分类数据请求
  const tableList = ref([])

  // 请求行业数据
  const getIndustryList = async () => {
    const result = await reqIndustryClassIndex()
    tableList.value = result.data.data
    addAttribute(tableList.value)
  }

  // 请求应用数据
  const getApplicationList = async () => {
    const result = await reqAddonsClassIndex()
    tableList.value = result.data.data
    addAttribute(tableList.value)
  }

  // 请求模板数据
  const getTemplateList = async () => {
    const result = await reqTemplateClassIndex()
    tableList.value = result.data.data
    addAttribute(tableList.value)
  }

  getIndustryList()

  // tabs切换数据请求
  const changeTabs = (value: any) => {
    switch (value) {
      case 0:
        getIndustryList()
        break
      case 1:
        getApplicationList()
        break
      case 2:
        getTemplateList()
        break
    }
  }
  //列表渲染
  const tabs = [
    {
      title: '行业分类'
    },
    {
      title: '应用分类'
    },
    {
      title: '模板分类'
    }
  ]
  // 删除分类
  const deleteClass = (classId: number, items: any) => {
    if (items.length > 1) {
      CalMessageDialog.warning({
        title: '删除分类',
        content: '您确定删除该分类么？删除以后将无法恢复',
        async onOk() {
          switch (activeKey.value) {
            case 0:
              await reqIndustryClassDel({ ids: classId })
              getIndustryList()
              break
            case 1:
              await reqAddonsClassDel({ ids: classId })
              getApplicationList()
              break
            case 2:
              await reqTemplateClassDel({ ids: classId })
              getTemplateList()
              break
          }
        }
      })
    } else {
      message.warning('至少保留一个分类')
    }
  }
  // 修改分类状态
  const changeCalssStatus = async (classId: number, status: any) => {
    console.log(status, '修改状态')
    switch (activeKey.value) {
      case 0:
        await reqIndustryClassEditStatus({ ids: classId, status })
        getIndustryList()
        break
      case 1:
        await reqAddonsClassEditStatus({ ids: classId, status })
        getApplicationList()
        break
      case 2:
        await reqTemplateClassEditStatus({ ids: classId, status })
        getTemplateList()
        break
    }
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
