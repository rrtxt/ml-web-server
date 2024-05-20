const { predictCancerClassification } = require('../services/inference')
const crypto = require('crypto')
const { storeData, getAllData } = require('../services/dataService')
const { data } = require('@tensorflow/tfjs-node')

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

    // await storeData(id, data)

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201)
    return response
};


async function getPredictHistories(request, h) {
    let result = []
    const predictionHistories = await getAllData()
    predictionHistories.forEach((doc) => {
        const predictionId = doc.id
        const predictionData = doc.data()
        const data = {
            id: predictionId,
            history: predictionData
        }
        result.push(data)
    })

    const response = h.response({
        status: 'success',
        data: result
    })

    response.code(200)
    return response
}
module.exports = { predictCancerHandler, getPredictHistories }