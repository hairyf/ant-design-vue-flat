/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-24 15:40:03
 * @LastEditTime: 2021-03-02 15:07:26
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
const fs = require('fs');
const archiver = require('archiver');
const copydir = require('sync-copydir');
const baseURL = 'dist/build/rent_systems';

// 复制文件
copydir('dist/build/mp-weixin', 'dist/build/rent_systems');

// 读取源码文件, 正则匹配 siteInfo 并替换字符引入 siteInfo文件
const vendorJs = fs
  .readFileSync(baseURL + '/common/vendor.js')
  .toString()
  .replace(/var l=\{uniacid.*?\}/, `var l=require('${'../siteinfo.js'}')`);

const siteinfoJs = `\
module.exports = {
  uniacid: '3',
  acid: '3',
  multiid: '0',
  version: '1.0',
  siteroot: 'https://pro.we7.cc/app/index.php',
  design_method: '3',
};\
`;

const appJs = `\
// siteInfo:require('siteinfo.js')
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')\
`;

fs.writeFileSync(baseURL + '/common/vendor.js', vendorJs, { flag: 'w' });
fs.writeFileSync(baseURL + '/siteinfo.js', siteinfoJs, { flag: 'w' });
fs.writeFileSync(baseURL + '/app.js', appJs, { flag: 'w' });
fs.renameSync(baseURL, 'dist/build/rent_systems');

const uDrawPosterPath = 'dist/build/rent_systems';
const dcloudExtendPath = 'dist/build/rent_systems.zip';
// 创建文件输出流
const output = fs.createWriteStream(dcloudExtendPath);
const archive = archiver('zip', {
  // 设置压缩级别
  zlib: { level: 9 },
});
// 从子目录追加文件并将其命名为“新子dir”在存档中
archive.directory(uDrawPosterPath, 'rent_systems', true);
// 通过管道方法将输出流存档到文件
archive.pipe(output);
// 完成归档
archive.finalize();
