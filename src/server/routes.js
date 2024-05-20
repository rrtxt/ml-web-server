const { predictCancerHandler } = require("./handlers")

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
    }
]

module.exports = { routes }