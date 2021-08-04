/*
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-02-01 10:25:59
 * @LastEditTime: 2021-05-21 17:08:56
 * @Description: 友盟+统计配置
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Vue from 'vue';
import umaWx from 'umtrack-wx';
// #ifdef MP-WEIXIN
umaWx.init({
  appKey: '6012223c6a2a470e8f905ba4', // 由友盟分配的APP_KEY
  // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
  // 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
  useOpenid: true,
  // 使用openid进行统计时，是否授权友盟自动获取Openid，
  // 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
  // autoGetOpenid: true,
  debug: false, //是否打开调试模式
  ['uploadUserInfo' as any]: true, // 自动上传用户信息，设为false取消上传，默认为false
  ['enableVerify' as any]: true, // 自动上传用户信息，设为false取消上传，默认为false
});
// #endif

// #ifdef MP-ALIPAY
import umaAlipay from 'umtrack-alipay';
umaAlipay.init({
  appKey: '6012223c6a2a470e8f905ba4',
  debug: true,
});
// #endif

// 避免对其他平台造成影响(默认空对象)
const umaDefault: typeof umaWx = {
  init() {},
  setOpenid() {},
  setUnionid() {},
  trackEvent() {},
};
const $uma = umaWx || umaAlipay || umaDefault;
Vue.prototype.$uma = $uma;
