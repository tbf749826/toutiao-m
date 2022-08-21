<template>
  <div>
    <van-button
      v-if="!IsFollow"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="OnFollow"
      >关注</van-button
    >
    <van-button v-else @click="OnFollow" class="follow-btn" round size="small"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { AddFollow, DeleteFollow } from '@/api/user'
export default {
  props: {
    UserId: {
      type: [Number, String, Object],
      required: true
    },
    IsFollow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async OnFollow() {
      try {
        if (this.IsFollow) {
          const { data } = await DeleteFollow(this.UserId)
          console.log(data)
        } else {
          const { data } = await AddFollow(this.UserId)
          console.log(data)
        }
        this.$emit('updateFollow', !this.IsFollow)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
