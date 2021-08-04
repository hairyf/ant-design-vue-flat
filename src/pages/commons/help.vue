<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 18:10:46
 * @LastEditTime: 2021-05-13 15:03:26
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller>
    <div class="help">
      <u-card
        :show-head="false"
        :show-foot="false"
        :border="false"
        margin="0rpx 32rpx"
      >
        <u-collapse slot="body">
          <u-collapse-item
            :title="item.head"
            v-for="(item, index) in list"
            :open="item.open"
            :key="index"
          >
            <div>{{ item.body }}</div>
            <image
              class="u-m-t-15"
              style="height: 634rpx"
              fit="aspectFit"
              v-if="item.image"
              :src="item.image"
            />
          </u-collapse-item>
        </u-collapse>
      </u-card>
      <div style="height: 30rpx" />
    </div>
  </view-controller>
</template>

<script lang="ts">
import Vue from 'vue';
const baseUrl =
  'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/';
export default Vue.extend({
  components: {},
  // 1、亲,  您可以在【个人中心-我的订单-待支付】找到对应的订单，点击取消订单，即可取消该订单。
  data: () => ({
    list: [
      {
        head: '常见问题',
        body:
          '充值需先与管理员联系，并在线下支付需充值相应的金额后，管理员再对于账户进行余额充值即可',
        open: true,
        disabled: true,
      },
      {
        head: '如何查看物流信息？',
        body:
          '1、亲,您可以在【个人中心-我的订单】中选择对应的订单,点击【查看物流】,  即可查询该订单的物流进度；2、如果是查询退货/换货/补寄等信息,还需要您用浏览器打开对应物流公司官网,  输入快递单号查询物流流转明细。',
        image: `${baseUrl}order-help.png`,
        open: false,
      },
      {
        head: '为什么有运单号却查看不到物流信息？',
        body:
          '亲有运单号未查到物流消息有以下几点1、快递公司未对此货物进行收件扫描，所以暂时查不到此单号的物流信息； 2、运单信息已录入，网上信息尚未更新建议亲可以隔天查看一般可以查看到物流消息哦，若是隔天未更新可以联系客服查询商品物流情况~3、由于物流接口对接原因或者物流查询达到上限无法查询物流信息，您可以复制物流单号到百度查询物流信息。',
        open: false,
      },
      {
        head: '可以指定快递么？',
        body:
          '1、亲,  您的商品是由商家为您安排发货,  如您需要指定具体快递配送,  建议您联系商家进行确认若因商家未按双方约定发快递导致您收不到货,  微匠工建议您优先联系物流公司或快递员进行拒收。',
        open: false,
      },
      {
        head: '商品少发/发错怎么办？',
        body:
          '1、亲,  可以拍下包裹内外详细照片，尽快联系客服；2、少发、发错的商品联系客服协商进行补发或退款。',
        open: false,
      },
      {
        head: '什么是七天无理由退货？',
        body:
          '亲，以下情况我们为您提供七天内无理由退货服务1、商品出现质量问题：运输破损、错发、漏发等；2、商品非质量问题；订单签收次日起七天内【以物流显示的签收日期为准】，商品吊牌完好未经使用或清洗、且配件赠品资料齐全，不影响二次销售。【部分特殊商品不支持七天无理由，在商品详情页面有注明】。',
        open: false,
      },
      {
        head: '订单能够修改哪些内容？',
        body: '1、订单付款后未发货可以修改一次收货信息',
        open: false,
      },
      {
        head: '订单如何取消？',
        body:
          '1、亲,  您可以在【个人中心-我的订单-待支付】找到对应的订单，点击取消订单，即可取消该订单',
        image: `${baseUrl}logistics-help.png`,
        open: false,
      },
    ],
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
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
@include full-page(help);
</style>
