import { useModelRef } from "@/hooks/use-modelRef";
import { renderInstance } from "@/utils/vue-utils";
import { defineComponent, ref, toRef, watch } from "vue-demi";
import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
import CalInput from '~/CustomAntds/CalInput/index.vue'
import CalStickyLayout from '~/Bases/CalStickyLayout/index.vue'
import CalPagination from '~/CustomAntds/CalPagination/index.vue'
import { useListPagination } from "@/hooks/use-listPagination";
import { Row as ARow } from "ant-design-vue";
import { Col as ACol } from "ant-design-vue";
import { useMultipleSelect } from "@/hooks/use-multiple-select";
import SetMealItem from './SetMealItem.vue'
import { reqSetMealSelectList } from '@/api/setMeal'
/*
 * @Author: Mr.Mao
 * @Date: 2021-05-29 10:11:17
 * @LastEditTime: 2021-05-31 14:18:33
 * @Description: 套餐选择器组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
interface SetMealProps {
  multiple?: boolean
  modelValue?: boolean
  onVanish?: () => void
  [key: string]: any
}

/** 组件模态框实例 */
const SetMealInstance = defineComponent({
  props: {
    // 是否展示组件
    modelValue: Boolean,
    // 组件消失时(实例方法 > 移除实例)
    onVanish: Function,
    // 组件调用成功事件
    onResolve: Function,
    // 组件调用失败事件
    onReject: Function,
    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    }
  },
  setup: (props, context) => {
    // 双向数据绑定, 假如该值不存在, 则创建值
    const showModal = useModelRef(props, 'modelValue')
    // 当隐藏组件时, 调用移除实例
    watch(showModal, (value) => {
      if (value) return false
      props.onReject?.()
      setTimeout(() => props.onVanish?.(), 300)
    })
    // 搜索文本
    const searchText = ref('')
    // 分页逻辑
    const { total, currentPage, list } = useListPagination({
      getList: async ({ total, currentPage }) => {
        const { data } = await reqSetMealSelectList({ page: currentPage.value,name:searchText.value })
        total.value = data.data.total
        return data.data.data
      },
      sources:[() => searchText.value]
    })
    const { selectItems } = useMultipleSelect(list)
    // 处理点击项
    const onClickItem = (item: any) => {
      item.select = !item.select
      if (!props.multiple) onEmitConfirm()
    }
    // 发送完成事件, 并将选中列表传入
    const onEmitConfirm = () => {
      props.onResolve?.(selectItems.value)
      showModal.value = false
    }



    // 点击选择项
    return () => <CalMessageDialog width={1200} title="选择套餐" v-model={showModal.value} {...{ onOk: onEmitConfirm }}>
      {/* 顶部输入框 */}
      <div class="mb-28 flex justify-end">
        <CalInput placeholder="请输入套餐名称" class="w-160" v-model={searchText.value} />
      </div>
      {/* 沾粘布局容器 */}
      <CalStickyLayout class="p-24 shadow" minHeight={400} v-slots={{
        sticky: () => <div class="flex justify-center">
          <CalPagination
            v-model={currentPage.value}
            total={total.value}
          />
        </div>
      }}>
        <ARow gutter={[24, 24]}>
          {list.value.map(v =>
            <ACol span={8}>
              <SetMealItem
                item={v}
                class="cursor-pointer"
                onClick={() => onClickItem(v)}
              />
            </ACol>
          )}
        </ARow>
      </CalStickyLayout>
    </CalMessageDialog>


  }
})
/**
 * 组件调用方法
 * @param props 组件参数
 */
const SetMealSelect = (props: SetMealProps = {}) => {
  return new Promise<any>((resolve, reject) => {
    renderInstance(SetMealInstance, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}
export default SetMealSelect
