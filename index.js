require('dotenv').config()

const axios = require('axios')

const { API_KEY } = process.env

const auth = {
  auth: {
    username: API_KEY,
    password: 'x',
  },
}

async function main() {
  try {
    const deployId = process.argv[2]
    const tests = await getDeploy(deployId)

    if (process.argv[3] === '--delete') {
      await Promise.all(tests.map(test => deleteTest(test)))
    } else {
      tests && tests.forEach(test => console.log(`Test ID ${test}`))
    }
  } catch (error) {
    throw new Error(`Error calling speedcurve api\n${error}`)
  }
}

function getDeploy(deployId) {
  return axios
    .get(`https://api.speedcurve.com/v1/deploys/${deployId}`, auth)
    .then(res => res.data['tests-completed'].map(({ test }) => test))
    .catch(err => {
      if (err.response.status == 404) {
        throw new Error(`Deploy ID ${deployId} does not exist`)
      } else {
        console.error(`Error getting deploy ${deployId}\n${err}`)
      }
    })
}

function deleteTest(testId) {
  axios
    .delete(`https://api.speedcurve.com/v1/tests/${testId}`, auth)
    .then(res => console.log(`Test ID: ${testId} -> status: ${res.status}`))
}

main()
