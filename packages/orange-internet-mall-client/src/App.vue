<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-14 15:34:33
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { onLaunch } from 'uni-composition-api';
export default Vue.extend({
  mpType: 'app',
  globalData: {},
  ['siteInfo' as any]: require('./config/siteinfo'),
  setup() {
    onLaunch(async () => {
      store.dispatch('getShopCommon');
      store.dispatch('getTemplateInfo');
      if (store.getters.isAuthUserInfo) {
        store.dispatch('getMoney');
      }
    });
  },
});
</script>

<style lang="scss">
/* 字体图标内容 */
@import '@/style/iconfonts/client-admin.css';
@import '@/style/iconfonts/client.css';
@import '@/style/iconfonts/official.css';
@import '@/style/iconfonts/third-party.css';

/* 每个页面公共css */
@import 'uview-ui/index.scss';
@import '@/style/class.scss';

view-image {
  display: block;
}
effect-text-frame {
  display: flex;
  flex: 1;
}
</style>
