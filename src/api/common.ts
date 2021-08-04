/*
 * @Author: Zhilong
 * @Date: 2021-06-25 09:53:40
 * @LastEditTime: 2021-06-25 10:34:55
 * @Description:公共接口
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { forIn } from 'lodash'
import { http } from './http.config'

/** 单文件上传
 * @naem 单文件上传_张耀
 */
export const reqUpload = (option: {
  // 上传文件
  file: File
  // 大类型 1:图片 2:音频 3:视频
  group_type: string
  // 小类型 1:用户头像 2:身份证 3:营业执照
  type: string
}) => {
  const formData = new FormData()
  forIn(option, (v, k) => formData.append(k, v))
  return http.post('/api/UserClientUpload/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/** 图片上传
 *
 * @param option file,type
 *  @param file { File }
 *  @param type { number} 1:用户头像 2:身份证 3:营业执照
 * @returns 上传成功的图片
 */
export const reqImageUpload = (option: {
  // 上传文件
  file: File
  // 小类型 1:用户头像 2:身份证 3:营业执照
  type: string
}) => reqUpload({ ...option, group_type: '1' })

/** 音频上传
 *
 * @param option file,type
 *  @param file { File }
 *  @param type { number} 1:用户头像 2:身份证 3:营业执照
 * @returns 上传成功的音频
 */
export const reqAudioUpload = (option: {
  // 上传文件
  file: File
  // 小类型 1:用户头像 2:身份证 3:营业执照
  type: string
}) => reqUpload({ ...option, group_type: '2' })

/** 视频上传
 *
 * @param option file,type
 *  @param file { File }
 *  @param type { number} 1:用户头像 2:身份证 3:营业执照
 * @returns 上传成功的视频
 */
export const reqVideoUpload = (option: {
  // 上传文件
  file: File
  // 小类型 1:用户头像 2:身份证 3:营业执照
  type: string
}) => reqUpload({ ...option, group_type: '3' })
