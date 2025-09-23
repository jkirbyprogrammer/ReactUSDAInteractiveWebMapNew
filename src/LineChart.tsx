    import { Bar } from 'react-chartjs-2';
    import 'chart.js/auto';

    const LineChart = () => {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Sales',
          },
        },
      };

      return <Bar data={data} options={options} />;
    };

    export default LineChart;