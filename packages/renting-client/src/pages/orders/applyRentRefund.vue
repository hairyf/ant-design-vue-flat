<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 09:15:55
 * @LastEditTime: 2021-01-29 11:20:36
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="apply-rent-refund">
    <!-- @click="$navigateTo('/pages/orders/contractDetails')" -->
    <u-card>
      <div class="card-returnd-item-head" slot="head">
        <div class="title">纸质合同</div>
      </div>
      <div class="card-returnd-item-body" slot="body">
        <u-image
          width="128"
          height="128"
          class="u-m-r-14"
          :src="detail.house.image_text"
        />
        <div class="center-column u-flex-1">
          <div class="title u-m-b-10">{{ detail.house.name }}</div>
          <div class="tips u-m-b-14">
            {{ $format(detail.begintime) }}至{{ $format(detail.endtime) }}
          </div>
          <div class="price">{{ detail.house.price }}元/月</div>
        </div>
        <div class="right-column u-flex">
          <!-- <custom-icon name="await-confirm" size="120" /> -->
          <!-- <u-icon color="#ADADAD" name="arrow-right" /> -->
        </div>
      </div>
    </u-card>
    <div class="form-container">
      <u-field
        input-align="right"
        v-model="form.name"
        required
        maxlength="10"
        :disabled="!edit"
        label="退租人名称"
        label-width="150"
        placeholder="请输入退租人名字"
      />
      <u-field
        input-align="right"
        v-model="form.phone"
        required
        :disabled="!edit"
        label="联系方式"
        label-width="150"
        placeholder="请输入手机号码"
      />
      <u-field
        input-align="right"
        required
        disabled
        v-model="form.applytime"
        @click="edit && (showPickerTime = true)"
        label="退租时间"
        label-width="150"
        placeholder="请选择退租时间"
      >
        <u-icon slot="right" name="arrow-right" color="#808080" size="30" />
      </u-field>
    </div>
    <div class="tips-container">
      申请退租后，工作人员会尽快与您联系，确认具体退租事项
    </div>
    <div
      class="edit-btns-container"
      v-if="detail.aftersales ? detail.aftersales.status == 'cancel' : true"
    >
      <u-button type="primary" shape="circle" @click="onApplyAftersales">
        申请退租
      </u-button>
    </div>
    <div
      class="edit-btns-container"
      v-else-if="detail.aftersales && detail.aftersales.status == 'wait'"
    >
      <u-button type="primary" shape="circle" @click="onCancelAftersales">
        取消申请
      </u-button>
    </div>
    <u-picker
      v-model="showPickerTime"
      mode="time"
      @confirm="onHandleTimeSelect"
      :params="{
        year: true,
        month: true,
        day: true,
      }"
    ></u-picker>
  </div>
</template>

<script lang="ts">
import {
  reqAftersalesDetail,
  reqApplyAftersales,
  reqCancelAftersales,
} from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    showPickerTime: false,
    form: {
      order_id: '',
      applytime: '',
      name: '',
      phone: '',
    },
    edit: false,
    detail: {} as any,
  }),
  computed: {},
  methods: {
    // 处理时间选择
    onHandleTimeSelect(dates: any) {
      const timestampStr = `${dates.year}-${dates.month}-${dates.day}`;
      this.form.applytime = timestampStr;
    },
    // 初始化获取数据
    async initDetail(id: Key) {
      const { data: detail } = await reqAftersalesDetail(id);
      if (detail.aftersales ? detail.aftersales.status == 'cancel' : true) {
        this.edit = true;
      }
      if (detail.aftersales) {
        this.form.name = detail.aftersales.name;
        this.form.phone = detail.aftersales.phone;
        this.form.applytime = this.$format(detail.aftersales.createtime);
      }
      this.form.order_id = detail.id;
      this.detail = detail;
    },
    // 申请退租
    async onApplyAftersales() {
      const validate = plotForm.validateAll(
        ['empty', this.form.name, '姓名'],
        ['phone', this.form.phone, '联系方式'],
        ['empty', this.form.applytime, '看房时间']
      ).validate;
      if (!validate) return false;
      await reqApplyAftersales(this.form);
      await showToast({ title: '申请退租成功!' });
      this.initDetail(this.detail.id);
    },
    // 取消申请退租
    async onCancelAftersales() {
      await reqCancelAftersales(this.detail.id);
      await showToast({ title: '取消申请成功!' });
      this.initDetail(this.detail.id);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { id: string }) {
    this.initDetail(options.id);
    this.form.name = store.state.user.authentication.name;
    this.form.phone = store.state.user.info.mobile;
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
@include full-page(apply-rent-refund);
.tips-container {
  margin: 0 32rpx;
  margin-top: 24rpx;
  font-size: 24rpx;
  color: #adadad;
}
</style>
