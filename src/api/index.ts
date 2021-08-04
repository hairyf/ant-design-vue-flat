/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-29 15:27:58
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import store from '@/store';
import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/list")
 */

/** 暴露请求配置 */
export const httpConfig = http.config;
/** 获取公共配置 */
export const reqCommon = (lng?: string, lat?: string) => {
  return http.get('common/init', { params: { lng, lat } });
};
/** 获取热门标签 */
export const reqHotTags = () => {
  return http.get<string[]>('common/keywords');
};
/** 上传接口 */
export const reqUpload = (filePath: string) => {
  const uploadUrl = store.state.common.upload.uploadurl;
  const costoken = store.state.common.upload.multipart.costoken;
  return http.upload<{ url: string; fullurl: string }>(uploadUrl, {
    filePath,
    name: 'file',
    formData: { costoken },
    custom: { loading: true },
  });
};
/** 小程序授权登录 */
export const reqUserInfo = (code: string) => {
  return http.post<UserInfo>(
    'miniprogram/login',
    { code },
    { custom: { errorhandle: false } }
  );
};
/** 授权信息并注册 */
export const reqRegister = (
  encryptedData: string,
  iv: string,
  openid: string
) => {
  return http.post<UserInfo>('miniprogram/register', {
    encryptedData,
    iv,
    openid,
  });
};
/** 手机号登录 */
export const reqMobileLogin = (mobile: string, captcha: string) => {
  return http.post<{ userinfo: UserInfo }>('user/mobilelogin', {
    mobile,
    captcha,
  });
};
/** 授权手机号 */
export const reqAuthPhoneCode = (
  encryptedData: string,
  iv: string,
  openid: string
) => {
  return http.post<UserInfo>('miniprogram/bind_phone', {
    encryptedData,
    iv,
    openid,
  });
};
/** 获取用户信息(token) */
export const reqGetUserInfo = () => {
  return http.get<UserInfo>('user/getUserInfo');
};
/** 修改个人信息 */
export const reqEditUserInfo = (options: {
  nickname?: string;
  avatar?: string;
  gender?: Key;
  birthday?: string;
}) => {
  return http.post<{ userinfo: UserInfo }>('user/profile', options);
};
/** 发送验证码 */
export const reqSendCode = (
  mobile: string,
  event: 'mobilelogin' | 'resetpwd'
) => {
  return http.get('sms/send', { params: { mobile, event } });
};
/** 重置支付密码 */
export const reqResetpwd = (options: {
  newpassword: string;
  comfirmpassword: string;
  mobile: string;
  captcha: string;
}) => {
  return http.post('user/resetpwd', options);
};
/** 验证支付密码 */
export const reqCheckpwd = (comfirmpassword: string) => {
  return http.post(
    'user/checkpwd',
    { comfirmpassword },
    { custom: { loading: true } }
  );
};
/** 房源筛选条件 */
export const reqHouseKeywords = () => {
  return http.get('house/keywords');
};
/** 获取房源列表 */
export const reqHouseList = (
  listOptions?: ReqListOptions<{
    search?: {
      metro?: Key;
      boutique?: Key;
      keyword?: string;
      city_id?: Key;
      area_id?: Key;
      region_id?: Key;
      area?: Key[];
      price?: Key[];
      extra?: Key[];
      status?: string;
    };
  }>
) => {
  const searchOptions = listOptions?.search;
  delete listOptions?.search;
  return http.post<{ data: any[] }>(
    'house/get',
    { search: searchOptions },
    {
      params: listOptions,
      custom: { loading: true },
    }
  );
};
/** 获取轮播图 */
export const reqHouseBanner = () => {
  return http.get<any[]>('common/banner');
};
/** 房源详情 */
export const reqHouseDetail = (id: Key) => {
  return http.get('house/detail', {
    params: { id },
    custom: { loading: true },
  });
};
/** 收藏/取消收藏房源 */
export const reqHouseCollect = (
  house_id: Key,
  action: 'collect' | 'uncollect'
) => {
  return http.get('house/collect', { params: { house_id, action } });
};
/** 获取收藏列表 */
export const reqHouseCollectList = (listOptions: ReqListOptions) => {
  return http.get('house/collectHouse', { params: listOptions });
};
/** 预约看房 */
export const reqAppointCreate = (options: {
  house_id: Key;
  gender: Key;
  appoint_time: string;
  name: string;
  phone: string;
  remark?: string;
}) => {
  return http.post('appoint/create', options, {
    custom: { loading: true },
  });
};
/** 预约看房列表 */
export const reqAppointList = (
  listOptions: ReqListOptions<{ status: Key }>
) => {
  return http.get<{ data: any[] }>('appoint/get', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 预约看房详情 */
export const reqAppointDetail = (id: Key) => {
  return http.get('appoint/detail', { params: { id } });
};
/** 计算租房价格 */
export const reqOrderPre = (house_id: Key) => {
  return http.post('order/pre', { house_id });
};
/** 租房下单 */
export const reqCreateOneOrder = (house_id: Key) => {
  return http.post('order/createOrder', { house_id });
};
/** 我的账单 */
export const reqMyOrderList = (
  listOptions: ReqListOptions<{ status?: number }>
) => {
  return http.get<{ data: any[] }>('order/get', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 支付账单 */
export const reqPaymentOrder = (item_id: string, order_id: string) => {
  return http.post('order/rePay', { item_id, order_id });
};
/** 申请延期 */
export const reqApplyDelay = (options: {
  order_id: Key;
  item_id: Key;
  delay_time: Key;
  delay_reason: string;
}) => {
  return http.post('order/delay', options);
};
/** 获取账单明细 */
export const reqOrderDetail = (order_sn: string) => {
  return http.get('order/detail', {
    params: { order_sn },
    custom: { loading: true },
  });
};
/** 获取保修列表 */
export const reqRepairsList = (
  listOptions: ReqListOptions<{ status: number }>
) => {
  return http.get('repairs/list', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 获取房东报修列表 */
export const reqAdminRepairsList = (
  listOptions: ReqListOptions<{ status: number }>
) => {
  return http.get('repairs/landlord_list', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 房东对报修状态进行修改 */
export const reqAdminEditRepairs = (id: string, status: Key) => {
  return http.get('repairs/landlord_status', { params: { id, status } });
};
/** 获取房东报修详情 */
export const reqAdminRepairsDetail = (id: Key) => {
  return http.get('repairs/landlord_cat', {
    params: { id },
    custom: { loading: true },
  });
};
/** 添加保修项 */
export const reqRepairsAdd = (options: {
  title: string;
  declare: string;
  tel?: string;
  images?: string;
}) => {
  return http.post('repairs/edit', options);
};
/** 获取保修详情 */
export const reqRepairsDetail = (id: Key) => {
  return http.get('repairs/cat_list', {
    params: { id },
    custom: { loading: true },
  });
};
/** 取消保修 */
export const reqRepairsCancel = (id: Key) => {
  return http.get('repairs/cancel', { params: { id } });
};
/** 合同列表 */
export const reqContractList = (listOptions: ReqListOptions) => {
  return http.get('contract/get', { params: listOptions });
};
/** 合同详情 */
export const reqContractDetail = (contract_id: Key) => {
  return http.get('contract/detail', { params: { contract_id } });
};
/** 确认合同 */
export const reqComfirmContract = (contract_id: string) => {
  return http.get('contract/confirm', { params: { contract_id } });
};
/** 获取身份证 */
export const reqIdCard = () => {
  return http.get<Authentication>('id_card/get');
};
/** 保存身份证 */
export const reqIdCardSave = (options: {
  front_image: string;
  back_image: string;
  name: string;
  idcard: string;
}) => {
  return http.post('id_card/set', options);
};
/** 获取我的房源列表 */
export const reqMyHouseList = () => {
  return http.post<any[]>('house/my');
};
/** 获取生活统计 */
export const reqLifeCounts = (
  listOptions: ReqListOptions<{ order_id: Key; type: Key }>
) => {
  return http.get('statistics/detail', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 获取房东信息 */
export const reqOwnerCard = () => {
  return http.get<HouseMasters>('common/getOwnerCard');
};
/** 获取管理端统计 */
export const reqAdminCounts = (time?: Key) => {
  return http.get('statistics/landlord_totle', { params: { time } });
};
/** 获取房东账单 */
export const reqAdminOrders = (
  listOptions: ReqListOptions<{ status?: number; keyword?: string }>
) => {
  return http.get('order/allItem', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 获取所有在租房源 */
export const reqAllOrder = (keyword?: string) => {
  return http.get<Record<string, any[]>>('order/allOrderByChar', {
    params: { keyword },
  });
};
/** 录入水电杂费 */
export const reqHydropower = (options: {
  order_id: Key;
  type: Key;
  last_num: Key;
  now_num: Key;
}) => {
  return http.post('order/hydropower', options);
};
/** 账单催收 */
export const reqUrgeOrder = (item_ids: Key[]) => {
  return http.post('order/urge', { item_ids });
};
/** 退租列表 */
export const reqAftersalesList = (listOptions: ReqListOptions) => {
  return http.get('aftersales/list', {
    params: listOptions,
    custom: { loading: true },
  });
};
/** 退租详情 */
export const reqAftersalesDetail = (order_id: Key) => {
  return http.get('aftersales/detail', { params: { order_id } });
};
/** 申请退租 */
export const reqApplyAftersales = (options: {
  order_id: Key;
  name: string;
  phone: string;
  applytime: string;
}) => {
  return http.post('aftersales/apply', options, {
    custom: { loading: true },
  });
};
/** 取消退租 */
export const reqCancelAftersales = (order_id: Key) => {
  return http.post(
    'aftersales/cancel',
    { order_id },
    { custom: { loading: true } }
  );
};
/** 获取余额 */
export const reqBalance = () => {
  return http.get('user/money');
};
/** 获取消费/支出列表 */
export const reqMoneyLog = (listOptions: ReqListOptions<{ type: string }>) => {
  return http.get('user/moneyLog', { params: listOptions });
};
/** 房东对房源进行上下架 */
export const reqEditHouseStatus = (options: {
  house_ids: Key[];
  action: string;
}) => {
  return http.post('house/status', options, { custom: { loading: true } });
};
/** 延期申请列表 */
export const reqDelayList = (
  listOptions: ReqListOptions<{ status: string }>
) => {
  return http.get('order/delayList', {
    params: listOptions,
    custom: { loading: true },
  });
};
// 同意延期
export const reqAgreeDelay = (delay_id: Key) => {
  return http.post('order/agreeDelay', { delay_id });
};
// 拒绝延期
export const reqRefuseDelay = (delay_id: Key) => {
  return http.post('order/refuseDelay', { delay_id });
};
// 获取市列表
export const reqRegionList = (search?: string) => {
  return http.get('common/region', { params: { search } });
};
// 定位地址
export const reqLocation = () => {
  return http.get('common/location');
};
// 用户角标
export const reqUserMarker = () => {
  return http.get<{ contract: number; order: number; detail: number }>(
    'user/marker'
  );
};
// 生活价格统计
export const reqStatisticsTotle = (order_id: Key) => {
  return http.get<any[]>('statistics/totle', { params: { order_id } });
};
// 获取财务统计列表
export const reqFinanceCounts = (
  listOptions: ReqListOptions<{ type?: Key }>
) => {
  return http.get('statistics/landlord_ditail', {
    params: listOptions,
    custom: { loading: true },
  });
};
// 获取财务统计支出
export const reqAftersalesCounts = (listOptions: ReqListOptions) => {
  return http.get('statistics/aftersales', {
    params: listOptions,
    custom: { loading: true },
  });
};
// 取消账单
export const reqCancelOrder = (order_id: Key, item_id: Key) => {
  return http.post('order/cancel', { order_id, item_id });
};
// 获取房源系列类型  房型 朝向 楼盘等
export const reqHouseSet = () => {
  return http.post('house/set');
};
// 实名审核列表
export const reqRealAudit = (options: {
  status: Key;
  page: Key;
  limit: Key;
}) => {
  return http.post('IdCard/audit', options, { custom: { loading: true } });
};
// 实名认证审核
export const reqRealStatus = (options: { ids: Key; status: Key }) => {
  return http.post('IdCard/status', options);
};
// 房源审核列表
export const reqHousingAuditList = (options: {
  audit: Key;
  limit: Key;
  page: Key;
}) => {
  return http.post('house/MyHouse', options, { custom: { loading: true } });
};
// 房源审核
export const reqAudit = (options: {
  house_id: Key;
  audit: Key;
  remark?: Key;
}) => {
  return http.post('house/audit', options);
};

// 管理员获取我的房源套餐
export const reqHousingPackage = (options: {
  status: Key;
  limit: Key;
  page: Key;
}) => {
  return http.post('setmeal/list', options, { custom: { loading: true } });
};
// 设置购买须知
export const reqSetmeal = (options: { buy_notice: Key }) => {
  return http.post('setmeal/set', options);
};

// 新建房源套餐
export const reqNewSetmeal = (options: {
  title: Key;
  num: Key;
  price: Key;
  status: Key;
  validtime: Key;
  weight: Key;
  meal_id?: Key;
}) => {
  return http.post('setmeal/set', options);
};
// 获取房源套餐
export const reqSetmealGet = () => {
  return http.post('setmeal/get');
};
// 新建房源 保存草稿 提交审核
export const reqHouseRelease = (options: any) => {
  return http.post('house/release', options);
};
// 购买房源套餐下单
export const reqSetmealCreateOrder = (options: { meal_id: any }) => {
  return http.post('order/SetmealCreateOrder', options);
};
// 获取某用户的房源列表
export const reqUserHouseList = (options: {
  limit: any;
  page: any;
  audit: any;
  user_id?: any;
}) => {
  return http.post('house/userList', options, { custom: { loading: true } });
};
// 获取个人头部信息
export const reqHouseUser = (options: { user_id: any }) => {
  return http.post('house/user', options);
};
// 房源套餐上下架
export const reqLoadUnload = (options: { meal_id: Key; status: Key }) => {
  return http.post('setmeal/status', options);
};
// 购买须知和审核设置
export const reqAuditSettings = (options: { name: Key; value: Key }) => {
  return http.post('house/mobileSet', options);
};
// 获取开关设置
export const reqSwitchSettings = () => {
  return http.post('house/mobileGet');
};
// 删除房源套餐
export const reqDeletePackage = (options: { meal_id: Key }) => {
  return http.post('setmeal/delete', options);
};
// 套餐详情
export const reqMealDetail = (options: { meal_id: Key }) => {
  return http.post('setmeal/detail', options);
};
// 删除预约
export const reqAppointmentDelete = (options: { meal_id: Key }) => {
  return http.post('appoint/delete', options);
};
// 删除草稿箱的房源
export const reqHouseDelete = (options: { house_id: Key }) => {
  return http.post('house/delete', options);
};
// 获取地区
export const reqRegionListLinkage = (options: { pid: Key }) => {
  return http.post('house/Area', options);
};
// 更改预约状态
export const reqModifyAppointmentStatus = (options: {
  id: Key;
  status: Key;
}) => {
  return http.post('appoint/status', options);
};
// 查看会员被预约的
export const reqMembersReserved = (options: {
  limit: Key;
  page: Key;
  status: Key;
}) => {
  return http.post('appoint/gets', options, { custom: { loading: true } });
};
