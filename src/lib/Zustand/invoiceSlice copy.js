import { create } from "zustand";
import moment from "moment";
import data from "../assets/data/data.json";
import getForwardDate from "../fuction/forwardDate";
import generateID from "../fuction/generateId";

const today = moment().format("YYYY-MM-DD");

const useInvoiceStore = create((set, get) => ({
  // State
  allInvoice: data,
  filteredInvoice: [],
  invoiceById: null,

  // Filter invoice by status
  filterInvoice: (status) => {
    const { allInvoice } = get();
    if (status === "") {
      set({ filteredInvoice: allInvoice });
    } else {
      const filteredData = allInvoice.filter((invoice) => invoice.status === status);
      set({ filteredInvoice: filteredData });
    }
  },

  // Get invoice by ID
  getInvoiceById: (id) => {
    const { allInvoice } = get();
    const invoice = allInvoice.find((item) => item.id === id);
    set({ invoiceById: invoice });
  },

  // Delete invoice by ID
  deleteInvoice: (id) => {
    const { allInvoice } = get();
    const updatedInvoices = allInvoice.filter((invoice) => invoice.id !== id);
    set({ allInvoice: updatedInvoices });
  },

  // Update invoice status (e.g., from 'pending' to 'paid')
  updateInvoiceStatus: (id, status) => {
    const { allInvoice } = get();
    const updated = allInvoice.map((invoice) =>
      invoice.id === id ? { ...invoice, status } : invoice
    );
    set({ allInvoice: updated });
  },

  // Add a new invoice
  addInvoice: (invoiceData) => {
    const {
      description,
      paymentTerms,
      clientName,
      clientEmail,
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientStreet,
      clientCity,
      clientPostCode,
      clientCountry,
      item,
    } = invoiceData;

    const newInvoice = {
      id: `${generateID()}`,
      createdAt: today,
      paymentDue: getForwardDate(paymentTerms),
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status: "pending",
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: item,
      total: item.reduce((acc, i) => acc + Number(i.total), 0),
    };

    set((state) => ({
      allInvoice: [...state.allInvoice, newInvoice],
    }));
  },

  // Edit/update existing invoice by ID
  editInvoice: (invoiceData) => {
    const {
      description,
      paymentTerms,
      clientName,
      clientEmail,
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientStreet,
      clientCity,
      clientPostCode,
      clientCountry,
      item,
      id,
    } = invoiceData;

    set((state) => ({
      allInvoice: state.allInvoice.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              description,
              paymentTerms,
              clientName,
              clientEmail,
              senderAddress: {
                street: senderStreet,
                city: senderCity,
                postCode: senderPostCode,
                country: senderCountry,
              },
              clientAddress: {
                street: clientStreet,
                city: clientCity,
                postCode: clientPostCode,
                country: clientCountry,
              },
              items: item,
              total: item.reduce((acc, i) => acc + Number(i.total), 0),
            }
          : invoice
      ),
    }));
  },
}));

export default useInvoiceStore;
