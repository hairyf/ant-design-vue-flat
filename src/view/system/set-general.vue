<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-10 15:19:40
 * @Description: 调整余额
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="set-general">
    <el-form
      :model="ruleForms"
      :rules="rules"
      ref="configureForm"
      label-width="130px"
      class="demo-ruleForms"
    >
      <el-card shadow="never" class="box-card">
        <div class="recharge-title">商城状态</div>
        <el-form-item label="商城状态" prop="region">
          <el-radio-group v-model="ruleForms.mallStatus">
            <el-radio label="营业"></el-radio>
            <el-radio label="休息"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关闭后进入跳转至" v-if="ruleForms.mallStatus == '休息'">
          <el-input
            style="width: 320px"
            type="text"
            placeholder="输入跳转链接"
            v-model="ruleForms.link"
          ></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="businessSet">
          <div>
            <el-radio-group v-model="ruleForms.businessSet">
              <el-radio label="全天"></el-radio>
              <el-radio label="自定义"></el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="businessHours" v-if="ruleForms.businessSet == '自定义'">
          <el-time-picker
            arrow-control
            is-range
            v-model="ruleForms.businessHours"
            range-separator="至"
            format="HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="首页数据" prop="region">
          <el-radio-group v-model="ruleForms.homeData">
            <el-radio label="昨日数据"></el-radio>
            <el-radio label="今日数据"></el-radio>
            <el-radio label="7天数据"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-card>
      <el-card shadow="never" class="box-card">
        <div class="recharge-title">商城设置</div>
        <el-form-item label="商城名称" prop="mallName" class="set-shop-name">
          <el-input
            type="text"
            placeholder="请输入商城名字"
            v-model="ruleForms.mallName"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商城LOGO" prop="mallPictures">
          <el-image
            class="el-upload-list__item-thumbnail"
            :src="ruleForms.mallPictures"
            fit="cover"
            alt=""
          />
          <div>
            <el-button type="text" @click="addProduct(0)">选择图片</el-button>
            <div class="el-upload__tip text-style">
              图片为正方形，建议尺寸800*800，用于商城首页分享的系统默认宣传图
            </div>
          </div>
        </el-form-item>
        <el-form-item label="客服电话" prop="service_phone" class="set-shop-introduce">
          <el-input
            style="width: 320px"
            type="number"
            placeholder="请输入联系电话"
            v-model="ruleForms.service_phone"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商城简介" prop="mallIntroduction" class="set-shop-introduce">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="ruleForms.mallIntroduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="加载图标">
          <div class="oe-flex">
            <el-radio-group v-model="ruleForms.loadIconType">
              <el-radio label="系统默认"></el-radio>
              <el-radio label="自定义"></el-radio>
            </el-radio-group>
            <el-popover placement="right" :width="360" trigger="hover">
              <el-image
                src="/custom-assets/images/system/product-loading.png"
                class="examples-img"
                style="width: 351px; height: 250px"
                fit="cover"
              />
              <template #reference>
                <div class="set-icon-text">
                  <i class="el-icon-warning-outline"></i>
                  <span>示例</span>
                </div>
              </template>
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <el-image src="" fit="cover" class="img-size">
            <template #error>
              <div class="image-slot">
                <i :class=""></i>
              
              </div>
            </template>
          </el-image> -->
          <el-image
            fit="cover"
            v-if="ruleForms.loadIconType == '系统默认'"
            src="http://cdn.weitshop.cn/uploads/shop/id_1/group_47/202104/2756_img.png"
          >
          </el-image>
          <el-image
            v-if="ruleForms.loadIconType != '系统默认'"
            fit="cover"
            :src="ruleForms.loadIcon"
          >
          </el-image>
          <div>
            <el-button
              type="text"
              v-if="ruleForms.loadIconType != '系统默认'"
              @click="addProduct(1)"
              >选择图片</el-button
            >
            <p class="text-style"
              >图片为正方形，建议尺寸200*200，用于网络较慢图片未加载出来的占位图</p
            >
          </div>
        </el-form-item>
        <el-form-item label="商城图片预览" prop="region" class="set-shop-introduce">
          <el-radio-group v-model="ruleForms.picturePreview">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
          <p class="text-style"> 关闭时, 买家在手机端无法放大查看完整商品图片和商品情图片 </p>
        </el-form-item>
        <el-form-item label="版权显示设置" prop="region" class="set-shop-introduce">
          <el-radio-group v-model="ruleForms.copyright.type">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="版权显示内容"
          class="set-shop-introduce"
          v-if="ruleForms.copyright.type == '1'"
        >
          <el-input
            style="width: 320px"
            placeholder="请输入版权内容"
            v-model="ruleForms.copyright.value"
          >
          </el-input>
        </el-form-item>
      </el-card>
      <el-card shadow="never" class="box-card">
        <div class="recharge-title">注册设置</div>
        <el-form-item label="协议/政策" prop="region">
          <el-radio-group v-model="ruleForms.agreement">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
          <p class="text-style">注册会员时, 是否显示注册协议和隐私政策</p>
        </el-form-item>
        <el-form-item label="协议标题" prop="name" class="set-shop-name">
          <div class="oe-flex">
            <el-input
              type="text"
              placeholder="请输入协议标题"
              v-model="ruleForms.agreementTilte"
              maxlength="10"
              show-word-limit
            ></el-input>
            <a :href="downloadUrl" class="download-text">下载协议模板</a>
          </div>
          <div class="tips-box"> 协议需公证才生效，使用前，请先公证 </div>
        </el-form-item>
        <el-form-item label="协议内容" prop="region" class="text-line-height">
          <tinymce-editor class="rich-text" v-model="ruleForms.agreementContent" width="100%" />
        </el-form-item>
      </el-card>
      <el-card shadow="never" class="box-card">
        <div class="recharge-title">授权/关注</div>
        <el-form-item label="授权登录" prop="region">
          <el-radio-group v-model="ruleForms.authorizedLogin">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
          <el-popover placement="top" :width="200" trigger="hover">
            <el-image
              src="/custom-assets/images/system/open-configure.png"
              class="examples-img"
              style="width: 193px; height: 230px"
            />
            <template #reference>
              <div class="set-icon-text">
                <i class="el-icon-warning-outline"></i>
                <span>示例</span>
              </div>
            </template>
          </el-popover>
          <p class="text-style"> 开启后, 用户进入店铺时, 强制弹出授权登录弹窗引导登录成为会员 </p>
        </el-form-item>
        <el-form-item v-if="ruleForms.authorizedLogin == '开启'">
          <el-checkbox v-model="ruleForms.displayBtn"></el-checkbox>
          不显示“暂不登录”按钮（不推荐）
          <el-popover placement="top" :width="200" trigger="hover">
            <el-image
              src="/custom-assets/images/system/login-configuration.png"
              class="examples-img"
              style="width: 193px; height: 230px"
            />
            <template #reference>
              <div class="set-icon-text">
                <i class="el-icon-warning-outline"></i>
                <span>示例</span>
              </div>
            </template>
          </el-popover>
        </el-form-item>
      </el-card>
    </el-form>
    <el-card shadow="never">
      <div class="set-footer">
        <el-button @click="getsetKeyConfig">取消</el-button>
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqSetKeyConfig, reqModifyConfig, reqDownloadLoginTemplate } from '@/api/system'
  import { MaterialSelect, LinkSelect } from '@/components/selectors'
  import dayjs from 'dayjs'
  import TinymceEditor from '@/components/tinymce-editor/tinymce-editor.vue'
  import store from '@/store'
  const configureForm = ref<any>('')
  const ruleForms = ref({
    // 营业设置
    businessSet: '',
    // 首页数据
    homeData: '',
    // 营业时间
    businessHours: [] as any,
    // 商城状态
    mallStatus: '',
    // 链接
    link: '',
    // 商城名称
    mallName: '',
    // 商城logog
    mallPictures: '',
    // 客服电话
    service_phone: '',
    // 商城简介
    mallIntroduction: '',
    // 加载图标设置
    loadIconType: '',
    // 加载图标
    loadIcon: '',
    //商城图片预览
    picturePreview: '',
    // 版权显示设置/内容
    copyright: {
      type: '1',
      value: ''
    },
    // 协议/政策
    agreement: '',
    // 协议标题
    agreementTilte: '',
    // 协议内容
    agreementContent: '',
    // 授权登录
    authorizedLogin: '',
    displayBtn: false
  })
  // 转换的时间
  const time = ref(['', ''])
  const downloadUrl = ref('')
  // 客服电话验证规则
  const customerService = (rule: any, value: any, callback: any) => {
    const emailReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    const mobileReg = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/
    const isAccountEmail = emailReg.test(value)
    const isAccountMobile = mobileReg.test(value)
    if (value == '') {
      callback(new Error('请输入客服电话'))
    } else if (!(isAccountEmail || isAccountMobile)) {
      callback(new Error('格式不正确'))
    } else {
      callback()
    }
  }
  // 验证
  const rules = ref({
    businessSet: [{ required: true, message: '请选择营业设置', trigger: 'blur' }],
    businessHours: [{ required: true, message: '请输入营业时间', trigger: 'blur' }],
    mallName: [{ required: true, message: '请输入商城名称', trigger: 'blur' }],
    mallPictures: [{ required: true, message: '请上传商品LOGO', trigger: 'blur' }],
    mallIntroduction: [{ required: true, message: '请输入商城简介', trigger: 'blur' }],
    service_phone: [{ required: true, validator: customerService, trigger: 'blur' }]
  })
  // 图片选择器
  const addProduct = (num: number) => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      if (num == 0) {
        ruleForms.value.mallPictures = res[0].path.url
      } else {
        ruleForms.value.loadIcon = res[0].path.url
      }
    })
  }
  // 保存按钮
  const preservation = () => {
    configureForm.value.validate((valid: boolean) => {
      if (valid) {
        modifyConfigure()
      }
    })
  }
  // 修改配置
  const modifyConfigure = async () => {
    if (ruleForms.value.businessSet == '自定义') {
      time.value[0] = dayjs(ruleForms.value.businessHours[0]).unix().toString()
      time.value[1] = dayjs(ruleForms.value.businessHours[1]).unix().toString()
    }
    const key = 'ShopSet'
    const data = {
      run_status: {
        type: ruleForms.value.mallStatus == '休息' ? '1' : '0',
        value: ruleForms.value.link
      },
      business_hours: {
        type: ruleForms.value.businessSet == '全天' ? '0' : '1',
        value: time.value
      },
      index_data:
        ruleForms.value.homeData == '今日数据'
          ? 'today'
          : ruleForms.value.homeData == '昨日数据'
          ? 'yester'
          : 'hebdomad',
      shop_name: ruleForms.value.mallName,
      logo: ruleForms.value.mallPictures,
      service_phone: ruleForms.value.service_phone,
      introduce: ruleForms.value.mallIntroduction,
      load_image: {
        type: ruleForms.value.loadIconType == '系统默认' ? '0' : '1',
        value:
          ruleForms.value.loadIconType == '系统默认'
            ? 'http://cdn.weitshop.cn/uploads/shop/id_1/group_47/202104/2756_img.png'
            : ruleForms.value.loadIcon
      },
      image_preview: ruleForms.value.picturePreview == '开启' ? '1' : '0',
      agreement: ruleForms.value.agreement == '开启' ? '1' : '0',
      title: ruleForms.value.agreementTilte,
      content: ruleForms.value.agreementContent,
      auth_login: ruleForms.value.authorizedLogin == '开启' ? '1' : '0',
      copyright: ruleForms.value.copyright
    } as any
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getsetKeyConfig()
  }
  // 获取默认配置
  const getsetKeyConfig = async () => {
    await store.dispatch('generalSettings', { key: 'ShopSet' })

    const { data } = await reqSetKeyConfig({ key: 'ShopSet' })
    const configureData = data.data
    ruleForms.value.service_phone = configureData.shopSet.service_phone
    ruleForms.value.copyright = configureData.shopSet.copyright
    ruleForms.value.mallStatus = configureData.shopStatus.run_status.type == '0' ? '营业' : '休息'
    ruleForms.value.link = configureData.shopStatus.run_status.value
    ruleForms.value.businessSet =
      configureData.shopStatus.business_hours.type == '0' ? '全天' : '自定义'
    ruleForms.value.businessHours[0] = configureData.shopStatus.business_hours.value[0] * 1000
    ruleForms.value.businessHours[1] = configureData.shopStatus.business_hours.value[1] * 1000
    ruleForms.value.homeData =
      configureData.shopStatus.index_data == 'today'
        ? '今日数据'
        : configureData.shopStatus.index_data == 'yester'
        ? '昨日数据'
        : '7天数据'
    ruleForms.value.mallName = configureData.shopSet.shop_name
    ruleForms.value.mallPictures = configureData.shopSet.logo
    ruleForms.value.mallIntroduction = configureData.shopSet.introduce
    ruleForms.value.loadIconType =
      configureData.shopSet.load_image.type == '1' ? '自定义' : '系统默认'
    ruleForms.value.loadIcon = configureData.shopSet.load_image.value
    ruleForms.value.picturePreview = configureData.shopSet.image_preview == '1' ? '开启' : '关闭'
    ruleForms.value.agreement = configureData.registerSet.agreement == '1' ? '开启' : '关闭'
    ruleForms.value.agreementTilte = configureData.registerSet.title
    ruleForms.value.agreementContent = configureData.registerSet.content
    ruleForms.value.authorizedLogin = configureData.auth.auth_login == '1' ? '开启' : '关闭'
  }
  onMounted(async () => {
    getsetKeyConfig()
    const { data } = await reqDownloadLoginTemplate()
    downloadUrl.value = data.data
  })
