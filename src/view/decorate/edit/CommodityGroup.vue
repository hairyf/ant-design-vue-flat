<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-14 10:22:10
 * @Description: 商品组编辑项
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="commodity-group">
    <edit-header :icon="'ad-commodity-group'" title="商品组" v-if="showHeader" />
    <edit-card-form title="组件风格">
      <el-form-item label="组件样式">
        <el-radio-group v-model="option.componentStyle.componentModal">
          <el-radio :label="v" v-for="v in ['默认', '投影', '描边']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="风格类型">
        <el-radio-group v-model="option.componentStyle.styleType" size="small">
          <el-radio-button label="center">
            <i class="ad-style-middle" />
          </el-radio-button>
          <el-radio-button label="upDown">
            <i class="ad-style-down" />
          </el-radio-button>
          <el-radio-button label="bothSides">
            <i class="ad-style-sides" />
          </el-radio-button>
          <el-radio-button label="fourSides">
            <i class="ad-style-distribution" />
          </el-radio-button>
          <el-radio-button label="trilateral">
            <i class="ad-style-three" />
          </el-radio-button>
          <el-radio-button label="middle">
            <i class="ad-style-abrupt" />
          </el-radio-button>
          <el-radio-button label="left">
            <i class="ad-style-left" />
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </edit-card-form>
    <edit-card-form title="选择商品">
      <el-form-item label="商品类型">
        <el-radio-group v-model="option.addProduct.chooseProduct">
          <el-radio
            v-for="v in ['手动选择', '选择分类', '选择分组', '营销属性']"
            :key="v"
            :label="v"
          />
        </el-radio-group>
      </el-form-item>
      <good-list
        v-if="option.addProduct.chooseProduct === '手动选择'"
        v-model="option.addProduct.manualSelection"
      />
      <el-form-item label="分类" v-if="option.addProduct.chooseProduct === '选择分类'">
        <link-item v-model="option.addProduct.selectCategories" type="classification" reset />
      </el-form-item>
      <el-form-item label="分组" v-if="option.addProduct.chooseProduct === '选择分组'">
        <link-item v-model="option.addProduct.selectGroup" type="grouping" reset />
      </el-form-item>
      <el-form-item label="营销属性" v-if="option.addProduct.chooseProduct === '营销属性'">
        <el-radio-group v-model="option.addProduct.marketingAttributes">
          <el-radio v-for="v in ['新品商品', '热卖商品', '推荐商品']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <template v-if="option.addProduct.chooseProduct !== '手动选择'">
        <el-form-item label="商品条数">
          <slider-input v-model="option.addProduct.productsNum" :min="1" :max="20" tips="个" />
        </el-form-item>
        <div class="el-form-item"> 最多可显示 20 件商品 </div>
        <el-form-item label="商品排序">
          <el-radio-group v-model="option.addProduct.commodityRanking">
            <el-radio
              v-for="v in [/*'千人千面',*/ '按销量', '价格降序', '价格升序']"
              :key="v"
              :label="v"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " v-if="option.addProduct.commodityRanking === '千人千面'">
          <span style="font-size: 12px">
            <span style="color: red">*</span>
            根据会员特征千人千面展现，可大幅提升点击和成交转化率。
          </span>
        </el-form-item>
      </template>
    </edit-card-form>
    <edit-card-form title="组件样式">
      <el-form-item label="组件背景">
        <el-radio-group v-model="option.colorStyle.backgroundType">
          <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="底部背景" v-if="option.colorStyle.backgroundType == '颜色'">
        <color-input v-model="option.colorStyle.color.background" reset />
      </el-form-item>
      <el-form-item label="背景图片" v-if="option.colorStyle.backgroundType == '背景图片'">
        <image-item v-model="option.colorStyle.image" tips="建议图片尺寸为76X76px" />
      </el-form-item>
      <el-form-item label="商品背景">
        <color-input v-model="option.colorStyle.color.good" reset reset-color="#fff" />
      </el-form-item>
    </edit-card-form>
    <edit-card-form title="显示样式" tips="（ 划线价和会员价同时选择时，优先显示会员价）">
      <styled-group v-model="option.displayStyle">
        <styled-input tips="商品标题" keyword="commodityTitle" />
        <template
          v-if="
            option.componentStyle.styleType == 'center' ||
            option.componentStyle.styleType == 'upDown'
          "
        >
          <styled-input tips="副标题" keyword="subtitle" />
        </template>
        <styled-input tips="商品价格" keyword="commodityPrice" />
        <template
          v-if="
            option.componentStyle.styleType == 'center' ||
            option.componentStyle.styleType == 'upDown' ||
            option.componentStyle.styleType == 'bothSides'
          "
        >
          <styled-input tips="划线价" keyword="markingPrice" />
          <styled-input tips="商品销量" keyword="salesVolume" />
          <styled-input tips="会员价" keyword="membershipPrice" />
        </template>
      </styled-group>
    </edit-card-form>
    <edit-card-form
      title="购买按钮样式"
      v-if="
        option.componentStyle.styleType === 'center' ||
        option.componentStyle.styleType === 'upDown' ||
        option.componentStyle.styleType === 'bothSides'
      "
    >
      <el-form-item label="购买按钮">
        <el-radio-group v-model="option.buyButtonStyle.purchaseBtn">
          <el-radio :label="v" v-for="v in ['显示', '隐藏']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <template v-if="option.buyButtonStyle.purchaseBtn === '显示'">
        <el-form-item label="按钮样式">
          <el-radio-group v-model="option.buyButtonStyle.btnStyle.image" size="small">
            <el-radio-button label="oe-btn-shopping">
              <i class="oe-btn-shopping" />
            </el-radio-button>
            <el-radio-button label="oe-btn-circular-cars">
              <i class="oe-btn-circular-cars" />
            </el-radio-button>
            <el-radio-button label="oe-btn-plus">
              <i class="oe-btn-plus" />
            </el-radio-button>
            <el-radio-button label="oe-btn-hollow">
              <i class="oe-btn-hollow" />
            </el-radio-button>
            <el-radio-button label="withBackground">
              <el-tag size="mini" effect="dark">购买</el-tag>
            </el-radio-button>
            <el-radio-button label="hollowedText">
              <el-tag size="mini">购买</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label=" "
          v-if="
            option.buyButtonStyle.btnStyle.image != 'withBackground' &&
            option.buyButtonStyle.btnStyle.image != 'hollowedText'
          "
        >
          <color-input v-model="option.buyButtonStyle.btnStyle.color" reset reset-color="#ff3d00" />
        </el-form-item>
        <template v-else>
          <el-form-item label="背景">
            <el-radio-group v-model="option.buyButtonStyle.custom">
              <el-radio :label="v" v-for="v in ['同主题风格', '自定义']" :key="v" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :label="
              option.buyButtonStyle.btnStyle.image == 'withBackground' ? '背景颜色' : '边框颜色'
            "
            v-if="option.buyButtonStyle.custom == '自定义'"
          >
            <color-input v-model="option.buyButtonStyle.wordsColor" reset reset-color="ff3d00" />
          </el-form-item>
          <el-form-item label="文字">
            <el-input
              style="width: 202px"
              type="text"
              placeholder="请输入内容"
              v-model="option.buyButtonStyle.btnWords"
              maxlength="4"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="圆角">
            <slider-input v-model="option.buyButtonStyle.fillet" />
          </el-form-item>
        </template>
        <el-form-item label="尺寸">
          <el-radio-group v-model="option.buyButtonStyle.size">
            <el-radio :label="v" v-for="v in ['大', '中', '小']" :key="v" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="点击进入">
          <el-radio-group v-model="option.buyButtonStyle.clickEnter">
            <el-radio :label="v" v-for="v in ['商品详情页', '商品加购']" :key="v" />
          </el-radio-group>
        </el-form-item>
      </template>
    </edit-card-form>
    <edit-card-form title="角标设置">
      <el-form-item label="商品角标">
        <el-radio-group v-model="option.cornerMarkersetting.commodityCorner">
          <el-radio :label="v" v-for="v in ['系统图标', '自定义', '不显示']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <template v-if="option.cornerMarkersetting.commodityCorner == '系统图标'">
        <el-form-item label="角标样式">
          <el-radio-group v-model="option.cornerMarkersetting.cornerStyle.image" size="small">
            <el-radio-button
              :label="v"
              v-for="v in [
                'oe-corner-fillet',
                'oe-corner-right-circle',
                'oe-corner-lower-angle',
                'oe-corner-right-angle',
                'oe-corner-parallel'
              ]"
              :key="v"
            >
              <i style="font-size: 14px" :class="v" />
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <color-input
            v-model="option.cornerMarkersetting.cornerStyle.color"
            reset
            reset-color="ff3d00"
          />
        </el-form-item>
        <el-form-item label="角标文字">
          <el-radio-group v-model="option.cornerMarkersetting.cornerText">
            <el-radio :label="v" v-for="v in ['推荐', '热销', '上新', '包邮', '自定义']" :key="v" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-input
            style="width: 202px"
            type="text"
            placeholder="请输入内容"
            v-model="option.cornerMarkersetting.words"
            maxlength="2"
            show-word-limit
          />
        </el-form-item>
      </template>
      <el-form-item label="背景图片" v-if="option.cornerMarkersetting.commodityCorner == '自定义'">
        <image-item
          v-model="option.cornerMarkersetting.cornerStylPicture"
          tips="建议图片尺寸为76X76px"
        />
      </el-form-item>
    </edit-card-form>
    <edit-card-form title="边距设置">
      <slider-group v-model="option.padding">
        <slider-input keyword="shopSpacing" label="商品间距" />
        <slider-input keyword="top" label="上边距" :max="50" />
        <slider-input keyword="bottom" label="下边距" />
        <slider-input keyword="leftRight" label="左右边距" />
        <slider-input keyword="topRadius" label="上圆角" />
        <slider-input keyword="bottomRadius" label="下圆角" />
      </slider-group>
    </edit-card-form>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, watch } from 'vue'

  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  import GoodList from '@/view/decorate/components/common/GoodList.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'

  import { commodityGroupOption } from '@/view/decorate/config'
  const props = defineProps({
    option: {
      type: Object as () => typeof commodityGroupOption,
      required: true
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  })
  watch(props.option.buyButtonStyle, () => {
    if (props.option.buyButtonStyle.custom === '同主题风格') {
      props.option.buyButtonStyle.wordsColor = '#ff3d00'
    }
  })
</script>
<style lang="scss" scoped>
  .commodity-group {
    .group-title {
      .group-img {
        color: var(--color-primary);
        font-size: 34px;
        margin-right: 16px;
      }
    }
    :deep(.el-form-item__label) {
      color: #000;
    }
    .reset-text {
      margin-left: 28px;
    }
    .display-text {
      :deep(.el-input) {
        margin-left: 14px;
        width: 134px;
      }
    }
    .title-tips {
      color: #8c8c8c;
      font-size: 12px;
    }
    :deep(.el-radio) {
      margin-right: 14px;
    }
    .btn-img {
      width: 30px;
      height: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
