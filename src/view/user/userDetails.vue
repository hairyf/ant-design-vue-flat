<!--
 * @Author: Mr.wang
 * @Date: 2021-05-28 15:52:57
 * @LastEditTime: 2021-07-09 18:43:04
 * @Description: 用户详情
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-col :xs="24" :lg="24">
    <cal-card class="min-h-224">
      <div class="flex justify-between mb-16">
        <div class="title">基础信息</div>
        <!-- <cal-button class="w-96 h-28">删除用户</cal-button> -->
      </div>
      <div class="flex items-center">
        <a-image
          :preview="false"
          class="w-full h-full rounded"
          :src="userDetails.avatar"
          v-if="userDetails.avatar"
        >
        </a-image>
        <cal-image
          class="w-full h-full rounded"
          src="@/assets/img/user/default.png"
          v-if="!userDetails.avatar"
        >
        </cal-image>
        <a-descriptions :column="4" class="flex-1" size="middle">
          <a-descriptions-item class="flex items-center flex-wrap" label="用户姓名">
            <div class="truncate"> {{ userDetails.nickname }}</div>
            <cal-button type="link" class="px-0" @click=";(currentModify = 0), (show = true)"
              >修改
            </cal-button>
          </a-descriptions-item>
          <a-descriptions-item label="用户密码">
            ******<cal-button type="link" class="pl-4" @click=";(currentModify = 1), (show = true)"
              >修改</cal-button
            >
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" class="flex items-center">
            <div class=""> {{ userDetails.mobile }}</div>
            <cal-button type="link" class="pl-4" @click=";(currentModify = 2), (show = true)">
              修改
            </cal-button>
          </a-descriptions-item>
          <a-descriptions-item label="用户ID"> {{ userDetails.id }} </a-descriptions-item>
          <a-descriptions-item label="用户账号"> {{ userDetails.username }} </a-descriptions-item>
          <!-- <a-descriptions-item label="用户类型"> 营业中 </a-descriptions-item> -->
          <!-- <a-descriptions-item label="注册来源"> 2021-05-08 </a-descriptions-item> -->
          <a-descriptions-item label="注册时间" class="flex flex-wrap">
            <div>{{ $formatUnix(userDetails.createtime) }}</div>
          </a-descriptions-item>
          <a-descriptions-item label="邮箱">
            {{ userDetails.email ? userDetails.email : '无' }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="微信"> 2021-05-08 </a-descriptions-item> -->
        </a-descriptions>
      </div>
    </cal-card>
  </a-col>
  <a-col :xs="24" :lg="24">
    <cal-card class="mt-24">
      <div class="flex justify-between">
        <div class="title">店铺信息</div>
        <cal-page-select v-model="pageSize" />
      </div>
      <cal-sticky-layout class="min-h-450">
        <cal-table class="mt-28" :list="list" sync-space>
          <cal-table-option title="店铺ID" min-width="60px" index="shop_id"></cal-table-option>
          <cal-table-option title="店铺信息" min-width="180px" v-slot="{ item }">
            <div class="flex items-center">
              <img class="w-40 h-40" :src="item.get_shop?.logo_path" alt="" />
              <div class="ml-10 text-primary">{{ item.get_shop?.name }}</div>
            </div>
          </cal-table-option>
          <cal-table-option
            title="总交易金额"
            min-width="90"
            sort
            v-slot="{ item }"
            index="totalBuyMoney"
          >
            ¥{{ item.totalBuyMoney }}
          </cal-table-option>
          <cal-table-option
            title="交易订单总数"
            min-width="100"
            index="totalOrder"
            sort
          ></cal-table-option>
          <cal-table-option title="店铺套餐" min-width="150" v-slot="{ item }">
            {{ item.get_shop?.combo_name }}
          </cal-table-option>
          <cal-table-option title="店铺类型" min-width="120" sort v-slot="{ item }">
            {{ shopTypes[item.get_shop?.combo_is_tryout] }}
          </cal-table-option>
          <cal-table-option title="店铺状态" min-width="110" sort v-slot="{ item }">
            {{ item.get_shop?.status == 8 ? '正常营业' : '暂停营业' }}
          </cal-table-option>
          <cal-table-option title="创建时间" min-width="180" sort v-slot="{ item }">
            {{ $formatUnix(item.get_shop?.createtime) }}
          </cal-table-option>
          <cal-table-option title="到期时间" min-width="180" sort v-slot="{ item }">
            {{item.get_shop?.combo_deadline ? $formatUnix(item.get_shop?.combo_deadline) : '永久' }}
          </cal-table-option>
        </cal-table>
        <template #sticky>
          <div class="flex justify-center mt-20">
            <cal-pagination v-model:current="currentPage" :total="total"> </cal-pagination>
          </div>
        </template>
      </cal-sticky-layout>
    </cal-card>
  </a-col>
  <cal-message-dialog
    v-model="show"
    :title="titleList[currentModify]"
    class="w-544"
    @ok="setUserInformation"
  >
    <a-form
      :model="formUser"
      :rules="rules"
      ref="formRef"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 17 }"
    >
      <template v-if="currentModify == 0">
        <a-form-item label="用户姓名" name="name">
          <cal-input v-model:value="formUser.name" placeholder="输入用户姓名" class="w-252">
          </cal-input>
        </a-form-item>
      </template>
      <template v-if="currentModify == 1">
        <a-form-item label="新登录密码" name="password">
          <cal-input-password
            v-model:value="formUser.password"
            placeholder="输入6~16位新密码"
            class="w-252"
          >
          </cal-input-password>
        </a-form-item>
        <a-form-item label="确认登录密码" name="confirmPassword">
          <cal-input-password
            v-model:value="formUser.confirmPassword"
            placeholder="输入6~16位新密码"
            class="w-252"
          >
          </cal-input-password>
        </a-form-item>
      </template>
      <template v-if="currentModify == 2">
        <a-form-item label="输入新联系人电话" name="phone">
          <cal-input v-model:value="formUser.phone" placeholder="请输入新联系电话" class="w-252">
          </cal-input>
        </a-form-item>
        <a-form-item label="确认联系电话" name="confirmPhone">
          <cal-input
            v-model:value="formUser.confirmPhone"
            placeholder="再次输入新联系电话"
            class="w-252"
          >
          </cal-input>
        </a-form-item>
      </template>
      <a-form-item label="备注" name="remarks">
        <cal-textarea
          v-model:value="formUser.remarks"
          placeholder="简短描述需备注信息"
          class="w-384 h-128"
          style="border-radius: 20px"
        ></cal-textarea>
      </a-form-item>
      <a-form-item required label="管理员登录密码" name="signPass">
        <cal-input-password
          v-model:value="formUser.signPass"
          class="w-192"
          placeholder="请输入管理员登录密码"
        />
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script setup lang="ts">
  import { reqVerification } from '@/api/shop'
  import { reqMemberShopList, reqUserDetails, reqModifyInformation } from '@/api/user'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { useForm } from '@ant-design-vue/use'
  import { onMounted, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  enum ShopStatus {
    已封禁 = 0,
    待审核 = 1,
    审核失败 = 2,
    审核通过 = 3,
    已选择套餐 = 4,
    创建失败 = 5,
    支付成功 = 6,
    暂停营业 = 7,
    正常营业 = 8
  }
  enum ShopTypes {
    营业店铺 = 0,
    试用店铺 = 1
  }
  const shopTypes = ShopTypes
  const shopStatus = ShopStatus
  const show = ref(false)
  const titleList = ['修改用户姓名', '修改用户密码', '修改用户联系电话']
  const currentModify = ref(0)
  const id = ref()
  const formRef = ref()
  const formUser = ref({
    password: '',
    confirmPassword: '',
    remarks: '',
    signPass: '',
    name: '',
    phone: '',
    confirmPhone: ''
  })
  const userDetails = ref<any>({})
  const validatePass = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value === '') {
      return Promise.reject('请填写登录密码')
    }
    if (!pas.test(value)) {
      return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
    } else if (formUser.value.password != '') {
      formRef.value.validateField('confirmPassword')
    }
    return Promise.resolve()
  }
  const validatePass2 = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value === '') {
      return Promise.reject('请填写确认登录密码')
    } else if (value !== formUser.value.password) {
      return Promise.reject('密码请输入一致')
    } else if (!pas.test(value)) {
      return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
    }
    return Promise.resolve()
  }
  const passwordRule = async (rule: any, value: string) => {
    console.log(value)
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject('密码不正确,请重新输入密码')
      }
    } else {
      return Promise.reject('密码为必填项')
    }
  }
  const phoneRule1 = async (rule: any, value: string) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (value === '') {
      return Promise.reject('请输入新联系电话')
    }
    if (!reg.test(value)) {
      return Promise.reject('新联系电话不正确')
    } else if (formUser.value.phone != '') {
      formRef.value.validateField('confirmPhone')
    }
    return Promise.resolve()
  }
  const phoneRule2 = async (rule: any, value: string) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

    if (value === '') {
      return Promise.reject('请输入新联系电话')
    } else if (value !== formUser.value.phone) {
      return Promise.reject('两次填写电话不一致')
    } else if (!reg.test(value)) {
      return Promise.reject('确认联系电话不正确')
    }
    return Promise.resolve()
  }
  const { rules, validate } = useAntdForm(formRef, {
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    signPass: [{ required: true, validator: passwordRule, trigger: 'blur' }],
    remarks: { required: true, message: '请输入备注' },
    name: { required: true, message: '请用户姓名' },
    phone: [{ required: true, validator: phoneRule1, trigger: 'blur' }],
    confirmPhone: [{ required: true, validator: phoneRule2, trigger: 'blur' }]
  })
  // 修改用户信息
  const setUserInformation = async () => {
    await validate()
    if (currentModify.value == 0) {
      await reqModifyInformation({
        value: formUser.value.name,
        name: 'nickname',
        id: Number(id.value),
        remarks: formUser.value.remarks
      })
    } else {
      await reqModifyInformation({
        value: currentModify.value == 1 ? formUser.value.password : formUser.value.phone,
        name: currentModify.value == 1 ? 'password' : 'mobile',
        id: Number(id.value),
        remarks: formUser.value.remarks
      })
    }
    message.success('操作成功！')
    getUserDetails(id.value)
    resetFields()
  }
  const { resetFields } = useForm(formUser, {})
  // 获取用户详情
  const getUserDetails = async (id: any) => {
    const { data } = await reqUserDetails({
      id
    })
    userDetails.value = data.data
  }
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqMemberShopList({
        page: currentPage.value,
        limit: pageSize.value,
        id: route.query.id
      })
      total.value = data.data.total
      return data.data.data
    }
  })
  /** 表格 end */
  onMounted(() => {
    if (route.query.id) {
      getUserDetails(route.query.id)
      id.value = route.query.id
    }
  })
</script>
<style lang="scss" scoped>
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  :deep(.ant-image) {
    width: 100px;
    height: 100px;
    margin-right: 32px;
  }
  :deep(.ant-btn) {
    height: 100%;
  }
  :deep(.ant-descriptions-item-content) {
    font-size: 14px;
    color: #001426;
  }
</style>
