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
import { PlusIcon } from "lucide-react";
import { CirclePlus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from "../lib/Zustand";


function Header() {
  const {setFilter}  = useAppStore()
  let [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false, 
  });
  function handleChange(key) {
    
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }
  useEffect(()=>{
   const res =  queryGenerator(items)
    setFilter(res)
   console.log(res);
   
  },[items.draft, items.paid, items.pending])
  return (
    <header>
      <div className="base-container flex items-center justify-between">
        <div>
          <h2>Invoices</h2>
          <p>There are 7 total invoices</p>
        </div>
        <div className="flex gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-white text-black">Filter by status <ChevronDown className="text-[#7C5DFA]"/> </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                          
                        onCheckedChange={()=>handleChange(key)}
                        value={key}
                        checked={value}
                        id={key}
                      />
                      {key}
                    </label>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
           <Button className="bg-[#7C5DFA] rounded-3xl">
                  <CirclePlus />
            New Invoice
            </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
