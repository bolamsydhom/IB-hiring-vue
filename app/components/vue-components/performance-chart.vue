<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
    <span>{{ newDateRange }}</span>
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import store from "../../store";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },
  props: ["dateRange"],
  watch: {
    // This would be called anytime the value of dateRange changes
    dateRange(newValue, oldValue) {
      // you can do anything here with the new value or old/previous value
      console.log("dateRange", this.dateRange);
      this.newDateRange = this.dateRange;
    },
  },
  data() {
    return {
      chartData: [],
      newDateRange: "1",
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
          boundaryGap: false,
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
        visualMap: {
          left: "right",
          top: "top",
          min: 0,
          max: 100,
          pieces: [
            {
              lte: 50,
              color: "#c04444",
            },
            {
              gt: 50,
              lte: 80,
              color: "#c0a944",
            },
            {
              gt: 80,
              color: "#44c07c",
            },
          ],
        },
      };
    },

    xAxisData() {
      return this.posts.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.posts.map((item) => +item.performance * 100);
    },
    posts() {
      return store.state.performanceData;
    },
  },

  mounted() {
    store.dispatch("getPosts");
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
  },
};
</script>
