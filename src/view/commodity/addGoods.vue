<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-12 10:55:18
 * @Description: 新增商品
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="commodity-content">
    <el-card shadow="never" class="oe-m-b-24">
      <el-tabs class="custom-tabs" v-model="currentType">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="商品详情" name="2"></el-tab-pane>
        <el-tab-pane label="商品参数" name="3"></el-tab-pane>
      </el-tabs>
      <div v-show="currentType == '1'" class="basic-information">
        <div class="type-title">商品类型</div>
        <div class="goods-type">
          <div
            class="type-item oe-m-r-24"
            :class="goodsRuleForm.goods_type == item.id ? 'border' : ''"
            @click="changeActiveType(item.id)"
            v-for="item in typeList"
            :key="item.id"
          >
            <div class="icon" v-if="goodsRuleForm.goods_type == item.id">
              <i class="el-icon-check yes"></i>
            </div>
            <div class="beijing">
              <el-image :src="`/custom-assets/images/addgoods/${item.image}`"></el-image>
            </div>
            <div class="item-left">
              <el-image :src="`/custom-assets/images/addgoods/${item.icon}`"></el-image>
            </div>
            <div class="item-right">
              <div class="top">{{ item.type }}</div>
              <div class="bottom">{{ item.mode }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentType == '2'" class="product-details">
        <div class="related-goods oe-m-t-20 oe-m-b-30">
          <span class="left-text">关联商品 </span>
          <span class="right-text"> 作用于商城列表、分享头图；建议尺寸：750*750像素</span>
        </div>
        <div class="image-list">
          <div class="carousel" v-for="(item, index) in relatedGoods" :key="index">
            <div class="upload-image-container">
              <el-image class="upload-image" :src="item.main_picture" />
              <i class="el-icon-close" @click.stop="deleteRelatedGoods(index)" />
            </div>
            <el-link
              class="replace"
              @click.stop="replaceRelatedGoods(index)"
              type="primary"
              href="javascript:;"
              >替换</el-link
            >
          </div>
          <div
            v-if="relatedGoods.length < 10"
            class="custom-upload-container"
            @click="changeRelatedGoods"
          >
            <i class="el-icon-plus" />
            <span class="tips">添加商品</span>
            <span class="count">（{{ relatedGoods.length }}/10）</span>
          </div>
        </div>
      </div>
      <div v-show="currentType == '3'" class="commodity-parameters">
        <div class="title">参数设置</div>
        <div class="template-box">
          <span class="type">类型</span>
          <el-radio v-model="goodsRuleForm.goods_param_type" label="2">已有参数</el-radio>
          <el-radio v-model="goodsRuleForm.goods_param_type" label="3">上传图片</el-radio>
          <el-radio v-model="goodsRuleForm.goods_param_type" label="4">自定义</el-radio>
          <el-radio v-model="goodsRuleForm.goods_param_type" label="5">不启用</el-radio>
        </div>
        <div class="template-box oe-m-t-20" v-show="goodsRuleForm.goods_param_type == '2'">
          <span class="type type-select">参数选择</span>
          <el-select
            @change="changeParameter"
            v-model="existingParameters"
            size="small"
            class="input-width"
            placeholder="请选择"
          >
            <el-option
              v-for="item in productParameter"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <div class="color refresh template-new">
            <span>
              <span class="introduce oe-m-r-5">没有合适的参数</span>
              <el-button @click="openClass('addParame')" type="text">新增参数</el-button>
              <el-button type="text">|</el-button>
              <el-button @click="refreshClass('parameter')" type="text">刷新</el-button>
            </span>
          </div>
        </div>
        <!-- 填充式模板 end -->
      </div>
    </el-card>
    <!-- 基础信息 -->
    <el-form
      v-show="currentType == '1'"
      :model="goodsRuleForm"
      :rules="goodsRules"
      ref="addGoodsRuleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-card shadow="never" class="oe-m-b-24">
        <div class="type-title">基础信息</div>
        <el-form-item label="商品名称" prop="title">
          <el-input
            type="text"
            placeholder="请输入商品名称"
            class="input-width"
            v-model="goodsRuleForm.title"
            size="small"
            maxlength="40"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品副标题">
          <el-input
            type="textarea"
            placeholder="为了增强商品的流量，建议添加内容突出商品特色和风格"
            class="input-width"
            v-model="goodsRuleForm.vice_title"
            size="small"
            maxlength="90"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品主图" prop="main_picture">
          <div class="image-list" @click="changeMainPicture">
            <div class="upload-image-container" v-if="!!goodsRuleForm.main_picture">
              <el-image class="upload-image" :src="goodsRuleForm.main_picture" />
              <i class="el-icon-close" @click.stop="goodsRuleForm.main_picture = ''" />
            </div>
            <div v-else class="custom-upload-container">
              <i class="el-icon-plus" />
              <span class="tips">添加图片</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="主图视频">
          <div class="oe-flex">
            <div class="image-list" @click="changeMainVideo">
              <div class="upload-image-container" v-if="!!goodsRuleForm.video">
                <!-- <el-image class="upload-image" :src="goodsRuleForm.video" /> -->
                <video :src="goodsRuleForm.video"></video>
                <i class="el-icon-close" @click.stop="goodsRuleForm.video = ''" />
              </div>
              <div v-else class="custom-upload-container">
                <i class="el-icon-plus" />
                <span class="tips">添加视频</span>
              </div>
            </div>
            <div class="image-list" @click="changeVideoCover">
              <div class="upload-image-container" v-if="!!goodsRuleForm.video_cover">
                <el-image class="upload-image" :src="goodsRuleForm.video_cover" />
                <i class="el-icon-close" @click.stop="goodsRuleForm.video_cover = ''" />
              </div>
              <div v-else class="custom-upload-container">
                <i class="el-icon-plus" />
                <span class="tips">视频封面</span>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品轮播图" prop="slideshow">
          <div class="image-list">
            <div class="carousel" v-for="(item, index) in productRotation" :key="index">
              <div class="upload-image-container">
                <el-image class="upload-image" :src="item" />
                <i class="el-icon-close" @click.stop="deleteCarousel(index)" />
              </div>
              <el-link
                class="replace"
                @click.stop="replaceCarousel(index)"
                type="primary"
                href="javascript:;"
                >替换</el-link
              >
            </div>
            <div class="custom-upload-container" @click="changeProductRotation">
              <i class="el-icon-plus" />
              <span class="tips">添加图片</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            @change="changeClassNode"
            v-model="classIdValue"
            size="small"
            :options="commodityClassOptions"
            :props="classificationProps"
            clearable
          >
          </el-cascader>
          <div class="color refresh">
            <span>
              <span class="introduce">商品可以属于多个分类 </span>
              <el-button @click="openClass('editClassification')" type="text">新增分类</el-button>
              <el-button type="text">|</el-button>
              <el-button @click="refreshClass('class')" type="text">刷新</el-button>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="营销标签">
          <el-checkbox-group v-model="goodsRuleForm.marketing_tab">
            <el-checkbox label="1">推荐</el-checkbox>
            <el-checkbox label="2">新品</el-checkbox>
            <el-checkbox label="3">热销</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="服务支持">
          <el-cascader
            v-model="goodsRuleForm.serviceId"
            size="small"
            :options="productSupport"
            :props="classProps"
            clearable
          >
          </el-cascader>
          <div class="color refresh">
            <span>
              <span class="introduce">商品可以属于多个商品支持 </span>
              <el-button @click="openClass('addSupport')" type="text">新增服务支持</el-button>
              <el-button type="text">|</el-button>
              <el-button @click="refreshClass('support')" type="text">刷新</el-button>
            </span>
          </div>
        </el-form-item>
        <div style="width: fit-content" @click="moreSettings = !moreSettings" class="put-it-away">
          <el-button v-if="moreSettings == false" type="text">展开更多基础设置</el-button>
          <el-button v-else type="text">收起更多基础设置</el-button>
        </div>
        <div class="advanced-setting" v-show="moreSettings">
          <el-form-item label="加入购物车" class="buy-button">
            <el-switch
              v-model="goodsRuleForm.cart_type"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="商品分组">
            <!-- <el-select
              size="small"
              v-model.number="goodsRuleForm.groupId"
              class="input-width"
              placeholder="请选择"
            >
              <el-option
                v-for="item in productGrouping"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select> -->
            <el-cascader
              v-model="goodsRuleForm.groupId"
              size="small"
              :options="productGrouping"
              :props="classProps"
              clearable
            >
            </el-cascader>
            <div class="color refresh">
              <span>
                <span class="introduce">商品可以属于多个分组 </span>
                <el-button @click="openClass('addGrouping')" type="text">新增商品分组</el-button>
                <el-button type="text">|</el-button>
                <el-button @click="refreshClass('grouping')" type="text">刷新</el-button>
              </span>
            </div>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-cascader
              size="small"
              v-model="tabValue"
              :options="commodityLabelOptions"
              :props="classProps"
              clearable
            >
            </el-cascader>
            <div class="color refresh">
              <span>
                <span class="introduce">商品可指定产品标签 </span>
                <el-button @click="openClass('addProductLabeling')" type="text"
                  >新增商品标签</el-button
                >
                <el-button type="text">|</el-button>
                <el-button @click="refreshClass('label')" type="text">刷新</el-button>
              </span>
            </div>
          </el-form-item>
        </div>
      </el-card>
      <!-- 价格库存 -->
      <el-card shadow="never" class="oe-m-b-24">
        <div class="type-title">价格库存</div>
        <el-form-item label="规格类型" class="buy-button black-color">
          <el-radio v-model="goodsRuleForm.norms_type" :label="0">无</el-radio>
          <el-radio v-model="goodsRuleForm.norms_type" :label="1">多规格商品</el-radio>
        </el-form-item>
        <div class="specification-type" v-if="goodsRuleForm.norms_type == 0">
          <el-form-item label="售卖价格" prop="price" class="buy-button">
            <div class="price-input">
              <el-input
                @input="goodsRuleForm.price = inputInterception(goodsRuleForm.price)"
                placeholder="请输入内容"
                v-model="goodsRuleForm.price"
              >
                <template #append>元</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="划线价格" class="buy-button">
            <div class="price-input">
              <el-input
                @input="
                  goodsRuleForm.original_price = inputInterception(goodsRuleForm.original_price)
                "
                placeholder="请输入内容"
                v-model="goodsRuleForm.original_price"
                type="number"
              >
                <template #append>元</template>
              </el-input>
            </div>
            <div class="oe-m-t-10">
              <span>划线价格在商品详情页以划线形式展示，不参与商品金额结算</span>
            </div>
          </el-form-item>
          <el-form-item label="成本价" class="buy-button">
            <div class="price-input">
              <el-input
                @input="goodsRuleForm.cost_price = inputInterception(goodsRuleForm.cost_price)"
                placeholder="请输入内容"
                v-model="goodsRuleForm.cost_price"
                type="number"
              >
                <template #append>元</template>
              </el-input>
            </div>
            <div class="color oe-m-t-10">
              <span> 成本价不对用户展示，仅用于商家后台数据分析</span>
            </div>
          </el-form-item>
          <el-form-item label="商品库存" prop="stock" class="buy-button">
            <div class="price-input">
              <el-input
                @input="goodsRuleForm.stock = inputStock(goodsRuleForm.stock)"
                class="stock-input-width"
                size="small"
                v-model="goodsRuleForm.stock"
                placeholder="请输入库存"
              ></el-input>
            </div>
            <div class="color oe-m-t-10">
              <span> 下单/付款后减少库存，退货/退款增加库存 </span>
            </div>
          </el-form-item>
          <el-form-item label="库存警示" class="buy-button">
            <div class="price-input">
              <el-input
                @input="goodsRuleForm.stock_warning = inputStock(goodsRuleForm.stock_warning)"
                class="stock-input-width"
                size="small"
                v-model="goodsRuleForm.stock_warning"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="color oe-m-t-10">
              <span>
                商品库存少于预警数量，商品列表库存数量标红显示，如需要发送消息通知，请到
                <el-button type="text">消息通知</el-button>
                设置
              </span>
            </div>
          </el-form-item>
        </div>
        <div v-if="goodsRuleForm.norms_type == 1">
          <el-form-item label="商品规格">
            <stock-skus v-model:skus="skus" v-model:table="table" />
          </el-form-item>
        </div>
        <el-form-item label="库存设置" class="buy-button" prop="stock_set">
          <el-radio v-model="goodsRuleForm.stock_set" :label="1">下单减库存</el-radio>
          <div class="color oe-m-t-10">
            <span>
              买家提交订单, 扣减库存数量, 可能会存在
              <el-button class="red-color" type="text">恶意占用库存风险</el-button>
            </span>
          </div>
          <el-radio v-model="goodsRuleForm.stock_set" :label="2">付款减库存</el-radio>
          <div class="color oe-m-t-10">
            <span>
              买家支付成功, 扣减库存数量, 可能会存在
              <el-button class="red-color" type="text">超卖风险</el-button>
            </span>
          </div>
          <el-radio v-model="goodsRuleForm.stock_set" :label="3">永不减库存</el-radio>
          <div class="color oe-m-t-10">
            <span> 无论在下单还是在支付成功, 该商品永远不会扣减库存数量 </span>
          </div>
        </el-form-item>
        <el-form-item label="商品详情显示库存" class="buy-button">
          <el-switch
            v-model="goodsRuleForm.stock_show"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品详情显示销量" class="buy-button">
          <el-switch
            v-model="goodsRuleForm.sales_show"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="虚拟销量" class="buy-button" v-if="goodsRuleForm.sales_show == 1">
          <div class="price-input">
            <el-input
              @input="goodsRuleForm.virtual_sales = inputStock(goodsRuleForm.virtual_sales)"
              placeholder="请输入内容"
              v-model="goodsRuleForm.virtual_sales"
            >
              <template #append>件</template>
            </el-input>
          </div>
          <div class="color oe-m-t-10">
            <span>虚拟销量不计入商品数据统计</span>
          </div>
        </el-form-item>
      </el-card>
      <!-- 物流设置 -->
      <el-card shadow="never" class="oe-m-b-24" v-if="goodsRuleForm.goods_type == 1">
        <!-- 实体物流 -->
        <div class="entity-logistics">
          <div class="type-title">物流设置</div>
          <el-form-item label="商品包邮" class="buy-button">
            <el-switch
              v-model="goodsRuleForm.postage"
              :active-value="2"
              :inactive-value="1"
              active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
          <div v-if="goodsRuleForm.postage == 1">
            <el-form-item label="快递运费" class="buy-button">
              <el-radio v-model="goodsRuleForm.express_fee" :label="1">运费模板</el-radio>
              <el-radio v-model="goodsRuleForm.express_fee" :label="2">统一运费</el-radio>
            </el-form-item>
            <el-form-item
              v-if="goodsRuleForm.express_fee == '2'"
              label="统一运费"
              prop="freight"
              class="buy-button"
            >
              <div class="input-width">
                <el-input-number
                  placeholder="请输入价格"
                  v-model="goodsRuleForm.freight"
                  :controls="false"
                  :min="0.01"
                  :precision="2"
                  style="flex: 1"
                >
                  <template #append>元</template>
                </el-input-number>
              </div>
            </el-form-item>
            <el-form-item
              v-if="goodsRuleForm.express_fee == '1'"
              label="运费模板"
              prop="express_site"
            >
              <el-select
                size="small"
                v-model="goodsRuleForm.express_site"
                class="input-width"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in freightTemplate"
                  :key="item.id"
                  :label="item.dispatch_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <div class="color refresh">
                <span>
                  <span class="introduce">没有合适的模板 </span>
                  <el-button
                    @click="openClass('/system/logisticsDistribution/newTemplate')"
                    type="text"
                  >
                    新增运费模板
                  </el-button>
                  <el-button type="text">|</el-button>
                  <el-button @click="refreshClass('freight')" type="text">刷新</el-button>
                </span>
              </div>
            </el-form-item>
          </div>

          <div
            style="width: fit-content"
            @click="logisticsMore = !logisticsMore"
            class="put-it-away"
          >
            <el-button v-if="logisticsMore == false" type="text">展开更多物流设置</el-button>
            <el-button v-else type="text">收起更多物流设置</el-button>
          </div>
          <div class="more-logistics" v-show="logisticsMore">
            <el-form-item label="商品详情显示快递" class="buy-button">
              <el-switch
                v-model="goodsRuleForm.expressage"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="商品重量" class="buy-button">
              <div class="price-input">
                <el-input
                  @input="goodsRuleForm.weight = inputInterception(goodsRuleForm.weight)"
                  placeholder="请输入内容"
                  v-model="goodsRuleForm.weight"
                >
                  <template #append>千克</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="商品体积" class="buy-button">
              <div class="price-input">
                <el-input
                  @input="goodsRuleForm.volume = inputInterception(goodsRuleForm.volume)"
                  placeholder="请输入内容"
                  v-model="goodsRuleForm.volume"
                  type="number"
                >
                  <template #append>m³</template>
                </el-input>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="oe-m-b-24">
        <div class="type-title">其他设置</div>
        <el-form-item label="商品编码">
          <el-input
            type="text"
            placeholder="请输入商品编码"
            class="input-width"
            v-model="goodsRuleForm.goods_code"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品条形码">
          <el-input
            type="text"
            placeholder="请输入商品条形码"
            class="input-width"
            v-model="goodsRuleForm.bar_code"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="定时下架" prop="timing_sold_out" class="buy-button">
          <el-switch
            v-model="goodsRuleForm.timing_sold_out"
            :active-value="2"
            :inactive-value="1"
            active-color="#13ce66"
          >
          </el-switch>
          <!-- <div v-if="goodsRuleForm.timing_sold_out == 2">
            <el-date-picker
              format="YYYY-MM-DD HH:mm"
              prefix-icon="el-icon-date"
              v-model="goodsRuleForm.timing_sold_out_time"
              type="datetime"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </div> -->
        </el-form-item>
        <el-form-item
          v-if="goodsRuleForm.timing_sold_out == 2"
          label="下架时间"
          prop="timing_sold_out_time"
          class="buy-button"
        >
          <div>
            <el-date-picker
              format="YYYY-MM-DD HH:mm"
              prefix-icon="el-icon-date"
              v-model="goodsRuleForm.timing_sold_out_time"
              type="datetime"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="状态" class="buy-button">
          <el-radio v-model="goodsRuleForm.goods_state" :label="1">待出售</el-radio>
          <el-radio v-model="goodsRuleForm.goods_state" :label="2">上架售卖</el-radio>
          <el-radio v-model="goodsRuleForm.goods_state" :label="3">上架隐藏</el-radio>
          <el-radio v-model="goodsRuleForm.goods_state" :label="4">定时上架</el-radio>
          <el-radio v-model="goodsRuleForm.goods_state" :label="5">放置仓库</el-radio>
        </el-form-item>
        <el-form-item
          v-if="goodsRuleForm.goods_state == 1"
          label="出售时间"
          prop="goods_state_time"
          class="buy-button"
        >
          <div>
            <el-date-picker
              format="YYYY-MM-DD HH:mm"
              v-model="goodsRuleForm.goods_state_time"
              type="datetime"
              placeholder="请选择时间"
              prefix-icon="el-icon-date"
            >
            </el-date-picker>
            <div>待出售的商品无法进行下单购买，仅支持加入购物车</div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="goodsRuleForm.goods_state == 4"
          label="上架时间"
          prop="goods_state_time"
          class="buy-button"
        >
          <div>
            <el-date-picker
              format="YYYY-MM-DD HH:mm"
              v-model="goodsRuleForm.goods_state_time"
              type="datetime"
              placeholder="请选择时间"
              prefix-icon="el-icon-date"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <!-- <el-form-item label="退换货" class="buy-button">
          <el-checkbox-group v-model="goodsRuleForm.type">
            <el-checkbox label="1">退款</el-checkbox>
            <el-checkbox label="2">退货退款</el-checkbox>
            <el-checkbox label="3">换货</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <!-- <div @click="moreOtherSettings = !moreOtherSettings" class="put-it-away">
          <el-button type="text">收起更多其他设置</el-button>
        </div> -->
        <div
          style="width: fit-content"
          @click="moreOtherSettings = !moreOtherSettings"
          class="put-it-away"
        >
          <el-button v-if="moreOtherSettings == false" type="text">展开更多其他设置</el-button>
          <el-button v-else type="text">收起更多其他设置</el-button>
        </div>
        <div class="more-other-settings" v-show="moreOtherSettings">
          <!-- <el-form-item label="开启限购" class="buy-button">
            <el-switch
              v-model="goodsRuleForm.start_purchase_limit"
              :active-value="2"
              :inactive-value="1"
              active-color="#13ce66"
            >
            </el-switch>
          </el-form-item> -->
          <!-- <el-form-item label="浏览权限">
            <el-select
              size="small"
              v-model="goodsRuleForm.browseauthId"
              class="input-width"
              placeholder="请选择"
            >
              <el-option
                v-for="item in membershipLevel"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="购买权限">
            <el-select
              size="small"
              v-model="goodsRuleForm.buyauthId"
              class="input-width"
              placeholder="请选择"
            >
              <el-option
                v-for="item in membershipLevel"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="参与会员权益" class="buy-button">
            <el-checkbox-group v-model="goodsRuleForm.member_equities">
              <el-checkbox label="2">会员价</el-checkbox>
              <el-checkbox label="3">会员等级折扣</el-checkbox>
            </el-checkbox-group>
            <div class="color">
              <span>
                购买该商品，将根据会员的会员等级、会员价计算相应的折扣，权益优先级为：会员价＞会员等级折扣
              </span>
            </div>
          </el-form-item>
        </div>
      </el-card>
    </el-form>
    <!-- footer保存按钮 -->
    <el-card shadow="never" class="footer-card">
      <div class="button-box" v-show="currentType == '1'">
        <el-button @click="submitAddProduct" size="small" type="primary" :loading="isPreservation"
          >保存</el-button
        >
        <el-button size="small" @click="currentType = '2'">下一步</el-button>
      </div>
      <div class="button-box" v-if="currentType == '2'">
        <el-button size="small" @click="currentType = '1'">上一步</el-button>
        <el-button @click="submitAddProduct" size="small" type="primary" :loading="isPreservation"
          >保存</el-button
        >
        <el-button size="small" @click="currentType = '3'">下一步</el-button>
      </div>
      <div class="button-box" v-show="currentType == '3'">
        <el-button size="small" @click="currentType = '2'">上一步</el-button>
        <el-button @click="submitAddProduct" size="small" type="primary" :loading="isPreservation"
          >保存</el-button
        >
      </div>
    </el-card>
    <!-- 商品详情 -->
    <el-row :gutter="20" v-show="currentType == '2'" class="edit-rich-text">
      <el-col :span="18">
        <el-card shadow="never" class="rich-text-card">
          <div class="title">编辑详情</div>
          <tinymce-editor class="rich-text" v-model="goodsRuleForm.goods_detail" width="100%" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="e-grid commodity-and-blue">
          <div class="title">预览</div>
          <div class="picture-preview">
            <div class="goods-detail" v-html="goodsRuleForm.goods_detail"></div>
            <el-image src="/custom-assets/images/addgoods/add-goods-detail.png"></el-image>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 商品参数 -->
    <!-- 自定义列表 -->
    <edit-parameter
      ref="editParams"
      :isType="goodsRuleForm.goods_param_type"
      :parameterLlist="parameterLlist"
      :tableList="tableList"
      v-model:parameterProduct="parameterProduct"
      v-show="currentType == '3' && !(goodsRuleForm.goods_param_type == '5')"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue'
  import { formRules } from '@/hooks/use-form-rules'
  import EditParameter from './addGoods/components/editParameters.vue'
  import TinymceEditor from '@/components/tinymce-editor/tinymce-editor.vue'
  import { MaterialSelect, LinkSelect } from '@/components/selectors'
  import {
    reqGoodsClassList,
    reqGoodsAddEdit,
    reqGoodsServiceList,
    reqGoodsGroupList,
    reqGoodsGoodsTabList,
    reqDispatchExpressIndex,
    reqShopUserLevelIndex,
    reqGoodsParamList,
    reqGoodsList
  } from '@/api/commodity'
  import { useRouter, useRoute } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import dayjs from 'dayjs'
  import { formatUnix } from '@/utils'
  import { inputInterception, inputStock } from '@/hooks/reset-time'
  import StockSkus from '@/components/stock-skus/stock-skus.vue'
  import { cloneDeep } from 'lodash'
  const router = useRouter()
  const route = useRoute()
  const currentID = route.query.id as Key
  const tableList = ref<any>([])
  // sku
  const skus = ref<any>([])
  const table = ref<any>([])
  // 获取ref
  const editParams = ref<any>()
  // 已有参数值
  const existingParameters = ref<Key>()
  // 商品主图
  const changeMainPicture = () => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      goodsRuleForm.value.main_picture = res[0].path.url
    })
  }
  // 主图视频
  const changeMainVideo = () => {
    MaterialSelect({
      multiple: false,
      selectorType: 3
    }).then((res) => {
      goodsRuleForm.value.video = res[0].path.url
    })
  }
  // 视频封面
  const changeVideoCover = () => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      goodsRuleForm.value.video_cover = res[0].path.url
    })
  }

  // 商品轮播图
  const changeProductRotation = () => {
    MaterialSelect({
      multiple: true
    }).then((res) => {
      console.log(res, '商品轮播图')
      if (res.length > 10) {
        ElMessage.success('轮播图最多只能添加十张')
        return
      }
      if (res.length + productRotation.value.length > 10) {
        ElMessage.success('轮播图最多只能添加十张')
      } else {
        res.forEach((item: any) => {
          productRotation.value.push(item.path.url)
        })
      }
    })
  }

  // 删除轮播的当前项
  const deleteCarousel = (index: number) => {
    productRotation.value.splice(index, 1)
  }

  // 替换轮播的当前项
  const replaceCarousel = (index: number) => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      productRotation.value.splice(index, 1, res[0].path.url)
    })
  }

  // 商品轮播图数据
  const productRotation = ref<any[]>([])
  // 关联商品商品选择器(链接选择器)
  const relatedGoods = ref<any[]>([])

  // 关联商品
  const changeRelatedGoods = async () => {
    const res = await LinkSelect({
      option: { commodity: true }
    })
    console.log('select关联商品', res)
    const isPush = relatedGoods.value.every((item: any) => item.id != res.value.data.id)
    if (isPush) {
      relatedGoods.value.push(res.value.data)
    } else {
      ElMessage.error('已经关联过这个商品')
    }
  }

  // 删除关联商品的当前项
  const deleteRelatedGoods = (index: number) => {
    relatedGoods.value.splice(index, 1)
  }

  // 替换关联商品的当前项
  const replaceRelatedGoods = (index: number) => {
    LinkSelect({
      option: { commodity: true }
    }).then((res) => {
      const isReplace = relatedGoods.value.every((item: any) => item.id != res.value.data.id)
      if (isReplace) {
        relatedGoods.value.splice(index, 1, res.value.data)
      } else {
        ElMessage.error('已经关联过这个商品')
      }
    })
  }
  // router.push('editClassification')
  const openClass = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue
    })
    window.open(href, '_blank')
  }

  // 表单数据
  const goodsRuleForm = ref<any>({
    goods_type: 1,
    title: '',
    vice_title: '',
    main_picture: '',
    video: '',
    video_cover: '',
    slideshow: [],
    classId: [],
    marketing_tab: [],
    serviceId: [],
    cart_type: 1,
    groupId: [],
    tabId: [],
    norms_type: 0,
    price: '',
    original_price: '',
    cost_price: '',
    stock: '',
    stock_warning: '',
    stock_set: 1,
    stock_show: 1,
    sales_show: 1,
    virtual_sales: '',
    postage: 2,
    express_fee: 1,
    express_site: '',
    freight: '',
    expressage: 1,
    weight: '',
    volume: '',
    goods_code: '',
    bar_code: '',
    timing_sold_out: 1,
    timing_sold_out_time: '',
    goods_state: 2,
    goods_state_time: '',
    // 退换货
    // type: [],
    start_purchase_limit: 1,
    // 浏览权限
    // browseauthId: '',
    // 购买权限
    // buyauthId: '',
    member_equities: ['2'],
    relevance_goods_id: '',
    goods_detail: '',
    goods_param_type: '5',
    goods_param: '',
    spec: [],
    options: []
  })
  // 选择时间不能小于当前时间
  const currentTime = (rule: any, value: any, callback: any) => {
    if (value == '' || value == null) {
      callback(new Error('时间不能为空'))
    }
    const currentDate = Date.now()
    const selectDate = dayjs(value).valueOf()
    if (currentDate > selectDate) {
      callback(new Error('选择的时间必须大于当前时间'))
    }
    callback()
  }
  // 表单验证
  const goodsRules = reactive({
    title: [
      { required: true, message: '请输入商品名称', trigger: 'blur' },
      { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
    ],
    main_picture: [{ required: true, message: '请选择商品主图片', trigger: 'blur' }],
    slideshow: [{ required: true, message: '请选择商品轮播图片', trigger: 'blur' }],
    price: [{ required: true, message: '请输入售卖价格', trigger: 'blur' }],
    stock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
    stock_set: [{ required: true, message: '请输入库存', trigger: 'blur' }],
    freight: [{ required: true, message: '请输入运费价格', trigger: 'blur' }],
    express_site: [{ required: true, message: '请选择运费模板', trigger: 'blur' }],
    timing_sold_out: [{ required: true, message: '是否定时下架', trigger: 'blur' }],
    goods_state_time: [{ required: true, validator: currentTime, trigger: 'blur' }],
    timing_sold_out_time: [{ required: true, validator: currentTime, trigger: 'blur' }]
  })
  // 是否收起更多基础设置
  const moreSettings = ref(false)
  // 物流设置更多设置
  const logisticsMore = ref(false)
  // 更多其他设置
  const moreOtherSettings = ref(false)
  // 商品类型导航数据
  const typeList = ref([
    {
      id: 1,
      type: '实体商品',
      mode: '物流发货',
      icon: 'Shape1.png',
      image: 'group1.png'
    },
    {
      id: 2,
      type: '虚拟商品',
      mode: '无需物流',
      icon: 'Shape2.png',
      image: 'group2.png'
    }
  ])
  const currentType = ref('1')
  const changeActiveType = (id: number) => {
    goodsRuleForm.value.goods_type = id
  }
  // 公共props配置
  const classProps = {
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    checkStrictly: true,
    emitPath: false
  } as any
  // 分类props配置
  const classificationProps = {
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    // checkStrictly: true,
    emitPath: false
  } as any
  // 标签
  const tabValue = ref<any>([])
  const commodityLabelOptions = ref<any[]>([])
  // 分类
  const changeClassNode = (value: any) => {
    console.log(value, '改变的值')
  }
  const classIdValue = ref<any>([])
  const commodityClassOptions = ref<any[]>([])
  const refreshClass = (name: string) => {
    const strategy: Record<string, any> = {
      class: getCommodityClass,
      support: getProductSupport,
      grouping: getProductGrouping,
      label: getCommodityLabel,
      parameter: getProductParameter,
      freight: getFreightTemplate
    }
    strategy[name]?.()
    ElMessage({ showClose: true, message: '刷新成功', type: 'success' })
  }
  // 支持
  const productSupport = ref<any>()
  // 分组
  const productGrouping = ref<any>()
  // 运费模板
  const freightTemplate = ref<any>()
  // 会员等级
  const membershipLevel = ref<any>()
  // 商品参数
  const productParameter = ref<any>()
  const parameterLlist = ref<any[]>([])
  const customParameter = ref<any>([])
  const parameterProduct = ref('')
  // 参数改变
  const changeParameter = (paramsId: any) => {
    const el = productParameter.value.find((item: any) => item.id == paramsId)
    el.hideChildren = false
    const arr = []
    arr.push(el)
    console.log(arr[0].summarize, '12312123SSSS')
    parameterLlist.value = arr[0].summarize
    // console.log('参数的值AABVSF', parameterLlist.value)
  }
  // 接口请求
  // 商品标签数据
  const getCommodityLabel = async () => {
    const res = await reqGoodsGoodsTabList()
    commodityLabelOptions.value = res.data.data.data
  }
  getCommodityLabel()
  // 商品分类数据
  const getCommodityClass = async () => {
    const res = await reqGoodsClassList()
    commodityClassOptions.value = res.data.data.data
  }
  getCommodityClass()

  // 商品支持数据
  const getProductSupport = async () => {
    const res = await reqGoodsServiceList({ page: 1, limit: 100 })
    productSupport.value = res.data.data.data
  }
  getProductSupport()
  // 商品分组数据 ////
  const getProductGrouping = async () => {
    const res = await reqGoodsGroupList({ page: 1, limit: 100 })
    productGrouping.value = res.data.data.data
  }
  getProductGrouping()
  // 运费模板数据
  const getFreightTemplate = async () => {
    const res = await reqDispatchExpressIndex({ page: 1, limit: 2000 })
    freightTemplate.value = res.data.data.data
  }
  getFreightTemplate()
  // 会员等级数据
  const getMembershipLevel = async () => {
    const res = await reqShopUserLevelIndex()
    membershipLevel.value = res.data.data.data
  }
  getMembershipLevel()
  // 商品参数数据
  const getProductParameter = async () => {
    const res = await reqGoodsParamList()
    productParameter.value = res.data.data.data
  }
  getProductParameter()

  // 编辑商品
  if (currentID != '-1') {
    const getGoodsInfo = async () => {
      const res = await reqGoodsList({ id: currentID })
      goodsRuleForm.value = res.data.data.data[0]
      goodsRuleForm.value.goods_param_type = goodsRuleForm.value.goods_param_type.toString()
      // goodsRuleForm.value.groupId = goodsRuleForm.value.groupId[0]
      // goodsRuleForm.value.buyauthId = goodsRuleForm.value.buyauthId[0]
      // goodsRuleForm.value.browseauthId = goodsRuleForm.value.browseauthId[0]
      // 轮播图
      productRotation.value = goodsRuleForm.value.slideshow
      classIdValue.value = goodsRuleForm.value.classId
      tabValue.value = goodsRuleForm.value.tabId
      typeList.value.forEach((item) => {
        if (item.id != goodsRuleForm.value.goods_type) {
          const index = typeList.value.findIndex((el: any) => el.id == item.id)
          typeList.value.splice(index, 1)
        }
      })
      // 转换时间
      if (goodsRuleForm.value.timing_sold_out == 2) {
        goodsRuleForm.value.timing_sold_out_time = formatUnix(
          goodsRuleForm.value.timing_sold_out_time
        )
      }
      // 出售时间
      if (goodsRuleForm.value.goods_state == 1 || goodsRuleForm.value.goods_state == 4) {
        goodsRuleForm.value.goods_state_time = formatUnix(goodsRuleForm.value.goods_state_time)
      }
      // 关联商品
      if (goodsRuleForm.value.relevance_goods_id != '') {
        reqGoodsList({ id: goodsRuleForm.value.relevance_goods_id }).then((res) => {
          const data = res.data.data.data
          relatedGoods.value = data
        })
      }
      // sku
      if (goodsRuleForm.value.norms_type == 1) {
        skus.value = cloneDeep(goodsRuleForm.value.spec)
        table.value = cloneDeep(goodsRuleForm.value.option)
      }
      // 参数
      if (goodsRuleForm.value.goods_param_type == '2') {
        existingParameters.value = Number(goodsRuleForm.value.goods_param)
        changeParameter(existingParameters.value)
      }
      if (goodsRuleForm.value.goods_param_type == '4') {
        if (goodsRuleForm.value.goods_param != '') {
          // customParameter.value = JSON.parse(goodsRuleForm.value.goods_param)
          customParameter.value = goodsRuleForm.value.goods_param
          tableList.value = customParameter.value
        }
      }
      if (goodsRuleForm.value.goods_param_type == '3') {
        parameterProduct.value = goodsRuleForm.value.goods_param
      }
    }
    getGoodsInfo()
  }

  const addGoodsRuleForm = ref<any>()
  // 提交新增商品
  // 是否保存成功
  const isPreservation = ref(false)
  const submitAddProduct = () => {
    isPreservation.value = true
    // 商品轮播
    goodsRuleForm.value.slideshow = productRotation.value
    // 商品分类
    goodsRuleForm.value.classId = classIdValue.value

    // 商品标签
    goodsRuleForm.value.tabId = tabValue.value
    addGoodsRuleForm.value.validate(async (valid: any, errorObject: any) => {
      console.log('返回的错误字段', errorObject)
      if (valid) {
        // sku
        if (goodsRuleForm.value.norms_type == 1) {
          goodsRuleForm.value.spec = skus.value
          goodsRuleForm.value.option = table.value
        }
        // 转换时间
        if (goodsRuleForm.value.timing_sold_out == 2) {
          goodsRuleForm.value.timing_sold_out_time = dayjs(
            goodsRuleForm.value.timing_sold_out_time
          ).format('YYYY-MM-DD HH:mm:ss')
        }
        // 出售时间转换
        if (goodsRuleForm.value.goods_state == 1 || goodsRuleForm.value.goods_state == 4) {
          goodsRuleForm.value.goods_state_time = dayjs(goodsRuleForm.value.goods_state_time).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        // 关联商品转为字符串
        if (relatedGoods.value.length > 0) {
          const arr: any = []
          relatedGoods.value.forEach((item) => {
            arr.push(item.id)
          })
          goodsRuleForm.value.relevance_goods_id = arr.join()
        } else {
          goodsRuleForm.value.relevance_goods_id = ''
        }
        if (goodsRuleForm.value.goods_param_type == '4') {
          goodsRuleForm.value.goods_param = tableList.value
        }
        if (goodsRuleForm.value.goods_param_type == '3') {
          goodsRuleForm.value.goods_param = parameterProduct.value
        }
        if (goodsRuleForm.value.goods_param_type == '2') {
          goodsRuleForm.value.goods_param = existingParameters.value
        }
        if (currentID != '-1') {
          goodsRuleForm.value.id = currentID
        }

        // 添加商品接口

        try {
          await reqGoodsAddEdit(goodsRuleForm.value)
        } catch (error) {
          isPreservation.value = false
          return
        }
        if (currentID != '-1') {
          ElMessage.success({
            message: '编辑商品成功',
            type: 'success'
          })
          router.push('admin')
        } else {
          ElMessage.success({
            message: '新增商品成功',
            type: 'success'
          })
          router.push('admin')
        }
        isPreservation.value = false
      } else {
        ElMessage.error({
          message: formRules(errorObject),
          type: 'error'
        })
        isPreservation.value = false
        return false
      }
    })
  }
</script>
<style lang="scss" scoped>
  .black-color {
    color: #000;
  }
  .el-checkbox {
    color: #000;
  }
  .el-radio {
    color: #000;
  }
  // 修改级联选择器宽度
  :deep(.el-cascader--small) {
    width: 45%;
  }
  :deep(.el-form-item__content) {
    color: #8c8c8c;
  }
  // 字体颜色
  :deep(.el-card) {
    color: #8c8c8c;
  }
  // 表单label字体样式
  :deep(.el-form-item__label) {
    color: #000;
  }
  // 上传图片样式 日后封装全局样式
  .image-list {
    display: flex;
    .carousel {
      .replace {
        margin-left: 25px;
      }
    }
    .upload-image-container {
      position: relative;
      margin-right: 25px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      text-align: center;
      &::after {
        content: '';
        position: absolute;
        right: -30px;
        top: -19px;
        width: 106px;
        height: 19px;
        text-align: center;
        font-size: 12px;
        line-height: 30px;
        color: #fff;
        background: var(--color-primary);
        transform: rotate(45deg);
        z-index: 5;
      }
      .el-icon-close {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 10;
        padding: 2px;
        color: #ffffff;
        font-size: 12px;
        cursor: pointer;
      }
      .el-image {
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        margin-bottom: 8px;
      }
    }
    .custom-upload-container {
      margin-right: 25px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px dashed #d9d9d9;
      width: 80px;
      height: 80px;
      cursor: pointer;
      .el-icon-plus {
        font-size: 28px;
        margin-top: 6px;
        color: var(--color-primary);
      }
      .tips {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  // 最大盒子
  .commodity-content {
    padding-bottom: 60px;
    :deep(.el-input) {
      line-height: normal !important;
    }
  }
  // 基础信息 start
  :deep([data-v-4e509590] .el-tabs__item) {
    font-weight: bold;
  }
  .el-button {
    font-size: 12px;
  }
  .red-color {
    color: red;
  }
  // 价格input
  .price-input {
    position: relative;
    width: 270px;
    height: 32px;
    text-align: center;
    // line-height: 32px;
    :deep(.el-input-group__append, .el-input-group__prepend) {
      padding: 0 10px;
    }
  }
  // 立即购买
  .buy-button {
    color: #000;
    .advanced-optios {
      .el-input {
        width: 202px;
      }
    }
  }
  // 收起更多基础设置
  .put-it-away {
    margin-bottom: 26px;
    .el-button {
      font-size: 14px;
    }
  }
  // 轮播图样式 start
  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 80px;
    height: 80px;
  }
  // 轮播图样式 end

  .input-width {
    width: 45%;
    :deep(.el-input-number) {
      width: 100%;
    }
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
  .type-title {
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
    color: #000;
  }
  .goods-type {
    display: flex;
    .type-item {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      padding: 18px;
      width: 156px;
      height: 68px;
      z-index: 8;
      border-radius: 4px;
      border: 1px solid transparent;
      &.border {
        border: 1px solid var(--color-primary);
      }
      .beijing {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      .icon {
        position: absolute;
        right: 0;
        top: 0px;
        width: 16px;
        height: 10px;
        background-color: var(--color-primary);
        z-index: 20;
        .yes {
          position: absolute;
          top: -1px;
          left: 2px;
          color: #fff;
          font-size: 12px;
        }
      }
      .item-left {
        width: 36px;
        // height: 35px;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        .top {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .bottom {
          font-size: 12px;
          color: #8c8c8c;
        }
      }
    }
  }
  // 头部导航样式
  :deep(.el-tabs__item) {
    font-size: 16px;
  }
  // 基础信息 end
  // 商品详情 start
  .product-details {
    .el-icon-plus {
      font-size: 28px;
      margin-bottom: 8px;
      color: var(--color-primary);
    }
    .tips {
      font-size: 12px;
      color: #8c8c8c;
      margin-bottom: 3px;
    }
    .count {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .related-goods {
      .left-text {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
      .right-text {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  // 编辑详情
  .edit-rich-text {
    .e-grid {
      margin-bottom: 20px;
      :deep(.el-card) {
        width: 100%;
        height: 100%;
        .el-card__body {
          height: calc(100% - 40px);
        }
      }
      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
    .rich-text-card {
      .rich-text {
        width: 100%;
      }
    }
    .commodity-and-blue {
      height: 735px;
      .picture-preview {
        position: relative;
        width: 100%;
        height: 100%;
        .goods-detail {
          position: absolute;
          top: 130px;
          left: 40px;
          width: 80%;
          height: 65%;
          color: #000;
          background-color: #fff;
          z-index: 3;
          overflow: scroll;
        }
        .el-image {
          width: 100%;
          height: 92%;
        }
      }
    }
  }
  // 商品详情 end
  // 商品参数 start
  .commodity-parameters {
    color: #000;
    .title {
      margin: 10px 0 30px;
      font-weight: bold;
    }
    .template-box {
      font-size: 14px;
      .type {
        display: inline-block;
        width: 64px;
        padding-left: 28px;
        &.type-select {
          padding-left: 0;
          margin: 20px 28px 0 0;
        }
      }
      .template-new {
        margin-left: 93px;
      }
    }
  }
  // 商品参数 end
  // 底部固定按钮card
  .footer-card {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: -20px;
    z-index: 30;
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
