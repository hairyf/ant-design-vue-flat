<!--
 * @Author: Zhilong
 * @Date: 2021-05-29 15:57:42
 * @LastEditTime: 2021-06-10 18:56:42
 * @Description: 试用套餐
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->

<template>
  <div>
    <a-form :label-col="{ span: 8 }" ref="formRef" :model="form" :rules="rules">
      <div style="width: 1128px" class="mt-48 mx-auto flex flex-col justify-center items-center">
        <cal-tabs v-model:activeKey="currentTab" class="w-full">
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
              <a-form-item required label="套餐主题">
                <div class="w-477 max-h-477 overflow-auto">
                  <theme-color-item
                    class="mx-12 mb-12"
                    v-for="(item, i) in showSelectTheme"
                    :color="item?.content.linearGradientColor || item?.content.color"
                    :linearGradient="!item?.content.linearGradientColor"
                    :text="item.name"
                    :hover="false"
                    :key="i"
                  />
                  <cal-theme-icon
                    class="w-64 h-64 mx-12 mb-12 rounded-2xl cursor-pointer inline-flex"
                    type="addItem"
                    @click="selectTheme"
                  />
                </div>
              </a-form-item>
              <a-form-item required label="体验天数" name="tryout_days">
                <cal-input-number
                  class="w-208"
                  placeholder="输入体验天数"
                  v-model="form.tryout_days"
                />
              </a-form-item>
              <a-form-item label="上架状态" name="is_sale">
                <cal-switch v-model="form.is_sale" />
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
              <a-form-item required label="套餐简介" name="remark">
                <cal-textarea
                  v-model="form.remark"
                  placeholder="请输入套餐简介"
                  style="min-width: 400px; min-height: 128px"
                  :maxLength="50"
                />
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
                  <div class="w-160 h-160 flex flex-col justify-center items-center">
                    <div class="w-64 h-64 mb-16">
                      <cal-image :src="item.logo" />
                    </div>
                    <div class="text-center">{{ item.name }}</div>
                  </div>
                </cal-theme-icon>
              </a-form-item>
            </a-form>
          </cal-tab-pane>
          <cal-tab-pane :key="3" tab="模板信息" :min-height="316">
            <a-row :gutter="[108, 34]">
              <a-col :md="8" v-for="(item, i) in templateList" :key="i">
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
          <cal-tab-pane :key="4" tab="应用插件" :min-height="316">
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
        </cal-tabs>
        <div class="mt-64">
          <cal-button class="w-176 h-48 mb-64 text-base" type="primary" @click="onNextOrSave">
            保存
          </cal-button>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import ThemeColorItem from '@/layout/components/ThemeItem.vue'
  import ThemeSelect from './components/ThemeSelect'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { ref } from 'vue-demi'
  import { cloneDeep } from 'lodash'
  import { useListPagination } from '@/hooks/use-listPagination'
  import {
    reqAddonsList,
    reqSaveTryout,
    reqChannelList,
    reqTemplateList,
    reqThemeList,
    reqTryoutDetails
  } from '@/api/setMeal'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'

  /* 切换页和当前页 */
  const currentTab = ref(0)

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
    // *体验天数
    tryout_days: '',
    // 上架状态
    is_sale: 0,
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

  /* 获取数据 */
  const tryoutDetails = await reqTryoutDetails()
  form.value = tryoutDetails.data.data

  /** 获取主题列表 */
  const { list: themeList } = useListPagination({
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqThemeList({
        limit: pageSize.value,
        page: currentPage.value
      })
      /* 将已选选项标记 */
      data.data.data.forEach((item) => {
        tryoutDetails.data.data.ext?.ui?.some((i: any) => i.id === item.id) && (item.select = true)
      })
      showSelectTheme.value = data.data.data.filter((i) => i.select)
      selectThemeIds.value = showSelectTheme.value.map((i: any) => i.id)
      return data.data.data
    }
  })

  /* 处理主题多选 */
  const showSelectTheme = ref<any>([])
  const selectThemeIds = ref<any>([])
  const selectTheme = async () => {
    console.log(themeList.value)
    const themeItems = await ThemeSelect({
      multiple: true,
      list: cloneDeep(themeList.value)
    }).catch(() => false)
    if (themeItems === false) return
    themeList.value = themeItems.list
    showSelectTheme.value = themeItems.select
    selectThemeIds.value = themeItems.ids
  }

  /* 表单验证处理 */
  const { rules, validate } = useAntdForm(formRef, {
    name: { required: true, message: '名字为必填项' },
    remark: { required: true, message: '套餐简介为必填项' },
    tryout_days: { required: true, message: '体验天数为必填项', type: 'number' },
    free_msg: { required: true, message: '赠送短信数量为必填项' },
    limit_goods: { required: true, message: '限制商品数量为必填项' },
    limit_assistant: { required: true, message: '限制员工数量为必填项' },
    limit_capacity: { required: true, message: '限制存储容量为必填项' },
    buy_type: { required: true, type: 'array', message: '购买方式为必填项' }
  })

  // 处理点击底部操作栏(下一步, 保存)
  const onNextOrSave = async () => {
    await validate()
    await reqSaveTryout({
      ...form.value,
      ui_ids: selectThemeIds.value,
      channel_ids: channelSelect.value,
      addon_ids: applicationSelect.value,
      template_ids: templateSelect.value
    })
    message.success('试用套餐保存成功', 2)
  }

  /* 渠道数据列表 */
  const { list: channelList } = useListPagination({
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqChannelList({
        limit: pageSize.value,
        page: currentPage.value
      })
      /* 将已选选项标记 */
      data.data.data.forEach((item) => {
        tryoutDetails.data.data.ext?.channel?.some((i: any) => i.id === item.id) &&
          (item.select = true)
      })
      return data.data.data
    }
  })
  const { selectIds: channelSelect } = useMultipleSelect(channelList)

  /* 模板数据列表 */
  const { list: templateList } = useListPagination({
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqTemplateList({
        limit: pageSize.value,
        page: currentPage.value
      })
      /* 将已选选项标记 */
      data.data.data.forEach((item) => {
        tryoutDetails.data.data.ext?.template?.some((i: any) => i.id === item.id) &&
          (item.select = true)
      })
      return data.data.data
    }
  })
  const { selectIds: templateSelect } = useMultipleSelect(templateList)

  /* 应用数据列表 */
  const { list: applicationList } = useListPagination({
    pageSize: 30,
    async getList({ pageSize, currentPage }) {
      const { data } = await reqAddonsList({
        limit: pageSize.value,
        page: currentPage.value
      })
      /* 将已选选项标记 */
      data.data.data.forEach((item) => {
        tryoutDetails.data.data.ext?.addon?.some((i: any) => i.id === item.id) &&
          (item.select = true)
      })
      return data.data.data
    }
  })
  const { selectIds: applicationSelect } = useMultipleSelect(applicationList)
</script>
