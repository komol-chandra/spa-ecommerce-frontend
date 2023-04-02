<script setup>

import {useAuth} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {ElNotification} from "element-plus";

const auth = useAuth();
const {user} = storeToRefs(auth);
import {useRouter} from 'vue-router'

const router = useRouter()

const userLogout = async () => {
  let res = await auth.logout();
  if (res.data) {
    router.push({name: 'frontend.home'})
    ElNotification({
      title: 'Success',
      message: 'Logout successfully complete',
      type: 'success',
      position: 'top-right',
    })
  } else {
    setErrors(res);
  }
}

function mobileSearchModal() {
  $(".header-form").toggleClass("active");
  $(".header-src").children(".fa-search").toggleClass("fa-times");
}

function mobileMenuModalOpen() {
  $("body").css("overflow", "hidden");
  $(".nav-sidebar").addClass("active");
}

function cartModalOpen() {
  $("body").css("overflow", "hidden"),
      $(".cart-sidebar").addClass("active"),
      $(".cart-close").on("click", function () {
        $("body").css("overflow", "inherit"),
            $(".cart-sidebar").removeClass("active"),
            $(".backdrop").fadeOut();
      });
}
</script>
<template>
  <header class="header-part">
    <div class="container">
      <div class="header-content">
        <div class="header-media-group">
          <!-- mobile menu  icon -->
          <button class="header-user" @click="mobileMenuModalOpen">
            <img src="@/assets/images/menu.png" alt="user"/>
          </button>

          <router-link :to="{name:'frontend.home'}"><img src="@/assets/images/logo.png" alt="logo"/></router-link>
          <!-- mobile search icon -->
          <button class="header-src" @click="mobileSearchModal"><i class="fas fa-search"></i></button>
        </div>
        <router-link :to="{name:'frontend.home'}" class="header-logo"><img src="@/assets/images/logo.png" alt="logo"/>
        </router-link>

        <form class="header-form">
          <input type="text" placeholder="Search anything..."/>
          <button>
            <i class="fas fa-search"></i>
          </button>
        </form>

        <div class="header-widget-group hover-nav">
          <li class="nav-item dropdown">
            <a class="nav-link header-widget" href="#" data-bs-toggle="dropdown"><i class="fas fa-user"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" v-if="user.data">
              <li>
                <router-link :to="{name:'user.orders'}" class="dropdown-item">Orders</router-link>
              </li>
              <li>
                <router-link :to="{name:'user.profile'}" class="dropdown-item"> Profile</router-link>
              </li>
              <li>
                <router-link :to="{name:'user.wishlists'}" class="dropdown-item"> WishLists</router-link>
              </li>
              <li><a href="javascript:void(0)" class="dropdown-item text-danger" @click="userLogout">Logout</a></li>
            </ul>
            <ul class="dropdown-menu dropdown-menu-end" v-else>
              <li>
                <router-link :to="{name:'user.login'}" class="dropdown-item"> Login</router-link>
              </li>
              <li>
                <router-link :to="{name:'user.register'}" class="dropdown-item"> Register</router-link>
              </li>
            </ul>
          </li>

          <router-link :to="{name:'user.wishlists'}" class="header-widget" title="Wishlist"><i
              class="fas fa-heart"></i><sup>0</sup></router-link>
          <!-- Cart Open btn -->
          <button class="header-widget header-cart" @click="cartModalOpen" title="Cartlist">
            <i class="fas fa-shopping-basket"></i><sup>9+</sup><span>total price<small>$345.00</small></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderMain"
}
</script>

<style>
.hover-nav .nav-item .dropdown-menu {
  display: none;
  margin-top: 0;
}

.hover-nav .nav-item:hover .nav-link {

}

.hover-nav .nav-item:hover .dropdown-menu {
  display: block;
}
</style>