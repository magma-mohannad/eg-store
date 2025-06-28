import { Button } from "./ui/button";

function Product({ product }) {
  return (
    <div className=" bg-zinc-400/10 rounded-xl p-6 hover:shadow-xl shadow-zinc-500 transition-shadow cursor-pointer">
      <div className="flex justify-center items-center mb-2 ">
        <img
          src={product.thumbnail}
          loading="lazy"
          className="w-full max-w-[180px] h-auto aspect-square object-contain sm:max-w-[140px] md:max-w-[180px] lg:max-w-[220px]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-800 truncate">
            {product.title}
          </h1>
          <p className="text-sm text-zinc-600 truncate">
            {product.description}
          </p>
        </div>
        <div className="flex xl:flex-row flex-col justify-between items-center my-3">
          <span className="text-2xl font-semibold text-zinc-900">
            ${product.price}
          </span>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
