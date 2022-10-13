import { Chart, registerables } from "chart.js";
function makeChart(chartData) {
    Chart.register(...registerables);
    const canvasContext = document.getElementById('myChart').getContext('2d');
    const dataTest = {
        datasets: [{
                label: 'My testing 2',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [{ x: "a", y: 200 }, { x: "b", y: 210 }, { x: "c", y: 230 }]
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
