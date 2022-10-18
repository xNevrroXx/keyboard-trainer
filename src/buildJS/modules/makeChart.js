import { Chart, registerables } from "chart.js";
function makeChart(chartData, canvasSelector) {
    Chart.register(...registerables);
    const canvasContext = document.querySelector(canvasSelector).getContext('2d');
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
                        label: function (context) {
                            const label = context.dataset.label;
                            return label;
                        },
                        beforeLabel: function (context) {
                            let label = "avg speed - ";
                            if (context.parsed.y) {
                                label += context.parsed.y;
                            }
                            return label;
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
