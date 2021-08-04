<!--
 * @Author: Mr.wang
 * @Date: 2021-04-10 14:43:24
 * @LastEditTime: 2021-05-06 18:18:27
 * @Description: 重新发货
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="redelivery-box">
    <el-dialog title="重新发货" v-model="show" width="800px" custom-class="immediate-delivery">
      <el-table
        :data="currentItem.orderGoods"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">
            <div class="oe-flex commodity-box">
              <el-image :src="scope.row.goods_image" class="order-information-img" />
              <div class="commodity-box-right">
                <div>{{ scope.row.goods_title }}</div>
                <el-tag
                  size="mini"
                  color="#D4EBFF"
                  style="color: #55adff"
                  v-if="currentItem.type == '2'"
                  >虚拟</el-tag
                >
                <el-tag
                  size="mini"
                  color="#FBDDD1"
                  style="color: #ec672e"
                  v-if="currentItem.type == '3'"
                  >卡密</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E4FFF8"
                  style="color: #1ad370"
                  v-if="currentItem.type == '1'"
                  >实体</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F4DFD3"
                  style="color: #ef864c"
                  v-if="currentItem.type == '4'"
                  >计时/次</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F8E8CF"
                  style="color: #dd8a0d"
                  v-if="currentItem.type == '5'"
                  >预约</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E9D4F9"
                  style="color: #8f29df"
                  v-if="currentItem.type == '6'"
                  >批发</el-tag
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格">
          <div>{{ currentItem.afterSales.goods_sku_text }}</div>
        </el-table-column>
        <el-table-column label="发货数量" width="120px">
          <el-input v-model="currentItem.afterSales.refund_num" :disabled="true"></el-input>
        </el-table-column>
      </el-table>
      <el-form ref="goodsForm" :model="delivery" label-width="100px" :rules="rules">
        <el-form-item label="收货地址"
          >{{ currentItem.province_name }} {{ currentItem.city_name }} {{ currentItem.area_name }}
          {{ currentItem.address }}
        </el-form-item>
        <el-form-item label="物流公司" prop="logisticsCompany">
          <el-select
            clearable
            value-key="company_name"
            v-model="delivery.logisticsCompany"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in companyList"
              :key="item.company_name"
              :label="item.company_name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="oddNumber">
          <el-input placeholder="请输入物流单号" v-model="delivery.oddNumber"></el-input>
        </el-form-item>
        <el-form-item label="发货备注">
          <el-input
            type="textarea"
            placeholder="买家将看到您写的发货备注"
            maxlength="200"
            v-model="delivery.goodsRemarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn" :disabled="!selectList.length"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { reqReceiveDeliver, reqLogisticsCompany } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { ref, computed, defineEmit, defineProps, reactive, inject, watch } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    }
  })

  const goodsForm = ref<any>(null)
  // 勾选的数据
  const selectList = ref<any[]>([])
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  // 立即发货
  const delivery = reactive({
    // 发货数量
    number: 1,
    // 物流公司
    logisticsCompany: '' as any,
    // 物流单号
    oddNumber: '',
    // 备注
    goodsRemarks: ''
  })
  // 验证
  const rules = reactive({
    logisticsCompany: [{ required: true, message: '请选择物流公司', trigger: 'blur' }],
    oddNumber: [{ required: true, message: '请输入物流单号', trigger: 'blur' }]
  })
  // 物流公司的选择
  const companyList = ref<any[]>([])

  // 发货选择中的数据
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  // 确定按钮
  const determineBtn = () => {
    goodsForm.value.validate((valid: boolean) => {
      if (valid) {
        deliverGoods()
      }
    })
  }
  // 请求发货
  const deliverGoods = async () => {
    const option = {
      order_item_id: props.currentItem.orderGoods[0].id,
      order_id: props.currentItem.id,
      order_after_sale_id: props.currentItem.afterSales.id,
      send_express_company_code: delivery.logisticsCompany.code,
      send_express_company: delivery.logisticsCompany.company_name,
      send_express_sn: delivery.oddNumber,
      ext: delivery.goodsRemarks
    } as any
    // selectList.value.forEach((item: any) => {
    //   option.param.push({
    //     express_no: delivery.oddNumber,
    //     ext: delivery.goodsRemarks,
    //     orderId: props.currentItem.id,
    //     orderItemsId: item.id,
    //     order_sn: props.currentItem.order_sn,
    //     express_code: delivery.logisticsCompany.code,
    //     express_name: delivery.logisticsCompany.company_name
    //   })
    // })
    await reqReceiveDeliver(option)
    show.value = false
    ElMessage.success('操作成功!!')
    emit('updateData')
  }
  watch(props, () => {
    if (props.show) {
      // 获取物流公司
      reqLogisticsCompany({ page: 1, limit: 1500 }).then((res) => {
        companyList.value = res.data.data.data
      })
    }
  })
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>
<style lang="scss" scoped>
  .redelivery-box {
    .el-dialog {
      min-width: 500px;
    }
    .dialog-footer {
      .el-button {
        min-height: 32px;
        padding: 0 45px;
        font-size: 14px;
      }
    }
    :deep(.el-textarea__inner) {
      height: 146px;
    }
    :deep(.el-form-item__label) {
      color: #000;
      line-height: 32px;
    }
    :deep(.el-form-item__content) {
      color: #000;
      line-height: 32px;
    }
    :deep(.el-textarea__inner) {
      resize: none;
    }
    :deep(.cell) {
      color: #000;
    }
    .el-form {
      :deep(.el-input) {
        width: 250px;
      }
    }

    .immediate-delivery,
    .modify-logistics {
      .el-tag--mini {
        margin-top: 6px;
        border: none;
        padding: 0;
      }
      .commodity-box {
        .el-image {
          width: 50px;
          height: 50px;
        }
      }
      .commodity-box-right {
        margin-left: 10px;
      }
      .delivery-mode-text {
        transform: translateY(-2px);
        font-size: 14px;
        color: #000000;
      }
      .el-form {
        margin-top: 18px;
      }
      .el-textarea__inner {
        height: 171px;
      }
    }
  }
</style>
