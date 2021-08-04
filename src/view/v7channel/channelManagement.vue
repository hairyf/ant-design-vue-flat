<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-13 20:59:37
 * @LastEditTime: 2021-04-29 21:49:29
 * @Description: 渠道管理
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="channel-box">
    <el-card shadow="never" class="box-card">
      <div class="card-header">
        <div class="card-header-left">
          <el-image src="/custom-assets/images/channel/WeChat.png"></el-image>
        </div>
        <div class="card-header-right">
          <div class="right-top">
            <div class="right-top-left">
              <span class="title">微信公众号</span>
              <span class="tips">快速提交审核，随时最新版本</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-introduce web-introduce">
        <!-- <qr-code :text="wechatData.link ? wechatData.link : '1'" :size="120" /> -->
        <div class="web-content">
          <span class="web-title">公众号</span>
          <span class="web-text">{{ wechatData.link }}</span>
          <el-button @click="getCopy(wechatData.link)" type="text" class="web-button">
            复制地址
          </el-button>
        </div>
      </div>
      <div class="card-footer">
        <el-button @click="jumpWeiXin" size="small" type="primary">管理</el-button>
        <el-button @click="changeOpenWxApp(0)" v-if="isOpenWxApp == 1" size="small" plain>
          关闭
        </el-button>
        <div @click="changeOpenWxApp(1)" v-else class="manual-button">
          <el-button size="small" plain>开启</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="box-card">
      <div class="card-header bound">
        <div class="card-header-left">
          <el-image src="/custom-assets/images/channel/Applets.png"></el-image>
        </div>
        <div class="card-header-right">
          <div class="right-top">
            <div class="right-top-left">
              <span class="title">微信小程序</span>
              <span class="tips">快速提交审核，随时最新版本</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-introduce">
        <!-- <qr-code :text="wechatAppletsData.link ? wechatAppletsData.link : '1'" :size="120" /> -->
        <el-image style="width: 120px; height: 120px" :src="wechatAppletsData.link">
          <template #error>
            <div class="image-slot">
              <el-image
                src="/custom-assets/images/classificationGoods/default-image.png"
              ></el-image>
            </div>
          </template>
        </el-image>
      </div>
      <div class="card-footer">
        <el-button
          @click="router.push('/v7channel/v7appLetsOption/v7reviewAndRelease')"
          size="small"
          type="primary"
          >管理</el-button
        >
        <el-button @click="changeOpenWxApplets(0)" v-if="isOpenWxApplets == 1" size="small" plain>
          关闭
        </el-button>
        <div @click="changeOpenWxApplets(1)" v-else class="manual-button">
          <el-button size="small" plain>开启</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="box-card">
      <div class="card-header bound">
        <div class="card-header-left">
          <el-image src="/custom-assets/images/channel/web.png"></el-image>
        </div>
        <div class="card-header-right">
          <div class="right-top">
            <div class="right-top-left">
              <span class="title">H5</span>
              <span class="tips">快速提交审核，随时最新版本</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-introduce web-introduce">
        <div class="web-content">
          <span class="web-title">H5地址</span>
          <span class="web-text">{{ webData.link }}</span>
          <el-button @click="getCopy(webData.link)" type="text" class="web-button">
            复制地址
          </el-button>
        </div>
      </div>
      <div class="card-footer">
        <el-button @click="changeOpenWeb(0)" v-if="isOpenWeb == 1" size="small" plain>
          关闭
        </el-button>
        <div @click="changeOpenWeb(1)" v-else class="manual-button">
          <el-button size="small" plain>开启</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    reqChannelMiniStatus,
    reqChannelWechatStatus,
    reqChannelList,
    reqChannelHfStatus
  } from '@/api/v7channel'
  import { ElMessage, ElNotification } from 'element-plus'
  // 保存路由
  const router = useRouter()
  // 是否开启微信公众号
  const isOpenWxApp = ref(1)
  const changeOpenWxApp = async (status: number) => {
    isOpenWxApp.value = status
    await reqChannelWechatStatus({ status: isOpenWxApp.value })
    ElMessage.success('更改状态成功')
  }
  // 微信公众号跳转
  const jumpWeiXin = () => {
    window.open(wechatData.value.link)
  }
  // 是否开启微信小程序
  const isOpenWxApplets = ref<Key>(1)
  const changeOpenWxApplets = async (status: number) => {
    isOpenWxApplets.value = status
    await reqChannelMiniStatus({ status: isOpenWxApplets.value })
    ElMessage.success('更改状态成功')
  }
  // 是否开启H5
  const isOpenWeb = ref<Key>(1)
  const changeOpenWeb = async (status: number) => {
    isOpenWeb.value = status
    await reqChannelHfStatus({ status: isOpenWeb.value })
    ElMessage.success('更改状态成功')
  }
  // 获取渠道列表
  // 小程序数据
  const wechatAppletsData = ref<any>({})
  // 公众号数据
  const wechatData = ref<any>({})
  // h5数据
  const webData = ref<any>({})
  reqChannelList().then((res) => {
    // 小程序
    wechatAppletsData.value = res.data.data.WechatApplets
    isOpenWxApplets.value = wechatAppletsData.value.status
    // 公众号
    wechatData.value = res.data.data.Wechat
    isOpenWxApp.value = wechatData.value.status
    // H5
    webData.value = res.data.data.H5
    isOpenWeb.value = webData.value.status
  })
  // 复制按钮
  const getCopy = (number: string) => {
    //新增一个input框
    const input = document.createElement('input')
    //将指定的DOM节点添加到body的末尾
    document.body.appendChild(input)
    //设置input框的value值为直播地址
    input.setAttribute('value', number)
    //选取文本域中的内容
    input.select()
    //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    }
    //删除这个节点
    document.body.removeChild(input)
    ElNotification({
      title: '成功',
      message: '复制成功',
      type: 'success',
      duration: 2000
    })
  }
