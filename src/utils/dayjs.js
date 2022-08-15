import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置中文语言
dayjs.locale('zh-cn')

// 定义一个全局的过滤器，用于将时间过滤为相对时间
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
