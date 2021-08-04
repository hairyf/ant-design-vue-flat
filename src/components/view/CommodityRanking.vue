<!--
 * @Author: Zhilong
 * @Date: 2021-04-02 18:12:56
 * @LastEditTime: 2021-04-17 09:32:19
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <commodity-group :option="option">
    <template #header>
      <div
        v-if="option.title.showType === '显示'"
        class="u-flex u-row-center u-m-b-18"
      >
        <span
          class="title-view-line"
          :style="{
            background: `linear-gradient(-90deg,${option.title.color.line} 0%, rgba(255, 61, 0, 0) 100%)`,
          }"
        />
        <div class="u-flex">
          <view-image
            :src="option.title.image"
            :size="20 * 2"
            class="u-m-r-5 title-view-image"
          />
          <span
            :style="{ fontSize: '40rpx', color: option.title.color.text }"
            >{{ option.title.value }}</span
          >
        </div>
        <span
          class="title-view-line"
          :style="{
            background: `linear-gradient(90deg,${option.title.color.line} 0%, rgba(255, 61, 0, 0) 100%)`,
          }"
        />
      </div>
    </template>
  </commodity-group>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { commodityRankingOption } from 'orange-components-config/options';
import CommodityGroup from './CommodityGroup.vue';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityRankingOption,
      required: true,
    },
  },
  components: {
    CommodityGroup,
  },
  data: () => ({
    goodsClassList: [],
  }),
  methods: {},
});
</script>
<style lang="scss" scoped>
.title-view-line {
  display: block;
  height: toRpx(1);
  width: toRpx(32);
  margin: 0 toRpx(10);
  border-radius: toRpx(17);
}
.title-view-image {
  box-sizing: border-box;
}
.bootom-title {
  font-size: toRpx(14);
  color: #000000;
}
.bootom-text {
  font-size: toRpx(12);
  color: #acacac;
  margin: toRpx(5) 0 toRpx(3) 0;
}
.corner-marker {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: toRpx(36);
  height: toRpx(20);
  i {
    position: relative;
    font-size: toRpx(32);
    span {
      position: absolute;
      left: toRpx(-2);
      right: 0;
      bottom: 0;
      top: 0;
      margin: 0 auto;
      z-index: 1;
      font-size: toRpx(12);
      line-height: toRpx(24);
      text-align: center;
      color: #fff;
    }
  }
}
.price-tetx {
  font-size: toRpx(16);
  font-weight: bold;
  line-height: toRpx(23);
  color: #ff3d00;
  > * {
    margin-bottom: toRpx(3);
  }
  span {
    font-size: toRpx(12);
  }
  .before {
    margin-left: toRpx(3);
    font-size: toRpx(12);
    color: #acacac;
    text-decoration: line-through;
  }
}
.price-img {
  margin-right: toRpx(6);
  width: toRpx(81);
  height: toRpx(24);
}
.el-image {
  vertical-align: middle;
}
.bootom-btn1 {
  padding: 0 toRpx(8);
  height: toRpx(22);
  line-height: toRpx(22);
  text-align: center;
  font-size: toRpx(13);
  color: #ffffff;
  background: #ff3d00;
}
.bootom-btn2 {
  padding: 0 toRpx(8);
  height: toRpx(22);
  line-height: toRpx(22);
  text-align: center;
  font-size: toRpx(13);
  color: #ff3d00;
  border: toRpx(1) solid #ff3d00;
}
.projection {
  box-shadow: 0 0 toRpx(10) rgb(226 231 244 / 70%);
}
.stroke {
  border: toRpx(1) solid rgb(237, 237, 237);
}
.four-sides-price {
  position: absolute;
  left: toRpx(4);
  bottom: toRpx(4);
}
.group-both-sides {
  overflow: hidden;
  .both-sides-box {
    margin: toRpx(5);
    overflow: hidden;
    position: relative;
  }
  .both-sides-bootom {
    position: relative;
    padding: toRpx(6) toRpx(12) toRpx(7) toRpx(12);
  }
  .bootom-information {
    align-items: flex-end;
    margin-top: toRpx(18);
  }
  .group-both-sides-img {
    width: 100%;
    height: toRpx(172);
  }
}
.group-four-sides {
  overflow: hidden;
  .four-sides-img {
    width: toRpx(80);
    height: toRpx(80);
  }
  .group-four-sides-box {
    margin: toRpx(5);
    overflow: hidden;
    position: relative;
    display: flex;
    .four-sides-box-right {
      flex: 1;
      position: relative;
      padding: toRpx(4);
    }
  }
}
.group-left {
  width: 100%;
  overflow: hidden;
  .group-left-box {
    overflow: hidden;
    position: relative;
    width: toRpx(100);
    height: toRpx(166);
    margin-right: toRpx(7);
    background: #fff;
    border-radius: toRpx(5);
  }
  .group-left-img {
    width: toRpx(100);
    height: toRpx(100);
  }
  .left-bottom {
    min-height: toRpx(67);
    padding: toRpx(3) toRpx(10);
  }
}
</style>