</script>
<style lang="scss" scoped>
  .channel-box {
    display: flex;
    .box-card {
      position: relative;
      width: 300px;
      height: 300px;
      margin-right: 24px;
      .view-different {
        display: flex;
        justify-content: space-between;
        .el-image {
          width: 22%;
        }
      }
      :deep(.el-dialog__title) {
        font-size: 16px;
        font-weight: bold;
      }
      :deep(.el-dialog) {
        padding-top: 30px;
        .qr-code {
          display: flex;
          flex-direction: column;
          align-items: center;
          .rq-code-tips {
            margin-top: 29px;
          }
        }
      }
      // :deep(.el-card) {
      //   height: 100%;
      // }
      // .layout-box {
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      // }
      .card-header {
        display: flex;
        align-items: center;
        align-items: center;
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 14px;
        color: #000;
        .card-header-left {
          width: 60px;
          margin-right: 30px;
        }
        .card-header-right {
          width: 100%;
          .right-top {
            display: flex;
            justify-content: space-between;
            width: 100%;
            .right-top-left {
              display: flex;
              flex-direction: column;
              .title {
                font-size: 24px;
                font-weight: 500;
                margin-bottom: 10px;
              }
              .tips {
                font-size: 12px;
                color: #8c8c8c;
              }
            }
            .right-top-right {
              font-size: 12px;
            }
          }
          .right-bottom {
            font-size: 12px;
            color: #8c8c8c;
            line-height: 40px;
          }
        }
      }
      .card-introduce {
        width: 120px;
        height: 120px;
        font-size: 14px;
        margin: 14px auto 17px;
        color: #000;
        &.web-introduce {
          width: 258px;
          margin: 14px 0 17px;
          .web-content {
            display: flex;
            width: 100%;
            .web-title {
              width: 20%;
              color: #8c8c8c;
              margin-right: 14px;
            }
            .web-text {
              width: 50%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .web-button {
              padding: 0;
              min-height: auto;
            }
          }
        }
      }
      .card-footer {
        display: flex;
        width: fit-content;
        margin: 0 auto;
        .el-button {
          width: 90px;
          margin: 0 12px;
        }
        .manual-button {
          .el-button {
            color: var(--color-primary);
            border-color: var(--color-primary);
          }
        }
      }
    }
  }
</style>
