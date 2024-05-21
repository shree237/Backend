import ExpenseModel from '../models/Expense.model.js';
import { ObjectId } from 'mongodb';


export const addExpense =  async (req,res)=>{

    try {
        const {userId} = req.user
        const { amount, category, comments } = req.body;

        if(req.body.expense !== ''){

            const newExpense = new ExpenseModel({
            
            "category":category,
            "amount":amount,
            "comments":comments,
            "user":userId
        });
            await newExpense.save();
            return res.send({"message":"Expense Added"})
        }else{
            return res.status(400).send({"message":"Bad Request"})
        }
        
   } catch (error) {
       return res.status(500).send({"message":"Internal Server Error"})
   }
}

export const updateExpense = async (req,res)=>{
    try {
        const {userId} = req.user
        const expense = await ExpenseModel.findById({_id:req.params.id,"user":userId})
        if(expense){
            const newData = await ExpenseModel.findByIdAndUpdate(
                req.params.id,{$set:req.body},
                {new: true}
            )
            return res.status(200).send({"message":"Expense Updated"})
        }else{
            return res.status(404).send({"message":"Expense Not Found"})
        }       
    } catch (error) {
        return res.status(500).send({"message":"Internal Server Error"})
    }
}

export const getAllExpenses = async (req,res)=>{
   try {
        console.log(req.user);
        const {userId} = req.user
        console.log(userId);
        const expenses = await ExpenseModel.find({"user":new ObjectId(userId)})
        return res.status(200).send(expenses)
        
    } catch (error) {
       return res.status(500).send({"message":"Internal Server Error"})
   }

}

export const deleteExpense = async (req,res)=>{
    try {      
        const {userId} = req.user 
        const expense = await ExpenseModel.findById({_id:req.params.id,"user":userId})
        if(expense){
            await ExpenseModel.findByIdAndDelete(expense)
            res.status(200).send({"message":"Expense Deleted"})
        }else{
            return res.status(404).send({"message":"Expense Not Found"})
        }
    } catch(error) {
        return res.status(500).send({"message":"Internal Server Error"})
    }
}


//

// Add this method to your expense.controller.js

export const getExpensesByCategory = async (req, res) => {
    try {
      const { userId } = req.user;
      const expenses = await ExpenseModel.aggregate([
        { $match: { user: new ObjectId(userId) } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
      ]);
      return res.status(200).send(expenses);
    } catch (error) {
      return res.status(500).send({ "message": "Internal Server Error" });
    }
  };
  