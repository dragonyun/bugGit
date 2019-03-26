<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="5" class="tools">
        <div class="collapse" @click.prevent="collapse">
          <img src="/static/pic/fold.png" class="flodicon"/>
          <!--i style="font-size: 25px" class="el-icon-menu"></i-->
        </div>
      </el-col>
      <el-col :span="5" class="tools">
      <div class="addData" @click.prevent="addDataBase">
          <i style="font-size: 25px" class="el-icon-circle-plus-outline"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>选择1</el-dropdown-item>
              <el-dropdown-item>选择2</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu
          default-active="2"
          :collapse="menuCollFlag"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据库一</span>
            </template>
            <el-menu-item index="1-1">数据表1</el-menu-item>
            <el-menu-item index="1-2">数据表2</el-menu-item>
            <el-menu-item index="1-3">数据表3</el-menu-item>
            <el-menu-item index="1-4">数据表4</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">数据库二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">数据库三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">数据库四</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <section class="content-container">
        <el-col :span="24" class="content-set">
            后端框架选择:
            <el-select v-model="backFrameSelected" placeholder="请选择" @change="backSelectChangeEvent">
              <el-option
                v-for="item in backFrameGroupInfo"
                :key="item.uid"
                :label="item.groupName"
                :value="item.uid">
              </el-option>
            </el-select>
            <el-button type="primary">生产代码</el-button>
        </el-col>
        <el-col :span="24" class="content-display">
          <aside class="content-index">
            <el-tree
              class="database-tree"
              :data="dataBaseList"
              :props="defaultProps"
              default-expand-all
              @node-click="toFileClickBt"
              @node-contextmenu="rightClickBt"
              ref="tree2">
            </el-tree>
          </aside>
          <section class="content-text">
            <el-input
              type="textarea"
              :rows="5"
              placeholder=""
              v-model="textarea">
            </el-input>
            <!--el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
              <el-form-item label="详细">
                <div class="edit_container">
                  <quill-editor ref="myTextEditor"
                    v-model="content"
                    :config="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
                  </quill-editor>
                </div>
              </el-form-item>
            </el-form-->
          </section>
        </el-col>
      </section>
    </el-col>
    <el-dialog title="数据库新建连接" width="480px" :visible.sync="dbDialogFormVisible">
      <el-form :model="dbAddForm" label-width="60px" :inline="true" size="medium">
        <el-form-item label="连接名:" :label-width="dbAddFormLabelWidth">
          <el-input v-model="dbAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="IP地址:" :label-width="dbAddFormLabelWidth">
          <el-input v-model="dbAddForm.ip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口:" :label-width="dbAddFormLabelWidth">
          <el-input v-model="dbAddForm.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" :label-width="dbAddFormLabelWidth">
          <el-input v-model="dbAddForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="dbAddFormLabelWidth">
          <el-input v-model="dbAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dbDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dbDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
// import Routers from './router'
// import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'HomeDiv',
  data () {
    return {
      sysName: 'BugTeam',
      sysUserName: 'admin',
      collapsed: false,
      menuCollFlag: false,
      backFrameSelected: 'spring',
      textarea: '<html>\n\t<h1>We Are BugTeam!</h1>\n</html>',
      content: '<h2>I am Example</h2>',
      editorOption: {
        // something config
      },
      backFrameGroupInfo: [{
        uid: '101', // 组UID号（用于后台）
        id: '1',
        groupName: 'spring'//  组名
      }, {
        uid: '102',
        id: '2',
        groupName: 'spring MVC'
      }, {
        uid: '103',
        id: '3',
        groupName: 'spring Boot'
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
        online: 'online'
      },
      dataBaseList: [{
        id: 1,
        label: 'project',
        children: [{
          id: 2,
          label: 'biz',
          children: [{
            id: 3,
            label: 'abc.xml'
          }, {
            id: 4,
            label: 'abc.java'
          }, {
            id: 5,
            label: 'abc.js'
          }]
        }, {
          id: 12,
          label: 'cfg',
          children: [{
            id: 13,
            label: 'abc.xml'
          }]
        }, {
          id: 6,
          label: 'dao',
          children: [{
            id: 7,
            label: 'abc.xml'
          }, {
            id: 8,
            label: 'abc.java'
          }, {
            id: 9,
            label: 'abc.js'
          }]
        }]
      }],
      dialogTableVisible: false,
      dbDialogFormVisible: false,
      dbAddForm: {
        name: '',
        ip: '',
        port: '',
        userName: '',
        password: ''
      },
      dbAddFormLabelWidth: '120px'
    }
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
      this.menuCollFlag = this.collapsed
    },
    // 后端框架选择改变事件
    backSelectChangeEvent: function () {
      if (this.backFrameSelected !== '') {
        console.log(this.backFrameSelected)
      }
    },
    addDataBase: function () {
      this.dbDialogFormVisible = true
    },
    handleOpen: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect: function (key, keyPath) {
      console.log(key, keyPath)
    },
    toFileClickBt: function (data) {
      console.log(data)
    },
    rightClickBt: function (e, nodeData, node, nodeCmp) {
      // 阻止事件冒泡
      e.stopPropagation()
      // 阻止浏览器默认右击事件
      e.preventDefault()
      console.log('nodeData输出')
      console.log(nodeData)
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top:0px;
    bottom: 0px;
    width:100%;
    .header {
      height: 60px;
      line-height: 60px;
      color: rgb(44, 46, 167);
      background-color: rgb(228, 233, 238);
      border-bottom: 1px solid white;
      .userinfo {
        text-align: right;
        width: 120px;
        padding-right: 35px;
        float: right;
        background-color: rgb(110, 187, 142);
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
        }
      }
      .logo-width {
        width:200px;
      }
      .logo-collapse-width {
        width: 60px;
      }
      .tools {
        padding: 0px 23px;
        width: 30px;
        height: 60px;
        line-height: 60px;
        background-color: rgb(169, 162, 194);
        .collapse {
          padding: 4px 0px;
          background-color: rgb(175, 167, 206);
          .flodicon {
            height: 25px;
            width: 25px;
            line-height: 30px;
            text-align: left;
            cursor: pointer;
          }
        }
      }
      .addData {
        padding: 0px 23px;
        width: 30px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        background-color: rgb(190, 186, 206);
      }
    }
    .main {
      display: flex;
      position: absolute;
      top:60px;
      bottom: 0px;
      overflow: hidden;
      background-color: rgb(169, 185, 167);
      aside {
        flex:0 0 200px;
        width: 200px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .database-tree {
            left:60px;
            z-index:9999;
          }
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }
        }
      }
      .menu-collapsed{
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex: 0 0 200px;
        width: 200px;
      }
      .content-container {
        background: #afb1bd;
        flex:1;
        overflow-y: scroll;
        padding: 20px;
        .content-set {
          height: 120px;
          padding: 40px;
          background: #9595af;
        }
        .content-display {
          top:0px;
          bottom: 0px;
          height: 100%;;
          padding: 20px;
          position: relative;
          background: #898da5;
          display: flex;
          .content-index {
            background: #cdd2f0;
            flex:0 0 180px;
            width: 180px;
            margin-right: 20px;
          }
          .content-text {
            flex:1;
            top:60px;
            .edit_container {
              top: 0px;
            }
          }
        }
      }
    }
  }

</style>
