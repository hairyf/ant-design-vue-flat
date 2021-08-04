<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-14 16:26:58
 * @Description: 分层对齐列表
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="layered-good-list">
    <u-card
      padding="0"
      :show-head="false"
      :key="index"
      v-for="(item, index) in list"
      @click="$navigateTo('/pages/commons/shopDetails', { id: item.id })"
    >
      <div class="custom-cart-body u-flex" slot="body">
        <div class="poster-image">
          <u-image
            :width="240"
            :height="240"
            :border-radius="10"
            :src="item.main_picture"
          />

          <div class="position-top u-flex">
            <div v-for="(iv, i) in item.marketing_tab" :key="i">
              <div v-if="iv == 1">
                <u-tag
                  text="推荐"
                  mode="dark"
                  class="u-m-l-2"
                  bg-color="#FF0000"
                  size="mini"
                />
              </div>
              <div v-if="iv == 2">
                <u-tag
                  text="新品"
                  mode="dark"
                  class="u-m-l-10 u-m-r-10"
                  bg-color="#FF9D28"
                  size="mini"
                />
              </div>
              <div v-if="iv == 3">
                <u-tag text="热销" mode="dark" bg-color="#FF8A65" size="mini" />
              </div>
            </div>
          </div>
        </div>

        <div class="right-column u-flex u-flex-1">
          <div class="title u-margin-bottom-12">
            {{ item.title }}
          </div>
          <div class="labels u-margin-bottom-24">
            <!-- <u-tag
              type="info"
              size="mini"
              :text="item.title"
              border-color="#F4F4F5"
              shape="circle"
            /> -->
          </div>
          <div class="controls u-flex u-row-between">
            <div class="u-flex-1">
              <span class="price">￥{{ item.price }}</span>
              <span class="tips u-margin-left-25 text-style">
                ￥{{ item.original_price }}
              </span>
              <span class="tips u-margin-left-25">
                销量: {{ item.sales }}
              </span>
            </div>
            <template v-if="isAuthUserInfo && collection">
              <u-icon
                v-if="item.enshrine == 0"
                @click.stop="addCollectCount(index)"
                size="40"
                :color="$hexColor['--color-primary']"
                name="star-fill"
              />
              <u-icon
                v-else
                @click.stop="addCollectCount(index)"
                size="40"
                :color="$hexColor['--color-primary']"
                name="star-fill"
              />
            </template>
          </div>
        </div>
      </div>
    </u-card>
    <u-empty
      v-if="!list.length"
      :margin-top="300"
      text="当前暂无结果商品"
      mode="list"
    />
  </div>
</template>

<script lang="ts">
import { reqAddCollect, reqUnCollect } from '@/api';
import store from '@/store';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    list: {
      type: Array as () => any[],
      required: true,
    },
    // 是否为收藏组件
    collection: {
      type: Boolean,
    },
  },
  data: () => ({
    market: [
      {
        id: '1',
        title: '推荐',
        color: '#FF0000',
      },
      {
        id: '2',
        title: '新品',
        color: '#FF9D28',
      },
      {
        id: '3',
        title: '热卖',
        color: '#FF8A65',
      },
    ],
  }),
  computed: {
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
  },
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    async addCollectCount(index: number) {
      const isCollect = this.list[index].enshrine == 1;
      if (isCollect) {
        await reqUnCollect(this.list[index].id);
        this.list[index].enshrine === 0;
      } else {
        await reqAddCollect(this.list[index].id);
        this.list[index].enshrine === 1;
      }
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
.position-top {
  width: 100%;
  position: absolute;
  left: 0;
  top: 2rpx;
}
.text-hidden-mul-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.layered-good-list {
  margin-top: -30rpx;
}
.poster-image {
  position: relative;
  flex-shrink: 0;
}
.right-column {
  height: 200rpx;
  padding: 15rpx 0;
  margin: 0 25rpx;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .title {
    width: 400rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 75rpx;
  }
  .labels {
    u-tag:not(:last-child) {
      margin-right: 20rpx;
    }
  }
  .controls {
    width: 100%;
    .price {
      color: #ff3d00;
      font-size: 34rpx;
      font-weight: bold;
    }
    .tips {
      flex: 1;
      font-size: 22rpx;
      color: #acacac;
    }
  }
}
.text-style {
  text-decoration: line-through;
}
</style>
