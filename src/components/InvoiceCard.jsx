import React, { useEffect, useState } from "react";
import CardSkleton from "./CardSkleton";
import MyCard from "./MyCard";
import { getInvoices } from "../request";
import { useAppStore } from "../lib/Zustand";


function InvoicesCard() {
  let [invoices, setInvoices] = useState([]);
  let [loading, setLoading] = useState(false);
  let { filter } = useAppStore()
  console.log(filter);
  
  useEffect(function () {
    setLoading(true);
    getInvoices("/invoices", filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkleton />;
  }


  return (
    <div >
      {invoices.map((value, index) => {
        return (
          <MyCard
            key={value.id}
            status={value.status}
            ke={value.id}
            id={value.invoiceId}
            name={value.clientName}
            total={value.total}
            date={value.createdAt}
            id={value.id}
          />
        );
      })}
    </div>
  );
}

export default InvoicesCard;
