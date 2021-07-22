<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:29:58
 * @LastEditTime: 2021-07-20 14:07:15
 * @Description: 上传组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-upload-box w-1/2 bg-upload-bg-color">
    <div class="border-dashed border-2 border-common-primary-color-light-6">
      <upload
        name="file"
        :file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        :before-upload="beforeUpload"
        accept=".xls, .xlsx"
      >
        <div class="text-center py-24">
          <div class="text-common-primary-color text-sm">
            <slot></slot>
          </div>
          <cal-button class="w-112 mt-12" style="border-radius: 26px">选择文件</cal-button>
        </div>
      </upload>
    </div>
    <!-- <div class="tips" v-if="show">请先上传文件在提交</div> -->
    <cal-button class="w-112 mt-24" type="primary" @click="submitForm" style="border-radius: 26px">
      提交
    </cal-button>
    <cal-button type="link" class="ml-32 px-0" @click="emit('downloadTemplate')">
      下载Excel模板
    </cal-button>
    <cal-button type="link" class="ml-32 px-0" @click="emit('downloadExpress')" v-if="isExpress">
      快递公司对照模板
    </cal-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalUpload' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { ref, defineEmits, defineProps } from 'vue'
  import { Upload, message } from 'ant-design-vue'
  import CalButton from '../../button/src/Button.vue'
  const fileList = ref<any>()
  const emit = defineEmits(['uploadFile', 'downloadTemplate', 'downloadExpress'])
  // const show = ref(false)
  const props = defineProps({
    isExpress: {
      type: Boolean,
      default: false
    }
  })
  // 上传成功的钩子
  const handleChange = (info: any) => {
    let newFileList = [...info.fileList]
    newFileList = newFileList.slice(-1)
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
  useTheme('Common')
</script>
<style lang="scss">
  .cal-upload-box {
    position: relative;
    .tips {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      font-size: 14px;
      color: #f56c6c;
    }
    .ant-upload {
      width: 100%;
    }
    .ant-upload-list {
      & > div {
        padding-bottom: 14px;
        margin: 0 24px 0 24px;
        border-bottom: 1px solid #f5f5f5;
        font-size: 14px;
        color: #000;
      }
    }
    .ant-upload-list-item-info {
      display: flex;
      align-items: center;
    }
    .ant-upload-list-item-name {
      display: inline;
      line-height: 24px;
    }
    .ant-upload-list-item:hover .ant-upload-list-item-info {
      background-color: transparent;
    }
    .ant-upload-list-item-card-actions {
      margin-top: 6px;
    }
    a:hover {
      color: var(--common-primary-color);
    }
  }
</style>
