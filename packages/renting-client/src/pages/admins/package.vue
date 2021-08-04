<!--
 * @Author: Mr.wang
 * @Date: 2021-05-26 16:47:35
 * @LastEditTime: 2021-05-28 09:15:50
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="package">
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
    <div class="list-box-content">
      <div class="list-box" v-for="(item, index) in MealList" :key="index">
        <div class="list-strip">
          <div class="list-strip-left">上架时间</div>
          <div class="list-strip-right">{{ item.addtime }}</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">操作人</div>
          <div class="list-strip-right">{{ item.nickname }}</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">套餐名称</div>
          <div class="list-strip-right">{{ item.title }}</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">套餐权重</div>
          <div class="list-strip-right">{{ item.weight }}</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">套餐房源数</div>
          <div class="list-strip-right">{{ item.num }}</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">套餐有效期</div>
          <div class="list-strip-right" v-if="item.validtime != -1">
            {{ item.validtime }}天
          </div>
          <div class="list-strip-right" v-else>永久使用</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">套餐价格</div>
          <div class="list-strip-right price-text">{{ item.price }}元</div>
        </div>
        <div class="list-strip">
          <div class="list-strip-left">累计购买</div>
          <div class="list-strip-right">{{ item.count }}</div>
        </div>
        <div class="btn-box" v-if="currentTab == 0">
          <u-button shape="circle" class="drafts" @click="moveBtn(item.id)"
            >移入草稿箱</u-button
          >
        </div>
        <div class="btn-box" v-if="currentTab == 1">
          <u-button shape="circle" class="operation" @click="launchBtn(item.id)"
            >发布上架</u-button
          >
          <u-button
            shape="circle"
            class="operation"
            @click="
              $navigateTo('/pages/admins/newHousing', { meal_id: item.id })
            "
            >编辑</u-button
          >
          <u-button shape="circle" class="operation" @click="deleteBtn(item.id)"
            >删除</u-button
          >
        </div>
      </div>
      <u-empty
        v-if="!MealList.length"
        margin-top="120"
        text="暂无列表"
        mode="list"
      />
      <custom-blank v-if="!MealList.length" height="120" />
    </div>
    <div class="bottom-btn">
      <u-button
        class="btn-right"
        shape="circle"
        :ripple="true"
        @click="$navigateTo('/pages/admins/newHousing')"
      >
        添加套餐
      </u-button>
      <div class="btn-left" @click="show = true">购买须知</div>
    </div>
    <u-popup v-model="show" mode="bottom" height="600">
      <div class="popup-box">
        <div class="popup-box-top">
          <div>购买须知</div>
          <custom-icon
            name="close"
            @click="show = false"
            size="24"
          ></custom-icon>
        </div>
        <textarea v-model="noticeTetx" maxlength="200"> </textarea>
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
  reqHousingPackage,
  reqAuditSettings,
  reqLoadUnload,
  reqDeletePackage,
} from '@/api';
import { showToast } from '@/utils';
export default Vue.extend({
  components: {},
  data: () => ({
    currentTab: 0,
    // 控制购买须知
    show: false,
    // 购买须知文字
    noticeTetx: '',
    tabs: [
      { name: '已上架', id: 0 },
      { name: '草稿箱', id: 1 },
    ],
    page: 1,
    MealList: [] as any[],
    isEnd: false,
    limit: 10,
  }),
  computed: {},
  methods: {
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.MealList = await this.getList();
      console.log(this.MealList);
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqHousingPackage({
          page: this.page,
          limit: this.limit,
          status: this.currentTab == 0 ? '1' : '0',
        });
        this.noticeTetx = data.buy_notice;
        this.tabs[0].name = `已上架(${data.total_load})`;
        this.tabs[1].name = `草稿箱(${data.total_out})`;
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
      this.MealList = [...this.MealList, ...list];
    },
    // tab切换事件
    onChange(index: number) {
      this.currentTab = index;
      this.resetList();
    },
    // 唤起购买须知框
    setRefuse() {
      this.show = true;
    },
    // 保存购买须知
    async serConfirmRejection() {
      await reqAuditSettings({ name: 'buy_notice', value: this.noticeTetx });
      this.show = false;
      await showToast({ title: '设置成功!' });
    },
    // 发布上架
    launchBtn(id: string) {
      uni.showModal({
        content: '是否发布上架',
        success: async (res) => {
          if (res.confirm) {
            // console.log('用户点击确定');
            await reqLoadUnload({
              meal_id: id,
              status: 1,
            });
            await showToast({ title: '发布上架成功！' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 移入草稿箱
    moveBtn(id: string) {
      uni.showModal({
        content: '是否把该套餐移入草稿箱',
        success: async (res) => {
          if (res.confirm) {
            await reqLoadUnload({
              meal_id: id,
              status: 0,
            });
            await showToast({ title: '移入草稿箱成功！' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    // 删除
    deleteBtn(id: string) {
      uni.showModal({
        content: '是否删除该套餐',
        success: async (res) => {
          if (res.confirm) {
            await reqDeletePackage({
              meal_id: id,
            });
            await showToast({ title: '删除套餐成功！' });
            this.resetList();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
  },
  watch: {},

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
.package {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0 0 140rpx 0;

  .list-box-content {
    padding: 0 32rpx;
  }
  .list-box {
    margin-top: 20rpx;
    padding: 40rpx 20rpx 28rpx 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    .list-strip {
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .list-strip-left {
      font-size: 24rpx;
      color: #adadad;
    }
    .list-strip-right {
      font-size: 24rpx;
      color: #000;
    }
    .price-text {
      color: #ff7e5f;
    }
    .btn-box {
      margin-top: 40rpx;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .operation {
        .u-btn {
          margin-left: 20rpx;
          font-size: 28rpx;
          color: #000;
          width: 160rpx;
          height: 64rpx;
        }
      }
    }
    .drafts {
      .u-btn {
        font-size: 28rpx;
        color: #000;
        width: 180rpx;
        height: 64rpx;
      }
    }
  }
  .bottom-btn {
    display: flex;
    z-index: 200;
    align-items: center;
    flex-direction: row-reverse;
    position: fixed;
    width: 100%;
    height: 120rpx;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .btn-left {
      font-size: 28rpx;
      color: #ff7e5f;
    }
    .btn-right {
      margin: 0 20rpx;
      .u-btn {
        color: #fff;
        background-color: #ff7e5f;
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
