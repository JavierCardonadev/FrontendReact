import { create } from "zustand";
import { useProductStore } from "./product_store";
import {createJSONStorage, persist} from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  tax: number;
}

interface Cart_store {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  clearCartShop: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create(
    persist<Cart_store>((set, get) => ({
  cart: [],
  // Agregar producto al carrito
  addToCart: (productId, quantity) => {
    const productStore = useProductStore.getState();
    const product = productStore.products.find((p) => p.id === productId);

    if (!product) {
      console.error("Producto no encontrado");
      return;
    }

    if (product.stock < quantity) {
      console.error("Stock insuficiente");
      return;
    }

    // Actualizar el carrito
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        return {
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      // Si el producto no está en el carrito, agregarlo
      return {
        cart: [
          ...state.cart,
          { id: product.id, name: product.name, price: product.price, quantity, category: product.category, tax: product.tax, image: product.image },
        ],
      };
    });
  },

  // Eliminar producto completo del carrito
  removeFromCart: (productId) => {
    const productStore = useProductStore.getState();
    const cartItem = get().cart.find((item) => item.id === productId);

    if (!cartItem) return;

    // Regresar el stock eliminado al inventario
    productStore.addStock(productId, cartItem.quantity);

    // Eliminar el producto del carrito
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  // Limpiar el carrito
  clearCart: () => {
    const productStore = useProductStore.getState();

    // Volver a agregar el stock de todos los productos al inventario
    get().cart.forEach((item) => {
      productStore.addStock(item.id, item.quantity);
    });
    set({ cart: [] });
  },

  // Limpiar el carrito luego de la compra
  clearCartShop: () => {
    // Vaciar el carrito
    set({ cart: [] });
  },

  // Actualizar la cantidad de un producto en el carrito
  updateQuantity: (productId, quantity) => {
    const productStore = useProductStore.getState();
    const product = productStore.products.find((p) => p.id === productId);
    const cartItem = get().cart.find((item) => item.id === productId);

    if (!product || !cartItem) {
      console.error("Producto no encontrado");
      return;
    }

    const difference = quantity - cartItem.quantity;

    if (product.stock < difference) {
      console.error("Stock insuficiente para actualizar la cantidad");
      return;
    }

    // Actualizar el stock
    productStore.reduceStock(productId, difference);

    // Actualizar el carrito
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
}),
    {
      name: "cartStorage", // Nombre para el almacenamiento en localStorage
      storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si deseas un alcance más corto
    }
  )
);