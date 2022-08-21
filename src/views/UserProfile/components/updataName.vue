<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="OnConfirm"
    />
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <div class="field-warp">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async OnConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      const localName = this.localName
      if (!localName.length) {
        this.$toast('昵称不能为空')
        return
      }
      try {
        await updateUserName({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast('更新昵称成功')
      } catch (err) {
        console.log(err)
        this.$toast('更新昵称失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-warp {
  padding: 10px;
}
</style>
