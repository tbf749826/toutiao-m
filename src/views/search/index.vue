<template>
  <div class="search-container">
    <!-- 搜索栏  start-->
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        background="#3296fa"
      />
    </form>
    <!-- /搜索栏  end-->

    <!-- 搜索结果start -->
    <searchResult v-if="isResultShow" :searchText="searchText"></searchResult>
    <!-- 搜索结果 end-->

    <!-- 联想建议start -->
    <searchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @Search="onSearch"
    ></searchSuggestion>
    <!-- 联想建议 end-->

    <!-- 搜索历史记录  start -->
    <searchHistory
      v-else
      :searchHistory="searchHistory"
      @SearchItemClick="onSearchItem"
      @AllDelete="searchHistory = []"
      @search="onSearch"
    ></searchHistory>
    <!-- 搜索历史记录  end-->
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistory: getItem('TOKEN_SEARCH_HISTORY') || []
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val

      console.log(this.searchText)
      // 存储搜索历史记录
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    onSearchItem(index) {
      this.searchHistory.splice(index, 1)
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  watch: {
    searchHistory(val) {
      setItem('TOKEN_SEARCH_HISTORY', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  // .search-from {
  //   position: fixed;
  // }
  .van-search__action {
    color: #fff;
    font-size: 14px;
  }
}
</style>
