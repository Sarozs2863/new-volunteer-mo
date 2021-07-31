<template>
    <div>
        <div class="blue-area">
            <!-- 顶部按钮区域 -->
            <van-row class="d-flex jc-end">
                <van-icon name="question-o" class="m-1" size="25px" />
                <van-icon name="more-o" class="m-1" size="25px" />
            </van-row>
            <!-- 头像以及个人信息区域 -->
            <div class="mt-2">
                <van-row class="d-flex jc-center ">
                    <van-image round width="2.5rem" height="2.5rem" :src="require('../assets/img/head.png')" />
                </van-row>
                <van-row type="flex" justify="center">
                    <span class="user-name fs-xxs">张一三</span>
                    <div class="user-statu">
                        <van-tag type="success" size="large ">{{ creditRating }}</van-tag>
                    </div>
                </van-row>
                <van-row class="fs-xxxs d-flex jc-center" style="line-height:20px" gutter="20">
                    <van-col>计算机科学与技术学院 </van-col>
                    <van-col>202013407000 </van-col>
                </van-row>
            </div>
        </div>

        <AcCard></AcCard>
        <!-- 底部功能区域 -->
        <div class="func-area">
            <van-grid :column-num="3" clickable>
                <van-grid-item v-for="value in functions" :key="value.id" :icon="value.icon" :text="value.text" />
            </van-grid>
        </div>

        <!-- 活动列表卡片 -->
        <div class="act_list_card">
            <van-row class="nav" type="flex" justify="space-between">
                <van-col class="left">
                    <van-col>
                        <van-icon class="icon_list" name="todo-list-o" />
                    </van-col>
                    <van-col class="title">近期活动</van-col>
                </van-col>

                <van-col class="right">
                    <van-col class="title">查看全部活动</van-col>
                    <van-col>
                        <van-icon class="icon_arrow" name="arrow" />
                    </van-col>
                </van-col>
            </van-row>
            <!-- 活动卡片 -->
            <van-skeleton :row="3" :loading="false" :animate="false" class="skeleton2">
                <act-card v-if="false" :actList="recentList"></act-card>
                <van-empty class="null_list" v-else description="你好像还没有参加过志愿活动哦！" />
            </van-skeleton>
            <!-- <van-skeleton class="skeleton2" :row="3" :loading="loading"> </van-skeleton>
            <van-skeleton :row="3" class="skeleton2" :loading="loading"> </van-skeleton> -->
        </div>
    </div>
</template>

<script>
import AcCard from '../components/ActCard';
export default {
    name: 'home',
    components: {
        AcCard
    },
    data() {
        return {
            loading: true,
            creditRating: '★★★',
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
        };
    }
};
</script>

<style lang="scss" scoped>
.main-card {
    margin-top: -80px;
}
.blue-area {
    background-color: rgb(25, 137, 250);
    width: 100%;
    height: 300px;
}
.user-statu {
    margin-left: 12px;
    line-height: 34px;
}
.func-area {
    margin-top: 20px;
    width: 100%;
    // border-top: rgb(184, 184, 184) solid 0.032rem;
    // border-bottom: rgb(168, 168, 168) solid 0.032rem;
}

.act_list_card {
    margin: 0.4rem 0;
    padding: 0 0.33rem;
    min-height: 398px;
    .nav {
        padding: 0.3rem 0.3rem;
        font-size: 0.35rem;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 5px;
        .left {
            .icon_list {
                font-size: 0.7rem;
                vertical-align: middle;
            }
            .title {
                margin: 2px 0 0 4px;
                font-size: 0.4rem;
            }
        }
        .right {
            margin-top: 3.3px;
            .title {
                line-height: 0.57rem;
            }
            .icon_arrow {
                font-size: 0.45rem;
                line-height: 0.6rem;
                vertical-align: middle;
            }
        }
    }
    .act_card {
        // background-color: #fff;
        margin-top: 0.2rem;
        border-radius: 5px;
        // box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
        padding: 0.4rem;

        .left {
            margin-top: 0.1rem;
            .act_name {
                font-size: 0.45rem;
            }
            .date {
                font-size: 0.3rem;
                margin: 0.06rem 0 0.05rem;
            }
            .organization {
                font-size: 0.35rem;
            }
        }
        .right {
            margin: 0.1rem 0 0.15rem;
            .hour {
                color: #1989fa;
                font-size: 0.55rem;
                margin: 0.04rem 0 0.27rem;
                text-align: center;
            }
        }
    }
    .null_list {
        padding-bottom: 2.5rem;
        padding-top: 0;
        height: 11.5rem;
        background-color: #fff;
        border-radius: 0.2rem;
    }
}
.skeleton1 {
    margin: 0.3rem;
    padding: 0.4rem 0;
    height: 5.5rem;
}
.skeleton2 {
    margin: 0.3rem;
    padding: 0.4rem 0;
    //   height: 5.5rem;
}
.van-empty {
    margin-top: 0.4rem;
    background-color: #fff;
}
</style>
