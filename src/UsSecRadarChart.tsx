import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

// Radar chart component for US Secretary of Agriculture disaster declarations
const UsSecRadarChart = () => {
    // Data for the radar chart
    const data = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Wildfires',
                data: [2, 0, 1, 3, 0, 0, 4],
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
                data: [16, 3, 10, 4, 2, 2, 8],
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
                data: [6, 29, 30, 17, 16, 23, 4],
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
                data: [46, 74, 40, 44, 20, 39, 59],
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

    // Options for the radar chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
        // Chart.js v3 uses 'scales' for all axes, including radial axes in radar charts
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

    // Render the radar chart
    return <Radar data={data} options={options} />;
};

export default UsSecRadarChart;