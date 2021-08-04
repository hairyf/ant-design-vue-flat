<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:17:12
 * @Description: 批量操作
 * @LastEditors: Mr.wang
-->
<template>
  <div class="content">
    <div class="setting-type">
      <div class="title">操作类型</div>
      <div class="goods-type-button-box">
        <el-button
          class="goods-type-button"
          plain
          v-for="item in settingTypeList"
          :key="item.id"
          :type="currentButton == item.id ? `primary` : undefined"
          size="small"
          @click="changeCurrentType(item.id)"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
    <div class="warning-alter">
      每次只能修改一项，修改后点击保存即可生效。如需修改多项，需多次操作。
    </div>
    <el-row :gutter="24" class="choice-aal">
      <el-col :sm="24" :md="24" :lg="12" :xl="12" class="right-box">
        <el-card shadow="never">
          <el-row :gutter="24" class="title-search">
            <el-col :sm="4" :lg="4" :xl="4" class="oe-m-b-10">
              <el-button @click="selectAll" size="small" type="primary">全选</el-button>
            </el-col>
            <el-col :sm="2" :md="20" :lg="20" :xl="2"></el-col>
            <el-col :sm="6" :md="6" :lg="6" :xl="6">
              <div class="label-product oe-flex-1">
                <el-cascader
                  v-model="formInfo.classId"
                  placeholder="选择分类"
                  size="small"
                  :options="commodityClassOptions"
                  :props="props"
                  collapse-tags
                  clearable
                ></el-cascader>
                <!-- <el-cascader
              v-model="formInfo.tabId"
              size="small"
              :options="commodityTabOptions"
              :props="classProps"
              clearable
              collapse-tags
            >
            </el-cascader> -->
              </div>
            </el-col>
            <el-col :sm="6" :md="6" :lg="6" :xl="6">
              <el-select clearable v-model="formInfo.groupId" placeholder="选择分组">
                <el-option
                  v-for="item in commodityGroupingOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :sm="6" :md="12" :lg="12" :xl="6">
              <el-input
                placeholder="请输入商品 名称"
                suffix-icon="el-icon-search"
                v-model="formInfo.title"
              >
              </el-input
            ></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col
              v-for="(item, index) in operationPageList"
              :key="index"
              :xl="6"
              :lg="8"
              :md="6"
              :sm="12"
              class="commodity-item"
            >
              <div
                @click="item.select = true"
                class="commodity-item-son"
                :class="{ 'change-color': item.select }"
              >
                <div class="icon" v-if="item.select">
                  <i class="el-icon-check yes"></i>
                </div>
                <div class="item-left">
                  <el-image :src="item.main_picture"></el-image>
                </div>
                <div class="item-right">
                  <div class="commodity-name">{{ item.title }}</div>
                  <div class="commodity-price">
                    <span class="text">价格</span>
                    <span class="price">{{ item.price }}</span>
                  </div>
                  <div class="commodity-stock">
                    <div class="stock-left">
                      <span class="text">库存</span>
                      <span class="stock">{{ item.stock }}</span>
                    </div>
                    <div class="stock-right">
                      <el-tag v-if="item.goods_type == 1" type="success">实体</el-tag>
                      <el-tag v-if="item.goods_type == 2" type="danger">虚拟</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-empty class="oe-m-t-20" v-if="!operationPageList.length" description="暂无商品" />
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="16"
            :total="pagination.total"
            layout="prev, pager, next"
          >
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="24" :lg="12" :xl="12" class="right-box">
        <el-card shadow="never">
          <el-row :gutter="24" class="title-search">
            <el-col :sm="4" :md="4" :lg="4" :xl="4" class="oe-m-b-10">
              <el-button @click="cancelAll" size="small" type="primary">全部取消</el-button>
            </el-col>
            <el-col :sm="2" :md="20" :lg="20" :xl="2"></el-col>
            <el-col :sm="6" :md="6" :lg="6" :xl="6">
              <el-cascader
                v-model="formInfo.classId"
                placeholder="选择分类"
                size="small"
                :options="commodityClassOptions"
                :props="props"
                collapse-tags
                clearable
              ></el-cascader>
            </el-col>
            <el-col :sm="6" :md="6" :lg="6" :xl="6">
              <el-select clearable v-model="formInfo.groupId" placeholder="选择分组">
                <el-option
                  v-for="item in commodityGroupingOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :sm="6" :md="12" :lg="12" :xl="6">
              <el-input
                placeholder="请输入商品 名称"
                suffix-icon="el-icon-search"
                v-model="formInfo.title"
              >
              </el-input
            ></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col
              v-for="(item, index) in cancelPageList"
              :key="index"
              :xl="6"
              :lg="8"
              :md="6"
              :sm="12"
              class="commodity-item"
            >
              <div
                @click="item.select = false"
                class="commodity-item-son"
                :class="{ 'change-color': item.select }"
              >
                <div class="icon" v-if="item.select">
                  <i class="el-icon-close yes"></i>
                </div>
                <div class="item-left">
                  <el-image :src="item.main_picture"></el-image>
                </div>
                <div class="item-right">
                  <div class="commodity-name">{{ item.title }}</div>
                  <div class="commodity-price">
                    <span class="text">价格</span>
                    <span class="price">{{ item.price }}</span>
                  </div>
                  <div class="commodity-stock">
                    <div class="stock-left">
                      <span class="text">库存</span>
                      <span class="stock">{{ item.stock }}</span>
                    </div>
                    <div class="stock-right">
                      <el-tag type="success">实体</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-empty class="oe-m-t-20" v-if="!cancelPageList.length" description="暂无选择商品" />
          <div class="paging-box">
            <el-pagination
              @current-change="handleCurrentChangeCancel"
              :current-page="paginationCancel.currentPage"
              :page-size="12"
              :total="cancelList.length"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 操作选项 -->
    <el-card shadow="never" class="set-an-option" v-if="currentButton != 8 && currentButton != 11">
      <el-form
        class="demo-ruleForm"
        ref="binForm"
        :rules="goodsOperationRules"
        :model="form"
        :label-width="currentButton == 1 ? '' : '110px'"
      >
        <!-- 商品名称 -->
        <div class="operation-options">
          <span class="title">操作选项</span>
          <div class="is-show-list" v-if="currentButton == 1">
            <el-form-item>
              <el-radio v-model="form.radio" label="add">添加商品名称前缀/后缀</el-radio>
              <span class="add-tips"
                >在商品名称之前后或之后增加文字，输入框内容为空即为不添加内容</span
              >
            </el-form-item>
            <el-form-item v-if="form.radio == 'add'">
              <span>前缀</span>
              <el-input
                class="prefix"
                type="text"
                v-model="form.prefix"
                maxlength="10"
                show-word-limit
                size="small"
              >
              </el-input>
              <span>后缀</span>
              <el-input
                class="prefix"
                type="text"
                v-model="form.suffix"
                maxlength="10"
                show-word-limit
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="form.radio" label="replace">替换名称</el-radio>
              <span class="add-tips"
                >将商品名称中的文字替换成其他文字，“替换为”内容填空则将原有文字删除</span
              >
            </el-form-item>
            <el-form-item v-if="form.radio == 'replace'">
              <span>原有文字</span>
              <el-input
                class="prefix"
                type="text"
                v-model="form.originalText"
                maxlength="10"
                show-word-limit
                size="small"
              >
              </el-input>
              <span>替换为</span>
              <el-input
                class="prefix"
                type="text"
                v-model="form.replaceText"
                maxlength="10"
                show-word-limit
                size="small"
              >
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="目标分类" prop="classId" v-if="currentButton == 2">
            <el-cascader
              v-model="form.classId"
              placeholder="目标分类"
              size="small"
              :options="targetClassOptions"
              :props="classProps"
              collapse-tags
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="目标分组" prop="groupId" v-if="currentButton == 3">
            <el-select
              clearable
              size="small"
              class="oe-m-b-20 select-width"
              v-model="form.groupId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetGroupingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联标签" prop="label" v-if="currentButton == 4">
            <el-cascader
              v-model="form.label"
              placeholder="请选择"
              size="small"
              :options="targetLabelOptions"
              :props="props"
              collapse-tags
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="目标支持" prop="support" v-if="currentButton == 5">
            <el-select
              clearable
              size="small"
              class="oe-m-b-20 select-width"
              v-model="form.support"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetvSupportOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目标参数" prop="parameter" v-if="currentButton == 6">
            <el-select
              clearable
              size="small"
              class="oe-m-b-20 select-width"
              v-model="form.parameter"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetvParameterOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="correcting-inventory" v-if="currentButton == 7">
            <el-form-item label="物流支持">
              <el-radio v-model="form.isLogistics" label="edit">修改库存数量</el-radio>
              <el-radio v-model="form.isLogistics" label="add">添加库存</el-radio>
              <el-radio v-model="form.isLogistics" label="down">减少库存</el-radio>
            </el-form-item>
            <el-form-item label="目标数值" prop="numValue">
              <el-input
                @input="form.numValue = inputStock(form.numValue)"
                v-model="form.numValue"
                style="width: 228px"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="物流支持" prop="logistics" v-if="currentButton == 9">
            <el-checkbox-group v-model="form.logistics">
              <el-checkbox label="1">快递发货</el-checkbox>
              <el-checkbox label="2">同城配送</el-checkbox>
              <el-checkbox label="3">上门自提</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="定时上架时间" prop="time" v-if="currentButton == 10">
            <el-date-picker
              @blur="changeTimingTime"
              prefix-icon="el-icon-date"
              style="width: 25%"
              v-model="timeShelves"
              type="datetime"
              class="oe-m-b-20"
              placeholder="选择日期时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="物流支持" prop="logistics" v-if="currentButton == 11">
            <el-checkbox-group v-model="checkLogisticsList">
              <el-checkbox :label="1">快递发货</el-checkbox>
              <el-checkbox :label="2">同城配送</el-checkbox>
              <el-checkbox :label="3">上门自提</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="会员等级" prop="memberGrade" v-if="currentButton == 12">
            <div class="label-product oe-flex-1">
              <el-cascader
                v-model="form.memberGrade"
                size="small"
                :options="targetvMemberOptions"
                :props="props"
                clearable
                collapse-tags
              >
              </el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="会员等级" prop="purchase" v-if="currentButton == 13">
            <div class="label-product oe-flex-1">
              <el-cascader
                v-model="form.purchase"
                size="small"
                :options="targetvPurchaseOptions"
                :props="props"
                clearable
                collapse-tags
              >
              </el-cascader>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <!-- 底部固定按钮card -->
    <el-card shadow="never" class="footer-card">
      <div class="button-box">
        <el-button @click="currentButton++" size="small" v-if="currentButton != 13"
          >下一步</el-button
        >
        <el-button @click="editOperation" size="small" type="primary">批量修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, watch } from 'vue'
  import {
    reqGoodsList,
    reqGoodsGroupList,
    reqGoodsClassList,
    reqGoodsBathEditName,
    reqGoodsBathEditclass,
    reqGoodsBathEditTab,
    reqGoodsServiceList,
    reqGoodsBathEditGroup,
    reqGoodsBathEditServive,
    reqGoodsParamList,
    reqGoodsBathEditParam,
    reqGoodsGoodsTabList,
    reqGoodsBathEditStock,
    reqGoodsBathEditpostage,
    reqGoodsBathEditLogisticsType,
    reqGoodsBathEditSoldOut,
    reqGoodsBathEditFreights,
    reqShopUserLevelIndex,
    reqGoodsBathEditBrowseAuth
  } from '@/api/commodity'
  import { usePagination } from '@/hooks/use-pagination'
  import { inputStock } from '@/hooks/reset-time'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'

  // 分页器
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const {
    pagination: paginationCancel,
    handleCurrentChange: handleCurrentChangeCancel
  } = usePagination()
  // 批量操作
  const operationList = ref<any>([])
  const operationPageList = computed(() => {
    return operationList.value.slice((pagination.currentPage - 1) * 12, 12 * pagination.currentPage)
  })
  const { selectItems: cancelList } = useMultipleSelect(operationList)
  const cancelPageList = computed(() => {
    return cancelList.value.slice(
      (paginationCancel.currentPage - 1) * 12,
      12 * paginationCancel.currentPage
    )
  })
  // 商品设置
  const form = ref({
    radio: 'add',
    prefix: '',
    suffix: '',
    originalText: '',
    replaceText: '',
    classId: [] as any,
    groupId: '',
    support: '',
    label: [] as any,
    parameter: '',
    isLogistics: 'edit',
    numValue: '',
    logistics: [],
    time: '',
    memberGrade: [],
    purchase: []
  })
  const timeShelves = ref('')
  // 表单验证
  const goodsOperationRules = reactive({
    classId: [{ required: true, message: '请输入目标分类', trigger: 'blur' }],
    groupId: [{ required: true, message: '请输入目标分组', trigger: 'blur' }],
    support: [{ required: true, message: '请输入目标支持', trigger: 'blur' }],
    parameter: [{ required: true, message: '请输入目标参数', trigger: 'blur' }],
    label: [{ required: true, message: '请输入关联标签', trigger: 'blur' }],
    numValue: [{ required: true, message: '请输入目标数值', trigger: 'blur' }],
    logistics: [{ required: true, message: '请选择物流支持', trigger: 'blur' }],
    time: [{ required: true, message: '请选择上架时间', trigger: 'blur' }],
    memberGrade: [{ required: true, message: '请选择会员等级', trigger: 'blur' }],
    purchase: [{ required: true, message: '请选择会员等级', trigger: 'blur' }]
  })
  const changeTimingTime = () => {
    if (timeShelves.value == null || timeShelves.value == '') {
      form.value.time = ''
    } else {
      form.value.time = timeShelves.value
    }
  }
  // 搜索对象
  const formInfo = ref<any>({
    title: '',
    groupId: '',
    classId: []
  })
  // 获取form对象
  const binForm = ref<any>()
  // 公共props配置
  const props = reactive({
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    checkStrictly: true,
    emitPath: false
  }) as any
  // 分类props配置
  const classProps = reactive({
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    // checkStrictly: true,
    emitPath: false
  }) as any
  // 分组
  const commodityGroupingOptions = ref<any>([])
  const targetGroupingOptions = ref<any>([])
  reqGoodsGroupList().then((res) => {
    commodityGroupingOptions.value = res.data.data.data
    targetGroupingOptions.value = res.data.data.data
  })
  // 分类
  const commodityClassOptions = ref<any>([])
  const targetClassOptions = ref<any>([])
  reqGoodsClassList().then((res) => {
    commodityClassOptions.value = res.data.data.data
    targetClassOptions.value = res.data.data.data
  })
  // 标签
  const targetLabelOptions = ref<any>([])
  reqGoodsGoodsTabList().then((res) => {
    targetLabelOptions.value = res.data.data.data
  })
  // 支持
  const targetvSupportOptions = ref<any>([])
  reqGoodsServiceList().then((res) => {
    targetvSupportOptions.value = res.data.data.data
  })
  // 参数
  const targetvParameterOptions = ref<any>([])
  reqGoodsParamList().then((res) => {
    targetvParameterOptions.value = res.data.data.data
  })
  // 会员
  const targetvMemberOptions = ref<any>([])
  const targetvPurchaseOptions = ref<any>([])
  reqShopUserLevelIndex().then((res) => {
    targetvMemberOptions.value = res.data.data.data
    targetvPurchaseOptions.value = res.data.data.data
  })
  // 物流支持多选框列表
  const checkLogisticsList = ref([1, 2, 3])

  const currentButton = ref<any>(1)
  const changeCurrentType = (id: Key) => {
    currentButton.value = id
  }
  const selectAll = () => {
    operationList.value.forEach((item: any) => (item.select = true))
  }
  const cancelAll = () => {
    cancelList.value.forEach((item: any) => (item.select = false))
  }
  // 左侧导航
  const settingTypeList = ref([
    {
      name: '商品名称',
      id: 1
    },
    {
      name: '商品分类',
      id: 2
    },
    {
      name: '商品分组',
      id: 3
    },
    {
      name: '商品标签',
      id: 4
    },
    {
      name: '服务支持',
      id: 5
    },
    {
      name: '参数调整',
      id: 6
    },
    {
      name: '批改库存',
      id: 7
    },
    {
      name: '包邮商品',
      id: 8
    },
    // {
    //   name: '物流调整',
    //   id: 9
    // },
    {
      name: '定时上架',
      id: 10
    },
    // {
    //   name: '货到付款',
    //   id: 11
    // },
    {
      name: '浏览权限',
      id: 12
    },
    {
      name: '购买权限',
      id: 13
    }
  ])

  // 批量操作保存
  const editOperation = async () => {
    const goodsId: any = []
    cancelList.value.forEach((item: any) => {
      goodsId.push(item.id)
    })
    switch (currentButton.value) {
      case 1:
        if (form.value.radio == 'add') {
          await reqGoodsBathEditName({
            goodsId,
            param: { [form.value.radio]: [form.value.prefix, form.value.suffix] }
          })
          resetGoodsList()
          ElMessage.success('修改成功')
        } else {
          await reqGoodsBathEditName({
            goodsId,
            param: { [form.value.radio]: [form.value.originalText, form.value.replaceText] }
          })
          resetGoodsList()
          ElMessage.success('修改成功')
        }

        break
      case 2:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            let tabFlag = false
            form.value.classId.forEach((item: any) => {
              if (item instanceof Array) {
                tabFlag = true
                return
              }
            })
            if (tabFlag) {
              form.value.classId = form.value.classId.reduce((a: any, b: any) => {
                return a.concat(b)
              })
            }
            await reqGoodsBathEditclass({ goodsId, param: form.value.classId })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })

        break
      case 3:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            const arr = []
            arr.push(form.value.groupId)
            await reqGoodsBathEditGroup({ goodsId, param: arr })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 4:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            let tabFlag = false
            form.value.label.forEach((item: any) => {
              if (item instanceof Array) {
                tabFlag = true
                return
              }
            })
            if (tabFlag) {
              form.value.label = form.value.label.reduce((a: any, b: any) => {
                return a.concat(b)
              })
            }
            await reqGoodsBathEditTab({ goodsId, param: form.value.label })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 5:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            const arr = []
            arr.push(form.value.support)
            await reqGoodsBathEditServive({ goodsId, param: arr })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 6:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            const arr = []
            arr.push(form.value.parameter)
            await reqGoodsBathEditParam({ goodsId, param: arr })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 7:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            await reqGoodsBathEditStock({
              goodsId,
              param: { type: form.value.isLogistics, num: form.value.numValue }
            })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 8:
        await reqGoodsBathEditpostage({ goodsId })
        resetGoodsList()
        ElMessage.success('修改成功')
        break
      case 9:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            await reqGoodsBathEditLogisticsType({
              goodsId,
              param: form.value.logistics
            })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 10:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            const arr = [dayjs(form.value.time).format('YYYY-MM-DD HH:mm:ss')]
            arr.push()
            await reqGoodsBathEditSoldOut({
              goodsId,
              param: arr
            })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 11:
        await reqGoodsBathEditFreights({ goodsId })
        resetGoodsList()
        ElMessage.success('修改成功')
        break
      case 12:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            await reqGoodsBathEditBrowseAuth({ goodsId, param: form.value.memberGrade })
            resetGoodsList()
            ElMessage.success('修改成功')
          }
        })
        break
      case 13:
        binForm.value.validate(async (valid: any) => {
          if (valid) {
            await reqGoodsBathEditBrowseAuth({ goodsId, param: form.value.purchase })
            ElMessage.success('修改成功')
            resetGoodsList()
          }
        })
        break
    }
  }
  // 请求数据
  const resetGoodsList = async () => {
    let tabFlag = false
    formInfo.value.classId.forEach((item: any) => {
      if (item instanceof Array) {
        tabFlag = true
        return
      }
    })
    if (tabFlag) {
      formInfo.value.classId = formInfo.value.classId.reduce((a: any, b: any) => {
        return a.concat(b)
      })
    }
    const subInfo: any = {
      page: 1,
      limit: 2000,
      ...formInfo.value
    }
    const { data } = await reqGoodsList(subInfo)
    pagination.total = data.data.total
    operationList.value = data.data.data
  }
  const watchList = [
    () => formInfo.value.title,
    () => formInfo.value.groupId,
    () => formInfo.value.classId
  ]
  watch(watchList, resetGoodsList, { immediate: true })
