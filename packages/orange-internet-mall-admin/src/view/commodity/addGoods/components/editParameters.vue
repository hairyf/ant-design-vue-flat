<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card shadow="never" class="parameter-card">
        <div class="title oe-m-b-30">编辑参数</div>
        <div class="custom-parameter" v-if="props.isType == '2'">
          <div class="table-header-container">
            <div class="table-header oe-flex">
              <div style="flex: 5%"></div>
              <div style="flex: 45%">参数名称</div>
              <div style="flex: 45%">参数值</div>
            </div>
          </div>
          <nested-sort-table style="width: 100%" v-model="parameterLlist">
            <template #item="{ nestedIndex, item }">
              <div class="table-slot-item oe-flex">
                <div style="flex: 5%" class="oe-flex oe-row-between">
                  <i class="ad-tableIcon icon" />
                  <i
                    v-if="nestedIndex < 2 && item.children?.length"
                    @click="item.hideChildren = !item.hideChildren"
                    class="el-icon-caret-bottom hide-icon oe-m-r-10"
                    :class="{ hide: item.hideChildren }"
                  />
                </div>
                <div style="flex: 45%">
                  <!-- 树形指标 -->
                  <i
                    v-if="nestedIndex"
                    class="ad-Frame1 oe-m-r-14"
                    :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                  />
                  <!-- 类型名称 -->
                  <el-input disabled v-model="item.name" placeholder="输入参数名称" />
                </div>
                <div style="flex: 45%">
                  <!-- 树形指标 -->
                  <i
                    v-if="nestedIndex"
                    class="ad-Frame1 oe-m-r-14"
                    :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                  />
                  <el-input disabled v-model="item.value" placeholder="输入参数值" />
                </div>
              </div>
            </template>
          </nested-sort-table>
        </div>
        <div class="upload-pictures" v-if="props.isType == '3'">
          <div class="image-list" @click="changeMainPicture">
            <div class="upload-image-container" v-if="!!parameterProduct">
              <el-image class="upload-image" :src="parameterProduct" />
              <i class="el-icon-close" @click.stop="parameterProduct = ''" />
            </div>
            <div v-else class="custom-upload-container">
              <i class="el-icon-plus" />
              <span class="tips">添加图片</span>
            </div>
          </div>
        </div>
        <div class="custom-parameter" v-if="props.isType == '4'">
          <div class="table-header-container">
            <div class="table-header oe-flex">
              <div style="flex: 5%"></div>
              <div style="flex: 45%">参数名称</div>
              <div style="flex: 45%">参数值</div>
              <div style="flex: 5%">操作</div>
            </div>
          </div>
          <nested-sort-table style="width: 100%" v-model="tableList">
            <template #item="{ nestedIndex, item, items, index }">
              <div class="table-slot-item oe-flex">
                <div style="flex: 5%" class="oe-flex oe-row-between">
                  <i class="ad-tableIcon icon" />
                  <i
                    v-if="nestedIndex < 2 && item.children?.length"
                    @click="item.hideChildren = !item.hideChildren"
                    class="el-icon-caret-bottom hide-icon oe-m-r-10"
                    :class="{ hide: item.hideChildren }"
                  />
                </div>
                <div style="flex: 45%">
                  <!-- 树形指标 -->
                  <i
                    v-if="nestedIndex"
                    class="ad-Frame1 oe-m-r-14"
                    :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                  />
                  <!-- 类型名称 -->
                  <el-input v-model="item.name" placeholder="输入参数名称" />
                </div>
                <div style="flex: 45%">
                  <!-- 树形指标 -->
                  <i
                    v-if="nestedIndex"
                    class="ad-Frame1 oe-m-r-14"
                    :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                  />
                  <el-input v-model="item.summarize" placeholder="输入参数值" />
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
          <el-button
            style="margin-top: 20px"
            class="oe-m-b-5"
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="
              tableList.unshift({
                hideChildren: false,
                children: []
              })
            "
          >
            新增参数
          </el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="never" class="e-grid commodity-and-blue">
        <div class="title">预览 </div>
        <div v-if="props.isType == '2'">
          <div class="picture-preview">
            <div class="goods-detail">
              <div class="detail-list">
                <div
                  class="detail-item"
                  :class="index == parameterLlist.length - 1 ? 'border-hidn' : ''"
                  v-for="(el, index) in parameterLlist"
                  :key="index"
                >
                  <div class="detail-item-son left">{{ el.name }}</div>
                  <div class="detail-item-son">{{ el.value }}</div>
                </div>
              </div>
            </div>
            <el-image src="/custom-assets/images/addgoods/add-goods-detail-params.png"></el-image>
          </div>
        </div>
        <div v-if="props.isType == '3'">
          <div class="picture-preview">
            <div class="goods-detail">
              <el-image
                v-if="!!parameterProduct"
                style="width: 82px; height: 82px"
                :src="parameterProduct"
              ></el-image>
            </div>
            <el-image src="/custom-assets/images/addgoods/add-goods-detail-params.png"></el-image>
          </div>
        </div>
        <div v-if="props.isType == '4'">
          <div class="picture-preview">
            <div class="goods-detail">
              <div class="detail-list">
                <div
                  class="detail-item"
                  :class="index == tableList.length - 1 ? 'border-hidn' : ''"
                  v-for="(el, index) in tableList"
                  :key="index"
                >
                  <div class="detail-item-son left">{{ el.name }}</div>
                  <div class="detail-item-son">{{ el.summarize }}</div>
                </div>
              </div>
            </div>
            <el-image src="/custom-assets/images/addgoods/add-goods-detail-params.png"></el-image>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmit } from 'vue'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import { MaterialSelect } from '@/components/selectors'

  const props = defineProps({
    isType: {
      type: String,
      required: true
    },
    parameterLlist: {
      type: Array as () => any[],
      required: true
    },
    tableList: {
      type: Array as () => any[],
      required: true
    },
    parameterProduct: {
      type: String,
      required: true
    }
  })
  const emit = defineEmit()
  const changeMainPicture = () => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      emit('update:parameterProduct', res[0].path.url)
    })
  }
