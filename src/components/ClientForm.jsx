import { useState } from 'react';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCountry: '',
    clientCity: '',
    clientStreet: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    notes: '',
    status: '',
    currency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yuborilgan maʼlumotlar:', formData);
    // API orqali yuborish yoki boshqa amallarni bajarish
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Mijoz maʼlumotlari</h2>

      {/* Mijoz ismi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mijoz ismi</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Mijoz Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
        <input
          type="text"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* ...boshqa inputlar... */}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Saqlash
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
