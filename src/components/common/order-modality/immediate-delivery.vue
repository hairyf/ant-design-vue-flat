<!--
 * @Author: Mr.wang
 * @Date: 2021-03-23 21:38:22
 * @LastEditTime: 2021-05-07 10:27:33
 * @Description: 立即发货
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="Immediate-delivery-box">
    <el-dialog title="立即发货" v-model="show" width="800px" custom-class="immediate-delivery">
      <!-- <div class="delivery-mode oe-flex">
        <div class="delivery-mode-text notes-text">发货方式：</div>
        <el-radio v-model="delivery.mode" label="整单发货">整单发货</el-radio>
        <el-radio v-model="delivery.mode" label="分商品发货">分商品发货</el-radio>
      </div> -->
      <div class="oe-flex protection-tips" v-if="currentItem.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <el-table
        :data="currentItem.orderGoods"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45"
          :selectable="checkSelectable"
        ></el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">
            <div class="oe-flex commodity-box">
              <el-image :src="scope.row.goods_image" fit="cover" class="order-information-img" />
              <div class="commodity-box-right oe-flex-1">
                <div class="box-right">{{ scope.row.goods_title }}</div>
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
        <!-- <el-table-column prop="name" label="已发货数量"></el-table-column> -->
        <el-table-column prop="goods_num" label="购买数量"></el-table-column>
        <!-- <el-table-column label="发货数量">
          <el-input v-model="delivery.number"></el-input>
        </el-table-column> -->
        <el-table-column prop="dispatch_status" label="状态">
          <template #default="scope">
            <div v-if="scope.row.dispatch_status == 1">未发货</div>
            <div v-if="scope.row.dispatch_status == -1">已关闭</div>
            <div v-if="scope.row.dispatch_status == 2">已发货</div>
            <div v-if="scope.row.dispatch_status == 3">已收货</div>
          </template>
        </el-table-column>
      </el-table>
      <el-form ref="goodsForm" :model="delivery" label-width="100px" :rules="rules">
        <el-form-item label="收货地址">
          <template v-if="currentItem.province_name">
            {{ currentItem.province_name }} {{ currentItem.city_name }} {{ currentItem.area_name }}
            {{ currentItem.address }}
          </template>
        </el-form-item>
        <el-form-item label="配送方式">
          <el-radio-group v-model="delivery.logistics">
            <el-radio label="需要物流"></el-radio>
            <el-radio label="无需物流"></el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="delivery.logistics == '需要物流'">
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
        </template>
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
  import { reqDeliverGoods, reqLogisticsCompany } from '@/api/order'
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
    //  发货方式
    mode: '整单发货',
    // 发货数量
    number: 1,
    // 是否需要物流
    logistics: '需要物流',
    // 物流公司
    logisticsCompany: '' as any,
    // 物流单号
    oddNumber: '',
    // 备注
    goodsRemarks: ''
  })
  const logisticsOrder = (rule: any, value: any, callback: any) => {
    if (value) {
      const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(value)) {
        callback(new Error('请输入正确物流单号'))
      } else {
        callback()
      }
    } else {
      callback(new Error('请输入物流单号'))
    }
  }
  // 验证
  const rules = reactive({
    logisticsCompany: [{ required: true, message: '请选择物流公司', trigger: 'blur' }],
    oddNumber: [{ required: true, validator: logisticsOrder, trigger: 'blur' }]
  })
  // 物流公司的选择
  const companyList = ref<any[]>([])
  // 立即发货选择中的数据
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
  // 禁止选中
  const checkSelectable = (row: any) => {
    return row.dispatch_status == 1
  }
  // 请求发货
  const deliverGoods = async () => {
    const option = {
      param: [] as any
    }
    selectList.value.forEach((item: any) => {
      option.param.push({
        dispatch_type: delivery.logistics == '需要物流' ? 1 : 2,
        express_no: delivery.oddNumber,
        ext: delivery.goodsRemarks,
        orderId: props.currentItem.id,
        orderItemsId: item.id,
        // order_sn: props.currentItem.order_sn,
        express_code: delivery.logisticsCompany.code,
        express_name: delivery.logisticsCompany.company_name
      })
    })
    await reqDeliverGoods(option)
    show.value = false
    ElMessage.success('操作成功!!')
    emit('resetOrderDetails')
    resetOrderList?.()
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
  .Immediate-delivery-box {
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
    .box-right {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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
          width: 50px !important;
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
