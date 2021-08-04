<!--
 * @Author: Mr.wang
 * @Date: 2021-04-07 11:51:35
 * @LastEditTime: 2021-05-13 11:55:10
 * @Description: 新增标签
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="create-label-box">
    <el-card shadow="never" class="content-box">
      <el-form ref="labelForm" :model="form" class="adjust-form" :rules="rules" label-width="120px">
        <el-form-item label="标签名称" prop="name">
          <el-input
            class="unified-inp"
            v-model="form.name"
            placeholder="请输入标签名称"
            maxlength="5"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input
            type="textarea"
            v-model="form.remark"
            placeholder="请输入标签描述"
            class="unified-inp"
          ></el-input>
        </el-form-item>
        <el-form-item label="自动打标签">
          <el-switch v-model="form.automatic"> </el-switch>
          <div class="tips-tetx">满足以下任意条件即会自动给会员加上此标签</div>
        </el-form-item>
        <template v-if="form.automatic == true">
          <div class="oe-flex">
            <el-form-item label="累计消费金额">
              <el-input
                v-model="conditionForm.total_order_amount"
                class="appoint-inp"
                placeholder="请输入累计消费金额"
                type="number"
              >
                <template #append>元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="累计消费订单">
              <el-input
                v-model.number="conditionForm.total_order_num"
                type="number"
                class="appoint-inp"
                placeholder="请输入累计消费订单"
              >
                <template #append>单</template>
              </el-input>
            </el-form-item>
            <el-form-item label="当前余额大于">
              <el-input
                v-model="conditionForm.now_balance"
                class="appoint-inp"
                placeholder="请输入余额"
                type="number"
                @input="conditionForm.now_balance = inputInterception(conditionForm.now_balance)"
              >
                <template #append>元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="当前积分大于">
              <el-input
                v-model="conditionForm.now_score"
                class="appoint-inp"
                placeholder="请输入积分"
                type="number"
                @input="conditionForm.now_score = inputInterception(conditionForm.now_score)"
              >
                <template #append>积分</template>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="购买指定商品">
            <el-button type="primary" @click="addProduct">添加商品</el-button>
          </el-form-item>
          <el-row :gutter="10" class="commodity-box">
            <el-col
              v-for="(item, index) in operationList"
              :key="index"
              :xl="3"
              :lg="5"
              :md="6"
              :sm="6"
              :xs="6"
              class="commodity-item"
            >
              <div class="commodity-item-son" :class="{ 'change-color': true }">
                <div class="location-picture" @click="cancelGoods(index)">
                  <el-image src="/custom-assets/images/member/wrong.png"></el-image>
                </div>
                <div class="item-left">
                  <el-image :src="item.main_picture" class="commodity-img"></el-image>
                </div>
                <div class="item-right">
                  <div class="commodity-name">{{ item.title }}</div>
                  <div class="commodity-price">
                    <span class="text">价格</span>
                    <span class="price">¥{{ item.price }}</span>
                  </div>
                  <div class="commodity-stock">
                    <div class="stock-left">
                      <span class="text">库存</span>
                      <span class="stock">{{ item.stock }}</span>
                    </div>
                    <div class="stock-right">
                      <el-tag
                        size="mini"
                        color="#D4EBFF"
                        style="color: #55adff"
                        v-if="item.goods_type == '2'"
                        >虚拟</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#FBDDD1"
                        style="color: #ec672e"
                        v-if="item.goods_type == '3'"
                        >卡密</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#E4FFF8"
                        style="color: #1ad370"
                        v-if="item.goods_type == '1'"
                        >实体</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#F4DFD3"
                        style="color: #ef864c"
                        v-if="item.goods_type == '4'"
                        >计时/次</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#F8E8CF"
                        style="color: #dd8a0d"
                        v-if="item.goods_type == '5'"
                        >预约</el-tag
                      >
                      <el-tag
                        size="mini"
                        color="#E9D4F9"
                        style="color: #8f29df"
                        v-if="item.goods_type == '6'"
                        >批发</el-tag
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </el-card>
    <el-card shadow="never" class="operation-box">
      <div class="oe-flex oe-row-center">
        <el-button @click="router.go(-1)">取消</el-button>
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import {
    reqLabelCreation,
    reqLabelDetails,
    reqLabelEditing,
    reqMembershipPriceList
  } from '@/api/member'
  import { LinkSelect } from '@/components/selectors'
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useRouter, useRoute } from 'vue-router'
  import { inputInterception } from '@/hooks/reset-time'
  const router = useRouter()
  const route = useRoute()
  const rules = reactive({
    name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
  })
  const labelForm = ref<any>()
  const form = ref({
    // 标签名称
    name: '',
    // 描述
    remark: '',
    // 自动
    automatic: true
  })
  const conditionForm = ref<any>({
    // 累交数
    total_order_num: '',
    // 累交金额
    total_order_amount: '',
    // 当前积分
    now_score: '',
    // 当前余额
    now_balance: ''
  })
  const id = ref<any>('')
  const operationList = ref<any[]>([])
  // 保存标签
  const saveLabel = async () => {
    const option = {
      name: form.value.name,
      remark: form.value.remark,
      is_need_condition: form.value.automatic ? '1' : '0',
      condition_need: 0,
      condition: ''
    } as any

    const goods_ids = [] as any[]
    if (form.value.automatic) {
      const conditionObj: Record<string, any> = {
        total_order_num: 1,
        total_order_amount: 2,
        now_score: 4,
        now_balance: 8
      }
      Object.keys(conditionForm.value).forEach((key) => {
        if (conditionForm.value[key] != 0) {
          option.condition_need += conditionObj[key]
        }
      })
      if (operationList.value.length) {
        operationList.value.forEach((item: any) => goods_ids.push(item.id))
        option.condition_need += 16
      }
      const condition = JSON.stringify({
        total_order_num: conditionForm.value.total_order_num,
        total_order_amount: conditionForm.value.total_order_amount,
        now_score: conditionForm.value.now_score,
        now_balance: conditionForm.value.now_balance,
        goods_ids
      })
      option.condition = condition
    } else {
      const condition = JSON.stringify({
        total_order_num: 0,
        total_order_amount: 0,
        now_score: 0,
        now_balance: 0,
        goods_ids
      })
      option.condition = condition
    }
    if (!id.value) {
      await reqLabelCreation(option)
    } else {
      option.id = id.value
      await reqLabelEditing(option)
    }
    ElMessage.success('操作成功')
    router.go(-1)
  }
  // 保存按钮
  const preservation = () => {
    labelForm.value.validate((valid: boolean) => {
      if (valid) {
        saveLabel()
      }
    })
  }
  // 添加商品
  const addProduct = async () => {
    const result = await LinkSelect({ option: { commodity: true } })
    operationList.value.push(result.value.data)
  }
  // 删除商品
  const cancelGoods = (index: number) => {
    operationList.value.splice(index, 1)
  }
  // id获取商品数据
  const getGoodsList = (ids: any[]) => {
    ids.forEach(async (item: any) => {
      const { data } = await reqMembershipPriceList({ id: item })
      operationList.value.push(data.data.data[0])
    })
  }
  // 标签详情
  const getLabelDetails = async () => {
    const { data } = await reqLabelDetails({ id: id.value })
    const detailsData = data.data
    form.value.remark = detailsData.remark
    form.value.name = detailsData.name
    form.value.automatic = detailsData.is_need_condition != 0
    if (detailsData.is_need_condition == 1) {
      if (detailsData.condition.goods_ids.length) {
        getGoodsList(detailsData.condition.goods_ids)
      }
      conditionForm.value.total_order_num = detailsData.condition.total_order_num
      conditionForm.value.total_order_amount = detailsData.condition.total_order_amount
      conditionForm.value.now_score = detailsData.condition.now_score
      conditionForm.value.now_balance = detailsData.condition.now_balance
    }
  }
  onMounted(() => {
    if (route.query.id) {
      id.value = route.query.id
      getLabelDetails()
    }
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .create-label-box {
    position: relative;
    .unified-inp {
      width: 354px;
      :deep(.el-input__inner) {
        width: 354px;
      }
      :deep(.el-textarea__inner) {
        width: 354px;
        height: 132px;
      }
    }
    .content-box {
      padding-bottom: 85px;
      :deep(.el-card__body) {
        min-height: 650px;
      }
    }
    .commodity-img {
      width: 100%;
      height: 70px;
    }
    :deep(.el-button) {
      padding: 0 14px;
      min-height: 32px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
    }
    .appoint-inp {
      :deep(.el-input__inner) {
        width: 134px;

        line-height: 1px !important;
      }
      :deep(.el-input-group__append) {
        padding: 0 9px;
        line-height: 30px;
      }
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    .tips-tetx {
      transform: translateX(-82px);
      line-height: 22px;
      color: #8c8c8c;
      font-size: 12px;
    }
    .commodity-box {
      margin-left: 105px !important;
    }
    .commodity-item {
      height: 92px;
      margin-bottom: 24px;
      .commodity-item-son {
        position: relative;
        display: flex;
        // justify-content: space-between;
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        .location-picture {
          cursor: pointer;
          position: absolute;
          top: -1px;
          right: -1px;
          width: 21px;
          height: 19px;
          z-index: 1;
          .el-image {
            width: 100%;
            height: 100%;
          }
        }
        &.change-color {
          border-color: var(--color-primary);
        }
        .item-left {
          width: 72px;
          height: 72px;
        }
        .item-right {
          margin-left: 11px;
          flex: 1;
          display: flex;
          min-width: 84px;
          flex-direction: column;
          justify-content: space-between;
          .commodity-name {
            min-height: 30px;
            font-size: 14px;
            font-weight: bold;
            @include text-hidden-line(2);
          }
          .commodity-price {
            font-size: 12px;
            margin: 6px 0;
            .price {
              margin-left: 5px;
              color: #ff0000;
            }
          }
          .commodity-stock {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            .stock-left {
              .stock {
                margin-left: 5px;
                color: #ff0000;
              }
            }
            .stock-right {
              :deep(.el-tag) {
                padding: 0;
                height: 20px;
                line-height: 18px;
                border-radius: 0;
              }
            }
          }
        }
      }
    }
    .operation-box {
      position: fixed;
      bottom: 0;
      left: 250px;
      z-index: 5;
      right: 20px;
      :deep(.el-button) {
        padding: 0;
        min-height: 32px;
        width: 120px;
      }
    }
  }
</style>
