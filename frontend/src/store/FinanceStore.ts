import {create} from "zustand";

import api from "../services/api.ts";

import {useAuthStore} from ".userAuthStore";

interface FinanceStore{
    incomes: any[];
    expenses: any[];
    goal: any;

    getIncomes: () => Promise<void>;
    addIncome: (source: string, amount: number) => Promise<void>;

    getExpenses: () => Promise<void>;
    addExpense: (description: string, amount: number) => Promis<void>;

    getGoal:()=> Promise<void>;
    setGoal: (name: String, targetAmount: number) => Promis<void>;
}

export const useFinanceStore = create<FinanceStore>((set)) => ({
    incomes: [],
    expenses: [],
    goal: null,


    getIncomes: async () => {
        const token = useAuthStore.getState().token;

        const response = await api.get(
            "/finance/income",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        set({
            incomes: response.data
        });
    },

    addIncome: async(source, amount)=>{
        const token = useAuthStore.getState().token;

        await api.post(
            "/finance/income",
            {
                source, amount,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },

    getExpense: async() => {
        const token = useAuthStore.getState().token;
        const repsonse = await api.get(
            "/finance/expense",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        set({
            expenses: response.data,
        });
    },

    addExpense: async(description, amount)=>{

        const token = useAuthStore.getState().token;

        await api.post(
            "/finance/expense",
            {
                description,
                amount,
            },
            {
                header:{
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },


    getGoal: async ()=>{
        const token = useAuthStore.getState().token;

        const response = await api.get(
            "/finance/goal",
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        set({
            goal:response.data,
        });
    },

    setGoal: async(name, targetAmount)=>{
        const token= useAuthStore.getState().token;
        await api.post(
            "/finance/goal",
            {
                name,
                targetAmount,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },
});