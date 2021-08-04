<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 16:04:55
 * @LastEditTime: 2021-01-26 12:02:03
 * @Description: 搜索页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="search">
    <!-- 历史搜索与热门搜索 -->
    <div class="history-and-hot">
      <u-search
        :animation="true"
        placeholder="输入房子类型"
        border-color="#acacac"
        bg-color="#FFFFFF"
        v-model="searchText"
        @search="implementSearch"
        @custom="implementSearch"
      />
      <template v-if="!list.length">
        <custom-blank :height="50" />
        <!-- 历史搜索 -->
        <div class="search-label">
          <div class="header">
            <span class="title">历史搜索</span>
            <custom-icon
              name="delete"
              :size="30"
              @click="showRemoveModel = true"
            />
          </div>
          <div class="body">
            <u-tag
              v-for="(item, index) in historys"
              :key="index"
              :text="item"
              @click="onLabelSearch(item)"
              color="#666666"
              bg-color="#f6f6f6"
              mode="dark"
              shape="circle"
            />
            <u-empty
              v-if="!historys.length"
              text="暂无历史记录"
              mode="history"
            ></u-empty>
          </div>
        </div>
        <!-- 热门搜索 -->
        <div class="search-label">
          <div class="header">
            <span class="title">热门搜索</span>
          </div>
          <div class="body">
            <u-tag
              v-for="(item, index) in hotTages"
              :key="index"
              :text="item"
              @click="onLabelSearch(item)"
              color="#666666"
              bg-color="#f6f6f6"
              mode="dark"
              shape="circle"
            />
            <u-empty
              v-if="!hotTages.length"
              text="暂无热门搜索"
              mode="list"
            ></u-empty>
          </div>
        </div>
      </template>
      <u-modal
        v-model="showRemoveModel"
        content="确定删除搜索记录吗？"
        :show-cancel-button="true"
        @confirm="removeHistory"
      ></u-modal>
    </div>
    <!-- 列表项 -->
    <common-house-list v-if="list.length" :list="list" />
  </div>
</template>

<script lang="ts">
import { reqHotTags, reqHouseList } from '@/api';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    searchText: '',
    showRemoveModel: false,
    hotTages: [] as string[],
    historys: [] as string[],

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {},
  methods: {
    // 添加历史记录
    unshiftHistory() {
      if (!this.searchText) return false;
      const oldIndex = this.historys.indexOf(this.searchText);
      if (oldIndex !== -1) this.historys.splice(oldIndex, 1);
      this.historys.unshift(this.searchText);
      if (this.historys.length > 8) {
        this.historys.splice(this.historys.length - 1, 1);
      }
      uni.setStorageSync('history-tags', this.historys);
    },
    // 移除历史记录
    removeHistory() {
      uni.setStorageSync('history-tags', []);
      this.historys = [];
    },
    // 执行搜索, 跳转页面
    implementSearch() {
      this.unshiftHistory();
      this.resetList();
      // 进行搜索埋点（友盟+）
      this.$uma.trackEvent('Um_Event_SearchSuc', {
        Um_Key_SearchKeyword: this.searchText,
        Um_Key_SearchPortal: '首页搜索',
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
      });
    },
    // 点击标签搜索
    onLabelSearch(searchText: string) {
      this.searchText = searchText;
      this.implementSearch();
    },
    // 获取历史标签
    getHistoryTags() {
      this.historys = uni.getStorageSync('history-tags') || [];
    },
    // 获取热门标签
    async getHotTags() {
      this.hotTages = (await reqHotTags()).data;
    },
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      if (!this.searchText) {
        this.list = [];
        return false;
      }
      this.list = await this.getList();
      if (!this.list.length) {
        setTimeout(
          () => showToast({ title: '暂无搜索结果', icon: 'none' }),
          500
        );
      }
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqHouseList({
          page: this.page,
          limit: this.limit,
          search: {
            keyword: this.searchText,
          },
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
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getHistoryTags();
    this.getHotTags();
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
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page('search', #f8f8f8);
.history-and-hot {
  background-color: #ffffff;
  padding: 0 17rpx;
  padding-top: 45rpx;
  padding-bottom: 70rpx;
}
.search-label {
  margin-bottom: 25rpx;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25rpx;
    .title {
      font-size: 30rpx;
      font-weight: 800;
      color: #333333;
    }
  }
  .body {
    u-tag {
      margin-right: 15rpx;
    }
  }
}
</style>
