<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 11:23:43
 * @LastEditTime: 2021-07-12 17:22:47
 * @Description: 系统设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card class="system-information" v-if="systemData">
    <div class="box-left">
      <a-descriptions :column="3" class="flex-1" size="middle" title="系统信息">
        <a-descriptions-item label="系统套餐"> {{ systemData.name }}</a-descriptions-item>
        <a-descriptions-item label="授权域名" class="flex items-center">
          {{ systemData.host }}
          <!-- <cal-button type="link">修改</cal-button> -->
        </a-descriptions-item>
        <a-descriptions-item label="激活时间">
          {{ systemData.auth_time_text }}
        </a-descriptions-item>
        <a-descriptions-item label="授权码" class="flex items-center flex-wrap">
          <div class="flex items-center">
            <div class="unifiedBlack" v-if="!exhibition">{{ systemData.identity_key }}</div>
            <!-- <div class="unifiedBlack" v-if="exhibition">48SD2-*****-*</div>
            <i
              @click="exhibition = true"
              class="nr-glasses text-xl ml-8"
              style="color: #000; cursor: pointer"
              v-if="!exhibition"
            ></i>
            <i
              @click="exhibition = false"
              class="nr-close-eyes text-xl ml-8"
              style="color: #000; cursor: pointer"
              v-if="exhibition"
            ></i> -->
            <cal-button type="link" @click="copyBtn(systemData.identity_key)">复制</cal-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="到期时间">
          {{ systemData.over_time_text }}
        </a-descriptions-item>
        <a-descriptions-item label="授权状态">
          {{ systemData.over_status == 0 ? '已授权' : '已过期' }}
          <!-- <cal-button type="link">检测</cal-button> -->
        </a-descriptions-item>
        <a-descriptions-item label="系统版本">
          {{ systemData?.new_version?.version || systemData?.version }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="授权IP"> 192.168.15.15 </a-descriptions-item> -->
        <a-descriptions-item label="站点编码"> {{ systemData.id }} </a-descriptions-item>
        <!-- <a-descriptions-item label="授权MAC地址"> 18-31-BF-07-EA-5E </a-descriptions-item> -->
      </a-descriptions>
      <div class="flex items-center mt-32">
        <cal-button type="primary" class="w-176 h-32" @click="updateBtn"> 更新 </cal-button>
        <!-- <cal-button class="w-176 h-32 ml-28"> 修复 </cal-button> -->
      </div>
    </div>
    <!-- <div class="box-right">
      <a-descriptions :column="2" class="flex-1" size="middle" title="系统环境">
        <a-descriptions-item label="PHP">
          <div class="">7.3.0</div>
          <i class="nr-tick text-base ml-10" style="color: #1ad370"></i>
        </a-descriptions-item>
        <a-descriptions-item label="检测时间"> 12542131</a-descriptions-item>
        <a-descriptions-item label="Redis">
          <div class="">1.0</div>
          <i class="nr-tick text-base ml-10" style="color: #1ad370"></i>
        </a-descriptions-item>
        <a-descriptions-item label="版权所有" class="flex it">
          ©深圳市桔子互联信息技术有限公司
        </a-descriptions-item>
        <a-descriptions-item label="MuSql">
          <div class="">5.6</div>
          <i class="nr-tick text-base ml-10" style="color: #1ad370"></i>
        </a-descriptions-item>
        <a-descriptions-item label="官方论坛" class="flex items-center">
          <a href="http://comment.weitshop.cn" target="_blank" class="text-primary">
            comment.weitshop.cn
          </a>
        </a-descriptions-item>
        <a-descriptions-item label="Nginx">
          <div class="">nginx/1.18.0</div>
          <i class="nr-tick text-base ml-10" style="color: #1ad370"></i>
        </a-descriptions-item>
        <a-descriptions-item label="官方网站">
          <a href="http://www.weitshop.com" target="_blank" class="text-primary">
            www.weitshop.com
          </a>
        </a-descriptions-item>
        <a-descriptions-item label="系统扩展"
          ><div class="">已安装</div>
          <i class="nr-tick text-base ml-10" style="color: #1ad370"></i>
        </a-descriptions-item>
      </a-descriptions>
      <div class="flex items-center mt-56">
        <cal-button type="primary" class="w-176 h-32"> 检测系统环境 </cal-button>
      </div>
    </div> -->
  </cal-card>
  <cal-card class="mt-24">
    <div class="text-base mb-28 font-semibold" style="color: #001426">更新历史</div>
    <a-timeline>
      <a-timeline-item
        class="pb-56"
        :class="index != 0 ? 'transparent' : ''"
        v-for="(item, index) in recordData"
        :key="index"
      >
        <div
          class="flex items-center justify-between mb-20"
          :class="index == 0 ? 'unifiedBlack' : 'unifiedAsh'"
        >
          <div class="text-base font-semibold">版本号：{{ item.version_code }}</div>
          <!-- <div>2021-05-15 12:00:00</div> -->
        </div>
        <div class="text-sm mt-10" :class="index == 0 ? 'unifiedBlack' : 'unifiedAsh'">
          <div v-html="item.desc"></div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </cal-card>
  <cal-message-dialog
    title="系统更新中"
    v-model="upddateShow"
    :closable="false"
    v-if="currentUpdate"
  >
    <div class="relative h-320" v-if="!updateSucceed">
      <cal-image
        src="@/assets/img/setting/update.png"
        alt=""
        class="mx-auto"
        style="width: 300px; height: 300px"
      />
      <div class="absolute left-1/2 upddate-text" style="top: 60px"
        >系统正在更新，请不要关闭此页</div
      >
      <div class="absolute left-1/2 bottom-36 upddate-text w-353">
        <a-progress
          :percent="
            Number(
              ((updateedNum / (currentUpdate.all_num - currentUpdate.updateed_num)) * 100).toFixed(
                2
              )
            )
          "
          :show-info="false"
        />
        <div class="flex items-center justify-between">
          <div>验证站点，开始下载{{ currentUpdate.version }}系统文件 </div>
          <div v-if="currentUpdate.all_num == currentUpdate.updateed_num">
            {{ currentUpdate.all_num }}/{{ updateedNum }}
          </div>
          <div v-if="currentUpdate.all_num != currentUpdate.updateed_num">
            {{ currentUpdate.all_num - currentUpdate.updateed_num }}/{{ updateedNum }}
          </div>
        </div>
      </div>
      <template v-if="errList.length != 0">
        <div class="text-red absolute bottom-8 flex items-center" style="left: 60px">
          失败文件：
          <div class="truncate w-288">
            <span v-for="(item, index) in errList" :key="index" class="pr-8">{{ item }}</span>
          </div>
        </div>
        <div class="text-red absolute left-1/2 upddate-text top-24" v-if="errBtn">
          失败文件需手动点击按钮会重新下载
        </div>
        <cal-button
          v-if="errBtn"
          type="primary "
          class="absolute left-1/2 upddate-text -bottom-32 w-50 h-32"
          @click="updateError"
          >重新下载</cal-button
        >
      </template>
    </div>
    <div v-if="updateSucceed" class="text-center">
      <div class="unifiedBlack">系统已更新到最新版本 {{ currentUpdate.version }}</div>
      <i class="nr-tick mx-auto block" style="color: #1ad370; font-size: 108px"></i>
      <cal-button type="primary" class="w-120 h-32" @click="upddateShow = false">
        更新完成
      </cal-button>
    </div>
    <template #footer>
      <div></div>
    </template>
  </cal-message-dialog>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import {
    reqSystemData,
    reqSystemUpdate,
    reqUpdateIng,
    reqUpdateRecord,
    reqInstallationOperation
  } from '@/api/setting'
  import { onMounted, ref, watch } from 'vue-demi'
  import { CalMessageDialog as CalMessage } from '~/CustomAntds/CalMessageDialog'
  import { copyText } from '@/utils/vue-utils'
  import { useRoute } from 'vue-router'
  // 系统数据
  const systemData = ref<any>()
  // 历史更新数据
  const recordData = ref<any>()
  // 隐藏与显示
  const exhibition = ref(false)
  // 更新模块显示隐藏
  const upddateShow = ref(false)
  // 是否更新成功
  const updateSucceed = ref(false)
  // 当前更新的数据
  const currentUpdate = ref<any>()
  // host
  const host = ref()
  const secret = ref()
  const errBtn = ref(false)
  // 失败数组
  const errList = ref<any[]>([])
  // 当前更新的数量进度
  const updateedNum = ref(0)
  // 复制
  const copyBtn = (text: string) => {
    copyText(text)
    message.success('复制成功')
  }
  // 更新按钮
  const updateBtn = async () => {
    if (systemData.value.new_version.version == systemData.value.new_version.clouds_version) {
      CalMessage.confirm({
        title: '版本更新',
        content: '当前是最新版本，暂无可更新版本',
        showCancel: false
      })
    } else {
      await CalMessage.warning({
        title: '安全提示',
        content:
          '更新将直接覆盖本地文件，请注意备份和数据<br/><span style="color:red;">注意：更新过程中不要关闭此窗口</span>',
        showCancel: false
      })
      upddateShow.value = true
      getUpdateEnd(false)
    }
  }
  const route = useRoute();




  // 更新流程
  const getUpdateEnd = async (install: boolean) => {
    if (errList.value.length == 0 && install) {
      // 安装
      setInstall(true)
    }
    const { data } = await reqSystemUpdate({
      unique_key: 'system'
    })
    currentUpdate.value = {}
    if (data.data.update.length != 0) {
      currentUpdate.value = data.data.update[0]
      host.value = data.data.host
      secret.value = data.data.secret
      updateSucceed.value = false
      if (currentUpdate.value.all_num != currentUpdate.value.updateed_num) {
        updateedNum.value = 0
        updateFile()
      } else {
        // 安装
        setInstall(true)
      }
    } else {
      // 更新成功
      updateSucceed.value = true
    }
    errList.value = []
  }




  //安装
  const setInstall = async (direct: boolean) => {
    if (direct) {
      updateedNum.value = currentUpdate.value.all_num
      await reqInstallationOperation({
        secret: secret.value,
        unique_key: 'system',
        version_code: currentUpdate.value.version
      })
    }
    getUpdateEnd(false)
  }
  // 请求更新文件
  const updateFile = async () => {
    for (let i = 1; i <= currentUpdate.value.update_list.length; i++) {
      try {
        const { data } = await reqUpdateIng({
          secret: secret.value,
          unique_key: 'system',
          download_path: currentUpdate.value.update_list[i - 1],
          version_code: currentUpdate.value.version,
          download_host: host.value
        })
      } catch (error) {
        errList.value.push(currentUpdate.value.update_list[i - 1])
      }
      updateedNum.value++
      if (i == currentUpdate.value.update_list.length && errList.value.length != 0) {
        // 更新失败的
        // updateError()
        errBtn.value = true
      } else if (i == currentUpdate.value.update_list.length) {
        getUpdateEnd(false)
        // getUpdateEnd(true)
      }
    }
  }
  // 更新失败文件
  const updateError = async () => {
    updateedNum.value = 0
    const { data } = await reqSystemUpdate({
      unique_key: 'system'
    })
    if (data.data.update.length != 0) {
      currentUpdate.value = data.data.update[0]
      host.value = data.data.host
      secret.value = data.data.secret
      updateSucceed.value = false
      updateFile()
    } else {
      // 安装
      setInstall(true)
    }
    errList.value = []
  }
  // 系统基本数据
  const getSystemData = async () => {
    const { data } = await reqSystemData()
    systemData.value = data.data
    getUpdateRecord()
    const from = +route?.query?.from || 0
    if(from == 1)
    {
      updateBtn();
    }
  }
  // 历史更新
  const getUpdateRecord = async () => {
    const { data } = await reqUpdateRecord({ version: systemData.value.new_version.version })
    recordData.value = data.data
  }
  onMounted(() => {
    getSystemData()


  })



</script>
<style lang="scss" scoped>
  .system-information {
    :deep(.ant-card-body) {
      display: flex;
      align-items: center;
    }
  }
  .box-right {
    .ant-descriptions {
      padding-left: 28px;
      border-left: 1px solid #d9d9d9;
    }
  }
  .unifiedBlack {
    color: #001426;
  }
  .unifiedAsh {
    color: #8c8c8c;
  }
  :deep(.ant-btn) {
    height: 100%;
  }
  .upddate-text {
    transform: translateX(-50%);
    color: #001426;
  }
  :deep(.ant-image) {
    width: 300px;
    height: 300px;
    display: block;
    margin: auto;
  }
  :deep(.ant-progress-bg) {
    background-color: var(--color-primary);
  }
  :deep(.ant-timeline-item-head-blue) {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  :deep(.ant-descriptions-item-content) {
    font-size: 14px;
    color: #001426;
  }
  :deep(.ant-timeline-item-tail) {
    border-left: 1px solid var(--color-primary);
  }

  :deep(.ant-timeline) {
    width: 100%;
  }
  :deep(.ant-timeline-item-content) {
    margin-left: 38px;
  }
  .transparent {
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid var(--color-primary-light-7);
    }
    :deep(.ant-timeline-item-head-blue) {
      background-color: var(--color-primary-light-7);
      border-color: var(--color-primary-light-7);
    }
  }
</style>
