<!--
 * @Author: liupei
 * @LastEditors: Mr.wang
-->
<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 09:23:56
 * @LastEditTime: 2021-06-18 09:26:23
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<!-- 发布页面 tabbar页面-->
<template>
  <div class="publish">
    <div class="content">
      <!-- 房源名称 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">房源名称</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="form.name"
              type="text"
              placeholder="请输入房源名称"
              maxlength="30"
            />
          </div>
          <span class="right-text">{{ form.name.length }}/30</span>
        </div>
      </div>
      <!-- 首页轮播图 -->
      <div class="image-item-wrap">
        <div class="top">
          <div class="left">
            <span class="flag">*</span>
            <span class="name">首页轮播图</span>
          </div>
          <div class="right">
            <span class="need-color">{{ cImgLength }}</span>
            /5
          </div>
        </div>
        <div class="bot">
          <u-upload
            :file-list="carouselImgList"
            width="144"
            height="144"
            :custom-btn="true"
            ref="carouseRef"
            :show-progress="false"
            :max-count="5"
            @on-uploaded="onAfterEachUpload($event, 'images')"
            @on-list-change="onAfterEachUpload($event, 'images')"
            :action="upload.uploadurl"
            :form-data="{ costoken: upload.multipart.costoken }"
            :header="$siteinfo"
          >
            <div
              slot="addBtn"
              class="slot-btn"
              hover-class="slot-btn__hover"
              hover-stay-time="150"
            >
              <u-icon name="plus" size="40" color="#FF7E5F"></u-icon>
            </div>
          </u-upload>
        </div>
      </div>
      <!-- 价格 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">价格</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              @input="checkPrice"
              v-model="form.price"
              type="text"
              placeholder="请输入房源价格"
            />
          </div>
          <span class="right-text">￥/元</span>
        </div>
      </div>
      <!-- 房源位置 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">房源位置</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input v-model="form.address" type="text" />
          </div>
          <div @click="chooseLocation">
            <u-icon name="map-fill" size="40" color="#ADADAD"></u-icon>
          </div>
        </div>
      </div>
      <!-- 地区 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">房源地区</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="form.area_name"
              type="text"
              placeholder="请选择地区"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="regionShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          mode="mutil-column-auto"
          v-model="regionShow"
          :list="regionList"
          value-name="id"
          label-name="name"
          child-name="childlist"
          @confirm="regionChage"
        ></u-select>
      </div>
      <!-- 房型 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">房型</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseStyleObj[form.house_type]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseStyleShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseStyleShow"
          :list="houseStyleList"
          @confirm="form.house_type = $event[0].value"
        ></u-select>
      </div>
      <!-- 面积 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">面积</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input v-model="form.area" type="text" placeholder="请输入面积" />
          </div>
          <span class="right-text">㎡/平米</span>
        </div>
      </div>
      <!-- 楼盘 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="name">楼盘</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseDiscObj[form.building_type]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseDiscShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseDiscShow"
          :list="houseDiscList"
          @confirm="form.building_type = $event[0].value"
        ></u-select>
      </div>
      <!-- 朝向 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">朝向</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseDirecObj[form.house_direction]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseDirecShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseDirecShow"
          :list="houseDirecList"
          @confirm="form.house_direction = $event[0].value"
        ></u-select>
      </div>
      <!-- 楼层 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="name">楼层</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="form.floor"
              type="text"
              placeholder="请输入楼层"
            />
          </div>
          <span class="right-text">楼/层</span>
        </div>
      </div>
      <!--层高 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">层高</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseHeightObj[form.house_floor]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseHeightShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseHeightShow"
          :list="houseHeightList"
          @confirm="form.house_floor = $event[0].value"
        ></u-select>
      </div>
      <!-- 出租 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="name">出租</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseLeaseObj[form.lease_type]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseLeaseShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseLeaseShow"
          :list="houseLeaseList"
          @confirm="form.lease_type = $event[0].value"
        ></u-select>
      </div>
      <!-- 电梯 -->
      <div class="item-wrap">
        <div class="item-wrap-top">
          <span class="name">电梯</span>
        </div>
        <div class="item-wrap-bot">
          <div class="item-input-wrap">
            <u-input
              v-model="houseLiftObj[form.elevator]"
              type="text"
              placeholder="请选择"
              disabled
            />
          </div>
          <div style="padding: 6rpx" @click="houseLiftShow = true">
            <u-icon name="arrow-down" size="30" color="#ADADAD"></u-icon>
          </div>
        </div>
        <u-select
          v-model="houseLiftShow"
          :list="houseLiftList"
          @confirm="form.elevator = $event[0].value"
        ></u-select>
      </div>
      <!-- 房源介绍 -->
      <div class="item-wrap" style="border-bottom: none">
        <div class="item-wrap-top">
          <span class="flag">*</span>
          <span class="name">房源介绍</span>
        </div>
        <div class="item-wrap-bot-textarea">
          <div class="item-textarea-wrap">
            <u-input
              v-model="form.content"
              type="textarea "
              autoHeight
              maxlength="300"
              placeholder="请输入房源介绍"
            />
          </div>
          <span class="right-text">{{ form.content.length }}/300</span>
        </div>
      </div>
      <!-- 上传房源图片 -->
      <div class="image-item-wrap">
        <div class="top">
          <div class="left">
            <span class="name">上传房源图片</span>
          </div>
          <div class="right">
            <span class="need-color">{{
              form.detali_img.length > 0 ? form.detali_img.split(',').length : 0
            }}</span
            >/8
          </div>
        </div>
        <div class="bot">
          <u-upload
            @on-uploaded="onAfterEachUpload($event, 'detali_img')"
            @on-list-change="onAfterEachUpload($event, 'detali_img')"
            :action="upload.uploadurl"
            :form-data="{ costoken: upload.multipart.costoken }"
            :file-list="houseImgList"
            ref="houseImgRef"
            width="144"
            height="144"
            :custom-btn="true"
            :header="$siteinfo"
            :max-count="8"
            :show-progress="false"
          >
            <div
              slot="addBtn"
              class="slot-btn"
              hover-class="slot-btn__hover"
              hover-stay-time="150"
            >
              <u-icon name="plus" size="40" color="#FF7E5F"></u-icon>
            </div>
          </u-upload>
        </div>
      </div>
    </div>
    <div class="placeholder-space"></div>
    <div class="action-btn-wrap">
      <!-- <div class="save-draft" @click="submit(2)">保存草稿</div> -->
      <u-button
        @click="submit(2)"
        class="save-draft"
        shape="circle"
        :ripple="true"
      >
        保存草稿
      </u-button>
      <!-- <div class="confirm" @click="submit(1)">提交审核</div> -->
      <u-button
        @click="submit(1)"
        class="confirm"
        shape="circle"
        :ripple="true"
      >
        提交审核
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { tabbarConfig } from '@/config';
import store from '@/store';
import Vue from 'vue';
import {
  reqHouseSet,
  reqHouseRelease,
  reqHouseDetail,
  reqRegionListLinkage,
} from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import { navigateTo, showToast } from '@/utils';
interface keyindex {
  [index: string]: string;
}
export default Vue.extend({
  components: {},
  mixins: [tabbarConfig],
  data: () => ({
    opId: null as any,
    // 地区选择
    regionList: [],
    $siteinfo: Vue.prototype.$siteinfo,
    // 首页轮播图预设
    carouselImgList: [],
    // 房源图片预设
    houseImgList: [],
    // 房型数据
    houseStyleList: [
      {
        value: '1',
        label: '房型1',
      },
      {
        value: '2',
        label: '房型2',
      },
    ],

    regionShow: false,
    // 后端返回的房型原始数据
    houseStyleObj: {} as keyindex,
    // 选择房型selecter显隐
    houseStyleShow: false,
    // 楼盘数据
    houseDiscList: [
      {
        value: '1',
        label: '楼盘1',
      },
      {
        value: '2',
        label: '房型2',
      },
    ],
    // 后端返回的楼盘原始数据
    houseDiscObj: {} as keyindex,
    // 选择楼盘 selecter 显隐
    houseDiscShow: false,
    // 朝向数据
    houseDirecList: [
      {
        label: '东南',
        value: '',
      },
      {
        label: '西北',
        value: '',
      },
    ],
    // 后端返回的朝向原始数据
    houseDirecObj: {} as keyindex,
    // 选择朝向selecter显隐
    houseDirecShow: false,
    // 后端返回的层高的原始数据
    houseHeightObj: {} as keyindex,
    // 层高的数据
    houseHeightList: [
      {
        value: '1',
        label: '1m',
      },
      {
        value: '2',
        label: '2m',
      },
    ],
    // 选择层高selecter显隐
    houseHeightShow: false,
    // 后端返回出租的原始数据
    houseLeaseObj: {} as keyindex,
    // 出租数据
    houseLeaseList: [
      {
        value: '是',
        label: '是',
      },
      {
        value: '2',
        label: '否',
      },
    ],
    // 选择出租selecter显隐

    houseLeaseShow: false,
    // 后端返回电梯的原始数据
    houseLiftObj: {} as keyindex,
    // 电梯数据
    houseLiftList: [
      {
        value: '是',
        label: '是',
      },
      {
        value: '2',
        label: '否',
      },
    ],
    // 选择电梯selecter显隐
    houseLiftShow: false,
    regionData: [],
    // 要提交的表单数据
    form: {
      is_boutique: 0,
      is_metro: 0,
      city_id: 0,
      area_id: 0,
      region_id: 0,
      // 用于地区回显
      area_name: '',
      pay_month: 0,
      deposit: 1,
      explain: 0,
      long: 0,
      price_ids: 0,
      label: 0,
      softwear_ids: 0,
      id: '',
      // 提交审核或存入草稿
      audit: -2 as Key,
      // 房源名称
      name: '',

      // 首页轮播图
      images: '',
      // 房源价格
      price: '',
      // 房源位置
      address: '',
      // 经度
      lng: '' as Key,
      // 纬度
      lat: '' as Key,
      // 房型
      house_type: '',
      // 面积
      area: '',
      // 楼盘
      building_type: '',
      // 朝向
      house_direction: '',
      //楼层
      floor: '',
      // 层高
      house_floor: '',
      // 出租
      lease_type: '',
      // 电梯
      elevator: '',
      // 房源介绍
      content: '',
      // 房源图片
      detali_img: '',
    },
  }),
  computed: {
    upload: () => store.state.common.upload,
    cImgLength(): number {
      return this.form.images.split(',').filter((v) => v).length;
    },
  },
  methods: {
    // 提交审核和保存草稿 type 1提交审核 2保存草稿
    async submit(type: number) {
      const { validate } = plotForm.validateAll(
        ['price', this.form.price, '价格'],
        ['empty', this.form.name, '房源名称'],
        ['empty', this.form.images, '首页轮播图'],
        ['empty', this.form.price, '价格'],
        ['empty', this.form.address, '房源位置'],
        ['empty', this.form.house_type, '房型'],
        ['empty', this.form.area, '面积'],
        ['empty', this.form.house_direction, '朝向'],
        ['empty', this.form.house_floor, '层高'],
        ['empty', this.form.content, '房源介绍'],
        ['empty', this.form.area_name, '房源地区']
      );
      if (!validate) return;
      if (type === 1) {
        this.form.audit = 0;
      } else {
        this.form.audit = -2;
      }
      if (this.opId) {
        this.form.id = this.opId;
      }
      await reqHouseRelease(this.form);
      await showToast({ title: '操作成功' });
      // navigateTo('/pages/baseTabBars/personal');
      navigateTo('/pages/admins/housePublishList');
      // this.$navigateTo('/pages/baseTabBars/personal');
    },
    // 选择位置
    async chooseLocation() {
      const a = await uni.getLocation({});
      const { longitude } = a[1];
      const { latitude } = a[1];
      const b = await uni.chooseLocation({ longitude, latitude } as any);
      this.form.address = b[1].address;
      this.form.lng = b[1].longitude;
      this.form.lat = b[1].latitude;
    },
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[], key: 'images' | 'detali_img') {
      const updatePaths: string[] = lists
        .map((item) => {
          console.log(item);
          return item.response?.data?.url || item.url;
        })
        .filter((item) => item);
      const images = updatePaths.join(',').trim();
      this.form[key] = images;
    },
    // 获取楼盘 房型等数据
    async reqHouseSet() {
      const { data } = await reqHouseSet();
      // 房型
      this.houseStyleList = Object.keys(data.house_type).map((e) => {
        return { label: data.house_type[e], value: e };
      });
      this.houseStyleObj = data.house_type;
      // 楼盘
      this.houseDiscList = Object.keys(data.building_type).map((e) => {
        return { label: data.building_type[e], value: e };
      });
      this.houseDiscObj = data.building_type;
      // 朝向
      this.houseDirecList = Object.keys(data.house_direction).map((e) => {
        return { label: data.house_direction[e], value: e };
      });
      this.houseDirecObj = data.house_direction;
      console.log(this.houseStyleList);
      // 层高
      this.houseHeightList = Object.keys(data.house_floor).map((e) => {
        return { label: data.house_floor[e], value: e };
      });
      this.houseHeightObj = data.house_floor;
      // 出租
      this.houseLeaseList = Object.keys(data.lease_type).map((e) => {
        return { label: data.lease_type[e], value: e };
      });
      this.houseLeaseObj = data.lease_type;
      // 电梯
      this.houseLiftList = Object.keys(data.elevator).map((e) => {
        return { label: data.elevator[e], value: e };
      });
      this.houseLiftObj = data.elevator;
    },
    // 初始化详情数据 表单数据回填
    async initDetail(id: Key) {
      const { data: detail } = await reqHouseDetail(id);
      // console.log(detail);
      if (!detail) {
        return false;
      }
      // this.swpierList = detail.images_text.map((item: string) => ({
      //   image: item,
      // }));
      this.carouselImgList = detail.images_text.map((item: string) => ({
        url: item,
      }));
      this.houseImgList = detail.detail_img_text.map((item: string) => ({
        url: item,
      }));
      detail.lng = Number(detail.lng);
      detail.lat = Number(detail.lat);
      this.form.name = detail.name;
      this.form.price = detail.price;
      this.form.address = detail.address;
      this.form.lng = detail.lng;
      this.form.lat = detail.lat;
      this.form.area = detail.area;
      this.form.floor = detail.floor;
      this.form.content = detail.content;
      this.form.images = detail.images_text.join();
      this.form.detali_img = detail.detail_img_text.join();
      this.form.area_name = detail.area_name;
      // 房型
      if (detail.extra_house_type) {
        for (const key in this.houseStyleObj) {
          if (this.houseStyleObj[key] === detail.extra_house_type) {
            this.form.house_type = key;
          }
        }
      }
      // 楼盘
      if (detail.extra_building_type) {
        for (const key in this.houseDiscObj) {
          if (this.houseDiscObj[key] === detail.extra_building_type) {
            this.form.building_type = key;
          }
        }
      }
      // 朝向
      if (detail.extra_house_direction) {
        for (const key in this.houseDirecObj) {
          if (this.houseDirecObj[key] === detail.extra_house_direction) {
            this.form.house_direction = key;
          }
        }
      }
      // 层高
      if (detail.extra_house_floor) {
        for (const key in this.houseHeightObj) {
          if (this.houseHeightObj[key] === detail.extra_house_floor) {
            this.form.house_floor = key;
          }
        }
      }
      // 出租
      if (detail.extra_lease_type) {
        for (const key in this.houseLeaseObj) {
          if (this.houseLeaseObj[key] === detail.extra_lease_type) {
            this.form.lease_type = key;
          }
        }
      }
      // 电梯
      if (detail.extra_elevator) {
        for (const key in this.houseLiftObj) {
          if (this.houseLiftObj[key] === detail.extra_elevator) {
            this.form.elevator = key;
          }
        }
      }
    },
    async getRegion() {
      const { data } = await reqRegionListLinkage({ pid: 0 });
      this.regionList = data;
    },
    regionChage(e: any) {
      // console.log(e);
      // this.regionId = e;
      this.form.city_id = e[0].value;
      this.form.area_id = e[1].value;
      this.form.region_id = e[2].value;
      this.form.area_name = e[0].label + e[1].label + e[2].label;
    },
    checkPrice(e: any) {
      console.log(e);
      //正则表达试
      e = e.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      //重新赋值给input
      this.$nextTick(() => {
        this.form.price = e;
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(options: { id: any }) {
    this.getRegion();
    // 经纬度必须获取
    const a = await uni.getLocation({});
    const { longitude } = a[1];
    const { latitude } = a[1];
    this.form.lng = longitude;
    this.form.lat = latitude;
    await this.reqHouseSet();
    if (options.id) {
      this.opId = options.id;
      uni.setNavigationBarTitle({
        title: '修改房源',
      });
      this.initDetail(options.id);
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
.publish {
  padding-bottom: 120rpx;
}
.content {
  padding: 0 48rpx;
  padding-bottom: 40rpx;
  background-color: #fff;
}
.item-wrap {
  padding-top: 40rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f7f7f7;
  .item-wrap-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .flag {
      color: #ff0000;
      font-size: 24rpx;
    }
    .name {
      font-size: 24rpx;
      color: #000;
      margin-left: 6rpx;
      font-weight: bold;
    }
  }
  .item-wrap-bot {
    margin-top: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-input-wrap {
      flex-grow: 1;
    }
    .right-text {
      font-size: 28rpx;
      color: #adadad;
    }
  }
}
.image-item-wrap {
  padding-top: 40rpx;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .flag {
        color: #ff0000;
        font-size: 24rpx;
      }
      .name {
        font-size: 24rpx;
        color: #000;
        margin-left: 6rpx;
        font-weight: bold;
      }
    }
    .right {
      color: #000;
      font-size: 24rpx;
      .need-color {
        color: #ff7e5f;
      }
    }
  }
  .bot {
    margin-top: 32rpx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .bot-img {
      width: 144rpx;
      height: 144rpx;
      position: relative;
      margin-right: 20rpx;
      margin-bottom: 10rpx;
      flex-shrink: 0;
      .thisimg {
        width: 100%;
        height: 100%;
      }
      .close {
        position: absolute;
        top: 6rpx;
        right: 6rpx;
      }
    }
  }
}
.item-wrap-bot-textarea {
  margin-top: 20rpx;
  min-height: 320rpx;
  background-color: #f7f7f7;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item-textarea-wrap {
    padding-left: 20rpx;
  }
  .right-text {
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    color: #adadad;
    font-size: 28rpx;
    text-align: right;
  }
}
.action-btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .confirm {
    .u-btn {
      width: 220rpx;
      height: 80rpx;
      margin-right: 20rpx;
      line-height: 80rpx;
      background-color: #ff7e5f;
      box-sizing: border-box;
      border-radius: 40rpx;
      color: #fff;
      text-align: center;
    }
  }
  .save-draft {
    .u-btn {
      width: 220rpx;
      height: 80rpx;
      margin-right: 20rpx;
      line-height: 80rpx;
      border: 1rpx solid #ff7e5f;
      box-sizing: border-box;
      border-radius: 40rpx;
      color: #ff7e5f;
      text-align: center;
    }
  }
}
// 占位的 充当背景用
.placeholder-space {
  height: 40rpx;
  background-color: #f7f7f7;
}
// 自定义图片上传框内部的样式
.slot-btn {
  width: 144rpx;
  height: 144rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8rpx;
  flex-shrink: 0;
}

.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}
</style>
