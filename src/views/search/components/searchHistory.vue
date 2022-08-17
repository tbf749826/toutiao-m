<template>
  <!-- 搜索历史记录 -->
  <div class="history-container">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span class="Alldel" @click="AlldelItem">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="SearchItemClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    SearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.$emit('SearchItemClick', index)
      } else {
        // 非删除状态
        console.log(123)
        this.$emit('search', item)
      }
    },
    AlldelItem() {
      this.$emit('AllDelete')
    }
  }
}
</script>

<style lang="less" scoped>
.history-container {
  .Alldel {
    margin-right: 5px;
  }
}
</style>
