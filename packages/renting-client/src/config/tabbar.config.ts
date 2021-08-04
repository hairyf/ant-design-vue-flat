/*
 * @Author: liupei
 * @LastEditors: liupei
 */
// 自定义tabbar的配置 通过mixins注入
export const tabbarConfig = {
  data: () => ({
    tabbarList: [
      {
        // 非凸起按钮未激活的图标，可以是uView内置图标名或自定义扩展图标库的图标
        // 或者png图标的【绝对路径】，建议尺寸为80px * 80px
        // 如果是中间凸起的按钮，只能使用图片，且建议为120px * 120px的png图片
        iconPath: '/static/tabbars/home.png',
        // 激活(选中)的图标，同上
        selectedIconPath: '/static/tabbars/home-select.png',
        // 显示的提示文字
        text: '首页',
        // 红色角标显示的数字，如果需要移除角标，配置此参数为0即可
        count: 0,
        // 如果配置此值为true，那么角标将会以红点的形式显示
        isDot: false,
        // 如果使用自定义扩展的图标库字体，需配置此值为true
        // 自定义字体图标库教程：https://www.uviewui.com/guide/customIcon.html
        customIcon: false,
        // 如果是凸起按钮项，需配置此值为true
        midButton: false,
        // 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
        pagePath: '/pages/baseTabBars/homePage', // 1.5.6新增，路径需要以"/"开头
      },
      {
        iconPath: '/static/tabbars/category.png',
        selectedIconPath: '/static/tabbars/category-select.png',

        text: '找房',
        midButton: false,
        customIcon: false,
        pagePath: '/pages/baseTabBars/searchHouse',
      },
      {
        iconPath: '/static/tabbars/publish.png',

        selectedIconPath: '/static/tabbars/publish.png',

        text: '',
        midButton: true,
        customIcon: false,
      },
      {
        iconPath: '/static/tabbars/ready.png',
        selectedIconPath: '/static/tabbars/ready-select.png',
        text: '预约',
        midButton: false,
        customIcon: false,
        pagePath: '/pages/baseTabBars/appointmentList',
      },
      {
        iconPath: '/static/tabbars/personal.png',
        selectedIconPath: '/static/tabbars/personal-select.png',
        text: '我的',
        midButton: false,
        customIcon: false,
        pagePath: '/pages/baseTabBars/personal',
      },
    ],
    tabbarCurrent: 0,
  }),
};
