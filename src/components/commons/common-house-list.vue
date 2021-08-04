<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-15 11:41:23
 * @LastEditTime: 2021-05-28 10:44:59
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="common-house-list">
    <!-- 普通展示列表 -->
    <template v-if="type === 'list'">
      <div
        class="house-item"
        v-for="(item, index) in list"
        :key="index"
        @click="$navigateTo('/pages/commons/houseDetails', { id: item.id })"
      >
        <div class="layer-1 box-content u-flex">
          <div class="left-column left-column-addition">
            <u-image
              class="addition-img"
              width="160"
              height="160"
              :src="item.image_text"
              border-radius="10"
            />
            <u-tag
              v-if="item.label"
              :text="statusToText(item.label).text"
              :bg-color="statusToText(item.label).color"
              mode="dark"
            />
          </div>
          <div class="right-addition u-flex u-flex-1">
            <div class="title">{{ item.name }}</div>
            <div class="tips-text">
              {{ item.extra_house_type || '' }} {{ item.area }}㎡
              {{ item.extra_house_direction || '' }} {{ item.floor || '' }}
            </div>
            <div class="u-flex u-row-between" style="width: 100%">
              <div class="price">¥ {{ item.price }}/月</div>
            </div>
          </div>
        </div>
        <div class="bottom-box">
          <div class="personal-info">
            <img :src="item.user.avatar" alt class="image" />
            <span class="text">{{ item.user.nickname }}</span>
          </div>
          <div class="tag-wrap">
            <div class="bot" v-if="!item.ziying">
              <img
                v-if="
                  item.authenticstatus === '个人已实名' ||
                  item.authenticstatus === '企业已实名'
                "
                src="@/static/icons/vc-flag.png"
                alt
                class="bot-flag"
              />
              <img
                v-else
                src="@/static/icons/v-flag.png"
                alt
                class="bot-flag"
              />
              <span
                :style="{
                  color:
                    item.authenticstatus === '个人已实名' ||
                    item.authenticstatus === '企业已实名'
                      ? '#558BF7'
                      : '#ADADAD',
                }"
                class="bot-text"
                >{{ item.authentication }}</span
              >
            </div>
            <!-- <div class="protect" v-else>自营保障</div> -->
            <div class="right">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 收藏列表 -->
    <template v-if="type === 'collection'">
      <div
        class="house-item"
        v-for="(item, index) in list"
        :key="index"
        @click="
          $navigateTo('/pages/commons/houseDetails', { id: item.house.id })
        "
      >
        <div class="layer-1 u-flex">
          <div class="left-column">
            <u-image
              class="left-column"
              width="240"
              height="240"
              :src="item.house.image_text"
            />
            <!-- <u-tag text="热门" mode="dark" bg-color="" /> -->
          </div>
          <div class="right-column u-flex u-flex-1">
            <div class="title">{{ item.house.name }}</div>
            <div class="tips">
              {{ item.house.extra_house_type || '' }} {{ item.house.area }}㎡
              {{ item.house.extra_house_direction || '' }}
              {{ item.house.floor || '' }}
            </div>
            <div class="u-flex u-row-between" style="width: 100%">
              <div class="price">¥ {{ item.house.price }}</div>
              <custom-icon name="like-select" :size="48" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 预约列表 -->
    <template v-if="type === 'appointment'">
      <div
        class="house-item"
        v-for="(item, index) in list"
        :key="index"
        @click="
          $navigateTo('/pages/appointments/lookHouseDetails', { id: item.id })
        "
      >
        <div class="layer-1 u-flex">
          <div class="left-column">
            <u-image
              class="left-column"
              width="240"
              height="240"
              :src="item.house.image_text"
            />
          </div>
          <div class="right-column u-flex u-flex-1">
            <div class="title">{{ item.house.name }}</div>
            <div class="tips">
              {{ item.house.extra_house_type || '' }} {{ item.house.area }}㎡
              {{ item.house.extra_house_direction || '' }}
              {{ item.house.floor || '' }}
            </div>
            <div class="u-flex u-row-between" style="width: 100%">
              <div class="price">¥ {{ item.house.price }}</div>
            </div>
          </div>
        </div>
        <div class="layer-2" v-if="type == 'appointment'">
          <span class="time">预约时间：{{ $format(item.appoint_time) }}</span>
          <custom-icon
            v-if="item.status == 1"
            name="lock-house-await"
            :size="200"
          />
          <custom-icon
            v-if="item.status == 2"
            name="lock-house-complete"
            :size="200"
          />
          <custom-icon
            v-if="item.status == 3"
            name="lock-house-close"
            :size="200"
          />
        </div>
      </div>
    </template>
    <u-empty v-if="!list.length" margin-top="120" text="暂无列表" mode="list" />
    <custom-blank v-if="!list.length" height="120" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// 展示类型; 默认 list (普通列表展示); collection (收藏); appointment (预约);
export default Vue.extend({
  props: {
    list: Array as () => Array<any>,
    type: {
      type: String,
      default: 'list',
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    statusToText(status: 'new' | 'cheap' | 'hot') {
      const strategy = {
        new: {
          color: '#FDB37A',
          text: '上新',
        },
        cheap: {
          color: '#6FD370',
          text: '性价比',
        },
        hot: {
          color: '#FE7D5F',
          text: '热门',
        },
      };
      return strategy[status];
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
.house-item {
  @include not-last-child(margin-bottom, 20rpx);
  position: relative;
  border-radius: 10rpx;
  background-color: #fff;
  overflow: hidden;
}
.left-column {
  position: relative;
  u-tag {
    position: absolute;
    top: 0;
    left: 20rpx;
  }
}
.box-content {
  padding: 20rpx 20rpx 0 20rpx;
}
.right-column {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 240rpx;
  padding: 20rpx 40rpx;
  .title {
    @include text-hidden-line(2);
  }
  .tips {
    font-size: 24rpx;
    color: #acacac;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
.left-column-addition {
  u-tag {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.right-addition {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0 20rpx 20rpx;
  .title {
    @include text-hidden-line(1);
  }
  .tips-text {
    font-size: 24rpx;
    color: #acacac;
    margin: 20rpx 0;
  }
  .price {
    font-size: 28rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
.bottom-box {
  margin-left: 200rpx;
  padding-bottom: 34rpx;
}
.personal-info {
  display: flex;
  align-items: center;
  .image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
  }
  .text {
    margin-left: 12rpx;
    color: #000;
    font-size: 24rpx;
  }
}
.tag-wrap {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .bot {
    // margin-left: 20rpx;
    width: 140rpx;
    height: 32rpx;
    display: flex;
    border: 2rpx solid #f2f2f2;
    align-items: center;
    box-sizing: border-box;
    border-radius: 40rpx;
    .bot-flag {
      width: 20rpx;
      height: 20rpx;
      border-radius: 20rpx;
      display: block;
    }
    .bot-text {
      font-size: 20rpx;
      color: #adadad;
      margin-left: 4rpx;
    }
  }
  .protect {
    width: 100rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    background-color: #62bb62;
    border-radius: 40rpx;
    font-size: 20rpx;
    color: #fff;
  }
  .right {
    width: 140rpx;
    height: 32rpx;
    margin-left: 20rpx;
    line-height: 32rpx;
    text-align: center;
    color: #000;
    font-size: 20rpx;

    border: 2rpx solid #f2f2f2;
    box-sizing: border-box;
    border-radius: 40rpx;
  }
}
.layer-2 {
  padding: 28rpx 0;
  custom-icon {
    position: absolute;
    bottom: -20rpx;
    right: 0;
  }
}
</style>
