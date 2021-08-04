<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-14 21:10:24
 * @LastEditTime: 2021-04-15 15:43:20
 * @Description: 跳转设置
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <el-card shadow="never" class="oe-m-b-24">
    <div class="currentEdition">
      <div class="title">当前版本</div>
      <div class="list">
        <div class="item qr-code-box">
          <qr-code :size="90" text="asdsadasdsa"></qr-code>
        </div>
        <div class="item">
          <div class="top">
            <span class="left">小程序名称</span>
            <span class="right">我是小程序名称</span>
          </div>
          <div class="bottom">
            <span class="left">小程序简介</span>
            <span class="right">我是小程序简介我是小程序简介我是小程序简介我是小程序简介</span>
          </div>
        </div>

        <div class="item">
          <div class="top">
            <span class="left">小程序版本号</span>
            <span class="right">weishop_v1.1.1</span>
          </div>
          <div class="bottom">
            <span class="left">使用中模板</span>
            <span class="right">我是模板名称</span>
          </div>
        </div>

        <div class="item">
          <div class="top">
            <span class="left">App ID</span>
            <span class="right">wx49edd6f7bab890</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>

  <el-card shadow="never" class="custom-crad-container footer-card">
    <div class="examineEdition">
      <div class="explain">
        <div>可跳转小程序说明：</div>
        <div>如果您想要在小程序内跳转到其他的小程序，您需要向微信小程序申请许可，步骤:</div>
        <div>1、先配置可跳转的小程序的AppID，个数不能超过10个。</div>
        <div>2、配置完成后，需要您到小程序管理去提交审核，等待审核通过后，才生效。</div>
      </div>
    </div>
    <div class="add-goods-box">
      <el-button type="primary" class="add-goods" icon="ad-shapePlus" size="small">
        <span class="text">新增小程序</span>
      </el-button>
    </div>
    <el-table :data="tableList" stripe style="width: 100%" class="table-box">
      <el-table-column prop="id" label="App ID">
        <template #default="scope">
          <el-input style="width: 80%" v-model="scope.row.id"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="小程序名称">
        <template #default="scope">
          <el-input style="width: 80%" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="小程序名称" width="200">
        <template #default="scope">
          <div class="edit oe-flex">
            <custom-button
              @click="delCommodity(scope.row.id)"
              icon="ad-delete"
              color="#FF0000"
              class="public-move-left oe-m-l-0"
              >删除</custom-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">提交审核</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  const tableList = ref<any[]>([{ id: 321, name: '12213' }])
  // 删除商品
  const delCommodity = (id: string) => {
    ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // reqGoodsGroupDel({ id }).then((res) => {
      //   console.log('删除', res)
      //   if (res.data.code == 0) {
      //     ElMessage({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //     resetGoodsList()
      //   } else {
      //     ElMessage({
      //       type: 'error',
      //       message: '删除失败,请重试'
      //     })
      //   }
      // })
    })
  }
</script>
<style lang="scss" scoped>
  .currentEdition {
    .title {
      font-size: 16px;
      color: #000;
      margin-bottom: 14px;
      font-weight: 500;
    }
    .list {
      display: flex;
      font-size: 14px;
      .item {
        width: 310px;
        margin-right: 164px;
        line-height: 26px;
        &.qr-code-box {
          width: 90px;
          margin-right: 14px;
        }
        .top {
          display: flex;
          flex-wrap: wrap;
          margin: 14px 0 28px;
          .left {
            margin-right: 14px;
            width: 90px;
          }
        }
        .bottom {
          display: flex;
          .left {
            margin-right: 14px;
            width: 90px;
          }
          .right {
            width: 210px;
          }
        }
      }
    }
  }
  .examineEdition {
    margin-bottom: 30px;
    .title {
      font-size: 16px;
      color: #000;
      margin-bottom: 14px;
      font-weight: 500;
    }
    .explain {
      font-size: 12px;
      background: rgba(255, 157, 40, 0.2);
      border: 1px solid #ff9d28;
      padding: 14px;
      margin-bottom: 18px;
      div {
        margin-bottom: 10px;
        .red-color {
          color: #ff0000;
        }
      }
    }
  }

  // 操作
  .table-box {
    .add-goods-box {
      :deep(.el-button i) {
        font-size: 14px;
      }
      .add-goods {
        width: 120px;
        &.el-button {
          margin: 0;
          padding-top: 8px;
          padding-bottom: 9px;
          font-size: 14px;
          .text {
            margin-left: 6px;
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 30px;
    left: 20px;
    .el-button {
      font-size: 14px;
      width: 168px;
    }
  }
</style>
