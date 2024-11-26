

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const SalesChart = () => {
  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
      <div className="flex items-end h-64 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(item.sales / maxSales) * 100}%` }}
            >
              <div className="text-xs text-white text-center mt-1">${item.sales}</div>
            </div>
            <span className="text-xs mt-1">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <span className="text-sm text-gray-500">0</span>
        <span className="text-sm text-gray-500">${maxSales}</span>
      </div>
    </div>
  );
};

export default SalesChart;