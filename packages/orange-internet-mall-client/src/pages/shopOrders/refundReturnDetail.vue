<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-13 16:05:16
 * @Description: 换货详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->

<template>
  <div class="refund-return-detail" v-if="legitimateDetail.afterSales">
    <div class="header-container u-flex u-row-center">
      <!-- 等待商家处理换货申请 -->
      <template v-if="legitimateDetail.afterSales.status == 0">
        <div class="title u-flex">
          <u-icon size="40" class="u-m-r-12" name="clock" color="#ffffff" />
          <span class="u-m-l-20">等待商家处理换货申请</span>
        </div>
        <div class="tips-text">
          剩余：
          <u-count-down
            font-size="24rpx"
            separator-size="24rpx"
            bg-color="#FF5F2C"
            separator-color="#fff"
            color="#fff"
            separator="zh"
            :timestamp="merchantTime"
            :show-seconds="false"
          ></u-count-down>
        </div>
      </template>
      <!-- 商家已拒绝您的申请 -->
      <template v-if="legitimateDetail.afterSales.status == -1">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-clone" />
          <span class="u-m-l-20">商家已拒绝您的申请</span>
        </div>
        <div class="tips u-m-t-24">
          您的申请未通过，可修改换货申请后在有效期内再次申请
        </div>
      </template>
      <!-- 申请已关闭 -->
      <template v-if="legitimateDetail.afterSales.status == -2">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-clone" />
          <span class="u-m-l-20">申请已关闭</span>
        </div>
        <div class="tips-container">
          <p class="tips-text">您已撤销此次订单换货申请，若您的问题未解</p>
          <p class="tips-text">决，可以在有效期内再次申请</p>
        </div>
      </template>
      <!-- 请寄出换货商品给商家 -->
      <template v-if="legitimateDetail.afterSales.status == 1">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-delivery" />
          <span class="u-m-l-20">请寄出换货商品给商家</span>
          <div class="tips-text u-text-center u-m-t-15">
            剩余：
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FF5F2C"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="mailTime"
              :show-seconds="false"
            ></u-count-down>
          </div>
        </div>
      </template>
      <!-- 待商家收货 -->
      <template v-if="legitimateDetail.afterSales.status == 3">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-delivery" />
          <span class="u-m-l-20">待商家收货</span>
          <div class="tips-text u-text-center u-m-t-15">
            剩余：
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FF5F2C"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="businessTime"
              :show-seconds="false"
            ></u-count-down>
          </div>
        </div>
      </template>
      <!-- 换货商品已出库 -->
      <template v-if="legitimateDetail.afterSales.status == 4">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-delivery" />
          <span class="u-m-l-20">换货商品已出库</span>
          <div class="tips-text u-text-center u-m-t-15">
            剩余：
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FF5F2C"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="deliveryTime"
              :show-seconds="false"
            ></u-count-down>
          </div>
        </div>
      </template>
      <!-- 商家逾期未处理，自动退款成功 -->
      <!-- <template v-if="false">
        <div class="title oe-flex">
          <u-icon size="42" name="checkmark-circle" />
          <span class="u-m-l-20">商家逾期未处理，自动退款成功</span>
        </div>
        <div class="tips u-m-t-24">
          退款金额：￥97.9 时间：2021年3月28日 17:20
        </div>
      </template> -->
      <!-- 换货商品已出库 -->
      <template v-if="false">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-delivery" />
          <span class="u-m-l-20">换货商品已出库</span>
        </div>
      </template>
      <!-- 已签收 -->
      <template v-if="false">
        <div class="title oe-flex">
          <view-icon size="42" name="cl-delivery" />
          <span class="u-m-l-20">您的换货快件已签收，请确认收货</span>
        </div>
        <div class="tips u-m-t-24">自动收货时间：2天20小时30分钟</div>
      </template>
      <!-- 已完成 -->
      <template v-if="successExchange == 1">
        <div class="title oe-flex">
          <u-icon size="42" name="checkmark-circle" />
          <span
            class="u-m-l-20"
            v-if="legitimateDetail.afterSales.timer_type == '0'"
            >已完成</span
          >
          <span
            class="u-m-l-20"
            v-if="legitimateDetail.afterSales.timer_type == '1'"
            >系统已为您自动确认收货</span
          >
        </div>
      </template>
      <!-- 系统已为您自动确认收货 -->
      <template v-if="false">
        <div class="title oe-flex">
          <u-icon size="42" name="checkmark-circle" />
          <span class="u-m-l-20">系统已为您自动确认收货</span>
        </div>
      </template>
      <!-- 
        剩余天数显示：
        等待商家处理换货申请
        请寄出换货商品给商家
        待商家收货
        换货商品已出库
      -->
      <!-- <div class="tips u-m-t-24">剩余：2天11时29分</div> -->
      <!-- 
        流程进度条显示：
        等待商家处理换货申请
        请寄出换货商品给商家
        待商家收货
        商家已收到换货商品 处理中
        商家逾期未处理，自动退款成功
        换货商品已出库
        已签收
        已完成
      -->
      <u-steps
        v-if="
          !(
            legitimateDetail.afterSales.status == -1 ||
            legitimateDetail.afterSales.status == -2
          )
        "
        class="u-m-t-14"
        active-color="#ffffff"
        un-active-color="rgba(255,255,255,.3)"
        :list="numList"
        :current="curStatus"
      />
    </div>
    <!-- 商家处理中 -->
    <custom-card-container
      class="container-primary"
      title="您的换货申请已提交，商家正在处理中"
      v-if="legitimateDetail.afterSales.status == 0"
    >
      <div slot="body" class="refund-retur-card-body text-style-color">
        <div class="text-style">
          卖家同意您的换货申请前,无法预留商品库存,请联系商家尽快处理。
        </div>
        <div class="u-margin-top-15">
          <span class="text-style u-margin-right-10">若商家同意:</span>
          换货申请达成,请您及时退货。
        </div>
        <div>
          <span class="text-style u-margin-right-10">若商家拒绝:</span>
          换货申请将关闭,您可以联系商家协商处理。
        </div>
        <div>
          <span class="text-style u-margin-right-10">若商家超时不响应:</span>
          若线上库存充足则默认达成换货申请,若不足或商品已下架, 则换货申请失败。
        </div>
        <div>
          <span class="text-style u-margin-right-10">商家同意后：</span>
          可在此页面预约寄快递,运费险订单免首重费用。
        </div>
        <div style="text-align: right">
          <u-button shape="circle" plain size="mini" @click="revokeApply"
            >撤销换货</u-button
          >
          <u-button
            shape="circle"
            plain
            type="error"
            size="mini"
            class="u-margin-left-15"
            @click="
              $navigateTo('/pages/shopOrders/exchangeGood', {
                modify: true,
                type: 3,
                orderId: legitimateDetail.id,
                goodsId: legitimateDetail.orderGoods[0].goods_id,
                goodsOrderId: legitimateDetail.orderGoods[0].id,
                afterSalesId: legitimateDetail.afterSales.id,
              })
            "
            >修改申请</u-button
          >
        </div>
      </div>
    </custom-card-container>

    <!-- 寄回商品 -->
    <custom-card-container
      class="container-primary"
      title="商家已同意换货"
      v-if="legitimateDetail.afterSales.status == 1"
    >
      <div slot="body" class="refund-retur-card-body">
        <div>请您及时退回需要更换的商品，请按照以下地址寄出货品</div>
        <div class="u-margin-top-15">
          <div class="address-info">
            <div>
              收货人： 收货人：{{ legitimateDetail.afterSales.consignee }}({{
                legitimateDetail.afterSales.phone
              }})
            </div>
            <div class="u-margin-top-15">
              {{ legitimateDetail.afterSales.province_name
              }}{{ legitimateDetail.afterSales.city_name
              }}{{ legitimateDetail.afterSales.area_name
              }}{{ legitimateDetail.afterSales.address }}
              <span
                class="tips-color"
                @click="
                  onCopyText(
                    `${legitimateDetail.afterSales.province_name}${legitimateDetail.afterSales.city_name}${legitimateDetail.afterSales.area_name}${legitimateDetail.afterSales.address}`
                  )
                "
              >
                复制
              </span>
            </div>
          </div>
          <div class="u-margin-top-15">
            <p>如您逾期未填写退货物流信息, 系统将自动关闭本次换货申请。</p>
            <p>未经商家同意,请不要使用到付或平邮。</p>
            <p>
              请在退货包裹内留下纸条,注明换货编号、您的会员名以及联系方式等信息,
            </p>
            <p>以便商家及时确认并完成换货。</p>
          </div>
        </div>
        <div slot="foot" class="foot-right u-margin-top-15">
          <div style="text-align: right">
            <u-button shape="circle" plain size="mini" @click="revokeApply"
              >撤销换货</u-button
            >
            <u-button
              shape="circle"
              plain
              type="error"
              class="u-margin-left-15"
              size="mini"
              @click="fillExchangeEvent()"
              >填写换货物流</u-button
            >
          </div>
        </div>
      </div>
    </custom-card-container>

    <!-- 待商家收货 -->
    <custom-card-container
      title="物流信息"
      v-if="legitimateDetail.afterSales.status == 3"
      class="custom-card-container"
    >
      <!-- <div slot="head-right">
        <span class="u-order-time text-style-color">完整物流信息</span>
        <u-icon name="arrow-right" color="#acacac" size="25" />
      </div> -->
      <div slot="body" class="details">
        <div class="express-layer">
          <div>
            {{ legitimateDetail.afterSales.express_company }}:{{
              legitimateDetail.afterSales.express_sn
            }}
          </div>
          <!-- <div class="tips-color">修改单号</div> -->
        </div>
        <div>
          <div class="layout-center">
            <u-time-line>
              <u-time-line-item
                nodeTop="2"
                v-for="(item, index) in logisticsInfo"
                :key="index"
              >
                <view
                  slot="node"
                  class="u-node"
                  :style="{ background: $hexColor['--color-primary'] }"
                />
                <div slot="content">
                  <div class="u-order-title">{{ item.AcceptStation }}</div>
                  <div class="u-order-time">{{ item.AcceptTime }}</div>
                </div>
              </u-time-line-item>
            </u-time-line>
          </div>
        </div>
      </div>
      <!-- <div slot="foot" class="foot-right">
        <u-button shape="circle" plain size="mini">撤销换货</u-button>
      </div> -->
      <div style="text-align: right">
        <u-button shape="circle" plain size="mini" @click="revokeApply">
          撤销换货
        </u-button>
      </div>
    </custom-card-container>
    <!-- 商家已收到换货商品 处理中 -->
    <!-- <custom-card-container
      title="您的换货商品商家已收到，商家正在处理中"
      class="custom-card-container"
    >
      <div slot="body" class="details">
        商家收到换货商品后，会尽快处理换货事项，若商家超时未处理，换货转退货流程，系统将对您的商品进行赔付。
      </div>
      <div style="text-align: right">
        <u-button shape="circle" plain size="mini">撤销换货</u-button>
      </div>
    </custom-card-container> -->
    <!-- 换货商品已出库 -->
    <custom-card-container
      title="物流信息"
      class="custom-card-container"
      v-if="legitimateDetail.afterSales.status == 4"
    >
      <!-- <div slot="head-right">
        <span class="u-order-time text-style-color">完整物流信息</span>
        <u-icon name="arrow-right" color="#acacac" size="25" />
      </div> -->
      <div slot="body" class="details">
        <div class="express-layer">
          <div>
            {{ legitimateDetail.afterSales.send_express_company }}:{{
              legitimateDetail.afterSales.send_express_sn
            }}
          </div>
          <!-- <div class="tips-color">修改单号</div> -->
        </div>
        <div>
          <div class="layout-center">
            <u-time-line>
              <u-time-line-item
                nodeTop="2"
                v-for="(item, index) in logisticsInfo"
                :key="index"
              >
                <view
                  slot="node"
                  class="u-node"
                  :style="{ background: $hexColor['--color-primary'] }"
                />
                <div slot="content">
                  <div class="u-order-title">{{ item.AcceptStation }}</div>
                  <div class="u-order-time">{{ item.AcceptTime }}</div>
                </div>
              </u-time-line-item>
            </u-time-line>
          </div>
        </div>
        <div class="text-style">
          {{ legitimateDetail.afterSales.consignee }}
          {{ legitimateDetail.afterSales.phone }}
        </div>
        <div>
          地址：{{ legitimateDetail.afterSales.province_name
          }}{{ legitimateDetail.afterSales.city_name
          }}{{ legitimateDetail.afterSales.area_name
          }}{{ legitimateDetail.afterSales.address }}
        </div>
      </div>
      <!-- <div slot="foot" class="foot-right">
        <u-button shape="circle" plain size="mini">撤销换货</u-button>
      </div> -->
      <div style="text-align: right">
        <u-button shape="circle" plain size="mini" @click="revokeApply"
          >撤销换货</u-button
        >
      </div>
    </custom-card-container>

    <!-- 已签收 已完成  系统以为您自动确认收货-->
    <custom-card-container
      v-if="legitimateDetail.afterSales.status == 2"
      :isLength="false"
      title="您的快递已有客户指定地带代收"
      class="custom-card-container"
    >
      <div slot="head-right" class="head-right">
        <span class="u-order-time text-style-color">查看完整物流信息</span>
        <u-icon name="arrow-right" color="#acacac" size="25" />
      </div>
      <!-- <div slot="body" class="body-flex">
        <div>
          <div>快递员:渣渣辉</div>
          <div class="u-margin-top-15">电话：189-9998-9989</div>
        </div>
        <div>
          <u-button shape="circle" plain size="mini">联系快递员</u-button>
        </div>
      </div> -->
    </custom-card-container>

    <!-- 已完成 已签收 商家处理中 申请已关闭 待商家收货 商家已收到换货商品处理中 商家逾期未处理，自动退款成功 换货商品已出库-->
    <custom-card-container
      :isShowHead="false"
      v-if="legitimateDetail.afterSales.status != -1"
    >
      <div slot="foot">
        <u-cell-item
          :border-top="true"
          :border-bottom="false"
          icon=""
          title="协商历史"
          @click="
            $navigateTo('/pages/shopOrders/negotiationHistory', {
              order_id: legitimateDetail.afterSales.order_id,
              order_item_id: legitimateDetail.afterSales.order_item_id,
              id: legitimateDetail.afterSales.id,
              status: legitimateDetail.afterSales.status,
              type: legitimateDetail.afterSales.type,
              deliverTime:
                legitimateDetail.OrderBaseParam.cancelSafeguard.value,
            })
          "
        ></u-cell-item>
      </div>
    </custom-card-container>

    <!-- 商家已拒绝您的申请 -->
    <custom-card-container
      title="您的申请已被商家拒绝"
      v-if="legitimateDetail.afterSales.status == -1"
    >
      <div slot="body" class="back-color-body">
        拒绝原因：{{ legitimateDetail.afterSales.dismiss_reason }}
      </div>
      <div slot="foot">
        <u-cell-item
          :border-top="true"
          :border-bottom="false"
          icon=""
          title="协商历史"
          @click="
            $navigateTo('/pages/shopOrders/negotiationHistory', {
              order_id: legitimateDetail.afterSales.order_id,
              order_item_id: legitimateDetail.afterSales.order_item_id,
              id: legitimateDetail.afterSales.id,
              status: legitimateDetail.afterSales.status,
              type: legitimateDetail.afterSales.type,
              deliverTime:
                legitimateDetail.OrderBaseParam.cancelSafeguard.value,
            })
          "
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 换货信息 -->
    <common-legitimate-info
      title="换货信息"
      :returnInfo="legitimateDetail"
    ></common-legitimate-info>
    <!-- 底部操作栏 -->
    <union-blank :height="120" v-if="legitimateDetail.afterSales.status != 2" />
    <div
      v-if="legitimateDetail.afterSales.status != 2"
      class="footer-container u-flex u-row-right u-border-top"
    >
      <!-- 提交申请 -->
      <template v-if="legitimateDetail.afterSales.status == 0">
        <div class="u-flex">
          <u-button
            size="mini"
            shape="circle"
            @click="revokeApply"
            class="u-m-r-15"
            >撤销申请</u-button
          >
          <!-- <u-button size="mini" shape="circle">修改申请</u-button> -->
          <link-controller :data="{ type: 'serve' }">
            <u-button
              size="mini"
              class="u-m-r-15"
              shape="circle"
              style="pointer-events: none"
            >
              客服介入
            </u-button>
          </link-controller>
        </div>
      </template>
      <!-- 申请已关闭 -->
      <template
        v-if="
          legitimateDetail.afterSales.status == -1 ||
          legitimateDetail.afterSales.status == -2
        "
      >
        <div>
          <u-button
            size="mini"
            shape="circle"
            @click="applyAgain"
            class="u-m-r-15"
            >再次申请</u-button
          >
        </div>
      </template>
      <!-- 寄回商品 -->
      <template v-if="legitimateDetail.afterSales.status == 1">
        <div class="u-flex">
          <link-controller :data="{ type: 'serve' }">
            <u-button
              size="mini"
              class="u-m-r-15"
              shape="circle"
              style="pointer-events: none"
            >
              客服介入
            </u-button>
          </link-controller>
          <u-button
            size="mini"
            shape="circle"
            class="u-m-r-15"
            @click="revokeApply"
            >撤销申请</u-button
          >
        </div>
      </template>
      <!-- 商家退款 -->
      <template v-if="legitimateDetail.afterSales.status == 3">
        <div class="u-flex">
          <link-controller :data="{ type: 'serve' }">
            <u-button
              size="mini"
              class="u-m-r-15"
              shape="circle"
              style="pointer-events: none"
            >
              客服介入
            </u-button>
          </link-controller>
          <u-button
            size="mini"
            shape="circle"
            class="u-m-r-15"
            @click="revokeApply"
            >撤销售后</u-button
          >
        </div>
      </template>
      <template v-if="legitimateDetail.afterSales.status == 4">
        <div>
          <u-button
            size="mini"
            shape="circle"
            type="warning"
            class="u-m-r-15"
            @click="confirmReceipt"
            >确定收货</u-button
          >
        </div>
      </template>
      <!-- 商家退款 -->
      <template v-if="legitimateDetail.afterSales.status == 2">
        <!-- <u-button
          size="mini"
          shape="circle"
          @click="$navigateTo('/pages/shopOrders/moneyTo', {})"
          >钱款去向</u-button
        > -->
      </template>
    </div>
    <!-- 撤销申请 -->
    <u-modal
      title="撤销申请"
      v-model="isRevokeApply"
      :content="revokeApplyContent"
      @confirm="revokeApplyConfirm"
      confirm-color="#000"
      cancel-color="#000"
      width="560rpx"
      :show-cancel-button="true"
    ></u-modal>
  </div>
