<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- tab标签页 -->
    <van-tabs v-model="active">
      <van-tab title="推荐">推荐</van-tab>
      <van-tab title="热门话题">热门话题</van-tab>
      <van-tab title="科技">科技</van-tab>
      <van-tab title="区块链">区块链</van-tab>
    </van-tabs>
    <!-- /tab标签页 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  .page-nav-bar {
    background-color: #3296fa;
  }

  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;

    .van-icon {
      font-size: 18px;
      color: #fff;
    }
  }

  /deep/.van-tabs__nav {
    padding: 0;
    .van-tabs__line {
      background-color: #3296fa;
      bottom: 8px;
      width: 16px;
      height: 3px;
    }

    .van-tab--active {
      color: #333;
    }

    .van-tab__text {
      font-size: 15px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
    }
  }
}
</style>
