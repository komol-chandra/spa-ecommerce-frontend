<script setup>
import {
  HeaderTop,
  HeaderMain,
  Intro,
  Navbar,
  Footer,
  CartSidebar,
  MobileMenu,
  NewsPart,
  LoginModal
} from "@/components";

</script>
<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>
    <!-- Header Top, Header , Navbar -->
    <HeaderTop/>
    <HeaderMain/>
    <Navbar/>
    <CartSidebar/>
    <MobileMenu/>
    <LoginModal/>
    <router-view></router-view>
    <NewsPart/>
    <Intro/>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "App.vue"
}
</script>

<style scoped>

</style>