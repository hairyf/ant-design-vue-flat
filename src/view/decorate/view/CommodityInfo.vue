<!--
 * @Author: Zhilong
 * @Date: 2021-04-19 16:57:46
 * @LastEditTime: 2021-04-22 20:45:11
 * @Description: 商品信息 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="commodity-info-container">
    <div class="commodity-info-view">
      <div class="view-carousel-map">
        <view-image
          size="375"
          src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/commodity-info-default.png"
        />
        <div
          class="view-carousel-spot"
          :style="{
            bottom: componentStyle.styleType === 'one' ? '22px' : '12px',
            right: '12px',
            left: componentStyle.styleType === 'three' ? '12px' : '',
            justifyContent: componentStyle.styleType === 'three' ? 'center' : ''
          }"
        >
          <div class="spot-item spot-number" v-if="componentStyle.styleType !== 'three'"> 1/5 </div>
          <div
            v-else
            class="spot-item spot-spot"
            v-for="v in 5"
            :style="{ backgroundColor: v === 1 ? '#fff' : undefined }"
            :key="v"
          >
          </div>
        </div>
      </div>
      <div class="view-content" :class="{ threeStyle: componentStyle.styleType === 'three' }">
        <div :class="'view-content-' + componentStyle.styleType">
          <!-- 价格 and 分享 -->
          <div class="content-price-share">
            <div>
              <span style="font-weight: 500; font-size: 17px; color: #ff3d00" class="oe-m-r-10">
                <span class="oe-f-s-13" style="margin-right: -5px">￥</span>
                {{ '299' }}
                <template v-if="contentEdit.productPrice === '区间'">
                  ~
                  <span class="oe-f-s-13" style="margin-right: -5px">￥</span>
                  {{ '500' }}
                </template>
              </span>
              <span
                v-if="contentEdit.productPrice === '最低价'"
                style="font-size: 13px; text-decoration-line: line-through; color: #999"
              >
                {{ '￥500' }}
              </span>
            </div>
            <div v-if="contentEdit.share" style="font-size: 12px; color: #999">
              <i class="oe-share oe-m-r-8" />分享
            </div>
          </div>
          <!-- 标题 -->
          <div class="content-title oe-f-s-16"> 商品标题 </div>
          <!-- 副标题 -->
          <div class="content-title-sub oe-f-s-12"> 商品副标题 </div>
          <!-- 保障 -->
          <div class="content-ensure">
            <div class="oe-flex">
              <span style="font-size: 13px; color: #666" class="oe-m-r-8">保障</span>
              <div
                v-for="i in ['七天无理由', '假一赔十', '破损包赔']"
                :key="i"
                :class="componentStyle.styleType === 'one' ? 'oe-m-r-15' : 'oe-m-r-4'"
              >
                <i
                  class="oe-hook ensure-hook-icon oe-m-r-2"
                  v-if="componentStyle.styleType === 'one'"
                />
                <span class="ensure-hook-text">{{ i }}</span>
              </div>
            </div>
            <i class="el-icon-arrow-right" />
          </div>
          <!-- 费用 -->
          <div class="content-cost">
            <div> 运费:￥8 <span v-if="contentEdit.express === '区间'">~￥15</span> </div>
            <div>销量:558</div>
            <div>库存:998</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { commodityInfoOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof commodityInfoOption,
      required: true
    }
  })
  const { componentStyle, contentEdit } = props.option
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .commodity-info-container {
    .commodity-info-view {
      .view-carousel-map {
        width: 375px;
        height: 375px;
        position: relative;
        .view-carousel-spot {
          position: absolute;
          display: flex;
          margin: auto;

          .spot-item {
            &:not(:last-child) {
              margin-right: 8px;
            }
          }
          .spot-spot {
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: rgba(0, 0, 0, 0.4);
          }
          .spot-number {
            width: 41px;
            height: 20px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 38px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
      .threeStyle {
        box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.03);
        border-radius: 0px 0px 5px 5px;
        margin-bottom: 14px;
      }
      .view-content {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 12px;
        > div {
          display: flex;
          flex-direction: column;
          > div:not(:last-child) {
            margin-bottom: 7px;
          }
          .content-price-share {
            display: flex;
            justify-content: space-between;
            order: 10;
          }
          .content-title {
            max-height: 40px;
            line-height: 20px;
            @include text-hidden-line(2);
            word-wrap: break-word;
            color: #000000;
            order: 20;
          }

          .content-title-sub {
            max-height: 36px;
            line-height: 18px;
            @include text-hidden-line(2);
            word-wrap: break-word;
            color: #999999;
            order: 30;
          }

          .content-ensure {
            line-height: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            order: 40;
            .ensure-hook-icon {
              color: #1ad370;
              font-size: 11px;
            }
            .ensure-hook-text {
              color: #999999;
              font-size: 12px;
            }
          }
          .content-cost {
            order: 50;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #777777;
            padding: 5px 0px;
            > div {
              width: 33.33%;
              &:nth-child(1) {
                text-align: left;
              }
              &:nth-child(2) {
                text-align: center;
              }
              &:nth-child(3) {
                text-align: right;
              }
            }
          }
        }
        .view-content-one {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          position: relative;
          margin-bottom: -24px;
          top: -24px;
          background: #ffffff;
          box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.03);
          border-radius: 5px;
          .content-ensure {
            margin-top: 14px;
            margin-bottom: 14px;
          }
        }
        .view-content-two {
          .content-price-share {
            order: 35;
          }
          .content-cost {
            justify-content: space-between;
            font-size: 12px;
            color: #777777;
            background: linear-gradient(197deg, rgba(247, 248, 250, 0) 38.08%, #f7f8fa 88.29%);
            border-radius: 35px;
            padding: 5px 20px;
          }
          .content-ensure {
            margin-top: 14px;
            margin-bottom: 14px;
          }
        }
        .view-content-three {
          .content-price-share {
            order: 35;
          }
          .content-cost {
            justify-content: space-between;
            font-size: 12px;
            color: #777777;
            padding: 5px 20px;
          }
          .content-ensure {
            margin-top: 14px;
            margin-bottom: 14px;
          }
        }
      }
    }
  }
</style>
