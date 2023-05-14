import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import {setAsyncRoutes} from "@/router/async"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("userInfo"),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        menuList: JSON.parse(localStorage.getItem("menuList")),
        hasRoutes:  JSON.parse(localStorage.getItem("hasRoutes")),
        role: null,
        tags: [{
            name: '首页',
            path: '/dashboard'
        }],
        // avatar:""
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList
            localStorage.setItem("menuList", JSON.stringify(menuList))
            localStorage.setItem("first", true)
        },
        SET_ROUTERS: (state,menuList) => {
            setAsyncRoutes(menuList);
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        SET_ROUTES_STATE: (state, hasRoutes) => {
            state.hasRoutes = hasRoutes
            localStorage.setItem("hasRoutes",hasRoutes)
        },
        ADD_TAGS: (state, tag) => {
            if (state.tags.findIndex(e => e.path === tag.path) === -1) {
                state.tags.push({
                    name: tag.name,
                    path: tag.path
                })
            }
        },
        DEL_TAGS: (state, tag) => {
            for (const [i, v] of state.tags.entries()) {
                if (v.path === tag.path) {
                    state.tags.splice(i, 1)
                    break
                }
            }
        },
        RESET_TAGS: (state) => {
            state.tags = [{
                name: '首页',
                path: '/'
            }]
        },
        SET_ROLE: (state,role) => {
            state.role = role
            localStorage.setItem("role", JSON.stringify(role))
        },
        // SET_AVATAR: (state, avatar) => {
        //     state.avatar = avatar
        // }
    },
    getters: {
        getUser: state => {
            return state.userInfo
        },
        getToken: state => {
            if (state.token == null) {
                return ''
            } else {
                return state.token
            }
        },
        getMenuList: state => {
            return state.menuList
        },
    },
    actions: {
        logout() {
            window.localStorage.clear();
            router.replace('/login')
        }
    },
    modules: {}
})
