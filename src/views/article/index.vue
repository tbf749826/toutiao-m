<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <div slot="left" left-arrow @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <FollowUser
            :UserId="article.aut_id"
            :IsFollow="article.is_followed"
            @updateFollow="article.is_followed = $event"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <articleComment
          :list="commentList"
          :source="article.art_id"
          @OnloadSuccess="totalCount = $event.total_count"
          @pushList="OnPushList"
          :commentList="commentList"
          @replyClick="onreplyClick"
        ></articleComment>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCount" color="#777" />
          <CollectArticle
            :articleId="article.aut_id"
            v-model="article.is_collected"
          ></CollectArticle>
          <LikeArticle
            v-model="article.like_count"
            :articleId="article.art_id"
          ></LikeArticle>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom"
          ><componentPost
            :target="article.art_id"
            @PostSuccess="OnPostSuccess"
          ></componentPost
        ></van-popup>
        <!-- /评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>

      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论 -->
    <van-popup v-model="isReplyShow" style="height: 100%" position="bottom"
      ><commentReply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
        @OnPushList="OnPushList"
      ></commentReply
    ></van-popup>
    <!-- /回复评论 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/articles'
import FollowUser from '@/components/FollowUser.vue'
import articleComment from '@/views/article/components/articleComment.vue'
import CollectArticle from '@/components/CollectArticle.vue'
import LikeArticle from '@/components/LikeArticle.vue'
import componentPost from './components/componentPost.vue'
import commentReply from './components/commentReply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    articleComment,
    CollectArticle,
    LikeArticle,
    componentPost,
    commentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: false,
      errStatus: 0,
      totalCount: 0,
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // if (Math.random() < 0.4) {
        //   JSON.parse('asdfasfas')
        // }
        this.article = data.data
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }

        this.$toast('获取数据失败')
      }
      this.loading = false
    },
    OnPostSuccess(data) {
      this.isPostShow = false

      // 将conmponentPost中获取到的新的评论添加到新数组的前面
      this.commentList.unshift(data.new_obj)
    },
    OnPushList(list) {
      // 将传articleComment中的list传到父组件，然后将它push到新的数组中
      this.commentList.push(...list)
    },
    onreplyClick(comment) {
      this.currentComment = comment
      this.isReplyShow = true
      // console.log(this.currentComment)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 30px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
  /deep/ .van-nav-bar__title {
    color: #000;
    font-weight: 700;
  }
}
</style>
