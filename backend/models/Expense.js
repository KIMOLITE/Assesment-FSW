import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    descprition:{
        type: String,
        required: true,
    },

    amount:{
        type: Number,
        required: true
    }



},
{timestamps: true}
)

export default mongoose.model("Expense", expenseSchema);