import Product from "@/components/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const LIMIT = 15; //? Number of products per page

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    initialPageParam: 0, //? Start with the first page

    queryFn: async ({ pageParam }) => {
      const response = await axios(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`
      );
      return response.data;
    },

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * LIMIT; //? Total products loaded so far
      if (loaded < lastPage.total) {
        return loaded; // next skip value
      }
      return undefined; // no more pages
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }
  const products = data.pages.flatMap((page) => page.products);

  return (
    <div>
      <div>
        {" "}
        {products && products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </ul>
        ) : (
          <div>No products found.</div>
        )}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
