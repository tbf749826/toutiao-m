<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <div slot="title" class="title.text">我的频道</div>
      <van-button
        size="mini"
        round
        type="danger"
        plain
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channelItem, index) in MyChannels"
        :key="index"
        @click="onMyChannelClick(channelItem, index)"
      >
        <van-icon
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channelItem.id)"
        />
        <span class="text" :class="{ active: active === index }">{{
          channelItem.name
        }}</span>
      </van-grid-item>
      <!-- /我的频道 -->

      <!--频道推荐 -->
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title.text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommed-grid">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/articles.js'

export default {
  name: 'ChannelEdit',
  props: {
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑的显示状态
      fiexChannels: [0] // 固定频道  推荐频道id为0
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    onAddChannel(channel) {
      this.$emit('addChannel', channel)
    },
    onMyChannelClick(channelItem, index) {
      // console.log(channelItem)
      if (this.isEdit) {
        // 编辑状态
        this.$emit('DeleteChannel', channelItem, index, this.fiexChannels)
      } else {
        // 非编辑状态
        this.$emit('UpdateActive', index, false)
      }
    }
  },
  computed: {
    recommendChannels() {
      const channels = []
      this.allChannels.forEach((channel) => {
        const ret = this.MyChannels.find((mychannels) => {
          return mychannels.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .van-cell__title {
    font-size: 16px;
    color: #333;
  }
  /deep/ .channel-item {
    height: 43px;
    .van-grid-item__text span {
      font-size: 14px;
    }
  }
  .edit-btn {
    width: 52px;
    height: 26px;
  }
  /deep/ .recommed-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon {
        font-size: 12px;
        color: #222222;
        margin-right: 3px;
      }
      .van-grid-item__text {
        margin-top: 0;
        color: #222222;
        font-size: 14px;
        // white-space: nowrap;
      }
    }
  }
  /deep/ .van-icon-clear {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 15px;
    z-index: 2;
    color: #cacaca;
  }
  /deep/ .channel-item {
    // .van-grid-item__content {
    //   white-space: nowrap;
    // }
    .active {
      color: red;
    }
  }
  /deep/.van-grid-item__content {
    .text {
      font-size: 14px;
    }
  }
}
</style>
