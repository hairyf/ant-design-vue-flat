/*
 * @Author: Zhilong
 * @Date: 2021-06-24 16:34:19
 * @LastEditTime: 2021-06-25 15:44:04
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { http } from './http.config'

interface AuthInfo {
  type: number //认证类型：1=企业认证 2=个人认证
  name: string //（法人）姓名
  idcard: string //（法人）身份证号
  phone: string //（法人）联系电话
  address: string //（法人）地址
  idcard_front: string //身份正面
  idcard_back: string //身份背面
  company_name: string //企业名称
  company_code: string //信用代码
  business_license: string //营业执照
}

interface ImageUrl {
  path: string
  url: string
}

interface AuthInfoInGet {
  // 营业执照
  business_license: ImageUrl
  idcard_back: ImageUrl
  idcard_front: ImageUrl
  id: number // id
  // 0=待审核 1=审核通过 2=审核失败
  status: number
  // 拒绝原因
  reason: string
}

/** 获取认证信息
 * @name 彭海 - 获取认证信息
 */
export const reqAuthenticationInfo = () => {
  return http.get<BaseRes<AuthInfo & AuthInfoInGet & Record<string, any>>>('/api/Auth/identity', {
    custom: { preventHandleError: true }
  })
}

/** 提交认证申请
 * @name 彭海 - 提交申请
 */
export const reqAuthenticationCommit = (option: AuthInfo) => {
  return http.post<BaseRes>('api/Auth/apply', option)
}
