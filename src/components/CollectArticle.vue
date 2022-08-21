<template>
  <div>
    <van-icon
      color="#ffa500"
      :name="value ? 'star' : 'star-o'"
      @click="onCollect"
      :loading="loading"
    />
  </div>
</template>

<script>
import { delCollections, addCollect } from '@/api/articles'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await delCollections(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        console.log(this.value)
        this.$toast(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败。请重试')
        console.log(err)
      }
      this.loading = false
    }
  },
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style></style>
