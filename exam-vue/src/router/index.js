import VueRouter from "vue-router";
import Vue from 'vue'
import Layout from "@/layout"
import Stulayout from "@/stuLayout"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '首页',
    component: JSON.parse(localStorage.getItem("role")) === "学生" ? Stulayout : Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'userInfo',
        name: '个人中心',
        component: () => import('@/views/common/userInfo/index'),
        meta: { title: '个人中心' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/login/Login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/views/common/404.vue'),
    meta: { title: '错误' }
  },
  {
    path: '/question',
    name: '题目编辑',
    component: Layout,
    children: [
      {
        path: 'edit/singleChoice',
        component: () => import('@/views/teacher/question/edit/single-choice.vue'),
        name: '单选题编辑',
      },
      {
        path: 'edit/multipleChoice',
        component: () => import('@/views/teacher/question/edit/multiple-choice.vue'),
        name: '多选题编辑',
      },
      {
        path: 'edit/trueFalse',
        component: () => import('@/views/teacher/question/edit/true-false.vue'),
        name: '判断题编辑',
      },
      {
        path: 'edit/gapFilling',
        component: () => import('@/views/teacher/question/edit/gap-filling.vue'),
        name: '填空题编辑',
      },
      {
        path: 'edit/shortAnswer',
        component: () => import('@/views/teacher/question/edit/short-answer.vue'),
        name: '简答题编辑',
      }
    ]
  },
  {
    path: '/paper',
    name: '试卷管理',
    component: Layout,
    children: [
      {
        path: 'edit',
        component: () => import('@/views/teacher/paper/edit.vue'),
        name: '编辑试卷',
      },

    ]
  },
  {
    path: '/answer',
    component: Layout,
    name: '答卷管理',
    children: [
      {
        path: 'edit',
        component: () => import('@/views/teacher/answer/edit.vue'),
        name: '答卷详情',
      },

    ]
  },
  {
    path: '/release',
    name: '考试管理',
    component: Layout,
    children: [
      {
        path: 'exam/edit',
        component: () => import('@/views/teacher/exam/edit.vue'),
        name: '发布考试',
      },
    ]
  },

  {
    path: '/answer/correct',
    component: Layout,
    name: '批改试卷',
    component: () => import('@/views/teacher/answer/correct.vue')
  },

  {
    path: '/exam/paper',
    name: 'Paper',
    meta: { isAuth: true, title: '考试' },
    component: () => import('@/views/student/exam/paper.vue')
  },
 
]
const router = new VueRouter({
  routes,
})
export default router