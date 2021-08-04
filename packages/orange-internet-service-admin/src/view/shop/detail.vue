<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-31 17:54:00
 * @LastEditTime: 2021-07-09 18:46:46
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-tabs v-model:activeKey="currentTab" class="w-full">
    <cal-tab-pane :key="0" tab="基础信息" :min-height="676" v-if="detailedData.name">
      <a-row :gutter="[24, 24]" class="min-w-477 h-full flex items-center">
        <a-col :lg="14" class="h-full">
          <cal-card class="min-h-400 h-full">
            <div class="font-bold text-base mb-24">店铺基础信息</div>
            <div class="flex">
              <div class="flex-shrink-0 h-100 w-100 relative mr-20">
                <img class="h-full w-full" :src="detailedData.logo_path" alt="" />
                <div
                  @click="selectPicture"
                  style="border-radius: 0px 0px 80px 80px; opacity: 0.8"
                  class="
                    absolute
                    text-white
                    h-28
                    leading-7
                    text-center
                    cursor-pointer
                    left-10
                    bottom-2
                    w-80
                    bg-black bg-opacity-30
                  "
                >
                  替换
                </div>
              </div>
              <div class="flex-1">
                <a-descriptions :column="2">
                  <a-descriptions-item label="店铺名称">
                    <span class="mr-10">{{ detailedData.name }}</span>
                    <a-popover trigger="click" v-model:visible="visible">
                      <template #content>
                        <cal-input v-model="shopTitle" class="w-208" />
                        <div class="flex items-center mt-8 justify-items-center w-208">
                          <cal-button @click="hide(0)" class="ml-28"> 取消 </cal-button>
                          <cal-button @click="hide(1)" type="primary" class="ml-16">
                            确定
                          </cal-button>
                        </div>
                      </template>
                      <span class="text-primary cursor-pointer">编辑</span>
                    </a-popover>
                    <!-- <span class="text-primary cursor-pointer">编辑</span> -->
                  </a-descriptions-item>
                  <a-descriptions-item label="店铺状态">
                    <span class="mr-10">{{ detailedData.status == 8 ? '正常' : '暂停' }}</span>
                    <span class="text-primary cursor-pointer" @click="stateShow = true">编辑</span>
                    <!-- <a-popover trigger="click">
                      <template #content>
                        <cal-input-select
                          placeholder="店铺状态"
                          v-model="shopState"
                          @change="modifyState"
                        >
                          <a-select-option value="8">正常营业</a-select-option>
                          <a-select-option value="7">暂停营业</a-select-option>
                        </cal-input-select>
                      </template>
                      <span class="text-primary cursor-pointer">编辑</span>
                    </a-popover> -->
                  </a-descriptions-item>
                  <a-descriptions-item label="店铺ID">
                    {{ detailedData.id }}
                  </a-descriptions-item>
                  <a-descriptions-item label="店铺创建时间">
                    {{ $formatUnix(detailedData.createtime) }}
                  </a-descriptions-item>
                  <a-descriptions-item label="行业类目">
                    {{ detailedData.industry_class_parent_name }}
                  </a-descriptions-item>
                  <a-descriptions-item label="最后登录时间">
                    {{ detailedData.last_time }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-descriptions :column="1">
                  <a-descriptions-item label="店铺地址">
                    {{ detailedData.province_name }} {{ detailedData.city_name }}
                    {{ detailedData.area_name }} {{ detailedData.address }}
                  </a-descriptions-item>
                  <a-descriptions-item label="备注">
                    {{ detailedData.remark }}
                  </a-descriptions-item>
                  <a-descriptions-item label="店铺简介">
                    {{ detailedData.info }}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </div>
          </cal-card>
        </a-col>
        <a-col :lg="10" class="h-full">
          <cal-card class="min-h-400 h-full">
            <a-descriptions title="店铺详细信息" :column="2">
              <a-descriptions-item label="店铺套餐">
                <span class="mr-10">{{ detailedData.combo_name }}</span>
                <span
                  class="mr-10 text-primary cursor-pointer"
                  @click="showEditSetMealModal = true"
                >
                  编辑套餐
                </span>
                <span class="text-primary cursor-pointer" @click="showModel"> 历史套餐 </span>
              </a-descriptions-item>
              <a-descriptions-item label="用户ID"> {{ userData.id }} </a-descriptions-item>
              <a-descriptions-item label="店铺联系人">
                {{ detailedData.liaisons }}
              </a-descriptions-item>
              <a-descriptions-item label="用户账号"> {{ userData.username }} </a-descriptions-item>
              <a-descriptions-item label="联系人电话">
                {{ detailedData.liaisons_tel }}
              </a-descriptions-item>
              <a-descriptions-item label="商户后台管理">
                <span class="text-primary cursor-pointer" @click="backstage">前往后台</span>
              </a-descriptions-item>
              <a-descriptions-item label="身份证号码">
                {{ detailedData.card_id }}
              </a-descriptions-item>
              <a-descriptions-item label="营业执照编号">
                {{ detailedData.business_licence_sn }}
              </a-descriptions-item>
              <a-descriptions-item label="到期时间">
                <span class="mr-10" v-if="detailedData.combo_deadline > 0">{{ $formatUnix(detailedData.combo_deadline) }}</span>
                <span class="mr-10" v-if="detailedData.combo_deadline == 0">永久</span>
              </a-descriptions-item>
            </a-descriptions>
          </cal-card>
        </a-col>
      </a-row>
      <cal-message-dialog
        title="编辑套餐"
        :width="804"
        v-model="showEditSetMealModal"
        @ok="editPackage"
      >
        <a-form :label-col="{ span: 5 }" :model="setMealForm" :rules="rules" ref="extendFormRef">
          <a-form-item required label="选择套餐" name="combo_id">
            <cal-button class="w-208" icon-class="nr-increase" @click="onSelectSetMeal">
              重新选择套餐
            </cal-button>
          </a-form-item>
          <template v-if="selectSetMeal.length">
            <a-form-item label=" " v-if="selectSetMeal.length">
              <set-meal-item
                class="w-353"
                v-for="(item, index) in selectSetMeal"
                :item="item"
                :key="index"
              />
            </a-form-item>
            <!-- <a-form-item label=" ">
            <span class="mr-16">单商户初级版</span>
            <cal-radio-group>
              <cal-radio value="1">￥400/30日</cal-radio>
              <cal-radio value="2">￥800/3个月</cal-radio>
              <cal-radio value="3">￥1200/永久有效</cal-radio>
            </cal-radio-group>
          </a-form-item> -->
            <a-form-item label=" " v-if="selectSetMeal[0]">
              <span class="mr-16">{{ selectSetMeal[0].name }}</span>
              <cal-radio-group v-model="setMealForm.combo_sale_spec_id">
                <cal-radio
                  :value="item.id"
                  v-for="(item, index) in selectSetMeal[0].sale_spec"
                  :key="Number(index)"
                >
                  ￥{{ item.price }}/{{ formatTime(item.type, item.nums) }}
                </cal-radio>
              </cal-radio-group>
            </a-form-item>
            <a-form-item required label="店铺到期时间" name="expire_time">
              <cal-radio-group v-model="setMealForm.expire_type">
                <cal-radio :value="1">默认跟随套餐</cal-radio>
                <cal-radio :value="2">自定义到期时间</cal-radio>
                <cal-radio :value="3">永久有效</cal-radio>
              </cal-radio-group>
              <div v-if="setMealForm.expire_type == 2">
                <cal-input-date
                  class="w-192"
                  placeholder="店铺到期时间"
                  v-model="setMealForm.expire_time"
                />
              </div>
            </a-form-item>
          </template>
          <a-form-item label=" " v-if="switchData.unused_combo">
            <cal-card class="w-500">
              <div> 当前店铺存在已购未生效套餐【{{ detailedData.combo_info.name }}】，是否作废</div>
              <cal-radio-group v-model="setMealForm.toVoid" class="mt-14">
                <cal-radio :value="0">保留，新套餐过期后生效该套餐</cal-radio>
                <cal-radio :value="1">作废</cal-radio>
              </cal-radio-group>
            </cal-card>
          </a-form-item>
          <a-form-item required label="管理员登录密码" name="passWord">
            <cal-input-password
              placeholder="请输入管理员登录密码"
              v-model:value="setMealForm.passWord"
            />
          </a-form-item>
        </a-form>
      </cal-message-dialog>
      <cal-message-dialog title="历史套餐" :width="804" v-model="showHistorySetMealModel">
        <cal-table :list="historyList">
          <cal-table-option title="套餐名称" index="name" />
          <cal-table-option title="套餐金额" index="" v-slot:default="{ item }">
            ￥{{ item.amount }}
          </cal-table-option>
          <cal-table-option title="购买时间" index="" v-slot:default="{ item }" min-width="200px">
            {{ $formatUnix(item.finshtime) }}
          </cal-table-option>
          <cal-table-option title="到期时间" index="" v-slot:default="{ item }" min-width="200px">
            {{ $formatUnix(item.deadline) }}
          </cal-table-option>
          <cal-table-option title="操作人" index="" v-slot:default="{ item }">
            {{ item.manager_type == 1 ? '服务商' : '商户' }}
          </cal-table-option>
        </cal-table>
      </cal-message-dialog>
      <cal-message-dialog
        title="扩展有效期去重"
        :width="800"
        v-model="showDuplicateRemoval"
        @ok="duplicateRemoval"
      >
        <cal-table :list="switchData.ext_diff">
          <cal-table-option title="扩展名称" index="name" />
          <cal-table-option
            title="原有效期"
            index="name"
            v-slot:default="{ item }"
            min-width="180px"
          >
            {{ item.deadline == 0 ? '永久' : $formatUnix(item.deadline) }}
          </cal-table-option>
          <cal-table-option
            title="新套餐有效期"
            index="name"
            v-slot:default="{ item }"
            min-width="180px"
          >
            {{ $formatUnix(item.comboDeadline) }}
          </cal-table-option>
          <cal-table-option
            title="选择有效期"
            index="name"
            v-slot:default="{ item }"
            min-width="260px"
          >
            <cal-radio-group name="radioGroup" v-model:value="item.belong_type">
              <div class="flex">
                <cal-radio :value="2">原有效期</cal-radio>
                <cal-radio :value="1">新套餐有效期</cal-radio>
              </div>
            </cal-radio-group>
          </cal-table-option>
        </cal-table>
      </cal-message-dialog>
    </cal-tab-pane>
    <cal-tab-pane :key="1" tab="店铺数据" :min-height="676">
      <a-row :gutter="[24, 24]">
        <a-col :xl="12" :lg="24">
          <div class="font-bold text-base mb-24">店铺基础信息</div>
          <cal-card class="theme-left-after">
            <a-descriptions>
              <a-descriptions-item label="总交易金额">
                ￥{{ detailedData.statistic.totalBuyMoney }}
              </a-descriptions-item>
              <a-descriptions-item label="交易总订单数">
                {{ detailedData.statistic.totalOrder }}
              </a-descriptions-item>
              <a-descriptions-item label="维权订单数量">
                {{ detailedData.statistic.totalProtectOrder }}
              </a-descriptions-item>
              <a-descriptions-item label="总退款金额">
                ￥{{ detailedData.statistic.totalRefundMoney }}</a-descriptions-item
              >
              <a-descriptions-item label="总退款订单数">
                {{ detailedData.statistic.refundOrder }}
              </a-descriptions-item>
            </a-descriptions>
          </cal-card>
        </a-col>
        <a-col :xl="12" :lg="24">
          <div class="font-bold text-base mb-24">店铺基础信息</div>
          <cal-card class="theme-left-after">
            <a-descriptions>
              <a-descriptions-item label="总商品数量">
                {{ detailedData.statistic.goods }}
              </a-descriptions-item>
              <a-descriptions-item label="售卖商品数量">
                {{ detailedData.statistic.goodsSell }}
              </a-descriptions-item>
              <a-descriptions-item label="待出售商品数量">
                {{ detailedData.statistic.goodsStaySell }}
              </a-descriptions-item>
              <a-descriptions-item label="下架商品数量">
                {{ detailedData.statistic.goodsWarehouse }}
              </a-descriptions-item>
              <a-descriptions-item label="已售罄商品数量">
                {{ detailedData.statistic.goodsSoldOut }}
              </a-descriptions-item>
            </a-descriptions>
          </cal-card>
        </a-col>
        <a-col :xl="12" :lg="24">
          <div class="font-bold text-base mb-24">店铺基础信息</div>
          <cal-card class="theme-left-after">
            <a-descriptions :column="1">
              <a-descriptions-item label="总会员数">
                {{ detailedData.statistic.totalUser }}
              </a-descriptions-item>
            </a-descriptions>
            <a-descriptions>
              <a-descriptions-item label="有余额会员数">
                {{ detailedData.statistic.balanceUser }}
              </a-descriptions-item>
              <a-descriptions-item label="有交易会员数">
                {{ detailedData.statistic.shoppingUser }}
              </a-descriptions-item>
            </a-descriptions>
          </cal-card>
        </a-col>
      </a-row>
    </cal-tab-pane>
    <cal-tab-pane :key="2" tab="渠道管理" :min-height="676">
      <!-- 筛选项 -->
      <div class="flex mb-32">
        <div class="flex-1">
          <cal-input-select placeholder="选择使用状态" v-model="channelForm.status">
            <a-select-option value="1">已禁用</a-select-option>
            <a-select-option value="2">已过期</a-select-option>
            <a-select-option value="3">即将过期</a-select-option>
            <a-select-option value="4">已购买</a-select-option>
          </cal-input-select>
          <cal-input-date class="ml-80" placeholder="到期时间" v-model="channelForm.deadline" />
        </div>
        <cal-input class="w-160" placeholder="请输入渠道名称" v-model:value="channelForm.name">
          <template #suffix>
            <i class="nr-search" />
          </template>
        </cal-input>
      </div>
      <!-- 列表项 -->
      <template v-if="list.length">
        <div
          class="grid gap-24 justify-center"
          style="grid-template-columns: repeat(auto-fill, 288px)"
        >
          <extend-item
            :item="item"
            :currentType="'channel'"
            class="h-320 relative"
            v-for="(item, index) in list"
            :key="index"
            @edit="editExtend(1, $event)"
          />
        </div>
      </template>
      <cal-empty v-else class="mt-208 mx-auto w-full" image="@/assets/img/common/empty.png" />
      <!-- 编辑项 -->
      <cal-message-dialog
        v-model="showEditChannelModal"
        title="编辑渠道"
        :width="804"
        @ok="setExtend"
      >
        <a-form :model="extendForm" :rules="rules" ref="extendFormRef">
          <div class="flex items-center mb-28">
            <cal-switch class="mr-14" v-model="extendForm.switch" />
            <span>开启</span>
          </div>
          <div class="ml-144">
            <description-block :currentType="'channel'" :item="currentItem" />
            <a-form-item label="到期时间" name="timeSet">
              <cal-radio-group v-model:value="extendForm.timeSet">
                <cal-radio :value="0">永久有效</cal-radio>
                <cal-radio :value="1">自定义到期时间</cal-radio>
              </cal-radio-group>
              <div v-if="extendForm.timeSet == 1">
                <cal-input-date placeholder="到期时间" v-model="extendForm.deadline" />
              </div>
            </a-form-item>
            <a-form-item required label="管理员登录密码" name="passWord">
              <cal-input-password
                v-model:value="extendForm.passWord"
                placeholder="请输入管理员登录密码"
              />
            </a-form-item>
          </div>
        </a-form>
      </cal-message-dialog>
      <!-- 分页器 -->
      <template #sticky>
        <div class="flex justify-center">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-tab-pane>
    <cal-tab-pane :key="3" tab="商城模板" :min-height="676">
      <!-- 筛选项 -->
      <div class="flex mb-32">
        <div class="flex-1">
          <!-- <cal-input-select class="mr-80" placeholder="请选择模板分类">
            <a-select-option value="jack">正常</a-select-option>
          </cal-input-select> -->
          <cal-cascader
            class="mr-80"
            v-model:value="templateForm.category"
            :options="options"
            :display-render="displayRender"
            expand-trigger="hover"
            placeholder="请选择模板分类"
            :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          />
          <cal-input-select class="mr-80" placeholder="选择使用状态" v-model="templateForm.status">
            <a-select-option value="1">已禁用</a-select-option>
            <a-select-option value="2">已过期</a-select-option>
            <a-select-option value="3">即将过期</a-select-option>
            <a-select-option value="4">已购买</a-select-option>
          </cal-input-select>
          <cal-input-date placeholder="到期时间" v-model="templateForm.deadline" />
        </div>
        <cal-input class="w-160" placeholder="请输入模板名称" v-model:value="templateForm.name">
          <template #suffix>
            <i class="nr-search" />
          </template>
        </cal-input>
      </div>
      <!-- 列表项 -->
      <template v-if="list.length">
        <div
          class="grid gap-24 justify-center"
          style="grid-template-columns: repeat(auto-fill, 288px)"
        >
          <extend-item
            :item="item"
            :currentType="'template'"
            class="h-320 relative"
            v-for="(item, index) in list"
            :key="index"
            @edit="editExtend(2, $event)"
          />
        </div>
      </template>
      <cal-empty v-else class="mt-208 mx-auto w-full" image="@/assets/img/common/empty.png" />
      <!-- 编辑项 -->
      <cal-message-dialog
        v-model="showEditShopModal"
        title="编辑商城模板"
        :width="804"
        @ok="setExtend"
      >
        <a-form :model="extendForm" :rules="rules" ref="extendFormRef">
          <div class="flex items-center mb-28">
            <cal-switch class="mr-14" v-model="extendForm.switch" />
            <span>开启</span>
          </div>
          <div class="ml-144">
            <description-block :currentType="'template'" :item="currentItem" />
            <a-form-item label="到期时间" name="timeSet">
              <cal-radio-group v-model:value="extendForm.timeSet">
                <cal-radio :value="0">永久有效</cal-radio>
                <cal-radio :value="1">自定义到期时间</cal-radio>
              </cal-radio-group>
              <div v-if="extendForm.timeSet == 1">
                <cal-input-date placeholder="到期时间" v-model="extendForm.deadline" />
              </div>
            </a-form-item>
            <a-form-item required label="管理员登录密码" name="passWord">
              <cal-input-password
                v-model:value="extendForm.passWord"
                placeholder="请输入管理员登录密码"
              />
            </a-form-item>
          </div>
        </a-form>
      </cal-message-dialog>
      <!-- 分页器 -->
      <template #sticky>
        <div class="flex justify-center">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-tab-pane>
    <cal-tab-pane :key="4" tab="应用插件" :min-height="676">
      <!-- 筛选项 -->
      <div class="flex mb-32">
        <div class="flex-1">
          <cal-cascader
            class="mr-80"
            v-model:value="applicationForm.category"
            :options="applicationOpt"
            :display-render="displayRender"
            expand-trigger="hover"
            placeholder="请选择模板分类"
            :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          />
          <cal-input-select
            class="mr-80"
            placeholder="选择使用状态"
            v-model="applicationForm.status"
          >
            <a-select-option value="1">已禁用</a-select-option>
            <a-select-option value="2">已过期</a-select-option>
            <a-select-option value="3">即将过期</a-select-option>
            <a-select-option value="4">已购买</a-select-option>
          </cal-input-select>
          <cal-input-date placeholder="到期时间" v-model="applicationForm.deadline" />
        </div>
        <cal-input class="w-160" placeholder="请输入应用名称" v-model:value="applicationForm.name">
          <template #suffix>
            <i class="nr-search" />
          </template>
        </cal-input>
      </div>
      <!-- 列表项 -->
      <template v-if="list.length">
        <div
          class="grid gap-24 justify-center"
          style="grid-template-columns: repeat(auto-fill, 288px)"
        >
          <extend-item
            :item="item"
            :currentType="'application'"
            class="h-320 relative"
            v-for="(item, index) in list"
            :key="index"
            @edit="editExtend(3, $event)"
          />
        </div>
      </template>
      <cal-empty v-else class="mt-208 mx-auto w-full" image="@/assets/img/common/empty.png" />
      <!-- 编辑项 -->
      <cal-message-dialog
        v-model="showEditAppModal"
        title="编辑应用插件"
        :width="804"
        @ok="setExtend"
      >
        <a-form :model="extendForm" :rules="rules" ref="extendFormRef">
          <div class="flex items-center mb-28">
            <cal-switch class="mr-14" v-model="extendForm.switch" />
            <span>开启</span>
          </div>
          <div class="ml-144">
            <description-block :item="currentItem" :currentType="'application'" />
            <a-form-item label="到期时间" nmae="timeSet">
              <cal-radio-group v-model:value="extendForm.timeSet">
                <cal-radio :value="0">永久有效</cal-radio>
                <cal-radio :value="1">自定义到期时间</cal-radio>
              </cal-radio-group>
              <div v-if="extendForm.timeSet == 1">
                <cal-input-date placeholder="到期时间" v-model="extendForm.deadline" />
              </div>
            </a-form-item>
            <a-form-item required label="管理员登录密码" name="passWord">
              <cal-input-password
                v-model:value="extendForm.passWord"
                placeholder="请输入管理员登录密码"
              />
            </a-form-item>
          </div>
        </a-form>
      </cal-message-dialog>
      <!-- 分页器 -->
      <template #sticky>
        <div class="flex justify-center">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-tab-pane>
    <cal-tab-pane :key="5" tab="主题管理" :min-height="676">
      <!-- 筛选项 -->
      <div class="flex mb-32">
        <div class="flex-1">
          <cal-input-select class="mr-80" placeholder="选择使用状态" v-model="themeForm.status">
            <a-select-option value="1">已禁用</a-select-option>
            <a-select-option value="2">已过期</a-select-option>
            <a-select-option value="3">即将过期</a-select-option>
            <a-select-option value="4">已购买</a-select-option>
          </cal-input-select>
          <cal-input-date placeholder="到期时间" v-model="themeForm.deadline" />
        </div>
        <cal-input class="w-160" placeholder="请输入主题名称" v-model:value="themeForm.name">
          <template #suffix>
            <i class="nr-search" />
          </template>
        </cal-input>
      </div>
      <template v-if="list.length">
        <!-- 列表项 -->
        <div
          class="grid gap-24 justify-center"
          style="grid-template-columns: repeat(auto-fill, 288px)"
        >
          <extend-item
            :item="item"
            :currentType="'theme'"
            class="h-320 relative"
            v-for="(item, index) in list"
            :key="index"
            @edit="editExtend(4, $event)"
          />
        </div>
      </template>
      <cal-empty v-else class="mt-208 mx-auto w-full" image="@/assets/img/common/empty.png" />
      <!-- 编辑项 -->
      <cal-message-dialog
        v-model="showEditThemeModal"
        title="编辑主题"
        :width="804"
        @ok="setExtend"
      >
        <a-form :model="extendForm" :rules="rules" ref="extendFormRef">
          <div class="flex items-center mb-28">
            <cal-switch class="mr-14" v-model="extendForm.switch" />
            <span>开启</span>
          </div>
          <div class="ml-144">
            <description-block :currentType="'theme'" :item="currentItem" />
            <a-form-item label="到期时间" name="timeSet">
              <cal-radio-group v-model:value="extendForm.timeSet">
                <cal-radio :value="0">永久有效</cal-radio>
                <cal-radio :value="1">自定义到期时间</cal-radio>
              </cal-radio-group>
              <div v-if="extendForm.timeSet == 1">
                <cal-input-date placeholder="到期时间" v-model="extendForm.deadline" />
              </div>
            </a-form-item>
            <a-form-item required label="管理员登录密码" name="passWord">
              <cal-input-password
                v-model:value="extendForm.passWord"
                placeholder="请输入管理员登录密码"
              />
            </a-form-item>
          </div>
        </a-form>
      </cal-message-dialog>
      <!-- 分页器 -->
      <template #sticky>
        <div class="flex justify-center">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <cal-message-dialog v-model="stateShow" title="编辑营业状态" @ok="modifyState">
    <a-form
      :model="formBusiness"
      ref="extendFormRef"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 17 }"
    >
      <div class="flex items-center mb-24">
        <cal-switch v-model="formBusiness.open"></cal-switch>
        <div class="ml-16">{{ formBusiness.open ? '正常营业' : '暂停营业' }}</div>
      </div>
      <a-form-item label="备注" name="remarks">
        <cal-textarea
          style="border-radius: 20px"
          v-model:value="formBusiness.remarks"
          max-length="50"
          class="w-353 h-128"
        >
        </cal-textarea>
      </a-form-item>
      <a-form-item required label="管理员登录密码" name="passWord">
        <cal-input-password
          class="w-192"
          v-model:value="formBusiness.passWord"
          placeholder="请输入管理员登录密码"
        />
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue-demi'
  import SetMealSelect from './components/SetMealSelect'
  import { useRoute } from 'vue-router'
  import {
    reqShopDetails,
    reqShopDetailsList,
    reqEditBasicinformation,
    reqEditExtension,
    reqVerification,
    reqHistoryPackage,
    reqComboCheck,
    reqPackageSwitching
  } from '@/api/shop'
  import { reqUserDetails } from '@/api/user'
  import SetMealItem from './components/SetMealItem.vue'
  import DescriptionBlock from './components/DescriptionBlock.vue'
  import ExtendItem from './components/ExtendItem.vue'
  import { message } from 'ant-design-vue'
  import { CalImageSelect } from '@/components/Business/CalImageSelect'
  import { useListPagination } from '@/hooks/use-listPagination'
  import dayjs from 'dayjs'
  import { reqTemplateClassIndex, reqAddonsClassIndex } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import store from '@/store'
  const currentTab = ref(0)
  const route = useRoute()
  // 编辑店铺名称的气泡卡片
  const visible = ref(false)
  const shopState = ref('')
  const id = ref<any>('')
  const shopTitle = ref('')
  //当前编辑数据
  const currentItem = ref<any>({})
  // 模板分类数据
  const options = ref<any[]>([])
  // 应用分类数据
  const applicationOpt = ref<any[]>([])
  // 历史套餐数据
  const historyList = ref<any>([])
  // 去重套餐展示
  const showDuplicateRemoval = ref(false)
  const formBusiness = ref({
    open: false,
    remarks: '',
    passWord: ''
  })
  // 渠道搜索条件
  const channelForm = ref({
    status: '',
    deadline: '',
    name: ''
  })
  // 模板筛选条件
  const templateForm = ref({
    status: '',
    deadline: '',
    category: [],
    name: ''
  })
  // 应用筛选条件
  const applicationForm = ref({
    status: '',
    deadline: '',
    category: [],
    name: ''
  })
  // 主题搜索条件
  const themeForm = ref({
    status: '',
    deadline: '',
    name: ''
  })
  // 扩展
  const extendForm = ref({
    switch: false,
    deadline: 0,
    passWord: '',
    timeSet: 0
  })
  const extendFormRef = ref()
  const passwordRule = async (rule: any, value: string) => {
    console.log(value)
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject('密码不正确,请重新输入密码')
      }
    } else {
      return Promise.reject('密码为必填项')
    }
  }
  const timeSetdRule1 = async (rule: any, value: any) => {
    if (value != 0 && extendForm.value.deadline == 0) {
      return Promise.reject('请选择到期时间')
    }
    return Promise.resolve()
  }
  const timeSetdRule2 = async (rule: any, value: any) => {
    if (setMealForm.value.expire_type == 2 && setMealForm.value.expire_time == 0) {
      return Promise.reject('请选择到期时间')
    }
    return Promise.resolve()
  }
  const { rules, validate } = useAntdForm(extendFormRef, {
    passWord: [{ required: true, validator: passwordRule, trigger: 'blur' }],
    timeSet: [{ required: true, validator: timeSetdRule1, trigger: 'blur' }],
    expire_time: [{ required: true, validator: timeSetdRule2, trigger: 'blur' }],
    combo_id: { required: true, message: '套餐为必填项' },
    remarks: { required: true, message: '备注为必填项' }
  })
  const stateShow = ref(false)
  // 套餐
  const setMealForm = ref({
    combo_id: '',
    combo_sale_spec_id: '',
    toVoid: 0,
    expire_type: 1,
    expire_time: 0,
    passWord: ''
  })
  // 详情数据
  const detailedData = ref<any>({})
  // 请求不同的数据
  const currentType = ref(3)
  // 是否展示编辑套餐模态框
  const showEditSetMealModal = ref(false)
  // 是否展示历史套餐模态框
  const showHistorySetMealModel = ref(false)
  // 切换数据
  const switchData = ref<any>({})
  // 用户详情数据
  const userData = ref<any>({})
  // 套餐选择
  const selectSetMeal = ref<any[]>([])
  // 替换套餐
  const onSelectSetMeal = async () => {
    const selects = await SetMealSelect({ multiple: false })
    selectSetMeal.value = selects
    setMealForm.value.combo_id = selectSetMeal.value[0].id
    setMealForm.value.combo_sale_spec_id = selectSetMeal.value[0].sale_spec[0].id
    getSetMeal(setMealForm.value.combo_id, setMealForm.value.combo_sale_spec_id)
  }

  

  // 选择图片
  const selectPicture = async () => {
    const res = await CalImageSelect({ multiple: false })
    await reqEditBasicinformation({
      id: id.value,
      logo_path: res[0].path.url
    })
    message.success('操作成功！')
    getShopDetails(id.value)
  }
  const hide = async (num: number) => {
    if (num == 1) {
      await reqEditBasicinformation({
        id: id.value,
        name: shopTitle.value
      })
      message.success('操作成功！')
      getShopDetails(id.value)
    }
    visible.value = false
  }
  const modifyState = async () => {
    await validate()
    await reqEditBasicinformation({
      id: id.value,
      status: formBusiness.value.open ? '8' : '7',
      change_remark: formBusiness.value.remarks
    })
    message.success('操作成功！')
    getShopDetails(id.value)
  }
  /** 店铺详情列表数据 start */
  const { list, total, currentPage, pageSize, resetList } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const search = {} as any
      if (currentType.value == 3) {
        search.status = channelForm.value.status
        if (channelForm.value.deadline != '') {
          search.deadline = dayjs(channelForm.value.deadline).unix()
        }
        if (channelForm.value.name != '') {
          search.name = channelForm.value.name
        }
      }
      if (currentType.value == 2) {
        search.status = templateForm.value.status
        if (templateForm.value.deadline != '') {
          search.deadline = dayjs(templateForm.value.deadline).unix()
        }
        if (templateForm.value.category.length == 1) {
          search.class_top_id = templateForm.value.category[0]
        }
        if (templateForm.value.category.length == 2) {
          search.class_top_id = templateForm.value.category[0]
          search.class_id = templateForm.value.category[1]
        }
        if (templateForm.value.name != '') {
          search.name = templateForm.value.name
        }
      }
      if (currentType.value == 1) {
        search.status = applicationForm.value.status
        if (applicationForm.value.deadline != '') {
          search.deadline = dayjs(applicationForm.value.deadline).unix()
        }
        if (applicationForm.value.category.length == 1) {
          search.class_top_id = applicationForm.value.category[0]
        }
        if (applicationForm.value.category.length == 2) {
          search.class_top_id = applicationForm.value.category[0]
          search.class_id = applicationForm.value.category[1]
        }
        if (applicationForm.value.name != '') {
          search.name = applicationForm.value.name
        }
      }
      if (currentType.value == 4) {
        search.status = themeForm.value.status
        if (themeForm.value.deadline != '') {
          search.deadline = dayjs(themeForm.value.deadline).unix()
        }
        if (themeForm.value.name != '') {
          search.name = themeForm.value.name
        }
      }
      const { data } = await reqShopDetailsList({
        page: currentPage.value,
        limit: pageSize.value,
        shop_id: id.value,
        type: currentType.value,
        search
      })
      total.value = data.data.total
      return data.data.data
    }
  })
  reqTemplateClassIndex().then((res: any) => {
    options.value = res.data.data
  })
  // 获取历史套餐
  const showModel = async () => {
    showHistorySetMealModel.value = true
    const { data } = await reqHistoryPackage({
      id: id.value
    })
    historyList.value = data.data
  }
  reqAddonsClassIndex().then((res: any) => {
    applicationOpt.value = res.data.data
  })
  // 模板分类方法
  const displayRender = ({ labels, values }: { labels: string[]; values: string[] }) => {
    return labels[labels.length - 1]
  }
  const backstage = () => {
    window.open(
      `${store.state.common.info.shop_domain}?shopid=${detailedData.value.id}&t=${userData.value.token}`,
      '_blank'
    )
  }
  /** 店铺详情列表数据 end */
  // 是否展示编辑渠道项模态框
  const showEditChannelModal = ref(false)
  /** 商城模板 start */
  // 是否展示编辑商城模板项模态框
  const showEditShopModal = ref(false)
  /** 商城模板 end */

  /** 应用插件 start */
  // 是否展示编辑应用项模态框
  const showEditAppModal = ref(false)
  /** 应用插件 start */

  /** 主题管理 end */
  // 是否展示编辑主题项模态框
  const showEditThemeModal = ref(false)
  /** 主题管理 end */
  // 获取详情数据
  const getShopDetails = async (id: any) => {
    const { data } = await reqShopDetails({
      id
    })
    detailedData.value = data.data
    shopState.value = detailedData.value.status.toString()
    shopTitle.value = detailedData.value.name
    formBusiness.value.open = detailedData.value.status == 8
    getInformation()
    getSetMeal()
  }
  // 获取套餐切换前的数据
  const getSetMeal = async (combo_id?: string, combo_sale_id?: string, combo_deadline?: number) => {
    const { data } = await reqComboCheck({
      id: detailedData.value.id,
      combo_id: combo_id ? combo_id : detailedData.value.combo_info.id,
      combo_sale_id: combo_sale_id ? combo_sale_id : detailedData.value.combo_info.sale_spec[0].id,
      combo_deadline: combo_deadline ? combo_deadline : -1
    })
    switchData.value = data.data
    if (switchData.value.ext_diff.length) {
      switchData.value.ext_diff.forEach((item: any) => {
        item.belong_type = 1
      })
    }
  }
  // 获取用户数据
  const getInformation = async () => {
    const { data } = await reqUserDetails({
      id: detailedData.value.manager_id
    })
    userData.value = data.data
  }
  // 编辑扩展的回显
  const editExtend = (num: number, item: any) => {
    currentItem.value = item
    extendForm.value.deadline = 0
    extendForm.value.passWord = ''
    if (item.deadline != 0) {
      extendForm.value.deadline = item.deadline * 1000
      extendForm.value.timeSet = 1
    } else {
      extendForm.value.timeSet = 0
    }
    extendForm.value.switch = item.switch == 1
    if (num == 1) {
      showEditChannelModal.value = true
    } else if (num == 2) {
      showEditShopModal.value = true
    } else if (num == 3) {
      showEditAppModal.value = true
    } else {
      showEditThemeModal.value = true
    }
  }
  const formatTime = (type: string, nums: number) => {
    const strategy: Record<string, string> = {
      1: `${nums}日`,
      2: `${nums}月`,
      3: `${nums}年`,
      4: '永久有效'
    }
    return strategy[type]
  }
  // 编辑套餐按钮
  const editPackage = async () => {
    await validate()
    if (setMealForm.value.expire_type == 2) {
      getSetMeal(
        setMealForm.value.combo_id,
        setMealForm.value.combo_sale_spec_id,
        dayjs(setMealForm.value.expire_time).unix()
      )
    } else if (setMealForm.value.expire_type == 3) {
      getSetMeal(setMealForm.value.combo_id, setMealForm.value.combo_sale_spec_id, 0)
    } else {
      getSetMeal(setMealForm.value.combo_id, setMealForm.value.combo_sale_spec_id, -1)
    }
    if (switchData.value.ext_diff.length) {
      showDuplicateRemoval.value = true
    } else {
      await reqPackageSwitching({
        id: detailedData.value.id,
        combo_id: setMealForm.value.combo_id,
        combo_sale_spec_id: setMealForm.value.combo_sale_spec_id,
        expire_type: setMealForm.value.expire_type,
        expire_time:
          setMealForm.value.expire_type == 2 ? dayjs(setMealForm.value.expire_time).unix() : 0,
        is_delete_unused_combo: setMealForm.value.toVoid,
        unused_combo_order_id: switchData.value.unused_combo
          ? switchData.value.unused_combo.order_id
          : 0,
        ext_diff: []
      })
      message.success('操作成功！')
      getShopDetails(id.value)
      setMealForm.value = {
        combo_id: '',
        combo_sale_spec_id: '',
        toVoid: 0,
        expire_type: 1,
        expire_time: 0,
        passWord: ''
      }
      selectSetMeal.value = []
    }
  }
  // 确定去重
  const duplicateRemoval = async () => {
    const ext_diff = [] as any[]
    switchData.value.ext_diff.forEach((item: any) => {
      ext_diff.push({
        id: item.id,
        belong_type: item.belong_type
      })
    })
    await reqPackageSwitching({
      id: detailedData.value.id,
      combo_id: setMealForm.value.combo_id,
      combo_sale_spec_id: setMealForm.value.combo_sale_spec_id,
      expire_type: setMealForm.value.expire_type,
      expire_time:
        setMealForm.value.expire_type == 2 ? dayjs(setMealForm.value.expire_time).unix() : 0,
      is_delete_unused_combo: setMealForm.value.toVoid,
      unused_combo_order_id: switchData.value.unused_combo
        ? switchData.value.unused_combo.order_id
        : 0,
      ext_diff
    })
    message.success('操作成功！')
    getShopDetails(id.value)
    setMealForm.value = {
      combo_id: '',
      combo_sale_spec_id: '',
      toVoid: 0,
      expire_type: 1,
      expire_time: 0,
      passWord: ''
    }
    selectSetMeal.value = []
  }
  // 编辑扩展
  const setExtend = async () => {
    await validate()
    await reqEditExtension({
      id: Number(id.value),
      ext_id: currentItem.value.id,
      switch: extendForm.value.switch ? 1 : 0,
      deadline: extendForm.value.timeSet == 1 ? dayjs(Number(extendForm.value.deadline)).unix() : 0
    })
    message.success('操作成功！')
    resetList()
  }
  watch(currentTab, () => {
    if (currentTab.value > 1) {
      const typeList = [3, 2, 1, 4]
      currentType.value = typeList[currentTab.value - 2]
      currentPage.value = 1
      resetList()
    }
  })
  watch(
    [channelForm, applicationOpt, templateForm, themeForm],
    () => {
      resetList()
    },
    {
      deep: true
    }
  )
  onMounted(() => {
    if (route.query.id) {
      getShopDetails(route.query.id)
      id.value = route.query.id
    }
  })
</script>
<style lang="scss" scoped></style>
