/*
 * @Author: Mr.wang
 * @Date: 2021-03-29 16:32:37
 * @LastEditTime: 2021-05-10 17:37:16
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/** 订单列表 */
export const reqOrderList = (option: orderQuery<{ page: number; limit: number }>) => {
  return http.post<BaseRes>('shop/Order/orderIndex', option)
}
/** 日志 */
export const reqjournalData = (option: { order_id: Key; title?: Key }) => {
  return http.post<BaseRes>('shop/Order/orderLog', option)
}
/** 编辑备注 */
export const reqEditNotes = (option: { id: Key; memo: string }) => {
  return http.post<BaseRes>('shop/Order/orderRemark', option)
}
/** 关闭订单 */
export const reqCloseOrder = (option: { id: Key; desc: string }) => {
  return http.post<BaseRes>('shop/Order/orderClose', option)
}
/** 订单详情 */
export const reqOrderDetail = (option: { id: any }) => {
  return http.post<BaseRes>('shop/Order/orderDetail', option)
}
/** 验证登录密码 */
export const reqVerification = (option: { confirmPwd: Key }) => {
  return http.post<BaseRes>('business/Auth/checkPwd', option)
}
/** 确认收货 */
export const reqConfirmRCeceipt = (option: { id: Key }) => {
  return http.post<BaseRes>('shop/Order/orderConfirmReceipt', option)
}
/** 确认付款 */
export const reqConfirmPayment = (option: { id: Key }) => {
  return http.post<BaseRes>('shop/Order/orderConfirmPayment', option)
}
/** 改价 */
export const reqPriceChange = (option: { id: Key; param: Key[]; remark: Key }) => {
  return http.post<BaseRes>('shop/Order/orderAlterPrice', option)
}

/** 查看单个物流 */
export const reqViewLogistics = (option: {
  send_express_company_code?: Key
  send_express_sn?: Key
}) => {
  return http.post<BaseRes>('shop/Order/snLogistics', option)
}

/** -维权详情 */
export const reqProtectionDetails = (option: { id: any; order_item_id: any }) => {
  return http.post<BaseRes>('shop/Order/afterSalesDetail', option)
}
/** 同意维权退款 */
export const reqAgreeRefund = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
  type: Key
}) => {
  return http.post<BaseRes>('shop/Order/applyAfterSalesRefund', option)
}
/** 驳回申请 */
export const reqRejectionApplication = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
  remark: string
}) => {
  return http.post<BaseRes>('shop/Order/afterSalesCancel', option)
}
/** 确认收货退款 */
export const reqConfirmReceiptRefund = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
}) => {
  return http.post<BaseRes>('shop/Order/applyAfterSalesLogisticsReceive', option)
}
/** 同意维权发送退货地址 */
export const reqSendReturnAddress = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
  shopAddresId: Key
}) => {
  return http.post<BaseRes>('shop/Order/applyAfterSalesSalesReturnAddres', option)
}

/** 发货 */
export const reqDeliverGoods = (option: { param: any[] }) => {
  return http.post<BaseRes>('shop/Order/orderPromptlyShipments', option)
}
/** 物流公司 */
export const reqLogisticsCompany = (option: ListReqOpts) => {
  return http.post<BaseRes>('shop/Order/logisticsList', option)
}
/** 协调记录 */
export const reqNegotiationRecord = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
}) => {
  return http.post<BaseRes>('shop/Order/afterSaleLog', option)
}
/** 商家退货地址 */
export const reqReturnAddressList = (option: ListReqOpts<{ id?: Key }>) => {
  return http.post<BaseRes>('shop/Dispatch/shopReturnAddressIndex', option)
}
/** 退款 */
export const reqRefund = (option: { params: any[] }) => {
  return http.post<BaseRes>('shop/Order/orderRefund', option)
}

/** 修改收货地址 */
export const reqshippingAddress = (option: {
  id: Key
  phone: string
  consignee: string
  province_name: string
  city_name: string
  area_name: string
  address: string
  province_id: string
  city_id: string
  area_id: string
}) => {
  return http.post<BaseRes>('shop/Order/orderEditAddress', option)
}

/** 获取评价列表 */
export const reqEvaluationList = (option: ListReqOpts<{ search: any; order: Key; sort: Key }>) => {
  return http.get<BaseRes>('shop/comment/index', { params: option })
}
/** 评价详情 */
export const reqEvaluationDetails = (option: { id: Key }) => {
  return http.get<BaseRes>('shop/comment/read', { params: option })
}
/** 评价详情商品历史评价 */
export const reqHistoricalEvaluation = (option: { id: Key }) => {
  return http.get<BaseRes>('shop/comment/history', { params: option })
}
/** 评价-删除 */
export const reqEvaluationDeletion = (option: { ids: Key[] }) => {
  return http.post<BaseRes>('shop/comment/delete', option)
}
/** 评价状态-审核/精选 */
export const reqModifyState = (option: { ids: Key[]; params: any }) => {
  return http.post<BaseRes>('shop/comment/multi', option)
}
/** 评价-编辑 */
export const reqEvaluationEditor = (option: { id: Key; reply_content: Key; status: Key }) => {
  return http.post<BaseRes>('shop/comment/edit', option)
}
/** 批量发货列表 */
export const reqBulkDeliveryList = (option: ListReqOpts) => {
  return http.post<BaseRes>('shop/Order/batchDeliveryIndex', option)
}
/** 批量发货 */
export const reqBulkDelivery = (option: FormData) => {
  return http.post<BaseRes>('shop/Order/batchDelivery', option, {
    headers: {
      ['Content-Type']: 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}
/** 批量发货错误导出 */
export const reqExportError = (option: { batch_id: Key }) => {
  return http.get<BaseRes>('shop/Order/deriveBatchDelivery', {
    params: option,
    responseType: 'arraybuffer'
  })
}
/** 订单导出 */
export const reqOrderExport = (option: { title: any; where: any }) => {
  return http.get<BaseRes>('shop/Order/deriveOder', { params: option, responseType: 'arraybuffer' })
}
/** 确认收货并发货 */
export const reqReceiveDeliver = (option: {
  order_id: Key
  order_item_id: Key
  order_after_sale_id: Key
  send_express_company: Key
  send_express_company_code: Key
  send_express_sn: Key
}) => {
  return http.post<BaseRes>('shop/Order/applyAfterSalesLogisticsAnewShipments', option)
}
/** 下载物流公司对照表 */
export const reqComparisonTable = () => {
  return http.post<BaseRes>('shop/Order/logisticsTemplate')
}
/** 下载模板文件 */
export const reqTemplateFile = () => {
  return http.post<BaseRes>('shop/Order/logisticsCompanyTemplate')
}
/** 订单慨览 */
export const reqOrderReview = (option: { order_num_time: Key; order_money_time: Key }) => {
  return http.post<BaseRes>('shop/Order/orderOverview', option)
}
