import { Chart, registerables } from "chart.js";
function makeGraphic() {
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
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true
        }
    };
    const myChart = new Chart(canvasContext, 
    // @ts-ignore
    config);
}
export default makeGraphic;
