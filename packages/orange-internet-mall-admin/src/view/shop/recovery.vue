<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-01 15:45:21
 * @LastEditTime: 2021-05-13 09:42:02
 * @Description: 素材中心
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <div class="header-container">
      <div class="btn-box">
        <el-button type="primary" @click="restoreAll">全部还原</el-button>
        <el-button plain @click="deleteAll">删除</el-button>
      </div>
      <div class="oe-flex oe-row-between">
        <el-tabs class="custom-tabs" v-model="currentTab">
          <el-tab-pane label="图片" name="1"></el-tab-pane>
          <el-tab-pane label="音频" name="2"></el-tab-pane>
          <el-tab-pane label="视频" name="3"></el-tab-pane>
          <!-- <el-tab-pane label="水印" name="watermark"></el-tab-pane> -->
        </el-tabs>
        <el-input
          @keyup.enter="getSearchBtn"
          placeholder="请输入图标名称"
          style="width: auto"
          v-model="fileText"
          class="search-inp"
        >
          <template #suffix>
            <i
              class="el-input__icon el-icon-search"
              style="cursor: pointer"
              @click="getSearchBtn"
            ></i>
          </template>
        </el-input>
      </div>
    </div>
    <el-container class="body-container">
      <el-main>
        <div class="material-list">
          <el-row>
            <el-col
              class="image-edit-item"
              :xs="4"
              :sm="4"
              :xl="3"
              v-for="(item, index) in list"
              :key="index"
              @click="item.select = !item.select"
            >
              <div class="image-edit-block">
                <div class="image-mark oe-flex oe-row-center" :class="{ on: item.select }">
                  <el-button :size="grid == 'xl' ? '' : 'mini'" plain>裁剪</el-button>
                  <el-button
                    :size="grid == 'xl' ? '' : 'mini'"
                    type="primary"
                    @click.stop="viewPicture(item.path.url)"
                    >查看</el-button
                  >
                  <i class="el-icon-check" />
                  <div class="foot-btns" v-if="item.select" @click="deleteCompletely([item.id])">
                    <i class="el-icon-delete" />
                    <span class="text">彻底删除</span>
                  </div>
                </div>
                <el-image fit="cover" :src="item.path.url" v-if="currentTab == '1'" />
                <video :src="item.path.url" controls="controls" v-if="currentTab == '3'" />
                <audio :src="item.path.url" v-if="currentTab == '2'" />
              </div>
              <div class="title">{{ item.name }}</div>
              <div class="tips">{{ formatUnix(item.createtime) }}</div>
            </el-col>
          </el-row>
          <el-empty class="oe-m-t-30" description="暂无数据" v-if="!list.length" />
          <div class="control-container oe-flex oe-row-between">
            <div class="left-column">
              <el-checkbox v-model="isSelectAll"> 全选当前页 </el-checkbox>
              <el-link
                type="primary"
                :disabled="!selectIds.length"
                href="javascript:;"
                @click="reductionList"
              >
                还原
              </el-link>
              <el-link
                type="primary"
                :disabled="!selectIds.length"
                href="javascript:;"
                @click="deleteCompletely(selectIds)"
              >
                彻底删除
              </el-link>
            </div>
            <el-pagination
              class="right-column"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              background
              layout="total, prev, pager, next,sizes, jumper"
              :total="pagination.total"
              :current-page="pagination.currentPage"
            />
          </div>
        </div>
      </el-main>
    </el-container>
    <div class="view-resources">
      <el-dialog v-model="viewShow" title="查看" width="580px">
        <el-image v-if="currentTab == '1'" fit="cover" :src="currentUrl"></el-image>
        <video v-if="currentTab == '3'" controls="controls" :src="currentUrl" />
        <audio v-if="currentTab == '2'" :src="currentUrl" controls="controls" />
      </el-dialog>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import { watch, ref } from 'vue'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { usePagination } from '@/hooks/use-pagination'
  import { useGridDetector } from '@/hooks/use-grid-detector'
  import { formatUnix } from '@/utils'
  import {
    reqBinDelete,
    reqRecover,
    reqRecycleBin,
    reqRecoverAll,
    reqYcleBinDelete
  } from '@/api/common'
  import { ElMessageBox } from 'element-plus'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const grid = useGridDetector()
  // 当前tab
  const currentTab = ref('1')
  const viewShow = ref(false)
  const currentUrl = ref('')
  // 文件数据
  const list = ref<any[]>([])
  // 搜索内容
  const fileText = ref('')
  const { isSelectAll, selectIds } = useMultipleSelect(list)
  // 获取回收站数据
  const getRecycleList = async () => {
    const { data } = await reqRecycleBin({
      type: currentTab.value,
      page: pagination.currentPage,
      limit: pagination.pageSize,
      searchName: fileText.value
    })
    if (data.code == 0) {
      list.value = data.data.list
      pagination.total = data.data.count
      list.value.map((item) => {
        item.select = false
      })
    }
  }
  // 还原文件
  const reductionList = async () => {
    await ElMessageBox.confirm('确认还原吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqRecover({
      recover_ids: selectIds.value,
      type: currentTab.value
    })
    if (data.code == 0) {
      getRecycleList()
    }
  }
  // 查看大图
  const viewPicture = (url: any) => {
    currentUrl.value = url
    viewShow.value = true
  }
  // 彻底删除文件
  const deleteCompletely = async (id: any[]) => {
    await ElMessageBox.confirm('确认彻底删除文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqBinDelete({ delete_ids: id, type: currentTab.value })
    if (data.code == 0) {
      getRecycleList()
    }
  }
  // 全部删除
  const deleteAll = async () => {
    await ElMessageBox.confirm('确认删除全部文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqYcleBinDelete({ type: currentTab.value })
    if (data.code == 0) {
      getRecycleList()
    }
  }
  // 全部还原
  const restoreAll = async () => {
    await ElMessageBox.confirm('确认还原全部文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqRecoverAll({ type: currentTab.value })
    if (data.code == 0) {
      getRecycleList()
    }
  }
  // 搜索文件
  const getSearchBtn = () => {
    pagination.currentPage = 1
    getRecycleList()
  }
  // tab切换请求对应的数据
  watch(currentTab, () => {
    pagination.currentPage = 1
    getRecycleList()
  })
  // 获取文件
  watch([() => pagination.currentPage, () => pagination.pageSize], () => getRecycleList(), {
    immediate: true
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .header-container {
    padding-bottom: 20px;
    :deep(.el-button) {
      min-height: 32px;
      padding: 2px 14px;
    }
  }
  .btn-box {
    padding-bottom: 20px;
  }
  .custom-crad-container {
    > :deep(.el-card > .el-card__body) {
      display: flex;
      flex-direction: column;
    }
  }
  .body-container {
    flex: 1;
    .el-main {
      position: relative;
      overflow: hidden;
      padding-top: 0;
      padding-right: 0;
    }
  }
  .material-list {
    @include self-lg-xl(padding-bottom, 80px, 50px);
  }
  .image-edit-item {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    margin-top: 24px;
    text-align: center;
    z-index: 5;
    border-radius: 10px;
    overflow: hidden;
    .el-image {
      width: 160px;
      height: 160px;
    }
    .foot-btns {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.5);
      i {
        margin-right: 7.5px;
      }
      i,
      span {
        color: #ffffff;
      }
    }
    .image-edit-block {
      height: 160px;
      position: relative;
      margin-bottom: 12px;
    }
    .el-icon-check {
      display: none;
      position: absolute;
      right: 3px;
      top: 5px;
      color: #fff;
      z-index: 6;
    }
    .image-mark {
      position: absolute;
      cursor: pointer;
      width: 100%;
      height: 100%;
      overflow: hidden;
      left: 0;
      top: 0;
      z-index: 5;
      flex-direction: column;
      border-radius: 10px;
      &.on {
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid var(--color-primary);
        box-sizing: border-box;
        &::after {
          content: '';
          width: 80px;
          height: 30px;
          position: absolute;
          top: 0px;
          right: -40px;
          background-color: var(--color-primary);
          transform: rotate(45deg);
        }
        .el-icon-check {
          display: inline;
        }
      }
      .el-button {
        display: none;
        margin: 3px 0 !important;
        @include self-lg-xl(width, 60px, 85px);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        .el-button {
          display: block;
        }
      }
    }
    .el-image,
    video,
    audio {
      margin: 0;
      width: 100%;
      height: 160px;
      border-radius: 10px;
    }
    video {
      object-fit: fill;
    }
    .title {
      @include self-font-size(14px);
      margin-bottom: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tips {
      @include self-font-size(12px);
      color: #8c8c8c;
    }
  }
  .control-container {
    @include self-lg-xl(flex-direction, column, row);
    margin-top: 16px;
    width: 100%;
    position: absolute;
    bottom: 0;
    .el-link {
      margin-left: 14px;
    }
    .right-column {
      margin: 14px 0;
    }
  }
  .view-resources {
    video,
    audio {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
    }
    video {
      object-fit: fill;
    }
    .el-image {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
    }
  }
  audio:focus {
    outline: none;
  }
  video:focus {
    outline: none;
  }
</style>
