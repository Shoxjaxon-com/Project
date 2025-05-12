// src/lib/Zustand/invoiceStore.js
import { create } from "zustand";

const useInvoiceStore = create((set, get) => ({
  invoices: [],
  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
  invoiceById: (id) => {
    const invoices = get().invoices;
    return invoices.find((invoice) => invoice.id === id);
  },

  // 🔽 YANGI: Trigger holatlarini qo‘shish
  shouldRunAction: false,
  triggerAction: () => set({ shouldRunAction: true }),
  resetAction: () => set({ shouldRunAction: false }),
}));

export default useInvoiceStore;
