const tfjs = require('@tensorflow/tfjs-node')

//Load Model from Cloud Storage Bucket
async function loadModel() {
    return tfjs.loadGraphModel(process.env.MODEL_URL)
}

module.exports = { loadModel }