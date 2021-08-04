<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-26 11:17:43
 * @LastEditTime: 2021-05-13 10:02:48
 * @Description: 订单列表
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="24">
    <el-col :lg="24">
      <div class="oe-flex oe-row-between box-title">
        <div>
          <span class="title-all">{{ title }}</span>
          <span class="title-text"
            >总订单数：{{ total }} 实付金额统计：{{ pageaMoney.toFixed(2) }}元
            <el-button type="text" @click="refreshAmount">刷新</el-button>
            （注：点击刷新后，将计算选中商品的实付金额，计算公式：所选商品实付金额*数量相加 ）
          </span>
        </div>
        <el-button type="primary" class="export-btn" @click="state.export = true">导出</el-button>
      </div>
    </el-col>
    <div class="order-list-box">
      <div class="oe-flex list-title">
        <el-checkbox v-model="isSelectAll" class="selection-all"></el-checkbox>
        <!-- 订单信息标题 -->
        <el-row class="list-title-right">
          <el-col :xl="15" :md="15" :sm="15" :xs="15">
            <el-row>
              <el-col :xl="8" :md="8" :sm="8" :xs="8"> 商品信息</el-col>
              <el-col :xl="4" :md="4" :sm="4" :xs="4"> 数量/单价 </el-col>
              <el-col :xl="4" :md="4" :sm="4" :xs="4"> 维权 </el-col>
              <el-col :xl="4" :md="4" :sm="4" :xs="4"> 订单状态 </el-col>
              <el-col :xl="4" :md="4" :sm="4" :xs="4"> 配送方式 </el-col>
            </el-row>
          </el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3"> 实际付款 </el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3"> 收货人 </el-col>
          <!-- <el-col :xl="2" :md="2" :sm="2" :xs="2"> 下单门店 </el-col> -->
          <!-- <el-col :xl="2" :md="2" :sm="2" :xs="2"> 商户名称 </el-col> -->
          <el-col :xl="3" :md="3" :sm="3" :xs="3"> 操作 </el-col>
        </el-row>
      </div>
      <template v-if="list.length">
        <div class="list-box" v-for="(item, index) in list" :key="index">
          <el-row class="list-header oe-flex">
            <el-col :xl="9" :lg="15" :md="15" :sm="15" :xs="15">
              <div class="oe-flex">
                <el-checkbox v-model="item.select" class="selection-single"></el-checkbox>
                订单编号：{{ item.order_sn
                }}<span class="is-color copy-tetx" @click="getCopy(item.order_sn)"> 复制 </span>
                <!-- 买家：
              <span class="is-color">18589088908</span>
              <span class="is-color contact">联系买家</span>
              <i class="ad-contact is-color"></i> -->
                <span>订单来源：</span>
                <el-image :src="item.img_url" alt=""></el-image>
                <!-- <el-image
                  src="/custom-assets/images/order/h5.png"
                  alt=""
                  v-if="item.platform == 'H5'"
                ></el-image>
                <el-image
                  src="/custom-assets/images/order/applets.png"
                  alt=""
                  v-if="item.platform == 'wxMiniProgram'"
                ></el-image> -->
              </div>
            </el-col>
            <el-col :xl="10" :lg="5" :md="5" :sm="5" :xs="5">
              <div>下单时间：{{ formatUnix(item.createtime) }}</div>
            </el-col>
            <el-col :xl="5" :lg="4" :md="4" :sm="4" :xs="4" class="header-right-box">
              <div class="oe-flex header-right">
                <!-- <el-button type="text">打印小票 </el-button> -->
                <el-button type="text" @click="journalModality(item)">日志</el-button>
                <el-button type="text" class="is-left" @click="openModelity(0, item)"
                  >备注</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-row class="box-content">
            <!-- 多商品 -->
            <el-col :xl="15" :md="15" :sm="15" :xs="15" class="layer-content">
              <template v-for="(item1, index1) in item.orderGoods" :key="Number(index1)">
                <div class="loop-box" :class="item.orderGoods.length == 1 ? 'completely' : ''">
                  <div class="oe-flex commodity-box oe-flex-8">
                    <el-image :src="item1.goods_image" fit="cover" class="order-information-img" />
                    <div class="commodity-right">
                      <div class="commodity-right-text">{{ item1.goods_title }}</div>
                      <el-tag
                        size="mini"
                        color="#D4EBFF"
                        style="color: #55adff"
                        v-if="item.type == '2'"
                        >虚拟</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#FBDDD1"
                        style="color: #ec672e"
                        v-if="item.type == '3'"
                        >卡密</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#E4FFF8"
                        style="color: #1ad370"
                        v-if="item.type == '1'"
                        >实体</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#F4DFD3"
                        style="color: #ef864c"
                        v-if="item.type == '4'"
                        >计时/次</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#F8E8CF"
                        style="color: #dd8a0d"
                        v-if="item.type == '5'"
                        >预约</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#E9D4F9"
                        style="color: #8f29df"
                        v-if="item.type == '6'"
                        >批发</el-tag
                      >
                    </div>
                  </div>
                  <div class="quantity-price oe-flex-4 frame">
                    <div>
                      <div>¥{{ item1.goods_original_price }}</div>
                      <div class="list-bottom">x{{ item1.goods_num }}</div>
                    </div>
                  </div>
                  <div class="oe-flex-4 frame">
                    <div>
                      <div v-if="item1.after_sale_status == '1'">维权中</div>
                      <div v-if="item1.after_sale_status == '0'">-</div>
                      <div v-if="item1.after_sale_status == '2'">维权完成</div>
                      <div
                        v-if="item1.after_sale_status != '0'"
                        @click="jumpprotection(item, item1.id)"
                        class="is-color touch-text list-bottom"
                      >
                        维权详情
                      </div>
                    </div>
                  </div>
                  <div class="state-box oe-flex-4 frame">
                    <div class="state-text" v-if="item.status == '0'">等待付款</div>
                    <template v-if="item.status != '0'">
                      <div class="state-text" v-if="item1.dispatch_status == '1'">等待发货</div>
                      <div class="state-text" v-if="item1.dispatch_status == '2'">等待收货</div>
                      <div v-if="item1.dispatch_status == '-1'">已关闭</div>
                      <div v-if="item1.dispatch_status == '3'">已完成</div>
                    </template>
                  </div>
                  <div class="state-box oe-flex-4 frame">
                    <div>
                      <div v-if="item.delivery_type == '1'">快递</div>
                      <div v-if="item.delivery_type == '3'">自提</div>
                      <div v-if="item.delivery_type == '2'">同城配送</div>
                      <div
                        v-if="item1.express_no"
                        class="is-color list-bottom touch-text"
                        @click="seeLogistics(item1.express_code, item1.express_no)"
                        >物流信息
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-col>
            <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame">
              <div v-if="item.status != 0">
                <div>¥{{ item.pay_fee }}</div>
                <br />
                <div>{{ item.payTypeName }}</div>
              </div>
              <div v-else>-</div>
            </el-col>
            <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame">
              <div>
                <div>{{ item.consignee }}</div>
                <br />
                <div>{{ item.phone }}</div>
              </div>
            </el-col>
            <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame">
              <div v-if="item.status == '1'">
                <div class="oe-flex oe-flex-wrap">
                  <custom-button icon="ad-see" color="#FE6712" @click="getDetails(item)"
                    >查看
                  </custom-button>
                  <el-button
                    size="small"
                    type="primary"
                    icon="ad-immediately"
                    class="btn-deviation"
                    @click="deliverBtn(item)"
                    >立即发货</el-button
                  >
                </div>
                <div style="margin-top: 14px" class="oe-flex oe-flex-wrap">
                  <custom-button icon="ad-refund" color="#ff0000" @click="openRefund(item)"
                    >退款
                  </custom-button>
                  <custom-button
                    icon="ad-change-address"
                    color="#2db6f5"
                    class="public-move-left btn-deviation"
                    @click="changeAddressBtn(item)"
                    >修改地址</custom-button
                  >
                </div>
              </div>
              <custom-button
                v-if="item.status == '3' || item.status == '-1'"
                icon="ad-see"
                color="#FE6712"
                @click="getDetails(item)"
                >查看
              </custom-button>
              <div v-if="item.status == '2'" class="oe-flex oe-flex-wrap">
                <custom-button icon="ad-see" color="#FE6712" @click="getDetails(item)"
                  >查看
                </custom-button>
                <el-button
                  size="small"
                  type="primary"
                  class="btn-deviation"
                  icon="ad-confirm-receipt"
                  @click="openDetermine(0, item)"
                >
                  确定收货
                </el-button>
              </div>
              <div v-if="item.status == '0'">
                <div class="oe-flex oe-flex-wrap">
                  <custom-button icon="ad-see" color="#FE6712" @click="getDetails(item)"
                    >查看
                  </custom-button>
                  <custom-button
                    class="btn-deviation"
                    icon="ad-determine"
                    color="#2db6f5"
                    @click="openDetermine(1, item)"
                    >确认付款</custom-button
                  >
                </div>
                <div style="margin-top: 14px" class="oe-flex oe-flex-wrap">
                  <el-button
                    size="small"
                    type="primary"
                    icon="ad-price-change"
                    @click="restpriceChange(item)"
                    >改价</el-button
                  >
                  <custom-button
                    icon="ad-close"
                    color="#ff0000"
                    class="btn-deviation"
                    @click="openModelity(1, item)"
                    >关闭</custom-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <template v-else>
        <el-empty class="oe-m-t-30" :image-size="200"></el-empty>
      </template>
      <logisticsData
        v-model:show="state.logisticsData"
        :logisticsList="logisticsList"
      ></logisticsData>
      <remarks
        v-model:show="state.remarksState"
        :close="close"
        :currentItem="currentItem"
      ></remarks>
      <immediateDelivery
        v-model:show="state.deliverGoods"
        :currentItem="currentItem"
      ></immediateDelivery>
      <refundClosed v-model:show="state.refundState" :currentItem="currentItem"></refundClosed>
      <confirmReceipt
        v-model:show="state.confirmReceipt"
        :determine="determine"
        :currentItem="currentItem"
      ></confirmReceipt>
      <orderprice v-model:show="state.priceChange" :option="currentItem"></orderprice>
      <journal v-model:show="state.journal" :option="journalData"></journal>
      <consigneeInformation
        v-model:show="state.address"
        :currentItem="currentItem"
      ></consigneeInformation>
      <exportReport v-model:show="state.export" :option="condition"> </exportReport>
    </div>
  </el-row>
