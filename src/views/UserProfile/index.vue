<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="user.gender == 1 ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateBirthday = true"
    />

    <!-- 编辑昵称弹层 -->
    <van-popup
      v-if="isShowUpdateName"
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <updataName
        @close="isShowUpdateName = false"
        v-model="user.name"
      ></updataName>
    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑性别弹层 -->
    <van-popup
      v-model="isShowUpdateGender"
      position="bottom"
      v-if="isShowUpdateGender"
    >
      <updateGender @close="isShowUpdateGender = false" v-model="user.gender" />
    </van-popup>
    <!-- 编辑性别弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthday" position="bottom">
      <updateBirthday
        v-if="isShowUpdateBirthday"
        v-model="user.birthday"
        @close="isShowUpdateBirthday = false"
      ></updateBirthday>
    </van-popup>
    <!-- 编辑生日弹层 -->

    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isShowUpdatePhoto"
      style="height: 100%"
      position="bottom"
    >
      <updatePhoto
        v-if="isShowUpdatePhoto"
        :img="img"
        @close="isShowUpdatePhoto = false"
        @updatePhoto="user.photo = $event"
      ></updatePhoto>
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user.js'
import updataName from './components/updataName.vue'
import updateGender from './components/updateGender.vue'
import updateBirthday from './components/updateBirthday.vue'
import updatePhoto from './components/updatePhoto.vue'
// import dayjs from 'dayjs'
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthday: false,
      birthday: '',
      isShowUpdatePhoto: false,
      img: null
    }
  },
  created() {
    this.loadingUserProfile()
  },
  methods: {
    async loadingUserProfile() {
      try {
        const { data } = await getUserProfile()

        this.user = data.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    },
    onChange() {
      const file = this.$refs.file.files[0]
      // 将数据传递给img
      this.img = window.URL.createObjectURL(file)

      this.isShowUpdatePhoto = true
      // file-input 如果选择了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，将它的value情况
      this.$refs.file.value = ''
    }
  },
  components: {
    updataName,
    updateGender,
    updateBirthday,
    updatePhoto
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .page-nav-bar {
    background-color: #3296fa;
  }
  .avatar {
    width: 30px;
    height: 30px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
