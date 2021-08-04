<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 10:23:17
 * @LastEditTime: 2021-07-09 18:43:39
 * @Description: 角色列表
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <!-- <a-form-item>
      <cal-input-select placeholder="角色名称" v-model="form.name" class="w-192 mx-40">
        <a-select-option value="jack">Jack</a-select-option>
      </cal-input-select>
    </a-form-item> -->
    <a-form-item>
      <cal-input-select placeholder="角色名称" v-model="form.name" class="w-192 mx-40">
        <a-select-option value=" ">全部</a-select-option>
        <a-select-option :value="item.name" v-for="(item, index) in roleData" :key="index">{{
          item.name
        }}</a-select-option>
      </cal-input-select>
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="状态" v-model="form.status" class="w-192 mx-40">
        <a-select-option value=" ">全部</a-select-option>
        <a-select-option value="1">启用</a-select-option>
        <a-select-option value="0">禁用</a-select-option>
      </cal-input-select>
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="resetList()">筛选</cal-button>
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
              path: '/setting/jurisdiction/newRole',
              query: {
                title: '新增角色'
              }
            })
          "
        >
          新增角色
        </cal-button>
        <div class="ml-28">已有角色数量：{{ total }}</div>
        <div class="flex items-center" @click="refreshBtn">
          <cal-button type="link" class="px-4">刷新</cal-button>
          <i
            class="text-sm nr-refresh2 text-primary"
            style="cursor: pointer"
            :class="isRotate ? 'rotate' : ''"
          ></i>
        </div>
      </div>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-sticky-layout class="min-h-477">
      <cal-table class="mt-28" :list="list" :space="60" sync-space>
        <cal-table-option title="角色名称" index="name" min-width="100px" v-slot="{ item }">
          <!-- <div class="flex items-center name-box">
            <div
              class="
                w-24
                h-24
                bg-primary
                leading-6
                text-background text-sm text-center
                rounded
                move
              "
            >
              官
            </div>
            <div>高级管理员</div>
          </div> -->
          {{ item.name }}
        </cal-table-option>
        <cal-table-option title="角色描述" min-width="400px" index="explain"></cal-table-option>
        <cal-table-option title="员工数量" min-width="50px" index="access_count">
        </cal-table-option>
        <cal-table-option title="状态" min-width="50px" v-slot="{ item }">
          <div
            class="w-48 h-24 cursor-pointer"
            @click="modifyState(item.id, item.status, item.access_count)"
          >
            <cal-image src="@/assets/img/system/disable.png" v-if="!item.switch"> </cal-image>
            <cal-image src="@/assets/img/system/enable.png" v-if="item.switch"> </cal-image>
            <!-- <cal-switch v-model="item.switch"> </cal-switch> -->
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
                  path: '/setting/jurisdiction/newRole',
                  query: {
                    title: '编辑角色',
                    id: item.id
                  }
                })
              "
              >编辑</cal-button
            >
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="deleteBtn(item.id)"
              >删除</cal-button
            >
          </div>
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
    reqRoleList,
    reqRoleDelete,
    reqRoleStartupDisabled,
    reqRoleDropDown
  } from '@/api/setting'
  import { useForm } from '@ant-design-vue/use'
  import { CalMessageDialog } from '@/components/CustomAntds/CalMessageDialog'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue-demi'
  const isRotate = ref(false)
  const form = ref({
    name: '',
    status: ''
  })
  const { resetFields } = useForm(form.value, {})
  const roleData = ref()
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const search = {} as any
      if (form.value.name) {
        search.name = form.value.name
      }
      if (form.value.status) {
        search.status = form.value.status
      }
      const { data } = await reqRoleList({
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
  // 获取角色下拉数据
  reqRoleDropDown({ page: 1, limit: 9999 }).then((res) => {
    roleData.value = res.data.data.data
  })
  /** 表格 end */
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(() => {
      resetList()
    }, 1000)
  }
  const deleteBtn = async (id: string) => {
    await CalMessageDialog.warning({
      title: '删除角色',
      content: '您确定删除该角色么？删除以后将无法恢复'
    })
    await reqRoleDelete({
      ids: [id]
    })
    message.success('操作成功！')
    resetList()
  }
  const modifyState = async (id: string, status: string, access_count: number) => {
    if (status == '1') {
      await CalMessageDialog.warning({
        title: '禁用角色',
        content: `已有 <span style="color:#E89026;">${access_count}</span> 个员工正在使用该角色，是否确定要禁用，禁用后该角色对应的员工也将被禁用。`
      })
    }
    await reqRoleStartupDisabled({
      ids: [id],
      params: {
        status: status == '1' ? '0' : '1'
      }
    })
    message.success('操作成功！', 1)
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
  .name-box {
    position: relative;
    .move {
      position: absolute;
      left: -40px;
      top: -2px;
    }
  }
</style>
