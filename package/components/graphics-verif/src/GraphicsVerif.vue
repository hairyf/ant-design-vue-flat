<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 16:32:30
 * @LastEditTime: 2021-07-15 16:17:44
 * @Description: 图片模块验证 来自https://github.com/javaLuo/vue-puzzle-vcode
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 本体部分 -->
  <div
    ref="vuePuzzleVcode"
    :class="['vue-puzzle-vcode', { show_: show }]"
    @mousedown="onCloseMouseDown"
    @mouseup="onCloseMouseUp"
    @touchstart="onCloseMouseDown"
    @touchend="onCloseMouseUp"
  >
    <div class="vue-auth-box_" @mousedown.stop @touchstart.stop>
      <div class="auth-body_" :style="`height: ${canvasHeight}px`">
        <!-- 主图，有缺口 -->
        <canvas
          ref="canvas1"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`
          }"
        />
        <!-- 成功后显示的完整图 -->
        <canvas
          ref="canvas3"
          :class="['auth-canvas3_', { show: isSuccess }]"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        />
        <!-- 小图 -->
        <canvas
          :width="puzzleBaseSize"
          class="auth-canvas2_"
          :height="canvasHeight"
          ref="canvas2"
          :style="`width:${puzzleBaseSize}px;height:${canvasHeight}px;transform:translateX(${
            styleWidth -
            sliderBaseSize -
            (puzzleBaseSize - sliderBaseSize) *
              ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))
          }px)`"
        />
        <div :class="['loading-box_', { hide_: !loading }]">
          <div class="loading-gif_">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div :class="['info-box_', { show: infoBoxShow }, { fail: infoBoxFail }]">{{
          infoText
        }}</div>
        <div
          :class="['flash_', { show: isSuccess }]"
          :style="`transform: translateX(${
            isSuccess ? `${canvasWidth + canvasHeight * 0.578}px` : `-${canvasHeight * 0.578}px`
          }) skew(-30deg, 0);`"
        ></div>
      </div>
      <div class="auth-control_">
        <div class="range-box" :style="`height:${sliderBaseSize}px`">
          <div class="range-text">{{ sliderText }}</div>
          <div class="range-slider" ref="rangeSlider" :style="`width:${styleWidth * 0.94}px`">
            <div
              :class="['range-btn', { isDown: mouseDown }]"
              :style="`width:${sliderBaseSize}px`"
              @mousedown="onRangeMouseDown($event)"
              @touchstart="onRangeMouseDown($event)"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalGraphicsVerif' })
</script>
<script lang="ts" setup>
  import { debounce } from 'lodash-es'
  import {
    ref,
    reactive,
    onMounted,
    onUnmounted,
    computed,
    watch,
    toRefs,
    defineProps,
    defineEmits,
    useContext
  } from 'vue'
  import { useWindowSize } from '@vueuse/core'
  const context = useContext()
  const props = defineProps({
    // canvasWidth: { type: Number, default: 310 }, // 主canvas的宽
    // canvasHeight: { type: Number, default: 160 }, // 主canvas的高
    proportion: { type: Number, default: 0.6 / 1 }, // 长宽比  高除以宽
    show: { type: Boolean, default: true }, // 是否出现，由父级控制
    puzzleScale: { type: Number, default: 1 }, // 拼图块的大小缩放比例
    sliderSize: { type: Number, default: 50 }, // 滑块的大小
    range: { type: Number, default: 10 }, // 允许的偏差值
    imgs: {
      // 所有的背景图片
      type: Array
    },
    successText: {
      type: String,
      default: '验证通过！'
    },
    failText: {
      type: String,
      default: '验证失败，请重试'
    },
    sliderText: {
      type: String,
      default: '拖动滑块完成拼图'
    }
  })
  // props: {

  // },
  // setup(props, context) {
  const vuePuzzleVcode = ref<HTMLDivElement>()
  const rangeSlider = ref<HTMLDivElement>()
  const canvas1 = ref(null)
  const canvas2 = ref(null)
  const canvas3 = ref(null)
  const showImageVerif = ref(true)

  // 自动宽度
  const canvasWidth = ref(460)
  onMounted(() => {
    // 自动宽度赋值
    canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460
  })
  // 比例高度
  const canvasHeight = computed(() => canvasWidth.value * props.proportion)
  // 块大小
  const puzzleScale = computed(() => canvasWidth.value / 460)
  //防抖器
  const onlyDebounce = debounce(() => {
    // 自动宽度赋值
    canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460
    // 自动宽度刷新
    reset()
  }, 200)
  const { width } = useWindowSize()
  watch(width, onlyDebounce)

  const state = reactive({
    mouseDown: false, // 鼠标是否在按钮上按下
    startWidth: 50, // 鼠标点下去时父级的width
    startX: 0, // 鼠标按下时的X
    newX: 0, // 鼠标当前的偏移X
    pinX: 0, // 拼图的起始X
    pinY: 0, // 拼图的起始Y
    loading: true, // 是否正在加在中，主要是等图片onload
    isCanSlide: false, // 是否可以拉动滑动条
    error: false, // 图片加在失败会出现这个，提示用户手动刷新
    infoBoxShow: false, // 提示信息是否出现
    infoText: '', // 提示等信息
    infoBoxFail: false, // 是否验证失败
    timer1: 0, // setTimout1
    closeDown: false, // 为了解决Mac上的click BUG
    isSuccess: false, // 验证成功
    imgIndex: -1 // 用于自定义图片时不会随机到重复的图片
  })

  onMounted(() => {
    document.addEventListener('mousemove', onRangeMouseMove, false)
    document.addEventListener('mouseup', onRangeMouseUp, false)

    document.addEventListener('touchmove', onRangeMouseMove, {
      passive: false
    })
    document.addEventListener('touchend', onRangeMouseUp, false)
    if (props.show) {
      document.body.classList.add('vue-puzzle-overflow')
    }
    reset()
  })

  onUnmounted(() => {
    clearTimeout(state.timer1)
    document.removeEventListener('mousemove', onRangeMouseMove, false)
    document.removeEventListener('mouseup', onRangeMouseUp, false)

    document.removeEventListener('touchmove', onRangeMouseMove, {
      passive: false
    } as any)
    document.removeEventListener('touchend', onRangeMouseUp, false)
  })

  // 每次出现都应该重新初始化
  watch(
    () => props.show,
    (newV) => {
      if (newV) {
        document.body.classList.add('vue-puzzle-overflow')
        reset()
      } else {
        document.body.classList.remove('vue-puzzle-overflow')
      }
    }
  )

  // styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
  const styleWidth = computed(() => {
    const w = state.startWidth + state.newX - state.startX
    return w < sliderBaseSize.value
      ? sliderBaseSize.value
      : w > canvasWidth.value
      ? canvasWidth.value
      : w
  })

  // 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
  const puzzleBaseSize = computed(() => {
    return Math.round(Math.max(Math.min(puzzleScale.value, 2), 0.2) * 52.5 + 6)
  })

  // 处理一下sliderSize，弄成整数，以免计算有偏差
  const sliderBaseSize = computed(() => {
    return Math.max(Math.min(Math.round(props.sliderSize), Math.round(canvasWidth.value * 0.5)), 10)
  })

  // 私有-关闭
  const onC = () => {
    if (!state.mouseDown) {
      clearTimeout(state.timer1)
      context.emit('close')
    }
  }

  const onCloseMouseDown = () => {
    state.closeDown = true
  }

  const onCloseMouseUp = () => {
    if (state.closeDown) {
      onC()
    }
    state.closeDown = false
  }

  // 鼠标按下准备拖动
  const onRangeMouseDown = (e: any) => {
    if (state.isCanSlide) {
      state.mouseDown = true
      state.startWidth = rangeSlider?.value?.clientWidth || 0
      state.newX = e.clientX || e.changedTouches[0].clientX
      state.startX = e.clientX || e.changedTouches[0].clientX
    }
  }

  // 鼠标移动
  const onRangeMouseMove = (e: any) => {
    if (state.mouseDown) {
      e.preventDefault()
      state.newX = e.clientX || e.changedTouches[0].clientX
    }
  }

  // 鼠标抬起
  const onRangeMouseUp = () => {
    if (state.mouseDown) {
      state.mouseDown = false
      submit()
    }
  }

  /**
   * 私有-开始进行
   * @param withCanvas 是否强制使用canvas随机作图
   */
  const init = (withCanvas?: boolean) => {
    state.loading = true
    state.isCanSlide = false
    const c: any = canvas1.value
    const c2: any = canvas2.value
    const c3: any = canvas3.value
    const ctx = c.getContext('2d')
    const ctx2 = c2.getContext('2d')
    const ctx3 = c3.getContext('2d')
    const img = document.createElement('img')
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    ctx2.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    // 取一个随机坐标，作为拼图块的位置
    state.pinX = getRandom(puzzleBaseSize.value + 20, canvasWidth.value - puzzleBaseSize.value - 10) // 留10的边距
    state.pinY = getRandom(20, canvasHeight.value - puzzleBaseSize.value - 10) // 主图高度 - 拼图块自身高度 - 10边距
    img.crossOrigin = 'anonymous' // 匿名，想要获取跨域的图片
    img.onload = () => {
      const [x, y, w, h] = makeImgSize(img)
      ctx.save()
      // 先画小图
      paintBrick(ctx)
      ctx.closePath()
      if (
        !(
          navigator.userAgent.indexOf('Firefox') >= 0 && navigator.userAgent.indexOf('Windows') >= 0
        )
      ) {
        // 非火狐，在此画外阴影
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowColor = '#000'
        ctx.shadowBlur = 3
        ctx.fill()
      }

      ctx.clip() // 按照外阴影区域切割

      ctx.save()
      // 小图外阴影
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 2
      ctx.fill()
      ctx.restore()
      ctx.drawImage(img, x, y, w, h)
      ctx3.drawImage(img, x, y, w, h)

      // 设置小图的内阴影
      ctx.globalCompositeOperation = 'source-atop'

      paintBrick(ctx)

      ctx.arc(
        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
        puzzleBaseSize.value * 1.2,
        0,
        Math.PI * 2,
        true
      )
      ctx.closePath()
      ctx.shadowColor = 'rgba(255, 255, 255, .8)'
      ctx.shadowOffsetX = -1
      ctx.shadowOffsetY = -1
      ctx.shadowBlur = Math.min(Math.ceil(8 * puzzleScale.value), 12)
      ctx.fillStyle = '#ffffaa'
      ctx.fill()
      // 将小图赋值给ctx2
      const imgData = ctx.getImageData(
        state.pinX - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
        state.pinY - 20,
        state.pinX + puzzleBaseSize.value + 5,
        state.pinY + puzzleBaseSize.value + 5
      )
      ctx2.putImageData(imgData, 0, state.pinY - 20)

      // 清理
      ctx.restore()
      ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

      // 画缺口
      ctx.save()
      paintBrick(ctx)
      ctx.globalAlpha = 0.8
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()
      // 画缺口的内阴影
      ctx.save()
      ctx.globalCompositeOperation = 'source-atop'
      paintBrick(ctx)
      ctx.arc(
        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
        puzzleBaseSize.value * 1.2,
        0,
        Math.PI * 2,
        true
      )
      ctx.shadowColor = '#000'
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.shadowBlur = 16
      ctx.fill()
      ctx.restore()

      // 画整体背景图
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      ctx.drawImage(img, x, y, w, h)
      ctx.restore()
      state.loading = false
      state.isCanSlide = true
    }
    img.onerror = () => {
      init(true) // 如果图片加载错误就重新来，并强制用canvas随机作图
    }

    if (!withCanvas && props.imgs && props.imgs.length) {
      let randomNum = getRandom(0, props.imgs.length - 1)
      if (randomNum === state.imgIndex) {
        if (randomNum === props.imgs.length - 1) {
          randomNum = 0
        } else {
          randomNum++
        }
      }
      state.imgIndex = randomNum
      img.src = props.imgs[randomNum] as any
    } else {
      img.src = makeImgWithCanvas() as any
    }
  }

  // 工具 - 范围随机数
  const getRandom = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min)
  }

  // 工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h
  const makeImgSize = (img: any) => {
    const imgScale = img.width / img.height
    const canvasScale = canvasWidth.value / canvasHeight.value
    let x = 0,
      y = 0,
      w = 0,
      h = 0
    if (imgScale > canvasScale) {
      h = canvasHeight.value
      w = imgScale * h
      y = 0
      x = (canvasWidth.value - w) / 2
    } else {
      w = canvasWidth.value
      h = w / imgScale
      x = 0
      y = (canvasHeight.value - h) / 2
    }
    return [x, y, w, h]
  }

  // 私有-绘制拼图块的路径
  const paintBrick = (ctx: any) => {
    const moveL = Math.ceil(15 * puzzleScale.value) // 直线移动的基础距离
    ctx.beginPath()
    ctx.moveTo(state.pinX, state.pinY)
    ctx.lineTo(state.pinX + moveL, state.pinY)
    ctx.arcTo(
      state.pinX + moveL,
      state.pinY - moveL / 2,
      state.pinX + moveL + moveL / 2,
      state.pinY - moveL / 2,
      moveL / 2
    )
    ctx.arcTo(
      state.pinX + moveL + moveL,
      state.pinY - moveL / 2,
      state.pinX + moveL + moveL,
      state.pinY,
      moveL / 2
    )
    ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY)
    ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL)
    ctx.arcTo(
      state.pinX + moveL + moveL + moveL + moveL / 2,
      state.pinY + moveL,
      state.pinX + moveL + moveL + moveL + moveL / 2,
      state.pinY + moveL + moveL / 2,
      moveL / 2
    )
    ctx.arcTo(
      state.pinX + moveL + moveL + moveL + moveL / 2,
      state.pinY + moveL + moveL,
      state.pinX + moveL + moveL + moveL,
      state.pinY + moveL + moveL,
      moveL / 2
    )
    ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL + moveL + moveL)
    ctx.lineTo(state.pinX, state.pinY + moveL + moveL + moveL)
    ctx.lineTo(state.pinX, state.pinY + moveL + moveL)

    ctx.arcTo(
      state.pinX + moveL / 2,
      state.pinY + moveL + moveL,
      state.pinX + moveL / 2,
      state.pinY + moveL + moveL / 2,
      moveL / 2
    )
    ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL, state.pinX, state.pinY + moveL, moveL / 2)
    ctx.lineTo(state.pinX, state.pinY)
  }

  // 私有-用canvas随机生成图片
  const makeImgWithCanvas = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
    ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
    ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
    // 随机画10个图形
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
      ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`

      if (getRandom(0, 2) > 1) {
        // 矩形
        ctx.save()
        ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
        ctx.fillRect(
          getRandom(-20, canvas.width - 20),
          getRandom(-20, canvas.height - 20),
          getRandom(10, canvas.width / 2 + 10),
          getRandom(10, canvas.height / 2 + 10)
        )
        ctx.restore()
      } else {
        // 圆
        ctx.beginPath()
        const ran = getRandom(-Math.PI, Math.PI)
        ctx.arc(
          getRandom(0, canvas.width),
          getRandom(0, canvas.height),
          getRandom(10, canvas.height / 2 + 10),
          ran,
          ran + Math.PI * 1.5
        )
        ctx.closePath()
        ctx.fill()
      }
    }
    return canvas.toDataURL('image/png')
  }

  // 私有-开始判定
  const submit = () => {
    // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
    // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
    const x = Math.abs(
      state.pinX -
        (styleWidth.value - sliderBaseSize.value) +
        (puzzleBaseSize.value - sliderBaseSize.value) *
          ((styleWidth.value - sliderBaseSize.value) / (canvasWidth.value - sliderBaseSize.value)) -
        3
    )
    if (x < props.range) {
      // 成功
      state.infoText = props.successText
      state.infoBoxFail = false
      state.infoBoxShow = true
      state.isCanSlide = false
      state.isSuccess = true
      // 成功后准备关闭
      clearTimeout(state.timer1)
      state.timer1 = setTimeout(() => {
        // 成功的回调
        context.emit('success', x)
      }, 800) as any
    } else {
      // 失败
      state.infoText = props.failText
      state.infoBoxFail = true
      state.infoBoxShow = true
      state.isCanSlide = false
      context.emit('fail', x)
      // 800ms后重置
      clearTimeout(state.timer1)
      state.timer1 = setTimeout(() => {
        reset()
      }, 800) as any
    }
  }

  // 重置
  const reset = () => {
    state.infoBoxFail = false
    state.infoBoxShow = false
    state.isCanSlide = true
    state.isSuccess = false
    state.startWidth = sliderBaseSize.value // 鼠标点下去时父级的width
    state.startX = 0 // 鼠标按下时的X
    state.newX = 0 // 鼠标当前的偏移X
    init()
  }
  const {
    mouseDown,
    startWidth,
    startX,
    newX,
    pinX,
    pinY,
    loading,
    isCanSlide,
    error,
    infoBoxShow,
    infoText,
    infoBoxFail,
    timer1,
    closeDown,
    isSuccess,
    imgIndex
  } = toRefs(state)

  // return {
  //   vuePuzzleVcode,
  //   rangeSlider,
  //   canvas1,
  //   canvas2,
  //   canvas3,
  //   styleWidth,
  //   puzzleBaseSize,
  //   sliderBaseSize,
  //   onCloseMouseDown,
  //   onCloseMouseUp,
  //   onRangeMouseDown,
  //   onRangeMouseMove,
  //   canvasWidth,
  //   canvasHeight,
  //   showImageVerif,
  //   reset,
  //   ...toRefs(state)
  // }
  // }
  // })
