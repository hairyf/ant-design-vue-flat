<!--
 * @Author: Mr.wang
 * @Date: 2021-04-21 17:11:02
 * @LastEditTime: 2021-05-12 16:24:49
 * @Description: 客服设置
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="feedback-box">
    <el-form :model="connectForm" label-width="100px">
      <el-form-item label="产品ID">
        <el-input placeholder="请输入您的产品ID" v-model="connectForm.name"></el-input>
        <div>反馈设置位置指引：</div>
        <div class="oe-flex">
          1、先登录
          <span style="color: #ff0000">兔小巢</span> 后台，点击
          <a class="compliance" href="https://txc.qq.com/" target="_blank">兔小巢</a> 去登录
        </div>
        <div class="oe-flex">
          2、新增产品
          <el-popover placement="right" :width="400" trigger="hover">
            <el-image
              src="/custom-assets/images/system/product.png"
              class="examples-img"
              style="width: 400px; height: 515px"
            />
            <template #reference>
              <div class="set-icon-text">
                <span>示例</span>
              </div>
            </template>
          </el-popover></div
        >
        <div class="oe-flex">
          3、产品新增完成后，在产品设置中查看产品ID
          <el-popover placement="right" :width="485" trigger="hover">
            <el-image
              src="/custom-assets/images/system/establish.png"
              class="examples-img"
              style="width: 485px; height: 210px"
            />
            <template #reference>
              <div class="set-icon-text">
                <span>示例</span>
              </div>
            </template>
          </el-popover>
        </div>
        <div> 4、将获得的产品ID输入上方输入框内，点击保存并生效即可</div>
        <el-button type="primary" @click="preservation">保存并生效</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  import { ElMessage } from 'element-plus'
  const connectForm = ref({
    //  输入接入代码
    name: ''
  })
  const getFeedbackSettings = async () => {
    const { data } = await reqSetKeyConfig({
      key: 'feedback'
    })
    connectForm.value.name = data.data.product_id
  }
  const preservation = async () => {
    const data = {
      product_id: connectForm.value.name
    }
    const key = 'feedback'
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getFeedbackSettings()
  }
  onMounted(() => {
    getFeedbackSettings()
  })
</script>
<style lang="scss" scoped>
  .feedback-box {
    .el-input {
      width: 267px;
    }
    :deep(.el-card__body) {
      min-height: 680px;
    }
    :deep(.el-textarea__inner) {
      width: 481px;
      height: 238px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-button) {
      margin-top: 50px;
      padding: 0 14px;
      min-height: 32px;
    }
    :deep(.el-form-item__content) {
      div {
        font-size: 12px;
        line-height: 30px;
        color: #8c8c8c;
      }
    }
    .compliance {
      text-decoration: none;
      cursor: pointer;
      color: var(--color-primary);
    }
    .set-icon-text {
      margin-left: 10px;
      cursor: pointer;
      span {
        color: var(--color-primary);
      }
    }
  }
</style>
