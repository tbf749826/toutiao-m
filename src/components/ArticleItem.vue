<template>
  <!-- 文章列表页   -->
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-warp" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-img" :src="img" fit="cover" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image
      slot="default"
      fit="cover"
      v-if="article.cover.type === 1"
      class="right-cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 117px;
    height: 73px;
    padding-left: 7px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .label-info-wrap span {
    font-size: 12px;
    color: #b4b4b4;
    margin-right: 12px;
  }
  .cover-warp {
    display: flex;
    padding: 18px 0 14px;
    .cover-item {
      flex: 1;
      height: 73px;
      margin-right: 2px;
      &:not(:last-child) {
        padding-right: 2px;
      }

      .cover-img {
        height: 73px;
        width: 100%;
      }
    }
  }
}
</style>
