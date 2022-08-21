<template>
  <!-- 生日 -->
  <div class="updateBirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="OnConfirm"
    />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),

      currentDate: new Date(this.value)
    }
  },
  methods: {
    async OnConfirm() {
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(currentDate)
        await updateUserName({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast('更新生日成功')
      } catch (err) {
        console.log(err)
        console.log(this.currentDate)
        this.$toast('更新生日失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
