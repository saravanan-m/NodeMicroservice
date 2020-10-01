const axios = require('axios')


exports.makeTransactionApi = (isCredit, amount, acountId) => {
   var type = isCredit ? 'CREDIT' : 'DEBIT'
   return axios.post('http://localhost:8083/transaction/create', { amount: amount, type: type, account_id: acountId })
}

exports.getTransactionApi = (acountId) => {
   return axios.get('http://localhost:8083/transaction/get/' + acountId)
}