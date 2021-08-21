/* @flow */

/**
 * 在Vue上挂载静态方法，set，delete，nextTick，observable
 * 定义options属性，定义全局组件、指令和过滤器
 * 添加内置全局组件 keep-alive
 * 挂载 use，minxin，extend
 */
import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 增加静态属性 config
  Object.defineProperty(Vue, 'config', configDef)

  // util方法最好不要在外部使用
  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 增加静态方法 set、 delete、nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 增加静态方法 observable
  // 2.6 explicit observable API
  Vue.observable = (obj) => {
    observe(obj)
    return obj
  }

// 这里增加了静态属性 options 并且 options 对象里增加了全局组件位置 component 、directive和filter

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

// 保存了 Vue 构造函数到options属性的_base属性中
  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 全局组件增加了 KeepAlive 组件
  extend(Vue.options.components, builtInComponents)

  // 增加了静态方法 use (挂载插件)
  initUse(Vue)

  // 增加了静态方法 mixin (混入)
  initMixin(Vue)

  // 增加了 静态方法 extend (继承)
  initExtend(Vue)

  // 增加了 静态方法 component 、directive和filter 这里是方法，注册组件、指令、和筛选器
  initAssetRegisters(Vue)
}
