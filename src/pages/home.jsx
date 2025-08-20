import AppSidebar from "@/components/appSidebar";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/filtersContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const Product = lazy(() => import("@/components/product"));

function Home() {
  const LIMIT = 30; // Number of products per page
  const navigate = useNavigate();
  const { filters } = useFilters();

  // Function to build URL based on current filters
  function buildFilteredURL() {
    let baseURL = "https://dummyjson.com/products";
    let params = [];

    // Handle category filter first (changes the endpoint)
    if (filters.category !== "noThing") {
      baseURL = `https://dummyjson.com/products/category/${filters.category}`;
    }

    // Handle sorting
    if (filters.titleOrder !== "noThing") {
      params.push(`sortBy=title&order=${filters.titleOrder}`);
    } else if (filters.priceOrder !== "noThing") {
      params.push(`sortBy=price&order=${filters.priceOrder}`);
    }

    // Combine base URL with parameters
    const queryString = params.length > 0 ? `?${params.join("&")}` : "?";
    return baseURL + queryString;
  }

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const filteredURL = buildFilteredURL();
      const separator =
        filteredURL.includes("?") && !filteredURL.endsWith("?") ? "&" : "";
      const finalURL = `${filteredURL}${separator}limit=${LIMIT}&skip=${pageParam}`;

      const response = await axios(finalURL);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * LIMIT;
      if (loaded < lastPage.total) {
        return loaded;
      }
      return undefined;
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
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() => navigate(`/${product.id}`)}
              >
                <Product product={product} />
              </div>
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
