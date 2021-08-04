<!--
 * @Author: Mr.wang
 * @Date: 2021-04-21 17:11:02
 * @LastEditTime: 2021-05-12 17:09:43
 * @Description: 客服设置
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="feedback-box">
    <el-form :model="connectForm" label-width="100px">
      <el-form-item label="输入接入代码">
        <el-input
          type="textarea"
          placeholder="请输入合从客服接入代码"
          v-model="connectForm.code"
        ></el-input>
        <div>客服接入代码位置指引：</div>
        <div class="oe-flex">
          1、先登录 合从客服 后台，如无合从账号，点击
          <a class="compliance" href="https://txc.qq.com/" target="_balnk">合从客服</a> 进行申请
        </div>
        <div class="oe-flex">
          2、点击客户接入渠道
          <el-popover placement="right" :width="400" trigger="hover">
            <el-image
              src="/custom-assets/images/system/channel.png"
              class="examples-img"
              style="width: 1218px; height: 609px"
            />
            <template #reference>
              <div class="set-icon-text">
                <span>示例</span>
              </div>
            </template>
          </el-popover></div
        >
        <div class="oe-flex">
          3、点击网页获得接入代码
          <el-popover placement="right" :width="420" trigger="hover">
            <el-image
              src="/custom-assets/images/system/webpage.png"
              class="examples-img"
              style="width: 1251px; height: 690px"
            />
            <template #reference>
              <div class="set-icon-text">
                <span>示例</span>
              </div>
            </template>
          </el-popover>
        </div>
        <div> 4、将获得的代码复制到上方文本框内，点击保存并生效即可 </div>
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
    code: ''
  })
  const getFeedbackSettings = async () => {
    const { data } = await reqSetKeyConfig({
      key: 'customer'
    })
    connectForm.value.code = data.data.customer_content
  }
  const preservation = async () => {
    const data = {
      customer_content: connectForm.value.code
    }
    const key = 'customer'
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
