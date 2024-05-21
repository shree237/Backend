import express from 'express'
import authMiddleware from '../middleware/auth.js';

import { addExpense, deleteExpense, getAllExpenses, getExpensesByCategory, updateExpense } from '../controllers/expense.controller.js';

const router = express.Router();

// Add Expense

router.post('/add',authMiddleware, addExpense)

// Update Expense

router.put('/update/:id',authMiddleware, updateExpense )

// Get All the Expenses 

router.get('/getexpensebyid',authMiddleware, getAllExpenses)

// Delete Expense

router.delete('/delete/:id',authMiddleware, deleteExpense )

// Get Expenses by Category
router.get('/getExpensesByCategory', authMiddleware, getExpensesByCategory); // Add this line


export default router;