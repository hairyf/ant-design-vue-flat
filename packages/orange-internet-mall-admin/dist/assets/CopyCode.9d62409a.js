import{_ as e}from"./EditHeader.67fbf51f.js";import{_ as o}from"./EditCardForm.eb8b3b86.js";import{_ as l}from"./ImageItem.b647d306.js";import{_ as t}from"./ColorGroup.vue_vue&type=script&setup=true&lang.dc9fb82e.js";import{_ as n}from"./ColorInput.60244a44.js";import{_ as a}from"./SliderGroup.vue_vue&type=script&setup=true&lang.84a8a9b8.js";import{_ as d}from"./SliderInput.27251042.js";import{c as i}from"./index.a53c91c6.js";import{a as r,b as m,o as p,c as u,g as c,F as s,P as b,X as f,t as g,s as y,k}from"./vendor.71e19cde.js";const x=k();var w=r({expose:[],props:{option:{type:Object,required:!0}},setup(r){const k=e=>{const o=document.createElement("input");o.value=e,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),i.success("复制成功!")};return x(((i,w)=>{const V=m("el-radio"),v=m("el-radio-group"),h=m("el-form-item"),_=m("el-input");return p(),u(s,null,[c(e,{icon:"ad-shopping-guide",title:"导购"}),c(o,{title:"组件风格",onClick:w[2]||(w[2]=e=>k('<edit-card-form title="组件风格">\n    <el-form-item label="商品样式">\n      <el-radio-group v-model="option.componentStyle.componentModal">\n        <el-radio v-for="v in [\'默认\', \'投影\', \'描边\']" :key="v" :label="v" />\n      </el-radio-group>\n    </el-form-item>\n  </edit-card-form>'))},{default:x((()=>[c(h,{label:"商品样式"},{default:x((()=>[c(v,{modelValue:r.option.componentStyle.componentModal,"onUpdate:modelValue":w[1]||(w[1]=e=>r.option.componentStyle.componentModal=e)},{default:x((()=>[(p(),u(s,null,b(["默认","投影","描边"],(e=>c(V,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),c(o,{title:"开关单选",onClick:w[4]||(w[4]=e=>k('<el-form-item label="组件边框">\n      <el-radio-group v-model="option.componentStyle.borderStatus">\n        <el-radio v-for="v in [\'显示\', \'隐藏\']" :key="v" :label="v === \'显示\'">\n          {{ v }}\n        </el-radio>\n      </el-radio-group>\n    </el-form-item>'))},{default:x((()=>[c(h,{label:"组件边框"},{default:x((()=>[c(v,{modelValue:r.option.componentStyle.borderStatus,"onUpdate:modelValue":w[3]||(w[3]=e=>r.option.componentStyle.borderStatus=e)},{default:x((()=>[(p(),u(s,null,b(["显示","隐藏"],(e=>c(V,{key:e,label:"显示"===e},{default:x((()=>[f(g(e),1)])),_:2},1032,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),c(o,{title:"内容编辑",onClick:w[12]||(w[12]=e=>k(' <edit-card-form title="内容编辑">\n    <color-group v-model="option.contentEdit.color">\n      <el-form-item label="图片">\n        <image-item v-model="option.contentEdit.image" />\n      </el-form-item>\n      <el-form-item label="标题文字">\n        <el-input\n          maxlength="10"\n          show-word-limit\n          v-model="option.contentEdit.title"\n          placeholder="请输入标题文字"\n        />\n      </el-form-item>\n      <color-input keyword="background" label="背景颜色" />\n      <el-form-item label="副标题文字" class="long-slider-input">\n        <el-input\n          maxlength="40"\n          show-word-limit\n          v-model="option.contentEdit.subTitle"\n          placeholder="请输入副标题文字"\n        />\n      </el-form-item>\n      <color-input keyword="subBackground" label="背景颜色" />\n      <el-form-item label="联系方式名称" class="long-slider-input-6">\n        <el-input\n          maxlength="5"\n          show-word-limit\n          v-model="option.contentEdit.contactName"\n          placeholder="请输入名称"\n        />\n      </el-form-item>\n      <el-form-item label="联系方式内容" class="long-slider-input-6">\n        <el-input\n          maxlength="20"\n          show-word-limit\n          v-model="option.contentEdit.contactContent"\n          placeholder="请输入内容"\n        />\n      </el-form-item>\n      <el-form-item label="按钮文字">\n        <el-input\n          maxlength="5"\n          show-word-limit\n          v-model="option.contentEdit.btnText"\n          placeholder="请输入内容"\n        />\n      </el-form-item>\n      <color-input keyword="text" label="文字颜色" />\n      <color-input keyword="btn" label="按钮颜色" />\n    </color-group>\n  </edit-card-form>'))},{default:x((()=>[c(t,{modelValue:r.option.contentEdit.color,"onUpdate:modelValue":w[11]||(w[11]=e=>r.option.contentEdit.color=e)},{default:x((()=>[c(h,{label:"图片"},{default:x((()=>[c(l,{modelValue:r.option.contentEdit.image,"onUpdate:modelValue":w[5]||(w[5]=e=>r.option.contentEdit.image=e)},null,8,["modelValue"])])),_:1}),c(h,{label:"标题文字"},{default:x((()=>[c(_,{maxlength:"10","show-word-limit":"",modelValue:r.option.contentEdit.title,"onUpdate:modelValue":w[6]||(w[6]=e=>r.option.contentEdit.title=e),placeholder:"请输入标题文字"},null,8,["modelValue"])])),_:1}),c(n,{keyword:"background",label:"背景颜色"}),c(h,{label:"副标题文字",class:"long-slider-input"},{default:x((()=>[c(_,{maxlength:"40","show-word-limit":"",modelValue:r.option.contentEdit.subTitle,"onUpdate:modelValue":w[7]||(w[7]=e=>r.option.contentEdit.subTitle=e),placeholder:"请输入副标题文字"},null,8,["modelValue"])])),_:1}),c(n,{keyword:"subBackground",label:"背景颜色"}),c(h,{label:"联系方式名称",class:"long-slider-input-6"},{default:x((()=>[c(_,{maxlength:"5","show-word-limit":"",modelValue:r.option.contentEdit.contactName,"onUpdate:modelValue":w[8]||(w[8]=e=>r.option.contentEdit.contactName=e),placeholder:"请输入名称"},null,8,["modelValue"])])),_:1}),c(h,{label:"联系方式内容",class:"long-slider-input-6"},{default:x((()=>[c(_,{maxlength:"20","show-word-limit":"",modelValue:r.option.contentEdit.contactContent,"onUpdate:modelValue":w[9]||(w[9]=e=>r.option.contentEdit.contactContent=e),placeholder:"请输入内容"},null,8,["modelValue"])])),_:1}),c(h,{label:"按钮文字"},{default:x((()=>[c(_,{maxlength:"5","show-word-limit":"",modelValue:r.option.contentEdit.btnText,"onUpdate:modelValue":w[10]||(w[10]=e=>r.option.contentEdit.btnText=e),placeholder:"请输入内容"},null,8,["modelValue"])])),_:1}),c(n,{keyword:"text",label:"文字颜色"}),c(n,{keyword:"btn",label:"按钮颜色"})])),_:1},8,["modelValue"])])),_:1}),c(o,{title:"组件样式",onClick:w[17]||(w[17]=e=>k(' <edit-card-form title="组件样式">\n    <el-form-item label="组件背景">\n      <el-radio-group v-model="option.colorStyle.backgroundType">\n        <el-radio v-for="v in [\'透明\', \'颜色\', \'背景图片\']" :key="v" :label="v" />\n      </el-radio-group>\n    </el-form-item>\n    \x3c!-- > 背景图片 --\x3e\n    <el-form-item label="背景图片" v-if="option.colorStyle.backgroundType === \'背景图片\'">\n      <image-item v-model="option.colorStyle.image" />\n    </el-form-item>\n    \x3c!-- > 颜色 --\x3e\n    <color-group v-model="option.colorStyle.color" reset>\n      <color-input\n        keyword="background"\n        label="背景颜色"\n        v-if="option.colorStyle.backgroundType === \'颜色\'"\n      />\n      <color-input keyword="subBackground" label="标题背景" />\n      <el-form-item label="内部背景">\n        <color-input v-model="option.colorStyle.color.insideBackground" />\n      </el-form-item>\n    </color-group>\n  </edit-card-form>'))},{default:x((()=>[c(h,{label:"组件背景"},{default:x((()=>[c(v,{modelValue:r.option.colorStyle.backgroundType,"onUpdate:modelValue":w[13]||(w[13]=e=>r.option.colorStyle.backgroundType=e)},{default:x((()=>[(p(),u(s,null,b(["透明","颜色","背景图片"],(e=>c(V,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"背景图片"===r.option.colorStyle.backgroundType?(p(),u(h,{key:0,label:"背景图片"},{default:x((()=>[c(l,{modelValue:r.option.colorStyle.image,"onUpdate:modelValue":w[14]||(w[14]=e=>r.option.colorStyle.image=e)},null,8,["modelValue"])])),_:1})):y("",!0),c(t,{modelValue:r.option.colorStyle.color,"onUpdate:modelValue":w[16]||(w[16]=e=>r.option.colorStyle.color=e),reset:""},{default:x((()=>["颜色"===r.option.colorStyle.backgroundType?(p(),u(n,{key:0,keyword:"background",label:"背景颜色"})):y("",!0),c(n,{keyword:"subBackground",label:"标题背景"}),c(h,{label:"内部背景"},{default:x((()=>[c(n,{modelValue:r.option.colorStyle.color.insideBackground,"onUpdate:modelValue":w[15]||(w[15]=e=>r.option.colorStyle.color.insideBackground=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"])])),_:1}),c(o,{title:"边距设置",onClick:w[19]||(w[19]=e=>k('<edit-card-form title="边距设置">\n    <slider-group v-model="option.padding">\n      <slider-input keyword="top" label="上边距" :max="50" tips="px" />\n      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />\n      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />\n      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />\n      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />\n    </slider-group>\n  </edit-card-form>'))},{default:x((()=>[c(a,{modelValue:r.option.padding,"onUpdate:modelValue":w[18]||(w[18]=e=>r.option.padding=e)},{default:x((()=>[c(d,{keyword:"top",label:"上边距",max:50,tips:"px"}),c(d,{keyword:"bottom",label:"下边距",max:20,tips:"px"}),c(d,{keyword:"leftRight",label:"左右边距",max:20,tips:"px"}),c(d,{keyword:"topRadius",label:"上圆角",max:20,tips:"px"}),c(d,{keyword:"bottomRadius",label:"下圆角",max:20,tips:"px"})])),_:1},8,["modelValue"])])),_:1})],64)}))}});w.__scopeId="data-v-dd15da8c";export default w;