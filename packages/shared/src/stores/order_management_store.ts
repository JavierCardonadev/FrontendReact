import { create } from 'zustand';
import {CartItem} from "./cart_store";
import {UserItem} from "./invoice_store";
import {createJSONStorage, persist} from "zustand/middleware";

export interface Order {
  id: string;
  products: CartItem[];
  subtotal: number;
  total: number;
  shipping: number;
  tax: number;
  date: string;
  user: UserItem;
  status: 'Pendiente' | 'Pagado' | 'Cancelado';
}

interface OrderStore {
  orders: Order[];
  userOrders: (userId: number) => Order[];
  userOrderDetail: (userId: number, id: string) => Order | undefined;
  userOrderDetailAdmin: ( id: string) => Order | undefined;
  userOrdersAdmin: () => Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create(
    persist<OrderStore>((set, get) => ({
  orders: [],

  // Retorna las órdenes de un cliente específico
  userOrders: (userId: number) => {
    const orders = get().orders;
    return orders.filter((order) => order.user.id === userId);
  },

  // Retorna las órdenes de un cliente específico
  userOrderDetail: (userId: number, id: string) => {
    const orders = get().orders;
    return orders.find((order) => order.user.id === userId && order.id === id);
  },
  // Retorna las órdenes de un cliente específico
  userOrderDetailAdmin: (id: string) => {
    const orders = get().orders;
    return orders.find((order) => order.id === id);
  },

  userOrdersAdmin: () => {
    return get().orders;
  },

  // Añadir una nueva orden
  addOrder: (order: Order) => {
    set((state) => ({
      orders: [...state.orders, order],
    }));
  },
}),
    {
      name: "orderStorage", // Nombre para el almacenamiento en localStorage
      storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si deseas un alcance más corto
    }
  )
);