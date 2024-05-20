const { predictCancerClassification } = require('../services/inference')
const crypto = require('crypto')

async function predictCancerHandler(request, h) {
    const { image } = request.payload
    const { model } = request.server.app

    const { confidenceScore, label, suggestion } = await predictCancerClassification(model, image)
    const id = crypto.randomUUID
    const createdAt = new Date().toISOString()

    const data =
    {
        id,
        result: label,
        suggestion,
        createdAt,
        confidenceScore
    }

    const response = h.response({
        status: 'success',
        message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    })
    response.code(201)
    return response
};

module.exports = { predictCancerHandler }