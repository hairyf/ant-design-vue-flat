<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-11 16:24:34
 * @Description: 会员详情
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="detail-head">
    <template #header>
      <div class="card-header">
        <span>基础信息</span>
        <div class="operation-btn">
          <el-button plain @click="getBlackListDialog(0)" v-if="memberData.status == 1">
            加入黑名单
          </el-button>
          <el-button plain @click="getBlackListDialog(1)" v-if="memberData.status == 2">
            取消黑名单
          </el-button>
          <el-button plain @click="state.delMember = true">删除会员</el-button>
        </div>
      </div>
    </template>
    <el-row :gutter="20" style="min-height: 200px">
      <el-col :xl="6" :sm="12">
        <div class="member-information e-grid">
          <el-image style="width: 90px; height: 90px" :src="memberData.avatar" fit="cover">
          </el-image>
          <div class="information-right">
            <div class="oe-flex">
              <div class="naming">会员昵称</div>
              <div class="middle-text" v-if="memberData.nickname">{{ memberData.nickname }}</div>
            </div>
            <div class="oe-flex middle">
              <div class="naming">会员等级</div>
              <div class="middle-text">{{ gradeData.level_name }}</div>
              <el-button type="text" @click="state.grade = true">修改</el-button>
            </div>
            <div class="label-box">
              <div class="naming">标签组</div>
              <div class="middle-text label-tag oe-flex oe-flex-wrap">
                <el-tag size="mini" v-for="(item, index) in labelList" :key="index">{{
                  item.label_name
                }}</el-tag>
              </div>
              <div>
                <el-button type="text" @click="state.label = true">修改</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :sm="12" class="member-information">
        <div class="e-grid">
          <div class="oe-flex">
            <div class="naming">联系电话</div>
            <div class="middle-text">{{ memberData.mobile ? memberData.mobile : '无' }}</div>
          </div>
          <div class="oe-flex middle">
            <div class="naming">会员来源</div>
            <el-image
              class="middle-text"
              style="width: 15px; height: 15px"
              :src="channelData?.img_url"
              fit="cover"
            >
            </el-image>
          </div>
          <div class="oe-flex">
            <div class="naming">被邀请人</div>
            <div class="middle-text">{{ invitedData ? invitedData.nickname : '无' }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :sm="12" class="member-information">
        <div class="e-grid">
          <div class="oe-flex">
            <div class="naming">注册时间</div>
            <div class="middle-text">{{ memberData.jointime }}</div>
          </div>
          <div class="oe-flex middle">
            <div class="naming">最近登录时间</div>
            <div class="middle-text">{{ memberData.prevtime }}</div>
          </div>
          <div class="oe-flex">
            <div class="naming">已邀请</div>
            <div class="middle-text">{{ subordinateTotal ? subordinateTotal : '无' }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :sm="12" class="member-information">
        <div class="e-grid">
          <div class="oe-flex">
            <div class="naming">Open ID</div>
            <div class="middle-text" v-if="partyList.length">{{ partyList[0].openid }}</div>
          </div>
          <div class="oe-flex middle">
            <div class="naming">收货地址</div>
            <div class="middle-text" v-if="addressData"
              >{{ addressData.province_name }} {{ addressData.city_name }}
              {{ addressData.area_name }} {{ addressData.address }}</div
            >
          </div>
          <div class="oe-flex middle">
            <div class="naming">会员密码</div>
            <div class="middle-text">******</div>
            <el-button type="text" @click="changePassword">修改</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="48" class="top-border">
      <el-col :xl="8" :sm="8">
        <div class="detail-footer">
          <div>
            <p class="text-weight">账号余额</p>
            <p class="text-money">￥{{ memberData.money }}</p>
            <p
              >累计充值金额：{{ memberData.total_recharge_money }}
              <!-- <el-button type="text">查看详情</el-button> -->
            </p>
          </div>
          <el-button type="primary" @click="state.priceAdjust = true">调整</el-button>
        </div>
      </el-col>
      <el-col :xl="8" :sm="8">
        <div class="detail-footer">
          <div>
            <p class="text-weight">账户积分</p>
            <p class="text-style">{{ memberData.score ? memberData.score : 0 }}</p>
            <p
              >累计积分总数：{{ memberData.total_score }}
              <!-- <el-button type="text">查看详情</el-button> -->
            </p>
          </div>
          <el-button type="primary" @click="integralAdjustment">调整</el-button>
        </div>
      </el-col>
      <el-col :xl="8" :sm="8">
        <div class="detail-footer">
          <div>
            <p class="text-weight">优惠券</p>
            <p class="text-style">{{ couponList.length }}</p>
          </div>
          <el-button type="primary" @click="state.coupon = true" style="transform: translateY(26px)"
            >查看</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-row :gutter="20">
    <el-col :xl="18" :sm="18">
      <el-card shadow="never" class="custom-crad-container custom-card-page">
        <template #header>
          <div class="card-header">
            <span>最近交易</span>
            <el-button type="text" @click="jumpOrder">查看更多</el-button>
          </div>
        </template>
        <el-table
          ref="multipleTable"
          class="table-box"
          :cell-style="{ background: '#fff' }"
          :data="recenDealsList"
          style="width: 100%"
        >
          <el-table-column label="商品名称" min-width="160" prop="date">
            <template #default="scope">
              <div class="oe-flex member-name">
                <el-image :src="scope.row.goods_image" class="member-name-img" />
                <div>
                  <div class="member-name-text">{{ scope.row.goods_title }}</div>
                  <div class="oe-flex"> </div>
                </div> </div
            ></template>
          </el-table-column>
          <el-table-column prop="goods_num" label="数量(件)"> </el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" min-width="90">
          </el-table-column>
          <el-table-column prop="address" label="实付金额" min-width="70">
            <template #default="scope">
              {{
                (scope.row.goods_price - scope.row.discount_fee * scope.row.goods_num).toFixed(2)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="下单时间" min-width="100">
            <template #default="scope">
              {{ formatUnix(scope.row.createtime) }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="address" label="付款时间" min-width="100">
            <template #default="scope">
              {{ formatUnix(scope.row.createtime) }}
            </template>
          </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>
    <el-col :xl="6" :sm="6" class="detail-right">
      <el-card shadow="never" class="e-grid e-top">
        <div class="text-weight">累计成交订单数/单</div>
        <div class="member-footer">
          <div class="text-style">{{
            memberData.total_order_nums ? memberData.total_order_nums : 0
          }}</div>
          <el-button type="text" @click="jumpOrder">查看详情</el-button>
        </div>
      </el-card>
      <el-card shadow="never" class="e-grid">
        <div class="text-weight">累计成交金额/元</div>
        <div class="member-footer">
          <div class="text-style"
            >¥{{ memberData.total_order_money ? memberData.total_order_money : 0 }}</div
          >
          <el-button type="text" @click="jumpOrder">查看详情</el-button>
        </div>
      </el-card>
      <el-card shadow="never" class="e-grid">
        <div class="text-weight">累计退款订单数/单</div>
        <div class="member-footer">
          <div class="text-style">{{
            memberData.total_refund_nums ? memberData.total_refund_nums : 0
          }}</div>
          <el-button
            type="text"
            @click="
              router.push({
                path: '/order/management/all-orders',
                query: { user_id: memberData.id, total_refund_money: ['', 0.01] }
              })
            "
            >查看详情</el-button
          >
        </div>
      </el-card>
      <el-card shadow="never" class="e-grid">
        <div class="text-weight">累计退款金额/元</div>
        <div class="member-footer">
          <div class="text-style"
            >¥{{ memberData.total_refund_money ? memberData.total_refund_money : 0 }}</div
          >
          <el-button
            type="text"
            @click="
              router.push({
                path: '/order/management/all-orders',
                query: { user_id: memberData.id, total_refund_money: ['', 0.01] }
              })
            "
            >查看详情</el-button
          >
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 模态框层 -->
  <!-- 黑名单模态框 -->
  <memberBlackConfirm
    :currentItem="memberData"
    :isSingle="isSingle"
    :isMultiple="false"
    v-model:show="state.black"
    @restDetailsData="restDetailsData"
  ></memberBlackConfirm>
  <!-- 删除会员模态框 -->
  <memberDelete :memberData="memberData" v-model:show="state.delMember"></memberDelete>
  <!-- 优惠券模态框 -->
  <memberCoupon v-model:show="state.coupon" :couponList="couponList"></memberCoupon>
  <!-- 价格调整 -->
  <memberAdjustPrice
    :memberData="memberData"
    v-model:show="state.priceAdjust"
    @restDetailsData="restDetailsData"
  ></memberAdjustPrice>
  <memberAdjustIntegral
    :memberData="memberData"
    v-model:show="state.integral"
    @restDetailsData="restDetailsData"
  ></memberAdjustIntegral>
  <!-- 等级模态框 -->
  <memberGrade
    v-model:show="state.grade"
    :currentGrade="gradeData"
    :isBatch="false"
    :currentItem="memberData"
    @getGradeList="getGradeList"
  ></memberGrade>
  <!-- 标签模态框 -->
  <memberLabel
    v-model:show="state.label"
    :currentList="labelList"
    :isBatch="false"
    :currentItem="memberData"
    @getLabelList="getLabelList"
  ></memberLabel>
  <el-dialog title="修改会员密码" v-model="passWordShow" width="554px">
    <el-form
      label-width="130px"
      :model="changPasswordForm"
      :rules="rules"
      ref="rluesForm"
      class="change-password"
    >
      <el-form-item label="新登录密码" prop="password"
        ><el-input
          v-model="changPasswordForm.password"
          show-password
          placeholder="请输入新登录密码"
        ></el-input
      ></el-form-item>
      <el-form-item label="确认新登录密码" prop="newPassword"
        ><el-input
          v-model="changPasswordForm.newPassword"
          show-password
          placeholder="请输入确定新登录密码"
        ></el-input
      ></el-form-item>
      <el-form-item label="备注" prop="remarks"
        ><el-input
          type="textarea"
          v-model.trim="changPasswordForm.remarks"
          placeholder="请输入备注"
        ></el-input
      ></el-form-item>
      <el-form-item label="系统登录密码" prop="systemPassword">
        <el-input
          class="password-inp adjust-form-integral"
          show-password
          v-model="changPasswordForm.systemPassword"
          :validate-event="false"
          placeholder="请输入系统登录密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passWordShow = false">取 消</el-button>
        <el-button type="primary" @click="modifyAccount">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import memberBlackConfirm from './member-modality/member-black-confirm.vue'
  import memberDelete from './member-modality/member-delete.vue'
  import memberCoupon from './member-modality/member-coupon.vue'
  import memberGrade from './member-modality/member-grade.vue'
  import memberLabel from './member-modality/member-label.vue'
  import memberAdjustPrice from './member-modality/member-adjust-price.vue'
  import memberAdjustIntegral from './member-modality/member-adjust-integral.vue'
  import {
    reqBasicData,
    reqCoupon,
    reqReceivingAddress,
    reqSubordinate,
    reqSuperior,
    reqThirdParty,
    reqUserChannel,
    reqUserLabel,
    reqUserLevel,
    reqChangeUserPassword
  } from '@/api/member'
  import { reqVerification } from '@/api/order'
  import { useRoute, useRouter } from 'vue-router'
  import { reqOrderList } from '@/api/order'
  import { formatUnix } from '@/utils'
  import { ElMessage } from 'element-plus'
  // 当前容器元素
  const multipleTable = ref<any>()
  const route = useRoute()
  const router = useRouter()
  const rluesForm = ref<any>()
  // 是否是加入黑名单0 1移除黑名单
  const isSingle = ref(0)
  // 会员详情数据
  const memberData = ref<any>({})
  // 渠道信息
  const channelData = ref<any>({})
  // 标签列表
  const labelList = ref<any[]>([])
  // 等级数据
  const gradeData = ref<any>({})
  // 第三方数据
  const partyList = ref<any[]>([])
  // 收货地址
  const addressData = ref<any>({})
  // 被邀请人数据
  const invitedData = ref<any>({})
  // 下级总数
  const subordinateTotal = ref(0)
  // 优惠券数据
  const couponList = ref<any[]>([])
  // 显示不同模态框
  const state = ref({
    // 删除会员
    delMember: false,
    // 黑名单
    black: false,
    // 优惠券
    coupon: false,
    // 余额
    priceAdjust: false,
    // 积分
    integral: false,
    // 标签
    label: false,
    // 等级
    grade: false
  })
  const checkPassword = async (rule: any, value: any, callback: any) => {
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        callback()
      } catch (error) {
        callback(new Error('密码不正确,请重新输入密码'))
      }
    } else {
      callback(new Error('请输入密码'))
    }
  }
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (changPasswordForm.value.newPassword !== '') {
        rluesForm.value.validateField('newPassword')
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== changPasswordForm.value.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  const rules = ref({
    systemPassword: [{ required: true, validator: checkPassword, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    newPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }]
  })
  const changPasswordForm = ref({
    password: '',
    newPassword: '',
    remarks: '',
    systemPassword: ''
  })
  const passWordShow = ref(false)
  // 修改会员密码
  const modifyAccount = () => {
    rluesForm.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqChangeUserPassword({
          id: memberData.value.id,
          password: changPasswordForm.value.password,
          manager_remark: changPasswordForm.value.remarks
        })
        ElMessage.success('修改成功')
        passWordShow.value = false
      }
    })
  }
  // 最近交易数据
  const recenDealsList = ref<any>([])
  // 黑名单模态框
  const getBlackListDialog = (num: number) => {
    isSingle.value = num
    state.value.black = true
  }
  // 积分调整
  const integralAdjustment = () => {
    state.value.integral = true
  }
  // 标签数据
  const getLabelList = async () => {
    const { data } = await reqUserLabel({ id: route.query.id, status: -1 })
    labelList.value = data.data.label_list
  }
  // 等级数据
  const getGradeList = async () => {
    const { data } = await reqUserLevel({ id: route.query.id, status: -1 })
    gradeData.value = data.data.current_level
  }
  // 详情数据
  const restDetailsData = async () => {
    const { data } = await reqBasicData({ id: route.query.id })
    memberData.value = data.data
    const arr1 = [] as any[]
    const arr2 = [] as any[]
    recenDealsList.value = []
    reqOrderList({ user_id: data.data.id, page: 1, limit: 10 }).then((res) => {
      res.data.data.data.forEach((item1: any) => {
        arr1.push(item1)
      })
      arr1.forEach((item) => arr2.push(item.orderGoods))
      arr2.forEach((item) => recenDealsList.value.push(item[0]))
    })
  }
  // 渠道数据
  const getChannelData = async () => {
    const { data } = await reqUserChannel({ id: route.query.id })
    channelData.value = data.data.channel_info
  }
  // 第三方数据
  const getThirdParty = async () => {
    const { data } = await reqThirdParty({ id: route.query.id })
    partyList.value = data.data.third_list
  }
  // 收货地址
  const getReceivingAddress = async () => {
    const { data } = await reqReceivingAddress({ id: route.query.id })
    addressData.value = data.data.default_addr_info
  }
  //被邀请人
  const getInvited = async () => {
    const { data } = await reqSuperior({ id: route.query.id })
    invitedData.value = data.data.parent_info
  }
  // 下级数据
  const getSubordinate = async () => {
    const { data } = await reqSubordinate({ id: route.query.id })
    subordinateTotal.value = data.data.son_list.total
  }
  // 优惠券数据
  const getcouponList = async () => {
    const { data } = await reqCoupon({ id: route.query.id })
    couponList.value = data.data.coupon_list
  }
  // 修改密码
  const changePassword = () => {
    passWordShow.value = true
  }
  //跳转订单页面
  const jumpOrder = () => {
    router.push({
      path: '/order/management/all-orders',
      query: {
        user_id: memberData.value.id
      }
    })
  }

  onMounted(() => {
    restDetailsData(),
      getChannelData(),
      getLabelList(),
      getGradeList(),
      getThirdParty(),
      getReceivingAddress(),
      getInvited(),
      getSubordinate(),
      getcouponList()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .detail-head {
    .card-header {
      display: flex;
      justify-content: space-between;
      .el-button {
        font-weight: 700;
      }
    }
    .member-information {
      display: flex;
      font-size: 14px;
      color: #000;
      .el-icon-success {
        color: #00dfb9;
      }
      .naming {
        text-align: right;
      }
      .middle {
        margin: 28px 0;
      }
      .middle-text {
        margin: 0 14px;
      }
      .information-right {
        margin-left: 14px;
      }
      .label-box {
        display: flex;
        align-items: center;
        .label-tag {
          max-width: 100px;
        }
        .el-tag {
          margin: 5px;
        }
      }
      :deep(.el-button) {
        padding: 0;
        line-height: 0 !important;
        min-height: 12px;
      }
    }
    .operation-btn {
      :deep(.el-button) {
        padding: 0;
        width: 84px;
        min-height: 32px;
      }
    }
    .detail-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      :deep(.el-button) {
        padding: 0 28px;
        min-height: 32px;
      }
    }

    .top-border {
      min-height: 200px;
      border-top: 1px solid #ccc;
      .el-col {
        margin-top: 20px;
      }
      .el-col:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
  }
  .text-style {
    font-size: 32px;
    font-weight: 700;
  }
  .text-weight {
    font-weight: 700;
  }
  .text-money {
    font-size: 32px;
    font-weight: 700;
    color: #ff0000;
  }
  .e-top {
    margin-top: 24px;
  }
  .member-footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // 分割线
  .e-grid {
    margin-bottom: 20px;
  }
  :deep(.cell) {
    color: #000;
  }
  :deep(.custom-crad-container) {
    .el-card {
      .el-card__body {
        min-height: 508px;
      }
    }
    margin-top: 24px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .member-name {
      .member-name-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .member-name-text {
        font-size: 14px;
        margin-bottom: 4px;
        color: #000000;
      }
      .blacklist-text {
        padding: 0 5px;
        color: #000000;
        font-size: 12px;
        margin-left: 12px;
        background: rgba(0, 0, 0, 0.05);
      }
      .name-icon {
        width: 15.75px;
        height: 15.75px;
      }
    }
    .is-color {
      color: #ff5732;
    }

    :deep(.cell) {
      color: #000;
    }
    .table-box {
      .btn-bottom {
        margin-top: 14px;
      }
    }
  }
  .public-text {
    color: var(--color-primary);
  }
  :deep(.el-tag) {
    border-width: 0;
    border-radius: 0;
  }
  :deep(.el-textarea__inner) {
    height: 132px;
  }
  .dialog-footer {
    :deep(.el-button) {
      padding: 0 46px;
      min-height: 32px;
    }
  }
</style>
