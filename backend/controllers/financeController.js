import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import Goal from "../models/Goal.js";


//to add an income
export async function addIncome(req,res){
    try{
        const {source, amount} = req.body;
        if(!source || !amount){
            return res.status(400).json({message:"Please fill all fields"})
        }

        const income = await Income.create({
            user: req.user._id,
            source: source,
            amount: amount
        });

        res.status(201).json(income);

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to add an income"})
    }
}

//TO GET ALL INCOME
export async function getIncomes(req,res){
    try{
        const income =await Income.find({
            user: req.user._id,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to get all income"})
    }
}


//to delete income
export async function deleteIncome(req,res){
    try{
        const income = await Income.findById(req.params.id);
        if(!income){
            return res.status(404).json({error})
        }

        if(income.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Invalid token/user"});
        }

        await income.deleteOne();
        res.json({message: "Income deleted successfully"})

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to add an income"})
    }
}
    ///////For expenses

export async function addExpense(req, res){
    try{
        const{description, amount} = req.body;
            const expense = await Expense.create({
                user: req.user._id,
                description: description,
                amount: amount,
            });
            
            res.status(201).json(expense);
        }catch(error){
            res.status(500).json({error: "Failed to add the expense"})
        }
    }
  

    export async function getExpense(req, res){
        try{

        }catch(error){
            res.status(500).json({
                message: error.message,
            });
        }
    }

    export async function deleteExpense(req, res){
        try{
            const expense = await Expense.findById(req.params.id)
            if(!expense){
                return res.status(404).json({
                    message: "Expense not found"
                })
            }

            if(expense.user.toString() !== req.user._id.toString()){
                return res.status(401).json({error: "Invalid toke/user"});
            }

            await expense.deleteOne();
            res.status(200).json({message: "Expense deleted successfully"});
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

export async function setGoal(req,res){
    try{
        const {name, targetAmount} = req.body;
        let goal = await Goal.findOne({
            user: req.user._id
        });

        if(goal){
            goal.name = name;
            goal.targetAmount = targetAmount;
            await goal.save();
        }

        else{
            goal = await Goal.create({
                user: req.user._id,
                name: name,
                targetAmount: targetAmount
            });
        }

        res.status(200).json(goal);
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

export async function getGoal(req, res){
    try{
        const goal = await Goal.findOne({
            user: req.user._id,
        });

        res.status(200).json(goal);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

