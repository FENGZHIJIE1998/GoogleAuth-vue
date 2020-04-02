<template>
  <div class="showCode">
    <div class="row">
      别名：
      <el-input
        class="input"
        id="name"
        type="text"
        placeholder="请输入别名"
        v-model="name"
        clearable
        @keyup.enter.native="add"
      />
    </div>
    <div class="row">
      密钥：
      <el-input
        class="input"
        id="secretKey"
        type="text"
        placeholder="请输入密钥"
        v-model="secretKey"
        clearable
        @keyup.enter.native="add"
      />
    </div>
    <div class="row">
      <el-button @click="add" type="success" plain round>新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      secretKey: ""
    };
  },
  methods: {
    /**
     * 新增
     */
    add() {
      // 判断输入数据
      if (this.name == "" || this.secretKey == "") {
        this.$message({
          showClose: true,
          message: "请正确输入数据",
          type: "warning",
          duration: "1000"
        });
        return;
      }

      this.$axios({
        method: "post",
        url: "/googleauth/add",
        data: {
          name: this.name,
          secretKey: this.secretKey
        }
      }).then(result => {
        var data = result.data;
        if (data.status === 200) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
            duration: "600"
          });
          this.name = "";
          this.secretKey = "";
        } else if (data.status === 400) {
          this.$message({
            showClose: true,
            message: "添加失败，原因:" + data.msg,
            type: "error",
            duration: "3000"
          });
        } else {
          this.$message({
            showClose: true,
            message: "添加失败，请联系管理员",
            type: "error",
            duration: "3000"
          });
        }
      });
    }
  }
};
</script>


<style  scoped>
.input {
  width: 300px;
  margin: 0;
  padding: 0;
}

.row {
  padding: 10px 0px;
}
</style>
