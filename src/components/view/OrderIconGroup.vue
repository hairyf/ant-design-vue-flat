<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-11 21:24:56
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :style="{ padding, overflow: 'hidden', background }">
    <div
      class="order-icon-group"
      :style="{
        borderRadius,
        backgroundColor: option.colorStyle.color.cardBackground,
      }"
    >
      <div class="hedaer u-flex">
        <div
          class="title u-flex-1"
          :style="{ color: option.colorStyle.color.title }"
        >
          {{ option.contentEdit.title }}
        </div>
        <link-controller
          :data="allOrdersLink"
          class="tips"
          :style="{ color: option.colorStyle.color.tips }"
        >
          <span class="u-m-r-5">全部订单</span>
          <view-icon size="25" name="oe-arrow-right" />
        </link-controller>
      </div>
      <div class="main u-flex">
        <link-controller
          :data="v.link"
          v-for="v in option.contentEdit.contents"
          :key="v.type"
          class="u-flex-1"
        >
          <div class="item u-flex u-flex-1">
            <div class="icon">
              <view-image
                :size="24 * 2"
                :src="
                  option.componentStyle.componentModal === '图片'
                    ? v.image
                    : v.icon
                "
                :label-color="option.colorStyle.color.icon"
              />
            </div>
            <span class="text" :style="{ color: option.colorStyle.color.text }">
              {{ v.text }}
            </span>
          </div>
        </link-controller>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { orderIconGroupOption } from 'orange-components-config/options';
import { shopOrderLinks } from 'orange-components-config/linkIndexes';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof orderIconGroupOption,
      required: true,
    },
  },
  setup: (props) => {
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    const link = shopOrderLinks['myOrders'];
    link.value.params = { id: 0 };
    return {
      padding,
      borderRadius,
      background,
      allOrdersLink: link,
    };
  },
});
</script>
<style lang="scss" scoped>
.hedaer {
  padding: toRpx(17);
  .title {
    font-weight: bold;
    font-size: toRpx(14);
  }
  .tips {
    font-size: toRpx(12);
    color: #999ca7;
  }
}
.main {
  padding-bottom: toRpx(17);
}
.item {
  flex-direction: column;
  .text {
    margin-top: toRpx(5);
    font-size: toRpx(12);
  }
  .icon {
    display: inline-block;
    width: toRpx(24);
    height: toRpx(24);
  }
}
</style>
