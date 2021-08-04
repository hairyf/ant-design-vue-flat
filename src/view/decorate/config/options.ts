/*
 * @Author: Mr.wang
 * @Date: 21-03-29 11:02:14
 * @LastEditTime: 2021-05-14 10:22:41
 * @Description: 组件配置
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { assign, clone, cloneDeep, defaultsDeep } from 'lodash'
import { commonLinks, otherLinks, userLinks } from './linkIndexes'
export interface IColor {
  background?: string //       通用背景
  subBackground?: string //    二级背景
  selectBackground?: string // 选中背景
  icon?: string //             图标
  subIcon?: string //          二级图标
  title?: string //            通用标题
  subTitle?: string //         二级标题
  selectTitle?: string //      选择标题
  selectSubTitle?: string //   选择二级标题
  text?: string //             通用文本
  subText?: string //          二级文本
  secondText?: string //       三级文本
  selectText?: string //       选择文本
  btn?: string //              按钮
  border?: string //           边框
  bottomBorder?: string //     底边
  good?: string //             商品
  line?: string //             线
  dividingLine?: string //     分割线
  label?: string //            标签
}
export interface ComponentMenuItem {
  // 组件唯一标识
  id?: string
  text: string
  icon: string
  type: string
  // 是否可移动
  preventMove?: boolean
  // 是否拷贝
  preventCopy?: boolean
  // 是否可隐藏
  preventHide?: boolean
  // 是否可删除
  preventDelete?: boolean
  // 是否唯一
  only?: boolean
  // 是否隐藏
  hide?: boolean
  // 拖拽标识(用于左侧拖动到视图区)
  drag?: boolean
  // 是否置顶
  stick?: boolean
  // 是否固定
  fixed?: boolean
  // 组件配置
  option?: Record<string, any>
}
export interface LinkOption {
  type:
    | ''
    // 店铺
    | 'shop'
    // 商品
    | 'commodity'
    // 营销
    | 'marketing'
    // 分类
    | 'classification'
    // 小程序
    | 'applets'
    // 分组
    | 'grouping'
    // 服务
    | 'serve'
    // 反馈
    | 'feedback'
  label: '' | '店铺页面' | '商品' | '优惠券' | '商品分类' | '小程序跳转' | '商品分组'
  name: string
  value: {
    path: string
    params: Record<string, any>
    data: Record<string, any>
    login?: boolean
  }
}
const baseUrl = 'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/'
/**
 * 获取对应的订单链接
 * @param id 查询id
 * @returns 订单链接对象
 */
const defaultOrderLink = (id: Key, path = '/pages/shopOrders/myOrders'): typeof linkOption => ({
  type: 'shop',
  label: '店铺页面',
  name: '订单列表',
  value: {
    path,
    params: { id },
    data: {}
  }
})
// 单链接配置 21/03/28
export const linkOption: LinkOption = {
  // 类型('店铺页面' | '商品' | '优惠券' | '商品分类' | '小程序跳转' | '商品分组')
  type: '',
  label: '',
  name: '',
  value: {
    path: '',
    params: {} as Record<string, any>,
    data: {} as Record<string, any>
  }
}
// 页面信息配置 21/03/25
export const pageInfoOption = {
  text: '',
  icon: '',
  type: 'PageInfo',
  // 阻止移动
  preventMove: true,
  // 阻止拷贝
  preventCopy: true,
  // 阻止隐藏
  preventHide: true,
  // 阻止删除
  preventDelete: true,
  // 页面配置
  option: {
    backgroundType: 'none',
    backgroundColor: '#f2f4f7',
    navigationBarTextStyle: '#000000',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '首页'
  }
}
// 商品组配置 21/03/30
export const commodityGroupOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '投影' as '投影' | '默认' | '描边',
    // 风格类型
    styleType: 'center'
  },
  // 选择商品
  addProduct: {
    chooseProduct: '手动选择' as '手动选择' | '选择分类' | '选择分组' | '营销属性',
    // 商品条数
    productsNum: 1,
    // 商品排序('千人千面', '按销量', '价格降序', '价格升序')
    commodityRanking: '按销量' as '千人千面' | '按销量' | '价格降序' | '价格升序',
    // 手动选择
    manualSelection: [] as typeof linkOption[],
    // 选择分类
    selectCategories: clone(linkOption),
    // 选择分组
    selectGroup: clone(linkOption),
    // 营销属性('新品商品', '热卖商品', '推荐商品')
    marketingAttributes: '推荐商品' as '新品商品' | '热卖商品' | '推荐商品'
  },
  // 颜色样式
  colorStyle: {
    // 组件背景
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 颜色样式的背景图片
    image: '',
    // 背景颜色
    color: {
      background: '#ffffff',
      good: '#ffffff'
    }
  },
  // 显示样式
  displayStyle: {
    // 商品标题
    commodityTitle: {
      state: true,
      color: '#000'
    },
    // 副标题
    subtitle: {
      state: true,
      color: '#acacac'
    },
    // 商品价格
    commodityPrice: {
      state: true,
      color: '#ff3d00'
    },
    // 划线价
    markingPrice: {
      state: false,
      color: '#acacac'
    },
    // 商品销量
    salesVolume: {
      state: false,
      color: '#acacac',
      text: '已售'
    },
    // 会员价
    membershipPrice: {
      state: false
    }
  },
  //  购买按钮样式
  buyButtonStyle: {
    // 购买按钮
    purchaseBtn: '显示' as '显示' | '隐藏',
    // 按钮样式
    btnStyle: {
      // 按钮的icon
      image: 'withBackground',
      // 按钮颜色
      color: '#ff3d00'
    },
    // 尺寸
    size: '小',
    // 点击进入
    clickEnter: '商品详情页',
    // 按钮文字
    btnWords: '购买',
    // 带文字的按钮是否自定义
    custom: '自定义',
    // 按钮颜色
    wordsColor: '#ff3d00',
    // 圆角
    fillet: 4
  },
  // 角标设置
  cornerMarkersetting: {
    // 商品角标
    commodityCorner: '不显示' as '系统图标' | '自定义' | '不显示',
    // 角标样式
    cornerStyle: {
      // 角标的icon
      image: 'ad-corner-fillet',
      // 角标的背景色
      color: '#ff3d00'
    },
    // 角标文字
    cornerText: '推荐',
    // 文字
    words: '',
    // 角边背景图片
    cornerStylPicture: ''
  },
  // 边距设置
  padding: {
    shopSpacing: 5,
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}

