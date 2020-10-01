const express = require('express')
const bodyParser = require('body-parser')

const accountController = require('./controllers/AccountController')
const db = require('./models')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Running healthy....')
})

app.use('/account', accountController)

db.sequelize.sync()

app.listen(8082, () => {
    console.log('server started')
})