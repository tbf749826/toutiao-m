<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="Onlike"
  />
</template>

<script>
import { delLike, addLike } from '@/api/articles'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async Onlike() {
      try {
        let status = 0
        if (this.value === 1) {
          // 取消点赞
          await delLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast(this.value === 0 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
