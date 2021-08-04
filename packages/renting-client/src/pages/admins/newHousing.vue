<!--
 * @Author: Mr.wang
 * @Date: 2021-05-26 16:48:20
 * @LastEditTime: 2021-06-16 09:29:51
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="new-housing">
    <div class="form-box">
      <u-form :model="form" ref="uForm" label-position="top" :rules="rules">
        <u-form-item label="套餐名称" prop="name" :required="true">
          <div class="item-wrap-bot">
            <div class="item-input-wrap">
              <u-input
                v-model="form.name"
                maxlength="10"
                type="text"
                placeholder="请输入套餐名称"
              />
            </div>
            <span class="right-text">{{ form.name.length }}/10</span>
          </div>
        </u-form-item>
        <u-form-item label="套餐种类" prop="type" :required="true">
          <u-radio-group v-model="form.type" active-color="#FF7E5F">
            <u-radio name="1" :icon-size="16" :label-size="24"
              >永久套餐</u-radio
            >
            <u-radio name="2" :icon-size="16" :label-size="24"
              >限时套餐</u-radio
            >
          </u-radio-group>
        </u-form-item>
        <u-form-item
          label="套餐有效期天数"
          prop="time"
          :required="true"
          v-if="form.type == '2'"
        >
          <div class="item-wrap-bot">
            <div class="item-input-wrap">
              <u-input
                v-model="form.time"
                maxlength="10"
                type="text"
                placeholder="请输入有效期天数"
              />
            </div>
            <span class="right-text">天</span>
          </div>
        </u-form-item>
        <u-form-item label="套餐房源数" prop="num" :required="true">
          <div class="item-wrap-bot">
            <div class="item-input-wrap">
              <u-input
                v-model="form.num"
                maxlength="10"
                type="text"
                placeholder="房源数量"
              />
            </div>
            <span class="right-text">个</span>
          </div>
        </u-form-item>
        <u-form-item label="套餐价格" prop="price" :required="true">
          <div class="item-wrap-bot">
            <div class="item-input-wrap">
              <u-input
                @input="checkPrice"
                v-model="form.price"
                maxlength="10"
                type="text"
                placeholder="请输入套餐价格"
              />
            </div>
            <span class="right-text">元</span>
          </div>
        </u-form-item>
        <u-form-item label="套餐权重" prop="weight" :required="true">
          <div class="item-wrap-bot">
            <div class="item-input-wrap">
              <u-input
                v-model="form.weight"
                maxlength="10"
                type="text"
                placeholder="请输入权重数"
              />
            </div>
            <span class="right-text weight-tips">权重越大排名越靠前</span>
          </div>
        </u-form-item>
      </u-form>
    </div>
    <div class="bottom-btn">
      <u-button
        class="btn-right"
        shape="circle"
        :ripple="true"
        @click="submit(1)"
      >
        发布上架
      </u-button>
      <u-button
        class="btn-left"
        shape="circle"
        :ripple="true"
        @click="submit(0)"
      >
        移入草稿箱
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqNewSetmeal, reqMealDetail } from '@/api';
import { navigateBack, showToast } from '@/utils';
export default Vue.extend({
  components: {},
  data: () => ({
    form: {
      // 套餐名称
      name: '',
      // 套餐种类
      type: '1',
      // 套餐房源数
      num: '',
      //  套餐价格
      price: '',
      // 套餐权重
      weight: '',
      // 套餐时间
      time: '',
    },
    meal_id: '',
    rules: {
      name: [
        {
          required: true,
          message: '请输入套餐名称',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
      type: [
        {
          required: true,
          message: '请选择套餐种类',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
      num: [
        {
          required: true,
          message: '请输入套餐房源数',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
      price: [
        {
          required: true,
          message: '请输入套餐价格',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
      weight: [
        {
          required: true,
          message: '请输入套餐权重',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
      time: [
        {
          required: true,
          message: '请输入套餐天数',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['change', 'blur'],
        },
      ],
    },
  }),
  computed: {},
  methods: {
    submit(status: number) {
      (this.$refs.uForm as any).validate(async (valid: any) => {
        if (valid) {
          if (this.meal_id) {
            await reqNewSetmeal({
              meal_id: this.meal_id,
              title: this.form.name,
              num: this.form.num,
              price: this.form.price,
              status,
              validtime: this.form.type == '1' ? -1 : this.form.time,
              weight: this.form.weight,
            });
            await showToast({ title: '编辑成功!' });
            navigateBack();
          } else {
            await reqNewSetmeal({
              title: this.form.name,
              num: this.form.num,
              price: this.form.price,
              status,
              validtime: this.form.type == '1' ? -1 : this.form.time,
              weight: this.form.weight,
            });
            await showToast({ title: '新增成功!' });
            navigateBack();
          }
        } else {
          console.log('验证失败');
        }
      });
    },
    async getDetails(meal_id: string) {
      const { data } = await await reqMealDetail({ meal_id });
      console.log(data);

      this.form.name = data.title;
      this.form.num = data.num;
      this.form.price = data.price;
      this.form.weight = data.weight;
      this.form.type = data.validtime == -1 ? '1' : '2';
      this.form.time = data.validtime;
      this.form.num = this.form.num.toString();
      this.form.weight = this.form.weight.toString();
      this.form.time = this.form.time.toString();
      console.log(this.form);
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
  onLoad(options: { meal_id: string }) {
    if (options.meal_id) {
      this.meal_id = options.meal_id;
      this.getDetails(options.meal_id);
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    (this.$refs.uForm as any).setRules(this.rules);
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.new-housing {
  min-height: 100vh;
  background-color: #f5f5f5;
  .form-box {
    width: 100%;
    padding: 40rpx 40rpx 41rpx 48rpx;
    background-color: #fff;
    .u-form-item {
      line-height: 40rpx;
    }
    .u-form-item--left__content__label {
      color: #000;
      font-size: 24rpx;
      font-weight: 700;
    }
  }
  .item-wrap-bot {
    position: relative;
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
  .weight-tips {
    font-size: 20rpx !important;
    color: #adadad;
    position: absolute;
    right: 0rpx;
    top: -48rpx;
  }
  .bottom-btn {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    position: fixed;
    width: 100%;
    height: 120rpx;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .btn-left {
      .u-btn {
        width: 220rpx;
        height: 80rpx;
        border-color: #ff7e5f;
        color: #ff7e5f;
        background-color: #fff;
      }
    }
    .btn-right {
      margin: 0 20rpx;
      .u-btn {
        color: #fff;
        background-color: #ff7e5f;
      }
    }
  }
}
</style>
