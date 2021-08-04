<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 15:14:13
 * @Description: 小程序客服
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="oe-m-b-20">
    <div class="explain-box">
      <div class="explain">
        <div>客服使用说明：</div>
        <div>
          小程序客服助手是一款专门为小程序做的一款赋能插件，无需开发只需接入，它能帮助开发者在移动端为客户解决在线问题，可以很好的提高在线服务质量，降低成本。
          <span class="red-color">点击查看使用指南</span>
        </div>
        <div>开启小程序客服后，可在小程序商城显示客服入口，公众号等其他渠道均不显示客服入口</div>
        <div
          >如果同时开启“小程序客服”和“在线客服”功能时，买家通过小程序渠道发送的客服消息由小程序的客服接入客服消息，公众号等其他渠道由在线客服接入客服消息</div
        >
        <div
          >小程序客服消息使用除必须遵守《微信小程序平台运营规范》外，还不能违反以下规则，包括但不限于：</div
        >
        <div
          >1、不允许恶意诱导用户进行可能触发客服消息下发的操作，以达到可向用户下发客服消息目的</div
        >
        <div>2、不允许恶意骚扰，下发与用户发送的消息没有关联的、对用户造成骚扰的消息</div>
        <div>3、不允许恶意营销，下发内容涉嫌虚假夸大、违法类营销信息</div>
        <div>4、不允许使用客服消息向用户下发虚假、色情、暴力等违反国家法律规定的信息</div>
      </div>
      <div class="title">客服设置</div>
      <div class="switch-box">
        <span class="oe-m-r-14">是否启用客服</span>
        <el-switch
          v-model="serviceValue"
          active-color="#13ce66"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </div>
      <div class="editionChoice">
        <div :class="{ editionNumber: true }">
          <span>网页端客服</span>
        </div>
        <div :class="{ editionNumber: true }">
          <span>网页端客服</span>
        </div>
        <div :class="{ editionNumber: true }">
          <span>设置客服入口</span>
        </div>
      </div>
      <div class="explain-tips">
        注：小程序也可以直接使用微信公众平台网页版客服工具或者移动端小程序客服小助手进行客服消息回复
      </div>
    </div>
  </el-card>
  <div class="all-coupon-box">
    <el-card shadow="never" class="screen-box">
      <el-row :gutter="24">
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">关键词</div>
            <el-input
              class="oe-flex-1"
              v-model="formInfo.name"
              placeholder="微信号/微信昵称"
            ></el-input>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">绑定时间</div>
            <el-date-picker
              prefix-icon="el-icon-date"
              class="oe-flex-1"
              v-model="formInfo.createtime"
              type="datetime"
              placeholder="选择绑定时间"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <el-button @click="resetGoodsList()" type="primary" size="small">搜索</el-button>
            <div class="reset-text" @click="getEmpty">重置条件</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 全部优惠券表格 -->
    <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
      <div class="screen-box">
        <el-row :gutter="24">
          <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
            <div class="oe-flex is-grid">
              <el-input
                class="oe-flex-1"
                v-model="formInfo.name"
                placeholder="请输入体验者的微信账号"
              ></el-input>
            </div>
          </el-col>
          <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
            <div class="oe-flex is-grid">
              <el-button @click="resetGoodsList()" type="primary" size="small">绑定客服</el-button>
              <el-button size="small">同步客服</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table
        stripe
        :border="false"
        class="revenue-list"
        tooltip-effect="dark"
        ref="revenueTable"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'createtime' }"
      >
        <el-table-column label="客服ID" prop="id" min-width="150" sortable> </el-table-column>
        <el-table-column label="客服账号" prop="id" min-width="150"> </el-table-column>
        <el-table-column label="客服微信号" prop="id" min-width="150"> </el-table-column>
        <el-table-column label="客服微信昵称" prop="id" min-width="150"> </el-table-column>
        <el-table-column label="客服微信头像" min-width="150">
          <template #default="scope">
            <el-image style="width: 40px; height: 40px" :src="scope.row.nickname"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="绑定时间" prop="createtime" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="160">
          <template #default="scope">
            <div class="edit oe-flex">
              <custom-button
                @click="relieveBinding(scope.row.id)"
                icon="ad-unbind"
                color="#FF0000"
                class="public-move-left oe-m-l-0"
              >
                解除绑定
              </custom-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-col :lg="24" class="paging-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </el-col>
    </el-card>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqShopUserCouponIndex } from '@/api/marketing'
  import { formatUnix } from '@/utils'
  import dayjs from 'dayjs'

  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // switch
  const serviceValue = ref(0)
  //  列表数据
  const tableData = ref([
    {
      date: '默认导航',
      name: '王小虎',
      address: '维权结束',
      coupon: { name: '优惠券名称', type: 2, money: '11.00', condition_order_amount: '11.00' },
      user: { nickname: '13308435101' }
    }
  ])
  // 重置按钮
  const getEmpty = () => {
    formInfo.value.name = ''
    formInfo.value.createtime = ''
    formInfo.value.type = ''
    formInfo.value.nickname = ''
  }
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    createtime: '',
    type: '',
    nickname: ''
  })
  // 请求接口数据 start
  // 解除绑定
  const relieveBinding = (id: Key) => {
    // console.log(id)
  }
  // 商品列表
  const resetGoodsList = async () => {
    if (formInfo.value.createtime != '') {
      formInfo.value.createtime = dayjs(formInfo.value.createtime).unix()
    }
    const subInfo: any = {
      search: formInfo.value,
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
    // console.log(subInfo, 'sub')
    const { data } = await reqShopUserCouponIndex(subInfo)

    pagination.total = data.data.total
    tableData.value = data.data.data
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => resetGoodsList(), {
    immediate: true
  })
</script>
<style lang="scss">
  .all-coupon-box {
    .el-button i {
      font-size: 14px;
    }
  }
</style>
<style lang="scss" scoped>
  .explain-box {
    .explain {
      font-size: 12px;
      background: rgba(255, 157, 40, 0.2);
      border: 1px solid #ff9d28;
      padding: 14px;
      margin-bottom: 18px;
      div {
        margin-bottom: 10px;
        .red-color {
          color: #ff0000;
        }
      }
    }
    .title {
      font-size: 16px;
      color: #000;
      font-weight: 500;
      margin-bottom: 14px;
    }
    .switch-box {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 14px;
    }
    .editionChoice {
      display: flex;
      font-size: 14px;
      margin-bottom: 14px;
      .editionNumber {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        width: 150px;
        height: 32px;
        border-radius: 2px;
        border: 1px solid #8c8c8c;
      }
    }
    .explain-tips {
      font-size: 12px;
      color: #8c8c8c;
    }
  }
  .screen-box {
    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    .screen-text {
      font-size: 14px;
      color: #000;
      margin-right: 14px;
    }
    .is-grid {
      margin-bottom: 20px;
    }
    :deep(.el-button) {
      padding: 2px 40px;
    }
    .reset-text {
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
  }
  .refund-list {
    margin-top: 20px;
    :deep(.cell) {
      color: #000;
    }
    .success-text {
      color: #1ad370;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }

    .member-text {
      font-size: 12px;
      color: var(--color-primary);
    }
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4px 14px 16px;
    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      width: 200px;
      font-size: 14px;
      color: #8c8c8c;
    }
  }
  // 操作
  .edit {
    margin-bottom: 10px;
    :deep(.el-button) {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 2px 8px;
      min-height: 24px;
      border-radius: 2px;
      margin-left: 14px;
      i {
        padding-right: 3px;
      }
    }
  }
</style>
