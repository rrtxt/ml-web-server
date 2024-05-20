const { Firestore } = require('@google-cloud/firestore')

async function storeData(id, data) {
    const db = new Firestore({ databaseId: 'submission-mlgc-rizfi-firestore' })
    const predictCollection = db.collection('predictions')
    return predictCollection.doc(id).set(data)
}

async function getAllData() {
    const db = new Firestore({ databaseId: 'submission-mlgc-rizfi-firestore' })
    const predictionCollection = db.collection('predictions')
    const predictionHistories = await predictionCollection.get()
    return predictionHistories.docs
}

module.exports = { storeData, getAllData }