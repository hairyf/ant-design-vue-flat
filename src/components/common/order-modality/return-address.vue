<!--
 * @Author: Mr.wang
 * @Date: 2021-03-31 09:49:35
 * @LastEditTime: 2021-05-07 10:58:00
 * @Description: 退款地址
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="return-address-box">
    <el-dialog title="确认退货地址" v-model="show" width="680px" custom-class="return-address">
      <div class="roll-box">
        <div
          class="address-box oe-flex"
          :class="[item.selsect ? 'default' : '']"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-checkbox
            v-model="item.selsect"
            @change="handCurrentItem(item, index)"
            class="selection-single"
          ></el-checkbox>
          <div class="adderess-box-right">
            <div>
              <span>收货人</span><span class="e-right">{{ item.consignee }}</span>
            </div>
            <div class="middle">
              <span>联系电话</span><span class="e-right">{{ item.phone }}</span>
            </div>
            <div>
              <span>退货地址</span>
              <span class="e-right"
                >{{ item.province_name }}{{ item.city_name }}{{ item.area_name }}{{ item.address }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="!list.length">
          <el-empty class="oe-m-t-30" :image-size="200" description=" ">
            <template #default
              >请先设置退货地址，<span
                class="tips-text"
                @click="router.push('/system/logisticsDistribution/newAddress')"
                >去设置</span
              ></template
            >
          </el-empty>
        </div>
      </div>
      <div class="newly-added" @click="router.push('/system/logisticsDistribution/newAddress')"
        >新增退货地址</div
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus'
  import { reqReturnAddressList, reqSendReturnAddress } from '@/api/order'
  import { ref, computed, defineEmit, defineProps, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  })
  // 列表数据
  const list = ref<any[]>([])
  // 当前项数据
  const currentItem = ref<any>({})
  // 监听
  const handCurrentItem = (item: any, index: number) => {
    list.value.forEach((item) => {
      item.selsect = false
    })
    list.value[index].selsect = true
    currentItem.value = item
  }
  // 获取收货地址列表
  reqReturnAddressList({ page: 1, limit: 100 }).then((res) => {
    list.value = res.data.data.data
    list.value.forEach((item) => {
      if (item.is_default == 1) {
        item.selsect = true
        currentItem.value = item
      } else {
        item.selsect = false
      }
    })
  })
  //  确定按钮
  const determineBtn = async () => {
    const option = {
      shopAddresId: currentItem.value.id,
      order_id: props.option.id,
      order_item_id: props.option.orderGoods[0].id,
      order_after_sale_id: props.option.afterSales.id
    }
    await reqSendReturnAddress(option)
    emit('updateData')
    ElMessage.success('操作成功!!')
    show.value = false
  }
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
</script>
<style lang="scss" scoped>
  .return-address-box {
    .return-address {
      position: relative;
      .roll-box {
        max-height: 500px;
        min-height: 500px;
        overflow-y: auto;
      }
      .address-box {
        margin-top: 14px;
        padding: 14px 26px;
        border: 1px solid #d9d9d9;
      }
      .default {
        border: 1px solid var(--color-primary);
      }
      .adderess-box-right {
        padding-left: 60px;
        div {
          font-size: 14px;
          line-height: 22px;
          color: #000000;
        }
      }
      .middle {
        margin: 14px 0;
      }
      .e-right {
        margin-left: 14px;
      }
      .newly-added {
        cursor: pointer;
        position: absolute;
        bottom: 28px;
        left: 20px;
        color: var(--color-primary);
      }
      .tips-text {
        cursor: pointer;
        color: var(--color-primary);
      }
      .dialog-footer {
        .el-button {
          min-height: 32px;
          padding: 0 45px;
          font-size: 14px;
        }
      }
    }
  }
</style>
