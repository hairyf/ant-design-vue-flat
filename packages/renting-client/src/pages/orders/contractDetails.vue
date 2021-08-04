<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 09:14:37
 * @LastEditTime: 2021-01-29 14:30:44
 * @Description: 合同详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="contract-details">
    <!-- 合同项内容 -->
    <u-card :show-foot="false">
      <div class="card-returnd-item-head" slot="head">
        <div class="title">纸质合同</div>
        <div class="warning" v-if="detail.status == 0">1天后自动确认</div>
      </div>
      <div class="card-returnd-item-body" slot="body">
        <u-image
          width="128"
          height="128"
          class="u-m-r-14"
          :src="detail.order.house.image_text"
        />
        <div class="center-column u-flex-1">
          <div class="title u-m-b-10">{{ detail.order.house.name }}</div>
          <!-- <div class="tips u-m-b-14">2020-12-01至2021-12-31</div> -->
          <div class="price">{{ detail.order.price }}元/月</div>
        </div>
        <div class="right-column u-flex">
          <custom-icon
            v-if="detail.status == 0"
            name="await-confirm"
            size="120"
          />
          <custom-icon
            v-if="detail.status == 1"
            name="already-confirm"
            size="120"
          />
          <!--  <custom-icon
            v-if="detail.order.status == 2"
            name="already-rent-refund"
            size="120"
          /> -->
          <!-- <u-icon color="#ADADAD" name="arrow-right" /> -->
        </div>
      </div>
    </u-card>
    <!-- 合同信息 -->
    <u-card :show-foot="false" v-if="detail.order">
      <div class="card-contract-head" slot="head">
        <div class="title">合同信息</div>
      </div>
      <div class="card-contract-body" slot="body">
        <div class="info-layer">
          <div class="tips">起止日期</div>
          <div class="text">
            {{ $format(detail.order.begintime) }}
            至
            {{ $format(detail.order.endtime) }}
          </div>
        </div>
        <div class="info-layer">
          <div class="tips">租期</div>
          <div class="text">{{ detail.order.long }}月</div>
        </div>
        <div class="info-layer">
          <div class="tips">付款周期</div>
          <div class="text">
            {{ $numberToChinese(detail.order.pay_month) }}月一付
          </div>
        </div>
        <div class="info-layer">
          <div class="tips">缴租时间</div>
          <div class="text">{{ detail.order.pay_day }}号</div>
        </div>
        <div class="info-layer">
          <div class="tips">房租</div>
          <div class="text">{{ detail.order.price }}元/月</div>
        </div>
        <div class="info-layer">
          <div class="tips">押金</div>
          <div class="text">{{ detail.order.deposit }}元</div>
        </div>
        <div class="image-layer">
          <div class="tips">合同照片</div>
          <div class="images">
            <u-image
              width="143"
              height="143"
              v-for="(item, index) in detail.images_text"
              :key="index"
              :src="item"
              @click="onPreviewImage(index)"
            />
          </div>
        </div>
      </div>
    </u-card>
    <!-- 租客信息 -->
    <u-card :show-foot="false" v-if="detail.idcard">
      <div class="card-contract-head" slot="head">
        <div class="title">租客信息</div>
      </div>
      <div class="card-contract-body" slot="body">
        <div class="info-layer">
          <div class="tips">姓名</div>
          <div class="text">{{ detail.idcard.name }}</div>
        </div>
        <div class="info-layer">
          <div class="tips">电话</div>
          <div class="text">135-5825-6012</div>
        </div>
        <div class="info-layer">
          <div class="tips">证件类型</div>
          <div class="text">身份证</div>
        </div>
        <div class="info-layer">
          <div class="tips">证件号码</div>
          <div class="text">{{ detail.idcard.idcard }}</div>
        </div>
      </div>
    </u-card>
    <!-- 房东信息 -->
    <u-card :show-foot="false">
      <div class="card-contract-head" slot="head">
        <div class="title">房东信息</div>
      </div>
      <div class="card-contract-body" slot="body">
        <div class="info-layer">
          <div class="tips">姓名</div>
          <div class="text">{{ houseMasters.first.name }}</div>
        </div>
        <div class="info-layer">
          <div class="tips">电话</div>
          <div class="text">{{ houseMasters.first.phone }}</div>
        </div>
      </div>
    </u-card>
    <u-popup
      v-model="houseMastersPopupShow"
      mode="bottom"
      height="600"
      border-radius="15"
      negative-top="50"
      :closeable="true"
    >
      <custom-blank :height="80" />
      <div class="owner-card-popup-slot">
        <u-cell-item
          v-for="(item, index) in houseMasters.list"
          :key="index"
          :arrow="false"
          :title="item.name"
          :value="item.phone"
          @click="onMakePhoneCall(item.phone)"
        ></u-cell-item>
      </div>
    </u-popup>
    <!-- 底部操作栏 -->
    <common-fixed-footer>
      <u-button
        class="u-flex-1"
        shape="circle"
        type="warning"
        @click="houseMastersPopupShow = true"
      >
        联系房东
      </u-button>
      <u-button
        class="u-flex-1 u-m-l-22"
        shape="circle"
        type="primary"
        v-if="detail.status == 0"
        @click="onComfirmContract"
      >
        确认合同
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqComfirmContract, reqContractDetail } from '@/api';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    houseMastersPopupShow: false,

    detail: {} as any,
  }),
  computed: {
    houseMasters: () => store.state.common.houseMasters,
  },
  methods: {
    // 初始化详情数据
    async initDetail(id: Key) {
      const { data: detail } = await reqContractDetail(id);
      this.detail = detail;
    },
    // 确认合同
    async onComfirmContract() {
      await reqComfirmContract(this.detail.id);
      await showToast({ title: '确认成功!', mask: true });
      this.initDetail(this.detail.id);
    },
    // 拨打电话
    onMakePhoneCall(phoneNumber: string) {
      uni.makePhoneCall({ phoneNumber });
    },
    // 查看图片列表
    onPreviewImage(index: Key) {
      uni.previewImage({
        current: index as any,
        urls: this.detail.images_text,
      });
    },
  },

  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { id: string }) {
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
@include full-page(contract-details);
.owner-card-popup-slot {
  height: 521rpx;
  overflow-y: auto;
}
</style>
