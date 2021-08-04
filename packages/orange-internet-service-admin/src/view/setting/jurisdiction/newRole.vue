<!--
 * @Author: Mr.wang
 * @Date: 2021-06-01 15:13:46
 * @LastEditTime: 2021-07-13 17:04:32
 * @Description: 新增角色
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    class="bg-background w-1000 mx-auto rounded-2xl py-44 shadow px-56"
    :rules="rules"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 19 }"
  >
    <a-form-item label="角色名称" name="accountNumber">
      <cal-input
        :allowClear="true"
        v-model:value="formState.accountNumber"
        placeholder="请输入角色名称"
        class="w-208"
      ></cal-input>
    </a-form-item>
    <a-form-item label="角色描述" name="describe">
      <cal-input
        :allowClear="true"
        v-model:value="formState.describe"
        placeholder="请输入角色描述"
        class="w-208"
      ></cal-input>
    </a-form-item>
    <a-form-item label="权限" name="rules">
      <cal-tree
        style="overflow-y: auto; max-height: 400px"
        checkable
        :tree-data="cascaderOptions"
        v-model:checkedKeys="formState.rules"
        :replaceFields="{ children: 'children', title: 'title', key: 'id' }"
      >
      </cal-tree>
      <!-- <cal-cascader-panel
        v-if="cascaderOptions"
        v-model="formState.rules"
        :props="{ multiple: true, label: 'title', value: 'id' }"
        :options="cascaderOptions"
      >
      </cal-cascader-panel> -->
    </a-form-item>
  </a-form>
  <div class="flex items-center mt-56 justify-center">
    <cal-button class="w-176 h-48" @click="cancelBtn"> 取消 </cal-button>
    <cal-button type="primary" class="ml-48 w-176 h-48" @click="submitForm"> 保存 </cal-button>
  </div>
</template>
<script setup lang="ts">
  import { reqAddRole, reqPermissionTree, reqRoleDetails, reqEditRole } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const formRef = ref()
  const formState = ref({
    accountNumber: '',
    describe: '',
    rules: []
  })
  const cascaderOptions = ref<any>()
  const { rules, validate } = useAntdForm(formRef, {
    accountNumber: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
    describe: [{ required: true, message: '请填写角色描述', trigger: 'blur' }],
    rules: [{ type: 'array', required: true, message: '请至少选择一个权限项', trigger: 'change' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    if (route.query.id) {
      await reqEditRole({
        id: route.query.id,
        name: formState.value.accountNumber,
        rules: formState.value.rules,
        explain: formState.value.describe
      })
    } else {
      await reqAddRole({
        name: formState.value.accountNumber,
        rules: formState.value.rules,
        explain: formState.value.describe
      })
    }
    console.log(formState.value.rules)
    message.success('操作成功！', 1)
    router.go(-1)
  }
  // 取消按钮
  const cancelBtn = () => {
    router.go(-1)
  }
  // 获取权限数据
  const getPermissionTree = async () => {
    const { data } = await reqPermissionTree()
    cascaderOptions.value = data.data
  }
  // 获取编辑数据
  const getRoleDetails = async () => {
    const { data } = await reqRoleDetails({
      id: route.query.id
    })
    formState.value.accountNumber = data.data.name
    formState.value.describe = data.data.explain
    data.data.rules = data.data.rules.map((item: string) => {
      return Number(item)
    })
    formState.value.rules = data.data.rules
  }
  onMounted(() => {
    getPermissionTree()
    if (route.query.id) {
      getRoleDetails()
    }
  })
</script>
<style lang="scss" scoped></style>
