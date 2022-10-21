import {Chart, registerables } from "chart.js";
import {IDataStatistic} from "../types";

function makeChart(chartData: IDataStatistic["timestamp"], canvasSelector: string, label: string) {
  Chart.register(...registerables);
  const canvasContext = (<HTMLCanvasElement>document.querySelector(canvasSelector)).getContext('2d');

  const formattingData = [];
  for (let i = 0, length = chartData.length; i < length; i++) {
    formattingData.push({
      x: chartData[i].char,
      y: chartData[i].speed
    })
  }
  const dataTest = {
    datasets: [{
      label: label,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: formattingData
    }]
  }
  const config = {
    type: "line",
    data: dataTest,
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: function(value: any, index: any) {
              return this.getLabelForValue(value) + " ch/min"
            }
          }
        },
        x: {
          ticks: {
            callback: function (value: any, index: any) {
              if (this.getLabelForValue(value) === " ") {
                return "Space";
              }
              return this.getLabelForValue(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const label = context.dataset.label;

              return label;
            },
            beforeLabel: function(context: any) {
              let label = "avg speed - ";

              if(context.parsed.y) {
                label += context.parsed.y;
              }

              return label;
            }
          }
        }
      }
    }
  }

  const myChart = new Chart(
    canvasContext,
    // @ts-ignore
    config
  );
}

export default makeChart;