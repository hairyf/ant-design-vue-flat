/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-03-03 16:18:32
 * @LastEditTime: 2021-06-10 14:07:22
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
type AntDesignVueFlat = typeof import('../package/components')
// components.d.ts
declare module 'vue' {
  export interface GlobalComponents extends AntDesignVueFlat {
    RouterLink: typeof import('vue-router').RouterLink
    RouterView: typeof import('vue-router').RouterView
    AAffix: typeof import('ant-design-vue').Affix
    AAnchor: typeof import('ant-design-vue').Anchor
    AAutoComplete: typeof import('ant-design-vue').AutoComplete
    AAlert: typeof import('ant-design-vue').Alert
    AAvatar: typeof import('ant-design-vue').Avatar
    ABackTop: typeof import('ant-design-vue').BackTop
    ABadge: typeof import('ant-design-vue').Badge
    ABreadcrumb: typeof import('ant-design-vue').Breadcrumb
    AButton: typeof import('ant-design-vue').Button
    ACalendar: typeof import('ant-design-vue').Calendar
    ACard: typeof import('ant-design-vue').Card
    ACollapse: typeof import('ant-design-vue').Collapse
    ACarousel: typeof import('ant-design-vue').Carousel
    ACascader: typeof import('ant-design-vue').Cascader
    ACheckbox: typeof import('ant-design-vue').Checkbox
    ACol: typeof import('ant-design-vue').Col
    ADatePicker: typeof import('ant-design-vue').DatePicker
    ADivider: typeof import('ant-design-vue').Divider
    ADropdown: typeof import('ant-design-vue').Dropdown
    AForm: typeof import('ant-design-vue').Form
    AIcon: typeof import('ant-design-vue').Icon
    AInput: typeof import('ant-design-vue').Input
    AInputNumber: typeof import('ant-design-vue').InputNumber
    ALayout: typeof import('ant-design-vue').Layout
    AList: typeof import('ant-design-vue').List
    ALocaleProvider: typeof import('ant-design-vue').LocaleProvider
    AMenu: typeof import('ant-design-vue').Menu
    AMentions: typeof import('ant-design-vue').Mentions
    AModal: typeof import('ant-design-vue').Modal
    APagination: typeof import('ant-design-vue').Pagination
    APopconfirm: typeof import('ant-design-vue').Popconfirm
    APopover: typeof import('ant-design-vue').Popover
    AProgress: typeof import('ant-design-vue').Progress
    ARadio: typeof import('ant-design-vue').Radio
    ARate: typeof import('ant-design-vue').Rate
    ARow: typeof import('ant-design-vue').Row
    ASelect: typeof import('ant-design-vue').Select
    ASlider: typeof import('ant-design-vue').Slider
    ASpin: typeof import('ant-design-vue').Spin
    AStatistic: typeof import('ant-design-vue').Statistic
    ASteps: typeof import('ant-design-vue').Steps
    ASwitch: typeof import('ant-design-vue').Switch
    ATable: typeof import('ant-design-vue').Table
    ATransfer: typeof import('ant-design-vue').Transfer
    ATree: typeof import('ant-design-vue').Tree
    ATreeSelect: typeof import('ant-design-vue').TreeSelect
    ATabs: typeof import('ant-design-vue').Tabs
    ATag: typeof import('ant-design-vue').Tag
    ATimePicker: typeof import('ant-design-vue').TimePicker
    ATimeline: typeof import('ant-design-vue').Timeline
    ATooltip: typeof import('ant-design-vue').Tooltip
    AUpload: typeof import('ant-design-vue').Upload
    ADrawer: typeof import('ant-design-vue').Drawer
    ASkeleton: typeof import('ant-design-vue').Skeleton
    AComment: typeof import('ant-design-vue').Comment
    AConfigProvider: typeof import('ant-design-vue').ConfigProvider
    AEmpty: typeof import('ant-design-vue').Empty
    AResult: typeof import('ant-design-vue').Result
    ADescriptions: typeof import('ant-design-vue').Descriptions
    APageHeader: typeof import('ant-design-vue').PageHeader
    ASpace: typeof import('ant-design-vue').Space
    AImage: typeof import('ant-design-vue').Image
    ATypography: typeof import('ant-design-vue').Typography
  }
}
export {}
