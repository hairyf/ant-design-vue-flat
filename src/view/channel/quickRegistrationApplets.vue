<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-14 19:38:43
 * @LastEditTime: 2021-05-10 15:14:29
 * @Description: 快速注册小程序
 * @LastEditors: Mr.wang
-->
<template>
  <el-card shadow="never">
    <div class="explain">
      <div>使用说明：</div>
      <div>
        通过该方式新增的小程序，新增成功后即为“
        <span class="red-color">已认证</span>
        ”状态，新增成功后，可以直接绑定平台进行小程序的开发使用。
        <span class="red-color">点击了解更多</span>
      </div>
      <div>1、权限集准备：第三方平台需具有的权限集。</div>

      <div>
        2、第三方收集法人微信、法人姓名、企业名称、信用代码四个商户信息外加第三方客服电话，方便商家与第三方联系（建议填写第三方客服电话）
      </div>

      <div>
        3、企业名称需与工商部门登记信息一致；法人姓名与绑定微信银行卡的姓名一致。信息收集时要确保四个信息的对应关系，否则接口无法成功调用。
      </div>

      <div>
        4、通过法人&企业主体校验，平台向法人微信下发模板消息。法人需在24
        小时内点击消息，进行身份证信息与人脸识别信息收集；
      </div>

      <div>
        5、信息收集完毕，验证通过后，即可新增已认证的小程序。第三方平台服务器可以收到新增 appid
        信息（通过授权事件接收 URL 接收信息）；
      </div>

      <div>
        6、第三方获得小程序 appid
        后，可调用代码开发相关接口，完成后续的小程序代码开发，接口文档详情可查看代小程序实现业务目录下的接口文档。
      </div>
    </div>
    <el-form
      :model="formInfo"
      :rules="rules"
      ref="refRuleForm"
      label-width="100px"
      class="register-rule-form"
    >
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="formInfo.name" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="企业代码" prop="name">
        <el-input v-model="formInfo.name" placeholder="请输入企业代码"></el-input>
      </el-form-item>
      <el-form-item label="代码类型" prop="name">
        <el-radio v-model="formInfo.radio" :label="1">统一社会信用代码</el-radio>
        <el-radio v-model="formInfo.radio" :label="2">组织机构代码</el-radio>
        <el-radio v-model="formInfo.radio" :label="3">营业执照注册号</el-radio>
      </el-form-item>
      <el-form-item label="法人微信号" prop="name">
        <el-input
          v-model="formInfo.name"
          placeholder="请输入法人微信号（请确保已绑定法人的银行卡）"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="法人姓名" prop="name">
        <el-input v-model="formInfo.name" placeholder="请输入法人姓名"> </el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="formInfo.name" placeholder="请输入联系电话"> </el-input>
      </el-form-item>
      <el-button type="primary" size="small" class="submit">提交</el-button>
    </el-form>
  </el-card>
  <el-card shadow="never" class="table-card">
    <el-table
      :border="false"
      class="goods-list"
      ref="multipleTable"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="企业名" prop="stock"></el-table-column>
      <el-table-column label="企业代码" prop="stock"></el-table-column>
      <el-table-column label="法人姓名" prop="stock"></el-table-column>
      <el-table-column label="法人微信号" prop="stock"></el-table-column>
      <el-table-column label="联系电话" prop="stock"></el-table-column>
      <el-table-column label="提交时间">
        <template #default="scope">
          <span>{{ formatUnix(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="stock">
        <template #default="scoped">
          <span v-if="scoped.row.name == 1" style="color: #1ad370">成功</span>
          <span v-if="scoped.row.name == 2" style="color: #ff0000">失败</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="edit oe-flex">
            <el-button
              v-if="scope.row.submit == 1"
              @click="binding(scope.row.id)"
              type="primary"
              size="mini"
              icon="ad-binding"
              class="oe-m-l-0"
              >绑定</el-button
            >
            <custom-button
              v-if="scope.row.submit == 2"
              icon="ad-recovery1"
              @click="againSubmit(scope.row.id)"
              color="#2DB6F5"
              class="public-move-left oe-m-l-0"
              >重新提交</custom-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { formatUnix } from '@/utils'
  import { ElMessageBox, ElMessage } from 'element-plus'
  const formInfo = ref<any>({})
  const rules = {
    name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
  }
  const tableList = ref<any[]>([{ name: 1, submit: 1 }])
  // 重新提交
  const againSubmit = (id: Key) => {
    // console.log(id)
  }
  // 绑定
  const binding = (id: Key) => {
    // console.log(id)
    ElMessageBox.confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // console.log('312')
      // reqGoodsGroupDel({ id: arr.join() }).then((res) => {
      //   console.log('删除', res)
      //   if (res.data.code == 0) {
      //     ElMessage({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //     resetGoodsList()
      //   }
      // })
    })
  }
</script>
<style lang="scss" scoped>
  :deep(.el-form-item__label) {
    color: #000;
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
  .register-rule-form {
    .el-input {
      width: 391px;
    }
    .submit {
      width: 84px;
      margin-left: 20px;
      margin-top: 23px;
    }
  }
  .table-card {
    margin-top: 24px;
    // 操作
    .edit {
      margin-bottom: 10px;
      :deep(.el-button) {
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 2px 8px;
        min-height: 24px;
        border-radius: 2px;
        margin-left: 14px;
        i {
          padding-right: 3px;
        }
      }
    }
  }
</style>
