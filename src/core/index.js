/**
 * 002
 * 此文件定义了Vue的静态属性和ssr相关
 */
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 定义Vue静态方法
// set、 delete、nextTick、observable
// 里增加了静态属性 options 并且 options 对象里增加了全局组件位置 component 、directive和filter
// 全局组件增加了 KeepAlive 组件
// 增加了静态方法 use (挂载插件)
// 增加了静态方法 mixin (混入)
// 增加了 静态方法 extend (继承)
// 增加了 静态方法 component 、directive和filter 这里是方法，注册组件、指令、和筛选器
initGlobalAPI(Vue)

// ssr相关
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
