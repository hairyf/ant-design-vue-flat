<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-06 15:53:37
 * @LastEditTime: 2021-05-10 09:59:58
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form :model="form" :rules="formRules" ref="formRef" label-width="79px" label-position="right">
    <el-card shadow="never" class="custom-crad-container">
      <template #header>
        <div class="title">{{ isEdit ? '编辑' : '新增' }}角色</div>
      </template>
      <template #default>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="explain">
          <el-input type="textarea" v-model="form.explain"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="rules">
          <el-cascader-panel
            :props="{ multiple: true, emitPath: false, label: 'title', value: 'id' }"
            v-model="form.rules"
            :options="cascaderOptions"
          />
        </el-form-item>
      </template>
    </el-card>
    <el-card shadow="never" class="oe-m-t-15">
      <div class="oe-flex oe-row-center">
        <el-button size="medium" @click="router.replace('roleManage')">取消</el-button>
        <el-button size="medium" type="primary" v-if="isEdit" @click="editRoleItem">保存</el-button>
        <el-button size="medium" type="primary" v-else @click="incRoleItem">新增</el-button>
      </div>
    </el-card>
  </el-form>
</template>
<script lang="ts" setup>
  import { reqEditRoleItem, reqIncRoleItem, reqRoleDetail, reqRulesTree } from '@/api/system'
  import { awaitPromise } from '@/utils'
  import { ref } from '@vue/reactivity'
  import { computed } from '@vue/runtime-core'
  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  // 当前是否为编辑
  const isEdit = computed(() => typeof route.query?.id !== 'undefined')
  // 表单内容
  const form = ref<{
    id?: Key
    name: string
    explain: string
    rules: string[]
  }>({
    name: '',
    explain: '',
    rules: []
  })
  // 表单验证规则
  const formRules = {
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    explain: [
      { required: true, message: '请输入角色描述', trigger: 'blur' },
      { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
    ],
    rules: [{ type: 'array', required: true, message: '请至少选择一个权限项', trigger: 'change' }]
  }
  // 权限列表树
  const cascaderOptions = ref<any[]>([])
  reqRulesTree().then((res) => (cascaderOptions.value = res.data.data))
  // 获取角色详情
  const getRoleDetail = async () => {
    const { data } = await reqRoleDetail(route.query.id as Key)
    data.data.rules = data.data.rules.map((item: string) => {
      return Number(item)
    })
    form.value = data.data
  }
  if (isEdit.value) getRoleDetail()
  const formRef = ref<any>()
  // 添加角色信息
  const incRoleItem = async () => {
    await formRef.value.validate()
    await reqIncRoleItem(form.value)
    ElMessage.success({
      type: 'success',
      message: '添加成功!!',
      duration: 1500
    })
    await awaitPromise(1500)
    router.back()
    // router.replace('roleManage')
  }
  // 编辑角色信息
  const editRoleItem = async () => {
    await formRef.value.validate()
    await reqEditRoleItem(form.value)
    ElMessage.success({
      type: 'success',
      message: '修改成功!!',
      duration: 1500
    })
    await awaitPromise(1500)
    router.back()
  }
</script>
<style lang="scss" scoped>
  .title {
    font-weight: bold;
    font-size: 16px;
  }
  .el-input,
  .el-textarea {
    width: auto;
  }
  .el-cascader-panel {
    height: 300px;
  }
  :deep(.el-cascader-menu__wrap) {
    height: 100%;
  }
  :deep(.el-cascader-menu__list) {
    height: 100%;
  }
  .el-button {
    width: 150px;
  }
</style>
