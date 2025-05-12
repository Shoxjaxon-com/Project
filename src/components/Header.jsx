import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { CirclePlus, ChevronDown } from "lucide-react";
import { useAppStore } from "../lib/Zustand";
import CreateInvoice from "./CreateInvoice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Header() {
  const { setFilter } = useAppStore();

  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [invoices, setInvoices] = useState([]);

  function handleChange(key) {
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    const res = queryGenerator(items);
    setFilter(res);
  }, [items.draft, items.paid, items.pending]);

  return (
    <header>
      <div className="base-container flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm text-gray-500">
            There are {invoices.length} total invoices
          </p>
        </div>
        <div className="flex gap-4 min-hz">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-white text-b19 Union Terracelack">
                Filter by status <ChevronDown className="ml-2 text-[#7C5DFA]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                {Object.entries(items).map(([key, value]) => (
                  <label
                    key={key}
                    className={`${buttonVariants({ variant: "ghost" })} justify-start items-center capitalize`}
                    htmlFor={key}
                  >
                    <Checkbox
                      onCheckedChange={() => handleChange(key)}
                      checked={value}
                      id={key}
                    />
                    <span className="ml-2">{key}</span>
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={showForm} onOpenChange={setShowForm}>
            <SheetTrigger>
              <Button
                className="bg-[#7C5DFA] text-white rounded-3xl px-6"
                onClick={() => setShowForm(true)}
              >
                <CirclePlus className="mr-2" />
                New Invoice
              </Button>
            </SheetTrigger>
            <SheetContent className="ml-25 min-w-[60%]" side="left">
              <SheetHeader>
                <SheetTitle>Create a New Invoice</SheetTitle>
                <SheetDescription>
                  <CreateInvoice
                    onSubmit={(newInvoice) => {
                      setInvoices((prev) => [...prev, newInvoice]);
                      setShowForm(false);
                    }}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-6 space-y-4">
        {invoices.map((invoice, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-xl bg-white shadow"
          >
            <p className="text-lg font-semibold">Client: {invoice.client}</p>
            <p>Status: {invoice.status}</p>
            <p>Total: ${invoice.total}</p>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
