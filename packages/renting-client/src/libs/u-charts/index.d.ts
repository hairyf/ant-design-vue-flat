/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 09:14:22
 * @LastEditTime: 2021-01-18 10:29:04
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
interface UchartsSetOption {
  /** this实例组件内使用图表，必须传入this实例 */
  $this: any;
  /** 页面组件canvas-id，支付宝中为id */
  canvasId: string;
  /** canvas宽度，单位为px，支付宝高分屏需要乘像素比，使用uni.upx2px(750)自适应全屏 */
  width: number;
  /** canvas高度，单位为px，支付宝高分屏需要乘像素比 ，使用uni.upx2px(500)自适应不同屏幕 */
  height: number;
  /** 图表类型（mix类型下的extra配置详细某一类图的配置未完善，需要自己改源码） */
  type:
    | 'pie'
    | 'line'
    | 'column'
    | 'area'
    | 'ring'
    | 'radar'
    | 'arcbar'
    | 'gauge'
    | 'candle'
    | 'bar'
    | 'rose'
    | 'word'
    | 'mix';
  /** 开启canvas2d模式，canvas组件需要定义id和type="2d"，默认为false */
  canvas2d?: boolean;
  /** 配合canvas2d模式，上面参数为true时，必须传入context(ctx) */
  context?: any;
  /** 图表配色方案，不传则使用系统默认配置，map区域的颜色也是在这里配置，例如['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'] */
  colors?: string[];
  /** 默认[15,15,4,15]; 画布填充边距，顺序为上右下左，同css，但必须4位，第一个值增大可应用于y轴文字最后一个与x轴文字重合，datalabel显示不完整，增大第二个值可解决x轴最后一个文字显示不完整 */
  padding?: number[];
  /** 像素比，默认为1，仅支付宝小程序需要大于1，其他平台必须为1 */
  pixelRatio?: number;
  /** 横屏模式，默认为false */
  rotate?: boolean;
  /** 锁定横屏模式，如果在支付宝和百度小程序中使用横屏模式，请赋值true，否则每次都会旋转90度。跨端使用通过uni-app的条件编译来赋值 */
  rotateLock?: boolean;
  /** 默认 13px; 全局默认字体大小（可选，单位为px，默认13px）高分屏不必乘像素比，自动根据pixelRatio计算 */
  fontSize?: number;
  /** canvas背景颜色（如果页面背景颜色不是白色请设置为页面的背景颜色，默认#ffffff） */
  background?: string;
  /** 默认 false; 是否开启图表可拖拽滚动 默认false 支持line, area, column, candle图表类型(需配合绑定@touchstart, @touchmove, @touchend方法) */
  enableScroll?: boolean;
  /** 默认 false; 是否显示辅助线 默认false 支持line, area, column, candle, mix图表类型 */
  enableMarkLine?: boolean;
  /** 默认为 true; 是否动画展示，tab切换导致一闪一闪的就是因为动画有执行时间，设置成false就行了 */
  animation?: boolean;
  /** 默认为 1000; 动画展示时长单位毫秒 */
  duration?: number;
  /** 默认为 true; 是否在图表中显示数据标签内容值，雷达图显示不了数值，可以修改categories的string加上数值 */
  dataLabel?: boolean;
  /** 默认为 true; 是否在图表中显示数据点图形标识 */
  dataPointShape?: boolean;
  /** 默认为 'solid'; 数据点图形标识类型 可选值：实心solid、空心hollow */
  dataPointShapeType?: 'solid' | 'hollow';
  /** @deprecated 默认false; 不绘制饼图（圆环图）各区块的白色分割线已迁移至扩展配置中(此配置v1.8.2前有效) */
  disablePieStroke?: boolean;
  /** 默认为 'current'; 开启图表拖拽后，更新图表后图表时，滚动条的偏移距离，可选值left更新后强制左对齐；right更新后强制右对齐；current更新后保持当前偏移距离 */
  scrollPosition?: 'current' | 'left' | 'right';
  /** 数据类别(饼图、圆环图不需要) */
  categories?:
    | {
        /** 仅仪表盘有效，定义仪表盘分段值 */
        value: number;
        /** 仅仪表盘有效，定义仪表盘分段背景颜色 */
        color: string;
      }[]
    | string[];
  /** 数据列表 */
  series?: {
    /** 默认0; 多维数据结构索引值，应用于多坐标系 */
    index?: number;
    /** 数据名称 */
    name: string;
    /** 饼图、圆环图、玫瑰图为Number) 数据，如果传入null图表该处出现断点 */
    data:
      | {
          /** 仅针对柱状图有效，主要作用为柱状图自定义颜色 */
          value?: number;
          /** 仅针对柱状图有效，主要作用为柱状图自定义颜色 */
          color?: string;
        }[]
      | number
      | number[];
    /** 图形显示状态，配合点击图例显示状态，也可默认指定是否显示 */
    show?: boolean;
    /** 图形颜色，例如#7cb5ec 不传入则使用系统默认配色方案 */
    color?: string;
    /** 图形上方标注文字的颜色（datalabel文字颜色），例如#7cb5ec 不传入则使用系统默认配色方案 */
    textColor?: string;
    /** 图形上方标注文字的字体大小 */
    textSize?: number;
    /** 混合图表图形展示方式，有效值为point,line,column,area详细使用方法见demo */
    type?: 'point' | 'line' | 'column' | 'area';
    /** 默认false; 混合图表中禁止显示ToolTip图例，默认false即默认显示该类别图例 */
    disableLegend?: string;
    /** 默认'straight'; 暂时定义为混合图表折线图或区域图样式，有效值为curve曲线,straight直线 */
    style?: string;
    /** 默认false; 混合图中，是否增加折线或区域图上的标记点，仅针对line,area,mix有效 */
    addPoint?: boolean;
    /** 默认为'solid'; 折线线型 'solid'为实线、'dash'为虚线，仅针对line,area,mix有效 */
    lineType?: 'solid' | 'dash';
    /** 默认为8(px); 折线为虚线时，单段虚线长度，仅针对line,area,mix有效 */
    dashLength?: number;
    /** 默认为'circle'; 数据点标识样式，有效值为diamond◆, circle●, triangle▲, rect■ */
    pointShape?: 'diamond' | 'circle' | 'triangle' | 'rect';
    /** 默认为'circle'; 图例标识样式，有效值为diamond◆, circle●, triangle▲, rect■, line▬ */
    legendShape?: 'diamond' | 'circle' | 'triangle' | 'rect' | 'line';
    /** 自定义显示数据内容 */
    format?: (...args: any[]) => any;
    /** K线图自定义折线数据列表，内容同series，仅在opts.extra.candle.average.show为false时调用此数据，（默认调用此数据 */
    seriesMA?: any[];
  }[];
  /** 标题配置项, 适用于ring、arcbar、gauge */
  title?: {
    /** 标题内容 */
    name?: string;
    /** 标题字体大小（可选，单位为px） */
    fontSize?: number;
    /** 标题颜色（可选） */
    color?: string;
    /** 标题横向位置偏移量，单位px，默认0 */
    offsetX?: number;
    /** 标题纵向位置偏移量，单位px，默认0 */
    offsetY?: number;
  };
  /** 适用于ring、arcbar、gauge */
  subtitle?: {
    /** 标题内容 */
    name?: string;
    /** 副标题字体大小（可选，单位为px） */
    fontSize?: number;
    /** 副标题颜色（可选） */
    color?: string;
    /** 副标题横向位置偏移量，单位px，默认0 */
    offsetX?: number;
    /** 副标题纵向位置偏移量，单位px，默认0 */
    offsetY?: number;
  };
  /** X 轴配置 */
  xAxis?: {
    /** 默认为 false; X轴刻度（数值）标签是否旋转（仅在文案超过单屏宽度时有效） */
    rotateLabel?: boolean;
    /** 默认为 5; X轴可见区域数据数量（即X轴数据密度），配合拖拽滚动使用（即仅在启用enableScroll时有效） */
    itemCount?: number;
    /** 默认 series.data.length; X轴可见区域标签数量（即X轴数刻度标签单屏幕限制显示的数量） */
    labelCount?: number;
    /** 默认为 false; 是否显示滚动条，配合拖拽滚动使用（即仅在启用enableScroll时有效） */
    scrollShow?: boolean;
    /** 默认为 'left'; 滚动条初始位置，left为数据整体左对齐，right为右对齐 */
    scrollAlign?: 'left' | 'right';
    /** 默认为 '#EFEBEF'; X轴滚动条背景颜色，配合拖拽滚动使用（即仅在启用enableScroll时有效） */
    scrollBackgroundColor?: string;
    /** 默认为 '#A6A6A6'; X轴滚动条颜色，配合拖拽滚动使用（即仅在启用enableScroll时有效）  */
    scrollColor?: string;
    /** 默认为 false; 不绘制X轴 */
    disabled?: boolean;
    /** 默认为 false; 不绘制X轴网格(即默认绘制网格) */
    disableGrid?: boolean;
    /** 默认为 false; 	坐标轴刻度线是否显示 注v1.9.0有效 */
    calibration?: boolean;
    /** 默认为 '#cccccc'; X轴网格颜色 例如#7cb5ec */
    gridColor?: string;
    /** 默认为 'solid'; X轴网格线型 'solid'为实线、'dash'为虚线` */
    gridType?: 'solid' | 'dash';
    /** 默认(chartData.categories.length / 4).toFixed(0), 这样子可以做到显示4条grid; X轴网格线显示间隔，即假设为2时，是隔一个刻度显示间隔 */
    gridEval?: number;
    /** 默认为 4px; X轴网格为虚线时，单段虚线长度 */
    dashLength?: number;
    /** 默认为 '#666666'; X轴数据点颜色 例如#7cb5ec */
    fontColor?: string;
    /** 默认为 opts.fontSize; X轴数据标签字体大小 */
    fontSize?: number;
    /** 默认为 'center'; 折线图、区域图起画点结束点方法：center为单元格中间起画，justify为0点起画即两端对齐 */
    boundaryGap?: string;
    /** 默认为 true; 坐标轴轴线是否显示 注v1.9.0有效 */
    axisLine?: boolean;
    /** 默认为 '#cccccc'; 坐标轴轴线颜色 注v1.9.0有效 */
    axisLineColor?: string;
    /** 默认 15; 用于解决x轴文字太贴近轴线，请适当改大这个值，需要去源码头部里面修改 */
    xAxisHeight?: number;
    /** 默认 15; 用于解决x轴文字太贴近轴线，请适当改大这个值，需要去源码头部里面修改 */
    xAxisLineHeight?: number;
  };
  /** Y 轴配置 */
  yAxis?: {
    /** 多坐标系配置，数据结构是这样子 data：[{min:10,max:50,axisLine: false,},{min:10,max:50}] */
    data?: {
      /** 默认为 'left'; 	Y轴位置，可选值左侧left右侧right */
      position?: 'left' | 'right';
      /** 默认为 false; 不绘制Y轴（数据和轴线都不绘制） */
      disabled?: boolean;
      /** Template：format:val=>{return val.toFixed(2)}; 自定义Y轴文案显示,return什么y轴就显示什么，建议保留两位小数 */
      format?: (val: number) => number | string;
      /**	Y轴起始值（默认是你的数据中的最小值） */
      min?: number;
      /** Y轴终止值（默认是你的数据中的最大值） */
      max?: number;
      /** Y轴标题（记得把外面一层的showTitle 设置为true） */
      title?: string;
      /** 默认为 opts.fontSize; Y轴标题字体大小  */
      titleFontSize?: number;
      /** 默认为 '#666666'; Y轴标题字体颜色 */
      titleFontColor?: string;
      /** 默认为 '#666666'; Y轴数据点颜色 例如#7cb5ec */
      fontColor?: string;
      /** 默认为 opts.fontSize; Y轴数据标签字体大小 */
      fontSize?: number;
      /** 默认为 true; 坐标轴轴线是否显示 （数据还能显示） */
      axisLine?: boolean;
      /** 默认为 false; 坐标轴刻度线是否显示 */
      calibration?: boolean;
      /** 默认为 '#cccccc'; 坐标轴轴线颜色  */
      axisLineColor?: string;
    }[];
    /** 默认为 10px; 多个Y轴间的间距 */
    padding?: number;
    /** 默认为 false; 不绘制Y轴标题 */
    showTitle?: boolean;
    /** 默认为 false; 不绘制Y轴 */
    disabled?: boolean;
    /** 默认为 false; 不绘制Y轴网格(即默认绘制网格) */
    disableGrid?: boolean;
    /** 默认为 5; Y轴网格数量 */
    splitNumber?: number;
    /** 默认为 'solid'; Y轴网格线型 'solid'为实线、'dash'为虚线 */
    gridType?: string;
    /** 默认为 4px; Y轴网格为虚线时，单段虚线长度 */
    dashLength?: number;
    /** 默认为 '#cccccc'; Y轴网格颜色 例如#7cb5ec */
    gridColor?: string;
    /** 有data项就需要写在data里面; Y轴起始值（默认是你的数据中的最小值） */
    min?: number;
    /** 有data项就需要写在data里面; Y轴终止值（默认是你的数据中的最大值） */
    max?: number;
    /** 有data项就需要写在data里面; Template：format:val=>{return val.toFixed(2)}; 自定义Y轴文案显示,return什么y轴就显示什么，建议保留两位小数 */
    format?: (val: number) => number | string;
  };
  /** 图例设置 */
  legend?: {
    /** 默认为 true; 是否显示各类别的图例标识 */
    show?: boolean;
    /** 默认为 'bottom'; 图例相对画布的显示位置，可选值：上top、右right、下bottom 、左left */
    position?: 'bottom' | 'top' | 'right' | 'left';
    /** 默认为 'center'; 图例位置对齐方向，上下布局时可选值：左left、中center、右right；左右布局时可选值：上top、中center、下bottom */
    float?: 'left' | 'center' | 'right' | 'top' | 'bottom';
    /** 默认为 5; 图例内填充边距，单位px，默认5 */
    padding?: number;
    /** 默认为 5; 图例外侧填充边距（仅在上下方向有效），单位px，默认5。如果图例位置为left或right时，设置此参数相当于间接控制每列图例的数量 */
    margin?: number;
    /** 默认为 opts.fontSize; 字体大小，单位px。支付宝小程序需乘pixelRatio，其他平台不用 */
    fontSize?: number;
    /** 默认为 opts.fontSize+5; 字体行高。左右模式建议设置为2倍fontSize大小（避免点击事件时太近不好区分） */
    lineHeight?: number;
    /** 默认为 'rgba(0,0,0,0)'; 图例背景颜色，默认透明。请传rgba(0,0,0,0)格式颜色 */
    backgroundColor?: string;
    /** 默认为 'rgba(0,0,0,0)'; 图例边框颜色，默认透明。请传rgba(0,0,0,0)格式颜色 */
    borderColor?: string;
    /** 默认为 0; 图例边框线宽，单位px，默认为0 */
    borderWidth?: number;
    /** 默认为 10; 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔 */
    itemGap?: number;
    /** 默认为 '#666666'; 字体颜色，请用16进制颜色 */
    fontColor?: string;
    /** 【未来预留，暂未生效】自定义显示数据内容 */
    format?: any;
    /** 默认为 '#CECECE'; 点击隐藏时，图例标识及标识文案的颜色 */
    hiddenColor?: string;
  };
  /** 扩展配置项 */
  extra?: {
    /** 圆弧进度图相关配置 */
    arcbar?: {
      /** 默认为 'default'; 圆弧进度图样式，default为半圆弧，circle为整圆 */
      type?: string;
      /** 默认为 12px; 圆弧进度图弧线宽度，单位为px */
      width?: number;
      /** 默认为 '#E9E9E9'; 圆弧进度图背景颜色 */
      backgroundColor?: string;
      /** 默认为 0.75; 圆弧进度图起始角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
      startAngle?: number;
      /** 默认为 0.25; 圆弧进度图结束角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
      endAngle?: number;
      /** 默认为 underfind; 圆弧进度图自定义半径（最大半径）（无特殊需求无需填写） */
      radius?: number;
      /** 默认为 2; 圆弧进度条的间隔单位px */
      gap?: number;
      /** 默认为 underfind; 圆弧进度图自定义圆心（无特殊需求无需填写） */
      center?: {
        /** 默认为 underfind; 自定义圆心x坐标 */
        x?: number;
        /** 默认为 underfind; 自定义圆心y坐标 */
        y?: number;
      };
    };
    /** 仪表盘相关配置 */
    gauge?: {
      /** 默认为 'default'; 仪表盘样式，default为百度样式，progress带刻度的进度条样式 */
      type?: string;
      /** 默认为 15px; 仪表盘坐标轴（指示盘）线宽度，单位为px */
      width?: number;
      /** 默认为 '#666666'; 仪表盘刻度尺标签文字颜色 */
      labelColor?: string;
      /** 默认为 0.75; 仪表盘起始角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
      startAngle?: number;
      /** 默认为 0.25; 仪表盘结束角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
      endAngle?: number;
      /** 默认为 0; 仪表盘起始数值 */
      startNumber?: number;
      /** 默认为 100; 仪表盘结束数值 */
      endNumber?: number;
      /** 仪表盘数据标签格式化 */
      labelFormat?: (...args: any[]) => any;
      /** 仪表盘刻度线配置 */
      splitLine?: {
        /** 默认为 0; 仪表盘刻度线径向偏移量 */
        fixRadius?: number;
        /** 默认为 0; 仪表盘刻度线分段总数量 */
        splitNumber?: number;
        /** 默认为 15px; 仪表盘分割线长度 */
        width?: number;
        /** 默认为 '#FFFFFF'; 仪表盘分割线颜色 */
        color?: string;
        /** 默认为 5; 仪表盘子刻度线数量 */
        childNumber?: number;
        /** 默认为 5px; 仪表盘子刻度线长度 */
        childWidth?: number;
      };
      /** 仪表盘指针配置 */
      pointer?: {
        /** 默认为 15px; 仪表盘指针宽度 */
        width?: number;
        /** 默认为 'auto'; 仪表盘指针颜色，定义为auto时，随仪表盘背景颜色改变,或者可以指定颜色例如'#7cb5ec' */
        color?: string;
      };
    };
    /** 雷达图相关配置 */
    radar?: {
      /** 默认为 series; data的最大值，数据区间最大值，用于调整数据显示的比例 */
      max?: number;
      /** 默认为 '#666666'; 各项标识文案的颜色 */
      labelColor?: string;
      /** 默认为 '#cccccc'; 雷达图网格颜色 */
      gridColor?: string;
      /** 默认为 0.2; 雷达图透明度 */
      opacity?: number;
      /** 默认为 3; 雷达图网格数量 */
      gridCount?: number;
    };
    /** 柱状图相关配置 */
    column?: {
      /** 柱状图类型：group分组柱状图，stack为堆叠柱状图（未完成开发中），meter为温度计式图 */
      type?: string;
      /** 柱状图每项的图形宽度，单位为px */
      width?: number;
      /** 温度计式图配置项 */
      meter?: {
        /** 边框宽度，单位为px，默认1px */
        border?: number;
        /** 默认为 '#FFFFFF'; 空余填充颜色 */
        fillColor?: string;
      };
    };
    /** 饼图圆环图相关配置 */
    pie?: {
      /** 默认为 0.5; 启用Tooltip点击时，突出部分的透明度，默认0.5 */
      activeOpacity?: number;
      /** 默认为 10; 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth），默认10 */
      activeRadius?: number;
      /** 默认为 0; 起始角度偏移度数，顺时针方向，起点为3点钟位置（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */
      offsetAngle?: number;
      /** 默认为 15; 数据标签到饼图外圆连线的长度，单位为px */
      labelWidth?: number;
      /** 默认为 0; ringChart圆环宽度，单位为px */
      ringWidth?: number;
      /** 默认为 false; 是否绘制分割线（v1.8.2有效） */
      border?: boolean;
      /** 默认为 2; 分割线宽度，单位为px（v1.8.2有效） */
      borderWidth?: number;
      /** 默认为 '#FFFFFF'; 分割线颜色（v1.8.2有效） */
      borderColor?: string;
    };
    /** 玫瑰图相关配置 */
    rose?: {
      /** 默认为 'area'; 玫瑰图模式，可选值area面积模式，radius半径模式 */
      type?: 'area' | 'radius';
      /** 默认为 默认为图形半径的50%; 最小半径值 */
      minRadius?: number;
      /** 默认为 0.5; 启用Tooltip点击时，突出部分的透明度，默认0.5 */
      activeOpacity?: number;
      /** 默认为 10; 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth），默认10 */
      activeRadius?: number;
      /** 默认为 0; 起始角度偏移度数，顺时针方向，起点为3点钟位置（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */
      offsetAngle?: number;
      /** 默认为 15; 数据标签到饼图外圆连线的长度，单位为px */
      labelWidth?: number;
      /** 默认为 false; 是否绘制分割线（v1.8.2有效） */
      border?: boolean;
      /** 默认为 2; 分割线宽度，单位为px（v1.8.2有效） */
      borderWidth?: number;
      /** 默认为 '#ffffff'; 分割线颜色（v1.8.2有效） */
      borderColor?: string;
    };
    /** 折线图相关配置 */
    line?: {
      /** 默认为 'straight'; 可选值：curve曲线，straight直线 */
      type?: 'curve' | 'straight';
      /** 默认为 2; 折线宽度 */
      width?: number;
    };
    /** 区域图相关配置 */
    area?: {
      /** 默认为 'straight'; 可选值：curve曲线，straight直线 */
      type?: 'curve' | 'straight';
      /** 默认为 0.2; 区域图透明度 */
      opacity?: number;
      /** 默认为 false; 否叠加相应的折线 */
      addLine?: boolean;
      /** 默认为 2; 折线宽度 */
      width?: number;
      /** 默认为 false; 是否开启区域图渐变色 */
      gradient?: boolean;
    };
    /** K线图相关配置 */
    candle?: {
      /** K线图颜色配置 */
      color?: {
        /** 默认为 '#f04864'; K线图为涨时线颜色 */
        upLine?: string;
        /** 默认为 '#f04864'; K线图为涨时填充颜色 */
        upFill?: string;
        /** 默认为 '#2fc25b'; K线图为跌时线颜色 */
        downLine?: string;
        /** 默认为 '#2fc25b'; K线图为跌时填充颜色 */
        downFill?: string;
      };
      /** 均线设置 */
      average?: {
        /** 默认为 false; 是否显示均线 */
        show?: boolean;
        /** 均线名称（例如['MA5','MA20']）用于下方图例显示 */
        name?: string[];
        /** 均线单位日期（例如[5,20]为显示5日及20日均线） */
        day?: number[];
        /** 均线颜色，例如['#1890ff', '#2fc25b'] */
        color?: string[];
      };
    };
    /** 词云图相关配置 */
    word?: {
      /** 默认为 'normal'; 类型可选值：水平normal，垂直vertical（45度旋转tilt随机旋转random，开发中） */
      type?: 'normal' | 'vertical' | 'random';
      /** 默认为 true; 是否开启随机颜色，否的话使用opts.colors配色方案(暂未启用) */
      autoColors?: boolean;
    };
    /** 漏斗图相关配置 */
    funnel?: {
      /** 默认为 0.3; 启用Tooltip点击时，突出部分的透明度，默认0.3 */
      activeOpacity?: number;
      /** 默认为 10; 启用Tooltip点击时，突出部分的宽度，默认10 */
      activeWidth?: number;
      /** 默认为 false; 是否绘制分割线 */
      border?: boolean;
      /** 默认为 2; 分割线宽度，单位为px */
      borderWidth?: number;
      /** 默认为 '#FFFFFF'; 分割线颜色 */
      borderColor?: string;
      /** 默认为 1; 漏斗图主体透明度，默认1 */
      fillOpacity?: number;
      /** 默认为 'right'; 数据标签位置，左侧left、右侧right */
      labelAlign?: 'left' | 'right';
    };
    /** 地图相关配置 */
    map?: {
      /** 默认为 true; 是否绘制分割线 */
      border?: boolean;
      /** 默认为 1; 分割线宽度，单位为px */
      borderWidth?: number;
      /** 默认为 '#666666'; 分割线颜色 */
      borderColor?: string;
      /** 默认为 0.6; 漏斗图主体透明度，默认0.6 */
      fillOpacity?: number;
      /** 默认为 '#f04864'; 分割线颜色 */
      activeBorderColor?: string;
      /** 默认为 '#facc14'; 分割线颜色 */
      activeFillColor?: string;
      /** 默认为 1; 漏斗图主体透明度，默认1 */
      activeFillOpacity?: number;
    };
    /** 条状图相关配置 */
    bar?: {
      /** 默认为 ; 条状图类型：group分组条状图，stack为堆叠条状图开发中 */
      type?: 'group' | 'stack';
      /** 条状图每项的图形宽度，单位为px开发中  */
      width?: boolean;
    };
    /** 标记线相关配置; 在柱状图、折线图、区域图、K线图中额外增加水平直线，仅在opts.enableMarkLine为true时显示 */
    markLine?: {
      /** 默认为 'solid'; 线型 'solid'为实线、'dash'为虚线 */
      type?: 'solid' | 'dash';
      /** 默认为 4px; 单段虚线长度 */
      dashLength?: number;
      /** 辅助线数据，请传入数组类型，支持多条辅助线 */
      data?: {
        /** 辅助线数值注意数据格式 */
        value?: number;
        /** 默认为 '#DE4A42'; 辅助线颜色 */
        lineColor?: string;
        /** 默认为 false; 是否显示数据标签 */
        showLabel?: boolean;
        /** 默认为 '#666666'; 数据标签文字颜色 */
        labelFontColor?: string;
        /** 默认为 '#DFE8FF'; 数据标签背景颜色 */
        labelBgColor?: string;
        /** 默认为 0.8; 数据标签背景颜色透明度 */
        labelBgOpacity?: string;
        /** 默认为 0; 数据标签对应的Y轴索引 */
        yAxisIndex?: string;
      }[];
    };
    /** tooltip相关配置 */
    tooltip?: {
      /**  默认为 true; 是否显示ToolTip方框及文字（一般用于只显示横向或纵向的辅助线） */
      showBox?: boolean;
      /**  默认为 '#000000'; ToolTip背景颜色 */
      bgColor?: string;
      /**  默认为 0.7; ToolTip背景颜色透明度 */
      bgOpacity?: number;
      /** 默认为 'solid'; X轴网格线型 'solid'为实线、'dash'为虚线` */
      gridType?: 'solid' | 'dash';
      /**  默认为 4px; 分割线为虚线时，单段虚线长度 */
      dashLength?: number;
      /**  默认为 '#'; 分割线颜色 */
      gridColor?: string;
      /**  默认为 '#FFFFFF'; 文字颜色 例如#7cb5ec */
      fontColor?: string;
      /**  默认为 false; 是否显示水平横线 */
      horizentalLine?: boolean;
      /**  默认为 false; 是否显示数据标签 */
      xAxisLabel?: boolean;
      /**  默认为 false; 是否显示数据标签 */
      yAxisLabel?: boolean;
      /**  默认为 '#000000'; 数据标签背景颜色 */
      labelBgColor?: string;
      /**  默认为 0.7; 数据标签背景颜色透明度 */
      labelBgOpacity?: number;
      /**  默认为 '#'; 数据标签文字颜色 */
      labelFontColor?: string;
      /**  默认为 '#000000'; 仅柱状图类适用，当前点击柱状图的背景颜色 */
      activeBgColor?: string;
      /**  默认为 0.08; 仅柱状图类适用，当前点击柱状图的背景颜色透明度 */
      activeBgOpacity?: number;
    };
    /** 默认为 '#cccccc'; 图例文案颜色 例如#7cb5ec将变更为opts.legend.fontColor迁移到图例配置里 */
    legendTextColor?: string;
    /** 默认为 20; 图表拖拽时，每秒重新渲染的帧数用于图表拖拽卡顿 */
    touchMoveLimit?: number;
  };
}

