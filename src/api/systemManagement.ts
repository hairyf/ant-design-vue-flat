/*
 * @Author: Mr.wang
 * @Date: 2021-06-22 14:36:25
 * @LastEditTime: 2021-06-25 17:39:19
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 获取支付配置 */
export const reqPaymentAllocation = (option: { key: Key }) => {
  return http.post<BaseRes>('admin/Config/getPay', option)
}
/** 设置支付配置 */
export const reqSetPayment = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('admin/Config/setPay', option)
}

/** 获取存储设置 */
export const reqSaveSetting = (option: { key?: Key }) => {
  return http.post<BaseRes>('admin/Config/getCdn', option)
}
/** 设置存储设置 */
export const reqSetStorage = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('admin/Config/setCdn', option)
}

/** 获取管理员权限树 */
export const reqPermissionTree = () => {
  return http.get<BaseRes>('admin/Auth/tree')
}
/** 角色列表 */
export const reqRoleList = (option: ListReqOpts) => {
  return http.get<BaseRes>('admin/ManagerGroup/index', { params: option })
}

/** 角色详情 */
export const reqRoleDetails = (option: { id: any }) => {
  return http.get<BaseRes>('admin/ManagerGroup/read', { params: option })
}

/** 角色添加 */
export const reqAddRole = (option: { name: Key; rules: Key[]; explain: Key }) => {
  return http.post<BaseRes>('admin/ManagerGroup/add', option)
}

/** 角色编辑 */
export const reqEditRole = (option: { name: Key; rules: Key[]; explain: Key; id: any }) => {
  return http.post<BaseRes>('admin/ManagerGroup/edit', option)
}

/** 角色删除 */
export const reqRoleDelete = (option: { ids: any[] }) => {
  return http.post<BaseRes>('admin/ManagerGroup/delete', option)
}

/** 角色启用禁用 */
export const reqRoleStartupDisabled = (option: { ids: any[]; params: any }) => {
  return http.post<BaseRes>('admin/ManagerGroup/multi', option)
}
/** 角色下拉选择器 */
export const reqRoleDropDown = (option: ListReqOpts) => {
  return http.get<BaseRes>('admin/ManagerGroup/select', { params: option })
}

/** 员工列表 */
export const reqStaffList = (option: ListReqOpts) => {
  return http.get<BaseRes>('admin/Manager/index', { params: option })
}

/** 员工详情 */
export const reqStaffDetails = (option: { id: any }) => {
  return http.get<BaseRes>('admin/Manager/read', { params: option })
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
  return http.post<BaseRes>('admin/Manager/add', option)
}

/** 员工修改 */
export const reqEditStaff = (option: {
  nickname: Key
  username: Key
  password: Key
  repassword: Key
  mobile: Key
  group_id: Key
  id: Key
}) => {
  return http.post<BaseRes>('admin/Manager/edit', option)
}

/** 员工删除 */
export const reqStaffDelete = (option: { ids: any[] }) => {
  return http.post<BaseRes>('admin/Manager/delete', option)
}

/** 员工启用禁用 */
export const reqStaffStartupDisabled = (option: { ids: any[]; params: any }) => {
  return http.post<BaseRes>('admin/Manager/multi', option)
}
/** 员工下拉选择器 */
export const reqStaffDropDown = (option: ListReqOpts) => {
  return http.get<BaseRes>('admin/Manager/select', { params: option })
}
/** 应用分类列表 */
export const reqAddonsClassIndex = () => {
  return http.post<BaseRes>('admin/AddonsClass/index')
}
/** 删除应用分类 */
export const reqAddonsClassDel = (option: { ids: number | number[] }) => {
  return http.post<BaseRes>('admin/AddonsClass/del', option)
}
/** 修改应用分类状态 */
export const reqAddonsClassEditStatus = (option: { ids: number; status: number }) => {
  return http.post<BaseRes>('admin/AddonsClass/editStatus', option)
}
/** 添加编辑应用分类 */
export const reqAddonsClassEdit = (option: { dataAll: any[] }) => {
  return http.post<BaseRes>('admin/AddonsClass/edit', option)
}
/** 模板分类列表 */
export const reqTemplateClassIndex = () => {
  return http.post<BaseRes>('/admin/TemplateClass/index')
}
/** 删除模板分类 */
export const reqTemplateClassDel = (option: { ids: number | number[] }) => {
  return http.post<BaseRes>('admin/TemplateClass/del', option)
}
/** 修改模板分类状态 */
export const reqTemplateClassEditStatus = (option: { ids: number; status: number }) => {
  return http.post<BaseRes>('admin/TemplateClass/editStatus', option)
}
/** 添加编辑模板分类 */
export const reqTemplateClassEdit = (option: { dataAll: any[] }) => {
  return http.post<BaseRes>('admin/TemplateClass/edit', option)
}
/** 短信配置设置 */
export const reqSMSSettings = (option: { status: Key; key: Key; value: any }) => {
  return http.post<BaseRes>('admin/Config/setSms', option)
}
/** 获取短信配置 */
export const reqGetSMSConfiguration = (option: { key: string }) => {
  return http.post<BaseRes>('admin/Config/getSms', option)
}

/** 设置系统基础设置 */
export const reqSystemSettings = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('admin/Config/setBasics', option)
}
/** 获取系统基础设置 */
export const reqGetSystem = () => {
  return http.post<BaseRes>('admin/Config/getBasics')
}

/** 短信管理 */
export const reqSMSManagementList = (option: ListReqOpts) => {
  return http.post<BaseRes<ListRes>>('admin/Sms/index', option)
}

/** 修改短信模板状态 */
export const reqSMSUpdateStatus = (option: { id: Key; status: Key }) => {
  return http.post<BaseRes>('admin/Sms/updateStatus', option)
}

/** 修改短信模板ID */
export const reqSMSTemplate = (option: { id: Key; signature_title: Key; template_id: Key }) => {
  return http.post<BaseRes>('admin/Sms/smsParam', option)
}
