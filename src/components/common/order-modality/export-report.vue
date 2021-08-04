<!--
 * @Author: Mr.wang
 * @Date: 2021-04-10 08:58:56
 * @LastEditTime: 2021-05-07 11:15:18
 * @Description: 导出
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="export-report-box">
    <el-dialog title="导出" v-model="show" width="815px">
      <div class="choice-box">
        <el-button @click="isSelectAll = true" type="primary">全选</el-button>
        <el-button @click="cancelAll">全部取消</el-button>
      </div>
      <div class="layer-box-tips">请选择需要导出的数据</div>
      <div class="oe-flex oe-flex-wrap layer-box">
        <div
          v-for="(item, index) in exportList"
          :key="index"
          class="option-box"
          :class="item.select ? 'selectStyle' : ''"
          @click="item.select = !item.select"
        >
          <div>{{ item.name }}</div>
          <img
            class="option-img"
            v-if="item.select"
            src="/custom-assets/images/order/square-check.png"
            alt=""
          />
        </div>
      </div>
      <template #footer>
        <div class="oe-flex bottom-btn oe-row-between">
          <div>总计导出数据：{{ total }}条</div>
          <div class="dialog-footer">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="determineBtn" :disabled="!selectIds.length"
              >确 定</el-button
            >
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { reqOrderList, reqOrderExport } from '@/api/order'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { defineProps, defineEmit, computed, reactive, ref, watch } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    option: {
      type: Object as any,
      required: true
    }
  })
  const total = ref()
  watch(props, () => {
    if (props.show) {
      getTotal()
    }
  })
  // 获取总数
  const getTotal = async () => {
    const { data } = await reqOrderList(props.option)
    total.value = data.data.total
  }
  const emit = defineEmit()
  const exportList = ref([
    {
      name: '订单编号',
      select: false,
      id: 'order_sn'
    },
    {
      name: '会员等级',
      select: false,
      id: 'current_shop_user_level_id	'
    },
    {
      name: '买家昵称',
      select: false,
      id: 'nickname'
    },
    {
      name: '买家手机号',
      select: false,
      id: 'mobile'
    },
    {
      name: '收货人姓名',
      select: false,
      id: 'consignee'
    },
    {
      name: '收货人手机号',
      select: false,
      id: 'phone'
    },
    {
      name: '收货地址省份',
      select: false,
      id: 'province_name'
    },
    {
      name: '收货地址地区',
      select: false,
      id: 'city_name'
    },
    {
      name: '收货地址',
      select: false,
      id: 'area_name'
    },
    {
      name: '买家备注',
      select: false,
      id: 'remark'
    },
    {
      name: '商品标题',
      select: false,
      id: 'goods_title'
    },
    {
      name: '商品编码',
      select: false,
      id: 'goods_code'
    },
    {
      name: '商品规格',
      select: false,
      id: 'goods_sku_text'
    },
    {
      name: '商品数量',
      select: false,
      id: 'goods_num'
    },
    {
      name: '支付方式',
      select: false,
      id: 'pay_type'
    },
    // {
    //   name: '交易单号',
    //   select: false,
    //   id: 'order_sn'
    // },
    {
      name: '配送方式',
      select: false,
      id: 'delivery_type'
    },
    // {
    //   name: '商品小计',
    //   select: false,
    //   id: 'order_sn'
    // },
    // {
    //   name: '成本价',
    //   select: false,
    //   id: 'order_sn'
    // },
    {
      name: '运费',
      select: false,
      id: 'dispatch_amount'
    },
    // {
    //   name: '优惠',
    //   select: false,
    //   id: 'order_sn'
    // },
    // {
    //   name: '订单改价',
    //   select: false,
    //   id: 'order_sn'
    // },
    {
      name: '订单状态',
      select: false,
      id: 'status'
    },
    {
      name: '维权状态',
      select: false,
      id: 'is_after_sale'
    },
    {
      name: '下单时间',
      select: false,
      id: 'createtime'
    },
    {
      name: '付款时间',
      select: false,
      id: 'paytime'
    },
    {
      name: '发货时间',
      select: false,
      id: 'shipments_time'
    },
    {
      name: '完成时间',
      select: false,
      id: 'take_delivery_time'
    },
    {
      name: '物流单号',
      select: false,
      id: 'express_no'
    },
    {
      name: '物流公司',
      select: false,
      id: 'express_name'
    },
    {
      name: '买家备注',
      select: false,
      id: 'remark'
    }
  ])
  const { isSelectAll, selectIds, selectItems } = useMultipleSelect(exportList)
  isSelectAll.value = true
  // axios
  const determineBtn = async () => {
    const { data } = await reqOrderExport({
      title: selectIds.value,
      where: JSON.stringify(props.option)
    })
    const blob = new Blob([data as any])
    const url = window.URL.createObjectURL(blob)
    // console.log(url, '订单信息')
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', '订单.xlsx')
    document.body.appendChild(link)
    link.click()
    show.value = false
  }
  const cancelAll = () => {
    isSelectAll.value = false
    exportList.value.forEach((item: any) => {
      item.select = false
    })
  }
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
</script>
<style lang="scss" scoped>
  .layer-box {
    .option-box {
      cursor: pointer;
      margin: 10px 0 0 10px;
      position: relative;
      width: 100px;
      height: 53px;
      text-align: center;
      line-height: 53px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      .option-img {
        width: 16px;
        height: 10px;
        position: absolute;
        right: 0;
        top: 0;
      }
      &.option-box:nth-child(7n + 1) {
        margin-left: 0;
      }
      &.option-box:first-child {
        margin-left: 0;
      }
    }
    .selectStyle {
      border: 1px solid var(--color-primary);
    }
  }

  .choice-box {
    :deep(.el-button) {
      padding: 0 14px;
      min-height: 32px;
      max-width: 84px;
      min-width: 84px;
    }
  }
  .layer-box-tips {
    margin: 24px 0;
    font-size: 14px;
    color: #000;
  }
  .bottom-btn {
    div {
      font-size: 14px;
      color: #000;
    }
    :deep(.el-button) {
      padding: 0 46px;
      min-height: 32px;
    }
  }
</style>
