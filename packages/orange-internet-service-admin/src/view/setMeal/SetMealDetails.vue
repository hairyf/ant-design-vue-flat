<!--
 * @Author: Zhilong
 * @Date: 2021-05-31 10:25:12
 * @LastEditTime: 2021-07-12 15:24:57
 * @Description: 套餐详情
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div>
    <cal-card>
      <div class="w-full m-auto">
        <cal-steps :current="step" labelPlacement="vertical">
          <cal-step title="基础信息" />
          <cal-step title="详细信息" />
          <cal-step title="渠道信息" />
          <cal-step title="模板信息" />
          <cal-step title="应用插件" />
          <cal-step title="主题皮肤" />
        </cal-steps>
      </div>
    </cal-card>
    <a-form :label-col="{ span: 8 }" ref="formRef" :model="form" :rules="rules">
      <div style="width: 1128px" class="mt-48 mx-auto flex flex-col justify-center items-center">
        <cal-tabs v-model:activeKey="currentTab" class="w-full" forceRender>
          <cal-tab-pane :key="0" tab="基础信息" :min-height="316">
            <div class="mx-auto mt-16">
              <a-form-item required label="套餐名称" name="name">
                <cal-input
                  class="w-208"
                  placeholder="输入套餐名称"
                  :max-length="10"
                  show-count
                  v-model="form.name"
                />
              </a-form-item>
              <a-form-item required label="套餐简介" name="remark">
                <cal-textarea
                  v-model="form.remark"
                  placeholder="请输入套餐简介"
                  style="min-width: 400px; min-height: 128px; border-radius: 10px"
                  :maxLength="50"
                />
              </a-form-item>
              <a-form-item required label="售卖规格" v-if="type === 'formal'">
                <cal-sale-spec-list :sale-spec="form.sale_spec" />
              </a-form-item>
              <a-form-item
                required
                label="试用天数"
                v-else-if="type === 'trial'"
                name="tryout_days"
              >
                <cal-input
                  class="w-208 mr-14"
                  placeholder="输入试用天数"
                  v-model="form.tryout_days"
                />
                <span>天</span>
              </a-form-item>
              <a-form-item label="上架状态" name="is_sale">
                <cal-switch v-model="form.is_sale" />
              </a-form-item>
              <a-form-item required label="购买方式" name="buy_type">
                <a-checkbox-group v-model:value="form.buy_type">
                  <cal-checkbox value="1">在线支付</cal-checkbox>
                  <cal-checkbox value="2">联系客服</cal-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </div>
          </cal-tab-pane>
          <cal-tab-pane :key="1" tab="详细信息" :min-height="316">
            <div class="mx-auto mt-16">
              <a-form-item required label="赠送短信条数" name="free_msg">
                <cal-input class="w-112 mr-14" placeholder="输入数量" v-model="form.free_msg" />条
              </a-form-item>
              <a-form-item label="限制存储容量">
                <cal-radio-group v-model="form.is_limit_capacity">
                  <cal-radio :value="1">自定义容量</cal-radio>
                  <cal-radio :value="0">无限制</cal-radio>
                </cal-radio-group>
                <br />
                <a-form-item
                  required
                  class="mb-0"
                  name="limit_capacity"
                  v-if="form.is_limit_capacity === 1"
                  :label-col="{ span: 0 }"
                  label=" "
                >
                  <cal-input
                    class="w-112 mr-14"
                    placeholder="输入存储容量"
                    v-model="form.limit_capacity"
                  />G
                </a-form-item>
              </a-form-item>
              <a-form-item label="限制员工数量">
                <cal-radio-group v-model="form.is_limit_assistant">
                  <cal-radio :value="1">自定义员工数量</cal-radio>
                  <cal-radio :value="0">无限制</cal-radio>
                </cal-radio-group>
                <br />
                <a-form-item
                  required
                  :label-col="{ span: 0 }"
                  class="mb-0"
                  name="limit_assistant"
                  v-if="form.is_limit_assistant === 1"
                  label=" "
                >
                  <cal-input
                    class="w-112 mr-14"
                    placeholder="输入员工数量"
                    v-model="form.limit_assistant"
                  />个
                </a-form-item>
              </a-form-item>
              <a-form-item label="限制商品数量">
                <cal-radio-group v-model="form.is_limit_goods">
                  <cal-radio :value="1">自定义商品数量</cal-radio>
                  <cal-radio :value="0">无限制</cal-radio>
                </cal-radio-group>
                <br />
                <a-form-item
                  required
                  class="mb-0"
                  name="limit_goods"
                  :label-col="{ span: 0 }"
                  label=" "
                  v-if="form.is_limit_goods === 1"
                >
                  <cal-input
                    class="w-112 mr-14"
                    placeholder="输入商品数量"
                    v-model="form.limit_goods"
                  />件
                </a-form-item>
              </a-form-item>
            </div>
          </cal-tab-pane>
          <cal-tab-pane :key="2" tab="渠道信息" :min-height="316">
            <a-form class="flex flex-wrap -mx-12">
              <a-form-item v-for="(item, i) in channelList" :key="i">
                <cal-theme-icon
                  border
                  type="selectStateBox"
                  border-radius="20"
                  :state="item.select"
                  class="shadow mx-12 my-0 cursor-pointer"
                  @click="item.select = !item.select"
                >
                  <div
                    class="flex flex-col justify-center items-center"
                    style="width: 174px; height: 174px"
                  >
                    <div class="w-64 h-64 mb-16">
                      <cal-image :src="item.logo" />
                    </div>
                    <div class="text-center leading-none">{{ item.name }}</div>
                  </div>
                </cal-theme-icon>
              </a-form-item>
            </a-form>
          </cal-tab-pane>
          <cal-tab-pane :key="3" tab="模板信息" :min-height="316">
            <cal-classification
              :option="sortClassOption"
              :fieldNames="option"
              @change="getClassValue"
              :load-data="dataFormat"
            />
            <a-row :gutter="[108, 34]">
              <a-col :md="6" v-for="(item, i) in templateList" :key="i">
                <cal-theme-icon
                  border
                  type="selectStateBox"
                  class="w-full shadow cursor-pointer select-none flex flex-col items-center"
                  :state="item.select"
                  @click="item.select = !item.select"
                >
                  <div class="px-44 pt-44">
                    <div style="height: 210px; width: 116px">
                      <cal-image :src="item.logo" style="border-radius: 20px" />
                    </div>
                  </div>
                  <div class="text-base mt-16 mb-8 text-center pb-6">{{ item.name }}</div>
                </cal-theme-icon>
              </a-col>
            </a-row>
          </cal-tab-pane>
          <cal-tab-pane :key="4" tab="应用插件" :min-height="316">
            <cal-classification
              :option="sortApplicationOption"
              :fieldNames="option"
              @change="getApplicationValue"
              :load-data="dataFormat"
            ></cal-classification>
            <div class="flex flex-wrap -mx-12">
              <a-form-item v-for="(item, i) in applicationList" :key="i">
                <cal-theme-icon
                  border
                  type="selectStateBox"
                  border-radius="20"
                  :state="item.select"
                  class="shadow mx-12 my-0 cursor-pointer"
                  @click="item.select = !item.select"
                >
                  <div class="w-160 h-176 flex justify-center items-center">
                    <div class="flex flex-col items-center">
                      <div class="w-56 h-56 mb-14">
                        <cal-image :src="item.logo" />
                      </div>
                      <span class="text-base mb-10">{{ item.name }}</span>
                      <div
                        class="
                          h-20
                          px-10
                          flex
                          rounded-full
                          text-center
                          items-center
                          text-gray-darkmin text-xs
                          bg-gray-darkest bg-opacity-20
                        "
                      >
                        <span class="mr-10">版本</span><span>{{ item.now_version }}</span>
                      </div>
                    </div>
                  </div>
                </cal-theme-icon>
              </a-form-item>
            </div>
          </cal-tab-pane>
          <cal-tab-pane :key="5" tab="主题皮肤" :min-height="316">
            <a-row :gutter="[24, 34]">
              <a-col :md="6" v-for="(item, i) in themeList" :key="i">
                <cal-theme-icon
                  border
                  type="selectStateBox"
                  class="w-full shadow cursor-pointer select-none"
                  :state="item.select"
                  @click="item.select = !item.select"
                >
                  <div class="px-44 pt-44">
                    <div class="h-112">
                      <cal-image :src="item.logo" style="border-radius: 20px" />
                    </div>
                  </div>
                  <div class="text-base mt-16 mb-8 text-center pb-6">{{ item.name }}</div>
                </cal-theme-icon>
              </a-col>
            </a-row>
          </cal-tab-pane>
        </cal-tabs>
        <div class="mt-64">
          <template v-if="mode === 'edit' || mode === 'add' || mode === 'fromAdd'">
            <cal-button
              class="w-176 h-48 mr-56 mb-64 text-base"
              @click="currentTab == 0 ? $router.back() : --currentTab"
            >
              {{ currentTab == 0 ? '取消' : '上一步' }}
            </cal-button>
            <cal-button class="w-176 h-48 mb-64 text-base" type="primary" @click="onNextOrSave">
              {{ currentTab !== 5 ? '下一步' : '保存' }}
            </cal-button>
          </template>
          <template v-else>
            <cal-button class="w-176 h-48 mb-64 text-base" @click="$router.back()">
              返回
            </cal-button>
          </template>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { computed, onMounted, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  import { useListPagination } from '@/hooks/use-listPagination'
  import {
    reqAddonsList,
    reqAddSetMeal,
    reqChannelList,
    reqEditSetMeal,
    reqSetMealDetails,
    reqTemplateList,
    reqThemeList,
    reqAddTryout,
    reqTemplateClassIndex,
    reqAddonsClassIndex
  } from '@/api/setMeal'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  import CalClassification from '~/CustomAntds/CalClassification/index.vue'
  import CalSaleSpecList from '@/components/Business/CalSaleSpecList/index.vue'

  /* 获取路由信息 */
  const route = useRoute()
  const { type, id, mode } = route.query as any

  /* formRef对象 */
  const formRef = ref<any>(null)

  /* form表单数据 */
  const form = ref({
    /**
     * @name 基础信息
     * @description 基础信息模块内容
     * */
    // *套餐名称
    name: '',
    // *套餐主题
    // theme: '',
    // * 体验天数
    tryout_days: '',
    // *售卖规格
    sale_spec: [
      {
        // *使用期限
        type: 4,
        // 自定义时间
        nums: '',
        // *售卖金额
        price: ''
      }
    ],
    // 上架状态
    is_sale: 0,
    // 购买方式
    buy_type: [],
    /**
     * @name 详细信息
     * @description 详细信息模块内容
     * */
    // 赠送短信条数
    free_msg: '',
    // 限制存储容量
    is_limit_capacity: 1,
    limit_capacity: '',
    // 限制员工数量
    is_limit_assistant: 1,
    limit_assistant: '',
    // 限制商品树量
    is_limit_goods: 1,
    limit_goods: '',
    //  套餐简介
    remark: ''
  })

  setInterval(() => {
    // console.log(form.value)
  }, 1000)

  /* 当前选项卡 */
  const currentTab = ref(0)

  /* 处理步骤条进度 */
  const step = computed(() => {
    // 查看时步骤条
    if (type === 'see') return (currentTab.value = 5)
    // 最后一页选择内容后
    if (currentTab.value === 5) {
      if (themeSelect.value.length) return currentTab.value
    }
    return currentTab.value - 1
  })

  /* 表单验证处理 */
  const { rules, validate } = useAntdForm(formRef, {
    name: { required: true, message: '名字为必填项' },
    remark: { required: true, message: '套餐简介为必填项' },
    limit_capacity: { required: true, message: '限制存储容量为必填项' },
    limit_assistant: { required: true, message: '限制员工数量为必填项' },
    limit_goods: { required: true, message: '限制商品数量为必填项' },
    free_msg: { required: true, message: '赠送短信数量为必填项' },
    buy_type: { required: true, type: 'array', message: '购买方式为必填项' },
    tryout_days: { required: true, type: 'any', message: '体验天数为必填项' }
  })

  // 处理点击底部操作栏(下一步, 保存)
  const onNextOrSave = async () => {
    const reqData = {
      ...form.value,
      ui_ids: themeSelect.value,
      channel_ids: channelSelect.value,
      addon_ids: applicationSelect.value,
      template_ids: templateSelect.value
    }
    if (currentTab.value == 5) {
      await validate()
      if (mode === 'add' || mode === 'fromAdd') {
        /* 添加套餐 */
        if (type === 'formal') {
          /* 正式套餐 */
          delete (reqData as any).tryout_days
          await reqAddSetMeal(reqData)
          await message.success('新增套餐成功', 1.5)
          router.back()
        } else if (type === 'trial') {
          /* 试用套餐 */
          delete (reqData as any).sale_spec
          await reqAddTryout(reqData)
          await message.success('新增套餐成功', 1.5)
          router.back()
        }
      } else if (mode === 'edit') {
        /* 编辑套餐 */
        await reqEditSetMeal({ ...reqData, id })
        await message.success('编辑套餐成功', 1.5)
        router.back()
      }
    }
    ++currentTab.value
  }

  /* 渠道数据列表 */
  const { list: themeList, resetList: themeResetList } = useListPagination({
    init: false,
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqThemeList({
        limit: pageSize.value,
        page: currentPage.value
      })
      return data.data.data
    }
  })
  const { selectIds: themeSelect } = useMultipleSelect(themeList)

  /* 渠道数据列表 */
  const { list: channelList, resetList: channelResetList } = useListPagination({
    init: false,
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqChannelList({
        limit: pageSize.value,
        page: currentPage.value
      })
      return data.data.data
    }
  })
  const { selectIds: channelSelect } = useMultipleSelect(channelList)

  /* 模板数据列表 */
  const { list: templateList, resetList: templateResetList } = useListPagination({
    init: false,
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqTemplateList({
        limit: pageSize.value,
        page: currentPage.value,
        ...templateForm.value
      })
      return data.data.data
    }
  })
  const { selectIds: templateSelect } = useMultipleSelect(templateList)
  // 获取模板分类列表
  // 获取选中的分类id
  const templateForm = ref({
    template_class_one_id: '',
    template_class_two_id: ''
  })
  const getClassValue = async (classValue: any) => {
    if (classValue.length == 1) {
      templateForm.value.template_class_one_id = classValue[0].toString()
    } else if (classValue.length == 2) {
      templateForm.value.template_class_one_id = classValue[0].toString()
      templateForm.value.template_class_two_id = classValue[1].toString()
    } else {
      templateForm.value.template_class_one_id = ''
      templateForm.value.template_class_two_id = ''
    }

    templateResetList()
  }
  const sortClassOption = ref<any>({})
  reqTemplateClassIndex().then((res) => {
    sortClassOption.value.name = '分类'
    sortClassOption.value.children = res.data.data
  })
  const option = { label: 'name', value: 'id', children: 'children' }

  const dataFormat = ({ option }: any) => {
    return { ...option, name: '子分类' }
  }
  /* 应用数据列表 */
  const { list: applicationList, resetList: applicationResetList } = useListPagination({
    init: false,
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqAddonsList({
        limit: pageSize.value,
        page: currentPage.value,
        ...applicationForm.value
      })
      return data.data.data
    }
  })
  const { selectIds: applicationSelect } = useMultipleSelect(applicationList)

  // 获取应用分类列表
  const sortApplicationOption = ref<any>({})
  reqAddonsClassIndex().then((res) => {
    sortApplicationOption.value.name = '分类'
    sortApplicationOption.value.children = res.data.data
  })
  // 获取应用选中的分类id
  const applicationForm = ref({
    addons_class_one_id: '',
    addons_class_two_id: ''
  })
  const getApplicationValue = async (classValue: any) => {
    if (classValue.length == 1) {
      applicationForm.value.addons_class_one_id = classValue[0].toString()
    } else if (classValue.length == 2) {
      applicationForm.value.addons_class_one_id = classValue[0].toString()
      applicationForm.value.addons_class_two_id = classValue[1].toString()
    } else {
      applicationForm.value.addons_class_one_id = ''
      applicationForm.value.addons_class_two_id = ''
    }

    applicationResetList()
  }
  /* 开始请求调用 */
  onMounted(async () => {
    /* 先调用获取各个列表 */
    await Promise.all([
      channelResetList(),
      templateResetList(),
      applicationResetList(),
      themeResetList()
    ])

    /* 编辑状态或查看状态 获取详情信息 */
    if (mode === 'edit' || mode === 'see' || mode === 'fromAdd') {
      /* 获取套餐详情 */
      const { data } = await reqSetMealDetails(id)
      form.value = data.data
      const { ext } = data.data as { ext: { [key: string]: any[] } }
      channelList.value.forEach((item) => {
        ext.channel.some((i) => i.id === item.id) && (item.select = true)
      })
      templateList.value.forEach((item) => {
        ext.template.some((i) => i.id === item.id) && (item.select = true)
      })
      applicationList.value.forEach((item) => {
        ext.addon.some((i) => i.id === item.id) && (item.select = true)
      })
      themeList.value.forEach((item) => {
        ext?.ui?.some((i: any) => i.id === item.id) && (item.select = true)
      })
    }
  })
</script>
