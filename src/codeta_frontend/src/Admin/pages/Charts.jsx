import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Pie, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const doughnutData = {
  labels: ['Category 1', 'Category 2', 'Category 3'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Revenue',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: true,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
    },
  ],
};

export default function Charts() {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Charts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-80">
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Distribution</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          <Doughnut data={doughnutData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$56,789</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">87%</p>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">42</p>
              <p className="text-sm text-gray-600">New Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}