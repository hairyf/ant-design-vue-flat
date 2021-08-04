<!--
 * @Author: Zhilong
 * @Date: 2021-05-14 17:51:48
 * @LastEditTime: 2021-05-17 16:00:54
 * @Description: 布局组件 更容易控制的flex布局
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="layout-container" :style="{ margin: `${margin / 2}rpx` }">
    <template v-if="wrap">
      <div
        class="layout-chunk-list u-flex"
        v-for="(arr, key) in chunkList"
        :style="{ marginBottom: `${interval}rpx` }"
        :key="key"
      >
        <div
          class="layout-list u-flex-1"
          v-for="(item, index) in arr"
          :style="{ margin: `0 ${interval / 2}rpx` }"
          :key="index"
        >
          <slot
            :items="list"
            :currentList="arr"
            :item="item"
            :index="index"
            :data="data"
          />
        </div>
        <div
          class="oe-flex-1"
          v-for="v in row - arr.length"
          :key="`${v}toList`"
        />
      </div>
    </template>
    <template v-else>
      <div class="layout-row-list">
        <div
          v-for="(item, index) in list"
          :style="{ marginRight: `${interval}rpx` }"
          :key="index"
        >
          <slot :items="list" :item="item" :index="index" :data="data" />
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { chunk } from 'lodash';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    data: Object,
    type: {
      type: String as () => 'row' | 'row-reverse' | 'column' | 'column-reverse',
      default: 'row',
    },
    row: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array as () => any[],
      default: (): any[] => [],
    },
    interval: {
      type: Number,
      default: 0,
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    margin: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const chunkList = computed(() => {
      return chunk(props.list, props.row);
    });
    return { chunkList };
  },
});
</script>
<style lang="scss" scoped>
.layout-row-list {
  display: flex;
  overflow: auto;
}
.layout-container {
  // display: flex;
  // flex-wrap: wrap;
  .layout-chunk-list {
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
  .layout-list {
    overflow: hidden;
    &:first-child {
      margin-left: 0 !important;
    }
    &:last-child {
      margin-right: 0 !important;
    }
  }
}
</style>