// 店铺装修默认子配置 21/04/10
export const defaultViewItemOtion = {
  id: 'default',
  type: 'customPage',
  name: '未命名',
  content: [cloneDeep(pageInfoOption) as ComponentMenuItem],
  preventDelete: false
}
// 弹窗广告 21/04/27
export const popupAdvertisementOption = {
  showSetting: {
    // 是否开启
    status: true,
    // 显示方式
    showType: '首次进入' as '首次进入' | '每次进入',
    // 广告图片
    image: '',
    // 跳转链接
    link: clone(linkOption)
  }
}
// 店铺装修默认配置 21/04/10
export const defaultContentOption = {
  // 视图区
  views: [
    assign(cloneDeep(defaultViewItemOtion), {
      type: 'homePage',
      name: '首页',
      preventDelete: true
    }),
    assign(cloneDeep(defaultViewItemOtion), {
      type: 'personal',
      name: '会员中心',
      preventDelete: true
    }),
    assign(cloneDeep(defaultViewItemOtion), {
      type: 'shopDetails',
      name: '商品详情',
      preventDelete: true
    })
  ],
  // 广告页
  advertisement: {
    id: 'default',
    status: true,
    style: 'board' as 'board' | 'board-nesting',
    showForm: '仅首次' as '仅首次' | '每次' | '时间间隔',
    interval: 120,
    timingClose: 3 as 3 | 4 | 5,
    close: false,
    images: [{ image: '', link: clone(linkOption) }]
  },
  // 颜色风格
  style: '#1D7AF6',
  // 商品推荐
  recommend: {
    ...cloneDeep(commodityGroupOption),
    contentEdit: {
      text: '产品推荐',
      pages: [] as string[]
    }
  },
  // 导航管理
  navigation: {
    naviStyle: '图标+文字' as '图标+文字' | '图标',
    contentEdit: {
      name: '底部导航',
      countTips: true,
      dividingLine: true,
      navis: [
        { pagePath: '', iconPath: '', selectedIconPath: '', link: clone(linkOption), text: '' },
        { pagePath: '', iconPath: '', selectedIconPath: '', link: clone(linkOption), text: '' },
        { pagePath: '', iconPath: '', selectedIconPath: '', link: clone(linkOption), text: '' },
        { pagePath: '', iconPath: '', selectedIconPath: '', link: clone(linkOption), text: '' }
      ]
    },
    colorStyle: {
      color: {
        background: '#ffffff',
        activeColor: '#000000',
        inactiveColor: '#000000',
        dividingLine: '#ffffff'
      }
    }
  },
  // 弹窗广告
  showSetting: popupAdvertisementOption.showSetting
}

