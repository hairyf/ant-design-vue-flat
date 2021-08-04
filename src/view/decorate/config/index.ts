/*
 * @Author: Mr.Mao
 * @Date: 2021-03-24 15:57:40
 * @LastEditTime: 2021-05-13 16:38:44
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { defineAsyncComponent } from 'vue'
import {
  tabOption,
  blankOption,
  guideOption,
  imageOption,
  commodityGroupOption,
  searchInputOption,
  imageNavigationOption,
  fixedSearchInputOption,
  noticeOption,
  fixedButtonOption,
  commodityRankingOption,
  carouselCommodityOption,
  commodityExhibitionOption,
  boutiqueRecommendOption,
  imageCarouselOption,
  carouselSearchOption,
  imageExhibitionOption,
  titleColumnOption,
  buttonGroupOption,
  userInfoOption,
  storeLocationOption,
  followOfficialOption,
  completeOrderRemindOption,
  commodityInfoOption,
  commodityEvaluateOption,
  orderIconGroupOption,
  commonlyUsedGroupOption,
  popupAdvertisementOption,
  listNavigationOption,
  richTextOption,
  audioPlayOption,
  videoPlayOption,
  couponOption,
  integralSignOption,
  operateNoteOption,
  shoppingGuideOption,
  tileRegionOption,
  copyCodeOption
} from './options'

interface ComponentMenus {
  title: string
  target?: string
  items: Array<ComponentMenuItem>
  // 是否开启使用该列
  offShow?: boolean
}
export * from './options'
// 当前组件索引
export const ViewComponents: Record<string, any> = {
  // 页面信息
  PageInfo: {
    view: defineAsyncComponent(() => import('../view/PageInfo.vue')),
    edit: defineAsyncComponent(() => import('../edit/PageInfo.vue'))
  },
  // 商品组
  CommodityGroup: {
    view: defineAsyncComponent(() => import('../view/CommodityGroup.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityGroup.vue'))
  },
  // 选项卡
  CommodityTab: {
    view: defineAsyncComponent(() => import('../view/CommodityTab.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityTab.vue'))
  },
  // 辅助线
  Guide: {
    view: defineAsyncComponent(() => import('../view/Guide.vue')),
    edit: defineAsyncComponent(() => import('../edit/Guide.vue'))
  },
  // 辅助空白
  Blank: {
    view: defineAsyncComponent(() => import('../view/Blank.vue')),
    edit: defineAsyncComponent(() => import('../edit/Blank.vue'))
  },
  // 辅助空白
  Image: {
    view: defineAsyncComponent(() => import('../view/Image.vue')),
    edit: defineAsyncComponent(() => import('../edit/Image.vue'))
  },
  // 搜索框
  SearchInput: {
    view: defineAsyncComponent(() => import('../view/SearchInput.vue')),
    edit: defineAsyncComponent(() => import('../edit/SearchInput.vue'))
  },
  // 图片导航
  ImageNavigation: {
    view: defineAsyncComponent(() => import('../view/ImageNavigation.vue')),
    edit: defineAsyncComponent(() => import('../edit/ImageNavigation.vue'))
  },
  // 固定搜索框
  FixedSearchInput: {
    view: defineAsyncComponent(() => import('../view/FixedSearchInput.vue')),
    edit: defineAsyncComponent(() => import('../edit/FixedSearchInput.vue'))
  },
  // 浮动按钮
  FixedButton: {
    view: defineAsyncComponent(() => import('../view/FixedButton.vue')),
    edit: defineAsyncComponent(() => import('../edit/FixedButton.vue'))
  },
  // 公告
  Notice: {
    view: defineAsyncComponent(() => import('../view/Notice.vue')),
    edit: defineAsyncComponent(() => import('../edit/Notice.vue'))
  },
  // 商品排行
  CommodityRanking: {
    view: defineAsyncComponent(() => import('../view/CommodityRanking.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityRanking.vue'))
  },
  // 轮播商品
  CarouselCommodity: {
    view: defineAsyncComponent(() => import('../view/CarouselCommodity.vue')),
    edit: defineAsyncComponent(() => import('../edit/CarouselCommodity.vue'))
  },
  // 商品展播
  CommodityExhibition: {
    view: defineAsyncComponent(() => import('../view/CommodityExhibition.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityExhibition.vue'))
  },
  // 精品推荐
  BoutiqueRecommend: {
    view: defineAsyncComponent(() => import('../view/BoutiqueRecommend.vue')),
    edit: defineAsyncComponent(() => import('../edit/BoutiqueRecommend.vue'))
  },
  // 图片轮播
  ImageCarousel: {
    view: defineAsyncComponent(() => import('../view/ImageCarousel.vue')),
    edit: defineAsyncComponent(() => import('../edit/ImageCarousel.vue'))
  },
  // 轮播搜索
  CarouselSearch: {
    view: defineAsyncComponent(() => import('../view/CarouselSearch.vue')),
    edit: defineAsyncComponent(() => import('../edit/CarouselSearch.vue'))
  },
  // 图片展播
  ImageExhibition: {
    view: defineAsyncComponent(() => import('../view/ImageExhibition.vue')),
    edit: defineAsyncComponent(() => import('../edit/ImageExhibition.vue'))
  },
  // 标题栏
  TitleColumn: {
    view: defineAsyncComponent(() => import('../view/TitleColumn.vue')),
    edit: defineAsyncComponent(() => import('../edit/TitleColumn.vue'))
  },
  // 按钮组
  ButtonGroup: {
    view: defineAsyncComponent(() => import('../view/ButtonGroup.vue')),
    edit: defineAsyncComponent(() => import('../edit/ButtonGroup.vue'))
  },
  // 会员信息
  UserInfo: {
    view: defineAsyncComponent(() => import('../view/UserInfo.vue')),
    edit: defineAsyncComponent(() => import('../edit/UserInfo.vue'))
  },
  // 门店定位
  /* StoreLocation: {
    view: defineAsyncComponent(() => import('../view/StoreLocation.vue')),
    edit: defineAsyncComponent(() => import('../edit/StoreLocation.vue'))
  }, */
  // 关注公众号
  FollowOfficial: {
    view: defineAsyncComponent(() => import('../view/FollowOfficial.vue')),
    edit: defineAsyncComponent(() => import('../edit/FollowOfficial.vue'))
  },
  // 下单提醒
  CompleteOrderRemind: {
    view: defineAsyncComponent(() => import('../view/CompleteOrderRemind.vue')),
    edit: defineAsyncComponent(() => import('../edit/CompleteOrderRemind.vue'))
  },
  // 商品信息
  CommodityInfo: {
    view: defineAsyncComponent(() => import('../view/CommodityInfo.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityInfo.vue'))
  },
  // 商品评价
  CommodityEvaluaten: {
    view: defineAsyncComponent(() => import('../view/CommodityEvaluaten.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommodityEvaluaten.vue'))
  },
  // 订单图标组
  OrderIconGroup: {
    view: defineAsyncComponent(() => import('../view/OrderIconGroup.vue')),
    edit: defineAsyncComponent(() => import('../edit/OrderIconGroup.vue'))
  },
  // 常用图标组
  CommonlyUsedGroup: {
    view: defineAsyncComponent(() => import('../view/CommonlyUsedGroup.vue')),
    edit: defineAsyncComponent(() => import('../edit/CommonlyUsedGroup.vue'))
  },
  // 弹窗广告
  PopupAdvertisement: {
    edit: defineAsyncComponent(() => import('../edit/PopupAdvertisement.vue'))
  },
  ListNavigation: {
    view: defineAsyncComponent(() => import('../view/ListNavigation.vue')),
    edit: defineAsyncComponent(() => import('../edit/ListNavigation.vue'))
  },
  RichText: {
    view: defineAsyncComponent(() => import('../view/RichText.vue')),
    edit: defineAsyncComponent(() => import('../edit/RichText.vue'))
  },
  AudioPlay: {
    view: defineAsyncComponent(() => import('../view/AudioPlay.vue')),
    edit: defineAsyncComponent(() => import('../edit/AudioPlay.vue'))
  },
  VideoPlay: {
    view: defineAsyncComponent(() => import('../view/VideoPlay.vue')),
    edit: defineAsyncComponent(() => import('../edit/VideoPlay.vue'))
  },
  Coupon: {
    view: defineAsyncComponent(() => import('../view/Coupon.vue')),
    edit: defineAsyncComponent(() => import('../edit/Coupon.vue'))
  },
  IntegralSign: {
    view: defineAsyncComponent(() => import('../view/IntegralSign.vue')),
    edit: defineAsyncComponent(() => import('../edit/IntegralSign.vue'))
  },
  OperateNote: {
    view: defineAsyncComponent(() => import('../view/OperateNote.vue')),
    edit: defineAsyncComponent(() => import('../edit/OperateNote.vue'))
  },
  /* StoreLocation: {
    view: defineAsyncComponent(() => import('../view/StoreLocation.vue')),
    edit: defineAsyncComponent(() => import('../edit/StoreLocation.vue'))
  }, */
  ShoppingGuide: {
    view: defineAsyncComponent(() => import('../view/ShoppingGuide.vue')),
    edit: defineAsyncComponent(() => import('../edit/ShoppingGuide.vue'))
  },
  TileRegion: {
    view: defineAsyncComponent(() => import('../view/TileRegion.vue')),
    edit: defineAsyncComponent(() => import('../edit/TileRegion.vue'))
  },
  CopyCode: {
    view: defineAsyncComponent(() => import('../view/CopyCode.vue')),
    edit: defineAsyncComponent(() => import('../edit/CopyCode.vue'))
  }
}

