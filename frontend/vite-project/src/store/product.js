import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.description) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    console.log(res.url)
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created successfully" };
  },
}));

export default useProductStore;
