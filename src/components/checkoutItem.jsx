import { useNavigate } from "react-router-dom";

function CheckOutItem({ product }) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  const navigate = useNavigate();

  return (
    <div
      key={product.id}
      onClick={() => navigate(`/${product.id}`)}
      className="flex flex-col sm:flex-row items-center justify-between p-4 cursor-pointer border rounded-xl mb-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      <div className="flex items-center">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-30 h-30 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">${discountedPrice}</h2>
            <p className="text-zinc-600 dark:text-zinc-100 text-lg line-through">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="font-medium">
          Quantity :
        </label>
        <input
          id="quantity"
          type="number"
          min={product.minimumOrderQuantity || 1}
          defaultValue={product.minimumOrderQuantity || 1}
          className="border rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onBlur={(e) => {
            if (e.target.value < product.minimumOrderQuantity) {
              e.target.value = product.minimumOrderQuantity;
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="text-sm text-zinc-500 dark:text-zinc-300">
          (Min: {product.minimumOrderQuantity || 1})
        </span>
      </div>
    </div>
  );
}

export default CheckOutItem;
