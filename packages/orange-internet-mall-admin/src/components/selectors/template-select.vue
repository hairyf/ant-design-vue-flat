<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-08 16:27:19
 * @LastEditTime: 2021-05-08 16:49:40
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog title="选择模板" v-model="show" width="1080px" custom-class="template-choice">
    <el-input class="oe-m-b-30" placeholder="请输入模板名称" suffix-icon="el-icon-search" />
    <div class="template-list">
      <div class="template-item" v-for="(item, index) in coTemplateList" :key="index">
        <el-card shadow="never">
          <!-- <div class="silk-ribbon">免费</div> -->
          <el-image class="cover-image" fit="cover" :src="item.img" />
          <div class="template-item-info oe-flex oe-row-between">
            <span class="title">{{ item.name }}</span>
            <span class="increase-count">
              <i class="ad-increase" />
              <span class="text">0k</span>
            </span>
          </div>
          <div class="hover-mask oe-flex oe-row-center">
            <el-button type="primary" @click="onSeleteTemplate(item)">使用</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <el-pagination
      class="right-buttom-pagination"
      @size-change="coHsc"
      @current-change="coHcc"
      :current-page="coPn.currentPage"
      :page-sizes="coPn.pageSizes"
      :page-size="coPn.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="coPn.total"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
  import { reqSeleteTemplateItem, reqSeleteTemplates } from '@/api/shop'
  import { usePagination } from '@/hooks/use-pagination'
  import { ref } from '@vue/reactivity'
  import { defineProps, watch } from '@vue/runtime-core'
  import { ElInput, ElPagination, ElDialog, ElCard, ElImage, ElButton } from 'element-plus'
  import { publish } from 'pubsub-js'
  const props = defineProps({
    clone: {
      type: Function
    }
  })
  // 是否展示内容
  const show = ref(true)
  // 分页逻辑
  const { pn: coPn, hsc: coHsc, hcc: coHcc } = usePagination({
    pageSizes: [6, 12, 18],
    pageSize: 6
  })
  // 模板列表
  const coTemplateList = ref<any[]>([])
  // 重置列表
  const resetCoTemplateList = async () => {
    const { data } = await reqSeleteTemplates({
      page: coPn.currentPage,
      limit: coPn.pageSize
    })
    coPn.total = data.data.total
    coTemplateList.value = data.data.data
  }
  // 监视列表变化, 刷新列表
  const coWatchList = [() => coPn.currentPage, () => coPn.pageSize]
  watch(coWatchList, () => resetCoTemplateList(), { immediate: true })
  // 点击使用当前模板
  const onSeleteTemplate = async (item: any) => {
    publish('template-confirm', item)
    show.value = false
  }
  // 监视显示则重新刷新数据
  watch(show, (value) => {
    !value && PubSub.publish('template-clone')
    !value && props.clone?.()
  })
</script>

<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .template-choice {
    .el-dialog__body {
      text-align: right;
      padding-bottom: 50px;
    }
    .el-input {
      width: auto;
    }
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s;
  }
  .template-list {
    display: inline-block;
    min-height: 500px;
    width: 100%;
  }
  .template-item {
    margin-bottom: 20px;
    width: 230px;
    display: inline-block;
    margin-right: 24px;
    &:hover {
      .hover-mask {
        opacity: 1;
      }
    }
    :deep(.el-card__body) {
      position: relative;
      overflow: hidden;
    }
    .silk-ribbon {
      @include top-left-silk-ribbon(#0066ff);
    }
    .hover-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      flex-direction: column;
      transition: 0.5s;
      .el-button {
        margin: 0;
        width: 120px;
      }
    }

    .cover-image {
      height: 300px;
      width: 100%;
    }
    &-info {
      margin-top: 14px;
      margin-bottom: 20px;
      .title {
        font-size: 14px;
      }
      .increase-count {
        .ad-increase {
          font-size: 13px;
          margin-right: 5px;
        }
        font-size: 11px;
        color: #8c8c8c;
      }
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-aside {
    background-color: #f5f5f5;
    height: 209px;
  }
  .el-menu {
    border: none;
  }
  .el-main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-menu-item {
    background-color: #f5f5f5;
    &.is-active {
      background-color: #ffffff;
    }
  }
  .order-dialog {
    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .el-icon-success {
      font-size: 55px;
      color: #1ad370;
    }
    .title {
      font-weight: 500;
      font-size: 24px;
      font-weight: bold;
    }
    .text {
      width: 550px;
    }
    .price {
      color: red;
    }
    .form-info {
      width: 412px;
      margin-bottom: 30px;
    }
    .el-button {
      width: 200px;
    }
  }
</style>
