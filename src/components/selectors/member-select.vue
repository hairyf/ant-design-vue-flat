<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-12 13:59:46
 * @LastEditTime: 2021-05-13 10:28:30
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <el-dialog v-model="show" title="会员选择器" custom-class="picture-picker" width="1100px">
    <div class="oe-flex picker-top">
      <el-input placeholder="请输入会员昵称" v-model="searchMember.keyword" class="search-inp">
        <template #suffix>
          <i
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="getSearchBtn"
          ></i>
        </template>
      </el-input>
      <el-select v-model="searchMember.current_shop_user_level_id" placeholder="会员等级" clearable>
        <el-option
          v-for="item in membershipLevel"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <div class="content-box">
      <div class="content-right">
        <div class="picture-box">
          <div
            v-for="(item, index) in imgList"
            :key="index"
            class="picture-list"
            @click="selectItem(index)"
          >
            <div class="commodity-item">
              <div class="commodity-item-son" :class="{ 'change-color': item.select }">
                <div class="icon" v-if="item.select">
                  <i class="el-icon-check yes"></i>
                </div>
                <div class="item-left">
                  <el-image :src="item.avatar"></el-image>
                </div>
                <div class="item-right">
                  <div class="commodity-name">{{ item.nickname }}</div>
                  <div class="commodity-price">
                    <span class="text">手机号</span>
                    <span class="price">{{ item.mobile }}</span>
                  </div>
                  <div class="commodity-stock">
                    <div class="stock-left">
                      <span class="text">等级</span>
                      <span class="stock">{{ item.current_shop_user_level_name }}</span>
                    </div>
                    <div class="stock-right">
                      <el-tag v-if="item.goods_type == 1" type="success">实体</el-tag>
                      <el-tag v-if="item.goods_type == 2" type="danger">虚拟</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="paging-box oe-flex oe-row-between">
          <div>已选择{{ selectIds.length }}张</div>
          <el-pagination
            layout="prev, pager, next"
            :page-size="15"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <template v-if="multiple" #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="getDetermine">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { defineEmit, ref, watch } from 'vue'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqUploadMap, reqShopUserIndex } from '@/api/common'
  import { ElDialog, ElInput, ElButton, ElImage, ElMessage, ElSelect, ElOption } from 'element-plus'
  import PubSub from 'pubsub-js'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const emit = defineEmit(['select', 'update:show', 'update:selectorType'])
  // 兼容外部组件实例
  // 多层model绑定数据
  const show = ref(true)
  const multiple = ref(true)
  const selectorType = ref(1)
  // 实例化调用方法
  const confirm = (props?: { multiple: boolean; selectorType?: number }) => {
    show.value = true
    if (typeof props !== 'undefined') {
      multiple.value = props.multiple
      selectorType.value = props.selectorType || 1
    }
    return new Promise((resolve, reject) => {
      PubSub.subscribe('member-confirm', (message: string, info: any) => resolve(info))
      PubSub.subscribe('member-clone', (message: string, info: any) => reject(info))
    })
  }
  // 搜索
  const searchMember = ref({
    keyword: '',
    current_shop_user_level_id: ''
  })
  const membershipLevel = ref<any[]>([
    { name: '12', id: 12 },
    { name: '1232', id: 11 }
  ])
  // 会员数据
  const imgList = ref<any[]>([])
  // 选择会员
  const { selectItems, selectIds } = useMultipleSelect(imgList)
  // 处理项目选择
  const selectItem = (index: number) => {
    imgList.value[index].select = !imgList.value[index].select
  }
  // 获取会员列表
  const getImgList = async () => {
    const arr = []
    if (searchMember.value.current_shop_user_level_id != '') {
      arr.push(searchMember.value.current_shop_user_level_id)
    }
    const { data } = await reqShopUserIndex({
      page: pagination.currentPage,
      limit: 15,
      search: { keyword: searchMember.value.keyword, current_shop_user_level_id: arr }
    })
    imgList.value = data.data.data
    pagination.total = data.data.total
    imgList.value.forEach((item) => {
      item.select = false
    })
  }
  watch(
    [() => searchMember.value.keyword, () => searchMember.value.current_shop_user_level_id],
    getImgList
  )
  // 搜索会员
  const getSearchBtn = () => {
    pagination.currentPage = 1
    getImgList()
  }
  // 确定按钮
  const getDetermine = () => {
    show.value = false
    emit('select', selectItems.value)
    PubSub.publish('member-confirm', selectItems.value)
  }
  watch(
    show,
    (value) => {
      value && getImgList()

      !value && PubSub.publish('member-clone')
    },
    { immediate: true }
  )
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .picture-picker {
    .select-box {
      position: relative;
      width: 200px;
      height: 200px;
      background-color: red;
      z-index: 2600;
    }
    min-width: 550px;
    .el-menu-item:focus {
      background-color: #fff;
    }
    .custom-upload {
      :deep(.el-upload-dragger) {
        border: none;
        width: 122px;
        height: 32px;
      }
    }
    .picker-top {
      padding: 10px 0;
      :deep(.el-button) {
        min-height: 32px;
        padding: 0 32px;
      }
      .el-input {
        width: 200px;
        height: 32px;
        margin: 0 20px;
      }
      .picker-tips {
        margin-left: 9px;
        color: #8c8c8c;
        font-size: 12px;
      }
    }
    .delete-img {
      float: right;
    }
    .group-title {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content-box {
      display: flex;
      margin-top: 10px;
      :deep(.el-aside) {
        text-align: center;
        min-height: 498px;
        max-height: 600px;
        width: 176px !important;
      }
      .el-menu {
        border: none;
      }
      .el-button {
        min-height: 32px;
        padding: 0 32px;
        margin-bottom: 24px;
      }
      .el-menu-item {
        &.is-active {
          @include menu-active-instruct;
          background: var(--color-primary-light-9);
        }
      }
      .content-right {
        width: 100%;
        position: relative;
      }
      .paging-box {
        position: absolute;
        left: 24px;
        right: 0;
        bottom: 0;
      }
      .picture-box {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 40px;
        .picture-list {
          cursor: pointer;
          margin-left: 22px;
          width: 22%;
        }
        .commodity-item {
          height: 100px;
          margin-bottom: 24px;
          .commodity-item-son {
            position: relative;
            display: flex;
            box-sizing: border-box;
            height: 100%;
            padding: 10px;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            .icon {
              position: absolute;
              right: 0;
              top: 0px;
              width: 16px;
              height: 10px;
              background-color: var(--color-primary);
              z-index: 20;
              .yes {
                position: absolute;
                top: -1px;
                left: 2px;
                color: #fff;
                font-size: 12px;
              }
            }
            &.change-color {
              border-color: var(--color-primary);
            }
            .item-left {
              width: 72px;
              height: 72px;
              margin-right: 10px;
              border-radius: 50%;
              overflow: hidden;
              :deep(.el-image) {
                height: 72px;
                min-width: 72px;
              }
            }
            .item-right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .commodity-name {
                font-size: 14px;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .commodity-price {
                font-size: 12px;
                .price {
                  margin-left: 5px;
                  color: #ff0000;
                }
              }
              .commodity-stock {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                .stock-left {
                  display: flex;
                  .stock {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-left: 5px;
                    color: #ff0000;
                  }
                }
                .stock-right {
                  :deep(.el-tag) {
                    padding: 0;
                    height: 22px;
                    line-height: 18px;
                    border-radius: 0;
                  }
                }
              }
            }
          }
        }
      }
      // .picture-box .picture-list:nth-child(n + 6) {
      //   margin-top: 24px;
      //   margin-bottom: 24px;
      // }
    }
    .dialog-footer {
      .el-button {
        min-height: 32px;
        padding: 0 42px;
      }
    }
  }
</style>