</script>

<style lang="less">
  .vue-puzzle-vcode {
    pointer-events: none;
    transition: opacity 200ms;
    &.show_ {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .vue-auth-box_ {
    background: #fff;
    user-select: none;
    border-radius: 3px;
    .auth-body_ {
      position: relative;
      overflow: hidden;
      border-radius: 3px;
      .loading-box_ {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 20;
        opacity: 1;
        transition: opacity 200ms;
        display: flex;
        align-items: center;
        justify-content: center;
        &.hide_ {
          opacity: 0;
          pointer-events: none;
          .loading-gif_ {
            span {
              animation-play-state: paused;
            }
          }
        }
        .loading-gif_ {
          flex: none;
          height: 5px;
          line-height: 0;
          @keyframes load {
            0% {
              opacity: 1;
              transform: scale(1.3);
            }
            100% {
              opacity: 0.2;
              transform: scale(0.3);
            }
          }
          span {
            display: inline-block;
            width: 5px;
            height: 100%;
            margin-left: 2px;
            border-radius: 50%;
            background-color: #888;
            animation: load 1.04s ease infinite;
            &:nth-child(1) {
              margin-left: 0;
            }
            &:nth-child(2) {
              animation-delay: 0.13s;
            }
            &:nth-child(3) {
              animation-delay: 0.26s;
            }
            &:nth-child(4) {
              animation-delay: 0.39s;
            }
            &:nth-child(5) {
              animation-delay: 0.52s;
            }
          }
        }
      }
      .info-box_ {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 24px;
        line-height: 24px;
        text-align: center;
        overflow: hidden;
        font-size: 13px;
        background-color: #83ce3f;
        opacity: 0;
        transform: translateY(24px);
        transition: all 200ms;
        color: #fff;
        z-index: 10;
        &.show {
          opacity: 0.95;
          transform: translateY(0);
        }
        &.fail {
          background-color: #ce594b;
        }
      }
      .auth-canvas2_ {
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        height: 100%;
        z-index: 2;
      }
      .auth-canvas3_ {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 600ms;
        z-index: 3;
        &.show {
          opacity: 1;
        }
      }
      .flash_ {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        z-index: 3;
        &.show {
          transition: transform 600ms;
        }
      }
      .reset_ {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 35px;
        height: auto;
        z-index: 12;
        cursor: pointer;
        transition: transform 200ms;
        transform: rotate(0deg);
        &:hover {
          transform: rotate(-90deg);
        }
      }
    }
    .auth-control_ {
      .range-box {
        position: relative;
        width: 100%;
        background-color: #d9d9d9;
        margin-top: 20px;
        border-radius: 64px;
        .range-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: #b7bcd1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          width: 100%;
        }
        .range-slider {
          position: absolute;
          height: 100%;
          width: 50px;
          border-radius: 3px;
          .range-btn {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: -30px;
            top: -25%;
            width: 60px !important;
            height: calc(100% + 10px);
            border-radius: 9999px;
            background-color: #558bf7;
            box-shadow: 0 0 4px #ccc;
            cursor: pointer;
            & > div {
              width: 0;
              height: 40%;

              transition: all 200ms;
              &:nth-child(2) {
                margin: 0 5px;
              }
              border: solid 1px #fff;
            }
            /* &:hover,
            &.isDown {
              & > div:first-child {
                border: solid 4px transparent;
                height: 0;
                border-right-color: #6aa0ff;
              }
              & > div:nth-child(2) {
                border-width: 3px;
                height: 0;
                border-radius: 3px;
                margin: 0 6px;
                border-right-color: #6aa0ff;
              }
              & > div:nth-child(3) {
                border: solid 4px transparent;
                height: 0;
                border-left-color: #6aa0ff;
              }
            } */
          }
        }
      }
    }
  }
  .vue-puzzle-overflow {
    overflow: hidden !important;
  }
</style>
