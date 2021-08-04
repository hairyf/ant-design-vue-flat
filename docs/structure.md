## 基本环境搭建

编辑器：[VSCode](https://code.visualstudio.com/)

代码管理：[Git](https://git-scm.com/)

文档编写：[Typora](https://www.typora.io/)|[VSCode](https://code.visualstudio.com/)(Markdown)

服务端环境：[Node](http://nodejs.cn/)

推荐输入法：[百度输入法](https://shurufa.baidu.com/)（可动态翻译单词）

项目管理：[禅道](https://chandao.juzishop.cn/my/)

接口管理：[showDoc](https://showdoc.juzishop.cn/)

## 项目构建说明

前端统一 IDE 使用vscode，项目代码检测全由eslint，prettier进行代码校验，配合vscode进行动态修复，遇到 eslint 报错请不要轻易修改 eslint 规则，请咨询相关人员进行解决。

vscode 必装插件：ESLint，Volar，Chinese，create-uniapp-view，koroFileHedaer，Git Emoji Commit中文版。

- 前端主体技术栈为：[TypeScript](https://www.tslang.cn/)，[Vue3.0](https://v3.cn.vuejs.org/)，[UniApp](https://uniapp.dcloud.io/)，Vue3.0用于开发webPC或移动端web项目。UniApp用于开发小程序，移动端应用，开发小程序不使用原生小程序进行开发。无特殊情况不允许使用主体技术栈以外的技术进行开发。
- 开发中可使用UI组件库：[Vant](https://youzan.github.io/vant/v3/#/zh-CN)（web移动端，小程序），[Element-plus](https://element-plus.gitee.io/#/zh-CN)（webPC），[Ant Design of Vue](https://www.antdv.com/docs/vue/introduce-cn/)（webPC），[uView](https://uviewui.com/)（多端开发）
- 无特殊情况，使用项目模板（指定主体技术栈）进行开发。项目要求组件化开发，结构化，清晰化项目结构。 请遵循所定义的规范进行开发。

## 当前机器Git密匙配置

~~~makefile
ssh-keygen -t rsa -C "姓名(用拼音)@juzi.com"

# ↓↓↓↓生成对应密匙↓↓↓↓ # 

cat ~/.ssh/id_rsa.pub

# ↓↓↓↓回车到最后↓↓↓↓ # 

# ↓↓↓↓将密匙提交给相应负责人↓↓↓↓ # 

# ↓↓↓↓配置提交信息用户名称(局部:项目内/全局)↓↓↓↓ # 

git config user.name "姓名(用拼音)" / git config --global user.name "姓名(用拼音)"

# 之后即可拉取公司项目 #
~~~

## 当前项目路径

~~~
前端规范文档: git clone git@159.75.17.184:root/front-end-docs.git
收租系统用户端：git clone git@159.75.17.184:root/renting-client.git
微商城SaaS后台端: git clone git@159.75.17.184:root/orange-internet-mall-admin.git
微商城SaaS用户端: git clone git@159.75.17.184:root/orange-internet-mall-client.git
微商城SaaS服务端：git clone git@159.75.17.184:root/orange-internet-service-admin.git
微商城SaaS平台端：git clone git@159.75.17.184:root/orange-internet-platform-official.git
微商城SaaS平台管理端：git clone git@159.75.17.184:root/orange-internet-platform-service.git
~~~

## 项目模板说明

~~~
├── alpha@preset-vue-next-cli  # web-vue@3 页面cli开发模板(内部测试版)
├── alpha@preset-vue-next-vite  # web-vue@3 页面vite开发模板(内部测试版)
├── preset-uni@full  # uni-app 多端开发模板(正式版)
├── preset-vue@full  # web-vue@2 页面开发模板(正式版)
├── preset-vue-self@full  # web-vue@2-self 页面响应式模板(正式版)
~~~

###　安装 dgit 扩展（一个用来下载git仓库文件的命令行工具）

~~~
 npm install dgit -g
~~~

### uni-app 项目模板使用说明

1. 拷贝项目模板

   ~~~
   dgit TuiMao233/project-development-template/preset-uni@full
   ~~~

2. 进入项目安装依赖：`npm install`

3. 运行编译命令：`npm run dev:mp-weixin`

### web-vue@3 项目模板使用说明

1. 拷贝项目模板

   ~~~npm
   dgit TuiMao233/project-development-template/alpha-presets/alpha@preset-vue-next-vite
   ~~~
   
2. 进入项目安装依赖：`npm install`

3. 运行编译命令：`npm run dev`

### 多端开发框架Vue3兼容对比表

| 开发框架                 | UniApp                               | Taro                          |
| ------------------------ | ------------------------------------ | ----------------------------- |
| 多端兼容情况             | Vue3 仅微信小程序支持，Vue2 多端支持 | H5与各厂商小程序，App端均支持 |
| 常用 UI 组件库           | 暂无                                 | Taro UI Vue3                  |
| 运行性能                 | 暂无测试                             | 暂无测试                      |
| IOS 9 或 IE 11           | 暂未兼容（等待Vue官方支持）          | 暂未兼容（等待Vue官方支持）   |
| setup 语法糖（实验阶段） | 暂不支持                             | 暂无测试                      |

### 其他模板拷贝指令

~~~npm
web-vue2(web模板): dgit TuiMao233/project-development-template/preset-vue@full

web-vue3-cli(vue3-cli测试模板): dgit TuiMao233/project-development-template/alpha-presets/alpha@preset-vue-next-cli

web-react-vite(react-vite测试模板): dgit TuiMao233/project-development-template/alpha-presets/alpha@preset-react-vite
~~~