// 组件菜单
export const menuConfig: ComponentMenus[] = [
  {
    title: '基础组件',
    target: 'personal',
    items: [
      // 会员信息
      {
        text: '会员信息',
        icon: 'ad-user-info',
        type: 'UserInfo',
        option: userInfoOption,
        stick: true,
        only: true,
        preventCopy: true
      },
      {
        text: '订单图标组',
        icon: 'ad-order-icon-group',
        type: 'OrderIconGroup',
        option: orderIconGroupOption,
        only: true
      },
      {
        text: '常用图标组',
        icon: 'ad-commonly-used-group',
        type: 'CommonlyUsedGroup',
        option: commonlyUsedGroupOption,
        only: true
      }
    ]
  },
  {
    title: '基础组件',
    // 商品详情页
    target: 'shopDetails',
    items: [
      // 商品信息
      {
        text: '商品信息',
        icon: 'ad-commodity-info',
        type: 'CommodityInfo',
        option: commodityInfoOption,
        only: true,
        preventCopy: true
      },
      {
        text: '商品评价',
        icon: 'ad-commodity-evaluaten',
        type: 'CommodityEvaluaten',
        option: commodityEvaluateOption,
        only: true,
        preventCopy: true
      }
    ]
  },
  {
    title: '开发区(线上产品不会显示)',
    offShow: import.meta.env.MODE !== 'development',
    items: [
      {
        text: '开发复制区',
        icon: 'ad-boutique-recommend',
        type: 'CopyCode',
        option: copyCodeOption
      },
      {
        text: '优惠卷',
        icon: 'ad-coupon',
        type: 'Coupon',
        option: couponOption
      },
      {
        text: '积分签到',
        icon: 'ad-integral-sign',
        type: 'IntegralSign',
        option: integralSignOption
      },
      {
        text: '运营笔记',
        icon: 'ad-operate-note',
        type: 'OperateNote',
        option: operateNoteOption
      }
    ]
  },
  {
    title: '商品类',
    items: [
      // 商品组
      {
        text: '商品组',
        icon: 'ad-commodity-group',
        type: 'CommodityGroup',
        option: commodityGroupOption
      },
      {
        text: '选项卡',
        icon: 'ad-commodity-tab',
        type: 'CommodityTab',
        option: tabOption
      },
      {
        text: '精品推荐',
        icon: 'ad-boutique-recommend',
        type: 'BoutiqueRecommend',
        option: boutiqueRecommendOption
      },
      {
        text: '商品排行',
        icon: 'ad-commodity-ranking',
        type: 'CommodityRanking',
        option: commodityRankingOption
      },
      {
        text: '轮播商品',
        icon: 'ad-carousel-commodity',
        type: 'CarouselCommodity',
        option: carouselCommodityOption
      },
      {
        text: '商品展播',
        icon: 'ad-commodity-exhibition',
        type: 'CommodityExhibition',
        option: commodityExhibitionOption
      }
    ]
  },
  {
    title: '图文类',
    items: [
      { type: 'Notice', text: '公告', icon: 'ad-notice', option: noticeOption },
      {
        text: '搜索框',
        icon: 'ad-search-input',
        type: 'SearchInput',
        option: searchInputOption,
        only: true,
        preventCopy: true
      },
      {
        text: '固定搜索框',
        icon: 'ad-fixedsearch-input',
        type: 'FixedSearchInput',
        option: fixedSearchInputOption,
        preventCopy: true,
        preventMove: true,
        only: true,
        stick: true
      },
      {
        text: '图片轮播',
        icon: 'ad-image-carousel',
        type: 'ImageCarousel',
        option: imageCarouselOption
      },
      {
        text: '轮播搜索',
        icon: 'ad-carousel-search',
        type: 'CarouselSearch',
        option: carouselSearchOption
      },
      {
        text: '图片',
        icon: 'ad-image',
        type: 'Image',
        option: imageOption
      },
      // { id: 0, text: '热区', icon: 'ad-product-ranking' },
      {
        type: 'ImageExhibition',
        text: '图片展播',
        icon: 'ad-image-exhibition',
        option: imageExhibitionOption
      },
      // { id: 0, text: '图片展播2', icon: 'ad-product-ranking' },
      {
        type: 'ImageNavigation',
        text: '图片导航',
        icon: 'ad-image-navigation',
        option: imageNavigationOption
      },
      // { id: 0, text: '魔方', icon: 'ad-product-ranking' },
      {
        text: '列表导航',
        icon: 'ad-list-navigation',
        type: 'ListNavigation',
        option: listNavigationOption
      },
      {
        type: 'Guide',
        text: '辅助线',
        icon: 'ad-guide',
        option: guideOption
      },
      {
        text: '标题栏',
        icon: 'ad-title-column',
        type: 'TitleColumn',
        option: titleColumnOption
      },
      {
        text: '富文本',
        icon: 'ad-rich-text',
        type: 'RichText',
        option: richTextOption
      },
      { type: 'Blank', text: '辅助空白', icon: 'ad-blank', option: blankOption },
      {
        text: '音频播放',
        icon: 'ad-audio-play',
        type: 'AudioPlay',
        option: audioPlayOption
      },
      {
        type: 'ButtonGroup',
        text: '按钮组',
        icon: 'ad-button-group',
        option: buttonGroupOption
      },
      // { id: 0, text: '按钮组2', icon: 'ad-product-ranking' },
      // { id: 0, text: '表单', icon: 'ad-product-ranking' },
      {
        text: '视频播放',
        icon: 'ad-video-play',
        type: 'VideoPlay',
        option: videoPlayOption
      },
      {
        type: 'FixedButton',
        text: '浮动按钮',
        icon: 'ad-fixed-button',
        option: fixedButtonOption,
        preventCopy: true,
        preventMove: true,
        only: true
        // fixed: true
      },
      {
        text: '导购',
        icon: 'ad-shopping-guide',
        type: 'ShoppingGuide',
        option: shoppingGuideOption
      },
      {
        text: '瓷片区',
        icon: 'ad-tile-region',
        type: 'TileRegion',
        option: tileRegionOption
      }
    ]
  },
  {
    title: '营销类',
    offShow: true,
    items: [
      {
        text: '优惠卷',
        icon: 'ad-coupon',
        type: 'Coupon',
        option: couponOption
      },
      {
        text: '积分签到',
        icon: 'ad-integral-sign',
        type: 'IntegralSign',
        option: integralSignOption
      },
      {
        text: '运营笔记',
        icon: 'ad-operate-note',
        type: 'OperateNote',
        option: operateNoteOption
      }
    ]
  },
  {
    title: '其他组件',
    items: [
      {
        text: '弹窗广告',
        icon: 'ad-popup-advertisement',
        type: 'PopupAdvertisement',
        modal: true
      },
      /* {
        type: 'StoreLocation',
        text: '门店定位',
        icon: 'ad-commodity-exhibition',
        option: storeLocationOption
      }, */
      // { id: 0, text: '门店信息', icon: 'ad-product-ranking' },
      // { id: 0, text: '商户列表', icon: 'ad-product-ranking' },
      // {
      //   text: '关注公众号',
      //   icon: 'ad-follow-official',
      //   option: followOfficialOption,
      //   type: 'FollowOfficial',
      //   only: true
      // },
      {
        text: '下单提醒',
        icon: 'ad-complete-order-remind',
        option: completeOrderRemindOption,
        type: 'CompleteOrderRemind',
        only: true,
        preventCopy: true,
        preventMove: true
        // fixed: true
      }
    ]
  }
]