// 辅助线配置 21/03/27
export const guideOption = {
  // 组件背景
  backgroundType: '透明' as '透明' | '颜色' | '背景图片',
  // 背景颜色
  color: {
    background: '#ffffff'
  },
  // 图片背景
  image: '',
  // 组件样式
  componentType: 'solid' as 'solid' | 'dotted' | 'dashed',
  // 边距设置
  padding: {
    top: 20,
    bottom: 20,
    leftRight: 20
  }
}
// 辅助空白配置 21/03/27
export const blankOption = {
  background: '#ffffff',
  height: 30
}
// 图片配置 21/03/28
export const imageOption = {
  // 样式风格(单, 双)
  styleType: 'single' as 'single' | 'double',
  // 组件背景
  backgroundType: '透明' as '透明' | '颜色' | '背景图片',
  // 背景颜色
  color: { background: '#ffffff' },
  // 图片背景
  image: '',
  // 边距设置
  padding: {
    image: 0,
    top: 0,
    bottom: 0,
    leftRight: 0,
    topRadius: 0,
    bottomRadius: 0
  },
  // 图片类型, 标准|高级（热区）
  type: '标准' as '标准' | '高级（热区）',
  // 图片列表
  images: [
    {
      image: '',
      link: clone(linkOption),
      hots: [
        {
          top: 0,
          left: 0,
          width: 200,
          height: 200,
          link: clone(linkOption)
        }
      ]
    }
  ]
}
// 选项卡配置 21/03/31
export const tabOption = {
  // 选项卡样式
  tabStyle: {
    color: {
      // 背景颜色
      background: '#FFFFFF',
      // 选中的背景颜色
      selectBackground: '#FFFFFF00',
      // 文字颜色（主标题）
      title: '#333333',
      // 选中的文字颜色(主标题)
      selectTitle: '#66ccff',
      // 选项条颜色
      bottomBorder: '#66ccff',
      // 副标题颜色
      subTitle: '#AAAAAA',
      // 选中的副标题颜色
      selectSubTitle: '#663333'
    },
    // 选项条(底部线条)
    bottomBorder: false,
    // 副标题(二级标题)
    subTitle: false,
    // 边距
    padding: {
      // 间距设置
      shopSpacing: 15,
      top: 12,
      bottom: 12,
      leftRight: 0,
      topRadius: 0,
      bottomRadius: 0
    }
  },
  // 这个数据结构不是标准的数据结构 请勿copy！！
  // 当前选择项 仅用于 切换视图
  CACHE_TARGET_LIST: 'default',
  // 选项卡设置（列表）
  tabList: [
    {
      // 添加删除的索引 仅用于 编辑页面
      CACHE_KEY_LIST: 'default',
      // 标题
      title: '',
      // 内容为 商品组内容
      content: cloneDeep(commodityGroupOption)
    }
  ]
}
// 搜索框配置 21/03/29
export const searchInputOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '默认' as '投影' | '默认' | '描边'
  },
  // 搜索设置
  searchSetting: {
    // 定位显示(不显示,左侧,右侧)
    positionShow: '不显示' as '不显示' | '左侧' | '右侧',
    // 显示地区(省,市,区)
    showAddress: '省' as '省' | '市' | '区',
    // 定位颜色
    addressColor: '#000000',
    // 提示内容
    tipsContent: '请输入关键字进行搜索', //要改的 还没做组件
    // 内容位置(flex-start,center)
    contentPosition: 'flex-start'
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片 = 图片背景
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色 = 背景颜色
      background: '#f7f8fa',
      // 图标颜色
      icon: '#999999',
      // 文字颜色
      text: '#999999',
      // 框背景颜色
      border: '#FFFFFF'
    }
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 20,
    bottomRadius: 20
  }
}
// 图片导航配置 21/03/30
export const imageNavigationOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '默认' as '投影' | '默认' | '描边'
  },
  // 图片内容
  imageList: [
    {
      CACHE_KEY_LIST: 'default',
      image: '',
      title: '我是主标题',
      subTitle: '我是副标题',
      color: {
        title: '#333',
        subTitle: '#555',
        background: '#FFFFFF'
      },
      link: clone(linkOption)
    }
  ],
  // 颜色样式
  colorStyle: {
    // 组件背景(['透明', '颜色', '背景图片'])
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    color: {
      // 组件背景 > 颜色
      background: '#FFFFFF'
    },
    // > 背景图片
    image: ''
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 0,
    bottomRadius: 0
  }
}
// 固定搜索框配置 21/4/1
export const fixedSearchInputOption = {
  // 搜索设置
  searchSetting: {
    color: {
      // 定位颜色
      title: '#000000',
      // 文字颜色
      text: '#333333',
      // 左侧图标
      leftIcon: '#333333',
      // 右侧图标
      rightIcon: '#333333'
    },
    // 定位显示(不显示,显示)
    positionShow: '不显示' as '不显示' | '显示',
    // > 显示 = 提示内容
    tipsContent: '请输入关键字进行搜索', //要改的 还没做组件
    // 内容位置(flex-start,center)
    contentPosition: 'flex-start' as 'flex-start' | 'center',

    // 左侧按钮(不显示,图标,图片)
    leftButtonType: '不显示',
    // > 图标 = 左侧图标
    leftIcon: '',
    // > 图片 = 左侧图片
    leftImage: '',
    // 左侧链接
    leftLink: clone(linkOption),

    // 右侧按钮(不显示,图标,图片)
    rightButtonType: '不显示',
    // > 图标 = 右侧图标
    rightIcon: '',
    // > 图片 = 右侧图片
    rightImage: '',
    // 右侧链接
    rightLink: clone(linkOption)
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#C4C4C4',
      // 图标颜色
      icon: '#999999',
      // 文字颜色
      text: '#999999',
      // 框背景颜色
      border: '#FFFFFF'
    }
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 20,
    bottomRadius: 20
  }
}
// 浮动按钮 21/04/02
export const fixedButtonOption = {
  // 组件风格
  componentStyle: {
    placement: '左上角' as '左上角' | '右上角' | '左下角' | '右下角'
  },
  // 编辑内容
  contentEdit: [{ type: 'link' as 'link' | 'top' | 'serve', image: '', link: clone(linkOption) }],
  // 边距设置
  padding: {
    iconSpacing: 0,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0
  }
}
// 公告配置 21/4/1
export const noticeOption = {
  // 组件风格
  componentStyle: {
    // 公告图标(系统,自定义)
    noticeIconType: '系统' as '系统' | '自定义',
    // > 系统
    systemStyle: 'notice-style-icon1.png',
    // > 自定义
    noticeImage: ''
  },
  // 公告内容
  noticeContent: {
    // 内容(读取商城公告,自定义)
    content: '读取商城公告' as '读取商城公告' | '自定义',
    // > 读取商城公告 = 读取条数
    count: 5,
    // > 自定义
    custom: [
      {
        CACHE_KEY_LIST: 'default',
        // 公告内容
        title: '默认内容',
        // 对应链接
        link: clone(linkOption)
      },
      {
        CACHE_KEY_LIST: 'default',
        // 公告内容
        title: '默认内容',
        // 对应链接
        link: clone(linkOption)
      }
    ]
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#C4C4C4',
      // 公告背景(二级背景)
      subBackground: '#FFFFFF',
      // 文字颜色
      text: '#999999'
    },
    // 滚动速度(秒)
    speed: 1
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 4,
    bottomRadius: 4
  }
}
// 商品排行配置 21/4/2
export const commodityRankingOption = {
  ...commodityGroupOption,
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 风格类型(bothSides,fourSides,left)
    styleType: 'bothSides' as 'bothSides' | 'fourSides' | 'left'
  },
  // 标题
  title: {
    // 标题样式(显示,隐藏)
    showType: '显示' as '显示' | '隐藏',
    // > 显示 = 图片
    image: '',
    // > 显示 = 文字
    value: '商品排行',
    // > 显示 = 颜色
    color: {
      // > 显示 = 颜色
      text: '#333333',
      // > 显示 = 线条
      line: '#66ccff'
    }
    //显示条数
  },
  // 显示设置
  showSetting: {
    // 商品分类
    commodityClass: '',
    // 关键字
    keyword: '',
    // 过滤价格
    priceRange: [] as number[] | string[],
    // 显示数量
    count: 1
  }
}
// 轮播商品配置 21/4/6
export const carouselCommodityOption = {
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边'
  },
  // 添加商品
  addProduct: {
    // 选择商品('手动选择','选择分类','选择分组')
    chooseProduct: '选择分类' as '手动选择' | '选择分类' | '选择分组',
    // 商品条数
    productsNum: 2,
    // 商品排序('千人千面', '按销量', '价格降序', '价格升序')
    commodityRanking: '按销量' as '千人千面' | '按销量' | '价格降序' | '价格升序',
    // 手动选择
    manualSelection: [] as typeof linkOption[],
    // 选择分类
    selectCategories: clone(linkOption),
    // 选择分组
    selectGroup: clone(linkOption),
    // 营销属性('新品商品', '热卖商品', '推荐商品')
    marketingAttributes: '推荐商品' as '新品商品' | '热卖商品' | '推荐商品'
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1',
      // 商品背景(二级背景)
      subBackground: '#FFFFFF',
      // 文字颜色
      text: '#FF3D00'
    },
    // 图片
    backgroundImage: `${baseUrl}carouselCommodityDefaultImage1.png`
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 商品展播 21/4/6
export const commodityExhibitionOption = {
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 背景图
    backgroundImage: `${baseUrl}carouselCommodityDefaultImage2.png`
  },
  // 添加商品
  addProduct: {
    // 选择商品('手动选择','选择分类','选择分组')
    chooseProduct: '选择分类' as '手动选择' | '选择分类' | '选择分组',
    // 商品条数
    productsNum: 2,
    // 商品排序('千人千面', '按销量', '价格降序', '价格升序')
    commodityRanking: '按销量' as '千人千面' | '按销量' | '价格降序' | '价格升序',
    // 手动选择
    manualSelection: [] as typeof linkOption[],
    // 选择分类
    selectCategories: clone(linkOption),
    // 选择分组
    selectGroup: clone(linkOption),
    // 营销属性('新品商品', '热卖商品', '推荐商品')
    marketingAttributes: '推荐商品' as '新品商品' | '热卖商品' | '推荐商品'
  },
  // 整体样式
  contentStyle: {
    // 标题
    title: '120元任选2件',
    // 副标题
    subTitle: '120元任选',
    color: {
      title: '#333333',
      subTitle: '#999999',
      btn: '#ffffff',
      text: '#333333'
    },
    link: clone(linkOption)
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1',
      // 商品背景(二级背景)
      subBackground: '#FFFFFF',
      // 标题颜色
      title: '#333333',
      // 价格颜色
      text: '#FF3D00',
      // 按钮颜色
      btn: '#FF3D00'
    },
    // 图片
    backgroundImage: ''
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 精品推荐 21/4/7
export const boutiqueRecommendOption = {
  // 组件风格
  componentStyle: {
    // （'single' | 'array' | 'custom'）
    styleType: 'single' as 'single' | 'array' | 'custom'
  },
  // 整体样式
  contentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 操作多个项 写多个是为了保留切换时候的数据
    list: [
      {
        // 缓存Key值
        CACHE_KEY_LIST: 'default',
        // 标题
        title: '我是主标题',
        // 副标题
        subTitle: '我是副标题',
        color: {
          title: '#333333',
          subTitle: '#666666',
          // > single = 按钮颜色(按钮背景颜色)
          btn: '#38432A',
          // > single = 文字颜色(按钮文字颜色)
          text: '#ffffff',
          // 背景色
          background: '#E2CAA2'
        },
        // 图片
        image: `${baseUrl}boutiqueRecommendDefaultImage1.png`,
        link: clone(linkOption)
      }
    ]
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 图片轮播 21/4/8
export const imageCarouselOption = {
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 风格类型(default,column,projection)
    styleType: 'default' as 'default' | 'column' | 'projection'
  },
  // 轮播设置
  carouselSetting: {
    // 轮播点(显示,不显示)
    pagingSpot: '不显示' as '显示' | '不显示',
    // > 显示 = 样式('transverse' | 'spot' | 'ellipse' | 'hollow' | 'number')
    spotStyle: 'transverse' as 'transverse' | 'spot' | 'ellipse' | 'hollow' | 'number',
    // > 显示 =  位置('left' | 'center' | 'right')
    position: 'center' as 'left' | 'center' | 'right',
    // > 显示 = 选中颜色
    selectColor: '#FFFFFF',
    // 轮播图片
    imageList: [
      {
        CACHE_KEY_LIST: 'default',
        image: '',
        link: clone(linkOption)
      }
    ]
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1'
    }
  },
  // 边距设置
  padding: {
    image: 5,
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  },
  heightSetting: {
    height: 200
  }
}
// 轮播搜索 21/4/8
export const carouselSearchOption = {
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 风格类型(fillet,ellipse,rectangle)
    styleType: 'fillet' as 'fillet' | 'ellipse' | 'rectangle'
  },
  // 搜索设置
  searchSetting: {
    // 定位显示(不显示,左侧,右侧)
    positionShow: '不显示' as '不显示' | '左侧' | '右侧',
    // 显示地区(省,市,区)
    showAddress: '省' as '省' | '市' | '区',
    // 定位颜色
    addressColor: '#000000',
    // 提示内容
    tipsContent: '请输入关键字进行搜索', //要改的 还没做组件
    // 内容位置(flex-start,center)
    contentPosition: 'flex-start' as 'flex-start' | 'center',
    // 透明度(%)
    opacity: 100
  },
  // 轮播图设置
  carouselSetting: {
    // 轮播点(显示,不显示)
    pagingSpot: '不显示' as '显示' | '不显示',
    // > 显示 = 样式('transverse' | 'spot' | 'ellipse' | 'hollow' | 'number')
    spotStyle: 'transverse' as 'transverse' | 'spot' | 'ellipse' | 'hollow' | 'number',
    // > 显示 =  位置('left' | 'center' | 'right')
    position: 'center' as 'left' | 'center' | 'right',
    // > 显示 = 选中颜色
    selectColor: '#FFFFFF',
    // 轮播图片
    imageList: [
      {
        CACHE_KEY_LIST: 'default',
        image: '',
        link: clone(linkOption)
      }
    ]
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  },
  heightSetting: {
    height: 200
  }
}
// 图片展播 21/4/9
export const imageExhibitionOption = {
  // 轮播图设置
  carouselSetting: {
    // 主标题(开启,关闭)
    title: true,
    // 副标题(开启,关闭)
    subTitle: true,
    color: {
      title: '#FFFFFF',
      subTitle: '#666666'
    },
    // 对齐方式
    align: 'left' as 'left' | 'center' | 'right',
    // 图片内容
    imageList: [
      {
        CACHE_KEY_LIST: 'default',
        image: '',
        title: '我是主标题',
        subTitle: '我是副标题',
        link: clone(linkOption)
      }
    ]
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 标题栏 21/4/9
export const titleColumnOption = {
  // 组件风格
  componentStyle: {
    // 风格类型 共八种
    styleType: 1
  },
  // 标题文字
  titleText: {
    title: '我是标题',
    color: {
      title: '#333333',
      line: '#333333'
    }
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5
  }
}
// 按钮组 21/4/10
export const buttonGroupOption = {
  // 组件风格
  componentStyle: {
    // 组件样式(投影,默认,描边)
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 风格类型(固定显示,单行滑动,分页滑动)
    styleType: '固定显示' as '固定显示' | '单行滑动' | '分页滑动',
    // 按钮样式('图片+文字' | '图片' | '文字')
    buttonStyle: 'i+t' as 'i+t' | 'i' | 't',
    // 按钮类型('图片' | '图标')
    buttonType: '图片' as '图片' | '图标',
    // 按钮形状('square' | 'fillet' | 'circular')
    buttonShape: 'square' as 'square' | 'fillet' | 'circular',
    // 每行数量(3~5)
    lineNumber: 3 as 3 | 4 | 5
  },
  // 内容编辑
  contentEdit: [
    {
      CACHE_KEY_LIST: 'default',
      //  按钮类型 > 图片 = 图片
      image: '',
      // 按钮类型 > 图标 = 图标
      icon: '',
      // 标签
      labelOption: true,
      // 标签 > 标签内容
      label: '热门',
      //  按钮样式 > 图标+文字 | 文字 = 文字
      title: '按钮文字',
      color: {
        // > 标签 = 标题背景
        label: '#333333',
        //  按钮样式 > 图标+文字 | 文字 = 文字颜色
        title: '#333333',
        // > 标签 = 标签背景颜色
        subBackground: '#66CCFF'
        // 按钮类型 > 图标 = 图标颜色
        // icon: '#333333'
      },
      link: clone(linkOption)
    }
  ],
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#D1D1D1',
      // 按钮背景颜色
      btn: '#FAFAFA',
      // 按钮类型 > 图标 = 图标颜色
      icon: '#333333'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 会员信息 21/4/16
export const userInfoOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '默认' as '默认' | '自定义',
    // 组件风格
    styleType: 'one' as 'one' | 'two' | 'three'
  },
  // 内容编辑
  contentEdit: {
    // 显示内容
    contents: ['余额', '积分', '设置', '优惠券'] as (
      | '余额'
      | '积分'
      | '消息'
      | '设置'
      | '优惠券'
    )[],
    // 卡片背景类型
    cardBackgroundType: '自定义图片' as '背景颜色' | '自定义图片',
    // 卡片背景
    cardBackground: '',
    // 积分图标
    integralIcon: '',
    // 余额图标
    balanceIcon: '',
    // 优惠券图标
    couponIcon: ''
  },
  // 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      gradeBackground: '',
      gradeText: '',
      name: '',
      financeText: ''
    }
  },
  // 边距设置
  padding: {
    top: 0,
    bottom: 0,
    leftRight: 0,
    topRadius: 0,
    bottomRadius: 0
  }
}
// 常用图标组
export const commonlyUsedGroupOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '图片' as '图片' | '图标',
    // 图标数量
    iconCount: '每行3个' as '每行3个' | '每行4个' | '每行5个'
  },
  // 内容编辑
  contentEdit: {
    title: '查看详情',
    contents: [
      { text: '钱包', image: `${baseUrl}wallet.png`, icon: 'oe-wallet', link: userLinks['wallet'] },
      {
        text: '收藏',
        image: `${baseUrl}follow.png`,
        icon: 'oe-follow',
        link: userLinks['followShops']
      },
      {
        text: '足迹',
        image: `${baseUrl}footprint.png`,
        icon: 'oe-footprint',
        link: userLinks['footprint']
      },
      {
        text: '收货地址',
        image: `${baseUrl}address.png`,
        icon: 'oe-address',
        link: userLinks['addressList']
      },
      {
        text: '反馈',
        image: `${baseUrl}feedback.png`,
        icon: 'oe-feedback',
        link: commonLinks['feedbackSubmit']
      },
      { text: '客服', image: `${baseUrl}serve.png`, icon: 'oe-serve', link: otherLinks['serve'] },
      { text: '帮助中心', image: `${baseUrl}help.png`, icon: 'oe-help', link: commonLinks['help'] }
    ]
  },
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 背景颜色
    color: {
      // 背景颜色
      background: '',
      // 卡片背景
      cardBackground: '#ffffff',
      // 标题颜色
      title: '#333333',
      // 图标颜色
      icon: '#666666',
      // 文字颜色
      text: '#666666',
      // 提示颜色
      tips: '#999CA7'
    }
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 订单图标组 21/4/21
export const orderIconGroupOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '图片' as '图片' | '图标'
  },
  // 内容编辑
  contentEdit: {
    title: '查看详情',
    contents: [
      {
        type: 'await-payment',
        typeText: '待付款',
        text: '待付款',
        image: `${baseUrl}await-payment.png`,
        icon: 'oe-await-payment',
        link: defaultOrderLink(1)
      },
      {
        type: 'await-deliver',
        typeText: '待发货',
        text: '待发货',
        image: `${baseUrl}await-deliver.png`,
        icon: 'oe-await-deliver',
        link: defaultOrderLink(2)
      },
      {
        type: 'await-receive',
        typeText: '待收货',
        text: '待收货',
        image: `${baseUrl}await-receive.png`,
        icon: 'oe-await-receive',
        link: defaultOrderLink(3)
      },
      {
        type: 'confirm',
        typeText: '已完成',
        text: '已完成',
        image: `${baseUrl}confirm.png`,
        icon: 'oe-confirm',
        link: defaultOrderLink(4)
      },
      {
        type: 'await-exchang',
        typeText: '退换货',
        text: '退换货',
        image: `${baseUrl}await-exchang.png`,
        icon: 'oe-await-exchang',
        link: defaultOrderLink(0, '/pages/shopOrders/afterSales')
      }
    ]
  },
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '透明' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 背景颜色
    color: {
      // 背景颜色
      background: '',
      // 卡片背景
      cardBackground: '#ffffff',
      // 标题颜色
      title: '#333333',
      // 图标颜色
      icon: '#666666',
      // 文字颜色
      text: '#666666',
      // 提示颜色
      tips: '#999CA7'
    }
  },
  // 边距设置
  padding: {
    top: 12,
    bottom: 12,
    leftRight: 12,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 商品信息 21/4/19
export const commodityInfoOption = {
  componentStyle: {
    // 风格类型('one' | 'two' | 'three')
    styleType: 'one' as 'one' | 'two' | 'three'
  },
  // 内容编辑
  contentEdit: {
    // 购买按钮
    // purchaseBtn: '购买',
    // 产品价格
    productPrice: '区间' as '区间' | '最低价',
    // 快递
    express: '区间' as '区间' | '最低价',
    // 分享
    share: false
    // 活动入口
    // activity: true,
    // 购物车
    // shoppingCart: true
  }
}
// 商品评价 2021/4/21
export const commodityEvaluateOption = {
  showSetting: {
    // 评价数量
    evaluateNum: 1 as 1 | 2 | 3 | 4
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      title: '#333333',
      btn: '#66ccff',
      icon: '#987238',
      subTitle: '#333333',
      subIcon: '#FBCE00',
      text: '#333333',
      line: '#EFEFEF'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 卖家秀
export const buyersShowOption = {}
// 列表导航
export const listNavigationOption = {
  listContent: {
    iconStatus: false,
    list: [
      {
        CACHE_KEY_LIST: 'default',
        image: '',
        title: '我是主标题',
        link: clone(linkOption)
      }
    ]
  },
  // 组件样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      subBackground: '#333333',
      text: '#66ccff',
      icon: '#987238',
      line: '#EFEFEF'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 富文本
export const richTextOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边'
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff'
    }
  },
  // 内容编辑
  contentEdit: {
    value: ''
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 音频播放
export const audioPlayOption = {
  componentStyle: {
    // 风格类型 共4种
    styleType: 'styleOne' as 'styleOne' | 'styleTwo' | 'styleThree' | 'styleFour'
  },
  // 内容编辑
  contentEdit: {
    audio: '',
    text: '主标题',
    subText: '副标题'
  },
  // 组件样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#f1f1f1',
      subBackground: '#ffffff',
      border: '#D9D9D9',
      title: '#333333',
      subTitle: '#8C8C8C',
      btn: '#121212'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 视频播放
export const videoPlayOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    videoType: '手动上传' as '手动上传' | '视频链接'
  },
  addVideo: {
    video: '',
    image: '',
    proportion: '16:9' as '16:9' | '4:3' | '1:1'
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 优惠券
export const couponOption = {
  // 组件风格
  componentStyle: {
    styleType: 'right' as 'right' | 'bottom' | 'center' | 'top',
    showType: 'single' as 'single' | 'pair' | 'three' | 'row'
  },
  // 内容编辑
  contentEdit: [] as { CACHE_KEY_LIST: string; link: typeof linkOption }[],
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5
  }
}
// 积分签到
export const integralSignOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    videoType: '手动上传' as '手动上传' | '视频链接'
  },
  // 内容编辑
  contentEdit: {
    title: '立即抢',
    image: '',
    effectiveTimeStatus: true
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      subBackground: '#ffffff',
      // 内部背景
      insideBackground: '#FFFFFF',
      title: '#333333',
      subTitle: '#999999',
      // 小标题
      smallTitle: '#333333',
      // 小副
      smallSubTitle: '#999999',
      // 积分颜色
      integral: '#333333',
      // 积分背景
      integralBackground: '#FF9B04',
      btn: '#333333',
      // 按钮背景
      btnBackground: '#333'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 运营笔记
export const operateNoteOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    styleType: 'top' as 'top' | 'single' | 'pair'
  },
  contentEidt: {
    // 选择活动
    selectActivity: [
      {
        CACHE_KEY_LIST: 'default'
      }
    ],
    showContent: {
      articleType: false,
      shopHighlights: false,
      createTime: false,
      fabulous: false,
      reading: false
    }
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      subBackground: '#ffffff',
      subTitle: '#999999',
      title: '#333333',
      text: '#333333',
      subText: '#333333',
      secondText: '#333333'
    }
  },
  // 边距设置
  padding: {
    spacing: 5,
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 门店定位 21/4/17
export const storeLocationOption = {
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    color: {
      // 组件背景 > 颜色
      background: '#FAFAFA',
      title: '#333333',
      text: '#999999',
      btn: '#555555',
      icon: '#333333',
      subIcon: '#333333'
    }
  }
}
// 导购
export const shoppingGuideOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    videoType: '手动上传' as '手动上传' | '视频链接'
  },
  contentEdit: {
    image: '',
    title: '标题内容',
    subTitle: '副标题内容',
    contactName: '联系人名称',
    contactContent: '联系内容',
    btnText: '按钮文字',
    color: {
      // 标题文字背景颜色
      background: '#000000',
      // 副标题文字背景颜色
      subBackground: '#acacac',
      //文字颜色
      text: '#ffffff',
      //按钮颜色
      btn: '#333333'
    }
  },
  effect: {
    value: '复制联系方式' as '复制联系方式' | '拨打联系方式' | '放大浏览图片' | '保存图片'
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 表单
export const formOption = {}
// 门店信息
export const storeInfoOption = {}
// 瓦片区
export const tileRegionOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    // 边框
    borderStatus: true
  },
  contentEdit: [
    {
      CACHE_KEY_LIST: 'default',
      image: '',
      title: '主标题',
      background: '#333333',
      subTitle: '副标题',
      subBackground: '#999999',
      link: clone(linkOption)
    }
  ],
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
// 关注公众号 21/4/17
export const followOfficialOption = {
  content: 'C端做显示'
}
// 下单提醒 21/4/17
export const completeOrderRemindOption = {
  // 组件风格
  componentStyle: {
    placement: '左上角' as '左上角' | '右上角' | '左下角' | '右下角'
  },
  // 内容编辑
  contentEdit: {
    showContent: {
      // 头像
      avatar: { state: true },
      // 下单时间
      time: { state: true }
    },
    // 滚动速度(s)
    speed: 1,
    // 数据类型
    dataType: '虚拟数据' as '真实数据' | '虚拟数据',
    // 数据量
    dataAmount: 20
  },
  // 组件背景
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // > 背景图片
    image: '',
    // 背景颜色
    opacity: 20,
    color: {
      // 组件背景 > 颜色
      background: '#222222',
      text: '#FFFFFF',
      subText: '#FFFFFF'
    }
  },
  // 边距设置
  padding: {
    bottom: 5,
    right: 5,
    top: 5,
    left: 5
  }
}
// 缝合怪 99/99/99
export const copyCodeOption = {
  // 组件风格
  componentStyle: {
    componentModal: '默认' as '投影' | '默认' | '描边',
    videoType: '手动上传' as '手动上传' | '视频链接',
    borderStatus: true
  },
  contentEdit: {
    image: '',
    title: '',
    subTitle: '',
    contactName: '',
    contactContent: '',
    btnText: '',
    color: {
      // 标题文字背景颜色
      background: '#ffffff',
      // 副标题文字背景颜色
      subBackground: '#ffffff',
      //文字颜色
      text: '#333333',
      //按钮颜色
      btn: '#333333'
    }
  },
  // 组件背景(样式) 颜色样式
  colorStyle: {
    // 组件背景(透明,颜色,背景图片)
    backgroundType: '颜色' as '透明' | '颜色' | '背景图片',
    // 背景图片
    image: '',
    // 颜色样式
    color: {
      background: '#ffffff',
      subBackground: '#000000',
      insideBackground: '#000000'
    }
  },
  // 边距设置
  padding: {
    top: 5,
    bottom: 5,
    leftRight: 5,
    topRadius: 5,
    bottomRadius: 5
  }
}
