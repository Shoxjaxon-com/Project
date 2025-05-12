import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  invoices: [],

  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),

  updateInvoiceStatus: (id, status) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status } : invoice
      ),
    })),

  setInvoices: (data) => set({ invoices: data }),
}));

export default useInvoiceStore;
