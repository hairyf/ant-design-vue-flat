<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-03-19 14:51:55
 * @Description: 订单详情copy之前版本
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never">
    <el-steps :active="step" align-center class="step-box">
      <el-step
        v-for="(item, index) in stepList"
        :key="index"
        :title="item.title"
        :icon="step >= item.step ? 'ad-hang' : 'ad-complete'"
        description="2021-02-24 19:55:36"
      />
    </el-steps>
  </el-card>
  <el-row :gutter="24" class="information">
    <el-col :xl="8" :lg="8" :md="24">
      <el-card shadow="never" class="e-grid">
        <div class="information-title">维权信息</div>
        <div class="information-list">
          <div><span>维权状态</span><span class="e-left oe-flex-1">等待商家处理</span></div>
          <div class="public-box oe-flex">
            <span>维权类型</span><span class="e-left oe-flex-1">退货退款</span>
          </div>
          <div class="public-box oe-flex">
            <span>退款金额</span><span class="e-left oe-flex-1">¥11.00</span>
          </div>
          <div class="public-box oe-flex">
            <span>维权原因</span><span class="e-left oe-flex-1">我要退款</span>
          </div>
          <div class="public-box oe-flex">
            <span>维权编号</span><span class="e-left oe-flex-1">REFUND2021030409220189749</span>
          </div>
          <div class="public-box">
            <el-button type="primary">处理申请</el-button>
            <el-button plain class="e-left">驳回申请</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :xl="8" :lg="8" :md="24">
      <el-card shadow="never" class="e-grid">
        <div class="information-title">订单信息</div>
        <div class="information-list1">
          <div class="list-left">
            <span>买家</span><span class="e-left oe-flex-1 e-color">185889089071</span>
          </div>
          <div class="public-box oe-flex">
            <span>订单状态</span><span class="e-left oe-flex-1">退货退款</span>
          </div>
          <div class="public-box oe-flex">
            <span>订单类型</span><span class="e-left oe-flex-1">普通订单</span>
          </div>
          <div class="public-box oe-flex">
            <span>订单编号</span><span class="e-left oe-flex-1">ES20210304092133471831</span>
          </div>
          <div class="public-box oe-flex">
            <span>支付方式</span><span class="e-left oe-flex-1">余额支付</span>
          </div>
          <div class="public-box oe-flex">
            <span>付款时间</span><span class="e-left oe-flex-1">2021-03-05 18:12:40</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :xl="8" :lg="8" :md="24">
      <el-card shadow="never" class="e-grid">
        <div class="information-title">其他信息</div>
        <div class="information-list1">
          <div class="public-box list-left">
            <span>实际退款金额：<span class="amount-text">198.00</span>元</span>
          </div>
          <div class="list-left">
            <span>客户退回信息</span>
          </div>
          <div class="list-left public-box">
            <span>快递公司</span><span class="e-left oe-flex-1">顺丰</span>
          </div>
          <div class="list-left public-box">
            <span>快递单号</span><span class="e-left oe-flex-1">顺丰</span>
          </div>
          <div class="list-left public-box">
            <span>发货时间</span><span class="e-left oe-flex-1">顺丰</span>
          </div>
          <div class="list-left public-box">
            <span>退款退货已完成，退款金额：<span class="amount-text">198.00</span>元</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
          <div class="oe-flex-1">商品</div>
          <div class="oe-flex-1">售卖价</div>
          <div class="oe-flex-1">数量</div>
          <div class="oe-flex-1">优惠金额</div>
          <div class="oe-flex-1">小计</div>
          <div class="oe-flex-1">状态</div>
        </div>
        <div class="product-content oe-flex" v-for="(item, index) in 3" :key="index">
          <div class="oe-flex-1 oe-flex">
            <el-image
              src="/custom-assets/images/order/Rectangle76.png"
              class="content-img"
            />
            <div class="content-left">
              <div class="content-left-text"> 文章文章 </div>
              <el-tag size="mini" color="#D4EBFF" style="color: #1ad370">实体</el-tag>
            </div>
          </div>
          <div class="oe-flex-1">¥198.00</div>
          <div class="oe-flex-1">X1</div>
          <div class="oe-flex-1">¥0.00</div>
          <div class="oe-flex-1">¥198.00</div>
          <div class="oe-flex-1">已完成</div>
        </div>
        <div class="total-box">
          <div class="total-box-text1">商品总计：¥198.00</div>
          <div class="total-box-text1">运费：¥0.00</div>
          <div class="total-box-text1">余额抵扣：¥0.00</div>
          <div class="total-box-text1">积分抵扣：¥0.00</div>
          <div class="total-box-text2">实付款：¥198.00</div>
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
  <!-- 协商记录 -->
  <!-- <el-row>
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
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  const step = ref(1)
  // 订单信息状态
  const stepList = reactive([{ title: '未发货', step: 1 }])
</script>
<style lang="scss" scoped>
  .information {
    margin-top: 24px;
    .information-title {
      font-weight: bold;
      font-size: 16px;
      color: #000000;
    }
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;

      height: 375px;
    }
    :deep(.el-card__body) {
      padding: 24px;
    }
    .e-left {
      margin-left: 14px;
    }
    .list-left {
      margin-left: 24px;
    }
    .public-box {
      margin-top: 30px;
    }

    :deep(.el-button) {
      padding: 2px 31px;
      min-height: 32px;
    }
    .information-list {
      margin-top: 40px;
      span {
        font-size: 14px;
        color: #000;
      }
    }
    .information-list1 {
      margin-top: 28px;
      span {
        font-size: 14px;
        color: #000;
      }
      .amount-text {
        color: #ff0000;
      }
    }
  }
  .process {
    position: relative;
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
      top: -10px;
      width: 0;
      height: 0;
      border-top: 23px solid transparent;
      border-right: 32px solid #fff;
      border-bottom: 23px solid transparent;
    }
  }
  .product {
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
        margin-left: 10px;
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
  .e-color {
    color: var(--color-primary);
  }
  :deep(.el-step__icon) {
    font-size: 20px;
  }
  .e-grid {
    margin-bottom: 20px;
  }
</style>
