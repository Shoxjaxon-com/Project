import { create } from 'zustand'

export const useAppStore = create((set)=>{
    return{
        filter: "",
        setFilter(value){
            return set(()=>{
                return{filter: value}
            })
        }
    }
})
