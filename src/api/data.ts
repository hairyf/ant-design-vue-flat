/*
 * @Author: Mr.wang
 * @Date: 2021-05-12 11:57:24
 * @LastEditTime: 2021-05-14 14:07:45
 * @Description:数据接口
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/** 数据分析统计 */
export const reqDataStatistics = (option: { order_num_time: Key }) => {
  return http.post<BaseRes>('shop/DataAnalysis/dataAnalysisStatistics', option)
}
/** 商品数据 */
export const reqCommodityData = (option: ListReqOpts<{ createtime: Key }>) => {
  return http.post<BaseRes>('shop/DataAnalysis/dataAnalysisStatistics', option)
}
