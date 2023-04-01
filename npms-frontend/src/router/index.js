import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout/Layout"

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Log in',
        meta: {title: "Log in", requireAuth: false},
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/main',
        component: Layout,
        icon: "el-icon-s-home",
        meta: {title: "Home Page", requireAuth: true},
        redirect: '/home',
        children: [
            {
                path: "/home",
                name: "Home page",
                icon: "el-icon-s-home",
                meta: {title: "Home page", requireAuth: true},
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: "/customer",
        name: "customer management",
        component: Layout,
        icon: "el-icon-s-shop",
        meta: {title: "customer management", requireAuth: true},
        children: [
            {
                path: "/customer-list",
                name: "Cutomer List",
                icon: "el-icon-s-data",
                meta: {title: "Cutomer List", requireAuth: true},
                component: () => import("@/views/CustomerList.vue")
            },
            {
                path: "/customer-handover",
                name: "Customer Handover",
                icon: "el-icon-document-add",
                meta: {title: "Customer Handover", requireAuth: true},
                component: () => import("@/views/CustomerHandover.vue")
            }
        ]
    },
    {
        path: "/opp",
        name: "opportunity management",
        component: Layout,
        icon: "el-icon-s-shop",
        meta: {title: "opportunity management", requireAuth: true},
        children: [
            {
                path: "/opp-list",
                name: "opportunity maintenance",
                icon: "el-icon-s-data",
                meta: {title: "opportunity maintenance", requireAuth: true},
                component: () => import("@/views/Chances.vue")
            },
            {
                path: "/opp-approve",
                name: "Opportunity Approval",
                icon: "el-icon-s-data",
                meta: {title: "Opportunity Approval", requireAuth: true},
                component: () => import("@/views/Approval.vue")
            }
        ]
    },
    {
        path: "/log",
        name: "report management",
        component: Layout,
        icon: "el-icon-s-order",
        meta: {title: "report management", requireAuth: true},
        children: [
            {
                path: "/log-worklog",
                name: "Sales daily writing",
                icon: "el-icon-s-data",
                meta: {title: "Sales daily writing", requireAuth: true},
                component: () => import("@/views/workLog.vue")
            },
            {
                path: "/log-worklog-search",
                name: "Daily Sales Inquiry",
                icon: "el-icon-s-data",
                meta: {title: "Daily Sales Inquiry", requireAuth: true},
                component: () => import("@/views/workLogSearch.vue")
            },
            {
                path: "/log-relation-search",
                name: "Customer relationship query",
                icon: "el-icon-document-copy",
                meta: {title: "Customer relationship query", requireAuth: true},
                component: () => import("@/views/relationLog.vue")
            },
            {
                path: "/log-handover-search",
                name: "Customer Handover Inquiry",
                icon: "el-icon-tickets",
                meta: {title: "Customer Handover Inquiry", requireAuth: true},
                component: () => import("@/views/handoverLog.vue")
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {title: "404", requireAuth: false},
        component: () => import('@/views/404.vue')
    },
    {
        path: '/500',
        name: '500',
        meta: {title: "500", requireAuth: false},
        component: () => import('@/views/500.vue')
    },
]


// createRouter Create a routing instance
const router = createRouter({
    /**
     * hashmodel：createWebHashHistory，
     * historymodel：createWebHistory
     */
    history: createWebHashHistory(),
    routes,
})

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// set uptitle
router.beforeEach((to, from, next) => {
    // startup progress bar
    NProgress.start()

    // set header
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "Save silently"
    }
    next()
})

router.afterEach(() => {
    // close progress bar
    NProgress.done()
})

// Throw a routing instance, referenced in main.js
export default router