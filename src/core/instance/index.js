/**
 * 此模块定义Vue的原型方法
 * init、state、事件和生命周期
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 设置原型的 _init
initMixin(Vue)
// 设置原型的 $set $del $wather
stateMixin(Vue)
// 设置原型的 $on $once $emit
eventsMixin(Vue)
// 设置原型的_update $forceUpdate $destroy
lifecycleMixin(Vue)
// 设置原型 $nextTick _o _n _c 等
renderMixin(Vue)

export default Vue
