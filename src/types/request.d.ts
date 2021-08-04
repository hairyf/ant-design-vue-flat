/*
 * @Author: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-11 09:51:02
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* 请求配置/响应的补充说明 */
interface BaseRes<T = any> {
  code: number;
  data: T;
  msg: string;
  timestamp: number;
}
type ListReqOpts<T = { [key: string]: any }> = {
  page?: number;
  limit?: number;
  search?: string;
} & T;

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  realname: string;
  mobile: string;
  avatar: string;
  money: string;
  score: number;
  total_score: number;
  total_manpower_money: string;
  total_recharge_money: string;
  total_withdrawal_money: string;
  successions: number;
  maxsuccessions: number;
  prevtime: number;
  logintime: number;
  loginip: string;
  loginfailure: number;
  joinip: string;
  jointime: number;
  token: string;
  status: number;
  shop_id: number;
  gender: number;
  current_shop_user_level_id: number;
  current_shop_user_level_name: string;
  current_shop_user_level_weight: number;
  last_recharge_time: number;
  last_withdrawal_time: number;
  last_buy_time: number;
  last_consumption_time: number;
  total_order_nums: number;
  total_order_money: string;
  total_refund_nums: number;
  total_refund_money: string;
  user_channel_id: number;
  createtime: number;
  updatetime: number;
  version: number;
  parent_id: number;
  parent_type: number;
  deletetime: number;
  birthday: number;
  avatar_text: string;
}
interface AppCartIns {
  goods_id: string;
  sku_id: string | array;
  num?: any;
  price?: Key;
}
type AppCartList<T = { [key: string]: any }> = {
  goods_id: string;
  sku_id: string | array;
  num?: any;
  price?: Key;
} & T;
type CollectList<T = { [key: string]: any }> = {
  page?: number;
  limit?: number;
  search?: any;
  order?: string;
  sort?: string;
} & T;
interface Recharge {
  code: string;
  money: number | string;
}

interface ShopComment {
  goods_id?: number | string;
  page?: number;
  limit?: number;
}

type TNotice = {
  serach?: {
    title: string;
  };
  limit?: number;
  page?: string | number;
  order?: string;
  sort?: string;
};

interface TemplateInfo<T> {
  id: number;
  shop_id: number;
  manager_id: number;
  shop_template_id: number;
  name: string;
  img: string | null;
  content: T | null; //模板内容
  sale_type: number;
  style_type: number;
  is_publish: number;
  publish_time: number;
  shop_channel_code: 'H5' | 'WechatApplets' | 'Wechat'[];
  expire_time: number;
}

type ScreenParameter = {
  id?: string;
  page?: number;
  limit?: number;
  search?: any;
  order?: string;
  ordersort?: string;
  marketing_tab?: string | number;
  postage?: number | string;
  havestock?: number | string;
  price?: Array;
  express_freights?: number;
  classId?: number | string;
  title?: string;
  groupId?: string | number;
};
interface ListRes {
  current_page: number;
  data: any[];
  last_page: number;
  per_page: number;
  total: number;
  status: Key;
  link: string;
  value: Record<string, any>;
  [key: string]: any;
}
interface Common {
  register: {
    bind_phone: string;
    scene: string[];
  };
  customer: {
    customer_content: string;
  };
  feedback: {
    product_id: string;
  };
  shopset: {
    shopStatus: {
      run_status: Runstatus;
      business_hours: {
        type: string;
        value: string[];
      };
      index_data: string;
    };
    shopSet: {
      shop_name: string;
      logo: string;
      service_phone: string;
      introduce: string;
      load_image: Runstatus;
      image_preview: string;
      copyright: Runstatus;
    };
    registerSet: {
      agreement: string;
      title: string;
      content: string;
    };
    auth: {
      auth_login: string;
      show_login: string;
    };
  };
  depositWithdrawal: {
    deposit: {
      balance_txt: string;
      lowest_deposit_money: string;
      switch: string;
    };
    withdrawal: {
      auto_pay: string;
      fee_exemption: string[];
      lowest_withdrawal_money: string;
      service_fee: string;
      service_fee_type: string;
      single_highest_withdrawal_money: string;
      switch: string;
      withdrawal_examine: string;
      withdrawal_sum: string;
      withdrawal_type: string[];
    };
  };
  commentSet: {
    is_open_comment: string;
    is_show_comment: string;
    is_check_comment: string;
  };
  OrderBaseParam: {
    cancelOrder: {
      type: string;
      value: string;
    };
    affirmTakeDeliveryTime: {
      type: string;
      value: string;
    };
    affirmTakeDeliveryProtect: {
      type: string;
      value: string;
    };
    cancelSafeguard: {
      type: string;
      value: string;
    };
    safeguardAutomation: {
      type: string;
      value: string;
    };
    toApplyForRightsOvertime: {
      type: string;
      value: string;
    };
    trading_enhance: string;
  };
}
interface Runstatus {
  type: string;
  value: string;
}
