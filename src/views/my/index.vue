<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="user-info header" v-if="user">
      <!-- 基本信息 -->
      <div class="base">
        <!-- 左侧 -->
        <div class="left">
          <van-image class="avatar" fit="cover" :src="userInfo.photo" round />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <van-button type="default" round size="mini"> 编辑资料</van-button>
        </div>
      </div>
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
      <!-- /基本信息 -->
    </div>
    <!-- /已登录 -->

    <!-- 未登录 -->
    <div class="header" @click="$router.push('/login')" v-else>
      <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
      <span class="login-text">登录/注册</span>
      <!-- /未登录 -->
    </div>
    <!-- /未登录 -->

    <!-- Grid 宫格部分 -->
    <van-grid :column-num="2" class="nav-grid" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont icon-iconfontlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /Grid 宫格部分 -->

    <!-- cell单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell class="outBtn" title="退出登录" v-if="user" @click="outBtn" />
    <!-- /cell单元格 -->
  </div>
</template>

<script>
import { GetUserInfo } from '@/api/user'

import { mapState } from 'vuex'

export default {
  name: 'myIndex',
  computed: mapState({
    user: 'user'
  }),
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    if (this.user) {
      this.loadUser()
      console.log(this.loadUser())
    }
  },
  methods: {
    outBtn() {
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          this.$store.commit('SETUSER', null)
        })
        .catch(() => {
          console.log('错误之后执行这里')
        })
    },
    async loadUser() {
      try {
        const { data } = await GetUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    width: 375px;
    height: 181px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 66px;
      height: 66px;
    }
    .login-text {
      color: #fff;
      margin-top: 8px;
    }
  }
  .user-info {
    .base {
      width: 100%;
      padding: 30px 16px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        height: 115px;
        display: flex;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66px;
          border: 2px solid #fff;
          margin-right: 12px;
        }
        .text {
          color: #fff;
          font-size: 15px;
        }
      }
    }
  }
  .data {
    width: 100%;
    display: flex;
    justify-content: space-around;
    // flex-direction: column;
    align-items: center;
    .data-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      margin-bottom: 16px;
    }
  }
  // Grid宫格样式
  .nav-grid {
    margin-bottom: 5px;
    .iconfont {
      font-size: 28px;
    }
    .icon-shoucang {
      color: #ec5b5c;
    }
    .icon-iconfontlishi {
      color: #ffa025;
    }
    .text {
      font-size: 14px;
    }
  }
  // cell单元格样式
  .outBtn {
    margin-top: 5px;
    text-align: center;
    color: #d86262;
    font-size: 15px;
  }
}
</style>
