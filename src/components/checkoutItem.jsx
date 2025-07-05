import { Link } from "react-router-dom";

function CheckOutItem({ product }) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <Link to={`/${product.id}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-16 h-16 mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">${discountedPrice}</h2>
              <p className="text-zinc-600 text-lg line-through">
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
            onChange={(e) => {
              if (e.target.value < product.minimumOrderQuantity) {
                e.target.value = product.minimumOrderQuantity;
              }
            }}
          />
          <span className="text-sm text-zinc-500">
            (Min: {product.minimumOrderQuantity || 1})
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CheckOutItem;
