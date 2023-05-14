<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
    :background="background"
      :current-page.sync="currentPage"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size.sync="pageSize"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50]
      }
    },
    queryParam: {

    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // currentPage: {
    //   get() {
    //     return this.page
    //   },
    //   set(val) {
    //     this.$emit('update:pageIndex', val)
    //   }
    // },
    // page: {
    //   get() {
    //     return this.limit
    //   },
    //   set(val) {
    //     this.$emit('update:pageSize', val)
    //   }
    // }
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this.$emit('pagination', this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.pageIndex = val
      this.$emit('pagination', this.queryParam)
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
