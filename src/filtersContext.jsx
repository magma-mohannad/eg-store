import { createContext, useContext } from "react";
import { useImmer } from "use-immer";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useImmer({
    titleOrder: "noThing",
    category: "noThing",
    priceOrder: "noThing",
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
