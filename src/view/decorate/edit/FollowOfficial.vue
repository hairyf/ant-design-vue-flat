<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 15:39:35
 * @LastEditTime: 2021-04-23 12:08:58
 * @Description: ？ 笑死
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="关注公众号" icon="ad-follow-official" />
  <edit-card-form title="">
    <div class="view-title">该模块由系统根据设置自动展示，无需编辑</div>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { followOfficialOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof followOfficialOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .view-title {
    width: 100%;
    text-align: center;
    text-align: center;
    line-height: 600px;
  }
</style>
