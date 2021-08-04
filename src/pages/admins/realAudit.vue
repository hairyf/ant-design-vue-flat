<!--
 * @Author: Mr.wang
 * @Date: 2021-05-26 14:20:39
 * @LastEditTime: 2021-05-28 11:31:54
 * @Description: 
 * @LastEditors: liupei
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="real-audit">
    <u-tabs
      active-color="#FF7E5F"
      inactive-color="#ADADAD"
      bar-width="375"
      :list="tabs"
      height="120"
      :is-scroll="false"
      :current="currentTab"
      @change="onChange"
    />
    <div class="real-audit-content">
      <div class="control-box">
        <div class="control-box-text">自动审核</div>
        <u-switch
          @change="getSwitch"
          v-model="checked"
          active-color="#FF7E5F"
          inactive-color="#EAEAEA"
        ></u-switch>
      </div>
      <div class="list-box" v-for="(item, index) in realList" :key="index">
        <div class="list-top">
          <div class="top-left">
            <u-image
              width="40"
              height="40"
              class="top-left-img"
              :src="item.user.avatar"
            ></u-image>
            <div class="top-text">{{ item.name }}</div>
            <template v-if="item.type == 1">
              <div class="identity" v-if="currentTab == 0">
                <custom-icon name="personal" size="20"></custom-icon>
                <div>个人未实名</div>
              </div>
              <div class="identity" v-if="currentTab == 1">
                <custom-icon name="vc-flag" size="20"></custom-icon>
                <div style="color: #558bf7">个人已实名</div>
              </div>
            </template>
            <template v-if="item.type == 2">
              <div class="identity" v-if="currentTab == 0">
                <custom-icon name="certification" size="20"></custom-icon>
                <div>企业未实名</div>
              </div>
              <div class="identity" v-if="currentTab == 1">
                <custom-icon name="vc-flag" size="20"></custom-icon>
                <div style="color: #558bf7">企业已实名</div>
              </div>
            </template>
          </div>
          <!-- <div class="top-right">详情信息</div> -->
        </div>
        <div class="list-content-box">
          <template v-if="item.type == 1">
            <div class="list-content">姓名：{{ item.name }}</div>
            <div class="list-content">证件号：{{ item.idcard }}</div>
          </template>
          <template v-if="item.type == 2">
            <div class="list-content">企业名称：{{ item.name }}</div>
            <div class="list-content">社会统一信用代码：{{ item.idcard }}</div>
          </template>
          <div class="img-box" v-if="item.type == 1">
            <u-image
              @click="previewImg(item.front_image_text, item.back_image_text)"
              width="240"
              height="130"
              :src="item.front_image_text"
            ></u-image>
            <u-image
              @click="previewImg(item.front_image_text, item.back_image_text)"
              width="240"
              height="130"
              :src="item.back_image_text"
            ></u-image>
          </div>
          <div class="img-box" v-if="item.type == 2">
            <u-image
              width="240"
              @click="previewImg(item.front_image_text)"
              height="130"
              :src="item.front_image_text"
            ></u-image>
          </div>
          <template v-if="currentTab == 0">
            <div class="list-content">
              提交时间：{{ $format(item.createtime, 'YYYY-MM-DD hh:mm:ss') }}
            </div>
            <div class="btn-box">
              <u-button
                shape="circle"
                class="btn-right"
                @click="adoptBtn(item.id)"
                >通过</u-button
              >
              <u-button shape="circle" @click="setRefuse(item.id)"
                >拒绝</u-button
              >
            </div>
          </template>
          <template v-if="currentTab == 1">
            <div class="list-content">
              审核时间：{{ $format(item.createtime, 'YYYY-MM-DD hh:mm:ss') }}
            </div>
            <div class="list-content">审核人：admin</div>
          </template>
        </div>
      </div>
      <u-empty
        v-if="!realList.length"
        margin-top="120"
        text="暂无列表"
        mode="list"
      />
      <custom-blank v-if="!realList.length" height="120" />
    </div>
    <u-popup v-model="show" mode="bottom" height="600">
      <div class="popup-box">
        <div class="popup-box-top">
          <div>拒绝原因</div>
          <custom-icon
            name="close"
            @click="show = false"
            size="24"
          ></custom-icon>
        </div>
        <textarea v-model="refuseTetx" maxlength="200"> </textarea>
        <div class="operation-btn">
          <u-button shape="circle" :ripple="true" @click="serConfirmRejection"
            >确定</u-button
          >
        </div>
      </div>
    </u-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  reqRealAudit,
  reqAuditSettings,
  reqSwitchSettings,
  reqRealStatus,
} from '@/api';
import { showToast } from '@/utils';
export default Vue.extend({
  components: {},
  data: () => ({
    currentTab: 0,
    // 是否自动审核
    checked: false,
    // 控制拒绝
    show: false,
    // 拒绝文字
    refuseTetx: '',
    tabs: [
      { name: '待审核', id: 0 },
      { name: '已审核', id: 1 },
    ],
    page: 1,
    isEnd: false,
    limit: 10,
    realList: [] as any[],
    currentId: '',
  }),
  computed: {},
  methods: {
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.realList = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqRealAudit({
          page: this.page,
          limit: this.limit,
          status: this.currentTab,
        });
        this.tabs[0].name = `待审核(${data.total_out})`;
        this.tabs[1].name = `已审核(${data.total_load})`;
        return data.data.data;
      } catch (error) {
        return [];
      }
    },
    // 加载下一页
    async onNextList() {
      if (this.isEnd) return false;
      this.page += 1;
      const list = await this.getList();
      if (!list.length) {
        this.isEnd = true;
        return false;
      }
      this.realList = [...this.realList, ...list];
    },
    async getSwitch(val: any) {
      await reqAuditSettings({
        name: 'idcard',
        value: val ? '1' : '0',
      });
      await showToast({ title: '操作成功！' });
    },
    previewImg(img1: string, img2?: string) {
      const arrImg = [] as any[];
      arrImg.push(img1);
      if (img2) {
        arrImg.push(img2);
      }
      console.log(arrImg);
      uni.previewImage({
        urls: arrImg,
      });
    },
    // 确定按钮
    adoptBtn(id: string) {
      uni.showModal({
        content: '是否确定通过审核',
        success: async (res) => {
          if (res.confirm) {
            await reqRealStatus({
              ids: id,
              status: 1,
            });
            await showToast({ title: '通过成功!' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // tab切换事件
    onChange(index: number) {
      this.currentTab = index;
      this.resetList();
    },
    // 唤起拒绝框
    setRefuse(id: string) {
      this.currentId = id;
      this.show = true;
    },
    // 确定拒绝
    async serConfirmRejection() {
      await reqRealStatus({
        ids: this.currentId,
        status: -1,
      });
      this.show = false;
      await showToast({ title: '拒绝成功！' });
      this.resetList();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    const { data } = await reqSwitchSettings();
    this.checked = data.idcard == '1';
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.resetList();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    this.onNextList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.real-audit {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
  .real-audit-content {
    padding: 0 32rpx;
  }
  .control-box {
    padding: 40rpx 0;
    display: flex;
    align-items: center;
    .control-box-text {
      font-size: 28rpx;
      color: #000;
      margin-right: 20rpx;
    }
    .u-switch {
      width: 64rpx;
      height: 32rpx;
    }
    .u-switch__node {
      width: 32rpx !important;
      height: 32rpx !important;
    }
  }
  .list-box {
    padding: 40rpx;
    background-color: #ffff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    .list-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top-left {
        display: flex;
        align-items: center;
      }
      .u-image {
        border-radius: 50%;
      }
      .top-text {
        margin: 0 16rpx;
        font-size: 24rpx;
        color: #adadad;
      }
      .identity {
        display: flex;
        align-items: center;
        border: 2rpx solid #f2f2f2;
        border-radius: 40rpx;
        padding: 0 12rpx 0 6rpx;
        height: 32rpx;
        line-height: 32rpx;
        div {
          font-size: 20rpx;
          line-height: 28rpx;
          margin-left: 4rpx;
        }
      }
      .top-right {
        color: #ff7e5f;
        font-size: 24rpx;
      }
    }
    .list-content-box {
      margin-left: 60rpx;
      .u-image {
        margin-top: 20rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
      }
    }
    .list-content {
      margin-top: 24rpx;
      font-size: 24rpx;
      color: #adadad;
    }
  }
  .top-left-img {
    .u-image__image {
      border-radius: 50% !important;
    }
  }
  .btn-box {
    margin-top: 40rpx;
    display: flex;
    flex-direction: row-reverse;
    .btn-right {
      margin-left: 20rpx;
    }
    .u-btn {
      height: 64rpx;
      font-size: 28rpx;
      color: #000;
      min-width: 160rpx;
      max-width: 180rpx;
    }
  }
  .img-box {
    display: flex;
    align-items: center;
    .u-image {
      margin-right: 20rpx;
      border-radius: 10rpx !important;
    }
  }
  .popup-box {
    height: 600rpx;
    padding: 40rpx;
    background-color: #fff;
    textarea {
      padding: 20rpx;
      margin: 40rpx 0;
      width: 100%;
      background: #f5f5f5;
      border-radius: 4px;
      height: 304rpx;
    }
    .operation-btn {
      display: flex;
      flex-direction: row-reverse;
    }
    .u-btn {
      width: 160rpx;
      height: 64rpx;
      background: #ff7e5f;
      color: #fff;
    }
  }
  .popup-box-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
