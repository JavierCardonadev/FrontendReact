import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {CartItem} from "./cart_store";

export interface UserItem {
    id: number,
    name: string,
    address: string,
    country: string,
    phone: number,
    email: string
}

export interface InvoiceItem {
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

interface InvoiceState {
    invoice: InvoiceItem | null;
    invoices: InvoiceItem[] | [];
    setInvoice: (invoice: InvoiceItem) => void;
    addInvoiceToHistory: (invoice: InvoiceItem) => void;
    generateInvoice: (cart: CartItem[], shipping: number, userData: UserItem) => Promise<InvoiceItem>;
    getUserInvoices: (userId: number) => InvoiceItem[];
    getUserInvoiceDetail: (userId: number, id: string) => InvoiceItem | undefined;
    getUserInvoiceDetailAdmin: (id: string) => InvoiceItem | undefined;
    getAllInvoices: () => InvoiceItem[];
}

export const useInvoiceStore = create(
    persist<InvoiceState>((set, get) => ({

    invoice: null,
    setInvoice: (invoice: InvoiceItem) => set({ invoice }),

    invoices: [],
    addInvoiceToHistory: (invoice: InvoiceItem) => {
        const currentInvoices = get().invoices;
        set({ invoices: [...currentInvoices, invoice] });
    },
    getUserInvoices: (userId: number) => {
        const invoices = get().invoices;
        return invoices.filter((invoice) => invoice.user.id === userId);
    },
    getUserInvoiceDetail: (userId: number, id: string) => {
        const invoices = get().invoices;
        const invoice = invoices.find((invoice) => invoice.user.id === userId && invoice.id === id);
        return invoice;
    },
    getUserInvoiceDetailAdmin: (id: string) => {
        const invoices = get().invoices;
        const invoice = invoices.find((invoice) => invoice.id === id);
        return invoice;
    },

    getAllInvoices: () => {
        return get().invoices;
    },

    generateInvoice: async (cart: CartItem[], shipping: number, userData: UserItem): Promise<InvoiceItem> => {
        try {
            const subtotal = cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
            const tax = cart.reduce((tax, item) => tax + (item.price * item.quantity) * item.tax, 0);
            const invoice: InvoiceItem = {
                id: `INV-${Math.floor(Math.random() * 10000)}`,
                date: new Date().toLocaleDateString(),
                products: cart,
                subtotal,
                shipping,
                tax,
                total: subtotal + tax + shipping,
                user: userData,
                status: 'Pagado',
            };

            set({ invoice });
            get().addInvoiceToHistory(invoice);
            return invoice;
        } catch (error) {
            console.error("Error durante la generacion de la factura:", error);
            return {} as InvoiceItem;
        }
    },
}),
    {
        name: "invoiceStorage", // Nombre para el almacenamiento en localStorage
        storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si deseas un alcance más corto
    }
    )
);