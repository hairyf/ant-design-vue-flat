<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 15:15:45
 * @LastEditTime: 2021-07-10 18:06:07
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="relative w-500">
    <div class="text-base mb-28">{{ itemInfo.name }}</div>
    <div class="flex">
      <div class="mr-20" style="width: 138px; height: 250px">
        <cal-image
          :src="itemInfo.logo"
          :fallback="errorImage"
          style="width: 138px; height: 250px"
        ></cal-image>
      </div>
      <div class="flex-1">
        <cal-sticky-layout min-height="100%">
          <div class="my-24 flex">
            <span class="mr-14 text-right" style="width: 64px">售卖价格</span>
            <span class="text-red w-176">{{ itemInfo.sale_spec.price }}</span>
          </div>
          <div class="my-24 flex">
            <span class="mr-14 text-right" style="width: 64px">购买量</span>
            <span class="text-gray-darkmin w-176">{{ itemInfo.sale_num }}</span>
          </div>
          <div class="flex my-24">
            <span class="mr-14 text-right" style="width: 64px">应用简介</span>
            <span class="text-gray-darkmin w-176">{{ itemInfo.remark }}</span>
          </div>
          <template #sticky>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <cal-switch v-model="itemInfo.is_sale" @change="changeIsSale" />
                <span class="ml-10">上架</span>
              </div>
              <div class="flex- items-center">
                <div v-if="itemInfo.currentProgress" style="width: 56px" class="up-loading">
                  <a-progress :percent="itemInfo.currentProgress" :show-info="false" />
                </div>
                <cal-button
                  type="link"
                  @click="
                    $router.push({ path: '/template/setTemplate', query: { id: itemInfo.id } })
                  "
                >
                  设置
                </cal-button>
              </div>
            </div>
          </template>
        </cal-sticky-layout>
      </div>
    </div>
  </cal-card>
</template>
<script lang="ts" setup>
  import { computed, defineProps, defineEmit } from 'vue-demi'
  import { reqTemplateMulti } from '@/api/template'
  import { message } from 'ant-design-vue'
  import errorImage from '@/assets/img/template/template-default-image.png'
  const props = defineProps({
    itemInfo: {
      type: Object,
      required: true
    },
    itemIndex: {
      type: Number as any,
      required: true
    },
    resetList: {
      type: Function,
      required: true
    },
    isDisable: {
      type: Boolean,
      required: true
    }
  })
  const emit = defineEmit(['update:isDisable'])
  const changeIsSale = async (value: any) => {
    try {
      await reqTemplateMulti({ id: props.itemInfo.id, params: { is_sale: value ? 1 : 0 } })
      message.success('更改成功')
      props.resetList()
    } catch (error) {
      props.resetList()
    }
  }
</script>
<style lang="scss" scoped>
  :deep(.ant-image) {
    width: 100%;
    height: 100%;
  }
  .up-loading {
    :deep(.ant-progress-bg) {
      height: 32px !important;
      background-color: var(--color-primary);
    }
  }
</style>
