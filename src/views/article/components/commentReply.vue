<template>
  <!-- 回复评论 -->
  <div class="comment-reply">
    <!-- 回复评论头部 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /回复评论 -->
    <div class="scroll-warp">
      <!-- 当前评论 -->
      <componentItem :comment="comment"></componentItem>
      <!-- /当前评论 -->

      <!-- 回复的评论列表 -->
      <van-cell title="全部回复" />
      <articleComment
        :source="comment.com_id"
        type="c"
        :commentList="list"
      ></articleComment>
      <!-- /回复的评论列表 -->
    </div>
    <!-- 发布回复评论 -->
    <div class="post-warp">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- / 发布回复评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <componentPost
        :target="comment.com_id"
        @PostSuccess="OnpostSuccess"
      ></componentPost>
    </van-popup>
  </div>
</template>

<script>
import componentItem from './componentItem.vue'
import articleComment from './articleComment.vue'
import componentPost from './componentPost.vue'

export default {
  name: 'CommentReqly',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    componentItem,
    articleComment,
    componentPost
  },
  data() {
    return {
      isPostShow: false,
      list: []
    }
  },

  methods: {
    OnpostSuccess(data) {
      this.isPostShow = false
      console.log(data.new_obj)
      this.list.unshift(data.new_obj)

      console.log(this.list)
      this.$emit('OnPushList', this.list)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-warp {
  position: fixed;
  top: 46px;
  right: 0;
  left: 0;
  bottom: 45px;
  overflow-y: auto;
}
.post-warp {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .post-btn {
    width: 60%;
  }
}
</style>
