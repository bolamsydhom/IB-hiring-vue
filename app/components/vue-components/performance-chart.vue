<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
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
      this.newDateRange = this.dateRange;
      // console.log(new Date(this.formatDate(this.chartData[0].date_ms)).getTime(), this.chartData[0].date_ms);
    },
    chartOptions() {
      this.chartOptions;
    },
  },
  data() {
    return {
      chartData: [],
      newDateRange: null,
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
      return this.getTheDataWithinDateRange();
      // return this.performanceData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
    performanceData() {
      this.chartData = store.state.performanceData;
      return store.state.performanceData;
    },
  },

  mounted() {
    store.dispatch("getPerformanceData");
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    getTheDataWithinDateRange() {

      let data = this.performanceData;
      if (!this.newDateRange) {
        return data.map((item) => this.formatDate(item.date_ms));
      } else {
        this.chartData = [];
        const xAxis = []
        data.filter((item) => {
          if (
            new Date(this.formatDate(item.date_ms)).getTime() >=
              new Date(this.dateRange[0]).getTime() &&
            new Date(this.formatDate(item.date_ms)).getTime() <=
              new Date(this.dateRange[1]).getTime()
          ) {
            this.chartData.push(item);
            xAxis.push(this.formatDate(item.date_ms));
          }
        });
        return xAxis;
      }
    },
  },
};
</script>
