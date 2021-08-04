/*
 * @Author: Mr.Mao
 * @Date: 2021-08-04 11:55:41
 * @LastEditTime: 2021-08-04 13:57:07
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { subtrees } from './subtree.config'
import { execSync } from 'child_process'

for (const [prefix, repository] of subtrees) {
  execSync(`git subtree pull --prefix=${prefix} ${repository} master --squash`)
}