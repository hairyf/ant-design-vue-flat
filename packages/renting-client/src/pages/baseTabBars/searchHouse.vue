<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-15 09:23:03
 * @LastEditTime: 2021-05-31 10:10:09
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="search-house">
    <u-dropdown ref="uDropdown" active-color="#FF7E5F">
      <u-dropdown-item title="区域">
        <div class="slot-content">
          <common-hmFilter
            :index="activeMenusIndex"
            is-open-one
            ref="regionFilter"
            :options="filterOptions.region"
            @change="onRegionChange"
          />
          <div class="custom-dropdown-footer u-flex">
            <u-button
              class="u-m-r-20"
              type="info"
              :hair-line="false"
              shape="circle"
              @click="onResetAllOpts"
              >重置</u-button
            >
            <u-button
              class="u-flex-1"
              type="primary"
              shape="circle"
              @click="onSearch"
              >确认</u-button
            >
          </div>
        </div>
      </u-dropdown-item>
      <u-dropdown-item title="租金">
        <div class="slot-content">
          <div class="u-p-25">
            <range-slider
              :value="[0, 20000]"
              :min="0"
              :max="20000"
              :bar-height="3"
              :block-size="26"
              background-color="#EEEEF6"
              active-color="#FF6B00"
              :format="onRangeformat"
              @change="form.price = $event"
            />
            <custom-blank height="40" />
            <custom-section-input v-model="form.price" />
            <custom-blank height="40" />
          </div>
          <div class="custom-dropdown-footer u-flex">
            <u-button
              class="u-m-r-20"
              type="info"
              :hair-line="false"
              shape="circle"
              @click="onResetAllOpts"
              >重置</u-button
            >
            <u-button
              class="u-flex-1"
              type="primary"
              shape="circle"
              @click="onSearch"
              >确认</u-button
            >
          </div>
        </div>
      </u-dropdown-item>
      <u-dropdown-item title="房型">
        <div class="slot-content">
          <common-hmFilter
            ref="houseFilter"
            back-save
            isOpenOne
            :options="filterOptions.lease_type"
            @change="onHouseTypeChange"
          />
        </div>
        <div class="custom-dropdown-footer u-flex">
          <u-button
            class="u-m-r-20"
            type="info"
            :hair-line="false"
            shape="circle"
            @click="onResetAllOpts"
            >重置</u-button
          >
          <u-button
            class="u-flex-1"
            type="primary"
            shape="circle"
            @click="onSearch"
            >确认</u-button
          >
        </div>
      </u-dropdown-item>
      <u-dropdown-item title="筛选">
        <scroll-view scroll-y style="height: 600rpx">
          <div class="slot-filter-content">
            <div class="title">房型</div>
            <div class="label-container">
              <div
                class="label-item"
                :class="{ on: item.select }"
                :key="index"
                v-for="(item, index) in filterOptions.building_type"
                @click="onHouseBuildChange('building_type', index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="slot-filter-content">
            <div class="title">朝向</div>
            <div class="label-container">
              <div
                class="label-item"
                :class="{ on: item.select }"
                :key="index"
                v-for="(item, index) in filterOptions.house_direction"
                @click="onHouseBuildChange('house_direction', index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="slot-filter-content">
            <div class="title">电梯</div>
            <div class="label-container">
              <div
                class="label-item"
                :class="{ on: item.select }"
                :key="index"
                v-for="(item, index) in filterOptions.elevator"
                @click="onHouseBuildChange('elevator', index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="slot-filter-content">
            <div class="title">面积</div>
            <div class="label-container">
              <div
                class="label-item"
                :class="{ on: item.select }"
                :key="index"
                v-for="(item, index) in filterOptions.area"
                @click="onAreaChange(index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="slot-filter-content">
            <div class="title">楼层</div>
            <div class="label-container">
              <div
                class="label-item"
                :class="{ on: item.select }"
                :key="index"
                v-for="(item, index) in filterOptions.house_floor"
                @click="onHouseBuildChange('house_floor', index)"
              >
                {{ item.name }}
              </div>
            </div>
            <custom-blank height="40" />
          </div>
        </scroll-view>
        <div class="custom-dropdown-footer u-flex">
          <u-button
            class="u-m-r-20"
            type="info"
            :hair-line="false"
            shape="circle"
            @click="onResetAllOpts"
            >重置</u-button
          >
          <u-button
            class="u-flex-1"
            type="primary"
            shape="circle"
            @click="onSearch"
            >确认</u-button
          >
        </div>
      </u-dropdown-item>
    </u-dropdown>
    <div class="house-list-container">
      <common-house-list :list="list" />
    </div>
    <!-- 自定义tabbar -->
    <custom-tabbar />
  </div>
