import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBudget from "./StatusBudget";
import { useNavigate } from "react-router-dom";

function MyCard({
  invoiceId= "RT3080",
  createdAt = "Due  19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1"
}) {
  const navigate = useNavigate()
  return (
    <div className="mt-3">
      <Card onClick={()=>{
        navigate(`${id}`)
      }} className="border-2 border-transparent hover:border-[#7C5DFA] transition-colors">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>#{invoiceId}</CardTitle>
            <CardDescription>{createdAt}</CardDescription>
            <span>{clientName}</span>
            <span>£{total}</span>
            <StatusBudget status={status} />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default MyCard;
