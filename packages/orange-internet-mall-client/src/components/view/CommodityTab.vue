<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-04-28 10:33:13
 * @Description: 选项卡视图项
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :style="{ padding }">
    <div
      :style="{
        borderRadius,
        overflow: 'hidden',
        background: tabStyle.color.background,
      }"
    >
      <div
        class="u-flex tab-bar-view"
        :style="{
          justifyContent: tabList.length > 3 ? 'flex-start' : 'space-around',
        }"
      >
        <div class="u-p-1 u-flex">
          <div
            class="bar-item"
            v-for="(item, index) in tabList"
            :key="index"
            :style="{
              margin: `0 ${tabStyle.padding.shopSpacing * 2}rpx`,
              color:
                currentKey === item.CACHE_KEY_LIST
                  ? tabStyle.color.selectTitle
                  : tabStyle.color.title,
              backgroundColor:
                currentKey === item.CACHE_KEY_LIST
                  ? tabStyle.color.selectBackground
                  : '',
              borderBottom: `${tabStyle.bottomBorder ? 6 : 0}rpx`,
              borderBottomStyle: 'solid',
              borderBottomColor:
                currentKey === item.CACHE_KEY_LIST
                  ? tabStyle.color.bottomBorder
                  : '#FFF0',
            }"
            @click="selectItem(item.CACHE_KEY_LIST)"
          >
            <span style="white-space: nowrap">{{ item.title || '选项' }}</span>
          </div>
        </div>
      </div>
      <template v-for="i in option.tabList">
        <commodity-group
          :key="i.CACHE_KEY_LIST"
          v-if="i.CACHE_KEY_LIST === currentKey"
          :option="i.content"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { tabOption } from 'orange-components-config/options';
import CommodityGroup from './CommodityGroup.vue';
import { usePaddingRadius } from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof tabOption,
      required: true,
    },
  },
  setup(props) {
    // 将元素暴露为变量 深层地址索引
    const { tabStyle, tabList } = props.option;
    // 通过hook获取边距样式背景
    const { padding, borderRadius } = usePaddingRadius(tabStyle);
    // 当前选择Key
    const currentKey = ref(tabList[0].CACHE_KEY_LIST);
    const selectItem = (index: string) => (currentKey.value = index);
    return {
      tabStyle,
      tabList,
      padding,
      borderRadius,
      selectItem,
      currentKey,
    };
  },
  components: {
    CommodityGroup,
  },
});
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.tab-bar-view {
  overflow: auto;
  .bar-item {
    font-size: toRpx(14);
    padding: toRpx(10) toRpx(6);
    box-sizing: border-box;
  }
}
</style>
