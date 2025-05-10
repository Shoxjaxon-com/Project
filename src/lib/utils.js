import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj){
  let res = "";
  console.log(Object.entries(obj).forEach(([key,value])=>{
    if(value){
      if(res.length){
        res += `|${key}`
      }else{
        res += `${key}`
      }
    }
  }));
    return res
}