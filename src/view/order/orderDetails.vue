<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:18:41
 * @Description: 订单详情新版本
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="oe-flex process-box">
    <div class="oe-flex-col process-box-left" v-if="detailsData">
      <div class="process">
        <div class="process-text"> 会员下单 </div>
        <div class="process-date">{{ formatUnix(detailsData.createtime) }}</div>
        <!-- <div class="triangle"></div> -->
      </div>
      <div class="process" v-if="detailsData.status == -1">
        <div class="process-text">关闭订单</div>
        <div class="process-date" v-if="detailsData.cancel_time">{{
          formatUnix(detailsData.cancel_time)
        }}</div>
        <div class="triangle"></div>
      </div>
      <template v-else>
        <div class="process">
          <div :class="['process-text', detailsData.status == 0 ? 'current-status' : '']">
            会员付款
          </div>
          <div class="process-date" v-if="detailsData.status >= 1">{{
            formatUnix(detailsData.paytime)
          }}</div>
          <div class="triangle" v-if="detailsData.status == 0"></div>
        </div>
        <div class="process">
          <div :class="['process-text', detailsData.status == 1 ? 'current-status' : '']">
            卖家发货
          </div>
          <template v-if="detailsData.status >= 1">
            <div class="process-date" v-if="detailsData.status >= 2">{{
              formatUnix(detailsData.shipments_time)
            }}</div>
            <div class="triangle" v-if="detailsData.status == 1"></div>
          </template>
        </div>
        <div class="process">
          <div :class="['process-text', detailsData.status == 2 ? 'current-status' : '']">
            交易完成
          </div>
          <template v-if="detailsData.status == 2">
            <div class="process-date" v-if="detailsData.status == 3">{{
              formatUnix(detailsData.take_delivery_time)
            }}</div>
            <div class="triangle"></div>
          </template>
          <template v-if="detailsData.status == 3">
            <div class="process-date" v-if="detailsData.status == 3">{{
              formatUnix(detailsData.take_delivery_time)
            }}</div>
            <div class="triangle"></div>
          </template>
        </div>
      </template>
    </div>
    <el-card shadow="never" class="oe-flex-1 process-box-right">
      <el-row class="information-box">
        <el-col :xl="8" :md="9" :xs="9" :sm="9">
          <div class="oe-flex-1 order-information">
            <div class="right-title">订单信息</div>
            <div class="information-list">
              <div class="oe-flex">
                <span>订单状态</span>
                <span class="e-left oe-flex-1" v-if="detailsData.status == '1'">等待发货</span>
                <span class="e-left oe-flex-1" v-if="detailsData.status == '2'">等待收货</span>
                <span class="e-left oe-flex-1" v-if="detailsData.status == '0'">等待付款</span>
                <span class="e-left oe-flex-1" v-if="detailsData.status == '-1'">已关闭</span>
                <span class="e-left oe-flex-1" v-if="detailsData.status == '3'">已完成</span>
              </div>
              <div class="public-box oe-flex">
                <span>订单编号</span>
                <span class="e-left oe-flex-1">{{ detailsData.order_sn }}</span>
              </div>
              <!-- <div class="public-box oe-flex">
                  <span>交易单号</span><span class="e-left oe-flex-1">¥11.00</span>
                </div> -->
              <!-- <div class="public-box oe-flex">
                  <span>订单类型</span><span class="e-left oe-flex-1">我要退款</span>
                </div> -->
              <div class="public-box oe-flex">
                <span>订单来源</span>
                <span class="e-left oe-flex-1">{{ detailsData.sourceName }}</span>
              </div>
              <div class="public-box oe-flex">
                <span>支付状态</span>
                <!-- <span class="e-left oe-flex-1 hang-air" v-if="detailsData.status == -1"
                  >已取消</span
                > -->
                <span class="e-left oe-flex-1 hang-air" v-if="detailsData.status == 0">未支付</span>
                <span class="e-left oe-flex-1 paid" v-if="detailsData.status > 0">已支付</span>
                <!-- <span class="e-left oe-flex-1 hang-air" v-if="detailsData.status == 2">待收货</span> -->
                <!-- <span class="e-left oe-flex-1 paid" v-if="detailsData.status == 3">已完成</span> -->
              </div>
              <div class="public-box oe-flex">
                <span>支付方式</span>
                <template v-if="detailsData.pay_type && detailsData.status > 0">
                  <span class="e-left oe-flex-1">
                    {{ detailsData.payTypeName }}
                  </span>
                </template>
                <span v-else class="e-left oe-flex-1">无</span>
              </div>
            </div>
            <div class="btn-box" v-if="detailsData.status == '0'">
              <el-button type="primary" @click="openDetermine(1)">确认付款</el-button>
              <el-button @click="restpriceChange">订单改价</el-button>
              <el-button @click="openModelity">关闭订单</el-button>
            </div>
            <div class="btn-box" v-if="detailsData.status == '1'">
              <el-button type="primary" @click="deliverBtn">确认发货</el-button>
              <el-button @click="state.refundState = true">退款</el-button>
            </div>
            <div class="btn-box" v-if="detailsData.status == '2'">
              <el-button type="primary" @click="openDetermine(0)">确认收货</el-button>
            </div>
          </div>
        </el-col>
        <el-col :xl="8" :md="9" :xs="9" :sm="9">
          <div class="oe-flex-1 receiving-address">
            <div class="right-title">会员及收货信息</div>
            <div class="receiving-address-list">
              <!-- <div class="oe-flex">
                <span>会员</span>
                <span class="e-left oe-flex-1 e-color">{{ detailsData.phone }}</span>
              </div> -->
              <div class="oe-flex">
                <span>会员备注</span>
                <el-button plain class="e-left e-color" @click="seeRemarks(1)"
                  >查看会员备注</el-button
                >
              </div>
              <div class="public-box oe-flex">
                <span>配送方式</span
                ><span class="e-left oe-flex-1" v-if="detailsData.delivery_type == '1'">快递</span>
                <span class="e-left oe-flex-1" v-if="detailsData.delivery_type == '3'">自提</span>
                <span class="e-left oe-flex-1" v-if="detailsData.delivery_type == '2'"
                  >同城配送</span
                >
              </div>
              <div class="public-box oe-flex">
                <span>收货人</span><span class="e-left oe-flex-1">{{ detailsData.consignee }}</span>
              </div>
              <div class="public-box oe-flex">
                <span>收货地址</span>
                <span class="e-left oe-flex-1">
                  {{ detailsData.province_name }} {{ detailsData.city_name }}
                  {{ detailsData.area_name }} {{ detailsData.address }}
                </span>
              </div>
              <div class="public-box oe-flex">
                <span>手机号码</span><span class="e-left oe-flex-1">{{ detailsData.phone }}</span>
              </div>
              <div class="public-box logistics-box">
                <div>物流信息</div>
                <div class="logistics-box-right">
                  <div v-for="(item, index) in detailsData.orderGoods" :key="Number(index)">
                    <template v-if="item.express_name">
                      <span class="e-left oe-flex-1">
                        {{ item.express_name }} {{ item.express_no }}
                        <i
                          class="e-color"
                          style="cursor: pointer"
                          @click="getCopy(item.express_no)"
                        >
                          复制
                        </i>
                      </span>
                      <el-button @click="seeLogistics(item.express_code, item.express_no)">
                        查看物流信息
                      </el-button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-box" v-if="detailsData.status == '1'">
              <el-button @click="changeAddressBtn">修改收货地址</el-button>
              <!-- <el-button @click="state.consignee = true">测试收货人信息</el-button> -->
            </div>
            <div class="btn-box" v-if="detailsData.status == '2'">
              <!-- <el-button @click="state.logisticsData = true">查看物流信息</el-button> -->
              <!-- <el-button @click="state.consignee = true">测试收货人信息</el-button> -->
            </div>
          </div>
        </el-col>
        <el-col :xl="8" :md="6" :xs="6" :sm="6">
          <div class="oe-flex-1 receiving-address">
            <div class="right-title">其他</div>
            <div class="public-box oe-flex" v-if="detailsData.status >= 1">
              <span>卖家备注</span>
              <el-button plain class="e-left e-color" @click="seeRemarks(0)">
                查看卖家备注
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <!-- 协商记录 -->
  <!-- <el-row class="e-grid">
    <el-col>
      <el-card shadow="never" class="consult-box">
        <div class="consult-box-title">协商记录</div>
        <div class="consult-box-list">
          <div class="list-date"> 2020-12-30 09:53:58</div>
          <div class="list-second">商家 同意退款给买家，本次维权结束</div>
          <div class="list-public">退款金额： 198.00</div>
        </div>
        <div class="consult-box-list">
          <div class="list-date"> 2020-12-30 09:53:58</div>
          <div class="list-second">商家 已同意退款退货申请,等待买家退货</div>
          <div class="list-public">
            退货地址： 广东省深圳市福田区香蜜湖街道大生体育园 sadasd11111
          </div>
        </div>
        <div class="consult-box-list">
          <div class="list-date"> 2020-12-30 09:53:58</div>
          <div class="list-second">
            买家：<span class="e-color">18589078901</span> 发起了退款退货申请,等待商家处理
          </div>
          <div class="list-public"> 处理方式：仅退款</div>
          <div class="list-public"> 退款金额：¥11.00</div>
          <div class="list-public"> 退款说明：我要退款</div>
        </div>
      </el-card>
    </el-col>
  </el-row> -->
  <!-- 预约码插件加 -->
  <!-- <el-row>
    <el-col>
      <el-card shadow="never" class="product write-card e-grid">
        <div class="product-title">预约码</div>
        <div class="product-box oe-flex">
          <div class="oe-flex-1">预约码</div>
          <div class="oe-flex-1">状态</div>
          <div class="oe-flex-1">操作</div>
        </div>
        <div class="product-content oe-flex">
          <div class="oe-flex-1">538404709206</div>
          <div class="oe-flex-1">未使用</div>
          <div class="oe-flex-1 e-color">确认使用</div>
        </div>
      </el-card>
    </el-col>
  </el-row> -->
  <!-- 商品信息 -->
  <el-row>
    <el-col>
      <el-card shadow="never" class="product e-grid">
        <div class="product-title">商品信息</div>
        <div class="product-box oe-flex">
          <div class="oe-flex-2 list-box">商品</div>
          <div class="oe-flex-1 list-box">售卖价</div>
          <div class="oe-flex-1 list-box">数量</div>
          <div class="oe-flex-1 list-box">商品规格</div>
          <div class="oe-flex-1 list-box">优惠金额</div>
          <div class="oe-flex-1 list-box">小计</div>
          <div class="oe-flex-1 list-box">状态</div>
        </div>
        <div
          class="product-content oe-flex"
          v-for="(item, index) in detailsData.orderGoods"
          :key="Number(index)"
        >
          <div class="oe-flex-2 oe-flex list-box">
            <el-image :src="item.goods_image" fit="cover" class="content-img" />
            <div class="content-left">
              <div class="content-left-text">{{ item.goods_title }}</div>
              <el-tag
                size="mini"
                color="#D4EBFF"
                style="color: #55adff"
                v-if="detailsData.type == '2'"
                >虚拟</el-tag
              >
              <el-tag
                size="mini"
                color="#FBDDD1"
                style="color: #ec672e"
                v-if="detailsData.type == '3'"
                >卡密</el-tag
              >
              <el-tag
                size="mini"
                color="#E4FFF8"
                style="color: #1ad370"
                v-if="detailsData.type == '1'"
                >实体</el-tag
              >
              <el-tag
                size="mini"
                color="#F4DFD3"
                style="color: #ef864c"
                v-if="detailsData.type == '4'"
                >计时/次</el-tag
              >
              <el-tag
                size="mini"
                color="#F8E8CF"
                style="color: #dd8a0d"
                v-if="detailsData.type == '5'"
                >预约</el-tag
              >
              <el-tag
                size="mini"
                color="#E9D4F9"
                style="color: #8f29df"
                v-if="detailsData.type == '6'"
                >批发</el-tag
              >
            </div>
          </div>
          <div class="oe-flex-1 list-box">¥{{ item.goods_original_price }}</div>
          <div class="oe-flex-1 list-box">X{{ item.goods_num }}</div>
          <div class="oe-flex-1 list-box">{{
            item.goods_sku_text == 0 ? '无' : item.goods_sku_text
          }}</div>
          <div class="oe-flex-1 list-box">¥{{ item.discount_fee }}</div>
          <div class="oe-flex-1 list-box"
            >¥{{ (item.goods_price * item.goods_num).toFixed(2) }}</div
          >
          <div class="oe-flex-1 list-box" v-if="detailsData.status == '0'">等待付款</div>

          <template v-if="detailsData.status != '0'">
            <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '1'">等待发货</div>
            <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '2'">等待收货</div>
            <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '-1'">已关闭</div>
            <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '3'">已完成</div>
          </template>
        </div>
        <div class="total-box">
          <div class="total-box-text1">商品总计：¥{{ detailsData.goods_amount }}</div>
          <div class="total-box-text1">运费：¥{{ detailsData.dispatch_amount }}</div>
          <div class="total-box-text1">余额抵扣：¥0.00</div>
          <div class="total-box-text1">积分抵扣：¥0.00</div>
          <div class="total-box-text2">实付款：¥{{ detailsData.pay_fee }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 商品核心卡插件加 -->
  <!-- <el-row>
    <el-col>
      <el-card shadow="never" class="product write-card">
        <div class="product-title">商品核销卡</div>
        <div class="product-box oe-flex">
          <div class="oe-flex-1">核销卡</div>
          <div class="oe-flex-1">到期时间</div>
          <div class="oe-flex-1">可核销次数</div>
          <div class="oe-flex-1">已核销次数</div>
          <div class="oe-flex-1">剩余次数</div>
          <div class="oe-flex-1">核销间隔</div>
          <div class="oe-flex-1">操作</div>
        </div>
        <div class="product-content oe-flex oe-row-center">
          <div class="oe-flex-1 oe-flex">
            <img src="/custom-assets/images/order/Rectangle76.png" class="content-img" alt="" />
            <div class="content-left">
              <div class="content-left-text"> 文章文章 </div>
              <el-tag size="mini" color="#D4EBFF" style="color: #1ad370">实体</el-tag>
            </div>
          </div>
          <div class="oe-flex-1">2021-03-05 09:43:58</div>
          <div class="oe-flex-1">不限次数</div>
          <div class="oe-flex-1">0</div>
          <div class="oe-flex-1">不限次数</div>
          <div class="oe-flex-1">5小时</div>
          <div class="oe-flex-1 e-color">核销记录</div>
          <div style="line-height: 56px">暂无数据</div>
        </div>
      </el-card>
    </el-col>
  </el-row> -->
  <consigneeInformation
    :currentItem="detailsData"
    v-model:show="state.consignee"
  ></consigneeInformation>
  <logisticsData v-model:show="state.logisticsData" :logisticsList="logisticsList"></logisticsData>
  <!-- <modifyLogistics v-model:show="state.modifyLogistics"></modifyLogistics> -->
  <confirmReceipt
    v-model:show="state.confirmReceipt"
    :determine="determine"
    :currentItem="detailsData"
    @resetOrderDetails="resetOrderDetails"
  ></confirmReceipt>
  <viewNotes
    v-model:show="state.notes"
    :isIdentity="isIdentity"
    :remarksVal="isIdentity == 0 ? detailsData.memo : detailsData.remark"
  ></viewNotes>
  <orderprice
    v-model:show="state.priceChange"
    @resetOrderDetails="resetOrderDetails"
    :option="detailsData"
  ></orderprice>
  <remarks
    v-model:show="state.remarksState"
    :close="1"
    @resetOrderDetails="resetOrderDetails"
    :currentItem="detailsData"
  ></remarks>
  <consigneeInformation
    v-model:show="state.address"
    @resetOrderDetails="resetOrderDetails"
    :currentItem="detailsData"
  ></consigneeInformation>
  <immediateDelivery
    v-model:show="state.deliverGoods"
    :currentItem="detailsData"
    @resetOrderDetails="resetOrderDetails"
  ></immediateDelivery>
  <refundClosed
    v-model:show="state.refundState"
    @resetOrderDetails="resetOrderDetails"
    :currentItem="detailsData"
  ></refundClosed>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import refundClosed from '@/components/common/order-modality/refund-closed.vue'
  import remarks from '@/components/common/order-modality/remarks.vue'
  import consigneeInformation from '@/components/common/order-modality/consignee-information.vue'
  import logisticsData from '@/components/common/order-modality/logistics-data.vue'
  import modifyLogistics from '@/components/common/order-modality/modify-logistics.vue'
  import confirmReceipt from '@/components/common/order-modality/confirm-receipt.vue'
  import orderprice from '@/components/common/order-modality/order-price.vue'
  import immediateDelivery from '@/components/common/order-modality/immediate-delivery.vue'
  import viewNotes from '@/components/common/order-modality/viewNotes.vue'
  import { reqOrderDetail, reqViewLogistics } from '@/api/order'
  import { ElNotification } from 'element-plus'
  import { formatUnix } from '@/utils'
  import { reqFullPayment } from '@/api/common'
  import { reqMembershipChannel } from '@/api/member'
  const route = useRoute()
  // 显示不同模态框
  const state = ref({
    // 退款并关闭
    refundState: false,
    // 确定收货
    confirmReceipt: false,
    // 立即发货
    deliverGoods: false,
    // 订单改价
    priceChange: false,
    // 物流信息
    logisticsData: false,
    // 修改物流信息
    modifyLogistics: false,
    // 收货人信息
    consignee: false,
    // 查看备注的弹窗
    notes: false,
    // 关闭
    remarksState: false,
    // 修改地址
    address: false
  })
  const paymentList = ref<any[]>([])
  const channelList = ref<any[]>([])
  const determine = ref(0)
  // 物流信息
  const logisticsList = ref<any[]>([])
  // 详情数据
  const detailsData = ref<any>({})
  // 0是卖家备注 1会员备注
  const isIdentity = ref(0)
  // 密码确定弹窗
  const openDetermine = (num: number) => {
    determine.value = num
    state.value.confirmReceipt = true
  }
  // 获取订单详情
  const resetOrderDetails = async () => {
    const { data } = await reqOrderDetail({ id: route.query.id })
    detailsData.value = data.data.data[0]
    for (let k = 0; k < channelList.value.length; k++) {
      if (detailsData.value.platform == channelList.value[k].code) {
        detailsData.value.sourceName = channelList.value[k].name
      }
    }
    for (let j = 0; j < paymentList.value.length; j++) {
      if (detailsData.value.pay_type == paymentList.value[j].key) {
        detailsData.value.payTypeName = paymentList.value[j].name
      }
    }
  }
  // 订单改价
  const restpriceChange = () => {
    state.value.priceChange = true
  }
  // 关闭模态框
  const openModelity = () => {
    state.value.remarksState = true
  }
  // 立即发货
  const deliverBtn = () => {
    state.value.deliverGoods = true
  }
  // 修改地址
  const changeAddressBtn = () => {
    state.value.address = true
  }
  // 物流信息根据物流单号和物流编号查询
  const seeLogistics = async (send_express_company_code: string, send_express_sn: string) => {
    const { data } = await reqViewLogistics({ send_express_company_code, send_express_sn })
    logisticsList.value = data.data
    state.value.logisticsData = true
  }
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
  // 查看备注
  const seeRemarks = (num: number) => {
    isIdentity.value = num
    state.value.notes = true
  }
  // 获取支付方式
  reqFullPayment().then((res) => {
    paymentList.value = res.data.data
  })
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  onMounted(() => resetOrderDetails())
</script>
<style lang="scss" scoped>
  .process-box {
    padding-left: 20px;
    margin-bottom: 24px;
    .process-box-left {
      min-width: 90px;
      min-height: 463px;
    }
    .process-box-right {
      padding-left: 40px;
      :deep(.el-card__body) {
        min-height: 443px;
      }
      .logistics-box {
        display: flex;
        font-size: 14px;
        color: #000;
        .logistics-box-right {
          line-height: 40px;
          margin-top: -12px;
        }
      }
      .information-box {
        display: flex;
        margin-top: 10px;
        span {
          min-width: 56px;
          font-size: 14px;
          color: #000;
        }
        .public-box {
          margin-top: 27px;
        }
        .e-left {
          margin-left: 14px;
        }
      }
      .right-title {
        margin-bottom: 35px;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
      }
      .information-list,
      .receiving-address-list {
        overflow-x: auto;
        min-height: 320px;
        border-right: 1px solid #d9d9d9;
      }
      .receiving-address {
        padding: 0 20px;
      }
      .paid {
        color: #1ad370;
      }
      .information-list {
        padding-right: 20px;
        .hang-air {
          color: #ff0000;
        }
      }
      .btn-box {
        margin-top: 45px;
      }
    }
  }
  :deep(.el-button) {
    padding: 5px 14px;
    min-height: 32px;
  }
  .process {
    padding: 30px 0;
    position: relative;
    min-width: 68px;
    .process-text {
      text-align: right;
      font-size: 16px;
      color: #8c8c8c;
    }
    .current-status {
      font-size: 24px;
      color: #000000;
      font-family: PingFang SC;
    }
    .process-date {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #8c8c8c;
    }
    .triangle {
      position: absolute;
      right: -42px;
      top: 20px;
      width: 0;
      height: 0;
      border-top: 23px solid transparent;
      border-right: 32px solid #fff;
      border-bottom: 23px solid transparent;
    }
  }
  .product {
    .list-box {
      padding: 0 10px;
    }
    position: relative;
    .product-title {
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
    .product-box {
      font-size: 14px;
      color: #000;
      margin-top: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid #d9d9d9;
    }
    .product-content {
      margin: 14px 0;
      font-size: 14px;
      color: #000;
      .content-img {
        width: 50px;
        height: 50px;
      }
      .content-left {
        flex: 1;
        margin-left: 10px;
      }
      .content-left-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      :deep(.el-tag) {
        margin-top: 6px;
        border-width: 0;
        border-radius: 0;
      }
    }
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;
      min-height: 265px;
    }
    .total-box {
      margin-top: 42px;
      padding-bottom: 24px;
      float: right;
      // position: absolute;
      // bottom: 24px;
      // right: 32px;
      .total-box-text1 {
        text-align: right;
        font-size: 14px;
        line-height: 32px;
        color: #000000;
      }
      .total-box-text2 {
        margin: 14px 0 0 9px;
        font-weight: bold;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .write-card {
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;
      min-height: 216px;
    }
    .product-content {
      margin: 28px 0;
    }
  }
  .consult-box {
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;
      min-height: 382px;
    }
    .consult-box-title {
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin-bottom: 35px;
    }
    .consult-box-list {
      padding-bottom: 28px;
      margin-top: 27px;
      border-bottom: 1px solid #d9d9d9;
      .list-date {
        font-weight: bold;
        font-family: PingFang SC;
        font-size: 16px;
        color: #000;
      }
      .list-second {
        font-size: 14px;
        color: #000;
        margin-top: 7px;
      }
      .list-public {
        font-size: 14px;
        color: #000;
        margin-top: 14px;
      }
    }
  }
  .consult-box:first-child(.consult-box-left) {
    margin-top: 0;
  }
  :deep(.el-step__icon) {
    font-size: 20px;
  }
  .e-grid {
    margin-bottom: 20px;
  }
  .e-color {
    color: var(--color-primary);
  }
</style>
