<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 10:53:10
 * @LastEditTime: 2021-07-06 16:21:27
 * @Description: 附件设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    class="bg-background w-804 mx-auto rounded-2xl pt-56 pb-44 shadow"
    :rules="rules"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-form-item label="图片类型" name="type">
      <a-checkbox-group v-model:value="formState.type">
        <cal-checkbox value="jpg"> JPG </cal-checkbox>
        <cal-checkbox value="jpge"> JPGE </cal-checkbox>
        <br />
        <cal-checkbox value="png"> PNG </cal-checkbox>
        <cal-checkbox value="gif"> GIF </cal-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="图片上传大小" name="imgSize">
      <cal-input
        v-model:value="formState.imgSize"
        placeholder="请输入"
        :allowClear="true"
        class="w-208"
      ></cal-input>
      KB
      <div class="login-tips">默认为10240KB</div>
    </a-form-item>
    <!-- <a-form-item label="图片压缩" name="compress">
      <cal-switch v-model:checked="formState.compress"></cal-switch>
      <div class="login-tips">手机端图片是否开始压缩</div>
    </a-form-item> -->
    <a-form-item label="音频类型" name="audioType">
      <cal-switch v-model:checked="formState.audioType"></cal-switch>
      <div class="login-tips">仅支持MP3</div>
    </a-form-item>
    <a-form-item label="音频上传大小" name="audioSize">
      <cal-input
        v-model:value="formState.audioSize"
        placeholder="请输入"
        :allowClear="true"
        class="w-208"
      ></cal-input>
      KB
      <div class="login-tips">默认为10240KB</div>
    </a-form-item>
    <a-form-item label="视频类型" name="videoType">
      <cal-switch v-model:checked="formState.videoType"></cal-switch>
      <div class="login-tips">仅支持MP4</div>
    </a-form-item>
    <a-form-item label="音频上传大小" name="videoSize">
      <cal-input
        v-model:value="formState.videoSize"
        placeholder="请输入"
        :allowClear="true"
        class="w-208"
      ></cal-input>
      KB
      <div class="login-tips">默认为10240KB</div>
    </a-form-item>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-176 mx-24 h-48" type="primary" size="large" @click="submitForm">
      保存并生效
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { reqAttachmentSettings, reqSetNearby } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue'
  const formRef = ref()
  const formState = ref({
    type: [] as any[],
    imgSize: '',
    compress: false,
    audioType: false,
    audioSize: '',
    videoType: false,
    videoSize: ''
  })
  const { rules, validate } = useAntdForm(formRef, {
    type: [{ type: 'array', required: true, message: '请至少选择一种图片类型', trigger: 'blur' }],
    imgSize: [{ required: true, message: '请填图片上传大小', trigger: 'blur' }],
    audioSize: [{ required: true, message: '请填音频上传大小', trigger: 'blur' }],
    videoSize: [{ required: true, message: '请填视频上传大小', trigger: 'blur' }],
    compress: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    audioType: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    videoType: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    setEnclosure()
  }
  // 设置附件
  const setEnclosure = async () => {
    const value = {
      img: {
        type: {
          gif: formState.value.type.indexOf('gif') == -1 ? 0 : 1,
          jpg: formState.value.type.indexOf('jpg') == -1 ? 0 : 1,
          jpge: formState.value.type.indexOf('jpge') == -1 ? 0 : 1,
          png: formState.value.type.indexOf('png') == -1 ? 0 : 1
        },
        upload_size: formState.value.imgSize,
        compress: formState.value.compress
      },
      audio: {
        type: {
          mp3: formState.value.audioType ? 1 : 0
        },
        upload_size: formState.value.audioSize
      },
      video: {
        type: {
          mp4: formState.value.videoType ? 1 : 0
        },
        upload_size: formState.value.videoSize
      }
    }
    await reqSetNearby({
      status: 1,
      value
    })
    message.success('操作成功！')
    getAttachmentSettings()
  }
  //获取附近设置
  const getAttachmentSettings = async () => {
    const { data } = await reqAttachmentSettings()
    const config = data.data.config
    if (config.img.type.gif == '1') {
      formState.value.type.push('gif')
    }
    if (config.img.type.jpg == '1') {
      formState.value.type.push('jpg')
    }
    if (config.img.type.jpge == '1') {
      formState.value.type.push('jpge')
    }
    if (config.img.type.png == '1') {
      formState.value.type.push('png')
    }
    formState.value.imgSize = config.img.upload_size
    formState.value.imgSize = formState.value.imgSize.toString()
    formState.value.compress = config.img.compress == '1'
    formState.value.audioType = config.audio.type.mp3 == '1'
    formState.value.audioSize = config.audio.upload_size
    formState.value.audioSize = formState.value.audioSize.toString()
    formState.value.videoType = config.video.type.mp4 == '1'
    formState.value.videoSize = config.video.upload_size
    formState.value.videoSize = formState.value.videoSize.toString()
  }
  onMounted(() => getAttachmentSettings())
</script>
<style lang="scss" scoped>
  .login-tips {
    line-height: 30px;
    font-size: 12px;
    color: #adadad;
  }
  :deep(.ant-checkbox-wrapper) {
    margin-top: 8px;
    width: 90px;
  }
  :deep(.ant-form-item) {
    margin-bottom: 15px;
  }
</style>
