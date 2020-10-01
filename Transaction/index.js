const express = require('express')
const bodyParser = require('body-parser')

const transactionController = require('./controllers/TransactionController')
const db = require('./models')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send('Running healthy....')
})

app.use('/transaction',transactionController)

db.sequelize.sync()

app.listen(8083,()=>{
    console.log('server started')
})