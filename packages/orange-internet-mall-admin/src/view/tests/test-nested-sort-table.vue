<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-18 09:31:03
 * @LastEditTime: 2021-03-31 19:55:53
 * @Description: 嵌套排序表格
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-center-card">
    <nested-sort-table style="width: 100%" v-model="tableList">
      <template #header>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="
            tableList.unshift({
              type: '',
              hideChildren: false,
              show: true,
              image: '',
              children: []
            })
          "
        >
          新增一级分类
        </el-button>
        <div class="table-sort-header oe-flex">
          <div style="flex: 5%"></div>
          <div style="flex: 50%">分类名称</div>
          <div style="flex: 20%">分类图片</div>
          <div style="flex: 20%">状态</div>
          <div style="flex: 5%">操作</div>
        </div>
      </template>
      <template #item="{ nestedIndex, item, items, index }">
        <div class="table-slot-item oe-flex">
          <div style="flex: 5%" class="oe-flex oe-row-between">
            <i class="ad-tableIcon icon" />
            <i
              v-if="nestedIndex < 2 && item?.children?.length"
              @click="item.hideChildren = !item.hideChildren"
              class="el-icon-caret-bottom hide-icon oe-m-r-10"
              :class="{ hide: item.hideChildren }"
            />
          </div>
          <div style="flex: 50%">
            <!-- 树形指标 -->
            <i
              v-if="nestedIndex"
              class="ad-Frame1 oe-m-r-14"
              :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
            />
            <!-- 类型名称 -->
            <el-input v-model="item.type" placeholder="请输入名称" maxlength="10" show-word-limit />
            <!-- 新增子项 -->
            <el-link
              v-if="nestedIndex < 2"
              href="javascript:;"
              class="oe-m-l-14"
              type="primary"
              @click="
                item.children.push({
                  type: '',
                  hideChildren: false,
                  show: true,
                  image: '',
                  children: []
                })
              "
            >
              +新增{{ nzh.cn.encodeS(nestedIndex + 2) }}级归类
            </el-link>
          </div>
          <div style="flex: 20%">
            <!-- 上传组件 -->
            <div class="table-upload-image">
              <img v-if="false" src="" class="avatar" />
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div style="flex: 20%">
            <!-- 显示与隐藏 -->
            <el-link
              href="javascript:;"
              :type="item.show ? 'success' : 'danger'"
              @click="item.show = !item.show"
            >
              {{ item.show ? '显示' : '隐藏' }}
            </el-link>
          </div>
          <div style="flex: 5%">
            <!-- 删除 -->
            <el-link
              href="javascript:;"
              class="oe-m-l-14"
              type="primary"
              @click="items.splice(index, 1)"
            >
              删除
            </el-link>
          </div>
        </div>
      </template>
    </nested-sort-table>
  </el-card>
</template>
<script lang="ts" setup>
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import nzh from 'nzh'
  import { ref } from '@vue/reactivity'
  import { watch } from '@vue/runtime-core'
  const tableList = ref([
    {
      type: '',
      hideChildren: false,
      show: true,
      image: '',
      children: [{ type: '', hideChildren: false, show: true, image: '', children: [] }]
    },
    { type: '', hideChildren: false, show: true, image: '', children: [] },
    { type: '', hideChildren: false, show: true, image: '', children: [] }
  ])
</script>
<style lang="scss" scoped>
  .table-sort-header {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: solid 1px #d9d9d9;
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
  .table-upload-image {
    text-align: center;
    line-height: 28px;
    width: 32px;
    height: 32px;
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    color: #8c8c8c;
    font-size: 10px;
  }
</style>
