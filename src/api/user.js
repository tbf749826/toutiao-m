// 引入request封装的axios基础路径
import request from '@/utils/request.js'
// import store from '@/store'

/**
 * 登录接口
 * @param {Object} data是一个对象，对象中包含了mobile和code
 * @return {Object} 返回值是一个promise对象
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

/**
 *验证码
 * @param {object} mobile是需要验证的手机号
 * @returns 返回值是一个promise对象
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 封装获取用户自己信息的接口
/**
 * @param
 * @returns
 */

export const GetUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 获取用户频道列表
export const GetUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 设置用户的频道（部分覆盖）

export const AddUserChannels = (channels) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

//
export const DelUserChannels = (channels) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channels}`
  })
}

// 关注用户
export const AddFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const DeleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

// 获取用户个人信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const updateUserName = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 更新用户头像
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
