<template>
  <div>
    <el-dialog
      top="10vh"
      title="章节知识点"
      center
      :visible.sync="knowsDialog"
      :before-close="handleKnowsDialogClose"
      width="30%"
    >
    <el-empty description="后续开发"></el-empty>
      <!-- <el-tree
        :data="treeData"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :check-strictly="true"
        :props="defaultProps"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              size="mini"
              style="width: 25px; height: 25px; text-align: center; padding: 0"
              circle
              icon="el-icon-plus"
              type="success"
              @click="knowsEdit(data)"
            >
            </el-button>
            <el-button
              size="mini"
              circle
              type="primary"
              style="
                width: 25px;
                height: 25px;
                text-align: center;
                padding: 0;
                margin-left: 5px;
              "
              icon="el-icon-edit"
              @click="knowsEdit(data)"
            >
            </el-button>
            <el-popconfirm
              title="您确定要删除这条记录吗？"
              @confirm="knowsRemove(data)"
            >
              <template #reference>
                <el-button
                  size="mini"
                  circle
                  icon="el-icon-delete"
                  style="
                    width: 25px;
                    height: 25px;
                    text-align: center;
                    padding: 0;
                    margin-left: 5px;
                  "
                  type="danger"
                />
              </template>
            </el-popconfirm>
          </span>
        </span>
      </el-tree> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleKnowsDialogClose"
            >关 &nbsp;&nbsp;&nbsp;&nbsp; 闭</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog
      :visible.sync="showDialog"
      top="7vh"
      title="添加章节知识点"
      v-model="form"
      center
      width="30%"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="章/节/知识点" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="备注" prop="component">
          <el-input v-model="form.remark" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            label="显示顺序"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button>取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import eduApi from '@/api/admin'
export default {
  data() {
    return {
      treeData: [],
      form: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
    }
  },
  props: ['id', 'knowsDialog'],
  watch: {
    id: {
      handler(newVal, oldVal) {
        this.search(newVal)
      }
    }
  },
  methods: {
    search(id) {
      // eduApi.sectionKnowsList(id).then((resp) => {
      //   this.treeData = resp.data
      // })
    },
    knowsRemove(data) {
      // let id = data.id
      // eduApi.removeKnows(id).then((resp) => {
      //   if (resp.code === 200) {
      //     this.$message.success('删除成功')
      //     this.search(this.id)
      //   } else {
      //     this.$message.error(resp.message)
      //   }
      // })
    },
    knowsEdit(data) {
      console.log(data)
      // this.showDialog = true
    },
    handleKnowsDialogClose() {
      this.$emit('close')
    },
    handleConfirm() {
      this.showDialog = false
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>