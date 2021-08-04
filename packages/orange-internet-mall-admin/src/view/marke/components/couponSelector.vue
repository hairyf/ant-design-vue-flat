<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-15 20:06:49
 * @LastEditTime: 2021-05-10 15:20:32
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <!-- 添加优惠券 -->
  <el-dialog title="添加优惠券" v-model="addDialogVisible" width="30%">
    <div>
      <el-input
        style="width: 50%"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchCoupon"
      >
      </el-input>
      <el-table
        max-height="400"
        :border="false"
        class="goods-list"
        ref="multipleTable"
        :data="couponList"
        tooltip-effect="dark"
        style="width: 100%"
        @select-all="handlSelectAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="优惠券名称" prop="name"> </el-table-column>
        <el-table-column label="类型" prop="name">
          <template #default="scoped">
            <el-tag v-if="scoped.row.type == 2" type="success">折扣券</el-tag>
            <el-tag v-else type="danger">满减券</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="使用说明" prop="explain"> </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <div class="footer">
        <el-button @click="router.push('/marke/coupon/allCoupon')" type="text"
          >优惠券设置</el-button
        >
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determineCoupon">确 定</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref, watch, defineProps, defineEmit } from 'vue'
  import { reqCouponSendCoupon, reqCouponSelect } from '@/api/marketing'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  const emit = defineEmit()
  const props = defineProps({
    addDialogVisible: {
      type: Boolean,
      required: true
    },
    sendValueList: {
      type: Array
    }
  })

  // 是否弹出添加优惠券
  // const addDialogVisible = ref(false)
  const couponList = ref<any[]>([])
  const addcoupon = async () => {
    const res = await reqCouponSelect({
      page: 1,
      limit: 2000,
      search: { name: searchCoupon.value, status: '1', stock: '1' }
    })
    couponList.value = res.data.data.data
  }
  const determineCoupon = () => {
    if (selectList.value.length > 0) {
      const arr: any[] = []
      selectList.value.forEach((item: any) => {
        arr.push(item.id)
      })
      arr.forEach(async (item: any) => {
        await reqCouponSendCoupon({
          send_type: '1',
          send_num: '1',
          coupon_id: item,
          send_value: props.sendValueList
        })
      })
      emit('update:addDialogVisible', false)
      ElMessage.success('发放优惠券成功!')
    } else {
      ElMessage.error('请选择要发放的优惠券')
    }
    // selectList.value = []
    // console.log(selectList.value, '选中的数据')
  }

  // 搜索优惠券
  const searchCoupon = ref('')

  watch(searchCoupon, addcoupon)
  // table 全选设置
  // 选中优惠券
  const selectCouponList = ref<any[]>([])
  // 当前容器元素
  const multipleTable = ref<any>()
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  // 判断是否全选当前页
  const selectAll = ref(false)
  // table选中事件
  const handleSelectionChange = (val: any[]) => {
    selectList.value = val
  }
  watch(
    () => props.addDialogVisible,
    (value) => {
      if (value == true) {
        addcoupon()
      }
    }
  )
</script>
<style lang="scss" scoped>
  // 优惠券弹框底部样式
  .footer {
    display: flex;
    justify-content: space-between;
  }
</style>
