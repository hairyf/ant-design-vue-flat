<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:16:12
 * @Description: 编辑分类
 * @LastEditors: Mr.wang
-->
<template>
  <el-row class="classification-container" :gutter="20">
    <el-col :sm="24" :xl="4">
      <el-card shadow="never" class="e-grid type-selects">
        <el-tabs class="custom-tabs" v-model="currentTab" @tab-click="selectTabPane">
          <el-tab-pane label="一级分类" name="1"></el-tab-pane>
          <el-tab-pane label="二级分类" name="2"></el-tab-pane>
          <el-tab-pane label="三级分类" name="3"></el-tab-pane>
        </el-tabs>
        <!-- 一级分类 -->
        <div class="template-list" v-show="currentTab == '1'">
          <div @click="active = 1" class="template-item">
            <div class="item-box" :class="active == 1 ? 'active' : ''">
              <div v-show="active == 1" class="icon-box"><i class="icon el-icon-close"></i></div>
              <el-image
                class="iii"
                src="/custom-assets/images/classificationGoods/class-a1.jpg"
                style="width: 120px; height: 135px"
              />
            </div>
            <div class="info-text oe-flex">
              <span>模板1</span>

              <el-popover placement="right" :width="50" trigger="hover">
                <el-image
                  src="/custom-assets/images/classificationGoods/class-hover-a2.jpg"
                  class="examples-img"
                  style="width: 100%; height: 400px"
                />
                <template #reference>
                  <i class="ad-question-circle" />
                </template>
              </el-popover>
            </div>
          </div>
          <div @click="active = 2" class="template-item">
            <div class="item-box" :class="active == 2 ? 'active' : ''">
              <div v-show="active == 2" class="icon-box"><i class="icon el-icon-close"></i></div>
              <el-image
                src="/custom-assets/images/classificationGoods/class-a2.jpg"
                style="width: 120px; height: 135px"
              />
            </div>
            <div class="info-text oe-flex">
              <span>模板2</span>
              <el-popover placement="right" :width="50" trigger="hover">
                <el-image
                  src="/custom-assets/images/classificationGoods/class-hover-a1.jpg"
                  class="examples-img"
                  style="width: 100%; height: 400px"
                />
                <template #reference>
                  <i class="ad-question-circle" />
                </template>
              </el-popover>
            </div>
          </div>
        </div>
        <!-- 二级分类 -->
        <div class="template-list" v-show="currentTab == '2'">
          <div @click="active = 3" class="template-item">
            <div class="item-box" :class="active == 3 ? 'active' : ''">
              <div v-show="active == 3" class="icon-box"><i class="icon el-icon-close"></i></div>
              <el-image
                src="/custom-assets/images/classificationGoods/class-b1.jpg"
                style="width: 120px; height: 135px"
              />
            </div>
            <div class="info-text oe-flex">
              <span>模板1</span>
              <el-popover placement="right" :width="50" trigger="hover">
                <el-image
                  src="/custom-assets/images/classificationGoods/class-hover-b2.jpg"
                  class="examples-img"
                  style="width: 100%; height: 400px"
                />
                <template #reference>
                  <i class="ad-question-circle" />
                </template>
              </el-popover>
            </div>
          </div>
          <div @click="active = 4" class="template-item">
            <div class="item-box" :class="active == 4 ? 'active' : ''">
              <div v-show="active == 4" class="icon-box"><i class="icon el-icon-close"></i></div>
              <el-image
                src="/custom-assets/images/classificationGoods/class-b2.jpg"
                style="width: 120px; height: 135px"
              />
            </div>

            <div class="info-text oe-flex">
              <span>模板2</span>
              <el-popover placement="right" :width="50" trigger="hover">
                <el-image
                  src="/custom-assets/images/classificationGoods/class-hover-b1.jpg"
                  class="examples-img"
                  style="width: 100%; height: 400px"
                />
                <template #reference>
                  <i class="ad-question-circle" />
                </template>
              </el-popover>
            </div>
          </div>
        </div>
        <!-- 三级分类 -->
        <div class="template-list" v-show="currentTab == '3'">
          <div @click="active = 5" class="template-item">
            <div class="item-box" :class="active == 5 ? 'active' : ''">
              <div v-show="active == 5" class="icon-box"><i class="icon el-icon-close"></i></div>
              <el-image
                src="/custom-assets/images/classificationGoods/class-c1.jpg"
                style="width: 120px; height: 135px"
              />
            </div>

            <div class="info-text oe-flex">
              <span>模板1</span>
              <el-popover placement="right" :width="50" trigger="hover">
                <el-image
                  src="/custom-assets/images/classificationGoods/class-hover-c1.jpg"
                  class="examples-img"
                  style="width: 100%; height: 400px"
                />
                <template #reference>
                  <i class="ad-question-circle" />
                </template>
              </el-popover>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="13">
      <el-card shadow="never" class="e-grid propaganda-image">
        <div class="title">宣传图片</div>
        <div class="image-list">
          <div class="upload-image-container" v-if="!!isProductShow">
            <el-image class="upload-image" :src="isProductShow" />
            <i class="el-icon-close" @click="isProductShow = ''" />
            <el-link @click="changeMainPicture" type="primary" href="javascript:;">替换</el-link>
          </div>
          <div v-else @click="changeMainPicture" class="custom-upload-container">
            <i class="el-icon-plus" />
            <span class="tips">添加图片</span>
          </div>
          <div class="linkChoice">
            <div>图片链接</div>
            <div class="selector">
              <link-item
                class="link-input"
                :type="['commodity', 'classification']"
                v-model="linkInfo"
              />
            </div>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="e-grid classification-edit">
        <div class="table-header-container">
          <el-button
            class="oe-m-b-5"
            size="small"
            type="primary"
            @click="
              tableList.unshift({
                name: '',
                status: 1,
                thumb: '',
                hideChildren: false,
                children: []
              })
            "
          >
            <div class="oe-flex">
              <i class="el-icon-plus"></i>
              新增一级分类
            </div>
          </el-button>
          <div class="table-header oe-flex">
            <div style="flex: 5%"></div>
            <div style="flex: 50%">分类名称</div>
            <div style="flex: 20%">分类图片</div>
            <div style="flex: 20%">状态</div>
            <div style="flex: 5%">操作</div>
          </div>
        </div>
        <el-scrollbar class="table-content">
          <nested-sort-table style="width: 100%" v-model="tableList">
            <template #item="{ nestedIndex, item, items, index }">
              <div class="table-slot-item oe-flex" v-if="nestedIndex < currentTab">
                <div style="flex: 5%" class="oe-flex oe-row-between">
                  <i class="ad-tableIcon icon" />
                </div>
                <div style="flex: 50%">
                  <!-- 树形指标 -->
                  <i
                    v-if="nestedIndex"
                    class="ad-Frame1 oe-m-r-14"
                    :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
                  />
                  <!-- 类型名称 -->
                  <el-input
                    v-model="item.name"
                    placeholder="请输入名称"
                    maxlength="10"
                    show-word-limit
                  />
                  <!-- 新增子项 -->
                  <el-link
                    v-if="nestedIndex < currentTab - 1"
                    href="javascript:;"
                    class="oe-m-l-14"
                    type="primary"
                    @click="
                      item.children?.unshift({
                        name: '',
                        status: 1,
                        thumb: '',
                        hideChildren: false,
                        children: []
                      })
                    "
                  >
                    +新增{{ nzh.cn.encodeS(nestedIndex + 2) }}级归类
                  </el-link>
                </div>
                <div style="flex: 20%">
                  <!-- 上传组件 -->
                  <div class="table-upload-image">
                    <div v-if="item.thumb" class="class-image">
                      <el-image @click="changeTabelPicture(item)" fit="cover" :src="item.thumb" />
                      <i class="el-icon-close" @click="item.thumb = ''" />
                    </div>
                    <i v-else @click="changeTabelPicture(item)" class="el-icon-plus"></i>
                  </div>
                </div>
                <div style="flex: 20%">
                  <el-switch
                    v-model="item.status"
                    :active-value="1"
                    :inactive-value="2"
                    active-color="#13ce66"
                    @change="changeSwitch(item)"
                  >
                  </el-switch>
                </div>
                <div style="flex: 5%">
                  <!-- 删除 -->
                  <el-link
                    href="javascript:;"
                    type="primary"
                    @click="deleteClass(items, index, item)"
                  >
                    删除
                  </el-link>
                </div>
              </div>
            </template>
          </nested-sort-table>
        </el-scrollbar>
      </el-card>
    </el-col>
    <el-col :sm="8" :xl="7">
      <el-card shadow="never" class="e-grid mobile-browse">
        <div class="title">预览</div>
        <div class="assembly-box">
          <level-one1
            :banner="isProductShow"
            v-show="active == 2"
            :tableList="tableList"
          ></level-one1>

          <level-one2
            :banner="isProductShow"
            v-show="active == 1"
            :tableList="tableList"
          ></level-one2>

          <level-two1
            :banner="isProductShow"
            v-show="active == 4"
            :tableList="tableList"
          ></level-two1>
          <level-two2
            :banner="isProductShow"
            v-show="active == 3"
            :tableList="tableList"
          ></level-two2>
          <level-three
            v-show="active == 5"
            :banner="isProductShow"
            :tableList="tableList"
          ></level-three>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-card shadow="never" class="fixed-footer">
    <div class="button-box">
      <el-button @click="router.push('/commodity/classification')" size="small">取消</el-button>
      <el-button @click="addClassification" type="primary" size="small">保存</el-button>
    </div>
  </el-card>
  <!-- 链接选择器 -->
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { linkOption } from '@/view/decorate/config/options'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import { reqGoodsClassAddEdit, reqGoodsClassList } from '@/api/commodity'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import LevelThree from './editClassification/components/previewLevel3.vue'
  import LevelTwo1 from './editClassification/components/previewLevel2And1.vue'
  import LevelTwo2 from './editClassification/components/previewLevel2And2.vue'
  import LevelOne1 from './editClassification/components/previewLevel1And1.vue'
  import LevelOne2 from './editClassification/components/previewLevel1And2.vue'
  import nzh from 'nzh'
  import { LinkSelect, MaterialSelect } from '@/components/selectors'
  import { cloneDeep } from 'lodash'
  // 保存router
  const router = useRouter()
  // 跳转链接
  const jumpLink = ref('')
  // 宣传图片显示隐藏变量
  const isProductShow = ref('')
  const active = ref(1)
  const tableList = ref<any[]>([
    // {
    //   name: '',
    //   status: 1,
    //   thumb: '',
    //   hideChildren: false,
    //   children: []
    // }
  ])
  // 选中tab-pane事件
  const selectTabPane = () => {
    if (currentTab.value == '1') {
      active.value = 1
    } else if (currentTab.value == '2') {
      active.value = 3
    } else if (currentTab.value == '3') {
      active.value = 5
    }
  }
  const currentTab = ref<any>('1')
  const submitInfo = ref<any>({
    template_level: '',
    template_num: -1,
    category_img: [],
    datas: []
  })
  // 更改switch状态事件
  const changeSwitch = (item: any) => {
    const recursion = (tiems: any[]) => {
      tiems.forEach((citem) => {
        citem.status = item.status
        if (citem.children) {
          recursion(citem.children)
        }
      })
    }
    item.children && recursion(item.children)
  }
  // 宣传图片
  const changeMainPicture = () => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      isProductShow.value = res[0].path.url
    })
  }
  // table图片
  const changeTabelPicture = (item: any) => {
    MaterialSelect({
      multiple: false
    }).then((res) => {
      item.thumb = res[0].path.url
      // item.thumb = ''
    })
  }
  // 选择链接事件
  // type
  // id
  // name
  // label
  const linkInfo = ref(linkOption)
  // 递归增加数据
  function addAttribute(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        item.hideChildren = false
        addAttribute(item.children)
      } else {
        item.children = []
        item.hideChildren = false
      }
    })
    return
  }
  // 编辑接口请求
  reqGoodsClassList().then((res) => {
    const temp: any = res.data.data
    if (temp.data.length > 0) {
      tableList.value = cloneDeep(temp.data)
      addAttribute(tableList.value)
    }
    if (temp.template_level == undefined) {
      currentTab.value = '1'
    } else {
      currentTab.value = temp.template_level.toString()
    }
    if (temp.template_num == undefined) {
      active.value = 1
    } else {
      active.value = temp.template_num
    }
    if (temp.category_img == undefined) {
      // console.log('2121')
    } else {
      isProductShow.value = temp.category_img[0]
      linkInfo.value = temp.category_img[1]
    }
  })
  // 删除id
  const deleteIdList = ref<any[]>([])
  const deleteClass = (items: any, index: Key, item: any) => {
    items.splice(index, 1)
    deleteIdList.value.push(item.id)
  }
  // 新增或编辑
  const addClassification = () => {
    // console.log(tableList.value, '分类列表数据')
    // 删除不需要的数据
    function deleteAttribute(arr: any) {
      arr.forEach((item: any) => {
        if (item.children) {
          delete item.hideChildren
          deleteAttribute(item.children)
        } else {
          delete item.hideChildren
        }
      })
      return
    }
    deleteAttribute(tableList.value)
    submitInfo.value.datas = tableList.value
    submitInfo.value.template_level = currentTab.value
    submitInfo.value.template_num = active.value

    submitInfo.value.del_datas = deleteIdList.value.join()
    submitInfo.value.category_img.push(isProductShow.value)
    submitInfo.value.category_img.push(linkInfo.value)
    reqGoodsClassAddEdit(submitInfo.value).then((res) => {
      router.push('/commodity/classification')
    })
  }
