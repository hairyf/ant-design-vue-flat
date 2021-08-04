<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 14:29:37
 * @LastEditTime: 2021-01-28 17:30:51
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="common-hm-filter u-flex">
    <scroll-view
      scroll-y="true"
      v-for="(item, index) in openMenus"
      :style="[style]"
      :key="index"
    >
      <div style="padding: 32rpx">
        <div
          v-for="(citem, cindex) in item"
          :key="cindex"
          class="select-item"
          :class="{ on: activeMenus[index].id == citem.id }"
          @click="onPushMenuItem(citem, citem.child, index)"
        >
          {{ citem.text }}
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts">
import { analyUnit, getDepth } from '@/utils';
import Vue from 'vue';
type Options = { id: number; text: string; child: Options }[];
export default Vue.extend({
  props: {
    // 选择项配置
    options: Array as () => Options,
    // 选择器高度
    height: {
      type: [String, Number],
      default: 500,
    },
    // 选择倒退层是否保留选择状态
    backSave: {
      type: Boolean,
      default: false,
    },
    // 是否默认展开第一项
    isOpenOne: {
      type: Boolean,
      default: false,
    },
    // 选择第一项索引值
    index: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    // 展开的项
    openMenus: [] as Options[],
    // 记录选中
    activeMenus: [] as { id: number; text: string }[],
  }),
  computed: {
    // 计算样式
    style(): any {
      return {
        height: analyUnit(this.height),
      };
    },
    // 嵌套层级
    hierarchyLength(): number {
      return getDepth(this.options);
    },
  },
  methods: {
    // 添加展开项
    onPushMenuItem(item: Options[0], options: Options, index: number) {
      // 子项是否存在(不存在则不展开项)
      // const isExisteChild = !!item.child
      // 是否为倒退层
      const isBackOff = index + 1 < this.openMenus.length;
      // 是否为中间层
      const isCerter = index !== 0 && isBackOff;
      // 如果是第一层
      if (index === 0) {
        this.openMenus.splice(1, this.openMenus.length - 1);
        !this.backSave && this.activeMenus.splice(1, this.openMenus.length);
      }
      // 当没有超出嵌套层级时
      if (this.openMenus.length !== this.hierarchyLength) {
        this.openMenus.push(options);
      } else {
        // 如果是最后一层, 重构数组刷新状态
        this.openMenus = [...this.openMenus];
      }
      // 如果是中间层
      if (isCerter) {
        this.openMenus.splice(index + 1, this.openMenus.length - index);
        this.openMenus.push(options);
        !this.backSave &&
          this.activeMenus.splice(index + 1, this.openMenus.length - index);
      }
      this.activeMenus[index] = { id: item.id, text: item.text };
      // 发送事件
      this.$emit('change', this.activeMenus);
    },
    // 重置所有项
    onReset() {
      this.openMenus = [this.options];
      this.activeMenus = [];
      this.$emit('change', this.activeMenus);
    },
  },
  watch: {
    options() {
      this.openMenus = [this.options];
      this.isOpenOne &&
        this.onPushMenuItem(
          this.options[this.index],
          this.options[this.index].child,
          this.index
        );
    },
  },

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
.common-hm-filter {
  background-color: #ffffff;
  align-items: flex-start;
}
scroll-view {
  flex: 1;
  transition: 0.5s;
  border-right: solid 1rpx #f8f8f8;
  &:last-child {
    flex: 2;
  }
}
.select-item {
  @include not-last-child(margin-bottom, 48rpx);
  transition: 0.2s;
  &.on {
    color: #ff7e5f;
  }
}
</style>
