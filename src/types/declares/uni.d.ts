/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-04-02 14:05:33
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
// 解决unipromise返回值不正确
type Empty = null | undefined | void | never;
type IfElse<T, D> = T extends Empty ? D : T;
type Else<T, D> = T extends Empty ? never : D;
type NonNullable<T> = T extends Empty ? never : T;

/**
 * 定义`promise`的`uni`
 * 用于覆盖原本错误的类型
 */
type PromiseUni<T> = {
  [P in keyof T]: (
    ...args: Parameters<T[P]>
  ) => IfElse<
    ReturnType<T[P]>,
    Else<
      Parameters<Parameters<T[P]>[0]['success']>[0],
      Promise<
        [
          Parameters<Parameters<T[P]>[0]['fail']>[0],
          Parameters<Parameters<T[P]>[0]['success']>[0]
        ]
      >
    >
  >;
};
declare const uni: PromiseUni<UniApp.Uni>;
type UniPlatforms =
  | 'app-plus'
  | 'app-plus-nvue'
  | 'h5'
  | 'mp-weixin'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-toutiao'
  | 'mp-qq'
  | 'mp-360'
  | 'mp'
  | 'quickapp-webview'
  | 'quickapp-webview-union'
  | 'quickapp-webview-huawei'
  | undefined;
declare namespace UniApp {
  interface Uni {
    [key: string]: any;
    $u: {
      [key: string]: any;
    };
  }
}
