<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="nav-bar">
      <van-icon
        class="back-btn"
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        center
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        center
        :rules="userRules.code"
        maxlength="6"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format=" ss s"
            v-if="isShow"
            @finish="isShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="login-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="on-submit">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      isShow: false
    }
  },
  methods: {
    async onSubmit() {
      // console.log(13)
      const user = this.user
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(user)
        this.$store.commit('SETUSER', data.data)
        this.$toast.success('登录成功')
        // console.log('登录成功', res)
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
          // console.log('手机号或验证码错误', err)
        } else {
          this.$toast.fail('登录失败，请重试')
          // console.log('登录失败，请重试', err)
        }
      }
    },
    async onSendSms() {
      // 1、获取手机号检验规则
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试', err)
        } else {
          this.$toast('发送失败', err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 20px;
}

.on-submit {
  padding: 27px 17px;
}
.van-button--info {
  background-color: #6db4fb;
}
.login-btn {
  color: #7b7b7b;
  background-color: #ededed;
  border: none;
}
.back-btn {
  color: #fff;
}
</style>
