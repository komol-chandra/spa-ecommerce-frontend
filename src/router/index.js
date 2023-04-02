import {createRouter, createWebHistory} from "vue-router";
import {useAuth} from "@/stores/auth";

import {
    HomePage,
    ShopPage,
    SellerListPage,
    SellerStorePage,
} from "@/views/pages";

import {
    LoginPage,
    RegisterPage,
} from "@/views/auth";

import {
    OrderListPage,
    ProfilePage,
    WishListPage,
} from "@/views/user";


const routes = [
    {
        path: '/',
        name: "frontend.home",
        component: HomePage,
        meta: {title: "Home"},
    },
    {
        path: '/auth/login',
        name: "user.login",
        component: LoginPage,
        meta: {title: "User Login",guest: true},

    },
    {
        path: '/auth/register',
        name: "user.register",
        component: RegisterPage,
        meta: {title: "User Register",guest: true},
    },
    {
        path: '/shop',
        name: "shop.page",
        component: ShopPage,
        meta: {title: "Shop"},
    },
    {
        path: '/seller-list',
        name: "seller-list.page",
        component: SellerListPage,
        meta: {title: "Seller List"},
    },
    {
        path: '/seller-store',
        name: "seller-store.page",
        component: SellerStorePage,
        meta: {title: "Seller List"},
    },
    {
        path: '/my/profile',
        name: "user.profile",
        component: ProfilePage,
        meta: {title: "Profile",requiresAuth: true},
    },
    {
        path: '/my/orders',
        name: "user.orders",
        component: OrderListPage,
        meta: {title: "Order List",requiresAuth: true},
    },
    {
        path: '/my/wishlists',
        name: "user.wishlists",
        component: WishListPage,
        meta: {title: "WishList",requiresAuth: true},
    },
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // short for `routes: routes`
})

const DEFAULT_TITLE = `404`;
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || DEFAULT_TITLE;
    const loggedIn = useAuth();
    if(to.matched.some((record)=>record.meta.requiresAuth)){
        if(!loggedIn.user.meta){
            next({name:'user.login'})
        }else{
            next();
        }
    }else if(to.matched.some((record)=>record.meta.guest)){
        if(loggedIn.user.meta){
            next({name:'user.profile'})
        }else{
            next();
        }
    }
    else{
        next();
    }
})

export default router;