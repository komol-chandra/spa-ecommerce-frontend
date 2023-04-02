import {defineStore} from 'pinia'
import axiosInstance from "@/services/axiosService.js";

export const useAuth = defineStore('auth', {
    state: () => ({
        user: {},
    }),
    persist: {
        paths: ['user'],
    },
    // getters: {
    //     doubleCount: (state) => state.count * 2,
    // },
    actions: {
        async login(formData) {

            try {
                let res = await axiosInstance.post(
                    "user/login", formData
                );
                if (res.status === 200) {
                    this.user = res.data;
                    return new Promise((resolve) => {
                        resolve(res.data);
                    })
                }
            } catch (error) {
                if (error.response.data) {
                    return new Promise((reject) => {
                        reject(error.response.data.errors);
                    })
                }
            }
        },
        async logout() {
            try {
                let res = await axiosInstance.post(
                    "user/logout"
                );
                console.log(res);
                // if (res.status === 200) {
                //     this.user = res.data;
                //     return new Promise((resolve) => {
                //         resolve(res.data);
                //     })
                // }
            } catch (error) {
                if (error.response.data) {
                    return new Promise((reject) => {
                        reject(error.response.data.errors);
                    })
                }
            }
        }
    },
})
