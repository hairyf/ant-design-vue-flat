<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 10:23:28
 * @LastEditTime: 2021-07-08 14:24:08
 * @Description: 员工列表
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input placeholder="员工姓名/联系方式" v-model="form.name" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="员工角色" v-model="form.state" class="w-192 mx-40">
        <a-select-option value=" ">全部</a-select-option>
        <a-select-option :value="item.id" v-for="(item, index) in roleData" :key="index">{{
          item.name
        }}</a-select-option>
      </cal-input-select>
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-card>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <cal-button
          class="w-144 h-36"
          icon-class="nr-increase"
          type="primary"
          @click="
            $router.push({
              path: 'newStaff',
              query: {
                title: '新增员工'
              }
            })
          "
        >
          新增员工
        </cal-button>
        <!-- <cal-button class="w-128 h-36 ml-28" type="primary"> 导出 </cal-button> -->
        <div class="ml-28">已有员工数量：{{ total }}</div>
        <div class="flex items-center" @click="refreshBtn">
          <cal-button type="link" class="pl-14 pr-4">刷新</cal-button>
          <i
            class="text-sm nr-refresh2 text-primary"
            style="cursor: pointer"
            :class="isRotate ? 'rotate' : ''"
          ></i>
        </div>
      </div>
      <cal-page-select v-model="pageSize" />
    </div>
    <!-- <div class="ml-24 mt-28">
      <cal-checkbox v-model:checked="isSelect" @change="selectAllList">全选当前页</cal-checkbox>
      <cal-button type="link" :disabled="currentList.length == 0">删除</cal-button>
      <cal-button type="link" :disabled="currentList.length == 0">启用</cal-button>
      <cal-button type="link" :disabled="currentList.length == 0">禁用</cal-button>
    </div> -->
    <cal-sticky-layout>
      <cal-table
        class="mt-28 min-h-400"
        :list="list"
        :select="true"
        @checkboxChange="checkboxChange"
        v-model:selectAll="isSelect"
      >
        <cal-table-option title="员工ID" min-width="80px" index="id"></cal-table-option>
        <cal-table-option title="员工姓名" min-width="100px" index="name"> </cal-table-option>

        <cal-table-option title="联系方式" min-width="50px" index="mobile"> </cal-table-option>
        <cal-table-option title="员工角色" min-width="50px" v-slot="{ item }">
          <div v-if="item.group">
            {{ item.group.name }}
          </div>
        </cal-table-option>
        <cal-table-option title="创建时间" min-width="120px" v-slot="{ item }">
          {{ $formatUnix(item.createtime) }}
        </cal-table-option>
        <cal-table-option title="创建者" min-width="120px" v-slot="{ item }">
          {{ item.addmanager?.name }}
        </cal-table-option>
        <cal-table-option title="状态" min-width="50px" v-slot="{ item }">
          <div class="w-48 h-24">
            <cal-switch v-model="item.switch" @change="modifyState(item.id, item.status)">
            </cal-switch>
          </div>
        </cal-table-option>
        <cal-table-option title="操作" min-width="214px" border-left v-slot="{ item }">
          <div>
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="
                $router.push({
                  path: 'newStaff',
                  query: {
                    title: '编辑员工',
                    id: item.id
                  }
                })
              "
              >编辑
            </cal-button>
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="
                $router.push({
                  path: 'statffDetails',
                  query: {
                    id: item.id
                  }
                })
              "
              >查看
            </cal-button>
          </div>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6 mt-14"
            @click="deleteBtn(item.id)"
            >删除
          </cal-button>
        </cal-table-option>
      </cal-table>

      <template #sticky>
        <div class="flex justify-center mt-20">
          <cal-pagination v-model:current="currentPage" :total="total"> </cal-pagination>
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script lang="ts" setup>
  import {
    reqStaffDelete,
    reqStaffList,
    reqStaffStartupDisabled,
    reqRoleDropDown,
    reqStaffDropDown
  } from '@/api/setting'
  import { CalMessageDialog } from '@/components/CustomAntds/CalMessageDialog'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { useForm } from '@ant-design-vue/use'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue-demi'
  const form = ref({
    name: '',
    state: ''
  })
  const roleData = ref<any[]>([])
  const state = ref(false)
  const staffData = ref<any[]>([])
  // 是否全选列表
  const isSelect = ref(false)
  // 列表数据
  // 刷新控制类名
  const isRotate = ref(false)
  // 当前选中的列表
  const currentList = ref<any[]>([])
  // 筛选事件
  const onFilter = () => {
    resetList()
  }
  /** 重置筛选 */
  const { resetFields } = useForm(form.value, {})
  // 刷新
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(() => {
      resetList()
    }, 1000)
  }
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const search = {} as any
      if (form.value.name) {
        search.account = form.value.name
      }
      if (form.value.state) {
        search.group_id = form.value.state
      }
      const { data } = await reqStaffList({
        page: currentPage.value,
        limit: pageSize.value,
        search
      })
      total.value = data.data.total
      if (isRotate.value) {
        isRotate.value = false
        message.success('刷新成功！')
      }
      data.data.data.forEach((item: any) => {
        if (item.status == 1) {
          item.switch = true
        } else {
          item.switch = false
        }
      })
      return data.data.data
    }
  })
  /** 表格 end */
  // 获取角色下拉数据
  reqRoleDropDown({ page: 1, limit: 9999 }).then((res) => {
    roleData.value = res.data.data.data
  })
  // 获取员工下拉数据
  reqStaffDropDown({ page: 1, limit: 9999 }).then((res) => {
    staffData.value = res.data.data.data
  })
  // 全选的勾选事件
  const selectAllList = ({ target: { checked } }: any) => {
    // if (checked) {
    // }
  }
  // 勾选事件
  const checkboxChange = (selectList: any[]) => {
    currentList.value = selectList
    // if (selectList.length == list.value.length) isSelect.value = true
  }
  const deleteBtn = async (id: string) => {
    await CalMessageDialog.warning({
      title: '删除角色',
      content: '您确定删除该角色么？删除以后将无法恢复'
    })
    await reqStaffDelete({
      ids: [id]
    })
    message.success('操作成功！')
    resetList()
  }
  const modifyState = async (id: string, status: string) => {
    await reqStaffStartupDisabled({
      ids: [id],
      params: {
        status: status == '1' ? '0' : '1'
      }
    })
    message.success('操作成功！')
    resetList()
  }
</script>
<style lang="scss" scoped>
  .rotate {
    animation: rotation 1.25s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
