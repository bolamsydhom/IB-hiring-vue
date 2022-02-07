<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component v-bind:dateRange="value" />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import {DatePicker} from 'element-ui'




export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    'el-date-picker': DatePicker
  },
  data() {
    return {
      pickerOptions: {
      },
      value: "",
    };
  },
};
</script>
