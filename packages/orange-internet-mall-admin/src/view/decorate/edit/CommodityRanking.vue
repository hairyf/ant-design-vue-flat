<!--
 * @Author: Zhilong
 * @Date: 2021-04-02 18:10:12
 * @LastEditTime: 2021-04-23 12:05:21
 * @Description: 商品排行操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="商品排行" icon="ad-commodity-ranking" />
  <el-card shadow="never" class="edit-card-container">
    <div class="edit-card-text oe-m-b-28">
      <span style="font-size: 12px">
        展示店铺前三个热销商品，可展示整店热销商品，也可以是某个类目的热销商品
      </span>
    </div>
    <div class="container-title">
      <span style="font-size: 16px">全局组件</span>
    </div>
    <el-form class="container-body" label-width="80px" label-position="right">
      <el-form-item label="商品样式">
        <el-radio-group v-model="option.componentStyle.componentModal">
          <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="风格类型">
        <el-radio-group v-model="option.componentStyle.styleType" size="small">
          <el-radio-button label="bothSides">
            <i class="ad-style-sides" />
          </el-radio-button>
          <el-radio-button label="fourSides">
            <i class="ad-style-distribution" />
          </el-radio-button>
          <el-radio-button label="left">
            <i class="ad-style-left" />
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-card>
  <edit-card-form title="标题">
    <el-form-item label="标题样式">
      <el-radio-group v-model="option.title.showType">
        <el-radio v-for="v in ['显示', '隐藏']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <!-- > 显示 -->
    <template v-if="option.title.showType === '显示'">
      <el-form-item label="图片" style="align-items: flex-start">
        <image-item v-model="option.title.image" />
        <div><span style="color: #8c8c8c; font-size: 12px">建议图片尺寸为宽32X高32px</span></div>
      </el-form-item>
      <el-form-item label="文字">
        <el-input
          style="width: 200px"
          v-model="option.title.value"
          placeholder="猜你喜欢"
          show-word-limit
          maxlength="10"
        />
      </el-form-item>
      <color-group v-model="option.title.color" reset>
        <color-input keyword="text" label="颜色" />
        <color-input keyword="line" label="线条" />
      </color-group>
    </template>
  </edit-card-form>
  <edit-card-form title="显示设置">
    <el-form-item label="商品分类">
      <el-select size="small" v-model="option.showSetting.commodityClass">
        <el-option label="全部商品" value="all" />
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, i) in goodsClassList"
          :key="i"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input
        placeholder="请输入关键字"
        v-model="option.showSetting.keyword"
        maxlength="8"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="过滤价格">
      <el-input
        placeholder="请输入价格"
        v-model="option.showSetting.priceRange[0]"
        class="price-input"
      >
        <template #suffix>
          <span class="oe-m-r-8">元</span>
        </template>
      </el-input>
      <span style="margin: 0 14px">-</span>
      <el-input
        placeholder="请输入价格"
        v-model="option.showSetting.priceRange[1]"
        class="price-input"
      >
        <template #suffix>
          <span class="oe-m-r-8">元</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="显示条数">
      <slider-input
        label="显示条数"
        v-model="option.showSetting.count"
        :min="1"
        :max="20"
        tips="条"
      />
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <!-- 背景图片 -->
    <el-form-item label="选择图片" v-show="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
    <!-- 背景颜色 -->
    <color-group v-model="option.colorStyle.color">
      <color-input
        v-show="option.colorStyle.backgroundType === '颜色'"
        keyword="background"
        label="背景颜色"
        reset
      />
    </color-group>
  </edit-card-form>
  <edit-card-form title="显示样式" tips="（ 划线价和会员价同时选择时，优先显示会员价）">
    <styled-group v-model="option.displayStyle">
      <styled-input tips="商品标题" keyword="commodityTitle" />
      <styled-input tips="商品价格" keyword="commodityPrice" />
      <template v-if="option.componentStyle.styleType === 'bothSides'">
        <styled-input tips="划线价" keyword="markingPrice" />
        <styled-input tips="商品销量" keyword="salesVolume" />
        <styled-input tips="会员价" keyword="membershipPrice" />
      </template>
    </styled-group>
  </edit-card-form>
  <edit-card-form title="购买按钮样式" v-if="option.componentStyle.styleType === 'bothSides'">
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
  <edit-card-form title="购买按钮样式" v-if="option.componentStyle.styleType !== 'bothSides'">
    <el-form-item label="点击进入">
      <el-radio-group v-model="option.buyButtonStyle.clickEnter">
        <el-radio :label="v" v-for="v in ['商品详情页', '商品加购']" :key="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="shopSpacing" label="商品间距" tips="px" />
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  // 类型
  type GoodsClassList = {
    children: any[]
    createtime: number
    extension: string
    id: number
    name: string
    num: number
    shop_id: number
    status: number
    superior_id: number
    thumb: string
    updatetime: number
    weight: number
  }
  import { defineProps, ref, watch } from '@vue/runtime-core'
  import { commodityRankingOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  import { reqGoodsClassList, reqGoodsList } from '@/api/commodity'
  const props = defineProps({
    option: {
      type: Object as () => typeof commodityRankingOption,
      required: true
    }
  })
  // 能选择条数
  if (props.option.addProduct.chooseProduct !== '选择分类')
    props.option.addProduct.chooseProduct = '选择分类'
  // 同步改变条数
  watch(
    () => props.option.showSetting.count,
    () => (props.option.addProduct.productsNum = props.option.showSetting.count)
  )
  // 商品分类列表
  const goodsClassList = ref([] as GoodsClassList[])

  // 获取商品分类列表
  const getGoodsClassList = async () => {
    const { data } = await reqGoodsClassList()
    goodsClassList.value = data.data.data
  }
  getGoodsClassList()
</script>
<style lang="scss" scoped>
  .price-input {
    width: 150px;
  }
  .container-title {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .container-tips {
    font-size: 8pt;
    color: #999;
    margin-left: 8px;
    font-weight: 400;
  }
  /* 修复标签与内容区不对齐 */
  :deep(.el-form-item) {
    display: flex;
    align-items: center;
    .el-form-item__label {
      line-height: auto !important;
    }
    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;
    }
  }
  .edit-card-container {
    border-top: 10px solid #f2f4f7;
  }
  .edit-card-text {
    line-height: 24px;
    color: #262626;
    background: rgba(255, 157, 40, 0.2);
    border: 1px solid #ff9d28;
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
  }
</style>
