<template>
    <div class="card main-card d-flex jc-center mt-2">
        <van-row class="mt-2">
            <van-password-input
                info="在上方输入正确的认证码，即可提交工时"
                :value="validCode"
                :mask="false"
                :gutter="10"
                length="6"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
            />
            <div class="d-flex jc-center mt-1">
                <van-button type="info" block class="mt-1 submit-btn ">提交工时</van-button>
            </div>
            <!-- 数字键盘 -->
            <van-number-keyboard v-model="validCode" :show="showKeyboard" @blur="showKeyboard = false" />
        </van-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            validCode: '',
            showKeyboard: true
        };
    }
};
</script>

<style>
.van-password-input__item {
    border: solid rgb(150, 148, 148) 1px;
    border-radius: 8px;
    width: 1.1rem;
}
.submit-btn {
    border-radius: 50px;
    width: 90%;
    font-size: 0.488rem;
}
</style>
