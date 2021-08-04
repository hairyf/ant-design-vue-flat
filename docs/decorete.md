---
sidebar: auto
title: '装修页面/组件'
---

## 开发说明

> 认识装修基础信息，页面层级、结构等..

### 项目结构

```jsx
src/view/decorate 		// 装修根目录
├── components
|  ├── abandoneds  		 // 遗弃的组件存放点
|  ├── common  			 // 公用(视图区, 编辑区)组件
|  ├── edit  			 // 编辑区组件(颜色输入框, 颜色组, 区块拖动输入框, 区块拖动组.....)
|  ├── view  			 // 视图区组件(视图图片) 注: 该组件后台与uniapp项目组件都存在
|  ├── EditHeader.vue	 // 编辑区组件: 头部
|  ├── EditCardItem.vue  // 编辑区组件: 操作栏目
|  └── EditCardForm.vue  // 编辑区组件: 单操作区
├── config		// 装修组件配置
|  ├── index.ts 			// 装修配置入口
|  ├── linkIndexes.ts 		// 对应用户端链接配置
|  └── options.ts 			// 装修组件的全部配置信息
├── edit 		// 操作区组件存放位置 *
├── hooks 		// 装修用逻辑钩子
├── image 		// 请不要此处放内容 已迁移至根目录public文件存放
├── layout 		// 布局组件(内容区, 顶部导航)
├── view 		// 视图区组件存放位置 *
|  ├── CommodityGroup	// 商品组视图的小零件(过于多风格的视图区可以分出小零件拼装)
|  └── UserInfo			// 用户信息的小零件
├── index.vue 			// 装修组件入口
├── Advertisement.vue 	// 导航栏:广告配置 -> 视图区|操作区
├── Decoration.vue 		// 导航栏:装修配置 -> 视图区|操作区
├── NaviAdmin.vue 		// 导航栏:导航配置 -> 视图区|操作区
├── Recommend.vue 		// 导航栏:商品推荐 -> 视图区|操作区
└── Style.vue 			// 导航栏:颜色风格 -> 视图区|操作区
```

### 基本 component 视图描述

![](images/base-edit.png)

## 页面创建

