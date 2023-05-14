import router from "./index";
import store from "@/store";


export const setAsyncRoutes = (menuList) => {

  if (!store.state.hasRoutes) {
    return
  }

  let newRouters = router.options.routes
  newRouters.matcher = router.matcher
  menuList.forEach(menu => {
    if (menu.children.length > 0) {
      menu.children.forEach(m => {
        let route = menuToRoute(m, menu.name)
        if (route) {
          newRouters[0].children.push(route)
        }
      })
    } else {
      let route = {
        name: menu.name,
        path: menu.path,
        // meta:{parentName: menu.name}
      }
      route.component = () => import('@/views' + menu.component + '.vue')
      newRouters[0].children.push(route)
    }
  })
  newRouters.forEach(route => {
    router.addRoute(route)
  })
}

const menuToRoute = (menu, parentName) => {
  if (!menu.component) {
    return null
  } else {
    let route = {
      name: menu.name,
      path: menu.path,
      meta: {
        parentName: parentName
      }
    }
    route.component = () => import('@/views' + menu.component + '.vue')
    return route
  }
}