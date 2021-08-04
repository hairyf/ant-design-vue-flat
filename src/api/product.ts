import http from './http.config'

/*
 * @Author: Mr.Mao
 * @Date: 2021-06-21 14:28:28
 * @LastEditTime: 2021-06-30 09:46:14
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/** 模板分类 */
export const reqTemplateClass = () => {
  return http.post<BaseRes>('/admin/TemplateClass/index')
}

/** 应用分类 */
export const reqApplicationClass = () => {
  return http.post<BaseRes>('/admin/AddonsClass/index')
}

/** 产品列表 */
export const reqProductList = (
  type: ProductType,
  option: ListReqOpts<{
    name?: Key
    sale_status?: Key
    template_class_one_id?: Key
    status?: Key
    sale_time?: Key
  }>
) => {
  const strategy = {
    application: 'admin/addons/index',
    theme: 'admin/backendui/index',
    channel: 'admin/channel/index',
    template: 'admin/template/index'
  }
  return http.get<BaseRes<ListRes>>(strategy[type], { params: option })
}
/** 产品详情 */
export const reqProductDetail = (type: ProductType, id: Key) => {
  const strategy = {
    application: 'admin/addons/read',
    theme: 'admin/backendui/read',
    channel: 'admin/channel/read',
    template: 'admin/template/read'
  }
  return http.get<BaseRes>(strategy[type], { params: { id } })
}
/** 编辑产品 */
export const reqEditProductItem = (type: ProductType, option: Partial<ProductItem>) => {
  const strategy = {
    application: 'admin/addons/edit',
    theme: 'admin/backendui/edit',
    channel: 'admin/channel/edit',
    template: 'admin/template/edit'
  }
  return http.post(strategy[type], option)
}
/** 新增产品 */
export const reqIncProductItem = (type: ProductType, option: Partial<ProductItem>) => {
  const strategy = {
    application: 'admin/addons/add',
    theme: 'admin/backendui/add',
    channel: 'admin/channel/add',
    template: 'admin/template/add'
  }
  return http.post<BaseRes>(strategy[type], option)
}
/** 删除产品 */
export const reqDelProductItem = async (type: ProductType, id: Key) => {
  const strategy = {
    application: 'admin/addons/delete',
    theme: 'admin/backendui/delete',
    channel: 'admin/channel/delete',
    template: 'admin/template/delete'
  }
  return http.post<BaseRes>(strategy[type], { id })
}
/** 更新产品状态 */
export const reqProductMulti = (
  type: ProductType,
  option: { id: Key; params: { status?: Key; sale_status?: Key } }
) => {
  const strategy = {
    application: 'admin/addons/multi',
    theme: 'admin/backendui/multi',
    channel: 'admin/channel/multi',
    template: 'admin/template/multi'
  }
  return http.post(strategy[type], option)
}
