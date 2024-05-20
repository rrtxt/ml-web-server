const { predictCancerClassification } = require('../services/inference')
const crypto = require('crypto')
const { storeData } = require('../services/storeData')

async function predictCancerHandler(request, h) {
    const { image } = request.payload
    const { model } = request.server.app

    const { confidenceScore, label } = await predictCancerClassification(model, image)
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    const data = {
        id,
        result: label,
        suggestion: 'Segera periksa ke dokter!',
        createdAt,
    }

    await storeData(id, data)

    const response = h.response({
        status: 'success',
        message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    })
    response.code(201)
    return response
};


async function getPredictHistories(request, h) {

}
module.exports = { predictCancerHandler }