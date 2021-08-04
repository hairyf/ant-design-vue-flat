<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:15:31
 * @Description: 新增标签
 * @LastEditors: Mr.wang
-->
<template>
  <el-card shadow="never" class="e-grid classification-edit">
    <div class="table-header-container">
      <el-button
        class="add-goods"
        size="small"
        type="primary"
        @click="
          tableList.unshift({
            name: '',
            status: 1,
            thumb: '',
            hideChildren: false,
            children: []
          })
        "
      >
        <div class="add-button-box">
          <i class="ad-shapePlus"></i>
          <span class="text">新增一级标签</span>
        </div>
        <!-- 新增一级标签 -->
      </el-button>

      <!-- <el-button type="primary" class="add-goods" size="small" @click="jumpAddsupport()">
        <div class="add-button-box">
          <i class="ad-shapePlus"></i>
          <span class="text">新增支持</span>
        </div>
      </el-button> -->
      <div class="table-header oe-flex">
        <div style="flex: 5%"></div>
        <div style="flex: 50%">标签名称</div>
        <div style="flex: 40%">状态</div>
        <div style="flex: 5%">操作</div>
      </div>
    </div>
    <el-scrollbar class="table-content">
      <nested-sort-table style="width: 100%" v-model="tableList">
        <template #item="{ nestedIndex, item, items, index }">
          <div class="table-slot-item oe-flex">
            <div style="flex: 5%" class="oe-flex oe-row-between">
              <i class="ad-tableIcon icon" />
            </div>
            <div style="flex: 50%">
              <!-- 树形指标 -->
              <i
                v-if="nestedIndex"
                class="ad-Frame1 oe-m-r-14"
                :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
              />
              <!-- 类型名称 -->
              <el-input
                v-model="item.name"
                placeholder="请输入名称"
                maxlength="10"
                show-word-limit
              />
              <!-- 新增子项 -->
              <el-link
                v-if="nestedIndex < 2"
                href="javascript:;"
                class="oe-m-l-14"
                type="primary"
                @click="
                  item.children.unshift({
                    name: '',
                    status: 1,
                    thumb: '',
                    hideChildren: false,
                    children: []
                  })
                "
              >
                +新增{{ nzh.cn.encodeS(nestedIndex + 2) }}级标签
              </el-link>
            </div>
            <div style="flex: 40%">
              <el-switch
                v-model="item.status"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66"
                @change="changeSwitch(item)"
              >
              </el-switch>
            </div>
            <div style="flex: 5%">
              <!-- 删除 -->
              <el-link href="javascript:;" type="primary" @click="deleteClass(items, index, item)">
                删除
              </el-link>
            </div>
          </div>
        </template>
      </nested-sort-table>
    </el-scrollbar>
  </el-card>
  <el-card shadow="never" class="fixed-footer">
    <div class="button-box">
      <el-button @click="router.push('/commodity/productLabeling')" size="small">取消</el-button>
      <el-button @click="addClassification" type="primary" size="small">保存</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { reqGoodsGoodsTabAddEdit, reqGoodsGoodsTabList } from '@/api/commodity'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import nzh from 'nzh'
  import { ElMessage } from 'element-plus'
  // 保存router
  const router = useRouter()
  // const active = ref(1)
  const tableList = ref<any[]>([
    {
      name: '',
      status: 1,
      thumb: '',
      hideChildren: false,
      children: []
    }
  ])

  // const currentTab = ref<any>('1')
  const submitInfo = ref<any>({
    // template_level: '',
    // template_num: -1,
    // category_img: [],
    datas: []
  })
  // 更改switch状态事件
  const changeSwitch = (item: any) => {
    const recursion = (tiems: any[]) => {
      tiems.forEach((citem) => {
        citem.status = item.status
        if (citem.children) {
          recursion(citem.children)
        }
      })
    }
    item.children && recursion(item.children)
  }
  // 递归增加数据
  function addAttribute(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        item.hideChildren = false
        addAttribute(item.children)
      } else {
        item.children = []
        item.hideChildren = false
      }
    })
    return
  }
  // 编辑标签接口请求
  reqGoodsGoodsTabList().then((res) => {
    const temp: any = res.data.data
    tableList.value = temp.data
    // currentTab.value = temp.template_level.toString()
    // active.value = temp.template_num
    // isProductShow.value = temp.category_img[0]
    addAttribute(tableList.value)
  })
  // 删除id
  const deleteIdList = ref<any[]>([])
  const deleteClass = (items: any, index: Key, item: any) => {
    items.splice(index, 1)
    deleteIdList.value.push(item.id)
  }
  // 新增或编辑
  const addClassification = () => {
    // 删除不需要的数据
    function deleteAttribute(arr: any) {
      arr.forEach((item: any) => {
        if (item.children) {
          delete item.hideChildren
          deleteAttribute(item.children)
        } else {
          delete item.hideChildren
        }
      })
      return
    }
    deleteAttribute(tableList.value)
    submitInfo.value.datas = tableList.value
    submitInfo.value.del_datas = deleteIdList.value.join()
    // submitInfo.value.template_level = currentTab.value
    // submitInfo.value.template_num = active.value
    // submitInfo.value.category_img.push(isProductShow.value)
    reqGoodsGoodsTabAddEdit(submitInfo.value).then((res) => {
      ElMessage.success('编辑成功')
      router.push('/commodity/productLabeling')
    })
  }
