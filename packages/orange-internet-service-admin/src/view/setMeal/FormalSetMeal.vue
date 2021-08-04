<!--
 * @Author: Zhilong
 * @Date: 2021-05-29 15:57:02
 * @LastEditTime: 2021-07-12 15:25:09
 * @Description: 正式套餐
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->

<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input placeholder="套餐ID/套餐名称" v-model="form.keyword" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="套餐类型" v-model="form.is_tryout" class="w-192 mx-40">
        <a-select-option value="">全部</a-select-option>
        <a-select-option :value="0">正式套餐</a-select-option>
        <a-select-option :value="1">试用套餐</a-select-option>
      </cal-input-select>
    </a-form-item>
    <a-form-item>
      <cal-input-section placeholder="售卖价格" v-model="form.price" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-section placeholder="店铺数量" v-model="form.use_num" class="w-192 mx-40" />
    </a-form-item>
    <!-- <a-form-item>
      <cal-input-select placeholder="操作人" v-model="form.admin" class="w-192 mx-40">
        <a-select-option :value="null">全部</a-select-option>
        <a-select-option value="jack">超级管理员</a-select-option>
      </cal-input-select>
    </a-form-item> -->
    <a-form-item>
      <cal-input-date
        placeholder="创建时间"
        v-model="form.createtime"
        to-second
        class="w-192 mx-40"
      />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-tabs v-model:activeKey="activeKey" @change="tabsOnChange">
    <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
      <template #tab>
        <span>{{ item.title }}</span>
        <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i !== 0">
          {{ item.count || 0 }}
        </cal-theme-icon>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <!-- table固定内容 -->
  <cal-tab-pane alone :min-height="500">
    <div class="flex justify-between">
      <div>
        <cal-button
          class="w-144 mr-28"
          icon-class="nr-increase"
          type="primary"
          @click="
            $router.push({
              path: 'SetMealDetails',
              query: {
                title: '新增正式套餐',
                mode: 'add',
                type: 'formal'
              }
            })
          "
        >
          新增正式套餐
        </cal-button>
        <cal-button
          class="w-144"
          icon-class="nr-increase"
          type="primary"
          @click="
            $router.push({
              path: 'SetMealDetails',
              query: {
                title: '新增试用套餐',
                mode: 'add',
                type: 'trial'
              }
            })
          "
        >
          新增试用套餐
        </cal-button>
      </div>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-table class="mt-28" contentAlign="left" :list="list" :min-width="1400" sync-space>
      <cal-table-option title="套餐ID" min-width="70" index="id" sort v-slot="{ item }">
        {{
          Number(item.id) < 10 ? '00' + item.id : Number(item.id) < 100 ? '0' + item.id : item.id
        }}
      </cal-table-option>
      <cal-table-option title="套餐名称" index="name" min-width="100" />
      <cal-table-option title="套餐类型" index="is_tryout" min-width="88" v-slot="{ content }">
        {{ ['正式套餐', '试用套餐'][content] }}
      </cal-table-option>
      <cal-table-option title="套餐状态" index="is_sale" min-width="66" v-slot="{ content }">
        <span v-if="content == 0" style="color: #f00">已下架</span>
        <span v-else style="color: #1ad370">已上架</span>
      </cal-table-option>
      <cal-table-option
        title="售卖规格"
        min-width="120"
        index="sale_spec"
        v-slot="{ content, item }"
      >
        <template v-if="item.is_tryout == 0">
          <!-- 正式套餐 -->
          <span v-for="item in content || []" :key="item.id">
            ￥{{ item?.price || '~' }}/{{ item?.type == 4 ? '' : item.nums || '' }}
            {{ ['~', '天', '月', '年', '永久'][item?.type || 0] }}
          </span>
        </template>
        <span v-else> 试用{{ item.tryout_days || '~' }}天 </span>
      </cal-table-option>
      <cal-table-option title="店铺数量" index="use_num" min-width="66" />
      <cal-table-option
        title="创建时间"
        min-width="145"
        index="createtime"
        sort
        v-slot="{ content }"
      >
        {{ $formatUnix(content) }}
      </cal-table-option>
      <cal-table-option title="操作" min-width="186" border-left v-slot="{ item, index }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="
              $router.push({
                path: 'SetMealDetails',
                query: {
                  title: '查看套餐',
                  mode: 'see',
                  type: ['formal', 'trial'][item.is_tryout],
                  id: item.id
                }
              })
            "
          >
            查看
          </cal-button>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="aleftStatus(item.id, item.is_sale, item)"
          >
            {{ saleStatus[item.is_sale] }}
          </cal-button>
          <!-- <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="$router.push('SetMealDetails?title=编辑套餐&type=edit&id=' + item.id)"
          >
            编辑
          </cal-button> -->
          <cal-button
            v-if="item.is_sale == 0"
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="deleteItem(item.id, item.use_num, index)"
          >
            删除
          </cal-button>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="
              $router.push({
                path: 'SetMealDetails',
                query: {
                  title: '复制新增套餐',
                  mode: 'fromAdd',
                  type: ['formal', 'trial'][item.is_tryout],
                  id: item.id
                }
              })
            "
          >
            复制新增
          </cal-button>
        </div>
      </cal-table-option>
    </cal-table>
    <template #sticky>
      <div class="flex justify-center">
        <cal-pagination v-model="currentPage" :total="total" v-model:pageSize="pageSize" />
      </div>
    </template>
  </cal-tab-pane>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue-demi'
  import { useForm } from '@ant-design-vue/use'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { reqDeleteSetMeal, reqSwitchSetMeal, reqSetMealList } from '@/api/setMeal'
  import { message } from 'ant-design-vue'
  import { handelSection } from '@/utils/index'
  const form = reactive({
    keyword: '',
    price: ['', ''],
    use_num: ['', ''],
    // admin: '',
    createtime: '',
    is_tryout: ''
  })

  const is_sale = ref<string | number>('')

  const saleStatus = ['上架', '下架']
  /* 数据列表 */
  const { total, list, pageSize, currentPage, resetList } = useListPagination({
    async getList({ pageSize, currentPage }) {
      const { data } = await reqSetMealList({
        limit: pageSize.value,
        page: currentPage.value,
        search: {
          ...form,
          is_sale: is_sale.value,
          price: handelSection(form.price),
          use_num: handelSection(form.use_num),
          createtime: form.createtime
        }
      })
      total.value = data.data.total
      tabs.value[0].count = data.data.count.all
      tabs.value[1].count = data.data.count.normal
      tabs.value[2].count = data.data.count.suspension
      return data.data.data
    }
  })

  /* 切换列表 */
  const tabsOnChange = (i: Event) => {
    if (+i === 1) {
      is_sale.value = 1
    } else if (+i === 2) {
      is_sale.value = 0
    } else {
      is_sale.value = ''
    }
    resetList()
  }

  // 开始筛选
  const onFilter = () => {
    resetList()
  }

  const { resetFields } = useForm(form, {})

  /* 删除元素 */
  const deleteItem = async (id: number, use_num: number, index: number) => {
    if (!use_num) {
      await CalMessageDialog.warning({
        title: '删除套餐',
        content: '您确认要删除该套餐么？<br/>删除后将无法恢复'
      })
      await reqDeleteSetMeal({ ids: [id] })
      await resetList()
      // list.value.splice(index, 1)
      message.success('删除成功')
    } else {
      CalMessageDialog.warning({
        title: '删除套餐',
        content: `当前套餐有<span class="mx-2 text-primary">${use_num}</span>家店铺正在使用该套餐<br/>无法删除该套餐`
      })
    }
  }

  const activeKey = ref(0)

  /* 处理模态框 */
  const aleftStatus = async (id: number, status: number, item: any) => {
    await CalMessageDialog.warning({
      title: saleStatus[status],
      content: status
        ? '您确认要下架该套餐吗？下架后商户将无法购买，已购买过的商户可以继续使用'
        : '您确认上架该套餐么？'
    })
    await reqSwitchSetMeal({ ids: [id], is_sale: [1, 0][status] })
    await resetList()
    // item.is_sale = [1, 0][status]
    message.success(`${saleStatus[status]}成功`)
  }

  //列表渲染
  const tabs = ref([
    {
      title: '全部套餐',
      count: 0,
      item: []
    },
    {
      title: '已上架',
      count: 0,
      item: []
    },
    {
      title: '已下架',
      count: 0,
      item: []
    }
  ])
</script>
