import DropDown from './materials/Dropdown.vue'
import Badge from './materials/Badge.vue'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('drop-down', DropDown)
    Vue.component('Badge', Badge)
  }
}

export default GlobalComponents
