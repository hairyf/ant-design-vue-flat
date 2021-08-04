<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:40:22
 * @LastEditTime: 2021-07-10 16:57:54
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 账号密码 -->
  <a-card
    class="
      w-full
      pt-48
      pb-36
      rounded-3xl
      bg-white
      flex
      justify-center
      items-center
      transform
      2xl:-translate-x-28
    "
    v-if="authProgress == 0"
  >
    <div class="text-center">
      <p class="text-3xl mb-10 font-bold">{{serviceCopy?.brand || 'Weitshop'}}{{serviceCopy?.name || '服务商管理系统'}}</p>
      <p class="cel-title_small text-xs text-gray-darkmin uppercase opacity-40">
        Management System
      </p>
    </div>
    <a-form :model="form" :rules="rules" ref="formRef" class="mt-56 mx-48">
      <a-form-item name="account" class="mb-32">
        <a-input
          class="w-full rounded-full h-56 text-base px-32 border divide-solid border-gray-darkmin"
          placeholder="请输入账号"
          v-model:value="form.account"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          class="w-full rounded-full h-56 text-base px-32 border divide-solid border-gray-darkmin"
          placeholder="请输入密码"
          v-model:value="form.password"
        />
      </a-form-item>
      <cal-button
        class="font-sans w-full rounded-full h-56 text-xl px-32 font-medium mt-36"
        type="primary"
        @click="onAccoutCheck"
      >
        登录
      </cal-button>
    </a-form>
    <!-- 记住密码 -->
    <div class="mt-28 text-center">
      <cal-checkbox v-model:checked="memoryPassword">
        <span class="text-xs text-gray font-medium"> 记住密码 </span>
      </cal-checkbox>
    </div>
  </a-card>
  <!-- 图形验证 -->
  <a-card class="w-full rounded-3xl bg-white px-28" v-else>
    <div class="mt-48">
      <p class="text-3xl mb-10 font-bold">拖动下方滑块完成拼图</p>
      <p class="text-gray text-2xl">安全验证</p>
      <cal-image-verif
        class="mt-20"
        :sliderSize="20"
        :proportion="258 / 460"
        sliderText=""
        ref="imageVerifRef"
        @success="onImageCheckSuccess"
      />
      <div class="mt-36 text-right">
        <i
          class="nr-refresh text-2xl cursor-pointer mr-28 text-gray"
          @click="imageVerifRef.reset"
        />
        <i
          class="nr-close-circe-outline text-2xl cursor-pointer text-gray"
          @click="authProgress = 0"
        />
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  import {onMounted, ref,computed} from 'vue-demi'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { useTitle,useFavicon  } from '@vueuse/core'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import CalImageVerif from '~/CustomAntds/CalImageVerif/index.vue'
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  // 认证流程: 0:账号密码, 1:图形认证
  const authProgress = ref(0)
  // 图片验证实例
  const imageVerifRef = ref()
  // 是否记录密码
  const memoryPassword = ref(false)


   const serviceCopy = computed(()=>store.state.copy.info)

  // 是否首字母开头
  const isLetter = (rule: any, value: string) => {
    return /^[A-z]/.test(value) ? Promise.resolve() : Promise.reject('账号需要以字母开头')
  }
  // 是否包含数字和字母
  const isNumberLetter = (rule: any, value: string) => {
    return /([0-9A-z]){1,}/.test(value) ? Promise.resolve() : Promise.reject('账号需要包含数字')
  }
  // 表单信息
  const form = ref({
    account: '',
    password: ''
  })
  const formRef = ref()
  const { rules } = useAntdForm(formRef, {
    account: [
      { trigger: 'blur', message: '账号为必填项', required: true },
      { trigger: 'blur', message: '长度限制 6 ~ 18 位', min: 6, max: 18 },
      { trigger: 'blur', validator: isLetter },
      { trigger: 'blur', validator: isNumberLetter }
    ],
    password: [
      { required: true, message: '密码为必填项', trigger: 'blur' },
      { trigger: 'blur', message: '长度限制 6 ~ 18 位', min: 6, max: 18 },
      { trigger: 'blur', validator: isNumberLetter }
    ]
  })
  // 进行账号密码校验
  const onAccoutCheck = async () => {
    await formRef.value.validate()
    authProgress.value = 1
  }
  // 图像校验成功
  const onImageCheckSuccess = async () => {
    imageVerifRef.value.reset()
    authProgress.value = 0
    await store.dispatch('accountLogin', form.value)
    message.success(`欢迎回来, ${store.state.user.info?.name}!!`)
    router.push(store.getters.baseHomePath)
  }


    store.dispatch('copySelect')



  const websiteTitle = useTitle()

   websiteTitle.value = serviceCopy.value?.name || '微匠工'


  const icon = useFavicon()
  icon.value = serviceCopy.value?.logo || '/src/assets/img/logo.png'

</script>
<style lang="scss" scoped>
  .cel-title_small {
    font-family: Roboto;
    letter-spacing: 0.8em;
    zoom: 0.9;
  }
  :deep(.ant-form-item) {
    .ant-form-item-control-wrapper {
      width: 100%;
    }
  }
  :deep(.ant-card-body) {
    width: 100%;
  }
  :deep(.ant-form-explain) {
    right: 60px;
  }
</style>
