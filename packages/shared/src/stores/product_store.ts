import { create } from "zustand";
import { mockProducts } from "../constants/mockProductData";
import {createJSONStorage, persist} from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  tax: number;
}

interface ProductStore {
  products: Product[]; // Lista de productos
  setProducts: (products: Product[]) => void; // Método para actualizar los productos
  reduceStock: (productId: number, quantity: number) => void; // Reducir stock
  addStock: (productId: number, quantity: number) => void; // Aumentar stock
}

// Creación de la store
export const useProductStore = create(
    persist<ProductStore>((set) => ({
        products: mockProducts,
        setProducts: (products) => set({ products }),
        reduceStock: (productId, quantity) =>
            set((state) => ({
                products: state.products.map((product) =>
                    product.id === productId
                        ? { ...product, stock: product.stock - quantity }
                        : product
                ),
            })),
        addStock: (productId, quantity) =>
            set((state) => ({
                products: state.products.map((product) =>
                    product.id === productId
                        ? { ...product, stock: product.stock + quantity }
                        : product
                ),
            })),
    }),
        {
          name: "productStorage", // Nombre para el almacenamiento en localStorage
          storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si deseas un alcance más corto
        }
    )
);