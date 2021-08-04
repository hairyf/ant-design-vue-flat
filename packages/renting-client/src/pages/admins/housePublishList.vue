<!--
 * @Author: liupei
 * @LastEditors: Mr.wang
-->
<template>
  <div class="publish-list-wrap">
    <!-- 头部个人信息 -->
    <div class="header">
      <div class="top">
        <div class="avatar-wrap" @click="$navigateTo('/pages/users/userInfo')">
          <img :src="headerInfo.avatar" alt class="avatar" />
        </div>
        <div class="right-info">
          <div class="info">
            <div class="info-item">
              <div class="info-item-top">{{ headerInfo.perpetual }}</div>
              <div class="info-item-bot">永久房源</div>
            </div>
            <div class="line"></div>
            <div class="info-item">
              <div class="info-item-top">{{ headerInfo.astrict }}</div>
              <div class="info-item-bot">限时房源</div>
            </div>
          </div>
          <div class="buy-btn" @click="showbuySetPop = true">购买套餐</div>
        </div>
      </div>
      <div class="mid">
        <div class="left">
          <span class="name">{{ headerInfo.nickname }}</span>
          <span class="phone">{{ headerInfo.mobile }}</span>
          <span
            v-if="headerInfo.authenticstatus === 0"
            class="to-idcard"
            @click="$navigateTo('/pages/users/authentication')"
            >去实名</span
          >
        </div>
        <div class="right">
          已加入平台
          <span class="needcolor">{{ headerInfo.time }}</span
          >天
        </div>
      </div>
      <div class="bot">
        <img
          v-if="headerInfo.authenticstatus === 1"
          src="@/static/icons/vc-flag.png"
          alt
          class="bot-flag"
        />
        <img v-else src="@/static/icons/v-flag.png" alt class="bot-flag" />
        <span
          :style="{
            color: headerInfo.authenticstatus === 1 ? '#558BF7' : '#ADADAD',
          }"
          class="bot-text"
        >
          {{
            headerInfo.authenticstatus === 1
              ? headerInfo.authentication
              : headerInfo.authentication
          }}
        </span>
      </div>
    </div>
    <!-- 中间tab -->
    <div class="tab-wrap">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="tab-item"
        :class="{ 'tab-item-select': selectIndex === index }"
        @click="selectIndex = index"
      >
        <span class="text">{{ item }}</span>
        <span class="num">{{ tabNumList[index] }}</span>
      </div>
    </div>
    <!-- 房源内容部分 -->
    <div class="content" v-if="list.length > 0">
      <div
        class="content-item"
        v-for="(item, index) in list"
        :key="index"
        @click="clickItem(item.id)"
      >
        <div class="item-left">
          <img :src="item.image_text" alt class="image" />
        </div>
        <div class="item-right">
          <div class="title">{{ item.name }}</div>
          <div class="attr">
            {{
              `${item.extra_house_type || '暂无'} ${item.area || 0}m² ${
                item.extra_house_direction || '暂无'
              } ${item.floor || 1}/${item.extra_house_floor || '暂无'}`
            }}
          </div>
          <div class="price">￥{{ item.price }}/月</div>
          <div class="info">
            <div class="left">
              <img :src="headerInfo.avatar" alt class="image" />
              <span class="text">{{ headerInfo.nickname }}</span>
            </div>
            <div class="right">{{ item.time }}</div>
          </div>
          <div class="time">
            发布时间：{{ $format(item.createtime, 'YYYY-MM-DD hh:mm:ss') }}
          </div>
          <div class="house-code">
            <div class="code">房源编码：{{ item.code || 1000 }}</div>
            <div class="copy" @click="copyme">复制</div>
          </div>
          <div class="btn-wrap">
            <div
              class="action-btn"
              v-if="selectIndex === 0 || selectIndex === 1"
              @click.stop="
                $uni.makePhoneCall({
                  phoneNumber: '114', //仅为示例
                })
              "
            >
              联系平台
            </div>
            <div
              class="action-btn"
              v-if="selectIndex === 0 || selectIndex === 1"
              @click="moveToDraft(item.id)"
            >
              移入草稿箱
            </div>
            <div
              class="action-btn"
              v-if="selectIndex === 2"
              @click="toDelete(item.id)"
            >
              删除
            </div>
            <div
              class="action-btn"
              v-if="selectIndex === 2"
              @click="
                $navigateTo('/pages/baseTabBars/publish', { id: item.id })
              "
            >
              编辑
            </div>
            <div
              class="action-btn"
              v-if="selectIndex === 2"
              @click="verify(item.id)"
            >
              提交审核
            </div>
          </div>
        </div>
      </div>
    </div>
    <u-popup v-model="showbuySetPop" mode="bottom" border-radius="14" closeable>
      <common-buyset v-if="showbuySetPop" />
    </u-popup>
    <u-empty v-if="!list.length" margin-top="120" text="暂无列表" mode="list" />
    <custom-blank v-if="!list.length" height="120" />
    <div class="to-publish" @click="publish">
      <span class="flag">+</span>发布房源
    </div>
  </div>
