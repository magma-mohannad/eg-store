import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useCartStore = create(
  immer((set) => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],

    addToCart: (product) =>
      set((state) => {
        state.cart.push(product);
      }),

    removeFromCart: (productId) =>
      set((state) => {
        state.cart = state.cart.filter((item) => item.id !== productId);
      }),
  }))
);

useCartStore.subscribe((state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
  console.log("Store changed:", state.cart);
});
