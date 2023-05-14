<template>
  <div class="app-container">
        <navbar />
        <app-main class="stu-container"/>
  </div>
</template>

<script>
import { AppMain, Navbar } from './components'
export default {
  name: 'StuLayout',
  components: {
    AppMain,
    Navbar
  },
  beforeCreate() {
    if (JSON.parse(localStorage.getItem('first'))) {
      location.reload()
      localStorage.setItem('first',false)
    }
  }
}
</script>
