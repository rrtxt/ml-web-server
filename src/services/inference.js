const tfjs = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

function predict(model, imageBuffer) {
    const tensor = tfjs.node
        .decodeJpeg(imageBuffer)
        .resizeNearestNeighbor([150, 150])
        .expandDims()
        .toFloat();

    return model.predict(tensor).data()
}

async function predictCancerClassification(model, image) {
    try {
        const tensor = tfjs.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const prediction = model.predict(tensor)
        const score = await prediction.data()
        const confidenceScore = Math.max(...score) * 100

        const classes = ['Cancer', 'Non-cancer']
        const classResult = tfjs.argMax(prediction, 1).dataSync()[0]
        const label = classes[classResult]

        let suggestion

        if (label == 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }

        return { confidenceScore, label, suggestion }
    } catch (error) {
        throw new InputError('Terjadi kesalaham dalam melakukan prediksi')
    }
}

module.exports = { predict, predictCancerClassification }