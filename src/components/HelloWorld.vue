<template>
  <div>
    <p>Chọn tháng/năm</p>
    <div class="month-container">
      <month-picker-input :no-default="true" @input="changeTxtMonth" lang="vi"></month-picker-input>

      <p class="pCurrentMY">{{ crrMonthYear }}</p>
    </div>
  </div>
</template>

<script>
import { MonthPickerInput } from "vue-month-picker";

const monthNames = ["Tháng một", "Tháng hai", "Tháng ba", "Tháng bốn", "Tháng năm", "Tháng sáu",
  "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"];
const crrDate = new Date();

export default {
  name: "HelloWorld",
  data() {
    return {
      crrMonthYear: monthNames[crrDate.getMonth()] + "/" + crrDate.getFullYear().toString(),
      date: {
        from: null,
        to: null,
        month: null,
        year: null
      }
    };
  },
  components: {
    MonthPickerInput
  },
  methods: {
    changeTxtMonth(date) {
      this.date = date;
      this.crrMonthYear = date.month + "/" + date.year;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.month-container {
  width: 90%;
  text-align: center;
  margin: auto;
}
</style>