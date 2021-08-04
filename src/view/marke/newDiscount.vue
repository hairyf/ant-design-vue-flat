<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-24 15:09:19
 * @LastEditTime: 2021-05-10 15:20:49
 * @Description: 新增优惠券
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form class="coupon-from" :rules="rules" :model="form" label-width="150px">
    <el-row :gutter="20">
      <el-col>
        <el-card shadow="never">
          <el-form-item label="优惠券名称" prop="name">
            <el-input class="tips-inp" placeholder="输入优惠券名称" v-model="form.name"> </el-input>
          </el-form-item>
          <el-form-item label="优惠券类型">
            <div>
              <el-radio-group v-model="form.type">
                <el-radio :label="2">
                  <el-tag type="success">折扣券</el-tag>
                </el-radio>
                <el-radio :label="1">
                  <el-tag type="danger">满减券</el-tag>
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="使用范围" prop="to_obj">
            <el-radio-group class="grade-radio-consumption" v-model="form.to_obj">
              <el-radio-button @click="showInput()" border :label="1">不限制</el-radio-button>
              <el-radio-button @click="showAppoint()" border :label="2"
                >指定可用商品</el-radio-button
              >
              <el-radio-button @click="showInput()" border :label="3">指定商品分组</el-radio-button>
              <el-radio-button @click="showInput()" border :label="4">指定商品分类</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 产品名称 -->
          <el-form-item label="产品名称" v-if="form.to_obj == 2">
            <el-table
              class="table-box"
              :cell-style="{ background: '#fff' }"
              :data="tableList"
              style="width: 660px"
            >
              <el-table-column label="产品名称" min-width="160" prop="name">
                <template #default="scoped">
                  <div class="oe-flex Member-name">
                    <el-image
                      style="width: 32px; height: 32px"
                      :src="scoped.row.main_picture"
                      class="Member-name-img"
                    />
                    <div class="Member-name-text" v-if="scoped.row.goods_type == 1">
                      <el-tag type="success" size="mini">实体</el-tag> {{ scoped.row.name }}</div
                    >
                    <div class="Member-name-text" v-if="scoped.row.goods_type == 2">
                      <el-tag type="danger" size="mini">虚拟</el-tag> {{ scoped.row.name }}</div
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="address" min-width="100" label="产品价格">
                <div class="is-color">¥192.00</div>
              </el-table-column>

              <el-table-column prop="address" label="操作" min-width="150">
                <template #default="scoped">
                  <div class="column-width">
                    <el-button type="text" @click="delateProduct(scoped.row.id)">删除</el-button>
                    <el-button type="text" @click="replaceProduct(scoped.row.id)">替换</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-add" @click="changeRelatedGoods">
              <el-button><i class="el-icon-plus el-icon--left"></i>添加</el-button>
            </div>
          </el-form-item>
          <!-- 分组选择 -->
          <el-form-item label="分组选择" v-if="form.to_obj == 3">
            <el-select v-model="form.appoint_content" placeholder="分组选择">
              <el-option
                v-for="item in GroupOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 指定商品分类 -->
          <el-form-item label="分类选择" v-if="form.to_obj == 4">
            <el-cascader
              placeholder="选择分类"
              v-model="form.appoint_content"
              size="small"
              :options="commodityClassOptions"
              :props="classProps"
              clearable
              collapse-tags
            >
            </el-cascader>
          </el-form-item>
          <el-form-item v-if="radio == 3" label="优惠券面额" prop="condition_order_amount">
            <span class="inSpace">消费券</span>
            <el-input
              type="number"
              class="tips-inp"
              placeholder="请输入金额"
              v-model="form.condition_order_amount"
            >
              <template #append>元</template></el-input
            >

            <span v-if="form.type == 2" class="inSpace">享</span>
            <el-input
              type="number"
              v-if="form.type == 2"
              class="tips-inp"
              placeholder="请输入0.1-9.9"
              v-model="form.money"
              ><template #append>折</template></el-input
            >

            <span v-if="form.type == 1" class="inSpace">减</span>
            <el-input
              type="number"
              v-if="form.type == 1"
              class="tips-inp"
              placeholder="请输入金额"
              v-model="form.money"
              ><template #append>折</template></el-input
            >
          </el-form-item>
          <el-form-item label="优惠券总数限制" prop="stock">
            <el-switch
              class="inSpace"
              v-model="totalSwitch"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-form-item>
          <el-form-item v-if="totalSwitch == 1" prop="stock">
            <el-input
              class="tips-inp"
              placeholder="请输入数量"
              v-model.number="form.stock"
              type="number"
            >
              <template #append>张</template></el-input
            >
          </el-form-item>
          <el-form-item label="限制单人可领取">
            <el-switch
              class="inSpace"
              :active-value="1"
              :inactive-value="2"
              v-model="singleSwitch"
            ></el-switch>
          </el-form-item>
          <el-form-item v-if="singleSwitch == 1">
            <el-input
              class="tips-inp"
              placeholder="请输入数量"
              v-model="form.get_max_one_person"
              type="number"
            >
              <template #append>张</template></el-input
            >
          </el-form-item>
          <el-form-item label="开始/结束发放时间" prop="start_time">
            <div class="date-picker">
              <el-date-picker
                prefix-icon="el-icon-date"
                @change="timeactive"
                v-model="grantTime"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="使用时间限制" prop="use_start_time">
            <div class="date-picker">
              <el-date-picker
                prefix-icon="el-icon-date"
                @change="timeuse"
                v-model="useTime"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="是否公开">
            <el-switch
              class="inSpace"
              :active-value="1"
              :inactive-value="2"
              v-model="form.is_open"
            ></el-switch>
          </el-form-item>

          <el-form-item label="领取会员限制" prop="user_limit">
            <el-radio-group v-model="form.user_limit">
              <el-radio :label="1">全部会员</el-radio>
              <el-radio :label="2">指定会员等级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.user_limit === 2" label="会员等级">
            <el-checkbox-group v-model="form.user_limit_level">
              <el-checkbox v-for="city in checkedCities" :label="city.value" :key="city.value">{{
                city.name
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="优惠券说明" prop="explain">
            <el-input
              type="textarea"
              class="couponTextarea"
              :rows="12"
              placeholder="请输入备注"
              v-model="form.explain"
            >
            </el-input>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
  <el-card shadow="never" class="set-footer-btn">
    <div class="set-footer">
      <el-button @click="router.push('allCoupon')">取消</el-button>
      <el-button @click="addCoupon" type="primary">保存</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { reqCouponAdd, reqGoodsGroupList, reqGoodsClassList } from '@/api/marketing'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import dayjs from 'dayjs'
  import { LinkSelect } from '@/components/selectors'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  // 新增商品
  const changeRelatedGoods = async () => {
    const res = await LinkSelect({
      option: { commodity: true }
    })

    const isPush = tableList.value.every((item: any) => item.id != res.id)

    if (isPush) {
      tableList.value.push(res)
    } else {
      ElMessage('列表已有该商品')
    }
  }
  // 删除商品
  const delateProduct = (productId: Key) => {
    const index = tableList.value.findIndex((item: any) => item.id == productId)
    tableList.value.splice(index, 1)
  }
  // 替换商品
  const replaceProduct = async (productId: Key) => {
    const res = await LinkSelect({
      option: { commodity: true }
    })

    const isPush = tableList.value.every((item: any) => item.id != res.id)

    if (isPush) {
      const index = tableList.value.findIndex((item: any) => item.id == productId)
      tableList.value.splice(index, 1, res)
    } else {
      ElMessage('列表已有该商品')
    }
  }
  // 分组列表
  const GroupOptions = ref<any[]>([])
  reqGoodsGroupList().then((res) => {
    GroupOptions.value = res.data.data.data
  })
  // 分类
  // props配置
  const classProps = {
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    checkStrictly: true,
    emitPath: false
  }
  const commodityClassOptions = ref<any[]>([])
  reqGoodsClassList().then((res) => {
    commodityClassOptions.value = res.data.data.data
  })
  const radio = ref(3)
  const rules = ref({
    name: [{ required: true, message: '请填写优惠券名称', trigger: 'blur' }],
    to_obj: [{ required: true, message: '请选择可使用范围', trigger: 'blur' }],
    condition_order_amount: [{ required: true, message: '请填写优惠券面额', trigger: 'blur' }],
    stock: [{ required: true, message: '请填写优惠券总限制数', trigger: 'blur' }],
    start_time: [{ required: true, message: '请填写开始/结束发放时间', trigger: 'blur' }],
    use_start_time: [{ required: true, message: '请填写使用时间限制', trigger: 'blur' }],
    user_limit: [{ required: true, message: '请填写领取会员限制', trigger: 'blur' }],
    explain: [{ required: true, message: '请填写优惠券说明', trigger: 'blur' }]
  })
  // 显示各类输入框
  const showInput = () => {
    ischeckInput.value = !ischeckInput.value
  }
  // 显示单次消费输入框
  const ischeckInput = ref(true)
  // 是否开启总数限制
  const totalSwitch = ref(1)
  // 是否为全部会员
  const isAllMember = ref(1)
  // 开始/结束发放时间
  const grantTime = ref<any>(null)
  // 使用时间限制
  const useTime = ref<any>(null)
  const shortcuts = ref([
    {
      text: '最近一周',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      })()
    },
    {
      text: '最近一个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      })()
    },
    {
      text: '最近三个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      })()
    }
  ])
  // 是否开启总数限制
  const singleSwitch = ref(1)

  const timeactive = (time: any) => {
    if (grantTime.value != null) {
      form.value.start_time = dayjs(grantTime.value[0]).unix()
      form.value.end_time = dayjs(grantTime.value[1]).unix()
    }
  }
  const timeuse = (time: any) => {
    if (useTime.value != null) {
      form.value.use_start_time = dayjs(useTime.value[0]).unix()
      form.value.use_end_time = dayjs(useTime.value[1]).unix()
    }
  }
  const form = ref<any>({
    name: '',
    type: 2,
    to_obj: 1,
    condition_order_amount: '',
    money: '',
    stock: '',
    get_max_one_person: '',
    start_time: '',
    end_time: '',
    use_start_time: '',
    use_end_time: '',
    is_open: 1,
    user_limit: 1,
    user_limit_level: [],
    explain: '',
    appoint_content: []
  })

  // 内容数据
  const tableList = ref<any[]>([])

  // 分组名称
  const options = ref([
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    }
  ])
  const value = ref('')

  // 会员等级
  const checkedCities = ref([
    {
      name: '普通等级',
      value: 0
    },
    {
      name: '一级',
      value: 1
    },
    {
      name: '二级',
      value: 2
    },
    {
      name: '三级',
      value: 3
    },
    {
      name: '四级',
      value: 4
    },
    {
      name: '五级',
      value: 5
    },
    {
      name: '六级',
      value: 6
    },
    {
      name: '七级',
      value: 7
    },
    {
      name: '八级',
      value: 8
    }
  ])

  // 显示指定可用商品
  const showAppoint = () => {}

  const addCoupon = async () => {
    // 不限制
    if (form.value.to_obj == 1) {
      form.value.appoint_content = []
    }
    // 商品
    if (form.value.to_obj == 2) {
      const arr: any = []
      tableList.value.forEach((item: any) => {
        arr.push(item.id)
      })
      form.value.appoint_content = arr
    }
    // 分组
    if (form.value.to_obj == 3) {
      if (form.value.appoint_content == '') {
        form.value.appoint_content = []
      } else {
        const arr = [form.value.appoint_content]
        form.value.appoint_content = arr
        arr.push()
      }
    }
    // 分类
    if (form.value.to_obj == 4) {
      if (form.value.appoint_content == '') {
        form.value.appoint_content = []
      }
    }
    if (totalSwitch.value == 2) {
      form.value.stock = -1
    }
    if (singleSwitch.value == 2) {
      form.value.get_max_one_person = -1
    }

    await reqCouponAdd(form.value)
    router.push('allCoupon')
  }
</script>

<style lang="scss" scoped>
  .coupon-from {
    .grade-radio-consumption {
      .el-radio-button {
        margin: 0 15px;
        :deep(.el-radio-button__inner) {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
      .el-checkbox-button {
        margin: 0 15px;
        :deep(.el-checkbox-button__inner) {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
    }
    .inSpace {
      margin: 0 15px;
    }
    .date-picker {
      :deep(.el-input__inner) {
        width: 500px;
      }
    }
    .btn-add {
      margin-top: 30px;
      .el-button {
        width: 660px;
        margin: 0;
      }
    }
    .couponTextarea {
      width: 500px;
    }
    .column-width {
      width: 115px;
      .el-button {
        margin-left: 0;
        padding: 0 5px;
      }
    }
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
      margin-left: 126px;
      min-height: 32px;
      padding: 2px 42px;
    }
    .tips-text {
      line-height: 30px;
      font-size: 12px;
      color: #8c8c8c;
    }
    .coupon-title {
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
  }
  .set-footer-btn {
    margin-top: 20px;
    .set-footer {
      display: flex;
      justify-content: center;
      .el-button {
        width: 180px;
      }
    }
  }
</style>
