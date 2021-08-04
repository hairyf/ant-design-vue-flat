<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-08 16:04:55
 * @LastEditTime: 2021-05-10 14:13:26
 * @Description: 搜索页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="search">
    <!-- 头部导航 -->
    <u-navbar :border-bottom="false">
      <u-search
        :animation="true"
        placeholder="搜索商品、类目"
        :border-color="$hexColor['--color-primary']"
        bg-color="#FFFFFF"
        v-model="searchText"
        @search="onSearch(searchText)"
        @custom="onSearch(searchText)"
      />
    </u-navbar>
    <!-- 历史搜索与热门搜索 -->
    <div class="history-and-hot">
      <!-- 搜索历史 -->
      <div class="search-label u-m-b-20">
        <div class="header">
          <span class="title">搜索历史</span>
          <view-icon
            name="cl-delete"
            color="#848484"
            size="40"
            @click="showRemoveModel = true"
          />
        </div>
        <div class="body">
          <u-tag
            class="u-m-l-10"
            v-for="(item, index) in historyList"
            :key="index"
            :text="item"
            @click="onSearch(item)"
            color="#666666"
            bg-color="#f6f6f6"
            mode="dark"
            shape="circle"
          />
          <u-empty v-if="!historyList.length" text="暂无历史记录" mode="none" />
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="search-label">
        <div class="header">
          <span class="title">热门搜索</span>
        </div>
        <div class="body">
          <u-tag
            class="u-m-l-10"
            v-for="(item, index) in hotTages"
            :key="index"
            :text="item"
            @click="onSearch(item)"
            color="#666666"
            bg-color="#f6f6f6"
            mode="dark"
            shape="circle"
          />
          <u-empty v-if="!hotTages.length" text="暂无热门搜索" mode="none" />
        </div>
      </div>
      <u-modal
        v-model="showRemoveModel"
        content="确定删除搜索记录吗？"
        :show-cancel-button="true"
        @confirm="onRemoveHistory"
      ></u-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { reqHotKeyWord } from '@/api';
import { useHistorys } from '@/hooks/use-historys';
import store from '@/store';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  components: {},
  data: () => ({
    searchText: '',
    showRemoveModel: false,
    hotTages: [] as string[],
  }),
  computed: {},
  setup() {
    const { unshiftHistory, removeHistory, list: historyList } = useHistorys({
      get: () => uni.getStorageSync('history-list') || [],
      set: (list) => uni.setStorageSync('history-list', list),
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    // 移除历史记录
    const onRemoveHistory = () => {
      removeHistory();
    };

    return {
      unshiftHistory,
      onRemoveHistory,
      historyList,
      $hexColor,
    };
  },
  methods: {
    // 执行搜索, 跳转页面
    implementSearch() {},
    // 搜索
    onSearch(searchText: string) {
      this.unshiftHistory(searchText);
      this.$navigateTo('/pages/commons/searchResult', {
        searchText,
      });
    },
    // 获取热门标签
    async getHotTags() {
      const { data } = await reqHotKeyWord();
      this.hotTages = data.data;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getHotTags();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getHotTags();
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
  onReachBottom() {},
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
