<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @cancel="$emit('close')"
    @confirm="OnConfirm"
    @change="onChange"
  />
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  methods: {
    async OnConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })

      try {
        await updateUserName({
          gender: this.gender
        })
        this.$emit('input', this.gender)
        this.$emit('close')
        this.$toast('更新性别成功')
      } catch (err) {
        console.log(err)
        console.log(this.gender)
        this.$toast('更新性别失败')
      }
    },
    onChange(picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
