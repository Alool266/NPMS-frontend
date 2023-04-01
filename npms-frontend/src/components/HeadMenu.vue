<template>
    <div class="head-menu">
        <el-space wrap size="large">
            <!-- information  -->
            <el-popover trigger="hover" placement="bottom" :width="200">
                <template #reference>
                    <el-badge type="danger" is-dot> 
                        <i class="el-icon-message"/>
                    </el-badge>
                </template>
                <div>news pending</div>
            </el-popover>
            <!-- notify  -->
            <el-popover trigger="hover" placement="bottom" :width="220">
                <template #reference>
                    <el-badge type="danger" is-dot>
                        <i class="el-icon-bell"/>
                    </el-badge>
                </template>
                <div>
                    <el-tabs v-model="tabsActive" @tab-click="onTab">
                        <el-tab-pane label="notice" name="notice">
                            <el-row v-for="(item,n) in notices" :key="n" @click="onManage(item.id)">
                                <el-col :span="6">
                                    <el-avatar :icon="item.icon" :size="40"></el-avatar>
                                </el-col>
                                <el-col :span="18">
                                    <div>{{ item.message }}</div>
                                    <div>{{ item.dateTime }}</div>
                                </el-col>
                                <el-divider></el-divider>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="news" name="news">
                            <el-row v-for="(item,n) in news" :key="n" @click="onManage(item.id)">
                                <el-col :span="6">
                                    <el-avatar :icon="item.icon" :size="40"></el-avatar>
                                </el-col>
                                <el-col :span="18">
                                    <div>{{ item.message }}</div>
                                    <div>{{ item.dateTime }}</div>
                                </el-col>
                                <el-divider></el-divider>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="Tasks" name="untreated">
                            <el-row v-for="(item,u) in untreateds" :key="u" @click="onManage(item.id)">
                                <el-col :span="6">
                                    <el-avatar :icon="item.icon" :size="40"></el-avatar>
                                </el-col>
                                <el-col :span="18">
                                    <div>{{ item.message }}</div>
                                    <div>{{ item.dateTime }}</div>
                                </el-col>
                                <el-divider></el-divider>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-popover>
            <!-- Personal settings  -->
            <el-dropdown>
                    <span class="el-dropdown-link">
                        <span>{{ empId }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-switch-button" @click="logout">logout</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" @click="onPassword">Change the password</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-space>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    import {useRouter} from 'vue-router'

    export default {
        setup() {
            const router = useRouter()
            const state = reactive({
                tabsActive: 'notice',
                notices: [],
                news: [],
                empId:'',
                untreateds: [],
            })

            onMounted(()=>{
                state.empId = window.sessionStorage.getItem('username')
                state.notices = [
                    {id:1,icon:'el-icon-chat-dot-round',message:'Note1',dateTime:'2023-02-22 12:15:21'},
                    {id:2,icon:'el-icon-chat-dot-round',message:'Note2',dateTime:'2023-02-22 12:15:21'},
                    {id:3,icon:'el-icon-chat-dot-round',message:'Note3',dateTime:'2023-02-22 12:15:21'},
                    {id:4,icon:'el-icon-chat-dot-round',message:'Note4',dateTime:'2023-02-22 12:15:21'},
                ]

                state.news = [
                    {id:1,icon:'el-icon-chat-dot-round',message:'message1',dateTime:'2023-02-22 12:15:21'},
                    {id:2,icon:'el-icon-chat-dot-round',message:'message2',dateTime:'2023-02-22 12:15:21'},
                    {id:3,icon:'el-icon-chat-dot-round',message:'message3',dateTime:'2023-02-22 12:15:21'},
                    {id:4,icon:'el-icon-chat-dot-round',message:'message4',dateTime:'2023-02-22 12:15:21'},
                ]

                state.untreateds = [
                    {id:1,icon:'el-icon-chat-dot-round',message:'Task1',dateTime:'2023-02-22 12:15:21'},
                    {id:2,icon:'el-icon-chat-dot-round',message:'Task2',dateTime:'2023-02-22 12:15:21'},
                    {id:3,icon:'el-icon-chat-dot-round',message:'Task3',dateTime:'2023-02-22 12:15:21'},
                    {id:4,icon:'el-icon-chat-dot-round',message:'Task4',dateTime:'2023-02-22 12:15:21'},
                ]
            })

            const onManage = (id) =>{
                console.log(id)
            }

            const onTab = (tab, event) => {
                console.log(tab, event);
            }

            const logout = () => {
                window.sessionStorage.setItem('username','unknown')
                window.sessionStorage.setItem('token','')
                window.sessionStorage.setItem('position','')
                router.push({path: 'login'})
            }

            const onPassword = () => {
                router.push({path: 'user-password'})
            }

            return {
                ...toRefs(state),
                logout,
                onPassword,
                onTab,
                onManage
            }
        }
    }
</script>

<style lang="less">
    .head-menu {
        text-align: right;
        cursor: pointer;
        margin-right: -24px;
        .el-badge__content.is-fixed.is-dot {
            top: 15px;
        }
    }
</style>