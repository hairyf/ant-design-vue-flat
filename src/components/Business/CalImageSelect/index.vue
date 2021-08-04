<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 17:47:34
 * @LastEditTime: 2021-06-26 14:53:14
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog
    :width="1200"
    v-model="showModal"
    @ok="onConfirm()"
    @cancel="onClone"
    :show-footer="multiple"
    title="图片选择器"
  >
    <div class="flex justify-between mb-28">
      <div class="flex items-center">
        <cal-button class="mr-10" type="primary" size="small" @click="onClickUpload">
          上传图片
        </cal-button>
        <div class="text-gray-darkmin text-xs"
          >图片大小不要超过{{ imgSize }}kb ，支持图片格式
          <span v-for="(item, index) in limitImgList" :key="Number(index)">
            {{ index != 0 ? '/' : '' }}{{ item }}
          </span>
        </div>
      </div>
      <cal-input class="w-160" placeholder="请输入图片名称" v-model="searchText">
        <template #suffix>
          <i class="cursor-pointer nr-search" @click="resetList" />
        </template>
      </cal-input>
    </div>
    <cal-card class="w-full">
      <cal-sticky-layout :min-height="420">
        <div
          class="grid gap-24 justify-center"
          style="grid-template-columns: repeat(auto-fill, 100px)"
        >
          <div class="w-100" v-for="(item, index) in list" :key="index">
            <select-state-box
              @click="onClickItem(index)"
              class="cursor-pointer"
              :state="item.select"
              border
              border-radius="8"
              tag-size="32"
            >
              <cal-image :src="item.path.url" :width="100" :height="100" />
              <template #state>
                <cal-button size="small">取消选择</cal-button>
              </template>
              <template #hover>
                <div class="cal-delect-box" @click.stop="onClickDelete(item.id)"> 删除 </div>
              </template>
            </select-state-box>
            <div class="truncate max-w-100 text-xs text-center select-none"> 0102.JPG </div>
          </div>
        </div>
        <cal-empty class="mt-100" v-if="!list.length" description="暂无图片" />
        <template #sticky>
          <div class="flex justify-center">
            <cal-pagination v-model="currentPage" v-model:pageSize="pageSize" :total="total" />
          </div>
        </template>
      </cal-sticky-layout>
    </cal-card>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineEmit, defineProps, ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import CalButton from '~/CustomAntds/CalButton/index.vue'
  import CalInput from '~/CustomAntds/CalInput/index.vue'
  import CalCard from '~/CustomAntds/CalCard/index.vue'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import CalStickyLayout from '~/Bases/CalStickyLayout/index.vue'
  import CalImage from '~/CustomAntds/CalImage/index.vue'
  import CalEmpty from '~/CustomAntds/CalEmpty/index.vue'
  import SelectStateBox from '~/CustomAntds/CalThemeIcon/SelectStateBox.vue'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import type { MultipleSelectList } from '@/hooks/use-multiple-select'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { selectImages } from '@/utils'
  import { reqAttachmentSettings } from '@/api/setting'
  import { message } from 'ant-design-vue'
  import { reqUploadFile, reqImageList, reqDeleteImage } from '@/api/common'

  const emit = defineEmit()
  const props = defineProps({
    // 是否展示组件
    modelValue: {
      type: Boolean,
      default: undefined
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 组件消失时(实例方法 > 移除实例)
    onVanish: Function,
    // 组件调用成功事件
    onResolve: Function,
    // 组件调用失败事件
    onReject: Function
  })
  const limitImgList = ref<any>([])
  const imgSize = ref()
  // 双向数据绑定, 假如该值不存在, 则创建值
  const showModal = useModelRef(props, 'modelValue')
  // 隐藏时, 触发 props 中的组件移除
  watch(showModal, (value) => {
    if (value) return false
    setTimeout(() => props.onVanish?.(), 300)
  })
  // 关闭事件
  const onClone = () => {
    props.onReject?.()
    emit('cancel', false)
    showModal.value = false
  }
  // 确定事件
  const onConfirm = (items = selectItems.value) => {
    props.onResolve?.(items)
    emit('ok', items)
    showModal.value = false
  }
  // 点击项事件
  const onClickItem = (index: number) => {
    if (!props.multiple) {
      onConfirm([list.value[index]])
      return false
    }
    list.value[index].select = !list.value[index].select
  }
  const searchText = ref('')
  const { list, resetList, currentPage, pageSize, total } = useListPagination({
    getList: async (): Promise<MultipleSelectList> => {
      const { data } = await reqImageList({
        type: 1,
        page: currentPage.value,
        limit: pageSize.value,
        searchname: searchText.value
      })
      total.value = data.data.count
      return data.data.list
    }
  })
  const { selectItems } = useMultipleSelect(list)
  const onClickUpload = async () => {
    const files = await selectImages()
    const isImages = files.some((v) => v.type.search('image') !== -1)
    const isAccordSize = files.some((v) => v.size / 1000 / 1024 < imgSize.value)
    if (!isImages) return message.warning('请选择图片!')
    if (!isAccordSize) return message.warning('图片超出大小!')
    await Promise.all(files.map((v) => reqUploadFile(v)))
    await message.success('上传成功!', 1.5)
    resetList()
  }
  const getAttachmentSettings = async () => {
    const { data } = await reqAttachmentSettings()
    const config = data.data.config
    if (config.img.type.gif == '1') {
      limitImgList.value.push('gif')
    }
    if (config.img.type.jpg == '1') {
      limitImgList.value.push('jpg')
    }
    if (config.img.type.jpge == '1') {
      limitImgList.value.push('jpge')
    }
    if (config.img.type.png == '1') {
      limitImgList.value.push('png')
    }
    imgSize.value = config.img.upload_size
  }
  getAttachmentSettings()
  const onClickDelete = async (id: Key) => {
    await reqDeleteImage({ type: 1, is_real: 1, delete_groups: [1], delete_ids: [id] })
    await resetList()
    await message.success('删除成功!', 1.5)
  }
</script>
<style lang="scss" scoped>
  .cal-delect-box {
    @apply h-32 w-full bg-black bg-opacity-40 absolute bottom-0 flex items-center justify-center text-white text-xs select-none;
  }
</style>
