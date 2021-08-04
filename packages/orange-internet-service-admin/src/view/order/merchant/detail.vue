<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-27 11:19:46
 * @LastEditTime: 2021-07-10 15:55:42
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="order-detail">
    <a-row :gutter="[12, 0]">
      <a-col :span="24" class="mb-20">
        <a-row>
          <a-col span="24">
            <cal-card>
              <cal-steps
                v-if="detailData.status !== -1"
                :current="detailData.status === 2 ? 3 : 0"
                labelPlacement="vertical"
              >
                <cal-step title="商户下单" :description="$formatUnix(detailData.createtime)" />
                <cal-step
                  title="商户付款"
                  :description="detailData.status === 2 ? $formatUnix(detailData.finshtime) : ''"
                />
                <cal-step
                  title="交易完成"
                  :description="detailData.status === 2 ? $formatUnix(detailData.finshtime) : ''"
                />
              </cal-steps>
              <cal-steps v-else current="2" labelPlacement="vertical">
                <cal-step title="商户下单" :description="$formatUnix(detailData.createtime)" />
                <cal-step title="交易关闭" :description="$formatUnix(detailData.deletetime)" />
              </cal-steps>
            </cal-card>
          </a-col>
        </a-row>
      </a-col>
      <a-row :gutter="[12, 0]" class="flex items-center">
        <a-col :xl="24" :xxl="16">
          <a-row>
            <a-col :xl="24" :xxl="24" class="mb-14">
              <cal-card>
                <cal-sticky-layout minHeight="344">
                  <a-descriptions title="订单信息">
                    <!-- <a-descriptions-item label="订单状态"> 待付款 28分39秒后自动取消 </a-descriptions-item> -->
                    <a-descriptions-item label="订单状态">
                      {{
                        detailData.status === -1
                          ? '已关闭'
                          : detailData.status === 0
                          ? '未付款'
                          : '已完成'
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item label="订单编号">
                      {{ detailData.sn }}
                    </a-descriptions-item>
                    <a-descriptions-item label="订单类型">
                      {{
                        [
                          '其他订单',
                          '应用订单',
                          '模板订单',
                          '渠道订单',
                          '主题订单',
                          '空间扩容订单',
                          '店铺订单'
                        ][detailData.type] || '其他订单'
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item label="支付状态">
                      {{
                        detailData.status === 2 ? '已支付' : detailData.status === 0 ? '未支付' : ''
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item label="支付方式">
                      {{ detailData.pay_name }}
                    </a-descriptions-item>
                  </a-descriptions>
                  <template #sticky>
                    <div v-if="detailData.status === 0">
                      <cal-button
                        class="px-20 mr-28"
                        type="primary"
                        @click="confirmPayment(detailData.id, detailData)"
                      >
                        确认付款
                      </cal-button>
                      <cal-button class="px-20" @click="closeOrder(detailData.id, detailData)">
                        关闭订单
                      </cal-button>
                    </div>
                  </template>
                </cal-sticky-layout>
              </cal-card>
            </a-col>
            <a-col :xl="24" :xxl="24">
              <cal-card>
                <cal-sticky-layout minHeight="344">
                  <a-descriptions title="店铺信息">
                    <a-descriptions-item class="flex items-center" label="店铺Logo">
                      <cal-image
                        class="w-40 h-40"
                        :src="detailData.logo_path"
                        :fallback="shopLogo"
                      />
                    </a-descriptions-item>
                    <a-descriptions-item label="店铺名称">
                      {{ detailData.shop_name }}
                    </a-descriptions-item>
                    <a-descriptions-item label="店铺ID">
                      {{ detailData.shop_id }}
                    </a-descriptions-item>
                    <a-descriptions-item label="联系人">
                      {{ detailData.liaisons }}
                    </a-descriptions-item>
                    <a-descriptions-item label="联系方式">
                      {{ detailData.liaisons_tel }}
                    </a-descriptions-item>
                    <a-descriptions-item label="店铺状态">
                      {{
                        [
                          '已封禁',
                          '待审核',
                          '审核失败',
                          '审核通过(待创建)',
                          '已选择套餐(待创建)',
                          '创建失败',
                          '支付成功',
                          '暂停营业(套餐过期)',
                          '正常营业'
                        ][detailData.shop_status]
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item label="创建时间">
                      {{ $formatUnix(detailData.shop_createtime) }}
                    </a-descriptions-item>
                    <a-descriptions-item label="到期时间">
                      {{ $formatUnix(detailData.deadline) }}
                    </a-descriptions-item>
                  </a-descriptions>
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
            <a-col :xl="12" :xxl="24" class="mb-14">
              <cal-card class="lg:h-384" style="min-height: 392px">
                <a-descriptions :column="2">
                  <template #title>
                    <div class="flex justify-between items-center">
                      <span>其他信息</span>
                      <cal-button @click="fillInRemark(detailData.id)" class="w-112 h-32"
                        >填写备注</cal-button
                      >
                    </div>
                  </template>
                  <a-descriptions-item label="备注角色">
                    {{ detailData?.service_remark?.username || '--'}}
                  </a-descriptions-item>
                  <a-descriptions-item label="备注时间">
                    {{
                      detailData?.service_remark?.time
                        ? $formatUnix(detailData?.service_remark?.time)
                        : '--'
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item label="备注内容">
                    {{ detailData?.service_remark?.service_remark || '--' }}
                  </a-descriptions-item>
                </a-descriptions>
              </cal-card>
            </a-col>
            <a-col :xl="12" :xxl="24">
              <cal-card class="lg:h-384" style="min-height: 392px">
                <a-descriptions title="套餐信息" :column="2">
                  <a-descriptions-item label="套餐名称"> 套餐 </a-descriptions-item>
                  <a-descriptions-item label="数量"> x1 </a-descriptions-item>
                  <a-descriptions-item label="套餐价格"> ¥ ---- </a-descriptions-item>
                  <a-descriptions-item label="套餐时限"> 永久有效 </a-descriptions-item>
                  <a-descriptions-item label="到期时间"> 无限制 </a-descriptions-item>
                </a-descriptions>
              </cal-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  import {
    reqBusinessShopDetails,
    reqCancelOrder,
    reqConfirmPayment,
    reqOrderRemark,
    reqTryOutShopDetails
  } from '@/api/order'
  import {
    CalCloseOrder,
    CalConfirmPayment,
    CalFillInRemark
  } from './components/MessageDialogTemplate'
  import { message } from 'ant-design-vue'
  import { reqVerification } from '@/api/shop'
  import shopLogo from '@/assets/img/user/default.png'

  /* 路由携带参数 */
  const { query } = useRoute() as any

  /* 详情数据列表 */
  const detailData = ref({
    status: 0,
    sn: '',
    type: 0,
    pay_name: '无',
    shop_name: '',
    liaisons: '',
    liaisons_tel: '',
    shop_status: 0,
    shop_createtime: 0,
    createtime: 0,
    deadline: 0,
    finshtime: 0,
    deletetime: 0,
    id: 0,
    logo_path: '',
    shop_id: '',
    service_remark: {
      remark: '',
      time: 0,
      username: ''
    }
  })

  /* 确定支付 */
  const confirmPayment = async (id: number, item: any) => {
    const { text, password } = await CalConfirmPayment()
    await reqVerification({ confirmPwd: password })
    await reqConfirmPayment({ id, type: 0, admin_pay_remark: text })
    item.status = 2
    message.success('确认支付成功', 1.5)
  }

  /* 填写备注 */
  const fillInRemark = async (id: number) => {
    const { text } = await CalFillInRemark()
    if (!text.value) return message.warn('请输入备注内容')
    await reqOrderRemark({ id, service_remark: text.value })
    message.success('备注成功', 1.5)
    await getDetails()
  }

  /* 关闭订单 */
  const closeOrder = async (id: number, item: any) => {
    const { text } = await CalCloseOrder()
    await reqCancelOrder({ id })
    item.status = -1
    message.success('订单关闭成功', 1.5)
  }

  /* 获取详情列表 */
  const getDetails = async () => {
    if (query.type === 'business') {
      const { data } = await reqBusinessShopDetails({ search: { id: query.id } })
      detailData.value = data.data[0] || []
    }
    if (query.type === 'onTrial') {
      const { data } = await reqTryOutShopDetails({ search: { id: query.id } })
      detailData.value = data.data[0] || []
    }
  }

  onMounted(async () => {
    await getDetails()
  })
</script>
<style lang="scss" scoped></style>
