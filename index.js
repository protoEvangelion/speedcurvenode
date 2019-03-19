require('dotenv').config()

const axios = require('axios')

const { API_KEY } = process.env

console.log(process.env.argv)

axios
  .get('https://api.speedcurve.com/v1/deploys/414995', {
    auth: {
      username: API_KEY,
      password: 'x',
    },
  })
  .then(res => {
    res.data['tests-completed'].forEach(({ test }) => {
      //   console.log('test', test)
    })
  })
