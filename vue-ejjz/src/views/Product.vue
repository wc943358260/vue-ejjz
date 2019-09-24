<template>
  <!-- 产品管理 -->
  <div class="product">
    <!-- 按钮 -->
    <div class="btns">
      <el-input v-model="search" placeholder="请输入内容" size="small" style="width:30%;margin:0 0.5em 1em 0"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
      <el-button @click="toHandleAdd" type="primary" icon="el-icon-plus" size="small">添加</el-button>
      <el-button @click="toHandleBatchdelete" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
    </div>
    <!-- 按钮 -->
    <!-- 表格 -->
    <div class="tbls">
      <el-table :data="ProductData" style="width: 100%" size="mini" @selection-change="toHandleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="id" label="id" width="180"> </el-table-column> -->
        <el-table-column prop="name" label="产品名" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" width="180"> </el-table-column>
        <el-table-column prop="price" label="价格" width="180"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="toHandleDelete(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button @click="toHandleUpdate(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        style="margin-top:0.5em;text-align:center"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <!-- 表格 -->
    <!-- 模态框 -->
    <el-dialog
      title="新增产品"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose">
      <!-- {{form}} -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="产品名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toHandleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
export default {
  data(){
    return {
      name:"product",
      ProductData:[],
      dialogVisible:false,
      form:{},
      search:'',
      ids:[],
    }
  },
  created(){
    this.reloadData();
  },
  methods:{
    toHandleAdd(){
      this.form = {};
      this.dialogVisible = true;
    },
    // 提交新建表单
    toHandleSubmit(){
      // console.log(this.form);
      var url ="http://134.175.100.63:6677/product/saveOrUpdate";
      $.post(url,this.form,(result)=>{
        this.handleClose();
        this.reloadData();-
        this.$message({
          showClose: true,
          message: '新建成功',
          type: 'success'
        });
      });
    },
    // 模态框关闭
    handleClose() {
      this.dialogVisible = false;
    },
    // 修改
    toHandleUpdate(row){
      console.log(row);
      this.dialogVisible = true;
      this.form = row;
    },
    // 删除
    toHandleDelete(id){
      // console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url ="http://134.175.100.63:6677/product/deleteById";
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
            duration: 500,
          });          
        });    
    },
    // 当复选按钮发生变化
    toHandleSelectionChange(val){
      this.ids = val.map(item=>item.id);
      var ids = this.ids;
      // console.log(ids);
    },
    // 批量删除
    toHandleBatchdelete(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          duration:500,
      }).then(()=>{
        let data = qs.stringify({ids:this.ids},{indices:false});
        var url ="http://134.175.100.63:6677/product/batchDelete";
        $.post(url,data,(result)=>{
          this.reloadData();
        });
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration:500,
        });  
      })
    },
    // 重载数据
    reloadData(){
      var url ="http://134.175.100.63:6677/product/findAll";
      $.get(url,(result)=>{
        this.ProductData = result.data;
        // console.log(this.ProductData);
      });
    },
  }
}
</script>
<style scoped>

</style>