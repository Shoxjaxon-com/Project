import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBudget from "./StatusBudget";
import useInvoiceStore from "../lib/Zustand/useInvoiceStore";
import DeleteModal from "./DeleteModal";

function DetailsInfo({ res }) {
  const navigate = useNavigate();
  const deleteInvoice = useInvoiceStore((state) => state.deleteInvoice);
  const fetchInvoices = useInvoiceStore((state) => state.fetchInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${res.id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://json-api.uz/api/project/fn35/invoices/${res.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteInvoice(res.id); 
        fetchInvoices(); 
        navigate("/"); 
      } else {
        console.error("Failed to delete invoice");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      const response = await fetch(`https://json-api.uz/api/project/fn35/invoices/${res.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "paid" }),
      });

      if (response.ok) {
        fetchInvoices();-
        navigate(0);
      } else {
        console.error("Failed to mark as paid");
      }
    } catch (error) {
      console.error("Error marking as paid:", error);
    }
  };

  return (
    res && (
      <>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-8 rounded-lg bg-white dark:bg-[#1E2139] mt-8 shadow-sm">
          <div className="flex items-center">
            <span className="text-[12px] text-[#7E88C3] font-medium mr-3">Status</span>
            <StatusBudget status={res.status} />
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <button
              onClick={handleEdit}
              className="border border-[#7E88C3] text-[#7E88C3] rounded-3xl py-2 px-6 mr-3 hover:bg-[#F9FAFE] dark:hover:bg-[#252945] transition text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EC5757] text-white rounded-3xl py-2 px-6 mr-3 hover:bg-[#FF9797] transition text-sm font-medium"
            >
              Delete
            </button>
            {res.status !== "paid" && (
              <button
                onClick={handleMarkAsPaid}
                className="bg-[#7C5DFA] text-white rounded-3xl py-2 px-6 hover:bg-[#9277FF] transition text-sm font-medium"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          invoiceId={res.invoiceId}
        />
      </>
    )
  );
}

export default DetailsInfo;
