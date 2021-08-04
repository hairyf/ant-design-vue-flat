/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-12 11:46:25
 * @LastEditTime: 2021-05-12 11:54:54
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
export const formRules = (errorObject: any) => {
  const errorMessage: any = Object.values(errorObject)[0]
  return errorMessage[0].message
}
