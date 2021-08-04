/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-21 11:36:42
 * @LastEditTime: 2021-05-14 09:48:09
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
module.exports = {
  title: '橘子互联前端代码规范文档',
  // 设置网站图标
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ],
  // theme: 'antdocs',
  themeConfig: {
    logo: '/hero.png',
    nav: [
      { text: '规范文档', link: '/guide' },
      {
        text: '项目文档', items: [
          { text: '环境配置/项目构建', link: '/structure' },
          { text: '装修规范/装修组件', link: '/decorete/' },
        ]
      },
      { text: '知识扩展', link: '/extends' },
      {
        text: '站外链接', items: [
          { text: 'Gitee', link: 'https://gitee.com/juzihulian_1/front_end_docs' },
          { text: 'TypeScript', link: 'https://www.tslang.cn/' },
          { text: 'UniApp', link: 'https://uniapp.dcloud.io/' },
          { text: 'Vue2.0', link: 'https://cn.vuejs.org/' },
          { text: 'Vue3.0', link: 'https://v3.cn.vuejs.org/' },
          { text: `Mr.Mao's blog`, link: 'https://tuimao233.gitee.io/mao-blog/' },
        ]
      },
      { text: '常见问题', link: '/problem' },
    ],
    sidebar: {
      '/decorete/': [
        { title: '啊啊', path: '01-aaa' }
      ]
    }
  }
}
