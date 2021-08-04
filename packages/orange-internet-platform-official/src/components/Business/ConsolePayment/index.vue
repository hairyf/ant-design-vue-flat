<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-17 10:59:08
 * @LastEditTime: 2021-07-01 10:49:25
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <Modal
    v-model:visible="show"
    v-bind="props"
    :footer="null"
    :title="title"
    @ok="onClone"
    @cancel="onClone"
    wrapClassName="pay-console-box"
  >
    <template v-if="!payStatus">
      <Tabs
        tab-position="left"
        v-model:activeKey="activeKey"
        :tabBarGutter="0"
        class="h-288 w-full"
      >
        <TabPane :disabled="disabled" key="WxPay" tab="微信支付">
          <div class="flex justify-center items-center h-288">
            <div v-if="disabled" class="flex justify-center gap-10">
              <QrCode :size="100" :text="payInfo.data" />
              <div class="flex flex-col items-center justify-center">
                <div class="text-red text-2xl">￥{{ price }}</div>
                <div class="text-gray-400 text-xs">请使用微信扫码支付</div>
              </div>
            </div>
            <Button v-else type="primary" @click="toPay">微信支付</Button>
          </div>
        </TabPane>
        <TabPane :disabled="disabled" key="AliPay" tab="支付宝支付">
          <div class="flex justify-center items-center h-288">
            <div v-if="disabled" class="flex justify-center gap-10">
              <QrCode :size="100" :text="payInfo.data" />
              <div class="flex flex-col items-center justify-center">
                <div class="text-red text-2xl">￥{{ price }}</div>
                <div class="text-gray-400 text-xs">请使用支付宝扫码支付</div>
              </div>
            </div>
            <Button v-else type="primary" @click="toPay">支付宝支付</Button>
          </div>
        </TabPane>
        <!-- <TabPane :disabled="disabled" key="2" tab="联系客服">
          <div class="flex justify-center items-center h-288">
            <div class="flex justify-center gap-10">
              <QrCode :size="100" text="暂无客服二维码" />
              <div class="flex flex-col items-center justify-center">
                <div class="text-black text-xs mb-10">客服电话：15570131212</div>
                <div class="text-gray-400 text-xs max-w-144">
                  请扫码添加微信二维码或拨打电话联系客服购买
                </div>
              </div>
            </div>
          </div>
        </TabPane> -->
      </Tabs>
    </template>
    <template v-else>
      <div class="flex items-center justify-center mt-36">
        <i class="pf-success mr-8" style="font-size: 40px; color: #1ad370"></i>
        <div class="text-2xl text-black">购买成功</div>
      </div>
      <div class="text-sm mt-10 text-center">{{ current.seconds }}s后将跳转到已购买套餐页面</div>
    </template>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, computed, isRef, ref } from 'vue'
  import { Modal, Tabs, Button } from 'ant-design-vue'
  import { useCountDown } from '@vant/use'
  import { props } from './props'
  import { reqPaySetMeal } from '@/api/setMeal'
  import { http } from '@/api/http.config'
  export default defineComponent({
    props,
    components: { Modal, Tabs, TabPane: Tabs.TabPane, Button },
    setup: (props, { emit }) => {
      // 组件显示的数据双向代理
      const modelValue = computed({
        get: () => props.modelValue as boolean,
        set: () => emit('update:modelValue')
      })
      // Modal 方法调用传入 props 无法通过 emit 修改
      // 所以假如传入直接是一个 ref 则直接使用
      const show = isRef(props.modelValue) ? props.modelValue : modelValue

      // 关闭事件, 调用 reject, 为了兼容模板上直接使用组件, 还要在调用一次 clone 事件
      const onClone = () => {
        poll.off()
        if (payStatus.value) {
          // 支付成功回调promise
          props.resolve?.({ payStatus: payStatus.value })
        } else {
          // 支付失败回调promise
          props.reject?.({ payStatus: payStatus.value })
        }
        show.value = false
      }

      /* 
      
      
        下方开始页面逻辑区
      */
      // 开启切换
      const disabled = ref(false)
      // 当前选择支付方式tabs
      const activeKey = ref('WxPay')
      // 支付信息
      const payInfo = ref<Record<string, any>>({})
      // 支付状态
      const payStatus = ref(false)
      // 创建轮询请求
      const poll = http.poll({ url: '/api/order/check', method: 'post' })
      // 支付价格显示
      const price = ref(props.price)
      // 支付成功后的倒计时
      const { start, current } = useCountDown({
        time: 5 * 1000,
        onFinish: onClone
      })
      poll.on<BaseRes>('response', ({ data }) => {
        payStatus.value = data.data.status === 1
        if (payStatus.value) {
          start()
          // emit('paySuccess', data.data.status)
          poll.off()
        }
      })
      // 开始微信支付
      const toPay = async () => {
        disabled.value = true
        const { data } = await reqPaySetMeal({
          associate_id: props.id,
          type: props.type,
          code: activeKey.value
        })
        payInfo.value = data.data
        price.value = data.data?.price
        // 免费产品
        if (data.data.type === 'END') {
          payStatus.value = true
          start()
        } else {
          // 需要支付查订单
          poll.emit({
            data: { sn: data.data.sn }
          })
        }
      }

      return {
        show,
        onClone,
        props,
        activeKey,
        toPay,
        disabled,
        payInfo,
        payStatus,
        current,
        price
      }
    }
  })
</script>
<style lang="scss">
  .pay-console-box {
    .ant-modal-content {
      border-radius: 10px;
      min-height: 280px;
      .ant-modal-body {
        padding: 0 !important;
      }
    }
    .ant-modal-header {
      border-radius: 10px 10px 0 0;
    }
    .ant-modal-footer {
      border: none;
    }
    .transverse {
      width: 1px;
      height: 84px;
      margin: 0 47px;
      background: #d9d9d9;
      border-radius: 21px;
    }
    .ant-modal-close {
      outline: 0px !important;
    }
    .ant-tabs-tab-active {
      background: #fff;
      color: #e89026;
      &:hover {
        color: #e89026 !important;
      }
    }
    .ant-tabs-tab:hover {
      color: #e89026;
    }
    .ant-tabs-tab-disabled:hover {
      color: rgba(0, 0, 0, 0.25);
    }
    .ant-tabs-ink-bar {
      background: transparent !important;
    }
    .ant-tabs-nav-wrap {
      background: #f5f5f5;
    }
    .ant-tabs-tab {
      padding: 16px !important;
      font-size: 16px;
      line-height: 24px;
      user-select: none;
    }
  }
</style>
