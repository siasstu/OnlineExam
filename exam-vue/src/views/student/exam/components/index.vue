<template>

  <span style="color: #ff0000; font-weight: 700">{{ min }}分钟{{ sec }}秒</span>

</template>

<script>


export default {
  name: 'ExamTimer',
  props: ["time"],
  data() {
    return {
      leftSeconds: 0,
      min: '00',
      sec: '00'
    }
  },

  created() {
    this.leftSeconds = this.time * 60
    this.countdown()
  },

  methods: {
    countdown() {
      if (this.leftSeconds < 0) {
        this.$emit('timeout')
        return
      }
      const min = parseInt(this.leftSeconds / 60)
      const sec = parseInt(this.leftSeconds % 60)

      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      this.leftSeconds -= 1
      const that = this
      setTimeout(function() {
        that.countdown()
      }, 1000)
    }

  }
}
</script>

