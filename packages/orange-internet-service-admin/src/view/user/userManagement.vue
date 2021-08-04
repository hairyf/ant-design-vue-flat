<!--
 * @Author: Mr.wang
 * @Date: 2021-05-28 15:47:29
 * @LastEditTime: 2021-07-10 16:40:45
 * @Description: 用户管理
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-list">
    <a-form class="-ml-40 flex flex-wrap">
      <a-form-item>
        <cal-input placeholder="用户ID/账号/姓名/手机号码" v-model="form.id" class="w-192 mx-40" />
      </a-form-item>
      <a-form-item>
        <cal-input placeholder="营业/试用店铺数" v-model="form.num" class="w-192 mx-40" />
      </a-form-item>
      <!-- <a-form-item>
        <cal-input-select placeholder="注册来源" v-model="form.source" class="w-192 mx-40">
          <a-select-option value="jack">Jack</a-select-option>
        </cal-input-select>
      </a-form-item>
      <a-form-item>
        <cal-input-select placeholder="操作人" v-model="form.operator" class="w-192 mx-40">
          <a-select-option value="jack">Jack</a-select-option>
        </cal-input-select>
      </a-form-item> -->
      <a-form-item>
        <cal-input-date placeholder="创建时间" v-model="form.createTime" class="w-192 mx-40" />
      </a-form-item>
    </a-form>
    <div class="mb-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
      <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
    </div>
    <cal-tabs v-model:activeKey="activeKey">
      <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
        <template #tab>
          <span>{{ item.title }}</span>
          <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i !== 0">
            {{ item.const }}
          </cal-theme-icon>
        </template>
      </cal-tab-pane>
    </cal-tabs>
    <!-- table 固定内容 -->
    <cal-tab-pane alone min-height="600">
      <div class="flex justify-between">
        <div class="flex-1">
          <cal-button
            class="w-144 h-36 mr-28 text-base"
            icon-class="nr-increase"
            type="primary"
            @click="$router.push('newUser')"
          >
            新增用户
          </cal-button>
          <cal-button class="w-144 h-36 mr-10 text-base" type="primary" @click="exportBtn">
            导出
          </cal-button>
        </div>
        <cal-page-select v-model="pageSize" />
      </div>
      <cal-table class="mt-28" :list="list">
        <cal-table-option title="用户ID" min-width="98px" sort index="id"></cal-table-option>
        <cal-table-option title="账号" min-width="90px" index="username"></cal-table-option>
        <cal-table-option title="用户姓名" min-width="115px" index="nickname"> </cal-table-option>
<!--        <cal-table-option title="姓名" min-width="100px">姓名</cal-table-option>-->
        <cal-table-option title="手机号码" min-width="150px" index="mobile"> </cal-table-option>
        <cal-table-option title="营业店铺数" min-width="120px" index="shop_num"> </cal-table-option>
        <!-- <cal-table-option title="注册来源" min-width="110px"> 自主注册 </cal-table-option>
        <cal-table-option title="操作人" min-width="90px"> 超级管理员 </cal-table-option> -->
        <cal-table-option
          title="创建时间"
          min-width="180px"
          sort
          index="createtime"
          v-slot="{ item }"
        >
          {{ $formatUnix(item.createtime) }}
        </cal-table-option>
        <cal-table-option title="操作" min-width="214px" border-left v-slot="{ item }">
          <div>
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="
                $router.push({
                  path: 'userDetails',
                  query: { id: item.id, title: activeKey == 1 ? '会员用户详情' : '普通用户详情' }
                })
              "
              >查看</cal-button
            >
            <!-- <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="deleteBtn(item.id, item.nickname)"
              >删除</cal-button
            > -->
          </div>
        </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
          </cal-pagination>
        </div>
      </template>
    </cal-tab-pane>
  </div>
</template>
<script lang="ts" setup>
  import { useForm } from '@ant-design-vue/use'
  import { reqUserList, reqUserExport } from '@/api/user'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref, watch } from 'vue-demi'
  import { CalMessageDialog } from '~/CustomAntds/CalMessageDialog'
  import dayjs from 'dayjs'
  import { exportReport } from '@/utils/vue-utils'
  const form = ref({
    // 用户ID/账号/姓名/手机号码
    id: '',
    // 营业/试用店铺数
    num: '',
    // 注册来源
    source: '',
    // 操作人
    operator: '',
    // 创建时间
    createTime: ''
  })
  const { resetFields } = useForm(form.value, {})
  // 开始筛选
  const onFilter = () => {
    resetList()
  }
  const activeKey = ref(0)
  //列表渲染
  const tabs = ref([
    { title: '会员用户', const: 0 },
    { title: '普通用户', const: 0 }
  ])
  const deleteBtn = (id: string, name: string) => {
    CalMessageDialog.warning({
      title: '删除用户',
      content: `您确定要把用户<span style="color:red;">${name}</span> 删除么？<br/>确认删除后，该用户的所有数据将被删除`
    })
  }
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqUserList({
        page: currentPage.value,
        search: form.value.id,
        createtime: form.value.createTime ? dayjs(Number(form.value.createTime)).unix() : '',
        shop_nums: form.value.num,
        limit: pageSize.value,
        is_member: activeKey.value == 1 ? 0 : 1
      })
      tabs.value[0].const = data.data.member_num
      tabs.value[1].const = data.data.general_num
      total.value = data.data.total
      return data.data.data
    }
  })
  /** 表格 end */
  const exportBtn = async () => {
    const { data } = await reqUserExport({
      search: form.value.id,
      createtime: form.value.createTime ? dayjs(Number(form.value.createTime)).unix() : '',
      shop_nums: form.value.num,
      page: currentPage.value,
      is_member: activeKey.value == 1 ? 0 : 1,
      limit: pageSize.value
    })
    exportReport(data, '用户管理')
  }
  watch(activeKey, () => {
    resetList()
  })
</script>
<style lang="scss" scoped></style>