> 对应不同装修组件需求，创建单组件装修配置以及创建对应[操作区](#操作区)和[视图区](#视图区)的文件

### 配置流程与规范 

> 组件可操作数据配置
>
> 路径config -> oiptions

> 说明

#### 配置规范

- 每个新组件 需要备注名字 以及开始日期
- 每个组件的栏目进行一层数据包装  配置的第一层不得是数据而且对应分类的名字
- 当数据有多个不同的值 需要设置类型  例:componentModal: '投影' as '投影' | '默认' | '描边'
- 超过三个的color必须进行一层color对象包装 例子:colorStyle数据
  - 有对应的color控制组件可使用
- 可选链接必须clone 已有的linkOption配置进行统一数据处理
  - 如有特殊链接需求 {...clone(linkOption),title:"title"}
- 可操作数据列表必须有唯一标识
  - 命名规范 CACHE\_数据作用\_作用范围  全大写.
  - 默认数据为 default 字符串

```ts
// 组件Name 配置 当天日期
// 商品组配置 21/03/30

// 配置命名规范 驼峰组件英文名 + Option
export cosnt commodityGroupOption = {
    // 一级数据对应名字 以及对应英文名数据
    // 组件风格  
    componentStyle:{
        // 基于一级数据的二级数据(操作数据)
        // 组件样式
        componentModal: '投影' as '投影' | '默认' | '描边',
    },
    // 颜色风格
    colorStyle:{
        // 多个颜色规范
        title:'xx',
        color:{
            title:"#66ccff",
            text:"#66ccff",
            icon:"#66ccff",
           	// ...
        },
        // 链接选择 使用规范
        link:clone(linkOption)
    },
    // 标签列表
    tabList:{
        // 当前选择项缓存
         CACHE_TARGET_LIST: 'default',
  		// 选项卡设置（列表）
  		tabList: [
    		{
      		// 添加删除的索引缓存
      		CACHE_KEY_LIST: 'default',
      		// 标题
      		title: '',
      		// 内容为 商品组内容 嵌套使用
      		content: cloneDeep(commodityGroupOption)
    		}
  		]
    }
}
```



> 实例

```ts
// 商品组配置 21/03/30
export const commodityGroupOption = {
  // 组件风格
  componentStyle: {
    // 组件样式
    componentModal: '投影' as '投影' | '默认' | '描边',
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
      color: '#acacac',
      text: '99'
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
```



### 新组件开发流程 and 创建页面流程

1. 查阅设计图 开始准备配置 option 配置项

2. 实现上方的配置流程与规范

3. 先分别在操作区和视图区创建对应的页面

4. 在index中对应的menuConfig(菜单栏配置中添加)

   ```js
   // 此处是菜单栏配置
   export const menuConfig: ComponentMenus[] = [
     {
       title: '基础组件',  //左侧选择区名字
       target: 'personal',  //左侧选择区类型
       items: [   //选择区内的组件
         // 会员信息
         {
           text: '会员信息', //组件标题名字
           icon: 'ad-user-info',  //组件图标类名
           type: 'UserInfo', //组件挂载的ID  index引入会用到
           option: userInfoOption, //导入配置信息
             
           //其他配置
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
           drag?: booleanz
           // 是否置顶
           stick?: boolean
           // 是否固定
           fixed?: boolean
           // 是否为弹窗
           modal?: boolean
         },
       ]
     },
   ]
   ```

5. 在view和edit文件夹创建对应的文件 作为视图区和操作区代码

6. 挂载视图和操作区 即可完成基础页面配置

   ~~~js
   export const ViewComponents: Record<string, any> = {
     // 此处名字对应menuConfig的Type
     UserInfo: {
       // 将创建的 视图区和操作区代码 引入
       view: defineAsyncComponent(() => import('../view/PageInfo.vue')),
       edit: defineAsyncComponent(() => import('../edit/PageInfo.vue'))
     },
   }
   ~~~

## 操作区

> 文件路径：orange-internet-mall-admin\src\view\decorate\edit

### 引入option配置

```ts
const props = defineProps({
    option: {
      type: Object as () => typeof ----Option,
      required: true
    }
})
```

### 开发以及组件的使用

> 基础页面模板

```vue
<template>
<div class="Name-container">
  <edit-header title="组件名字" icon="组件图标" />
</div>
</template>
<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
import { Option } from '@/view/decorate/config/options'
import EditHeader from '@/view/decorate/components/EditHeader.vue'
const props = defineProps({
option:{
 type:Object as () => typeof Option,
required: true
}
})
//导出配置为常量 供视图使用
const { Option } = props.option
</script>
<style lang="scss" scoped>
.Name-container{}
</style>
```

> 组件使用

### 目前已有组件

```js
components
├── abandoneds 	//启用组件 不做说明
|  └── HotImageList.vue
├── common 		//常用组件
|  ├── AudioItem.vue		//音频选择器
|  ├── EffectTextFrame.vue	//艺术文字框
|  ├── GoodList.vue			//商品选择器
|  ├── HotEdit.vue			//热区编辑器
|  ├── IconItem.vue			//图标选择器
|  ├── ImageItem.vue		//图片选择器
|  ├── LinkItem.vue			//链接选择器
|  ├── VideoItem.vue		//视频选择器
|  └── ViewImage.vue		//图片展示框
├── EditCardForm.vue 		//栏目嵌套
├── EditCardItem.vue		//操作嵌套
├── EditHeader.vue			//操作区头部
└── items	//小组件
   ├── ColorGroup.vue		//颜色选择器组
   ├── ColorInput.vue		//单个颜色选择器
   ├── SliderGroup.vue		//数值选择器组
   ├── SliderInput.vue		//单个数值选择器
   ├── StyledGroup.vue		//勾选选择器组
   └── StyledInput.vue		//单个勾选选择器
```

组件使用

```vue
AudioItem.vue		// 音频选择器
<audio-item v-model="String" />

GoodList.vue			// 商品选择器
<good-list v-model="LinkOption[]" />

IconItem.vue			// 图标选择器
<icon-item v-model="String" />

ImageItem.vue		// 图片选择器
<image-item v-model="String" />

LinkItem.vue			// 链接选择器
<link-item v-model="LinkOption" />

VideoItem.vue		// 视频选择器
<video-item v-model="String" />

EditCardForm.vue 		// 栏目嵌套
<edit-card-form title="栏目名字">
    <el-form-item label="音频选择">
      <audio-item v-model="option.contentEdit.audio" />
    </el-form-item>
</edit-card-form>

EditCardItem.vue		// 操作嵌套
有点小复杂 问当事人或者多看看列子 全局搜索edit-card-item

EditHeader.vue			// 操作区头部
<edit-header title="标题名字" icon="标题图标" />

```

小组件使用

```vue
ColorGroup.vue		// 颜色选择器组
<color-group v-model="item.color" reset>
      <el-form-item label="主标题">
        <el-input class="oe-flex" v-model="item.title" maxlength="10" show-word-limit />
      </el-form-item>
    	ColorInput.vue		// 单个颜色选择器
      <color-input keyword="title" label="主标题" />
      <el-form-item label="副标题">
        <el-input class="oe-flex" v-model="item.subTitle" maxlength="10" show-word-limit />
      </el-form-item>
      <color-input keyword="subTitle" label="副标题" />
      <color-input keyword="btn" label="按钮颜色" />
      <el-form-item label="图片">
        <image-item v-model="item.image" />
      </el-form-item>
      <el-form-item label="链接">
        <link-item v-model="item.link" />
      </el-form-item>
      <color-input keyword="background" label="背景颜色" />
</color-group>

ColorInput.vue		// 单个颜色选择器(单独使用)
<el-form-item label="标题Name ">
      <color-input v-model='color' />
</el-form-item>

SliderGroup.vue		// 数值选择器组
<slider-group v-model="option.padding">
   	 SliderInput.vue		// 单个数值选择器
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
</slider-group>

SliderInput.vue		// 单个数值选择器(单独使用)
<el-form-item label="标题Name ">
      <slider-input v-model='number' :max="50" tips="px" />
</el-form-item>

StyledGroup.vue		// 勾选选择器组
<styled-group v-model="option.displayStyle">
    	StyledInput.vue		// 单个勾选选择器
      <styled-input tips="商品标题" keyword="commodityTitle" />
      <styled-input tips="商品价格" keyword="commodityPrice" />
      <styled-input tips="划线价" keyword="markingPrice" />
      <styled-input tips="商品销量" keyword="salesVolume" />
      <styled-input tips="会员价" keyword="membershipPrice" />
</styled-group>

StyledInput.vue		// 单个勾选选(单独使用)
<el-form-item label="标题Name ">
       <styled-input v-model='status' tips="会员价" />
</el-form-item>


```

### 组件定义规范

```markdown
## 店铺组件装修定义规范

### 小组件（颜色选择器，长度选择器）

目标路径：decorate/components

定义规范：element-plus 中无相似组件，复用度（两个以上）

### 大组件（容器卡片，编辑逻辑块）

目标路径：decorate/components

定义规范：功能相似度70%，如三个小组件，以及复用度（两个以上）

### 大小组件定义

以 element-plus 向外扩展组件的方式，加强装修组件复用性=
```

## 视图区

> 主要与C端兼容有关 其他比较随意

### 钩子使用(引入)

```ts
// 使用hook获得基本配置
  //获得边距和圆角
  const { padding, borderRadius } = usePaddingRadius(props.option)
  // 获得背景颜色处理
  const { background } = useBackgroundColor(props.option.colorStyle)
  // 获得颜色风格
  const { boxShadow, border } = useComponentModalStyle(props.option.componentStyle)
```

### 钩子使用(模板)

```vue
<div :style="{ padding, background, boxShadow, border, borderRadius }"></div>
```

### view-image组件

> 可以传入一个类名作为图标使用  也可以传入链接显示图片

```vue
<view-image
   :size="50"
   :size="{width:50,height:50}"
   :src="item.image"
   :border-radius="'50%'"
/>
```

### view-image图片和图标显示问题

> 如果作为图片使用时 被意外的错误识别成图标 请使用isImage进行修饰

```vue
<view-image
   isImage
   :size="45"
   :src="item.image"
/>
```

### 兼容写法

> C端使用的是compotisionApi进行的一个兼容 所以在写视图区可以提前做好兼容操作

#### 模板兼容

```ts
<script lang="ts">
  import { defineComponent,setup } from '@vue/runtime-core'
  import { commodityGroupOption } from '@/view/decorate/config/options'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle,
  } from '@/view/decorate/hooks/use-view-style';
  export default defineComponent({
    props: {
      option: {
        type: Object as () => typeof commodityGroupOption,
        required: true
      }
    },
    setup(props){
        // 使用hook获得基本配置
 	    //获得边距和圆角
 	    const { padding, borderRadius } = usePaddingRadius(props.option)
 	    // 获得背景颜色处理
 	    const { background } = useBackgroundColor(props.option.colorStyle)
 	    // 获得颜色风格
 	    const { boxShadow, border } = useComponentModalStyle(props.option.componentStyle)
        return { padding, background, boxShadow, border, borderRadius }
   }
  })
</script>
```

#### C端对应修改的内容

```ts
// 在新组件开发的时候 C端会报错 没有对应的option 这不是bug
- import { commodityGroupOption } from '@/view/decorate/config/options'
> import { commodityGroupOption } from 'orange-components-config/options'

- import { defineComponent,setup } from '@vue/runtime-core'
> import { defineComponent,setup } from '@vue/composition-api';

- import {
  	useBackgroundColor,
  	usePaddingRadius,
  	useComponentModalStyle,
  } from '@/view/decorate/hooks/use-view-style';
> import {
  	useBackgroundColor,
  	usePaddingRadius,
  	useComponentModalStyle,
  } from '@/hooks/use-view-style';
```

### 样式兼容

```scss
<div :style="{ height: `${contentHeight}px` }" />
<div class='oe-m-10' />
<view-image :size='30' />

.play-image {
    position: absolute;
    width: 56px;
    height: 56px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

C端对应修改的内容

```scss
<div :style="{ height: `${contentHeight * 2}rpx` }" />
<div class='u-m-20' />
<view-image :size='30 * 2' />

.play-image {
    position: absolute;
    width: toRpx(56);
    height: toRpx(56);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

### C端页面创建

1. 将写好的Admin端的view视图复制放到C端目录 component > view 内

2. 将Admin端的Option配置打包npm上传 config > package.json

3. component > view > view-distribution中导入

   ```ts
   <template>
     <div class="o-distribution">
       <template v-for="(item, i) in templates">
         <template v-if="!item.hide">
           <div :key="i">
             <Name
               v-if="item.type === 'Name'"
               :option="item.option"
             />
   		</div>
         </template>
       </template>
     </div>
   </template>
   <script lang="ts">
   	import Name from '@/components/view/Name.vue';
   	export default defineComponent({
   		components: { Name }
   	}
   </script>
   ```

## 其他问题

### 修改旧组件兼容问题

> 目前没有做 相应的模块化处理
>
> 使用简单的多判断处理

```ts
if (!decorateInfo.value.content) {
      decorateInfo.value.content = defaultContentOption
    } else {
      /* 后续可以使用版本进行更新 为每个content添加个版本字段 进行更新判断 */
      /* 旧的广告页面更新 */
      if (decorateInfo.value.content.advertisement.id === undefined) {
        decorateInfo.value.content.advertisement = defaultContentOption.advertisement
      }

      decorateInfo.value.content.views.forEach((i, index) => {
        i.content.forEach((item, key) => {
          if (item.type === 'ImageCarousel' && !item?.option?.heightSetting) {
            item.option = imageCarouselOption
          }
          if (item.type === 'CarouselSearch' && !item?.option?.heightSetting) {
            item.option = carouselSearchOption
          }
        })
      })
    }
```

