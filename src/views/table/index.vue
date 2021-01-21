<template>
  <div class="app-container">
    <el-table
      v-show="!info"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PageViews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="todo" width="200">
        <template slot-scope="scope">
          <el-button @click="toInfo">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view v-show="info" />
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      info: false,
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      this.list = [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)',
        status: 'success'
      }]
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    toInfo() {
      this.info = true
      const id = 1
      this.$router.push({
        path: `/example/table/tableInfo/${id}`
      })
    }
  }
}
</script>
