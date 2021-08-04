<!--
 * @Author: Mr.wang
 * @Date: 2021-05-26 14:20:17
 * @LastEditTime: 2021-05-29 14:35:09
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="housing-audit">
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
    <div class="housing-audit-content">
      <div class="control-box">
        <div class="control-box-text">自动审核</div>
        <u-switch
          @change="getSwitch"
          v-model="checked"
          active-color="#FF7E5F"
          inactive-color="#EAEAEA"
        ></u-switch>
      </div>
      <div
        class="list-box"
        v-for="(item, index) in AuditList"
        :key="index"
        @click="
          $navigateTo('/pages/commons/houseDetails', {
            id: item.id,
            state: currentTab,
          })
        "
      >
        <div class="list-box-top">
          <u-image
            class="left-img"
            :src="item.image_text"
            width="160"
            height="160"
          />
          <div class="list-box-top-right">
            <div class="right-title">{{ item.name }}</div>
            <div class="right-text">
              {{ item.extra_house_type || '' }} {{ item.area }}㎡
              {{ item.extra_house_direction || '' }}
              {{ item.floor || '' }}
            </div>
            <div class="right-price">¥{{ item.price }}/月</div>
            <div class="landlord">
              <div class="landlord-left">
                <u-image
                  class="landlord-img"
                  width="40"
                  height="40"
                  :src="item.user.avatar"
                />
                <div class="landlord-text">{{ item.user.nickname }}</div>
              </div>
              <div class="landlord-right">
                <div class="landlord-time">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-box-bottom">
          <div class="code-box top-box">
            <div class="code-left">房源编码：{{ item.house_sn }}</div>
            <div class="code-right" @click="getCopy(item.house_sn)">复制</div>
          </div>
          <div class="bottom-text top-box" v-if="currentTab == 0">
            提交时间：{{ $format(item.create_time, 'YYYY-MM-DD hh:mm:ss') }}
          </div>
          <template v-if="currentTab == 1">
            <div class="bottom-text top-box">
              审核通过时间：{{
                $format(item.update_time, 'YYYY-MM-DD hh:mm:ss')
              }}
            </div>
            <div class="bottom-text top-box">审核人：admin</div>
          </template>
          <div v-if="currentTab == 0" class="btn-box">
            <u-button
              shape="circle"
              class="btn-right"
              @click="adoptBtn(item.id)"
              >通过</u-button
            >
            <u-button shape="circle" @click="setRefuse(item.id)">拒绝</u-button>
          </div>
          <div v-if="currentTab == 1" class="btn-box">
            <u-button
              shape="circle"
              class="btn-right"
              @click="returnBtn(item.id)"
              >退回发布人</u-button
            >
            <u-button
              shape="circle"
              @click="
                $navigateTo('/pages/admins/auditHistory', {
                  remark: encodeURIComponent(JSON.stringify(item.remark)),
                })
              "
              >审核历史</u-button
            >
          </div>
        </div>
      </div>
      <u-empty
        v-if="!AuditList.length"
        margin-top="120"
        text="暂无列表"
        mode="list"
      />
      <custom-blank v-if="!AuditList.length" height="120" />
    </div>
    <u-popup v-model="show" mode="bottom">
      <div class="popup-box" height="600">
        <div class="popup-box-top">
          <div>{{ currentBtn == 0 ? '拒绝原因' : '备注' }}</div>
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
  reqHousingAuditList,
  reqAudit,
  reqAuditSettings,
  reqSwitchSettings,
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
    currentId: '',
    tabs: [
      { name: '待审核', id: 0 },
      { name: '已审核', id: 1 },
    ],
    page: 1,
    limit: 10,
    AuditList: [] as any[],
    isEnd: false,
    currentBtn: 0,
  }),
  computed: {},
  methods: {
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.AuditList = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqHousingAuditList({
          page: this.page,
          limit: this.limit,
          audit: this.currentTab,
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
      this.AuditList = [...this.AuditList, ...list];
    },
    async getSwitch(val: any) {
      await reqAuditSettings({
        name: 'house',
        value: val ? '1' : '0',
      });
      await showToast({ title: '操作成功！' });
    },
    // 复制
    getCopy(text: string) {
      const copyText = text.toString();
      uni.setClipboardData({
        data: copyText,
        success() {
          uni.showToast({
            icon: 'success',
            title: '复制成功',
          });
        },
      });
    },
    // 唤起拒绝框
    setRefuse(id: string) {
      this.refuseTetx = '';
      this.currentBtn = 0;
      this.currentId = id;
      this.show = true;
    },
    // 确定拒绝和退回发布人
    async serConfirmRejection() {
      if (this.currentBtn == 0) {
        await reqAudit({
          house_id: this.currentId,
          audit: -1,
          remark: this.refuseTetx,
        });
        this.show = false;
        await showToast({ title: '拒绝成功!' });
        this.resetList();
      } else {
        await reqAudit({
          house_id: this.currentId,
          audit: -2,
          remark: this.refuseTetx,
        });
        this.show = false;
        await showToast({ title: '退回成功!' });
        this.resetList();
      }
    },
    // 确定按钮
    adoptBtn(id: string) {
      uni.showModal({
        content: '是否确定通过审核',
        success: async (res) => {
          if (res.confirm) {
            await reqAudit({
              house_id: id,
              audit: 1,
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
    // 退回发布人
    returnBtn(id: string) {
      this.currentBtn = 1;
      this.refuseTetx = '';
      this.currentId = id;
      this.show = true;
      // uni.showModal({
      //   content: '是否退回发布人',
      //   success: (res) => {
      //     if (res.confirm) {
      //       console.log('用户点击确定');
      //     } else if (res.cancel) {
      //       console.log('用户点击取消');
      //     }
      //   },
      // });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    const { data } = await reqSwitchSettings();
    this.checked = data.house == '1';
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
.housing-audit {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
  .housing-audit-content {
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
    padding: 20rpx 20rpx 28rpx 20rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    .list-box-top {
      display: flex;
      padding-bottom: 20rpx;
      border-bottom: 2rpx solid #f5f5f5;
      .left-img {
        .u-image__image {
          border-radius: 10rpx !important;
        }
      }
      .list-box-top-right {
        margin-left: 20rpx;
      }
      .right-title {
        width: 466rpx;
        color: #000;
        font-size: 28rpx;
        line-height: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-text {
        width: 466rpx;
        margin: 16rpx 0;
        line-height: 34rpx;
        font-size: 24rpx;
        color: #adadad;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-price {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #ff7e5f;
        font-weight: bold;
      }
    }
    .landlord {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .landlord-left,
      .landlord-right {
        display: flex;
        align-items: center;
      }
      .landlord-img {
        .u-image__image {
          border-radius: 50% !important;
        }
      }
      .landlord-text {
        margin-left: 16rpx;
        color: #adadad;
        font-size: 24rpx;
      }
      .landlord-time {
        height: 32rpx;
        text-align: center;
        line-height: 28rpx;
        padding: 0 10rpx;
        color: #000;
        font-size: 20rpx;
        border-radius: 40rpx;
        border: 2rpx solid #f2f2f2;
      }
    }
    .list-box-bottom {
      margin-left: 190rpx;
      .bottom-text {
        font-size: 24rpx;
        color: #adadad;
        line-height: 34rpx;
      }
      .top-box {
        margin-top: 20rpx;
      }
      .code-box {
        display: flex;
        justify-content: space-between;
        .code-left {
          font-size: 24rpx;
          color: #adadad;
          line-height: 34rpx;
        }
        .code-right {
          color: #ff7e5f;
          font-size: 24rpx;
          line-height: 34rpx;
        }
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
        font-size: 28rpx;
        color: #000;
        height: 64rpx;
        min-width: 160rpx;
        max-width: 180rpx;
      }
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
