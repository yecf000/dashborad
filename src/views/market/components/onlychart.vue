<template>
  <div ref="chartDom" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts";
 
import { toRefs, defineProps } from 'vue'
const props = defineProps({
  dataList: Array,
  color: Array,
})
const {dataList,color} = toRefs(props)
// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(async () => {
  await nextTick(); // 确保DOM已经渲染完成
  chartInstance = echarts.init(chartDom.value);
  const grid = {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  };
  const option = {
    grid:grid,
    xAxis: {
      show: false,
      axisLine: { show: false },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      type: "category",
      boundaryGap: false,
      // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      min:Math.min(dataList.value),
      max:Math.max(dataList.value),
      show:false,
      splitNumber:5,
      splitLine: {
        show: false,
      },
      minorTick: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      type: "value",
    },
    series: [
      {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: color.value[0] // 0% 处的颜色
            }, {
              offset: 1, color: color.value[1] // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        showSymbol: false,
        data: dataList.value,
        type: 'line'
      }
    ]
  };
  chartInstance.setOption(option);
});

// 销毁ECharts实例
onUnmounted(() => {
  if (chartInstance != null && chartInstance.dispose) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
/* 添加一些CSS样式来美化图表容器（可选） */
</style>
