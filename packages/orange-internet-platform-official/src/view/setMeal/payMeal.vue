<!--
 * @Author: Zhilong
 * @Date: 2021-06-21 18:25:52
 * @LastEditTime: 2021-06-24 15:14:42
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="purchase-package">
    <div class="text-center" style="font-size: 22px">选择套餐</div>
    <div class="my-28 tips-box">一个账号只能购买一个套餐，请选择所需套餐</div>
    <swiper
      :autoplay="swiper_options.autoplay"
      :loop="swiper_options.loop"
      :speed="swiper_options.speed"
      :pagination="swiper_options.pagination"
      class="mx-auto swiper-box"
    >
      <swiper-slide v-for="(n, index) in Math.ceil(setMealList?.length / 4) || 1" :key="index">
        <div class="flex items-center">
          <div
            :class="list[index1].frame"
            class="relative meal-box overflow-hidden"
            style="border-radius: 20px"
            v-for="(item, index1) in setMealList.slice(index * 4, (index + 1) * 4)"
            :key="index1"
          >
            <img :src="list[index1].img" alt="" class="absolute meal-img" />
            <div class="text-box" style="font-size: 22px">{{ item.name }}</div>
            <div class="text-box">
              <span style="font-size: 34px">{{ item.price }}</span>
              <span class="text-sm">元/永久</span>
            </div>
            <div class="px-20 mt-20 pb-28 w-full box-border">
              <div class="text-sm">套餐简介</div>
              <div class="hide-text">
                {{ item.remark }}
              </div>
              <div class="flex items-center justify-between mt-24">
                <div>渠道</div>
                <div
                  class="color-text text-xs scale-75 cursor-pointer text-primary"
                  @click="viewDetails(0)"
                >
                  {{ item.channel }}个渠道
                </div>
              </div>
              <div class="flex items-center justify-between mt-24">
                <div>店铺模板</div>
                <div
                  class="color-text text-xs scale-75 cursor-pointer text-primary"
                  @click="viewDetails(1)"
                >
                  {{ item.template }}个模板
                </div>
              </div>
              <div class="flex items-center justify-between mt-24">
                <div>插件应用</div>
                <div
                  class="color-text text-xs scale-75 cursor-pointer text-primary"
                  @click="viewDetails(2)"
                >
                  {{ item.addons }}个插件
                </div>
              </div>
              <div class="flex items-center justify-between mt-24">
                <div>主题皮肤</div>
                <div
                  class="color-text text-xs scale-75 cursor-pointer text-primary"
                  @click="viewDetails(3)"
                >
                  {{ item.backendui }}个主题
                </div>
              </div>
              <div class="purchase-btn" :class="list[index1].btn" @click="purchase(item)">
                立即购买
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <!-- 套餐详情模态框 -->
  <a-modal
    v-model:visible="visible"
    title="查看详细套餐"
    wrapClassName="modality-box"
    width="864px"
  >
    <cal-tabs>
      <cal-tab-pane tab="渠道" :key="1">
        <div class="flex items-center mt-16">
          <div class="flex items-center">
            <i class="pf-h5 text-3xl mr-14" style="color: #ff800b"></i>
            H5
          </div>
          <div class="flex items-center ml-36">
            <i class="pf-xcx text-3xl mr-14" style="color: #00dfb9"></i>
            微信小程序
          </div>
          <div class="flex items-center ml-36">
            <i class="pf-wx text-2xl mr-14" style="color: #09bb07"></i>
            微信公众号
          </div>
        </div>
      </cal-tab-pane>
      <cal-tab-pane tab="模板" :key="2">
        <div class="flex flex-wrap">
          <div v-for="(item, index) in 6" :key="index" class="mr-24 mb-8 mt-4">
            <img
              src="@/assets/img/setMeal/imgGrey.png"
              alt=""
              class="w-240 h-144 mb-20"
              style="border: 2px solid rgba(232, 144, 38, 0.5); border-radius: 20px"
            />
            <div class="text-black text-sm text-center">模板名称</div>
          </div>
        </div>
      </cal-tab-pane>
      <cal-tab-pane tab="插件" :key="3">
        <div class="flex items-center flex-wrap">
          <div class="flex items-center mr-32 mt-8 mb-14" v-for="(item, index) in 10" :key="index">
            <img src="@/assets/img/setMeal/imgGrey.png" alt="" class="w-28 w-28 mr-16" />
            <div class="text-black text-sm">消息通知</div>
          </div>
        </div>
      </cal-tab-pane>
      <cal-tab-pane tab="主题" :key="4">
        <div class="flex items-center flex-wrap">
          <div class="flex items-center mr-32 mt-8 mb-14" v-for="(item, index) in 10" :key="index">
            <img
              src="@/assets/img/setMeal/imgGrey.png"
              alt=""
              class="w-32 h-32 mr-14"
              style="border-radius: 12px"
            />
            <div class="text-black text-sm">翡翠绿</div>
          </div>
        </div>
      </cal-tab-pane>
    </cal-tabs>
    <template #footer>
      <div></div>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
  import SwiperCore, { Autoplay, Pagination } from 'swiper'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/swiper.min.css'
  import 'swiper/components/pagination/pagination.scss'
  import { ref, defineEmit, onMounted } from 'vue'
  import imgGray from '@/assets/img/setMeal/imgGrey.png'
  import imgBule from '@/assets/img/setMeal/imgBule.png'
  import imgViolet from '@/assets/img/setMeal/imgViolet.png'
  import imgOrange from '@/assets/img/setMeal/imgOrange.png'
  import CalTabs from '@/components/CustomAntds/CalTabs/index.vue'
  import { useRouter } from 'vue-router'
  import { reqSetMealList } from '@/api/setMeal'
  import { ConsolePayment } from '@/components/Business/ConsolePayment'
  const emit = defineEmit()
  /** 购买套餐列表 */
  const setMealList = ref<any[]>([])
  onMounted(async () => {
    const { data } = await reqSetMealList({ limit: 100 })
    setMealList.value = data.data.data
  })
  SwiperCore.use([Autoplay, Pagination])
  const router = useRouter()
  const swiper_options = ref({
    autoplay: {
      // 自动滚动的时间
      // delay: 3000,
      disableOnInteraction: false
    },
    // 是否循环
    loop: false,
    // 滑动的时间
    speed: 500,
    pagination: {
      // 是否点击指示点切换
      clickable: true
    }
  })
  const paymentType = ref(1)
  const visible = ref(false)
  const paymentShow = ref(false)
  // 0是选择支付方式 1是微信支付 2是支付成功
  const currentType = ref(0)
  // 购买选择的item
  const payItem = ref<any>({})
  // 循环类名
  const list = ref([
    { img: imgGray, frame: 'gray-frame', btn: 'gray-btn' },
    { img: imgBule, frame: 'bule-frame', btn: 'bule-btn' },
    { img: imgViolet, frame: 'violet-frame', btn: 'violet-btn' },
    { img: imgOrange, frame: 'orange-frame', btn: 'orange-btn' }
  ])
  // 立即购买套餐
  const purchase = async (item: any) => {
    const { payStatus } = await ConsolePayment({
      type: 5,
      id: item.id,
      title: '购买系统',
      price: item.price
    })
    if (payStatus) router.replace('/console/')
  }
  // 查看套餐详情
  const viewDetails = (num: number) => {
    // 0是渠道 1是模板 2是插件 3是主题
    visible.value = true
  }
  //  立即购买按钮
  const purchaseBtn = () => {
    if (paymentType.value == 1) {
      currentType.value = 2
      setTimeout(() => {
        emit('setState', 1)
      }, 5000)
    }
  }
