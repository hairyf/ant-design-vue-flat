<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-18 15:19:53
 * @LastEditTime: 2021-06-16 18:27:10
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="house-details">
    <common-empty-page text="房源已下架" :empty="!detail">
      <u-swiper
        :list="swpierList"
        :height="540"
        mode="number"
        indicator-pos="bottomRight"
        @click="onLookSwiperImage"
      />
      <!-- 头部容器 -->
      <div class="header-container">
        <div class="title">{{ detail.name }}</div>
        <div class="price-collection u-flex u-row-between">
          <div class="price">¥ {{ detail.price }}元/月</div>
          <!-- <custom-icon name="like" :size="48" /> -->
        </div>
        <!-- <div
          class="address-info u-flex"
          @click="$lookMap(detail.lat, detail.lng)"
        >
          <custom-icon name="location-1" :size="48" />
          <span>{{ detail.address }}</span>
          <image class="address-bg" :src="addressBgImage" />
        </div>-->
        <div class="postion-wrap">
          <div class="p-flag">
            <u-icon name="map-fill" color="#FF7E5F" size="32"></u-icon>
          </div>
          <div class="p-text">{{ detail.address }}</div>
        </div>
        <div class="per-info">
          <div
            class="left"
            @click="
              $navigateTo('/pages/commons/personalHouseList', {
                id: detail.user_id,
              })
            "
          >
            <img :src="detail.user.avatar" alt class="image" />
            <span class="text">{{ detail.user.nickname }}</span>
          </div>
          <div class="right">
            <div class="a">
              {{ detail.authentication }}
            </div>
            <div class="b">{{ detail.time }}</div>
          </div>
        </div>
      </div>
      <!-- 房型信息 -->
      <div class="info-container">
        <div class="title">房型信息</div>
        <div class="u-flex u-row-between">
          <div class="info-item">
            <span class="tips">房型：</span>
            <span class="text">{{ detail.extra_house_type || '暂无' }}</span>
          </div>
          <div class="info-item">
            <span class="tips">面积：</span>
            <span class="text">{{
              detail.area ? detail.area + '㎡' : '暂无'
            }}</span>
          </div>
        </div>
        <custom-blank :height="40" />
        <div class="u-flex u-row-between">
          <div class="info-item">
            <span class="tips">楼层：</span>
            <span class="text">{{ detail.extra_house_floor || '暂无' }}</span>
          </div>
          <div class="info-item">
            <span class="tips">朝向：</span>
            <span class="text">{{
              detail.extra_house_direction || '暂无'
            }}</span>
          </div>
        </div>
      </div>
      <!-- 房型配套 -->
      <div class="matching-container" v-if="detail.softwear.length">
        <div class="title">房型配套</div>
        <u-grid :col="5" :border="false" hover-class="none">
          <u-grid-item v-for="(item, index) in detail.softwear" :key="index">
            <!-- :color="item.notEmpty ? '#000000' : '#e5e5e5'" -->
            <u-icon
              size="56"
              custom-prefix="custom-icon"
              :name="item.image_text"
            />
            <view class="grid-text">{{ item.name }}</view>
          </u-grid-item>
        </u-grid>
      </div>
      <!-- 房型介绍 -->
      <div class="introduce-container">
        <div class="title">房型介绍</div>
        <u-read-more>
          <u-parse :html="detail.content"></u-parse>
        </u-read-more>
        <div
          class="detail-images"
          v-for="(item, index) in detail.detali_img"
          :key="index"
        >
          <img class="i-images" :src="item" alt="" />
        </div>
      </div>
      <!-- 位置及周边 -->
      <div class="periphery-container">
        <div class="title">位置及周边</div>
        <map
          @click="$lookMap(detail.lat, detail.lng)"
          style="width: 100%; height: 468rpx"
          :latitude="detail.lat"
          :longitude="detail.lng"
        />
      </div>
      <!-- 好房推荐 -->
      <div class="recommend-house" v-if="state == 1 || state == -1">
        <!-- <div class="title">好房推荐</div>
        <common-house-list :list="list" />
        <custom-blank height="20" /> -->
        <div
          class="content-item"
          v-for="(item, index) in list"
          :key="index"
          @click="$navigateTo('/pages/commons/houseDetails', { id: item.id })"
        >
          <div class="item-left">
            <img :src="item.image_text" alt class="image" />
          </div>
          <div class="item-right">
            <div class="title">
              {{ item.name }}
            </div>
            <div class="attr">
              {{
                `${item.extra_house_type || ''} ${item.area || 0}m² ${
                  item.extra_house_direction || ''
                } ${item.floor || 1}${
                  item.extra_house_floor
                    ? '/' + item.extra_house_floor
                    : '/暂无'
                }`
              }}
            </div>
            <div class="price">￥{{ item.price }}/月</div>
            <div class="info">
              <div class="left">
                <img :src="detail.user.avatar" alt class="image" />
                <span class="text">{{ detail.user.nickname }}</span>
              </div>
              <div class="right">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部操作栏 -->
      <common-fixed-footer v-if="state == 1 || state == -1">
        <div class="mini-btns u-flex" @click="onCollection">
          <custom-icon
            :name="detail.collect ? 'like-select' : 'like'"
            :size="48"
          />
          <span>收藏</span>
        </div>
        <button class="u-reset-button mini-btns u-flex" open-type="share">
          <custom-icon name="upload" :size="48" />
          <span>分享</span>
        </button>
        <u-button
          class="u-flex-1 u-margin-right-20"
          shape="circle"
          type="warning"
          @click="
            $uni.makePhoneCall({
              phoneNumber: detail.user.mobile, //仅为示例
            })
          "
          >联系房东</u-button
        >
        <!-- <u-button
          class="u-flex-1"
          shape="circle"
          type="primary"
          @click="onGoToRenting"
          >立即租房</u-button> -->
        <u-button
          class="u-flex-1"
          shape="circle"
          type="primary"
          @click="
            $navigateTo('/pages/appointments/editLookHouse', { id: detail.id })
          "
          >预约看房</u-button
        >
      </common-fixed-footer>
      <!-- 底部操作栏 -->
      <div class="btn-box" v-if="state == 0">
        <u-button shape="circle" class="btn-right" @click="adoptBtn()"
          >通过</u-button
        >
        <u-button shape="circle" @click="setRefuse()">拒绝</u-button>
      </div>
      <u-back-top :scroll-top="scrollTop"></u-back-top>
    </common-empty-page>
    <u-popup v-model="show" mode="bottom">
      <div class="popup-box" height="600">
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
<!--  -->
<script lang="ts">
import {
  reqHouseCollect,
  reqHouseDetail,
  reqUserHouseList,
  reqAudit,
} from '@/api';
import { staticUrls } from '@/config';
import store from '@/store';
import { navigateBack, paramsAnaly, showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 是否是审核
    state: -1,
    // 当前id
    id: '',
    // 拒绝内容
    refuseTetx: '',
    // 控制拒绝
    show: false,
    scrollTop: 0,
    addressBgImage: staticUrls['address-bg'],
    // 轮播图列表
    swpierList: [] as { image: string }[],
    // 详情信息
    detail: null as any,
    // 配套信息
    matchings: [
      { notEmpty: true, icon: 'conditioner', text: '空调' },
      { notEmpty: true, icon: 'washing-machine', text: '洗衣机' },
      { notEmpty: false, icon: 'computer', text: '电视' },
      { notEmpty: true, icon: 'smoke-machine', text: '油烟机' },
      { notEmpty: true, icon: 'heater', text: '热水器' },
      { notEmpty: true, icon: 'bed', text: '床' },
      { notEmpty: true, icon: 'cabinet', text: '衣柜' },
      { notEmpty: false, icon: 'sofa', text: '沙发' },
      { notEmpty: false, icon: 'ice-case', text: '冰箱' },
      { notEmpty: false, icon: 'network', text: '网络' },
      { notEmpty: true, icon: 'elevator', text: '电梯' },
    ],
    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {
    isAuthPhoneCode: (): boolean => store.getters.isAuthPhoneCode,
    urls() {
      return this.swpierList.map((item) => item.image);
    },
  },
  methods: {
    // 确定按钮
    adoptBtn() {
      uni.showModal({
        content: '是否确定通过审核',
        success: async (res) => {
          if (res.confirm) {
            await reqAudit({
              house_id: this.id,
              audit: 1,
            });
            await showToast({ title: '通过成功!' });
            navigateBack();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 唤起拒绝框
    setRefuse() {
      this.show = true;
    },
    // 确定拒绝和退回发布人
    async serConfirmRejection() {
      await reqAudit({
        house_id: this.id,
        audit: -1,
        remark: this.refuseTetx,
      });
      this.show = false;
      await showToast({ title: '拒绝成功!' });
      navigateBack();
    },
    // 跳转至立即租房
    async onGoToRenting() {
      if (this.isAuthPhoneCode) {
        this.$navigateTo('/pages/orders/confirmRentOrder', {
          id: this.detail.id,
        });
      } else {
        this.$navigateTo('/pages/commons/weChatLogin', {});
      }
    },
    // 点击查看轮播图
    onLookSwiperImage(index: number) {
      uni.previewImage({
        current: index as any,
        urls: this.urls,
      });
    },
    // 初始化详情数据
    async initDetail(id: Key) {
      const { data: detail } = await reqHouseDetail(id);
      if (!detail) {
        return false;
      }
      this.swpierList = detail.images_text.map((item: string) => ({
        image: item,
      }));
      detail.lng = Number(detail.lng);
      detail.lat = Number(detail.lat);
      this.detail = detail;
    },
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
      (this.$refs.uDropdown as any)?.close();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqUserHouseList({
          page: this.page,
          limit: this.limit,
          audit: 1,
          user_id: this.detail.user_id,
        });
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
      this.list = [...this.list, ...list];
    },
    // 进行收藏
    async onCollection() {
      await store.dispatch('getBeOverdueLogin').catch(() => {
        showToast({ title: '请先登录' });
        return Promise.reject();
      });
      const isCollect = !!this.detail.collect;
      await reqHouseCollect(
        this.detail.id,
        isCollect ? 'uncollect' : 'collect'
      );
      this.detail.collect = !isCollect;
      // 收藏与取消埋点（友盟+）
      if (!isCollect) {
        this.$uma.trackEvent('Um_Event_ItemFavorite', {
          Um_Key_ItemName: this.detail.name,
          Um_Key_ItemID: this.detail.id,
          Um_Key_ItemPrice: this.detail.price + '元/月',
          Um_Key_UserID: store.state.user.info?.user_id.toString(),
        });
      } else {
        this.$uma.trackEvent('Um_Event_Item_Unfavorite', {
          Um_Key_ItemName: this.detail.name,
          Um_Key_ItemID: this.detail.id,
          Um_Key_ItemPrice: this.detail.price + '元/月',
          Um_Key_UserID: store.state.user.info?.user_id.toString(),
        });
      }
      showToast({ title: isCollect ? '取消收藏成功' : '收藏成功' });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(options: { id: string; state: number }) {
    await this.initDetail(options.id);
    this.id = options.id;
    if (options.state) {
      this.state = options.state;
    }
    this.resetList();
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
  onReachBottom() {
    this.onNextList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },
  // 页面处理函数--用户点击右上角分享
  onShareAppMessage() {
    return {
      title: store.state.common.name,
      imageUrl: this.detail.image_text,
      path: paramsAnaly('/pages/commons/houseDetails', { id: this.detail.id }),
    };
  },
  onShareTimeline() {
    const that = this as any;
    return {
      title: store.state.common.name,
      query: `id=${that.detail.id}`,
      imageUrl: '',
    };
  },
});
</script>

<style lang="scss">
@include full-page(house-details);
.base-container {
  padding: 32rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
  .title {
    margin-bottom: 28rpx;
    font-weight: bold;
  }
}
/* 头部容器 */
.header-container {
  padding: 40rpx;
  @extend .base-container;
  .title {
    word-wrap: break-word;
    margin-bottom: 20rpx;
    font-size: 34rpx;
    font-weight: bold;
  }
  .price-collection {
    margin-bottom: 40rpx;
  }
  .address-info {
    position: relative;
    padding: 20rpx;
    custom-icon,
    span {
      position: relative;
      z-index: 1;
    }
    span {
      @include text-ellipsis(400rpx);
      display: inline-block;
      margin-top: -10rpx;
      margin-left: 10rpx;
    }
  }
  .address-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
/* 信息容器 */
.info-container {
  @extend .base-container;
  .info-item {
    width: 280rpx;
    .tips {
      font-size: 22rpx;
      color: #adadad;
    }
  }
}
/* 配型容器 */
.matching-container {
  @extend .base-container;
  padding-bottom: 5rpx;
  .title {
    margin-bottom: 5rpx;
  }
}
/* 介绍容器 */
.introduce-container {
  @extend .base-container;
  .detail-images {
    .i-images {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
/* 位置及周边 */
.periphery-container {
  @extend .base-container;
  background-color: transparent;
  padding-bottom: 0;
  padding-top: 5rpx;
}
/* 好房推荐 */
.recommend-house {
  @extend .base-container;
  background-color: transparent;
  padding-bottom: 0;
  padding-top: 5rpx;
}
.mini-btns {
  flex-direction: column;
  margin-right: 60rpx;
}
// 新加的样式
.postion-wrap {
  display: flex;
  align-items: center;
  .p-text {
    margin-left: 20rpx;
    font-size: 24rpx;
    color: #000;
  }
}
.per-info {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .image {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
    }
    .text {
      margin-left: 16rpx;
      font-size: 24rpx;
      color: #000;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .a,
    .b {
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      font-size: 20rpx;
      color: #adadad;
      background: #f5f5f5;
      border-radius: 4rpx;
      padding-left: 12rpx;
      padding-right: 12rpx;
    }
    .b {
      margin-left: 20rpx;
    }
  }
}
.content-item {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .item-left {
    width: 160rpx;
    height: 160rpx;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
      display: block;
    }
  }
  .item-right {
    width: 466rpx;
    .title {
      font-size: 28rpx;
      color: #000;
      height: 40rpx;
      line-height: 40rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .attr {
      margin-top: 20rpx;
      font-size: 24rpx;
      color: #adadad;
    }
    .price {
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #ff7e5f;
    }
    .info {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .image {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }
        .text {
          margin-left: 16rpx;
          font-size: 24rpx;
          color: #000;
        }
      }
      .right {
        width: 140rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        color: #000;
        font-size: 20rpx;

        border: 2rpx solid #f2f2f2;
        box-sizing: border-box;
        border-radius: 40rpx;
      }
    }
  }
}
.btn-box {
  position: fixed;
  padding: 20rpx;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: row-reverse !important;
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
.popup-box {
  height: 600rpx;
  padding: 40rpx;
  background-color: #fff;
  .popup-box-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
    background: #ff7e5f !important;
    color: #fff !important;
  }
}
</style>
