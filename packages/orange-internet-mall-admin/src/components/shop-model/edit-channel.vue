<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-08 17:15:07
 * @LastEditTime: 2021-05-08 17:43:22
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog title="编辑模板" v-model="show" width="30%">
    <div style="height: 40px" />
    <el-form>
      <el-form-item label="选择发布渠道">
        <el-checkbox-group v-model="channeList">
          <el-checkbox label="H5">H5</el-checkbox>
          <el-checkbox label="Wechat">公众号</el-checkbox>
          <el-checkbox label="WechatApplets">小程序</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="saveDecorateInfo">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { reqDecorateSave } from '@/api/shop'
  import { awaitPromise } from '@/utils'
  import { ref } from '@vue/reactivity'
  import { computed, defineEmit, defineProps } from '@vue/runtime-core'
  import { ElMessage } from 'element-plus'
  import { cloneDeep } from 'lodash'
  const props = defineProps({
    modelValue: Boolean,
    id: {
      type: [String, Number],
      required: true
    },
    channels: {
      type: Array as () => any[],
      required: true
    },
    content: {
      type: Object
    }
  })
  const emit = defineEmit(['confirm', 'update:modelValue'])
  // 当前渠道列表
  const channeList = ref(cloneDeep(props.channels))
  // 是否弹出修改渠道
  const show = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  const saveDecorateInfo = async () => {
    try {
      await reqDecorateSave({
        id: props.id,
        channel_list: channeList.value,
        content: props.content
      })
      ElMessage.success('保存成功!')
      show.value = false
      await awaitPromise(500)
      emit('confirm')
    } catch (error) {
      channeList.value = cloneDeep(props.channels)
    }
  }
</script>
