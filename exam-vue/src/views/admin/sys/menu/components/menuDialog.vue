<template>
  <el-dialog
    :visible.sync="showDialog"
    top="7vh"
    :title="dialogTitle"
    center
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="100px">
      <el-form-item label="上级菜单" prop="parentId">
        <el-select
          v-model="form.parentId"
          clearable
          placeholder="请选择上级菜单"
          :disabled="form.menuType == 'M'"
          @change="changeOrdNum"
        >
          <div v-for="item in tableData" :key="item.id">
            <el-option
              :disabled="
                form.menuType == 'F' ||
                item.name == '首页' ||
                item.name == '退出系统'
              "
              v-show="form.menuType == 'C' || form.menuType == 'F'"
              :label="item.name"
              :value="item.id"
            ></el-option>
            <div v-for="child in item.children" :key="child.id">
              <el-option
                v-show="form.menuType == 'F'"
                :label="child.name"
                :value="child.id"
              >
                <span>{{ '    -- ' + child.name }}</span>
              </el-option>
            </div>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType" label-width="100px">
        <el-radio-group v-model="form.menuType" @change="menuChange">
          <el-radio :label="'M'">目录</el-radio>
          <el-radio :label="'C'">菜单</el-radio>
          <el-radio :label="'F'">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-popover
          placement="bottom"
          width="450"
          v-model="visible"
          trigger="click"
        >
          <div class="iconList">
            <i
              v-for="item in iconList"
              :key="item"
              :class="item"
              @click="setIcon(item)"
              style="font-size: 20px"
            ></i>
          </div>
          <el-input
            suffix-icon="data-icon"
            v-model="form.icon"
            placeholder="请输入"
            clearable
            slot="reference"
          >
            <template slot="append"><i :class="form.icon" /></template>
          </el-input>
        </el-popover>
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="权限标识" prop="perms">
        <el-input v-model="form.perms" />
      </el-form-item>

      <el-form-item label="路由路径" prop="component">
        <el-input v-model="form.path" />
      </el-form-item>

      <el-form-item label="组件路径" prop="component">
        <el-input v-model="form.component" />
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
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script >
import { elementIcons } from '@/utils/icon'
import userApi from '@/api'
export default {
  props: {
    id: {
      default: -1,
      required: true
    },
    showDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    data: {
      type: Array
    },
    dialogTitle: {
      type: String
    }
  },
  data() {
    return {
      form: {
        parentId: null,
        menuType: 'M'
      },
      iconList: [],
      visible: false,
      tableData: []
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal != -1 && newVal) {
        this.search(newVal)
      } else {
        this.form = {
          parentId: null,
          menuType: 'M'
        }
        this.editMenu()
      }
    },
    data: {
      handler(newVal, oldVal) {
        this.tableData = JSON.parse(JSON.stringify(newVal))
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.iconList = elementIcons
  },
  methods: {
    search(id) {
      userApi.getMenuBuId(id).then((resp) => {
        this.form = resp.data
      })
    },
    handleConfirm() {
      if (this.form.parentId == null || this.form.parentId == '') {
        this.form.parentId = 0
      }
      userApi.editMenu(this.form).then((resp) => {
        if (resp.code === 200) {
          this.$message.success('操作成功')
          this.$emit('initMenuList')
          this.handleClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    handleClose() {
      this.$emit('close')
    },
    setIcon(item) {
      this.form.icon = item
      this.visible = false
    },
    editMenu() {
      if (this.form.menuType == 'M') {
        this.form.orderNum = this.tableData.length + 1
      }
    },
    changeOrdNum() {
      if (this.form.menuType == 'C') {
        this.form.orderNum =
          this.tableData.find((item) => item.id === this.form.parentId).children
            .length + 1
      } else if (this.form.menuType == 'F') {
        for (let item of this.tableData) {
          for (let i of item.children) {
            if (i.id === this.form.parentId) {
              let font = i.children.pop()
              if (font) {
                this.form.orderNum = font.orderNum + 1
              } else {
                this.form.orderNum = 1
              }
              return
            }
          }
        }
      }
    },
    menuChange() {
      this.form.parentId = null
      this.editMenu()
    }
  }
}
</script>

<style  scoped>
.iconList {
  width: 400px;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.iconList i {
  display: inline-block;
  width: 60px;
  height: 45px;
  color: #000000;
  font-size: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  margin: 5px;
}
</style>
