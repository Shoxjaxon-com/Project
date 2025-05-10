import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBudget from "./StatusBudget";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftRight } from "lucide-react";
import { ChevronRight } from "lucide-react";

function CardSkleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4 base-container">
      {
        Array(length).fill(0).map((_,index)=>{
          return <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                <Skeleton className="w-[72px] h-4 rounded-md" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[106px] h-[15px] rounded-md" />
              </CardDescription>
              <span>
                <Skeleton className="w-[89px] h-[15px] rounded-md" />
              </span>
              <span>
                <Skeleton className="w-[90px] h-6 rounded-md" />
              </span>
              <Skeleton className="w-[104px] h-10 rounded-md" />
              <ChevronRight className="text-[#7C5DFA]" />
            </div>
          </CardHeader>
        </Card>
        })
      }
    </div>
  );
}

export default CardSkleton;
