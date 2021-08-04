<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 15:15:45
 * @LastEditTime: 2021-07-06 15:05:13
 * @Description: 已购
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="relative" style="min-height: 329px">
    <div class="flex justify-between">
      <div class="flex">
        <div class="mr-14 w-64 h-64">
          <cal-image :src="itemInfo.is_icon == 1 ? itemInfo.image : itemInfo.logo"></cal-image>
        </div>
        <div class="flex flex-col justify-around">
          <div class="text-base">{{ itemInfo.name }}</div>
          <div
            class="px-10 py-2 text-xs text-gray-darkmin bg-gray-darkest bg-opacity-20 rounded-3xl"
          >
            版本 {{ itemInfo.version }}
          </div>
        </div>
      </div>
      <div v-if="!(itemInfo.version_status instanceof Array)">
        <div v-if="itemInfo.currentProgress" style="width: 56px" class="up-loading">
          <a-progress :percent="itemInfo.currentProgress" :show-info="false" />
        </div>
        <div v-else>
          <cal-button
            v-if="itemInfo.version_status.is_install == 0"
            type="primary"
            @click="speedOfProgressChange(itemInfo, 'install')"
          >
            安装
          </cal-button>
          <cal-button
            v-if="
              itemInfo.version_status.is_install == 1 &&
              itemInfo.version_status.version !== itemInfo.version_status.clouds_version
            "
            type="primary"
            @click="speedOfProgressChange(itemInfo, 'update')"
          >
            更新
          </cal-button>
        </div>
      </div>
    </div>
    <div class="mb-10 mt-24">
      <span class="mr-14 w-56">售卖价格</span>
      <span class="text-red w-176">{{ itemInfo?.sale_spec.price }}</span>
    </div>
    <div class="flex">
      <span class="mr-14 w-64">使用时限</span>
      <span class="text-gray-darkmin w-176">{{ itemInfo?.sale_spec.time }}</span>
    </div>
    <div class="flex my-24">
      <span class="mr-14 w-64">应用简介</span>
      <span class="text-gray-darkmin w-176">{{ itemInfo.remark }}</span>
    </div>
    <div
      class="absolute bottom-14 left-20 flex justify-between items-center w-11/12"
      v-if="itemInfo.version_status.is_install != 0"
    >
      <div class="flex items-center">
        <cal-switch v-model="itemInfo.is_sale" @change="changeIsSale" />
        <span class="ml-10">上架</span>
      </div>
      <cal-button
        type="link"
        @click="router.push({ path: '/application/setUp', query: { id: itemInfo.id } })"
        >设置</cal-button
      >
    </div>
  </cal-card>
</template>
<script lang="ts" setup>
  import { computed, ref, defineProps, defineEmit } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import { reqAddonsMulti, reqSystemInstallAddons } from '@/api/application'
  import { message } from 'ant-design-vue'
  const router = useRouter()
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

  const changeIsSale = async (value: any) => {
    try {
      await reqAddonsMulti({ id: props.itemInfo.id, params: { is_sale: value ? 1 : 0 } })
      message.success('更改成功')
    } catch (error) {
      props.resetList()
    }
  }
  // 安装
  const emit = defineEmit(['update:isDisable'])
  const isDisableTabs = computed({
    get: () => props.isDisable,
    set: (value) => emit('update:isDisable', value)
  })
  const speedOfProgressChange = async (data: any, type: string) => {
    let isInstall = false
    isDisableTabs.value = true

    // const timer = setInterval(async () => {
    //   data.currentProgress++
    //   if (data.currentProgress > 80) {
    //     try {
    //       await reqSystemInstallAddons({ unique_key: data.unique_key })
    //       clearInterval(timer)
    //       data.currentProgress = 0
    //       isDisableTabs.value = false
    //       if (type == 'install') {
    //         message.success('安装成功')
    //       } else {
    //         message.success('更新成功')
    //       }
    //     } catch (error) {
    //       clearInterval(timer)
    //       data.currentProgress = 0
    //       isDisableTabs.value = false
    //     }
    //   }
    // }, 200)
    const timer = setInterval(async () => {
      data.currentProgress++
      if (isInstall) {
        clearInterval(timer)
        props.resetList()
        data.currentProgress = 0
        isDisableTabs.value = false
      }
      // if (data.currentProgress >= 100) {
      //   clearInterval(timer)
      //   data.currentProgress = 0
      //   isDisable.value = false
      // }
    }, 50)
    try {
      await reqSystemInstallAddons({ unique_key: data.unique_key })
      isInstall = true
      if (type == 'install') {
        message.success('安装成功')
      } else {
        message.success('更新成功')
      }
    } catch (error) {
      isInstall = true
    }
  }
</script>
<style lang="scss" scoped>
  .up-loading {
    :deep(.ant-progress-bg) {
      height: 32px !important;
      background-color: var(--color-primary);
    }
  }
</style>
