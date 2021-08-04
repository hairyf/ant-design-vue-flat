<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-04-02 18:25:03
 * @Description: 调整余额
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 备注 -->
  <el-dialog title="新增标签" v-model="show" width="500px" class="adjust-balance">
    <el-form ref="labelForm" :model="form" class="adjust-form" :rules="rules" label-width="100px">
      <el-form-item label="标签名称" prop="section">
        <el-input
          v-model="form.labelText"
          class="adjust-form-balance"
          placeholder="请输入标签名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input
          v-model="form.remarksTextarea"
          class="adjust-form-balance"
          type="textarea"
          placeholder="标签描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="preservationBtn">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref, computed, defineEmit, defineProps, reactive } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    option: {
      type: Object
    },
    close: {
      type: Number
    }
  })
  const labelForm = ref<any>('')
  const emit = defineEmit()
  const rules = reactive({
    section: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
  })
  // 金额
  const form = ref({
    labelText: '',
    remarksTextarea: ''
  })
  const preservationBtn = () => {
    labelForm.value.validate((valid: boolean) => {
      if (valid) {
        // console.log(5241)
      }
    })
  }
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  const option = computed({
    get: () => props.option,
    set: () => emit('update:option')
  })
</script>
<style lang="scss" scoped>
  .el-dialog {
    min-width: 500px;
  }
  .dialog-footer {
    .el-button {
      min-height: 32px;
      padding: 0 45px;
      font-size: 14px;
    }
  }
  :deep(.el-textarea__inner) {
    resize: none;
  }
  :deep(.el-textarea__inner) {
    height: 157px;
  }
</style>
