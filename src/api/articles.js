// 获取文章新闻推荐

/**
 * @param {object} 接收的参数是频道id和时间戳
 * return {object} 返回值是promise对象
 */
import request from '@/utils/request'

export const userArticle = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
