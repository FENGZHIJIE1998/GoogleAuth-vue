<template>
  <div>
    <el-button class="logout" type="danger" @click="logout" circle>遁</el-button>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="name" label="别名" width="180"></el-table-column>
      <el-table-column prop="code" label="验证码" width="180"></el-table-column>
      <el-table-column prop="remainingTime" label="过期时间"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="我再想想"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
export default {
  methods: {
    //修改表格颜色
    tableRowClassName({ row }) {
      if (row.remainingTime === "刷新中...") {
        return "error-row";
      } else if (row.remainingTime === "读取中...") {
        return "warning-row";
      }
      return "success-row";
    },
    /**
     * 列出数据
     */
    list() {
      this.$axios({
        method: "GET",
        url: "/googleauth/listAll",
        data: {}
      }).then(result => {
        var data = result.data;
        if (data.status === 200) {
          this.tableData = data.data;
          //为每一行设置倒计时
          for (var i = this.tableData.length - 1; i >= 0; i--) {
            this.setEndTime(this.tableData[i]);
          }
        } else {
          this.$message({
            showClose: true,
            message: "获取失败，请联系管理员",
            type: "error",
            duration: "3000"
          });
          return;
        }
      });
    },
    /**
     * 退出
     */
    logout() {
      this.$axios({
        method: "POST",
        url: "/googleauth/logout",
        data: {}
      }).then(result => {
        //var data = result.data;
        var data = result.data;
        if (data.status === 200) {
          this.$message({
            showClose: true,
            message: "您已安全退出系统",
            type: "success",
            duration: "3000"
          });
          this.$store.commit("setToken", "");
          this.$router.push({path:'/'});
        }
      });
    },
    /**
     * 删除数据
     */
    del(id) {
      this.$axios({
        method: "DELETE",
        url: "/googleauth/delete?id=" + id
      }).then(result => {
        var data = result.data;
        if (data.status === 200) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
            duration: "600"
          });
        } else {
          this.$message({
            showClose: true,
            message: "删除失败，请联系管理员",
            type: "error",
            duration: "3000"
          });
          return;
        }
      });
      //找到数组下标
      var index = this.tableData.findIndex(item => {
        if (item.id == id) {
          return true;
        }
      });
      //删除数据
      var entity = this.tableData.splice(index, 1)[0];
      //清理定时器
      clearInterval(entity.interval);
    },
    /**
     * 定时器刷新
     */
    setEndTime(entity) {
      var that = this;
      that.$set(entity, "remainingTime", "读取中...");
      var interval = setInterval(function timestampToTime() {
        //计算剩余的毫秒数
        var date = new Date(entity.expire) - new Date();
        if (date <= 0) {
          that.clearTimer();
          //clearInterval(interval);
          that.list();
        } else {
          const d = Math.floor(date / 1000 / 60 / 60 / 24);
          const h = Math.floor((date / 1000 / 60 / 60) % 24);
          const m = Math.floor((date / 1000 / 60) % 60);
          const s = Math.floor((date / 1000) % 60);
          const remainingTime = `剩余${
            d > 0 ? d + "天" : ""
          }${that.formatNumber(h)}:${that.formatNumber(m)}:${that.formatNumber(
            s
          )}`;
          that.$set(entity, "remainingTime", remainingTime);
        }
      }, 1000);
      this.timer.push(interval);
      this.$set(entity, "interval", interval);
    },
    formatNumber(n) {
      // return n.toString().padStart(2, '0');  // 用padStart方法要注意兼容问题
      n = n.toString();
      return n[1] ? n : "0" + n;
    },

    clearTimer() {
      //清理定时器
      if (this.timer.length > 0) {
        for (var i = this.timer.length - 1; i >= 0; i--) {
          clearInterval(this.timer[i]);
        }
      }
    }
  },
  data() {
    return {
      //code 数据
      tableData: [],
      // 定时器
      timer: []
    };
  },
  created() {
    // this.list();
  },
  mounted() {
    this.list();
  },
  destroyed() {
    this.clearTimer();
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .error-row {
  background: rgb(253, 235, 230);
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>