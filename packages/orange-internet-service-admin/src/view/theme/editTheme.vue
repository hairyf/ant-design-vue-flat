<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-10 11:05:01
 * @LastEditTime: 2021-06-15 17:06:49
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex justify-center flex-col items-center">
    <a-form ref="formRef" :rules="rules" :model="form">
      <cal-tabs v-model:activeKey="currentTab">
        <cal-tab-pane class="w-804" :key="1" :min-height="492" tab="基础设置">
          <div class="w-477 mt-32 mx-auto">
            <a-form-item required label="主题名称" name="name">
              <cal-input
                placeholder="请输入主题名称"
                show-count
                :max-length="10"
                v-model="form.name"
              />
            </a-form-item>
            <a-form-item required label="主题主图" name="logo">
              <div class="w-100 h-100">
                <cal-image :src="form.logo" />
              </div>
              <div class="text-primary text-xs mt-10 mb-10 cursor-pointer" @click="onEditImage">
                选择图片
              </div>
              <div class="text-gray-darkest text-xs">图片为正方形，建议尺寸244*138</div>
            </a-form-item>
            <a-form-item label="主题简介">
              <cal-textarea
                class="w-400"
                v-model="form.remark"
                placeholder="请输入主题简介"
                showCount
                :maxlength="200"
              />
            </a-form-item>
          </div>
        </cal-tab-pane>
        <cal-tab-pane class="w-804" :key="2" :min-height="492" tab="规格设置">
          <div class="w-544 mt-32 mx-auto">
            <a-form-item required label="上架状态">
              <cal-switch v-model="form.is_sale" />
            </a-form-item>
            <a-form-item required label="售卖规格" name="sale_spec">
              <cal-sale-spec-list :sale-spec="form.sale_spec" />
            </a-form-item>
            <a-form-item required label="购买方式" name="buy_type">
              <a-checkbox-group v-model:value="form.buy_type">
                <cal-checkbox value="1">在线支付</cal-checkbox>
                <cal-checkbox value="2">联系客服</cal-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </div>
        </cal-tab-pane>
      </cal-tabs>
    </a-form>
    <div class="flex justify-center mt-64" v-if="currentTab == 1">
      <cal-button class="w-192 mx-24" size="large" @click="$router.go(-1)">取 消</cal-button>
      <cal-button class="w-192 mx-24" type="primary" size="large" @click="currentTab++">
        下一步
      </cal-button>
    </div>
    <div class="flex justify-center mt-64" v-else>
      <cal-button class="w-192 mx-24" size="large" @click="currentTab--">上一步</cal-button>
      <cal-button class="w-192 mx-24" type="primary" size="large" @click="submitForm()">
        保 存
      </cal-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reqThemeItemDetail, reqEditThemeItemOption } from '@/api/theme'
  import { CalImageSelect } from '@/components/Business/CalImageSelect'
  import { ref } from 'vue-demi'
  import { useRoute, useRouter } from 'vue-router'
  import CalSaleSpecList from '@/components/Business/CalSaleSpecList/index.vue'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  const router = useRouter()
  const currentTab = ref(1)
  const route = useRoute()
  const form = ref({
    id: '',
    name: '',
    logo: '',
    remark: '',
    is_sale: 0,
    sale_spec: [] as any[],
    buy_type: [] as any[]
  })
  const formRef = ref()
  const { rules, validate } = useAntdForm(formRef, {
    name: [{ required: true, message: '请输入主题名称', trigger: 'blur' }],
    logo: [{ required: true, message: '请选择主题主图', trigger: 'blur' }],
    sale_spec: [{ required: true, message: '请选择规格内容', trigger: 'blur', type: 'array' }],
    buy_type: [{ required: true, message: '请选择购买方式', trigger: 'blur', type: 'array' }]
  })
  // 点击更改图片地址
  const onEditImage = async () => {
    const [image] = await CalImageSelect({ multiple: false })
    form.value.logo = image.path.url
  }
  // 初始化获取详情数据
  const initDetail = async () => {
    const { id } = route.query as any
    const { data } = await reqThemeItemDetail(id)
    form.value = data.data
    console.log(form.value)
  }
  // 修改配置
  const submitForm = async () => {
    await validate()
    await reqEditThemeItemOption(form.value)
    await message.success('修改成功!', 1.5)
    router.back()
  }
  await initDetail()
</script>
