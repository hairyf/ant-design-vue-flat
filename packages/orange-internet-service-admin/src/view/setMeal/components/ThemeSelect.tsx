/*
 * @Author: Mr.Mao
 * @Date: 2021-05-29 10:11:17
 * @LastEditTime: 2021-06-10 18:24:56
 * @Description: 套餐选择器组件
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { useModelRef } from "@/hooks/use-modelRef";
import { renderInstance } from "@/utils/vue-utils";
import { computed, defineComponent, ref, watch } from "vue-demi";
import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
import CalInput from '~/CustomAntds/CalInput/index.vue'
import CalStickyLayout from '~/Bases/CalStickyLayout/index.vue'
import CalPagination from '~/CustomAntds/CalPagination/index.vue'
import { Row as ARow } from "ant-design-vue";
import { Col as ACol } from "ant-design-vue";
import { useMultipleSelect } from "@/hooks/use-multiple-select";
import SelectStateBox from '~/CustomAntds/CalThemeIcon/SelectStateBox.vue'
import ThemeItem from './ThemeItem.vue'
import ThemeColorItem from '@/layout/components/ThemeItem.vue'
import { useArrayPagination } from "vue-composable";
import store from "@/store";
interface ThemeProps {
  list?: any[]
  multiple?: boolean
  modelValue?: boolean
  onVanish?: () => void
  [key: string]: any
}

/** 组件模态框实例 */
const ThemeInstance = defineComponent({
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
    },
    // 列表
    list: Object as () => typeof store.state.theme.systems
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
    // 列表
    const dataList = computed(() => props.list || [])
    const { selectItems,selectIds } = useMultipleSelect(dataList)
    // 分页逻辑
    const { total, currentPage, result: list } = useArrayPagination(dataList.value, { pageSize: 8 })
    console.log(list)
    // 处理点击项
    const onClickItem = (item: any) => {
      item.select = !item.select
      if (!props.multiple) {
        onEmitConfirm()
      }
    }
    // 发送完成事件, 并将选中列表传入
    const onEmitConfirm = () => {
      props.onResolve?.({ list: dataList.value, select: selectItems.value,ids:selectIds.value })
      showModal.value = false
    }
    // 点击选择项
    return () => <CalMessageDialog width={1200} title="选择主题" v-model={showModal.value} {...{ onOk: onEmitConfirm }}>
      {/* 顶部输入框 */}
      <div class="mb-28 flex justify-end">
        <CalInput placeholder="请输入主题名称" class="w-160" v-model={searchText.value} />
      </div>
      {/* 沾粘布局容器 */}
      <CalStickyLayout class="p-24" minHeight={560} v-slots={{
        sticky: () => <div class="flex justify-center">
          <CalPagination
            v-model={currentPage.value}
            total={total.value}
            pageSize={8}
          />
        </div>
      }}>
        <ARow gutter={[24, 24]}>
          {list.value.map((v:any) =>
            <ACol span={6} class='flex justify-center'>
              <SelectStateBox
                class='shadow select-none'
                onClick={() => onClickItem(v)}
                state={v.select}
                border
              >
                <ThemeItem
                  item={v}
                  class="cursor-pointer"
                  limit={v.content?.type === 'specials'}
                  text={v.name}
                  src={v.logo}
                >
                  <ThemeColorItem
                    size={48}
                    color={v.content?.linearGradientColor || v.content?.color}
                    linearGradient={!v.content?.linearGradientColor}
                    hover={false}
                  />
                </ThemeItem>
              </SelectStateBox>
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
const ThemeSelect = (props: ThemeProps = {}) => {
  return new Promise<any>((resolve, reject) => {
    renderInstance(ThemeInstance, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}
export default ThemeSelect
