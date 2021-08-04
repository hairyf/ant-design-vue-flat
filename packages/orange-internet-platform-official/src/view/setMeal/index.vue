<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 10:07:54
 * @LastEditTime: 2021-07-06 15:31:42
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-tabs v-model:activeKey="activeKey">
    <cal-tab-pane tab="套餐" :key="1">
      <a-card style="max-width: 1450px" class="overflow-x-auto">
        <a-form style="min-width: 1400px">
          <a-form-item label="套餐名称">
            <div class="relative h-72" style="width: 185px">
              <img
                :src="urlList[getUrlNumber(baseData.name)]"
                class="absolute left-0 top-0 w-full h-full z-0"
                alt=""
              />
              <div
                class="
                  absolute
                  left-0
                  top-0
                  bottom-0
                  right-0
                  text-white text-xl
                  flex
                  items-center
                  justify-center
                "
              >
                {{ baseData.name }}
              </div>
            </div>
          </a-form-item>
          <a-form-item label="套餐介绍">
            <!-- <div class="text-sm text-black"> -->
            <!-- 尊享版套餐：<br />
              包含渠道：H5、微信小程序、微信公众号；应用：消息通知、新秀礼、幸运大抽奖、积分签到；主题：翡翠绿、科技蓝、高贵紫；<br /> -->
            <!-- </div> -->
            {{ baseData.remark }}
          </a-form-item>
          <a-form-item label="购买记录">
            <div
              style="width: 1320px"
              class="overflow-hidden rounded-xl border border-opacity-25 border-primary"
            >
              <div class="flex pl-24 text-primary py-6 bg-primary bg-opacity-25">
                <div class="flex-1">套餐名称</div>
                <div class="flex-1">套餐价格</div>
                <div class="flex-1">支付方式</div>
                <div class="" style="flex: 2">购买时间</div>
                <div class="w-80">授权码</div>
                <div class="" style="flex: 1">订单ID</div>
                <div class="" style="flex: 4">订单号</div>
                <!-- <div class="" style="flex: 2">授权码有效期</div> -->
                <div class="" style="flex: 2">授权时间 </div>
                <div class="flex-1">状态</div>
                <div class="" style="flex: 2">操作</div>
              </div>
              <div class="flex pl-24 text-black py-6">
                <div class="flex-1">{{ baseData.name }}</div>
                <div class="flex-1">￥{{ baseData.amount }}</div>
                <div class="flex-1">{{
                  baseData.pay_code === 'WxPay'
                    ? '微信支付'
                    : baseData.pay_code === 'AliPay'
                    ? '支付宝支付'
                    : ''
                }}</div>
                <div class="" style="flex: 2">{{ baseData.finshtime_text }}</div>
                <div class="w-80">{{ baseData?.system?.identity_key || '' }}</div>
                <div class="" style="flex: 1">{{ baseData?.id || '' }}</div>
                <div class="" style="flex: 4">{{ baseData?.sn || '' }}</div>
                <!-- <div class="" style="flex: 1">{{ '' }}</div> -->
                <div class="" style="flex: 2">{{ baseData?.system?.auth_time_text || '' }} </div>
                <div class="flex-1">
                  {{ ['待安装', '待激活', '已激活', '已安装'][baseData?.system?.status] || '' }}
                </div>
                <div class="" style="flex: 2">
                  <span
                    class="
                      text-white text-center text-sm
                      leading-6
                      rounded-full
                      cursor-pointer
                      px-6
                      py-2
                    "
                    @click="downloadSystem"
                    style="background: linear-gradient(90deg, #e89026 0%, #ffc28a 104.61%)"
                  >
                    下载系统
                  </span>
                  <span
                    v-if="baseData?.system?.status === 1"
                    class="
                      text-white text-center text-sm
                      leading-6
                      ml-8
                      rounded-full
                      cursor-pointer
                      px-6
                      py-2
                    "
                    @click="activationSystem"
                    style="background: linear-gradient(90deg, #e89026 0%, #ffc28a 104.61%)"
                  >
                    激活系统
                  </span>
                </div>
              </div>
            </div>
          </a-form-item>
        </a-form>
      </a-card>
    </cal-tab-pane>
    <cal-tab-pane tab="渠道" :key="2">
      <div class="flex items-center">
        <div
          v-for="(item, i) in baseData.channel"
          :key="i"
          class="w-288 pt-56 pb-112 mr-20 bg-white text-center rounded-2xl"
        >
          <img :src="item.logo" class="w-64 h-64 m-auto" />
          <div class="text-xl text-black mb-6 mt-24">{{ item.name }}</div>
          <div class="text-xs text-gray-500">{{ item.remark }}</div>
        </div>
      </div>
    </cal-tab-pane>
    <cal-tab-pane tab="模板" :key="3">
      <div
        class="grid items-center flex-wrap gap-x-28 gap-y-20"
        style="max-width: 1200px; grid-template-columns: repeat(auto-fill, 355px)"
      >
        <div
          v-for="(item, i) in baseData.template"
          :key="i"
          class="relative grid rounded-2xl p-24 overflow-hidden"
          style="grid-template-columns: repeat(auto-fill, 100%)"
        >
          <img
            src="@/assets/img/setMeal/template.png"
            class="absolute top-0 bottom-0 w-full h-full object-cover"
            style="z-index: -1"
          />
          <div class="text-base font-semibold" style="color: #001426">{{ item.name }}</div>
          <div class="flex gap-20 py-20">
            <img
              :src="item.logo"
              class="object-cover"
              style="width: 137px; height: 220px; border-radius: 20px; border: 1px solid #0005"
            />
            <div class="text-sm text-gray-500 brief-text">
              {{ item.remark }}
            </div>
          </div>
        </div>
      </div>
    </cal-tab-pane>
    <cal-tab-pane tab="主题" :key="4">
      <div style="max-width: 1200px">
        <div class="grid gap-20" style="grid-template-columns: repeat(auto-fill, 268px)">
          <template v-for="(item, i) in baseData.backendui" :key="i">
            <ThemeShopItem :option="item" />
          </template>
        </div>
      </div>
    </cal-tab-pane>
    <cal-tab-pane tab="插件" :key="5">
      <div class="flex items-center flex-wrap" style="max-width: 1100px">
        <div
          class="bg-white pt-24 pb-48 mr-20 mb-20 grid gap-20 box-border text-center"
          style="border-radius: 20px; grid-template-columns: repeat(auto-fill, 195px)"
          v-for="(item, index) in baseData.addons"
          :key="index"
        >
          <div class="flex items-center ml-20">
            <img :src="item.logo" alt="" class="w-56 h-56 mr-10 object-cover" />
            <div style="color: #001426" class="text-base font-semibold">{{ item.name }}</div>
          </div>
          <div class="text-gray-500 text-sm brief mx-auto text-left">
            {{ item.remark }}
          </div>
        </div>
      </div>
    </cal-tab-pane>
  </cal-tabs>
