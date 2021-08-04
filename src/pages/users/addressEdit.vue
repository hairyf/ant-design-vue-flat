<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-22 15:18:12
 * @LastEditTime: 2021-05-20 10:12:16
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="address-edit">
    <div class="form-container">
      <!-- <u-field
        label="收货人"
        placeholder="收货人姓名"
        v-model="form.consignee"
      /> -->
      <u-field label="收货人" placeholder="收货人姓名" v-model="form.consignee">
        <!-- #ifdef MP-WEIXIN -->
        <view-icon
          @click="arouseMailList"
          slot="right"
          color="#303133"
          size="40"
          name="cl-mail-list"
        />
        <!-- #endif -->
      </u-field>
      <u-field
        label="手机号码  +86"
        label-width="200"
        placeholder="联系电话"
        v-model="form.phone"
      />
      <u-field
        label="所在区域"
        placeholder="省/市/区/街道"
        disabled
        :value="completeAddress"
        @click="$navigateTo('/pages/users/addressSelect')"
      >
        <u-icon
          v-if="false"
          color="#acacac"
          slot="right"
          size="40"
          name="map"
          @click="onCallMapSelect"
        />
      </u-field>
      <u-field
        label="详细地址"
        placeholder="详细地址及门牌号"
        v-model="form.address"
      />
    </div>
    <div class="is-default u-flex">
      <div class="u-flex-1">
        <div class="title">设置为默认地址</div>
        <div class="tips">提醒：每次下单会默认推荐使用该地址</div>
      </div>
      <u-switch
        v-model="switchDefault"
        active-value="1"
        inactive-value="0"
        :active-color="$hexColor['--color-primary']"
        @change="changeDefaultValue"
      />
    </div>
    <custom-fixed-footer bg-color="none">
      <u-button
        shape="circle"
        type="primary"
        @click="updateAddress()"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
      >
        <template v-if="false">
          <u-icon size="35" name="plus" color="#ffffff" />
          <span class="u-margin-left-15">新增收货地址</span>
        </template>
        <template v-else>
          <span>保存</span>
        </template>
      </u-button>
    </custom-fixed-footer>
  </div>
</template>

<script lang="ts">
import { requpdateAddress, requserAddress } from '@/api';
import store from '@/store';
import { redirectTo, showToast } from '@/utils';
import { computed } from '@vue/composition-api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    save: false,
    addressDetail: 0,
    placeAnRrders: {},
    // 表单信息
    form: {
      id: undefined,
      is_default: '1',
      consignee: '',
      phone: '',
      province_name: '',
      city_name: '',
      area_name: '',
      address: '',
      province_id: '',
      city_id: '',
      area_id: '',
    },
    switchDefault: true,
  }),
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  computed: {
    // 计算完整路径
    completeAddress() {
      const array = [
        this.form.province_name,
        this.form.city_name,
        this.form.area_name,
      ].filter((v) => v);
      return array.join(' / ');
    },
  },
  methods: {
    // 打开选择地图
    onCallMapSelect() {
      uni.chooseLocation({
        success: () => {
          // console.log('位置名称：' + res.name);
          // console.log('详细地址：' + res.address);
          // console.log('纬度：' + res.latitude);
          // console.log('经度：' + res.longitude);
        },
      });
    },
    // 唤起手机通讯录
    arouseMailList() {
      wx.chooseContact({
        success: (result) => {
          this.form.phone = result.phoneNumber;
          this.form.consignee = result.displayName;
        },
      });
    },
    // 更新地址
    async updateAddress() {
      if (!uni.$u.test.mobile(this.form.phone)) {
        uni.$u.toast('请输入正确的手机号');
        return false;
      }
      // 编辑和新增
      if (this.save) {
        await requpdateAddress(this.form);
      } else {
        await requpdateAddress(this.form);
      }
      await showToast({ title: '设置成功', icon: 'none' });
      if (this.addressDetail == 1) {
        redirectTo('/pages/shopOrders/editOrder', {
          placeAnRrders: JSON.stringify(this.placeAnRrders),
        });
      } else {
        this.$navigateBack();
      }
    },
    // 获取地址详情
    async getDetailAddress(ids: string) {
      const { data } = await requserAddress({ id: ids });
      const address = data.data.data[0];
      this.switchDefault = address.is_default != 0;
      this.form = address;
      // console.log(this.form);
    },
    // 改变值
    changeDefaultValue(e: any) {
      this.form.is_default = e;
      console.log(e);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option: {
    save: string;
    id: string;
    orderId: Key;
    addressDetail: number;
    placeAnRrders: string;
  }) {
    this.addressDetail = option.addressDetail;

    if (option.save) {
      this.save = true;
      this.getDetailAddress(option.id);
    }
    if (option.placeAnRrders) {
      this.placeAnRrders = JSON.parse(option.placeAnRrders);
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    // 所在区域选中的
    uni.$on('selete-address', (items: Record<string, any>[]) => {
      this.form.province_name = items[0].name;
      this.form.province_id = items[0].id;
      this.form.city_name = items[1].name;
      this.form.city_id = items[1].id;
      this.form.area_name = items[2].name;
      this.form.area_id = items[2].id;
    });
  },
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
@include full-page(address-edit);
.is-default {
  margin-top: 20rpx;
  padding: 40rpx 34rpx;
  background: #fff;
  .title {
    margin-bottom: 10rpx;
    font-weight: bold;
  }
  .tips {
    color: #acacac;
    font-size: 20rpx;
  }
}
</style>