</template>

<script lang="ts">
import {
  reqUserHouseList,
  reqHouseUser,
  reqHouseSet,
  reqAudit,
  reqHouseDelete,
} from '@/api';
import { navigateTo, showToast } from '@/utils';
import store from '@/store';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 购买套餐弹框显隐
    showbuySetPop: false,
    // 会员头部信息
    headerInfo: {} as any,
    // tab数据
    tabList: ['已发布', '待审核', '草稿箱'],
    // tab后面带的number
    tabNumList: [] as any[],
    // 选中tab的索引
    selectIndex: 0,
    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
    // 房型 朝向 层高
    houseStyleObj: {} as any,
    houseDirecObj: {} as any,
    houseHeightObj: {} as any,
  }),
  computed: {
    audit() {
      switch (this.selectIndex) {
        case 0:
          return 1;

        case 1:
          return 0;

        default:
          return 2;
      }
    },
  },
  watch: {
    // 监听tab变化 渲染不同数据
    selectIndex() {
      this.resetList();
    },
  },
  methods: {
    // 点击某个房源
    clickItem(id: any) {
      if (this.selectIndex === 0) {
        navigateTo('/pages/commons/houseDetails', { id });
      }
    },
    // 获取楼盘 房型等数据
    async reqHouseSet() {
      const { data } = await reqHouseSet();
      // 房型1
      this.houseStyleObj = data.house_type;
      // 朝向1
      this.houseDirecObj = data.house_direction;
      // 层高1
      this.houseHeightObj = data.house_floor;
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
          audit: this.audit,
        });
        const arr = [];
        arr.push(data.total1);
        arr.push(data.total2);
        arr.push(data.total3);
        this.tabNumList = arr;
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
    // 获取会员头部信息
    async initHeaderInfo() {
      const { data } = await reqHouseUser({
        user_id: store.state.user.info.user_id,
      });
      this.headerInfo = data;
    },
    // 发布房源
    publish() {
      if (store.state.user.info.meal_total > 0) {
        navigateTo('/pages/baseTabBars/publish');
      } else {
        this.showbuySetPop = true;
      }
    },
    // 移入草稿箱
    moveToDraft(id: string | number) {
      uni.showModal({
        content: '是否确定移入草稿箱',
        success: async (res) => {
          if (res.confirm) {
            await reqAudit({
              house_id: id,
              audit: -2,
            });
            await showToast({ title: '操作成功!' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 复制房源编码到粘贴板
    copyme(text: string) {
      uni.setClipboardData({ data: text || '1000' });
      showToast({ title: '复制成功' });
    },
    // 删除
    toDelete(id: any) {
      uni.showModal({
        content: '是否确定删除',
        success: async (res) => {
          if (res.confirm) {
            await reqHouseDelete({
              house_id: id,
            });
            await showToast({ title: '操作成功!' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 提交审核
    verify(id: any) {
      uni.showModal({
        content: '是否要提交审核',
        success: async (res) => {
          if (res.confirm) {
            await reqAudit({
              house_id: id,
              audit: 0,
            });
            await showToast({ title: '操作成功!' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.resetList();
    this.initHeaderInfo();
    // this.reqHouseSet();
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
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.publish-list-wrap {
  background-color: #f5f5f5;
  // 头部
  .header {
    padding: 40rpx;
    background-color: #fff;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-wrap {
        width: 184rpx;
        height: 184rpx;
        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: block;
        }
      }
      .right-info {
        .info {
          display: flex;
          padding-left: 10rpx;
          padding-right: 10rpx;
          justify-content: center;
          align-items: center;
          .info-item {
            text-align: center;
            flex-grow: 1;
            .info-item-top {
              color: #000;
              font-size: 36rpx;
              font-weight: bold;
            }
            .info-item-bot {
              margin-top: 22rpx;
              font-size: 24rpx;
              color: #adadad;
            }
          }
          .line {
            width: 2rpx;
            height: 40rpx;
            background-color: #ebe9e9;
            margin-left: 20rpx;
            margin-right: 20rpx;
          }
        }
        .buy-btn {
          width: 448rpx;
          height: 64rpx;
          margin-top: 20rpx;
          line-height: 64rpx;
          text-align: center;
          border: 1rpx solid #d9d9d9;
          border-radius: 40rpx;
          font-size: 28rpx;
          color: #ff7e5f;
        }
      }
    }
    .mid {
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .name {
          font-size: 36rpx;
          color: #000;
          font-weight: bold;
        }
        .phone {
          margin-left: 32rpx;
          font-size: 24rpx;
          color: #ff7e5f;
        }
        .to-idcard {
          margin-left: 32rpx;
          font-size: 20rpx;
          color: #ff7e5f;
        }
      }
      .right {
        font-size: 24rpx;
        color: #adadad;
        .needcolor {
          color: #000;
        }
      }
    }
    .bot {
      margin-top: 28rpx;
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
  }
  // 中间tab部分
  .tab-wrap {
    margin-top: 42rpx;
    padding-left: 40rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .tab-item {
      margin-right: 80rpx;
      padding-bottom: 24rpx;
      font-size: 24rpx;
      color: #adadad;
      .num {
        margin-left: 16rpx;
      }
    }
    .tab-item.tab-item-select {
      font-size: 28rpx;
      color: #000;
      border-bottom: 4rpx solid #ff7e5f;
    }
  }
  // 房源内容部分
  .content {
    margin-top: 20rpx;
    padding-left: 40rpx;
    padding-right: 24rpx;
    padding-bottom: 106rpx;
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
              color: #adadad;
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
        .time {
          margin-top: 24rpx;
          font-size: 24rpx;
          color: #adadad;
        }
        .house-code {
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .code {
            font-size: 24rpx;
            color: #adadad;
          }
          .copy {
            font-size: 24rpx;
            color: #ff7e5f;
          }
        }
        .btn-wrap {
          margin-top: 40rpx;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .action-btn {
            min-width: 160rpx;
            height: 60rpx;
            margin-left: 20rpx;
            line-height: 60rpx;
            box-sizing: border-box;
            border: 2rpx solid #d9d9d9;
            border-radius: 40rpx;
            padding: 0 20rpx;
            font-size: 28rpx;
            color: #ff7e5f;
            text-align: center;
            flex-shrink: 0;
          }
        }
      }
    }
  }
  // 发布房源按钮
  .to-publish {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #fff;
    height: 96rpx;
    line-height: 96rpx;
    font-size: 34rpx;
    text-align: center;
    color: #ff7e5f;
    .flag {
      font-size: 48rpx;
      margin-right: 6rpx;
      vertical-align: bottom;
    }
  }
}
.nodatatips {
  font-size: 30rpx;
  padding: 20rpx;
  color: #adadad;
}
</style>
