This folder contains the Axios instances to communicate with the BE and its mocks for use in development.

For each group of endpoints there should be a seperate file. E.g.:
- employees
- teams
- teamiteration
- orders

In the folder '/api/mock' are the api-mocks located. For each file in the '/api' folder there should be a file with the same name in the '/api/mock' folder. These mock files contain a mock for each endpoint.

In the folder '/api/mock/data' is the mock-data located.

### Using mocks

If you want to use mocks you just import the api-mock into the api file. E.g.: ***import 'mock/application.js'***