</template>

<script lang="ts">
import { reqHouseKeywords, reqHouseList } from '@/api';
import Vue from 'vue';
import RangeSlider from '@/libs/components/range-slider.vue';
import { tabbarConfig } from '@/config';

import store from '@/store';

export default Vue.extend({
  components: { RangeSlider },
  mixins: [tabbarConfig],
  data: () => ({
    // 表单信息
    filterOptions: {} as any,
    form: {
      city_id: '' as Key,
      area_id: '' as Key,
      region_id: '' as Key,
      price: [0, 1000000000000000],
      area: [] as number[],
    },
    areaIndex: 10,
    other: {
      lease_type: '' as Key | Key[],
      house_type: '' as Key | Key[],
      house_direction: '' as Key | Key[],
      building_type: '' as Key | Key[],
      house_floor: '' as Key | Key[],
      elevator: '' as Key | Key[],
    },

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,

    // 该值用于判断初始化页面是携带参数还是不是携带参数
    params: null,

    // 地址选择展开索引
    activeMenusIndex: 0,
    showMenusIndex: false,
  }),
  computed: {
    extra(): Key[] {
      return Object.values(this.other)
        .filter((item) => {
          return item !== '';
        })
        .flat(1);
    },
  },
  methods: {
    // 处理价格标签过滤
    onRangeformat(value: string) {
      return value + ' 元';
    },
    // 区域选择器发生变化
    onRegionChange(activeMenus: { id: number; text: string }[]) {
      this.form.city_id = activeMenus?.[0]?.id || '';
      this.form.area_id = activeMenus?.[1]?.id || '';
      this.form.region_id = activeMenus?.[2]?.id || '';
    },
    // 房源选择器发生变化
    onHouseTypeChange(activeMenus: { id: Key; text: string }[]) {
      this.other.lease_type = activeMenus[0]?.id || '';
      this.other.house_type = activeMenus[1]?.id || '';
    },
    // 面积选择发生变化
    onAreaChange(index: Key) {
      this.filterOptions['area'].forEach((item: any, i: number) => {
        if (i !== index) item.select = false;
      });
      this.filterOptions['area'][index].select = !this.filterOptions['area'][
        index
      ].select;
      if (this.filterOptions['area'][index].select) {
        this.form.area = this.filterOptions['area'][index].id;
      } else {
        this.form.area = [];
      }
    },
    // 其他选择发生变化
    onHouseBuildChange(key: string, index: number | string) {
      this.filterOptions[key][index].select = !this.filterOptions[key][index]
        .select;
      this.other[key as 'lease_type'] = this.filterOptions[key]
        .filter((item: any) => item.select)
        .map((item: any) => item.id);
    },
    // 重置所有选项
    onResetAllOpts(reset = true) {
      (this.$refs.regionFilter as any).onReset();
      (this.$refs.houseFilter as any).onReset();
      (this.$refs.uDropdown as any).close();
      this.form = {
        city_id: '',
        area_id: '',
        region_id: '',
        price: [0, 1000000000000000],
        area: [],
      };
      this.other = {
        lease_type: '',
        house_type: '',
        house_direction: '',
        building_type: '',
        house_floor: '',
        elevator: '',
      };
      this.filterOptions.building_type?.forEach((item: any) => {
        item.select = false;
      });
      this.filterOptions.house_direction?.forEach((item: any) => {
        item.select = false;
      });
      this.filterOptions.elevator?.forEach((item: any) => {
        item.select = false;
      });
      this.filterOptions.house_floor?.forEach((item: any) => {
        item.select = false;
      });
      reset && this.resetList();
    },
    // 初始化获取筛选条件
    async initFilterOptions() {
      const { data } = await reqHouseKeywords();
      // 递归处理地区数据
      const handleRegion = (region: any) => {
        region.forEach((regionItem: any) => {
          regionItem.text = regionItem.name;
          if (regionItem.childlist.length) {
            regionItem.child = regionItem.childlist;
          }
          delete regionItem.childlist;
          delete regionItem.name;
          if (typeof regionItem.child !== 'undefined')
            handleRegion(regionItem.child);
        });
      };
      handleRegion(data.region);
      // 取得选择市区
      for (let i = 0; i < data.region.length; i++) {
        if (data.region[i].id == store.state.common.location.id) {
          this.activeMenusIndex = i;
          this.showMenusIndex = true;
          continue;
        }
      }
      data.lease_type.unshift({ id: '', name: '不限' });
      data.house_type.unshift({ id: '', name: '不限' });
      data.lease_type = data.lease_type.map((item: any) => {
        return {
          id: item.id,
          text: item.name,
          child: data.house_type.map((citem: any) => {
            return {
              id: citem.id,
              text: citem.name,
            };
          }),
        };
      });
      const initSelect2False = (array: any[]) =>
        array.map((item) => {
          item.select = false;
          return item;
        });
      data.building_type = initSelect2False(data.building_type);
      data.house_direction = initSelect2False(data.house_direction);
      data.elevator = initSelect2False(data.elevator);
      data.house_floor = initSelect2False(data.house_floor);
      data.area = [
        { id: [0, 10], name: '≤10㎡', select: false },
        { id: [10, 30], name: '10-30㎡', select: false },
        { id: [30, 60], name: '30-60㎡', select: false },
        { id: [90, 110], name: '90-110㎡', select: false },
        { id: [120], name: '≥120㎡', select: false },
      ];
      delete data.house_type;
      // 将筛选条件存入
      this.filterOptions = data;
    },
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
      (this.$refs.uDropdown as any).close();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqHouseList({
          page: this.page,
          limit: this.limit,
          search: {
            ...this.form,
            extra: this.extra,
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
    // 处理跳转参数
    handleReceiveParams(opts: any) {
      this.onResetAllOpts(false);
      if (opts.other) {
        this.other = {
          ...this.other,
          ...opts.other,
        };
      }
      if (opts.filter) {
        this.filterOptions['area'][opts.filter['areaIndex']].select = true;
      }
      this.resetList();
    },
    // 进行搜索
    onSearch() {
      // 进行搜索埋点（友盟+）
      this.$uma.trackEvent('Um_Event_SearchSuc', {
        Um_Key_SearchKeyword: '',
        Um_Key_SearchPortal: '找房搜索',
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
      });
      this.resetList();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    await this.initFilterOptions();
    !this.params && this.resetList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    const params = uni.getStorageSync('search-params');
    params && this.handleReceiveParams(params);
    this.params = params;
    uni.removeStorageSync('search-params');
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
page {
  height: 100%;
}
.search-house {
  padding: 1rpx 0;
  min-height: 100%;
  background-color: #f7f7f7;
}
.custom-dropdown-footer {
  padding: 24rpx 32rpx;
  background-color: #ffffff;
}
.slot-content {
  background-color: #ffffff;
}
.slot-filter-content {
  padding: 0 40rpx;
  background-color: #ffffff;
  &:first-child {
    padding-top: 40rpx;
  }
  .title {
    padding-bottom: 28rpx;
    font-size: 28rpx;
    font-weight: bold;
  }
  .label-container {
    overflow: hidden;
    .label-item {
      display: inline-block;
      width: 147rpx;
      height: 50rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      text-align: center;
      font-size: 22rpx;
      line-height: 50rpx;
      background: #e5e5e5;
      transition: 0.3s;
      &.on {
        color: #ffffff;
        background-color: #ff7e5f;
      }
    }
  }
}
.house-list-container {
  margin: 0 32rpx;
  padding-bottom: 32rpx;
}
</style>
