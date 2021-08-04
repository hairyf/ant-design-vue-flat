<!--
 * @Author: Mr.wang
 * @Date: 2021-04-23 15:55:21
 * @LastEditTime: 2021-05-19 16:36:30
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="commodity-evaluation" v-if="evaluateList.length">
    <div style="margin-bottom: 150rpx">
      <div v-for="(item, index) in evaluateList" :key="index">
        <div class="evaluate">
          <div class="evaluate-left">
            <div class="evaluate-title">商品评价</div>
            <u-rate
              @change="changeScore"
              :count="count"
              v-model="item.score"
              :active-color="$hexColor['--color-primary']"
              inactive-color="#EEEEEE"
            ></u-rate>
          </div>
          <div class="evaluate-text" v-if="item.score == 0">待评价</div>
          <div class="evaluate-text" v-if="item.score == 1">很不满意</div>
          <div class="evaluate-text" v-if="item.score == 2">不满意</div>
          <div class="evaluate-text" v-if="item.score == 3">一般</div>
          <div class="evaluate-text" v-if="item.score == 4">满意</div>
          <div class="evaluate-text" v-if="item.score == 5">非常满意</div>
        </div>
        <div class="commodity-box">
          <div class="commodity-title">商品使用描述</div>
          <div class="information">
            <image class="information-img" :src="item.goods_image" />
            <div class="information-right">
              <div class="information-right-title">
                {{ item.goods_title }}
              </div>
              <div class="specifications-text">{{ item.goods_sku_text }}</div>
            </div>
          </div>
          <div class="content">
            <textarea
              @input="changeScore"
              placeholder-class="placeholderClass"
              class="content-inp"
              maxlength="300"
              placeholder="发表你的使用感受，可以帮助更多有需要的人~"
              v-model="item.content"
            />
            <u-upload
              :custom-btn="true"
              :action="actionUrl + 'shop/clientUpload/add'"
              :header="requestHeader"
              :form-data="{ group_type: '1' }"
              :width="138"
              :height="138"
              :max-count="5"
              ref="uUpload"
              @on-uploaded="onAfterEachUpload($event, index)"
              @on-list-change="onAfterEachUpload($event, index)"
            >
              <div
                slot="addBtn"
                class="slot-btn"
                hover-class="slot-btn__hover"
                hover-stay-time="150"
              >
                <u-icon
                  name="camera"
                  size="45"
                  :color="$u.color['lightColor']"
                />
                <div class="title">添加照片</div>
                <div class="tips">至多5张</div>
              </div>
            </u-upload>
            <div class="text-display">
              <span class="display-text">{{ item.content.length }}</span
              ><span class="limit-text">/300</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <u-button
      class="release-btn"
      type="warning"
      @click="releaseEvaluation"
      shape="circle"
      ripple
      :custom-style="{
        background: $hexColor['--color-primary'],
      }"
    >
      发布评价
    </u-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { httpConfig, reqEvaluatedList, reqAddComments } from '@/api';
import { navigateBack, showToast } from '@/utils';
import { computed } from '@vue/composition-api';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    count: 5,
    // 描述文字
    content: '',
    actionUrl: httpConfig.baseURL,
    requestHeader: httpConfig.header,
    form: {
      images: [] as any,
    },
    evaluateList: [] as any[],
    // 已打分的评价数据
    arrList: [] as any[],
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[], index: any) {
      const updatePaths: string[] = lists.map((item) => {
        return item.response?.data?.path?.show;
      });
      if (updatePaths.findIndex((item) => !item) === -1) {
        // this.form.images = updatePaths.filter((v) => v);
        this.evaluateList[index].images = updatePaths.filter((v) => v);
      }
    },
    async releaseEvaluation() {
      const isEvaluate = this.evaluateList.some((item: any) => {
        if (item.score != 0) {
          return true;
        }
      });
      this.arrList = [];
      if (isEvaluate) {
        this.evaluateList.forEach((item: any) => {
          if (item.score != 0) {
            this.arrList.push({
              order_items_id: item.id,
              goods_id: item.goods_id,
              order_sn: item.order_sn,
              goods_image: item.goods_image,
              goods_name: item.goods_title,
              goods_type: item.goods_type,
              content: item.content,
              score: item.score,
              images: item.images.toString(),
              style_name: item.goods_sku_text,
            });
          }
        });
        await reqAddComments({ row: this.arrList });
        await showToast({
          title: '提交评价成功!',
          mask: true,
          success() {
            setTimeout(() => {
              navigateBack();
            }, 1500);
          },
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: '请打星星评价',
        });
      }
    },
    changeScore() {
      this.$forceUpdate();
    },
    async getevaluateList(order_id: any) {
      const { data } = await reqEvaluatedList({ order_id });
      this.evaluateList = data.data;
      this.evaluateList.forEach((item: any) => {
        item.score = 0;
        item.content = '';
        item.images = [];
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: any) {
    this.getevaluateList(options.id);
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
.commodity-evaluation {
  position: relative;
  min-height: 100vh;
  padding: 0 34rpx 0 34rpx;
  background-color: #f7f7f7;
  .evaluate {
    padding: 24rpx 40rpx;
    background-color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .evaluate-left {
      display: flex;
      align-items: center;
    }
    .evaluate-title {
      font-weight: bold;
      margin-right: 16rpx;
      font-size: 28rpx;
      color: #000000;
    }
    .evaluate-text {
      font-size: 24rpx;
      color: #acacac;
    }
  }
  .commodity-box {
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    padding: 40rpx 40rpx 64rpx 40rpx;
    .commodity-title {
      font-size: 28rpx;
      color: #000000;
      font-weight: bold;
    }
    .information {
      margin: 20rpx 0 32rpx 0;
      display: flex;
      align-items: center;
    }
    .information-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;
    }
    .information-right {
      flex: 1;
      margin-left: 28rpx;
      .information-right-title {
        font-size: 24rpx;
        line-height: 34rpx;
        color: #000;
      }
      .specifications-text {
        margin-top: 16rpx;
        font-size: 20rpx;
        color: #acacac;
      }
    }
  }

  .content-inp {
    height: 162rpx;
    margin-bottom: 40rpx;
    .placeholderClass {
      color: #acacac;
      font-size: 28rpx;
    }
    // /deep/.textarea {
    //   font-size: 28rpx;
    //   color: #acacac;
    // }
  }
  .content {
    position: relative;
    .text-display {
      position: absolute;
      right: 0;
      bottom: -20rpx;
      font-size: 24rpx;
      .display-text {
        color: #000;
      }
      .limit-text {
        color: #5c5c5c;
      }
    }
  }
  /* 自定义上传组件 */
  .slot-btn {
    width: 138rpx;
    height: 138rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(244, 245, 246);
    border-radius: 10rpx;
    .title {
      font-size: 28rpx;
      margin-bottom: 3rpx;
    }
    .tips {
      font-size: 21rpx;
    }
  }
}
</style>
