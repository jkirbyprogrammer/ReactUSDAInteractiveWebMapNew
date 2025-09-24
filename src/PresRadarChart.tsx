import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const PresRadarChart = () => {
    const data = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Wildfires',
                data: [4, 0, 3, 7, 1, 1, 8],
                fill: true,
                backgroundColor: 'rgba(252, 3, 40, 0.5)',
                borderColor: 'rgb(252, 3, 40)',
                pointBackgroundColor: 'rgb(252, 3, 40)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(252, 3, 40)'
            },
            {
                label: 'Hurricane',
                data: [10, 5, 9, 7, 5, 6, 9],
                fill: true,
                backgroundColor: 'rgba(31, 171, 24, 0.6)',
                borderColor: 'rgb(31, 171, 24)',
                pointBackgroundColor: 'rgb(31, 171, 24)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(31, 171, 24)'
            },
            {
                label: 'Winter',
                data: [5, 8, 2, 9, 8, 17, 10],
                fill: true,
                backgroundColor: 'rgba(24, 105, 171, 0.6)',
                borderColor: 'rgb(24, 105, 171)',
                pointBackgroundColor: 'rgb(24, 105, 171)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(24, 105, 171)'
            },
            {
                label: 'Storms',
                data: [40, 47, 33, 40, 18, 56, 68],
                fill: true,
                backgroundColor: 'rgba(235, 174, 52, 0.6)',
                borderColor: 'rgb(235, 174, 52)',
                pointBackgroundColor: 'rgb(235, 174, 52)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(235, 174, 52)'
            }
        ],
    };

    const options = {
        responsive: true,
            elements: {
                line: {
                    borderWidth: 3
                }
        },     
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
                r: {
                        pointLabels: {
                            color: 'white' // Change point label color to red
                        },
                        grid:
                        {
                            color: 'white'
                        },
                        ticks:
                        {
                            color: 'white',
                            backdropColor: '#212529'
                        },
                        angleLines:
                        {
                            color: 'white'
                        }
                    }
        }
    };

    return <Radar data={data} options={options} />;
};

export default PresRadarChart;