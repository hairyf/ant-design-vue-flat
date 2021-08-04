/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 09:30:44
 * @LastEditTime: 2021-05-11 15:29:33
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* modules-types 统一命名规范
 * 常量前缀采用动词, 后缀为对应的数据名称
 * export const RECEIVE_[DATA_NAME] = receive_[data_name] ->  接收并覆盖某个数据
 * export const MODIFY_[DATA_NAME] = modify_[data_name] ->  修改某个数据或数据项
 * export const DELETE_[DATA_NAME] = delete_[data_name] -> 删除某个数据或数据项
 * export const UNSHIFT_[DATA_NAME_ITEM] = unshift_[data_name_item] -> 向某个数据前端添加一项数据
 * export const PUSH_[DATA_NAME_ITEM] = push_[data_name_item] -> 向某个数据后端添加一项数据
 */

// 用户信息相关
export const RECEVE_USER_INFO = 'receve_user_info';
export const DELETE_USER_INFO = 'delete_user_info';
export const MODIFY_USER_TYPE = 'modify_user_type';
export const RECEVE_USER_OPEN_ID = 'receve_user_open_id';
export const DELETE_USER_OPEN_ID = 'delete_user_open_id';
export const RECEVE_AUTH_PHONE_CODE = 'receve_auth_phone_code';

// 购物车相关
export const RECEIVE_CART = 'receive_cart';
export const DELECT_CART_ITEMS = 'delect_cart_items';
export const UNSHIFT_CART_ITEM = 'unshift_cart_item';
export const MODIFY_CART_ITEM_COUNT = 'modify_cart_item_count';

// 配置相关
export const RECEIVE_COMMON = 'receive_common';

// 钱包信息
export const RECEVE_MONEY_INFO = 'receve_money_info';
export const DELECT_MONEY_INFO = 'delect_money_info';

// 模板相关
export const RECEIVE_TEMPLATE = 'receive_template';
