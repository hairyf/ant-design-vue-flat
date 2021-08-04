<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-22 15:18:01
 * @LastEditTime: 2021-05-20 10:13:14
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="address-list">
    <view-controller>
      <u-card :show-head="false" v-for="(item, index) in list" :key="index">
        <div
          class="address-item-cart-body u-flex"
          slot="body"
          @click="onClickHandleItem(item)"
        >
          <div class="u-flex-1">
            <div class="tips u-margin-bottom-10">
              {{ item.province_name }}{{ item.city_name }}{{ item.area_name }}
            </div>
            <div class="u-flex u-row-between u-margin-bottom-24">
              <span class="title">{{ item.address }}</span>
            </div>
            <div class="user-info u-margin-bottom-10">
              <span class="name" style="margin-right: 18rpx">{{
                item.consignee
              }}</span>
              <span class="phone">{{ item.phone }}</span>
            </div>
          </div>
          <div @click.stop="onClickToEditPath(item)">
            <u-icon name="arrow-right" color="#acacac" size="30" />
          </div>
        </div>
        <div class="address-item-cart-foot u-flex u-row-between" slot="foot">
          <u-checkbox
            shape="circle"
            :size="40"
            :value="item.is_default === 1"
            @change="resDefaultEvent($event, item)"
            :active-color="$hexColor['--color-primary']"
          >
            <span
              class="default"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              默认地址
            </span>
          </u-checkbox>
          <span style="color: #ff0000" @click="onDelAddressItem(item)"
            >删除</span
          >
        </div>
      </u-card>
      <u-empty
        v-if="!list.length"
        margin-top="150"
        text="暂无地址"
        mode="list"
      />

      <custom-fixed-footer bg-color="none">
        <u-button
          v-if="PLATFORM === 'h5'"
          class="add-button"
          shape="circle"
          type="primary"
          @click="
            $navigateTo('/pages/users/addressEdit', {
              addressDetail,
              placeAnRrders: JSON.stringify(placeAnRrders),
            })
          "
          ripple
          :custom-style="{
            background: $hexColor['--color-primary'],
          }"
        >
          <u-icon size="35" name="plus" color="#ffffff" />
          <span class="u-margin-left-15"> 新增收货地址 </span>
        </u-button>
        <u-button
          v-if="PLATFORM != 'h5'"
          class="add-button"
          shape="circle"
          hover-class="none"
        >
          <div class="import-btn">
            <div class="import-btn-left" @click="getAddress">
              <view-icon name="cl-wechat-channel" size="35" color="#09BB07" />
              <span class="u-margin-left-20">导入微信地址</span>
            </div>
            <div
              @click="
                $navigateTo('/pages/users/addressEdit', {
                  addressDetail,
                  placeAnRrders: JSON.stringify(placeAnRrders),
                })
              "
              class="import-btn-right"
              :style="{
                background: $hexColor['--color-primary'],
              }"
            >
              <u-icon size="35" name="plus" color="#ffffff" />
              <span class="u-margin-left-20"> 新增收货地址 </span>
            </div>
          </div>
        </u-button>
      </custom-fixed-footer>
    </view-controller>
  </div>
</template>

<script lang="ts">
import {
  requserAddress,
  reqsetDefualt,
  reqdelAddress,
  reqcityId,
  requpdateAddress,
} from '@/api';
import { redirectTo, showToast } from '@/utils';
import { computed, defineComponent } from '@vue/composition-api';
import { PLATFORM } from '@/utils';
import store from '@/store';
import { useListPaging } from '@/hooks/use-list-paging';
export default defineComponent({
  props: {},
  components: {},
  data: () => ({
    // list: [] as any[],
    select: false,
    addressDetail: 0,
    placeAnRrders: {},
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    // 调用分页逻辑
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await requserAddress({
          page,
          limit: 10,
        });
        return data.data.data;
      },
    });
    return { $hexColor, PLATFORM, resetList, list };
  },
  methods: {
    // 获取地址列表
    // async getUserLocation() {
    //   const { data } = await requserAddress();
    //   this.list = data.data.data;
    // },
    // 设置默认地址
    async resDefaultEvent(event: any, item: any) {
      if (item.is_default == 1) return false;
      await reqsetDefualt(item.id, 1);
      this.resetList();
      // await this.getUserLocation();
      showToast({ title: '设置成功!', mask: true });
      if (this.addressDetail == 1) {
        redirectTo('/pages/shopOrders/editOrder', {
          placeAnRrders: JSON.stringify(this.placeAnRrders),
        });
      }
      item.is_default = 1;
      uni.$emit('address-select', item);
    },
    // 删除当前地址
    async onDelAddressItem(item: any) {
      if (!this.list.length) {
        uni.$u.toast('必须保留一个地址!');
      }
      uni.showModal({
        title: '删除收货地址',
        content: '您确认删除该收货地址？',
        success: async (res) => {
          if (res.confirm) {
            await reqdelAddress(item.id);
            this.resetList();
          }
        },
      });
    },
    // 点击跳转到编辑页
    onClickToEditPath(item: any) {
      this.$navigateTo('/pages/users/addressEdit', {
        save: true,
        id: item.id,
        addressDetail: this.addressDetail,
        placeAnRrders: JSON.stringify(this.placeAnRrders),
      });
    },
    // 点击卡片, 判断是否是选择
    onClickHandleItem(item: any) {
      if (this.select) {
        uni.$emit('address-select', item);
        this.$navigateBack();
      } else {
        this.onClickToEditPath(item);
      }
    },
    getAddress() {
      const that = this as any;
      uni.chooseAddress({
        async success(res) {
          const { data } = await reqcityId({
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
          });
          if (data.code == 0) {
            await requpdateAddress({
              province_id: data.data.province_id,
              city_id: data.data.city_id,
              area_id: data.data.area_id,
              consignee: res.userName,
              phone: res.telNumber,
              province_name: res.provinceName,
              city_name: res.cityName,
              area_name: res.countyName,
              address: res.detailInfo,
              is_default: 0,
            });
            // console.log('我是添加打印');
            uni.showToast({
              title: '添加成功',
              success() {
                setTimeout(() => {
                  that.getUserLocation();
                  // console.log('我是添加之后打印');
                }, 1500);
              },
            });
          } else {
            uni.showToast({
              icon: 'none',
              title: '添加失败',
            });
          }
        },
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option: {
    select: string;
    addressDetail: number;
    placeAnRrders: string;
  }) {
    if (option.placeAnRrders) {
      this.placeAnRrders = JSON.parse(option.placeAnRrders);
    }
    this.addressDetail = option.addressDetail;
    if (typeof option.select !== 'undefined') {
      this.select = JSON.stringify(option.select) as any;
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.resetList();
    console.log('show打印');
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
@include full-page(address-list);
.address-list {
  padding-top: 1rpx;
}
.add-button {
  position: fixed;
  bottom: 20rpx;
  left: 20rpx;
  right: 20rpx;
}
.address-item-cart-body {
  .tips {
    color: #acacac;
  }
  .title {
    color: #000000;
    font-weight: bold;
  }
}
.u-btn {
  padding: 0 !important;
  border-color: #fff !important;
}
.u-btn--default {
  color: #fff !important;
}
.import-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .import-btn-right {
    flex: 1;
    border-radius: 0 100rpx 100rpx 0;
    span {
      color: #fff;
    }
  }
  .import-btn-left {
    flex: 1;
    span {
      color: #000;
    }
  }
}
</style>
