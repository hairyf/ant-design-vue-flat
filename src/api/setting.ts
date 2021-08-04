/*
 * @Author: Mr.wang
 * @Date: 2021-06-02 10:12:45
 * @LastEditTime: 2021-07-10 15:48:00
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 获取存储设置 */
export const reqSaveSetting = (option: { key?: Key }) => {
  return http.post<BaseRes>('business/Config/getCdn', option)
}
/** 设置存储设置 */
export const reqSetStorage = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setCdn', option)
}
/** 获取容量配置 */
export const reqCapacitySettings = () => {
  return http.post<BaseRes>('business/Config/getCapacitySize')
}
/** 设置容量配置 */
export const reqSetCapacity = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setCapacitySize', option)
}
/** -获取附件设置 */
export const reqAttachmentSettings = () => {
  return http.post<BaseRes>('business/Config/getAttachment')
}
/** 设置附件设置 */
export const reqSetNearby = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setAttachment', option)
}
/** 行业分类列表 */
export const reqIndustryClassIndex = () => {
  return http.post<BaseRes>('business/IndustryClass/index')
}
/** 删除行业分类 */
export const reqIndustryClassDel = (option: { ids: number | number[] }) => {
  return http.post<BaseRes>('business/IndustryClass/del', option)
}
/** 修改行业分类状态 */
export const reqIndustryClassEditStatus = (option: { ids: number; status: number }) => {
  return http.post<BaseRes>('business/IndustryClass/editStatus', option)
}
/** 添加编辑行业分类 */
export const reqIndustryClassEdit = (option: { dataAll: any[] }) => {
  return http.post<BaseRes>('business/IndustryClass/edit', option)
}
/** 应用分类列表 */
export const reqAddonsClassIndex = () => {
  return http.post<BaseRes>('business/AddonsClass/index')
}
/** 删除应用分类 */
export const reqAddonsClassDel = (option: { ids: number | number[] }) => {
  return http.post<BaseRes>('business/AddonsClass/del', option)
}
/** 修改应用分类状态 */
export const reqAddonsClassEditStatus = (option: { ids: number; status: number }) => {
  return http.post<BaseRes>('business/AddonsClass/editStatus', option)
}
/** 添加编辑应用分类 */
export const reqAddonsClassEdit = (option: { dataAll: any[] }) => {
  return http.post<BaseRes>('business/AddonsClass/edit', option)
}
/** 模板分类列表 */
export const reqTemplateClassIndex = () => {
  return http.post<BaseRes>('/business/TemplateClass/index')
}
/** 删除模板分类 */
export const reqTemplateClassDel = (option: { ids: number | number[] }) => {
  return http.post<BaseRes>('business/TemplateClass/del', option)
}
/** 修改模板分类状态 */
export const reqTemplateClassEditStatus = (option: { ids: number; status: number }) => {
  return http.post<BaseRes>('business/TemplateClass/editStatus', option)
}
/** 添加编辑模板分类 */
export const reqTemplateClassEdit = (option: { dataAll: any[] }) => {
  return http.post<BaseRes>('business/TemplateClass/edit', option)
}
/** 获取系统基础设置 */
export const reqSystemBasic = () => {
  return http.post<BaseRes>('business/Config/getBasics')
}
/** 设置系统基础设置 */
export const reqSetBasic = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setBasics', option)
}
/** 获取店铺设置 */
export const reqShopSetting = (option: { key: Key }) => {
  return http.post<BaseRes>('business/Config/getShopSet', option)
}
/** 设置店铺设置 */
export const reqSetShop = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setShopSet', option)
}
/** 获取支付配置 */
export const reqPaymentAllocation = (option: { key: Key }) => {
  return http.post<BaseRes>('business/Config/getPay', option)
}
/** 设置支付配置 */
export const reqSetPayment = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setPay', option)
}

/** 获取短信配置 */
export const reqSMSConfiguration = (option: { key: string }) => {
  return http.post<BaseRes>('business/Config/getSms', option)
}
/** 短信配置设置 */
export const reqSetShortMessage = (option: { status: Key; key: string; value: any }) => {
  return http.post<BaseRes>('business/Config/setSms', option)
}
/** 服务商通知列表 */
export const reqSMSIndex = (option: ListReqOpts<{ type: Key }>) => {
  return http.post<BaseRes>('business/Sms/index', option)
}
/** 商户通知列表 */
export const reqSMSIndexShop = (option: ListReqOpts<{ type: Key }>) => {
  return http.post<BaseRes>('business/Sms/indexShop', option)
}
/** 短信列表 */
export const reqServicesShopOrderBuySmsIndex = (option: ListReqOpts) => {
  return http.post<BaseRes>('business/ServicesShopOrder/buySmsIndex', option)
}
/** 短信列表取消订单 */
export const reqServicesShopOrderBuySmsIndexCancel = (option: {
  id: Key
  order_remark: string
}) => {
  return http.post<BaseRes>('business/ServicesShopOrder/buySmsIndexCancel', option)
}
/** 短信列表确认支付 */
export const reqServicesShopOrderBuySmsConfirmPayment = (option: {
  id: Key
  admin_pay_remark: string
}) => {
  return http.post<BaseRes>('business/ServicesShopOrder/buySmsConfirmPayment', option)
}
/** 短信套餐获取 */
export const reqConfigGetSmsSetMeal = () => {
  return http.post<BaseRes>('business/Config/getSmsSetMeal')
}
/** 短信套餐设置 */
export const reqConfigSetSmsSetMeal = (option: { [key: string]: any }) => {
  return http.post<BaseRes>('business/Config/setSmsSetMeal', option)
}
/** 修改短信模板状态 */
export const reqSMSUpdateStatus = (option: { id: Key; status: Key }) => {
  return http.post<BaseRes>('business/Sms/updateStatus', option)
}
/** 修改短信模板ID */
export const reqSMSSmsParam = (option: { id: Key; template_id: Key; signature_title: Key }) => {
  return http.post<BaseRes>('business/Sms/smsParam', option)
}
/** 短信发送测试 */
export const reqSMSSendTest = (option: { sign: string; mobile: string }) => {
  return http.post<BaseRes>('business/Sms/sendTest', option)
}
/** 容量管理列表 */
export const reqCapacityManagementList = (option: ListReqOpts<{ name: Key }>) => {
  return http.get<BaseRes>('business/Capacity/index', { params: option })
}
/** 获取管理员权限树 */
export const reqPermissionTree = () => {
  return http.get<BaseRes>('business/Services/tree')
}
/** 角色列表 */
export const reqRoleList = (option: ListReqOpts) => {
  return http.get<BaseRes>('business/StaffRole/index', { params: option })
}

