# Node CLI to Delete All Tests For Deploy ID

## Setup

1. clone repo
2. install dependencies `npm i`
3. create `.env` file with this text `API_KEY=your_api_key`
4. Dry Run (Will print test ids): From root dir run `node index.js your_deploy_id`
5. To perform actual delete of all tests in that deploy run: `node index.js your_deploy_id --delete`