</script>
<style lang="scss" scoped>
  .text-style {
    font-size: 12px;
    color: #8c8c8c;
    margin: 0;
  }
  :deep(.el-radio__label) {
    color: #000;
    line-height: 32px;
  }
  :deep(.el-form-item__label) {
    line-height: 32px;
    color: #000;
  }
  :deep(.el-form-item__content) {
    line-height: 32px;
    div {
      line-height: 15px;
    }
  }
  .text-style-warnning {
    font-size: 12px;
    color: #ff0000;
  }
  .el-image {
    cursor: pointer;
    width: 100px;
    height: 100px;
  }
  .recharge-title {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 15px;
  }
  :deep(.el-textarea__inner) {
    width: 660px;
    height: 52px;
  }
  :deep(.el-date-editor) {
    width: 280px;
    height: 32px;
    line-height: 32px;
    .el-input__icon {
      line-height: 28px;
    }
    .el-range-separator {
      line-height: 28px;
    }
  }
  .set-general {
    :deep(.el-card) {
      margin: 15px 0;
    }
    .set-shop-name {
      .el-input {
        width: 230px;
      }
    }
    .set-shop-introduce {
      .el-textarea {
        width: 400px;
      }
    }
  }
  .set-icon-text {
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
    color: var(--color-primary);
    i {
      color: var(--color-primary);
    }
  }
  .set-general {
    .img-size {
      width: 100px;
      height: 100px;
      .image-slot {
        width: 100%;
        height: 100%;
        font-size: 100px;
        color: #8c8c8c;
      }
    }
    .set-footer {
      display: flex;
      justify-content: center;
      .el-button {
        width: 180px;
      }
    }
  }
  .skip-off {
    .el-input {
      width: 340px;
    }
  }
  .tips-box {
    margin-top: 15px;
    font-size: 12px;
    color: red;
  }
  .download-text {
    margin-left: 28px;
    color: var(--color-primary);
    text-decoration: none;
  }
</style>
