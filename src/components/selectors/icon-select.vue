<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-19 17:03:56
 * @LastEditTime: 2021-05-11 10:24:27
 * @Description: 图标选择器
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog v-model="show" title="图标选择器" width="664px" custom-class="icon-select">
    <!-- <el-input placeholder="请输入图标名称" class="search-inp" v-model="searchText">
      <template #suffix>
        <i class="el-input__icon el-icon-search" style="cursor: pointer" @click="getSearchBtn"></i>
      </template>
    </el-input> -->
    <el-tabs class="custom-tabs" v-model="currentTab">
      <el-tab-pane label="官方图标" name="official">
        <div class="oe-flex oe-flex-wrap official-box">
          <div
            class="official-list"
            v-for="(item, index) in officialIconTotal"
            :key="index"
            @click="getSelectIcon(item)"
          >
            <i :class="item" />
            <div class="official-list-text">{{ item }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三方图标" name="tripartite">
        <div class="oe-flex oe-flex-wrap official-box">
          <div
            class="official-list"
            @click="getSelectIcon(item)"
            v-for="(item, index) in remixIconList"
            :key="index"
          >
            <i :class="item"></i>
            <div class="official-list-text">{{ item.slice(0, item.length - 5).slice(3) }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="paging-box" v-if="currentTab !== 'official'">
      <el-pagination
        class="e-grid"
        :page-size="45"
        :pager-count="3"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { computed, defineEmit, defineProps, ref, watch } from 'vue'
  import 'remixicon/fonts/remixicon.css'
  import { usePagination } from '@/hooks/use-pagination'
  import remixIconTotal from '@/config/remix-icon.json'
  import officialIconTotal from '@/config/official-icon.json'
  import { ElDialog, ElInput, ElTabs, ElPagination, ElTabPane } from 'element-plus'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  })

  // 图标搜索内容
  const searchText = ref('')
  // tab切换
  const currentTab = ref('official')
  // 第三方当前数据
  const remixIconList = ref<string[]>([])
  // 搜索图标名称
  const getSearchBtn = () => {
    if (currentTab.value == 'tripartite') {
      if (searchText.value != '') {
        remixIconList.value = remixIconList.value.filter((icon) => {
          const rex = new RegExp(searchText.value)
          return rex.test(icon)
        })
      } else {
        getRemixIconList()
      }
    }
  }
  // 选中当前的icon图标
  const getSelectIcon = (item: string) => {
    PubSub.publish('icon-confirm', item)
    show.value = false
  }

  // 请求json分页
  const getRemixIconList = () => {
    pagination.total = remixIconTotal.length
    remixIconList.value = remixIconTotal.filter(
      (item: any, index: number) =>
        index < pagination.currentPage * 45 && index >= 45 * (pagination.currentPage - 1)
    )
  }
  watch(
    [() => pagination.pageSize, () => pagination.currentPage, currentTab],
    () => {
      if (currentTab.value == 'tripartite') {
        getRemixIconList()
      }
    },
    {
      immediate: true
    }
  )
  // 多层model绑定数据
  const show = ref(true)
</script>
<style scoped lang="scss">
  .icon-select {
    padding-bottom: 50px;
    .search-inp {
      width: 200px;
      z-index: 1;
      position: absolute;
      right: 24px;
      top: 85px;
      :deep(.el-input__inner) {
        background: #f5f5f5;
      }
    }
    .el-tab-pane {
      min-height: 400px;
    }
    .official-box {
      .official-list {
        margin: 0 14px 0 0;
        cursor: pointer;
        width: 56px;
        padding: 7px 10px;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        border-radius: 2px;
        text-align: center;
        &:hover {
          background: var(--color-primary);
          border: 1px solid var(--color-primary);
          color: #fff;
          .official-list-text {
            color: #fff;
          }
        }
        i {
          font-size: 24px;
        }

        .official-list-text {
          color: #8c8c8c;
          font-size: 12px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .official-box .official-list:nth-child(n + 10) {
      margin: 14px 14px 0 0;
    }
    .official-box .official-list:nth-child(9n) {
      margin-right: 0;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
