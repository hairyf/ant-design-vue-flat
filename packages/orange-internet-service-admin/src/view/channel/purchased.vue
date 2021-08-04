<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 11:38:20
 * @LastEditTime: 2021-07-10 16:51:01
 * @Description: 已购渠道
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form>
    <div class="flex flex-wrap">
      <div>
        <cal-input placeholder="渠道名称" v-model="form.name" class="w-208 mr-80" />
      </div>
      <div class="flex items-center">
        <cal-input-section
          openAutoSize
          placeholder="渠道价格"
          v-model="form.price"
          class="mr-80 w-208"
        />
      </div>
    </div>
    <div class="my-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onSubmit">筛选</cal-button>
      <cal-button class="w-112" @click="resetCondition">重置条件</cal-button>
    </div>
  </a-form>

  <cal-tabs v-model:activeKey="form.is_sale">
    <cal-tab-pane v-for="(item, i) in tabs" :key="item.status" hide :disabled="isDisable">
      <template #tab>
        <span>{{ item.title }}</span>
        <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i !== 0">
          {{ item.count || 0 }}
        </cal-theme-icon>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <cal-card class="rounded-tl-none">
    <cal-sticky-layout min-height="550">
      <div
        class="grid gap-24 justify-center"
        style="grid-template-columns: repeat(auto-fill, 288px)"
      >
        <div v-for="(item, index) in pluginList" :key="Number(index)">
          <cal-card style="min-height: 315px">
            <div class="flex justify-between">
              <div class="flex">
                <div class="mr-14 w-64 h-64">
                  <cal-image :src="item.is_icon == 1 ? item.image : item.logo" />
                </div>
                <div class="flex flex-col justify-around">
                  <div class="text-base">{{ item.name }}</div>
                </div>
              </div>
              <!-- <div v-if="item.is_installed == 0">
                <div v-if="item.currentProgress" style="width: 56px" class="up-loading">
                  <a-progress :percent="item.currentProgress" :show-info="false" />
                </div>
                <cal-button v-else type="primary" @click="speedOfProgressChange(item)">
                  安装
                </cal-button>
              </div> -->
              <div v-if="!(item.version_status instanceof Array) && item.key != 'WechatApplets'">
                <div v-if="item.currentProgress" style="width: 56px" class="up-loading">
                  <a-progress :percent="item.currentProgress" :show-info="false" />
                </div>
                <div v-else>
                  <cal-button
                    v-if="item.version_status.is_install == 0"
                    type="primary"
                    @click="speedOfProgressChange(item, 'install')"
                  >
                    安装
                  </cal-button>
                  <cal-button
                    v-if="
                      item.version_status.is_install == 1 &&
                      item.version_status.version !== item.version_status.clouds_version
                    "
                    type="primary"
                    @click="speedOfProgressChange(item, 'update')"
                  >
                    更新
                  </cal-button>
                </div>
              </div>
            </div>
            <div class="mb-10 mt-24">
              <span class="mr-14 w-56">售卖价格</span>
              <span class="text-red w-176">{{ item.sale_spec.price }}</span>
            </div>
            <div class="flex">
              <span class="mr-14 w-64">使用时限</span>
              <span class="text-gray-darkmin w-176">{{ item.sale_spec.time }}</span>
            </div>
            <div class="flex my-24">
              <span class="mr-14 w-64">应用简介</span>
              <span class="text-gray-darkmin w-176">{{ item.remark }}</span>
            </div>
            <!-- <div
              class="absolute bottom-14 left-20 flex justify-between items-center w-11/12"
              v-if="item.is_installed == 1"
            >
              <div class="flex items-center">
                <cal-switch v-model="item.is_sale" @change="changeIsSale(item)" />
                <span class="ml-10">上架</span>
              </div>
              <div>
                <cal-button
                  v-if="item.key == 'WechatApplets'"
                  type="link"
                  @click="router.push('/channel/administrationApplets')"
                >
                  管理
                </cal-button>
                <cal-button
                  type="link"
                  @click="router.push({ path: '/channel/setup', query: { id: item.id } })"
                >
                  设置
                </cal-button>
              </div>
            </div> -->
            <div class="absolute bottom-14 left-20 flex justify-between items-center w-11/12">
              <div class="flex items-center">
                <cal-switch v-model="item.is_sale" @change="changeIsSale(item)" />
                <span class="ml-10">上架</span>
              </div>
              <div>
                <cal-button
                  v-if="item.key == 'WechatApplets'"
                  type="link"
                  @click="router.push('/channel/administrationApplets')"
                >
                  管理
                </cal-button>
                <cal-button
                  type="link"
                  @click="router.push({ path: '/channel/setup', query: { id: item.id } })"
                >
                  设置
                </cal-button>
              </div>
            </div>
          </cal-card>
        </div>
      </div>
      <cal-empty v-if="!pluginList.length" class="mt-100" image="@/assets/img/common/empty.png" />
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue-demi'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import { useRouter } from 'vue-router'
  import { reqChannelIndex, reqChannelMulti, reqSystemInstallInstall } from '@/api/channel'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  const router = useRouter()
  const form = ref({
    name: '',
    price: [],
    is_sale: '' as Key
  })

  /** 表格*/
  const {
    list: pluginList,
    total,
    currentPage,
    resetList,
    pageSize
  } = useListPagination({
    getList: async (): Promise<any[]> => {
      const { data } = await reqChannelIndex({
        page: currentPage.value,
        limit: pageSize.value,
        search: {
          ...form.value,
          price: form.value.price.join()
        }
      })
      tabs.value[1].count = data.data.is_sale_one
      tabs.value[2].count = data.data.is_sale_zero
      tabs.value[3].count = data.data.is_installed_count
      tabs.value[4].count = data.data.is_update_count
      total.value = data.data.total
      const res = data.data.data
      res.forEach((item: any) => {
        item.currentProgress = 0
      })
      return res
    }
  })
  // 上下架
  const changeIsSale = async (item: any) => {
    try {
      await reqChannelMulti({ id: item.id, params: { is_sale: item.is_sale } })
      message.success('更改成功')
    } catch (error) {
      resetList()
    }
  }
  const activeKey = ref(0)
  //列表渲染
  const tabs = ref([
    {
      title: '全部渠道',
      item: [],
      status: ''
    },
    {
      title: '已上架',
      count: 0,
      item: [],
      status: 1
    },
    {
      title: '已下架',
      count: 0,
      item: [],
      status: 0
    },
    {
      title: '待安装',
      count: 0,
      item: [],
      status: 2
    },
    {
      title: '待更新',
      count: 0,
      item: [],
      status: 3
    }
  ])
  // 安装
  const isDisable = ref(false)
  const speedOfProgressChange = async (data: any, type: string) => {
    let isInstall = false
    isDisable.value = true
    const uniKey = data.key == 'H5' ? 'h5' : 'gzh'

    const timer = setInterval(async () => {
      data.currentProgress++
      if (isInstall) {
        clearInterval(timer)
        resetList()
        data.currentProgress = 0
        isDisable.value = false
      }
      // if (data.currentProgress >= 100) {
      //   clearInterval(timer)
      //   data.currentProgress = 0
      //   isDisable.value = false
      // }
    }, 50)
    try {
      await reqSystemInstallInstall({ unique_key: uniKey })
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
  // 筛选
  const onSubmit = () => {
    resetList()
  }
  // 重置条件
  const resetCondition = () => {
    form.value.name = ''
    form.value.price = []
  }

  watch([() => form.value.is_sale], resetList)
</script>
<style lang="scss" scoped>
  .up-loading {
    :deep(.ant-progress-bg) {
      height: 32px !important;
      background-color: var(--color-primary);
    }
  }
  // .upload-fail {
  //   :deep(.ant-progress-bg) {
  //     height: 32px !important;
  //     background-color: #f00;
  //   }
  // }
</style>