</template>
<script setup lang="ts">
  import { computed, defineEmit, defineProps, watch, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElNotification } from 'element-plus'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import exportReport from '@/components/common/order-modality/export-report.vue'
  import logisticsData from '@/components/common/order-modality/logistics-data.vue'
  import remarks from '@/components/common/order-modality/remarks.vue'
  import immediateDelivery from '@/components/common/order-modality/immediate-delivery.vue'
  import refundClosed from '@/components/common/order-modality/refund-closed.vue'
  import confirmReceipt from '@/components/common/order-modality/confirm-receipt.vue'
  import orderprice from '@/components/common/order-modality/order-price.vue'
  import journal from '@/components/common/order-modality/journal.vue'
  import consigneeInformation from '@/components/common/order-modality/consignee-information.vue'
  import { reqjournalData, reqViewLogistics } from '@/api/order'
  import { formatUnix } from '@/utils'
  import { reqMembershipChannel } from '@/api/member'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array as () => any[],
      required: true
    },
    paymentList: {
      type: Array as () => any[],
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    condition: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  })
  const channelList = ref<any[]>([])
  const emit = defineEmit()
  const router = useRouter()
  // 当前点击数据
  const currentItem = ref<any>({})
  // 日志数据
  const journalData = ref<any[]>([])
  // 物流数据
  const logisticsList = ref<any[]>([])
  // 0是备注框 1是关闭框
  const close = ref(0)
  // 0是确定收货 1是确定使用 2是确定付款
  const determine = ref(0)
  // 显示不同模态框
  const state = ref({
    // 备注
    remarksState: false,
    // 退款
    refundState: false,
    // 确定收货
    confirmReceipt: false,
    // 立即发货
    deliverGoods: false,
    // 订单改价
    priceChange: false,
    // 物流信息
    logisticsData: false,
    // 日志
    journal: false,
    // 修改地址
    address: false,
    // 导出
    export: false
  })
  const selectList = ref<any[]>([])
  const pageaMoney = ref(0)
  // 复制按钮
  const getCopy = (number: string) => {
    //新增一个input框
    const input = document.createElement('input')
    //将指定的DOM节点添加到body的末尾
    document.body.appendChild(input)
    //设置input框的value值为直播地址
    input.setAttribute('value', number)
    //选取文本域中的内容
    input.select()
    //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    }
    //删除这个节点
    document.body.removeChild(input)
    ElNotification({
      title: '成功',
      message: '复制成功',
      type: 'success',
      duration: 2000
    })
  }
  // 关闭或者备注模态框
  const openModelity = (num: number, item: any) => {
    currentItem.value = item
    close.value = num
    state.value.remarksState = true
  }
  // 密码确定弹窗
  const openDetermine = (num: number, item: any) => {
    currentItem.value = item
    determine.value = num
    state.value.confirmReceipt = true
  }
  // 退款框
  const openRefund = (item: any) => {
    // refund.value = num
    currentItem.value = item
    state.value.refundState = true
  }
  // 立即发货
  const deliverBtn = (item: any) => {
    currentItem.value = item
    state.value.deliverGoods = true
  }
  // 日志
  const journalModality = async (item: any) => {
    const { data } = await reqjournalData({ order_id: item.id })
    journalData.value = data.data.data
    state.value.journal = true
  }
  // 物流信息根据物流单号和物流编号查询
  const seeLogistics = async (send_express_company_code: string, send_express_sn: string) => {
    const { data } = await reqViewLogistics({ send_express_company_code, send_express_sn })
    logisticsList.value = data.data
    state.value.logisticsData = true
  }
  // 订单改价
  const restpriceChange = (item: any) => {
    currentItem.value = item
    state.value.priceChange = true
  }
  // 修改地址
  const changeAddressBtn = (item: any) => {
    state.value.address = true
    currentItem.value = item
  }
  // 订单详情跳转
  const getDetails = (currentData: any) => {
    router.push({
      path: '/order/management/orderDetails',
      query: {
        id: currentData.id
      }
    })
  }
  // 维权详情跳转
  const jumpprotection = (currentData: any, orderId: string) => {
    router.push({
      path: '/order/management/protection-details',
      query: {
        id: currentData.id,
        orderId
      }
    })
  }
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  // 选中的列表
  const rowList = computed({
    get: () => props.list,
    set: (value) => emit('update:list', value)
  })
  const { isSelectAll, selectIds, selectItems } = useMultipleSelect(rowList)
  // 监听全选
  watch(isSelectAll, () => {
    selectList.value = selectItems.value
  })
  watch(selectItems, () => {
    selectList.value = selectItems.value
  })
  // 刷新当前的金额
  const refreshAmount = () => {
    pageaMoney.value = 0
    selectList.value.forEach((item: any) => {
      pageaMoney.value += Number(item.goods_amount)
    })
  }
  // 父组件的全选
  watch(
    () => props.modelValue,
    (value) => {
      if (isSelectAll.value === value) return false
      isSelectAll.value = value
    }
  )
  // 监听全选
  watch(isSelectAll, (value) => {
    if (value === props.modelValue) return false
    emit('update:modelValue', value)
  })
  watch(props, () => {
    if (props.paymentList) {
      for (let i = 0; i < props.list.length; i++) {
        for (let k = 0; k < channelList.value.length; k++) {
          if (props.list[i].platform == channelList.value[k].code) {
            props.list[i].img_url = channelList.value[k].img_url
            props.list[i].sourceName = channelList.value[k].name
          }
        }
        for (let j = 0; j < props.paymentList.length; j++) {
          if (props.list[i].pay_type == props.paymentList[j].key) {
            props.list[i].payTypeName = props.paymentList[j].name
          }
        }
      }
      // console.log(props.list)
    }
  })
  // 监听全选当前列
  watch(props, () => {
    emit('selectListClick', selectIds)
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .order-list-box {
    width: 100%;
    overflow-x: auto;
    padding-left: 13px;
    .list-title {
      min-width: 1000px;
      font-size: 14px;
      color: #000;
      padding: 0 0 14px 0;
      border-bottom: 1px solid #d9d9d9;
      .list-title-right {
        width: 100%;
      }
    }
    .selection-all {
      margin: 0 19px 0 0px;
      padding-left: 9px;
    }
    .selection-single {
      margin-right: 10px;
    }
    .list-box {
      min-width: 1000px;
      margin-top: 14px;
      font-size: 14px;
      color: #000;
      border: 1px solid #d9d9d9;
      .list-header {
        height: 52px;
        padding-left: 9px;
        background: #f0f0f0;
        .el-image {
          width: 16px;
          height: 16px;
        }
      }
      .header-right-box {
        position: relative;
      }
      .header-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
      }
      .touch-text {
        cursor: pointer;
      }
      .copy-tetx {
        cursor: pointer;
        margin: 0 28px 0 10px;
      }
      .contact {
        cursor: pointer;
        margin: 0 7px 0 10px;
      }
      .list-bottom {
        margin-top: 12px;
      }
    }
    .state-text {
      color: #ff0000;
    }
    .box-content {
      // margin: 10px 0;
      .completely {
        height: 100%;
      }
      .loop-box {
        display: flex;
        padding-left: 37px;
        // width: 100%;

        border-bottom: 1px solid #f5f5f5;
        .commodity-box {
          padding: 15px 0;
          .commodity-right {
            flex: 1;
          }
          .commodity-right-text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .state-box {
          transform: translateX(8px);
        }
        .quantity-price {
          transform: translateX(8px);
        }
      }
      &.box-content .loop-box:last-child {
        border-bottom: none;
      }
      :deep(.el-button) {
        display: flex !important;
        align-items: center;
        max-height: 24px;
        padding: 0 8px;
        min-height: 24px;
        line-height: 24px;
        border-radius: 2px;
        i {
          font-size: 16px;
          padding-right: 3px;
        }
        span {
          line-height: 24px;
          font-size: 12px;
        }
      }
      .btn-bottom {
        margin-top: 10px;
      }
      .order-information-img {
        width: 50px !important;
        height: 50px;
        margin-right: 10px;
      }
      :deep(.el-tag--mini) {
        margin-top: 6px;
        padding: 0;
      }
      .frame {
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-left: 1px solid #f5f5f5;
      }
      .btn-deviation {
        margin-left: 10px;
        // @include self-lg-xl(margin, 14px 0 0 0, 0 0 0 10px);
        // @include self-lg-xl(display, block, inline-block);
      }
      @media only screen and (max-width: 1620px) {
        .btn-deviation {
          margin-left: 0;
        }
      }
    }
    .is-color {
      color: var(--color-primary);
    }
  }
  .box-title {
    margin-bottom: 20px;
    .export-btn {
      min-height: 32px;
      padding: 0 24px;
      font-size: 14px;
      color: #ffffff;
    }
    .title-all {
      font-weight: bold;
      font-size: 16px;
    }
    .title-text {
      margin-left: 6px;
      font-size: 12px;
      color: #000000;
    }
  }
</style>
