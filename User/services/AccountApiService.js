const axios = require('axios')


exports.createAccountApi = (userMapperId) => {
   return axios.post('http://localhost:8082/account/create', { user_mapper_id: userMapperId })
}


exports.getAccountApi = (userMapperId) => {
   return axios.get('http://localhost:8082/account/get/' + userMapperId)
}