</template>

<script lang="ts">
import {
  reqLegitimateDetail,
  reqCheckLogistics,
  reqCancelLegitimate,
  reqExchangeGoods,
} from '@/api';
import dayjs from 'dayjs';
import { navigateTo, redirectTo, reLaunch, showToast } from '@/utils';
import Vue from 'vue';
import { computed } from '@vue/composition-api';
import store from '@/store';
import { setClipboardData } from 'uni-clipboard';
export default Vue.extend({
  components: {},
  data: () => ({
    numList: [
      { name: '提交申请' },
      { name: '商家处理' },
      { name: '寄回商品' },
      { name: '换货出库' },
      { name: '换货成功' },
    ],
    isRevokeApply: false,
    curStatus: 1,
    createtime: 0,
    legitimateDetail: {} as any,
    // 换货完成
    successExchange: 0,
    // 撤销申请
    revokeApplyContent:
      '您将撤销本次申请，如果问题未解决，您还可以再次发起，确定继续吗？',
    orderId: '',
    shopId: '',
    logisticsInfo: [] as any[],
    // 商家处理时间
    merchantTime: 0,
    // 以后寄出的时间
    mailTime: 0,
    // 待商家收货的时间
    businessTime: 0,
    // 商家发货时间
    deliveryTime: 0,
  }),
  computed: {},
  /**
  *  <!-- 换货 -->
<!-- 已申请，等待商家处理 0 -->
<!-- 已通过，等待商家收货 1 -->
<!-- 已退货，等待商家收货 3 -->
<!-- 已发货，等待用户收货 4 -->
<!-- 已完成，等待商家退款 2 -->
<!-- 商家已拒绝 -1 -->  
<!-- 用户已撤销 -2 -->
  */
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 获取维权详情
    async getRightDetail(orderId: Key, shopId: Key) {
      const { data } = await reqLegitimateDetail(orderId, shopId);
      this.legitimateDetail = data.data;
      // 已申请，等待商家处理
      if (this.legitimateDetail.afterSales.status == 0) {
        this.curStatus = 1;
        this.merchantTime =
          dayjs(data.data.afterSales.createtime * 1000)
            .add(
              this.legitimateDetail.OrderBaseParam.toApplyForRightsOvertime
                .value,
              'day'
            )
            .unix() - dayjs().unix();
        // 已通过，等待商家收货
      } else if (this.legitimateDetail.afterSales.status == 1) {
        this.curStatus = 2;
        this.mailTime =
          dayjs(data.data.afterSales.start_time * 1000)
            .add(
              this.legitimateDetail.OrderBaseParam.cancelSafeguard.value,
              'day'
            )
            .unix() - dayjs().unix();
        // 已退货，等待商家收货
      } else if (this.legitimateDetail.afterSales.status == 3) {
        this.curStatus = 2;
        this.getlogisticsData(
          this.legitimateDetail.afterSales.express_company_code,
          this.legitimateDetail.afterSales.express_sn
        );
        this.businessTime =
          dayjs(data.data.afterSales.user_shipments_time * 1000)
            .add(
              this.legitimateDetail.OrderBaseParam.safeguardAutomation.value,
              'day'
            )
            .unix() - dayjs().unix();
        // 已退货，等待商家收货

        // 已发货，等待用户收货
      } else if (this.legitimateDetail.afterSales.status == 4) {
        // 已发货，等待用户收货
        // const { data } = reqCheckLogistics();
        // const { data } = await reqCheckLogistics('YD', '4607328612553');
        this.getlogisticsData(
          this.legitimateDetail.afterSales.send_express_company_code,
          this.legitimateDetail.afterSales.send_express_sn
        );
        this.deliveryTime =
          dayjs(data.data.afterSales.shop_shipments_time * 1000)
            .add(
              this.legitimateDetail.OrderBaseParam.safeguardAutomation.value,
              'day'
            )
            .unix() - dayjs().unix();
        this.curStatus = 3;
        // 已完成
      } else if (this.legitimateDetail.afterSales.status == 2) {
        // this.curStatus = 3;
        // const { data } = await reqRefundStatus(orderId, shopId);
        this.successExchange = 1;
        this.curStatus = 4;
      }
    },
    // 复制功能
    onCopyText(text: string) {
      setClipboardData(text);
      uni.hideToast();
      uni.showToast({ title: '已复制联系方式!' });
    },
    // 填写物流信息事件
    async fillExchangeEvent() {
      // this.$navigateTo('/pages/shopOrders/fillLogistics', {
      //   legitimateInfo: encodeURIComponent(
      //     JSON.stringify(this.legitimateDetail)
      //   ),
      // });
      navigateTo('/pages/shopOrders/fillLogistics', {
        legitimateInfo: encodeURIComponent(
          JSON.stringify(this.legitimateDetail)
        ),
      });
    },
    // 撤销申请
    revokeApply() {
      this.isRevokeApply = true;
    },
    // 再次申请
    applyAgain() {
      navigateTo('/pages/shopOrders/selectAfterSaleType', {
        goodsId: this.legitimateDetail.orderGoods[0].goods_id,
        goodsOrderId: this.legitimateDetail.orderGoods[0].id,
        orderId: this.legitimateDetail.id,
        afterSalesId: this.legitimateDetail.afterSales.id,
      });
    },
    // 获取物流信息
    async getlogisticsData(code: any, sn: any) {
      const { data } = await reqCheckLogistics(code, sn);
      this.logisticsInfo = data.data;
    },
    // 确定收货
    async confirmReceipt() {
      await reqExchangeGoods({
        order_after_sale_id: this.legitimateDetail.afterSales.id,
        order_id: this.legitimateDetail.id,
        order_item_id: this.legitimateDetail.orderGoods[0].id,
      });
      await showToast({
        title: '确定收货成功',
        mask: true,
        success: () => {
          setTimeout(() => {
            this.getRightDetail(this.orderId, this.shopId);
          }, 1500);
        },
      });
    },
    // 确认撤销申请
    async revokeApplyConfirm() {
      await reqCancelLegitimate(
        this.legitimateDetail.afterSales.order_id,
        this.legitimateDetail.afterSales.order_item_id,
        this.legitimateDetail.afterSales.id
      );
      uni.showToast({
        title: '撤销申请成功',
        mask: true,
        success() {
          setTimeout(() => {
            redirectTo('/pages/shopOrders/afterSales');
          }, 1500);
        },
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { orderId: any; shopId: any }) {
    this.orderId = options.orderId;
    this.shopId = options.shopId;
    this.getRightDetail(options.orderId, options.shopId);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getRightDetail(this.orderId, this.shopId);
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss" scoped>
@include full-page('refund-return-detail', #f2f2f2);
::v-deep .u-steps {
  // min-width: 130rpx !important;
  font-size: 20rpx !important;
}
.refund-return-detail {
  position: relative;
  padding-bottom: 50rpx;
}
.header-container {
  background-image: url('https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/rr-bg.png');
  background-position: center;
  height: 324rpx;
  color: #ffffff;
  flex-direction: column;
  .title {
    position: relative;
    z-index: 10;
    padding-top: 44rpx;
    margin-bottom: 24rpx;
    font-size: 34rpx;
    font-size: 34rpx;
    font-weight: bold;
  }
  .tips {
    font-size: 24rpx;
  }
}
.container-primary {
  .custom-card-container {
    margin-top: -40rpx;
  }
}
.refund-return-detail {
  .head-right {
    font-size: 22rpx;
    color: #acacac;
  }
}
.refund-retur-card-body {
  font-size: 24rpx;
}
.tips-container {
  text-align: center;
}
.custom-card-container {
  .back-color-body {
    background-color: #f2f2f2;
    padding: 20rpx;
    color: #acacac;
    font-size: 24rpx;
  }
  .body-flex {
    display: flex;
    justify-content: space-between;

    font-weight: bold;
    font-size: 22rpx;
  }
  .details {
    font-size: 24rpx;
    color: #acacac;
    .express-layer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .layout-center {
    display: flex;
    justify-content: center;
    margin-top: 48rpx;
  }
  .u-node {
    height: 16rpx;
    width: 16rpx;
    border-radius: 100rpx;
  }
  .tips-color {
    margin-left: 8rpx;
    color: $u-type-primary;
  }
  .text-style {
    font-size: 24rpx;
    color: #000;
  }
  .text-style-color {
    color: #acacac;
  }
  .foot-right {
    display: flex;
    justify-content: flex-end;
  }
  .address-info {
    padding: 20rpx;
    border: 1rpx dashed #ff3d00;
  }
  .u-order-title {
    font-size: 24rpx;
    color: #000;
  }
  .u-order-time {
    font-size: 22rpx;
  }
}
.footer-container {
  position: fixed;
  bottom: 0;
  z-index: 2;
  height: 120rpx;
  width: 100%;
  background: #ffffff;
}
.tips-text {
  font-size: 24rpx;
  color: #fff;
}
::v-deep .u-cell_title {
  color: #000;
  font-weight: bold;
}
</style>
