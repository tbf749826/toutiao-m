<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- tab标签页 -->
    <van-tabs v-model="active" class="active-item van-tabs__wrap--scrollable">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 子组件 -->
        <articleList slot="default" :channel="item"></articleList>
        <!-- /子组件 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /tab标签页 -->

    <!-- 频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :MyChannels="channels"
        :active="active"
        @addChannel="OnAddChannel"
        @UpdateActive="OnUpdateActive"
        @DeleteChannel="OnDeleteChannel"
      ></ChannelEdit>
    </van-popup>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import {
  GetUserChannels,
  AddUserChannels,
  DelUserChannels
} from '@/api/user.js'
import articleList from './components/articleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [],
      isEditChannelShow: false // 弹出层的状态
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        let channles = []
        const localChannels = getItem('TOUTIAO_CHANNELS')
        if (this.user || !localChannels) {
          // 登录 或者 本地没有存储 获取后端数据
          const { data } = await GetUserChannels()
          this.channels = data.data.channels
          return false
        } else {
          // 未登录并且本地没有数据
          channles = localChannels
        }
        this.channels = channles
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    async OnAddChannel(channel) {
      this.channels.push(channel)
      if (this.user) {
        try {
          await AddUserChannels({
            id: channel.id,
            seq: this.channels.length
          })
        } catch {
          this.$toast('保存失败,请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    OnUpdateActive(index, isEditChannelShow) {
      this.active = index
      // 关闭频道弹层
      this.isEditChannelShow = isEditChannelShow
    },
    OnDeleteChannel(channelItem, index, fiexChannels) {
      if (fiexChannels.includes(channelItem.id)) return
      if (index <= this.active) {
        this.OnUpdateActive(this.active - 1, true)
      }
      this.channels.splice(index, 1)

      this.DelChannels(channelItem)
    },
    async DelChannels(channelItem) {
      try {
        if (this.user) {
          // 已登录
          await DelUserChannels(channelItem.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.channels)
        }
      } catch {
        this.$toast('操作失败')
      }
    }
  },
  components: {
    articleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-bottom: 50px;
  padding-top: 91px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar {
    background-color: #3296fa;
  }
  .search-btn {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
      color: #fff;
    }
  }
  /deep/ .active-item {
    .van-tabs_content {
      min-height: 79vh;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 100px;
      height: 40px;
      .van-tab__text {
        font-size: 15px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 16px !important;
      height: 3px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 4px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }

  .placeholder {
    flex-shrink: 0;
    width: 33px;
    height: 41px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 41px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 16px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  /deep/ .active-item .van-tabs__wrap {
    position: fixed;
    top: 46px;
    z-index: 2;
    width: 100%;
  }

  // 频道编辑
  .edit-channel-popup {
    padding-top: 43px;
    box-sizing: border-box;
  }
}
</style>
