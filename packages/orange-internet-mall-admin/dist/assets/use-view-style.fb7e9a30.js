import{e as d}from"./vendor.71e19cde.js";const o=o=>({background:d((()=>"颜色"===o.backgroundType?o.color.background:"图片"===o.backgroundType||"背景图片"===o.backgroundType?`url(${o.image}) no-repeat center center/cover`:""))}),n=o=>({padding:d((()=>{var d,n,a;return`        ${null!=(d=o.padding.top)?d:0}px         ${null!=(n=o.padding.leftRight)?n:0}px         ${null!=(a=o.padding.bottom)?a:0}px        `})),borderRadius:d((()=>{var d,n,a,p;return`        ${null!=(d=o.padding.topRadius)?d:0}px         ${null!=(n=o.padding.topRadius)?n:0}px         ${null!=(a=o.padding.bottomRadius)?a:0}px         ${null!=(p=o.padding.bottomRadius)?p:0}px        `}))}),a=o=>({boxShadow:d((()=>"投影"===o.componentModal?"0 0 10px rgb(226 231 244 / 70%)":void 0)),border:d((()=>"边框"===o.componentModal?"1px solid rgb(237, 237, 237)":void 0))});export{o as a,a as b,n as u};