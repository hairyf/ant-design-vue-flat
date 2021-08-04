/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-14 15:39:52
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* 工具类出口文件 */

import { reqCustomerService } from '@/api';
import store from '@/store';
import { linkOption } from 'orange-components-config/options';
import { paramsAnaly, navigateTo, PLATFORM, redirectTo } from '.';

export * from './uni-utils';
export * from './common';
/**
 * 颜色混合器
 * @param colorOne 颜色值
 * @param colorTwo 颜色值
 * @param ratio 混合比例
 * @returns 颜色
 */
export const blendColour = (
  colorOne: string,
  colorTwo: string,
  ratio: number
) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  const r1 = parseInt(colorOne.substring(1, 3), 16);
  const g1 = parseInt(colorOne.substring(3, 5), 16);
  const b1 = parseInt(colorOne.substring(5, 7), 16);
  const r2 = parseInt(colorTwo.substring(1, 3), 16);
  const g2 = parseInt(colorTwo.substring(3, 5), 16);
  const b2 = parseInt(colorTwo.substring(5, 7), 16);
  let r: string | number = Math.round(r1 * (1 - ratio) + r2 * ratio);
  let g: string | number = Math.round(g1 * (1 - ratio) + g2 * ratio);
  let b: string | number = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ('0' + (r || 0).toString(16)).slice(-2);
  g = ('0' + (g || 0).toString(16)).slice(-2);
  b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
};
/**
 * 将 hex 颜色转成 rgb
 * @param hex
 * @param opacity
 * @returns rgba String
 */
const hexToRgba = (hex: string, opacity: number) => {
  const RGBA =
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')';
  return {
    red: parseInt('0x' + hex.slice(1, 3)),
    green: parseInt('0x' + hex.slice(3, 5)),
    blue: parseInt('0x' + hex.slice(5, 7)),
    rgba: RGBA,
  };
};
/**
 * 获取全局主题色
 * @param color 颜色值
 */
export const getThemeColor = (color: string) => {
  const cssLightVariables: Record<string, string> = {};
  const cssLightOpacitys: Record<string, string> = {};
  cssLightVariables['--color-primary'] = color;
  for (let i = 1; i < 10; i++) {
    const cssLightVariable = `--color-primary-light-${i}`;
    const cssLightOpacity = `--color-primary-light-opacity-${i}`;
    cssLightVariables[cssLightVariable] = blendColour(
      '#ffffff',
      color,
      1 - i / 10
    );
    cssLightOpacitys[cssLightOpacity] = hexToRgba(color, 1 - i / 10).rgba;
  }
  return {
    cssLightVariables: cssLightVariables as CssLightVariableType,
    cssLightOpacitys: cssLightOpacitys as CssLightOpacityType,
  };
};
/**
 * 获取对应模板信息
 * @param type 模板类型
 * @param id 自定义模板id
 * @returns 模板视图列表
 */
export const getTemplateInfo = (type: string, id?: string) => {
  const { views } = store.state.common;
  const result = views.find((v) => {
    if (typeof id === 'undefined') {
      return v.type === type;
    }
    return v.type === type && v.id === id;
  });
  if (typeof result === 'undefined') {
    console.error({
      dataSource: views,
      info: '数据源的type中没有对应' + type + '的数据',
      errCode: -1,
    });
    return {
      data: [],
      info: '没有对应' + type + '的数据',
      errCode: -1,
    };
  }
  console.log(`%c${type}装修 => `, 'color: #3489fd', {
    data: result.content,
    info: '成功',
    errCode: 0,
  });
  return { data: result.content, info: '', errCode: 0 };
};

/**
 * 如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
 * @param unit 单元
 * @returns string
 */
export const analyUnit = (unit: string | number) => {
  return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'rpx';
};
/** 处理跳转客服 */
export const naviToServe = async () => {
  const { data } = await reqCustomerService();
  if (!data.data.content) {
    uni.$u.toast('当前客服并未配置');
    return false;
  }
  if (PLATFORM === 'h5') {
    window.open(data.data.content);
  } else {
    navigateTo('/pages/commons/h5BasePage', {
      url: encodeURIComponent(data.data.content),
    });
  }
  return false;
};
/** 处理跳转反馈 */
export const naviToFeedback = () => {
  if (!store.state.common.feedback?.product_id) {
    uni.$u.toast('当前反馈并未配置');
    return false;
  }
  const url = `https://support.qq.com/product/${store.state.common.feedback?.product_id}`;
  // 微信跳转
  if (PLATFORM === 'mp-weixin') {
    uni.navigateToMiniProgram({
      appId: 'wx8abaf00ee8c3202e',
      extraData: {
        id: store.state.common.feedback?.product_id,
      },
    });
    return false;
  }
  if (PLATFORM === 'h5') {
    window.open(url);
    return false;
  }
  navigateTo('/pages/commons/h5BasePage', {
    url: encodeURIComponent(url),
    title: '反馈',
  });
};
/**
 * 仅处理Option对应的相关数据
 * @param link 对应配置相关数据
 */
export const handleLink = async (link: Partial<typeof linkOption>) => {
  console.log(link);
  // 没有类型 不执行
  if (!link?.type) {
    uni.$u.toast('当前商家还未配置');
    return;
  }
  // 微信小程序自己处理客服
  if (link.type === 'serve' && PLATFORM === 'mp-weixin') return;
  // 是否需要登录
  if (link.value?.login && !store.getters.isAuthUserInfo) {
    uni.$emit('show-login-modal-default');
    return;
  }
  // 是否为客服链接
  if (link.type === 'serve') {
    naviToServe();
    return false;
  }
  // 是否为反馈链接
  if (link.type === 'feedback') {
    naviToFeedback();
    return false;
  }
  // 进行跳转
  if (link.value?.path) {
    navigateTo(paramsAnaly(link.value.path, link.value.params));
    return false;
  }
  console.error('无法跳转 =>', {
    errorCode: -1,
    dataSource: link,
    info: 'value.path => ' + link.value?.path,
  });
};
/**
 * 拼接静态资源字符串
 * @param name 拼接图片名称
 */
export const spliceStaticUrl = (name: string) => {
  return `https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/${name}`;
};

/**
 * 根据当前环境跳转登录页面
 */
export const redirectToLogin = () => {
  const strategy: Partial<Record<NonNullable<UniPlatforms>, any>> = {
    h5: () => redirectTo('/pages/users/authLogin'),
    'mp-weixin': () => redirectTo('/pages/users/authWeChat'),
  };
  PLATFORM && strategy[PLATFORM]?.();
};
