import { Chart, registerables } from "chart.js";
function makeChart(chartStatistic) {
    Chart.register(...registerables);
    const canvasContext = document.getElementById('myChart').getContext('2d');
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];
    const data = {
        labels: labels,
        datasets: [{
                label: 'My testing',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: chartStatistic
            }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        display: true,
                        text: "seconds",
                        // callback: function(value: string, index: string, ticks: string) {
                        //   return value;
                        // }
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
