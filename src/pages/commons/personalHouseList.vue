<!--
 * @Author: liupei
 * @LastEditors: Mr.wang
-->
<!-- 点击详情页头像进入的个人房源列表 -->
<template>
  <div class="publish-list-wrap">
    <!-- 头部个人信息 -->
    <div class="header">
      <div class="top">
        <div class="avatar-wrap">
          <img :src="headerInfo.avatar" alt class="avatar" />
        </div>
        <div class="right-info">
          <div class="a">
            <span class="name">{{ headerInfo.name }}</span>
            <div class="bot">
              <img
                v-if="
                  headerInfo.authentication === '个人已实名' ||
                  headerInfo.authentication === '企业已实名' ||
                  headerInfo.authenticstatus === 1
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
                    headerInfo.authentication === '个人已实名' ||
                    headerInfo.authentication === '企业已实名' ||
                    headerInfo.authenticstatus === 1
                      ? '#558BF7'
                      : '#ADADAD',
                }"
                class="bot-text"
                >{{ headerInfo.authentication }}</span
              >
            </div>
          </div>

          <div class="phone">{{ headerInfo.mobile }}</div>
          <div class="already">发布房源{{ ' ' + headerInfo.total }}</div>
          <div class="right">
            已加入平台
            <span class="needcolor">{{ headerInfo.time }}</span
            >天
          </div>
        </div>
      </div>
    </div>
    <!-- 房源内容部分 -->
    <div class="content">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reqUserHouseList, reqHouseUser } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 当前用户的id
    userid: '' as any,
    // 会员头部信息
    headerInfo: {} as any,
    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
    // tab数据
    tabList: ['已发布', '待审核', '草稿箱'],
    // 选中tab的索引
    selectIndex: 0,
  }),
  computed: {},
  watch: {
    // 监听tab变化 渲染不同数据
    selectIndex() {},
  },
  methods: {
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
          user_id: this.userid,
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
    // 获取会员头部信息
    async initHeaderInfo() {
      const { data } = await reqHouseUser({
        user_id: this.userid,
      });
      this.headerInfo = data;
    },
  },
  // 页面周期函数--监听页面加载
  onLoad(option: any) {
    if (!option.id) {
      uni.navigateBack({});
    } else {
      this.userid = option.id;
      this.resetList();
      this.initHeaderInfo();
    }
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
  onPullDownRefresh() {},
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
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
      justify-content: flex-start;
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
        margin-left: 80rpx;
        .a {
          display: flex;
          align-items: center;
          .name {
            font-size: 36rpx;
            color: #000;
            font-weight: bold;
          }
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
        }
        .phone {
          padding-top: 20rpx;
          font-size: 24rpx;
          color: #ff7e5f;
        }
        .already {
          margin-top: 20rpx;
          font-size: 24rpx;
          color: #adadad;
        }
        .right {
          margin-top: 20rpx;
          font-size: 24rpx;
          color: #adadad;
          .needcolor {
            color: #000;
          }
        }
      }
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
  }
}
</style>
