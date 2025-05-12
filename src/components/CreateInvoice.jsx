import React, { useState } from "react";
import { addInvoice } from "../request";

function FormModal() {
  const [country, setCountry] = useState("United Kingdom");
  const [street, setStreet] = useState("19 Union Terrace");
  const [city, setCity] = useState("London");
  const [postCode, setPostCode] = useState("E1 3EZ");
  const [email, setEmail] = useState("alexgrim@mail.com");
  const [name, setName] = useState("Alex Grim");
  const [sendCountry, setSendCountry] = useState("United Kingdom");
  const [sendStreet, setSenderStreet] = useState("84 Church Way");
  const [sendCity, setSenderCity] = useState("Bradford");
  const [sendCode, setSendCode] = useState("BD1 9PB");
  const [data, setData] = useState("2021-08-18");
  const [sendData, setSendData] = useState("2021-08-19");
  const [desk, setDesk] = useState("Graphic Design");
  const [items, setItems] = useState([
    { name: "Banner Design", quantity: 1, price: 156, total: 156 },
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "name" ? value : Number(value);
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setItems(newItems);
  };

  const addNewItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
  };

  const generateInvoice = (status) => {
    const randomId = Math.trunc(Math.random() * 100000);
    const payment = "rt" + Math.trunc(Math.random() * 1000);

    return {
      id: randomId,
      createdAt: data,
      paymentDue: sendData,
      description: desk,
      paymentTerms: payment,
      clientName: name,
      clientEmail: email,
      status: status,
      senderAddress: {
        street: street,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientAddress: {
        street: sendStreet,
        city: sendCity,
        postCode: sendCode,
        country: sendCountry,
      },
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
    };
  };

  const handleSave = () => {
    const invoice = generateInvoice("draft");

    // Ma'lumotni API ga yuborish
    addInvoice(invoice)
      .then((res) => {
        console.log("Saved as draft", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleSending = () => {
    const invoice = generateInvoice("pending");

    // Ma'lumotni API ga yuborish
    addInvoice(invoice)
      .then((res) => {
        console.log("Sent successfully", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg text-start">
      <h2 className="text-2xl font-bold mb-6">New Invoice</h2>

      <p className="text-sm text-indigo-600 font-semibold mb-2">Bill From</p>
      <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={street} onChange={(e) => setStreet(e.target.value)} />
      <div className="flex gap-4 mt-2">
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>

      <p className="text-sm text-indigo-600 font-semibold mt-6 mb-2">Bill To</p>
      <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800 mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800 mt-2" value={sendStreet} onChange={(e) => setSenderStreet(e.target.value)} />
      <div className="flex gap-4 mt-2">
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={sendCity} onChange={(e) => setSenderCity(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={sendCode} onChange={(e) => setSendCode(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" value={sendCountry} onChange={(e) => setSendCountry(e.target.value)} />
      </div>

      <div className="flex gap-4 mt-6">
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800" type="date" value={sendData} onChange={(e) => setSendData(e.target.value)} />
      </div>

      <input className="w-full border px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-800 mt-4" value={desk} onChange={(e) => setDesk(e.target.value)} />

      <p className="font-bold mt-6">Item List</p>
      <div className="grid grid-cols-4 gap-4 mt-2 text-sm font-semibold text-gray-600">
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
      </div>

      <div className="gap-4 mt-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input className="w-full border px-2 py-1 rounded bg-gray-50" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} />
            <input className="w-20 border px-2 py-1 rounded bg-gray-50" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} />
            <input className="w-24 border px-2 py-1 rounded bg-gray-50" type="number" value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} />
            <input className="w-24 border px-2 py-1 rounded bg-gray-100 text-gray-700" value={item.total} readOnly />
          </div>
        ))}
      </div>

      <button onClick={addNewItem} className="w-full text-indigo-600 font-medium mt-4">+ Add New Item</button>

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 rounded-full text-gray-600 hover:text-gray-800">Discard</button>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 bg-gray-800 text-white rounded-full">Save as Draft</button>
          <button onClick={handleSending} className="px-4 py-2 bg-indigo-600 text-white rounded-full">Save & Send</button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
