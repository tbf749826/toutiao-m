<template>
  <!-- 搜索结果 -->
  <div class="search-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchIndex',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 12,
      error: false
    }
  },
  methods: {
    async onLoad() {
      // 1、请求数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        const { results } = data.data
        // 2、将数据添加到数组列表总
        this.list.push(...results)

        // 3、将本次加载中loading关闭
        this.loading = false
        // 4、判断是否有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch {
        this.error = true
        this.loading = false
        // this.$toast('获取数据失败')
      }

      // 4、判断是否有数据
      // 4、1 如果有数据 就更新获取下一页数据页码
      // 4、2  如果没有则将finished设置为true
    }
  }
}
</script>

<style lang="less" scoped></style>
