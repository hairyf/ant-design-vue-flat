<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 11:56:31
 * @LastEditTime: 2021-01-27 14:20:47
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="guarantee-details">
    <!-- 问题信息 -->
    <u-card :show-foot="false">
      <div class="card-guarantee-item-head" slot="head">
        <div class="title">{{ detail.title }}</div>
        <div class="u-flex-1 u-m-l-15">
          <u-tag
            size="mini"
            :text="getStatusText(detail.status).text"
            :bg-color="getStatusText(detail.status).color"
            mode="dark"
          />
        </div>
        <div class="tips">{{ $format(detail.update_time) }}</div>
      </div>
      <div class="card-guarantee-item-body" slot="body">
        <div class="title">问题描述</div>
        <div class="text">
          {{ detail.declare }}
        </div>
        <div class="title">问题照片</div>
        <div class="images">
          <u-image
            v-for="(item, index) in detail.images_text"
            :key="index"
            :src="item"
            @click="onPreviewImage(index)"
            class="u-m-5"
            width="145"
            height="145"
          />
        </div>
      </div>
    </u-card>
    <!-- 处理反馈 -->
    <u-card :show-foot="false">
      <div class="card-guarantee-item-head" slot="head">
        <div class="title">处理反馈</div>
        <div class="u-flex-1 u-m-l-15">
          <u-tag
            size="mini"
            :text="getStatusText(detail.status).text"
            :bg-color="getStatusText(detail.status).color"
            mode="dark"
          />
        </div>
        <div class="tips">{{ $format(detail.update_time) }}</div>
      </div>
      <div class="card-guarantee-item-body" slot="body">
        <u-steps
          :list="stepsList"
          :current="detail.status"
          icon="arrow-rightward"
          active-color="#FF7E5F"
          mode="number"
        ></u-steps>
      </div>
    </u-card>
    <u-modal
      show-cancel-button
      v-model="showCancel"
      @confirm="onCancelRepair"
      content="确定取消报修吗？"
    />
    <template v-if="type == 'user'">
      <div class="edit-btns-container" v-if="detail.status !== -1">
        <u-button type="primary" shape="circle" @click="showCancel = true">
          取消报修
        </u-button>
      </div>
    </template>
    <template v-if="type == 'admin'">
      <div class="edit-btns-container" v-if="detail.status == 0">
        <u-button type="primary" shape="circle" @click="onEditRepair(2)">
          开始处理
        </u-button>
      </div>
      <div class="edit-btns-container" v-if="detail.status == 1">
        <u-button type="primary" shape="circle" @click="onEditRepair(3)">
          处理完毕
        </u-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  reqRepairsCancel,
  reqRepairsDetail,
  reqAdminRepairsDetail,
  reqAdminEditRepairs,
} from '@/api';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    showCancel: false,

    // 显示类型
    type: 'user',

    detail: {} as any,
    stepsList: [] as any[],
  }),
  computed: {},
  methods: {
    // 根据状态获取字符信息
    getStatusText(status: Key) {
      const strategy = {
        0: {
          color: '#FF7E5F',
          text: '待处理',
        },
        1: {
          color: '#FF0000',
          text: '处理中',
        },
        2: {
          color: '#23B929',
          text: '已完成',
        },
        '-1': {
          color: '#9E9E9E',
          text: '已取消',
        },
      } as any;
      return strategy[status];
    },
    // 查看图片列表
    onPreviewImage(index: Key) {
      uni.previewImage({
        current: index as any,
        urls: this.detail.images_text,
      });
    },
    // 初始化获取详情数据
    async initDetail(id: Key) {
      const reqDetail =
        this.type == 'user' ? reqRepairsDetail : reqAdminRepairsDetail;
      const { data: detail } = await reqDetail(id);
      if (detail.status == 4) {
        detail.status = -1;
      } else {
        detail.status -= 1;
      }
      this.stepsList = [
        { name: `报修(${this.$format(detail.createtime)})` },
        { name: `处理中(${this.$format(detail.repairs_time)})` },
        {
          name: `已完成(${this.$format(
            detail.status == -1 ? 0 : detail.finish_time
          )})`,
        },
      ];
      detail.update_time =
        detail.finish_time ||
        detail.dispose_time ||
        detail.repairs_time ||
        detail.createtime;
      this.detail = detail;
    },
    // 取消保修
    async onCancelRepair() {
      await reqRepairsCancel(this.detail.id);
      await showToast({ title: '取消成功!' });
      this.initDetail(this.detail.id);
      this.$uma.trackEvent('Um_Event_Item_Unrepair', {
        Um_Key_ItemName: this.detail.title,
        Um_Key_ItemPhone: this.detail.tel,
        Um_Key_ItemDeclare: this.detail.declare,
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
      });
    },
    // 编辑状态
    async onEditRepair(status: Key) {
      await reqAdminEditRepairs(this.detail.id, status);
      await showToast({ title: '提交成功!' });
      this.initDetail(this.detail.id);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { id: string; type?: string }) {
    this.type = options.type || this.type;
    this.initDetail(options.id);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page(guarantee-details);
.card-guarantee-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .tips {
    font-size: 20rpx;
  }
}
.u-steps__item__text--row {
  font-size: 20rpx;
}
.card-guarantee-item-body {
  u-image {
    display: inline-block;
  }
  .text {
    margin-bottom: 40rpx;
    font-size: 24rpx;
  }
  .title {
    margin-bottom: 28rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .images {
    text-align: left;
  }
}
</style>
