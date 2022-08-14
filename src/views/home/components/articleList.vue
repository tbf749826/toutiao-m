<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { userArticle } from '@/api/articles.js'
import articleItem from '@/components/ArticleItem.vue'

export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表中的数据
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态v
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 控制列表加载失败的
      isLoading: false, // 控制下拉刷新的状态
      refreshText: '刷新成功' // 下拉刷新成功或者失败的提示信息
    }
  },
  methods: {
    async onLoad() {
      // 1、请求获取数据
      try {
        const { data } = await userArticle({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        const { results } = data.data // 将data中的results数组解构
        // 2、把请求结果数据放在list数组中  results是一个数组，运用...展开运算符将results数组展开后追加到list中
        this.list.push(...results)
        // 测试获取数据失败的提示信息
        // if (Math.random() > 0.9) {
        //   JSON.parse('asdfasdfsad')
        // }
        // 3、将loading 改为false  loading为false 才能触发下一次的加载
        this.loading = false
        // 4、判断数据是否全部加载完成  如果没有数据了将jinished设置为true ，之后不会再触发加载更多
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    // 下拉刷新的处理函数
    async onRefresh() {
      try {
        const { data } = await userArticle({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        // 测试下拉刷新失败的提示信息
        // if (Math.random() > 0.9) {
        //   JSON.parse('asdfasdfsad')
        // }
        this.isLoading = false
        this.refreshText = `刷新成功，更新了${results.length}的数据`
      } catch {
        this.isLoading = false
        this.refreshText = '刷新失败'
      }
    }
  },
  components: {
    articleItem
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
