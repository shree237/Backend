import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema(
    {
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        comments: { type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps:true
    }
);

export default mongoose.model('Expense', ExpenseSchema);
