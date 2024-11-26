

const products = [
  { id: 1, name: "Product A", price: 19.99, stock: 50 },
  { id: 2, name: "Product B", price: 29.99, stock: 30 },
  { id: 3, name: "Product C", price: 39.99, stock: 20 },
];

const ProductList = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center border-b pb-2">
            <span>{product.name}</span>
            <div>
              <span className="text-sm text-gray-500 mr-4">${product.price}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;