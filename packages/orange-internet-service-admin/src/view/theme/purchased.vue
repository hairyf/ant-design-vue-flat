<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-09 17:03:14
 * @LastEditTime: 2021-07-06 09:43:37
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input placeholder="主题名称" v-model="form.name" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-section placeholder="主题价格" v-model="form.price" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="主题状态" v-model="form.status" class="w-192 mx-40">
        <a-select-option value="jack">全部</a-select-option>
        <a-select-option value="jack">正常使用</a-select-option>
        <a-select-option value="jack">正常试用</a-select-option>
        <a-select-option value="jack">即将过期</a-select-option>
        <a-select-option value="jack">已过期</a-select-option>
      </cal-input-select>
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-tabs v-model:activeKey="currentTab">
    <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
      <template #tab>
        <span>{{ item.title }}</span>
        <number-tag :state="currentTab === i">
          {{ item.const || 0 }}
        </number-tag>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <cal-tab-pane alone min-height="600">
    <div class="grid gap-24 justify-center" style="grid-template-columns: repeat(auto-fill, 288px)">
      <theme-shop-item v-for="(item, index) in list" :key="index" :option="item">
        <template #footer>
          <div class="flex justify-between">
            <div class="flex items-center">
              <cal-switch
                class="mr-14"
                v-model="item.is_sale"
                @change="onEditUpAndDown(item.id, $event)"
              />
              <span class="text-sm">上架</span>
            </div>
            <span
              class="text-primary cursor-pointer select-none"
              @click="$router.push({ path: '/theme/editTheme', query: { id: item.id } })"
            >
              设置
            </span>
          </div>
        </template>
      </theme-shop-item>
    </div>
    <cal-empty v-if="!list.length" class="mt-100" image="@/assets/img/common/empty.png" />
    <template #sticky>
      <div class="flex justify-center mt-16">
        <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
        </cal-pagination>
      </div>
    </template>
  </cal-tab-pane>
</template>
<script lang="ts" setup>
  import { reqBackendUiThemeList, reqEditThemeItemMulti } from '@/api/theme'
  import { useForm } from '@ant-design-vue/use'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue-demi'
  import NumberTag from '~/CustomAntds/CalThemeIcon/NumberTag.vue'
  import ThemeShopItem from './components/ThemeShopItem.vue'
  /* 筛选项 start */
  const form = ref<any>({
    name: '',
    price: ['', ''],
    status: ''
  })
  const onFilter = () => {
    // console.log(form)
    resetList()
  }
  const { resetFields } = useForm(form.value, {})
  /* 筛选项 end */

  /** 标签页 start */
  const tabs = [
    { title: '全部主题' },
    { title: '已上架', const: 0 },
    { title: '已下架', const: 0 }
    // { title: '待安装', const: 0 }
  ]
  const currentTab = ref(0)
  /** 标签页 end */

  const { list, total, currentPage, pageSize, resetList } = useListPagination({
    getList: async ({ currentPage, pageSize, total }) => {
      const { data } = await reqBackendUiThemeList({
        page: currentPage.value,
        limit: pageSize.value,
        search: {
          name: form.value.name
        }
      })
      total.value = data.data.total
      tabs[0].const = data.data.total
      tabs[1].const = data.data.is_sale_one
      tabs[2].const = data.data.is_sale_zero
      return data.data.data
    },
    init: false
  })
  // 修改当前项上下架
  const onEditUpAndDown = async (id: Key, status: Key) => {
    await reqEditThemeItemMulti(id, status)
    message.success('修改成功!')
  }
  await resetList()
</script>
<style lang="scss"></style>
