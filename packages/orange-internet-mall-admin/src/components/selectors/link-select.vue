<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-19 17:03:34
 * @LastEditTime: 2021-05-13 18:26:46
 * @Description: 链接选择器
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog v-model="show" :title="title" custom-class="link-select">
    <el-tabs class="custom-tabs" v-model="currentTab">
      <el-tab-pane label="店铺页面" name="shop" v-if="option.shop">
        <el-input class="fixed-input" placeholder="请输入名称" />
        <div class="shop-container">
          <div class="link-container" v-for="(item, index) in allLinks" :key="index">
            <div class="link-title" v-if="item.children.length">{{ item.label }}</div>
            <div class="link-list">
              <el-button
                class="oe-m-b-15"
                size="small"
                v-for="(citem, cindex) in item.children"
                :key="cindex"
                @click="
                  onClickHandleItem({
                    type: citem.type,
                    login: citem.value.login,
                    params: citem.value.params,
                    path: citem.value.path,
                    item: citem
                  })
                "
              >
                {{ citem.name || citem.label }}
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品" name="commodity" v-if="option.commodity">
        <div class="commodity-header">
          <el-input
            @change="resetGoodsList"
            v-model="goodSearchText"
            placeholder="请输入商品名称"
            suffix-icon="el-icon-search"
          />
          <el-select
            @change="resetGoodsList"
            size="small"
            v-model="currentProducGroup"
            class="input-width"
            placeholder="选择商品分组"
          >
            <el-option label="全部" value="" />
            <el-option
              v-for="item in producGroups"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-cascader
            @change="resetGoodsList"
            v-model="currentProducType"
            :options="producTypes"
            :props="{ checkStrictly: true }"
            clearable
          />
        </div>
        <div class="commodity-content">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in goodsList" :key="index">
              <div
                class="commodity-item oe-flex"
                @click="
                  onClickHandleItem({
                    type: 'commodity',
                    path: '/pages/commons/shopDetails',
                    params: { id: item.id },
                    item
                  })
                "
              >
                <el-image :src="item.main_picture" />
                <div class="right oe-flex-1 oe-flex oe-row-between">
                  <div class="commodity-title">{{ item.title }}</div>
                  <div class="price-container">
                    <span class="tips">价格 </span>
                    <span class="red-text">¥{{ item.price }}</span>
                  </div>
                  <div class="stock-container">
                    <span class="tips">库存 </span>
                    <span class="red-text">{{ item.stock }}</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-empty class="oe-m-t-30" v-if="!goodsList.length" description="暂无商品" />
          </el-row>
        </div>
        <el-pagination
          background
          class="fixed-pagination"
          @size-change="goodHandleSizeChange"
          @current-change="goodHandleCurrentChange"
          :current-page="goodPaging.currentPage"
          :page-sizes="goodPaging.pageSizes"
          :page-size="goodPaging.pageSize"
          :total="goodPaging.total"
          layout="total, prev, pager, next, jumper"
        />
      </el-tab-pane>
      <el-tab-pane label="优惠券" name="marketing" v-if="option.marketing">
        <div class="coupon-header">
          <el-input placeholder="请输入优惠券名称" suffix-icon="el-icon-search" />
          <el-select
            size="small"
            v-model="currentCouponType"
            class="input-width"
            placeholder="选择优惠券类型"
          >
            <el-option
              v-for="item in couponTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="coupon-content">
          <el-table
            :data="tableList"
            style="width: 100%"
            @current-change="
              onClickHandleItem({
                type: 'marketing',
                path: '',
                params: {},
                item: $event,
                login: true
              })
            "
          >
            <el-table-column prop="type" label="优惠券类型" width="180">
              <template #default="scope">
                <el-tag
                  :style="{ color: scope.row.type == 1 ? '#1ad370' : '#F7C4C4' }"
                  v-if="scope.row.type == 1"
                  :color="scope.row.type == 1 ? '#d1f6e2' : '#FE1919'"
                  type="success"
                  hit
                >
                  {{ scope.row.type == 1 ? '折扣券' : '满减券' }}
                </el-tag>
                <el-tag v-if="scope.row.type == 2" type="danger" hit>满减券</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="优惠券名称" width="180"> </el-table-column>
            <el-table-column prop="content" label="优惠内容"> </el-table-column>
            <el-table-column prop="limit" label="使用限制"> </el-table-column>
            <el-table-column prop="date" label="新增时间"> </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          class="fixed-pagination"
          @size-change="couponHandleSizeChange"
          @current-change="couponHandleCurrentChange"
          :current-page="couponPaging.currentPage"
          :page-sizes="couponPaging.pageSizes"
          :page-size="couponPaging.pageSize"
          :total="couponPaging.total"
          layout="total, prev, pager, next, jumper"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="商品分类" name="classification" v-if="option.classification">
        <nested-sort-table class="nested-sort-table" v-model="classList" :is-drag="false">
          <template #header>
            <div class="oe-flex class-header oe-m-b-20">
              <div style="flex: 4%"> </div>
              <div style="flex: 55%"> 分类名 </div>
              <div style="flex: 40%">图片</div>
            </div>
          </template>
          <template #item="{ item, nestedIndex }">
            <div
              class="class-item oe-flex"
              @click="
                onClickHandleItem({
                  type: 'classification',
                  path: '/pages/commons/searchResult',
                  params: { classId: item.value, id: item.value },
                  item
                })
              "
            >
              <div style="flex: 4%">
                <i v-if="nestedIndex == 0" class="ad-open-class" />
              </div>
              <div style="flex: 55%">
                <i
                  v-if="nestedIndex"
                  class="ad-Frame1 oe-m-r-14"
                  :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                />
                {{ item.label }}
              </div>
              <div style="flex: 40%">
                <el-image
                  v-if="item.image"
                  :src="item.image"
                  style="width: 50px; height: 50px"
                  fit="cover"
                />
              </div>
            </div>
          </template>
        </nested-sort-table>
        <el-empty class="oe-m-t-30" v-if="!classList.length" description="暂无商品" />
      </el-tab-pane>
      <el-tab-pane label="商品分组" name="grouping" v-if="option.grouping">
        <nested-sort-table class="nested-sort-table" v-model="producGroups" :is-drag="false">
          <template #header>
            <div class="oe-flex class-header oe-m-b-20">
              <div style="flex: 4%"> </div>
              <div style="flex: 55%"> 分组名称 </div>
              <div style="flex: 40%">商品数</div>
            </div>
          </template>
          <template #item="{ item }">
            <div
              class="class-item oe-flex"
              @click="
                onClickHandleItem({
                  type: 'grouping',
                  path: '',
                  params: { id: item.value },
                  item
                })
              "
            >
              <div style="flex: 4%"></div>
              <div style="flex: 55%"> {{ item.label }} </div>
              <div style="flex: 40%">{{ item.value }}</div>
            </div>
          </template>
        </nested-sort-table>
        <el-empty class="oe-m-t-30" v-if="!producGroups.length" description="暂无分组" />
      </el-tab-pane>
      <el-tab-pane label="小程序跳转" name="applets" v-if="option.applets">
        <div class="applets-container">
          <el-alert type="warning" :closable="false">
            <div class="oe-m-b-10">此功能仅支持小程序之间的跳转，不支持从其他渠道跳转小程序</div>
            <div>
              跳转其他小程序功能，需先配置可跳转的小程序名单。 可在 渠道 - 小程序 - 编辑中配置
            </div>
          </el-alert>
          <div class="oe-flex oe-m-t-30">
            <div style="width: 100px; font-size: 14px"> 小程序APP ID </div>
            <el-input placeholder="输入小程序APP ID" />
          </div>
          <div class="oe-flex oe-m-t-10">
            <div style="width: 100px; font-size: 14px"> 小程序路径 </div>
            <el-input placeholder="请输入小程序路径" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script lang="ts" setup>
  /**
   * 调用方法:
   * import { LinkSelect } from '@/components/selectors'
   * LinkSelect({option?:{}}).then(res => {})
   * @return {
   *  type: string
   *  lable: string
   *  name: string
   *  value: {
   *    path: string
   *    params: object
   *    item: object
   *  }
   * }
   */
  import { usePagination } from '@/hooks/use-pagination'
  import {
    computed,
    defineEmit,
    defineProps,
    ref,
    watch,
    nextTick,
    onMounted
  } from '@vue/runtime-core'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import { reqGoodsClassList, reqGoodsGroupList, reqGoodsList } from '@/api/commodity'
  import {
    ElTabPane,
    ElInput,
    ElSelect,
    ElOption,
    ElPagination,
    ElButton,
    ElTabs,
    ElTable,
    ElTag,
    ElTableColumn,
    ElDialog,
    ElRow,
    ElCol,
    ElImage
  } from 'element-plus'
  import { identity, pickBy } from 'lodash'
  import {
    baseTabBarLinks,
    commonLinks,
    shopOrderLinks,
    userLinks,
    otherLinks
  } from '@/view/decorate/config/linkIndexes'
  import { publish, subscribe } from 'pubsub-js'
  const props = defineProps({
    // 组件是否显示反馈
    show: {
      type: Boolean,
      required: true
    },
    // 显示什么类型
    option: {
      type: Object,
      default: {
        shop: true,
        commodity: true,
        marketing: false,
        classification: true,
        applets: true,
        grouping: true
      }
    },
    // 选择器标题
    title: {
      type: String,
      default: '链接选择器'
    },
    clone: {
      type: Function
    }
  })
  type LinkOption = {
    type: string
    path: string
    item: Record<string, any>
    params?: Record<string, any>
    login?: boolean
    [key: string]: any
  }
  const emit = defineEmit(['update:show', 'select'])
  // 多层model绑定数据, 兼容外部组件实例
  const showRef = ref(false)
  const show = computed({
    get: () => props.show || showRef.value,
    set: (value) => {
      emit('update:show', value)
      showRef.value = value
    }
  })
  const option = computed(() => props.option)
  // 选择器 tab 切换
  const currentTab = ref('shop')
  // 自动切换为第一项
  watch(show, (value) => {
    if (!value) return
    nextTick(() => {
      currentTab.value = Object.keys(option.value).find((key) => option.value[key]) || ''
    })
  })
  // 弹出弹窗
  onMounted(() => (show.value = true))

  /* 店铺页面选择逻辑块 start */
  const shopLinks = ref([
    {
      label: '店铺基础',
      children: [
        baseTabBarLinks['homePage'],
        baseTabBarLinks['shopMall'],
        { ...commonLinks['searchResult'], label: '全部商品' },
        baseTabBarLinks['shopCart'],
        commonLinks['help'],
        commonLinks['feedbackSubmit'],
        otherLinks['serve'],
        userLinks['footprint'],
        userLinks['wallet'],
        userLinks['followShops'],
        userLinks['coupons'],
        userLinks['addressList'],
        userLinks['userInfo'],
        userLinks['myCoupons'],
        userLinks['star']
      ]
    },
    {
      label: '个人中心',
      children: [
        baseTabBarLinks['personal'],
        shopOrderLinks['myOrders'],
        shopOrderLinks['awaitPayment']
      ]
    }
  ])
  type ItemType = typeof shopLinks.value[number]['children'][number]
  const customViews = ref<ItemType[]>([])
  const allLinks = computed(() => {
    return [...shopLinks.value, { label: '自定义页面', children: customViews.value }]
  })
  publish('notice-get-custom-views')
  subscribe('custom-views', (message: string, value: ItemType[]) => {
    customViews.value = value
    console.log(customViews.value)
  })
  /* 店铺页面选择逻辑块 end */

  /* 商品分类选择逻辑块 start */
  const classList = ref([
    { name: '名称', image: '图片', children: [{ name: '名称', image: '图片', children: [] }] },
    { name: '名称', image: '图片', children: [] },
    { name: '名称', image: '图片', children: [] },
    { name: '名称', image: '图片', children: [] }
  ])
  const resetGoodsClassList = async () => {
    const { data } = await reqGoodsClassList()
    const resetItems = (items?: any[]): any[] => {
      if (!items) {
        return []
      }
      const newItems = items.map((item) => {
        const newItem = {
          value: item.id,
          label: item.name,
          image: item.thumb,
          children: resetItems(item.children)
        }
        return newItem
      })
      return newItems
    }
    const newItems = resetItems(data.data.data)
    producTypes.value = [{ value: '', label: '全部' }, ...newItems]
    classList.value = newItems
  }
  /* 商品分类选择逻辑块 end */

  /* 分组选择逻辑块 start */
  const producGroups = ref<any[]>([])
  const resetGoodsGroupList = async () => {
    const { data } = await reqGoodsGroupList()
    const newItems = data.data.data.map((item) => {
      return {
        value: item.id,
        label: item.name,
        count: item.num
      }
    })
    producGroups.value = newItems
  }
  /* 分组选择选择逻辑块 end */

  /* 商品选择逻辑块 start */
  const goodSearchText = ref('')
  const goodsList = ref<any[]>([])
  const currentProducGroup = ref('')
  const producTypes = ref<any[]>([])
  const currentProducType = ref('')
  const resetGoodsList = async () => {
    const { data } = await reqGoodsList({
      title: goodSearchText.value,
      page: goodPaging.currentPage,
      limit: goodPaging.pageSize,
      groupId: currentProducGroup.value,
      classId: currentProducType.value,
      goods_state: 2
    })
    goodPaging.total = data.data.total
    goodsList.value = data.data.data
  }
  const {
    pagination: goodPaging,
    handleSizeChange: goodHandleSizeChange,
    handleCurrentChange: goodHandleCurrentChange
  } = usePagination()
  const watchCouponList = [() => goodPaging.currentPage, () => goodPaging.pageSize]
  watch(watchCouponList, () => resetGoodsList())
  /* 商品选择逻辑块 end */

  /* 优惠券选择逻辑块 start */
  const couponTypes = ref([
    { value: '1', label: '无' },
    { value: '1', label: '无' },
    { value: '1', label: '无' }
  ])
  const currentCouponType = ref('')
  const tableList = ref([
    {
      type: '1',
      name: '我是优惠券名称',
      content: '我是优惠券使用条件',
      limit: '使用限制',
      date: '2020/03/18 15:22:59'
    }
  ])
  const {
    pagination: couponPaging,
    handleSizeChange: couponHandleSizeChange,
    handleCurrentChange: couponHandleCurrentChange
  } = usePagination()
  /* 优惠券选择逻辑块 end */

  // 点击当前项, 发送事件
  const onClickHandleItem = ({ type, path, params, item, login }: any) => {
    const typeTexts: any = {
      shop: '店铺页面',
      commodity: '商品',
      marketing: '优惠券',
      classification: '商品分类',
      applets: '小程序跳转',
      grouping: '商品分组'
    }
    // 当前链接标签
    const label = typeTexts?.[type] || item.label
    // 链接名称
    const name = item.name || item.title || item.label
    // 链接值
    const value = {
      path: path || '',
      params: params || {},
      data: item || {},
      login
    }
    // 提交信息
    const emitItem = pickBy({ type, value, label, name }, identity)
    // console.log(emitItem)
    emit('select', emitItem)
    show.value = false
    PubSub.publish('link-confirm', emitItem)
  }

  // 初始化数据内容
  const initialization = () => {
    resetGoodsGroupList()
    resetGoodsClassList()
    resetGoodsList()
  }
  initialization()
  // 监视显示则重新刷新数据
  watch(show, (value) => {
    !value && PubSub.publish('link-clone')
    !value && props.clone?.()
  })
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .link-select {
    &.el-dialog {
      width: 850px !important;
    }
    .link-container {
      .link-title {
        margin-bottom: 14px;
        font-size: 14px;
      }
      .link-list {
        margin-bottom: 25px;
      }
    }
    .el-input {
      width: auto !important;
      margin-right: 20px;
    }
    .commodity-content {
      margin-top: 20px;
      padding-bottom: 30px;
    }
    .commodity-item {
      cursor: pointer;
      padding: 10px;
      border-radius: 2px;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
      margin-bottom: 20px;
      &:hover {
        border: 1px solid var(--color-primary);
      }
      .right {
        height: 72px;
        flex-direction: column;
        align-items: flex-start;
      }
      .el-image {
        margin-right: 10px;
        width: 72px;
        height: 72px;
        flex-shrink: 0;
      }
      .commodity-title {
        @include text-ellipsis(80px);
        font-size: 14px;
        color: #000000;
      }
      .tips {
        font-size: 12px;
      }
      .red-text {
        font-size: 12px;
        color: #ff0000;
      }
    }
    .coupon-content,
    .commodity-content,
    .shop-container,
    .applets-container,
    .nested-sort-table {
      margin-top: 20px;
      padding-bottom: 50px;
      min-height: 300px;
    }
    .class-header {
      padding: 18px;
      border-bottom: 1px solid #c4c4c4;
    }
    .class-item {
      padding: 18px;
      margin-bottom: 10px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--color-primary);
      }
      .ad-open-class {
        color: var(--color-primary);
      }
    }
    .fixed-input.el-input {
      width: auto;
      position: absolute;
      right: 0;
      top: -60px;
    }
    .fixed-pagination {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
</style>
