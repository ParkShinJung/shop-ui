import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from "@/store";



Vue.use(VueRouter)

export const routes = [
    {
        path: '',
        // component: Layout,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/index2'),
        children: [
            // *****
            // Book
            {
                path: '/',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '../views/product/main/About.vue'),
                props: true,
            },
            {
                path: '/search',
                name : 'search',
                component: () => import(/* webpackChunkName: "about" */ '../views/product/main/search.vue'),
                props: true,
            },
            {
                path: '/dashBoard',
                name : 'dashBoard',
                component: () => import(/* webpackChunkName: "about" */ '../views/product/main/Dashboard.vue'),
                props: true,
            },
            {
                path: '/category/:category',
                name : 'category',
                component: () => import(/* webpackChunkName: "about" */ '@/views/product/main/category.vue'),
                props: true,
            },

            {
                path: '/my',
                component: () =>  import('@/views/mypage/My'),
                meta: {
                    auth: true, //는 경로가 로그인 할 필요가 있음을 나타낸다
                },
                children:[
                    {
                        path: '/wish',
                        name: 'WishList',
                        component: () =>  import('@/views/mypage/WishList'),
                    },
                    {
                        path: '/comment',
                        name: 'MyComment',
                        component: () =>  import('@/views/mypage/MyComment')
                    },

                    {
                        path: '/cart',
                        name: 'Cart',
                        component: () =>  import('@/views/mypage/Cart'),
                    },

                    {
                        path: 'order',
                        name: 'MyOrderComponent',
                        component: () =>  import('@/views/mypage/Order'),
                    },
                    {
                        path: '/order/:orderId',
                        name: 'orderDetail',
                        component: () =>  import('@/views/mypage/OrderDetail'),
                    },
                    {
                        path: '/infoEdit',
                        name: 'InfoEdit',
                        component: () =>  import('@/views/mypage/InfoEdit')
                    },
                ]
            },
        ]
    },


    {
        path: '/login',
        name: 'Login',
        component: () =>  import('@/views/Login'),
        meta: {
            logout : true, //로그인 상태가 아니어야지 접근가능
        },
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () =>  import('@/views/SignUp')
    },
    {
        path: '/mainBook',
        name: 'MainBook',
        component: () =>  import('@/views/product/MainBook')
    },
    {
        path: '/detailView/:productId',
        name: 'DetailView',
        component: () =>  import('@/views/product/DetailView')
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>  import('@/views/order/Order'),
    },


    //mainMenu
    {
        path: '/home',
        name: 'Home',
        component: () =>  import('@/views/Home')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () =>  import('@/views/admin/Admin'),
        children: [
            {
                path: '/order',
                component: () => import(/* webpackChunkName: "about" */ '../views/admin/management/AdminOrder'),
            },
            {
                path: '/order/:orderId',
                component: () =>  import('@/views/admin/management/AdminOrderDetail'),
            },
            {
                path: '/comment',
                component: () => import(/* webpackChunkName: "about" */ '../views/admin/management/AdminComment'),
            },

            {
                path: '/member',
                component: () => import(/* webpackChunkName: "about" */ '../views/admin/management/AdminMember'),
            },

            {
                path: '/postBook',
                component: () =>  import('@/views/admin/editBook/PostBook')
            },
            {
                path: '/editBook',
                component: () =>  import('@/views/admin/editBook/EditBook')
            },
        ]
    },


]

const router = new VueRouter({
    routes
});

export default router

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (store.state.member.loginData.loginState) {
            next();
        } else {
            alert("로그인이 필요한 페이지입니다.")
            router.push({path:'/login'})
        }
    }else{
        next();
    }

    if (to.matched.some(record => record.meta.logout)) {
        if (store.state.member.loginData.loginState===false) {
            next();
        } else {
            alert("이미 로그인 상태입니다.")
            router.push({path:'/'})
        }
    }else{
        next();
    }
})
