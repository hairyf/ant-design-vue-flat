<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-13 11:23:22
 * @LastEditTime: 2021-05-10 15:22:00
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="refRuleForm" label-width="100px">
    <el-card shadow="never" class="header-card">
      <el-form-item label="群体名称" prop="name">
        <el-input placeholder="输入产品名称" size="small" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="会员基本信息">
        <el-checkbox-group v-model="basicInfo" @change="basicInfoChange">
          <el-checkbox v-for="city in basicInfoOptions" :label="city.value" :key="city.value">
            {{ city.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会员消费情况">
        <el-checkbox-group v-model="consumptionInfo" @change="consumptionChange">
          <el-checkbox v-for="city in consumptionInfoList" :label="city.value" :key="city.value">
            {{ city.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营销情况">
        <el-checkbox-group v-model="marketingInfo" @change="marketingChange">
          <el-checkbox v-for="city in marketingInfoList" :label="city.value" :key="city.value">
            {{ city.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-card>

    <div class="main">
      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(1)">
        <div class="main-item">
          <div class="item-box">
            <div>会员来源</div>
            <div class="icon-box" @click="basicInfoHide(1)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.user_channel_id.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.user_channel_id.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">渠道来源</div>
            <div class="item-left">
              <el-cascader
                placeholder="请选择渠道"
                v-model="tempSearch_user.user_channel_id.ids"
                :options="memberChannelList"
                :props="publicProps"
                collapse-tags
                clearable
              ></el-cascader>
            </div>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(2)">
        <div class="main-item">
          <div class="item-box">
            <div>会员手机尾号</div>
            <div class="icon-box" @click="basicInfoHide(2)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.mobile.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.mobile.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">地区选择</div>
            <div class="item-left">
              <el-input
                type="number"
                class="el-input-width"
                v-model="tempSearch_user.mobile.num"
                placeholder="输入手机尾号后四位"
              ></el-input>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(3)">
        <div class="main-item">
          <div class="item-box">
            <div>会员等级</div>
            <div class="icon-box" @click="basicInfoHide(3)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.level.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.level.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">等级选择</div>
            <div class="item-left">
              <el-cascader
                placeholder="请选择等级"
                v-model="tempSearch_user.level.ids"
                :options="memberLevelList"
                :props="publicProps"
                collapse-tags
                clearable
              ></el-cascader>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(4)">
        <div class="main-item">
          <div class="item-box">
            <div>会员标签</div>
            <div class="icon-box" @click="basicInfoHide(4)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.label.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.label.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">标签选择</div>
            <div class="item-left">
              <el-cascader
                placeholder="请选择标签"
                v-model="tempSearch_user.label.ids"
                :options="memberLabelList"
                :props="publicProps"
                collapse-tags
                clearable
              ></el-cascader>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(6)">
        <div class="main-item">
          <div class="item-box">
            <div>注册时间</div>
            <div class="icon-box" @click="basicInfoHide(6)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.jointime.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.jointime.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">注册时间</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="registerTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(7)">
        <div class="main-item">
          <div class="item-box">
            <div>目前积分 </div>
            <div class="icon-box" @click="basicInfoHide(7)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.score.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.score.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">积分数额</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.score.between[0]"
                  >
                    <template #append>积分</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.score.between[1]"
                  >
                    <template #append>积分</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="basicInfo.includes(8)">
        <div class="main-item">
          <div class="item-box">
            <div>目前余额 </div>
            <div class="icon-box" @click="basicInfoHide(8)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.money.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.money.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">余额数额</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.money.between[0]"
                  >
                    <template #append>元</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.money.between[1]"
                  >
                    <template #append>元</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="consumptionInfo.includes(1)">
        <div class="main-item">
          <div class="item-box">
            <div>消费次数 </div>
            <div class="icon-box" @click="consumptionInfoHide(1)"
              ><i class="el-icon-close"></i
            ></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_order_nums.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_order_nums.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">次数区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_order_nums.between[0]"
                  >
                    <template #append>次</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_order_nums.between[1]"
                  >
                    <template #append>次</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="shoppingTimes"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="consumptionInfo.includes(2)">
        <div class="main-item">
          <div class="item-box">
            <div>累计消费 </div>
            <div class="icon-box" @click="consumptionInfoHide(2)"
              ><i class="el-icon-close"></i
            ></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_order_money.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_order_money.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">金额区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_order_money.between[0]"
                  >
                    <template #append>积分</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_order_money.between[1]"
                  >
                    <template #append>积分</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="consumptionTimes"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="consumptionInfo.includes(3)">
        <div class="main-item">
          <div class="item-box">
            <div>累计充值 </div>
            <div class="icon-box" @click="consumptionInfoHide(3)"
              ><i class="el-icon-close"></i
            ></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_recharge_money.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_recharge_money.op" :label="2"
                >不包含</el-radio
              >
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">金额区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_recharge_money.between[0]"
                  >
                    <template #append>元</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_recharge_money.between[1]"
                  >
                    <template #append>元</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="cumulativeRecharge"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="consumptionInfo.includes(4)">
        <div class="main-item">
          <div class="item-box">
            <div>充值次数 </div>
            <div class="icon-box" @click="consumptionInfoHide(4)"
              ><i class="el-icon-close"></i
            ></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_recharge_nums.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_recharge_nums.op" :label="2"
                >不包含</el-radio
              >
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">金额区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_recharge_nums.between[0]"
                  >
                    <template #append>次</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_recharge_nums.between[1]"
                  >
                    <template #append>次</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="rechargeTimes"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="consumptionInfo.includes(5)">
        <div class="main-item">
          <div class="item-box">
            <div>距今未消费天数 </div>
            <div class="icon-box" @click="consumptionInfoHide(5)">
              <i class="el-icon-close"></i>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.unconsumption_days.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.unconsumption_days.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">天数区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.unconsumption_days.days[0]"
                  >
                    <template #append>天</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.unconsumption_days.days[1]"
                  >
                    <template #append>天</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="marketingInfo.includes(3)">
        <div class="main-item">
          <div class="item-box">
            <div>可用券名称 </div>
            <div class="icon-box" @click="marketingInfoHide(3)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.coupon.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.coupon.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left three">优惠券</div>
            <div class="item-left oe-m-r-0">
              <el-cascader
                placeholder="请选择优惠券"
                v-model="tempSearch_user.coupon.ids"
                :options="availableCouponsList"
                :props="publicProps"
                collapse-tags
                clearable
              ></el-cascader>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="availableCoupons"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="marketingInfo.includes(1)">
        <div class="main-item">
          <div class="item-box">
            <div>累计送券数 </div>
            <div class="icon-box" @click="marketingInfoHide(1)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_coupon_send.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_coupon_send.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">券数区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_send.between[0]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_send.between[1]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="marketingInfo.includes(2)">
        <div class="main-item">
          <div class="item-box">
            <div>累计用券数 </div>
            <div class="icon-box" @click="marketingInfoHide(2)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_coupon_used.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_coupon_used.op" :label="2">不包含</el-radio>
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">用券区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_used.between[0]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_used.between[1]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="main-card" v-if="marketingInfo.includes(4)">
        <div class="main-item">
          <div class="item-box">
            <div>可用券张数 </div>
            <div class="icon-box" @click="marketingInfoHide(4)"><i class="el-icon-close"></i></div>
          </div>
          <div class="item-box">
            <div class="item-left">相关范围</div>
            <div class="item-left">
              <el-radio v-model="tempSearch_user.total_coupon_unused.op" :label="1">包含</el-radio>
              <el-radio v-model="tempSearch_user.total_coupon_unused.op" :label="2"
                >不包含</el-radio
              >
            </div>
          </div>
          <div class="item-box">
            <div class="item-left">券数区域</div>
            <div class="item-left oe-m-r-0">
              <div class="price-input-box">
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_unused.between[0]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
                <span class="separateText">至</span>
                <div class="price-input">
                  <el-input
                    type="number"
                    placeholder="请输入"
                    v-model="tempSearch_user.total_coupon_unused.between[1]"
                  >
                    <template #append>张</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box oe-m-t-20">
            <div class="item-left three">时间段</div>
            <div class="item-left oe-m-r-0">
              <el-date-picker
                size="small"
                v-model="numberCouponsAvailable"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-card>
      <div class="main-card"> </div>
      <div class="main-card"> </div>
    </div>

    <el-card shadow="never" class="total-card oe-m-b-24">
      <el-button
        @click="addGroup('edit')"
        class="oe-m-r-15"
        size="small"
        style="width: 75px"
        type="primary"
        >汇总</el-button
      >
      <span>
        符合已选条件会员共有
        <span style="color: #ff0000; font-size: 24px">{{ tableList.length }}</span>
        人
      </span>
    </el-card>

    <el-card shadow="never" v-if="tableList.length > 0" class="table-card">
      <el-table
        :border="false"
        class="goods-list"
        :data="tableList"
        tooltip-effect="dark"
        height="360"
        style="width: 100%"
      >
        <el-table-column label="会员昵称">
          <template #default="scope">
            <div class="goods">
              <div class="picture oe-m-r-10">
                <el-image class="image" :src="scope.row.user_channel_img" />
              </div>
              <div class="classification">
                <div class="navigation">{{ scope.row.nickname }}</div>
                <div class="channel">
                  <el-image :src="scope.row.avatar"></el-image>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员手机号" prop="mobile"></el-table-column>
        <el-table-column label="会员等级" prop="current_shop_user_level_name"></el-table-column>
        <el-table-column label="会员标签">
          <template #default="scoped">
            <el-tag type="warning" v-for="item in scoped.row.user_labels" :key="item.label_id">{{
              item.label_name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最近购物时间">
          <template #default="scope">
            <span v-if="scope.row.last_buy_time != 0">{{
              formatUnix(scope.row.last_buy_time)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never" class="footer-card">
      <div class="button-box">
        <el-button @click="$router.push('groupManage')" size="small">取消</el-button>
        <el-button @click="addGroup()" size="small" type="primary">保存</el-button>
      </div>
    </el-card>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { formatUnix } from '@/utils'
  import {
    reqShopGroupManagementAdd,
    reqshopUserChannelIndex,
    reqshopUserLevelIndex,
    reqshopUserLabelIndex,
    reqCouponSelect,
    reqShopGroupManagementEdit,
    reqShopGroupManagementRead,
    reqShopGroupManagementGather
  } from '@/api/marketing'
  import dayjs from 'dayjs'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const route = useRoute()
  const router = useRouter()
  const editCouponId = route.query.id
  // 注册时间
  const registerTime = ref<any>([])
  // 消费次数时间区间
  const shoppingTimes = ref<any>([])
  // 累计消费时间区间
  const consumptionTimes = ref<any>([])
  // 累计充值时间区间
  const cumulativeRecharge = ref<any>([])
  // 充值次数时间区间
  const rechargeTimes = ref<any>([])
  // 可用券名称时间区间
  const availableCoupons = ref<any>([])
  // 可用券张数时间区间
  const numberCouponsAvailable = ref<any>([])
  // 提交数据
  const ruleForm = ref<any>({
    name: ''
  })
  const search_user = ref<any>({})
  const tempSearch_user = ref<any>({
    mobile: {
      op: 1,
      num: ''
    },
    user_channel_id: {
      op: 1,
      ids: []
    },
    level: {
      op: 1,
      ids: []
    },
    label: {
      op: 1,
      ids: []
    },
    jointime: {
      op: 1,
      between: []
    },
    score: {
      op: 1,
      between: []
    },
    money: {
      op: 1,
      between: []
    },
    total_order_nums: {
      op: 1,
      between: [],
      time: []
    },
    total_order_money: {
      op: 1,
      between: [],
      time: []
    },
    total_recharge_money: {
      op: 1,
      between: [],
      time: []
    },
    total_recharge_nums: {
      op: 1,
      between: [],
      time: []
    },
    unconsumption_days: {
      op: 1,
      days: []
    },
    total_coupon_used: {
      op: 1,
      between: []
    },
    total_coupon_send: {
      op: 1,
      between: []
    },
    coupon: {
      op: 1,
      ids: [],
      time: []
    },
    total_coupon_unused: {
      op: 1,
      between: [],
      time: []
    }
  })
  const rules = {
    name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
  }

  // 获取会员渠道来源
  const memberChannelList = ref<any[]>([])
  reqshopUserChannelIndex({ page: 1, limit: 1000 }).then((res) => {
    memberChannelList.value = res.data.data.data
  })
  // 获取会员等级来源
  const memberLevelList = ref<any[]>([])
  reqshopUserLevelIndex({ page: 1, limit: 1000 }).then((res) => {
    memberLevelList.value = res.data.data.data
  })
  // 获取会员标签来源
  const memberLabelList = ref<any[]>([])
  reqshopUserLabelIndex({ page: 1, limit: 1000 }).then((res) => {
    memberLabelList.value = res.data.data.data
  })
  // 可用优惠券来源
  const availableCouponsList = ref<any[]>([])
  reqCouponSelect({
    page: 1,
    limit: 1000,
    search: { status: '1' }
  }).then((res) => {
    availableCouponsList.value = res.data.data.data
  })
  // 会员基本信息
  const basicInfo = ref<Key[]>([])
  const basicInfoOptions = ref([
    {
      name: '会员来源',
      value: 1,
      sub: 'user_channel_id'
    },
    {
      name: '会员手机尾号',
      value: 2,
      sub: 'mobile'
    },
    {
      name: '会员等级',
      value: 3,
      sub: 'level'
    },
    {
      name: '会员标签',
      value: 4,
      sub: 'label'
    },
    {
      name: '注册时间',
      value: 6,
      sub: 'jointime'
    },
    {
      name: '目前积分',
      value: 7,
      sub: 'score'
    },
    {
      name: '目前余额',
      value: 8,
      sub: 'money'
    }
  ])
  // 隐藏会员基本信息当前卡片函数
  const basicInfoHide = (num: Key) => {
    const index = basicInfo.value.findIndex((item: any) => item == num)
    const data: any = basicInfoOptions.value.find((item: any) => item.value == num)
    search_user.value[data?.sub] = null
    basicInfo.value.splice(index, 1)
  }
  // 选中取消基本信息
  const tempBasicIds = ref<Key[]>([])
  const basicInfoChange = (basicIds: any) => {
    let basicId: Key = 0
    let data: any = {}
    if (tempBasicIds.value.length > basicIds.length) {
      tempBasicIds.value.forEach((item: any) => {
        if (!basicIds.includes(item)) {
          basicId = item
        }
      })
      data = basicInfoOptions.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = null
    } else {
      basicId = basicIds[basicIds.length - 1]
      data = basicInfoOptions.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = tempSearch_user.value[data?.sub]
    }
    tempBasicIds.value = basicIds
  }
  // 会员消费情况
  const consumptionInfo = ref<Key[]>([])
  const consumptionInfoList = ref([
    {
      name: '消费次数',
      value: 1,
      sub: 'total_order_nums'
    },
    {
      name: '累计消费',
      value: 2,
      sub: 'total_order_money'
    },
    {
      name: '累计充值',
      value: 3,
      sub: 'total_recharge_money'
    },
    {
      name: '充值次数',
      value: 4,
      sub: 'total_recharge_nums'
    },
    {
      name: '距今未消费天数',
      value: 5,
      sub: 'unconsumption_days'
    }
  ])
  // 隐藏会员基本信息当前卡片函数
  const consumptionInfoHide = (num: Key) => {
    const index = consumptionInfo.value.findIndex((item: any) => item == num)
    const data: any = consumptionInfoList.value.find((item: any) => item.value == num)
    search_user.value[data?.sub] = null
    consumptionInfo.value.splice(index, 1)
  }
  // 选中取消费情况
  const tempconsumptionIds = ref<Key[]>([])
  const consumptionChange = (consumptionIds: any) => {
    let basicId: Key = 0
    let data: any = {}
    if (tempconsumptionIds.value.length > consumptionIds.length) {
      tempconsumptionIds.value.forEach((item: any) => {
        if (!consumptionIds.includes(item)) {
          basicId = item
        }
      })
      data = consumptionInfoList.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = null
    } else {
      basicId = consumptionIds[consumptionIds.length - 1]
      data = consumptionInfoList.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = tempSearch_user.value[data?.sub]
    }
    tempconsumptionIds.value = consumptionIds
  }
  // 营销情况
  const marketingInfo = ref<Key[]>([])
  const marketingInfoList = ref([
    {
      name: '累计送券数',
      value: 1,
      sub: 'total_coupon_send'
    },
    {
      name: '累计用券数',
      value: 2,
      sub: 'total_coupon_used'
    },
    {
      name: '可用券名称',
      value: 3,
      sub: 'coupon'
    },
    {
      name: '可用券张数',
      value: 4,
      sub: 'total_coupon_unused'
    }
  ])
  // 隐藏营销情况当前卡片函数
  const marketingInfoHide = (num: Key) => {
    const index = marketingInfo.value.findIndex((item: any) => item == num)
    const data: any = marketingInfoList.value.find((item: any) => item.value == num)
    search_user.value[data?.sub] = null
    marketingInfo.value.splice(index, 1)
  }
  // 选中取营销情况
  const tempMarketingIds = ref<Key[]>([])
  const marketingChange = (marketingIds: any) => {
    let basicId: Key = 0
    let data: any = {}
    if (tempMarketingIds.value.length > marketingIds.length) {
      tempMarketingIds.value.forEach((item: any) => {
        if (!marketingIds.includes(item)) {
          basicId = item
        }
      })
      data = marketingInfoList.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = null
    } else {
      basicId = marketingIds[marketingIds.length - 1]
      data = marketingInfoList.value.find((item: any) => item.value == basicId)
      search_user.value[data?.sub] = tempSearch_user.value[data?.sub]
    }
    tempMarketingIds.value = marketingIds
  }
  // 级联选择器props
  const publicProps = {
    multiple: true,
    checkStrictly: true,
    emitPath: false,
    value: 'id',
    label: 'name'
  }
  // table列表
  const tableList = ref<any[]>([])
  // 获取编辑数据
  if (editCouponId != undefined) {
    reqShopGroupManagementRead({ id: editCouponId }).then((res) => {
      const data: any = res.data.data
      ruleForm.value.name = data.name
      for (const key in data.search_data) {
        if (key == 'mobile' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(2)
          tempBasicIds.value.push(2)
        }
        if (key == 'user_channel_id' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(1)
          tempBasicIds.value.push(1)
        }
        if (key == 'level' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(3)
          tempBasicIds.value.push(3)
        }
        if (key == 'label' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(4)
          tempBasicIds.value.push(4)
        }
        if (key == 'jointime' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          registerTime.value[0] = formatUnix(data.search_data[key].between[0])
          registerTime.value[1] = formatUnix(data.search_data[key].between[1])
          basicInfo.value.push(6)
          tempBasicIds.value.push(6)
        }
        if (key == 'score' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(7)
          tempBasicIds.value.push(7)
        }
        if (key == 'money' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          basicInfo.value.push(8)
          tempBasicIds.value.push(8)
        }

        if (key == 'total_order_nums' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          shoppingTimes.value[0] = formatUnix(data.search_data[key].time[0])
          shoppingTimes.value[1] = formatUnix(data.search_data[key].time[1])
          consumptionInfo.value.push(1)
          tempconsumptionIds.value.push(1)
        }
        if (key == 'total_order_money' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          consumptionTimes.value[0] = formatUnix(data.search_data[key].time[0])
          consumptionTimes.value[1] = formatUnix(data.search_data[key].time[1])
          consumptionInfo.value.push(2)
          tempconsumptionIds.value.push(2)
        }
        if (key == 'total_recharge_money' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          cumulativeRecharge.value[0] = formatUnix(data.search_data[key].time[0])
          cumulativeRecharge.value[1] = formatUnix(data.search_data[key].time[1])
          consumptionInfo.value.push(3)
          tempconsumptionIds.value.push(3)
        }
        if (key == 'total_recharge_nums' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          rechargeTimes.value[0] = formatUnix(data.search_data[key].time[0])
          rechargeTimes.value[1] = formatUnix(data.search_data[key].time[1])
          consumptionInfo.value.push(4)
          tempconsumptionIds.value.push(4)
        }
        if (key == 'unconsumption_days' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          consumptionInfo.value.push(5)
          tempconsumptionIds.value.push(5)
        }

        if (key == 'total_coupon_send' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          marketingInfo.value.push(1)
          tempMarketingIds.value.push(1)
        }
        if (key == 'total_coupon_used' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          marketingInfo.value.push(2)
          tempMarketingIds.value.push(2)
        }
        if (key == 'coupon' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          availableCoupons.value[0] = formatUnix(data.search_data[key].time[0])
          availableCoupons.value[1] = formatUnix(data.search_data[key].time[1])
          marketingInfo.value.push(3)
          tempMarketingIds.value.push(3)
        }
        if (key == 'total_coupon_unused' && data.search_data[key]) {
          search_user.value[key] = data.search_data[key]
          tempSearch_user.value[key] = data.search_data[key]
          numberCouponsAvailable.value[0] = formatUnix(data.search_data[key].time[0])
          numberCouponsAvailable.value[1] = formatUnix(data.search_data[key].time[1])
          marketingInfo.value.push(4)
          tempMarketingIds.value.push(4)
        }
      }
    })
  }
  // 新增群体
  const refRuleForm = ref<any>()
  const addGroup = (summary?: string) => {
    refRuleForm.value.validate(async (valid: any) => {
      if (valid) {
        // 注册时间
        const isJointime =
          registerTime.value != null &&
          registerTime.value.length > 0 &&
          search_user.value.jointime != null &&
          search_user.value.jointime != undefined
        if (isJointime) {
          registerTime.value.forEach((item: any, index: number) => {
            search_user.value.jointime.between[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.jointime.between[index] = dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 消费次数时间区间
        const isTotalOrderNums =
          shoppingTimes.value != null &&
          shoppingTimes.value.length > 0 &&
          search_user.value.total_order_nums != null &&
          search_user.value.total_order_nums != undefined
        if (isTotalOrderNums) {
          shoppingTimes.value.forEach((item: any, index: number) => {
            search_user.value.total_order_nums.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.total_order_nums.time[index] =
                dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 累计消费时间区间
        const isTotalOrderMoney =
          consumptionTimes.value != null &&
          consumptionTimes.value.length > 0 &&
          search_user.value.total_order_money != null &&
          search_user.value.total_order_money != undefined
        if (isTotalOrderMoney) {
          consumptionTimes.value.forEach((item: any, index: number) => {
            search_user.value.total_order_money.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.total_order_money.time[index] =
                dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 累计充值时间区间
        const isTotalRechargeMoney =
          cumulativeRecharge.value != null &&
          cumulativeRecharge.value.length > 0 &&
          search_user.value.total_recharge_money != null &&
          search_user.value.total_recharge_money != undefined
        if (isTotalRechargeMoney) {
          cumulativeRecharge.value.forEach((item: any, index: number) => {
            search_user.value.total_recharge_money.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.total_recharge_money.time[index] =
                dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 充值次数时间区间
        const isTotalRechargeNums =
          rechargeTimes.value != null &&
          rechargeTimes.value.length > 0 &&
          search_user.value.total_recharge_nums != null &&
          search_user.value.total_recharge_nums != undefined
        if (isTotalRechargeNums) {
          rechargeTimes.value.forEach((item: any, index: number) => {
            search_user.value.total_recharge_nums.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.total_recharge_nums.time[index] =
                dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 可用券名称时间区间
        const isCoupon =
          availableCoupons.value != null &&
          availableCoupons.value.length > 0 &&
          search_user.value.coupon != null &&
          search_user.value.coupon != undefined
        if (isCoupon) {
          availableCoupons.value.forEach((item: any, index: number) => {
            search_user.value.coupon.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.coupon.time[index] = dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        // 可用券张数时间区间
        const isTotalCouponUnused =
          numberCouponsAvailable.value != null &&
          numberCouponsAvailable.value.length > 0 &&
          search_user.value.total_coupon_unused != null &&
          search_user.value.total_coupon_unused != undefined
        if (isTotalCouponUnused) {
          numberCouponsAvailable.value.forEach((item: any, index: number) => {
            search_user.value.total_coupon_unused.time[index] = dayjs(item).unix()
            if (index == 1) {
              search_user.value.total_coupon_unused.time[index] =
                dayjs(item).unix() + (24 * 60 * 60 - 1)
            }
          })
        }
        ruleForm.value.search_user = search_user.value
        if (summary == 'edit') {
          const res = await reqShopGroupManagementGather({
            page: 1,
            limit: 50,
            search_user: search_user.value
          })
          if (res.data.data != null) {
            tableList.value = res.data.data.data
          }
          return
        }
        if (editCouponId != undefined) {
          ruleForm.value.id = editCouponId
          await reqShopGroupManagementEdit(ruleForm.value)
          router.push('/marke/groupManage')
          ElMessage.success('编辑成功!')
        } else {
          await reqShopGroupManagementAdd(ruleForm.value)
          router.push('/marke/groupManage')
          ElMessage.success('新增成功!')
        }
      } else {
        return false
      }
    })
  }
</script>
<style lang="scss" scoped>
  :deep(.el-range-editor.el-input__inner) {
    width: 274px;
  }
  .header-card {
    color: #000;
    margin-bottom: 24px;
    :deep(.el-form-item__label) {
      color: #000;
    }
    .el-checkbox {
      color: #000;
    }
    .el-input {
      width: 200px;
    }
  }
  .main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 14px;
    .main-card {
      width: 24%;
      margin-bottom: 14px;
    }
    .main-item {
      height: 160px;

      .el-radio {
        color: #000;
      }
      .item-box {
        display: flex;
        align-items: center;
        position: relative;
        color: #000;
        &:nth-child(1) {
          margin-bottom: 20px;
        }
        &:nth-child(2) {
          margin-bottom: 26px;
        }
        .item-left {
          margin-right: 20px;
          .input-width {
            width: 274px;
          }
          .el-input-width {
            width: 200px;
          }
          &.three {
            width: 56px;
            text-align: right;
          }
          .price-input-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .separateText {
              margin: 0 5px;
            }
            .price-input {
              position: relative;
              width: 125px;
              height: 32px;
              text-align: center;
              .el-input {
                line-height: normal !important;
              }
              :deep(.el-input-group__append, .el-input-group__prepend) {
                padding: 0 10px;
              }
            }
          }
        }
        .icon-box {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .table-card {
    .goods {
      display: flex;
      .picture {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      .classification {
        .navigation {
          color: #000000;
        }
        .channel {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    .el-tag {
      line-height: 18px;
      height: 20px;
      margin-right: 14px;
      padding: 0 5px;
    }
  }
  // 底部固定按钮card
  .footer-card {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: -20px;
    z-index: 30;
    margin-top: 300px;
    :deep(.el-card__body, .el-main) {
      height: 50px;
    }
    .button-box {
      display: flex;
      justify-content: center;
      .el-button {
        width: 120px;
        margin: 0 15px;
      }
    }
  }
</style>