</script>

<style lang="scss" scoped>
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
  .commodity-and-blue {
    height: 735px;
    .picture-preview {
      position: relative;
      width: 100%;
      height: 100%;
      .goods-detail {
        position: absolute;
        top: 130px;
        left: 30px;
        width: 83.5%;
        height: 65%;
        color: #000;
        background-color: #fff;
        z-index: 3;
        .detail-list {
          .detail-item {
            display: flex;
            &.border-hidn {
              border-bottom: 1px solid #8c8c8c;
            }
            .detail-item-son {
              &.left {
                border-right: none;
              }
              width: 50%;
              height: 14px;
              padding: 9px 14px;
              border: 1px solid #8c8c8c;
              border-bottom: none;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el-image {
        width: 100%;
        height: 92%;
      }
    }
  }
  .parameter-card {
    .title {
      font-weight: bold;
      color: #000;
    }
  }
  // 上传图片样式
  .upload-pictures-template {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    margin-right: 28px;
    &.commodity-detail {
      .text {
        width: 52px;
        line-height: 20px;
      }
    }
    .icon {
      font-size: 22px;
      color: var(--color-primary);
    }
    .text {
      font-size: 12px;
      color: #8c8c8c;
      line-height: 30px;
    }
  }
  @import '@/style/mixin.scss';

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
      width: 80%;
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

  // 上传图片样式 日后封装全局样式
  .image-list {
    display: flex;
    .carousel {
      .replace {
        margin-left: 25px;
      }
    }
    .upload-image-container {
      position: relative;
      margin-right: 25px;
      width: 80px;
      height: 80px;
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
        height: 80px;
        margin-bottom: 8px;
      }
    }
    .custom-upload-container {
      margin-right: 25px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px dashed #d9d9d9;
      width: 80px;
      height: 80px;
      cursor: pointer;
      .el-icon-plus {
        font-size: 28px;
        margin-top: 6px;
        margin-bottom: 12px;
        color: var(--color-primary);
      }
      .tips {
        font-size: 13px;
        color: #8c8c8c;
        margin-bottom: 10px;
      }
    }
  }
</style>
