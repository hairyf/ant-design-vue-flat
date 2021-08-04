<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-18 15:00:49
 * @LastEditTime: 2021-05-29 15:12:40
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="appointment">
    <!-- <u-tabs
      :list="types"
      :is-scroll="false"
      :current="currentType"
      active-color="#FF7E5F"
      bg-color="none"
      @change="currentType = $event"
    ></u-tabs> -->
    <u-tabs
      active-color="#FF7E5F"
      inactive-color="#ADADAD"
      bar-width="375"
      :list="types"
      height="120"
      :is-scroll="false"
      :current="currentType"
      @change="currentType = $event"
    />
    <div class="appointment-content">
      <div
        class="appointment-list"
        v-for="(item, index) in list"
        :key="index"
        @click="$navigateTo('/pages/commons/houseDetails', { id: item.id })"
      >
        <div class="list-title">
          预约时间：{{ $format(item.appoint_time, 'YYYY-MM-DD hh:mm:ss') }}
        </div>
        <div class="list-box-top">
          <u-image
            class="left-img"
            border-radius="10"
            width="160"
            height="160"
            :src="item.house.image_text"
          />
          <div class="list-box-top-right">
            <div class="right-title">{{ item.house.name }}</div>
            <div class="right-text">
              {{ item.house.extra_house_type || '' }} {{ item.house.area }}㎡
              {{ item.house.extra_house_direction || '' }}
              {{ item.house.floor || '' }}
            </div>
            <div class="landlord">
              <div class="right-price">¥ {{ item.house.price }}/月</div>
              <div class="landlord-right">
                <div class="landlord-time" v-if="currentIdentity == 1">
                  {{ item.house.time }}
                </div>
              </div>
            </div>
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
              <div class="landlord-right" v-if="currentIdentity == 0">
                <div class="landlord-time">{{ item.house.time }}</div>
              </div>
            </div>
            <div class="phone-text" v-if="currentIdentity == 1">
              联系电话：<span>13512123434</span>
            </div>
          </div>
        </div>
        <div class="bottom-btn" v-if="currentType == 0">
          <u-button
            class="btn-left"
            shape="circle"
            :ripple="true"
            @click="phoneBtn(item.phone)"
          >
            联系Ta
          </u-button>
          <u-button
            class="btn-right"
            shape="circle"
            :ripple="true"
            @click="
              navigationBtn(item.house.lat, item.house.lng, item.house.address)
            "
          >
            导航
          </u-button>
          <u-button
            v-if="currentIdentity == 0"
            style="margin-right: 20rpx"
            class="btn-right"
            shape="circle"
            :ripple="true"
            @click="cancelBtn(item.id)"
          >
            取消
          </u-button>
        </div>
        <div class="bottom-btn" v-if="currentType == 1">
          <u-button
            class="btn-right"
            shape="circle"
            :ripple="true"
            @click="deleteBtn(item.id)"
          >
            删除
          </u-button>
        </div>
      </div>
    </div>
    <div
      class="admin-btns u-flex"
      v-if="currentIdentity == 0"
      @click="currentIdentity = 1"
    >
      <div>发布人</div>
      <div>预约</div>
    </div>
    <div
      class="admin-btns u-flex"
      v-if="currentIdentity == 1"
      @click="currentIdentity = 0"
    >
      <div>用户</div>
      <div>预约</div>
    </div>
    <u-empty v-if="!list.length" margin-top="120" text="暂无列表" mode="list" />
    <custom-blank v-if="!list.length" height="120" />
    <!-- <custom-blank height="20" />
    <common-house-list :list="list" type="appointment" /> -->
    <!-- 自定义tabbar -->
    <custom-tabbar />
  </div>
</template>

<script lang="ts">
import {
  reqAppointList,
  reqAppointmentDelete,
  reqModifyAppointmentStatus,
  reqMembersReserved,
} from '@/api';
import Vue from 'vue';
import { tabbarConfig } from '@/config';
import { showToast } from '@/utils';

export default Vue.extend({
  components: {},
  mixins: [tabbarConfig],
  data: () => ({
    types: [
      // { id: '', name: '全部' },
      { id: 1, name: '待看房' },
      // { id: 2, name: '已看房' },
      { id: 3, name: '已取消' },
    ],
    currentType: 0,
    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
    currentIdentity: 0,
  }),
  computed: {},
  methods: {
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        if (this.currentIdentity == 1) {
          const { data } = await reqMembersReserved({
            status: this.types[this.currentType].id,
            page: this.page,
            limit: this.limit,
          });
          return data.data;
        }
        const { data } = await reqAppointList({
          status: this.types[this.currentType].id,
          page: this.page,
          limit: this.limit,
        });
        return data.data;
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
      this.list = [...this.list, ...list];
    },
    // 拨打电话号码
    phoneBtn(phone: string) {
      uni.makePhoneCall({
        phoneNumber: phone, //仅为示例
      });
    },
    // 取消预约
    cancelBtn(id: string) {
      uni.showModal({
        content: '是否取消预约',
        success: async (res) => {
          if (res.confirm) {
            await reqModifyAppointmentStatus({ id, status: 3 });
            await showToast({
              title: '取消成功！',
            });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 删除按钮
    deleteBtn(id: string) {
      uni.showModal({
        content: '是否删除',
        success: async (res) => {
          if (res.confirm) {
            await reqAppointmentDelete({ meal_id: id });
            await showToast({
              title: '删除成功！',
            });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 导航
    navigationBtn(lat: string, lng: string, address: string) {
      const latitude = Number(lat);
      const longitude = Number(lng);
      uni.openLocation({
        latitude,
        longitude,
        address,
      });
    },
  },
  watch: {
    currentType() {
      this.resetList();
    },
    currentIdentity() {
      console.log(521531);
      this.resetList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
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
@include full-page(appointment);
.appointment {
  .appointment-content {
    padding: 0 32rpx;
    .appointment-list {
      margin-top: 20rpx;
      padding: 32rpx 20rpx;
      background-color: #fff;
      border-radius: 10rpx;
    }
    .list-title {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #000000;
      margin-bottom: 32rpx;
    }
    .list-box-top {
      display: flex;
      padding-bottom: 20rpx;
      .list-box-top-right {
        margin-left: 20rpx;
      }
      .right-title {
        width: 466rpx;
        color: #adadad;
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
    .phone-text {
      margin: 20rpx 0 40rpx 0;
      color: #adadad;
      font-size: 24rpx;
      span {
        color: #ff7e5f;
      }
    }
  }
  .bottom-btn {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .u-btn {
      width: 160rpx;
      height: 64rpx;
      font-size: 28rpx;
      color: #000;
    }
    .btn-left {
      .u-btn {
        margin-left: 20rpx;
        width: 160rpx;
        height: 64rpx;
        border-color: #ff7e5f;
        color: #ff7e5f;
        background-color: #fff;
      }
    }
  }
}
</style>
