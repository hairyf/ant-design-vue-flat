/*
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-28 10:48:42
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* 请求配置/响应的补充说明 */
interface ListOpts {
  per_page: number;
  current_page: number;
  has_more: boolean;
  next_item: boolean;
  data: any[];
}
interface UserInfo {
  nickname: string;
  avatar: string;
  token: string;
  user_id: number;
  createtime: number;
  expiretime: number;
  expires_in: number;
  mobile: string;
  gender: string;
  openid: string;
  birthday: string;
  group_id: Key;
  isset_pwd: Key;
  meal_total: number;
}
type ReqListOptions<T = WillObject> = {
  limit?: Key;
  page?: Key;
} & T;
interface Commons {
  name: string;
  logo: string;
  citydata: {
    id: number;
    pid: number;
    shortname: string;
    name: string;
    mergename: string;
    level: number;
    pinyin: string;
    code: string;
    zip: string;
    first: string;
    lng: string;
    lat: string;
  };
  versiondata?: any;
  uploaddata: {
    uploadurl: string;
    cdnurl: string;
    savekey: string;
    maxsize: string;
    mimetype: string;
    multiple: boolean;
    chunking: boolean;
    chunksize: number;
    bucket: string;
    multipart: {
      costoken: string;
    };
    storage: string;
    uploadmode: string;
  };
  coverdata?: any;
}
interface Authentication {
  type: 1 | 2;
  back_image: string;
  back_image_text: string;
  createtime: number;
  front_image: string;
  front_image_text: string;
  id: Key;
  idcard: string;
  name: string;
  updatetime: number;
  user_id: Key;
}
interface HouseMasters {
  list: { name: string; phone: string }[];
  first: { name: string; phone: string };
}
