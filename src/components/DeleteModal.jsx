import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm, onEdit, invoiceId }) {
  if (!isOpen) return null;

  return (
    <div className="container mx-auto fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4 text-[#0C0E16] dark:text-white">
          Confirm Deletion
        </h2>
        <p className="text-sm text-[#888EB0] dark:text-[#DFE3FA] mb-6">
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] rounded-3xl py-2 px-5 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onEdit}
            className="bg-[#7C5DFA] text-white rounded-3xl py-2 px-5 text-sm font-medium hover:bg-[#9277FF] transition"
          >
            Edit
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#EC5757] text-white rounded-3xl py-2 px-5 text-sm font-medium hover:bg-[#FF9797] transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