</script>
<style lang="scss">
  .purchase-package {
    width: 1140px;
    margin: 0 auto;
    .swiper-box {
      width: 1140px;
      height: 610px;
      padding-top: 6px;
    }
    .tips-box {
      margin: 0 auto;
      background: linear-gradient(
        89.96deg,
        rgba(255, 236, 223, 0) 3.46%,
        #ffecdf 49.53%,
        rgba(255, 236, 223, 0) 101.76%
      );
      width: 335px;
      text-align: center;
      height: 29px;
      line-height: 29px;
      font-size: 14px;
      color: #8c8c8c;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      border-image: linear-gradient(
        90deg,
        rgba(232, 144, 38, 0) 0%,
        #e89026 45.4%,
        rgba(232, 144, 38, 0) 97.94%
      );
    }
    .swiper-pagination-bullet-active {
      width: 16px;
      border-radius: 57px;
      height: 8px;
      background: #558bf7;
    }
    .meal-box {
      margin-right: 60px;
      width: 240px;
    }
    .meal-box:hover {
      box-shadow: 0px 5px 15px rgba(123, 138, 167, 0.15);
      margin-top: -6px;
      z-index: 9999;
    }
    .hide-text {
      margin-top: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      height: 84px;
      color: #999999;
      font-size: 14px;
    }
    .text-box {
      width: 236px;
      height: 69px;
      line-height: 69px;
      text-align: center;
      color: #fff;
    }
    .meal-img {
      top: 0;
      left: 0;
      z-index: -1;
      width: 240px;
      height: 138px;
    }
    .purchase-btn {
      @apply cursor-pointer mx-auto mt-24 w-96 h-32 text-white leading-8 text-center rounded-full text-sm;
    }
    .gray-btn {
      background: linear-gradient(90deg, #cbd5e5 -14.23%, #7b8aa7 118.02%);
    }
    .bule-btn {
      background: linear-gradient(90deg, #4c80fe 0%, #423dfd 119.07%);
    }
    .violet-btn {
      background: linear-gradient(90deg, #db75ff 0%, #8000ff 111.17%);
    }
    .orange-btn {
      background: linear-gradient(90deg, #ffc24d 0%, #ff820e 100%);
    }
    .gray-frame {
      border: 1px solid #a6b6d5;
    }
    .bule-frame {
      border: 1px solid rgba(85, 139, 247, 0.4);
    }
    .violet-frame {
      border: 1px solid rgba(162, 69, 255, 0.4);
    }
    .orange-frame {
      border: 1px solid rgba(255, 167, 86, 0.4);
    }
  }

  .modality-box {
    .ant-modal-content {
      border-radius: 10px;
      min-height: 280px;
    }
    .ant-modal-header {
      border-radius: 10px;
    }
    .ant-modal-footer {
      border: none;
    }
    .transverse {
      width: 1px;
      height: 84px;
      margin: 0 47px;
      background: #d9d9d9;
      border-radius: 21px;
    }
    .ant-modal-close {
      outline: 0px !important;
    }
  }
</style>
