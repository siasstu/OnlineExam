import router from "./index";
import store from "@/store";
import { Message } from "element-ui";


router.beforeEach((to, from, next) => {

  const whiteList = ['/login']
  let token = localStorage.getItem("token")
  let menuList = localStorage.getItem("menuList")
  if (token!==null && whiteList.includes(to.path)) {
    next('/dashboard')
    Message({
      type: "warning",
      message: "您以登录！！"
    })
  }
  if (router.getRoutes().length === 18 && menuList!==null && !whiteList.includes(to.path)) {
    store.commit("SET_ROUTERS", store.state.menuList)
    next({ ...to })
  }
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
})