<!--
 * @Author: Mr.wang
 * @Date: 2021-03-29 13:59:41
 * @LastEditTime: 2021-05-13 17:33:28
 * @Description: 维权详情
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="24" v-if="protectionData.afterSales">
    <el-col :xl="17" :md="17" :sm="17" :xs="17">
      <el-row>
        <el-col>
          <div class="oe-flex process-box">
            <div class="oe-flex-col process-box-left">
              <div class="process oe-flex-1">
                <div class="process-text">会员维权申请</div>
                <div class="process-date">{{
                  formatUnix(protectionData.afterSales.createtime)
                }}</div>
              </div>
              <div class="process oe-flex-1">
                <div
                  :class="[
                    'process-text',
                    protectionData.afterSales.status == 0 ? 'current-status' : ''
                  ]"
                >
                  {{ protectionData.afterSales.status > 0 ? '处理维权申请' : '待处理维权' }}
                </div>
                <div class="triangle" v-if="protectionData.afterSales.status == 0"></div>
                <div class="process-date" v-if="protectionData.afterSales.status > 0">{{
                  formatUnix(protectionData.afterSales.start_time)
                }}</div>
              </div>
              <div
                class="process oe-flex-1"
                v-if="protectionData.afterSales.type == 2 || protectionData.afterSales.type == 3"
              >
                <div
                  :class="[
                    'process-text',
                    protectionData.afterSales.status == 1 || protectionData.afterSales.status == 3
                      ? 'current-status'
                      : ''
                  ]"
                  >会员退回商品
                </div>
                <div class="process-date" v-if="protectionData.afterSales.status > 1">{{
                  formatUnix(protectionData.afterSales.user_shipments_time)
                }}</div>
                <div class="triangle" v-if="protectionData.afterSales.status == 1"></div>
              </div>
              <div class="process oe-flex-1" v-if="protectionData.afterSales.type == 3">
                <div
                  :class="[
                    'process-text',
                    protectionData.afterSales.status == 4 ? 'current-status' : ''
                  ]"
                  >卖家发货
                </div>
                <div class="process-date" v-if="protectionData.afterSales.status == 2">
                  {{ formatUnix(protectionData.afterSales.shop_shipments_time) }}
                </div>
                <div class="triangle" v-if="protectionData.afterSales.status == 4"></div>
              </div>
              <div class="process oe-flex-1">
                <div class="process-text">维权完成</div>
                <template v-if="protectionData.afterSales.status == 2">
                  <div class="process-date" v-if="protectionData.afterSales.status == 2">{{
                    formatUnix(protectionData.afterSales.protect_rights_time)
                  }}</div>
                  <div class="triangle"></div>
                </template>
              </div>
            </div>
            <el-card shadow="never" class="oe-flex-1 process-box-right">
              <div class="information-box">
                <div class="oe-flex-1 order-information">
                  <div class="right-title">维权信息</div>
                  <div class="information-list">
                    <div class="oe-flex oe-flex-wrap">
                      <div class="e-right">维权状态</div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == 0">
                        店铺用户申请售后(维权)
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == 1">
                        店铺管理员通过申请(维权中)
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == 2">
                        维权完成
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == 3">
                        用户发货
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == -1">
                        店铺管理员驳回申请(维权)
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.status == -2">
                        店铺用户关闭申请
                      </div>
                    </div>
                    <div class="public-box oe-flex-wrap oe-flex">
                      <div class="e-right">维权类型</div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.type == 1">
                        退款(仅退款不退货)
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.type == 2">
                        退货退款
                      </div>
                      <div class="oe-flex-1" v-if="protectionData.afterSales.type == 3"> 换货 </div>
                    </div>
                    <div
                      class="public-box oe-flex-wrap oe-flex"
                      v-if="protectionData.afterSales.type == 3"
                    >
                      <div class="e-right">换货规格</div>
                      <div class="oe-flex-1"
                        >{{
                          protectionData.afterSales.goods_sku_text
                            ? protectionData.afterSales.goods_sku_text
                            : '无'
                        }}
                      </div>
                    </div>
                    <div class="public-box oe-flex-wrap oe-flex">
                      <div class="e-right">退款金额</div>
                      <div class="oe-flex-1"> ¥{{ protectionData.afterSales.refund_money }} </div>
                    </div>
                    <div class="public-box oe-flex-wrap oe-flex">
                      <div class="e-right">维权原因</div>
                      <div class="oe-flex-1">
                        {{ protectionData.afterSales.shop_user_apply_reason }}
                      </div>
                    </div>
                    <div class="public-box oe-flex-wrap oe-flex">
                      <div class="e-right">维权图片</div>
                      <div class="oe-flex-1">
                        <template v-if="imageList.length">
                          <el-image
                            v-for="(item, index) in imageList"
                            :key="index"
                            class="protection-img"
                            fit="cover"
                            :src="item"
                          ></el-image>
                        </template>
                        <template v-else>无</template>
                      </div>
                    </div>
                    <div class="public-box oe-flex-wrap oe-flex">
                      <div class="e-right">维权编号</div>
                      <div class="oe-flex-1">{{ protectionData.afterSales.sn }}</div>
                    </div>
                  </div>
                  <template
                    v-if="
                      protectionData.afterSales.status == '0' &&
                      protectionData.afterSales.status != '-1'
                    "
                  >
                    <el-button
                      v-if="protectionData.afterSales.type == '1'"
                      type="primary"
                      @click="agreeRefund(1)"
                    >
                      同意退款
                    </el-button>
                    <el-button
                      type="primary"
                      @click="returnAddressBtn"
                      v-if="protectionData.afterSales.type == '2'"
                      >同意退货退款
                    </el-button>
                    <el-button
                      type="primary"
                      @click="returnAddressBtn"
                      v-if="protectionData.afterSales.type == '3'"
                    >
                      同意换货
                    </el-button>
                    <el-button @click="rejectionApplication(protectionData.afterSales.type)"
                      >驳回申请</el-button
                    >
                  </template>
                  <template
                    v-if="
                      protectionData.afterSales.status == '1' ||
                      protectionData.afterSales.status == '3'
                    "
                  >
                    <el-button
                      type="primary"
                      v-if="protectionData.afterSales.type == '2'"
                      @click="processRefund"
                    >
                      已收到退货 同意退款
                    </el-button>
                    <el-button
                      type="primary"
                      v-if="protectionData.afterSales.type == '3'"
                      @click="redeliveryBtn"
                    >
                      已收到退货，重新发货
                    </el-button>
                  </template>
                </div>
                <div class="oe-flex-1 receiving-address">
                  <div class="right-title">订单信息</div>
                  <div class="receiving-address-list">
                    <!-- <div class="oe-flex oe-flex-wrap">
                      <div class="e-right">会员</div>
                      <div class="oe-flex-1 e-color">185889089071</div>
                    </div> -->
                    <div class="oe-flex oe-flex-wrap">
                      <div class="e-right">订单状态</div>
                      <div class="oe-flex-1" v-if="protectionData.status == '1'">等待发货</div>
                      <div class="oe-flex-1" v-if="protectionData.status == '2'">等待收货</div>
                      <div class="oe-flex-1" v-if="protectionData.status == '0'">等待付款</div>
                      <div class="oe-flex-1" v-if="protectionData.status == '-1'">已关闭</div>
                      <div class="oe-flex-1" v-if="protectionData.status == '3'">已完成</div>
                    </div>
                    <!-- <div class="public-box oe-flex">
                      <span>订单类型</span><span class="e-left oe-flex-1">退货退款</span>
                    </div> -->
                    <div class="public-box oe-flex oe-flex-wrap">
                      <div class="e-right">订单编号</div>
                      <div class="oe-flex-1">
                        {{ protectionData.order_sn }}
                      </div>
                    </div>
                    <div class="public-box oe-flex oe-flex-wrap">
                      <div class="e-right">支付方式</div>
                      <template v-if="protectionData.pay_type">
                        <div class="oe-flex-1">
                          {{ protectionData.payTypeName }}
                        </div>
                      </template>
                      <div v-else class="oe-flex-1">无</div>
                    </div>
                    <div class="public-box oe-flex oe-flex-wrap">
                      <div class="e-right">付款时间</div
                      ><div class="oe-flex-1">{{ formatUnix(protectionData.paytime) }}</div>
                    </div>
                  </div>
                  <template
                    v-if="
                      protectionData.afterSales.type == '3' || protectionData.afterSales.type == '2'
                    "
                  >
                    <el-button
                      class="e-color"
                      v-if="protectionData.afterSales.status == '4'"
                      @click="
                        seeLogistics(
                          protectionData.afterSales.send_express_company_code,
                          protectionData.afterSales.send_express_sn
                        )
                      "
                    >
                      查看重新发货物流信息
                    </el-button>
                    <el-button
                      class="e-color"
                      v-if="
                        protectionData.afterSales.status == '3' ||
                        protectionData.afterSales.status == '4'
                      "
                      @click="
                        seeLogistics(
                          protectionData.afterSales.express_company_code,
                          protectionData.afterSales.express_sn
                        )
                      "
                    >
                      查看退货物流信息
                    </el-button>
                  </template>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
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
              v-for="(item, index) in protectionData.orderGoods"
              :key="Number(index)"
            >
              <div class="oe-flex-2 oe-flex list-box">
                <el-image :src="item.goods_image" fit="cover" class="content-img" />
                <div class="content-left oe-flex-1">
                  <div class="content-left-text">{{ item.goods_title }}</div>
                  <el-tag
                    size="mini"
                    color="#D4EBFF"
                    style="color: #55adff"
                    v-if="protectionData.type == '2'"
                    >虚拟</el-tag
                  >
                  <el-tag
                    size="mini"
                    color="#FBDDD1"
                    style="color: #ec672e"
                    v-if="protectionData.type == '3'"
                    >卡密</el-tag
                  >
                  <el-tag
                    size="mini"
                    color="#E4FFF8"
                    style="color: #1ad370"
                    v-if="protectionData.type == '1'"
                    >实体</el-tag
                  >
                  <el-tag
                    size="mini"
                    color="#F4DFD3"
                    style="color: #ef864c"
                    v-if="protectionData.type == '4'"
                    >计时/次</el-tag
                  >
                  <el-tag
                    size="mini"
                    color="#F8E8CF"
                    style="color: #dd8a0d"
                    v-if="protectionData.type == '5'"
                    >预约</el-tag
                  >
                  <el-tag
                    size="mini"
                    color="#E9D4F9"
                    style="color: #8f29df"
                    v-if="protectionData.type == '6'"
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
              <div class="oe-flex-1 list-box" v-if="protectionData.status == '0'">等待付款</div>
              <template v-if="protectionData.status != '0'">
                <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '1'">等待发货</div>
                <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '2'">等待收货</div>
                <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '-1'">已关闭</div>
                <div class="oe-flex-1 list-box" v-if="item.dispatch_status == '3'">已完成</div>
              </template>
            </div>
            <div class="total-box">
              <div class="total-box-text1">商品总计：¥{{ protectionData.goods_amount }}</div>
              <div class="total-box-text1">运费：¥{{ protectionData.dispatch_amount }}</div>
              <div class="total-box-text1">余额抵扣：¥0.00</div>
              <div class="total-box-text1">积分抵扣：¥0.00</div>
              <div class="total-box-text2">实付款：¥{{ protectionData.pay_fee }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <!-- 协商记录 -->
    <el-col :xl="7" :md="7" :sm="7" :xs="7">
      <el-card shadow="never" class="consult-box">
        <div class="consult-box-title">协商记录</div>
        <!-- 退款的 -->
        <template v-if="protectionData.afterSales.type == 1 && consultList.length">
          <div class="consult-box-list" v-for="(item, index) in consultList" :key="index">
            <div class="list-date"> {{ formatUnix(item.createtime) }}</div>
            <div class="list-second">
              {{ item.title }}
            </div>
            <template v-if="index == 0">
              <div class="list-public">
                处理方式：
                <span v-if="protectionData.afterSales.type == 1"> 退款(仅退款不退货) </span>
                <span v-if="protectionData.afterSales.type == 2"> 退货退款 </span>
                <span v-if="protectionData.afterSales.type == 3"> 换货 </span></div
              >
              <div class="list-public">
                退款金额：¥{{ protectionData.afterSales.refund_money }}</div
              >
              <div class="list-public">
                退款说明： {{ protectionData.afterSales.shop_user_apply_reason }}</div
              >
              <div class="list-public oe-flex">
                <el-image
                  v-for="(item, index) in imageList"
                  :key="index"
                  fit="cover"
                  :src="item"
                  class="consult-img"
                ></el-image>
              </div>
            </template>
            <template v-if="item.remark.ext">
              <div class="list-public">驳回原因： {{ item.remark.ext }}</div>
            </template>
            <template v-if="item.remark.refund_money">
              <div class="list-public">退款金额： ¥{{ item.remark.refund_money }}</div>
            </template>
          </div>
        </template>
        <!-- 退款退货的 -->
        <template v-if="protectionData.afterSales.type == 2 && consultList.length">
          <div class="consult-box-list" v-for="(item, index) in consultList" :key="index">
            <div class="list-date"> {{ formatUnix(item.createtime) }}</div>
            <div class="list-second" v-if="!item.remark.start_time">
              {{ item.title }}
            </div>
            <div class="list-second" v-if="item.remark.start_time">
              商家 同意退货申请，请等待买家退货
            </div>
            <!-- 申请维权 -->
            <template v-if="index == 0">
              <div class="list-public">
                处理方式：
                <span v-if="protectionData.afterSales.type == 1"> 退款(仅退款不退货) </span>
                <span v-if="protectionData.afterSales.type == 2"> 退货退款 </span>
                <span v-if="protectionData.afterSales.type == 3"> 换货 </span></div
              >
              <div class="list-public"> 退款金额：{{ protectionData.afterSales.refund_money }}</div>
              <div class="list-public">
                退款说明： {{ protectionData.afterSales.shop_user_apply_reason }}</div
              >
              <div class="list-public oe-flex">
                <el-image
                  v-for="(item, index) in imageList"
                  :key="index"
                  fit="cover"
                  class="consult-img"
                  :src="item"
                ></el-image>
              </div>
            </template>
            <!-- 驳回 -->
            <template v-if="item.remark.ext">
              <div class="list-public">驳回原因： {{ item.remark.ext }}</div>
            </template>
            <!-- 退货地址 -->
            <template v-if="item.remark.province_name">
              <div class="list-public" v-if="protectionData.afterSales.status == 1">
                会员在<span class="refund-time">{{ countDown }}</span
                >内未响应，退款退货申请 将自动撤销。
              </div>
              <!-- <div class="list-public" v-if="protectionData.afterSales.status == 3">

              </div> -->
              <div class="list-public">收货人：{{ item.remark.consignee }}</div>
              <div class="list-public">联系电话：{{ item.remark.phone }}</div>
              <div class="list-public"
                >退货地址： {{ item.remark.province_name }}{{ item.remark.city_name
                }}{{ item.remark.area_name }}{{ item.remark.address }}</div
              >
            </template>
            <!-- 物流公司 -->
            <template v-if="item.remark.express_company">
              <div class="list-public">快递公司：{{ item.remark.express_company }}</div>
              <div class="list-public">快递单号：{{ item.remark.express_sn }}</div>
              <div class="list-public">
                发货时间：{{ formatUnix(item.remark.user_shipments_time) }}
              </div>
            </template>
            <!-- 退款金额 -->
            <template v-if="item.remark.refund_money">
              <div class="list-public">退款金额： ¥{{ item.remark.refund_money }}</div>
            </template>
          </div>
        </template>
        <!-- 换货的 -->
        <template v-if="protectionData.afterSales.type == 3 && consultList.length">
          <div class="consult-box-list" v-for="(item, index) in consultList" :key="index">
            <div class="list-date"> {{ formatUnix(item.createtime) }}</div>
            <div class="list-second" v-if="!item.remark.start_time">
              {{ item.title }}
            </div>
            <div class="list-second" v-if="item.remark.start_time">
              商家 同意退货申请，请等待买家退货
            </div>
            <!-- 申请维权 -->
            <template v-if="index == 0">
              <div class="list-public">
                处理方式：
                <span v-if="protectionData.afterSales.type == 1"> 退款(仅退款不退货) </span>
                <span v-if="protectionData.afterSales.type == 2"> 退货退款 </span>
                <span v-if="protectionData.afterSales.type == 3"> 换货 </span></div
              >
              <div class="list-public">
                退款金额：¥{{ protectionData.afterSales.refund_money }}</div
              >
              <div class="list-public">
                退款说明： {{ protectionData.afterSales.shop_user_apply_reason }}</div
              >
              <div class="list-public oe-flex">
                <el-image
                  v-for="(item, index) in imageList"
                  :key="index"
                  fit="cover"
                  class="consult-img"
                  :src="item"
                ></el-image>
              </div>
            </template>
            <!-- 驳回 -->
            <template v-if="item.remark.ext">
              <div class="list-public">驳回原因： {{ item.remark.ext }}</div>
            </template>
            <!-- 退货地址 -->
            <template v-if="item.remark.province_name">
              <div class="list-public" v-if="protectionData.afterSales.status == 1">
                会员在<span class="refund-time">{{ countDown }}</span
                >内未响应，退款退货申请 将自动撤销。
              </div>
              <div class="list-public">收货人：{{ item.remark.consignee }}</div>
              <div class="list-public">联系电话：{{ item.remark.phone }}</div>
              <div class="list-public"
                >退货地址： {{ item.remark.province_name }}{{ item.remark.city_name
                }}{{ item.remark.area_name }}{{ item.remark.address }}</div
              >
            </template>
            <!-- 物流公司 -->
            <template v-if="item.remark.express_company">
              <div class="list-public">快递公司：{{ item.remark.express_company }}</div>
              <div class="list-public">快递单号：{{ item.remark.express_sn }}</div>
              <div class="list-public">
                发货时间：{{ formatUnix(item.remark.user_shipments_time) }}
              </div>
            </template>
            <!-- 物流公司 -->
            <template v-if="item.remark.send_express_company">
              <div class="list-public">快递公司：{{ item.remark.send_express_company }}</div>
              <div class="list-public">快递单号：{{ item.remark.send_express_sn }}</div>
              <div class="list-public" v-if="item.user_id == 1">
                发货时间：{{ formatUnix(item.remark.shop_shipments_time) }}
              </div>
              <div class="list-public" v-if="item.user_id == 2">
                发货时间：{{ formatUnix(item.remark.user_shipments_time) }}
              </div>
            </template>
            <!-- 退款金额 -->
            <template v-if="item.remark.refund_money">
              <div class="list-public">退款金额： ¥{{ item.remark.refund_money }}</div>
            </template>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
  <makeSure
    v-model:show="state.reject"
    :operationNum="operationNum"
    :option="protectionData"
    @updateData="updateData"
  ></makeSure>
  <returnAddress
    v-model:show="state.returnGoods"
    :option="protectionData"
    @updateData="updateData"
  ></returnAddress>
  <rejectApply
    v-model:show="state.application"
    :operationNum="rejectNum"
    :option="protectionData"
    @updateData="updateData"
  >
  </rejectApply>
  <redelivery
    v-model:show="state.redelivery"
    :currentItem="protectionData"
    @updateData="updateData"
  >
  </redelivery>
  <logisticsData v-model:show="state.logisticsData" :logisticsList="logisticsList"></logisticsData>
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
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import makeSure from '@/components/common/order-modality/make-sure.vue'
  import returnAddress from '@/components/common/order-modality/return-address.vue'
  import rejectApply from '@/components/common/order-modality/reject-apply.vue'
  import redelivery from '@/components/common/order-modality/redelivery.vue'
  import logisticsData from '@/components/common/order-modality/logistics-data.vue'
  import { ref, onMounted } from 'vue'
  import { reqFullPayment } from '@/api/common'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  dayjs.extend(duration)
  import {
    reqConfirmReceiptRefund,
    reqNegotiationRecord,
    reqProtectionDetails,
    reqViewLogistics
  } from '@/api/order'
  import { reqSetKeyConfig } from '@/api/system'
  import { formatUnix } from '@/utils'
  const route = useRoute()
  // 维权订单详情数据
  const protectionData = ref<any>({})
  // 物流信息
  const logisticsList = ref<any[]>([])
  // 维权弹窗
  const state = ref({
    // 同意退款和驳回申请
    reject: false,
    // 退款退货
    returnGoods: false,
    // 物流信息
    logisticsData: false,
    // 驳回弹窗
    application: false,
    // 重新发货
    redelivery: false
  })
  const paymentList = ref<any[]>([])
  //商家发货的过期天数
  const overdueTime = ref(0)
  // 1同意退款 3同意换货
  const operationNum = ref(1)
  // 1同意退款 2退款退货  3同意换货
  const rejectNum = ref(3)
  const countDown = ref('')
  // 协商记录
  const consultList = ref<any[]>([])
  const imageList = ref<any[]>([])
  // 维权详情
  const resetProtectionDetails = async () => {
    const { data } = await reqProtectionDetails({
      id: route.query.id,
      order_item_id: route.query.orderId
    })
    protectionData.value = data.data
    for (let j = 0; j < paymentList.value.length; j++) {
      if (protectionData.value.pay_type == paymentList.value[j].key) {
        protectionData.value.payTypeName = paymentList.value[j].name
      }
    }
    if (protectionData.value.afterSales.images) {
      imageList.value = JSON.parse(protectionData.value.afterSales.images)
    }
    resetNegotiationRecord()
  }
  // 获取支付方式
  reqFullPayment().then((res) => {
    paymentList.value = res.data.data
  })
  // 协商记录
  const resetNegotiationRecord = async () => {
    const { data } = await reqNegotiationRecord({
      order_id: protectionData.value.afterSales.order_id,
      order_item_id: protectionData.value.afterSales.order_item_id,
      order_after_sale_id: protectionData.value.afterSales.id
    })
    consultList.value = data.data.data
    consultList.value.reverse()
    DownTime()
    if (protectionData.value.afterSales.status == 1 && protectionData.value.afterSales.type != 1) {
      setInterval(() => {
        DownTime()
      }, 1000)
    }
  }
  const DownTime = () => {
    consultList.value.forEach((item: any) => {
      if (item.remark.province_name) {
        const endTime =
          dayjs(item.remark.start_time * 1000)
            .add(overdueTime.value, 'day')
            .unix() - dayjs().unix()
        const leftd = Math.floor(endTime / (60 * 60 * 24))
        const lefth = Math.floor((endTime / (60 * 60)) % 24)
        const leftm = Math.floor(((endTime * 1000) / (1000 * 60)) % 60)
        const lefts = Math.floor(((endTime * 1000) / 1000) % 60)
        countDown.value = `${leftd}天${lefth}小时${leftm}分${lefts}秒`
      }
    })
  }

  // 获取交易配置数据
  const getTransactionAllocation = async () => {
    const { data } = await reqSetKeyConfig({ key: 'OrderBaseParam' })
    overdueTime.value = data.data.cancelSafeguard.value
  }
  // 驳回申请
  const rejectionApplication = (num: number) => {
    rejectNum.value = num
    state.value.application = true
  }
  // 已收到退货 同意退款
  const processRefund = async () => {
    await reqConfirmReceiptRefund({
      order_id: protectionData.value.id,
      order_item_id: protectionData.value.orderGoods[0].id,
      order_after_sale_id: protectionData.value.afterSales.id
    })
    ElMessage.success('操作成功!!')
    resetProtectionDetails()
  }
  // 子组件更新数据
  const updateData = () => {
    resetProtectionDetails()
  }
  // 重新发货
  const redeliveryBtn = () => {
    state.value.redelivery = true
  }
  // 同意维权或者驳回申请
  const agreeRefund = (num: number) => {
    operationNum.value = num
    state.value.reject = true
  }
  // 同意退款退货
  const returnAddressBtn = () => {
    state.value.returnGoods = true
  }
  // 物流信息根据物流单号和物流编号查询
  const seeLogistics = async (send_express_company_code: string, send_express_sn: string) => {
    const { data } = await reqViewLogistics({ send_express_company_code, send_express_sn })
    logisticsList.value = data.data
    state.value.logisticsData = true
  }

  onMounted(() => {
    getTransactionAllocation(), resetProtectionDetails()
  })
</script>
<style lang="scss" scoped>
  .process-box {
    margin-bottom: 24px;
    .process-box-left {
      text-align: center;
      padding: 20px 0 0 0;
      min-height: 463px;
    }
    .process-box-right {
      padding-left: 30px;
      :deep(.el-card__body) {
        min-height: 443px;
      }
      .information-box {
        display: flex;
        // flex-wrap: wrap;
        margin-top: 10px;
        div {
          min-width: 56px;
          font-size: 14px;
          color: #000;
        }
        .e-right {
          margin-right: 14px;
        }
        .public-box {
          margin-top: 27px;
          .paid {
            color: #1ad370;
          }
          .protection-img {
            width: 60px;
            height: 60px;
            margin-right: 14px;
          }
        }
      }
      .right-title {
        margin-bottom: 35px;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
      }
      .order-information {
        .information-list {
          overflow-x: auto;

          min-height: 340px;
          border-right: 1px solid #d9d9d9;
          margin-bottom: 15px;
          div {
            min-width: 56px;
          }
        }
      }
      .receiving-address {
        padding-left: 20px;
        .receiving-address-list {
          max-width: 375px;
          overflow-x: auto;

          min-height: 340px;
          margin-bottom: 15px;
        }
        div {
          min-width: 56px;
        }
      }
    }
  }

  .content-left-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
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
      text-align: right;
      font-size: 14px;
      line-height: 20px;
      color: #8c8c8c;
    }
    .triangle {
      position: absolute;
      right: -40px;
      top: -10px;
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
  :deep(.el-button) {
    padding: 5px 14px;
    min-height: 32px;
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
    height: 100%;
    :deep(.el-card) {
      height: 100%;
      min-height: 380px;
      border-radius: 10px;
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
  .consult-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .e-color {
    color: var(--color-primary);
  }
  :deep(.el-step__icon) {
    font-size: 20px;
  }
  .refund-time {
    color: #ff0000;
  }
  .e-grid {
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 1600px) {
    .information-list {
      min-height: 420px !important;
    }
    .receiving-address-list {
      min-height: 420px !important;
    }
  }
  @media only screen and (max-width: 1460px) {
    .information-list {
      min-height: 457px !important;
    }
    .receiving-address-list {
      min-height: 457px !important;
    }
  }
</style>
