<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:44:53
 * @LastEditTime: 2021-07-23 16:57:38
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-layout-header class="bg-transparent h-64 p-0 leading-none flex">
    <div class="h-full w-252 flex items-end ml-14">
      <div class="w-full flex justify-center">
        <img
          class="w-40 h-40 object-center -mt-2"
          :src="serviceCopy?.logo || '/src/assets/img/logo.png'"
          alt=""
        />

        <span class="ml-10 text-2xl font-bold"> {{ serviceCopy?.name || 'Weitshop服务商' }} </span>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-between pt-20 m-12 mr-24">
      <breadcrumb />
      <div class="flex items-center">
        <!-- 消息通知 -->
        <a-popover overlayClassName="popover-message" trigger="click">
          <!-- <i class="nr-bottom-arrow text-2xl mr-28 cursor-pointer" /> -->
          <template #content>
            <span class="text-gray">暂无消息</span>
          </template>
        </a-popover>
        <!-- 用户操作框 -->
        <a-popover overlayClassName="popover-operation" trigger="click" placement="bottomRight">
          <div class="flex items-center cursor-pointer">
            <cal-avatar
              class="mr-20"
              size="48"
              fit="cover"
              :src="portrait ? portrait : userInfo?.avatar"
            />
            <i class="nr-home-lower text-xl" />
          </div>
          <template #content>
            <div class="flex flex-col px-24">
              <!-- 用户头像与用户名称 -->
              <div class="pt-24 pb-16 flex border-b border-gray-lightest">
                <router-link
                  :to="'/setting/jurisdiction/newStaff?title=编辑员工&id=' + userInfo?.id"
                >
                  <cal-avatar
                    class="mr-20"
                    size="48"
                    fit="cover"
                    :src="portrait ? portrait : userInfo?.avatar"
                  />
                </router-link>
                <div class="flex flex-col">
                  <router-link
                      :to="'/setting/jurisdiction/newStaff?title=编辑员工&id=' + userInfo?.id"
                  >
                  <div class="text-base font-bold mb-4">{{ name?name:userInfo?.name }}</div>
                  </router-link>
                  <div class="text-xs mt-10">
                    <span class="mr-14">
                      服务到期：{{
                        userInfo?.updatetime ? $formatUnix(userInfo?.updatetime) : '永久'
                      }}
                    </span>
                    <span
                      v-if="userInfo?.updatetime > 0"
                      class="text-primary cursor-pointer"
                      @click="$router.push('/setting/maintain')"
                      >续费</span
                    >
                  </div>
                </div>
              </div>
              <div class="">
                <div class="py-10 border-b border-gray-lightest">
                  <span class="cursor-pointer" @click="$router.push('/setting/system')">
                    <i class="nr-adjustment text-2xl align-middle" />
                    <span class="ml-16 text-sm align-middle">基础设置</span>
                  </span>
                </div>
                <div class="py-10 border-b border-gray-lightest">
                  <span class="cursor-pointer" @click="$router.push('/setting/system?from=1')">
                    <i class="nr-download text-2xl align-middle" />
                    <span class="ml-16 text-sm align-middle">检查更新</span>
                  </span>
                </div>
                <!-- <div class="py-10 border-b border-gray-lightest">
                <span class="cursor-pointer">
                  <i class="nr-key text-2xl align-middle" />
                  <span class="ml-16 text-sm align-middle">修改密码</span>
                </span>
              </div> -->
                <div class="py-10">
                  <span class="cursor-pointer" @click="onOutLogin">
                    <i class="nr-switch-control text-2xl align-middle" />
                    <span class="ml-16 text-sm align-middle">退出登录</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </a-popover>
      </div>
    </div>
  </a-layout-header>
</template>
<script lang="ts" setup>
  import { computed } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { useTitle, useFavicon } from '@vueuse/core'

  const store = useStore()
  const serviceCopy = computed(() => store.state.copy.info)
  const userInfo = computed(() => store.state.user.info)
  const portrait = computed(() => store.state.user.avater)
  const name = computed(() => store.state.user.name)
  const router = useRouter()

  const websiteTitle = useTitle()

  websiteTitle.value = serviceCopy.value?.name || '微匠工'

  const icon = useFavicon()
  icon.value = serviceCopy.value?.logo || '/src/assets/img/logo.png'

  // 退出登录
  const onOutLogin = () => {
    store.dispatch('signOutUserInfo')
    router.replace('/auth')
  }
</script>
<style lang="scss">
  .popover-operation {
    .ant-popover-inner {
      @apply rounded-2xl;
    }
    .ant-popover-inner-content {
      @apply p-0 w-384;
    }
  }
  .popover-message {
    .ant-popover-inner {
      @apply rounded-2xl;
    }
  }
</style>
