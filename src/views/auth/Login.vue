<script setup>
import {reactive, ref} from "vue";
import {useAuth} from "@/stores/auth.js";
import {storeToRefs} from "pinia";
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import {Field, Form, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  phone: yup.string().required("phone field is required"),
  password: yup.string().required("password field is required").min(8),
});

const auth = useAuth();
const router = useRouter()
const {errors} = storeToRefs(auth);

const form = reactive({
  phone: "",
  password: "",
});

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
const onSubmit = async (values, {setErrors}) => {
  let res = await auth.login(values);
  if (res.data) {
    router.push({name:'frontend.home'})
    ElNotification({
      title: 'Success',
      message: 'Login successfully complete',
      type: 'success',
      position:'top-right',
    })
  } else {
    setErrors(res);
  }

}
</script>

<style>
@import "@/assets/css/user-auth.css";
</style>

<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>Customer Login</h2>
                <p>Use your credentials to access</p>
              </div>
              <!--              <div class="user-form-group" id="axiosForm">-->
              <div>
                <Form
                    class="user-form"
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{errors,isSubmitting}"
                >
                  <!--v-if-->
                  <div class="form-group">
                    <Field
                        type="text"
                        name="phone"
                        class="form-control"
                        :class="errors.phone ?'is-invalid':''"
                        placeholder="phone no"
                    /><!--v-if-->
                    <ErrorMessage name="phone" class="text-danger mt-2"/>
<!--                    <span class="text-danger mt-2" v-if="errors.phone">{{ errors.phone[0] }}</span>-->
                  </div>
                  <div class="form-group">
                    <Field
                        name="password"
                        :type="showPassword ===true ? 'text':'password'"
                        class="form-control "
                        :class="errors.password ?'is-invalid':''"
                        placeholder="password"
                    />
                    <span class="view-password" @click="toggleShow">
                      <i class="fas text-success "
                         :class="{
                        'fa-eye':showPassword,
                        'fa-eye-slash':!showPassword,
                        }"
                      ></i>
                    </span
                    ><!--v-if-->
                    <ErrorMessage name="password" class="text-danger mt-2"/>
<!--                    <span class="text-danger mt-2" v-if="errors.password">{{ errors.password[0] }}</span>-->
                  </div>
                  <div class="form-check mb-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="check"
                        value=""
                    /><label class="form-check-label" for="check"
                  >Remember Me</label
                  >
                  </div>
                  <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">login
                      <span
                          v-show="isSubmitting"
                          class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                    <p>
                      Forgot your password?<a
                        href="reset-password.html"
                        class=""
                    >reset here</a
                    >
                    </p>
                  </div>
                </Form>
              </div>
            </div>
            <div class="user-form-remind">
              <p>
                Don't have any account?
                <router-link :to="{name:'user.register'}" class="">register here</router-link>
              </p>
            </div>
            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
