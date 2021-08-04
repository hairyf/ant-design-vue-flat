/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-12 14:01:09
 * @LastEditTime: 2021-05-08 10:18:54
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
import { reactive } from 'vue'
export const usePagination = (option?: { pageSizes?: number[]; pageSize?: number }) => {
  const pagination = reactive({
    // table每页数量
    pageSizes: option?.pageSizes ?? [5, 10, 15, 30, 50, 100],
    // table当前页显示多少数据
    pageSize: option?.pageSize ?? 10,
    // 总数据条数
    total: 0,
    // 当前页
    currentPage: 1
  })
  // 改变table每页显示的数据条数触发的函数
  const handleSizeChange = (value: any) => (pagination.pageSize = value)
  // 切换当前页触发的函数
  const handleCurrentChange = (value: any) => (pagination.currentPage = value)
  return {
    pagination,
    handleSizeChange,
    handleCurrentChange,
    pn: pagination,
    hsc: handleSizeChange,
    hcc: handleCurrentChange
  }
}
