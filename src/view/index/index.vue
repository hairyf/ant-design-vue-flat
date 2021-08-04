<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-24 09:39:40
 * @LastEditTime: 2021-07-23 17:01:50
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    v-if="false"
    class="flex justify-between items-center rounded-xl bg-primary px-12 h-44 mt-24"
  >
    <div class="relative">
      <div class="absolute w-12 h-12 bg-white rounded-full top-0 bottom-0 m-auto"></div>
      <div class="ml-20 text-white truncate">可更新应用数量：18个</div>
    </div>
    <cal-button size="small" class="h-24">一键更新</cal-button>
  </div>
  <a-row class="mt-12" :gutter="[24, 24]">
    <a-col :xs="14" :xl="7" :xxl="{ span: '10:2' }">
      <cal-card v-if="userInfo?.group_id || 0 > 0" class="h-224 flex justify-center items-center">
        <!-- <div class="text-base truncate">{{2020年5月7日 星期五 10:12:40}}</div> -->
        <div class="text-base truncate" style="margin-top: 18%">
          {{ dayjs(currentTime.now.value).format('YYYY年MM月DD日 HH:mm:ss') }}
        </div>
        <div class="text-2xl mt-10 truncate">欢迎您,{{ name || '服务商' }}</div>
      </cal-card>

      <cal-card v-if="userInfo?.group_id == 0" class="h-224 flex justify-center items-center">
        <!-- <div class="text-base truncate">{{2020年5月7日 星期五 10:12:40}}</div> -->
        <div class="text-base truncate">
          {{ dayjs(currentTime.now.value).format('YYYY年MM月DD日 HH:mm:ss') }}
        </div>
        <div class="text-2xl mt-10 truncate">欢迎您,{{ name || '服务商' }}</div>
        <div class="flex justify-between mt-28">
          <span class="text-sm truncate">
            <span> 当前系统版本： </span>

            {{ systemData?.new_version?.version  || 'v1.0.0' }}
          </span>
          <span
            class="text-sm text-primary cursor-pointer truncate"
            @click="chkNewVersion"
          >
            检测更新
          </span>
        </div>
        <div class="flex justify-between mt-4" v-if="!hasVersion">
          <span class="text-sm truncate">
           已是最新版本
          </span>
        </div>
        <div class="flex justify-between mt-4" v-if="hasVersion">
          <span class="text-sm truncate">
           已检测到新版本
          </span>
          <router-link to="/setting/system?from=1"> <span style="color: red" >前往更新</span></router-link>

        </div>
        <cal-button type="primary" class="mt-20 px-40" @click="$router.go(0)"> 刷新</cal-button>
      </cal-card>
    </a-col>
    <a-col :xs="24" :xl="17" :xxl="{ span: '10:8' }">
      <cal-card class="h-224">
        <a-row class="h-full">
          <a-col class="flex justify-center items-center right-border" :span="6">
            <img
              class="h-72 w-72 mr-28 xs:hidden xxl:block"
              src="@/assets/img/index/index-user-num.png"
            />
            <div v-if="gotoOk.memberTotal">
              <router-link to="/user/userManagement">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.user }}</div>
                <div class="mt-10">会员总数</div>
              </router-link>
            </div>
            <div v-if="!gotoOk.memberTotal">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.user }}</div>
                <div class="mt-10">会员总数</div>

            </div>
          </a-col>
          <a-col class="flex justify-center items-center right-border" :span="6">
            <img
              class="h-72 w-72 mr-28 xs:hidden xxl:block"
              src="@/assets/img/index/index-shop-num.png"
            />
            <div v-if="gotoOk.shopTotal">
              <router-link to="/shop/shopList">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.shop }}</div>
                <div class="mt-10">店铺总数</div>
              </router-link>
            </div>
            <div v-if="!gotoOk.shopTotal">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.shop }}</div>
                <div class="mt-10">店铺总数</div>
            </div>

          </a-col>
          <a-col class="flex justify-center items-center right-border" :span="6">
            <img
              class="h-72 w-72 mr-28 xs:hidden xxl:block"
              src="@/assets/img/index/index-business-num.png"
            />
            <div v-if="gotoOk.useShopTotal">
              <router-link :to="{ path: '/shop/shopList', query: { tab: 1 } }">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.useShop }}</div>
                <div class="mt-10">在营店铺数</div>
              </router-link>
            </div>

            <div v-if="!gotoOk.useShopTotal">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.useShop }}</div>
                <div class="mt-10">在营店铺数</div>
            </div>

          </a-col>
          <a-col class="flex justify-center items-center" :span="6">
            <img
              class="h-72 w-72 mr-28 xs:hidden xxl:block"
              src="@/assets/img/index/index-register-num.png"
            />
            <div v-if="gotoOk.registerTotal">
              <router-link to="/user/userManagement">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.registerUser }}</div>
                <div class="mt-10">注册总数</div>
              </router-link>
            </div>

            <div v-if="!gotoOk.registerTotal">
                <div class="text-center" style="font-size: 40px">{{ statsTotal.registerUser }}</div>
                <div class="mt-10">注册总数</div>
            </div>

          </a-col>
        </a-row>
      </cal-card>
    </a-col>
    <a-col :xs="24" :xxl="{ span: '10:2' }">
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :md="12" :lg="8" :xxl="24">
          <cal-card class="h-160">
            <newlyAddedChart
              v-if="statsLeftNew.newShop.today > 0 || statsLeftNew.newShop.yesterday > 0"
              title="新入驻店铺"
              subTitle="对比"
              :today="statsLeftNew.newShop.today"
              :yesterday="statsLeftNew.newShop.yesterday"
            />

            <newlyAddedChart
              v-if="statsLeftNew.newShop.today == 0 && statsLeftNew.newShop.yesterday == 0"
              title="新入驻店铺"
              subTitle="对比"
              today="0"
              yesterday="0"
            />
          </cal-card>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8" :xxl="24">
          <cal-card class="h-160">
            <newlyAddedChart
              v-if="statsLeftNew.newUser.today > 0 || statsLeftNew.newUser.yesterday > 0"
              title="新注册用户"
              subTitle="对比"
              :today="statsLeftNew.newUser.today"
              :yesterday="statsLeftNew.newUser.yesterday"
            />

            <newlyAddedChart
              v-if="statsLeftNew.newUser.today == 0 && statsLeftNew.newUser.yesterday == 0"
              title="新注册用户"
              subTitle="对比"
              today="0"
              yesterday="0"
            />
          </cal-card>
        </a-col>
        <a-col :xs="24" :md="12" :lg="8" :xxl="24">
          <cal-card class="h-160">
            <newlyAddedChart
              v-if="statsLeftNew.newMember.today > 0 || statsLeftNew.newMember.yesterday > 0"
              title="新增会员数"
              subTitle="对比"
              :today="statsLeftNew.newMember.today"
              :yesterday="statsLeftNew.newMember.yesterday"
            />

            <newlyAddedChart
              v-if="statsLeftNew.newMember.today == 0 && statsLeftNew.newMember.yesterday == 0"
              title="新增会员数"
              subTitle="对比"
              today="0"
              yesterday="0"
            />
          </cal-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :xxl="{ span: '10:8' }">
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :xl="12">
          <cal-card class="h-550">
            <v-charts autoresize class="w-full h-full" :option="growthRateCharts" />
          </cal-card>
        </a-col>
        <a-col :xs="24" :xl="12">
          <cal-card class="h-550">
            <v-charts autoresize class="w-full h-full" :option="orderVolumeCharts" />
          </cal-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :lg="12" :xxl="{ span: '10:3' }">
      <cal-card class="h-477">
        <!-- 先写上 -->
        <div class="addons-rank">
          <div class="header" style="display: flex; justify-content: space-between">
            <div class="header-left">
              <span style="font-size: 18px; font-weight: bold; color: #464646">应用排行</span>
            </div>
            <div class="header-right">
              <a
                href="javascript:;"
                class="tab"
                :class="{ choice: choiceAddons.isActive == 1 ? true : false }"
                @click="tab(1)"
                >最新</a
              >
              <a
                href="javascript:;"
                class="tab"
                :class="{ choice: choiceAddons.isActive == 2 ? true : false }"
                @click="tab(2)"
                >最热</a
              >
               <span v-if="gotoOk.addon">
              <router-link to="/application/purchased" style="color: #8c8c8c">
                全部应用
                <img
                  style="display: inline-block; margin-left: 15px"
                  src="@/assets/img/index/index-solid-triangle.svg"
                  alt=""
                />
              </router-link>
                 </span>

              <span v-if="!gotoOk.addon" style="color: #8c8c8c">
                全部应用
                <img
                    style="display: inline-block; margin-left: 15px"
                    src="@/assets/img/index/index-solid-triangle.svg"
                    alt=""
                />
                 </span>

            </div>
          </div>
          <div class="content" style="margin-top: 30px">
            <ul>
              <li
                v-for="(item, index) in addonsRanking"
                :key="index"
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 1px;
                  margin-bottom: 2px;
                "
              >
                <div class="content-left">
                  <img
                    :src="item.logo"
                    style="
                      border-radius: 37%;
                      width: 45px;
                      height: 47px;
                      display: inline-block;
                      text-align: center;
                      margin-right: 35px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 0"
                    src="@/assets/img/index/gold_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 64px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 1"
                    src="@/assets/img/index/sliver_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 128px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 2"
                    src="@/assets/img/index/copper_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 194px;
                    "
                    alt=""
                  />

                  <span style="font-size: 16px; font-style: normal">
                    {{ item.name }}
                  </span>
                </div>
                <div class="content-right" style="line-height: 62px; font-size: 16px">
                  <span style="color: #8c8c8c">{{ item.sale_num }}件</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </cal-card>
    </a-col>
    <a-col :xs="24" :lg="12" :xxl="{ span: '10:3' }">
      <cal-card class="h-477">
        <!-- 先写上 -->
        <div class="template-rank">
          <div class="header" style="display: flex; justify-content: space-between">
            <div class="header-left">
              <span style="font-size: 18px; font-weight: bold; color: #464646">模板排行</span>
            </div>
            <div class="header-right">
              <a
                href="javascript:;"
                class="tab"
                :class="{ choice: choiceTemplate.isActive == 1 ? true : false }"
                @click="tabTemplate(1)"
                >最新</a
              >
              <a
                href="javascript:;"
                class="tab"
                :class="{ choice: choiceTemplate.isActive == 2 ? true : false }"
                @click="tabTemplate(2)"
                >最热</a
              >
              <span v-if="gotoOk.template">
              <router-link to="/template/purchased" style="color: #8c8c8c">
                全部模板
                <img
                  style="display: inline-block; margin-left: 15px"
                  src="@/assets/img/index/index-solid-triangle.svg"
                  alt=""
                />
              </router-link>
                </span>

              <span v-if="!gotoOk.template" style="color: #8c8c8c">
                全部模板
                <img
                    style="display: inline-block; margin-left: 15px"
                    src="@/assets/img/index/index-solid-triangle.svg"
                    alt=""
                />

                </span>


            </div>
          </div>
          <div class="content" style="margin-top: 30px">
            <ul>
              <li
                v-for="(item, index) in templateRanking"
                :key="index"
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 1px;
                  margin-bottom: 2px;
                "
              >
                <div class="content-left">
                  <img
                    :src="item.logo"
                    style="
                      border-radius: 37%;
                      width: 45px;
                      height: 47px;
                      display: inline-block;
                      text-align: center;
                      margin-right: 35px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 0"
                    src="@/assets/img/index/gold_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 64px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 1"
                    src="@/assets/img/index/sliver_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 128px;
                    "
                    alt=""
                  />
                  <img
                    v-if="index == 2"
                    src="@/assets/img/index/copper_crown.svg"
                    style="
                      width: 28px;
                      height: auto;
                      display: inline-block;
                      position: absolute;
                      left: 59px;
                      top: 194px;
                    "
                    alt=""
                  />

                  <span style="font-size: 16px; font-style: normal">
                    {{ item.name }}
                  </span>
                </div>
                <div class="content-right" style="line-height: 62px; font-size: 16px">
                  <span style="color: #8c8c8c">{{ item.sale_num }}件</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </cal-card>
    </a-col>
    <a-col :xs="24" :xxl="{ span: '10:4' }">
      <cal-card class="h-477">
        <v-charts autoresize class="w-full h-full" :option="settleInCountCharts" />
      </cal-card>
    </a-col>
    <a-col :xs="24" :lg="12">
      <cal-card class="h-353">
        <v-charts autoresize class="w-full h-full" :option="channelSalesCharts" />
      </cal-card>
    </a-col>
    <a-col :xs="24" :lg="12">
      <cal-card class="h-353">
        <v-charts autoresize class="w-full h-full" :option="merchantProfileCharts" />
      </cal-card>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import type { EChartsCoreOption } from 'echarts'
  import { useStore } from 'vuex'
  import { graphic } from 'echarts'
  import { blendColor } from '@/utils'
  import { useDateNow } from 'vue-composable'
  import { message } from 'ant-design-vue'
  import newlyAddedChart from './components/newlyAddedChart.vue'
  import { reqSystemData } from '@/api/setting'
  import { reqIndexStats, reqAddonsRanking, reqTemplateRanking } from '@/api/common'
  import dayjs from 'dayjs'
  import { computed } from 'vue-demi'
  import router from "@/router";
  const userInfo = computed(() => store.state.user.info)
  const name = computed(() => store.state.user.name)

  const store = useStore()


  const gotoOk = ref(
      {
        memberTotal:false,
        shopTotal:false,
        useShopTotal:false,
        registerTotal:false,
        addon:false,
        template:false
      }
  )
  const array:string[] = []
  const getPath = (routes: any[]) => {
    routes.forEach((route) => {
      array.push((route.meta.completePath))
      if (Array.isArray(route.children)) {
        getPath(route.children)
      }
    })
  }
  getPath(router.options.routes);
  gotoOk.value.memberTotal = array.includes('/user/userManagement')
  gotoOk.value.shopTotal = array.includes('/shop/shopList')
  gotoOk.value.useShopTotal = array.includes('/shop/shopList')
  gotoOk.value.registerTotal = array.includes('/user/userManagement')
  gotoOk.value.addon = array.includes('/application/purchased')
  gotoOk.value.template = array.includes('/template/purchased')




  const currentTime = useDateNow()
  const showNewVersion = () => {
    message.success('当前已经是最新版本!')
  }
  const hasVersion = ref(false)
  const systemData = ref<Record<string, any>>({})
  // 系统基本数据
  reqSystemData().then(({ data }) => {
    systemData.value = data.data
    if(data.data?.new_version?.version != data.data?.new_version?.clouds_version)
    {
      hasVersion.value = true;
    }
  })
  function chkNewVersion()
  {
    reqSystemData().then(({ data }) => {
      systemData.value = data.data
      if(data.data?.new_version?.version != data.data?.new_version?.clouds_version)
      {
        hasVersion.value = true;
      }
    })
  }
  const onReload = () => location.reload()

  const growthRateCharts = ref<EChartsCoreOption>({
    title: {
      text: '近7日用户增长率与转化率统计'
    },
    tooltip: {
      trigger: 'axis',
      // borderColor: blendColor(store.state.theme.option.color, '#000000', 0.1),
      // backgroundColor: store.state.theme.option.color,
      textStyle: {
        color: '#001426'
      },
      formatter(list: any) {
        return list
          .map((i: any) => {
            return `

            <div class='flex items-center'>
              <div class='flex items-center'>
                ${i.marker}
                <div>${i.seriesName}</div>
              </div>
              <div class='pl-10'>${i.data}%</div>
            </div>
            `
          })
          .join('')
      }
    },
    legend: {
      textStyle: {
        color: '#8C8C8C'
      },
      // orient: 'vertical',
      align: 'right',
      right: '20px',
      data: [
        {
          name: '增长率',
          itemStyle: {
            color: new graphic.LinearGradient(
              0,
              0,
              1,
              0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: ' #FF5757' },
                { offset: 1, color: ' #FDC5B0' }
              ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
            )
          }
        },
        {
          name: '转化率',
          itemStyle: {
            color: new graphic.LinearGradient(
              1,
              0,
              0,
              0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: ' #9DB9FF' },
                { offset: 1, color: ' #6495F5' }
              ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
            )
          }
        }
      ]
    },
    calculable: true,
    grid: {
      top: '100px',
      left: '35px',
      right: '10px',
      bottom: '40px'
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      data: ['00-00', '00-00', '00-00', '00-00', '00-00', '00-00', '00-00'],
      axisLabel: {
        fontSize: 14,
        color: '#001426',
        margin: 20
      }
    },
    yAxis: {
      name: '单位：%',
      type: 'value',
      nameTextStyle: {
        lineHeight: 60,
        color: '#8c8c8c'
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f5'
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#001426'
      }
    },
    series: [
      {
        name: '增长率',
        type: 'bar',
        barMaxWidth: 10,
        data: [0, 0, 0, 0, 0, 0, 0],
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: ' #FF5757' },
                { offset: 1, color: ' #FDC5B0' }
              ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
            ),
            borderRadius: [100, 100, 0, 0]
          }
        }
      },
      {
        name: '转化率',
        type: 'bar',
        barMaxWidth: 10,
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: ' #9DB9FF' },
                { offset: 1, color: ' #6495F5' }
              ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
            ),
            borderRadius: [100, 100, 0, 0]
          }
        },
        data: [0, 0, 0, 0, 0, 0, 0]
      }
    ]
  })
  const settleInCountCharts = ref<EChartsCoreOption>({
    title: {
      text: '近7日入驻商家统计'
    },
    tooltip: {
      trigger: 'axis',
      borderColor: blendColor(store.state.theme.option.color, '#000000', 0.1),
      backgroundColor: store.state.theme.option.color,
      textStyle: {
        color: '#fff'
      },
      formatter([{ data }]: any) {
        return `<div class='px-6'>${data}</div>`
      }
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      data: ['00-00', '00-00', '00-00', '00-00', '00-00', '00-00', '00-00'],
      axisLabel: {
        fontSize: 14,
        color: '#001426',
        margin: 20
      }
    },
    grid: {
      top: '100px',
      left: '35px',
      right: '10px',
      bottom: '40px'
    },
    yAxis: {
      name: '单位：人',
      type: 'value',
      nameTextStyle: {
        lineHeight: 60,
        color: '#8c8c8c'
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f5'
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#001426'
      }
    },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        type: 'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
          normal: {
            color: store.state.theme.option.color
          }
        }
      }
    ]
  })

  const orderVolumeCharts = ref<EChartsCoreOption>({
    title: {
      text: '近7日订单量统计'
    },
    tooltip: {
      trigger: 'axis',
      borderColor: blendColor(store.state.theme.option.color, '#000000', 0.1),
      backgroundColor: store.state.theme.option.color,
      textStyle: {
        color: '#fff'
      },
      formatter([{ data }]: any) {
        return `<div class='px-6'>${data}</div>`
      }
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      data: ['00-00', '00-00', '00-00', '00-00', '00-00', '00-00', '00-00'],
      axisLabel: {
        fontSize: 14,
        color: '#001426',
        margin: 20
      }
    },
    grid: {
      top: '100px',
      left: '35px',
      right: '10px',
      bottom: '40px'
    },
    yAxis: {
      name: '单位：单',
      type: 'value',
      nameTextStyle: {
        lineHeight: 60,
        color: '#8c8c8c'
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f5'
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#001426'
      }
    },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        type: 'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
          normal: {
            color: store.state.theme.option.color
          }
        }
      }
    ]
  })

  const channelSalesCharts = ref<EChartsCoreOption>({
    title: {
      text: '渠道销售概览'
    },
    tooltip: {
      trigger: 'axis',
      borderColor: blendColor(store.state.theme.option.color, '#000000', 0.1),
      backgroundColor: store.state.theme.option.color,
      textStyle: {
        color: '#fff'
      },
      formatter([{ data }]: any) {
        return `<div class='px-6'>${data.value}</div>`
      }
    },
    grid: {
      top: '55px',
      left: '90px',
      right: '10px',
      bottom: '25px'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      realtimeSort: true,
      inverse: true,
      data: [],
      nameLocation: 'start',
      nameTextStyle: {
        align: 'left',
        verticalAlign: 'top'
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: {
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      },
      type: 'bar',
      barWidth: 10,
      data: []
    }
  })

  const merchantProfileCharts = ref<EChartsCoreOption>({
    title: {
      text: '行业店铺数概览'
    },
    tooltip: {
      trigger: 'axis',
      borderColor: blendColor(store.state.theme.option.color, '#000000', 0.1),
      backgroundColor: store.state.theme.option.color,
      textStyle: {
        color: '#fff'
      },
      formatter([{ data }]: any) {
        return `<div class='px-6'>${data.value}</div>`
      }
    },
    grid: {
      top: '55px',
      left: '60px',
      right: '20px',
      bottom: '25px'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      realtimeSort: true,
      inverse: true,
      data: [],
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: {
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      },
      type: 'bar',
      barWidth: 10,
      data: []
    }
  })
  const statsTotal = ref({
    registerUser: 0,
    shop: 0,
    useShop: 0,
    user: 0
  })

  const statsLeftNew = ref({
    newMember: {
      today: 0,

      yesterday: 0
    },
    newShop: {
      today: 0,

      yesterday: 0
    },
    newUser: {
      today: 0,

      yesterday: 0
    }
  })

  const addonsRanking = ref<any>([])

  const templateRanking = ref([])

  onMounted(() => {
    reqIndexStats().then(({ data }) => {
      statsTotal.value.registerUser = data.data.chunk1.registerUser //注册总数
      statsTotal.value.shop = data.data.chunk1.shop //店铺数
      statsTotal.value.useShop = data.data.chunk1.useShop //在营业店铺数
      statsTotal.value.user = data.data.chunk1.user //会员总数

      statsLeftNew.value.newMember = data.data.chunk2.newMember //新增会员数
      statsLeftNew.value.newShop = data.data.chunk2.newShop //新增入住商家
      statsLeftNew.value.newUser = data.data.chunk2.newUser //新注册用户数
      const color = ['#FDC5B0', '#6495F5', '#B8B5FF', '#FDC5B0', '#FFE0AC']
      //渠道销售概览
      if (data.data.channelSales) {
        const channelSales = data.data.channelSales
        const name = []
        const channels = []

        for (let i = 0; i < channelSales.length; i++) {
          const t = i % 5
          name[i] = {
            value: channelSales[i].name,
            textStyle: {
              padding: [0, 18, 0, 0]
            }
          }
          channels[i] = {
            name: channelSales[i].name,
            value: channelSales[i].sale_num,
            itemStyle: {
              normal: {
                color: color[t],
                borderRadius: 100
              }
            }
          }
        }
        if (name.length > 0) {
          channelSalesCharts.value.yAxis.data = name
        }

        if (channels.length > 0) {
          channelSalesCharts.value.series.data = channels
        }
      }

      //行业店铺数概览
      if (data.data.industry) {
        const industry = data.data.industry
        const name = []
        const industrys = []

        for (let i = 0; i < industry.length; i++) {
          const tmp = i % 5
          name[i] = industry[i].name
          industrys[i] = {
            name: industry[i].name,
            value: industry[i].num,
            itemStyle: {
              normal: {
                color: color[tmp],
                borderRadius: 100
              }
            }
          }
        }
        if (name.length > 0) {
          merchantProfileCharts.value.yAxis.data = name
        }

        if (industrys.length > 0) {
          merchantProfileCharts.value.series.data = industrys
        }
      }

      //近7日用户增长率与转化率统计
      if (data.data.increaseChange) {
        const statDate = []
        const statData = []
        for (const item in data.data.increaseChange) {
          switch (item) {
            case 'conversion':
              const conversion = []
              for (const date in data.data.increaseChange[item]) {
                statDate.push(date)

                conversion.push(data.data.increaseChange[item][date])
              }

              statData.push({
                name: '转化率',
                type: 'bar',
                barMaxWidth: 10,
                data: conversion,
                itemStyle: {
                  normal: {
                    color: new graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                      [
                        { offset: 0, color: ' #9DB9FF' },
                        { offset: 1, color: ' #6495F5' }
                      ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    borderRadius: [100, 100, 0, 0]
                  }
                }
              })
              break
            case 'increase':
              const increase = []
              for (const date in data.data.increaseChange[item]) {
                increase.push(data.data.increaseChange[item][date])
              }
              statData.push({
                name: '增长率',
                type: 'bar',
                barMaxWidth: 10,
                data: increase,
                itemStyle: {
                  normal: {
                    color: new graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                      [
                        { offset: 0, color: ' #FF5757' },
                        { offset: 1, color: ' #FDC5B0' }
                      ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    borderRadius: [100, 100, 0, 0]
                  }
                }
              })
              break
          }
        }
        if (statDate.length > 0) {
          growthRateCharts.value.xAxis.data = statDate
        }
        if (statData.length > 0) {
          growthRateCharts.value.series = statData
        }
      }

      //近7日订单统计
      if (data.data.orderStatistics) {
        const statDate = []
        const statData = []
        for (const item in data.data.orderStatistics) {
          statDate.push(item)
          statData.push(data.data.orderStatistics[item])
        }
        if (statDate.length > 0) {
          orderVolumeCharts.value.xAxis.data = statDate
        }
        if (statData.length > 0) {
          orderVolumeCharts.value.series = [
            {
              data: statData,
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                normal: {
                  color: store.state.theme.option.color
                }
              }
            }
          ]
        }
      }

      //近7日商家统计
      if (data.data.settledMerchant) {
        const statDate = []
        const statData = []
        for (const item in data.data.settledMerchant) {
          statDate.push(item)
          statData.push(data.data.settledMerchant[item])
        }
        if (statDate.length > 0) {
          settleInCountCharts.value.xAxis.data = statDate
        }
        if (statData.length > 0) {
          settleInCountCharts.value.series = [
            {
              data: statData,
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                normal: {
                  color: store.state.theme.option.color
                }
              }
            }
          ]
        }
      }

      //应用排行榜
      if (data.data.addonsRanking) {
        addonsRanking.value = data.data.addonsRanking
      }

      //应用排行榜
      if (data.data.templateRanking) {
        templateRanking.value = data.data.templateRanking
      }
    })
  })

  const choiceAddons = ref({
    isActive: 2
  })

  function tab(v) {
    if (v == 1) {
      choiceAddons.value.isActive = 1
    } else if (v == 2) {
      choiceAddons.value.isActive = 2
    } else {
      choiceAddons.value.isActive = 0
    }
    reqAddonsRanking({ addonsHot: v }).then(({ data }) => {
      if (data.data.addonsRanking) {
        addonsRanking.value = data.data.addonsRanking
      }
    })
  }

  const choiceTemplate = ref({
    isActive: 2
  })
  function tabTemplate(v) {
    if (v == 1) {
      choiceTemplate.value.isActive = 1
    } else if (v == 2) {
      choiceTemplate.value.isActive = 2
    } else {
      choiceTemplate.value.isActive = 0
    }

    reqTemplateRanking({ templateHot: v }).then(({ data }) => {
      if (data.data.templateRanking) {
        templateRanking.value = data.data.templateRanking
      }
    })
  }
</script>
<style lang="scss" scoped>
  .right-border {
    &::after {
      content: '';
      position: absolute;
      right: -0.5px;
      top: 0;
      bottom: 0;
      height: 35px;
      width: 1px;
      margin: auto;
      background-color: #d9d9d9;
    }
  }

  .header-right {
    .tab {
      margin-right: 20px;
      font-weight: bold;
    }
    .choice {
      color: #e89026;
      border-bottom: 2px solid;
      border-bottom-color: #e89026;
    }
  }
</style>