class Ucharts {
  constructor(private options: UchartsSetOption);
  /** 更新图表数据, data中更新的数据遵循opts中的数据规范，以上仅为示例，实际可更新opts中所有配置参数。 */
  updateData(options: Partial<UchartsSetOption>): void;
  /** 图例点击交互;如和showToolTip方法共同使用，请将此方法放在showToolTip后，否则将强制关闭animation动画方法。 */
  touchLegend(event: any, options: any): void;
  /** 停止动画效果 */
  stopAnimation(): void;
  /** 添加事件监听 */
  addEventListener(type: string, listener: (...args) => void): void;
  /** 获取图表中点击时的数据序列编号(-1表示未找到对应的数据区域), e: Object 标准事件，需要手动的去绑定touch事件，具体可参考K线图demo中的示例 */
  getCurrentDataIndex(event?: any): number;
  /** getLegendDataIndex(e)获取图例中点击时的数据序列编号(-1表示未找到对应的数据区域), e: Object 标准事件，需要手动的去绑定touch事件，具体可参考K线图demo中的示例 */
  getLegendDataIndex(event?: any): number;
  /** 图表中展示数据详细内容 */
  showToolTip(event?: any, options?: any): void;
  /** 启用滚动条时，放大或缩小屏幕范围内数据数量。参见K线图示例。 */
  zoom(val?: any);
}
export default Ucharts;
