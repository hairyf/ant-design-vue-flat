<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:00:06
 * @Description: 全部订单
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="order-head">
    <el-row :gutter="20">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="date-box e-grid oe-flex">
          <!-- <el-select v-model="form.orderSwitch" placeholder="请选择" class="selectFrom" clearable>
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="物流单号" value="物流单号"></el-option>
          </el-select> -->
          <div class="form-text">订单编号</div>
          <el-input
            @keyup.enter="getSearch"
            placeholder="请输入"
            class="oe-flex-1"
            v-model="form.orderNumber"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="date-box e-grid">
          <el-select v-model="form.receivingType" placeholder="请选择" class="selectFrom" clearable>
            <el-option label="收货人姓名" value="收货人姓名"></el-option>
            <el-option label="收货人手机号码" value="收货人手机号码"></el-option>
            <!-- <el-option label="会员昵称" value="会员昵称"></el-option> -->
          </el-select>
          <el-input
            @keyup.enter="getSearch"
            placeholder="请输入"
            v-model="form.consignee"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '9_6' }" :md="8" :sm="12" :xs="12">
        <!-- <el-input placeholder="选择时间" v-model="form.time" class="order-inp"> -->
        <div class="date-box e-grid">
          <!-- <el-select v-model="form.timeType" placeholder="请选择" clearable class="selectFrom">
            <el-option label="支付时间" value="支付时间"></el-option>
            <el-option label="新增时间" value="新增时间"></el-option>
            <el-option label="发货时间" value="发货时间"></el-option>
            <el-option label="完成时间" value="完成时间"></el-option>
          </el-select> -->
          <div class="form-text">下单时间</div>
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            class="oe-flex-1"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
      </el-col>
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">商户名称</div>
          <el-select v-model="form.merchantName" placeholder="全部" class="oe-flex-1" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col> -->
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">商品标题</div>
          <el-input
            placeholder="请输入商品标题"
            class="oe-flex-1"
            v-model="form.merchantTitle"
          ></el-input>
        </div>
      </el-col> -->
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">维权状态</div>
          <el-select v-model="form.safeguarding" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="未维权" value="0"></el-option>
            <el-option label="维权中" value="1"></el-option>
            <el-option label="维权完后" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">商品类型</div>
          <el-select v-model="form.commodityType" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "></el-option>
            <el-option label="实体商品" value="1"></el-option>
            <el-option label="虚拟商品" value="2"></el-option>
            <!-- <el-option label="电子卡密" value="3"></el-option>
            <el-option label="计次时商品" value="4"></el-option>
            <el-option label="批发商品" value="6"></el-option>
            <el-option label="预约商品" value="5"></el-option> -->
          </el-select>
        </div>
      </el-col>
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">配送方式</div>
          <el-select v-model="form.deliveryMode" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value="全部"> </el-option>
            <el-option label="快递" value="快递"> </el-option>
            <el-option label="自提" value="自提"> </el-option>
            <el-option label="同城配送" value="同城配送"> </el-option>
          </el-select>
        </div>
      </el-col> -->
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">支付方式</div>
          <el-select v-model="form.payment" placeholder="全部" class="oe-flex-1" clearable>
            <el-option
              :label="item.name"
              :value="item.key"
              v-for="item in paymentList"
              :key="item.key"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">订单状态</div>
          <el-select v-model="form.orderStatus" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=""> </el-option>
            <el-option label="待付款" value="0"> </el-option>
            <el-option label="待发货" value="1"> </el-option>
            <el-option label="待收货" value="2"> </el-option>
            <el-option label="已完成" value="3"> </el-option>
            <el-option label="已关闭" value="-1"> </el-option>
          </el-select>
        </div>
      </el-col>
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">下单门店</div>
          <el-select v-model="form.orderStore" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value="全部"> </el-option>
          </el-select>
        </div>
      </el-col> -->
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">订单区域</div>
          <el-select v-model="form.region" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value="全部"> </el-option>
            <el-option label="国内" value="国内"> </el-option>
            <el-option label="海外" value="海外"> </el-option>
          </el-select>
        </div>
      </el-col> -->
      <!-- <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="form-text">订单类型</div>
          <el-select v-model="form.orderType" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value="全部"> </el-option>
            <el-option label="普通订单" value="普通订单"> </el-option>
            <el-option label="秒杀订单" value="秒杀订单"> </el-option>
            <el-option label="拼团订单" value="拼团订单"> </el-option>
            <el-option label="积分兑换" value="积分兑换"> </el-option>
            <el-option label="砍价订单" value="砍价订单"> </el-option>
            <el-option label="定金预售订单" value="定金预售订单"> </el-option>
            <el-option label="社区团购" value="社区团购"> </el-option>
            <el-option label="直播带货" value="直播带货"> </el-option>
            <el-option label="批发订单" value="批发订单"> </el-option>
            <el-option label="社群接龙" value="社群接龙"> </el-option>
            <el-option label="预约商品" value="预约商品"> </el-option>
          </el-select>
        </div>
      </el-col> -->
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <el-button type="primary" @click="getSearch">搜索</el-button>
          <div @click="resetBtn" class="reset-text">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="order-box custom-crad-container custom-card-page">
    <order-list
      title="全部订单"
      v-model="selectAll"
      :total="pagination.total"
      :condition="condition"
      :list="tableList"
      @selectListClick="selectListClick"
      :paymentList="paymentList"
    ></order-list>
    <!-- <el-row class="oe-flex oe-row-between order-bottom">
      <el-col :lg="12">
        <div class="oe-flex oe-row-between e-grid">
          <div class="operation-text">
            <el-checkbox v-model="selectAll"> 全选当前页 </el-checkbox>
            <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
            >
              订单导出
            </el-link>
            <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
            >
              打印小票
            </el-link>
            <el-link
              href="javascript:;"
              :underline="false"
              class="public-red public"
              @click="router.push('/order/delivery')"
            >
              批量发货
            </el-link>
          </div>
        </div>
      </el-col>
      <el-col :lg="12">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="e-grid"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
        :current-page="pagination.currentPage"
      >
      </el-pagination>
      </el-col>
    </el-row> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="e-grid paging-box"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      background
      layout="total, prev, pager, next,sizes, jumper"
      :total="pagination.total"
      :current-page="pagination.currentPage"
    >
    </el-pagination>
  </el-card>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch, provide } from 'vue'
  import OrderList from '@/components/common/order-list.vue'
  import { usePagination } from '@/hooks/use-pagination'
  import dayjs from 'dayjs'
  import { reqOrderList } from '@/api/order'
  import { useRoute, useRouter } from 'vue-router'
  import { reqFullPayment } from '@/api/common'
  const router = useRouter()
  const route = useRoute()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref({
    // 订单类型
    orderSwitch: '订单编号',
    // 订单编号
    orderNumber: '',
    // 收货类型
    receivingType: '收货人姓名',
    // 收货人姓名
    consignee: '',
    // 时间类型
    timeType: '支付时间',
    //时间
    time: '' as any,
    // 商户名称
    merchantName: '',
    // 商户标题
    merchantTitle: '',
    // 维权状态
    safeguarding: '',
    // 商品类型
    commodityType: '',
    // 配送方式
    deliveryMode: '',
    // 支付方式
    payment: '',
    // 订单状态
    orderStatus: '',
    // 下单门店
    orderStore: '',
    // 订单区域
    region: '',
    // 订单类型
    orderType: '',
    system_order_no: ''
  })
  const user_id = ref<any>('')
  const paymentList = ref<any>()
  const total_refund_money = ref<any>('')
  // 订单数据
  const tableList = ref([])
  // 订单导出的条件
  const condition = ref({
    // 订单类型
    orderSwitch: '订单编号',
    // 订单编号
    orderNumber: '',
    // 收货类型
    receivingType: '收货人姓名',
    // 收货人姓名
    consignee: '',
    // 时间类型
    timeType: '支付时间',
    //时间
    time: '' as any,
    // 商户名称
    merchantName: '',
    // 商户标题
    merchantTitle: '',
    // 维权状态
    safeguarding: '',
    // 商品类型
    commodityType: '',
    // 配送方式
    deliveryMode: '',
    // 支付方式
    payment: '',
    // 订单状态
    orderStatus: '',
    // 下单门店
    orderStore: '',
    // 订单区域
    region: '',
    // 订单类型
    orderType: '',
    system_order_no: ''
  })
  // 当前是否全选
  const selectAll = ref(false)
  // 当前选中的数据id
  const selectList = ref<any[]>([])
  // 订单列表获取
  const resetOrderList = async () => {
    const afferentTime = ['', '']
    if (form.value.time) {
      afferentTime[0] = dayjs(form.value.time[0]).unix().toString()
      afferentTime[1] = dayjs(form.value.time[1]).unix().toString()
    }
    const optios = {
      order_sn: form.value.orderNumber,
      phone: form.value.receivingType == '收货人手机号码' ? form.value.consignee : '',
      consignee: form.value.receivingType == '收货人姓名' ? form.value.consignee : '',
      status: form.value.orderStatus,
      is_after_sale: form.value.safeguarding,
      pay_type: form.value.payment,
      type: form.value.commodityType,
      express_nos: form.value.orderSwitch == '物流单号' ? form.value.orderNumber : '',
      page: pagination.currentPage,
      limit: pagination.pageSize,
      createtime: afferentTime,
      system_order_no: form.value.system_order_no
    } as any
    // if (form.value.timeType == '支付时间' && (afferentTime[0] || afferentTime[1])) {
    //   optios.paytime = afferentTime
    // }
    // if (form.value.timeType == '新增时间' && (afferentTime[0] || afferentTime[1])) {
    //   optios.createtime = afferentTime
    // }
    // if (form.value.timeType == '发货时间' && (afferentTime[0] || afferentTime[1])) {
    //   optios.shipments_time = afferentTime
    // }
    // if (form.value.timeType == '完成时间' && (afferentTime[0] || afferentTime[1])) {
    //   optios.finish_time = afferentTime
    // }
    if (user_id.value != '') {
      optios.user_id = user_id.value
      optios.total_refund_money = total_refund_money.value
    }
    condition.value = optios
    const { data } = await reqOrderList(optios)
    tableList.value = data.data.data
    tableList.value.forEach((item: any) => {
      item.select = false
    })
    pagination.total = data.data.total
  }
  // 获取支付方式
  reqFullPayment().then((res) => {
    paymentList.value = res.data.data
  })
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    resetOrderList()
  }
  // 当列表值改变时
  const selectListClick = (list: any[]) => {
    selectList.value = list
  }
  // 重置按钮
  const resetBtn = () => {
    form.value.orderSwitch = '订单编号'
    form.value.orderNumber = ''
    form.value.receivingType = '收货人姓名'
    form.value.consignee = ''
    form.value.timeType = '支付时间'
    form.value.time = ''
    form.value.merchantName = ''
    form.value.merchantTitle = ''
    form.value.safeguarding = ''
    form.value.commodityType = ''
    form.value.deliveryMode = ''
    form.value.payment = ''
    form.value.orderStatus = ''
    form.value.orderStore = ''
    form.value.region = ''
    form.value.orderType = ''
    user_id.value = ''
    total_refund_money.value = ''
    form.value.system_order_no = ''
    pagination.currentPage = 1
    resetOrderList()
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    resetOrderList()
  })
  onMounted(() => {
    if (route.query.user_id) {
      user_id.value = route.query.user_id
      total_refund_money.value = route.query.total_refund_money
    }
    if (route.query.time) {
      form.value.time = [(route.query as any).time[0] * 1000, (route.query as any).time[1] * 1000]
    }
    if (route.query.system_order_no) {
      form.value.system_order_no = (route.query as any).system_order_no
    }
    resetOrderList()
  })
  provide('resetOrderList', resetOrderList)
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .order-head {
    :deep(.el-button) {
      min-height: 32px;
      padding: 0 44px;
    }

    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;
    }
  }
  :deep(.el-input__inner) {
    height: 32px;
  }
  :deep(.el-input) {
    line-height: 30px;
  }
  .order-inp {
    :deep(.el-input__inner) {
      color: #000 !important;
    }
    :deep(.el-input-group__prepend) {
      background: #f0f0f0;
    }
  }
  .receiving-inp {
    :deep(.el-input__inner) {
      color: #000 !important;
    }
    :deep(.el-input-group__prepend) {
      background: #f0f0f0;
    }
  }
  .date-box {
    display: flex;
    align-items: center;
    .selectFrom {
      :deep(.el-input__inner) {
        color: #000 !important;
        background: #f0f0f0 !important;
        transform: translateX(2px);
        border-radius: 0 0 2px 2px;
        border-right: none;
      }
    }
    :deep(.el-input__inner) {
      border-radius: 2px 2px 0 0;
    }
    :deep(.el-icon-date) {
      line-height: 24px;
    }
    :deep(.el-range-separator) {
      line-height: 24px;
    }
  }
  .e-grid {
    margin-bottom: 20px;
  }
  .form-text {
    margin-right: 9px;
    font-size: 14px;
    color: #000000;
  }
  .reset-text {
    margin-left: 40px;
    cursor: pointer;
    font-size: 14px;
    color: var(--color-primary);
  }
  .order-box {
    position: relative;
    margin-top: 24px;
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
  .paging-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .order-information {
    position: absolute;
    left: 0;
    padding-right: 49px;
    right: 0;
    margin: 0 auto;
    min-width: 1000px;
    z-index: 1;
    height: 52px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    .order-number {
      margin-left: 55px;
      width: 256px;
    }
    .copy-text {
      cursor: pointer;
      font-size: 14px;
      color: var(--color-primary);
      margin: 0 28px 0 7px;
    }
    .order-number {
      color: var(--color-primary);
    }
    .icon-container {
      margin: 0 100px 0 7px;
      color: var(--color-primary);
      width: 20px;
      height: 20px;
    }
  }
  :deep(.el-pagination) {
    @include self-md-lg(text-align, left, right);
  }
  :deep(.el-tag) {
    border-width: 0;
    border-radius: 0;
  }
  .order-hang {
    color: #ff0000;
  }
  // @media only screen and (max-width: 1485px) {
  //   :deep(.el-pagination) {
  //     transform: translateX(-143px);
  //   }
  // }
  // @media only screen and (max-width: 1200px) {
  //   :deep(.el-pagination) {
  //     transform: translateX(0);
  //   }
  // }
</style>
