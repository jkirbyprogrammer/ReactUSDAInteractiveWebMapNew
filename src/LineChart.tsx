import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
    const data = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Presidential',
                data: [59, 60, 47, 63, 32, 80, 95],
                fill: true,
                backgroundColor: 'rgba(31, 171, 24, 0.5)',
                borderColor: 'rgb(31, 171, 24)',
                tension: 0.3
            },
            {
                label: 'US Secretary of Ag',
                data: [200, 178, 266, 217, 230, 299, 256],
                fill: true,
                backgroundColor: 'rgba(24, 105, 171, 0.5)',
                borderColor: 'rgb(24, 105, 171)',
                tension: 0.3
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Presidential',
            },
            legend:{
                display: true,
                position: "bottom" as const,
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'white',
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    color: 'white',
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default LineChart;