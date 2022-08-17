<template>
  <!-- 联想建议 -->
  <div class="suggestion-container">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('Search', text)"
    >
      <div slot="title" v-html="highlightText(text)" v-if="text"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch {
        this.$toast('获取数据失败')
      }
    },
    highlightText(text) {
      const reg = new RegExp(this.searchText, 'gi')
      const highlightStr = `<span class="active">${this.searchText}</span>`
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.suggestion-container {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>
