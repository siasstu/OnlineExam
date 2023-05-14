<template>
  <div style="box-shadow: 0 2px  2px #f1f1f1; padding-bottom: 4px;">
    <router-link
      v-for="tag in tags"
      :key="tag.path"
      :to="{ path: tag.path }"
      tag="span"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
    >
      {{ tag.name }}
      <span
        :class="tags.length !== 1 ? 'el-icon-close' : ''"
        @click.prevent.stop="closeSelectedTag(tag)"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: this.$store.state.tags
    }
  },
  watch: {
    $route () {
      this.addTags()
    },
  },
  methods: {
    addTags () {
      const {name,path} = this.$route
      this.$store.commit('ADD_TAGS', { name, path })
      this.tags = this.$store.state.tags
      return false
    },
    closeSelectedTag(tag) {
      if (this.tags.length === 1) {
        return
      }
      let index = this.tags.findIndex((itme) => itme.path === tag.path)
      if (index === 0) {
        var path = this.tags[index + 1].path
      } else {
        var path = this.tags[index - 1].path
      }
      this.$store.commit('DEL_TAGS', tag)
      if (tag.path === this.$route.path) {
        this.$router.push(path)
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    }
  }
}
</script>

<style scoped>
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}
.tags-view-item:first-of-type {
  margin-left: 10px;
}
.tags-view-item:last-of-type {
  margin-right: 15px;
}
.tags-view-item.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tags-view-item.active ::before {
  content: '';
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.el-icon-close:before {
  transform: scale(0.6);
  display: inline-block;
  vertical-align: -3px;
}
.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
</style>