/*
 * @Author: Zhilong
 * @Date: 2021-06-26 18:57:16
 * @LastEditTime: 2021-06-26 19:01:05
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', (line) => {
  //line为输入的单行字符串，split函数--通过空格将该行数据转换为数组。
  const arr = line.split(' ')
  //数组arr的每一项都是字符串格式，如果我们需要整型，则需要parseInt将其转换为数字
  console.log(parseInt(arr[0]) + parseInt(arr[1]))
})

let timer = 1
setInterval(() => {
  timer++
  console.log(timer)
}, 500)
