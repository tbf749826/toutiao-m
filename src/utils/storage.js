// 优化封装本地存储模块

// 获取本地存储中的token
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  // 如果取出token 成功 则之间反序列化
  try {
    return JSON.parse(data)
  } catch (err) {
    // 如果报错，则将token值直接返回
    return data
  }
}

// 将token 存储到本地存储当中
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }
}

// 删除本地存储中的token

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
