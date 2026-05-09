import express from "express";

import{
    addIncome,
    getIncomes,
    deleteIncome,
    
    addExpense,
    getExpense,
    deleteExpense,

    setGoal,
    getGoal
} from "../controllers/financeController.js";

const router = express.Router();

//routers for income
router.post("/income", addIncome);
router.get("/income", getIncomes);
router.delete("/income:id", deleteIncome);


//routers for expense
router.post("/expense", addExpense);
router.get("/expense", getExpense);
router.delete("/expense:id", deleteExpense);

//routers for goal
router.post("/goal", setGoal);
router.get("/goal", getGoal);

export default router;