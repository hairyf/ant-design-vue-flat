<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-15 09:20:51
 * @LastEditTime: 2021-06-18 09:39:15
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="home-page">
    <!-- 自定义头部导航 -->
    <u-navbar :is-back="false" :border-bottom="false">
      <div class="address u-flex" @click="showCitySelectPopup = true">
        <custom-icon style="margin-top: 8rpx" name="location" />
        <span class="u-margin-right-15">{{ location.name || '暂无定位' }}</span>
      </div>
      <u-search
        :show-action="false"
        :clearabled="false"
        disabled
        @click="$navigateTo('/pages/commons/search')"
        placeholder="你想住哪里"
        bg-color="none"
        border-color="#ADADAD"
        style="margin-right: 35rpx"
      ></u-search>
    </u-navbar>
    <!-- 轮播图 -->
    <custom-blank :height="16" />
    <u-swiper
      :list="swpierList"
      :effect3d="true"
      :height="340"
      @click="onBannerClick"
    />
    <!-- 房源类型 -->
    <u-grid :col="4" :border="false">
      <u-grid-item bg-color="none" @click="onSwitchSearchTab()">
        <custom-icon size="112" name="home-high-quality" />
        <span>优质</span>
      </u-grid-item>
      <u-grid-item bg-color="none" @click="onSwitchSearchTab()">
        <custom-icon size="112" name="home-apartment" />
        <span>公寓</span>
      </u-grid-item>
      <u-grid-item
        bg-color="none"
        @click="onSwitchSearchTab({ other: { lease_type: 1 } })"
      >
        <custom-icon size="112" name="home-whole-rent" />
        <span>整租</span>
      </u-grid-item>
      <u-grid-item
        bg-color="none"
        @click="onSwitchSearchTab({ other: { lease_type: 2 } })"
      >
        <custom-icon size="112" name="home-sharing" />
        <span>合租</span>
      </u-grid-item>
      <u-grid-item
        bg-color="none"
        @click="$navigateTo('/pages/commons/periphery')"
      >
        <custom-icon size="112" name="home-metro" />
        <span>地铁找房</span>
      </u-grid-item>
      <u-grid-item
        bg-color="none"
        @click="onSwitchSearchTab({ filter: { areaIndex: 0 } })"
      >
        <custom-icon size="112" name="home-cycling" />
        <span>骑行上班</span>
      </u-grid-item>
      <u-grid-item
        bg-color="none"
        @click="onSwitchSearchTab({ other: { house_type: 100 } })"
      >
        <custom-icon size="112" name="home-single-room" />
        <span>单间</span>
      </u-grid-item>
      <u-grid-item bg-color="none" @click="onSwitchSearchTab()">
        <custom-icon size="112" name="home-self-support" />
        <span>自营保障</span>
      </u-grid-item>
    </u-grid>
    <!-- 精选房源 -->
    <div class="house-selected">
      <div class="house-selected-title">精选房源</div>
      <!-- <common-house-list :list="list" /> -->
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
          <div class="title">{{ item.name }}</div>
          <div class="attr">
            {{
              `${item.extra_house_type || ''} ${item.area}m² ${
                item.extra_house_direction || ''
              } ${item.floor}${
                item.extra_house_floor ? '/' + item.extra_house_floor : ''
              }`
            }}
          </div>
          <div class="price">￥{{ item.price }}/月</div>
          <div class="info">
            <div class="personal-info">
              <img :src="item.user.avatar" alt class="image" />
              <span class="text">{{ item.user.nickname }}</span>
            </div>
            <div class="tag-wrap">
              <div class="bot">
                <img
                  v-if="
                    item.authentication === '个人已实名' ||
                    item.authentication === '企业已实名'
                  "
                  src="@/static/icons/vc-flag.png"
                  alt
                  class="bot-flag"
                />
                <img
                  v-else
                  src="@/static/icons/v-flag.png"
                  alt
                  class="bot-flag"
                />
                <span
                  :style="{
                    color:
                      item.authentication === '个人已实名' ||
                      item.authentication === '企业已实名'
                        ? '#558BF7'
                        : '#ADADAD',
                  }"
                  class="bot-text"
                  >{{ item.authentication }}</span
                >
              </div>
              <!-- <div class="protect" v-else>自营保障</div> -->
              <div class="right" v-if="item.time">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 城市选择器 -->
    <u-popup
      v-model="showCitySelectPopup"
      mode="bottom"
      border-radius="14"
      height="850"
    >
      <div class="city-select-header">
        <div class="u-flex u-row-between">
          <span class="tips">选择城市</span>
          <u-icon @click="showCitySelectPopup = false" name="close" size="26" />
        </div>
        <custom-blank :height="30" />
        <u-search
          v-model="searchText"
          :show-action="false"
          @click="$navigateTo('/pages/commons/search')"
          placeholder="输入城市名"
          bg-color="none"
          border-color="#ADADAD"
        ></u-search>
        <custom-blank :height="38" />
        <div class="address-info u-flex u-row-between">
          <div class="left-column u-flex">
            <custom-icon style="margin-top: 10rpx" name="location" :size="48" />
            <span class="u-margin-left-15">
              <span>当前定位：</span>
              <span class="yellow">{{ location.name || '暂无定位' }}</span>
            </span>
          </div>
          <u-icon
            @click="$store.dispatch('getIpLocation')"
            color="#acacac"
            name="reload"
            size="48"
          />
        </div>
      </div>
      <custom-blank :height="20" bg-color="#f5f5f5" />
      <div class="city-select-body">
        <div
          class="character-container u-border-bottom"
          v-for="(list, key) in regionList"
          :key="key"
        >
          <div class="character-text">{{ key }}</div>
          <div
            class="address-item"
            v-for="(item, index) in list"
            :key="index"
            @click="$store.commit('receve_location', item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </u-popup>
    <!-- 自定义tabbar -->
    <custom-tabbar />
  </div>