</template>
<script setup lang="ts">
  import { blendColor, downloadFile } from '@/utils'
  import ThemeShopItem from './components/ThemeShopItem.vue'
  import CalTabs from '@/components/CustomAntds/CalTabs/index.vue'
  import { onMounted, ref } from 'vue'
  import { reqAuthConfirm, reqBoughtSetMeal, reqDownloadSystemUrl } from '@/api/setMeal'
  import router from '@/router'
  import ImageBule from '@/assets/img/setMeal/bule.png'
  import ImageGolden from '@/assets/img/setMeal/golden.png'
  import ImageViolet from '@/assets/img/setMeal/violet.png'
  import ImageGrey from '@/assets/img/setMeal/grey.png'
  import { message } from 'ant-design-vue'
  /** 页面数据 */
  const baseData = ref<
    {
      template: any[]
      channel: any[]
      backendui: any[]
      addons: any[]
    } & Record<string, any>
  >({
    template: [],
    channel: [],
    backendui: [],
    addons: []
  })

  const getBaseData = async () => {
    try {
      const { data } = await reqBoughtSetMeal()
      baseData.value = data.data
    } catch (error) {
      // message.warning('你还没有购买套餐')
      router.replace('/console/setMeal/payMeal')
    }
  }
  onMounted(() => {
    getBaseData()
  })
  /** 背景列表 */
  const urlList = [ImageBule, ImageGolden, ImageViolet, ImageGrey]

  /** 获取对应值的 唯一数值 */
  const getUrlNumber = (name: string): number => {
    const stringValue = name?.[1] || name?.[0] || 'G'
    return stringValue.charCodeAt(0) % 4
  }

  /** 下载系统 */
  const downloadSystem = async () => {
    try {
      const { data }: { data: { data: string } } = await reqDownloadSystemUrl({
        system_id: baseData.value.system_id
      })
      const strArr = data.data.split('/')
      console.log(data.data)
      downloadFile(data.data, strArr[strArr.length - 1])
    } catch (err) {
      if (err.data.code === 1) {
        router.push('/console/authentication')
      }
    }
  }

  /** 激活系统 */
  const activationSystem = async () => {
    const { data } = await reqAuthConfirm({
      system_id: baseData.value.system_id
    })
    message.success('激活成功')
    getBaseData()
  }
  const activeKey = ref(1)
  const list = ref([
    {
      buy_type: [1, 2],
      content: {
        background: '#ffffff',
        blur: '0',
        color: '#F56A45',
        hollowColor: '',
        linearGradientColor: '',
        mainBackground: '#f0f2f5',
        sideBarColor: '',
        solidColor: '#ffffff',
        text: '阳光橙',
        type: 'system'
      },
      id: 5,
      logo: '123.jpg',
      name: '测试主题',
      pay_status: 1,
      price: '0.01',
      remark: '主题主题主题'
    },
    {
      buy_type: [1, 2],
      content: {
        background: '#ffffff',
        blur: '0',
        color: '#F56A45',
        hollowColor: '',
        linearGradientColor: '',
        mainBackground: '#f0f2f5',
        sideBarColor: '',
        solidColor: '#ffffff',
        text: '阳光橙',
        type: 'system'
      },
      img: '',
      id: 5,
      logo: '123.jpg',
      name: '测试主题',
      pay_status: 1,
      price: '0.01',
      remark: '主题主题主题'
    }
  ])
  // 获取背景渐变色
  const toLinearGradient = (color: string) => {
    return `linear-gradient(\
      180deg,\
      #ffffff 0%,\
      ${blendColor(color, '#ffffff', 0.95)} 45.83%,\
      #ffffff 100%\
    )`
  }
</script>

<style lang="scss" scoped>
  .brief {
    width: 140px;
    height: 65px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  .brief-text {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
