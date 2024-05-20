const { Firestore } = require('@google-cloud/firestore')
const path = require('path')

// const pathKey = path.resolve('./serviceaccountkey.json')

async function storeData(id, data) {
    const db = new Firestore({ databaseId: 'submission-mlgc-rizfi-firestore' })

    const predictCollection = db.collection('predictions')
    return await predictCollection.doc(id).set(data)
}

module.exports = { storeData }