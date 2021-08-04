<!--
 * @Author: Mr.wang
 * @Date: 2021-06-01 17:51:25
 * @LastEditTime: 2021-07-16 22:08:43
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    class="bg-background mx-auto rounded-2xl py-44 shadow px-56"
    style="width: 1122px"
    :rules="rules"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 19 }"
  >
    <a-form-item label="员工账号" name="accountNumber">
      <cal-input
        v-model:value="formState.accountNumber"
        placeholder="请输入"
        class="w-208"
        :allowClear="true"
      ></cal-input>
      <div class="text-xs tips-text mt-6">以字母开头，包含字母和数字两种字符，长度6~18位</div>
    </a-form-item>
    <a-form-item label="员工姓名" name="fullName">
      <cal-input
        v-model:value="formState.fullName"
        placeholder="请输入"
        class="w-208"
        :allowClear="true"
      ></cal-input>
    </a-form-item>

    <a-form-item label="员工头像" name="avatar">
      <div>
<!--        <img class="rounded-xl w-100 h-100" :src="formState.avatar" />-->
        <cal-avatar
            class="rounded-xl w-100 h-100"
            size="48"
            fit="cover"
            :src="formState.avatar"
        />

        <cal-button type="link" class="px-0 h-20 mt-8" @click="selectPicture(0)"
          >选择图片</cal-button
        >
      </div>
      <div class="text-gray-darkmin text-xs">建议尺寸800*800</div>
    </a-form-item>

    <a-form-item label="手机号码" name="phone">
      <cal-input
        v-model:value="formState.phone"
        placeholder="请输入"
        class="w-208"
        :allowClear="true"
      ></cal-input>
    </a-form-item>
    <a-form-item label="密码" name="password" v-if="title =='新增员工'" required>

      <cal-input-password
        v-model:value="formState.password"
        placeholder="请输入"
        class="w-208"
        :allowClear="true"
      ></cal-input-password>
      <div class="tips-text text-xs mt-6"
        >至少包含字母和数字两种字符，可以包含特殊字符，但不包含空格，长度6~18位</div
      >
    </a-form-item>

    <a-form-item label="新密码" name="password" v-if="title =='编辑员工'" >

      <cal-input-password
          v-model:value="formState.password"
          placeholder="请输入"
          class="w-208"
          :allowClear="true"
      ></cal-input-password>
      <div class="tips-text text-xs mt-6"
      >至少包含字母和数字两种字符，可以包含特殊字符，但不包含空格，长度6~18位</div
      >
    </a-form-item>

    <a-form-item label="确认密码" name="confirmPassword" v-if="title =='新增员工'" required>
      <cal-input-password
        :allowClear="true"
        v-model:value="formState.confirmPassword"
        placeholder="请输入"
        class="w-208"
      ></cal-input-password>
      <div class="tips-text text-xs mt-6"
        >至少包含字母和数字两种字符，可以包含特殊字符，但不包含空格，长度6~18位</div
      >
    </a-form-item>
    <a-form-item label="确认新密码" name="confirmPassword" v-if="title =='编辑员工'" >
      <cal-input-password
        :allowClear="true"
        v-model:value="formState.confirmPassword"
        placeholder="请输入"
        class="w-208"
      ></cal-input-password>
      <div class="tips-text text-xs mt-6"
        >至少包含字母和数字两种字符，可以包含特殊字符，但不包含空格，长度6~18位</div
      >
    </a-form-item>

    <a-form-item label="角色" name="role" v-if="formState.role > 0 || title =='新增员工'">
      <cal-input-select
        placeholder="请选择"
        v-model:value="formState.role"
        class="w-192"
        @change="changeTree"
      >
        <a-select-option :value="item.id" v-for="(item, index) in roleData" :key="index">
          {{ item?.name }}
        </a-select-option>
      </cal-input-select>
      <div class="flex items-center" >
        <cal-button type="link" @click="$router.push('/setting/jurisdiction/newRole')">
          新增角色
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
    </a-form-item>
    <!-- <a-form-item label="权限">
      <cal-cascader-panel
        v-model="formState.rules"
        :props="{ multiple: true, emitPath: false, label: 'title', value: 'id' }"
        :options="cascaderOptions"
      >
      </cal-cascader-panel>
    </a-form-item> -->
    <a-form-item label="权限说明" v-if="formState.role > 0 || title =='新增员工'">
      <!-- <cal-cascader-panel
          v-if="formState.rules.length"
          class="mt-10"
          v-model="formState.rules"
          :props="{ multiple: true, emitPath: false, label: 'title', value: 'id' }"
          :options="formState.role ? cascaderOptions : []"
        >
        </cal-cascader-panel> -->
      <cal-tree
        style="overflow-y: auto; max-height: 400px"
        :disabled="true"
        checkable
        :tree-data="cascaderOptions"
        v-model:checkedKeys="formState.rules"
        :replaceFields="{ children: 'children', title: 'title', key: 'id' }"
      >
      </cal-tree>
    </a-form-item>
  </a-form>
  <div class="flex items-center mt-56 justify-center">
    <cal-button class="w-176 h-48" @click="cancelBtn"> 取消 </cal-button>
    <cal-button type="primary" class="ml-48 w-176 h-48" @click="submitForm"> 保存 </cal-button>
  </div>
