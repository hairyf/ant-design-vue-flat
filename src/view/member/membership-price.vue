<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 11:09:57
 * @Description: 会员价
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="price-head">
    <el-form :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="商品名称">
            <div class="oe-flex">
              <el-input
                @keyup.enter="getSearch"
                v-model="form.tradeName"
                class="oe-flex-1"
                placeholder="输入商品名称"
              >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="商品类型">
            <div class="oe-flex">
              <el-select
                v-model="form.commodityType"
                placeholder="全部"
                class="oe-flex-1"
                clearable
              >
                <el-option
                  v-for="item in commodityType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="商品状态">
            <div class="oe-flex">
              <el-select
                v-model="form.commodityStatus"
                placeholder="全部"
                class="oe-flex-1"
                clearable
              >
                <el-option
                  v-for="item in commodityStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <sectionInput
            v-model="form.membershipPrice"
            company="元"
            :titleTetx="'会员价'"
          ></sectionInput>
        </el-col> -->
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <sectionInput
            @keyup.enter="getSearch"
            v-model="form.stock"
            :titleTetx="'库存'"
          ></sectionInput>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <sectionInput
            @keyup.enter="getSearch"
            v-model="form.salesVolume"
            :titleTetx="'销量'"
          ></sectionInput>
        </el-col>

        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <div class="oe-flex e-grid screen-btn">
            <el-button type="primary" @click="getSearch" size="small">搜索</el-button>
            <div @click="resetBtn" class="reset-text">重置条件</div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card shadow="never" class="custom-crad-container custom-card-page">
    <el-table
      ref="multipleTable"
      class="table-box"
      :cell-style="{ background: '#fff' }"
      :data="tableList"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无会员价商品" />
      </template>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="商品" prop="date" min-width="160px">
        <template #default="scope">
          <div class="oe-flex member-name">
            <el-image :src="scope.row.main_picture" fit="cover" class="member-name-img" />
            <div class="member-right">
              <div class="oe-flex">
                <div class="member-text">{{ scope.row.title }}</div>
                <div class="specification" v-if="scope.row.norms_type == 1">多规格</div>
              </div>
              <el-tag
                size="mini"
                color="#D4EBFF"
                style="color: #55adff"
                v-if="scope.row.goods_type == '2'"
                >虚拟</el-tag
              >
              <el-tag
                size="mini"
                color="#FBDDD1"
                style="color: #ec672e"
                v-if="scope.row.goods_type == '3'"
                >卡密</el-tag
              >
              <el-tag
                size="mini"
                color="#E4FFF8"
                style="color: #1ad370"
                v-if="scope.row.goods_type == '1'"
                >实体</el-tag
              >
              <el-tag
                size="mini"
                color="#F4DFD3"
                style="color: #ef864c"
                v-if="scope.row.goods_type == '4'"
                >计时/次</el-tag
              >
              <el-tag
                size="mini"
                color="#F8E8CF"
                style="color: #dd8a0d"
                v-if="scope.row.goods_type == '5'"
                >预约</el-tag
              >
              <el-tag
                size="mini"
                color="#E9D4F9"
                style="color: #8f29df"
                v-if="scope.row.goods_type == '6'"
                >批发</el-tag
              >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" :sort-by="['price']" sortable>
        <template #default="scope">
          <div class="is-color" v-if="scope.row.norms_type != 1">¥{{ scope.row.price }}</div>
          <div class="is-color" v-else
            >¥{{ scope.row.price_interval.min + '~' + scope.row.price_interval.max }}</div
          >
        </template>
      </el-table-column>
      <el-table-column prop="price" label="会员价">
        <template #default="scope">
          <div v-if="scope.row.vip_price.range"
            >¥{{ scope.row.vip_price.range.min.price + '~' + scope.row.vip_price.range.max.price }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" sortable> </el-table-column>
      <el-table-column prop="sales" label="销量" sortable> </el-table-column>
      <el-table-column prop="address" label="商品状态">
        <template #default="scope">
          <div v-if="scope.row.goods_state == 1">待出售 </div>
          <div v-if="scope.row.goods_state == 2">出售中 </div>
          <div v-if="scope.row.goods_state == 5">仓库中 </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <div class="oe-flex list-btn">
            <el-button @click="getOperationBtn(scope.row)" type="primary" icon="ad-settings">
              设置会员价
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="24" style="margin: 0" class="oe-flex oe-row-between order-bottom">
      <el-col :lg="12">
        <div class="oe-flex oe-row-between e-grid">
          <div class="operation-text">
            <el-checkbox v-model="selectAll" @change="handleCheckAllDatChange">
              全选当前页
            </el-checkbox>
            <!-- <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
            >
              不参加
            </el-link> -->
            <el-link
              href="javascript:;"
              :underline="false"
              @click="cancellationPrice"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
            >
              取消会员价
            </el-link>
          </div>
        </div>
      </el-col>
      <el-col :lg="12">
        <el-pagination
          class="e-grid"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="pagination.currentPage"
          layout="total, prev, pager, next,sizes, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-card>
  <memberCancellation
    @resetcommodityList="resetcommodityList"
    v-model:show="cancel"
    :selectList="selectList"
  >
  </memberCancellation>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { useRouter } from 'vue-router'
  import sectionInput from '@/components/common/section-input.vue'
  import { reqMembershipPriceList } from '@/api/member'
  import memberCancellation from './member-modality/member-cancellation.vue'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const router = useRouter()
  // 当前容器元素
  const multipleTable = ref<any>()
  // 商品类型
  const commodityType = reactive([
    {
      label: '实体商品',
      value: '1'
    },
    {
      label: '虚拟商品',
      value: '2'
    }
  ])
  // 取消会员价弹窗
  const cancel = ref(false)
  // 商品状态
  const commodityStatus = reactive([
    {
      label: '全部',
      value: ''
    },
    {
      label: '待出售',
      value: '1'
    },
    {
      label: '出售中',
      value: '2'
    },
    // {
    //   label: '已售罄',
    //   value: '3'
    // },
    {
      label: '仓库中',
      value: '5'
    }
  ])
  // 当前选中的数据
  const selectList = ref<any[]>([])
  const form = reactive({
    // 商品名称
    tradeName: '',
    // 商品状态
    commodityStatus: '',
    // 商品类型
    commodityType: '',
    // 会员价
    membershipPrice: ['', ''],
    // 库存
    stock: ['', ''],
    // 销量
    salesVolume: ['', '']
  })
  // 内容数据
  const tableList = ref<any[]>([])
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    resetcommodityList()
  }
  // 重置条件
  const resetBtn = () => {
    form.tradeName = ''
    form.commodityType = ''
    form.commodityStatus = ''
    form.membershipPrice = ['', '']
    form.stock = ['', '']
    form.salesVolume = ['', '']
    pagination.currentPage = 1
    resetcommodityList()
  }
  // 获取商品列表
  const resetcommodityList = async () => {
    const opions = {
      title: form.tradeName,
      goods_state: form.commodityStatus,
      goods_type: form.commodityType,
      page: pagination.currentPage,
      limit: pagination.pageSize,
      price: form.membershipPrice,
      sales: form.salesVolume,
      stock: form.stock,
      member_equities: 2
    } as any
    const { data } = await reqMembershipPriceList(opions)
    pagination.total = data.data.total
    tableList.value = data.data.data
    tableList.value.forEach((item: any) => {
      item.price = Number(item.price)
    })
  }
  // 取消会员价弹窗
  const cancellationPrice = () => {
    cancel.value = true
  }
  // 操作按钮
  const getOperationBtn = (row: any) => {
    router.push({ path: '/member/member-set-price', query: { id: row.id } })
  }
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 触发底部的全选按钮
  const handleCheckAllDatChange = (state: any) => {
    if (!state || !selectList.value) {
      //点击全选后数据所有选择的数据存到这个数组里边
      multipleTable.value?.clearSelection() //调用这个方法
    } else if (state == true) {
      multipleTable.value?.toggleAllSelection()
    }
  }
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  watch([() => pagination.currentPage, () => pagination.pageSize, () => form.tradeName], () => {
    resetcommodityList()
  })
  watch(selectList, () => {
    if (selectList.value.length == tableList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })

  onMounted(() => resetcommodityList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .price-head {
    :deep(.el-button) {
      padding: 0 44px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
      font-size: 14px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    .screen-btn {
      margin-left: 35px;
    }
    .reset-text {
      cursor: pointer;
      margin-left: 40px;
      color: var(--color-primary);
    }
  }
  :deep(.el-input-group__append) {
    padding: 0 8px;
    line-height: 30px;
  }
  .custom-crad-container {
    margin-top: 24px;
    :deep(.cell) {
      color: #000;
    }
    .member-name {
      .member-name-img {
        width: 50px !important;
        height: 50px;
      }
    }
    .member-text {
      width: 130px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .member-right {
      margin-left: 10px;
    }
    :deep(.el-tag) {
      margin-top: 3px;
      border-width: 0;
      border-radius: 0;
      padding: 0;
    }
    .specification {
      margin-left: 6px;
      font-size: 12px;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 15px;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
    .is-color {
      color: var(--color-primary);
    }
    .touch-tetx {
      cursor: pointer;
    }
    .list-btn {
      :deep(.el-button) {
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 2px 8px;
        min-height: 24px;
        border-radius: 2px;
        i {
          padding-right: 3px;
        }
      }
    }
  }
  .order-bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    margin: 0 auto;
    .operation-text {
      :deep(.el-checkbox__inner) {
        width: 16px;
        height: 16px;
      }
      :deep(.el-checkbox) {
        transform: translateY(1px);
      }
      :deep(.el-checkbox__inner::after) {
        left: 5px;
        top: 2px;
      }
      .public {
        font-size: 14px;
        color: #8c8c8c;
        margin-left: 8px;
      }
      .public-red {
        color: var(--color-primary);
      }
    }
  }
  :deep(.el-pagination) {
    @include self-md-lg(text-align, left, right);
  }
  @media only screen and (max-width: 1485px) {
    :deep(.el-pagination) {
      transform: translateX(-143px);
    }
  }
  @media only screen and (max-width: 1200px) {
    :deep(.el-pagination) {
      transform: translateX(0);
    }
  }
  .e-grid {
    margin-bottom: 20px;
  }
</style>