</script>

<style lang="scss" scoped>
  .label-product {
    :deep(.el-input) {
      line-height: none !important;
      height: 100%;
    }
  }
  .choice-aal {
    // margin-bottom: 24px;
    .right-box {
      position: relative;
      margin-bottom: 24px;
      &.right-box > div {
        height: 100%;
      }
      :deep(.el-card) {
        height: 100%;
      }
      .paging-box {
        position: absolute;
        left: 36px;
        bottom: 20px;
      }
    }
    @media screen and (max-width: 1200px) {
      .right-box {
        position: relative;
        margin-bottom: 24px;
        height: 508px;
        // &.right-box > div {
        //   height: 100%;
        // }
        // :deep(.el-card) {
        //   height: 100%;
        // }
        .paging-box {
          position: absolute;
          left: 36px;
          bottom: 20px;
        }
      }
    }
    .title-search {
      margin-bottom: 14px;
      :deep(.el-input) {
        line-height: 32px;
      }
    }
    .commodity-item {
      height: 92px;
      margin-bottom: 24px;
      .commodity-item-son {
        position: relative;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        .icon {
          position: absolute;
          right: 0;
          top: 0px;
          width: 16px;
          height: 10px;
          background-color: var(--color-primary);
          z-index: 20;
          .yes {
            position: absolute;
            top: -1px;
            left: 2px;
            color: #fff;
            font-size: 12px;
          }
        }
        .location-picture {
          position: absolute;
          top: -1px;
          right: 0;
          width: 21px;
          height: 19px;
          z-index: 100;
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
          margin-right: 6px;
          :deep(.el-image) {
            height: 72px;
            min-width: 72px;
          }
        }
        .item-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .commodity-name {
            font-size: 14px;
            font-weight: bold;
          }
          .commodity-price {
            font-size: 12px;
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
              display: flex;
              .text {
                min-width: 24px;
              }
              .stock {
                width: 28px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-left: 5px;
                color: #ff0000;
              }
            }
            .stock-right {
              :deep(.el-tag) {
                padding: 0;
                height: 22px;
                line-height: 18px;
                border-radius: 0;
              }
            }
          }
        }
      }
    }
  }
  // :deep(.el-input .el-input__inner) {
  //   background-color: #f5f5f5;
  //   border: none;
  // }
  // 头部导航
  .setting-type {
    width: 100%;
    .title {
      font-weight: bold;
      margin-bottom: 14px;
    }
    .goods-type-button-box {
      display: flex;
      align-items: center;
      .goods-type-button {
        flex: 1;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  // 提示框
  .warning-alter {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    margin: 24px 0;
    text-indent: 14px;
    background: var(--color-primary-light-8);
    border: 1px solid var(--color-primary);
    border-radius: 3px;
  }
  .set-an-option {
    position: relative;
    width: 100%;
    margin-bottom: 24px;
    // 商品名称
    .is-show-list {
      .add-tips {
        font-size: 12px;
        color: #8c8c8c;
      }
      :deep([data-v-c1fd3dcc] .el-input .el-input__inner) {
        background-color: #fff;
        border: 1px solid #8c8c8c;
      }
      .prefix {
        width: 200px;
        margin: 0 10px;
      }
    }
    // 除了商品名称其它的操作选项
    .operation-options {
      margin-left: 108px;
      .title {
        position: absolute;
        top: 33px;
        left: 24px;
        font-size: 14px;
        color: #606266;
      }
    }
    .el-form--label-left {
      .el-form-item__label {
        color: #000;
        font-weight: 700;
      }
    }
    // 搜索框宽度
    .select-width {
      width: 30%;
    }
    .band-selection {
      width: 50%;
    }
    .el-form-item {
      margin: 0;
    }
  }

  // 底部固定按钮card
  .footer-card {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: -20px;
    z-index: 1000;
    :deep(.el-card__body, .el-main) {
      height: 50px;
    }
    .button-box {
      display: flex;
      justify-content: center;
      .el-button {
        width: 120px;
        margin: 0 15px;
      }
    }
  }
  .right-box {
    &.right-box > div {
      height: 100%;
    }
    :deep(.el-card) {
      height: 100%;
    }
  }
</style>
