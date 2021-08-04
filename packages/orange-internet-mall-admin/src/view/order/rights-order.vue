<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:56:34
 * @Description: 维权订单
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
            value-format="timestamp"
            v-model="form.time"
            type="datetimerange"
            class="oe-flex-1"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
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
            <el-option label="全部" value="1,2"></el-option>
            <!-- <el-option label="未维权" value="未维权"></el-option> -->
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
    <!-- <el-row :gutter="24">
      <order-list
        title="维权订单"
        :paymentList="paymentList"
        :condition="condition"
        :total="pagination.total"
        v-model="selectAll"
        :list="tableList"
        @selectListClick="selectListClick"
      ></order-list>
    </el-row> -->
    <el-row :gutter="24">
      <el-col :lg="24">
        <div class="oe-flex oe-row-between box-title">
          <div>
            <span class="title-all">维权订单</span>
            <span class="title-text"
              >总订单数：{{ pagination.total }} 实付金额统计：{{ pageaMoney.toFixed(2) }}元
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
        <template v-if="tableList.length">
          <div class="list-box" v-for="(item, index) in tableList" :key="index">
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
                      <el-image
                        :src="item1.goods_image"
                        fit="cover"
                        class="order-information-img"
                      />
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
                <div>
                  <div>¥{{ item.pay_fee }}</div>
                  <br />
                  <div>{{ item.payTypeName }}</div>
                </div>
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
  import { onMounted, ref, watch, provide, defineEmit, computed } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import dayjs from 'dayjs'
  import { reqOrderList } from '@/api/order'
  import { ElNotification } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { reqFullPayment } from '@/api/common'
  import { reqjournalData, reqViewLogistics } from '@/api/order'
  import { reqMembershipChannel } from '@/api/member'
  import { formatUnix } from '@/utils'
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
  const router = useRouter()
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
    time: 0 as any,
    // 商户名称
    merchantName: '',
    // 商户标题
    merchantTitle: '',
    // 维权状态
    safeguarding: '全部',
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
    orderType: ''
  })
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
    safeguarding: '全部',
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
    orderType: ''
  })
  const pageaMoney = ref(0)
  // 订单数据
  const tableList = ref<any[]>([])
  const paymentList = ref<any>([])
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
      pay_type: form.value.payment,
      type: form.value.commodityType,
      express_nos: form.value.orderSwitch == '物流单号' ? form.value.orderNumber : '',
      page: pagination.currentPage,
      limit: pagination.pageSize,
      is_after_sale: form.value.safeguarding == '全部' ? '1,2' : form.value.safeguarding,
      createtime: afferentTime
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
    condition.value = optios
    const { data } = await reqOrderList(optios)
    tableList.value = data.data.data
    tableList.value.forEach((item: any) => {
      item.select = false
    })
    pagination.total = data.data.total
    for (let i = 0; i < tableList.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (tableList.value[i].platform == channelList.value[k].code) {
          tableList.value[i].img_url = channelList.value[k].img_url
          tableList.value[i].sourceName = channelList.value[k].name
        }
      }
      for (let j = 0; j < paymentList.value.length; j++) {
        if (tableList.value[i].pay_type == paymentList.value[j].key) {
          tableList.value[i].payTypeName = paymentList.value[j].name
        }
      }
    }
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
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 当前是否全选
  const selectAll = ref(false)
  // 重置按钮
  const resetBtn = () => {
    form.value.orderSwitch = '订单编号'
    form.value.orderNumber = ''
    form.value.receivingType = '收货人姓名'
    form.value.consignee = ''
    form.value.timeType = '支付时间'
    form.value.time = 0
    form.value.merchantName = ''
    form.value.merchantTitle = ''
    form.value.safeguarding = '全部'
    form.value.commodityType = ''
    form.value.deliveryMode = ''
    form.value.payment = ''
    form.value.orderStatus = ''
    form.value.orderStore = ''
    form.value.region = ''
    form.value.orderType = ''
    pagination.currentPage = 1
    resetOrderList()
  }
  const channelList = ref<any[]>([])
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
  const { isSelectAll, selectIds, selectItems } = useMultipleSelect(tableList)
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
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    resetOrderList()
  })
  onMounted(() => resetOrderList())
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