</template>
<script setup lang="ts">
  import { ElForm, ElFormItem } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-form.css'
  import 'element-plus/lib/theme-chalk/el-form-item.css'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { onMounted, ref } from 'vue'
  import CalInputPassword from '@/components/CustomAntds/CalInputPassword/index.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const store = useStore()

  import {
    reqStaffDetails,
    reqPermissionTree,
    reqRoleDropDown,
    reqAddStaff,
    reqRoleDetails,
    reqEditStaff
  } from '@/api/setting'
  import { message } from 'ant-design-vue'
  import { CalImageSelect } from '~/Business/CalImageSelect/index'
  const route = useRoute()
  const router = useRouter()
  const formRef = ref()
  const formState = ref({
    accountNumber: '',
    fullName: '',
    phone: '',
    rules: [],
    password: '',
    confirmPassword: '',
    avatar: '',
    // 角色
    role: null
  })


  const title = route.query.title


  // 角色下拉
  const roleData = ref<any[]>([])
  const cascaderOptions = ref<any>()
  const isRotate = ref(false)
  const validateAccount = async (rule: any, value: string) => {
    const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,17})$/
    if (value === '') {
      return Promise.reject('请填写用户账号')
    }
    if (!reg.test(value)) {
      return Promise.reject('账号长度6-18位，以英文开头，且包含英文数字')
    }
    return Promise.resolve()
  }
  const validatePass = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value.length > 0) {
      if (!pas.test(value)) {
        return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
      } else if (formState.value.password != '') {
        formRef.value.validateField('confirmPassword')
      }
      return Promise.resolve()
    }else{
      if(title == '新增员工')
      {
        return Promise.reject('请填写密码');
      }
    }
  }
  const validatePass2 = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value.length > 0) {
      if (value !== formState.value.password) {
        return Promise.reject('密码请输入一致')
      } else if (!pas.test(value)) {
        return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
      }
    }else{
      if(title == '新增员工')
      {
        return Promise.reject('请填写确认密码');
      }
    }
    return Promise.resolve()
  }
  const phoneRule = async (rule: any, value: string) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (value === '') {
      return Promise.reject('请填写手机号码')
    } else if (!reg.test(value)) {
      return Promise.reject('请填写正确的手机号码')
    }
    return Promise.resolve()
  }
  const roleRule = async (rule: any, value: string) => {
    if (formState.value.role === '') {
      return Promise.reject('请选择角色')
    }
    return Promise.resolve()
  }

    const {rules, validate} = useAntdForm(formRef, {
      accountNumber: [{required: true, validator: validateAccount, trigger: 'blur'}],
      fullName: [{required: true, message: '请填写员工姓名', trigger: 'blur'}],
      phone: [{required: true, validator: phoneRule, trigger: 'blur'}],
      password: [{validator: validatePass, trigger: 'change'}],
      confirmPassword: [{validator: validatePass2, trigger: 'change'}],
      role: [{required: true, validator: roleRule, trigger: 'blur'}]
    })

  // 获取角色下拉数据
  const getRoleData = async () => {
    const { data } = await reqRoleDropDown({
      page: 1,
      limit: 9999
    })
    roleData.value = data.data.data
    if (isRotate.value) {
      isRotate.value = false
      message.success('刷新成功！')
    }
  }
  // 监听角色变化请求权限
  const changeTree = async (value: any) => {
    if (typeof value != 'undefined') {
      const { data } = await reqRoleDetails({
        id: value
      })
      data.data.rules = data.data.rules.map((item: string) => {
        return Number(item)
      })
      formState.value.rules = data.data.rules
    } else {
      formState.value.rules = []
    }
  }
  const getTreeData = async (id: string) => {
    if(id > 0) {
      const {data} = await reqRoleDetails({
        id
      })
      data.data.rules = data.data.rules.map((item: string) => {
        return Number(item)
      })
      formState.value.rules = data.data.rules
    }
  }
  // 获取权限数据
  const getPermissionTree = async () => {
    const { data } = await reqPermissionTree()
    cascaderOptions.value = data.data
  }
  // 刷新
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(() => {
      getRoleData()
    }, 1000)
  }
  const selectPicture = async (num: number) => {
    const res = await CalImageSelect({ multiple: false })
    if (num == 0) {
      formState.value.avatar = res[0].path.url
    } else {
      num == 1
        ? (formState.value.bagUrl = res[0].path.url)
        : (formState.value.serviceLogo = res[0].path.url)
    }
  }
  const userInfo = store.state.user.info
  // 提交表单
  const submitForm = async () => {
    await validate()
    if (route.query.id) {
      await reqEditStaff({
        id: route.query.id as Key,
        name: formState.value.fullName,
        username: formState.value.accountNumber,
        password: formState.value.password,
        repassword: formState.value.confirmPassword,
        mobile: formState.value.phone,
        avatar: formState.value.avatar,
        group_id: formState.value.role as any
      })



      if (route.query.id == userInfo.id) {
        // userInfo?.avatar = formState.value.avatar
        await store.dispatch('modifyPortrait', formState.value.avatar)

        await store.dispatch('modifyName', formState.value.fullName)
        //更新自己的

      }
    } else {
      await reqAddStaff({
        name: formState.value.fullName,
        username: formState.value.accountNumber,
        password: formState.value.password,
        repassword: formState.value.confirmPassword,
        mobile: formState.value.phone,
        group_id: formState.value.role as any
      })
    }
    message.success('操作成功！')
    router.go(-1)
  }
  // 取消按钮
  const cancelBtn = () => {
    router.go(-1)
  }
  const getStaffDetails = async () => {
    const { data } = await reqStaffDetails({
      id: route.query.id
    })
    formState.value.accountNumber = data.data.username
    formState.value.fullName = data.data.name
    formState.value.phone = data.data.mobile
    formState.value.role = data.data.group_id
    formState.value.avatar = data.data.avatar
    getTreeData(data.data.group_id)
  }
  onMounted(() => {
    getPermissionTree()
    getRoleData()
    if (route.query.id) {
      getStaffDetails()
    }
  })
</script>
<style lang="scss" scoped>
  .tips-text {
    color: #8c8c8c;
    line-height: 24px;
  }
  .line {
    width: 1px;
    height: 11px;
    background-color: var(--color-primary);
  }
  .rotate {
    animation: rotation 1.25s linear infinite;
  }
  :deep(.ant-form-item) {
    margin-bottom: 14px;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
