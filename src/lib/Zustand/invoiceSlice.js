import { create } from 'zustand';
import moment from 'moment';
import data from '../../assets/data/data.json';
import getForwardDate from '../formatDate';
import generateID from '../Zustand/generateId';

const today = moment().format('YYYY-MM-DD');

const useInvoiceStore = create((set, get) => ({
  allInvoice: data,
  filteredInvoice: [],
  invoiceById: null,

  filterInvoice: (status) => {
    const allInvoice = get().allInvoice;
    if (status === '') {
      set({ filteredInvoice: allInvoice });
    } else {
      const filteredData = allInvoice.filter((invoice) => invoice.status === status);
      set({ filteredInvoice: filteredData });
    }
  },

  getInvoiceById: (id) => {
    const allInvoice = get().allInvoice;
    const invoice = allInvoice.find((item) => item.id === id);
    set({ invoiceById: invoice });
  },

  deleteInvoice: (id) => {
    const allInvoice = get().allInvoice;
    const updatedInvoices = allInvoice.filter((invoice) => invoice.id !== id);
    set({ allInvoice: updatedInvoices });
  },

  updateInvoiceStatus: (id, status) => {
    const updatedInvoices = get().allInvoice.map((invoice) =>
      invoice.id === id ? { ...invoice, status } : invoice
    );
    set({ allInvoice: updatedInvoices });
  },

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
      status: 'pending',
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

  editInvoice: (editedData) => {
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
    } = editedData;

    const updatedInvoices = get().allInvoice.map((invoice) =>
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
    );

    set({ allInvoice: updatedInvoices });
  },
}));

export default useInvoiceStore;
