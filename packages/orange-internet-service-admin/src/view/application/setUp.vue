<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-06-17 14:42:15
 * @Description: 设置应用
 * @LastEditors: Mr.Mao
-->
<template>
  <a-form
    ref="applicationFormRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="基础设置" :key="1" :minHeight="400">
        <a-form-item label="应用名称" name="name">
          <cal-input
            v-model="formState.name"
            placeholder="请输入应用名称"
            :maxlength="16"
            class="w-208"
          ></cal-input>
        </a-form-item>
        <a-form-item label="应用分类" name="calssId">
          <div class="flex items-center">
            <cal-cascader
              class="w-208"
              v-model:value="formState.calssId"
              :options="applicationOption"
              :display-render="displayRender"
              expand-trigger="hover"
              placeholder="请选择应用分类"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
            />
            <div class="flex items-center">
              <cal-button type="link" @click="openClass('/setting/platform/editClassification')">
                新增分类
              </cal-button>
              <div class="line"></div>
              <div class="flex items-center" @click="refreshBtn">
                <cal-button type="link" class="pl-14 pr-6"> 刷新 </cal-button>
                <i
                  class="text-sm nr-refresh2 text-primary"
                  style="cursor: pointer"
                  :class="isRotate ? 'rotate' : ''"
                ></i>
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="应用图标" name="is_icon">
          <cal-radio-group v-model:value="formState.is_icon">
            <cal-radio :value="0">默认图标</cal-radio>
            <cal-radio :value="1">自定义图标</cal-radio>
          </cal-radio-group>
          <div class="w-100 h-100" v-if="formState.is_icon == 0">
            <cal-image :src="formState.logo"></cal-image>
          </div>
          <a-fomr-item name="image" v-else>
            <div
              class="w-100 h-100 flex justify-center items-center"
              style="border-radius: 10px; border: 1px dashed #d9d9d9"
              v-if="!formState.image"
              @click="selectCustomicon"
            >
              <i class="nr-classification-open text-4xl text-primary"></i>
            </div>
            <div class="w-100 h-100" v-else @click="selectCustomicon">
              <cal-image :src="formState.image"></cal-image>
            </div>
          </a-fomr-item>
        </a-form-item>
        <a-form-item label="应用简介" name="remark" class="remark-introduction">
          <cal-textarea
            class="mt-10 rounded-xl h-128"
            v-model:value="formState.remark"
            showCount
            :maxlength="50"
            placeholder="请输入模板简介"
          />
        </a-form-item>
      </cal-tab-pane>
      <cal-tab-pane tab="规格设置" :key="2" :minHeight="400" showCount :maxlength="50">
        <a-form-item label="上架状态" name="is_sale">
          <cal-switch v-model="formState.is_sale" />
        </a-form-item>
        <a-form-item label="售卖规格" name="sale_spec">
          <cal-sale-spec-list :sale-spec="formState.sale_spec" />
        </a-form-item>
        <a-form-item label="购买方式" name="buy_type">
          <a-checkbox-group v-model:value="formState.buy_type">
            <cal-checkbox value="1">在线支付</cal-checkbox>
            <cal-checkbox value="2">联系客服</cal-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-64" v-if="activeKey == 1">
    <cal-button class="w-192 mx-24" size="large" @click="router.go(-1)">取 消</cal-button>
    <cal-button class="w-192 mx-24" type="primary" size="large" @click="activeKey = 2">
      下一步
    </cal-button>
  </div>
  <div class="flex justify-center mt-64" v-else>
    <cal-button class="w-192 mx-24" size="large" @click="activeKey = 1">上一步</cal-button>
    <cal-button class="w-192 mx-24" type="primary" size="large" @click="submitForm">
      保 存
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { message } from 'ant-design-vue'
  import { useRoute, useRouter } from 'vue-router'
  import { reqAddonsRead, reqAddonsEdit, reqAddonsClassIndex } from '@/api/application'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { CalImageSelect } from '~/Business/CalImageSelect'
  import CalSaleSpecList from '@/components/Business/CalSaleSpecList/index.vue'
  const route = useRoute()
  const router = useRouter()
  const formState = ref({
    name: '',
    calssId: [] as any[],
    services_addon_class_one_id: '',
    services_addon_class_two_id: '',
    is_icon: 0,
    remark: '',
    is_sale: 1,
    buy_type: [],
    logo: '',
    image: '',
    sale_spec: [
      {
        price: '',
        type: '1',
        nums: ''
      }
    ] as any[]
  })

  const activeKey = ref(1)

  // 是否刷新按钮旋转请求数据
  const isRotate = ref(false)
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(async () => {
      getApplicationClass()
      message.success('刷新成功')
      isRotate.value = false
    }, 500)
  }
  // 选择图片
  const selectCustomicon = async () => {
    const res = await CalImageSelect({ multiple: false })
    formState.value.image = res[0].path.url
  }
  // 获取应用分类
  const applicationOption = ref([])
  const getApplicationClass = async () => {
    const { data } = await reqAddonsClassIndex()
    applicationOption.value = data.data
  }
  getApplicationClass()

  // 新增模板
  const openClass = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue,
      query: { type: 1 }
    })
    window.open(href, '_blank')
  }
  // 筛选店铺类目方法
  const displayRender = ({ labels }: { labels: string[] }) => {
    return labels[labels.length - 1]
  }
  // 获取应用详情
  reqAddonsRead({ id: route.query.id }).then((res) => {
    formState.value = res.data.data
    formState.value.sale_spec.forEach((item: any) => {
      item.nums = item.nums.toString()
    })
    formState.value.calssId = []
    formState.value.calssId.push(formState.value.services_addon_class_one_id)
    formState.value.calssId.push(formState.value.services_addon_class_two_id)
  })

  // 删除套餐规格
  const deleteSaleSpec = async (itemIndex: number) => {
    await CalMessageDialog.warning({
      title: '删除模板套餐',
      content: '您确定要删除该模板套餐么？'
    })
    formState.value.sale_spec.splice(itemIndex, 1)
  }
  // 添加套餐规格
  const addSaleSpec = () => {
    formState.value.sale_spec.push({
      price: '',
      type: '4',
      nums: ''
    })
  }

  const applicationFormRef = ref()
  const { rules, validate } = useAntdForm(applicationFormRef, {
    type: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    calssId: [{ required: true, message: '请选择应用分类', trigger: 'blur', type: 'array' }],
    is_icon: [{ required: true, message: '请选择应用图标', trigger: 'blur', type: 'number' }],
    image: [{ required: true, message: '请选择自定义图片', trigger: 'blur' }],
    buy_type: [{ required: true, message: '请选择购买方式', trigger: 'blur', type: 'array' }]
  })
  // 提交表单
  const submitForm = async () => {
    console.log('提交表单', formState.value)
    await validate()
    if (formState.value.calssId.length > 1) {
      formState.value.services_addon_class_one_id = (
        formState.value.calssId[0] as number
      ).toString()
      formState.value.services_addon_class_two_id = (
        formState.value.calssId[1] as number
      ).toString()
    } else {
      formState.value.services_addon_class_one_id = (
        formState.value.calssId[0] as number
      ).toString()
    }
    console.log('成功了')
    await reqAddonsEdit(formState.value)
    router.push('/application/purchased')
  }
</script>
<style lang="scss" scoped>
  .rotate {
    animation: rotation 1.25s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  .line {
    width: 1px;
    height: 11px;
    background-color: var(--color-primary);
  }

  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
  :deep(.ant-cascader-picker) {
    background-color: transparent;
  }
</style>
