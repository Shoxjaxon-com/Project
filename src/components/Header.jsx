import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { CirclePlus, ChevronDown } from 'lucide-react';
import { useAppStore } from "../lib/Zustand";
import CreateInvoice from './CreateInvoice';

function Header() {
  const { setFilter } = useAppStore();

  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  const [showForm, setShowForm] = useState(false); // <-- local state for modal

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const res = queryGenerator(items);
    setFilter(res);
    console.log(res);
  }, [items.draft, items.paid, items.pending]);

  return (
    <header>
      <div className="base-container flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm text-gray-500">There are 7 total invoices</p>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-white text-black">
                Filter by status <ChevronDown className="ml-2 text-[#7C5DFA]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                {Object.entries(items).map(([key, value]) => {
                  return (
                    <label
                      key={key}
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} justify-start items-center capitalize`}
                      htmlFor={key}
                    >
                      <Checkbox
                        onCheckedChange={() => handleChange(key)}
                        checked={value}
                        id={key}
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* New Invoice Button */}
          <Button
            className="bg-[#7C5DFA] text-white rounded-3xl px-6"
            onClick={() => setShowForm(true)}
          >
            <CirclePlus className="mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* CreateInvoice Panel */}
      {showForm && (
        <CreateInvoice
          openCreateInvoice={showForm}
          setOpenCreateInvoice={setShowForm}
          type="create"
        />
      )}
    </header>
  );
}

export default Header;
