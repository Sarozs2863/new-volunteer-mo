<template>
  <div>
    <div class="BlueArea">
      <!-- 顶部按钮区域 -->
      <van-row class="d-flex jc-end">
        <van-icon name="question-o" class="m-1" size="25px" />
        <van-icon name="more-o" class="m-1" size="25px" />
      </van-row>
      <!-- 头像以及个人信息区域 -->
      <van-row class="d-flex jc-center">
        <div class="UserImage mt-1">
          <van-image
            round
            width="2.5rem"
            height="2.5rem"
            src="http://img.wxcha.com/m00/bb/18/bc2167461f0ba311a992f3f00a45c58d.jpg"
          />
        </div>
        <div class="mainCard d-flex jc-center mt-4">
          <div class="userInfo text-center mt-3">
            <h1>张一三</h1>
            <van-row class="fs-xxxs d-flex jc-center" style="line-height:20px" gutter="20">
              <van-col>计算机科学与技术学院 </van-col>
              <van-col>202013407000 </van-col>
            </van-row>
            <van-row class="mt-2">
              <van-password-input
                info="在上方输入正确的认证码，即可提交工时"
                :value="validCode"
                :mask="false"
                :gutter="10"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
              />
              <div class="d-flex jc-center">
                <van-button type="info" block class="mt-1 submitBtn">提交工时</van-button>
              </div>
              <!-- 数字键盘 -->
              <van-number-keyboard v-model="validCode" :show="showKeyboard" @blur="showKeyboard = false" />
            </van-row>
          </div>
        </div>
        <!-- 底部功能区域 -->
        <div class="funcArea">
          <van-grid :column-num="3" style="margin-top:220px">
            <van-grid-item v-for="value in functions" :key="value.id" :icon="value.icon" :text="value.text" />
          </van-grid>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
import AcCard from '../components/ActCard'
export default {
  name: 'home',
  components: {
    AcCard
  },
  data() {
    return {
      validCode: '',
      showKeyboard: true,
      functions: [
        {
          id: 1,
          icon: 'todo-list-o',
          text: '活动招募'
        },
        {
          id: 2,
          icon: 'smile-o',
          text: '信用等级'
        },
        {
          id: 3,
          icon: 'notes-o',
          text: '我参与的'
        },
        {
          id: 4,
          icon: 'warn-o',
          text: '违规举报'
        },
        {
          id: 5,
          icon: 'eye-o',
          text: '举报记录'
        },
        {
          id: 6,
          icon: 'edit',
          text: '活动策划'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.UserImage {
  position: absolute;
  z-index: 5000;
}
.mainCard {
  position: absolute;
  z-index: 4000;
  width: 90%;
  height: 250px;
  border-radius: 20px 20px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 5px rgba(255, 255, 255, 0.452);
}
.funcArea {
  margin-top: 150px;
  background-color: #fff;
  // height: 400px;
  width: 100%;
}
.van-password-input__item {
  border: solid rgb(150, 148, 148) 1px;
  border-radius: 8px;
  width: 1.1rem;
}
.submitBtn {
  border-radius: 50px;
  width: 90%;
  font-size: 0.488rem;
}
.BlueArea {
  background-color: rgb(95, 139, 233);
  width: 100%;
  height: 200px;
}
</style>
