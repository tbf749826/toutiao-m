<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commitLoading"
        @click="Onlike"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('replyClick', comment)"
        >
          {{ comment.reply_count > 0 ? comment.reply_count : '回复' }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commitLoading: false,
      likeCount: 0
    }
  },
  methods: {
    async Onlike() {
      this.commitLoading = true
      try {
        if (this.comment.is_liking) {
          await delLike(this.comment.com_id)

          this.likeCount = this.comment.like_count
          this.likeCount++
          this.$emit('commentLikeCount')
          this.$emit('DellikeCount')
        } else {
          addLike(this.comment.com_id)
          this.$emit('commentLikeCount')
          this.likeCount = this.comment.like_count
          this.$emit('AddlikeCount')

          this.likeCount--
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败')
      }
      this.commitLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 12px;
    color: #222;
    margin-right: 12px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 12px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
  }
}
</style>
