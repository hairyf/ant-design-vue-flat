import{p as e,h as t,a as s,e as a,b as o,o as i,c as r,u as d,E as l,g as c,j as n,k as p}from"./vendor.71e19cde.js";import{v as u}from"./index.a53c91c6.js";const f=p();e("data-v-28282f75");const g={class:"view-image"},h=c("div",null,null,-1),m={class:"default-container"},v={class:"bottom-text"},b={class:"top-text"};t();var y=s({expose:[],props:{src:String,borderRadius:String,size:{type:[Number,String,Object]},border:{type:Boolean,default:!1},emptyType:{type:Number,default:1},fit:{type:String,default:"cover"},labelColor:String,isImage:{type:Boolean,default:!1}},setup(e){const t=e,s=u(),p=a((()=>{var e;return""===t.src||t.isImage||-1!==(null==(e=t.src)?void 0:e.indexOf("/"))})),y=a((()=>{let e;switch(t.emptyType){case 0:e=s.state.common.shopSet.load_image.value;break;case 1:e="/addons/weitshop_shop/weshop/public/home/backend/images/decorate/product-fifth.png";break;case 2:e="/addons/weitshop_shop/weshop/public/home/backend/images/decorate/product-sliver.png";break;default:e=""}return t.src?t.src:e})),w=a((()=>t.border&&!y.value)),x=e=>"string"==typeof e&&/[^0-9]/g.test(e)?e:e+"px",z=a((()=>"string"==typeof t.size||"number"==typeof t.size?{width:x(t.size),height:x(t.size)}:"object"==typeof t.size?{width:x(t.size.width),height:x(t.size.height)}:{width:"",height:""}));return f(((s,a)=>{const u=o("el-image");return i(),r("div",g,[d(p)?(i(),r(u,l({key:0},t,{src:d(y),class:{border:d(w)},fit:e.fit,style:{width:d(z).width,height:d(z).height,borderRadius:e.borderRadius,overflow:"hidden"}}),{error:f((()=>[h])),_:1},16,["src","class","fit","style"])):(i(),r("i",{key:1,class:[d(y)],style:{fontSize:d(z).width,color:e.labelColor}},null,6)),c("div",m,[n(s.$slots,"default",{},void 0,!0)]),c("div",v,[n(s.$slots,"bottomText",{},void 0,!0)]),c("div",b,[n(s.$slots,"topText",{},void 0,!0)])])}))}});y.__scopeId="data-v-28282f75";export{y as _};