import { useCartStore } from "@/store";
import { Button } from "./ui/button";

function Product({ product }) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const { addToCart, removeFromCart, cart } = useCartStore((state) => state);

  return (
    <div className=" bg-zinc-400/10  rounded-xl p-6 hover:shadow-xl shadow-zinc-500 dark:shadow-zinc-100/70 transition-shadow cursor-pointer">
      <div className="flex justify-center items-center mb-2 ">
        <img
          src={product.thumbnail}
          loading="lazy"
          className="w-full max-w-[180px] h-auto aspect-square object-contain sm:max-w-[140px] md:max-w-[180px] lg:max-w-[220px]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {product.title}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
            {product.description}
          </p>
        </div>
        <div className="flex 2xl:flex-row flex-col justify-between items-center my-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">${discountedPrice}</h2>
            <p className="text-zinc-600 dark:text-zinc-100 text-lg line-through">
              ${product.price}
            </p>
          </div>
          {cart.length > 0 && cart.find((item) => item.id === product.id) ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(product.id);
              }}
              className="mt-1.5 bg-rose-800 hover:bg-rose-700 transition"
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="mt-1.5"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
