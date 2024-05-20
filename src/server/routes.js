const { getAllData } = require("../services/dataService")
const { predictCancerHandler, getPredictHistories } = require("./handlers")

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: predictCancerHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000,
            }
        }
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: getPredictHistories,
    }
]

module.exports = { routes }