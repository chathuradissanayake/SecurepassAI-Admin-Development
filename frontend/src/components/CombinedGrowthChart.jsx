import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getLastSixMonthsData = (data) => {
  const sortedData = sortDataByMonthAndYear(data);
  return sortedData.slice(-6);
};

const sortDataByMonthAndYear = (data) => {
  return data.sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1);
    const dateB = new Date(b.year, b.month - 1);
    return dateA - dateB;
  });
};

const CombinedGrowthChart = ({ data }) => {
  const userGrowthData = getLastSixMonthsData(data.userGrowth);
  const companyGrowthData = getLastSixMonthsData(data.companyGrowth);
  const doorGrowthData = getLastSixMonthsData(data.doorGrowth);

  const chartData = {
    labels: userGrowthData.map(item => `${monthNames[item.month - 1]} ${item.year}`),
    datasets: [
      {
        label: 'User Growth',
        data: userGrowthData.map(item => item.count),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Company Growth',
        data: companyGrowthData.map(item => item.count),
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: 'Door Growth',
        data: doorGrowthData.map(item => item.count),
        fill: false,
        backgroundColor: 'rgba(255,159,64,0.4)',
        borderColor: 'rgba(255,159,64,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-64 md:h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CombinedGrowthChart;