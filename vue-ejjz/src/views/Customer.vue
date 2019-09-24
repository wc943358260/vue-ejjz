<template>
  <!-- 顾客管理 -->
  <div class="customer">
    <!-- 按钮 -->
    <div class="btns">
      <el-input v-model="search" placeholder="请输入内容" size="small" style="width:30%;margin:0 0.5em 1em 0"></el-input>
      <el-button @click="toSearchHandler" type="primary" icon="el-icon-search" size="small">搜索</el-button>
      <el-button @click="toAddHandler" type="primary" icon="el-icon-plus" size="small">添加</el-button>
      <el-button @click="toBatchDeleteHandler" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
    </div>
    <!-- 按钮 -->
    <!-- 表格 -->
    <div class="tbls">
      <el-table :data="tableData" style="width: 100%" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="realname" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" width="180"> </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="slot">
            <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a> &nbsp;&nbsp;
            <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        style="margin-top:0.5em;text-align:center"
        background
        layout="prev, pager, next"
        :total="1000"
        :page-size="10">
      </el-pagination>
    </div>
    <!-- / 表格 -->
    <!-- 模态框 -->
    <el-dialog title="收货地址" :visible="dialogFormVisible" @close="closeDialog">
      <!-- {{form}} -->
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
export default {
  data(){
    return {
      name:"customer",
      tableData:[],
      ids:[],
      dialogFormVisible:false,
      form:{},
      formLabelWidth: '100px',
      search:'',
    }
  },
  created(){
    this.reloadData();
  },
  methods:{
    submitHandler(){
      var url ="http://134.175.100.63:6677/customer/saveOrUpdate";
      $.post(url,this.form,(result)=>{
        this.closeDialog();
        this.reloadData();-
        this.$message({
          showClose: true,
          message: '新建成功',
          type: 'success'
        });
      });
    },
    closeDialog(){
      this.dialogFormVisible = false;
    },
    toAddHandler(){
      this.form = {};
      this.dialogFormVisible = true;
    },
    // 去删除
    toDeleteHandler(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url ="http://134.175.100.63:6677/customer/deleteById";
          $.get(url,{id},(result)=>{
            this.reloadData();
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration:500,
          });          
        });       
    },
    // 批量删除
    toBatchDeleteHandler(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          duration:500,
      }).then(()=>{
        // console.log(this.ids);
        let data = qs.stringify({ids:this.ids},{ indices: false });
        // console.log(data);
        var url ="http://134.175.100.63:6677/customer/batchDelete";
        $.post(url,data,(result)=>{
          // console.log(result);
        });
        this.reloadData();
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration:500,
        });  
      })
    },
    // 搜索
    toSearchHandler(){
      // alert(this.search);

    },
    toUpdateHandler(row){
      this.dialogFormVisible = true;
      this.form = row;
    },

    // 重载数据
    reloadData(){
      var url ="http://134.175.100.63:6677/customer/findAll";
      $.get(url,(result)=>{
        this.tableData = result.data;
      });
    },
    // 当复选按钮发生变化
    handleSelectionChange(val){
      this.ids = val.map(item=>item.id);
      var ids = this.ids;
      // console.log(ids);
      // var url ="http://134.175.100.63:6677/customer/batchDelete";
      // $.post(url,ids,(result)=>{
      //   console.log(result);
      // })
    }
  }
}
</script>
<style scoped>
  
</style>