<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-12 10:53:27
 * @Description: 订单概览
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="pay-set">
    <el-row :gutter="24">
      <el-col :lg="24">
        <el-row :gutter="24">
          <el-col :xl="12" :span="12" v-for="item in allocationList" :key="item.CATCH_ID">
            <el-card shadow="never" class="e-grid count-container">
              <div class="count-item">
                <div class="icon-container">
                  <i v-if="item.key == 'Wechat'" class="ad-wechat-channel"></i>
                  <i v-if="item.key == 'H5'" class="ad-html5 color-orange"></i>
                  <i v-if="item.key == 'WechatApplets'" class="ad-applets color-cyan"></i>
                </div>
                <div class="info-left">
                  <h2>{{ item.name }}</h2>
                  <p class="tips">会员在{{ item.name }}可用的支付方式</p>
                </div>
              </div>
              <div class="info-container">
                <div class="pay-method" v-for="item1 in item.pay_type" :key="item1.CATCH_ID">
                  <div class="pay-first">
                    <i class="color-green ad-wechat" v-if="item1.key == 'WxPay'"></i>
                    <i class="color-blue ad-alipay" v-if="item1.key == 'AliPay'"></i>
                    <i class="ad-payment-amount color-yellow" v-if="item1.key == 'BalancePay'"> </i>

                    <span v-if="item.key == 'WechatApplets' && item1.name == '支付宝支付'"
                      >支付宝提现</span
                    >
                    <span v-else>{{ item1.name }}</span>
                  </div>
                  <div class="pay-center">
                    <template v-if="item1.pay_shop_config.length">
                      <span>支付模板</span>
                      <el-select
                        v-model="item1.currentData.id"
                        placeholder="请选择"
                        @change="pullDown($event, item1, item.key)"
                      >
                        <el-option
                          v-for="item3 in item1.pay_shop_config"
                          :key="item3.CATCH_ID"
                          :label="item3.name"
                          :value="item3.id"
                        >
                        </el-option>
                        <el-option
                          label="无"
                          value="无"
                          v-if="item1.currentData.name == '无'"
                        ></el-option>
                      </el-select>
                    </template>
                    <div v-else>
                      <div class="tips oe-flex-1" v-if="item1.name == '余额支付'">
                        {{ item1.name }}无需支付模板
                      </div>
                      <div class="tips oe-flex-1" v-else>请先添加支付模板</div>
                    </div>
                  </div>
                  <div>
                    <el-switch
                      v-model="item1.switch"
                      @change="OpenClosePayment($event, item1, item.key)"
                    ></el-switch>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
  import { reqPaymentAllocation, reqSetPaymentTemplate, reqOpenClosePayment } from '@/api/system'
  import { onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { nanoid } from 'nanoid'

  // 支付配置列表
  const allocationList = ref<any[]>([])
  // 监听下拉切换
  const pullDown = async (val: any, item: any, key: string) => {
    if (val != '无') {
      await reqSetPaymentTemplate({
        channel_key: key,
        pay_id: item.id,
        pay_code: item.key,
        id: val
      })
      ElMessage.success('操作成功')
      restPaymentAllocation()
    }
  }
  // 监听开启关闭
  const OpenClosePayment = async (val: any, item: any, key: string) => {
    await reqOpenClosePayment({
      channel_key: key,
      pay_id: item.id,
      pay_code: item.key,
      status: val == true ? 1 : 0
    })
    ElMessage.success('操作成功')
    restPaymentAllocation()
  }
  // 获取配置数据接口
  const restPaymentAllocation = async () => {
    const { data } = await reqPaymentAllocation()
    data.data.forEach((item: any) => {
      item.CATCH_ID = nanoid(5)
      item.pay_type.forEach((item1: any) => {
        item1.CATCH_ID = nanoid(5)
        item1.switch = false
        if (item1.status == 1) {
          item1.switch = true
        }
        item1.currentData = {
          name: '无',
          id: '无'
        }
        item1.pay_shop_config.forEach((item2: any) => {
          if (item2.status == 1) {
            item1.currentData = item2
          }
        })
      })
    })
    allocationList.value = data.data
  }
  onMounted(() => restPaymentAllocation())
</script>
<style lang="scss" scoped>
  // @import '@/style/class.scss';
  @import '@/style/mixin.scss';
  .e-grid {
    margin-bottom: 24px;
  }

  :deep(.el-card) {
    width: 100%;
    min-width: 350px;
    min-height: 270px;
  }
  .e-grid {
    margin-bottom: 20px;
  }
  .pay-set {
    .count-container {
      min-height: 280px;
      min-width: 350px;
    }
    .count-item {
      height: 80px;
      display: flex;
      align-items: center;
      .color-cyan {
        color: #00dfb9;
      }
      .color-orange {
        color: #ff800b;
      }
    }
    .tips {
      font-size: 12px;
      color: #8c8c8c;
    }
    .icon-container {
      flex-wrap: 0;
      width: 81px;
      height: 81px;
      text-align: center;
      border-radius: 50%;
      color: #09bb07;
      i {
        font-size: 56px;
      }
    }

    .info-left {
      margin-top: -35px;
      margin-left: 15px;
    }
    .info-container {
      width: 100%;
      border-top: 1px solid #d9d9d9;
      min-width: 350px;

      i {
        // width: 16px;
        size: 16px;
        vertical-align: middle;
      }
      .pay-method {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 350px;
        margin: 15px 0;
        .pay-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pay-first {
          min-width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i {
            font-size: 20px;
          }
          .color-yellow {
            color: #fe9b2a;
          }

          .color-green {
            color: #09bb07;
          }
          .color-blue {
            color: #108ee9;
          }
          span {
            font-size: 14px;
          }
        }
        span {
          display: inline-block;
          min-width: 67px;
        }
        .pay-center {
          width: 80%;
          .el-select {
            width: 70%;
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
