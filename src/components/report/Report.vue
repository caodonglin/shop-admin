<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!--1 为echarts准备一个具备大小宽高的Dom -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script src="lodash.js"></script>
<script>
/* 2导入 echarts */
import echarts from "echarts";
import _ from 'lodash'

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      /* 需要合并的对象 */
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '"4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  async mounted() {
    /* 3基于准备好的dom，初始化echarts实例 */
    var myChart = echarts.init(document.getElementById("main"));

    const { data: res } = await this.$http.get("reports/type/1");
    /* 4指定图表的配置项和数据 */
    const result = _.merge(res.data, this.options)
    /* 5展示数据 */
    myChart.setOption(result);
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
