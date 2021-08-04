<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-24 15:09:19
 * @LastEditTime: 2021-05-13 10:19:03
 * @Description: 手动发券
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form
    ref="discountForm"
    class="discount-from"
    :rules="rules"
    :model="form"
    label-width="125px"
  >
    <el-row :gutter="20">
      <el-col>
        <el-card shadow="never">
          <div class="discount-title">手动发券设置</div>

          <el-form-item label="优惠券选择" prop="coupon_id">
            <div class="manual-button">
              <el-button @click="addcoupon" plain>添加优惠券</el-button>
            </div>
            <p class="tips-text">只可选择总数为无限制且正在发放中的优惠券，否则无法发放优惠券</p>
          </el-form-item>
          <el-table
            v-if="selectCouponList.length > 0"
            :border="false"
            class="goods-list oe-m-l-30 oe-m-b-20"
            ref="multipleTable"
            :data="selectCouponList"
            tooltip-effect="dark"
            style="width: 60%"
          >
            <el-table-column label="优惠券名称" prop="name"> </el-table-column>
            <el-table-column label="类型">
              <template #default="scoped">
                <el-tag v-if="scoped.row.type == 2" type="success">折扣券</el-tag>
                <el-tag v-else type="danger">满减券</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="使用说明" prop="explain"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scoped">
                <span
                  style="color: var(--color-primary)"
                  @click="deleteSelectCoupon(scoped.row.id)"
                  type="text"
                  >删除</span
                >
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label="每人发送张数" prop="send_num">
            <el-input
              @keyup.enter="sendSubmit"
              class="tips-inp"
              type="number"
              v-model="form.send_num"
              placeholder="请输入数量"
            ></el-input>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-card shadow="never">
          <div class="discount-title">发送对象</div>
          <el-form-item label="发送类型">
            <div>
              <el-radio-group v-model="form.send_type">
                <el-radio :label="1">指定会员发送</el-radio>
                <el-radio :label="2">按会员等级发送</el-radio>
                <el-radio :label="3">全部发送</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <div v-if="form.send_type == 1">
            <el-form-item label="指定会员">
              <div class="manual-button">
                <el-button @click="changeRelatedGoods" plain>选择会员</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <p class="tips-text">可指定多位会员</p>
            </el-form-item>
            <el-form-item>
              <div class="appoint-member-list">
                <div
                  @click="item.isSelect = !item.isSelect"
                  :class="{ current: item.isSelect }"
                  class="appoint-member-item"
                  v-for="item in appointMemberList"
                  :key="item.id"
                >
                  <div @click="deleteChoiceMember(item.id)" class="icon" v-if="item.isSelect">
                    <i class="el-icon-close yes"></i>
                  </div>
                  <div class="left">
                    <el-image :src="item.avatar"></el-image>
                  </div>
                  <div class="rigth">
                    <div class="title">{{ item.nickname }}</div>
                    <div class="bottom"> <el-image :src="item.user_channel_img"></el-image> </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="form.send_type == 2">
            <el-form-item label="领取限制">
              <el-checkbox-group v-model="membershipLevel">
                <el-checkbox v-for="city in checkedCities" :label="city.value" :key="city.value">
                  {{ city.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button @click="sendSubmit" type="primary">确认发送</el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
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
        <el-button @click="router.push('allCoupon')" type="text">优惠券设置</el-button>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determineCoupon">确 定</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue'
  import { reqCouponSendCoupon, reqCouponSelect } from '@/api/marketing'
  import { useRouter } from 'vue-router'
  import { MemberSelect } from '@/components/selectors'
  import { ElMessageBox, ElMessage } from 'element-plus'
  const router = useRouter()

  // 是否弹出添加优惠券
  const addDialogVisible = ref(false)
  const couponList = ref<any[]>([])
  const addcoupon = async () => {
    addDialogVisible.value = true
    const res = await reqCouponSelect({
      page: 1,
      limit: 2000,
      search: { name: searchCoupon.value, status: '1', stock: '1' }
    })
    couponList.value = res.data.data.data
  }
  const determineCoupon = () => {
    addDialogVisible.value = false
    if (selectList.value.length > 0) {
      selectList.value.forEach((item: any) => {
        selectCouponList.value.push(item)
      })
    }
    selectList.value = []
  }

  // 搜索优惠券
  const searchCoupon = ref('')

  watch(searchCoupon, addcoupon)
  // table 全选设置
  // 选中优惠券
  const selectCouponList = ref<any[]>([])
  // 删除单个选中优惠券
  const deleteSelectCoupon = (couponId: Key) => {
    const index = selectCouponList.value.findIndex((item: any) => item.id == couponId)
    selectCouponList.value.splice(index, 1)
  }
  // 选择优惠券
  const changeRelatedGoods = async () => {
    const res = await MemberSelect({ multiple: true })
    if (res.length > 0) {
      res.forEach((item: any) => {
        const isPush = appointMemberList.value.every((el: any) => el.id != item.id)
        if (isPush) {
          item.isSelect = false
          appointMemberList.value.push(item)
        }
      })
    }
  }
  // 指定会员等级
  const appointMemberList = ref<any[]>([])
  const membershipLevel = ref([])
  const checkedCities = ref([
    {
      name: '普通',
      value: '0'
    },
    {
      name: '一级',
      value: '1'
    },
    {
      name: '二级',
      value: '2'
    },
    {
      name: '三级',
      value: '3'
    },
    {
      name: '四级',
      value: '4'
    },
    {
      name: '五级',
      value: '5'
    },
    {
      name: '六级',
      value: '6'
    },
    {
      name: '七级',
      value: '7'
    },
    {
      name: '八级',
      value: '8'
    }
  ])
  // 删除某个会员列表
  const deleteChoiceMember = (memberId: Key) => {
    const index = appointMemberList.value.findIndex((item: any) => item.id == memberId)
    appointMemberList.value.splice(index, 1)
  }
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
  const rules = reactive({
    send_num: [{ required: true, message: '请填写每人发放张数', trigger: 'blur' }],
    coupon_id: [{ required: true, message: '请选择优惠券', trigger: 'blur' }]
  })
  const form = ref<any>({
    coupon_id: '',
    send_num: '',
    send_type: 1,
    send_value: []
  })
  // 手动发券提交
  const discountForm = ref<any>()
  const sendSubmit = () => {
    ElMessageBox.confirm('您确定开始发放该优惠券么？', '开始发放', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      if (selectCouponList.value.length > 0) {
        const arr: any = []
        selectCouponList.value.forEach((item: any) => {
          arr.push(item.id)
        })
        form.value.coupon_id = arr.join()
      }
      // 指定会员
      if (form.value.send_type == 1) {
        const arr: any = []
        appointMemberList.value.forEach((item: any) => {
          arr.push(item.id)
        })
        form.value.send_value = arr
      }
      if (form.value.send_type == 2) {
        form.value.send_value = membershipLevel.value
      }
      discountForm.value.validate(async (valid: any) => {
        if (valid) {
          await reqCouponSendCoupon(form.value)
          ElMessage.success('发放成功')
        } else {
          return false
        }
      })
    })
  }
</script>

<style lang="scss">
  .el-dialog__title {
    font-size: 16px;
    font-weight: bold;
  }
</style>
<style lang="scss" scoped>
  .manual-button {
    .el-button {
      color: var(--color-primary);
    }
  }
  // 优惠券弹框底部样式
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .discount-from {
    :deep(.el-form-item__label) {
      color: #000;
    }
    :deep(.el-radio__label) {
      color: #000;
    }
    :deep(.el-input__inner) {
      width: 194px;
    }
    :deep(.el-input) {
      width: 194px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    :deep(.el-input-group__append) {
      line-height: 30px;
    }
    .move-negative {
      margin-left: -26px;
    }
    .move-left {
      margin-left: 80px;
    }
    .banck-box {
      :deep(.el-input) {
        padding: 2px 0;
      }
    }
    :deep(.el-button) {
      min-height: 32px;
      padding: 2px 42px;
    }
    .tips-text {
      line-height: 30px;
      font-size: 12px;
      color: #8c8c8c;
      margin: 6px 0 0 0;
    }
    .discount-title {
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 15px;
    }
    .is-color {
      cursor: pointer;
      color: var(--color-primary);
    }
    .delete-btn {
      margin-left: 14px;
    }
    .add-btn {
      font-size: 14px;
      margin: 24px 0 28px 126px;
    }
    .withdrawal {
      margin-top: 24px;
    }
    .el-row {
      margin-top: 15px;
    }
    .long-inp {
      :deep(.el-textarea__inner) {
        width: 300px;
      }
    }
  }
  // 指定会员列表
  .appoint-member-list {
    display: flex;
    flex-wrap: wrap;
    .appoint-member-item {
      position: relative;
      display: flex;
      align-items: center;
      width: 156px;
      height: 70px;
      margin-right: 40px;
      margin-bottom: 24px;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
      line-height: 26px;
      .icon {
        position: absolute;
        right: -10px;
        top: -10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--color-primary);
        z-index: 20;
        .yes {
          position: absolute;
          top: 3px;
          left: 3px;
          color: #fff;
          font-size: 14px;
        }
      }
      &.current {
        border-color: var(--color-primary);
      }
      .left {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 10px;
      }
      .rigth {
        display: flex;
        flex-direction: column;
        .bottom {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
</style>
