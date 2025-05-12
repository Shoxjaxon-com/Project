import React from "react";

function DetailsCard({ res }) {
  const totalAmount =
    res?.items?.reduce((acc, item) => acc + (item.total || 0), 0) || 0;

  return (
    <div className="details-status container mx-auto">
      {res && (
        <div className="dark:bg-[#1E2139] bg-white p-6 md:p-12 rounded-lg mt-6 text-[12px]">
          {/* Top */}
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-[16px] font-bold mb-2">
                <span className="text-[#7E88C3]">#</span> {res.id}
              </p>
              <p className="text-[#888EB0]">{res.description}</p>
            </div>
            <div className="text-right text-[#888EB0] text-[11px] mt-6 md:mt-0">
              <p>{res.clientAddress?.street}</p>
              <p>{res.clientAddress?.city}</p>
              <p>{res.clientAddress?.postCode}</p>
              <p>{res.clientAddress?.country}</p>
            </div>
          </div>

          {/* Mid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <p className="text-[#7E88C3] mb-3">Invoice Date</p>
              <p className="text-[15px] font-bold mb-8">{res.createdAt}</p>
              <p className="text-[#7E88C3] mb-3">Payment Due</p>
              <p className="text-[15px] font-bold">{res.paymentDue}</p>
            </div>

            <div>
              <p className="text-[#7E88C3] mb-3">Bill To</p>
              <p className="text-[15px] font-bold mb-2">{res.clientName}</p>
              <p className="text-[#888EB0]">{res.senderAddress?.street}</p>
              <p className="text-[#888EB0]">{res.senderAddress?.city}</p>
              <p className="text-[#888EB0]">{res.senderAddress?.postCode}</p>
              <p className="text-[#888EB0]">{res.senderAddress?.country}</p>
            </div>

            <div>
              <p className="text-[#7E88C3] mb-3">Sent to</p>
              <p className="text-[15px] font-bold">{res.clientEmail}</p>
            </div>
          </div>

          {/* Items */}
          <div className="w-full dark:bg-[#252945] bg-[#F9FAFE] mt-12 rounded-t-lg p-6">
            <div className="hidden md:flex justify-between text-[#7E88C3] text-[11px] mb-6 px-2">
              <p className="w-[40%]">Item Name</p>
              <p className="w-[20%] text-right">QTY.</p>
              <p className="w-[20%] text-right">Price</p>
              <p className="w-[20%] text-right">Total</p>
            </div>
            <div className="space-y-6">
              {res.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center font-bold"
                >
                  <p className="w-full md:w-[40%] text-[12px]">{item.name}</p>
                  <p className="w-full md:w-[20%] text-right text-[#7E88C3]">
                    {item.quantity}
                  </p>
                  <p className="w-full md:w-[20%] text-right text-[#7E88C3]">
                    £ {Number(item.price).toFixed(2)}
                  </p>
                  <p className="w-full md:w-[20%] text-right">
                    £ {Number(item.total).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="px-6 py-6 rounded-b-lg bg-[#373B53] dark:bg-[#0C0E16] text-white flex justify-between items-center">
            <p className="text-[11px]">Amount Due</p>
            <p className="text-2xl font-bold">£ {totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsCard;
