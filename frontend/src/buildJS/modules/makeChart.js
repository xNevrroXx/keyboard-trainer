import { Chart, registerables } from "chart.js";
function makeChart(chartData) {
    Chart.register(...registerables);
    const canvasContext = document.getElementById('myChart').getContext('2d');
    const formattingData = [];
    for (let i = 0, length = chartData.length; i < length; i++) {
        formattingData.push({
            x: chartData[i].char,
            y: chartData[i].speed
        });
    }
    const dataTest = {
        datasets: [{
                label: 'My testing 2',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: formattingData
            }]
    };
    const config = {
        type: "line",
        data: dataTest,
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        callback: function (value, index) {
                            return this.getLabelForValue(value) + " ch/min";
                        }
                    }
                },
                x: {
                    ticks: {
                        callback: function (value, index) {
                            return this.getLabelForValue(value);
                        }
                    }
                }
            }
        }
    };
    const myChart = new Chart(canvasContext, 
    // @ts-ignore
    config);
}
export default makeChart;
