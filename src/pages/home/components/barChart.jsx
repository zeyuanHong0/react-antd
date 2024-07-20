import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarChart = ({ title }) => {
  const option = {
    title: {
      text: title,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  const echartsRef = useRef(null);
  useEffect(() => {
    const chartDom = echartsRef.current;
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div id="main" ref={echartsRef} style={{ width: 400, height: 400 }}></div>
    </div>
  );
};

export default BarChart;