</template>

<script lang="ts">
import {
  reqHouseBanner,
  reqHouseList,
  reqRegionList,
  reqSetmealGet,
} from '@/api';
import store from '@/store';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 套餐列表
    mealList: [] as any[],
    //购买须知
    readme: '',
    //当前选择的套餐index
    selectIndex: 0,
    // 购买套餐pop显隐
    showbuySetPop: false,
    // 轮播图
    swpierList: [] as any[],

    // 地址相关
    showCitySelectPopup: false,
    searchText: '',
    regionList: {} as any,

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {
    location: () => store.state.common.location,
  },
  methods: {
    // 获取房源套餐
    async reqSetmealGet() {
      const { data } = await reqSetmealGet();
      this.readme = data.buy_notice;
      this.mealList = data.data;
      console.log(data);
    },
    // 轮播图点击
    onBannerClick(index: number) {
      const swpierItem = this.swpierList[index];
      typeof swpierItem.id !== 'undefined' &&
        this.$navigateTo('/pages/commons/houseDetails', {
          id: swpierItem.id,
        });
    },
    // 初始化轮播图
    async initBanner() {
      const { data } = await reqHouseBanner();
      this.swpierList = data.map((item) => {
        return {
          id: item.house_id,
          image: item.image_text,
        };
      });
    },
    // 初始化获取地址列表
    async initRegionList() {
      const { data } = await reqRegionList(this.searchText);
      this.regionList = data;
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
        const { data } = await reqHouseList({
          page: this.page,
          limit: this.limit,
          // search: {
          //   boutique: 1,
          // },
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
    // 跳转至搜索页, 并携带参数
    onSwitchSearchTab(opts?: any) {
      uni.setStorageSync('search-params', opts);
      this.$switchTab('/pages/baseTabBars/searchHouse');
    },
  },
  watch: {
    searchText() {
      this.initRegionList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    store.dispatch('getIpLocation');
    this.resetList();
    this.initBanner();
    this.initRegionList();
    // this.reqSetmealGet();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {},
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    this.onNextList();
  },
  onShareAppMessage: () => {
    return {
      title: store.state.common.name,
      imageUrl: '',
      path: '/pages/baseTabBars/homePage',
    };
  },
  onShareTimeline: () => {
    return {
      title: store.state.common.name,
      query: '',
      imageUrl: '',
    };
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page(home-page);
.address {
  flex-shrink: 0;
  margin: 0 25rpx;
  margin-right: 20rpx;
}
.house-types {
  margin: 20rpx 28rpx;
  .tips {
    font-size: 20rpx;
    color: #acacac;
  }
  .layer-1 {
    margin-bottom: 20rpx;
    .item-container {
      @include not-last-child(margin-right, 20rpx);
      justify-content: center;
      flex: 1;
      padding: 0 28rpx;
      border-radius: 20rpx;
      &.whole {
        background-color: #deefff;
      }
      &.shar {
        background-color: #ffe6e0;
      }
    }
  }
  .layer-2 {
    .item-container {
      @include not-last-child(margin-right, 40rpx);
      position: relative;
      padding: 24rpx 20rpx;
      border: 1rpx solid #feb47b;
      border-radius: 20rpx;
      flex: 1;
      .title {
        margin-bottom: 10rpx;
      }
      custom-icon {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
.house-selected {
  margin: 0 25rpx;
  padding-bottom: 40rpx;
  .house-selected-title {
    margin-bottom: 20rpx;
    font-weight: bold;
  }
}
.city-select-header {
  padding: 35rpx;
  .address-info {
    .yellow {
      font-weight: bold;
      font-size: 30rpx;
      color: #ff7e5f;
    }
  }
}
.city-select-body {
  height: 526rpx;
  overflow-y: auto;
  padding: 28rpx 35rpx;
  .character-container {
    padding-bottom: 1rpx;
    margin-bottom: 28rpx;
    .address-item {
      margin: 20rpx 0;
    }
  }
}
// 新加的购买套餐POPUP样式
.buy-set-wrap {
  padding-top: 100rpx;
  padding-bottom: 40rpx;
  .title {
    padding-left: 40rpx;
    font-size: 28rpx;
    color: #070707;
  }
  .set-content {
    padding-left: 40rpx;

    margin-top: 40rpx;
    box-sizing: border-box;
    width: 100%;
    .flex-wrap {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      min-width: 100%;
      .item {
        width: 300rpx;
        height: 240rpx;
        border-radius: 40rpx;
        margin-right: 20rpx;
        box-sizing: border-box;
        padding: 20rpx;
        flex-shrink: 0;
        .a {
          font-size: 28rpx;
          height: 40rpx;
          line-height: 40rpx;
        }
        .b {
          margin-top: 12rpx;
          font-size: 48rpx;
          height: 68rpx;
          line-height: 68rpx;
          font-weight: bold;
        }
        .c,
        .d {
          margin-top: 12rpx;
          font-size: 20rpx;
          height: 28rpx;
          line-height: 28rpx;
        }
      }
    }
  }
  .buy-needknow {
    padding: 0 40rpx;
    margin-top: 72rpx;
    .title {
      font-size: 28rpx;
      padding-left: 0;
      color: #070707;
    }
    .readme {
      margin-top: 40rpx;
      font-size: 24rpx;
      color: #adadad;
      line-height: 34rpx;
    }
  }
  .bot {
    padding: 0 40rpx;
    margin-top: 58rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    .needcolor {
      color: #ff7e5f;
    }
    .right {
      width: 180rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
      border-radius: 40rpx;
      background-color: #ff7e5f;
    }
  }
}
// 新加的房源列表内容样式
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
      font-weight: bold;
      color: #ff7e5f;
    }
    .info {
      margin-top: 20rpx;
      .personal-info {
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
      .tag-wrap {
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .bot {
          width: 140rpx;
          height: 32rpx;
          display: flex;
          border: 2rpx solid #f2f2f2;
          align-items: center;
          box-sizing: border-box;
          border-radius: 40rpx;
          .bot-flag {
            width: 20rpx;
            height: 20rpx;
            border-radius: 20rpx;
            display: block;
          }
          .bot-text {
            font-size: 20rpx;
            color: #adadad;
            margin-left: 4rpx;
          }
        }
        .protect {
          width: 100rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
          background-color: #62bb62;
          border-radius: 40rpx;
          font-size: 20rpx;
          color: #fff;
        }
        .right {
          width: 140rpx;
          height: 32rpx;
          margin-left: 20rpx;
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
}
</style>
