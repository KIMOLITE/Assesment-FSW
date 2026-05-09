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
}