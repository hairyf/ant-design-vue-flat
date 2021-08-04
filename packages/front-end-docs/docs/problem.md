# 常见问题

::: danger uni.share qq分享 (暂未解决)
报错287:`{"errMsg":"share:fail http://ask.dcloud.net.cn/article/287"`
:::

::: tip IOS端调用微信jssdk失败
https://blog.csdn.net/sjn0503/article/details/75634858
:::

::: tip html2canvas 截图不全
1. 定时器延迟创建html2canvas
~~~js
setTimeout(() => {
  html2canvas(img, { canvas: canvas }).then((canvas) => {
    this.photoUrl = canvas.toDataURL();
  });
}, 500);
~~~
2. 滚轮滑动造成的，主要是html2canvas是根据body进行截图，若内容高度高于body时，就会出现这样的问题
~~~js
window.pageYOffset = 0;
document.documentElement.scrollTop = 0
document.body.scrollTop = 0
~~~
:::