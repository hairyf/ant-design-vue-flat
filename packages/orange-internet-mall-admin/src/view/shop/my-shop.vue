<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-01 15:44:54
 * @LastEditTime: 2021-05-13 09:46:28
 * @Description: 我的店铺
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <div class="shop-crad-header oe-flex oe-row-between">
      <el-button size="small" class="add-goods" type="primary" @click="onIncShopTemplate">
        <!-- 新增店铺模板 -->
        <div class="add-button-box">
          <i class="ad-shapePlus"></i>
          <span class="text">新增店铺模板</span>
        </div>
      </el-button>
      <div class="shop-crad-header-options">
        <div class="options-item">
          <span class="tips">模板名称</span>
          <el-input placeholder="请输入模板名称" />
        </div>
      </div>
    </div>
    <el-row class="template-list" :gutter="40">
      <el-col
        :sm="12"
        :lg="8"
        class="template-item"
        v-for="(item, index) in myTemplateList"
        :key="index"
      >
        <el-card shadow="never">
          <div class="header oe-flex oe-row-right">
            <div class="silk-ribbon" v-if="item.is_publish == 1">发布中</div>
            <!-- <span class="preview">
              <i class="ad-qrcode" />
              <span class="text">预览</span>
            </span> -->
            <!-- <i class="more ad-shenglvehao" /> -->
          </div>
          <!-- <el-image
            class="template-image-md hidden-xl-only"
            src="/custom-assets/images/test/Rectangle54.png"
            fit="cover"
          /> -->
          <div class="content oe-flex">
            <!-- <el-image
              class="template-image-lg hidden-lg-and-down"
              src="/custom-assets/images/test/Rectangle54.png"
            /> -->
            <!-- <el-image class="template-image-lg" :src="item.img" /> -->
            <el-image class="template-image-lg" fit="cover" :src="item.img">
              <template #error>
                <div class="image-slot">
                  <el-image
                    fit="cover"
                    src="/custom-assets/images/classificationGoods/default-image.png"
                  />
                </div>
              </template>
            </el-image>
            <div class="right-column oe-flex oe-flex-1">
              <div class="template-info oe-flex-1">
                <div class="title">
                  <el-popover
                    trigger="click"
                    v-model:visible="item.isShow"
                    width="300px"
                    @show="editName = item.name"
                  >
                    <template #reference>
                      <span style="cursor: pointer" @click="item.isShow = !item.isShow">
                        <span>{{ item.name }}</span>
                        <i class="ad-edit" />
                      </span>
                    </template>
                    <div class="oe-flex">
                      <el-input class="oe-m-r-15" v-model="editName" placeholder="请输入内容" />
                      <el-button size="small" @click="onEditName(item.id)">确认</el-button>
                    </div>
                  </el-popover>
                </div>
                <div class="tips-text">
                  <span class="tips">支持渠道：</span>
                  <span class="text">
                    <template v-for="(item, index) in item.shop_channel_code" :key="index">
                      <i v-if="item === 'Wechat'" class="ad-official-account" />
                      <i v-if="item === 'WechatApplets'" class="ad-applets" />
                      <i v-if="item === 'H5'" class="ad-html5" />
                    </template>
                  </span>
                </div>
                <div class="tips-text">
                  <span class="tips">最近修改：</span>
                  <span class="text">{{ formatUnix(item.update_time) }}</span>
                </div>
                <div class="tips-text">
                  <span class="tips">到期时间：</span>
                  <span class="text">{{ saleTypes[item.sale_type] }}</span>
                </div>
                <div class="tips-text">
                  <span class="tips">包含页面：</span>
                  <span class="text">首页、商品详情、会员中心</span>
                </div>
              </div>
              <div class="buttons oe-flex">
                <el-button
                  size="small"
                  class="oe-flex-1"
                  type="primary"
                  @click="router.push({ path: 'decorate', query: { id: item.id } })"
                >
                  装修店铺
                </el-button>
                <el-button
                  size="small"
                  class="oe-flex-1 custom"
                  plain
                  @click="releaseDecorate(item.id)"
                >
                  发布
                </el-button>
              </div>
              <div class="control oe-flex">
                <el-popover placement="bottom" trigger="click">
                  <template #reference>
                    <el-link
                      type="primary"
                      class="oe-m-r-15"
                      :underline="false"
                      href="javascript:;"
                      @click="browseDecorateInfo(item.id)"
                    >
                      预览
                    </el-link>
                  </template>
                  <div class="oe-flex oe-row-center">
                    <qr-code :text="browseQrcode" size="100" />
                  </div>
                </el-popover>
                <el-dropdown v-if="item.is_publish != 1">
                  <i class="ad-shenglvehao" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="delDecorate(item.id)">删除</el-dropdown-item>
                      <!-- <el-dropdown-item @click="showReleaseDialog = true">定时发布</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="oe-flex oe-row-center">
      <el-empty v-if="!myTemplateList.length" class="oe-m-30" description="暂无模板" />
    </div>
    <el-pagination
      class="right-buttom-pagination"
      @size-change="mtHsc"
      @current-change="mtHcc"
      :current-page="mtPn.currentPage"
      :page-sizes="mtPn.pageSizes"
      :page-size="mtPn.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mtPn.total"
    />
  </el-card>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import {
    reqShopTemplateList,
    reqShopDiyTemplate,
    reqSeleteTemplateItem,
    reqDecorateBrowse,
    reqDelDiyTemplate,
    reqDecorateSave
  } from '@/api/shop'
  import { ref } from '@vue/reactivity'
  import { awaitPromise, formatUnix } from '@/utils'
  import { usePagination } from '@/hooks/use-pagination'
  import { watch } from '@vue/runtime-core'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { TemplateSelect } from '@/components/selectors'
  const router = useRouter()
  const saleTypes: Record<number, string> = {
    1: '永久',
    2: '按月',
    3: '按年',
    4: '永久',
    5: '免费'
  }
  // 当前编辑内容
  const editName = ref('')
  // 我的店铺列表
  const myTemplateList = ref<any[]>([])
  // 当前浏览二维码
  const browseQrcode = ref('')
  // 重置模板列表
  const resetMyTemplateList = async () => {
    const { data } = await reqShopTemplateList({
      page: mtPn.currentPage,
      limit: mtPn.pageSize
    })
    myTemplateList.value = data.data.data
    myTemplateList.value.forEach((item: any) => {
      item.isShow = false
    })
    mtPn.total = data.data.total
  }
  // 分页逻辑
  const { pn: mtPn, hsc: mtHsc, hcc: mtHcc } = usePagination({
    pageSizes: [6, 12, 18],
    pageSize: 6
  })
  // 监视内容进行重置
  const mtWatchList = [() => mtPn.currentPage, () => mtPn.pageSize]
  watch(mtWatchList, () => resetMyTemplateList(), { immediate: true })

  // 发布模板(仅发布)
  const releaseDecorate = async (id: Key) => {
    await ElMessageBox.confirm('确定发布该模板吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqShopDiyTemplate({
      id,
      is_timing: 0
    })
    ElMessage.success('发布成功!')
    resetMyTemplateList()
  }
  // 新增店铺模板
  const onIncShopTemplate = async () => {
    const item = await TemplateSelect()
    const { data } = await reqSeleteTemplateItem(item.id)
    router.push({
      path: 'decorate',
      query: { id: data.data.id }
    })
  }
  // 浏览模板
  const browseDecorateInfo = async (id: Key) => {
    const { data } = await reqDecorateBrowse({ type: 'browse', id })
    browseQrcode.value = data.data
  }
  // 删除模板
  const delDecorate = async (id: Key) => {
    await ElMessageBox.confirm('确定要删除该模板?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqDelDiyTemplate(id)
    resetMyTemplateList()
  }
  // 修改模板名称
  const onEditName = async (id: Key) => {
    await reqDecorateSave({
      id,
      name: editName.value
    })
    resetMyTemplateList()
    ElMessage.success('修改成功!')
  }
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
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
      i {
        font-size: 14px;
      }
      // text-align: center;
    }
  }
  .shop-crad-header {
    margin-bottom: 20px;
    &-options {
      text-align: right;
      .options-item {
        display: inline-block;
        margin: 5px 0;
      }
      .tips {
        margin-left: 30px;
        margin-right: 10px;
        font-size: 14px;
        color: #8c8c8c;
      }
      :deep(.el-input) {
        width: auto;
      }
    }
  }
  .template-list {
    margin-bottom: 40px;
    :deep(.el-card) {
      margin-bottom: 25px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      &.is-hover-shadow {
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
      .el-card__body {
        position: relative;
        .silk-ribbon {
          @include top-left-silk-ribbon(#ff0000);
        }
        .header {
          padding-bottom: 15px;
          .preview {
            margin-right: 25px;
            cursor: pointer;
            .text {
              margin-left: 5px;
            }
            font-size: 14px;
            color: var(--color-primary);
          }
          .more {
            font-size: 18px;
            color: #8c8c8c;
          }
        }
        .template-image-md {
          margin-bottom: 25px;
          width: 100%;
          height: 200px;
        }
        .template-image-lg {
          @include self-lg-xl(width, 120px, 169px);
          @include self-lg-xl(height, 200px, 304px);
          margin-right: 28px;
        }
        .content {
          .right-column {
            position: relative;
            @include self-lg-xl(min-height, 200px, 304px);
            align-items: flex-start;
            flex-direction: column;
            .control {
              position: absolute;
              right: 0;
              top: -20px;
            }
            .ad-shenglvehao {
              font-size: 25px;
              color: #8c8c8c;
              cursor: pointer;
            }
            .template-info {
              .title {
                margin-bottom: 14px;
                font-weight: bold;
                font-size: 16px;
                color: #000000;
              }
              .tips-text {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-bottom: 20px;
                .tips {
                  display: inline-block;
                  width: 80px;
                }
              }
            }
            .buttons {
              width: 100%;
              .custom {
                color: var(--color-primary);
                border-color: var(--color-primary);
              }
            }
            .ad-official-account,
            .ad-applets,
            .ad-html5 {
              margin-right: 8px;
              font-size: 20px;
            }
            .ad-official-account {
              color: #03d96a;
            }
            .ad-applets {
              color: #00dfb9;
            }
            .ad-html5 {
              color: #ff800b;
            }
          }
        }
      }
    }
  }
</style>
