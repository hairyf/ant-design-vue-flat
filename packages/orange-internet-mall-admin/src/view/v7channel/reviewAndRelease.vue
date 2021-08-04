<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-14 21:10:24
 * @LastEditTime: 2021-05-11 15:33:06
 * @Description: 版本管理
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <el-card shadow="never" class="oe-m-b-24" v-if="lastVersion.qrcode">
    <div class="currentEdition already">
      <div class="title">
        <span class="left-title">当前版本</span>
        <span class="right-title">如需更新当前版本，请前往小程序后台发布推送版本</span>
      </div>
      <div class="list">
        <div class="item qr-code-box">
          <el-image style="width: 90px; height: 90px" :src="lastVersion.qrcode">
            <template #error>
              <div class="image-slot">
                <el-image
                  src="/custom-assets/images/classificationGoods/default-image.png"
                ></el-image>
              </div>
            </template>
          </el-image>
          <span class="qr-preview">预览二维码</span>
        </div>
        <!-- <div class="right-list">
          <div class="item">
            <div class="top">
              <span class="left">小程序描述</span>
              <span class="right">{{ lastVersion.desc }}</span>
            </div>
          </div>

          <div class="item">
            <div class="top">
              <span class="left">当前版本</span>
              <span class="right">{{ lastVersion.version }}</span>
            </div>
          </div>

          放开也需要注释
          <div class="item">
            <div class="top">
              <span class="left">小程序配置时间</span>
              <span class="right">2021-02-03 12:12:12</span>
            </div>
          </div>

          <div class="item">
            <div class="top">
              <span class="left">版本发布时间</span>
              <span class="right">{{ formatUnix(lastVersion.create_time) }}</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </el-card>

  <el-card shadow="never" class="oe-m-b-24">
    <div class="currentEdition">
      <div class="title">
        <span class="left-title">待推送版本</span>
      </div>
      <div class="list">
        <div class="item qr-code-box">
          <el-image style="width: 90px; height: 90px" :src="onlineVersion.qrcode">
            <template #error>
              <div class="image-slot">
                <el-image
                  src="/custom-assets/images/classificationGoods/default-image.png"
                ></el-image>
              </div>
            </template>
          </el-image>
          <span class="qr-preview">预览二维码</span>
        </div>
        <div class="item">
          <div class="top">
            <span class="left">小程序描述</span>
            <span class="right">{{ onlineVersion.desc }}</span>
          </div>
        </div>

        <div class="item">
          <div class="top">
            <span class="left">待推送版本</span>
            <span class="right">{{ onlineVersion.version }}</span>
          </div>
        </div>

        <div class="item">
          <div class="top">
            <span class="left">版本发布时间</span>
            <span class="right">{{ formatUnix(onlineVersion.create_time) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button
        size="small"
        type="primary"
        @click="$router.push('/v7channel/v7appLetsOption/v7addPushEdition')"
      >
        新增推送版本
      </el-button>
      <el-button @click="jumpAppBackstage" class="custom" size="small">发布微信小程序</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { reqChannelMiniLog } from '@/api/v7channel'
  import { formatUnix } from '@/utils'
  // 当前版本
  const lastVersion = ref<any>({})
  // 在线版本
  const onlineVersion = ref<any>({})
  // 获取小程序最新发布信息
  reqChannelMiniLog().then((res) => {
    if (res.data.data.last_version != null) {
      lastVersion.value = res.data.data.last_version
    }
    if (res.data.data.online_version != null) {
      onlineVersion.value = res.data.data.online_version
    }
  })
  // 跳转到小程序后台
  const jumpAppBackstage = () => {
    window.open('https://mp.weixin.qq.com/')
  }
</script>
<style lang="scss" scoped>
  .currentEdition {
    .title {
      font-size: 16px;
      color: #000;
      margin-bottom: 14px;
      font-weight: 500;
      .right-title {
        font-size: 12px;
        color: #8c8c8c;
        margin-left: 14px;
      }
    }
    .list {
      display: flex;
      align-items: center;
      font-size: 14px;
      .right-list {
        display: flex;
        justify-content: space-between;
        width: 90%;
        .item {
          margin-right: 0;
        }
      }
      .item {
        margin-right: 164px;
        &.qr-code-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 14px;
          .qr-preview {
            margin-top: 4px;
            font-size: 12px;
            color: #8c8c8c;
          }
        }
        .top {
          .left {
            margin-right: 14px;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 60px;
    .el-button {
      font-size: 14px;
      width: 168px;
    }
    .custom {
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
  }
</style>
