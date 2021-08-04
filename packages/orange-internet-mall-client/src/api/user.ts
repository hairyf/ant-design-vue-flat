/*
 * @Author: Mr.Mao
 * @Date: 2021-04-12 20:40:56
 * @LastEditTime: 2021-05-20 10:12:31
 * @Description: 登录模块
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config';

/** 小程序授权登录 */
export const reqWeChatLogin = (code: string) => {
  return http.post<BaseRes<UserInfo & { openid: string }>>(
    'shop/Auth/codeLogin',
    { code }
  );
};
/** 小程序解密并注册 */
export const reqWeChartRegister = (
  encryptedData: string,
  iv: string,
  openid: string
) => {
  return http.post<BaseRes<UserInfo>>(
    'shop/Auth/codeRegister',
    {
      encryptedData,
      iv,
      openid,
    },
    { params: { loading: true } }
  );
};
/** 小程序解析手机号并注册 */
export const reqAuthCodeLogin = (
  encryptedData: string,
  iv: string,
  openid: string
) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/miniMobileRegister', {
    encryptedData,
    iv,
    openid,
  });
};
/** 小程序绑定账号 */
export const reqAuthAccountBind = (option: {
  account: string;
  password: string;
  openid: string;
}) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/bind', option);
};
/** 修改用户信息 */
export const reqEditUserInfo = (options: {
  nickname?: string | undefined;
  avatar?: string | undefined;
  gender?: Key | undefined;
  birthday?: string | undefined;
}) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/profile', options);
};
/** 重置手机号码 */
export const reqEditPhoneInfo = (mobile: string, verifyCode: string) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/resetMobile', {
    mobile,
    verifyCode,
  });
};
/** 绑定手机号 */
export const reqBindPhoneInfo = (mobile: string, verifyCode: string) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/bindMobile', {
    mobile,
    verifyCode,
  });
};
/** 退出登录 */
export const reqOutLogin = () => {
  return http.get('shop/Auth/logout');
};
/** 账号密码注册 */
export const reqPhoneRegister = (option: {
  account: string;
  password: string;
  repassword: string;
  captcha: string;
  captchakey: string;
  openid?: string;
}) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/registerByAccount', option);
};
/** 手机密码注册 */
export const reqBindPhoneRegister = (option: {
  account: string;
  password: string;
  repassword: string;
  mobile: string;
  verifyCode: string;
  openid?: string;
}) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/registerByMobile', option);
};
/** 手机号图像验证码 */
export const reqGraphicalCode = () => {
  return http.get<BaseRes>('/captcha');
};
/** 手机号登录 */
export const reqPhoneLogin = (mobile: string, verifyCode: string) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/mobileLogin', {
    mobile,
    verifyCode,
  });
};
/** 手机密码登录 */
export const reqPasswordLogin = (mobile: string, password: string) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/login', {
    mobile,
    password,
  });
};
/** 重置密码 */
export const reqResetPasswrod = (
  mobile: string,
  verifyCode: string,
  password: string
) => {
  return http.post<BaseRes<UserInfo>>('shop/Auth/reset', {
    mobile,
    verifyCode,
    password,
  });
};
/** 发送手机验证码 */
export const reqSendCode = (
  mobile: string,
  event:
    | 'registerByThirdMobile'
    | 'registerByMobile'
    | 'resetMobile'
    | 'mobileLogin'
    | 'reset'
) => {
  return http.post(
    'shop/Auth/sendCode',
    { mobile, event },
    { custom: { loading: true } }
  );
};
/** 获取用户收货地址列表 */
export const requserAddress = (options?: any) => {
  return http.post<BaseRes>('shop/AppUser/addressIndex', options, {
    custom: { loading: true },
  });
};
/** 添加修改地址 */
export const requpdateAddress = (data: any) => {
  return http.post<BaseRes>('shop/AppUser/addressAddEdit', data);
};
/** 设置默认地址 */
export const reqsetDefualt = (ids: Key, defaults: Key) => {
  return http.post<BaseRes>('/shop/AppUser/addressDefault', {
    id: ids,
    is_default: defaults,
  });
};
/** 删除地址 */
export const reqdelAddress = (id: Key) => {
  return http.post<BaseRes>('shop/AppUser/AddressDel', { id });
};

