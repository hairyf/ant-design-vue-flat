/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 14:23:52
 * @LastEditTime: 2021-01-15 17:17:40
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
export const regions = [
  {
    id: 0,
    text: '区域',
    child: [
      {
        id: 1,
        text: '罗湖区',
        child: [
          {
            id: 2,
            text: '罗湖口岸',
          },
          { id: 3, text: '黄贝岭' },
        ],
      },
      {
        id: 2,
        text: '福田区',
        child: [
          { id: 2, text: 'aaa' },
          { id: 3, text: 'bbb' },
        ],
      },
    ],
  },
  {
    id: 1,
    text: '领域',
    child: [
      {
        id: 1,
        text: '罗湖区',
        child: [
          { id: 2, text: '罗湖口岸' },
          { id: 3, text: '黄贝岭' },
        ],
      },
      {
        id: 1,
        text: '福田区',
        child: [
          { id: 2, text: 'aaa' },
          { id: 3, text: 'bbb' },
        ],
      },
    ],
  },
];

const typeChild = [
  { id: 0, text: '不限' },
  { id: 1, text: '一室' },
  { id: 2, text: '二室' },
  { id: 3, text: '三室' },
  { id: 4, text: '四室+' },
];
export const types = [
  {
    id: '',
    text: '不限',
    child: typeChild,
  },
  {
    id: 1,
    text: '合租',
    child: typeChild,
  },
  {
    id: 2,
    text: '整租',
    child: typeChild,
  },
];
