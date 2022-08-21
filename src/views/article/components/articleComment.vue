<template>
  <!-- 文章列表 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :loading="loading"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <componentItem
        v-for="(item, index) in commentList"
        :key="index"
        :comment="item"
        @commentLikeCount="item.is_liking = !item.is_liking"
        @DellikeCount="item.like_count--"
        @AddlikeCount="item.like_count++"
        @replyClick="$emit('replyClick', $event)"
      >
      </componentItem>
    </van-list>
  </div>
</template>

<script>
import { ArticleComment } from '@/api/articles'
import componentItem from '@/views/article/components/componentItem.vue'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    // 将父组件中的评论数据遍历渲染到页面当中
    commentList: {
      type: Array,
      // requited: []
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      limit: 10,
      offset: null
    }
  },
  methods: {
    async onLoad() {
      this.loding = true
      try {
        const { data } = await ArticleComment({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })

        console.log(this.list)
        const { results } = data.data

        this.list.push(...results)
        this.$emit('pushList', this.list)

        this.$emit('OnloadSuccess', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('操作失败')
        // console.log(err)
      }
      this.loading = false
    }
  },
  components: {
    componentItem
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
