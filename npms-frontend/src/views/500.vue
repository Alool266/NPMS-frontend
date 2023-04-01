<template>
    <div class="container-500" :style="defaultHeight">
        <h1>We'll be back soon!</h1>
        <div class="text"> sorry for the inconvenience</div>
        <div class="text">we're doing some maintenance right now。</div>
        <div class="text">If you need, you can always contact<a href="#">contact us</a>, or we'll be back online soon!</div>
        <div class="text team">OurTeam</div>
        <div>
            <el-button icon="el-icon-back" round @click="goBack">return</el-button>
            <el-button type="danger" icon="el-icon-s-home" round @click="goHome">Home Page</el-button>
        </div>
    </div>
</template>

<script>
    import {onBeforeMount, reactive, toRefs} from "vue"
    import {useRouter} from "vue-router"

    export default {
        setup() {
            const router = useRouter()
            const state = reactive({
                defaultHeight: {
                    height: ''
                }
            })

            onBeforeMount(() => {
                state.defaultHeight.height = document.body.clientHeight + "px"
            })

            const goBack = () => {
                router.go(-1)
            }

            const goHome = () => {
                router.push({path: 'main'})
            }

            return {
                ...toRefs(state),
                goBack,
                goHome,
            }
        }
    }
</script>

<style lang="less">
    .container-500 {
        height: 100%;
        margin: 0 auto;
        padding-top: 15%;
        text-align: center;
        color: #494b52;
        background: #17191c;
        font-weight: 400;
        font-family: "Raleway", sans-serif;
        font-size: 15px;
        letter-spacing: 0.3px;

        .text {
            margin-bottom: 0.5em;
        }

        .team {
            margin: 1.2em 0;
        }

        a {
            text-decoration: none;
            color: #007bff;
        }
    }
</style>