</script>

<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  :deep(.el-button i) {
    font-size: 14px;
  }
  // 新增按钮
  .add-goods {
    width: 120px;
    &.el-button {
      margin: 0;
      padding-top: 8px;
      padding-bottom: 9px;
      font-size: 14px;
      .text {
        margin-left: 6px;
      }
    }
    .add-button-box {
      display: flex;
      justify-content: center;
      // text-align: center;
    }
  }
  .classification-container {
    padding-bottom: 80px;
  }
  .e-grid {
    margin-bottom: 20px;
    :deep(.el-card) {
      width: 100%;
      height: 100%;
      .el-card__body {
        height: calc(100% - 40px);
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .custom-tabs {
    :deep(.el-tabs__nav-scroll) {
      @include self-lg-xl(justify-content, start, center);
      // display: flex;
      // .el-tabs__item {
      //   font-size: 16px;
      //   font-weight: bold;
      // }
    }
    :deep(.el-tabs__header) {
      margin-bottom: 0 !important;
    }
    :deep(.el-tabs__item) {
      padding: 0 10px;
    }
  }
  .image-list {
    display: flex;
    .upload-image-container {
      position: relative;
      margin-right: 25px;
      width: 100px;
      height: 130px;
      overflow: hidden;
      text-align: center;
      &::after {
        content: '';
        position: absolute;
        right: -30px;
        top: -19px;
        width: 106px;
        height: 19px;
        text-align: center;
        font-size: 12px;
        line-height: 30px;
        color: #fff;
        background: var(--color-primary);
        transform: rotate(45deg);
        z-index: 5;
      }
      .el-icon-close {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 10;
        padding: 2px;
        color: #ffffff;
        font-size: 12px;
        cursor: pointer;
      }
      .el-image {
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        margin-bottom: 8px;
      }
    }
    .custom-upload-container {
      margin-right: 25px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #f5f5f5;
      width: 100px;
      height: 100px;
      cursor: pointer;
      .el-icon-plus {
        font-size: 28px;
        color: var(--color-primary);
      }
      .tips {
        margin-top: 10px;
        font-size: 12px;
        color: #8c8c8c;
      }
    }
    .linkChoice {
      font-size: 14px;
      .selector {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;
        color: var(--color-primary);
        .link-input {
          text-indent: 1em;
          line-height: 38px;
          width: 296px;
          height: 38px;
          border: 1px dashed #d9d9d9;
          margin-right: 24px;
        }
      }
    }
  }
  .type-selects {
    @include self-lg-xl(height, 300px, 850px);
  }
  .propaganda-image {
    height: 226px;
    .title {
      margin-top: 10px;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .classification-edit {
    height: 604px;
  }
  .mobile-browse {
    height: 850px;
  }
  .template-list {
    @include self-lg-xl(justify-content, start, center);
    @include self-lg-xl(flex-direction, row, column);
    align-items: center;
    display: flex;
    .template-item {
      margin: 15px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 120px;
      border-radius: 2px;
      .item-box {
        position: relative;
        border: 1px solid transparent;
        border-radius: 2px;
        .iii {
          height: 20px;
        }
        &.active {
          border: 1px solid var(--color-primary);
        }
        .icon-box {
          position: absolute;
          top: 0;
          right: 0;
          width: 16px;
          height: 10px;
          background-color: var(--color-primary);
          z-index: 6;
          text-align: center;
          border-radius: 0 0 0 2px;
          .icon {
            position: absolute;
            top: -1px;
            left: -2px;
            color: #fff;
            font-size: 6px;
          }
        }
      }

      .info-text {
        margin-top: 14px;
      }
      i {
        margin-left: 5px;
        color: #8c8c8c;
      }
    }
  }
  .table-header {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: solid 1px #d9d9d9;
  }
  .table-content {
    height: 488px !important;
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
  .fixed-footer {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    .button-box {
      display: flex;
      justify-content: center;
      .el-button {
        width: 120px;
        margin: 0 15px;
      }
    }
  }

  // 底部保存按钮
  .fixed-footer {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    .button-box {
      display: flex;
      justify-content: center;
      .el-button {
        width: 120px;
        margin: 0 15px;
      }
    }
  }
</style>
