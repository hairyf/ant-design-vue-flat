import{a as e,b as l,o as a,c as t,g as s,f as o,s as u,G as d,F as i,P as c,t as n,k as r,p,X as m,h as v,l as _,r as g,M as y,V as b,u as f,d as h}from"./vendor.71e19cde.js";import{w as V,M as k,u as x,j as w,a4 as C,c as U,L as I,Y as z,U as L,X as Y,W as q,V as P,a5 as T,a1 as D,Z as M,f as j,l as H,a6 as S}from"./index.a53c91c6.js";import{i as E,a as F}from"./reset-time.7778decd.js";import{_ as A}from"./stock-skus.c436616a.js";import"./EditCardItem.9ed044a9.js";import"./ImageItem.b647d306.js";const G=e=>Object.values(e)[0][0].message,O=r();p("data-v-16431076");const X=s("div",{class:"title oe-m-b-30"},"编辑参数",-1),$={key:0,class:"custom-parameter"},N=s("div",{class:"table-header-container"},[s("div",{class:"table-header oe-flex"},[s("div",{style:{flex:"5%"}}),s("div",{style:{flex:"45%"}},"参数名称"),s("div",{style:{flex:"45%"}},"参数值")])],-1),W={class:"table-slot-item oe-flex"},Z={style:{flex:"5%"},class:"oe-flex oe-row-between"},B=s("i",{class:"ad-tableIcon icon"},null,-1),J={style:{flex:"45%"}},K={style:{flex:"45%"}},Q={key:1,class:"upload-pictures"},R={key:0,class:"upload-image-container"},ee={key:1,class:"custom-upload-container"},le=s("i",{class:"el-icon-plus"},null,-1),ae=s("span",{class:"tips"},"添加图片",-1),te={key:2,class:"custom-parameter"},se=s("div",{class:"table-header-container"},[s("div",{class:"table-header oe-flex"},[s("div",{style:{flex:"5%"}}),s("div",{style:{flex:"45%"}},"参数名称"),s("div",{style:{flex:"45%"}},"参数值"),s("div",{style:{flex:"5%"}},"操作")])],-1),oe={class:"table-slot-item oe-flex"},ue={style:{flex:"5%"},class:"oe-flex oe-row-between"},de=s("i",{class:"ad-tableIcon icon"},null,-1),ie={style:{flex:"45%"}},ce={style:{flex:"45%"}},ne={style:{flex:"5%"}},re=m(" 删除 "),pe=m(" 新增参数 "),me=s("div",{class:"title"},"预览 ",-1),ve={key:0},_e={class:"picture-preview"},ge={class:"goods-detail"},ye={class:"detail-list"},be={class:"detail-item-son left"},fe={class:"detail-item-son"},he={key:1},Ve={class:"picture-preview"},ke={class:"goods-detail"},xe={key:2},we={class:"picture-preview"},Ce={class:"goods-detail"},Ue={class:"detail-list"},Ie={class:"detail-item-son left"},ze={class:"detail-item-son"};v();var Le=e({expose:[],props:{isType:{type:String,required:!0},parameterLlist:{type:Array,required:!0},tableList:{type:Array,required:!0},parameterProduct:{type:String,required:!0}},setup(e,{emit:r}){const p=e,m=()=>{k({multiple:!1}).then((e=>{r("update:parameterProduct",e[0].path.url)}))};return O(((r,v)=>{const _=l("el-input"),g=l("el-image"),y=l("el-link"),b=l("el-button"),f=l("el-card"),h=l("el-col"),k=l("el-row");return a(),t(k,{gutter:20},{default:O((()=>[s(h,{span:18},{default:O((()=>[s(f,{shadow:"never",class:"parameter-card"},{default:O((()=>[X,"2"==p.isType?(a(),t("div",$,[N,s(V,{style:{width:"100%"},modelValue:e.parameterLlist,"onUpdate:modelValue":v[1]||(v[1]=e=>o(parameterLlist)?parameterLlist.value=e:null)},{item:O((({nestedIndex:e,item:l})=>{var o;return[s("div",W,[s("div",Z,[B,e<2&&(null==(o=l.children)?void 0:o.length)?(a(),t("i",{key:0,onClick:e=>l.hideChildren=!l.hideChildren,class:["el-icon-caret-bottom hide-icon oe-m-r-10",{hide:l.hideChildren}]},null,10,["onClick"])):u("",!0)]),s("div",J,[e?(a(),t("i",{key:0,class:"ad-Frame1 oe-m-r-14",style:{marginLeft:1==e?0:20*e+"px"}},null,4)):u("",!0),s(_,{disabled:"",modelValue:l.name,"onUpdate:modelValue":e=>l.name=e,placeholder:"输入参数名称"},null,8,["modelValue","onUpdate:modelValue"])]),s("div",K,[e?(a(),t("i",{key:0,class:"ad-Frame1 oe-m-r-14",style:{marginLeft:1==e?0:20*e+"px"}},null,4)):u("",!0),s(_,{disabled:"",modelValue:l.value,"onUpdate:modelValue":e=>l.value=e,placeholder:"输入参数值"},null,8,["modelValue","onUpdate:modelValue"])])])]})),_:1},8,["modelValue"])])):u("",!0),"3"==p.isType?(a(),t("div",Q,[s("div",{class:"image-list",onClick:m},[e.parameterProduct?(a(),t("div",R,[s(g,{class:"upload-image",src:e.parameterProduct},null,8,["src"]),s("i",{class:"el-icon-close",onClick:v[2]||(v[2]=d((l=>e.parameterProduct=""),["stop"]))})])):(a(),t("div",ee,[le,ae]))])])):u("",!0),"4"==p.isType?(a(),t("div",te,[se,s(V,{style:{width:"100%"},modelValue:e.tableList,"onUpdate:modelValue":v[3]||(v[3]=e=>o(tableList)?tableList.value=e:null)},{item:O((({nestedIndex:e,item:l,items:o,index:d})=>{var i;return[s("div",oe,[s("div",ue,[de,e<2&&(null==(i=l.children)?void 0:i.length)?(a(),t("i",{key:0,onClick:e=>l.hideChildren=!l.hideChildren,class:["el-icon-caret-bottom hide-icon oe-m-r-10",{hide:l.hideChildren}]},null,10,["onClick"])):u("",!0)]),s("div",ie,[e?(a(),t("i",{key:0,class:"ad-Frame1 oe-m-r-14",style:{marginLeft:1==e?0:20*e+"px"}},null,4)):u("",!0),s(_,{modelValue:l.name,"onUpdate:modelValue":e=>l.name=e,placeholder:"输入参数名称"},null,8,["modelValue","onUpdate:modelValue"])]),s("div",ce,[e?(a(),t("i",{key:0,class:"ad-Frame1 oe-m-r-14",style:{marginLeft:1==e?0:20*e+"px"}},null,4)):u("",!0),s(_,{modelValue:l.summarize,"onUpdate:modelValue":e=>l.summarize=e,placeholder:"输入参数值"},null,8,["modelValue","onUpdate:modelValue"])]),s("div",ne,[s(y,{href:"javascript:;",class:"oe-m-l-14",type:"primary",onClick:e=>o.splice(d,1)},{default:O((()=>[re])),_:2},1032,["onClick"])])])]})),_:1},8,["modelValue"]),s(b,{style:{"margin-top":"20px"},class:"oe-m-b-5",size:"small",type:"primary",icon:"el-icon-plus",onClick:v[4]||(v[4]=l=>e.tableList.unshift({hideChildren:!1,children:[]}))},{default:O((()=>[pe])),_:1})])):u("",!0)])),_:1})])),_:1}),s(h,{span:6},{default:O((()=>[s(f,{shadow:"never",class:"e-grid commodity-and-blue"},{default:O((()=>[me,"2"==p.isType?(a(),t("div",ve,[s("div",_e,[s("div",ge,[s("div",ye,[(a(!0),t(i,null,c(e.parameterLlist,((l,o)=>(a(),t("div",{class:["detail-item",o==e.parameterLlist.length-1?"border-hidn":""],key:o},[s("div",be,n(l.name),1),s("div",fe,n(l.value),1)],2)))),128))])]),s(g,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/add-goods-detail-params.png"})])])):u("",!0),"3"==p.isType?(a(),t("div",he,[s("div",Ve,[s("div",ke,[e.parameterProduct?(a(),t(g,{key:0,style:{width:"82px",height:"82px"},src:e.parameterProduct},null,8,["src"])):u("",!0)]),s(g,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/add-goods-detail-params.png"})])])):u("",!0),"4"==p.isType?(a(),t("div",xe,[s("div",we,[s("div",Ce,[s("div",Ue,[(a(!0),t(i,null,c(e.tableList,((l,o)=>(a(),t("div",{class:["detail-item",o==e.tableList.length-1?"border-hidn":""],key:o},[s("div",Ie,n(l.name),1),s("div",ze,n(l.summarize),1)],2)))),128))])]),s(g,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/add-goods-detail-params.png"})])])):u("",!0)])),_:1})])),_:1})])),_:1})}))}});Le.__scopeId="data-v-16431076";const Ye=r();p("data-v-932b4cc8");const qe={class:"commodity-content"},Pe={class:"basic-information"},Te=s("div",{class:"type-title"},"商品类型",-1),De={class:"goods-type"},Me={key:0,class:"icon"},je=s("i",{class:"el-icon-check yes"},null,-1),He={class:"beijing"},Se={class:"item-left"},Ee={class:"item-right"},Fe={class:"top"},Ae={class:"bottom"},Ge={class:"product-details"},Oe=s("div",{class:"related-goods oe-m-t-20 oe-m-b-30"},[s("span",{class:"left-text"},"关联商品 "),s("span",{class:"right-text"}," 作用于商城列表、分享头图；建议尺寸：750*750像素")],-1),Xe={class:"image-list"},$e={class:"upload-image-container"},Ne=m("替换"),We=s("i",{class:"el-icon-plus"},null,-1),Ze=s("span",{class:"tips"},"添加商品",-1),Be={class:"count"},Je={class:"commodity-parameters"},Ke=s("div",{class:"title"},"参数设置",-1),Qe={class:"template-box"},Re=s("span",{class:"type"},"类型",-1),el=m("已有参数"),ll=m("上传图片"),al=m("自定义"),tl=m("不启用"),sl={class:"template-box oe-m-t-20"},ol=s("span",{class:"type type-select"},"参数选择",-1),ul={class:"color refresh template-new"},dl=s("span",{class:"introduce oe-m-r-5"},"没有合适的参数",-1),il=m("新增参数"),cl=m("|"),nl=m("刷新"),rl=s("div",{class:"type-title"},"基础信息",-1),pl={key:0,class:"upload-image-container"},ml={key:1,class:"custom-upload-container"},vl=s("i",{class:"el-icon-plus"},null,-1),_l=s("span",{class:"tips"},"添加图片",-1),gl={class:"oe-flex"},yl={key:0,class:"upload-image-container"},bl={key:1,class:"custom-upload-container"},fl=s("i",{class:"el-icon-plus"},null,-1),hl=s("span",{class:"tips"},"添加视频",-1),Vl={key:0,class:"upload-image-container"},kl={key:1,class:"custom-upload-container"},xl=s("i",{class:"el-icon-plus"},null,-1),wl=s("span",{class:"tips"},"视频封面",-1),Cl={class:"image-list"},Ul={class:"upload-image-container"},Il=m("替换"),zl=s("i",{class:"el-icon-plus"},null,-1),Ll=s("span",{class:"tips"},"添加图片",-1),Yl={class:"color refresh"},ql=s("span",{class:"introduce"},"商品可以属于多个分类 ",-1),Pl=m("新增分类"),Tl=m("|"),Dl=m("刷新"),Ml=m("推荐"),jl=m("新品"),Hl=m("热销"),Sl={class:"color refresh"},El=s("span",{class:"introduce"},"商品可以属于多个商品支持 ",-1),Fl=m("新增服务支持"),Al=m("|"),Gl=m("刷新"),Ol=m("展开更多基础设置"),Xl=m("收起更多基础设置"),$l={class:"advanced-setting"},Nl={class:"color refresh"},Wl=s("span",{class:"introduce"},"商品可以属于多个分组 ",-1),Zl=m("新增商品分组"),Bl=m("|"),Jl=m("刷新"),Kl={class:"color refresh"},Ql=s("span",{class:"introduce"},"商品可指定产品标签 ",-1),Rl=m("新增商品标签"),ea=m("|"),la=m("刷新"),aa=s("div",{class:"type-title"},"价格库存",-1),ta=m("无"),sa=m("多规格商品"),oa={key:0,class:"specification-type"},ua={class:"price-input"},da=m("元"),ia={class:"price-input"},ca=m("元"),na=s("div",{class:"oe-m-t-10"},[s("span",null,"划线价格在商品详情页以划线形式展示，不参与商品金额结算")],-1),ra={class:"price-input"},pa=m("元"),ma=s("div",{class:"color oe-m-t-10"},[s("span",null," 成本价不对用户展示，仅用于商家后台数据分析")],-1),va={class:"price-input"},_a=s("div",{class:"color oe-m-t-10"},[s("span",null," 下单/付款后减少库存，退货/退款增加库存 ")],-1),ga={class:"price-input"},ya={class:"color oe-m-t-10"},ba=m(" 商品库存少于预警数量，商品列表库存数量标红显示，如需要发送消息通知，请到 "),fa=m("消息通知"),ha=m(" 设置 "),Va={key:1},ka=m("下单减库存"),xa={class:"color oe-m-t-10"},wa=m(" 买家提交订单, 扣减库存数量, 可能会存在 "),Ca=m("恶意占用库存风险"),Ua=m("付款减库存"),Ia={class:"color oe-m-t-10"},za=m(" 买家支付成功, 扣减库存数量, 可能会存在 "),La=m("超卖风险"),Ya=m("永不减库存"),qa=s("div",{class:"color oe-m-t-10"},[s("span",null," 无论在下单还是在支付成功, 该商品永远不会扣减库存数量 ")],-1),Pa={class:"price-input"},Ta=m("件"),Da=s("div",{class:"color oe-m-t-10"},[s("span",null,"虚拟销量不计入商品数据统计")],-1),Ma={class:"entity-logistics"},ja=s("div",{class:"type-title"},"物流设置",-1),Ha={key:0},Sa=m("运费模板"),Ea=m("统一运费"),Fa={class:"input-width"},Aa=m("元"),Ga={class:"color refresh"},Oa=s("span",{class:"introduce"},"没有合适的模板 ",-1),Xa=m(" 新增运费模板 "),$a=m("|"),Na=m("刷新"),Wa=m("展开更多物流设置"),Za=m("收起更多物流设置"),Ba={class:"more-logistics"},Ja={class:"price-input"},Ka=m("千克"),Qa={class:"price-input"},Ra=m("m³"),et=s("div",{class:"type-title"},"其他设置",-1),lt=m("待出售"),at=m("上架售卖"),tt=m("上架隐藏"),st=m("定时上架"),ot=m("放置仓库"),ut=s("div",null,"待出售的商品无法进行下单购买，仅支持加入购物车",-1),dt=m("展开更多其他设置"),it=m("收起更多其他设置"),ct={class:"more-other-settings"},nt=m("会员价"),rt=m("会员等级折扣"),pt=s("div",{class:"color"},[s("span",null," 购买该商品，将根据会员的会员等级、会员价计算相应的折扣，权益优先级为：会员价＞会员等级折扣 ")],-1),mt={class:"button-box"},vt=m("保存"),_t=m("下一步"),gt={key:0,class:"button-box"},yt=m("上一步"),bt=m("保存"),ft=m("下一步"),ht={class:"button-box"},Vt=m("上一步"),kt=m("保存"),xt=s("div",{class:"title"},"编辑详情",-1),wt=s("div",{class:"title"},"预览",-1),Ct={class:"picture-preview"};v();var Ut=e({expose:[],setup(e){const o=x(),r=w().query.id,p=_([]),m=_([]),v=_([]),V=_(),O=_(),X=()=>{k({multiple:!1}).then((e=>{Q.value.main_picture=e[0].path.url}))},$=()=>{k({multiple:!1,selectorType:3}).then((e=>{Q.value.video=e[0].path.url}))},N=()=>{k({multiple:!1}).then((e=>{Q.value.video_cover=e[0].path.url}))},W=()=>{k({multiple:!0}).then((e=>{console.log(e,"商品轮播图"),e.length>10||e.length+Z.value.length>10?U.success("轮播图最多只能添加十张"):e.forEach((e=>{Z.value.push(e.path.url)}))}))},Z=_([]),B=_([]),J=async()=>{const e=await I({option:{commodity:!0}});console.log("select关联商品",e);B.value.every((l=>l.id!=e.value.data.id))?B.value.push(e.value.data):U.error("已经关联过这个商品")},K=e=>{const{href:l}=o.resolve({path:e});window.open(l,"_blank")},Q=_({goods_type:1,title:"",vice_title:"",main_picture:"",video:"",video_cover:"",slideshow:[],classId:[],marketing_tab:[],serviceId:[],cart_type:1,groupId:[],tabId:[],norms_type:0,price:"",original_price:"",cost_price:"",stock:"",stock_warning:"",stock_set:1,stock_show:1,sales_show:1,virtual_sales:"",postage:2,express_fee:1,express_site:"",freight:"",expressage:1,weight:"",volume:"",goods_code:"",bar_code:"",timing_sold_out:1,timing_sold_out_time:"",goods_state:2,goods_state_time:"",start_purchase_limit:1,member_equities:["2"],relevance_goods_id:"",goods_detail:"",goods_param_type:"5",goods_param:"",spec:[],options:[]}),R=(e,l,a)=>{""!=l&&null!=l||a(new Error("时间不能为空"));Date.now()>h(l).valueOf()&&a(new Error("选择的时间必须大于当前时间")),a()},ee=g({title:[{required:!0,message:"请输入商品名称",trigger:"blur"},{min:1,max:40,message:"长度在 1 到 40 个字符",trigger:"blur"}],main_picture:[{required:!0,message:"请选择商品主图片",trigger:"blur"}],slideshow:[{required:!0,message:"请选择商品轮播图片",trigger:"blur"}],price:[{required:!0,message:"请输入售卖价格",trigger:"blur"}],stock:[{required:!0,message:"请输入库存",trigger:"blur"}],stock_set:[{required:!0,message:"请输入库存",trigger:"blur"}],freight:[{required:!0,message:"请输入运费价格",trigger:"blur"}],express_site:[{required:!0,message:"请选择运费模板",trigger:"blur"}],timing_sold_out:[{required:!0,message:"是否定时下架",trigger:"blur"}],goods_state_time:[{required:!0,validator:R,trigger:"blur"}],timing_sold_out_time:[{required:!0,validator:R,trigger:"blur"}]}),le=_(!1),ae=_(!1),te=_(!1),se=_([{id:1,type:"实体商品",mode:"物流发货",icon:"Shape1.png",image:"group1.png"},{id:2,type:"虚拟商品",mode:"无需物流",icon:"Shape2.png",image:"group2.png"}]),oe=_("1"),ue={multiple:!0,expandTrigger:"hover",value:"id",label:"name",checkStrictly:!0,emitPath:!1},de={multiple:!0,expandTrigger:"hover",value:"id",label:"name",emitPath:!1},ie=_([]),ce=_([]),ne=e=>{console.log(e,"改变的值")},re=_([]),pe=_([]),me=e=>{var l;const a={class:we,support:Ce,grouping:Ue,label:xe,parameter:ze,freight:Ie};null==(l=a[e])||l.call(a),U({showClose:!0,message:"刷新成功",type:"success"})},ve=_(),_e=_(),ge=_(),ye=_(),be=_(),fe=_([]),he=_([]),Ve=_(""),ke=e=>{const l=be.value.find((l=>l.id==e));l.hideChildren=!1;const a=[];a.push(l),console.log(a[0].summarize,"12312123SSSS"),fe.value=a[0].summarize},xe=async()=>{const e=await z();ce.value=e.data.data.data};xe();const we=async()=>{const e=await L();pe.value=e.data.data.data};we();const Ce=async()=>{const e=await Y({page:1,limit:100});ve.value=e.data.data.data};Ce();const Ue=async()=>{const e=await q({page:1,limit:100});_e.value=e.data.data.data};Ue();const Ie=async()=>{const e=await P({page:1,limit:2e3});ge.value=e.data.data.data};Ie();(async()=>{const e=await T();ye.value=e.data.data.data})();const ze=async()=>{const e=await D();be.value=e.data.data.data};if(ze(),"-1"!=r){(async()=>{const e=await M({id:r});Q.value=e.data.data.data[0],Q.value.goods_param_type=Q.value.goods_param_type.toString(),Z.value=Q.value.slideshow,re.value=Q.value.classId,ie.value=Q.value.tabId,se.value.forEach((e=>{if(e.id!=Q.value.goods_type){const l=se.value.findIndex((l=>l.id==e.id));se.value.splice(l,1)}})),2==Q.value.timing_sold_out&&(Q.value.timing_sold_out_time=j(Q.value.timing_sold_out_time)),1!=Q.value.goods_state&&4!=Q.value.goods_state||(Q.value.goods_state_time=j(Q.value.goods_state_time)),""!=Q.value.relevance_goods_id&&M({id:Q.value.relevance_goods_id}).then((e=>{const l=e.data.data.data;B.value=l})),1==Q.value.norms_type&&(m.value=H.cloneDeep(Q.value.spec),v.value=H.cloneDeep(Q.value.option)),"2"==Q.value.goods_param_type&&(O.value=Number(Q.value.goods_param),ke(O.value)),"4"==Q.value.goods_param_type&&""!=Q.value.goods_param&&(he.value=Q.value.goods_param,p.value=he.value),"3"==Q.value.goods_param_type&&(Ve.value=Q.value.goods_param)})()}const Ut=_(),It=_(!1),zt=()=>{It.value=!0,Q.value.slideshow=Z.value,Q.value.classId=re.value,Q.value.tabId=ie.value,Ut.value.validate((async(e,l)=>{if(console.log("返回的错误字段",l),!e)return U.error({message:G(l),type:"error"}),It.value=!1,!1;if(1==Q.value.norms_type&&(Q.value.spec=m.value,Q.value.option=v.value),2==Q.value.timing_sold_out&&(Q.value.timing_sold_out_time=h(Q.value.timing_sold_out_time).format("YYYY-MM-DD HH:mm:ss")),1!=Q.value.goods_state&&4!=Q.value.goods_state||(Q.value.goods_state_time=h(Q.value.goods_state_time).format("YYYY-MM-DD HH:mm:ss")),B.value.length>0){const e=[];B.value.forEach((l=>{e.push(l.id)})),Q.value.relevance_goods_id=e.join()}else Q.value.relevance_goods_id="";"4"==Q.value.goods_param_type&&(Q.value.goods_param=p.value),"3"==Q.value.goods_param_type&&(Q.value.goods_param=Ve.value),"2"==Q.value.goods_param_type&&(Q.value.goods_param=O.value),"-1"!=r&&(Q.value.id=r);try{await S(Q.value)}catch(a){return void(It.value=!1)}"-1"!=r?(U.success({message:"编辑商品成功",type:"success"}),o.push("admin")):(U.success({message:"新增商品成功",type:"success"}),o.push("admin")),It.value=!1}))};return Ye(((e,o)=>{const r=l("el-tab-pane"),_=l("el-tabs"),g=l("el-image"),h=l("el-link"),x=l("el-radio"),w=l("el-option"),z=l("el-select"),L=l("el-button"),Y=l("el-card"),q=l("el-input"),P=l("el-form-item"),T=l("el-cascader"),D=l("el-checkbox"),M=l("el-checkbox-group"),j=l("el-switch"),H=l("el-input-number"),S=l("el-date-picker"),G=l("el-form"),R=l("el-col"),ye=l("el-row");return a(),t("div",qe,[s(Y,{shadow:"never",class:"oe-m-b-24"},{default:Ye((()=>[s(_,{class:"custom-tabs",modelValue:oe.value,"onUpdate:modelValue":o[1]||(o[1]=e=>oe.value=e)},{default:Ye((()=>[s(r,{label:"基础信息",name:"1"}),s(r,{label:"商品详情",name:"2"}),s(r,{label:"商品参数",name:"3"})])),_:1},8,["modelValue"]),y(s("div",Pe,[Te,s("div",De,[(a(!0),t(i,null,c(se.value,(e=>(a(),t("div",{class:["type-item oe-m-r-24",Q.value.goods_type==e.id?"border":""],onClick:l=>{return a=e.id,void(Q.value.goods_type=a);var a},key:e.id},[Q.value.goods_type==e.id?(a(),t("div",Me,[je])):u("",!0),s("div",He,[s(g,{src:`/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/${e.image}`},null,8,["src"])]),s("div",Se,[s(g,{src:`/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/${e.icon}`},null,8,["src"])]),s("div",Ee,[s("div",Fe,n(e.type),1),s("div",Ae,n(e.mode),1)])],10,["onClick"])))),128))])],512),[[b,"1"==oe.value]]),y(s("div",Ge,[Oe,s("div",Xe,[(a(!0),t(i,null,c(B.value,((e,l)=>(a(),t("div",{class:"carousel",key:l},[s("div",$e,[s(g,{class:"upload-image",src:e.main_picture},null,8,["src"]),s("i",{class:"el-icon-close",onClick:d((e=>(e=>{B.value.splice(e,1)})(l)),["stop"])},null,8,["onClick"])]),s(h,{class:"replace",onClick:d((e=>(e=>{I({option:{commodity:!0}}).then((l=>{B.value.every((e=>e.id!=l.value.data.id))?B.value.splice(e,1,l.value.data):U.error("已经关联过这个商品")}))})(l)),["stop"]),type:"primary",href:"javascript:;"},{default:Ye((()=>[Ne])),_:2},1032,["onClick"])])))),128)),B.value.length<10?(a(),t("div",{key:0,class:"custom-upload-container",onClick:J},[We,Ze,s("span",Be,"（"+n(B.value.length)+"/10）",1)])):u("",!0)])],512),[[b,"2"==oe.value]]),y(s("div",Je,[Ke,s("div",Qe,[Re,s(x,{modelValue:Q.value.goods_param_type,"onUpdate:modelValue":o[2]||(o[2]=e=>Q.value.goods_param_type=e),label:"2"},{default:Ye((()=>[el])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_param_type,"onUpdate:modelValue":o[3]||(o[3]=e=>Q.value.goods_param_type=e),label:"3"},{default:Ye((()=>[ll])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_param_type,"onUpdate:modelValue":o[4]||(o[4]=e=>Q.value.goods_param_type=e),label:"4"},{default:Ye((()=>[al])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_param_type,"onUpdate:modelValue":o[5]||(o[5]=e=>Q.value.goods_param_type=e),label:"5"},{default:Ye((()=>[tl])),_:1},8,["modelValue"])]),y(s("div",sl,[ol,s(z,{onChange:ke,modelValue:O.value,"onUpdate:modelValue":o[6]||(o[6]=e=>O.value=e),size:"small",class:"input-width",placeholder:"请选择"},{default:Ye((()=>[(a(!0),t(i,null,c(be.value,(e=>(a(),t(w,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),s("div",ul,[s("span",null,[dl,s(L,{onClick:o[7]||(o[7]=e=>K("addParame")),type:"text"},{default:Ye((()=>[il])),_:1}),s(L,{type:"text"},{default:Ye((()=>[cl])),_:1}),s(L,{onClick:o[8]||(o[8]=e=>me("parameter")),type:"text"},{default:Ye((()=>[nl])),_:1})])])],512),[[b,"2"==Q.value.goods_param_type]])],512),[[b,"3"==oe.value]])])),_:1}),y(s(G,{model:Q.value,rules:f(ee),ref:Ut,"label-width":"130px",class:"demo-ruleForm"},{default:Ye((()=>[s(Y,{shadow:"never",class:"oe-m-b-24"},{default:Ye((()=>[rl,s(P,{label:"商品名称",prop:"title"},{default:Ye((()=>[s(q,{type:"text",placeholder:"请输入商品名称",class:"input-width",modelValue:Q.value.title,"onUpdate:modelValue":o[9]||(o[9]=e=>Q.value.title=e),size:"small",maxlength:"40","show-word-limit":""},null,8,["modelValue"])])),_:1}),s(P,{label:"商品副标题"},{default:Ye((()=>[s(q,{type:"textarea",placeholder:"为了增强商品的流量，建议添加内容突出商品特色和风格",class:"input-width",modelValue:Q.value.vice_title,"onUpdate:modelValue":o[10]||(o[10]=e=>Q.value.vice_title=e),size:"small",maxlength:"90","show-word-limit":""},null,8,["modelValue"])])),_:1}),s(P,{label:"商品主图",prop:"main_picture"},{default:Ye((()=>[s("div",{class:"image-list",onClick:X},[Q.value.main_picture?(a(),t("div",pl,[s(g,{class:"upload-image",src:Q.value.main_picture},null,8,["src"]),s("i",{class:"el-icon-close",onClick:o[11]||(o[11]=d((e=>Q.value.main_picture=""),["stop"]))})])):(a(),t("div",ml,[vl,_l]))])])),_:1}),s(P,{label:"主图视频"},{default:Ye((()=>[s("div",gl,[s("div",{class:"image-list",onClick:$},[Q.value.video?(a(),t("div",yl,[s("video",{src:Q.value.video},null,8,["src"]),s("i",{class:"el-icon-close",onClick:o[12]||(o[12]=d((e=>Q.value.video=""),["stop"]))})])):(a(),t("div",bl,[fl,hl]))]),s("div",{class:"image-list",onClick:N},[Q.value.video_cover?(a(),t("div",Vl,[s(g,{class:"upload-image",src:Q.value.video_cover},null,8,["src"]),s("i",{class:"el-icon-close",onClick:o[13]||(o[13]=d((e=>Q.value.video_cover=""),["stop"]))})])):(a(),t("div",kl,[xl,wl]))])])])),_:1}),s(P,{label:"商品轮播图",prop:"slideshow"},{default:Ye((()=>[s("div",Cl,[(a(!0),t(i,null,c(Z.value,((e,l)=>(a(),t("div",{class:"carousel",key:l},[s("div",Ul,[s(g,{class:"upload-image",src:e},null,8,["src"]),s("i",{class:"el-icon-close",onClick:d((e=>(e=>{Z.value.splice(e,1)})(l)),["stop"])},null,8,["onClick"])]),s(h,{class:"replace",onClick:d((e=>(e=>{k({multiple:!1}).then((l=>{Z.value.splice(e,1,l[0].path.url)}))})(l)),["stop"]),type:"primary",href:"javascript:;"},{default:Ye((()=>[Il])),_:2},1032,["onClick"])])))),128)),s("div",{class:"custom-upload-container",onClick:W},[zl,Ll])])])),_:1}),s(P,{label:"商品分类"},{default:Ye((()=>[s(T,{onChange:ne,modelValue:re.value,"onUpdate:modelValue":o[14]||(o[14]=e=>re.value=e),size:"small",options:pe.value,props:f(de),clearable:""},null,8,["modelValue","options","props"]),s("div",Yl,[s("span",null,[ql,s(L,{onClick:o[15]||(o[15]=e=>K("editClassification")),type:"text"},{default:Ye((()=>[Pl])),_:1}),s(L,{type:"text"},{default:Ye((()=>[Tl])),_:1}),s(L,{onClick:o[16]||(o[16]=e=>me("class")),type:"text"},{default:Ye((()=>[Dl])),_:1})])])])),_:1}),s(P,{label:"营销标签"},{default:Ye((()=>[s(M,{modelValue:Q.value.marketing_tab,"onUpdate:modelValue":o[17]||(o[17]=e=>Q.value.marketing_tab=e)},{default:Ye((()=>[s(D,{label:"1"},{default:Ye((()=>[Ml])),_:1}),s(D,{label:"2"},{default:Ye((()=>[jl])),_:1}),s(D,{label:"3"},{default:Ye((()=>[Hl])),_:1})])),_:1},8,["modelValue"])])),_:1}),s(P,{label:"服务支持"},{default:Ye((()=>[s(T,{modelValue:Q.value.serviceId,"onUpdate:modelValue":o[18]||(o[18]=e=>Q.value.serviceId=e),size:"small",options:ve.value,props:f(ue),clearable:""},null,8,["modelValue","options","props"]),s("div",Sl,[s("span",null,[El,s(L,{onClick:o[19]||(o[19]=e=>K("addSupport")),type:"text"},{default:Ye((()=>[Fl])),_:1}),s(L,{type:"text"},{default:Ye((()=>[Al])),_:1}),s(L,{onClick:o[20]||(o[20]=e=>me("support")),type:"text"},{default:Ye((()=>[Gl])),_:1})])])])),_:1}),s("div",{style:{width:"fit-content"},onClick:o[21]||(o[21]=e=>le.value=!le.value),class:"put-it-away"},[0==le.value?(a(),t(L,{key:0,type:"text"},{default:Ye((()=>[Ol])),_:1})):(a(),t(L,{key:1,type:"text"},{default:Ye((()=>[Xl])),_:1}))]),y(s("div",$l,[s(P,{label:"加入购物车",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.cart_type,"onUpdate:modelValue":o[22]||(o[22]=e=>Q.value.cart_type=e),"active-value":1,"inactive-value":0,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),s(P,{label:"商品分组"},{default:Ye((()=>[s(T,{modelValue:Q.value.groupId,"onUpdate:modelValue":o[23]||(o[23]=e=>Q.value.groupId=e),size:"small",options:_e.value,props:f(ue),clearable:""},null,8,["modelValue","options","props"]),s("div",Nl,[s("span",null,[Wl,s(L,{onClick:o[24]||(o[24]=e=>K("addGrouping")),type:"text"},{default:Ye((()=>[Zl])),_:1}),s(L,{type:"text"},{default:Ye((()=>[Bl])),_:1}),s(L,{onClick:o[25]||(o[25]=e=>me("grouping")),type:"text"},{default:Ye((()=>[Jl])),_:1})])])])),_:1}),s(P,{label:"商品标签"},{default:Ye((()=>[s(T,{size:"small",modelValue:ie.value,"onUpdate:modelValue":o[26]||(o[26]=e=>ie.value=e),options:ce.value,props:f(ue),clearable:""},null,8,["modelValue","options","props"]),s("div",Kl,[s("span",null,[Ql,s(L,{onClick:o[27]||(o[27]=e=>K("addProductLabeling")),type:"text"},{default:Ye((()=>[Rl])),_:1}),s(L,{type:"text"},{default:Ye((()=>[ea])),_:1}),s(L,{onClick:o[28]||(o[28]=e=>me("label")),type:"text"},{default:Ye((()=>[la])),_:1})])])])),_:1})],512),[[b,le.value]])])),_:1}),s(Y,{shadow:"never",class:"oe-m-b-24"},{default:Ye((()=>[aa,s(P,{label:"规格类型",class:"buy-button black-color"},{default:Ye((()=>[s(x,{modelValue:Q.value.norms_type,"onUpdate:modelValue":o[29]||(o[29]=e=>Q.value.norms_type=e),label:0},{default:Ye((()=>[ta])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.norms_type,"onUpdate:modelValue":o[30]||(o[30]=e=>Q.value.norms_type=e),label:1},{default:Ye((()=>[sa])),_:1},8,["modelValue"])])),_:1}),0==Q.value.norms_type?(a(),t("div",oa,[s(P,{label:"售卖价格",prop:"price",class:"buy-button"},{default:Ye((()=>[s("div",ua,[s(q,{onInput:o[31]||(o[31]=e=>Q.value.price=f(E)(Q.value.price)),placeholder:"请输入内容",modelValue:Q.value.price,"onUpdate:modelValue":o[32]||(o[32]=e=>Q.value.price=e)},{append:Ye((()=>[da])),_:1},8,["modelValue"])])])),_:1}),s(P,{label:"划线价格",class:"buy-button"},{default:Ye((()=>[s("div",ia,[s(q,{onInput:o[33]||(o[33]=e=>Q.value.original_price=f(E)(Q.value.original_price)),placeholder:"请输入内容",modelValue:Q.value.original_price,"onUpdate:modelValue":o[34]||(o[34]=e=>Q.value.original_price=e),type:"number"},{append:Ye((()=>[ca])),_:1},8,["modelValue"])]),na])),_:1}),s(P,{label:"成本价",class:"buy-button"},{default:Ye((()=>[s("div",ra,[s(q,{onInput:o[35]||(o[35]=e=>Q.value.cost_price=f(E)(Q.value.cost_price)),placeholder:"请输入内容",modelValue:Q.value.cost_price,"onUpdate:modelValue":o[36]||(o[36]=e=>Q.value.cost_price=e),type:"number"},{append:Ye((()=>[pa])),_:1},8,["modelValue"])]),ma])),_:1}),s(P,{label:"商品库存",prop:"stock",class:"buy-button"},{default:Ye((()=>[s("div",va,[s(q,{onInput:o[37]||(o[37]=e=>Q.value.stock=f(F)(Q.value.stock)),class:"stock-input-width",size:"small",modelValue:Q.value.stock,"onUpdate:modelValue":o[38]||(o[38]=e=>Q.value.stock=e),placeholder:"请输入库存"},null,8,["modelValue"])]),_a])),_:1}),s(P,{label:"库存警示",class:"buy-button"},{default:Ye((()=>[s("div",ga,[s(q,{onInput:o[39]||(o[39]=e=>Q.value.stock_warning=f(F)(Q.value.stock_warning)),class:"stock-input-width",size:"small",modelValue:Q.value.stock_warning,"onUpdate:modelValue":o[40]||(o[40]=e=>Q.value.stock_warning=e),placeholder:"请输入"},null,8,["modelValue"])]),s("div",ya,[s("span",null,[ba,s(L,{type:"text"},{default:Ye((()=>[fa])),_:1}),ha])])])),_:1})])):u("",!0),1==Q.value.norms_type?(a(),t("div",Va,[s(P,{label:"商品规格"},{default:Ye((()=>[s(A,{skus:m.value,"onUpdate:skus":o[41]||(o[41]=e=>m.value=e),table:v.value,"onUpdate:table":o[42]||(o[42]=e=>v.value=e)},null,8,["skus","table"])])),_:1})])):u("",!0),s(P,{label:"库存设置",class:"buy-button",prop:"stock_set"},{default:Ye((()=>[s(x,{modelValue:Q.value.stock_set,"onUpdate:modelValue":o[43]||(o[43]=e=>Q.value.stock_set=e),label:1},{default:Ye((()=>[ka])),_:1},8,["modelValue"]),s("div",xa,[s("span",null,[wa,s(L,{class:"red-color",type:"text"},{default:Ye((()=>[Ca])),_:1})])]),s(x,{modelValue:Q.value.stock_set,"onUpdate:modelValue":o[44]||(o[44]=e=>Q.value.stock_set=e),label:2},{default:Ye((()=>[Ua])),_:1},8,["modelValue"]),s("div",Ia,[s("span",null,[za,s(L,{class:"red-color",type:"text"},{default:Ye((()=>[La])),_:1})])]),s(x,{modelValue:Q.value.stock_set,"onUpdate:modelValue":o[45]||(o[45]=e=>Q.value.stock_set=e),label:3},{default:Ye((()=>[Ya])),_:1},8,["modelValue"]),qa])),_:1}),s(P,{label:"商品详情显示库存",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.stock_show,"onUpdate:modelValue":o[46]||(o[46]=e=>Q.value.stock_show=e),"active-value":1,"inactive-value":2,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),s(P,{label:"商品详情显示销量",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.sales_show,"onUpdate:modelValue":o[47]||(o[47]=e=>Q.value.sales_show=e),"active-value":1,"inactive-value":2,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),1==Q.value.sales_show?(a(),t(P,{key:2,label:"虚拟销量",class:"buy-button"},{default:Ye((()=>[s("div",Pa,[s(q,{onInput:o[48]||(o[48]=e=>Q.value.virtual_sales=f(F)(Q.value.virtual_sales)),placeholder:"请输入内容",modelValue:Q.value.virtual_sales,"onUpdate:modelValue":o[49]||(o[49]=e=>Q.value.virtual_sales=e)},{append:Ye((()=>[Ta])),_:1},8,["modelValue"])]),Da])),_:1})):u("",!0)])),_:1}),1==Q.value.goods_type?(a(),t(Y,{key:0,shadow:"never",class:"oe-m-b-24"},{default:Ye((()=>[s("div",Ma,[ja,s(P,{label:"商品包邮",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.postage,"onUpdate:modelValue":o[50]||(o[50]=e=>Q.value.postage=e),"active-value":2,"inactive-value":1,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),1==Q.value.postage?(a(),t("div",Ha,[s(P,{label:"快递运费",class:"buy-button"},{default:Ye((()=>[s(x,{modelValue:Q.value.express_fee,"onUpdate:modelValue":o[51]||(o[51]=e=>Q.value.express_fee=e),label:1},{default:Ye((()=>[Sa])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.express_fee,"onUpdate:modelValue":o[52]||(o[52]=e=>Q.value.express_fee=e),label:2},{default:Ye((()=>[Ea])),_:1},8,["modelValue"])])),_:1}),"2"==Q.value.express_fee?(a(),t(P,{key:0,label:"统一运费",prop:"freight",class:"buy-button"},{default:Ye((()=>[s("div",Fa,[s(H,{placeholder:"请输入价格",modelValue:Q.value.freight,"onUpdate:modelValue":o[53]||(o[53]=e=>Q.value.freight=e),controls:!1,min:.01,precision:2,style:{flex:"1"}},{append:Ye((()=>[Aa])),_:1},8,["modelValue","min"])])])),_:1})):u("",!0),"1"==Q.value.express_fee?(a(),t(P,{key:1,label:"运费模板",prop:"express_site"},{default:Ye((()=>[s(z,{size:"small",modelValue:Q.value.express_site,"onUpdate:modelValue":o[54]||(o[54]=e=>Q.value.express_site=e),class:"input-width",placeholder:"请选择"},{default:Ye((()=>[(a(!0),t(i,null,c(ge.value,(e=>(a(),t(w,{key:e.id,label:e.dispatch_name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),s("div",Ga,[s("span",null,[Oa,s(L,{onClick:o[55]||(o[55]=e=>K("/system/logisticsDistribution/newTemplate")),type:"text"},{default:Ye((()=>[Xa])),_:1}),s(L,{type:"text"},{default:Ye((()=>[$a])),_:1}),s(L,{onClick:o[56]||(o[56]=e=>me("freight")),type:"text"},{default:Ye((()=>[Na])),_:1})])])])),_:1})):u("",!0)])):u("",!0),s("div",{style:{width:"fit-content"},onClick:o[57]||(o[57]=e=>ae.value=!ae.value),class:"put-it-away"},[0==ae.value?(a(),t(L,{key:0,type:"text"},{default:Ye((()=>[Wa])),_:1})):(a(),t(L,{key:1,type:"text"},{default:Ye((()=>[Za])),_:1}))]),y(s("div",Ba,[s(P,{label:"商品详情显示快递",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.expressage,"onUpdate:modelValue":o[58]||(o[58]=e=>Q.value.expressage=e),"active-value":1,"inactive-value":2,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),s(P,{label:"商品重量",class:"buy-button"},{default:Ye((()=>[s("div",Ja,[s(q,{onInput:o[59]||(o[59]=e=>Q.value.weight=f(E)(Q.value.weight)),placeholder:"请输入内容",modelValue:Q.value.weight,"onUpdate:modelValue":o[60]||(o[60]=e=>Q.value.weight=e)},{append:Ye((()=>[Ka])),_:1},8,["modelValue"])])])),_:1}),s(P,{label:"商品体积",class:"buy-button"},{default:Ye((()=>[s("div",Qa,[s(q,{onInput:o[61]||(o[61]=e=>Q.value.volume=f(E)(Q.value.volume)),placeholder:"请输入内容",modelValue:Q.value.volume,"onUpdate:modelValue":o[62]||(o[62]=e=>Q.value.volume=e),type:"number"},{append:Ye((()=>[Ra])),_:1},8,["modelValue"])])])),_:1})],512),[[b,ae.value]])])])),_:1})):u("",!0),s(Y,{shadow:"never",class:"oe-m-b-24"},{default:Ye((()=>[et,s(P,{label:"商品编码"},{default:Ye((()=>[s(q,{type:"text",placeholder:"请输入商品编码",class:"input-width",modelValue:Q.value.goods_code,"onUpdate:modelValue":o[63]||(o[63]=e=>Q.value.goods_code=e),size:"small"},null,8,["modelValue"])])),_:1}),s(P,{label:"商品条形码"},{default:Ye((()=>[s(q,{type:"text",placeholder:"请输入商品条形码",class:"input-width",modelValue:Q.value.bar_code,"onUpdate:modelValue":o[64]||(o[64]=e=>Q.value.bar_code=e),size:"small"},null,8,["modelValue"])])),_:1}),s(P,{label:"定时下架",prop:"timing_sold_out",class:"buy-button"},{default:Ye((()=>[s(j,{modelValue:Q.value.timing_sold_out,"onUpdate:modelValue":o[65]||(o[65]=e=>Q.value.timing_sold_out=e),"active-value":2,"inactive-value":1,"active-color":"#13ce66"},null,8,["modelValue"])])),_:1}),2==Q.value.timing_sold_out?(a(),t(P,{key:0,label:"下架时间",prop:"timing_sold_out_time",class:"buy-button"},{default:Ye((()=>[s("div",null,[s(S,{format:"YYYY-MM-DD HH:mm","prefix-icon":"el-icon-date",modelValue:Q.value.timing_sold_out_time,"onUpdate:modelValue":o[66]||(o[66]=e=>Q.value.timing_sold_out_time=e),type:"datetime",placeholder:"请选择时间"},null,8,["modelValue"])])])),_:1})):u("",!0),s(P,{label:"状态",class:"buy-button"},{default:Ye((()=>[s(x,{modelValue:Q.value.goods_state,"onUpdate:modelValue":o[67]||(o[67]=e=>Q.value.goods_state=e),label:1},{default:Ye((()=>[lt])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_state,"onUpdate:modelValue":o[68]||(o[68]=e=>Q.value.goods_state=e),label:2},{default:Ye((()=>[at])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_state,"onUpdate:modelValue":o[69]||(o[69]=e=>Q.value.goods_state=e),label:3},{default:Ye((()=>[tt])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_state,"onUpdate:modelValue":o[70]||(o[70]=e=>Q.value.goods_state=e),label:4},{default:Ye((()=>[st])),_:1},8,["modelValue"]),s(x,{modelValue:Q.value.goods_state,"onUpdate:modelValue":o[71]||(o[71]=e=>Q.value.goods_state=e),label:5},{default:Ye((()=>[ot])),_:1},8,["modelValue"])])),_:1}),1==Q.value.goods_state?(a(),t(P,{key:1,label:"出售时间",prop:"goods_state_time",class:"buy-button"},{default:Ye((()=>[s("div",null,[s(S,{format:"YYYY-MM-DD HH:mm",modelValue:Q.value.goods_state_time,"onUpdate:modelValue":o[72]||(o[72]=e=>Q.value.goods_state_time=e),type:"datetime",placeholder:"请选择时间","prefix-icon":"el-icon-date"},null,8,["modelValue"]),ut])])),_:1})):u("",!0),4==Q.value.goods_state?(a(),t(P,{key:2,label:"上架时间",prop:"goods_state_time",class:"buy-button"},{default:Ye((()=>[s("div",null,[s(S,{format:"YYYY-MM-DD HH:mm",modelValue:Q.value.goods_state_time,"onUpdate:modelValue":o[73]||(o[73]=e=>Q.value.goods_state_time=e),type:"datetime",placeholder:"请选择时间","prefix-icon":"el-icon-date"},null,8,["modelValue"])])])),_:1})):u("",!0),s("div",{style:{width:"fit-content"},onClick:o[74]||(o[74]=e=>te.value=!te.value),class:"put-it-away"},[0==te.value?(a(),t(L,{key:0,type:"text"},{default:Ye((()=>[dt])),_:1})):(a(),t(L,{key:1,type:"text"},{default:Ye((()=>[it])),_:1}))]),y(s("div",ct,[s(P,{label:"参与会员权益",class:"buy-button"},{default:Ye((()=>[s(M,{modelValue:Q.value.member_equities,"onUpdate:modelValue":o[75]||(o[75]=e=>Q.value.member_equities=e)},{default:Ye((()=>[s(D,{label:"2"},{default:Ye((()=>[nt])),_:1}),s(D,{label:"3"},{default:Ye((()=>[rt])),_:1})])),_:1},8,["modelValue"]),pt])),_:1})],512),[[b,te.value]])])),_:1})])),_:1},8,["model","rules"]),[[b,"1"==oe.value]]),s(Y,{shadow:"never",class:"footer-card"},{default:Ye((()=>[y(s("div",mt,[s(L,{onClick:zt,size:"small",type:"primary",loading:It.value},{default:Ye((()=>[vt])),_:1},8,["loading"]),s(L,{size:"small",onClick:o[76]||(o[76]=e=>oe.value="2")},{default:Ye((()=>[_t])),_:1})],512),[[b,"1"==oe.value]]),"2"==oe.value?(a(),t("div",gt,[s(L,{size:"small",onClick:o[77]||(o[77]=e=>oe.value="1")},{default:Ye((()=>[yt])),_:1}),s(L,{onClick:zt,size:"small",type:"primary",loading:It.value},{default:Ye((()=>[bt])),_:1},8,["loading"]),s(L,{size:"small",onClick:o[78]||(o[78]=e=>oe.value="3")},{default:Ye((()=>[ft])),_:1})])):u("",!0),y(s("div",ht,[s(L,{size:"small",onClick:o[79]||(o[79]=e=>oe.value="2")},{default:Ye((()=>[Vt])),_:1}),s(L,{onClick:zt,size:"small",type:"primary",loading:It.value},{default:Ye((()=>[kt])),_:1},8,["loading"])],512),[[b,"3"==oe.value]])])),_:1}),y(s(ye,{gutter:20,class:"edit-rich-text"},{default:Ye((()=>[s(R,{span:18},{default:Ye((()=>[s(Y,{shadow:"never",class:"rich-text-card"},{default:Ye((()=>[xt,s(C,{class:"rich-text",modelValue:Q.value.goods_detail,"onUpdate:modelValue":o[80]||(o[80]=e=>Q.value.goods_detail=e),width:"100%"},null,8,["modelValue"])])),_:1})])),_:1}),s(R,{span:6},{default:Ye((()=>[s(Y,{shadow:"never",class:"e-grid commodity-and-blue"},{default:Ye((()=>[wt,s("div",Ct,[s("div",{class:"goods-detail",innerHTML:Q.value.goods_detail},null,8,["innerHTML"]),s(g,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/addgoods/add-goods-detail.png"})])])),_:1})])),_:1})])),_:1},512),[[b,"2"==oe.value]]),y(s(Le,{ref:V,isType:Q.value.goods_param_type,parameterLlist:fe.value,tableList:p.value,parameterProduct:Ve.value,"onUpdate:parameterProduct":o[81]||(o[81]=e=>Ve.value=e)},null,8,["isType","parameterLlist","tableList","parameterProduct"]),[[b,"3"==oe.value&&!("5"==Q.value.goods_param_type)]])])}))}});Ut.__scopeId="data-v-932b4cc8";export default Ut;