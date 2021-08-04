<!--
 * @Author: liupei
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form
    ref="templateFormRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="基本信息" :key="1" :minHeight="544" class="shadow py-56">
        <a-form-item label="模板名称" name="name">
          <cal-input v-model="formState.name" placeholder="输入模板名称" class="w-208"></cal-input>
        </a-form-item>
        <a-form-item label="模板分类" name="classification">
          <div class="flex items-center">
            <cal-cascader
              class="w-208"
              v-model:value="formState.classification"
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
        <a-form-item label="模板主图" name="logo">
          <div class="w-100 h-100" v-if="formState.logo">
            <cal-image :preview="false" :src="formState.logo" @click="selectPicture" alt="avatar" />
          </div>
          <div class="img-box" @click="selectPicture" v-if="!formState.logo">
            <i class="nr-increase text-primary text-6xl text-center"></i>
          </div>
          <div class="login-tips">建议尺寸800*800</div>
        </a-form-item>
        <a-form-item label="模板简介" class="remark-introduction">
          <cal-textarea
            class="mt-10 rounded-xl h-128"
            v-model:value="formState.remark"
            showCount
            :maxlength="50"
            placeholder="请输入模板简介"
          />
        </a-form-item>
      </cal-tab-pane>
      <cal-tab-pane tab="价格设置" :key="2" :minHeight="544" class="shadow py-56">
        <a-form-item label="上架状态">
          <cal-switch v-model="formState.is_sale" />
          <div class="login-tips">关闭后，该模板为下架状态</div>
        </a-form-item>
        <a-form-item label="售卖规格">
          <cal-sale-spec-list :sale-spec="formState.sale_spec" />
        </a-form-item>
        <a-form-item label="购买方式">
          <a-checkbox-group v-model:value="formState.buy_type">
            <cal-checkbox value="1">在线支付</cal-checkbox>
            <cal-checkbox value="2">联系客服</cal-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-192 h-48" size="large" @click="router.push('/template/purchased')">
      取 消
    </cal-button>
    <cal-button class="w-192 mx-48 h-48" type="primary" size="large" @click="submitForm()">
      保 存
    </cal-button>
    <cal-button class="w-192 h-48" type="primary" size="large" @click="submitForm(1)">
      保存并上架
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import { ref } from 'vue'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { reqTemplateRead, reqTemplateEdit, reqTemplateClassIndex } from '@/api/template'
  import { useRoute, useRouter } from 'vue-router'
  import { CalImageSelect } from '@/components/Business/CalImageSelect'
  import CalSaleSpecList from '@/components/Business/CalSaleSpecList/index.vue'
  const router = useRouter()
  const route = useRoute()
  const routeId = route.query.id
  const activeKey = ref(1)
  const templateFormRef = ref()
  const formState = ref({
    id: routeId,
    // 模板名称
    name: '',
    // 模板分类
    classification: [] as any[],
    services_template_class_one_id: '',
    services_template_class_two_id: '',
    logo: '',
    remark: '',
    is_sale: 1,
    sale_spec: [
      {
        price: '', //金额：单位 元
        type: '1', //类型:1按天 2按月 3 按年 4永久
        nums: '' //时间值（数字）
      }
    ] as any[],
    buy_type: []
  })

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

  // 获取模板分类
  const applicationOption = ref([])
  const getApplicationClass = async () => {
    const { data } = await reqTemplateClassIndex()
    applicationOption.value = data.data
  }
  getApplicationClass()

  // 新增模板
  const openClass = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue,
      query: { type: 2 }
    })
    window.open(href, '_blank')
  }
  // 筛选店铺类目方法
  const displayRender = ({ labels }: { labels: string[] }) => {
    return labels[labels.length - 1]
  }

  const { rules, validate } = useAntdForm(templateFormRef, {
    name: [{ required: true, message: '请填写模板名称', trigger: 'blur' }],
    classification: [{ required: true, message: '请选择模板分类', trigger: 'blur', type: 'array' }],
    logo: [{ required: true, message: '请上传模板主图', trigger: 'blur' }]
  })
  //选择图片
  const selectPicture = async () => {
    const res = await CalImageSelect({ multiple: false })
    formState.value.logo = res[0].path.url
  }
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
  // 获取应用详情
  reqTemplateRead({ id: routeId }).then((res) => {
    formState.value = res.data.data
    formState.value.sale_spec.forEach((item: any) => {
      item.nums = item.nums.toString()
    })
    formState.value.classification = []
    formState.value.classification.push(formState.value.services_template_class_one_id)
    formState.value.classification.push(formState.value.services_template_class_two_id)
  })
  // 提交表单
  const submitForm = async (put?: number) => {
    if (put == 1) {
      formState.value.is_sale = 1
    }
    await validate()
    // console.log('提交数据', formState.value)
    console.log('成功了')
    if (formState.value.classification.length > 1) {
      formState.value.services_template_class_one_id = (
        formState.value.classification[0] as number
      )?.toString()
      formState.value.services_template_class_two_id = (
        formState.value.classification[1] as number
      )?.toString()
    } else {
      formState.value.services_template_class_one_id = (
        formState.value.classification[0] as number
      )?.toString()
    }
    await reqTemplateEdit(formState.value)
    message.success('操作成功！')
    router.push('/template/purchased')
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

  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
  :deep(.ant-form-item-label > label) {
    color: #001426;
  }
  :deep(.ant-checkbox-wrapper) {
    line-height: 40px !important;
  }
  .login-tips {
    line-height: 30px;
    font-size: 12px;
    color: #adadad;
  }
  .img-box {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
  }
  .line {
    width: 1px;
    height: 11px;
    background-color: var(--color-primary);
  }
  :deep(.ant-upload.ant-upload-select-picture-card) {
    background-color: #fff;
    border-radius: 10px;
  }
  :deep(.ant-upload.ant-upload-select-picture-card:hover) {
    border-color: var(--color-primary);
  }
</style>
