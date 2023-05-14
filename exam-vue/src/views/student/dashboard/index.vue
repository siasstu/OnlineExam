<template>
  <div style="position: absolute; width: 100%; padding-top: 0 !important">
    <el-carousel height="400px">
      <el-carousel-item v-for="img in imgs" :key="img.index">
        <img :src="img.src" style="width: 100%; height: inherit" />

        <!-- <el-image :src="img.src" fit="cover" width="100%"></el-image> -->
      </el-carousel-item>
    </el-carousel>
    <div class="stu-container">
      <span
        style="
          display: block;
          width: 100px;
          height: 40px;
          font-size: 20px;
          background-color: #ccc;
          text-align: center;
          line-height: 40px;
          border-radius: 15px;
          position: absolute;
          left: 8%;
          bottom: 420px;
        "
        >通告中心</span
      >
      <el-card style="height: 450px;">
        <el-empty description="暂无通告"></el-empty>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [
      { index: 1, src: require('@/assets/index/2.png') },
        { index: 2, src: require('@/assets/index/1.jpg') },
        { index: 3, src: require('@/assets/index/3.jpg') }
      ]
    }
  },
  mounted() {
    // 首次加载时,初始化高度
    this.screenWidth = window.innerWidth
    this.bannerHeight = (600 / 1550) * this.screenWidth
    // 窗口大小发生改变
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.bannerHeight = (600 / 1550) * this.screenWidth
    }
  }
}
</script>