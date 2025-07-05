import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Sidebar, SidebarContent } from "./ui/sidebar";
import { useFilters } from "@/filtersContext";

function AppSidebar({
  categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ],
}) {
  const { filters, setFilters } = useFilters();

  return (
    <Sidebar side="right" className="h-screen sticky top-0 z-50">
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Filters</h1>
          {/* Title Sort */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Title Order
            </label>
            <Select
              value={filters.titleOrder}
              onValueChange={(val) =>
                setFilters((draft) => {
                  draft.titleOrder = val;
                })
              }
            >
              <SelectTrigger className="w-full">
                {filters.titleOrder === "noThing"
                  ? "Choose a filter"
                  : filters.titleOrder}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noThing">No filter</SelectItem>
                <SelectItem value="asc">A → Z</SelectItem>
                <SelectItem value="desc">Z → A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              value={filters.category}
              onValueChange={(val) =>
                setFilters((draft) => {
                  draft.category = val;
                })
              }
            >
              <SelectTrigger className="w-full">
                {filters.category === "noThing"
                  ? "Choose a filter"
                  : filters.category}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noThing">No filter</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Price Sort */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price Order
            </label>
            <Select
              value={filters.priceOrder}
              onValueChange={(val) =>
                setFilters((draft) => {
                  draft.priceOrder = val;
                })
              }
            >
              <SelectTrigger className="w-full">
                {filters.priceOrder === "noThing"
                  ? "Choose a filter"
                  : filters.priceOrder}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noThing">No filter</SelectItem>
                <SelectItem value="asc">Low → High</SelectItem>
                <SelectItem value="desc">High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
