<template>
    <!-- <div style="border: 1px solid #ccc; ">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :mode="mode"
      />
      <Editor
        style="height: 200px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="html"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div> -->
    <div>

    </div>
</template>

<script>
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import api from '@/api/index'

export default {
  name: 'MyEditor',
  // components: { Editor, Toolbar },
  data() {
    return {
      // editor: null,
      // html: '',
      // editorConfig: {
      //   placeholder: '请输入内容...',
      //   MENU_CONF: {
      //     uploadImage: {
      //       customUpload: this.uploadImg,
      //       fieldName: 'file',
      //     },
      //     uploadVideo: {
      //       customUpload: this.uploadVideo,
      //       fieldName: 'file'
      //     },
      //   }
      // },
      // mode: 'simple'
    }
  },
  methods: {
    // onCreated(editor) {
    //   this.editor = Object.seal(editor)
    // },
    // uploadImg(file, insertFn) {
    //   let imgData = new FormData()
    //   imgData.append('file', file)
    //   api.imageEdit(imgData).then((resp) => {
    //     if (resp.data.code == 200) {
    //       insertFn('http://localhost:8088/image/exam/' + resp.data.data)
    //       this.$message.success('上传成功')
    //     } else {
    //       this.$message.error('上传失败,请重新上传')
    //     }
    //   })
    // }
  },
  beforeDestroy() {
    // const editor = this.editor
    // if (editor == null) return
    // editor.destroy()
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>