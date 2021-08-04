<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-27 11:19:46
 * @LastEditTime: 2021-07-09 16:08:35
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="order-detail">
    <a-row :gutter="[12, 0]">
      <a-col :span="24" style="margin-bottom: 20px">
      <a-row>
        <a-col span="24">
          <cal-card>
            <cal-steps
                v-if="detailData.status !== -1 && detailData.status !== -2"
                :current="detailData.status === 1 ? 3 : 0"
                labelPlacement="vertical"
            >
              <cal-step title="买家下单" :description="$formatUnix(detailData.createtime)" />
              <cal-step title="买家付款" :description="$formatUnix(detailData.finshtime)" />
              <cal-step title="交易完成" :description="$formatUnix(detailData.finshtime)" />
            </cal-steps>
            <cal-steps v-else current="2" labelPlacement="vertical">
              <cal-step title="买家下单" :description="$formatUnix(detailData.createtime)" />
              <cal-step title="订单关闭" :description="$formatUnix(detailData.deletetime)" />
            </cal-steps>
          </cal-card>
        </a-col>
      </a-row>
    </a-col>
      <a-col :xl="24" :xxl="16">
        <a-row>
          <a-col :xl="24" :xxl="24">
            <cal-card>
              <cal-sticky-layout minHeight="344">
                <a-descriptions title="订单信息">
                  <!-- <a-descriptions-item label="订单状态"> 待付款 28分39秒后自动取消 </a-descriptions-item> -->
                  <a-descriptions-item label="订单状态">
                    {{
                      detailData.status === -1
                        ? '已关闭'
                        : detailData.status === 0
                        ? '待付款'
                        : detailData.status === 1
                        ? '已完成'
                        : '已关闭'
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item label="订单编号"> {{ detailData.sn }} </a-descriptions-item>
                  <a-descriptions-item label="支付状态">
                    {{
                      detailData.status === 1 ? '已支付' : detailData.status === 0 ? '未支付' : ''
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item label="支付方式">
                    {{ detailData.pay_name }}
                  </a-descriptions-item>
                  <a-descriptions-item label="下单业务">
                    {{
                      ['应用订单', '渠道订单', '模板订单', '主题订单', '套餐订单'][
                        detailData.type
                      ] || '其他订单'
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item label="套餐金额">
                    {{ detailData.amount }}
                  </a-descriptions-item>
                  <a-descriptions-item label="有效时限">
                    {{ (detailData.type>=1 && detailData.type <= 4)?'永久':'' }}
                    {{ detailData.expire_time ? $formatUnix(detailData.expire_time) : '' }}
                  </a-descriptions-item>
                </a-descriptions>
                <template #sticky>
                  <div v-if="detailData.status === 0">
                    <cal-button
                      class="px-20 mr-28"
                      type="primary"
                      @click="toPayment(detailData.id, detailData)"
                    >
                      去付款
                    </cal-button>
                    <cal-button class="px-20" @click="cancelOrder(detailData.id, detailData)">
                      取消订单
                    </cal-button>
                  </div>
                </template>
              </cal-sticky-layout>
            </cal-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="24" :xxl="8">
        <a-row
          :gutter="[
            { xl: 12, xxl: 0 },
            { xl: 25, xxl: 0 }
          ]"
        >
          <a-col :xl="12" :xxl="24">
            <cal-card class="lg:h-384">
              <a-descriptions title="操作人信息" :column="2">
                <a-descriptions-item label="下单人员"> 超级管理员 </a-descriptions-item>
                <a-descriptions-item label="角色权限"> 超级管理员 </a-descriptions-item>
                <a-descriptions-item label="操作时间">
                  {{ $formatUnix(detailData.updatetime) }}
                </a-descriptions-item>
              </a-descriptions>
            </cal-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  import { reqPlatformOrderDetails, reqCancelPlatformOrder } from '@/api/order'
  import { CalPaymentOrder } from './merchant/components/MessageDialogTemplate'
  import { message } from 'ant-design-vue'
  import { CalMessageDialog } from '@/components/CustomAntds/CalMessageDialog'
  /** 路由携带参数 */
  const { query } = useRoute() as any

  /** 数据列表 */
  const detailData = ref({
    status: 0,
    sn: '',
    type: 0,
    pay_name: '无',
    shop_createtime: 0,
    deletetime: 0,
    expire_time: 0,
    amount: '',
    updatetime: 0,
    createtime: 0,
    finshtime: 0,
    id: 0
  })

  /* 去支付按钮 */
  const toPayment = async (id: number, item: any) => {
    await CalPaymentOrder()
  }

  /* 取消订单 */
  const cancelOrder = async (id: number, item: any) => {
    await CalMessageDialog.warning({
      title: '取消订单',
      content: '您确定取消该订单么？'
    })
    await reqCancelPlatformOrder({ id })
    item.status = -1
    await message.success('取消订单成功', 1.5)
  }

  /** 获取详情请求 */
  const getDetails = async () => {
    const { data } = await reqPlatformOrderDetails({ id: query.id })
    detailData.value = data.data[0] || []
  }

  /** 首次获取详情 */
  onMounted(async () => {
    await getDetails()
  })
</script>
<style lang="scss" scoped></style>
