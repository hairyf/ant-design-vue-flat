<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-04-23 12:10:04
 * @Description: 备注或者关闭
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 备注 -->
  <div class="note-close-box">
    <el-dialog
      :title="close == 0 ? '备注' : '关闭订单'"
      v-model="show"
      width="800px"
      custom-class="remarks-box"
    >
      <el-input
        v-if="close == 0"
        class="tips-inp"
        type="textarea"
        placeholder="卖家备注（最多输入255字）"
        maxlength="255"
        v-model="remarksTextarea"
      >
      </el-input>
      <template v-if="close == 1">
        <div class="oe-flex protection-tips" v-if="currentItem.is_after_sale == 1">
          <i class="ad-warning"></i>
          <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
        </div>
        <!-- <el-image src="/custom-assets/images/order/tips.png" class="refund-closed-img" /> -->
        <el-input
          class="tips-inp"
          type="textarea"
          placeholder="关闭原因（最多输入50字）"
          maxlength="50"
          v-model="closeText"
        >
        </el-input>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { reqCloseOrder, reqEditNotes } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { ref, watch, computed, defineEmit, defineProps, inject } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    close: {
      type: Number,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    }
  })
  const emit = defineEmit()
  watch(props, () => {
    remarksTextarea.value = props.currentItem.memo
  })
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  // 备注内容
  const remarksTextarea = ref('')
  // 关闭内容
  const closeText = ref('')
  // 确定按钮
  const determineBtn = async () => {
    if (props.close == 0) {
      await reqEditNotes({ id: props.currentItem.id, memo: remarksTextarea.value })
      show.value = false
      resetOrderList?.()
    } else {
      await reqCloseOrder({
        id: props.currentItem.id,
        desc: closeText.value
      })
      show.value = false
      ElMessage.success('操作成功!!')
      emit('resetOrderDetails')
      resetOrderList?.()
    }
  }
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>
<style lang="scss">
  .note-close-box {
    .remarks-box {
      .dialog-footer {
        .el-button {
          min-height: 32px;
          padding: 0 45px;
          font-size: 14px;
        }
      }
      .el-textarea__inner {
        resize: none;
      }
      .el-textarea__inner {
        height: 157px;
      }
      .refund-closed-img {
        position: absolute;
        top: 11px;
        width: 44px;
        height: 44px;
      }
    }
  }
</style>