</script>

<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .classification-container {
    padding-bottom: 80px;
  }
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
  .custom-tabs {
    :deep(.el-tabs__nav-scroll) {
      @include self-lg-xl(justify-content, start, center);
      // display: flex;
      // .el-tabs__item {
      //   font-size: 16px;
      //   font-weight: bold;
      // }
    }
    :deep(.el-tabs__header) {
      margin-bottom: 0 !important;
    }
    :deep(.el-tabs__item) {
      padding: 0 10px;
    }
  }
  .image-list {
    display: flex;
    .upload-image-container {
      position: relative;
      margin-right: 25px;
      width: 100px;
      height: 130px;
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
        height: 100px;
        margin-bottom: 8px;
      }
    }
    .custom-upload-container {
      margin-right: 25px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #f5f5f5;
      width: 100px;
      height: 100px;
      cursor: pointer;
      .el-icon-plus {
        font-size: 28px;
        color: var(--color-primary);
      }
      .tips {
        margin-top: 10px;
        font-size: 12px;
        color: #8c8c8c;
      }
    }
    .linkChoice {
      font-size: 14px;
      .selector {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;
        color: var(--color-primary);
        .link-input {
          text-indent: 1em;
          line-height: 38px;
          width: 296px;
          height: 38px;
          margin-right: 24px;
        }
      }
    }
  }
  .type-selects {
    @include self-lg-xl(height, 300px, 850px);
  }
  .propaganda-image {
    height: 226px;
    .title {
      margin-top: 10px;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .classification-edit {
    height: 604px;
  }
  .mobile-browse {
    height: 850px;
  }
  .template-list {
    @include self-lg-xl(justify-content, start, center);
    @include self-lg-xl(flex-direction, row, column);
    align-items: center;
    display: flex;
    .template-item {
      margin: 15px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 120px;
      border-radius: 2px;
      .item-box {
        position: relative;
        border: 1px solid transparent;
        border-radius: 2px;
        .iii {
          height: 20px;
        }
        &.active {
          border: 1px solid var(--color-primary);
        }
        .icon-box {
          position: absolute;
          top: 0;
          right: 0;
          width: 16px;
          height: 10px;
          background-color: var(--color-primary);
          z-index: 6;
          text-align: center;
          border-radius: 0 0 0 2px;
          .icon {
            position: absolute;
            top: -1px;
            left: -2px;
            color: #fff;
            font-size: 6px;
          }
        }
      }

      .info-text {
        margin-top: 14px;
      }
      i {
        margin-left: 5px;
        color: #8c8c8c;
      }
    }
  }
  .table-header {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: solid 1px #d9d9d9;
  }
  .table-content {
    height: 488px !important;
  }
  .table-slot-item {
    height: 70px;
    align-items: center;
    font-size: 14px;
    .el-input {
      width: auto;
    }
    .icon {
      color: var(--color-primary);
    }
    .hide-icon {
      cursor: pointer;
      font-size: 20px;
      color: var(--color-primary);
      transition: 0.3s;
      transform: rotate(0);
      &.hide {
        transform: rotate(-90deg);
      }
    }
  }
  .table-upload-image {
    text-align: center;
    line-height: 28px;
    width: 32px;
    height: 32px;
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    color: #8c8c8c;
    font-size: 10px;
    :deep(.el-image__inner) {
      height: 32px;
    }
    .class-image {
      position: relative;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        right: -30px;
        top: -19px;
        width: 106px;
        height: 12px;
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
        top: 0;
        right: 0;
        color: #fff;
        z-index: 6;
      }
    }
  }
  .fixed-footer {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    z-index: 130;
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
