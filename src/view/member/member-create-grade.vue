<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-08 14:34:48
 * @Description: 调整积分
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="create-grade">
    <el-form ref="gradeForm" :model="form" label-width="130px" :rules="rules">
      <el-form-item label="新增等级" prop="grade">
        <el-radio-group v-model="form.grade" size="small" class="grade-radio check">
          <el-radio-button
            v-for="v in levelAvailable"
            :disabled="!v.state || id"
            :label="v.name"
            :key="v"
            >{{ v.name }}</el-radio-button
          >>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="等级名称" prop="gradeName">
        <el-input
          v-model="form.gradeName"
          placeholder="请输入等级名称"
          class="grade-form-width"
          maxlength="6"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="等级描述">
        <el-input
          class="grade-form-width"
          placeholder="请输入等级描述"
          type="textarea"
          v-model="form.describe"
        ></el-input>
      </el-form-item>
      <el-form-item label="会员折扣">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="当前可享受的值" v-if="form.delivery" prop="enjoy">
        <el-input class="grade-form-width" v-model="form.enjoy" type="number">
          <template #append>折</template>
        </el-input>
        <span class="text-style">输入0.1-9.9之间的数字</span>
      </el-form-item>
      <el-form-item label="升级条件" prop="condition">
        <el-radio-group v-model="form.condition" @change="handleChange">
          <el-radio
            v-for="v in ['单项升级条件', '多项升级条件', '不启用升级']"
            :label="v"
            :key="v"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.condition == '单项升级条件'">
        <el-radio-group
          class="grade-radio-consumption check"
          v-model="form.individual"
          @change="handleSingleChange"
        >
          <el-radio-button
            v-for="v in ['单次消费', '累计消费', '单次充值', '累计充值', '成交订单', '指定商品']"
            :label="v"
            :key="v"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.condition == '多项升级条件'" prop="multiple">
        <el-checkbox-group class="grade-radio-consumption check" v-model="form.multiple">
          <el-checkbox-button
            v-for="v in ['单次消费', '累计消费', '单次充值', '累计充值', '成交订单', '指定商品']"
            :label="v"
            :key="v"
          />
        </el-checkbox-group>
      </el-form-item>
      <template v-if="form.condition != '不启用升级'">
        <el-form-item
          label="单次消费"
          prop="last_order_amount"
          v-if="form.individual == '单次消费' || form.multiple.find((val) => val == '单次消费')"
        >
          <el-input
            class="grade-form-width"
            v-model="form.last_order_amount"
            type="number"
            @input="form.last_order_amount = inputInterception(form.last_order_amount)"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="累计消费"
          prop="total_order_amount"
          v-if="form.individual == '累计消费' || form.multiple.find((val) => val == '累计消费')"
        >
          <el-input
            class="grade-form-width"
            v-model="form.total_order_amount"
            type="number"
            @input="form.total_order_amount = inputInterception(form.total_order_amount)"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="单次充值"
          prop="last_recharge_amount"
          v-if="form.individual == '单次充值' || form.multiple.find((val) => val == '单次充值')"
        >
          <el-input
            class="grade-form-width"
            v-model="form.last_recharge_amount"
            type="number"
            @input="form.last_recharge_amount = inputInterception(form.last_recharge_amount)"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="累计充值"
          prop="total_recharge_amount"
          v-if="form.individual == '累计充值' || form.multiple.find((val) => val == '累计充值')"
        >
          <el-input
            class="grade-form-width"
            v-model="form.total_recharge_amount"
            type="number"
            @input="form.total_recharge_amount = inputInterception(form.total_recharge_amount)"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="成交订单"
          prop="total_order_nums"
          v-if="form.individual == '成交订单' || form.multiple.find((val) => val == '成交订单')"
        >
          <el-input class="grade-form-width" v-model.number="form.total_order_nums" type="number">
            <template #append>单</template>
          </el-input>
        </el-form-item>

        <template
          v-if="form.individual == '指定商品' || form.multiple.find((val) => val == '指定商品')"
        >
          <el-form-item label="指定商品" prop="operationList">
            <el-button type="primary" @click="addProduct">添加商品</el-button>
            <span class="text-style">当会员购买相关商品且确认收货后，可升级为此会员等级</span>
          </el-form-item>
          <el-row :gutter="10" class="commodity-box">
            <template v-if="form.operationList.length">
              <el-col
                v-for="(item, index) in form.operationList"
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
            </template>
          </el-row>
        </template>
      </template>

      <div class="grade-add-goods">
        <el-button @click="router.go(-1)">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import {
    reqLevelAvailable,
    reqGradeRequirement,
    reqMemberEditor,
    reqMemberLevelCreation,
    reqMembershipPriceList
  } from '@/api/member'
  import { LinkSelect } from '@/components/selectors'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const gradeForm = ref<any>('')
  const form = ref({
    // 新增等级
    grade: '',
    // 等级名称
    gradeName: '',
    // 等级描述
    describe: '',
    // 折扣
    delivery: true,
    // 享受
    enjoy: 0,
    // 升级条件
    condition: '单项升级条件',
    // 单次消费
    last_order_amount: '',
    // 累计消费
    total_order_amount: '',
    // 单次充值
    last_recharge_amount: '',
    // 累计充值
    total_recharge_amount: '',
    // 成交订单
    total_order_nums: '',
    // 指定商品
    operationList: [] as any[],
    // 单项
    individual: '单次消费',
    // 多项
    multiple: [] as any[]
  })
  const levelAvailable = ref<any[]>([])
  const id = ref<any>()
  const weight = ref(0)
  const checkEnjoy = async (rule: any, value: any, callback: any) => {
    if (Number(value) >= 0.1 && Number(value) <= 9.9 && value != '') {
      callback()
    } else {
      callback(new Error('请输入0.1-9.9之间的数字'))
    }
  }
  const rules = reactive({
    grade: [{ required: true, message: '请选择等级', trigger: 'blur' }],
    gradeName: [{ required: true, message: '请输入等级名称', trigger: 'blur' }],
    enjoy: [{ required: true, validator: checkEnjoy, trigger: 'blur' }],
    condition: [{ required: true, message: '请选择升级提交', trigger: 'blur' }],
    last_order_amount: [{ required: true, message: '请选择单次消费', trigger: 'blur' }],
    total_order_amount: [{ required: true, message: '请选择累计消费', trigger: 'blur' }],
    last_recharge_amount: [{ required: true, message: '请选择单次充值', trigger: 'blur' }],
    operationList: [{ required: true, message: '请选择指定商品', trigger: 'blur' }],
    total_recharge_amount: [{ required: true, message: '请选择成交订单', trigger: 'blur' }],
    total_order_nums: [{ required: true, message: '请选择成交订单', trigger: 'blur' }],
    multiple: [{ required: true, message: '请至少选择一种', trigger: 'blur' }]
  })
  // 删除商品
  const cancelGoods = (index: number) => {
    form.value.operationList.splice(index, 1)
  }
  // 保存按钮
  const onSubmit = () => {
    gradeForm.value.validate((valid: boolean) => {
      if (valid) {
        addGrade()
      }
    })
  }
  // 获取可用的等级
  reqLevelAvailable().then((res) => {
    const arr = [
      { name: '一级', weight: 1 },
      { name: '二级', weight: 2 },
      { name: '三级', weight: 3 },
      { name: '四级', weight: 4 },
      { name: '五级', weight: 5 },
      { name: '六级', weight: 6 },
      { name: '七级', weight: 7 },
      { name: '八级', weight: 8 }
    ]
    res.data.data.splice(res.data.data.indexOf(0), 1)
    arr.forEach((item: any, index) => {
      item.state = true
      res.data.data.forEach((item1: any) => {
        if (index + 1 == item1) {
          item.state = false
        }
      })
    })
    levelAvailable.value = arr
  })
  // 添加等级
  const addGrade = async () => {
    weightFiltering(form.value.grade, true)
    const goods_ids = [] as any[]
    let condition_need = 0
    form.value.operationList.forEach((item: any) => goods_ids.push(item.id))
    const option = {
      name: form.value.gradeName,
      level_name: form.value.gradeName,
      weight: weight.value,
      remark: form.value.describe,
      discount: form.value.delivery ? Number(form.value.enjoy) * 10 : 0,
      type:
        form.value.condition == '单项升级条件'
          ? '1'
          : form.value.condition == '不启用升级'
          ? '0'
          : '2'
    } as any
    const condition: Record<string, any> = {
      last_order_amount: form.value.last_order_amount,
      total_order_amount: form.value.total_order_amount,
      last_recharge_amount: form.value.last_recharge_amount,
      total_recharge_amount: form.value.total_recharge_amount,
      total_order_nums: form.value.total_order_nums,
      goods_ids
    }
    const multipleKey: Record<string, any> = {
      last_order_amount: '单次消费',
      total_order_amount: '累计消费',
      last_recharge_amount: '单次充值',
      total_recharge_amount: '累计充值',
      total_order_nums: '成交订单',
      operationList: '指定商品'
    }
    const conditionObj: Record<string, any> = {
      last_order_amount: 1,
      total_order_amount: 2,
      last_recharge_amount: 4,
      total_recharge_amount: 8,
      total_order_nums: 16,
      operationList: 32
    }
    if (form.value.condition === '单项升级条件') {
      switch (form.value.individual) {
        case '单次消费':
          condition_need = 1
          break
        case '累计消费':
          condition_need = 2
          break
        case '单次充值':
          condition_need = 4
          break
        case '累计充值':
          condition_need = 8
          break
        case '成交订单':
          condition_need = 16
          break
        case '指定商品':
          condition_need = 32
          break
      }
    } else {
      Object.keys(multipleKey).forEach((key) => {
        const isExistence = form.value.multiple.some((mval) => mval === multipleKey[key])
        if (!isExistence) {
          if (!Array.isArray(condition[key])) {
            condition[key] = 0
          } else {
            condition[key] = []
          }
        } else {
          condition_need += conditionObj[key]
        }
      })
    }

    option.condition = JSON.stringify(condition)
    option.condition_need = condition_need
    if (form.value.condition === '不启用升级') {
      option.condition_need = 0
    }
    if (!id.value) {
      await reqMemberLevelCreation(option)
    } else {
      option.id = id.value
      await reqMemberEditor(option)
    }
    ElMessage.success('操作成功')
    router.go(-1)
  }
  const weightFiltering = (grade: any, conversion: boolean) => {
    const weightList = ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级']
    const corresponding = [1, 2, 3, 4, 5, 6, 7, 8]
    if (conversion) {
      weight.value =
        corresponding[
          weightList.findIndex((value: any) => {
            return value == grade
          })
        ]
    } else {
      form.value.grade =
        weightList[
          corresponding.findIndex((value: any) => {
            return value == grade
          })
        ]
    }
  }
  // 添加商品
  const addProduct = async () => {
    const result = await LinkSelect({ option: { commodity: true } })
    form.value.operationList.push(result.value.data)
  }
  const handleChange = (val: any) => {
    remove()
    if (val == '单项升级条件') {
      form.value.multiple = []
      form.value.individual = '单次消费'
    } else if (val == '多项升级条件') {
      form.value.individual = ''
    }
  }
  const remove = () => {
    form.value.last_order_amount = ''
    form.value.total_order_amount = ''
    form.value.last_recharge_amount = ''
    form.value.total_recharge_amount = ''
    form.value.total_order_nums = ''
    form.value.operationList = []
  }
  // 监听单选值清空
  const handleSingleChange = () => {
    remove()
  }
  // id获取商品数据
  const getGoodsList = (ids: any[]) => {
    ids.forEach(async (item: any) => {
      const { data } = await reqMembershipPriceList({ id: item })
      form.value.operationList.push(data.data.data[0])
    })
  }
  // 编辑数据
  const getReadData = async () => {
    const multipleKey: Record<string, any> = {
      last_order_amount: '单次消费',
      total_order_amount: '累计消费',
      last_recharge_amount: '单次充值',
      total_recharge_amount: '累计充值',
      total_order_nums: '成交订单',
      goods_ids: '指定商品'
    }
    const { data } = await reqGradeRequirement({ id: id.value })
    const detailsData = data.data
    if (detailsData.condition.goods_ids.length) {
      getGoodsList(detailsData.condition.goods_ids)
    }
    form.value.condition =
      detailsData.type == '1'
        ? '单项升级条件'
        : detailsData.type == '0'
        ? '不启用升级'
        : '多项升级条件'
    if (detailsData.type == '1') {
      form.value.multiple = []
      Object.keys(multipleKey).forEach((key) => {
        detailsData.condition_need.forEach((item: any) => {
          if (item == key) {
            form.value.individual = multipleKey[key]
          }
        })
      })
    } else if (detailsData.type == '2') {
      form.value.individual = ''
      Object.keys(multipleKey).forEach((key) => {
        detailsData.condition_need.forEach((item: any) => {
          if (item == key) {
            form.value.multiple.push(multipleKey[key])
          }
        })
      })
    }
    form.value.last_order_amount = detailsData.condition.last_order_amount
    form.value.last_recharge_amount = detailsData.condition.last_recharge_amount
    form.value.total_order_nums = detailsData.condition.total_order_nums
    form.value.total_order_amount = detailsData.condition.total_order_amount
    form.value.total_recharge_amount = detailsData.condition.total_recharge_amount
    form.value.gradeName = detailsData.level_name
    form.value.describe = detailsData.remark
    form.value.delivery = detailsData.discount != 0
    form.value.enjoy = detailsData.discount / 10
    weightFiltering(detailsData.weight, false)
  }
  onMounted(() => {
    if (route.query.id) {
      id.value = route.query.id
      getReadData()
    }
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .create-grade {
    .grade-radio {
      .el-radio-button {
        margin: 0 15px;
        :deep(.el-radio-button__inner) {
          border: none;
          border-radius: 2px;
        }
      }
    }
    :deep(.el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner) {
      background-color: var(--color-primary) !important;
      color: #fff;
    }
    .grade-radio-consumption {
      .el-radio-button {
        margin: 0 15px;
        :deep(.el-radio-button__inner) {
          border: 1px solid #ccc;
          border-radius: 2px;
        }
      }
      .el-checkbox-button {
        margin: 0 15px;
        :deep(.el-checkbox-button__inner) {
          border: 1px solid #ccc;
          border-radius: 2px;
          min-height: 32px;
          max-width: 84px;
          padding: 0;
          min-width: 84px;
          border-radius: 0;
          line-height: 32px;
        }
      }
    }
  }
  .check {
    transform: translateX(-15px);
  }
  .text-style {
    display: block;
    font-size: 14px;
    color: #8c8c8c;
  }
  :deep(.el-input-group__append) {
    padding: 0 9px;
    line-height: 30px;
  }
  :deep(.el-radio-button__inner) {
    min-height: 32px;
    max-height: 84px;
    padding: 0;
    min-width: 84px;
    border-radius: 0;
    line-height: 32px;
  }
  :deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
    border: 1px solid var(--color-primary) !important;
  }
  :deep(.el-checkbox-button.is-checked .el-checkbox-button__inner) {
    border: 1px solid var(--color-primary) !important;
  }
  .grade-add-goods {
    margin-top: 50px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    .el-button {
      width: 150px;
    }
  }

  :deep(.el-form-item__content) {
    line-height: 32px;
  }
  :deep(.el-button) {
    padding: 0 14px;
    min-height: 32px;
  }
  :deep(.el-form-item__label) {
    line-height: 32px;
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
      }
      .commodity-img {
        width: 100%;
        height: 70px;
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
  .grade-form-width {
    width: 250px;
    :deep(.el-input__inner) {
      line-height: 1px !important;
    }
  }
</style>
