const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser: true, useUnifiedTopology: true });

const expenseSchema = new mongoose.Schema({
    income: Number,
    categories: [{ category: String, cost: Number }],
});

const Expense = mongoose.model('Expense', expenseSchema);

app.post('/generateReport', async (req, res) => {
    const { income, categories } = req.body;

    const expense = new Expense({ income, categories });
    await expense.save();

    res.json({ income, categories });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
