<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:29:58
 * @LastEditTime: 2021-07-16 17:35:26
 * @Description: 上传组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-upload__box w-1/2 bg-upload-bg-color">
    <div class="border-dashed border-2 border-primary-light-6">
      <a-upload
        name="file"
        :file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        :before-upload="beforeUpload"
        accept=".xls, .xlsx"
      >
        <div class="text-center py-24">
          <div class="text-primary text-sm">
            <slot></slot>
          </div>
          <cal-button class="w-112 mt-12" style="border-radius: 26px">选择文件</cal-button>
        </div>
      </a-upload>
    </div>
    <!-- <div class="tips" v-if="show">请先上传文件在提交</div> -->
    <cal-button class="w-112 mt-24" type="primary" @click="submitForm" style="border-radius: 26px">
      提交
    </cal-button>
    <cal-button type="link" class="ml-20" @click="emit('downloadTemplate')">
      下载Excel模板
    </cal-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalUpload' })
</script>
<script setup lang="ts">
  import { useTheme } from '../../../utils/theme'
  import { message } from 'ant-design-vue'
  import { ref, watch, defineEmits } from 'vue'
  import { Upload as AUpload } from 'ant-design-vue'
  import CalButton from '../../button/src/Button.vue'
  const fileList = ref<any>([])
  const emit = defineEmits(['uploadFile', 'downloadTemplate'])
  // const show = ref(false)
  // 上传成功的钩子
  const handleChange = (info: any) => {
    let newFileList = [...info.fileList]
    newFileList = newFileList.slice(-5)
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })
    fileList.value = newFileList
  }
  // 限制文件名钩子
  const beforeUpload = (file: any) => {
    return new Promise((resolve, reject) => {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg == 'xlsx' || testmsg == 'xls'
      if (!extension) {
        message.error('请上传xlsx或者xls的格式!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  // 验证
  const submitForm = () => {
    if (fileList.value.length) {
      emit('uploadFile', fileList.value)
    } else {
      message.error('请先上传文件！')
    }
  }
  useTheme('upload')
</script>
<style lang="scss" scoped>
  .cal-upload__box {
    position: relative;
    .tips {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      font-size: 14px;
      color: #f56c6c;
    }
    :deep(.ant-upload) {
      width: 100%;
    }
    :deep(.ant-upload-list) {
      & > div {
        padding-bottom: 14px;
        margin: 0 24px 0 24px;
        border-bottom: 1px solid #f5f5f5;
        font-size: 14px;
        color: #000;
      }
    }
    :deep(.ant-upload-list-item-info) {
      display: flex;
      align-items: center;
    }
    :deep(.ant-upload-list-item-name) {
      display: inline;
      line-height: 24px;
      padding-left: 12px;
    }
    :deep(.ant-upload-list-item:hover .ant-upload-list-item-info) {
      background-color: transparent;
    }
    :deep(.ant-upload-list-item-card-actions) {
      margin-top: 6px;
    }
    :deep(.anticon-paper-clip) {
      position: relative;
      background: url('https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/excel.png')
        no-repeat;
      width: 24px;
      height: 24px;
      background-size: 24px 24px;
      svg {
        display: none;
      }
    }
  }
</style>
