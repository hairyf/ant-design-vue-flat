<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-03-01 15:49:46
 * @LastEditTime: 2021-03-01 15:49:47
 * @Description: 页面路径
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <el-tabs class="custom-tabs" v-model="currentTab">
      <el-tab-pane label="基本页面" name="base"></el-tab-pane>
      <el-tab-pane label="订单页面" name="order"></el-tab-pane>
      <el-tab-pane label="插件页面" name="plugins"></el-tab-pane>
      <el-tab-pane label="自定义页面" name="custom"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableInfo" style="width: 100%">
      <el-table-column prop="pageName" label="页面名称" width="180"></el-table-column>
      <el-table-column prop="accountLink" label="微信公众号链接">
        <template #default="scope">
          <div class="custom-col">
            <i class="ad-official-account left-icon" />
            <span class="link">{{ scope.row.accountLink }}</span>
            <el-link type="primary">
              <i class="ad-lianjie" />
              <span>链接</span>
            </el-link>
            <el-link type="primary">
              <i class="ad-ico" />
              <span>二维码</span>
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="appletsLink" label="微信小程序链接" width="500">
        <template #default="scope">
          <div class="custom-col">
            <i class="ad-applets left-icon" />
            <span class="link">{{ scope.row.appletsLink }}</span>
            <el-link type="primary">
              <i class="ad-lianjie" />
              <span>链接</span>
            </el-link>
            <el-link type="primary">
              <i class="ad-ico" />
              <span>二维码</span>
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  const currentTab = ref('base')
  const tableInfo = reactive([
    {
      pageName: '默认页面',
      accountLink:
        'https://www.100cms.com.cn/addons/renren_shop/public/index.php?r=wap&shop_id=195/&_route=/pagesCommission/index/index',
      appletsLink: '/pagesCommission/index/index'
    },
    {
      pageName: '分类导航',
      accountLink:
        'https://www.100cms.com.cn/addons/renren_shop/public/index.php?r=wap&shop_id=195/&_route=/pagesCommission/index/index',
      appletsLink: '/pagesCommission/index/index'
    },
    {
      pageName: '全部商品',
      accountLink:
        'https://www.100cms.com.cn/addons/renren_shop/public/index.php?r=wap&shop_id=195/&_route=/pagesCommission/index/index',
      appletsLink: '/pagesCommission/index/index'
    }
  ])
</script>
<style lang="scss" scoped>
  .el-table__row {
    &:hover {
      .left-icon {
        color: #03d96a;
      }
      .el-link {
        display: initial;
      }
    }
  }
  .custom-col {
    .left-icon {
      margin-right: 12px;
    }
    .link {
      display: inline-block;
      // @include text-ellipsis(600px);
    }
    .el-link {
      display: none;
      margin-left: 25px;
      i {
        margin-right: 6px;
      }
    }
  }
</style>
