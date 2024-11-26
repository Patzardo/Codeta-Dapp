import Card from "../components/MainBodyComponents/Card";
import UserTable from "../components/MainBodyComponents/UserTable";
import ProductList from "../components/MainBodyComponents/ProductList";
import SimpleForm from "../components/MainBodyComponents/SimpleForm";
import SalesChart from "../components/MainBodyComponents/SalesChart";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const MainBody = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-4xl font-serif font-bold mb-8">Admin Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 mt-10">
        <Card
          title="Total Users"
          value="1,234"
          icon={<Users className="text-blue-500" />}
          color="bg-blue-100"
        />
        <Card
          title="Total Products"
          value="567"
          icon={<ShoppingCart className="text-yellow-500" />}
          color="bg-yellow-100"
        />
        <Card
          title="Revenue"
          value="$89,123"
          icon={<DollarSign className="text-green-500" />}
          color="bg-green-100"
        />
        <Card
          title="Growth"
          value="23%"
          icon={<TrendingUp className="text-orange-500" />}
          color="bg-orange-100"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <UserTable />
          </div>
          <SalesChart />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <SimpleForm />
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
