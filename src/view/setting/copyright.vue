<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-06-24 18:25:47
 * @Description: 版权设置
 * @LastEditors: Mr.wang
-->
<template>
  <a-form
    v-if="dataState"
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
    class="w-804 mx-auto bg-background py-56"
    style="border-radius: 20px"
  >
    <a-form-item label="系统名称" name="name">
      <cal-input v-model="formState.name" placeholder="请输入系统名称" class="w-208"></cal-input>
    </a-form-item>
    <a-form-item label="LOGO" nam="merchantLogo">
      <div>
        <img
          class="rounded-xl w-100 h-100"
          :src="
            formState.merchantLogo == '' ? '/src/assets/img/setting/Logo.png' : formState.merchantLogo
          "
        />
        <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(0)"
          >选择图片</cal-button
        >
      </div>
      <div class="text-gray-darkmin text-xs">建议尺寸800*800</div>
    </a-form-item>
    <!-- <a-form-item label="系统登录背景图" name="bagUrl">
      <div>
        <img
          v-if="!formState.bagUrl"
          class="w-192 h-100 rounded-xl"
          src="@/assets/img/setting/bag.png"
        />
        <img v-if="formState.bagUrl" class="w-192 h-100 rounded-xl" :src="formState.bagUrl" />
        <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(1)"
          >选择图片</cal-button
        >
      </div>
      <div class="text-gray-darkmin text-xs">建议尺寸1080*1920</div>
    </a-form-item> -->
    <a-form-item label="底部备案信息" name="merchantRecord" class="remark-introduction">
      <cal-textarea
        class="h-128 rounded-xl"
        v-model:value="formState.merchantRecord"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="版权显示设置" name="copyright">
      <cal-radio-group v-model:value="formState.copyright">
        <cal-radio value="0">开启</cal-radio>
        <cal-radio value="1">关闭</cal-radio>
      </cal-radio-group>
    </a-form-item>

    <template v-if="formState.copyright">

      <a-form-item label="品牌" name="brand">
        <cal-input
            v-model="formState.brand"
            placeholder="请输入品牌"
            class="w-208"
        ></cal-input>
      </a-form-item>

      <a-form-item label="品牌标题" name="brand_title">
        <cal-input
            v-model="formState.brand_title"
            placeholder="请输入品牌标题"
            class="w-208"
        ></cal-input>
      </a-form-item>


      <a-form-item label="版权显示内容" name="content">
        <cal-input
          v-model="formState.content"
          placeholder="请输入版权内容"
          class="w-208"
        ></cal-input>
      </a-form-item>
      <a-form-item label="窗口会话时长" name="conversation" class="mb-0">
        <cal-radio-group v-model:value="formState.conversation">
          <cal-radio value="0">不限</cal-radio>
          <cal-radio value="1">自定义</cal-radio>
        </cal-radio-group>
      </a-form-item>
    </template>
    <div class="ml-224">
      <a-form-item label="" name="duration" v-if="formState.conversation == '1'">
        <div class="flex">
          停止操作后
          <cal-input
            placeholder="请输入"
            v-model="formState.duration"
            class="w-100"
            @input="formState.duration = $filterInteger(formState.duration)"
          >
          </cal-input>
          分钟，需重新登录
        </div>
      </a-form-item>
    </div>
    <!-- <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="商户端设置" :key="1" :minHeight="400">
        <a-form-item label="系统名称" name="name">
          <cal-input
            v-model="formState.name"
            placeholder="请输入系统名称"
            class="w-208"
          ></cal-input>
        </a-form-item>
        <a-form-item label="LOGO" nam="merchantLogo">
          <div>
            <img
              class="rounded-xl w-100 h-100"
              :src="
                formState.merchantLogo == ''
                  ? '@/assets/img/setting/Logo.png'
                  : formState.merchantLogo
              "
            />
            <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(0)"
              >选择图片</cal-button
            >
          </div>
          <div class="text-gray-darkmin text-xs">建议尺寸800*800</div>
        </a-form-item>
        <a-form-item label="系统登录背景图" name="bagUrl">
          <div>
            <img
              v-if="!formState.bagUrl"
              class="w-192 h-100 rounded-xl"
              src="@/assets/img/setting/bag.png"
            />
            <img v-if="formState.bagUrl" class="w-192 h-100 rounded-xl" :src="formState.bagUrl" />
            <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(1)"
              >选择图片</cal-button
            >
          </div>
          <div class="text-gray-darkmin text-xs">建议尺寸1080*1920</div>
        </a-form-item>
        <a-form-item label="底部备案信息" name="merchantRecord" class="remark-introduction">
          <cal-textarea
            class="h-128 rounded-xl"
            v-model:value="formState.merchantRecord"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="版权显示设置" name="copyright">
          <cal-radio-group v-model:value="formState.copyright">
            <cal-radio value="0">开启</cal-radio>
            <cal-radio value="1">关闭</cal-radio>
          </cal-radio-group>
        </a-form-item>

        <template v-if="formState.copyright">
          <a-form-item label="版权显示内容" name="content">
            <cal-input
              v-model="formState.content"
              placeholder="请输入版权内容"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="窗口会话时长" name="conversation" class="mb-0">
            <cal-radio-group v-model:value="formState.conversation">
              <cal-radio value="0">不限</cal-radio>
              <cal-radio value="1">自定义</cal-radio>
            </cal-radio-group>
          </a-form-item>
        </template>
        <div class="ml-224">
          <a-form-item label="" name="duration" v-if="formState.conversation == '1'">
            <div class="flex">
              停止操作后
              <cal-input
                placeholder="请输入"
                v-model="formState.duration"
                class="w-100"
                @input="formState.duration = $filterInteger(formState.duration)"
              >
              </cal-input>
              分钟，需重新登录
            </div>
          </a-form-item>
        </div>
      </cal-tab-pane>
      <cal-tab-pane tab="服务商端设置" :key="2" :minHeight="400" showCount :maxlength="50">
        <a-form-item label="LOGO" name="serviceLogo">
          <div>
            <img
              v-if="!formState.serviceLogo"
              class="rounded-xl w-100 h-100"
              src=" @/assets/img/setting/Logo.png"
            />
            <img
              v-if="formState.serviceLogo"
              class="rounded-xl w-100 h-100"
              :src="formState.serviceLogo"
            />
            <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(2)"
              >选择图片</cal-button
            >
          </div>
          <div class="text-gray-darkmin text-xs">建议尺寸800*800</div>
        </a-form-item>
        <a-form-item label="底部备案信息" name="serviceRecord" class="remark-introduction">
          <cal-textarea
            class="rounded-xl h-128"
            v-model:value="formState.serviceRecord"
            placeholder="请输入"
          ></cal-textarea>
        </a-form-item>
        <a-form-item label="底部版权信息" name="serviceCopyright" class="remark-introduction">
          <cal-textarea
            class="rounded-xl h-128"
            v-model:value="formState.serviceCopyright"
            placeholder="请输入"
          ></cal-textarea>
        </a-form-item>
        <a-form-item label="高德web服务接口" name="is_icon">
          <cal-radio-group v-model:value="formState.is_icon">
            <cal-radio :value="0">服务商配置</cal-radio>
            <cal-radio :value="1">用户自配</cal-radio>
          </cal-radio-group>
        </a-form-item>
        <a-form-item label="高德web服务接口key" name="name">
          <cal-input v-model="formState.name" placeholder="请输入" class="w-208"></cal-input>
          <div class="text-xs text-gray-darkmin">店铺下所有平台共用</div>
        </a-form-item>
      </cal-tab-pane>
    </cal-tabs> -->
  </a-form>
  <div class="flex justify-center mt-64">
    <cal-button class="w-176 mx-24" size="large" type="primary" @click="submitForm"
      >保存并生效</cal-button
    >
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue-demi'
  import { reqSystemBasic, reqSetBasic } from '@/api/setting'
  import { CalImageSelect } from '@/components/Business/CalImageSelect'
  import { useStore } from 'vuex'
  import { useTitle,useFavicon  } from '@vueuse/core'
  const store = useStore()
  const formRef = ref()
  const activeKey = ref(1)
  const formState = ref({
    name: '',
    merchantLogo: '',
    bagUrl: '',
    merchantRecord: '',
    copyright: '1',
    content: '',
    conversation: '1',
    duration: '',
    serviceLogo: '',
    serviceRecord: '',
    serviceCopyright: '',
    brand:'weitshop',
    brand_title:'服务为本用户至上',
  })
  const dataState = ref(false)
  // 验证规则
  const { validate, rules } = useAntdForm(formRef, {
    name: [{ required: true, message: '请填写系统名称', trigger: 'blur' }],
    merchantLogo: [{ required: true, message: '请上传LOGO' }],
    bagUrl: [{ required: true, message: '请上传系统登录背景图' }],
    merchantRecord: [{ required: true, message: '请填写底部备案信息', trigger: 'blur' }],
    copyright: [{ required: true, message: '请选择', trigger: 'blur' }],
    content: [{ required: true, message: '请填写版权显示内容', trigger: 'blur' }],
    conversation: [{ required: true, message: '请选择', trigger: 'blur' }],
    duration: [{ required: true, message: '请输入时长', trigger: 'blur' }],
    brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
    brand_title: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
    serviceLogo: [{ required: true, message: '请上传LOGO' }],
    serviceRecord: [{ required: true, message: '请填写底部备案信息', trigger: 'blur' }],
    serviceCopyright: [{ required: true, message: '请填写底部版权信息', trigger: 'blur' }]
  })
  const selectPicture = async (num: number) => {
    const res = await CalImageSelect({ multiple: false })
    if (num == 0) {
      formState.value.merchantLogo = res[0].path.url
    } else {
      num == 1
        ? (formState.value.bagUrl = res[0].path.url)
        : (formState.value.serviceLogo = res[0].path.url)
    }
  }

  const websiteTitle = useTitle()




  const icon = useFavicon()


  // 提交表单
  const submitForm = async () => {
    await validate()
    const value = {
      shop: {
        name: formState.value.name,
        logo: formState.value.merchantLogo,
        info: formState.value.merchantRecord,
        copyright: formState.value.copyright,
        bagUrl: formState.value.bagUrl,
        content: formState.value.content,
        conversation: formState.value.conversation,
        duration: formState.value.duration,
        brand: formState.value.brand,
        brand_title: formState.value.brand_title
      },
      service: {
        logo: formState.value.serviceLogo,
        info: formState.value.serviceRecord,
        copyright_info: formState.value.serviceCopyright
      }
    }
    await reqSetBasic({
      status: 1,
      value
    })


    websiteTitle.value = formState.value?.name || '微匠工'

    icon.value = formState.value?.merchantLogo || '/src/assets/img/logo.png'
    message.success('操作成功！')
    getBasicSettings()

    store.dispatch('copySelect');
  }
  const getBasicSettings = async () => {
    const { data } = await reqSystemBasic()
    const config = data.data.config
    formState.value.name = config.shop.name || '微匠工服务商'
    formState.value.merchantLogo = config.shop.logo
    formState.value.bagUrl = config.shop.bagUrl
    formState.value.merchantRecord = config.shop.info || 'weitshop'
    formState.value.copyright = config.shop.copyright
    formState.value.content = config.shop.content
    formState.value.conversation = config.shop.conversation
    formState.value.duration = config.shop.duration
    formState.value.brand = config.shop.brand
    formState.value.brand_title = config.shop.brand_title
    formState.value.serviceLogo = config.service.logo
    formState.value.serviceRecord = config.service.info
    formState.value.serviceCopyright = config.service.copyright_info

    dataState.value = true
  }
  onMounted(() => {
    getBasicSettings()
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
