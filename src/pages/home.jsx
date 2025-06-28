import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { lazy, Suspense } from "react";

const Product = lazy(() => import("@/components/product"));

function Home() {
  const LIMIT = 30; // Number of products per page

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    initialPageParam: 0, // Start with the first page

    queryFn: async ({ pageParam }) => {
      const response = await axios(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`
      );
      return response.data;
    },

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * LIMIT; // Total products loaded so far
      if (loaded < lastPage.total) {
        return loaded; // next skip value
      }
      return undefined; // no more pages
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error.message}
      </div>
    );
  }
  const products = data.pages.flatMap((page) => page.products);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <h1 className="text-xl bg-gray-600 text-center">
              No products was found
            </h1>
          )}
        </div>
        <div className="w-full flex justify-center items-center m-8">
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          ) : (
            <h1 className="text-sm text-center text-gray-600">
              no more products to load
            </h1>
          )}
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