/** 角色详情 */
export const reqRoleDetails = (option: { id: any }) => {
  return http.get<BaseRes>('business/StaffRole/read', { params: option })
}

/** 角色添加 */
export const reqAddRole = (option: { name: Key; rules: Key[]; explain: Key }) => {
  return http.post<BaseRes>('business/StaffRole/add', option)
}

/** 角色编辑 */
export const reqEditRole = (option: { name: Key; rules: Key[]; explain: Key; id: any }) => {
  return http.post<BaseRes>('business/StaffRole/edit', option)
}

/** 角色删除 */
export const reqRoleDelete = (option: { ids: any[] }) => {
  return http.post<BaseRes>('business/StaffRole/delete', option)
}

/** 角色启用禁用 */
export const reqRoleStartupDisabled = (option: { ids: any[]; params: any }) => {
  return http.post<BaseRes>('business/StaffRole/multi', option)
}
/** 角色下拉选择器 */
export const reqRoleDropDown = (option: ListReqOpts) => {
  return http.get<BaseRes>('business/StaffRole/select', { params: option })
}

/** 员工列表 */
export const reqStaffList = (option: ListReqOpts) => {
  return http.get<BaseRes>('business/Staff/index', { params: option })
}

/** 员工详情 */
export const reqStaffDetails = (option: { id: any }) => {
  return http.get<BaseRes>('business/Staff/read', { params: option })
}

/** 员工添加 */
export const reqAddStaff = (option: {
  name: Key
  username: Key
  password: Key
  repassword: Key
  mobile: Key
  group_id: Key
}) => {
  return http.post<BaseRes>('business/Staff/add', option)
}

/** 员工修改 */
export const reqEditStaff = (option: {
  name: Key
  username: Key
  password: Key
  repassword: Key
  mobile: Key
  group_id: Key
  id: Key
}) => {
  return http.post<BaseRes>('business/Staff/edit', option)
}

/** 员工删除 */
export const reqStaffDelete = (option: { ids: any[] }) => {
  return http.post<BaseRes>('business/Staff/delete', option)
}

/** 员工启用禁用 */
export const reqStaffStartupDisabled = (option: { ids: any[]; params: any }) => {
  return http.post<BaseRes>('business/Staff/multi', option)
}
/** 员工下拉选择器 */
export const reqStaffDropDown = (option: ListReqOpts) => {
  return http.get<BaseRes>('business/Staff/select', { params: option })
}

/** 设置服务商联系方式 */
export const reqSetContact = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setContactWay', option)
}

/** 获取服务商联系方式 */
export const reqContactWay = () => {
  return http.post<BaseRes>('business/Config/getContactWay')
}

/** 套餐信息 */
export const reqPackageInformation = () => {
  return http.get<BaseRes>('business/System/info')
}

/** 系统续费支付下单 */
export const reqRenewOrder = (option: {
  service_manager_id: Key
  associate_id: Key
  type: Key
  code: Key
}) => {
  return http.post<BaseRes>('business/product/pay', option)
}

/** 系统信息 */
export const reqSystemData = () => {
  return http.get<BaseRes>('business/system/sysinfo')
}

/** 系统更新请求 */
export const reqSystemUpdate = (option: { unique_key: Key }) => {
  return http.post<BaseRes>('business/System/update', option)
}

/** 下载安装文件 */
export const reqUpdateIng = (option: {
  secret: Key
  unique_key: Key
  download_path: Key
  download_host: Key
  version_code: Key
}) => {
  return http.post<BaseRes>('business/System/updateIng', option, {
    custom: { preventHandleError: true }
  })
}
/** 系统更新记录 */
export const reqUpdateRecord = (option: { version: Key }) => {
  return http.get<BaseRes>('business/system/vrecord', { params: option })
}

/** 安装操作 */
export const reqInstallationOperation = (option: {
  secret: Key
  unique_key: Key
  version_code: Key
}) => {
  return http.post<BaseRes>('business/System/updatePackage', option)
}
