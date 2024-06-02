const { Firestore } = require('@google-cloud/firestore');

async function displayFormattedPredictions() {
  const db = new Firestore();

  const predictionsCollection = db.collection('predictions');
  const snapshot = await predictionsCollection.get();

  if (snapshot.empty) {
    return [];
  }

  const formattedData = snapshot.docs.map(doc => ({
    id: doc.id,
    history: doc.data()
  }));

  return formattedData;
}

module.exports = displayFormattedPredictions;
