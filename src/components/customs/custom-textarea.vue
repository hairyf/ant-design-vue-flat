<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-01-19 19:49:23
 * @Description: 自定义多行输入框
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-textarea">
    <div
      class="tips"
      v-if="label"
      :style="{ textAlign: labelAlign, color: labelColor }"
    >
      <slot name="left" />
      {{ label }}
    </div>
    <textarea
      placeholder-class="placeholder-input"
      :style="{
        textAlign: inputAlign,
        height: height + 'rpx',
        fontSize: fontSize + 'rpx',
        backgroundColor: bgColor,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      :maxlength="maxlength"
      @input="
        $emit('input', $event.detail.value);
        index = $event.detail.value.length;
      "
      name=""
      id=""
      cols="30"
      rows="10"
    >
    </textarea>
    <cover-view class="textarea-tips"
      >还可输入 {{ maxlength - index }} 字</cover-view
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  model: {
    event: 'input',
    prop: 'value',
  },
  props: {
    /* 标签配置 */
    labelAlign: String,
    labelColor: {
      type: String,
      default: '#666666',
    },
    /* 标签内容 */
    label: String,
    /* 表单字体对齐方式 */
    inputAlign: String,
    /* 占位符 */
    placeholder: String,
    /* 是否禁用 */
    disabled: Boolean,
    /* 表单默认值 */
    value: String,
    /* 表单高度(rpx) */
    height: {
      type: Number,
      default: 210,
    },
    /* 输入长度 */
    maxlength: {
      type: Number,
      default: 100,
    },
    /* 字体尺寸(rpx) */
    fontSize: {
      type: Number,
      default: 24,
    },
    /* 背景颜色 */
    bgColor: {
      type: String,
      default: '#f5f5f5',
    },
  },
  data: () => ({
    index: 0,
  }),
  computed: {},
  methods: {},
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
.custom-textarea {
  position: relative;
  padding: 0;
}
textarea {
  position: relative;
  width: auto;
  padding: 25rpx;
  padding-bottom: 48rpx;
  border-radius: 8rpx;
}
.placeholder-input {
  color: #9a9a9a;
}
.tips {
  width: 160rpx;
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}
.textarea-tips {
  position: absolute;
  font-size: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  color: #9a9a9a;
}
</style>
