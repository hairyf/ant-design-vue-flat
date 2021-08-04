<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-28 14:06:14
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<script lang="ts">
import Vue from 'vue';
import store from './store';
export default Vue.extend({
  mpType: 'app',
  globalData: {},
  async onLaunch() {
    // 隐藏原生tabbar
    uni.hideTabBar();
    // 获取公用配置
    store.dispatch('getCommonConfig');
    store.dispatch('getAdmins');
    // 自动进行登录
    try {
      await store.dispatch('getBeOverdueLogin');
      await store.dispatch('refreshUserInfo');
      store.dispatch('getAuthentication');
    } catch (error) {
      await store.dispatch('getUserInfo');
    }
    // 初始化获取余额
    store.dispatch('getBalance');
    // 初始化检测更新
    // #ifdef MP-WEIXIN
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (!res.hasUpdate) {
        return false;
      }
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已准备好, 是否重启应用?',
          success: (res) => {
            res.confirm && updateManager.applyUpdate();
          },
        });
      });
      updateManager.onUpdateFailed(() => {
        uni.showModal({
          title: '已经有新版本咯~',
          content:
            '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~',
        });
      });
    });
    // #endif
  },
  ['siteInfo' as any]: require('./siteinfo'),
});
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';

@import '@/style/iconfont.scss';

@import '@/style/class.scss';
</style>