/** 获取余额 */
export const reqgetBanlanceLog = (data: any) => {
  return http.get<BaseRes>('shop/ShopUserBalanceLog/getBalanceLog', {
    params: data,
  });
};
/** 购物车列表 */
export const reqGetCartList = (option?: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('shop/AppCart/index', {
    params: option,
    custom: { preventToast: true, loading: true },
  });
};
/** 添加购物车 */
export const reqAddCartList = (option?: AppCartIns) => {
  return http.post<BaseRes>('shop/AppCart/ins', option);
};
/** 减少购物车 */
export const reqDecCartItem = (option: AppCartIns) => {
  return http.post<BaseRes>('shop/AppCart/dec', option);
};
/** 删除购物车 */
export const reqDelCartItem = (option: AppCartIns) => {
  return http.post<BaseRes>('shop/AppCart/del', option);
};
/**改变购物车*/
export const reqChangeartItem = (option: AppCartIns) => {
  return http.post<BaseRes>('shop/AppCart/change', option);
};
/**批量添加购物车*/
export const reqAddCartLists = (option: AppCartList) => {
  return http.post<BaseRes>('shop/AppCart/batchIns', option);
};
/** 收藏列表 */
export const reqCollectList = (option?: CollectList) => {
  return http.get<BaseRes<ListReqOpts>>('shop/AppCollect/index', {
    params: option,
  });
};
/** 添加收藏 */
export const reqAddCollect = (option: number) => {
  return http.post<BaseRes>('shop/AppCollect/collect', {
    goods_id: option,
  });
};
/** 取消收藏 */
export const reqUnCollect = (option: number) => {
  return http.post<BaseRes>('shop/AppCollect/unCollect', {
    goods_id: option,
  });
};
/** 上传头像接口 */
export const reqUpFile = (options: any) => {
  return http.post<BaseRes>('/shop/clientUpload/add', options);
};

/** 领卷中心 */
export const reqAllCouponList = (options: CollectList) => {
  return http.get<BaseRes>('shop/Coupon/index', {
    params: options,
    custom: { loading: true },
  });
};
/** 领取优惠卷 */
export const reqGetCoupon = (id: Key) => {
  return http.post<BaseRes>('shop/Coupon/getCoupon', {
    coupon_id: id,
  });
};
/** 我的优惠卷 */
export const reqGetMyCoupon = (options: CollectList) => {
  return http.get<BaseRes>('shop/ShopUserCoupon/my', {
    params: options,
  });
};
/** 获取商品可用优惠卷 */
export const reqShopCoupon = (id: Key) => {
  return http.get<BaseRes>('shop/Coupon/getGoodCoupons', {
    params: { good_id: id },
  });
};
/** 获取装修页面 */
export const reqGetPage = (options: any) => {
  return http.get<BaseRes>('shop/ShopDiyPage/getPage', options);
};

/** 收藏足迹 */
export const reqReadCollect = () => {
  return http.get<BaseRes>('shop/Label/readCollect');
};
/** 订单统计 */
export const reqOrderCount = () => {
  return http.get<BaseRes>('shop/Label/order');
};
/** 卡劵、余额、积分角标 */
export const reqLabelCount = () => {
  return http.get<BaseRes>('shop/Label/money');
};
/** 获取浏览商品列表 */
export const reqBrowseHistory = (option: any) => {
  return http.get<BaseRes>('shop/AppRead/log', {
    params: option,
  });
};
/** 获取商品浏览记录所在日期 */
export const reqBrowseDate = () => {
  return http.get<BaseRes>('shop/AppRead/label');
};
/** 积分记录 */
export const reqPointsRecord = (options: CollectList) => {
  return http.get<BaseRes>('shop/AppScore/index', {
    params: options,
  });
};
/** 获取可用提现类型 */
export const reqAvailableWithdrawal = () => {
  return http.get<BaseRes>('shop/ShopUserWithdrawal/gotoWithdrawal', {
    custom: { loading: true },
  });
};
/** 立即提现 */
export const reqImmediateWithdrawal = (options: {
  code: Key;
  account?: Key;
  real_name?: Key;
  money: Key;
}) => {
  return http.post<BaseRes>('shop/ShopUserWithdrawal/doWithdrawal', options);
};
/** 进入钱包 */
export const reqWallet = () => {
  return http.get<BaseRes>('shop/ShopPay/goToWallet');
};
/** 获取客服代码或者链接 */
export const reqCustomerService = () => {
  return http.get<BaseRes>('shop/ShopCustomer/getInfo');
};
/* 获取用户信息 */
export const reqUserInfo = () => {
  return http.get<BaseRes>('shop/Auth/getUserInfo');
};
/* 获取用户待付款订单 */
export const reqToBePaid = () => {
  return http.get<BaseRes>('shop/AppOrder/getStayPay');
};
/* 获取城市线ID */
export const reqcityId = (options: {
  provinceName: Key;
  cityName: Key;
  countyName: Key;
}) => {
  return http.post<BaseRes>('shop/Dispatch/getCityId', options);
};
